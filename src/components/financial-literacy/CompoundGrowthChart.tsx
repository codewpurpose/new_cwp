"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

const ANNUAL_RATE = 0.07;
const MONTHLY_RATE = ANNUAL_RATE / 12;
const START_AGE = 25;
const RETIRE_AGE = 65;
const TOTAL_YEARS = RETIRE_AGE - START_AGE;
const LATE_START_AGE = 35;

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 300;
const PAD_LEFT = 56;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

/** Future value of a monthly contribution, compounded monthly, after `months` deposits. */
function balanceAfterMonths(monthly: number, months: number): number {
  if (months <= 0) return 0;
  return monthly * ((Math.pow(1 + MONTHLY_RATE, months) - 1) / MONTHLY_RATE);
}

function xFor(age: number): number {
  return PAD_LEFT + ((age - START_AGE) / TOTAL_YEARS) * PLOT_WIDTH;
}

export function CompoundGrowthChart() {
  const [monthly, setMonthly] = useState(200);
  const sliderId = useId();

  const { earlyPath, latePath, earlyFinal, lateFinal, maxBalance } = useMemo(() => {
    const early: number[] = [];
    const late: number[] = [];
    for (let age = START_AGE; age <= RETIRE_AGE; age += 1) {
      early.push(balanceAfterMonths(monthly, (age - START_AGE) * 12));
      late.push(age < LATE_START_AGE ? 0 : balanceAfterMonths(monthly, (age - LATE_START_AGE) * 12));
    }
    const max = Math.max(early[early.length - 1], late[late.length - 1]);
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / (max || 1)) * PLOT_HEIGHT;

    const toPath = (values: number[]) =>
      values
        .map((v, i) => `${i === 0 ? "M" : "L"}${xFor(START_AGE + i).toFixed(1)} ${yFor(v).toFixed(1)}`)
        .join(" ");

    return {
      earlyPath: toPath(early),
      latePath: toPath(late),
      earlyFinal: early[early.length - 1],
      lateFinal: late[late.length - 1],
      maxBalance: max,
    };
  }, [monthly]);

  const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / (maxBalance || 1)) * PLOT_HEIGHT;
  const difference = earlyFinal - lateFinal;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Starting at 25 versus starting at 35
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Same monthly contribution, same 7% average annual return, both running to age {RETIRE_AGE}
        . The only difference between the two lines is a ten-year head start.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`Starting at 25 grows to ${formatCurrency(earlyFinal)} by age ${RETIRE_AGE}. Starting at 35 with the same contribution grows to ${formatCurrency(lateFinal)}, a difference of ${formatCurrency(difference)}.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          <path d={latePath} fill="none" stroke="var(--learn-series-2)" strokeWidth={2} strokeDasharray="5 4" />
          <path d={earlyPath} fill="none" stroke="var(--learn-series-1)" strokeWidth={2.4} />

          <circle cx={xFor(RETIRE_AGE)} cy={yFor(earlyFinal)} r={4} fill="var(--learn-series-1)" />
          <circle cx={xFor(RETIRE_AGE)} cy={yFor(lateFinal)} r={4} fill="var(--learn-series-2)" />

          {[START_AGE, LATE_START_AGE, 45, 55, RETIRE_AGE].map((age) => (
            <text key={age} x={xFor(age)} y={VIEW_HEIGHT - PAD_BOTTOM + 20} textAnchor="middle" fontSize={12} fill="var(--learn-ink-subtle)">
              {age}
            </text>
          ))}
          <text x={PAD_LEFT + PLOT_WIDTH / 2} y={VIEW_HEIGHT - 4} textAnchor="middle" fontSize={12} fill="var(--learn-ink-muted)">
            age
          </text>
        </svg>
      </div>

      <label htmlFor={sliderId} className="mt-4 flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
        <span>Monthly contribution</span>
        <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{formatCurrency(monthly)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={50}
        max={1000}
        step={25}
        value={monthly}
        onChange={(event) => setMonthly(Number(event.target.value))}
        className="mt-2 w-full accent-learn-accent"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-1" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Starting at {START_AGE}</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[22px] leading-none tabular-nums text-learn-strong">
            {formatCurrency(earlyFinal)}
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {TOTAL_YEARS} years of contributions, by age {RETIRE_AGE}.
          </p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-2" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Starting at {LATE_START_AGE}</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[22px] leading-none tabular-nums text-learn-strong">
            {formatCurrency(lateFinal)}
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {RETIRE_AGE - LATE_START_AGE} years of contributions, same monthly amount.
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-learn-accent-text">
        Ten years earlier is worth {formatCurrency(difference)} more at retirement — from the
        same {formatCurrency(monthly)} a month, at the same rate.
      </p>
    </figure>
  );
}
