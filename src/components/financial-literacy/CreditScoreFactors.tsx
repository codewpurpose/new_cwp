"use client";

import { useState } from "react";
import { formatPercent } from "@/lib/finance-format";

interface Factor {
  key: string;
  label: string;
  weight: number;
  detail: string;
}

const FACTORS: readonly Factor[] = [
  {
    key: "payment-history",
    label: "Payment history",
    weight: 35,
    detail: "Whether you've paid on time. One payment 30+ days late can stay on a report for seven years.",
  },
  {
    key: "amounts-owed",
    label: "Amounts owed",
    weight: 30,
    detail: "Mostly your credit utilization — the share of your available credit currently in use, across every card.",
  },
  {
    key: "length-of-history",
    label: "Length of credit history",
    weight: 15,
    detail: "How long your accounts have existed. This is the one factor that only improves by waiting.",
  },
  {
    key: "new-credit",
    label: "New credit",
    weight: 10,
    detail: "Recent applications and hard inquiries. A handful in a short window reads as risk-seeking.",
  },
  {
    key: "credit-mix",
    label: "Credit mix",
    weight: 10,
    detail: "Whether you've handled different types of credit — a card and a loan, say — responsibly.",
  },
];

export function CreditScoreFactors() {
  const [selected, setSelected] = useState<string>(FACTORS[0].key);
  const active = FACTORS.find((f) => f.key === selected) ?? FACTORS[0];
  const maxWeight = Math.max(...FACTORS.map((f) => f.weight));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The five factors, by weight
      </figcaption>

      <div className="mt-5 space-y-3">
        {FACTORS.map((factor) => {
          const isActive = factor.key === selected;
          return (
            <button
              key={factor.key}
              type="button"
              onClick={() => setSelected(factor.key)}
              aria-pressed={isActive}
              className="learn-focusable block w-full text-left"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`text-[14px] font-semibold ${isActive ? "text-learn-strong" : "text-learn-muted"}`}
                >
                  {factor.label}
                </span>
                <span className="font-[family-name:var(--learn-font-mono)] text-[14px] tabular-nums text-learn-strong">
                  {formatPercent(factor.weight)}
                </span>
              </div>
              <div className="mt-1.5 h-4 w-full overflow-hidden rounded-full bg-learn-sunken">
                <div
                  className={`h-full rounded-full transition-[width] duration-200 ease-out motion-reduce:transition-none ${
                    isActive ? "bg-learn-accent" : "bg-learn-chart-muted-mark"
                  }`}
                  style={{ width: `${(factor.weight / maxWeight) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-quiet p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-learn-strong opacity-80">
          {active.label} — {formatPercent(active.weight)}
        </p>
        <p className="mt-2 text-[14px] leading-[1.5] text-learn-strong">{active.detail}</p>
      </div>
    </figure>
  );
}
