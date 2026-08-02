"use client";

import { useId, useState } from "react";
import { formatNumber } from "@/lib/ml/format";
import {
  CV_ESTIMATE,
  CV_SPREAD,
  FOLD_COUNT,
  FOLD_OF,
  FOLD_SIZE,
  FOLD_SPREAD,
  FOLDS,
  SINGLE_SPREAD,
  TIGHTENING,
} from "@/lib/ml/cross-validation-data";
import { STUDENT_COUNT } from "@/lib/ml/practice-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 400;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;

const STRIP_TOP = 16;
const STRIP_HEIGHT = 18;
const CELL_WIDTH = (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / STUDENT_COUNT;

const BARS_TOP = 74;
const BARS_BOTTOM = 214;
const MAX_ERROR = 6.6;
const yError = linearScale([0, MAX_ERROR], [BARS_BOTTOM, BARS_TOP]);
const BAR_SLOT = (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / FOLD_COUNT;

const COMPARE_TOP = 268;
const COMPARE_ROW = 46;
const xError = linearScale([2.2, 6.8], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);

/** Distinct fills per fold, so the strip reads as five blocks not one. */
const FOLD_FILL = [
  "var(--learn-series-1)",
  "var(--learn-series-2)",
  "var(--learn-series-3)",
  "var(--learn-series-4)",
  "var(--learn-series-5)",
];

export function FoldRotator() {
  const [active, setActive] = useState(0);
  const sliderId = useId();

  const fold = FOLDS[active];
  const seen = FOLDS.slice(0, active + 1);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Rotate the drawer
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The same sixty students from chapter five, dealt into five blocks of twelve. Each round
        holds one block back, trains on the other forty-eight, and scores. Every student is
        tested exactly once and trained on four times.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Five-fold cross-validation on sixty students. Fold ${active + 1} scores ` +
            `${formatNumber(fold.error, 2)} points of error; the mean over the folds seen so ` +
            `far is ${formatNumber(fold.runningMean, 2)}. Over forty repeats a single holdout ` +
            `ranges across ${formatNumber(SINGLE_SPREAD.range, 2)} points while five-fold ` +
            `cross-validation ranges across ${formatNumber(CV_SPREAD.range, 2)}.`
          }
        >
          {FOLD_OF.map((f, i) => {
            const isHeld = f === active;
            return (
              <rect
                key={i}
                x={PAD_LEFT + i * CELL_WIDTH}
                y={STRIP_TOP}
                width={Math.max(1, CELL_WIDTH - 1.2)}
                height={STRIP_HEIGHT}
                rx={1.5}
                fill={isHeld ? FOLD_FILL[f] : "var(--learn-chart-muted-mark)"}
                opacity={isHeld ? 1 : 0.3}
              />
            );
          })}
          <text x={6} y={STRIP_TOP + 13} fontSize={11} fill="var(--learn-ink-muted)">
            held
          </text>
          <text
            x={VIEW_WIDTH - PAD_RIGHT}
            y={STRIP_TOP + STRIP_HEIGHT + 16}
            textAnchor="end"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            {FOLD_SIZE} held back, {STUDENT_COUNT - FOLD_SIZE} trained on
          </text>

          {/* Error per fold. */}
          {FOLDS.map((f, i) => {
            const revealed = i <= active;
            const cx = PAD_LEFT + i * BAR_SLOT + BAR_SLOT / 2;
            return (
              <g key={i} opacity={revealed ? 1 : 0.16}>
                <rect
                  x={cx - 26}
                  y={yError(f.error)}
                  width={52}
                  height={BARS_BOTTOM - yError(f.error)}
                  rx={2}
                  fill={i === active ? FOLD_FILL[i] : "var(--learn-chart-muted-mark)"}
                />
                <text
                  x={cx}
                  y={yError(f.error) - 7}
                  textAnchor="middle"
                  fontSize={12}
                  fill="var(--learn-ink)"
                  className="tabular-nums"
                >
                  {formatNumber(f.error, 2)}
                </text>
                <text
                  x={cx}
                  y={BARS_BOTTOM + 15}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--learn-ink-subtle)"
                >
                  fold {i + 1}
                </text>
              </g>
            );
          })}

          <line
            x1={PAD_LEFT}
            y1={yError(fold.runningMean)}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={yError(fold.runningMean)}
            stroke="var(--learn-ink)"
            strokeWidth={1.6}
            strokeDasharray="5 4"
          />
          <text
            x={PAD_LEFT + 2}
            y={yError(fold.runningMean) - 6}
            fontSize={11}
            fill="var(--learn-ink)"
          >
            mean so far {formatNumber(fold.runningMean, 2)}
          </text>
          <line
            x1={PAD_LEFT}
            y1={BARS_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={BARS_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <text x={6} y={BARS_TOP + 8} fontSize={11} fill="var(--learn-ink-muted)">
            error
          </text>

          {/* Forty repeats: one split against five. */}
          <text x={PAD_LEFT} y={COMPARE_TOP - 12} fontSize={11} fill="var(--learn-ink-muted)">
            what forty different shuffles would have let you report
          </text>
          {[
            { label: "one split", data: SINGLE_SPREAD, fill: "var(--learn-series-3)" },
            { label: "five folds", data: CV_SPREAD, fill: "var(--learn-series-1)" },
          ].map((row, r) => {
            const y = COMPARE_TOP + r * COMPARE_ROW;
            return (
              <g key={row.label}>
                <text x={6} y={y + 4} fontSize={11} fill="var(--learn-ink-muted)">
                  {row.label}
                </text>
                <line
                  x1={xError(row.data.min)}
                  y1={y}
                  x2={xError(row.data.max)}
                  y2={y}
                  stroke={row.fill}
                  strokeWidth={2}
                  opacity={0.5}
                />
                {row.data.values.map((v, i) => (
                  <circle key={i} cx={xError(v)} cy={y} r={3} fill={row.fill} opacity={0.6} />
                ))}
                <text
                  x={VIEW_WIDTH - PAD_RIGHT}
                  y={y - 10}
                  textAnchor="end"
                  fontSize={11}
                  fill="var(--learn-ink-subtle)"
                  className="tabular-nums"
                >
                  spans {formatNumber(row.data.range, 2)} points
                </text>
              </g>
            );
          })}
          <line
            x1={PAD_LEFT}
            y1={COMPARE_TOP + COMPARE_ROW + 24}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={COMPARE_TOP + COMPARE_ROW + 24}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {[3, 4, 5, 6].map((v) => (
            <text
              key={v}
              x={xError(v)}
              y={COMPARE_TOP + COMPARE_ROW + 40}
              textAnchor="middle"
              fontSize={11}
              fill="var(--learn-ink-subtle)"
            >
              {v}
            </text>
          ))}
        </svg>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        Which fold is held back
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={FOLD_COUNT - 1}
        step={1}
        value={active}
        onChange={(event) => setActive(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        round {active + 1} of {FOLD_COUNT} — holding back fold {active + 1}, scoring{" "}
        {formatNumber(fold.error, 2)}
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">
              {seen.length === FOLD_COUNT ? "The estimate" : "Mean so far"}
            </h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(fold.runningMean, 2)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {seen.length === FOLD_COUNT
              ? `Every student tested once. This is the number you report: ${formatNumber(CV_ESTIMATE, 2)}.`
              : `After ${seen.length} of ${FOLD_COUNT} rounds. Keep going.`}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Fold to fold</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(FOLD_SPREAD, 2)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            The gap between the kindest and cruellest fold. Not noise to hide — it is the model
            telling you how much it depends on which students it saw.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Tighter by</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatNumber(TIGHTENING, 1)}&times;
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            One split lands anywhere across {formatNumber(SINGLE_SPREAD.range, 2)} points. Five
            folds land within {formatNumber(CV_SPREAD.range, 2)}.
          </p>
        </div>
      </div>
    </figure>
  );
}
