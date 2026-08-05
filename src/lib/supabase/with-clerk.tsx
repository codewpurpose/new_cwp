"use client";

import { useEffect, useMemo, useRef } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";
import { readStudent, writeStudent, type StudentState } from "@/lib/student";
import { ACCOUNT_WELCOME_PATH } from "@/lib/links";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * A Supabase client that authenticates every request with the signed-in Clerk
 * user's token. Supabase's row-level security reads the Clerk `sub` claim, so a
 * learner can only ever read/write their own rows. Returns null when either
 * Supabase or the Clerk session is missing — callers fall back to the local store.
 */
export function useClerkSupabase(): SupabaseClient | null {
  const { session } = useSession();

  return useMemo(() => {
    if (!url || !anonKey || !session) return null;
    return createClient(url, anonKey, {
      accessToken: async () => (await session.getToken()) ?? null,
    });
  }, [session]);
}

function displayNameFor(local: StudentState, user: ReturnType<typeof useUser>["user"]): string {
  return (
    local.name.trim() ||
    user?.fullName?.trim() ||
    user?.username?.trim() ||
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ||
    "Learner"
  );
}

/**
 * The single source of cross-device truth. Mounted once inside <ClerkProvider>.
 *
 * On sign-in it reconciles the local store with Supabase: pulls the learner's
 * completed lessons + XP, merges them into the local store (union of
 * completions, higher XP wins), and pushes anything the server was missing back
 * up. From then on, every lesson completion is written straight to Supabase too.
 *
 * This is what makes progress follow a student across devices and makes the
 * quiz-gate's "previous chapter complete" check trust a durable record rather
 * than one device's localStorage.
 */
/**
 * Remembers, per browser, that we've already pinged the welcome endpoint for a
 * user. Purely to save a pointless request on every page load — the endpoint is
 * idempotent on the server, which is what actually guarantees one email.
 */
const WELCOMED_KEY = "cwp-account-welcomed-v1";

function alreadyPinged(userId: string): boolean {
  try {
    return localStorage.getItem(`${WELCOMED_KEY}:${userId}`) === "1";
  } catch {
    return false; // Private mode, storage disabled — the server still dedupes.
  }
}

function markPinged(userId: string): void {
  try {
    localStorage.setItem(`${WELCOMED_KEY}:${userId}`, "1");
  } catch {
    // Nothing to do; worst case is one extra request next load.
  }
}

export function ClerkDataSync() {
  const { user, isSignedIn } = useUser();
  const supabase = useClerkSupabase();
  const reconciledFor = useRef<string | null>(null);
  const welcomedFor = useRef<string | null>(null);

  /**
   * The account welcome email, sent on first sign-in.
   *
   * Deliberately independent of the progress sync below: it needs a Clerk
   * session and nothing else, so it still works when Supabase is unconfigured.
   * It sends no body — the endpoint reads the user from the session, so the
   * browser cannot name someone else's address.
   */
  useEffect(() => {
    if (!isSignedIn || !user) return;
    if (welcomedFor.current === user.id) return;
    welcomedFor.current = user.id;
    if (alreadyPinged(user.id)) return;

    void fetch(ACCOUNT_WELCOME_PATH, { method: "POST" })
      .then((res) => {
        // A 500 means "try again later", so leave the flag unset for next load.
        if (res.ok) markPinged(user.id);
      })
      .catch(() => {
        // Offline or blocked. Silent by design — this is not the visitor's
        // problem, and it will be retried the next time they load the site.
      });
  }, [isSignedIn, user]);

  // One-time reconciliation per signed-in user.
  useEffect(() => {
    if (!isSignedIn || !user || !supabase) return;
    if (reconciledFor.current === user.id) return;
    reconciledFor.current = user.id;

    let cancelled = false;
    (async () => {
      const [{ data: rows }, { data: profile }] = await Promise.all([
        supabase.from("progress").select("course_id, chapter_slug"),
        supabase.from("profiles").select("xp").eq("id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;

      const local = readStudent();
      const merged: Record<string, string[]> = {};
      for (const [courseId, slugs] of Object.entries(local.progress)) {
        merged[courseId] = [...slugs];
      }
      const remoteSet = new Set<string>();
      for (const r of rows ?? []) {
        remoteSet.add(`${r.course_id}/${r.chapter_slug}`);
        const list = merged[r.course_id] ?? (merged[r.course_id] = []);
        if (!list.includes(r.chapter_slug)) list.push(r.chapter_slug);
      }

      const mergedXp = Math.max(local.xp, profile?.xp ?? 0);
      writeStudent({ ...local, progress: merged, xp: mergedXp });
      window.dispatchEvent(new Event("cwp:progress-changed"));

      // Push completions the server didn't have yet.
      const toPush: { user_id: string; course_id: string; chapter_slug: string }[] = [];
      for (const [courseId, slugs] of Object.entries(merged)) {
        for (const slug of slugs) {
          if (!remoteSet.has(`${courseId}/${slug}`)) {
            toPush.push({ user_id: user.id, course_id: courseId, chapter_slug: slug });
          }
        }
      }
      if (toPush.length) {
        await supabase.from("progress").upsert(toPush, { onConflict: "user_id,course_id,chapter_slug" });
      }

      await supabase.from("profiles").upsert(
        {
          id: user.id,
          display_name: displayNameFor(local, user),
          avatar: local.avatar,
          xp: mergedXp,
          streak: local.streakDays,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
    })().catch((e) => console.error("[cwp] progress reconcile failed:", e));

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, user, supabase]);

  // Push each new completion (and the resulting XP) as it happens.
  useEffect(() => {
    if (!isSignedIn || !user || !supabase) return;

    const onComplete = (e: Event) => {
      const detail = (e as CustomEvent<{ courseId: string; slug: string }>).detail;
      if (!detail) return;
      const local = readStudent();
      supabase
        .from("progress")
        .upsert(
          { user_id: user.id, course_id: detail.courseId, chapter_slug: detail.slug },
          { onConflict: "user_id,course_id,chapter_slug" },
        )
        .then(({ error }) => {
          if (error) console.error("[cwp] progress push failed:", error.message);
        });
      supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            display_name: displayNameFor(local, user),
            avatar: local.avatar,
            xp: local.xp,
            streak: local.streakDays,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        )
        .then(({ error }) => {
          if (error) console.error("[cwp] profile push failed:", error.message);
        });
    };

    window.addEventListener("cwp:lesson-complete", onComplete);
    return () => window.removeEventListener("cwp:lesson-complete", onComplete);
  }, [isSignedIn, user, supabase]);

  return null;
}
