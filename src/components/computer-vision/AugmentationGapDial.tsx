"use client";

import { useId, useState } from "react";
import { formatPercent } from "@/lib/ml/format";

/**
 * A fixed lookup table: augmentation strength (0-10) against training and
 * validation accuracy. The shape is deliberately non-monotonic — the gap
 * narrows steadily up to strength 6-7, then both numbers fall together as the
 * augmentation gets strong enough to distort the images past usefulness.
 * Hard-coded, no computation: the point is this exact curve.
 */
interface StrengthPoint {
  strength: number;
  train: number;
  val: number;
}

const CURVE: readonly StrengthPoint[] = [
  { strength: 0, train: 0.99, val: 0.71 },
  { strength: 1, train: 0.98, val: 0.75 },
  { strength: 2, train: 0.97, val: 0.79 },
  { strength: 3, train: 0.95, val: 0.83 },
  { strength: 4, train: 0.93, val: 0.86 },
  { strength: 5, train: 0.91, val: 0.88 },
  { strength: 6, train: 0.89, val: 0.89 },
  { strength: 7, train: 0.87, val: 0.87 },
  { strength: 8, train: 0.85, val: 0.84 },
  { strength: 9, train: 0.82, val: 0.8 },
  { strength: 10, train: 0.78, val: 0.76 },
];

const BEST_STRENGTH = CURVE.reduce((best, point) => (point.val > best.val ? point : best)).strength;

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 300;
const PAD_LEFT = 46;
const PAD_RIGHT = 20;
const PAD_TOP = 20;
const PAD_BOTTOM = 38;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const Y_MIN = 0.6;
const Y_MAX = 1.0;

function xFor(strength: number): number {
  return PAD_LEFT + (strength / (CURVE.length - 1)) * PLOT_WIDTH;
}

function yFor(accuracy: number): number {
  const clamped = Math.min(Y_MAX, Math.max(Y_MIN, accuracy));
  return PAD_TOP + (1 - (clamped - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_HEIGHT;
}

const TRAIN_PATH = CURVE.map(
  (p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.strength)} ${yFor(p.train)}`,
).join(" ");
const VAL_PATH = CURVE.map(
  (p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.strength)} ${yFor(p.val)}`,
).join(" ");

export function AugmentationGapDial() {
  const [strength, setStrength] = useState(0);
  const sliderId = useId();

  const point = CURVE[strength];
  const gap = point.train - point.val;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Training accuracy against validation accuracy
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Same network, same ten thousand photos, eleven augmentation settings. Drag the slider and
        watch the gap between the two lines close — and then watch what happens after it closes.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[460px]"
          role="img"
          aria-label={`At augmentation strength ${strength}, training accuracy is ${formatPercent(
            point.train,
            0,
          )} and validation accuracy is ${formatPercent(point.val, 0)}.`}
        >
          <line
            x1={PAD_LEFT}
            y1={PAD_TOP}
            x2={PAD_LEFT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <line
            x1={PAD_LEFT}
            y1={VIEW_HEIGHT - PAD_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />

          {[0.6, 0.7, 0.8, 0.9, 1.0].map((tick) => (
            <text
              key={tick}
              x={PAD_LEFT - 8}
              y={yFor(tick) + 4}
              textAnchor="end"
              fontSize={10}
              fill="var(--learn-ink-subtle)"
            >
              {Math.round(tick * 100)}%
            </text>
          ))}
          {CURVE.map((p) => (
            <text
              key={p.strength}
              x={xFor(p.strength)}
              y={VIEW_HEIGHT - PAD_BOTTOM + 16}
              textAnchor="middle"
              fontSize={10}
              fill="var(--learn-ink-subtle)"
            >
              {p.strength}
            </text>
          ))}
          <text
            x={PAD_LEFT + PLOT_WIDTH / 2}
            y={VIEW_HEIGHT - 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            augmentation strength
          </text>

          <path d={TRAIN_PATH} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} />
          <path
            d={VAL_PATH}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />

          {/* current-strength marker and gap bracket */}
          <line
            x1={xFor(strength)}
            y1={yFor(point.train)}
            x2={xFor(strength)}
            y2={yFor(point.val)}
            stroke="var(--learn-ink-strong)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          <circle cx={xFor(strength)} cy={yFor(point.train)} r={5} fill="var(--learn-series-1)" />
          <rect
            x={xFor(strength) - 4}
            y={yFor(point.val) - 4}
            width={8}
            height={8}
            transform={`rotate(45 ${xFor(strength)} ${yFor(point.val)})`}
            fill="var(--learn-series-3)"
          />
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-[12px] text-learn-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--learn-series-1)" }} />
          Training accuracy
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rotate-45"
            style={{ backgroundColor: "var(--learn-series-3)" }}
          />
          Validation accuracy
        </span>
      </div>

      <label htmlFor={sliderId} className="mt-4 block text-[13px] text-learn-muted">
        Augmentation strength: {strength} of 10
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={10}
        step={1}
        value={strength}
        onChange={(event) => setStrength(Number(event.target.value))}
        className="mt-1 w-full accent-learn-accent"
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Train</p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {formatPercent(point.train, 0)}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Validation</p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {formatPercent(point.val, 0)}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Gap</p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {formatPercent(gap, 0)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-[1.5] text-learn-subtle">
        The gap is smallest at strength {BEST_STRENGTH}, where validation accuracy peaks at{" "}
        {formatPercent(CURVE[BEST_STRENGTH].val, 0)}. Past that, both lines fall together.
      </p>
    </figure>
  );
}
