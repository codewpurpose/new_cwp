"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

const TARGET_MONTHS = 6;

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState(2800);
  const [balance, setBalance] = useState(5000);
  const expensesId = useId();
  const balanceId = useId();

  const months = useMemo(() => (expenses > 0 ? balance / expenses : 0), [balance, expenses]);
  const monthsLabel = months.toFixed(1);
  const barWidth = Math.min((months / TARGET_MONTHS) * 100, 100);

  const tone =
    months >= 6 ? "success" : months >= 3 ? "tip" : "warning";
  const toneClasses = {
    success: { bar: "bg-learn-accent", box: "border-learn-success-line bg-learn-success-bg text-learn-success-fg" },
    tip: { bar: "bg-learn-accent", box: "border-learn-line bg-learn-sunken text-learn-strong" },
    warning: { bar: "bg-learn-series-2", box: "border-learn-warning-line bg-learn-warning-bg text-learn-warning-fg" },
  } as const;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        How many months would your savings cover?
      </figcaption>

      <div className="mt-5 space-y-5">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={expensesId} className="text-[14px] font-semibold text-learn-strong">
              Essential monthly expenses
            </label>
            <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums text-learn-strong">
              {formatCurrency(expenses)}
            </span>
          </div>
          <input
            id={expensesId}
            type="range"
            min={800}
            max={6000}
            step={100}
            value={expenses}
            onChange={(event) => setExpenses(Number(event.target.value))}
            className="mt-2 w-full accent-learn-accent"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={balanceId} className="text-[14px] font-semibold text-learn-strong">
              Current savings balance
            </label>
            <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums text-learn-strong">
              {formatCurrency(balance)}
            </span>
          </div>
          <input
            id={balanceId}
            type="range"
            min={0}
            max={30000}
            step={250}
            value={balance}
            onChange={(event) => setBalance(Number(event.target.value))}
            className="mt-2 w-full accent-learn-accent"
          />
        </div>
      </div>

      <div className={`mt-6 rounded-learn-lg border-[0.5px] p-5 ${toneClasses[tone].box}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold">Months of coverage</h3>
          <span className="font-[family-name:var(--learn-font-mono)] text-[22px] leading-none tabular-nums">
            {monthsLabel}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
          <div
            className={`h-full rounded-full transition-[width] duration-200 ease-out motion-reduce:transition-none ${toneClasses[tone].bar}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <p className="mt-3 text-[13px] leading-[1.5]">
          {formatCurrency(balance)} ÷ {formatCurrency(expenses)} a month ={" "}
          {monthsLabel} months covered, against a {TARGET_MONTHS}-month target.{" "}
          {months >= TARGET_MONTHS
            ? "This balance clears the standard target on its own."
            : `Roughly ${formatCurrency(Math.max(expenses * TARGET_MONTHS - balance, 0))} more would close the gap.`}
        </p>
      </div>
    </figure>
  );
}
