"use client";

import Link from "next/link";
import { createContext, useContext, useMemo } from "react";
import { chapterHref } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { summarise, useProgressMap, type TrackProgress } from "@/components/learn/space/progress";

/**
 * One read of the progress store per course page, shared by every island that
 * shows it: the header ring, the hero's continue button and panel, and the
 * tick beside each chapter in the syllabus.
 *
 * Each island renders the "not started" state first (that is what the server
 * sent), then fills in. None of them changes size when it does, so the page
 * never moves under the reader.
 */

interface ContextValue extends TrackProgress {
  track: LearnTrackId;
  first: { slug: string; title: string } | null;
}

const TrackProgressContext = createContext<ContextValue | null>(null);

export function TrackProgressProvider({
  track,
  outline,
  children,
}: {
  track: LearnTrackId;
  outline: readonly { slug: string; title: string }[];
  children: React.ReactNode;
}) {
  const map = useProgressMap();
  const completed = map[track];
  const value = useMemo<ContextValue>(
    () => ({ ...summarise(outline, completed), track, first: outline[0] ?? null }),
    [outline, completed, track],
  );
  return <TrackProgressContext.Provider value={value}>{children}</TrackProgressContext.Provider>;
}

function useTrackProgress(): ContextValue {
  const value = useContext(TrackProgressContext);
  if (!value) throw new Error("TrackProgress islands need a TrackProgressProvider above them");
  return value;
}

/* ---- Ring ---------------------------------------------------------------- */

export function Ring({
  value,
  size = 32,
  stroke = 3,
  track = "rgba(252, 244, 232, 0.22)",
  fill = "#9fd3a8",
  className = "",
}: {
  value: number;
  size?: number;
  stroke?: number;
  track?: string;
  fill?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={`-rotate-90 ${className}`}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={fill}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - clamped)}
        className="learnspace-ring-fill"
        // A zero-length round cap still draws a dot; hide it until there is progress.
        opacity={clamped === 0 ? 0 : 1}
      />
    </svg>
  );
}

/** The header's compact ring with "3/31" beside it. */
export function HeaderProgress() {
  const { count, total } = useTrackProgress();
  return (
    <div className="flex items-center gap-2" role="img" aria-label={`${count} of ${total} chapters complete`}>
      <Ring value={total ? count / total : 0} size={28} stroke={3} />
      <span className="home-mono hidden min-w-[3.5ch] text-[12px] tabular-nums text-[#fcf4e8]/85 sm:inline" aria-hidden="true">
        {count}/{total}
      </span>
    </div>
  );
}

/* ---- Hero ---------------------------------------------------------------- */

export function ContinueButton({ className = "" }: { className?: string }) {
  const { track, next, first, started, finished } = useTrackProgress();
  if (!first) return null;
  const target = finished || !next ? first : next;
  const label = finished ? "Review from the start" : started ? "Continue:" : "Start course";
  // Fixed width in every state, so swapping "Start course" for a long
  // "Continue: <chapter>" never rewraps the buttons beside it.
  return (
    <Link
      href={chapterHref(track, target.slug)}
      className={`home-btn home-btn-fill learn-focusable w-full justify-center gap-1.5 sm:w-[21rem] ${className}`}
    >
      <span className="shrink-0">{label}</span>
      {started && !finished && (
        <span className="min-w-0 truncate font-normal opacity-80">{target.title}</span>
      )}
      <span aria-hidden="true" className="shrink-0">
        →
      </span>
    </Link>
  );
}

/**
 * The panel under the course art. Two fixed lines of text in a fixed-height
 * box, so "Not started yet" and "7 of 31 complete" occupy the same space.
 */
export function ProgressPanel({ durationLabel }: { durationLabel: string }) {
  const { count, total, next, started, finished } = useTrackProgress();
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex h-[88px] items-center gap-4">
      <div className="relative grid shrink-0 place-items-center">
        <Ring
          value={total ? count / total : 0}
          size={64}
          stroke={5}
          track="var(--home-grey-500)"
          fill="#3e7f5c"
        />
        <span className="home-mono absolute text-[13px] font-medium tabular-nums text-[#1e3c2c]">
          {pct}%
        </span>
      </div>
      <div className="min-w-0" aria-live="polite">
        <p className="text-[15px] font-medium text-[#15120c]">
          {finished
            ? "Course complete"
            : started
              ? `${count} of ${total} chapters complete`
              : "Not started yet"}
        </p>
        <p className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-[var(--home-ink-quiet)]">
          {finished
            ? "Every quick check passed. Revisit any chapter below."
            : started && next
              ? `Up next: ${next.title}`
              : `${total} chapters, about ${durationLabel} of reading. Your progress saves on this device.`}
        </p>
      </div>
    </div>
  );
}

/* ---- Syllabus ------------------------------------------------------------ */

/**
 * The marker beside a chapter. A numbered circle on the server; after mount, a
 * tick when done, a filled ring for the chapter that's up next, and a dashed
 * circle for chapters still locked behind an earlier quick check.
 */
export function ChapterStatus({ slug, number }: { slug: string; number: number }) {
  const { done, next, started } = useTrackProgress();
  const isDone = done.has(slug);
  const isNext = next?.slug === slug;
  const locked = started && !isDone && !isNext;
  const state = isDone ? "done" : isNext && started ? "next" : locked ? "locked" : "idle";

  return (
    <span className="learnspace-status" data-state={state}>
      {isDone ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none">
          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span aria-hidden="true">{number}</span>
      )}
      <span className="sr-only">
        {isDone
          ? "Completed. "
          : state === "next"
            ? "Up next. "
            : locked
              ? "Opens after the previous chapter's quick check. "
              : ""}
      </span>
    </span>
  );
}

/** A soft highlight behind the row that's up next. Absolutely placed: no reflow. */
export function NextUpHighlight({ slug }: { slug: string }) {
  const { next, started } = useTrackProgress();
  if (!started || next?.slug !== slug) return null;
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[14px] bg-[#dbefdb]/55 ring-1 ring-[#3e7f5c]/25" />
  );
}

/** "2 of 5 done" beside a part heading; the plain chapter count until then. */
export function PartProgress({ slugs }: { slugs: readonly string[] }) {
  const { done, started } = useTrackProgress();
  const count = slugs.filter((slug) => done.has(slug)).length;
  const label = slugs.length === 1 ? "chapter" : "chapters";
  return (
    <span className="home-mono text-[12px] tabular-nums text-[var(--home-ink-quiet)]">
      {started ? `${count} of ${slugs.length} done` : `${slugs.length} ${label}`}
    </span>
  );
}
