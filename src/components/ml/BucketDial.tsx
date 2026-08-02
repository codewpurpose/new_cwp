"use client";

import { useId, useMemo, useState } from "react";
import {
  DELIVERIES,
  DELIVERY_COUNT,
  EXAMPLE_KM,
  MAX_BUCKETS,
  MAX_KM,
  MAX_MINUTES,
  MAX_STEP_MAE,
  MIN_BUCKETS,
  MIN_KM,
  MIN_MINUTES,
  predictMinutes,
  REGRESSION_MAE,
  stepAtBuckets,
  BUCKET_STEPS,
} from "@/lib/ml/classification-regression-data";
import { formatNumber, formatRatio } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 250;
const STRIP_A_TOP = 278;
const STRIP_A_BOTTOM = 308;
const STRIP_B_TOP = 320;
const STRIP_B_BOTTOM = 350;

const xKm = linearScale([MIN_KM, MAX_KM], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yMin = linearScale([MIN_MINUTES, MAX_MINUTES], [PLOT_BOTTOM, PLOT_TOP]);
const xBuckets = linearScale([MIN_BUCKETS, MAX_BUCKETS], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yAcc = linearScale([0, 1], [STRIP_A_BOTTOM, STRIP_A_TOP]);
const yMae = linearScale([0, MAX_STEP_MAE], [STRIP_B_BOTTOM, STRIP_B_TOP]);

const ACC_PATH = BUCKET_STEPS.map(
  (s, i) => `${i === 0 ? "M" : "L"}${xBuckets(s.buckets).toFixed(1)} ${yAcc(s.accuracy).toFixed(1)}`,
).join(" ");
const MAE_PATH = BUCKET_STEPS.map(
  (s, i) => `${i === 0 ? "M" : "L"}${xBuckets(s.buckets).toFixed(1)} ${yMae(s.mae).toFixed(1)}`,
).join(" ");

const PRESETS = [
  {
    key: "two",
    buckets: 2,
    label: "Fast or slow",
    note: "This is a classifier. It is right most of the time — and when it says “slow” it means somewhere in a half-hour window. The customer cannot use that.",
  },
  {
    key: "six",
    buckets: 6,
    label: "Six buckets",
    note: "Still a classifier, but the categories are starting to sound like numbers with extra steps.",
  },
  {
    key: "twenty",
    buckets: 20,
    label: "Twenty buckets",
    note: "Accuracy has collapsed and the model is the most useful it has ever been. This is the moment to stop comparing accuracy across differently-shaped questions.",
  },
] as const;

export function BucketDial() {
  const [buckets, setBuckets] = useState(2);
  const sliderId = useId();

  const step = useMemo(() => stepAtBuckets(buckets), [buckets]);
  const activePreset = PRESETS.find((p) => p.buckets === buckets);

  const centreOf = (i: number) => (step.edges[i] + step.edges[i + 1]) / 2;
  const bucketOf = (minutes: number) => {
    for (let i = 0; i < step.edges.length - 1; i += 1) {
      if (minutes < step.edges[i + 1]) return i;
    }
    return step.edges.length - 2;
  };

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Chop a number into categories
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        180 deliveries, plotted by distance against how long they took. One model throughout —
        only the shape of its answer changes. The bands are the categories; the step line is what
        the classifier actually says; rust dots are the ones it puts in the wrong band.
      </p>

      <div className="mt-5 overflow-x-auto">

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full min-w-[560px]"
        role="img"
        aria-label={
          `180 deliveries plotted by distance against time. Splitting delivery time into ` +
          `${buckets} categories ${formatNumber(step.width, 0)} minutes wide, the model names ` +
          `the right category for ${step.correctCount} of ${DELIVERY_COUNT} deliveries, ` +
          `${formatRatio(step.accuracy)} accuracy, and its answer is off by ` +
          `${formatNumber(step.mae, 1)} minutes on average. Reporting a plain number instead, ` +
          `the same model is off by ${formatNumber(REGRESSION_MAE, 1)} minutes.`
        }
      >
        {step.edges.slice(0, -1).map((edge, i) => (
          <rect
            key={i}
            x={PAD_LEFT}
            y={yMin(step.edges[i + 1])}
            width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
            height={Math.max(0, yMin(edge) - yMin(step.edges[i + 1]))}
            fill={i % 2 === 0 ? "var(--learn-chart-plot)" : "transparent"}
          />
        ))}

        {/* What the classifier says: the centre of the predicted bucket at each x */}
        <path
          d={Array.from({ length: 90 }, (_, i) => {
            const km = MIN_KM + ((MAX_KM - MIN_KM) * i) / 89;
            const y = yMin(centreOf(bucketOf(predictMinutes(km))));
            return `${i === 0 ? "M" : "L"}${xKm(km).toFixed(1)} ${y.toFixed(1)}`;
          }).join(" ")}
          fill="none"
          stroke="var(--learn-series-4)"
          strokeWidth={2}
        />

        {/* The same model as a plain number */}
        <line
          x1={xKm(MIN_KM)}
          y1={yMin(predictMinutes(MIN_KM))}
          x2={xKm(MAX_KM)}
          y2={yMin(predictMinutes(MAX_KM))}
          stroke="var(--learn-chart-model)"
          strokeWidth={2}
        />

        {DELIVERIES.map((d, i) => {
          const right = bucketOf(predictMinutes(d.x)) === bucketOf(d.y);
          return (
            <circle
              key={i}
              cx={xKm(d.x)}
              cy={yMin(d.y)}
              r={2.6}
              fill={right ? "var(--learn-chart-muted-mark)" : "var(--learn-chart-error)"}
            />
          );
        })}

        <line
          x1={PAD_LEFT}
          y1={PLOT_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={PLOT_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {[2, 5, 8, 11, 14].map((km) => (
          <text
            key={km}
            x={xKm(km)}
            y={PLOT_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {km}km
          </text>
        ))}
        <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          mins
        </text>

        {/* Two stacked strips — never overlaid, the scales are unrelated */}
        <path d={ACC_PATH} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} />
        <path d={MAE_PATH} fill="none" stroke="var(--learn-series-2)" strokeWidth={2} />
        <circle cx={xBuckets(buckets)} cy={yAcc(step.accuracy)} r={4} fill="var(--learn-series-1)" />
        <circle cx={xBuckets(buckets)} cy={yMae(step.mae)} r={4} fill="var(--learn-series-2)" />
        <text x={6} y={STRIP_A_TOP + 12} fontSize={12} fill="var(--learn-series-1)">
          acc
        </text>
        <text x={6} y={STRIP_B_TOP + 12} fontSize={12} fill="var(--learn-series-2)">
          miss
        </text>
      </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-series-4" />
          what the classifier says
        </li>
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-strong" />
          the same model as a plain number
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-chart-error" />
          wrong category
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Number of categories to split delivery time into
      </label>
      <input
        id={sliderId}
        type="range"
        min={MIN_BUCKETS}
        max={MAX_BUCKETS}
        step={1}
        value={buckets}
        onChange={(event) => setBuckets(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {buckets} categories, each {formatNumber(step.width, 0)} minutes wide
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setBuckets(preset.buckets)}
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
            <h3 className="text-[15px] font-semibold text-learn-series-1">Accuracy</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatRatio(step.accuracy)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            {step.correctCount} of {DELIVERY_COUNT} landed in the named category
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-2">Average miss</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(step.mae, 1)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            plain number instead: {formatNumber(REGRESSION_MAE, 1)} minutes off
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5 md:col-span-2">
          <h3 className="text-[15px] font-semibold text-learn-strong">
            What the model says about a {EXAMPLE_KM} km delivery
          </h3>
          <ul className="mt-3 space-y-1.5 text-[14px] leading-[1.5] text-learn-muted">
            <li>
              as 2 categories →{" "}
              <strong className="text-learn-strong">
                &ldquo;{stepAtBuckets(2).exampleLabel}&rdquo;
              </strong>{" "}
              ({formatNumber(stepAtBuckets(2).exampleRange[0], 0)}–
              {formatNumber(stepAtBuckets(2).exampleRange[1], 0)} minutes)
            </li>
            <li>
              as 20 categories →{" "}
              <strong className="text-learn-strong">
                &ldquo;{stepAtBuckets(20).exampleLabel}&rdquo;
              </strong>
            </li>
            <li>
              as a plain number →{" "}
              <strong className="text-learn-strong">
                {formatNumber(predictMinutes(EXAMPLE_KM), 1)} minutes
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </figure>
  );
}
