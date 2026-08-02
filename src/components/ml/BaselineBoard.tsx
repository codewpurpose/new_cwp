"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { formatPercent } from "@/lib/ml/format";
import { BEST_BASELINE, CONTESTANTS, PASS_RATE, TEST, TRAIN } from "@/lib/ml/baseline-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const ROW_HEIGHT = 46;
const VIEW_HEIGHT = CONTESTANTS.length * ROW_HEIGHT + 30;
const PAD_LEFT = 176;
const PAD_RIGHT = 58;

const xAccuracy = linearScale([0.4, 0.92], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const BASELINE_X = xAccuracy(BEST_BASELINE.accuracy);

export function BaselineBoard() {
  const [activeKey, setActiveKey] = useState(CONTESTANTS[2].key);
  const active = CONTESTANTS.find((c) => c.key === activeKey) ?? CONTESTANTS[0];
  const losesToBaseline = active.kind === "model" && active.accuracy <= BEST_BASELINE.accuracy;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The race
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Four hundred students and six recorded columns, of which one has anything to do with
        passing. Everybody trains on the same {TRAIN.length} and is marked on the same{" "}
        {TEST.length}. {formatPercent(PASS_RATE)} of them passed.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={CONTESTANTS.map(
            (c) => `${c.name} scores ${formatPercent(c.accuracy)}.`,
          ).join(" ")}
        >
          <line
            x1={BASELINE_X}
            y1={6}
            x2={BASELINE_X}
            y2={CONTESTANTS.length * ROW_HEIGHT + 4}
            stroke="var(--learn-chart-truth)"
            strokeWidth={1.8}
            strokeDasharray="5 4"
          />
          <text
            x={BASELINE_X}
            y={CONTESTANTS.length * ROW_HEIGHT + 22}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            best baseline
          </text>

          {CONTESTANTS.map((c, i) => {
            const y = 24 + i * ROW_HEIGHT;
            const beaten = c.kind === "model" && c.accuracy <= BEST_BASELINE.accuracy;
            const fill = beaten
              ? "var(--learn-chart-error)"
              : c.kind === "baseline"
                ? "var(--learn-series-3)"
                : "var(--learn-series-1)";
            return (
              <g key={c.key} opacity={c.key === activeKey ? 1 : 0.45}>
                <text x={6} y={y + 4} fontSize={12} fill="var(--learn-ink-muted)">
                  {c.name.length > 26 ? `${c.name.slice(0, 25)}…` : c.name}
                </text>
                <rect
                  x={PAD_LEFT}
                  y={y - 10}
                  width={Math.max(1, xAccuracy(c.accuracy) - PAD_LEFT)}
                  height={20}
                  rx={2}
                  fill={fill}
                  opacity={beaten ? 0.75 : 1}
                />
                <text
                  x={xAccuracy(c.accuracy) + 8}
                  y={y + 4}
                  fontSize={12}
                  fill="var(--learn-ink)"
                  className="tabular-nums"
                >
                  {formatPercent(c.accuracy)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CONTESTANTS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActiveKey(c.key)}
            aria-pressed={c.key === activeKey}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              c.key === activeKey
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[14px] leading-[1.55] text-learn-strong">{active.description}</p>

      <div className="mt-3">
        <CodeBlock label={active.kind === "baseline" ? "baseline" : "model"} code={active.code} />
      </div>

      {losesToBaseline && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
          This is a real model, properly trained, and it scores{" "}
          {formatPercent(BEST_BASELINE.accuracy - active.accuracy)} <em>below</em> a single
          if-statement. Without the baseline in the room, {formatPercent(active.accuracy)} would
          have sounded like a result.
        </p>
      )}
    </figure>
  );
}
