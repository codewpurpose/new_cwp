"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

const STARTING_AMOUNT = 10000;
const INFLATION_RATE = 0.03;
const SAVINGS_RATE = 0.01;
const INVESTED_REAL_RATE = 0.07;
const MAX_YEARS = 30;

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 300;
const PAD_LEFT = 64;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

/** Real (inflation-adjusted) value of an amount growing at `nominalRate` for `years`. */
function realValue(nominalRate: number, years: number): number {
  const realRate = (1 + nominalRate) / (1 + INFLATION_RATE) - 1;
  return STARTING_AMOUNT * Math.pow(1 + realRate, years);
}

function valueAtRealRate(realRate: number, years: number): number {
  return STARTING_AMOUNT * Math.pow(1 + realRate, years);
}

function xFor(year: number): number {
  return PAD_LEFT + (year / MAX_YEARS) * PLOT_WIDTH;
}

export function InflationVsGrowthChart() {
  const [year, setYear] = useState(15);
  const sliderId = useId();

  const { savingsPath, investedPath, maxValue } = useMemo(() => {
    const savings: number[] = [];
    const invested: number[] = [];
    for (let y = 0; y <= MAX_YEARS; y += 1) {
      savings.push(realValue(SAVINGS_RATE, y));
      invested.push(valueAtRealRate(INVESTED_REAL_RATE, y));
    }
    const max = Math.max(...invested, STARTING_AMOUNT);
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / max) * PLOT_HEIGHT;
    const toPath = (values: number[]) =>
      values.map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");
    return { savingsPath: toPath(savings), investedPath: toPath(invested), maxValue: max };
  }, []);

  const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / maxValue) * PLOT_HEIGHT;
  const savingsAtYear = realValue(SAVINGS_RATE, year);
  const investedAtYear = valueAtRealRate(INVESTED_REAL_RATE, year);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(STARTING_AMOUNT)}, in today&apos;s purchasing power
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`After ${year} years, ${formatCurrency(STARTING_AMOUNT)} left in a 1% savings account is worth ${formatCurrency(savingsAtYear)} in today's purchasing power, while the same amount invested at a 7% average real return is worth ${formatCurrency(investedAtYear)}.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line
            x1={PAD_LEFT}
            y1={yFor(STARTING_AMOUNT)}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={yFor(STARTING_AMOUNT)}
            stroke="var(--learn-chart-grid-strong)"
            strokeDasharray="3 3"
            strokeWidth={1}
          />

          <path d={savingsPath} fill="none" stroke="var(--learn-series-2)" strokeWidth={2.2} />
          <path d={investedPath} fill="none" stroke="var(--learn-series-1)" strokeWidth={2.4} />

          <line x1={xFor(year)} y1={PAD_TOP} x2={xFor(year)} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-ink)" strokeWidth={1.5} strokeDasharray="4 4" />
          <circle cx={xFor(year)} cy={yFor(savingsAtYear)} r={4} fill="var(--learn-series-2)" />
          <circle cx={xFor(year)} cy={yFor(investedAtYear)} r={4} fill="var(--learn-series-1)" />

          {[0, 10, 20, 30].map((y) => (
            <text key={y} x={xFor(y)} y={VIEW_HEIGHT - PAD_BOTTOM + 20} textAnchor="middle" fontSize={12} fill="var(--learn-ink-subtle)">
              {y}
            </text>
          ))}
          <text x={PAD_LEFT + PLOT_WIDTH / 2} y={VIEW_HEIGHT - 4} textAnchor="middle" fontSize={12} fill="var(--learn-ink-muted)">
            years
          </text>
        </svg>
      </div>

      <label htmlFor={sliderId} className="mt-4 flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
        <span>Years elapsed</span>
        <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{year}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_YEARS}
        step={1}
        value={year}
        onChange={(event) => setYear(Number(event.target.value))}
        className="mt-2 w-full accent-learn-accent"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-2" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Cash, 1% savings APY</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[20px] tabular-nums text-learn-strong">
            {formatCurrency(savingsAtYear)}
          </p>
          <p className="mt-1 text-[13px] text-learn-muted">worth in today&apos;s purchasing power</p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-1" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Invested, 7% average real return</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[20px] tabular-nums text-learn-strong">
            {formatCurrency(investedAtYear)}
          </p>
          <p className="mt-1 text-[13px] text-learn-muted">worth in today&apos;s purchasing power</p>
        </div>
      </div>
    </figure>
  );
}
