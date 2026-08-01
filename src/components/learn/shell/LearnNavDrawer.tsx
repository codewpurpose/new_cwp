"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { LearnSidebar } from "@/components/learn/shell/LearnSidebar";
import type { LearnTrackId } from "@/lib/learn-types";
import { getTrack } from "@/lib/learn-nav";

interface LearnNavDrawerProps {
  track: LearnTrackId;
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
 */
export function LearnNavDrawer({ track, triggerLabel }: LearnNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const trackMeta = getTrack(track);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="home-btn home-btn-outline learn-focusable !py-1.5 !text-[0.8rem]">
        {triggerLabel}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[rgba(10,14,25,0.35)] backdrop-blur-[2px] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-safe:transition-opacity motion-safe:duration-200" />
        <Dialog.Popup
          className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-r border-learn-line bg-learn-paper p-6 shadow-xl data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full motion-safe:transition-transform motion-safe:duration-300"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <Dialog.Title className="home-serif text-lg text-learn-strong">
              {trackMeta.title}
            </Dialog.Title>
            <Dialog.Close className="home-btn home-btn-outline learn-focusable !py-1.5 !text-[0.8rem]">
              Close
            </Dialog.Close>
          </div>

          <LearnSidebar track={track} variant="drawer" onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
