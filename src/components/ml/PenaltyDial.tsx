"use client";

import { useId, useMemo, useState } from "react";
import {
  DEFAULT_LAMBDA_INDEX,
  ERROR_CEILING,
  LAMBDAS,
  LAMBDA_STEP_COUNT,
  MAX_ABS_COEFFICIENT,
  NO_MODEL_VALID_RMSE,
  PENALTY_BEST_INDEX,
  PENALTY_PATHS,
  PREDICTORS,
  PREDICTOR_COUNT,
  TRAIN_COUNT,
  VALID_COUNT,
  type PenaltyType,
} from "@/lib/ml/regularisation-data";
import { formatCount } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * One line style per predictor, in the same order as `PREDICTORS`. Solid and
 * saturated for the three that genuinely matter; dashed and hued to match
 * whichever true predictor it echoes for the three correlated look-alikes;
 * dotted and neutral for the three that are plain noise. Shape carries the
 * "does this matter" story on its own — colour is the second signal, not
 * the only one.
 */
const LINE_STYLE: readonly { color: string; dash?: string; width: number; opacity: number }[] = [
  { color: "var(--learn-series-1)", width: 2.75, opacity: 1 }, // size_sqm — true
  { color: "var(--learn-series-2)", width: 2.75, opacity: 1 }, // transit_minutes — true
  { color: "var(--learn-series-3)", width: 2.75, opacity: 1 }, // light_score — true
  { color: "var(--learn-series-3)", dash: "7 4", width: 1.5, opacity: 0.7 }, // elevation_m
  { color: "var(--learn-series-1)", dash: "7 4", width: 1.5, opacity: 0.7 }, // parking_score
  { color: "var(--learn-series-2)", dash: "7 4", width: 1.5, opacity: 0.7 }, // park_distance_min
  { color: "var(--learn-series-4)", dash: "1.5 3", width: 1.3, opacity: 0.65 }, // building_age_years
  { color: "var(--learn-series-5)", dash: "1.5 5", width: 1.3, opacity: 0.65 }, // noise_level_db
  { color: "var(--learn-ink-muted)", dash: "1.5 7", width: 1.3, opacity: 0.65 }, // energy_rating
];

const ROLE_LABEL: Record<string, string> = {
  true: "Matters",
  correlated: "Look-alike",
  independent: "Noise",
};

const COEF_WIDTH = 560;
const COEF_HEIGHT = 280;
const ERROR_WIDTH = 560;
const ERROR_HEIGHT = 240;
const PAD_LEFT = 46;
const PAD_RIGHT = 14;
const PAD_TOP = 18;
const COEF_PAD_BOTTOM = 30;
const ERROR_PAD_BOTTOM = 30;

const xIndex = linearScale([0, LAMBDA_STEP_COUNT - 1], [PAD_LEFT, COEF_WIDTH - PAD_RIGHT]);
const yCoef = linearScale(
  [-MAX_ABS_COEFFICIENT * 1.08, MAX_ABS_COEFFICIENT * 1.08],
  [COEF_HEIGHT - COEF_PAD_BOTTOM, PAD_TOP],
);
const yError = linearScale([0, ERROR_CEILING], [ERROR_HEIGHT - ERROR_PAD_BOTTOM, PAD_TOP]);
const zeroLineY = yCoef(0);

const TICK_INDICES = [0, 8, 16, 24, 32, 40].filter((i) => i < LAMBDA_STEP_COUNT);

function formatLambda(lambda: number): string {
  if (lambda >= 100) return lambda.toFixed(0);
  if (lambda >= 10) return lambda.toFixed(1);
  if (lambda >= 1) return lambda.toFixed(2);
  if (lambda >= 0.1) return lambda.toFixed(3);
  return lambda.toFixed(4);
}

