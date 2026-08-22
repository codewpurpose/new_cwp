"use client";

import { useId, useMemo, useState } from "react";

/**
 * A fixed cluster of overlapping boxes around one object, plus one separate
 * box for a second object nearby. IoU and the suppression decision are
 * computed live in plain JS from these hard-coded rectangles — no randomness,
 * no chart library.
 */

interface Box {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
}

const BOXES: readonly Box[] = [
  { id: "a", x: 60, y: 60, w: 140, h: 100, confidence: 0.95 },
  { id: "b", x: 68, y: 58, w: 140, h: 100, confidence: 0.91 },
  { id: "c", x: 55, y: 66, w: 140, h: 100, confidence: 0.88 },
  { id: "d", x: 72, y: 70, w: 140, h: 100, confidence: 0.82 },
  { id: "e", x: 50, y: 50, w: 140, h: 100, confidence: 0.77 },
  { id: "f", x: 130, y: 100, w: 140, h: 100, confidence: 0.85 },
];

const BOX_COLOR: Readonly<Record<string, string>> = {
  a: "var(--learn-series-1)",
  b: "var(--learn-series-2)",
  c: "var(--learn-series-3)",
  d: "var(--learn-series-4)",
  e: "var(--learn-series-5)",
  f: "var(--learn-ink-strong)",
};

function iou(a: Box, b: Box): number {
  const ix1 = Math.max(a.x, b.x);
  const iy1 = Math.max(a.y, b.y);
  const ix2 = Math.min(a.x + a.w, b.x + b.w);
  const iy2 = Math.min(a.y + a.h, b.y + b.h);
  const interW = Math.max(0, ix2 - ix1);
  const interH = Math.max(0, iy2 - iy1);
  const intersection = interW * interH;
  const union = a.w * a.h + b.w * b.h - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** Standard greedy non-max suppression: highest confidence first, suppress
 *  anything whose IoU with an already-kept box clears the threshold. */
function runNms(boxes: readonly Box[], threshold: number): ReadonlySet<string> {
  const sorted = [...boxes].sort((x, y) => y.confidence - x.confidence);
  const kept: Box[] = [];
  for (const box of sorted) {
    const overlapsKept = kept.some((k) => iou(k, box) > threshold);
    if (!overlapsKept) kept.push(box);
  }
  return new Set(kept.map((b) => b.id));
}

export function NmsThreshold() {
  const [threshold, setThreshold] = useState(0.5);
  const sliderId = useId();
  const captionId = useId();
  const keptIds = useMemo(() => runNms(BOXES, threshold), [threshold]);
  const keptCount = keptIds.size;
  const secondObjectMerged = !keptIds.has("f");
  const duplicatesRemain = keptCount > 2;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Raise and lower the suppression threshold
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Five overlapping boxes around one object, and one separate box for a second object nearby.
        Solid boxes survive at this threshold; dashed, faded boxes were suppressed.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg viewBox="0 0 300 220" className="w-full min-w-[360px]" role="img" aria-labelledby={captionId}>
          <rect
            x={0}
            y={0}
            width={300}
            height={220}
            fill="var(--learn-chart-plot)"
            stroke="var(--learn-chart-grid)"
            strokeWidth={1}
          />
          {BOXES.map((box) => {
            const kept = keptIds.has(box.id);
            return (
              <g key={box.id} opacity={kept ? 1 : 0.4}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  fill="none"
                  stroke={BOX_COLOR[box.id]}
                  strokeWidth={kept ? 3 : 2}
                  strokeDasharray={kept ? undefined : "6 4"}
                />
                <text x={box.x + 6} y={box.y + 16} fontSize={11} fontWeight={600} fill={BOX_COLOR[box.id]}>
                  {box.confidence.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>
        <p id={captionId} className="sr-only">
          {keptCount} of {BOXES.length} boxes kept at an IoU suppression threshold of{" "}
          {threshold.toFixed(2)}.
        </p>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        IoU suppression threshold
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        className="mt-4 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        threshold {threshold.toFixed(2)} — {keptCount} box{keptCount === 1 ? "" : "es"} kept
      </p>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
        <p className="text-[14px] leading-[1.5] text-learn-strong">
          {secondObjectMerged
            ? "Low enough that the separate nearby object gets suppressed too — two objects collapse into one detection."
            : duplicatesRemain
              ? "High enough that several of the duplicate boxes survive — the same object is still reported more than once."
              : "A working range: the five duplicate boxes collapse to one, and the separate object nearby is left alone."}
        </p>
      </div>
    </figure>
  );
}
