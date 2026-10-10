"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { readStudent } from "@/lib/student";
import type { LearnTrackId } from "@/lib/learn-types";

function subscribe(onChange: () => void) {
  // `progress-changed` covers this tab (and Supabase sync merges); `storage`
  // covers another tab finishing a chapter.
  window.addEventListener("cwp:progress-changed", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("cwp:progress-changed", onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The set of completed chapter slugs for a track, or `null` until the client
 * has read the local store.
 *
 * `null` is the server's answer (and the first hydration pass), so nothing
 * that depends on progress is rendered into the static HTML with a wrong
 * guess. The snapshot is a joined string because useSyncExternalStore needs a
 * value that is stable between reads; readStudent() returns a fresh object.
 */
export function useTrackProgress(track: LearnTrackId): ReadonlySet<string> | null {
  const getSnapshot = useCallback(() => (readStudent().progress[track] ?? []).join("\n"), [track]);
  const key = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return useMemo(() => (key === null ? null : new Set(key ? key.split("\n") : [])), [key]);
}
