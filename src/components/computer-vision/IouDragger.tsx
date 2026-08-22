"use client";

import { useId, useState } from "react";
import { formatRatio } from "@/lib/ml/format";

/**
 * Two fixed-size rectangles: an unmovable ground-truth box, and a predicted
 * box the reader nudges with arrow buttons in fixed steps. IoU is computed
 * live from plain rectangle arithmetic — no chart library, no randomness.
 */

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 220;
const BOX_WIDTH = 140;
const BOX_HEIGHT = 110;
const STEP = 15;

const GT_X = 70;
const GT_Y = 50;

const START_PRED_X = 90;
const START_PRED_Y = 65;

const MAX_X = CANVAS_WIDTH - BOX_WIDTH;
const MAX_Y = CANVAS_HEIGHT - BOX_HEIGHT;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function iou(a: Rect, b: Rect): number {
  const ix1 = Math.max(a.x, b.x);
  const iy1 = Math.max(a.y, b.y);
  const ix2 = Math.min(a.x + a.w, b.x + b.w);
  const iy2 = Math.min(a.y + a.h, b.y + b.h);
  const interW = Math.max(0, ix2 - ix1);
  const interH = Math.max(0, iy2 - iy1);
  const intersection = interW * interH;
  const union = a.w * a.h + b.w * b.h - intersection;
  return union === 0 ? 0 : intersection / union;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function IouDragger() {
  const [predX, setPredX] = useState(START_PRED_X);
  const [predY, setPredY] = useState(START_PRED_Y);
  const captionId = useId();

  const gt: Rect = { x: GT_X, y: GT_Y, w: BOX_WIDTH, h: BOX_HEIGHT };
  const pred: Rect = { x: predX, y: predY, w: BOX_WIDTH, h: BOX_HEIGHT };
  const score = iou(gt, pred);
  const passes = score >= 0.5;

  const ix1 = Math.max(gt.x, pred.x);
  const iy1 = Math.max(gt.y, pred.y);
  const ix2 = Math.min(gt.x + gt.w, pred.x + pred.w);
  const iy2 = Math.min(gt.y + gt.h, pred.y + pred.h);
  const hasOverlap = ix2 > ix1 && iy2 > iy1;

  function nudge(dx: number, dy: number) {
    setPredX((x) => clamp(x + dx, 0, MAX_X));
    setPredY((y) => clamp(y + dy, 0, MAX_Y));
  }

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Nudge the predicted box
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The solid box is the ground truth. The dashed box is a prediction you can move. The
        shaded region is where the two overlap.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          className="w-full min-w-[360px]"
          role="img"
          aria-labelledby={captionId}
        >
          <rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="var(--learn-chart-plot)"
            stroke="var(--learn-chart-grid)"
            strokeWidth={1}
          />

          <rect x={gt.x} y={gt.y} width={gt.w} height={gt.h} fill="none" stroke="var(--learn-series-1)" strokeWidth={3} />

          {hasOverlap && (
            <rect
              x={ix1}
              y={iy1}
              width={ix2 - ix1}
              height={iy2 - iy1}
              fill="var(--learn-chart-highlight)"
            />
          )}

          <rect
            x={pred.x}
            y={pred.y}
            width={pred.w}
            height={pred.h}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={3}
            strokeDasharray="7 5"
          />

          <text x={gt.x} y={gt.y - 8} fontSize={12} fill="var(--learn-series-1)" fontWeight={600}>
            ground truth
          </text>
          <text x={pred.x} y={pred.y + pred.h + 18} fontSize={12} fill="var(--learn-series-3)" fontWeight={600}>
            predicted
          </text>
        </svg>
        <p id={captionId} className="sr-only">
          Ground truth and predicted box overlap with an IoU of {formatRatio(score, 2)}, which{" "}
          {passes ? "counts as correct" : "does not count as correct"} at a 0.5 threshold.
        </p>
      </div>

      <div className="mx-auto mt-4 grid max-w-[180px] grid-cols-3 justify-items-center gap-2">
        <span aria-hidden="true" />
        <button
          type="button"
          onClick={() => nudge(0, -STEP)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong"
          aria-label="Move predicted box up"
        >
          &uarr;
        </button>
        <span aria-hidden="true" />
        <button
          type="button"
          onClick={() => nudge(-STEP, 0)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong"
          aria-label="Move predicted box left"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => nudge(0, STEP)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong"
          aria-label="Move predicted box down"
        >
          &darr;
        </button>
        <button
          type="button"
          onClick={() => nudge(STEP, 0)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong"
          aria-label="Move predicted box right"
        >
          &rarr;
        </button>
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-learn-strong">IoU</h3>
          <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
            {formatRatio(score, 2)}
          </span>
        </div>

        <div className="relative mt-4 h-2 w-full rounded-full bg-learn-sunken">
          <div
            className="h-full rounded-full bg-learn-accent transition-[width] duration-150 ease-out motion-reduce:transition-none"
            style={{ width: `${clamp(score, 0, 1) * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-learn-ink-strong"
            style={{ left: "50%" }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-learn-subtle">
          <span>0</span>
          <span>0.5 threshold</span>
          <span>1</span>
        </div>

        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
          {passes
            ? "At a 0.5 threshold, this counts as a correct detection."
            : "At a 0.5 threshold, this does not count as a correct detection."}
        </p>
      </div>
    </figure>
  );
}