function formatDollars(value: number): string {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toFixed(0)}`;
}

const PENALTY_OPTIONS: readonly { value: PenaltyType; label: string }[] = [
  { value: "l2", label: "L2 — ridge" },
  { value: "l1", label: "L1 — lasso" },
];

export function PenaltyDial() {
  const [penalty, setPenalty] = useState<PenaltyType>("l2");
  const [index, setIndex] = useState(DEFAULT_LAMBDA_INDEX);
  const sliderId = useId();

  const path = PENALTY_PATHS[penalty];
  const bestIndex = PENALTY_BEST_INDEX[penalty];
  const step = path[index];
  const lambda = LAMBDAS[index];

  const coefPaths = useMemo(
    () =>
      PREDICTORS.map((_, j) =>
        path
          .map(
            (s, i) =>
              `${i === 0 ? "M" : "L"}${xIndex(i).toFixed(1)} ${yCoef(s.coefficients[j]).toFixed(1)}`,
          )
          .join(" "),
      ),
    [path],
  );

  const trainErrorPath = useMemo(
    () =>
      path
        .map((s, i) => `${i === 0 ? "M" : "L"}${xIndex(i).toFixed(1)} ${yError(s.trainRmse).toFixed(1)}`)
        .join(" "),
    [path],
  );
  const validErrorPath = useMemo(
    () =>
      path
        .map((s, i) => `${i === 0 ? "M" : "L"}${xIndex(i).toFixed(1)} ${yError(s.validRmse).toFixed(1)}`)
        .join(" "),
    [path],
  );

  const PRESETS = [
    {
      key: "none",
      label: "No penalty",
      index: 0,
      note: "Nothing charges a coefficient for its size. Training error is the lowest it will ever be, and validation error is not.",
    },
    {
      key: "best",
      label: "Best on validation",
      index: bestIndex,
      note: "The strength that minimises error on listings the model never trained on — chosen by looking at the validation curve, not by eye on the training curve.",
    },
    {
      key: "flat",
      label: "Flattened to the mean",
      index: LAMBDA_STEP_COUNT - 1,
      note: "The penalty has squeezed every coefficient toward nothing. The model now predicts close to the same rent for every listing, which is underfitting by another name.",
    },
  ] as const;

  const activePreset = PRESETS.find((p) => p.index === index);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Turn the penalty
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        {TRAIN_COUNT} rental listings to fit on, {VALID_COUNT} held back to check the fit
        against. Nine predictors go in; only three (solid lines) genuinely set the rent. Three
        more (dashed) are correlated look-alikes, and three (dotted) are unrelated noise.
      </p>

      <div className="mt-5">
        <SegmentedControl
          options={PENALTY_OPTIONS}
          value={penalty}
          onValueChange={setPenalty}
          label="Penalty type"
        />
      </div>

      {/* min-w-0 on both columns: a grid item defaults to min-width:auto, so
          the overflow-x-auto wrappers below were held open to their charts'
          440px min-width instead of scrolling. The figure's overflow-hidden
          then cut 127px off the right on a phone, with no way to reach it. */}
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
            Coefficient path
          </h3>
          <div className="mt-2 overflow-x-auto">
            <svg
              viewBox={`0 0 ${COEF_WIDTH} ${COEF_HEIGHT}`}
              className="w-full min-w-[440px]"
              role="img"
              aria-label={
                `Coefficient size for each of nine predictors as the penalty rises from ` +
                `0.001 to 100, using the ${penalty === "l2" ? "L2 ridge" : "L1 lasso"} ` +
                `penalty. At the current strength of ${formatLambda(lambda)}, ` +
                `${formatCount(step.zeroCount)} of nine coefficients are exactly zero.`
              }
            >
              <line
                x1={PAD_LEFT}
                y1={zeroLineY}
                x2={COEF_WIDTH - PAD_RIGHT}
                y2={zeroLineY}
                stroke="var(--learn-chart-axis)"
                strokeWidth={1}
              />
              {coefPaths.map((d, j) => (
                <path
                  key={PREDICTORS[j].key}
                  d={d}
                  fill="none"
                  stroke={LINE_STYLE[j].color}
                  strokeWidth={LINE_STYLE[j].width}
                  strokeDasharray={LINE_STYLE[j].dash}
                  opacity={LINE_STYLE[j].opacity}
                  strokeLinecap="round"
                />
              ))}
              <line
                x1={xIndex(index)}
                y1={PAD_TOP - 4}
                x2={xIndex(index)}
                y2={COEF_HEIGHT - COEF_PAD_BOTTOM + 6}
                stroke="var(--learn-ink)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <line
                x1={PAD_LEFT}
                y1={COEF_HEIGHT - COEF_PAD_BOTTOM}
                x2={COEF_WIDTH - PAD_RIGHT}
                y2={COEF_HEIGHT - COEF_PAD_BOTTOM}
                stroke="var(--learn-chart-axis)"
                strokeWidth={1}
              />
              {TICK_INDICES.map((i) => (
                <text
                  key={i}
                  x={xIndex(i)}
                  y={COEF_HEIGHT - COEF_PAD_BOTTOM + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--learn-ink-subtle)"
                >
                  {formatLambda(LAMBDAS[i])}
                </text>
              ))}
              <text x={6} y={PAD_TOP + 4} fontSize={11} fill="var(--learn-ink-muted)">
                coef
              </text>
            </svg>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
            Training vs. validation error
          </h3>
          <div className="mt-2 overflow-x-auto">
            <svg
              viewBox={`0 0 ${ERROR_WIDTH} ${ERROR_HEIGHT}`}
              className="w-full min-w-[440px]"
              role="img"
              aria-label={
                `Training and validation error in dollars as the penalty rises. At the ` +
                `current strength, training error is ${formatDollars(step.trainRmse)} and ` +
                `validation error is ${formatDollars(step.validRmse)}. Validation error is ` +
                `lowest, at ${formatDollars(path[bestIndex].validRmse)}, at a strength of ` +
                `${formatLambda(LAMBDAS[bestIndex])}.`
              }
            >
              <path d={trainErrorPath} fill="none" stroke="var(--learn-chart-train)" strokeWidth={2} />
              <path
                d={validErrorPath}
                fill="none"
                stroke="var(--learn-chart-test)"
                strokeWidth={2}
                strokeDasharray="6 4"
              />
              <circle
                cx={xIndex(bestIndex)}
                cy={yError(path[bestIndex].validRmse)}
                r={4}
                fill="var(--learn-surface)"
                stroke="var(--learn-chart-test)"
                strokeWidth={2}
              />
              <text
                x={xIndex(bestIndex)}
                y={yError(path[bestIndex].validRmse) - 10}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--learn-chart-test)"
              >
                lowest
              </text>
              <line
                x1={xIndex(index)}
                y1={PAD_TOP - 4}
                x2={xIndex(index)}
                y2={ERROR_HEIGHT - ERROR_PAD_BOTTOM + 6}
                stroke="var(--learn-ink)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <line
                x1={PAD_LEFT}
                y1={ERROR_HEIGHT - ERROR_PAD_BOTTOM}
                x2={ERROR_WIDTH - PAD_RIGHT}
                y2={ERROR_HEIGHT - ERROR_PAD_BOTTOM}
                stroke="var(--learn-chart-axis)"
                strokeWidth={1}
              />
              {TICK_INDICES.map((i) => (
                <text
                  key={i}
                  x={xIndex(i)}
                  y={ERROR_HEIGHT - ERROR_PAD_BOTTOM + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--learn-ink-subtle)"
                >
                  {formatLambda(LAMBDAS[i])}
                </text>
              ))}
              <text x={6} y={PAD_TOP + 4} fontSize={11} fill="var(--learn-ink-muted)">
                $ error
              </text>
            </svg>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
            <li>
              <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-chart-train" />
              training
            </li>
            <li>
              <span
                className="mr-1.5 inline-block h-0.5 w-4 align-middle border-t-2 border-dashed border-learn-chart-test"
                aria-hidden="true"
              />
              validation
            </li>
          </ul>
        </div>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        Penalty strength, log scale from 0.001 to 100
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={LAMBDA_STEP_COUNT - 1}
        step={1}
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
        className="mt-6 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        penalty strength &lambda; = {formatLambda(lambda)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setIndex(preset.index)}
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

      {activePreset && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{activePreset.note}</p>
      )}

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Exactly zero</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatCount(step.zeroCount)}/{formatCount(PREDICTOR_COUNT)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {penalty === "l2"
              ? "Ridge never sets one to zero, at any strength on this dial."
              : "Lasso drops predictors entirely once the penalty outweighs what they contribute."}
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-1">Training error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatDollars(step.trainRmse)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Off by, on the {TRAIN_COUNT} listings it studied.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-3">Validation error</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatDollars(step.validRmse)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Off by, on the {VALID_COUNT} it never saw. Predicting the average rent for everyone
            scores {formatDollars(NO_MODEL_VALID_RMSE)}.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-line bg-white p-5">
        <h3 className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
          Every predictor at this strength
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {PREDICTORS.map((predictor, j) => {
            const value = step.coefficients[j];
            const isZero = Math.abs(value) < 1e-6;
            return (
              <li
                key={predictor.key}
                className="flex items-center justify-between gap-3 rounded-learn-md bg-learn-sunken px-3 py-2 text-[13px]"
              >
                <span className="flex items-center gap-2 text-learn-strong">
                  <svg width={18} height={10} aria-hidden="true">
                    <line
                      x1={1}
                      y1={5}
                      x2={17}
                      y2={5}
                      stroke={LINE_STYLE[j].color}
                      strokeWidth={LINE_STYLE[j].width}
                      strokeDasharray={LINE_STYLE[j].dash}
                      opacity={LINE_STYLE[j].opacity}
                    />
                  </svg>
                  {predictor.label}
                  <span className="text-[11px] uppercase tracking-[0.04em] text-learn-subtle">
                    {ROLE_LABEL[predictor.role]}
                  </span>
                </span>
                <span
                  className={`font-[family-name:var(--learn-font-mono)] tabular-nums ${
                    isZero ? "text-learn-subtle" : "text-learn-strong"
                  }`}
                >
                  {isZero ? "0" : formatDollars(value)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
