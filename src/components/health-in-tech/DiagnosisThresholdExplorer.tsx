"use client";

import { useMemo, useState } from "react";
import { mulberry32, normalish } from "@/lib/ml/random";
import { formatPercent } from "@/lib/finance-format";

interface Case {
  actuallyPositive: boolean;
  score: number;
  jitter: number;
}

/**
 * Forty simulated diagnosis-assist cases, generated once at module scope from
 * a fixed seed. Roughly 40% genuinely have the condition; the model's score
 * clusters higher for those cases but overlaps with the rest, which is what
 * makes the threshold a real trade-off rather than a formality.
 */
const CASE_COUNT = 40;
const random = mulberry32(20260422);

const CASES: readonly Case[] = Array.from({ length: CASE_COUNT }, () => {
  const actuallyPositive = random() < 0.4;
  const score = actuallyPositive
    ? normalish(random, 0.66, 0.19, { min: 0.02, max: 0.98 })
    : normalish(random, 0.34, 0.19, { min: 0.02, max: 0.98 });
  const jitter = random();
  return { actuallyPositive, score, jitter };
});

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 160;
const PAD_LEFT = 20;
const PAD_RIGHT = 20;
const ROW_TOP = 46;
const ROW_BOTTOM = 110;
const BAND_HEIGHT = 34;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;

function xFor(score: number): number {
  return PAD_LEFT + score * PLOT_WIDTH;
}

export function DiagnosisThresholdExplorer() {
  const [threshold, setThreshold] = useState(0.5);

  const counts = useMemo(() => {
    let truePositive = 0;
    let falsePositive = 0;
    let falseNegative = 0;
    let trueNegative = 0;
    for (const c of CASES) {
      const flagged = c.score >= threshold;
      if (c.actuallyPositive && flagged) truePositive += 1;
      else if (!c.actuallyPositive && flagged) falsePositive += 1;
      else if (c.actuallyPositive && !flagged) falseNegative += 1;
      else trueNegative += 1;
    }
    return { truePositive, falsePositive, falseNegative, trueNegative };
  }, [threshold]);

  const flaggedTotal = counts.truePositive + counts.falsePositive;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Forty simulated cases, sorted by the model&apos;s confidence score
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[460px]"
          role="img"
          aria-label={
            `At a flag threshold of ${threshold.toFixed(2)}, ${flaggedTotal} of ${CASE_COUNT} cases are flagged: ` +
            `${counts.truePositive} genuinely have the condition, ${counts.falsePositive} do not. ` +
            `${counts.falseNegative} cases with the condition are left unflagged.`
          }
        >
          <text x={PAD_LEFT} y={20} fontSize={11} fill="var(--learn-ink-muted)">
            actually has the condition
          </text>
          <text x={PAD_LEFT} y={132} fontSize={11} fill="var(--learn-ink-muted)">
            actually does not
          </text>

          {CASES.map((c, i) => {
            const flagged = c.score >= threshold;
            const rowCenter = c.actuallyPositive ? ROW_TOP : ROW_BOTTOM;
            const y = rowCenter + (c.jitter - 0.5) * BAND_HEIGHT;
            const fill = flagged
              ? c.actuallyPositive
                ? "var(--learn-outcome-tp, var(--learn-accent))"
                : "var(--learn-danger-fg)"
              : "var(--learn-ink-subtle)";

            return c.actuallyPositive ? (
              <circle key={i} cx={xFor(c.score)} cy={y} r={4} fill={fill} opacity={flagged ? 1 : 0.55} />
            ) : (
              <rect
                key={i}
                x={xFor(c.score) - 3.5}
                y={y - 3.5}
                width={7}
                height={7}
                fill={fill}
                opacity={flagged ? 1 : 0.55}
              />
            );
          })}

          <line
            x1={xFor(threshold)}
            y1={10}
            x2={xFor(threshold)}
            y2={VIEW_HEIGHT - 10}
            stroke="var(--learn-ink)"
            strokeWidth={2}
            strokeDasharray="5 4"
          />
          <text x={xFor(threshold)} y={VIEW_HEIGHT - 2} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--learn-ink)">
            threshold {threshold.toFixed(2)}
          </text>
        </svg>
      </div>

      <label htmlFor="diagnosis-threshold" className="sr-only">
        Flag threshold
      </label>
      <input
        id="diagnosis-threshold"
        type="range"
        min={0.05}
        max={0.95}
        step={0.01}
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        className="mt-2 w-full accent-learn-accent"
      />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-3">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-subtle">Flagged</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] text-learn-strong tabular-nums">
            {flaggedTotal}/{CASE_COUNT}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-3">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-subtle">Correctly flagged</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] text-learn-strong tabular-nums">
            {counts.truePositive}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-danger-line bg-learn-danger-bg p-3">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-danger-fg">False alarms</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] text-learn-danger-fg tabular-nums">
            {counts.falsePositive}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-warning-line bg-learn-warning-bg p-3">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-warning-fg">Missed cases</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] text-learn-warning-fg tabular-nums">
            {counts.falseNegative}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        Lower the threshold and false alarms climb before missed cases fall to zero — of these{" "}
        {CASE_COUNT} simulated cases, {formatPercent((counts.truePositive / (CASES.filter((c) => c.actuallyPositive).length || 1)) * 100)} of
        genuine cases are caught at the current threshold. There is no single threshold that
        maximises both catching real cases and avoiding false alarms at once.
      </p>
    </figure>
  );
}
