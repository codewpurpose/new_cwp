"use client";

import { useId, useState } from "react";
import { formatPercent, formatRatio } from "@/lib/ml/format";

/**
 * Ten fixed detections, sorted by confidence, each pre-labelled correct or
 * incorrect (already resolved against ground truth by an IoU >= 0.5 check the
 * reader does not need to redo). Two real objects in the scene were never
 * detected at all, which is why TOTAL_GROUND_TRUTH is 8 rather than 6 — recall
 * has a ceiling below 1.0 no matter how low the threshold goes.
 */
interface Detection {
  score: number;
  correct: boolean;
}

const DETECTIONS: readonly Detection[] = [
  { score: 0.95, correct: true },
  { score: 0.91, correct: true },
  { score: 0.86, correct: true },
  { score: 0.78, correct: false },
  { score: 0.72, correct: true },
  { score: 0.65, correct: true },
  { score: 0.58, correct: false },
  { score: 0.47, correct: true },
  { score: 0.39, correct: false },
  { score: 0.22, correct: false },
];

const TOTAL_GROUND_TRUTH = 8;

interface CurvePoint {
  /** How many of the top-scoring detections are flagged at this step. */
  flagged: number;
  threshold: number;
  precision: number | null;
  recall: number;
}

/** k = 0..DETECTIONS.length, precomputed once — no per-render arithmetic. */
const CURVE: readonly CurvePoint[] = Array.from({ length: DETECTIONS.length + 1 }, (_, k) => {
  const included = DETECTIONS.slice(0, k);
  const truePositives = included.filter((d) => d.correct).length;
  const threshold = k === 0 ? 1 : DETECTIONS[k - 1].score;
  return {
    flagged: k,
    threshold,
    precision: k === 0 ? null : truePositives / k,
    recall: truePositives / TOTAL_GROUND_TRUTH,
  };
});

const AVERAGE_PRECISION =
  CURVE.slice(1).reduce((sum, point) => sum + (point.precision ?? 0), 0) / DETECTIONS.length;

/** The recall ceiling: even flagging every detection never recovers the two
 *  ground-truth objects nothing was ever proposed for. */
const MAX_RECALL = CURVE[CURVE.length - 1].recall;

const VIEW_WIDTH = 520;
const VIEW_HEIGHT = 320;
const PAD_LEFT = 46;
const PAD_RIGHT = 18;
const PAD_TOP = 18;
const PAD_BOTTOM = 36;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;

function xFor(recall: number): number {
  return PAD_LEFT + recall * PLOT_WIDTH;
}

function yFor(precision: number): number {
  return PAD_TOP + (1 - precision) * PLOT_HEIGHT;
}

const PATH = CURVE.slice(1)
  .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(point.recall)} ${yFor(point.precision ?? 0)}`)
  .join(" ");

export function ThresholdCurve() {
  const [flagged, setFlagged] = useState(6);
  const sliderId = useId();

  const point = CURVE[flagged];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Ten detections, sorted by confidence
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Two real objects in this scene were never detected at all, at any threshold — that is why
        recall tops out at {formatPercent(MAX_RECALL, 0)} rather than 100%. Drag the threshold and
        watch which detections count.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={`Precision-recall point at ${flagged} detections flagged: precision ${
            point.precision === null ? "undefined" : formatPercent(point.precision, 0)
          }, recall ${formatPercent(point.recall, 0)}.`}
        >
          {/* axes */}
          <line
            x1={PAD_LEFT}
            y1={PAD_TOP}
            x2={PAD_LEFT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <line
            x1={PAD_LEFT}
            y1={VIEW_HEIGHT - PAD_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />

          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={tick}>
              <text
                x={PAD_LEFT - 8}
                y={yFor(tick) + 4}
                textAnchor="end"
                fontSize={10}
                fill="var(--learn-ink-subtle)"
              >
                {tick}
              </text>
              <text
                x={xFor(tick)}
                y={VIEW_HEIGHT - PAD_BOTTOM + 16}
                textAnchor="middle"
                fontSize={10}
                fill="var(--learn-ink-subtle)"
              >
                {tick}
              </text>
            </g>
          ))}

          <text
            x={PAD_LEFT + PLOT_WIDTH / 2}
            y={VIEW_HEIGHT - 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            recall
          </text>
          <text
            x={-(PAD_TOP + PLOT_HEIGHT / 2)}
            y={12}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
            transform="rotate(-90)"
          >
            precision
          </text>

          {/* the swept curve */}
          <path d={PATH} fill="none" stroke="var(--learn-chart-model)" strokeWidth={2} />
          {CURVE.slice(1).map((p) => (
            <circle
              key={p.flagged}
              cx={xFor(p.recall)}
              cy={yFor(p.precision ?? 0)}
              r={3}
              fill="var(--learn-chart-muted-mark)"
            />
          ))}

          {/* current marker */}
          {point.precision !== null && (
            <circle
              cx={xFor(point.recall)}
              cy={yFor(point.precision)}
              r={7}
              fill="var(--learn-accent)"
              stroke="var(--learn-ink-strong)"
              strokeWidth={1.5}
            />
          )}
        </svg>
      </div>

      <label htmlFor={sliderId} className="mt-2 block text-[13px] text-learn-muted">
        Flagging the top {flagged} most confident detection{flagged === 1 ? "" : "s"} — threshold ≈{" "}
        {formatRatio(point.threshold, 2)}
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={DETECTIONS.length}
        step={1}
        value={flagged}
        onChange={(event) => setFlagged(Number(event.target.value))}
        className="mt-1 w-full accent-learn-accent"
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {DETECTIONS.map((detection, index) => {
          const isFlagged = index < flagged;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1"
              title={`Score ${formatRatio(detection.score, 2)}, ${detection.correct ? "correct" : "incorrect"}`}
            >
              <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true">
                {detection.correct ? (
                  <circle
                    cx={11}
                    cy={11}
                    r={8}
                    fill="var(--learn-outcome-tp)"
                    opacity={isFlagged ? 1 : 0.25}
                  />
                ) : (
                  <rect
                    x={4}
                    y={4}
                    width={14}
                    height={14}
                    transform="rotate(45 11 11)"
                    fill="var(--learn-outcome-fn)"
                    opacity={isFlagged ? 1 : 0.25}
                  />
                )}
              </svg>
              <span className="font-[family-name:var(--learn-font-mono)] text-[10px] text-learn-subtle">
                {detection.score.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[12px] leading-[1.5] text-learn-subtle">
        Circles are correct detections, diamonds are false alarms. Dimmed ones sit below the
        current threshold and are not flagged.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Precision</p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {point.precision === null ? "—" : formatPercent(point.precision, 0)}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">Recall</p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {formatPercent(point.recall, 0)}
          </p>
        </div>
        <div className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.06em] text-learn-muted">
            Average precision
          </p>
          <p className="mt-1 font-mono text-[20px] text-learn-strong tabular-nums">
            {formatPercent(AVERAGE_PRECISION, 0)}
          </p>
        </div>
      </div>
    </figure>
  );
}
