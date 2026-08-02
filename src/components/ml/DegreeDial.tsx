"use client";

import { useId, useState } from "react";
import {
  BEST_TEST_DEGREE,
  DEGREE_STEPS,
  ERROR_CEILING,
  MAX_DEGREE,
  TEST_STUDENTS,
  TRAIN_STUDENTS,
} from "@/lib/ml/overfitting-data";
import { MAX_HOURS, MAX_SCORE, trueCurve } from "@/lib/ml/practice-data";
import { formatNumber } from "@/lib/ml/format";
import { clamp, linspace } from "@/lib/ml/numeric";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 250;
const STRIP_TOP = 285;
const STRIP_BOTTOM = 350;

const xHours = linearScale([0, MAX_HOURS], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yScore = linearScale([0, MAX_SCORE], [PLOT_BOTTOM, PLOT_TOP]);
const xDegree = linearScale([0, MAX_DEGREE], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yError = linearScale([0, ERROR_CEILING], [STRIP_BOTTOM, STRIP_TOP]);

const TRUTH_PATH = linspace(0, MAX_HOURS, 120)
  .map((x, i) => `${i === 0 ? "M" : "L"}${xHours(x).toFixed(1)} ${yScore(trueCurve(x)).toFixed(1)}`)
  .join(" ");

function errorPath(pick: (d: number) => number | null): string {
  return DEGREE_STEPS.map((step, i) => {
    const value = pick(step.degree);
    const y = yError(clamp(value ?? ERROR_CEILING, 0, ERROR_CEILING));
    return `${i === 0 ? "M" : "L"}${xDegree(step.degree).toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const TRAIN_PATH = errorPath((d) => DEGREE_STEPS[d].trainMae);
const TEST_PATH = errorPath((d) => DEGREE_STEPS[d].testMae);

const PRESETS = [
  {
    key: "flat",
    degree: 0,
    label: "Guess the average",
    note: "A flat line. The model has learned exactly one thing — the average score — and applies it to everyone. This is underfitting in its purest form.",
  },
  {
    key: "best",
    degree: BEST_TEST_DEGREE,
    label: "About right",
    note: "The lowest error on students it has never seen. Notice it does not pass exactly through a single training dot, and that is fine.",
  },
  {
    key: "memorised",
    degree: MAX_DEGREE,
    label: "Memorised",
    note: "The curve now bends through the training dots and its error on them is tiny. On students it has not seen, it is off by more than it was at degree zero. It learned the class, not the subject.",
  },
] as const;

export function DegreeDial() {
  const [degree, setDegree] = useState(BEST_TEST_DEGREE);
  const sliderId = useId();

  const step = DEGREE_STEPS[degree];
  const activePreset = PRESETS.find((p) => p.degree === degree);

  const curvePath = step.curve
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${xHours(p.x).toFixed(1)} ${yScore(clamp(p.y, -40, 140)).toFixed(1)}`,
    )
    .join(" ");

  const offScale = step.predictionAtZero !== null && (step.predictionAtZero < 0 || step.predictionAtZero > 100);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Add bends until it breaks
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Sixty students: hours practised against test score. The model only gets to see the
        fourteen filled dots; the forty-six hollow ones are held back. Below, the error on each
        group at every complexity you could have chosen.
      </p>

      <div className="mt-5 overflow-x-auto">

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full min-w-[560px]"
        role="img"
        aria-label={
          `Practice hours against test score for 60 students. A curve with ${degree} ` +
          `bends fitted to 14 training students misses them by ` +
          `${formatNumber(step.trainMae, 1)} points on average, and misses the 46 held-back ` +
          `students by ${formatNumber(step.testMae, 1)} points.`
        }
      >
        {/* Non-negotiable: at degree 12 the curve leaves the plot entirely. */}
        <clipPath id="degree-dial-plot">
          <rect
            x={PAD_LEFT}
            y={PLOT_TOP}
            width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
            height={PLOT_BOTTOM - PLOT_TOP}
          />
        </clipPath>

        <rect
          x={PAD_LEFT}
          y={PLOT_TOP}
          width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
          height={PLOT_BOTTOM - PLOT_TOP}
          fill="var(--learn-chart-plot)"
        />

        <g clipPath="url(#degree-dial-plot)">
          <path
            d={TRUTH_PATH}
            fill="none"
            stroke="var(--learn-chart-truth)"
            strokeWidth={1.5}
            strokeDasharray="6 5"
          />
          <path d={curvePath} fill="none" stroke="var(--learn-chart-model)" strokeWidth={2.5} />

          {TEST_STUDENTS.map((s, i) => (
            <circle
              key={`te${i}`}
              cx={xHours(s.x)}
              cy={yScore(s.y)}
              r={3.2}
              fill="none"
              stroke="var(--learn-chart-test)"
              strokeWidth={1.2}
            />
          ))}
          {TRAIN_STUDENTS.map((s, i) => (
            <circle
              key={`tr${i}`}
              cx={xHours(s.x)}
              cy={yScore(s.y)}
              r={4}
              fill="var(--learn-chart-train)"
              stroke="var(--learn-surface)"
              strokeWidth={1}
            />
          ))}
        </g>

        <line
          x1={PAD_LEFT}
          y1={PLOT_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={PLOT_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {[0, 5, 10, 15, 20].map((h) => (
          <text
            key={h}
            x={xHours(h)}
            y={PLOT_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {h}
          </text>
        ))}
        <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          score
        </text>

        {/* Error strip */}
        <line
          x1={PAD_LEFT}
          y1={STRIP_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={STRIP_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        <path d={TRAIN_PATH} fill="none" stroke="var(--learn-chart-train)" strokeWidth={2} />
        <path d={TEST_PATH} fill="none" stroke="var(--learn-chart-test)" strokeWidth={2} />
        {DEGREE_STEPS.map((s) => (
          <g key={s.degree}>
            <circle
              cx={xDegree(s.degree)}
              cy={yError(clamp(s.trainMae ?? 0, 0, ERROR_CEILING))}
              r={2.5}
              fill="var(--learn-chart-train)"
            />
            <circle
              cx={xDegree(s.degree)}
              cy={yError(clamp(s.testMae ?? ERROR_CEILING, 0, ERROR_CEILING))}
              r={2.5}
              fill="var(--learn-chart-test)"
            />
          </g>
        ))}
        <line
          x1={xDegree(degree)}
          y1={STRIP_TOP - 6}
          x2={xDegree(degree)}
          y2={STRIP_BOTTOM}
          stroke="var(--learn-ink)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <text x={6} y={STRIP_TOP + 4} fontSize={12} fill="var(--learn-ink-muted)">
          error
        </text>
      </svg>
      </div>

      {/* Legend as HTML so it scales with the reader's font size */}
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          14 students it learns from
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-learn-series-3" />
          46 held back
        </li>
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-chart-error opacity-60" />
          the real pattern, which the model never sees
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        How many bends the curve is allowed
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_DEGREE}
        step={1}
        value={degree}
        onChange={(event) => setDegree(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {degree === 0 ? "no bends — a flat line" : `${degree} bend${degree === 1 ? "" : "s"} allowed`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setDegree(preset.degree)}
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
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-1">Training error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.trainMae, 1)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            over the 14 students it studied
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-3">Test error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.testMae, 1)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            over the 46 it has never seen
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">The gap</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.gap, 1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            The gap between these two numbers <em>is</em> overfitting. It has no other
            definition. Numbers the model had to learn: {step.parameters}.
          </p>
          {offScale && (
            <p className="mt-2 text-[13px] leading-[1.5] text-learn-chart-error">
              At zero hours of practice this curve predicts{" "}
              <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
                {formatNumber(step.predictionAtZero, 0)}
              </span>{" "}
              points — and the test is out of 100.
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}
