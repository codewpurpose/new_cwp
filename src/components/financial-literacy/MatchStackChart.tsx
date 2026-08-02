"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

const SALARY = 60000;
const MAX_PERCENT = 10;
/** 100% match on the first 3% contributed, 50% match on the next 2% — a common structure. */
const FULL_MATCH_CAP = 3;
const HALF_MATCH_CAP = 2;

function matchPercent(contributionPercent: number): number {
  const fullTier = Math.min(contributionPercent, FULL_MATCH_CAP);
  const halfTier = Math.min(Math.max(contributionPercent - FULL_MATCH_CAP, 0), HALF_MATCH_CAP);
  return fullTier + halfTier * 0.5;
}

const MAX_MATCH_PERCENT = matchPercent(FULL_MATCH_CAP + HALF_MATCH_CAP);
const BAR_MAX = SALARY * ((MAX_PERCENT + MAX_MATCH_PERCENT) / 100);

export function MatchStackChart() {
  const [percent, setPercent] = useState(3);
  const sliderId = useId();

  const { employeeAmount, matchAmount, totalAmount, employeeShare, matchShare } = useMemo(() => {
    const match = matchPercent(percent);
    const employee = SALARY * (percent / 100);
    const employer = SALARY * (match / 100);
    const total = employee + employer;
    return {
      employeeAmount: employee,
      matchAmount: employer,
      totalAmount: total,
      employeeShare: (employee / BAR_MAX) * 100,
      matchShare: (employer / BAR_MAX) * 100,
    };
  }, [percent]);

  const leftOnTable = SALARY * ((MAX_MATCH_PERCENT - matchPercent(percent)) / 100);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        {formatCurrency(SALARY)} salary, 100% match on the first 3%, 50% match on the next 2%
      </figcaption>

      <label htmlFor={sliderId} className="mt-5 flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
        <span>Your contribution</span>
        <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{formatPercent(percent, 1)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_PERCENT}
        step={0.5}
        value={percent}
        onChange={(event) => setPercent(Number(event.target.value))}
        className="mt-2 w-full accent-learn-accent"
      />

      <div className="mt-6 h-10 w-full overflow-hidden rounded-learn-md border-[0.5px] border-learn-line">
        <div className="flex h-full w-full">
          <div
            className="flex items-center justify-center bg-learn-accent text-[11px] font-semibold text-white transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{ width: `${employeeShare}%` }}
          >
            {employeeShare > 12 && "You"}
          </div>
          <div
            className="flex items-center justify-center bg-learn-series-4 text-[11px] font-semibold text-white transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{ width: `${matchShare}%` }}
          >
            {matchShare > 8 && "Match"}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">You contribute</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[17px] tabular-nums text-learn-strong">
            {formatCurrency(employeeAmount)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Employer match</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[17px] tabular-nums text-learn-strong">
            {formatCurrency(matchAmount)}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Total saved</p>
          <p className="font-[family-name:var(--learn-font-mono)] text-[17px] tabular-nums text-learn-strong">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      {leftOnTable > 0 ? (
        <p className="mt-4 text-[13px] leading-[1.5] text-learn-accent-text">
          Contributing less than {formatPercent(FULL_MATCH_CAP + HALF_MATCH_CAP)} leaves{" "}
          {formatCurrency(leftOnTable)} of employer match unclaimed this year — money the plan
          would have paid regardless.
        </p>
      ) : (
        <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
          The full match is claimed at {formatPercent(FULL_MATCH_CAP + HALF_MATCH_CAP)} — anything
          contributed beyond that grows the account without any further match.
        </p>
      )}
    </figure>
  );
}
