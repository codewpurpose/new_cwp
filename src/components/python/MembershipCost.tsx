"use client";

import { useState } from "react";
import { formatCount } from "@/lib/ml/format";

/**
 * How many items each structure has to look at to answer `x in collection`.
 *
 * The numbers are the definitions, not a benchmark: a list scans until it finds
 * a match, so a value that is absent costs one comparison per item; a set hashes
 * the value and lands on the right bucket, which is one look regardless of size.
 * Nothing is timed here, and nothing should be — a stopwatch would make this
 * chart depend on the machine that drew it.
 *
 * Hand-written SVG with a fluid viewBox, per the track's charting rule. The two
 * series differ in dash pattern as well as hue, because fern and indigo are not
 * far enough apart under deuteranopia to carry the distinction alone.
 */

const W = 520;
const H = 230;
const PAD_L = 56;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 38;
const MAX_N = 10000;

const plotW = W - PAD_L - PAD_R;
const plotH = H - PAD_T - PAD_B;

const x = (n: number) => PAD_L + (n / MAX_N) * plotW;
const y = (checks: number) => H - PAD_B - (checks / MAX_N) * plotH;

const TICKS = [0, 2500, 5000, 7500, 10000];

export function MembershipCost() {
  const [n, setN] = useState(4000);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Checks performed by <span className="font-[family-name:var(--learn-font-mono)]">x in collection</span>, when x is not there
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label={`With ${formatCount(n)} items, a list performs ${formatCount(n)} checks and a set performs 1.`}
      >
        <rect width={W} height={H} fill="var(--learn-chart-plot)" rx={6} />

        {TICKS.map((tick) => (
          <g key={tick}>
            <line
              x1={x(tick)}
              y1={PAD_T}
              x2={x(tick)}
              y2={H - PAD_B}
              stroke="var(--learn-chart-grid)"
              strokeWidth={1}
            />
            <text
              x={x(tick)}
              y={H - PAD_B + 16}
              textAnchor="middle"
              fontSize={11}
              fill="var(--learn-ink-subtle)"
            >
              {formatCount(tick)}
            </text>
          </g>
        ))}

        <line
          x1={PAD_L}
          y1={H - PAD_B}
          x2={W - PAD_R}
          y2={H - PAD_B}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1.2}
        />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="var(--learn-chart-axis)" strokeWidth={1.2} />

        {/* list: one comparison per item */}
        <line
          x1={x(0)}
          y1={y(0)}
          x2={x(MAX_N)}
          y2={y(MAX_N)}
          stroke="var(--learn-series-2)"
          strokeWidth={2.2}
        />
        {/* set: one hash, then one look */}
        <line
          x1={x(0)}
          y1={y(1)}
          x2={x(MAX_N)}
          y2={y(1)}
          stroke="var(--learn-series-3)"
          strokeWidth={2.2}
          strokeDasharray="6 4"
        />

        <line
          x1={x(n)}
          y1={PAD_T}
          x2={x(n)}
          y2={H - PAD_B}
          stroke="var(--learn-ink-strong)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <circle cx={x(n)} cy={y(n)} r={5} fill="var(--learn-series-2)" />
        <rect x={x(n) - 4.5} y={y(1) - 4.5} width={9} height={9} fill="var(--learn-series-3)" />

        <text x={PAD_L - 10} y={PAD_T + 8} textAnchor="end" fontSize={11} fill="var(--learn-ink-subtle)">
          {formatCount(MAX_N)}
        </text>
        <text x={PAD_L - 10} y={H - PAD_B} textAnchor="end" fontSize={11} fill="var(--learn-ink-subtle)">
          0
        </text>
      </svg>

      <label className="mt-4 block">
        <span className="text-[13px] text-learn-muted">Items in the collection</span>
        <input
          type="range"
          min={100}
          max={MAX_N}
          step={100}
          value={n}
          onChange={(event) => setN(Number(event.target.value))}
          className="learn-focusable mt-2 w-full accent-learn-accent"
        />
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-white px-4 py-3">
          <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
            {`${formatCount(n)} in a list`}
          </p>
          <p className="mt-1 text-[20px] font-semibold text-learn-series-2">{formatCount(n)}</p>
          <p className="text-[12px] text-learn-subtle">checks, every one of them</p>
        </div>
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-white px-4 py-3">
          <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
            {`${formatCount(n)} in a set`}
          </p>
          <p className="mt-1 text-[20px] font-semibold text-learn-series-3">1</p>
          <p className="text-[12px] text-learn-subtle">check, at any size</p>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {`At ${formatCount(n)} items the list does ${formatCount(n)} times the work to reach the same answer, and the gap widens with every item you add. The set's line is flat because hashing the value tells it where to look, so the size of the collection never enters into it.`}
      </p>
    </figure>
  );
}
