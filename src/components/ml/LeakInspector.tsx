"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { formatPercent } from "@/lib/ml/format";
import { HONEST_PIPELINE, PIPELINES } from "@/lib/ml/leakage-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const ROW_HEIGHT = 44;
const VIEW_HEIGHT = PIPELINES.length * ROW_HEIGHT + 34;
const PAD_LEFT = 150;
const PAD_RIGHT = 64;

const xScore = linearScale([0.7, 1], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const HONEST_X = xScore(HONEST_PIPELINE.honest);

export function LeakInspector() {
  const [activeKey, setActiveKey] = useState(PIPELINES[0].key);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const active = PIPELINES.find((p) => p.key === activeKey) ?? PIPELINES[0];
  const isRevealed = revealed[active.key] ?? false;
  const gap = active.reported - active.honest;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Find the leak
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The same 360 loan applications and the same model, assembled four ways. Three of these
        pipelines report a score their model will not reproduce on next month&apos;s applicants.
        Read the code before you open the answer.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PIPELINES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActiveKey(p.key)}
            aria-pressed={p.key === activeKey}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              p.key === activeKey
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <CodeBlock label="pipeline" code={active.steps.join("\n")} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">It reports</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[22px] leading-none text-learn-strong tabular-nums">
              {formatPercent(active.reported)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            What this pipeline prints, and what somebody would put in a slide.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">On real applicants</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[22px] leading-none text-learn-strong tabular-nums">
              {isRevealed ? formatPercent(active.honest) : "—"}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {isRevealed
              ? active.leak === null
                ? "The same number. There was nothing to lose."
                : `Overstated by ${formatPercent(gap)}.`
              : "Hidden until you have had a guess."}
          </p>
        </div>
      </div>

      {!isRevealed && (
        <button
          type="button"
          onClick={() => setRevealed((r) => ({ ...r, [active.key]: true }))}
          className="learn-focusable mt-4 rounded-full border-[0.5px] border-learn-inverse bg-learn-inverse px-5 py-2.5 text-sm font-medium text-learn-on-inverse"
        >
          Show me the leak
        </button>
      )}

      {isRevealed && (
        <div className="mt-4 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <h3 className="text-[15px] font-semibold text-learn-strong">
            {active.leak === null ? "No leak" : "The leak"}
          </h3>
          <p className="mt-2 text-[14px] leading-[1.55] text-learn-muted">
            {active.leak ?? "Split on time, grouped by person, using only columns that exist when the decision is made. This is the number the other three are pretending to beat."}
          </p>
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-subtle">
            <span className="font-semibold text-learn-strong">How to spot it: </span>
            {active.tell}
          </p>
        </div>
      )}

      <div className="mt-7 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Reported score against honest score for four pipelines. ` +
            PIPELINES.map(
              (p) =>
                `${p.name} reports ${formatPercent(p.reported)} against an honest ${formatPercent(p.honest)}.`,
            ).join(" ")
          }
        >
          <line
            x1={HONEST_X}
            y1={10}
            x2={HONEST_X}
            y2={PIPELINES.length * ROW_HEIGHT + 6}
            stroke="var(--learn-chart-truth)"
            strokeWidth={1.6}
            strokeDasharray="5 4"
          />
          <text
            x={HONEST_X}
            y={PIPELINES.length * ROW_HEIGHT + 24}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            honest {formatPercent(HONEST_PIPELINE.honest)}
          </text>

          {PIPELINES.map((p, i) => {
            const y = 22 + i * ROW_HEIGHT;
            const inflated = p.reported > p.honest;
            return (
              <g key={p.key} opacity={p.key === activeKey ? 1 : 0.42}>
                <text x={6} y={y + 4} fontSize={12} fill="var(--learn-ink-muted)">
                  {p.name.length > 22 ? `${p.name.slice(0, 21)}…` : p.name}
                </text>
                <rect
                  x={HONEST_X}
                  y={y - 9}
                  width={Math.max(0, xScore(p.reported) - HONEST_X)}
                  height={18}
                  rx={2}
                  fill={inflated ? "var(--learn-chart-error)" : "var(--learn-series-1)"}
                  opacity={inflated ? 0.75 : 1}
                />
                {!inflated && (
                  <circle cx={HONEST_X} cy={y} r={5} fill="var(--learn-series-1)" />
                )}
                <text
                  x={xScore(p.reported) + 8}
                  y={y + 4}
                  fontSize={12}
                  fill="var(--learn-ink)"
                  className="tabular-nums"
                >
                  {formatPercent(p.reported)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-1 text-[12px] leading-[1.5] text-learn-subtle">
        Each bar is how far that pipeline&apos;s reported score sits above what the model actually
        delivers on applicants it has never seen.
      </p>
    </figure>
  );
}
