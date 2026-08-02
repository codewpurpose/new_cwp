"use client";

import { useId, useMemo, useState } from "react";
import { STUDENT_COUNT } from "@/lib/ml/practice-data";
import {
  CLAIM_BAR,
  firstAssignment,
  JITTER,
  MAX_ERROR,
  MAX_TEST_PERCENT,
  MIN_TEST_PERCENT,
  REPLICATE_COUNT,
  SPLIT_STEPS,
  stepAt,
} from "@/lib/ml/train-test-split-data";
import { formatNumber } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 340;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;
const STRIP_TOP = 18;
const STRIP_HEIGHT = 16;
const PLOT_TOP = 62;
const PLOT_BOTTOM = 310;

const xPercent = linearScale(
  [MIN_TEST_PERCENT, MAX_TEST_PERCENT],
  [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT],
);
const yError = linearScale([0, MAX_ERROR * 1.05], [PLOT_BOTTOM, PLOT_TOP]);

function envelope(pick: (s: (typeof SPLIT_STEPS)[number]) => readonly number[]): string {
  const top = SPLIT_STEPS.map(
    (s, i) => `${i === 0 ? "M" : "L"}${xPercent(s.testPercent).toFixed(1)} ${yError(Math.max(...pick(s))).toFixed(1)}`,
  ).join(" ");
  const bottom = SPLIT_STEPS.slice()
    .reverse()
    .map((s) => `L${xPercent(s.testPercent).toFixed(1)} ${yError(Math.min(...pick(s))).toFixed(1)}`)
    .join(" ");
  return `${top} ${bottom} Z`;
}

function medianPath(pick: (s: (typeof SPLIT_STEPS)[number]) => number): string {
  return SPLIT_STEPS.map(
    (s, i) => `${i === 0 ? "M" : "L"}${xPercent(s.testPercent).toFixed(1)} ${yError(pick(s)).toFixed(1)}`,
  ).join(" ");
}

const TEST_BAND = envelope((s) => s.testErrors);
const TRAIN_BAND = envelope((s) => s.trainErrors);
const TEST_MEDIAN = medianPath((s) => s.testMedian);
const TRAIN_MEDIAN = medianPath((s) => s.trainMedian);

const PRESETS = [
  {
    key: "ten",
    percent: 10,
    label: "Hold back 10%",
    note: "Six students in the test set. The score you would report swings across a wide range depending only on which six — and you run this once, so you would never find out which you got.",
  },
  {
    key: "thirty",
    percent: 30,
    label: "Hold back 30%",
    note: "Eighteen students. The spread has roughly halved. This is about where people land in practice, and now you can see why.",
  },
  {
    key: "seventy",
    percent: 70,
    label: "Hold back 70%",
    note: "The estimate is now steady. Notice the model itself has barely suffered — a simple model needs very few examples, which is a hint about the next lesson.",
  },
] as const;

export function SplitLottery() {
  const [percent, setPercent] = useState(10);
  const sliderId = useId();

  const step = useMemo(() => stepAt(percent), [percent]);
  const assignment = useMemo(() => firstAssignment(percent), [percent]);
  const activePreset = PRESETS.find((p) => p.percent === percent);

  const squareWidth = (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / STUDENT_COUNT;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Re-roll the split
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The strip at the top is the sixty students, coloured by whether this particular shuffle
        held them back. Below, the error you would have reported — the band covers every one of{" "}
        {REPLICATE_COUNT} different shuffles, and the dots are the individual tickets you could
        have drawn.
      </p>

      <div className="mt-5 overflow-x-auto">

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full min-w-[560px]"
        role="img"
        aria-label={
          `Average error plotted against test-set size. Holding back ${percent} percent ` +
          `leaves ${step.trainCount} students to train on and ${step.testCount} to test on. ` +
          `Across ${REPLICATE_COUNT} different random shuffles the test error ranges from ` +
          `${formatNumber(step.testBest, 1)} to ${formatNumber(step.testWorst, 1)} points, a ` +
          `spread of ${formatNumber(step.testSpread, 1)}. The training error is ` +
          `${formatNumber(step.trainMedian, 1)} points.`
        }
      >
        {assignment.map((isTest, i) => (
          <rect
            key={i}
            x={PAD_LEFT + i * squareWidth}
            y={STRIP_TOP}
            width={Math.max(1, squareWidth - 1.5)}
            height={STRIP_HEIGHT}
            rx={1.5}
            fill={isTest ? "var(--learn-chart-test)" : "var(--learn-chart-train)"}
          />
        ))}

        <path d={TRAIN_BAND} fill="var(--learn-chart-highlight)" />
        <path d={TEST_BAND} fill="var(--learn-chart-band)" />
        <path d={TRAIN_MEDIAN} fill="none" stroke="var(--learn-chart-train)" strokeWidth={1.5} />
        <path d={TEST_MEDIAN} fill="none" stroke="var(--learn-chart-test)" strokeWidth={2} />

        <line
          x1={xPercent(percent)}
          y1={PLOT_TOP}
          x2={xPercent(percent)}
          y2={PLOT_BOTTOM}
          stroke="var(--learn-ink)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {step.testErrors.map((e, i) => (
          <circle
            key={i}
            cx={xPercent(percent) + JITTER[i] * 7}
            cy={yError(e)}
            r={3}
            fill="var(--learn-chart-test)"
            opacity={0.85}
          />
        ))}

        <line
          x1={PAD_LEFT}
          y1={PLOT_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={PLOT_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {[5, 20, 40, 60, 80].map((p) => (
          <text
            key={p}
            x={xPercent(p)}
            y={PLOT_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {p}%
          </text>
        ))}
        <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          error
        </text>
      </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[2px] bg-learn-series-1" />
          trained on
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[2px] bg-learn-series-3" />
          held back
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Percentage of students held back for testing
      </label>
      <input
        id={sliderId}
        type="range"
        min={MIN_TEST_PERCENT}
        max={MAX_TEST_PERCENT}
        step={1}
        value={percent}
        onChange={(event) => setPercent(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        holding back {percent}% — {step.trainCount} to learn from, {step.testCount} to test on
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setPercent(preset.percent)}
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

      {activePreset && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{activePreset.note}</p>
      )}

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">
              If you had shuffled differently
            </h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.testSpread, 1)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            worst {formatNumber(step.testWorst, 1)} − best {formatNumber(step.testBest, 1)} ={" "}
            {formatNumber(step.testSpread, 1)} points, across {REPLICATE_COUNT} shuffles of the
            same {STUDENT_COUNT} students
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            You run this once. Whichever ticket you drew is the number you would have written
            down and believed.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-1">Training error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.trainMedian, 1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Lower than the test score — the model flattering itself on work it has already seen.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">
              Shuffles under {CLAIM_BAR} points
            </h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {step.underBarCount}/{REPLICATE_COUNT}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            How many shuffles would have let you claim you beat {CLAIM_BAR} points. With a small
            test set that is luck, not skill.
          </p>
        </div>
      </div>
    </figure>
  );
}
