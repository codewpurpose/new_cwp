"use client";

/**
 * A six-by-six grid with four regions, each carrying its own learned weight.
 * A fixed 2x2 bright square is the "shape" the model is scoring — its
 * position is either the original spot or the fixed one-cell-right shift,
 * never anything randomised. The score is a plain dot product: 1 for every
 * bright cell times the weight of the region it happens to sit in.
 */

import { useId, useMemo, useState } from "react";
import { formatSigned } from "@/lib/ml/format";
import { Strong } from "@/components/learn/primitives/LessonSection";

const SIZE = 6;
const CELL = 32;
const VIEW = SIZE * CELL;
const THRESHOLD = 3;

type RegionKey = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const REGIONS: readonly { key: RegionKey; label: string }[] = [
  { key: "topLeft", label: "Top left" },
  { key: "topRight", label: "Top right" },
  { key: "bottomLeft", label: "Bottom left" },
  { key: "bottomRight", label: "Bottom right" },
];

const DEFAULT_WEIGHTS: Record<RegionKey, number> = {
  topLeft: 2,
  topRight: -1,
  bottomLeft: 0.5,
  bottomRight: 1,
};

/** The fixed "on" square: rows 1-2, cols 1-2, entirely inside the top-left region. */
const ORIGINAL_CELLS: readonly (readonly [number, number])[] = [
  [1, 1],
  [1, 2],
  [2, 1],
  [2, 2],
];

/** The identical shape, moved one cell right: it now straddles two regions. */
const SHIFTED_CELLS: readonly (readonly [number, number])[] = [
  [1, 2],
  [1, 3],
  [2, 2],
  [2, 3],
];

function regionOf(row: number, col: number): RegionKey {
  if (row < 3) return col < 3 ? "topLeft" : "topRight";
  return col < 3 ? "bottomLeft" : "bottomRight";
}

export function PixelWeightDial() {
  const [weights, setWeights] = useState<Record<RegionKey, number>>(DEFAULT_WEIGHTS);
  const [shifted, setShifted] = useState(false);
  const ids = {
    topLeft: useId(),
    topRight: useId(),
    bottomLeft: useId(),
    bottomRight: useId(),
  };

  const onCells = shifted ? SHIFTED_CELLS : ORIGINAL_CELLS;
  const onSet = useMemo(() => new Set(onCells.map(([r, c]) => `${r}-${c}`)), [onCells]);

  const score = useMemo(
    () => onCells.reduce((sum, [r, c]) => sum + weights[regionOf(r, c)], 0),
    [onCells, weights],
  );
  const predicted = score >= THRESHOLD;

  function setWeight(key: RegionKey, value: number) {
    setWeights((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the weights, then shift the shape
      </figcaption>

      <div className="mt-5 grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="w-full max-w-[220px]"
          role="img"
          aria-label={
            `A 6 by 6 grid split into four regions. The bright shape sits ` +
            `${shifted ? "shifted one cell right, straddling two regions" : "entirely inside the top-left region"}. ` +
            `Current score ${score.toFixed(2)}, predicted ${predicted ? "yes" : "no"}.`
          }
        >
          {Array.from({ length: SIZE }, (_, r) =>
            Array.from({ length: SIZE }, (_, c) => {
              const isOn = onSet.has(`${r}-${c}`);
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * CELL}
                  y={r * CELL}
                  width={CELL}
                  height={CELL}
                  fill={isOn ? "var(--learn-accent)" : "var(--learn-chart-plot)"}
                  stroke="var(--learn-chart-grid)"
                  strokeWidth={0.5}
                />
              );
            }),
          )}
          {/* region dividers */}
          <line
            x1={VIEW / 2}
            y1={0}
            x2={VIEW / 2}
            y2={VIEW}
            stroke="var(--learn-ink-strong)"
            strokeWidth={2}
          />
          <line
            x1={0}
            y1={VIEW / 2}
            x2={VIEW}
            y2={VIEW / 2}
            stroke="var(--learn-ink-strong)"
            strokeWidth={2}
          />
        </svg>

        <div className="grid gap-4">
          {REGIONS.map((region) => (
            <div key={region.key}>
              <label
                htmlFor={ids[region.key]}
                className="flex items-baseline justify-between text-[13px] font-medium text-learn-strong"
              >
                <span>{region.label} weight</span>
                <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
                  {formatSigned(weights[region.key], 1)}
                </span>
              </label>
              <input
                id={ids[region.key]}
                type="range"
                min={-3}
                max={3}
                step={0.5}
                value={weights[region.key]}
                onChange={(event) => setWeight(region.key, Number(event.target.value))}
                className="mt-1 w-full accent-learn-accent"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShifted((prev) => !prev)}
        aria-pressed={shifted}
        className={`learn-focusable mt-5 rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
          shifted
            ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
            : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
        }`}
      >
        {shifted ? "Shifted one cell right — click to reset" : "Shift pattern one cell right"}
      </button>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-learn-strong">Score</h3>
          <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
            {score.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          Predicts <Strong>{predicted ? "yes" : "no"}</Strong> at a threshold of {THRESHOLD}.
          The shape has not changed at all — only which region its four bright cells happen to
          fall inside has.
        </p>
      </div>
    </figure>
  );
}
