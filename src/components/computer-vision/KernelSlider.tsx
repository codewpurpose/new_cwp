"use client";

import { useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatNumber } from "@/lib/ml/format";

/**
 * A fixed 8×8 grayscale grid, hard-coded as a literal array. Left block sits
 * in shadow, right block is lit, with one bright and one dark single-pixel
 * anomaly so blur and sharpen visibly do different things to them.
 */
const INPUT: readonly (readonly number[])[] = [
  [60, 60, 60, 60, 200, 200, 200, 200],
  [60, 60, 60, 60, 200, 200, 200, 200],
  [60, 60, 60, 60, 200, 200, 200, 200],
  [60, 60, 60, 255, 200, 200, 200, 200],
  [60, 60, 60, 60, 200, 200, 200, 200],
  [60, 60, 60, 60, 200, 0, 200, 200],
  [60, 60, 60, 60, 200, 200, 200, 200],
  [60, 60, 60, 60, 200, 200, 200, 200],
];

const INPUT_SIZE = INPUT.length;
const KERNEL_SIZE = 3;
const OUTPUT_SIZE = INPUT_SIZE - KERNEL_SIZE + 1;

type PresetKey = "blur" | "sharpen" | "identity";

const PRESETS: Record<PresetKey, { label: string; weights: readonly (readonly number[])[]; note: string }> = {
  blur: {
    label: "Blur",
    weights: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
    note: "Every neighbour counts equally. A single bright or dark pixel gets diluted into the average around it.",
  },
  sharpen: {
    label: "Sharpen",
    weights: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    note: "The centre is boosted, its four neighbours are subtracted. A single stray pixel is exaggerated, not smoothed away.",
  },
  identity: {
    label: "Identity",
    weights: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    note: "Only the centre counts, and it counts exactly once. The output equals the input — the kernel that does nothing.",
  },
};

const INPUT_CELL = 30;
const INPUT_VIEW = INPUT_SIZE * INPUT_CELL;
const OUTPUT_CELL = 30;
const OUTPUT_VIEW = OUTPUT_SIZE * OUTPUT_CELL;

function grayFill(value: number): string {
  const clamped = Math.max(0, Math.min(255, Math.round(value)));
  return `rgb(${clamped}, ${clamped}, ${clamped})`;
}

function positionAt(index: number): { row: number; col: number } {
  return { row: Math.floor(index / OUTPUT_SIZE), col: index % OUTPUT_SIZE };
}

function convolveAt(weights: readonly (readonly number[])[], row: number, col: number): number {
  let sum = 0;
  for (let i = 0; i < KERNEL_SIZE; i += 1) {
    for (let j = 0; j < KERNEL_SIZE; j += 1) {
      sum += weights[i][j] * INPUT[row + i][col + j];
    }
  }
  return sum;
}

