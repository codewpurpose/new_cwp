"use client";

import { useEffect, useMemo, useRef } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";
import { readStudent, writeStudent } from "@/lib/student";
import { ACCOUNT_WELCOME_PATH } from "@/lib/links";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** A signed-in Supabase client for synchronising course completions. */
export function useClerkSupabase(): SupabaseClient | null {
  const { session } = useSession();

  return useMemo(() => {
    if (!url || !anonKey || !session) return null;
    return createClient(url, anonKey, {
      accessToken: async () => (await session.getToken()) ?? null,
    });
  }, [session]);
}

/**
 * Mirrors completed chapters between this browser and the learner's account.
 * The local course reader remains usable when Clerk or Supabase is unavailable.
 */
export function ClerkDataSync() {
  const { user, isSignedIn } = useUser();
  const supabase = useClerkSupabase();
  const reconciledFor = useRef<string | null>(null);
  const welcomedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user || typeof window === "undefined") return;
    if (welcomedFor.current === user.id) return;
    welcomedFor.current = user.id;

    const key = `cwp-account-welcomed-v1:${user.id}`;
    try {
      if (localStorage.getItem(key) === "1") return;
    } catch {
      // The endpoint is idempotent if browser storage is unavailable.
    }

    void fetch(ACCOUNT_WELCOME_PATH, { method: "POST" })
      .then((response) => {
        if (!response.ok) return;
        try {
          localStorage.setItem(key, "1");
        } catch {
          // The server still deduplicates the welcome message.
        }
      })
      .catch(() => {
        // Offline or blocked; retry on the next page load.
      });
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!isSignedIn || !user || !supabase) return;
    if (reconciledFor.current === user.id) return;
    reconciledFor.current = user.id;

    let cancelled = false;
    void (async () => {
      const { data: rows } = await supabase.from("progress").select("course_id, chapter_slug");
      if (cancelled) return;

      const local = readStudent();
      const merged: Record<string, string[]> = {};
      for (const [courseId, slugs] of Object.entries(local.progress)) {
        merged[courseId] = [...slugs];
      }

      const remote = new Set<string>();
      for (const row of rows ?? []) {
        remote.add(`${row.course_id}/${row.chapter_slug}`);
        const slugs = merged[row.course_id] ?? (merged[row.course_id] = []);
        if (!slugs.includes(row.chapter_slug)) slugs.push(row.chapter_slug);
      }

      writeStudent({ ...local, progress: merged });
      window.dispatchEvent(new Event("cwp:progress-changed"));

      const missing = Object.entries(merged).flatMap(([courseId, slugs]) =>
        slugs
          .filter((slug) => !remote.has(`${courseId}/${slug}`))
          .map((chapter_slug) => ({ user_id: user.id, course_id: courseId, chapter_slug })),
      );
      if (missing.length) {
        await supabase.from("progress").upsert(missing, {
          onConflict: "user_id,course_id,chapter_slug",
        });
      }
    })().catch((error: unknown) => console.error("[cwp] course progress sync failed:", error));

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, user, supabase]);

  useEffect(() => {
    if (!isSignedIn || !user || !supabase) return;

    const onComplete = (event: Event) => {
      const detail = (event as CustomEvent<{ courseId: string; slug: string }>).detail;
      if (!detail) return;
      void supabase
        .from("progress")
        .upsert(
          { user_id: user.id, course_id: detail.courseId, chapter_slug: detail.slug },
          { onConflict: "user_id,course_id,chapter_slug" },
        )
        .then(({ error }) => {
          if (error) console.error("[cwp] course progress sync failed:", error.message);
        });
    };

    window.addEventListener("cwp:lesson-complete", onComplete);
    return () => window.removeEventListener("cwp:lesson-complete", onComplete);
  }, [isSignedIn, user, supabase]);

  return null;
}
