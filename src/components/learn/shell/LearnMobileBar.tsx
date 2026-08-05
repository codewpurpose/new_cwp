import { LearnNavDrawer } from "@/components/learn/shell/LearnNavDrawer";
import { getSidebarNav } from "@/lib/learn-nav";
import type { LearnTrackId } from "@/lib/learn-types";

interface LearnMobileBarProps {
  track: LearnTrackId;
  label: string;
}

/**
 * Below 1200px this replaces the sidebar. It is opaque because it also acts as
 * the scrim under the transparent site header at these widths.
 *
 * A server component: it has no state or handlers of its own, and being on the
 * server is what lets it read the chapter list here and hand the drawer a
 * flattened copy, instead of the drawer's client subtree importing the whole
 * lesson graph to do the same job.
 */
export function LearnMobileBar({ track, label }: LearnMobileBarProps) {
  return (
    <div className="learn-mobile-bar">
      <span className="learn-mobile-bar-label">{label}</span>
      <LearnNavDrawer track={track} nav={getSidebarNav(track)} triggerLabel="Chapters" />
    </div>
  );
}
