"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { List, X } from "lucide-react";
import { LearnSidebar } from "@/components/learn/shell/LearnSidebar";
import { useTrackProgress } from "@/components/learn/reader/useTrackProgress";
import type { LearnNavData, LearnTrackId } from "@/lib/learn-types";

interface LearnNavDrawerProps {
  track: LearnTrackId;
  /** Built on the server — see LearnSidebar's note. */
  nav: LearnNavData;
  triggerLabel: string;
}

/**
 * Mobile chapter navigation.
 *
 * Deliberately a Base UI dialog rather than the pattern SiteHeader uses for its
 * own menu: that one has no focus trap, no Escape handler, no scroll lock, and
 * no portal. Copying it would reproduce all four gaps. Base UI is already a
 * direct dependency and components.json points shadcn at it, so this adds no
 * new library.
 *
 * The panel renders the same LearnSidebar as the desktop rail — one navigation
 * implementation, two presentations.
 *
 * The slide, backdrop fade and app-like chrome are in the reader block of
 * globals.css (`.lr-drawer*`), so they can share the reduced-motion rule.
 */
export function LearnNavDrawer({ track, nav, triggerLabel }: LearnNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const progress = useTrackProgress(track);
  const total = nav.groups.reduce((sum, group) => sum + group.chapters.length, 0);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="lr-drawer-trigger learn-focusable">
        <List className="size-4" aria-hidden="true" />
        <span>{triggerLabel}</span>
        {progress && (
          <span className="lr-drawer-trigger-count">
            {progress.size}/{total}
            <span className="sr-only"> complete</span>
          </span>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="lr-drawer-backdrop" />
        <Dialog.Popup className="lr-drawer">
          <div className="lr-drawer-head">
            <div className="min-w-0">
              <p className="learn-nav-heading !mb-0.5">Chapters</p>
              <Dialog.Title className="home-serif truncate text-lg text-learn-strong">
                {nav.trackTitle}
              </Dialog.Title>
            </div>
            <Dialog.Close className="lr-drawer-close learn-focusable" aria-label="Close chapters">
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="lr-drawer-body">
            <LearnSidebar
              track={track}
              nav={nav}
              variant="drawer"
              onNavigate={() => setOpen(false)}
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
