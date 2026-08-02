"use client";

import { useId, useMemo, useState } from "react";
import {
  BEST_VAL_HIDDEN_UNITS,
  GRID_COLS,
  GRID_ROWS,
  MAX_HIDDEN_UNITS,
  NETWORK_STEPS,
  PLOT_MAX,
  PLOT_MIN,
  TRAIN_POINTS,
  VAL_POINTS,
} from "@/lib/ml/network-data";
import { formatPercent } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const VIEW_SIZE = 420;
const PAD = 20;
const PLOT_SIZE = VIEW_SIZE - PAD * 2;
const CELL_W = PLOT_SIZE / GRID_COLS;
const CELL_H = PLOT_SIZE / GRID_ROWS;

const xScale = linearScale([PLOT_MIN, PLOT_MAX], [PAD, PAD + PLOT_SIZE]);
const yScale = linearScale([PLOT_MIN, PLOT_MAX], [PAD + PLOT_SIZE, PAD]);

const REGION_FILL = {
  0: "var(--learn-series-1)",
  1: "var(--learn-series-2)",
} as const;

interface GridSpan {
  row: number;
  startCol: number;
  endCol: number;
  cls: 0 | 1;
}

/** Merges each row's run of same-class cells into one rect, so a 40x40 grid
 *  costs a few dozen DOM nodes instead of sixteen hundred. */
function spansForGrid(grid: readonly (0 | 1)[]): GridSpan[] {
  const spans: GridSpan[] = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    let startCol = 0;
    let cls = grid[row * GRID_COLS];
    for (let col = 1; col <= GRID_COLS; col += 1) {
      const cell = col < GRID_COLS ? grid[row * GRID_COLS + col] : null;
      if (cell !== cls) {
        spans.push({ row, startCol, endCol: col - 1, cls });
        startCol = col;
        cls = cell as 0 | 1;
      }
    }
  }
  return spans;
}

const PRESETS = [
  { key: "flat", hiddenUnits: 0, label: "No bend" },
  { key: "found-it", hiddenUnits: BEST_VAL_HIDDEN_UNITS, label: "About right" },
  { key: "traced", hiddenUnits: MAX_HIDDEN_UNITS, label: "Every point traced" },
] as const;

/* --------------------------------------------------------------------------
 * The network diagram: two input nodes, H hidden nodes, one output node.
 * Purely a function of hiddenUnits — no data dependency.
 * ---------------------------------------------------------------------- */

const DIAGRAM_WIDTH = 260;
const DIAGRAM_HEIGHT = 210;
const INPUT_X = 34;
const HIDDEN_X = 130;
const OUTPUT_X = 226;
const CENTER_Y = DIAGRAM_HEIGHT / 2 - 8;
const NODE_R = 9;
const IDEAL_HIDDEN_SPACING = 24;
/** Leaves room for node radii top and bottom, plus the label row. */
const MAX_HIDDEN_SPAN = DIAGRAM_HEIGHT - NODE_R * 2 - 44;

function hiddenYs(hiddenUnits: number): number[] {
  if (hiddenUnits === 0) return [];
  const spacing =
    hiddenUnits === 1 ? 0 : Math.min(IDEAL_HIDDEN_SPACING, MAX_HIDDEN_SPAN / (hiddenUnits - 1));
  const span = spacing * (hiddenUnits - 1);
  const top = CENTER_Y - span / 2;
  return Array.from({ length: hiddenUnits }, (_, i) => top + i * spacing);
}

