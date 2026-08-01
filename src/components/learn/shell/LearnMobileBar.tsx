"use client";

import { LearnNavDrawer } from "@/components/learn/shell/LearnNavDrawer";
import type { LearnTrackId } from "@/lib/learn-types";

interface LearnMobileBarProps {
  track: LearnTrackId;
  label: string;
}

/**
 * Below 1200px this replaces the sidebar. It is opaque because it also acts as
 * the scrim under the transparent site header at these widths.
 */
export function LearnMobileBar({ track, label }: LearnMobileBarProps) {
  return (
    <div className="learn-mobile-bar">
      <span className="learn-mobile-bar-label">{label}</span>
      <LearnNavDrawer track={track} triggerLabel="Chapters" />
    </div>
  );
}
