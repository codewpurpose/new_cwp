"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

interface Bracket {
  rate: number;
  from: number;
  to: number | null;
  color: string;
}

/** Illustrative single-filer brackets, simplified from real federal brackets. */
const BRACKETS: readonly Bracket[] = [
  { rate: 10, from: 0, to: 11600, color: "var(--learn-series-1)" },
  { rate: 12, from: 11600, to: 47150, color: "var(--learn-accent)" },
  { rate: 22, from: 47150, to: 100525, color: "var(--learn-series-4)" },
  { rate: 24, from: 100525, to: 191950, color: "var(--learn-series-2)" },
  { rate: 32, from: 191950, to: null, color: "var(--learn-series-5)" },
];

const MAX_INCOME = 250000;

function amountInBracket(income: number, bracket: Bracket): number {
  const upper = bracket.to ?? Math.max(income, bracket.from);
  return Math.max(Math.min(income, upper) - bracket.from, 0);
}

export function TaxBracketVisualizer() {
  const [income, setIncome] = useState(60000);
  const sliderId = useId();

  const { rows, totalTax, marginalRate } = useMemo(() => {
    const built = BRACKETS.map((bracket) => {
      const amount = amountInBracket(income, bracket);
      const tax = amount * (bracket.rate / 100);
      return { ...bracket, amount, tax };
    });
    const total = built.reduce((sum, row) => sum + row.tax, 0);
    const marginal = built.reduce(
      (rate, row) => (row.amount > 0 ? row.rate : rate),
      BRACKETS[0].rate,
    );
    return { rows: built, totalTax: total, marginalRate: marginal };
  }, [income]);

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Where a dollar of income actually lands
      </figcaption>

      <label htmlFor={sliderId} className="mt-5 flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
        <span>Taxable income</span>
        <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{formatCurrency(income)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={20000}
        max={MAX_INCOME}
        step={5000}
        value={income}
        onChange={(event) => setIncome(Number(event.target.value))}
        className="mt-2 w-full accent-learn-accent"
      />

      <div className="mt-6 flex h-10 w-full overflow-hidden rounded-learn-md border-[0.5px] border-learn-line">
        {rows.map((row) => {
          const width = (row.amount / income) * 100;
          if (width <= 0) return null;
          return (
            <div
              key={row.rate}
              className="flex items-center justify-center text-[11px] font-semibold text-white"
              style={{ width: `${width}%`, backgroundColor: row.color }}
              title={`${formatPercent(row.rate)} bracket: ${formatCurrency(row.amount)}`}
            >
              {width > 10 && `${row.rate}%`}
            </div>
          );
        })}
      </div>

      <ul className="mt-4 space-y-1.5">
        {rows.filter((row) => row.amount > 0).map((row) => (
          <li key={row.rate} className="flex items-center justify-between gap-3 text-[13px] text-learn-muted">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} aria-hidden="true" />
              {formatPercent(row.rate)} bracket
            </span>
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(row.amount)} taxed at this rate = {formatCurrency(row.tax)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Marginal rate</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[22px] tabular-nums text-learn-strong">
            {formatPercent(marginalRate)}
          </p>
          <p className="mt-1 text-[13px] text-learn-muted">The rate on your next dollar earned.</p>
        </div>
        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-surface p-5">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Effective rate</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[22px] tabular-nums text-learn-strong">
            {formatPercent(effectiveRate, 1)}
          </p>
          <p className="mt-1 text-[13px] text-learn-muted">
            {formatCurrency(totalTax)} total tax ÷ {formatCurrency(income)} income.
          </p>
        </div>
      </div>
    </figure>
  );
}
