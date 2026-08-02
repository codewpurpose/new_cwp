"use client";

import { useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

const PURCHASES = [
  { label: "Groceries", amount: 180 },
  { label: "Gas", amount: 60 },
  { label: "Streaming subscription", amount: 15 },
  { label: "New shoes", amount: 95 },
  { label: "Restaurant", amount: 75 },
  { label: "Electronics", amount: 425 },
] as const;

const STATEMENT_BALANCE = PURCHASES.reduce((sum, p) => sum + p.amount, 0);
const APR = 24.99;
const MONTHLY_RATE = APR / 100 / 12;
const MIN_PAYMENT = Math.max(35, Math.round(STATEMENT_BALANCE * 0.02));

type Choice = "full" | "minimum";

export function StatementSimulator() {
  const [choice, setChoice] = useState<Choice>("full");

  const { paid, remaining, interest, newBalance } = useMemo(() => {
    if (choice === "full") {
      return { paid: STATEMENT_BALANCE, remaining: 0, interest: 0, newBalance: 0 };
    }
    const afterPayment = STATEMENT_BALANCE - MIN_PAYMENT;
    const addedInterest = afterPayment * MONTHLY_RATE;
    return {
      paid: MIN_PAYMENT,
      remaining: afterPayment,
      interest: addedInterest,
      newBalance: afterPayment + addedInterest,
    };
  }, [choice]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        This month&apos;s statement
      </figcaption>

      <ul className="mt-4 space-y-1.5">
        {PURCHASES.map((purchase) => (
          <li key={purchase.label} className="flex items-baseline justify-between text-[13px] text-learn-muted">
            <span>{purchase.label}</span>
            <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
              {formatCurrency(purchase.amount)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-baseline justify-between border-t-[0.5px] border-learn-line pt-3 text-[14px] font-semibold text-learn-strong">
        <span>Statement balance</span>
        <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
          {formatCurrency(STATEMENT_BALANCE)}
        </span>
      </div>

      <div className="mt-6">
        <SegmentedControl
          label="How you pay this statement"
          value={choice}
          onValueChange={setChoice}
          options={[
            { value: "full", label: "Pay in full" },
            { value: "minimum", label: `Pay minimum (${formatCurrency(MIN_PAYMENT)})` },
          ]}
        />
      </div>

      <div
        className={`mt-5 rounded-learn-lg border-[0.5px] p-5 ${
          choice === "full"
            ? "border-learn-success-line bg-learn-success-bg text-learn-success-fg"
            : "border-learn-warning-line bg-learn-warning-bg text-learn-warning-fg"
        }`}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] opacity-80">You pay now</p>
            <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums">
              {formatCurrency(paid)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] opacity-80">Interest charged</p>
            <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums">
              {formatCurrency(interest)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] opacity-80">Next statement opens at</p>
            <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] tabular-nums">
              {formatCurrency(newBalance)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-[1.5]">
          {choice === "full"
            ? `Paid in full before the due date, so the ${formatPercent(APR, 2)} APR never applies — this purchase ends up costing exactly its sticker price.`
            : `Paying only the ${formatCurrency(MIN_PAYMENT)} minimum leaves ${formatCurrency(remaining)} carrying over, and ${formatPercent(APR, 2)} APR adds ${formatCurrency(interest)} in interest before next month's statement even opens.`}
        </p>
      </div>
    </figure>
  );
}
