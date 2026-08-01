"use client";

import { useId, useMemo, useState } from "react";
import {
  BEST_BLEND,
  LOAF_COUNT,
  LOAVES,
  MAX_BIN,
  MAX_CELSIUS,
  MAX_MINUTES,
  MIN_CELSIUS,
  MIN_MINUTES,
  stepAtBlend,
  TOTAL_COOKED,
  TOTAL_UNDER,
} from "@/lib/ml/features-labels-data";
import { formatNumber, formatPercent } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 340;
const PAD_LEFT = 48;
const PAD_RIGHT = 18;
const TOP_TOP = 20;
const TOP_BOTTOM = 190;
const STRIP_AXIS = 268;
const STRIP_HALF = 46;

const xMinutes = linearScale([MIN_MINUTES, MAX_MINUTES], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yCelsius = linearScale([MIN_CELSIUS, MAX_CELSIUS], [TOP_BOTTOM, TOP_TOP]);
const xBlend = linearScale([0, 1], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);

const PRESETS = [
  {
    key: "time",
    t: 0,
    label: "Time only",
    note: "Judging by minutes alone. It gets you a long way — but the short-and-hot loaves land right on top of the long-and-cool ones, and no single cut can separate them.",
  },
  {
    key: "best",
    t: BEST_BLEND,
    label: "Best blend",
    note: "A mix of the two — a feature you invented rather than one you were handed. It roughly halves the error of the better single measurement.",
  },
  {
    key: "temp",
    t: 1,
    label: "Temperature only",
    note: "Judging by temperature alone, and it is much the worst of the three. A hot oven means nothing if the loaf came out after twelve minutes.",
  },
] as const;

export function FeatureBlender() {
  const [t, setT] = useState(0);
  const sliderId = useId();

  const step = useMemo(() => stepAtBlend(t), [t]);
  const activePreset = PRESETS.find((p) => Math.abs(p.t - t) < 0.005);

  // The measuring direction: contours of constant blend run perpendicular to it.
  const angle = Math.atan2(t, 1 - t);
  const arrowLength = 54;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Invent a better measurement
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        140 loaves, plotted by how long they baked against how hot the oven was. Filled circles
        came out cooked through; hollow ones were still doughy. The strip underneath shows the
        same loaves measured by whatever blend you pick — and where the best single cut falls.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-5 w-full"
        role="img"
        aria-label={
          `140 loaves plotted by baking time against oven temperature. Measuring a blend of ` +
          `${((1 - t) * 100).toFixed(0)} percent time and ${(t * 100).toFixed(0)} percent ` +
          `temperature, the best single cut misclassifies ${step.wrong} of ${LOAF_COUNT} loaves, ` +
          `an error rate of ${formatPercent(step.errorRate, 0)}.`
        }
      >
        <rect
          x={PAD_LEFT}
          y={TOP_TOP}
          width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
          height={TOP_BOTTOM - TOP_TOP}
          fill="var(--learn-chart-plot)"
        />

        {LOAVES.map((loaf, i) =>
          loaf.cooked ? (
            <circle
              key={i}
              cx={xMinutes(loaf.minutes)}
              cy={yCelsius(loaf.celsius)}
              r={3.4}
              fill="var(--learn-series-1)"
            />
          ) : (
            <circle
              key={i}
              cx={xMinutes(loaf.minutes)}
              cy={yCelsius(loaf.celsius)}
              r={3.2}
              fill="none"
              stroke="var(--learn-series-3)"
              strokeWidth={1.2}
            />
          ),
        )}

        {/* The measuring direction. Rotating it is the whole figure. */}
        <g transform={`translate(${(PAD_LEFT + VIEW_WIDTH - PAD_RIGHT) / 2}, ${(TOP_TOP + TOP_BOTTOM) / 2})`}>
          <line
            x1={-Math.cos(angle) * arrowLength}
            y1={Math.sin(angle) * arrowLength}
            x2={Math.cos(angle) * arrowLength}
            y2={-Math.sin(angle) * arrowLength}
            stroke="var(--learn-chart-axis)"
            strokeWidth={2.5}
          />
          <circle
            cx={Math.cos(angle) * arrowLength}
            cy={-Math.sin(angle) * arrowLength}
            r={4}
            fill="var(--learn-chart-axis)"
          />
        </g>

        <line
          x1={PAD_LEFT}
          y1={TOP_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={TOP_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {[15, 25, 35, 44].map((m) => (
          <text
            key={m}
            x={xMinutes(m)}
            y={TOP_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {m}m
          </text>
        ))}
        <text x={6} y={TOP_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          °C
        </text>

        {/* The 1-D strip: the invented feature, back to back */}
        <line
          x1={PAD_LEFT}
          y1={STRIP_AXIS}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={STRIP_AXIS}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {step.histogram.map((bin, i) => {
          const w = ((VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / step.histogram.length) * 0.82;
          const x = xBlend(bin.start) + 3;
          const hc = MAX_BIN ? (bin.cooked / MAX_BIN) * STRIP_HALF : 0;
          const hu = MAX_BIN ? (bin.under / MAX_BIN) * STRIP_HALF : 0;
          return (
            <g key={i}>
              {bin.cooked > 0 && (
                <rect x={x} y={STRIP_AXIS - hc} width={w} height={hc} rx={2} fill="var(--learn-series-1)" />
              )}
              {bin.under > 0 && (
                <rect x={x} y={STRIP_AXIS} width={w} height={hu} rx={2} fill="var(--learn-series-3)" />
              )}
            </g>
          );
        })}
        <line
          x1={xBlend(step.cut)}
          y1={STRIP_AXIS - STRIP_HALF - 6}
          x2={xBlend(step.cut)}
          y2={STRIP_AXIS + STRIP_HALF + 6}
          stroke="var(--learn-ink)"
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <text
          x={xBlend(step.cut)}
          y={STRIP_AXIS - STRIP_HALF - 12}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill="var(--learn-ink)"
        >
          best cut
        </text>
      </svg>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          cooked through ({TOTAL_COOKED})
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-learn-series-3" />
          still doughy ({TOTAL_UNDER})
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        How much of the measurement is oven temperature
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={t}
        onChange={(event) => setT(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <div className="mt-1 flex justify-between text-[12px] text-learn-subtle">
        <span>measure minutes</span>
        <span>measure temperature</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setT(preset.t)}
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
            <h3 className="text-[15px] font-semibold text-learn-strong">Mistakes at the best cut</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {step.wrong}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            {step.cookedCalledUnder} cooked called doughy + {step.underCalledCooked} doughy called
            cooked = {step.wrong} of {LOAF_COUNT} ({formatPercent(step.errorRate, 0)})
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <h3 className="text-[15px] font-semibold text-learn-strong">
            The feature you are measuring
          </h3>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong tabular-nums">
            {((1 - t) * 100).toFixed(0)}% of time + {(t * 100).toFixed(0)}% of temperature
          </p>
          {Number.isFinite(step.minutesAt200) && (
            <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
              That cut means roughly{" "}
              <strong className="text-learn-strong">
                {formatNumber(step.minutesAt200, 0)} minutes at 200 °C
              </strong>
              , or {formatNumber(step.minutesAt235, 0)} at 235 °C — the invented number does
              describe something real.
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}
