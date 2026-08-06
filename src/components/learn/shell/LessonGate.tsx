"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapterHref } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { isLessonComplete } from "@/lib/student";
import { LessonPreviewWall } from "@/components/learn/shell/LessonPreviewWall";

interface Prev {
  slug: string;
  title: string;
}

interface LessonGateProps {
  track: LearnTrackId;
  slug: string;
  prev: Prev | null;
  children: React.ReactNode;
}

/**
 * Chapters unlock in order: a chapter opens only once the one before it has been
 * completed (its quick check passed). This is what makes the quiz gate real —
 * without it a learner could jump ahead via the sidebar or a direct URL and skip
 * the check entirely.
 *
 * Completion lives in the local store, so the check runs on the client after
 * mount (hence the loading state). The very first chapter of a track has no
 * predecessor and is always open.
 *
 * Two gates, in this order, and the order is deliberate. The prerequisite check
 * comes first because it is the more specific answer: telling a signed-out
 * reader to make an account, and only then telling them they were three
 * chapters early, is two rejections where one would do.
 *
 * Signing in is no longer enforced by a redirect in `proxy.ts` — a signed-out
 * reader gets the chapter blurred, with an invitation. See LessonPreviewWall for
 * why that changed and what it does and does not protect.
 */
export function LessonGate({ track, slug, prev, children }: LessonGateProps) {
  /**
   * "open" before the check has run, not "loading" — and this is the line that
   * decides whether 123 chapters can be indexed.
   *
   * This used to start in a `loading` state that rendered "Checking your
   * progress…" INSTEAD of the lesson. Because the state is only resolved in an
   * effect, that placeholder was what got prerendered: the chapter body was
   * absent from the static HTML of every chapter on the site. Removing the
   * redirect in `proxy.ts` bought a 200 instead of an off-site 307, and a
   * crawler still would have found no lesson at the end of it.
   *
   * Starting open puts the real body in the HTML. The two gates then apply on
   * top of it after mount: the wall blurs it for signed-out readers, and a
   * locked chapter replaces it. Both are client-side, and neither was ever a
   * secret — the prerequisite check reads localStorage, so a chapter arriving
   * unlocked in the markup gives away nothing that devtools did not already.
   */
  const [status, setStatus] = useState<"locked" | "open">("open");

  useEffect(() => {
    const check = () => {
      const unlocked = !prev || isLessonComplete(track, prev.slug);
      setStatus(unlocked ? "open" : "locked");
    };
    check();
    // Re-check when cross-device sync merges in remote completions.
    window.addEventListener("cwp:progress-changed", check);
    return () => window.removeEventListener("cwp:progress-changed", check);
  }, [track, slug, prev]);

  if (status === "locked" && prev) {
    return (
      <div className="mt-10 rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-8 text-center md:p-10">
        <div className="text-3xl" aria-hidden="true">
          🔒
        </div>
        <h2 className="mt-3 text-lg text-learn-strong md:text-xl">
          Finish the previous chapter first
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-learn-muted">
          Chapters unlock in order. Pass the quick check on{" "}
          <span className="font-medium text-learn-strong">{prev.title}</span>, and this one opens
          up.
        </p>
        <Link
          href={chapterHref(track, prev.slug)}
          className="learn-focusable mt-6 inline-flex rounded-full bg-learn-inverse px-5 py-2.5 text-sm font-medium text-learn-heading-on-inverse"
        >
          Go to {prev.title}
        </Link>
      </div>
    );
  }

  return <LessonPreviewWall>{children}</LessonPreviewWall>;
}
