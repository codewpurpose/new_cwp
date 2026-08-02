"use client";

import { useId, useState } from "react";
import { formatNumber, formatPercent } from "@/lib/ml/format";
import {
  BEST_F1_INDEX,
  MATCHING_INDEX,
  NEVER_FLAG_ACCURACY,
  type Outcome,
  STRATEGIES,
  TEST,
  TEST_FRAUD,
  THRESHOLD_CURVE,
} from "@/lib/ml/imbalance-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 240;
const PAD_LEFT = 44;
const PAD_RIGHT = 20;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 196;

const xIndex = linearScale([0, THRESHOLD_CURVE.length - 1], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yRate = linearScale([0, 1], [PLOT_BOTTOM, PLOT_TOP]);

function curvePath(pick: (p: (typeof THRESHOLD_CURVE)[number]) => number): string {
  return THRESHOLD_CURVE.map(
    (p, i) => `${i === 0 ? "M" : "L"}${xIndex(i).toFixed(1)} ${yRate(pick(p)).toFixed(1)}`,
  ).join(" ");
}

const RECALL_PATH = curvePath((p) => p.recall);
const PRECISION_PATH = curvePath((p) => p.precision ?? 0);

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-[13px] font-semibold text-learn-strong">{label}</h4>
        <span className="font-[family-name:var(--learn-font-mono)] text-[18px] leading-none text-learn-strong tabular-nums">
          {value}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] leading-[1.45] text-learn-muted">{hint}</p>
    </div>
  );
}

function Confusion({ outcome }: { outcome: Outcome }) {
  const cells = [
    { label: "caught", value: outcome.truePositives, tone: "var(--learn-outcome-tp)" },
    { label: "false alarms", value: outcome.falsePositives, tone: "var(--learn-outcome-fp)" },
    { label: "missed frauds", value: outcome.falseNegatives, tone: "var(--learn-outcome-fn)" },
    { label: "left alone", value: outcome.trueNegatives, tone: "var(--learn-outcome-tn)" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-learn-lg p-3.5"
          style={{ backgroundColor: c.tone }}
        >
          <div className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
            {c.value}
          </div>
          <div className="mt-1 text-[12px] text-learn-strong opacity-80">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ImbalanceDial() {
  const [strategyKey, setStrategyKey] = useState(STRATEGIES[0].key);
  const [index, setIndex] = useState(BEST_F1_INDEX);
  const sliderId = useId();

  const strategy = STRATEGIES.find((s) => s.key === strategyKey) ?? STRATEGIES[0];
  const point = THRESHOLD_CURVE[index];
  const matching = THRESHOLD_CURVE[MATCHING_INDEX];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Rebalance, or move the line
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        {TEST.length} held-back transactions, {TEST_FRAUD} of them fraudulent. Flagging nothing at
        all scores {formatPercent(NEVER_FLAG_ACCURACY)} accuracy, so accuracy is the one number
        that cannot help you here.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {STRATEGIES.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStrategyKey(s.key)}
            aria-pressed={s.key === strategyKey}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              s.key === strategyKey
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[14px] leading-[1.55] text-learn-strong">{strategy.blurb}</p>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-learn-subtle">
        <span className="font-semibold text-learn-strong">What it costs: </span>
        {strategy.cost}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Confusion outcome={strategy.outcome} />
        <div className="grid gap-2">
          <Metric
            label="Accuracy"
            value={formatPercent(strategy.outcome.accuracy)}
            hint="Beaten by flagging nothing, in most of these rows."
          />
          <Metric
            label="Recall"
            value={formatPercent(strategy.outcome.recall)}
            hint="Of the 27 real frauds, how many were caught."
          />
          <Metric
            label="Precision"
            value={
              strategy.outcome.precision === null ? "—" : formatPercent(strategy.outcome.precision)
            }
            hint={
              strategy.outcome.precision === null
                ? "Undefined: it flagged nothing, so nothing can be right."
                : `${strategy.outcome.flagged} flagged for review to find them.`
            }
          />
        </div>
      </div>

      <hr className="mt-7 border-t-[0.5px] border-learn-line" />

      <p className="mt-6 text-[15px] leading-[1.6] text-learn-strong">
        Now leave the first model exactly as it was trained and move only the cut-off. Every point
        the three rebalancing strategies reached is somewhere on this curve.
      </p>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Precision and recall against the decision threshold. At a threshold of ` +
            `${formatNumber(point.threshold, 3)} the model flags ${point.flagged} transactions, ` +
            `catching ${formatPercent(point.recall)} of frauds at ` +
            `${point.precision === null ? "undefined" : formatPercent(point.precision)} precision.`
          }
        >
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <line
              key={v}
              x1={PAD_LEFT}
              y1={yRate(v)}
              x2={VIEW_WIDTH - PAD_RIGHT}
              y2={yRate(v)}
              stroke="var(--learn-chart-grid)"
              strokeWidth={1}
            />
          ))}

          <line
            x1={xIndex(MATCHING_INDEX)}
            y1={PLOT_TOP}
            x2={xIndex(MATCHING_INDEX)}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-error)"
            strokeWidth={1.4}
            strokeDasharray="4 4"
          />
          <text
            x={xIndex(MATCHING_INDEX) + 5}
            y={PLOT_TOP + 12}
            fontSize={10}
            fill="var(--learn-ink-subtle)"
          >
            where rebalancing lands
          </text>

          <path d={RECALL_PATH} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} />
          <path
            d={PRECISION_PATH}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={2}
            strokeDasharray="5 3"
          />

          <line
            x1={xIndex(index)}
            y1={PLOT_TOP}
            x2={xIndex(index)}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-ink)"
            strokeWidth={1.6}
          />
          <circle cx={xIndex(index)} cy={yRate(point.recall)} r={4} fill="var(--learn-series-1)" />
          <circle
            cx={xIndex(index)}
            cy={yRate(point.precision ?? 0)}
            r={4}
            fill="var(--learn-series-3)"
          />

          <line
            x1={PAD_LEFT}
            y1={PLOT_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <text x={PAD_LEFT} y={PLOT_BOTTOM + 16} fontSize={11} fill="var(--learn-ink-subtle)">
            flag almost everything
          </text>
          <text
            x={VIEW_WIDTH - PAD_RIGHT}
            y={PLOT_BOTTOM + 16}
            textAnchor="end"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            flag almost nothing
          </text>
          <text x={6} y={yRate(1) + 4} fontSize={11} fill="var(--learn-ink-muted)">
            100%
          </text>
          <text x={6} y={yRate(0) + 4} fontSize={11} fill="var(--learn-ink-muted)">
            0%
          </text>
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-series-1" />
          recall
        </li>
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-series-3" />
          precision
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Decision threshold
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={THRESHOLD_CURVE.length - 1}
        step={1}
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        flag anything above {formatNumber(point.threshold, 3)} — {point.flagged} transactions to
        review, {point.truePositives} of the {TEST_FRAUD} frauds caught
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric
          label="Precision here"
          value={point.precision === null ? "—" : formatPercent(point.precision)}
          hint="Share of flagged transactions that were really fraud."
        />
        <Metric
          label="Recall here"
          value={formatPercent(point.recall)}
          hint="Share of real frauds this cut-off catches."
        />
        <Metric
          label="F1 here"
          value={point.f1 === null ? "—" : formatNumber(point.f1, 2)}
          hint={`Rebalancing managed ${formatNumber(matching.f1 ?? 0, 2)} for the cost of retraining.`}
        />
      </div>
    </figure>
  );
}
