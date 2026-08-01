"use client";

import { useId, useMemo, useState } from "react";
import {
  isFlagged,
  LEARNED_ACCURACY,
  LEARNED_BOUNDARY,
  MAX_LINKS,
  MAX_RULES,
  MAX_WORDS,
  MESSAGE_COUNT,
  MESSAGES,
  RULE_STEPS,
  TOTAL_SPAM,
} from "@/lib/ml/rules-vs-learning-data";
import { formatRatio } from "@/lib/ml/format";
import { clamp } from "@/lib/ml/numeric";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 360;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 300;

const xWords = linearScale([0, MAX_WORDS], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yLinks = linearScale([0, MAX_LINKS], [PLOT_BOTTOM, PLOT_TOP]);

const PRESETS = [
  {
    key: "none",
    rules: 0,
    label: "No rules",
    note: "With no rules the filter calls everything safe. It catches nothing, and it has flagged nothing — so there is no precision to report at all.",
  },
  {
    key: "three",
    rules: 3,
    label: "Three rules",
    note: "Three sentences of if-then already catch most of it. This is exactly why writing rules feels like it is working.",
  },
  {
    key: "eight",
    rules: MAX_RULES,
    label: "Eight rules",
    note: "The last two rules bought nothing at all. The staircase has done everything it can do, and it is still chasing a line it can never become.",
  },
] as const;

export function RuleStacker() {
  const [count, setCount] = useState(0);
  const sliderId = useId();

  const step = RULE_STEPS[Math.min(count, RULE_STEPS.length - 1)];
  const flags = useMemo(() => MESSAGES.map((m) => isFlagged(step.rules, m)), [step]);

  const maxGain = Math.max(...RULE_STEPS.map((s) => s.gain));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Try writing the rules yourself
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        240 messages, plotted by length against how many links they contain. Filled circles are
        spam. Each rule you add covers a rectangle of the chart; rust rings mark the messages
        still being got wrong.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-5 w-full"
        role="img"
        aria-label={
          `Spam decision chart with ${step.rules.length} hand-written rules. The rules flag ` +
          `${step.flagged} of ${MESSAGE_COUNT} messages and classify ` +
          `${formatRatio(step.accuracy)} of them correctly; ${step.wrong} are still wrong. ` +
          `A learned straight-line boundary on the same data gets ` +
          `${formatRatio(LEARNED_ACCURACY)} right.`
        }
      >
        <rect
          x={PAD_LEFT}
          y={PLOT_TOP}
          width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
          height={PLOT_BOTTOM - PLOT_TOP}
          fill="var(--learn-chart-plot)"
        />

        {/* Each rule is a rectangle. Their union is literally a staircase. */}
        {step.rules.map((rule, i) => (
          <rect
            key={i}
            x={PAD_LEFT}
            y={PLOT_TOP}
            width={Math.max(0, xWords(rule.wordsMax) - PAD_LEFT)}
            height={Math.max(0, yLinks(rule.linksMin) - PLOT_TOP)}
            fill="var(--learn-chart-highlight)"
            stroke="var(--learn-accent)"
            strokeWidth={1}
          />
        ))}

        {/* What a model learns instead: one straight line */}
        <line
          x1={xWords(0)}
          y1={yLinks(clamp(LEARNED_BOUNDARY.intercept, 0, MAX_LINKS))}
          x2={xWords(MAX_WORDS)}
          y2={yLinks(clamp(LEARNED_BOUNDARY.slope * MAX_WORDS + LEARNED_BOUNDARY.intercept, 0, MAX_LINKS))}
          stroke="var(--learn-chart-truth)"
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />

        {MESSAGES.map((m, i) => {
          const wrong = flags[i] !== m.isSpam;
          return (
            <g key={i}>
              {m.isSpam ? (
                <circle cx={xWords(m.words)} cy={yLinks(m.links)} r={3.4} fill="var(--learn-series-2)" />
              ) : (
                <circle
                  cx={xWords(m.words)}
                  cy={yLinks(m.links)}
                  r={3.2}
                  fill="none"
                  stroke="var(--learn-series-3)"
                  strokeWidth={1.2}
                />
              )}
              {wrong && (
                <circle
                  cx={xWords(m.words)}
                  cy={yLinks(m.links)}
                  r={6}
                  fill="none"
                  stroke="var(--learn-chart-error)"
                  strokeWidth={1.5}
                />
              )}
            </g>
          );
        })}

        <line
          x1={PAD_LEFT}
          y1={PLOT_BOTTOM}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={PLOT_BOTTOM}
          stroke="var(--learn-chart-axis)"
          strokeWidth={1}
        />
        {[0, 80, 160, 240, 320].map((w) => (
          <text
            key={w}
            x={xWords(w)}
            y={PLOT_BOTTOM + 16}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-subtle)"
          >
            {w}
          </text>
        ))}
        <text x={PAD_LEFT + 120} y={PLOT_BOTTOM + 34} fontSize={12} fill="var(--learn-ink-muted)">
          words in the message
        </text>
        <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
          links
        </text>
      </svg>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-2" />
          spam ({TOTAL_SPAM})
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-learn-series-3" />
          not spam ({MESSAGE_COUNT - TOTAL_SPAM})
        </li>
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-chart-error opacity-60" />
          what a model learns instead
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Number of hand-written rules
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_RULES}
        step={1}
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {count === 0 ? "no rules yet" : `${count} rule${count === 1 ? "" : "s"} to maintain`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setCount(preset.rules)}
            aria-pressed={count === preset.rules}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              count === preset.rules
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {PRESETS.find((p) => p.rules === count) && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
          {PRESETS.find((p) => p.rules === count)?.note}
        </p>
      )}

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Accuracy</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatRatio(step.accuracy)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            still wrong: {step.wrong} of {MESSAGE_COUNT} · a learned line gets{" "}
            {formatRatio(LEARNED_ACCURACY)}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">
              Precision of your rules
            </h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatRatio(step.precision)}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-subtle tabular-nums">
            {step.flagged === 0
              ? "nothing flagged yet — there is no ratio to report"
              : `of ${step.flagged} flagged, that share was really spam`}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:col-span-2">
          <h3 className="text-[15px] font-semibold text-learn-strong">What each rule bought</h3>
          <div className="mt-3 space-y-1.5">
            {RULE_STEPS.slice(1).map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-12 shrink-0 font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-subtle tabular-nums">
                  rule {i + 1}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-learn-sunken">
                  <span
                    className="block h-full rounded-full bg-learn-accent"
                    style={{ width: `${maxGain ? (s.gain / maxGain) * 100 : 0}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-subtle tabular-nums">
                  +{s.gain.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
          {step.newest && (
            <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
              Your newest rule says:{" "}
              <span className="text-learn-strong">{step.newest.sentence}</span>
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}
