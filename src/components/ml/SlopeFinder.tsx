"use client";

import { useId, useMemo, useState } from "react";
import {
  BEST_LOSS,
  BEST_SLOPE,
  downhillFrom,
  LOSS_CURVE,
  lossAt,
  MAX_KM,
  MAX_LITRES,
  MAX_LOSS,
  predictAt,
  SLOPE_MAX,
  SLOPE_MIN,
  SLOPE_STEP,
  TRIPS,
} from "@/lib/ml/how-models-learn-data";
import { formatNumber } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 350;
const PAD_LEFT = 52;
const PAD_RIGHT = 18;

/** Scatter on top, error bowl underneath, so the slider track reads as the bowl's x-axis. */
const SCATTER_TOP = 20;
const SCATTER_BOTTOM = 215;
const BOWL_TOP = 245;
const BOWL_BOTTOM = 320;

const xKm = linearScale([0, MAX_KM * 1.04], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yLitres = linearScale([0, MAX_LITRES * 1.08], [SCATTER_BOTTOM, SCATTER_TOP]);
const xSlope = linearScale([SLOPE_MIN, SLOPE_MAX], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yLoss = linearScale([0, MAX_LOSS], [BOWL_BOTTOM, BOWL_TOP]);

const BOWL_PATH = LOSS_CURVE.map(
  (p, i) => `${i === 0 ? "M" : "L"}${xSlope(p.slopePer100).toFixed(1)} ${yLoss(p.mse).toFixed(1)}`,
).join(" ");

const PRESETS = [
  {
    key: "thirsty",
    label: "Too thirsty",
    slope: 11.5,
    note: "Every stick points the same way: the line sits above nearly every trip. Being wrong in one direction is the easiest kind of wrong to spot.",
  },
  {
    key: "best",
    label: "Best fit",
    slope: BEST_SLOPE,
    note: "This is the bottom of the bowl. Notice the line passes through almost none of the dots — a best fit is not a line that touches the most points.",
  },
  {
    key: "frugal",
    label: "Too frugal",
    slope: 4.5,
    note: "Now the line sits under everything. The error is large again, and the bowl tells you which way to walk.",
  },
] as const;

const TOLERANCE = SLOPE_STEP / 2;

export function SlopeFinder() {
  const [slope, setSlope] = useState(6);
  const sliderId = useId();

  const loss = useMemo(() => lossAt(slope), [slope]);
  const downhill = useMemo(() => downhillFrom(slope), [slope]);
  const activePreset = PRESETS.find((p) => Math.abs(p.slope - slope) < TOLERANCE);

  const stepTarget = downhill === null ? slope : slope + (downhill === "lower" ? -0.25 : 0.25);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Find the bottom of the bowl
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Thirty-six car trips, plotted as distance driven against fuel used. The model is a
        single number — litres per 100 km — and the rust sticks show how far it misses each
        trip. Underneath, the total error at every setting you could have chosen.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-5 w-full"
        role="img"
        aria-label={
          `Thirty-six car trips plotted as distance against fuel used. At ` +
          `${slope.toFixed(2)} litres per 100 kilometres the line misses each trip by ` +
          `${formatNumber(loss.mae, 2)} litres on average, for a total squared error of ` +
          `${formatNumber(loss.mse, 2)}. The lowest possible total error is ` +
          `${formatNumber(BEST_LOSS, 2)} at ${BEST_SLOPE.toFixed(2)} litres per 100 kilometres.`
        }
      >
        {/* Scatter axes */}
        <line
          x1={PAD_LEFT}
          y1={SCATTER_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={SCATTER_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        <line
          x1={PAD_LEFT}
          y1={SCATTER_TOP}
          x2={PAD_LEFT}
          y2={SCATTER_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />

        {/* Residual sticks — drawn under the points so the dots stay readable */}
        {TRIPS.map((trip, i) => (
          <line
            key={`r${i}`}
            x1={xKm(trip.x)}
            y1={yLitres(trip.y)}
            x2={xKm(trip.x)}
            y2={yLitres(predictAt(slope, trip.x))}
            stroke="var(--learn-chart-error)"
            strokeWidth={1.5}
            opacity={0.7}
          />
        ))}

        {/* The model */}
        <line
          x1={xKm(0)}
          y1={yLitres(0)}
          x2={xKm(MAX_KM * 1.04)}
          y2={yLitres(predictAt(slope, MAX_KM * 1.04))}
          stroke="var(--learn-chart-model)"
          strokeWidth={2}
        />

        {TRIPS.map((trip, i) => (
          <circle
            key={`p${i}`}
            cx={xKm(trip.x)}
            cy={yLitres(trip.y)}
            r={3.6}
            fill="var(--learn-series-3)"
          />
        ))}

        {[0, 50, 100, 150, 200].map((km) => (
          <text
            key={km}
            x={xKm(km)}
            y={SCATTER_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {km}
          </text>
        ))}
        <text x={8} y={SCATTER_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          litres
        </text>

        {/* Error bowl */}
        <line
          x1={PAD_LEFT}
          y1={BOWL_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={BOWL_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        <path d={BOWL_PATH} fill="none" stroke="var(--learn-ink-strong)" strokeWidth={1.5} />
        <line
          x1={xSlope(slope)}
          y1={yLoss(loss.mse)}
          x2={xSlope(slope)}
          y2={BOWL_BOTTOM}
          stroke="var(--learn-chart-grid-strong)"
          strokeWidth={1}
        />
        <circle cx={xSlope(slope)} cy={yLoss(loss.mse)} r={5} fill="var(--learn-ink)" />
        <text x={8} y={BOWL_TOP + 4} fontSize={12} fill="var(--learn-ink-muted)">
          total
        </text>
        <text x={8} y={BOWL_TOP + 18} fontSize={12} fill="var(--learn-ink-muted)">
          error
        </text>
      </svg>

      <label htmlFor={sliderId} className="sr-only">
        Litres per 100 kilometres
      </label>
      <input
        id={sliderId}
        type="range"
        min={SLOPE_MIN}
        max={SLOPE_MAX}
        step={SLOPE_STEP}
        value={slope}
        onChange={(event) => setSlope(Number(event.target.value))}
        className="mt-1 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
          {slope.toFixed(2)}
        </span>{" "}
        litres per 100 km
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setSlope(preset.slope)}
              aria-pressed={isActive}
              className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
                isActive
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
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

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Average miss</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(loss.mae, 2)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            How far off the line is on a typical trip, in litres.
          </p>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            sum of every miss ÷ 36 = {formatNumber(loss.mae, 2)} L
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Total error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(loss.mse, 2)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Each miss squared, then averaged. Squaring is why one big miss hurts more than
            two small ones.
          </p>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            lowest possible = {formatNumber(BEST_LOSS, 2)} at {BEST_SLOPE.toFixed(2)}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Which way is downhill?</h3>
            <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[12px] font-medium text-learn-strong">
              {downhill === null
                ? "You are at the bottom"
                : downhill === "lower"
                  ? "← lower the number"
                  : "raise the number →"}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
            Pulling the line up:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
              {formatNumber(loss.pullUp, 1)} L
            </span>{" "}
            · pulling it down:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
              {formatNumber(loss.pullDown, 1)} L
            </span>
            . Far from the bottom one side dominates completely. Near it they roughly balance —
            not exactly, because a trip four times as long pulls four times as hard.
          </p>
          {downhill !== null && (
            <p className="mt-2 text-[13px] leading-[1.5] text-learn-accent-text">
              One small step downhill would move the setting to {stepTarget.toFixed(2)}. A real
              learner takes thousands of steps this small, and it is the only thing it knows
              how to do.
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}
