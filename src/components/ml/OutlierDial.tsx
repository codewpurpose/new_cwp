"use client";

import { useId, useMemo, useState } from "react";
import { formatNumber } from "@/lib/ml/format";
import {
  AXIS_EXTENT,
  CUTOFF_MAX,
  CUTOFF_MIN,
  CUTOFF_STEP,
  DEFAULT_CUTOFF,
  FRAUD_COUNT,
  metricsAt,
  PRESETS,
  TRANSACTIONS,
} from "@/lib/ml/anomaly-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_SIZE = 440;
const PAD = 24;

const xScale = linearScale([-AXIS_EXTENT, AXIS_EXTENT], [PAD, VIEW_SIZE - PAD]);
const yScale = linearScale([-AXIS_EXTENT, AXIS_EXTENT], [VIEW_SIZE - PAD, PAD]);
const PIXELS_PER_UNIT = xScale(1) - xScale(0);
const ORIGIN_X = xScale(0);
const ORIGIN_Y = yScale(0);

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-[13px] font-semibold text-learn-strong">{label}</h4>
        <span className="font-[family-name:var(--learn-font-mono)] text-[18px] leading-none text-learn-strong tabular-nums">
          {value}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] leading-[1.45] text-learn-muted">{hint}</p>
    </div>
  );
}

/**
 * A legitimate transaction is a small filled circle; a fraud is a hollow
 * square. Shape carries the class as well as hue does — fern-adjacent and
 * rust converge under deuteranopia, so colour alone would not survive it.
 * Anything flagged gets an extra ring, regardless of which shape it is.
 */
function Mark({
  x,
  y,
  fraud,
  flagged,
}: {
  x: number;
  y: number;
  fraud: boolean;
  flagged: boolean;
}) {
  return (
    <g>
      {flagged && (
        <circle
          cx={x}
          cy={y}
          r={fraud ? 8.5 : 7}
          fill="none"
          stroke="var(--learn-ink)"
          strokeWidth={1.3}
          opacity={0.75}
        />
      )}
      {fraud ? (
        <rect
          x={x - 4.4}
          y={y - 4.4}
          width={8.8}
          height={8.8}
          fill="none"
          stroke="var(--learn-series-2)"
          strokeWidth={1.8}
        />
      ) : (
        <circle cx={x} cy={y} r={2.6} fill="var(--learn-chart-muted-mark)" opacity={0.85} />
      )}
    </g>
  );
}

export function OutlierDial() {
  const [cutoff, setCutoff] = useState(DEFAULT_CUTOFF);
  const sliderId = useId();

  const metrics = useMemo(() => metricsAt(cutoff), [cutoff]);
  const activePreset = PRESETS.find((p) => Math.abs(p.cutoff - cutoff) < 0.001);
  const boundaryRadius = cutoff * PIXELS_PER_UNIT;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the cut-off
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        {TRANSACTIONS.length} transactions, placed by how unusual they were on two measurements
        at once. The dashed circle is the cut-off — its radius <strong className="font-semibold">is</strong>{" "}
        the anomaly score. Everything outside it gets flagged for review.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="mx-auto w-full min-w-[360px] max-w-[440px]"
          role="img"
          aria-label={
            `Anomaly scatter at a cut-off of ${cutoff.toFixed(2)}: ${metrics.flagged} transactions ` +
            `flagged, catching ${metrics.caught} of ${FRAUD_COUNT} real frauds and raising ` +
            `${metrics.falseAlarms} false alarms.`
          }
        >
          <circle
            cx={ORIGIN_X}
            cy={ORIGIN_Y}
            r={boundaryRadius}
            fill="none"
            stroke="var(--learn-ink)"
            strokeWidth={2}
            strokeDasharray="5 4"
            className="transition-[r] duration-150 ease-out motion-reduce:transition-none"
          />
          <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={2.5} fill="var(--learn-ink)" />

          {TRANSACTIONS.map((t, i) => (
            <Mark
              key={i}
              x={xScale(t.x)}
              y={yScale(t.y)}
              fraud={t.fraud}
              flagged={t.score >= cutoff}
            />
          ))}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span
            className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ backgroundColor: "var(--learn-chart-muted-mark)" }}
          />
          ordinary
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 border-[1.6px] border-learn-series-2 align-middle" />
          genuine fraud
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full border-[1.3px] border-learn-ink align-middle" />
          flagged
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Anomaly score cut-off
      </label>
      <input
        id={sliderId}
        type="range"
        min={CUTOFF_MIN}
        max={CUTOFF_MAX}
        step={CUTOFF_STEP}
        value={cutoff}
        onChange={(event) => setCutoff(Number(event.target.value))}
        className="mt-4 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        cut-off {formatNumber(cutoff, 2)} — {metrics.flagged} transactions sent for review
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setCutoff(preset.cutoff)}
              aria-pressed={isActive}
              className={`rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-learn-ink ${
                isActive
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
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

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric
          label="Frauds caught"
          value={`${metrics.caught} / ${FRAUD_COUNT}`}
          hint="Real frauds sitting past the cut-off."
        />
        <Metric
          label="False alarms"
          value={String(metrics.falseAlarms)}
          hint="Legitimate transactions swept up with them."
        />
        <Metric
          label="Alerts per catch"
          value={metrics.alertsPerCatch === null ? "—" : `${formatNumber(metrics.alertsPerCatch, 1)}×`}
          hint="What an analyst actually opens for every real fraud in the pile."
        />
      </div>
    </figure>
  );
}
