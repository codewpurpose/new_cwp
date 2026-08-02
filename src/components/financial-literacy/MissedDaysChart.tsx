"use client";

import { useMemo, useState } from "react";
import { mulberry32, normalish } from "@/lib/ml/random";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatCurrency } from "@/lib/finance-format";

const STARTING_AMOUNT = 10000;
const TRADING_DAYS_PER_YEAR = 252;
const YEARS = 10;
const TOTAL_DAYS = TRADING_DAYS_PER_YEAR * YEARS;
const DAYS_REMOVED = 10;

/** Daily returns approximating a ~9%/yr average, ~16%/yr volatility index fund.
 *  Fixed seed so this array is identical on server and client. */
const random = mulberry32(20260317);
const MEAN_DAILY = 0.09 / TRADING_DAYS_PER_YEAR;
const SPREAD_DAILY = 0.16 / Math.sqrt(TRADING_DAYS_PER_YEAR);

const DAILY_RETURNS: readonly number[] = Array.from({ length: TOTAL_DAYS }, () =>
  normalish(random, MEAN_DAILY, SPREAD_DAILY, { min: -0.12, max: 0.12 }),
);

const BEST_DAY_INDICES = new Set(
  [...DAILY_RETURNS]
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)
    .slice(0, DAYS_REMOVED)
    .map((d) => d.index),
);

function buildYearlyBalances(skipBestDays: boolean): number[] {
  let balance = STARTING_AMOUNT;
  const yearly = [balance];
  for (let day = 0; day < TOTAL_DAYS; day += 1) {
    const isBestDay = BEST_DAY_INDICES.has(day);
    const dailyReturn = skipBestDays && isBestDay ? 0 : DAILY_RETURNS[day];
    balance *= 1 + dailyReturn;
    if ((day + 1) % TRADING_DAYS_PER_YEAR === 0) yearly.push(balance);
  }
  return yearly;
}

const FULL_RIDE = buildYearlyBalances(false);
const MISSED_BEST = buildYearlyBalances(true);

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 300;
const PAD_LEFT = 64;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

function xFor(year: number): number {
  return PAD_LEFT + (year / YEARS) * PLOT_WIDTH;
}

type Mode = "full" | "missed";

export function MissedDaysChart() {
  const [mode, setMode] = useState<Mode>("full");

  const { fullPath, missedPath } = useMemo(() => {
    const max = Math.max(...FULL_RIDE);
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / max) * PLOT_HEIGHT;
    const toPath = (values: number[]) =>
      values.map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");
    return { fullPath: toPath(FULL_RIDE), missedPath: toPath(MISSED_BEST) };
  }, []);

  const finalFull = FULL_RIDE[FULL_RIDE.length - 1];
  const finalMissed = MISSED_BEST[MISSED_BEST.length - 1];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(STARTING_AMOUNT)} invested for {YEARS} years, {TOTAL_DAYS} trading days
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          label="Which path"
          value={mode}
          onValueChange={setMode}
          options={[
            { value: "full", label: "Stayed invested every day" },
            { value: "missed", label: `Missed the ${DAYS_REMOVED} best days` },
          ]}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`Staying invested every day grows to ${formatCurrency(finalFull)}. Missing just the ${DAYS_REMOVED} best trading days over the same ${YEARS} years leaves it at ${formatCurrency(finalMissed)} instead.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          <path
            d={missedPath}
            fill="none"
            stroke="var(--learn-series-2)"
            strokeWidth={2}
            strokeDasharray="5 4"
            opacity={mode === "missed" ? 1 : 0.35}
          />
          <path
            d={fullPath}
            fill="none"
            stroke="var(--learn-series-1)"
            strokeWidth={2.4}
            opacity={mode === "full" ? 1 : 0.35}
          />

          {Array.from({ length: YEARS + 1 }, (_, i) => i)
            .filter((y) => y % 2 === 0)
            .map((y) => (
              <text key={y} x={xFor(y)} y={VIEW_HEIGHT - PAD_BOTTOM + 20} textAnchor="middle" fontSize={12} fill="var(--learn-ink-subtle)">
                {y}
              </text>
            ))}
          <text x={PAD_LEFT + PLOT_WIDTH / 2} y={VIEW_HEIGHT - 4} textAnchor="middle" fontSize={12} fill="var(--learn-ink-muted)">
            years
          </text>
        </svg>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-1" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Stayed invested every day</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[20px] tabular-nums text-learn-strong">
            {formatCurrency(finalFull)}
          </p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-2" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Missed the {DAYS_REMOVED} best days</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[20px] tabular-nums text-learn-strong">
            {formatCurrency(finalMissed)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        {DAYS_REMOVED} days out of {TOTAL_DAYS.toString()} trading days — a tiny fraction of the
        whole period — account for the entire gap between these two numbers.
      </p>
    </figure>
  );
}
