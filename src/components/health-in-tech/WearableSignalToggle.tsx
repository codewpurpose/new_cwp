"use client";

import { useState } from "react";
import { mulberry32 } from "@/lib/ml/random";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * A synthetic pulse waveform — the shape a wrist sensor is actually trying to
 * recover — plus seeded noise on top, standing in for motion and imperfect
 * skin contact. Generated once at module scope so server and client render
 * byte-identical arrays.
 */
const SAMPLE_COUNT = 72;
const random = mulberry32(20260401);

const BASE_SIGNAL: readonly number[] = Array.from({ length: SAMPLE_COUNT }, (_, i) => {
  // Two stacked sine terms approximate a pulse: a slow rise-and-fall dressed
  // with a sharper secondary bump, roughly like a real PPG waveform.
  const t = (i / SAMPLE_COUNT) * Math.PI * 2 * 4;
  return Math.sin(t) * 0.6 + Math.sin(t * 2.3) * 0.25;
});

const RAW_SIGNAL: readonly number[] = BASE_SIGNAL.map((v) => v + (random() - 0.5) * 0.9);

function movingAverage(values: readonly number[], window: number): number[] {
  return values.map((_, i) => {
    const start = Math.max(0, i - window + 1);
    const slice = values.slice(start, i + 1);
    return slice.reduce((sum, v) => sum + v, 0) / slice.length;
  });
}

const SMOOTHED_SIGNAL: readonly number[] = movingAverage(RAW_SIGNAL, 6);

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 200;
const PAD_LEFT = 16;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;
const PLOT_WIDTH = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const MIN_V = -1.3;
const MAX_V = 1.3;

function xFor(i: number): number {
  return PAD_LEFT + (i / (SAMPLE_COUNT - 1)) * PLOT_WIDTH;
}

function yFor(v: number): number {
  const ratio = (v - MIN_V) / (MAX_V - MIN_V);
  return PAD_TOP + PLOT_HEIGHT - ratio * PLOT_HEIGHT;
}

function pathFor(values: readonly number[]): string {
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");
}

const RAW_PATH = pathFor(RAW_SIGNAL);
const SMOOTHED_PATH = pathFor(SMOOTHED_SIGNAL);

type Mode = "raw" | "smoothed";

export function WearableSignalToggle() {
  const [mode, setMode] = useState<Mode>("raw");

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The same sensor reading, before and after processing
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          label="Signal view"
          value={mode}
          onValueChange={setMode}
          options={[
            { value: "raw", label: "Raw signal" },
            { value: "smoothed", label: "Smoothed signal" },
          ]}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={
            mode === "raw"
              ? "Raw sensor signal, visibly noisy sample to sample."
              : "Smoothed sensor signal, a clean repeating pulse shape."
          }
        >
          <path
            d={mode === "raw" ? RAW_PATH : SMOOTHED_PATH}
            fill="none"
            stroke="var(--learn-accent)"
            strokeWidth={mode === "raw" ? 1.4 : 2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        {mode === "raw"
          ? "This is closer to what the sensor actually captures sample by sample — motion, skin contact, and ambient light all show up as jitter on top of the real pulse."
          : "A moving average across a handful of nearby samples removes most of that jitter and reveals the repeating pulse shape underneath — this is closer to what actually reaches your screen."}
      </p>
    </figure>
  );
}