function NetworkDiagram({ hiddenUnits }: { hiddenUnits: number }) {
  const inputYs = [CENTER_Y - 34, CENTER_Y + 34];
  const hidden = hiddenYs(hiddenUnits);

  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
      className="w-full max-w-[280px]"
      role="img"
      aria-label={
        hiddenUnits === 0
          ? "Network diagram: two inputs wired straight to one output, with no hidden layer."
          : `Network diagram: two inputs, a hidden layer of ${hiddenUnits} ReLU ${
              hiddenUnits === 1 ? "unit" : "units"
            }, and one output.`
      }
    >
      {/* Connections drawn first, so nodes sit on top */}
      {hidden.length === 0
        ? inputYs.map((y, i) => (
            <line
              key={`direct-${i}`}
              x1={INPUT_X}
              y1={y}
              x2={OUTPUT_X}
              y2={CENTER_Y}
              stroke="var(--learn-ink-muted)"
              strokeWidth={1}
              opacity={0.55}
            />
          ))
        : (
            <>
              {inputYs.map((y1, i) =>
                hidden.map((y2, h) => (
                  <line
                    key={`ih-${i}-${h}`}
                    x1={INPUT_X}
                    y1={y1}
                    x2={HIDDEN_X}
                    y2={y2}
                    stroke="var(--learn-ink-muted)"
                    strokeWidth={0.75}
                    opacity={0.4}
                  />
                )),
              )}
              {hidden.map((y1, h) => (
                <line
                  key={`ho-${h}`}
                  x1={HIDDEN_X}
                  y1={y1}
                  x2={OUTPUT_X}
                  y2={CENTER_Y}
                  stroke="var(--learn-ink-muted)"
                  strokeWidth={0.75}
                  opacity={0.4}
                />
              ))}
            </>
          )}

      {inputYs.map((y, i) => (
        <circle
          key={`in-${i}`}
          cx={INPUT_X}
          cy={y}
          r={NODE_R}
          fill="var(--learn-surface)"
          stroke="var(--learn-ink-strong)"
          strokeWidth={1.5}
        />
      ))}

      {hidden.map((y, h) => (
        <circle
          key={`hid-${h}`}
          cx={HIDDEN_X}
          cy={y}
          r={NODE_R}
          fill="var(--learn-accent)"
          stroke="var(--learn-surface)"
          strokeWidth={1.5}
        />
      ))}

      <circle
        cx={OUTPUT_X}
        cy={CENTER_Y}
        r={NODE_R}
        fill="var(--learn-ink-strong)"
        stroke="var(--learn-surface)"
        strokeWidth={1.5}
      />

      <text x={INPUT_X} y={DIAGRAM_HEIGHT - 8} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">
        in
      </text>
      {hiddenUnits > 0 && (
        <text x={HIDDEN_X} y={DIAGRAM_HEIGHT - 8} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">
          ReLU × {hiddenUnits}
        </text>
      )}
      <text x={OUTPUT_X} y={DIAGRAM_HEIGHT - 8} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">
        out
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * The widget
 * ---------------------------------------------------------------------- */

export function HiddenUnitDial() {
  const [hiddenUnits, setHiddenUnits] = useState(0);
  const sliderId = useId();

  const step = NETWORK_STEPS[hiddenUnits];
  const spans = useMemo(() => spansForGrid(step.grid), [step.grid]);
  const activePreset = PRESETS.find((p) => p.hiddenUnits === hiddenUnits);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Add hidden units one at a time
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        An inner ring and an outer ring, 180 points in total. The shading is the region the
        network currently calls each class. Circles are the inner ring, squares the outer one;
        filled marks are what it trained on, hollow marks are the 60 it never saw.
      </p>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
            className="w-full min-w-[300px]"
            role="img"
            aria-label={
              `Decision regions with ${hiddenUnits} hidden ${hiddenUnits === 1 ? "unit" : "units"}: ` +
              `${formatPercent(step.trainAccuracy, 1)} accuracy on the 120 training points and ` +
              `${formatPercent(step.valAccuracy, 1)} on the 60 held-back points.`
            }
          >
            <rect x={PAD} y={PAD} width={PLOT_SIZE} height={PLOT_SIZE} fill="var(--learn-chart-plot)" />

            {spans.map((span, i) => (
              <rect
                key={i}
                x={PAD + span.startCol * CELL_W}
                y={PAD + span.row * CELL_H}
                width={(span.endCol - span.startCol + 1) * CELL_W + 0.5}
                height={CELL_H + 0.5}
                fill={REGION_FILL[span.cls]}
                fillOpacity={0.16}
              />
            ))}

            {VAL_POINTS.map((p, i) =>
              p.label === 0 ? (
                <circle
                  key={`val-0-${i}`}
                  cx={xScale(p.x)}
                  cy={yScale(p.y)}
                  r={4}
                  fill="none"
                  stroke="var(--learn-series-1)"
                  strokeWidth={1.4}
                />
              ) : (
                <rect
                  key={`val-1-${i}`}
                  x={xScale(p.x) - 3.4}
                  y={yScale(p.y) - 3.4}
                  width={6.8}
                  height={6.8}
                  fill="none"
                  stroke="var(--learn-series-2)"
                  strokeWidth={1.4}
                />
              ),
            )}

            {TRAIN_POINTS.map((p, i) =>
              p.label === 0 ? (
                <circle
                  key={`train-0-${i}`}
                  cx={xScale(p.x)}
                  cy={yScale(p.y)}
                  r={4}
                  fill="var(--learn-series-1)"
                  stroke="var(--learn-surface)"
                  strokeWidth={0.8}
                />
              ) : (
                <rect
                  key={`train-1-${i}`}
                  x={xScale(p.x) - 3.4}
                  y={yScale(p.y) - 3.4}
                  width={6.8}
                  height={6.8}
                  fill="var(--learn-series-2)"
                  stroke="var(--learn-surface)"
                  strokeWidth={0.8}
                />
              ),
            )}

            <rect
              x={PAD}
              y={PAD}
              width={PLOT_SIZE}
              height={PLOT_SIZE}
              fill="none"
              stroke="var(--learn-chart-axis)"
              strokeWidth={1}
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-4">
          <NetworkDiagram hiddenUnits={hiddenUnits} />
          <p className="text-center text-[12px] leading-[1.4] text-learn-muted">
            {hiddenUnits === 0
              ? "No hidden layer: a straight weighted sum, same as How a Model Learns."
              : `${hiddenUnits} hidden ${hiddenUnits === 1 ? "unit" : "units"}, each a bend, combined by the output.`}
          </p>
        </div>
      </div>

      {/* Legend as HTML so it scales with the reader's font size */}
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          inner ring
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 bg-learn-series-2" />
          outer ring
        </li>
        <li>filled = trained on, hollow = held back</li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Number of hidden units
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={MAX_HIDDEN_UNITS}
        step={1}
        value={hiddenUnits}
        onChange={(event) => setHiddenUnits(Number(event.target.value))}
        className="mt-4 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {hiddenUnits === 0 ? "no hidden units — a straight line" : `${hiddenUnits} hidden unit${hiddenUnits === 1 ? "" : "s"}`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setHiddenUnits(preset.hiddenUnits)}
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

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Training accuracy</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(step.trainAccuracy, 1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            over the 120 points it trained on
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Validation accuracy</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(step.valAccuracy, 1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            over the 60 it never trained on
          </p>
        </div>
      </div>
    </figure>
  );
}
