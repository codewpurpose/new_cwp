"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapterHref } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { isLessonComplete } from "@/lib/student";

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
 * predecessor and is always open. Login itself is enforced server-side by the
 * Clerk middleware once accounts are switched on.
 */
export function LessonGate({ track, slug, prev, children }: LessonGateProps) {
  const [status, setStatus] = useState<"loading" | "locked" | "open">("loading");

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

  if (status === "loading") {
    return <div className="mt-10 text-[14px] text-learn-muted">Checking your progress…</div>;
  }

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

  return <>{children}</>;
}
