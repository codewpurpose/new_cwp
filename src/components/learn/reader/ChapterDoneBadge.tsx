"use client";

import { Check } from "lucide-react";
import type { LearnTrackId } from "@/lib/learn-types";
import { useTrackProgress } from "@/components/learn/reader/useTrackProgress";

/**
 * "Completed" pill in the chapter header, for a reader returning to a chapter
 * they have already passed. Client-only by nature (progress is local), and it
 * renders nothing on the server rather than guessing.
 */
export function ChapterDoneBadge({ track, slug }: { track: LearnTrackId; slug: string }) {
  const progress = useTrackProgress(track);
  if (!progress?.has(slug)) return null;
  return (
    <span className="lr-done-badge">
      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
      Completed
    </span>
  );
}
