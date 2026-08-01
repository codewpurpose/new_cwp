"use client";

import { useId, useMemo, useState } from "react";
import {
  BEST_F1_THRESHOLD,
  BIN_COUNT,
  HISTOGRAM,
  MAX_BIN_NEGATIVES,
  MAX_BIN_POSITIVES,
  metricsAt,
  TOTAL_NEGATIVES,
  TOTAL_POSITIVES,
} from "@/lib/ml/precision-recall-data";

/** One colour per outcome, reused by the chart, the matrix, and the legend. */
const OUTCOME = {
  truePositive: { fill: "var(--learn-outcome-tp)", label: "True positive", short: "TP" },
  falseNegative: { fill: "var(--learn-outcome-fn)", label: "False negative", short: "FN" },
  falsePositive: { fill: "var(--learn-outcome-fp)", label: "False positive", short: "FP" },
  trueNegative: { fill: "var(--learn-outcome-tn)", label: "True negative", short: "TN" },
} as const;

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 300;
const PAD_LEFT = 52;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const AXIS_Y = PAD_TOP + (VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM) / 2;
const HALF_HEIGHT = AXIS_Y - PAD_TOP;

const PRESETS = [
  {
    key: "catch-everything",
    label: "Catch everything",
    threshold: 0,
    note: "Flag every case. Recall is perfect and precision collapses.",
  },
  {
    key: "balanced",
    label: "Balanced",
    threshold: BEST_F1_THRESHOLD,
    note: "The threshold with the highest F1 — the best compromise available.",
  },
  {
    key: "only-when-certain",
    label: "Only when certain",
    threshold: 0.95,
    note: "Flag almost nothing. Precision is perfect and almost everything real is missed.",
  },
] as const;

function xFor(score: number): number {
  return PAD_LEFT + score * PLOT_WIDTH;
}

function formatMetric(value: number | null): string {
  return value === null ? "—" : value.toFixed(2);
}

interface MetricBarProps {
  name: string;
  value: number | null;
  numerator: number;
  denominatorParts: readonly [number, number];
  denominatorLabels: readonly [string, string];
  question: string;
}

function MetricBar({
  name,
  value,
  numerator,
  denominatorParts,
  denominatorLabels,
  question,
}: MetricBarProps) {
  const denominator = denominatorParts[0] + denominatorParts[1];

  return (
    <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-learn-strong">{name}</h3>
        <span className="font-mono text-[20px] leading-none text-learn-strong tabular-nums">
          {formatMetric(value)}
        </span>
      </div>

      <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">{question}</p>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
        <div
          className="h-full rounded-full bg-learn-accent transition-[width] duration-200 ease-out motion-reduce:transition-none"
          style={{ width: `${(value ?? 0) * 100}%` }}
        />
      </div>

      <p className="mt-3 font-mono text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
        {denominator === 0 ? (
          <>nothing to divide by</>
        ) : (
          <>
            {numerator} / ({denominatorParts[0]} {denominatorLabels[0]} + {denominatorParts[1]}{" "}
            {denominatorLabels[1]}) = {formatMetric(value)}
          </>
        )}
      </p>
    </div>
  );
}

