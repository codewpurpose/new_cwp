"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  BOWL_CURVE,
  CONVERGED_TOLERANCE,
  DIVERGED_DISTANCE,
  MAX_BOWL_LOSS,
  MAX_STEPS,
  RATE_PRESETS,
  runDescent,
  W_STAR,
  WEIGHT_MAX,
  WEIGHT_MIN,
  type DescentStep,
} from "@/lib/ml/descent-data";
import { formatNumber, formatSigned } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 320;
const PAD_LEFT = 52;
const PAD_RIGHT = 18;
const PAD_TOP = 20;
const PAD_BOTTOM = 40;

const DISPLAY_MAX_LOSS = MAX_BOWL_LOSS * 1.08;

const xScale = linearScale([WEIGHT_MIN, WEIGHT_MAX], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yScale = linearScale([0, DISPLAY_MAX_LOSS], [VIEW_HEIGHT - PAD_BOTTOM, PAD_TOP]);

const BOWL_PATH = BOWL_CURVE.map(
  (p, i) => `${i === 0 ? "M" : "L"}${xScale(p.weight).toFixed(1)} ${yScale(p.loss).toFixed(1)}`,
).join(" ");

/** Milliseconds between steps while "Run" is playing. */
const STEP_DELAY_MS = 320;

type Status = "active" | "converged" | "diverged" | "exhausted";

function statusOf(current: DescentStep, atEnd: boolean): Status {
  const distance = Math.abs(current.weight - W_STAR);
  if (distance < CONVERGED_TOLERANCE) return "converged";
  if (distance > DIVERGED_DISTANCE) return "diverged";
  return atEnd ? "exhausted" : "active";
}

/**
 * Clamps a data point into the plot rectangle so a diverging run can never
 * stretch the SVG viewBox — the reported numbers stay exact, only the mark
 * pins to the edge it left through.
 */
function plot(weight: number, loss: number): { x: number; y: number; offChart: boolean } {
  const rawX = xScale(weight);
  const rawY = yScale(loss);
  const x = Math.min(VIEW_WIDTH - PAD_RIGHT, Math.max(PAD_LEFT, rawX));
  const y = Math.min(VIEW_HEIGHT - PAD_BOTTOM, Math.max(PAD_TOP, rawY));
  return { x, y, offChart: x !== rawX || y !== rawY };
}

interface StatCardProps {
  label: string;
  value: string;
  caption: string;
}

function StatCard({ label, value, caption }: StatCardProps) {
  return (
    <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
      <h3 className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">{label}</h3>
      <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[22px] leading-none text-learn-strong tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-[12px] leading-[1.4] text-learn-subtle">{caption}</p>
    </div>
  );
}

export function DescentStepper() {
  const [rate, setRate] = useState(0.05);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [running, setRunning] = useState(false);
  const sliderId = useId();

  const path = useMemo(() => runDescent(rate, stepsTaken), [rate, stepsTaken]);
  const current = path[path.length - 1];
  // runDescent stops early once a run is well past DIVERGED_DISTANCE, so the
  // path can be shorter than requested — that shortfall is itself the signal
  // that there is nothing more to compute.
  const atEnd = stepsTaken >= MAX_STEPS || path.length - 1 < stepsTaken;
  const status = statusOf(current, atEnd);
  const activePreset = RATE_PRESETS.find((preset) => Math.abs(preset.rate - rate) < 0.0005);

  useEffect(() => {
    if (!running) return undefined;
    if (status !== "active") {
      // Stop the run from a callback, not the synchronous effect body, so this
      // is a reaction to the search settling rather than a render-time update.
      const id = window.setTimeout(() => setRunning(false), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setStepsTaken((s) => Math.min(MAX_STEPS, s + 1));
    }, STEP_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [running, status, stepsTaken]);

  function changeRate(nextRate: number) {
    setRate(nextRate);
    setStepsTaken(0);
    setRunning(false);
  }

  function handleStep() {
    setRunning(false);
    if (!atEnd) setStepsTaken((s) => Math.min(MAX_STEPS, s + 1));
  }

  function handleReset() {
    setRunning(false);
    setStepsTaken(0);
  }

  const statusText =
    status === "converged"
      ? `Converged in ${current.step} steps — within ${CONVERGED_TOLERANCE} of ${W_STAR.toFixed(1)}.`
      : status === "diverged"
        ? "Diverging. Every step overshoots by more than the step before it."
        : status === "exhausted"
          ? `Still short of ${W_STAR.toFixed(1)} after ${MAX_STEPS} steps at this rate.`
          : "Press step, or run, to keep searching.";

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Set the step size, then search
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The same bowl-shaped error from the last lesson. Nobody drags a slider along it this
        time — the search starts at the far left on its own and takes steps sized by the
        learning rate below, one at a time or all at once.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Error bowl with a learning rate of ${rate.toFixed(3)}. After ${current.step} steps ` +
            `the parameter is ${formatNumber(current.weight, 3)}, with error ${formatNumber(current.loss, 2)}. ` +
            statusText
          }
        >
          <line
            x1={PAD_LEFT}
            y1={VIEW_HEIGHT - PAD_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <line
            x1={PAD_LEFT}
            y1={PAD_TOP}
            x2={PAD_LEFT}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />

          {/* Target marker */}
          <line
            x1={xScale(W_STAR)}
            y1={PAD_TOP}
            x2={xScale(W_STAR)}
            y2={VIEW_HEIGHT - PAD_BOTTOM}
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
          <text
            x={xScale(W_STAR)}
            y={PAD_TOP - 6}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            bottom
          </text>

          {/* The bowl itself */}
          <path d={BOWL_PATH} fill="none" stroke="var(--learn-ink-strong)" strokeWidth={1.5} />

          {/* Each segment is the straight tangent step that carried the search from the
              last point to this one — a curve is never consulted mid-step, only its slope. */}
          {path.slice(1).map((point, index) => {
            const from = plot(path[index].weight, path[index].loss);
            const to = plot(point.weight, point.loss);
            const leavesChart = from.offChart || to.offChart;
            return (
              <line
                key={`segment-${point.step}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--learn-series-2)"
                strokeWidth={1.5}
                strokeDasharray={leavesChart ? "4 3" : undefined}
                opacity={0.85}
              />
            );
          })}

          {path.map((point, index) => {
            const { x, y, offChart } = plot(point.weight, point.loss);
            const isStart = index === 0;
            const isCurrent = index === path.length - 1;

            if (isStart) {
              return (
                <rect
                  key="start"
                  x={x - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                  fill="var(--learn-chart-plot)"
                  stroke="var(--learn-ink-strong)"
                  strokeWidth={1.5}
                />
              );
            }

            const fill = !isCurrent
              ? "var(--learn-ink-muted)"
              : status === "converged"
                ? "var(--learn-accent)"
                : status === "diverged"
                  ? "var(--learn-series-2)"
                  : "var(--learn-ink)";

            return (
              <circle
                key={`point-${point.step}`}
                cx={x}
                cy={y}
                r={isCurrent ? 5 : 3}
                fill={fill}
                opacity={offChart ? 0.65 : 1}
              />
            );
          })}

          {[0, 4, 8, 12, 16].map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={VIEW_HEIGHT - PAD_BOTTOM + 18}
              textAnchor="middle"
              fontSize={12}
              fill="var(--learn-ink-subtle)"
            >
              {tick}
            </text>
          ))}
          <text
            x={PAD_LEFT + (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / 2}
            y={VIEW_HEIGHT - 4}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-muted)"
          >
            parameter
          </text>
          <text x={8} y={PAD_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
            error
          </text>
        </svg>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        Learning rate
      </label>
      <input
        id={sliderId}
        type="range"
        min={0.001}
        max={1.05}
        step={0.001}
        value={rate}
        onChange={(event) => changeRate(Number(event.target.value))}
        className="mt-1 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        <span className="font-[family-name:var(--learn-font-mono)] tabular-nums">
          {rate.toFixed(3)}
        </span>{" "}
        learning rate
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {RATE_PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => changeRate(preset.rate)}
              aria-pressed={isActive}
              className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
                isActive
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {activePreset && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{activePreset.note}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleStep}
          disabled={atEnd}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-learn-surface px-4 py-2 text-sm font-medium text-learn-strong transition-colors motion-reduce:transition-none hover:text-learn-accent-text disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-learn-strong"
        >
          Step
        </button>
        <button
          type="button"
          onClick={() => setRunning((prev) => !prev)}
          disabled={atEnd && !running}
          aria-pressed={running}
          className="learn-focusable rounded-full border-[0.5px] border-learn-inverse bg-learn-inverse px-4 py-2 text-sm font-medium text-learn-on-inverse transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          {running ? "Pause" : "Run"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-learn-surface px-4 py-2 text-sm font-medium text-learn-muted transition-colors motion-reduce:transition-none hover:text-learn-strong"
        >
          Reset
        </button>
      </div>

      <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{statusText}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatCard label="Step" value={String(current.step)} caption={`of up to ${MAX_STEPS}`} />
        <StatCard
          label="Parameter"
          value={formatNumber(current.weight, 3)}
          caption={`target is ${W_STAR.toFixed(1)}`}
        />
        <StatCard
          label="Error"
          value={formatNumber(current.loss, 2)}
          caption={`slope here: ${formatSigned(current.gradient, 1)}`}
        />
      </div>
    </figure>
  );
}
