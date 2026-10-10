"use client";

import { useMemo, useSyncExternalStore } from "react";
import { STUDENT_KEY } from "@/lib/student";

/**
 * Read-only access to the local progress store, for the catalogue and the
 * learning space.
 *
 * `useSyncExternalStore` with a `null` server snapshot is what keeps the
 * markup honest: the server and the hydration pass both render the "not
 * started" state, and React re-renders with the real progress straight after.
 * Nothing here reads storage during render on the server, and nothing branches
 * markup before mount.
 *
 * The snapshot is the raw string, not the parsed object, so it is stable
 * between reads (a fresh object every call would loop forever).
 */

export type ProgressMap = Record<string, readonly string[]>;

const EMPTY: ProgressMap = {};

function subscribe(onChange: () => void) {
  // `progress-changed` is fired by markLessonComplete and by cross-device sync;
  // `storage` covers a chapter finished in another tab.
  window.addEventListener("cwp:progress-changed", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("cwp:progress-changed", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(STUDENT_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

function parse(raw: string | null): ProgressMap {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    const progress = (parsed as { progress?: unknown } | null)?.progress;
    if (!progress || typeof progress !== "object") return EMPTY;
    const clean: Record<string, string[]> = {};
    for (const [track, slugs] of Object.entries(progress as Record<string, unknown>)) {
      if (Array.isArray(slugs)) clean[track] = slugs.filter((s): s is string => typeof s === "string");
    }
    return clean;
  } catch {
    return EMPTY;
  }
}

/** Every track's completed chapter slugs. Empty on the server and at hydration. */
export function useProgressMap(): ProgressMap {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parse(raw), [raw]);
}

export interface TrackProgress {
  done: ReadonlySet<string>;
  count: number;
  total: number;
  /** First chapter in reading order that isn't complete — what LessonGate unlocks next. */
  next: { slug: string; title: string; index: number } | null;
  started: boolean;
  finished: boolean;
}

export function summarise(
  outline: readonly { slug: string; title: string }[],
  completed: readonly string[] | undefined,
): TrackProgress {
  const done = new Set((completed ?? []).filter((slug) => outline.some((c) => c.slug === slug)));
  const index = outline.findIndex((chapter) => !done.has(chapter.slug));
  return {
    done,
    count: done.size,
    total: outline.length,
    next: index === -1 ? null : { ...outline[index], index },
    started: done.size > 0,
    finished: outline.length > 0 && done.size >= outline.length,
  };
}
