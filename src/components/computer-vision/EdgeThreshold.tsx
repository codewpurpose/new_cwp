"use client";

/**
 * A tiny, fixed grayscale "photo" of a house — ten rows, ten columns, exactly
 * two brightness levels. There is no noise and no camera; the whole point is
 * that even here, the same simple gradient math produces a graded set of
 * edge strengths (0, 180, 360) rather than a single "this is an edge" fact.
 * The threshold decides which of those strengths count.
 */

import { useId, useMemo, useState } from "react";
import { formatCount } from "@/lib/ml/format";

const SIZE = 10;
const DARK = 30;
const BRIGHT = 210;
const MAX_MAGNITUDE = 2 * (BRIGHT - DARK);
const CELL = 20;
const VIEW = SIZE * CELL;

// 1 = house pixel, 0 = sky. A roof narrowing to an apex, over a plain body.
const HOUSE_MASK: readonly (readonly number[])[] = [
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

const GRID: readonly (readonly number[])[] = HOUSE_MASK.map((row) =>
  row.map((v) => (v ? BRIGHT : DARK)),
);

/** Sum of the absolute jump to the right neighbour and the one below. */
function gradientMagnitude(r: number, c: number): number {
  const here = GRID[r][c];
  const right = c + 1 < SIZE ? Math.abs(GRID[r][c + 1] - here) : 0;
  const down = r + 1 < SIZE ? Math.abs(GRID[r + 1][c] - here) : 0;
  return right + down;
}

const MAGNITUDES: readonly (readonly number[])[] = GRID.map((row, r) =>
  row.map((_, c) => gradientMagnitude(r, c)),
);

const PRESETS = [
  { key: "low", label: "Too low", threshold: 0 },
  { key: "mid", label: "About right", threshold: 190 },
  { key: "high", label: "Too high", threshold: 370 },
] as const;

export function EdgeThreshold() {
  const [threshold, setThreshold] = useState(90);
  const sliderId = useId();

  const edgeCount = useMemo(
    () => MAGNITUDES.reduce((sum, row) => sum + row.filter((m) => m > threshold).length, 0),
    [threshold],
  );

  const activePreset = PRESETS.find((p) => p.threshold === threshold);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the threshold
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        A ten-by-ten photo of a house, at exactly two brightness levels. Every cell below is
        marked once its gradient magnitude clears the threshold you set.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="w-full max-w-[320px]"
          role="img"
          aria-label={
            `House silhouette on a 10 by 10 grid. At a threshold of ${threshold}, ` +
            `${edgeCount} of 100 cells are marked as edges.`
          }
        >
          <rect x={0} y={0} width={VIEW} height={VIEW} fill="var(--learn-chart-plot)" />
          {GRID.map((row, r) =>
            row.map((value, c) => {
              const magnitude = MAGNITUDES[r][c];
              const isEdge = magnitude > threshold;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={c * CELL}
                    y={r * CELL}
                    width={CELL}
                    height={CELL}
                    fill={`rgb(${value},${value},${value})`}
                    stroke="var(--learn-chart-grid)"
                    strokeWidth={0.5}
                  />
                  {isEdge && (
                    <rect
                      x={c * CELL + 4}
                      y={r * CELL + 4}
                      width={CELL - 8}
                      height={CELL - 8}
                      fill="none"
                      stroke="var(--learn-accent)"
                      strokeWidth={2}
                      transform={`rotate(45 ${c * CELL + CELL / 2} ${r * CELL + CELL / 2})`}
                    />
                  )}
                </g>
              );
            }),
          )}
        </svg>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        Edge threshold
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_MAGNITUDE + 10}
        step={10}
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        className="mt-4 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        threshold {threshold} of a possible {MAX_MAGNITUDE}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setThreshold(preset.threshold)}
            aria-pressed={activePreset?.key === preset.key}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              activePreset?.key === preset.key
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-learn-strong">Cells marked as edges</h3>
          <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
            {formatCount(edgeCount)} / 100
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          At threshold 0, every cell that touches a brightness change counts, and the outline is
          continuous. Push the threshold past 180 and the single-step edges along the roofline
          drop out first, leaving only the sharpest corners. Past 360 nothing clears the bar at
          all.
        </p>
      </div>
    </figure>
  );
}
