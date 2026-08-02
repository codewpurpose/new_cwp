"use client";

import { useId, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/finance-format";

const ANNUAL_RATE = 0.07;
const MAX_YEARS = 30;

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 260;
const PAD_LEFT = 64;
const PAD_RIGHT = 18;
const PAD_TOP = 22;
const PAD_BOTTOM = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

export function OpportunityCostChart() {
  const [price, setPrice] = useState(2000);
  const [years, setYears] = useState(10);
  const priceId = useId();
  const yearsId = useId();

  const finalValue = price * Math.pow(1 + ANNUAL_RATE, years);

  const { path, maxValue } = useMemo(() => {
    const values = Array.from({ length: years + 1 }, (_, y) => price * Math.pow(1 + ANNUAL_RATE, y));
    const max = Math.max(...values);
    const xFor = (y: number) => PAD_LEFT + (y / years) * PLOT_WIDTH;
    const yFor = (value: number) => PAD_TOP + PLOT_HEIGHT - (value / max) * PLOT_HEIGHT;
    return {
      path: values.map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" "),
      maxValue: max,
    };
  }, [price, years]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        What this purchase could have become instead
      </figcaption>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor={priceId} className="flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
            <span>Purchase price</span>
            <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{formatCurrency(price)}</span>
          </label>
          <input
            id={priceId}
            type="range"
            min={200}
            max={10000}
            step={100}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="mt-2 w-full accent-learn-accent"
          />
        </div>
        <div>
          <label htmlFor={yearsId} className="flex items-baseline justify-between gap-3 text-[14px] font-semibold text-learn-strong">
            <span>Years invested instead</span>
            <span className="font-[family-name:var(--learn-font-mono)] text-[15px] tabular-nums">{years}</span>
          </label>
          <input
            id={yearsId}
            type="range"
            min={1}
            max={MAX_YEARS}
            step={1}
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className="mt-2 w-full accent-learn-accent"
          />
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[520px]"
          role="img"
          aria-label={`${formatCurrency(price)} invested at a 7% average annual return for ${years} years grows to ${formatCurrency(finalValue)}.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_HEIGHT} x2={VIEW_WIDTH - PAD_RIGHT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_HEIGHT} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <path d={path} fill="none" stroke="var(--learn-accent)" strokeWidth={2.4} />
          {Array.from({ length: 5 }, (_, i) => Math.round((years / 4) * i)).map((y) => (
            <text key={y} x={PAD_LEFT + (y / years) * PLOT_WIDTH} y={VIEW_HEIGHT - PAD_BOTTOM + 20} textAnchor="middle" fontSize={12} fill="var(--learn-ink-subtle)">
              {y}
            </text>
          ))}
          <text x={PAD_LEFT + PLOT_WIDTH / 2} y={VIEW_HEIGHT - 4} textAnchor="middle" fontSize={12} fill="var(--learn-ink-muted)">
            years
          </text>
          <text x={4} y={PAD_TOP + 6} fontSize={11} fill="var(--learn-ink-subtle)">
            {formatCurrency(maxValue)}
          </text>
        </svg>
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-accent bg-learn-quiet p-5">
        <p className="text-[15px] leading-[1.5] text-learn-strong">
          <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">{formatCurrency(price)}</span>
          {" "}invested at a 7% average annual return instead of spent would grow to{" "}
          <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">{formatCurrency(finalValue)}</span>
          {" "}after {years} years.
        </p>
      </div>
    </figure>
  );
}
