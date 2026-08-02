"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

const PRINCIPAL = 20000;
const APR = 6;
const MONTHLY_RATE = APR / 100 / 12;
const TERM_MONTHS = 60;

const PAYMENT =
  (PRINCIPAL * MONTHLY_RATE) / (1 - Math.pow(1 + MONTHLY_RATE, -TERM_MONTHS));

interface ScheduleRow {
  month: number;
  interest: number;
  principal: number;
  balance: number;
}

function buildSchedule(): ScheduleRow[] {
  let balance = PRINCIPAL;
  const rows: ScheduleRow[] = [];
  for (let month = 1; month <= TERM_MONTHS; month += 1) {
    const interest = balance * MONTHLY_RATE;
    const principal = Math.min(PAYMENT - interest, balance);
    balance = Math.max(balance - principal, 0);
    rows.push({ month, interest, principal, balance });
  }
  return rows;
}

const SCHEDULE = buildSchedule();

/** Total interest paid if a one-time extra principal payment is made in `extraMonth`. */
function totalInterestWithExtra(extraMonth: number, extraAmount: number): number {
  let balance = PRINCIPAL;
  let totalInterest = 0;
  for (let month = 1; month <= TERM_MONTHS; month += 1) {
    if (balance <= 0) break;
    const interest = balance * MONTHLY_RATE;
    const principal = Math.min(PAYMENT - interest, balance);
    totalInterest += interest;
    balance = Math.max(balance - principal, 0);
    if (month === extraMonth && balance > 0) {
      const extra = Math.min(extraAmount, balance);
      balance -= extra;
    }
  }
  return totalInterest;
}

const BASELINE_INTEREST = SCHEDULE.reduce((sum, row) => sum + row.interest, 0);
const EXTRA_AMOUNT = 1000;
const EARLY_EXTRA_INTEREST = totalInterestWithExtra(1, EXTRA_AMOUNT);
const LATE_EXTRA_INTEREST = totalInterestWithExtra(TERM_MONTHS - 5, EXTRA_AMOUNT);

export function AmortizationSchedule() {
  const [month, setMonth] = useState(1);
  const row = SCHEDULE[month - 1];

  const interestShare = useMemo(() => (row.interest / PAYMENT) * 100, [row]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(PRINCIPAL)} loan, {APR}% APR, {TERM_MONTHS} monthly payments of{" "}
        {formatCurrency(PAYMENT)}
      </figcaption>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setMonth((m) => Math.max(1, m - 1))}
          disabled={month === 1}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong disabled:opacity-40 motion-reduce:transition-none"
        >
          ← Earlier
        </button>
        <span className="text-[14px] font-semibold text-learn-strong">Month {month} of {TERM_MONTHS}</span>
        <button
          type="button"
          onClick={() => setMonth((m) => Math.min(TERM_MONTHS, m + 1))}
          disabled={month === TERM_MONTHS}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong disabled:opacity-40 motion-reduce:transition-none"
        >
          Later →
        </button>
      </div>

      <input
        type="range"
        min={1}
        max={TERM_MONTHS}
        step={1}
        value={month}
        onChange={(event) => setMonth(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />

      <div className="mt-5">
        <div className="flex h-8 w-full overflow-hidden rounded-full border-[0.5px] border-learn-line">
          <div
            className="flex items-center justify-center bg-learn-series-2 text-[11px] font-semibold text-white transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{ width: `${interestShare}%` }}
          >
            {interestShare > 14 && "Interest"}
          </div>
          <div
            className="flex items-center justify-center bg-learn-accent text-[11px] font-semibold text-white transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{ width: `${100 - interestShare}%` }}
          >
            {100 - interestShare > 14 && "Principal"}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Interest</p>
            <p className="font-[family-name:var(--learn-font-mono)] text-[16px] tabular-nums text-learn-strong">
              {formatCurrency(row.interest)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Principal</p>
            <p className="font-[family-name:var(--learn-font-mono)] text-[16px] tabular-nums text-learn-strong">
              {formatCurrency(row.principal)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Balance left</p>
            <p className="font-[family-name:var(--learn-font-mono)] text-[16px] tabular-nums text-learn-strong">
              {formatCurrency(row.balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <h3 className="text-[15px] font-semibold text-learn-strong">
          A one-time {formatCurrency(EXTRA_AMOUNT)} extra payment
        </h3>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          Applied in month 1, it saves{" "}
          <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
            {formatCurrency(BASELINE_INTEREST - EARLY_EXTRA_INTEREST)}
          </span>{" "}
          in interest over the life of the loan. Applied in month {TERM_MONTHS - 5}, near the end,
          it saves only{" "}
          <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
            {formatCurrency(BASELINE_INTEREST - LATE_EXTRA_INTEREST)}
          </span>
          . The same dollar amount, the same loan — the only difference is how many months of
          interest it had left to prevent.
        </p>
      </div>
    </figure>
  );
}
