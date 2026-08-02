"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/finance-format";

const START_BALANCE = 1000;
const APR = 22.99;
const MONTHLY_RATE = APR / 100 / 12;
const MONTHS = 12;
const FIXED_PAYMENT = 100;

interface MonthResult {
  balances: number[];
  totalInterest: number;
  monthsToPayoff: number | null;
}

function simulate(paymentFor: (balance: number) => number): MonthResult {
  let balance = START_BALANCE;
  const balances = [balance];
  let totalInterest = 0;
  let monthsToPayoff: number | null = null;

  for (let month = 1; month <= MONTHS; month += 1) {
    if (balance <= 0) {
      balances.push(0);
      continue;
    }
    const interest = balance * MONTHLY_RATE;
    const payment = Math.min(paymentFor(balance), balance + interest);
    balance = Math.max(balance + interest - payment, 0);
    totalInterest += interest;
    balances.push(balance);
    if (balance === 0 && monthsToPayoff === null) monthsToPayoff = month;
  }

  return { balances, totalInterest, monthsToPayoff };
}

const MIN_PAYMENT_RESULT = simulate((balance) => Math.max(25, balance * 0.02));
const FIXED_PAYMENT_RESULT = simulate(() => FIXED_PAYMENT);

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 280;
const PAD_LEFT = 56;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

function xFor(month: number): number {
  return PAD_LEFT + (month / MONTHS) * PLOT_WIDTH;
}

export function MinimumPaymentChart() {
  const { minPath, fixedPath } = useMemo(() => {
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / START_BALANCE) * PLOT_HEIGHT;
    const toPath = (values: number[]) =>
      values.map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");
    return {
      minPath: toPath(MIN_PAYMENT_RESULT.balances),
      fixedPath: toPath(FIXED_PAYMENT_RESULT.balances),
    };
  }, []);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(START_BALANCE)} carried for a year
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`Paying only the minimum on a ${formatCurrency(START_BALANCE)} balance leaves ${formatCurrency(MIN_PAYMENT_RESULT.balances[12])} still owed after 12 months, and costs ${formatCurrency(MIN_PAYMENT_RESULT.totalInterest)} in interest. Paying ${formatCurrency(FIXED_PAYMENT)} a month clears the balance in ${FIXED_PAYMENT_RESULT.monthsToPayoff} months for ${formatCurrency(FIXED_PAYMENT_RESULT.totalInterest)} in interest.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          <path d={minPath} fill="none" stroke="var(--learn-series-2)" strokeWidth={2.4} />
          <path d={fixedPath} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} strokeDasharray="5 4" />

          {[0, 3, 6, 9, 12].map((m) => (
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
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-2" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">Minimum payments only</h3>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Balance after 12 months: still{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(MIN_PAYMENT_RESULT.balances[12])}
            </span>
            , after paying{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(MIN_PAYMENT_RESULT.totalInterest)}
            </span>{" "}
            in interest.
          </p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-learn-series-1" aria-hidden="true" />
            <h3 className="text-[15px] font-semibold text-learn-strong">{formatCurrency(FIXED_PAYMENT)} a month</h3>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Paid off in{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {FIXED_PAYMENT_RESULT.monthsToPayoff}
            </span>{" "}
            months, for{" "}
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(FIXED_PAYMENT_RESULT.totalInterest)}
            </span>{" "}
            in interest.
          </p>
        </div>
      </div>
    </figure>
  );
}