export function ThresholdExplorer() {
  const [threshold, setThreshold] = useState(0.5);
  const sliderId = useId();

  const metrics = useMemo(() => metricsAt(threshold), [threshold]);
  const { truePositives, falsePositives, falseNegatives, trueNegatives } = metrics;

  const activePreset = PRESETS.find((p) => Math.abs(p.threshold - threshold) < 0.005);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the threshold
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Every case the model scored, sorted left to right by how confident it was.{" "}
        <strong className="font-semibold">Real positives sit above the line</strong>,{" "}
        <strong className="font-semibold">real negatives below it</strong>. Everything to the
        right of the threshold is what the model flags.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-5 w-full"
        role="img"
        aria-label={
          `Score distribution at threshold ${threshold.toFixed(2)}: ` +
          `${truePositives} true positives, ${falsePositives} false positives, ` +
          `${falseNegatives} false negatives, ${trueNegatives} true negatives.`
        }
      >
        {/* Axis */}
        <line
          x1={PAD_LEFT}
          y1={AXIS_Y}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={AXIS_Y}
          stroke="var(--learn-ink-strong)"
          strokeWidth={1}
        />

        {/* Bars: positives above the axis, negatives below. The threshold line
            therefore cuts the chart into the four confusion-matrix cells. */}
        {HISTOGRAM.map((bin, index) => {
          const flagged = bin.end > threshold;
          const barWidth = (PLOT_WIDTH / BIN_COUNT) * 0.82;
          const x = xFor(bin.start) + (PLOT_WIDTH / BIN_COUNT - barWidth) / 2;

          const positiveHeight = MAX_BIN_POSITIVES
            ? (bin.positives / MAX_BIN_POSITIVES) * HALF_HEIGHT
            : 0;
          const negativeHeight = MAX_BIN_NEGATIVES
            ? (bin.negatives / MAX_BIN_NEGATIVES) * HALF_HEIGHT
            : 0;

          return (
            <g key={index}>
              {bin.positives > 0 && (
                <rect
                  x={x}
                  y={AXIS_Y - positiveHeight}
                  width={barWidth}
                  height={positiveHeight}
                  rx={2}
                  fill={flagged ? OUTCOME.truePositive.fill : OUTCOME.falseNegative.fill}
                />
              )}
              {bin.negatives > 0 && (
                <rect
                  x={x}
                  y={AXIS_Y}
                  width={barWidth}
                  height={negativeHeight}
                  rx={2}
                  fill={flagged ? OUTCOME.falsePositive.fill : OUTCOME.trueNegative.fill}
                />
              )}
            </g>
          );
        })}

        {/* Threshold marker */}
        <line
          x1={xFor(threshold)}
          y1={PAD_TOP - 8}
          x2={xFor(threshold)}
          y2={VIEW_HEIGHT - PAD_BOTTOM + 6}
          stroke="var(--learn-ink)"
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <text
          x={xFor(threshold)}
          y={PAD_TOP - 12}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill="var(--learn-ink)"
        >
          {threshold.toFixed(2)}
        </text>

        {/* Side labels */}
        <text x={8} y={AXIS_Y - HALF_HEIGHT / 2} fontSize={11} fill="var(--learn-ink-muted)">
          <tspan x={8} dy={0}>actually</tspan>
          <tspan x={8} dy={13}>positive</tspan>
        </text>
        <text x={8} y={AXIS_Y + HALF_HEIGHT / 2} fontSize={11} fill="var(--learn-ink-muted)">
          <tspan x={8} dy={0}>actually</tspan>
          <tspan x={8} dy={13}>negative</tspan>
        </text>

        {/* Score axis ticks */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <text
            key={tick}
            x={xFor(tick)}
            y={VIEW_HEIGHT - PAD_BOTTOM + 20}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            {tick}
          </text>
        ))}
        <text
          x={PAD_LEFT + PLOT_WIDTH / 2}
          y={VIEW_HEIGHT - 4}
          textAnchor="middle"
          fontSize={11}
          fill="var(--learn-ink-muted)"
        >
          model confidence score
        </text>
      </svg>

      <label htmlFor={sliderId} className="sr-only">
        Decision threshold
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        className="mt-1 w-full accent-learn-accent"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setThreshold(preset.threshold)}
              aria-pressed={isActive}
              className={`rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-learn-ink ${
                isActive
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {activePreset && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{activePreset.note}</p>
      )}

      {/* Confusion matrix, colour-keyed to the chart above */}
      <div className="mt-7 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h3 className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
            The four outcomes
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                ["truePositive", truePositives, "flagged, and real"],
                ["falseNegative", falseNegatives, "missed a real one"],
                ["falsePositive", falsePositives, "false alarm"],
                ["trueNegative", trueNegatives, "correctly ignored"],
              ] as const
            ).map(([key, count, caption]) => (
              <div
                key={key}
                className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-[3px]"
                    style={{ backgroundColor: OUTCOME[key].fill }}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-learn-strong">
                    {OUTCOME[key].short}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[22px] leading-none text-learn-strong tabular-nums">
                  {count}
                </p>
                <p className="mt-1 text-[12px] leading-[1.4] text-learn-subtle">{caption}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] leading-[1.5] text-learn-subtle">
            {TOTAL_POSITIVES} real positives and {TOTAL_NEGATIVES} real negatives in total.
          </p>
        </div>

        <div className="grid gap-3">
          <MetricBar
            name="Precision"
            value={metrics.precision}
            question="Of everything I flagged, how much was real?"
            numerator={truePositives}
            denominatorParts={[truePositives, falsePositives]}
            denominatorLabels={["TP", "FP"]}
          />
          <MetricBar
            name="Recall"
            value={metrics.recall}
            question="Of everything real, how much did I catch?"
            numerator={truePositives}
            denominatorParts={[truePositives, falseNegatives]}
            denominatorLabels={["TP", "FN"]}
          />
          <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold text-learn-strong">F1</h3>
              <span className="font-mono text-[20px] leading-none text-learn-strong tabular-nums">
                {formatMetric(metrics.f1)}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
              The harmonic mean of the two. It only goes up when both go up.
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
              <div
                className="h-full rounded-full bg-learn-inverse transition-[width] duration-200 ease-out motion-reduce:transition-none"
                style={{ width: `${(metrics.f1 ?? 0) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
