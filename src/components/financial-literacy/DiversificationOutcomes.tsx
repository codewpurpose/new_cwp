"use client";

import { useMemo, useState } from "react";
import { mulberry32, normalish } from "@/lib/ml/random";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatPercent } from "@/lib/finance-format";

const TRIALS = 30;
const STOCKS_PER_TRIAL = 20;
const MEAN_RETURN = 9;
const SPREAD = 28;

/** 30 trials, each drawing 20 single-stock annual returns from the same volatile
 *  distribution. Fixed seed so server and client render byte-identical arrays. */
const random = mulberry32(20260226);

const TRIALS_DATA: readonly number[][] = Array.from({ length: TRIALS }, () =>
  Array.from({ length: STOCKS_PER_TRIAL }, () =>
    normalish(random, MEAN_RETURN, SPREAD, { min: -80, max: 120 }),
  ),
);

const CONCENTRATED = TRIALS_DATA.map((stocks) => stocks[0]);
const DIVERSIFIED = TRIALS_DATA.map(
  (stocks) => stocks.reduce((sum, r) => sum + r, 0) / stocks.length,
);

const DOMAIN_MIN = -80;
const DOMAIN_MAX = 80;
const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 140;
const PAD_LEFT = 20;
const PAD_RIGHT = 20;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const AXIS_Y = 70;

function xFor(value: number): number {
  const clamped = Math.max(DOMAIN_MIN, Math.min(DOMAIN_MAX, value));
  return PAD_LEFT + ((clamped - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * PLOT_WIDTH;
}

type Mode = "concentrated" | "diversified";

export function DiversificationOutcomes() {
  const [mode, setMode] = useState<Mode>("concentrated");
  const data = mode === "concentrated" ? CONCENTRATED : DIVERSIFIED;

  const stats = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const losses = data.filter((v) => v < 0).length;
    return { min, max, lossShare: (losses / data.length) * 100 };
  }, [data]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        30 one-year outcomes, same underlying stocks
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          label="Portfolio shape"
          value={mode}
          onValueChange={setMode}
          options={[
            { value: "concentrated", label: "All in one stock" },
            { value: "diversified", label: "Spread across 20" },
          ]}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`${mode === "concentrated" ? "Holding a single stock" : "Spreading across 20 stocks"}: outcomes range from ${formatPercent(stats.min, 0)} to ${formatPercent(stats.max, 0)}, with ${formatPercent(stats.lossShare, 0)} of trials ending in a loss.`}
        >
          <line x1={xFor(0)} y1={20} x2={xFor(0)} y2={AXIS_Y + 30} stroke="var(--learn-chart-grid-strong)" strokeWidth={1} strokeDasharray="3 3" />
          <line x1={PAD_LEFT} y1={AXIS_Y} x2={VIEW_WIDTH - PAD_RIGHT} y2={AXIS_Y} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          {data.map((value, i) => (
            <circle
              key={i}
              cx={xFor(value)}
              cy={AXIS_Y + (i % 2 === 0 ? -10 : 10) + ((i % 5) - 2) * 3}
              r={4}
              fill={value < 0 ? "var(--learn-series-2)" : "var(--learn-series-1)"}
              opacity={0.8}
            />
          ))}

          {[-80, -40, 0, 40, 80].map((tick) => (
            <text key={tick} x={xFor(tick)} y={AXIS_Y + 34} textAnchor="middle" fontSize={11} fill="var(--learn-ink-subtle)">
              {tick}%
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Worst year</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums text-learn-strong">
            {formatPercent(stats.min, 0)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Best year</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums text-learn-strong">
            {formatPercent(stats.max, 0)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Trials with a loss</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums text-learn-strong">
            {formatPercent(stats.lossShare, 0)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        Same 20 underlying stocks in both views. Holding just one of them means your outcome is
        whichever dot you happened to land on. Spreading across all 20 averages those same dots
        together — the extremes on both ends get pulled toward the middle.
      </p>
    </figure>
  );
}
