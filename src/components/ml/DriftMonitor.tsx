"use client";

import { useId, useMemo, useState } from "react";
import {
  accuracyAt,
  BLIND_WINDOW_MONTHS,
  BLIND_WINDOW_VOLUME,
  DISCOVERY_MONTH,
  DRIFT_MONTH,
  INPUT_SHIFT_ALERT,
  inputShiftAt,
  LABEL_DELAY_MONTHS,
  MONTH_COUNT,
  predictionsWhileDegraded,
  volumeAt,
} from "@/lib/ml/drift-data";
import { formatCount, formatPercent, formatRatio } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 400;
const PAD_LEFT = 54;
const PAD_RIGHT = 18;

const PANEL_A_TOP = 18;
const PANEL_A_BOTTOM = 150;
const PANEL_B_TOP = 192;
const PANEL_B_BOTTOM = 256;
const PANEL_C_TOP = 298;
const PANEL_C_BOTTOM = 362;
const AXIS_LABEL_Y = 380;

const ACCURACY_DOMAIN: readonly [number, number] = [0.65, 0.95];
const SHIFT_DOMAIN: readonly [number, number] = [0, 0.32];
const VOLUME_DOMAIN: readonly [number, number] = [8000, 12200];

const xMonth = linearScale([1, MONTH_COUNT], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yAccuracy = linearScale(ACCURACY_DOMAIN, [PANEL_A_BOTTOM, PANEL_A_TOP]);
const yShift = linearScale(SHIFT_DOMAIN, [PANEL_B_BOTTOM, PANEL_B_TOP]);
const yVolume = linearScale(VOLUME_DOMAIN, [PANEL_C_BOTTOM, PANEL_C_TOP]);

const PRESETS = [
  { key: "before", month: DRIFT_MONTH - 1, label: "Before anything changes" },
  { key: "shock", month: DRIFT_MONTH, label: "The world changes" },
  { key: "discovery", month: DISCOVERY_MONTH, label: "Discovered" },
  { key: "end", month: MONTH_COUNT, label: "Two years in" },
] as const;

function buildPath(
  months: readonly number[],
  scaleX: (v: number) => number,
  scaleY: (v: number) => number,
  value: (month: number) => number,
): string {
  return months
    .map((m, i) => `${i === 0 ? "M" : "L"}${scaleX(m).toFixed(1)} ${scaleY(value(m)).toFixed(1)}`)
    .join(" ");
}

/** A small line sample so the legend states shape, not only colour. */
function LineSwatch({ colour, dash }: { colour: string; dash?: string }) {
  return (
    <svg width="20" height="8" viewBox="0 0 20 8" aria-hidden="true" className="shrink-0">
      <line x1="0" y1="4" x2="20" y2="4" stroke={colour} strokeWidth={2} strokeDasharray={dash} />
    </svg>
  );
}

export function DriftMonitor() {
  const [current, setCurrent] = useState(DISCOVERY_MONTH);
  const [retrainMonth, setRetrainMonth] = useState<number | null>(null);
  const sliderId = useId();

  const months = useMemo(
    () => Array.from({ length: current }, (_, i) => i + 1),
    [current],
  );

  const accuracyNow = accuracyAt(current, retrainMonth);
  const shiftNow = inputShiftAt(current, retrainMonth);
  const volumeNow = volumeAt(current);

  const changeRevealed = current >= DRIFT_MONTH;
  const discovered = current >= DISCOVERY_MONTH;
  const retrainRevealed = retrainMonth !== null && current >= retrainMonth;
  const canRetrain = discovered;

  const monthsSinceChange = changeRevealed ? current - DRIFT_MONTH : null;
  const predictionsDegraded = predictionsWhileDegraded(current);

  const accuracyPath = buildPath(months, xMonth, yAccuracy, (m) => accuracyAt(m, retrainMonth));
  const shiftPath = buildPath(months, xMonth, yShift, (m) => inputShiftAt(m, retrainMonth));
  const volumePath = buildPath(months, xMonth, yVolume, volumeAt);

  const activePreset = PRESETS.find((p) => p.month === current);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the model through two years
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        A model deployed at month 1, aged one month at a time. Watch its true accuracy, how far
        its inputs have drifted from the training data, and how many predictions it served, all
        move together. Labels take {LABEL_DELAY_MONTHS} months to arrive, so accuracy is only
        ever known for months that far in the past.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Month ${current} of ${MONTH_COUNT}. True accuracy ${formatPercent(accuracyNow, 1)}, ` +
            `input drift ${formatRatio(shiftNow, 2)}, ${formatCount(volumeNow)} predictions served. ` +
            (changeRevealed
              ? `The world changed at month ${DRIFT_MONTH}. `
              : "Nothing has visibly changed yet. ") +
            (discovered
              ? `A human would have discovered the problem at month ${DISCOVERY_MONTH}, after ` +
                `${BLIND_WINDOW_MONTHS} months and ${formatCount(BLIND_WINDOW_VOLUME)} predictions ` +
                "served while quietly degraded. "
              : "It has not yet been discovered. ") +
            (retrainRevealed ? `Retrained at month ${retrainMonth}.` : "Not yet retrained.")
          }
        >
          {/* Panel backgrounds */}
          <rect
            x={PAD_LEFT}
            y={PANEL_A_TOP}
            width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
            height={PANEL_A_BOTTOM - PANEL_A_TOP}
            fill="var(--learn-chart-plot)"
          />
          <rect
            x={PAD_LEFT}
            y={PANEL_B_TOP}
            width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
            height={PANEL_B_BOTTOM - PANEL_B_TOP}
            fill="var(--learn-chart-plot)"
          />
          <rect
            x={PAD_LEFT}
            y={PANEL_C_TOP}
            width={VIEW_WIDTH - PAD_LEFT - PAD_RIGHT}
            height={PANEL_C_BOTTOM - PANEL_C_TOP}
            fill="var(--learn-chart-plot)"
          />

          {/* Alert threshold on the drift panel */}
          <line
            x1={PAD_LEFT}
            y1={yShift(INPUT_SHIFT_ALERT)}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={yShift(INPUT_SHIFT_ALERT)}
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text
            x={VIEW_WIDTH - PAD_RIGHT}
            y={yShift(INPUT_SHIFT_ALERT) - 4}
            textAnchor="end"
            fontSize={10.5}
            fill="var(--learn-ink-subtle)"
          >
            usual alert line
          </text>

          {/* Reference events, spanning all three panels */}
          {changeRevealed && (
            <g>
              <line
                x1={xMonth(DRIFT_MONTH)}
                y1={PANEL_A_TOP}
                x2={xMonth(DRIFT_MONTH)}
                y2={PANEL_C_BOTTOM}
                stroke="var(--learn-outcome-fn)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text
                x={xMonth(DRIFT_MONTH) + 4}
                y={PANEL_A_TOP + 10}
                fontSize={11}
                fill="var(--learn-outcome-fn)"
              >
                world changes
              </text>
            </g>
          )}

          {discovered && (
            <g>
              <line
                x1={xMonth(DISCOVERY_MONTH)}
                y1={PANEL_A_TOP}
                x2={xMonth(DISCOVERY_MONTH)}
                y2={PANEL_C_BOTTOM}
                stroke="var(--learn-ink)"
                strokeWidth={1.5}
                strokeDasharray="1 3"
              />
              <text
                x={xMonth(DISCOVERY_MONTH) + 4}
                y={PANEL_A_TOP + 24}
                fontSize={11}
                fill="var(--learn-ink)"
              >
                discovered
              </text>
            </g>
          )}

          {retrainRevealed && retrainMonth !== null && (
            <g>
              <line
                x1={xMonth(retrainMonth)}
                y1={PANEL_A_TOP}
                x2={xMonth(retrainMonth)}
                y2={PANEL_C_BOTTOM}
                stroke="var(--learn-accent)"
                strokeWidth={1.5}
              />
              <text
                x={xMonth(retrainMonth) + 4}
                y={PANEL_A_TOP + 38}
                fontSize={11}
                fill="var(--learn-accent-text)"
              >
                retrained
              </text>
            </g>
          )}

          {/* Panel A: true accuracy — solid, the protagonist */}
          <path d={accuracyPath} fill="none" stroke="var(--learn-chart-model)" strokeWidth={2.5} />
          <circle
            cx={xMonth(current)}
            cy={yAccuracy(accuracyNow)}
            r={4.5}
            fill="var(--learn-chart-model)"
          />
          <text x={6} y={PANEL_A_TOP + 10} fontSize={11} fill="var(--learn-ink-muted)">
            accuracy
          </text>
          {[0.7, 0.8, 0.9].map((tick) => (
            <text
              key={tick}
              x={6}
              y={yAccuracy(tick) + 3}
              fontSize={10.5}
              fill="var(--learn-ink-subtle)"
            >
              {formatPercent(tick, 0)}
            </text>
          ))}

          {/* Panel B: input drift — dashed */}
          <path
            d={shiftPath}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={2}
            strokeDasharray="7 4"
          />
          <rect
            x={xMonth(current) - 3.5}
            y={yShift(shiftNow) - 3.5}
            width={7}
            height={7}
            fill="var(--learn-series-3)"
          />
          <text x={6} y={PANEL_B_TOP + 10} fontSize={11} fill="var(--learn-ink-muted)">
            input drift
          </text>

          {/* Panel C: predictions served — dotted */}
          <path
            d={volumePath}
            fill="none"
            stroke="var(--learn-series-4)"
            strokeWidth={2}
            strokeDasharray="1.5 3.5"
            strokeLinecap="round"
          />
          <rect
            x={xMonth(current) - 4}
            y={yVolume(volumeNow) - 4}
            width={8}
            height={8}
            fill="var(--learn-series-4)"
            transform={`rotate(45 ${xMonth(current)} ${yVolume(volumeNow)})`}
          />
          <text x={6} y={PANEL_C_TOP + 10} fontSize={11} fill="var(--learn-ink-muted)">
            predictions
          </text>

          {/* Shared month axis */}
          <line
            x1={PAD_LEFT}
            y1={PANEL_C_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PANEL_C_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {[1, 6, 12, 18, 24].map((m) => (
            <text
              key={m}
              x={xMonth(m)}
              y={AXIS_LABEL_Y}
              textAnchor="middle"
              fontSize={11}
              fill="var(--learn-ink-subtle)"
            >
              {m}
            </text>
          ))}
          <text
            x={PAD_LEFT + (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / 2}
            y={VIEW_HEIGHT - 4}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            months since deployment
          </text>
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-learn-muted">
        <li className="flex items-center gap-2">
          <LineSwatch colour="var(--learn-chart-model)" />
          true accuracy
        </li>
        <li className="flex items-center gap-2">
          <LineSwatch colour="var(--learn-series-3)" dash="5 3" />
          input drift from training data
        </li>
        <li className="flex items-center gap-2">
          <LineSwatch colour="var(--learn-series-4)" dash="1 3" />
          predictions served
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Month since deployment
      </label>
      <input
        id={sliderId}
        type="range"
        min={1}
        max={MONTH_COUNT}
        step={1}
        value={current}
        onChange={(event) => setCurrent(Number(event.target.value))}
        className="mt-4 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">month {current} of {MONTH_COUNT}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setCurrent(preset.month)}
            aria-pressed={activePreset?.key === preset.key}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              activePreset?.key === preset.key
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Accuracy now</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(accuracyNow, 1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Only ever knowable {LABEL_DELAY_MONTHS} months after the fact, once labels arrive.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Months since the change</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {monthsSinceChange === null ? "—" : formatCount(monthsSinceChange)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {monthsSinceChange === null
              ? "Nothing in the world has changed yet."
              : "How long the model has been scoring a population it was never shown."}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Served while degraded</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatCount(predictionsDegraded)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Predictions made in the window nobody could yet see was bad.
          </p>
        </div>
      </div>

      {discovered && (
        <p className="mt-5 text-[14px] leading-[1.6] text-learn-strong">
          By month {DISCOVERY_MONTH}, the labelling delay meant a human would only just be
          noticing what the model has known was wrong since month {DRIFT_MONTH}.{" "}
          {BLIND_WINDOW_MONTHS} months and {formatCount(BLIND_WINDOW_VOLUME)} predictions had
          already gone out, quietly worse than the number on the dashboard.
        </p>
      )}

      <div className="mt-6 border-t-[0.5px] border-learn-line pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!canRetrain}
            onClick={() => setRetrainMonth(current)}
            className="learn-focusable rounded-full border-[0.5px] border-learn-inverse bg-learn-inverse px-4 py-2 text-sm font-medium text-learn-on-inverse transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40"
          >
            {retrainMonth === null ? `Retrain the model at month ${current}` : `Move the retrain to month ${current}`}
          </button>
          {retrainMonth !== null && (
            <button
              type="button"
              onClick={() => setRetrainMonth(null)}
              className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-learn-surface px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
            >
              Clear retrain
            </button>
          )}
        </div>
        <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
          {canRetrain
            ? "Retraining resets the model to the world as it is now. It recovers most of the accuracy, not all of it — the underlying problem may just be harder than it was."
            : `Drag to month ${DISCOVERY_MONTH} first. Retraining before the problem is even discovered is not a decision anyone can make.`}
        </p>
      </div>
    </figure>
  );
}
