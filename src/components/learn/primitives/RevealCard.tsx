"use client";

import { useId, useState } from "react";

interface RevealCardProps {
  summaryTag: string;
  summary: React.ReactNode;
  detailTag: string;
  detail: React.ReactNode;
  footnote?: React.ReactNode;
  openLabel?: string;
  closeLabel?: string;
}

/**
 * The click-to-reveal before/after card, previously duplicated across two
 * lessons at ~45 lines each and differing only in three label strings.
 *
 * Follows the disclosure pattern already used correctly in FaqSection: useId +
 * aria-expanded + aria-controls. Neither original had any of them.
 */
export function RevealCard({
  summaryTag,
  summary,
  detailTag,
  detail,
  footnote,
  openLabel = "See the fix",
  closeLabel = "Hide the fix",
}: RevealCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="learn-focusable block w-full p-6 text-left md:p-8"
      >
        <span className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-learn-sunken px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-muted">
            {summaryTag}
          </span>
          <span className="text-xs text-learn-accent-text">
            {open ? `${closeLabel} ↑` : `${openLabel} ↓`}
          </span>
        </span>
        <span className="mt-3 block text-[15px] leading-[1.5] text-learn-strong">{summary}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="border-t-[0.5px] border-learn-line px-6 pb-6 pt-5 md:px-8 md:pb-8"
      >
        <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-strong">
          {detailTag}
        </span>
        <p className="mt-3 text-[15px] leading-[1.55] text-learn-strong">{detail}</p>
        {footnote && (
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">{footnote}</p>
        )}
      </div>
    </div>
  );
}
