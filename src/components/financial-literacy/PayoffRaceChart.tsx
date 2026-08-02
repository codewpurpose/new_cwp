"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/finance-format";

interface Debt {
  key: string;
  label: string;
  balance: number;
  apr: number;
  minPayment: number;
}

const DEBTS: readonly Debt[] = [
  { key: "card-a", label: "Card A", balance: 3000, apr: 24, minPayment: 90 },
  { key: "card-b", label: "Card B", balance: 1200, apr: 19, minPayment: 40 },
  { key: "loan", label: "Personal loan", balance: 5000, apr: 12, minPayment: 150 },
];

const MONTHLY_BUDGET = 400;
const MAX_MONTHS = 60;

const AVALANCHE_ORDER = [...DEBTS].sort((a, b) => b.apr - a.apr).map((d) => d.key);
const SNOWBALL_ORDER = [...DEBTS].sort((a, b) => a.balance - b.balance).map((d) => d.key);

interface RaceResult {
  totals: number[];
  monthsToPayoff: number;
  totalInterest: number;
}

function simulate(order: readonly string[]): RaceResult {
  const balances = new Map(DEBTS.map((d) => [d.key, d.balance]));
  const rates = new Map(DEBTS.map((d) => [d.key, d.apr / 100 / 12]));
  const mins = new Map(DEBTS.map((d) => [d.key, d.minPayment]));

  const totals: number[] = [Array.from(balances.values()).reduce((s, v) => s + v, 0)];
  let totalInterest = 0;
  let monthsToPayoff = MAX_MONTHS;

  for (let month = 1; month <= MAX_MONTHS; month += 1) {
    let anyBalance = false;

    for (const key of order) {
      const bal = balances.get(key)!;
      if (bal <= 0) continue;
      const interest = bal * rates.get(key)!;
      totalInterest += interest;
      balances.set(key, bal + interest);
    }

    let extra = MONTHLY_BUDGET;
    for (const key of order) {
      const bal = balances.get(key)!;
      if (bal <= 0) continue;
      const payment = Math.min(mins.get(key)!, bal);
      balances.set(key, bal - payment);
      extra -= payment;
    }

    for (const key of order) {
      if (extra <= 0) break;
      const bal = balances.get(key)!;
      if (bal <= 0) continue;
      const payment = Math.min(extra, bal);
      balances.set(key, bal - payment);
      extra -= payment;
    }

    const total = Array.from(balances.values()).reduce((s, v) => s + v, 0);
    totals.push(total);
    if (total > 0.5) anyBalance = true;
    if (!anyBalance && monthsToPayoff === MAX_MONTHS) monthsToPayoff = month;
  }

  return { totals, monthsToPayoff, totalInterest };
}

const AVALANCHE = simulate(AVALANCHE_ORDER);
const SNOWBALL = simulate(SNOWBALL_ORDER);
const STARTING_TOTAL = DEBTS.reduce((s, d) => s + d.balance, 0);
const RACE_MONTHS = Math.max(AVALANCHE.monthsToPayoff, SNOWBALL.monthsToPayoff);

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 280;
const PAD_LEFT = 56;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

function xFor(month: number): number {
  return PAD_LEFT + (month / RACE_MONTHS) * PLOT_WIDTH;
}

export function PayoffRaceChart() {
  const { avalanchePath, snowballPath } = useMemo(() => {
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / STARTING_TOTAL) * PLOT_HEIGHT;
    const toPath = (values: number[]) =>
      values
        .slice(0, RACE_MONTHS + 1)
        .map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
        .join(" ");
    return { avalanchePath: toPath(AVALANCHE.totals), snowballPath: toPath(SNOWBALL.totals) };
  }, []);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(STARTING_TOTAL)} across three debts, {formatCurrency(MONTHLY_BUDGET)}
        {" "}a month
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`Avalanche pays off all debt in ${AVALANCHE.monthsToPayoff} months, paying ${formatCurrency(AVALANCHE.totalInterest)} in interest. Snowball pays off in ${SNOWBALL.monthsToPayoff} months, paying ${formatCurrency(SNOWBALL.totalInterest)} in interest.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          <path d={avalanchePath} fill="none" stroke="var(--learn-series-1)" strokeWidth={2.4} />
          <path d={snowballPath} fill="none" stroke="var(--learn-series-3)" strokeWidth={2} strokeDasharray="5 4" />

          {Array.from({ length: 5 }, (_, i) => Math.round((RACE_MONTHS / 4) * i)).map((m) => (
            <text key={m} x={xFor(m)} y={VIEW_HEIGHT - PAD_BOTTOM + 20} textAnchor="middle" fontSize={12} fill="var(--learn-ink-subtle)">
              {m}
            </text>
          ))}
          <text x={PAD_LEFT + PLOT_WIDTH / 2} y={VIEW_HEIGHT - 4} textAnchor="middle" fontSize={12} fill="var(--learn-ink-muted)">
            months
          </text>
        </svg>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-1" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Avalanche — highest APR first</h3>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Debt-free in {AVALANCHE.monthsToPayoff} months. Total interest paid:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(AVALANCHE.totalInterest)}
            </span>
            .
          </p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-3" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Snowball — smallest balance first</h3>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Debt-free in {SNOWBALL.monthsToPayoff} months. Total interest paid:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(SNOWBALL.totalInterest)}
            </span>{" "}
            — clears Card B first, which is where the early motivation comes from.
          </p>
        </div>
      </div>
    </figure>
  );
}