export function KernelSlider() {
  const [preset, setPreset] = useState<PresetKey>("blur");
  const [index, setIndex] = useState(0);

  const { weights, note } = PRESETS[preset];
  const totalPositions = OUTPUT_SIZE * OUTPUT_SIZE;
  const { row, col } = positionAt(index);

  const terms = useMemo(() => {
    const list: { weight: number; value: number }[] = [];
    for (let i = 0; i < KERNEL_SIZE; i += 1) {
      for (let j = 0; j < KERNEL_SIZE; j += 1) {
        const weight = weights[i][j];
        if (weight !== 0) list.push({ weight, value: INPUT[row + i][col + j] });
      }
    }
    return list;
  }, [weights, row, col]);

  const currentOutput = terms.reduce((sum, term) => sum + term.weight * term.value, 0);

  const computed = useMemo(() => {
    const values: (number | null)[] = new Array(totalPositions).fill(null);
    for (let i = 0; i <= index; i += 1) {
      const position = positionAt(i);
      values[i] = convolveAt(weights, position.row, position.col);
    }
    return values;
  }, [weights, index, totalPositions]);

  function handlePreset(next: PresetKey) {
    setPreset(next);
    setIndex(0);
  }

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Step the kernel across the grid
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The highlighted 3×3 window is the only part of the input the kernel can see right now.
        Step forward and it slides one position at a time, left to right, then down a row.
      </p>

      <div className="mt-3">
        <SegmentedControl
          label="Kernel preset"
          options={[
            { value: "blur", label: "Blur" },
            { value: "sharpen", label: "Sharpen" },
            { value: "identity", label: "Identity" },
          ]}
          value={preset}
          onValueChange={handlePreset}
        />
      </div>
      <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">{note}</p>

      <div className="mt-5 flex flex-col items-start gap-6 md:flex-row">
        <div className="overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-3">
          <p className="mb-2 text-center text-[11px] uppercase tracking-[0.06em] text-learn-muted">
            input, 8 × 8
          </p>
          <svg
            viewBox={`0 0 ${INPUT_VIEW} ${INPUT_VIEW}`}
            className="w-full max-w-[240px]"
            role="img"
            aria-label={`Input grid with the 3 by 3 window at row ${row + 1}, column ${col + 1} highlighted.`}
          >
            {INPUT.map((r, ri) =>
              r.map((value, ci) => (
                <rect
                  key={`${ri}-${ci}`}
                  x={ci * INPUT_CELL}
                  y={ri * INPUT_CELL}
                  width={INPUT_CELL}
                  height={INPUT_CELL}
                  fill={grayFill(value)}
                  stroke="var(--learn-chart-axis)"
                  strokeWidth={0.5}
                />
              )),
            )}
            <rect
              x={col * INPUT_CELL}
              y={row * INPUT_CELL}
              width={KERNEL_SIZE * INPUT_CELL}
              height={KERNEL_SIZE * INPUT_CELL}
              fill="none"
              stroke="var(--learn-accent-text)"
              strokeWidth={3}
            />
          </svg>
        </div>

        <div className="overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-3">
          <p className="mb-2 text-center text-[11px] uppercase tracking-[0.06em] text-learn-muted">
            output, {OUTPUT_SIZE} × {OUTPUT_SIZE}
          </p>
          <svg
            viewBox={`0 0 ${OUTPUT_VIEW} ${OUTPUT_VIEW}`}
            className="w-full max-w-[180px]"
            role="img"
            aria-label="Output grid, filled in one cell at a time as the kernel steps across the input."
          >
            {Array.from({ length: OUTPUT_SIZE }, (_, ri) =>
              Array.from({ length: OUTPUT_SIZE }, (_, ci) => {
                const cellIndex = ri * OUTPUT_SIZE + ci;
                const value = computed[cellIndex];
                const isCurrent = cellIndex === index;
                return (
                  <rect
                    key={`${ri}-${ci}`}
                    x={ci * OUTPUT_CELL}
                    y={ri * OUTPUT_CELL}
                    width={OUTPUT_CELL}
                    height={OUTPUT_CELL}
                    fill={value === null ? "var(--learn-sunken)" : grayFill(value)}
                    stroke={isCurrent ? "var(--learn-accent-text)" : "var(--learn-chart-axis)"}
                    strokeWidth={isCurrent ? 3 : 0.5}
                    strokeDasharray={value === null ? "3 2" : undefined}
                  />
                );
              }),
            )}
          </svg>
        </div>
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="text-[13px] uppercase tracking-[0.06em] text-learn-muted">
          Position {index + 1} of {totalPositions} — multiply, then sum
        </p>
        <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.6] text-learn-strong">
          {terms
            .map((term) => `${formatNumber(term.weight, 2)} × ${term.value}`)
            .join(" + ")}{" "}
          = <span className="font-semibold">{formatNumber(currentOutput, 1)}</span>
        </p>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          That single number becomes one cell of the output grid — the one outlined in green
          above.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          &larr; Previous position
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(totalPositions - 1, i + 1))}
          disabled={index === totalPositions - 1}
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next position &rarr;
        </button>
      </div>
    </figure>
  );
}
