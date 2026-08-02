"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

/** A fixed illustrative take-home pay. Every slider below divides this same amount. */
const INCOME = 3200;

interface Category {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

const CATEGORIES: readonly Category[] = [
  { key: "housing", label: "Housing", min: 0, max: 2000, step: 25 },
  { key: "food", label: "Food", min: 0, max: 800, step: 25 },
  { key: "transportation", label: "Transportation", min: 0, max: 600, step: 25 },
  { key: "fun", label: "Fun", min: 0, max: 600, step: 25 },
  { key: "savings", label: "Savings", min: 0, max: 1200, step: 25 },
];

const DEFAULTS: Record<string, number> = {
  housing: 1200,
  food: 400,
  transportation: 250,
  fun: 200,
  savings: 400,
};

/** Roughly a 50/30/20 split across these five categories, rounded to the nearest $25. */
const FIFTY_THIRTY_TWENTY: Record<string, number> = {
  housing: 1200,
  food: 375,
  transportation: 225,
  fun: 750,
  savings: 650,
};

export function BudgetAllocator() {
  const [amounts, setAmounts] = useState<Record<string, number>>(DEFAULTS);
  const sliderIdBase = useId();

  const total = useMemo(
    () => CATEGORIES.reduce((sum, cat) => sum + amounts[cat.key], 0),
    [amounts],
  );
  const remainder = INCOME - total;
  const overBudget = remainder < 0;

  const setAmount = (key: string, value: number) =>
    setAmounts((prev) => ({ ...prev, [key]: value }));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(INCOME)} a month to allocate
      </figcaption>

      <div className="mt-5 space-y-5">
        {CATEGORIES.map((cat) => {
          const value = amounts[cat.key];
          const sliderId = `${sliderIdBase}-${cat.key}`;
          const share = (value / INCOME) * 100;
          return (
            <div key={cat.key}>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={sliderId} className="text-[14px] font-semibold text-learn-strong">
                  {cat.label}
                </label>
                <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums text-learn-strong">
                  {formatCurrency(value)}
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min={cat.min}
                max={cat.max}
                step={cat.step}
                value={value}
                onChange={(event) => setAmount(cat.key, Number(event.target.value))}
                className="mt-2 w-full accent-learn-accent"
              />
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-learn-sunken">
                <div
                  className="h-full rounded-full bg-learn-accent transition-[width] duration-200 ease-out motion-reduce:transition-none"
                  style={{ width: `${Math.min(share, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-6 rounded-learn-lg border-[0.5px] p-5 ${
          overBudget
            ? "border-learn-danger-line bg-learn-danger-bg"
            : "border-learn-success-line bg-learn-success-bg"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={`text-[15px] font-semibold ${
              overBudget ? "text-learn-danger-fg" : "text-learn-success-fg"
            }`}
          >
            {overBudget ? "Over budget" : "Left unassigned"}
          </h3>
          <span
            className={`font-[family-name:var(--learn-font-mono)] text-[22px] leading-none tabular-nums ${
              overBudget ? "text-learn-danger-fg" : "text-learn-success-fg"
            }`}
          >
            {formatCurrency(remainder)}
          </span>
        </div>
        <p
          className={`mt-2 text-[13px] leading-[1.5] ${
            overBudget ? "text-learn-danger-fg" : "text-learn-success-fg"
          }`}
        >
          {overBudget
            ? `These five categories now add up to ${formatCurrency(total)} against ${formatCurrency(INCOME)} of income. Something above has to come down before this budget is real.`
            : `${formatCurrency(total)} assigned, ${formatCurrency(remainder)} still unassigned — put it toward savings, or leave it as a buffer for the categories that vary most.`}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setAmounts(DEFAULTS)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setAmounts(FIFTY_THIRTY_TWENTY)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Try a 50/30/20 split
        </button>
      </div>
    </figure>
  );
}
