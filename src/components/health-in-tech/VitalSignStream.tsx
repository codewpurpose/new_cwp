"use client";

import { useState } from "react";
import { mulberry32, normalish } from "@/lib/ml/random";

/**
 * A day of simulated at-home heart-rate readings, one every hour, generated
 * once at module scope from a fixed seed. Server and client render the exact
 * same sequence — nothing here is drawn per-render.
 */
const READING_COUNT = 18;
const random = mulberry32(20260317);
const READINGS: readonly number[] = Array.from({ length: READING_COUNT }, () =>
  Math.round(normalish(random, 76, 6, { min: 58, max: 104 })),
);

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 220;
const PAD_LEFT = 40;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 30;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MIN_BPM = 50;
const MAX_BPM = 110;

function xFor(index: number): number {
  return PAD_LEFT + (index / (READING_COUNT - 1)) * PLOT_WIDTH;
}

function yFor(bpm: number): number {
  const ratio = (bpm - MIN_BPM) / (MAX_BPM - MIN_BPM);
  return PAD_TOP + PLOT_HEIGHT - ratio * PLOT_HEIGHT;
}

const ALERT_THRESHOLD = 95;

export function VitalSignStream() {
  const [revealed, setRevealed] = useState(4);

  const stream = () => setRevealed((prev) => Math.min(prev + 1, READING_COUNT));
  const reset = () => setRevealed(4);

  const points = READINGS.slice(0, revealed);
  const latest = points[points.length - 1];
  const flagged = latest >= ALERT_THRESHOLD;
  const path = points.map((bpm, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(bpm).toFixed(1)}`).join(" ");

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Live feed — heart rate (bpm), one reading per hour at home
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={`Heart rate stream, ${revealed} of ${READING_COUNT} hourly readings received. Latest reading ${latest} beats per minute.`}
        >
          <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={VIEW_HEIGHT - PAD_BOTTOM} stroke="var(--learn-chart-axis)" strokeWidth={1} />
          <line x1={PAD_LEFT} y1={VIEW_HEIGHT - PAD_BOTTOM} x2={VIEW_WIDTH - PAD_RIGHT} y2={VIEW_HEIGHT - PAD_BOTTOM} stroke="var(--learn-chart-axis)" strokeWidth={1} />

          <line
            x1={PAD_LEFT}
            y1={yFor(ALERT_THRESHOLD)}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={yFor(ALERT_THRESHOLD)}
            stroke="var(--learn-warning-line)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text x={VIEW_WIDTH - PAD_RIGHT} y={yFor(ALERT_THRESHOLD) - 5} textAnchor="end" fontSize={11} fill="var(--learn-warning-fg)">
            alert threshold — {ALERT_THRESHOLD} bpm
          </text>

          {[MIN_BPM, 70, 90, MAX_BPM].map((tick) => (
            <text key={tick} x={PAD_LEFT - 8} y={yFor(tick) + 4} textAnchor="end" fontSize={11} fill="var(--learn-ink-subtle)">
              {tick}
            </text>
          ))}

          {points.length > 1 && <path d={path} fill="none" stroke="var(--learn-accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}

          {points.map((bpm, i) => (
            <circle
              key={i}
              cx={xFor(i)}
              cy={yFor(bpm)}
              r={i === points.length - 1 ? 4.5 : 3}
              fill={bpm >= ALERT_THRESHOLD ? "var(--learn-danger-fg)" : "var(--learn-accent)"}
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={stream}
          disabled={revealed >= READING_COUNT}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {revealed >= READING_COUNT ? "Full day received" : "Simulate next hourly reading"}
        </button>
        {revealed > 4 && (
          <button
            type="button"
            onClick={reset}
            className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
          >
            Reset
          </button>
        )}
        <span className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
          latest: {latest} bpm
        </span>
      </div>

      {flagged && (
        <p className="mt-3 text-[13px] leading-[1.5] text-learn-danger-fg">
          This reading crossed the alert threshold — in a real remote-monitoring setup, this is
          the point at which a nurse reviewing the dashboard gets notified, not a moment the
          patient necessarily notices themselves.
        </p>
      )}
    </figure>
  );
}
