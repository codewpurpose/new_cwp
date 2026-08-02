"use client";

import { useState } from "react";

const TEXT = "codewithpurpose";

export function StringSlicer() {
  const [start, setStart] = useState(4);
  const [end, setEnd] = useState(8);

  const clampedStart = Math.max(0, Math.min(start, TEXT.length));
  const clampedEnd = Math.max(clampedStart, Math.min(end, TEXT.length));
  const slice = TEXT.slice(clampedStart, clampedEnd);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        text[start:end]
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-[3px] font-[family-name:var(--learn-font-mono)] text-[15px]">
        {TEXT.split("").map((ch, i) => {
          const inSlice = i >= clampedStart && i < clampedEnd;
          return (
            <span key={i} className="flex flex-col items-center">
              <span
                className={`flex h-8 w-6 items-center justify-center rounded-[4px] border-[0.5px] ${
                  inSlice
                    ? "border-learn-accent bg-learn-quiet text-learn-strong"
                    : "border-learn-line bg-white text-learn-muted"
                }`}
              >
                {ch}
              </span>
              <span className="mt-1 text-[10px] text-learn-subtle">{i}</span>
            </span>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-[13px] text-learn-muted">
          start = {clampedStart}
          <input
            type="range"
            min={0}
            max={TEXT.length}
            value={clampedStart}
            onChange={(e) => setStart(Number(e.target.value))}
            className="mt-1 w-full accent-learn-accent"
          />
        </label>
        <label className="block text-[13px] text-learn-muted">
          end = {clampedEnd}
          <input
            type="range"
            min={0}
            max={TEXT.length}
            value={clampedEnd}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="mt-1 w-full accent-learn-accent"
          />
        </label>
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-subtle">
          {">>> "}text[{clampedStart}:{clampedEnd}]
        </p>
        <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] text-learn-strong">
          &apos;{slice}&apos;
        </p>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          The character at index {clampedEnd} is not included — a slice runs up to, but not
          through, its end index. That is why a slice&apos;s length is always{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">end - start</span>, here{" "}
          {clampedEnd - clampedStart}.
        </p>
      </div>
    </figure>
  );
}
