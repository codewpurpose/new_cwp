"use client";

import { useId, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatPercent } from "@/lib/ml/format";
import {
  BEST_PRUNED,
  DISTANCE_RANGE,
  type Flat,
  FOREST_STEPS,
  GRID_COLUMNS,
  GRID_ROWS,
  RENT_RANGE,
  SINGLE_TEST,
  TEST,
  TRAIN,
  TREE_STEPS,
  TRUE_THRESHOLD,
} from "@/lib/ml/forest-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 430;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PLOT_TOP = 16;
const PLOT_BOTTOM = 288;

const xRent = linearScale([RENT_RANGE[0], RENT_RANGE[1]], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yDistance = linearScale([DISTANCE_RANGE[0], DISTANCE_RANGE[1]], [PLOT_TOP, PLOT_BOTTOM]);

const CELL_W = (VIEW_WIDTH - PAD_RIGHT - PAD_LEFT) / GRID_COLUMNS;
const CELL_H = (PLOT_BOTTOM - PLOT_TOP) / GRID_ROWS;

const STRIP_TOP = 340;
const STRIP_BOTTOM = 410;
const xStep = linearScale([0, TREE_STEPS.length - 1], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yAccuracy = linearScale([0.65, 0.88], [STRIP_BOTTOM, STRIP_TOP]);

const FOREST_PATH = FOREST_STEPS.map(
  (s, i) => `${i === 0 ? "M" : "L"}${xStep(i).toFixed(1)} ${yAccuracy(s.testAccuracy).toFixed(1)}`,
).join(" ");

/** The real boundary: rent + 62 x distance = 900. */
const TRUTH_LINE = {
  x1: xRent(TRUE_THRESHOLD),
  y1: yDistance(0),
  x2: xRent(TRUE_THRESHOLD - 62 * DISTANCE_RANGE[1]),
  y2: yDistance(DISTANCE_RANGE[1]),
};

type Which = "train" | "test";

function Mark({ flat, radius }: { flat: Flat; radius: number }) {
  const x = xRent(flat.rent);
  const y = yDistance(flat.distance);
  if (flat.letFast) {
    return <circle cx={x} cy={y} r={radius} fill="var(--learn-series-1)" />;
  }
  return (
    <rect
      x={x - radius * 0.85}
      y={y - radius * 0.85}
      width={radius * 1.7}
      height={radius * 1.7}
      fill="none"
      stroke="var(--learn-series-3)"
      strokeWidth={1.3}
    />
  );
}

export function ForestVote() {
  const [stepIndex, setStepIndex] = useState(0);
  const [which, setWhich] = useState<Which>("test");
  const sliderId = useId();

  const step = FOREST_STEPS[stepIndex];
  const shown = which === "train" ? TRAIN : TEST;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Add trees one at a time
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The shading is the share of trees voting &ldquo;lets within a week&rdquo; — solid where
        they agree, washed out where they are split. The dashed line is the real boundary, which
        no tree can draw because it runs diagonally and every tree cuts straight.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Rent against distance from campus. With ${step.trees} ` +
            `${step.trees === 1 ? "tree" : "trees"} the forest scores ` +
            `${formatPercent(step.testAccuracy)} on the 200 held-back flats, against ` +
            `${formatPercent(SINGLE_TEST)} for one unrestricted tree and ` +
            `${formatPercent(BEST_PRUNED.test)} for the best pruned single tree.`
          }
        >
          <rect
            x={PAD_LEFT}
            y={PLOT_TOP}
            width={VIEW_WIDTH - PAD_RIGHT - PAD_LEFT}
            height={PLOT_BOTTOM - PLOT_TOP}
            fill="var(--learn-chart-plot)"
          />
          {step.grid.map((share, i) => {
            if (share <= 0.02) return null;
            const col = i % GRID_COLUMNS;
            const row = Math.floor(i / GRID_COLUMNS);
            return (
              <rect
                key={i}
                x={PAD_LEFT + col * CELL_W}
                y={PLOT_TOP + row * CELL_H}
                width={CELL_W + 0.5}
                height={CELL_H + 0.5}
                fill="var(--learn-chart-highlight)"
                opacity={share}
              />
            );
          })}

          <line
            x1={TRUTH_LINE.x1}
            y1={TRUTH_LINE.y1}
            x2={TRUTH_LINE.x2}
            y2={TRUTH_LINE.y2}
            stroke="var(--learn-chart-truth)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />

          {shown.map((flat, i) => (
            <Mark key={i} flat={flat} radius={which === "train" ? 4.2 : 3} />
          ))}

          <line
            x1={PAD_LEFT}
            y1={PLOT_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {[300, 600, 900, 1200].map((r) => (
            <text
              key={r}
              x={xRent(r)}
              y={PLOT_BOTTOM + 15}
              textAnchor="middle"
              fontSize={12}
              fill="var(--learn-ink-subtle)"
            >
              £{r}
            </text>
          ))}
          <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
            0 km
          </text>
          <text x={6} y={PLOT_BOTTOM - 4} fontSize={12} fill="var(--learn-ink-muted)">
            8 km
          </text>

          <text x={PAD_LEFT} y={STRIP_TOP - 8} fontSize={11} fill="var(--learn-ink-muted)">
            held-back accuracy as trees are added
          </text>
          <line
            x1={PAD_LEFT}
            y1={yAccuracy(SINGLE_TEST)}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={yAccuracy(SINGLE_TEST)}
            stroke="var(--learn-chart-error)"
            strokeWidth={1.4}
            strokeDasharray="4 4"
          />
          <text
            x={VIEW_WIDTH - PAD_RIGHT}
            y={yAccuracy(SINGLE_TEST) - 5}
            textAnchor="end"
            fontSize={10}
            fill="var(--learn-ink-subtle)"
          >
            one unrestricted tree
          </text>
          <path d={FOREST_PATH} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} />
          <circle
            cx={xStep(stepIndex)}
            cy={yAccuracy(step.testAccuracy)}
            r={4}
            fill="var(--learn-ink)"
          />
          {TREE_STEPS.map((count, i) => (
            <text
              key={count}
              x={xStep(i)}
              y={STRIP_BOTTOM + 14}
              textAnchor="middle"
              fontSize={11}
              fill={i === stepIndex ? "var(--learn-ink)" : "var(--learn-ink-subtle)"}
            >
              {count}
            </text>
          ))}
        </svg>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        How many trees vote
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={TREE_STEPS.length - 1}
        step={1}
        value={stepIndex}
        onChange={(event) => setStepIndex(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {step.trees} {step.trees === 1 ? "tree" : "trees"} voting
      </p>

      <SegmentedControl
        className="mt-4"
        label="Which flats to show"
        value={which}
        onValueChange={setWhich}
        options={[
          { value: "train", label: "The 50 it learned from" },
          { value: "test", label: "The 200 held back" },
        ]}
      />

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-1">The forest</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(step.testAccuracy)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            On the 200 flats no tree in it has ever seen.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">One tree, unpruned</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(SINGLE_TEST)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Perfect on all fifty it learned from. That is the problem.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">One tree, pruned well</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(BEST_PRUNED.test)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            The best any single depth manages here, found by trying all fourteen.
          </p>
        </div>
      </div>
    </figure>
  );
}
