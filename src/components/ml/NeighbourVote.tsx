"use client";

import { useId, useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatPercent } from "@/lib/ml/format";
import {
  ACCURACY,
  HOURS_RANGE,
  K_VALUES,
  type Metric,
  nearest,
  PREVIOUS_RANGE,
  PROBES,
  STUDENTS,
  vote,
} from "@/lib/ml/neighbours-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 380;
const PAD_LEFT = 46;
const PAD_RIGHT = 16;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 300;

const xHours = linearScale([HOURS_RANGE[0], HOURS_RANGE[1]], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yPrevious = linearScale(
  [PREVIOUS_RANGE[0], PREVIOUS_RANGE[1]],
  [PLOT_BOTTOM, PLOT_TOP],
);

/* The accuracy-against-k strip that sits under the scatter. */
const STRIP_TOP = 322;
const STRIP_BOTTOM = 372;
const xK = linearScale([0, K_VALUES.length - 1], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yAccuracy = linearScale([0.55, 0.95], [STRIP_BOTTOM, STRIP_TOP]);

function accuracyPath(pick: (i: number) => number): string {
  return ACCURACY.map(
    (_, i) => `${i === 0 ? "M" : "L"}${xK(i).toFixed(1)} ${yAccuracy(pick(i)).toFixed(1)}`,
  ).join(" ");
}

const RAW_PATH = accuracyPath((i) => ACCURACY[i].raw);
const SCALED_PATH = accuracyPath((i) => ACCURACY[i].scaled);

/**
 * A student who passed is a filled circle; one who did not is a hollow square.
 * Shape carries the class as well as hue does — fern and rust converge under
 * deuteranopia, so colour alone would not survive it.
 */
function Mark({ x, y, passed, dim }: { x: number; y: number; passed: boolean; dim: boolean }) {
  const opacity = dim ? 0.28 : 1;
  if (passed) {
    return <circle cx={x} cy={y} r={4.6} fill="var(--learn-series-1)" opacity={opacity} />;
  }
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width={8}
      height={8}
      fill="none"
      stroke="var(--learn-series-3)"
      strokeWidth={1.6}
      opacity={opacity}
    />
  );
}

export function NeighbourVote() {
  const [kIndex, setKIndex] = useState(2);
  const [metric, setMetric] = useState<Metric>("raw");
  const [probeKey, setProbeKey] = useState(PROBES[0].key);

  const sliderId = useId();
  const k = K_VALUES[kIndex];
  const probe = PROBES.find((p) => p.key === probeKey) ?? PROBES[0];

  const neighbours = useMemo(
    () => nearest({ hours: probe.hours, previous: probe.previous }, k, metric),
    [probe.hours, probe.previous, k, metric],
  );
  const result = useMemo(() => vote(neighbours), [neighbours]);
  const neighbourIndices = useMemo(
    () => new Set(neighbours.map((n) => n.index)),
    [neighbours],
  );

  const qx = xHours(probe.hours);
  const qy = yPrevious(probe.previous);
  const accuracyHere = metric === "raw" ? ACCURACY[kIndex].raw : ACCURACY[kIndex].scaled;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Ask the neighbours
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Fifty-four students, placed by how long they revised and what they scored last time.
        Filled circles passed; hollow squares did not. The cross is a new student nobody has
        graded yet — the {k} nearest are joined to it, and they vote.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Revision hours against previous exam score for 54 students. The new student ` +
            `revised ${probe.hours} hours with a previous score of ${probe.previous}. Using ` +
            `${metric === "raw" ? "the features' own units" : "both features rescaled to 0-1"}, ` +
            `the ${k} nearest students vote ${result.passVotes} to ${result.failVotes} for ` +
            `${result.passed ? "pass" : "fail"}. Leave-one-out accuracy at this setting is ` +
            `${formatPercent(accuracyHere)}.`
          }
        >
          {[20, 40, 60, 80, 100].map((p) => (
            <line
              key={p}
              x1={PAD_LEFT}
              y1={yPrevious(p)}
              x2={VIEW_WIDTH - PAD_RIGHT}
              y2={yPrevious(p)}
              stroke="var(--learn-chart-grid)"
              strokeWidth={1}
            />
          ))}

          {/* Spokes first, so the marks sit on top of them. */}
          {neighbours.map((n) => (
            <line
              key={`spoke-${n.index}`}
              x1={qx}
              y1={qy}
              x2={xHours(n.student.hours)}
              y2={yPrevious(n.student.previous)}
              stroke="var(--learn-chart-axis)"
              strokeWidth={1.2}
              opacity={0.55}
            />
          ))}

          {STUDENTS.map((student, i) => (
            <Mark
              key={i}
              x={xHours(student.hours)}
              y={yPrevious(student.previous)}
              passed={student.passed}
              dim={!neighbourIndices.has(i)}
            />
          ))}

          <g>
            <line
              x1={qx - 7}
              y1={qy}
              x2={qx + 7}
              y2={qy}
              stroke="var(--learn-ink)"
              strokeWidth={2.4}
            />
            <line
              x1={qx}
              y1={qy - 7}
              x2={qx}
              y2={qy + 7}
              stroke="var(--learn-ink)"
              strokeWidth={2.4}
            />
          </g>

          <line
            x1={PAD_LEFT}
            y1={PLOT_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {[0, 3, 6, 9, 12].map((h) => (
            <text
              key={h}
              x={xHours(h)}
              y={PLOT_BOTTOM + 15}
              textAnchor="middle"
              fontSize={12}
              fill="var(--learn-ink-subtle)"
            >
              {h}h
            </text>
          ))}
          <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
            last
          </text>
          <text x={6} y={PLOT_TOP + 24} fontSize={12} fill="var(--learn-ink-muted)">
            score
          </text>

          {/* Accuracy against k, both metrics, with the current k marked. */}
          <text x={PAD_LEFT} y={STRIP_TOP - 6} fontSize={11} fill="var(--learn-ink-muted)">
            accuracy across every k
          </text>
          <path d={RAW_PATH} fill="none" stroke="var(--learn-series-4)" strokeWidth={1.6} strokeDasharray="4 3" />
          <path d={SCALED_PATH} fill="none" stroke="var(--learn-series-1)" strokeWidth={2} />
          <circle
            cx={xK(kIndex)}
            cy={yAccuracy(accuracyHere)}
            r={4}
            fill="var(--learn-ink)"
          />
          {K_VALUES.map((value, i) => (
            <text
              key={value}
              x={xK(i)}
              y={STRIP_BOTTOM + 12}
              textAnchor="middle"
              fontSize={11}
              fill={i === kIndex ? "var(--learn-ink)" : "var(--learn-ink-subtle)"}
            >
              {value}
            </text>
          ))}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          passed
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 border-[1.5px] border-learn-series-3" />
          did not
        </li>
        <li>solid line — rescaled</li>
        <li>dashed line — raw units</li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        How many neighbours vote
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={K_VALUES.length - 1}
        step={1}
        value={kIndex}
        onChange={(event) => setKIndex(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        k = {k} — the {k} nearest {k === 1 ? "student" : "students"} decide
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PROBES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setProbeKey(p.key)}
            aria-pressed={p.key === probeKey}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              p.key === probeKey
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <SegmentedControl
        className="mt-3"
        label="How distance is measured"
        value={metric}
        onValueChange={setMetric}
        options={[
          { value: "raw", label: "Measure in raw units" },
          { value: "scaled", label: "Put both on the same scale" },
        ]}
      />

      <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{probe.note}</p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5 md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">The vote</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {result.passVotes}&ndash;{result.failVotes}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
            {result.passVotes} of the {k} nearest passed, so the model predicts{" "}
            <strong className="font-semibold text-learn-strong">
              {result.passed ? "pass" : "fail"}
            </strong>
            . Nothing was trained. The prediction is a lookup and a count.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Accuracy</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(accuracyHere)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Across all fifty-four, predicting each from the other fifty-three.
          </p>
        </div>
      </div>
    </figure>
  );
}
