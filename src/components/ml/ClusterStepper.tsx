"use client";

import { useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import {
  clusterCounts,
  type ClusterCount,
  DOMAIN_X,
  DOMAIN_Y,
  K_VALUES,
  type KMeansFrame,
  POINTS,
  runKMeans,
  START_OPTIONS,
} from "@/lib/ml/clustering-data";
import { formatCount } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";

const PAD_LEFT = 32;
const PAD_RIGHT = 20;
const PAD_TOP = 20;
const PAD_BOTTOM = 20;
const PLOT_WIDTH = 450;
const PLOT_HEIGHT = 300;
const VIEW_WIDTH = PAD_LEFT + PLOT_WIDTH + PAD_RIGHT;
const VIEW_HEIGHT = PAD_TOP + PLOT_HEIGHT + PAD_BOTTOM;

const xScale = linearScale(DOMAIN_X, [PAD_LEFT, PAD_LEFT + PLOT_WIDTH]);
const yScale = linearScale(DOMAIN_Y, [PAD_TOP, PAD_TOP + PLOT_HEIGHT]);

/** Fern, rust, indigo, ochre — series colours 1 through 4, one per possible cluster. */
const SERIES_COLORS = [
  "var(--learn-series-1)",
  "var(--learn-series-2)",
  "var(--learn-series-3)",
  "var(--learn-series-4)",
] as const;

const SHAPE_NAMES = ["circle", "square", "triangle", "diamond"] as const;

function trianglePoints(cx: number, cy: number, r: number): string {
  const points = [
    [cx, cy - r],
    [cx + r * 0.87, cy + r * 0.6],
    [cx - r * 0.87, cy + r * 0.6],
  ];
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function diamondPoints(cx: number, cy: number, r: number): string {
  const points = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

/**
 * Every cluster gets a colour and a shape, so the assignment survives
 * colour-blindness as well as it survives greyscale printing.
 */
function ClusterMark({
  x,
  y,
  cluster,
  size,
  centre,
}: {
  x: number;
  y: number;
  cluster: number;
  size: number;
  centre: boolean;
}) {
  const fill = SERIES_COLORS[cluster];
  const stroke = centre ? "var(--learn-ink)" : undefined;
  const strokeWidth = centre ? 2 : 0;

  switch (cluster % 4) {
    case 1:
      return (
        <rect
          x={x - size}
          y={y - size}
          width={size * 2}
          height={size * 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case 2:
      return (
        <polygon
          points={trianglePoints(x, y, size * 1.25)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case 3:
      return (
        <polygon
          points={diamondPoints(x, y, size * 1.15)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    default:
      return <circle cx={x} cy={y} r={size} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
}

function frameSummary(frame: KMeansFrame | null, k: ClusterCount): string {
  if (!frame) {
    return `The ${k} centres are placed. Nothing has been assigned to them yet.`;
  }
  if (frame.kind === "move") {
    return "Move: each centre slides to the mean of the points it was just given.";
  }
  if (frame.assignmentsChanged === false) {
    return "Assign: every point checked its nearest centre and nobody moved. The run has converged.";
  }
  return "Assign: every point joins whichever centre is currently closest to it.";
}

export function ClusterStepper() {
  const [k, setK] = useState<ClusterCount>(3);
  const [startKey, setStartKey] = useState<string>(START_OPTIONS[3][0].key);
  const [stepIndex, setStepIndex] = useState(-1);

  const startOptions = START_OPTIONS[k];
  const start = startOptions.find((o) => o.key === startKey) ?? startOptions[0];

  const frames = useMemo(() => runKMeans(start.centres), [start]);
  const maxStepIndex = frames.length - 1;
  const frame: KMeansFrame | null = stepIndex === -1 ? null : frames[Math.min(stepIndex, maxStepIndex)];
  const converged = frame !== null && stepIndex >= maxStepIndex;
  const iterations = frame ? Math.floor(frame.index / 2) : 0;

  const displayedCentres = frame ? frame.centres : start.centres;
  const counts = frame ? clusterCounts(k, frame.assignments) : null;

  function handleK(nextK: ClusterCount) {
    setK(nextK);
    setStartKey(START_OPTIONS[nextK][0].key);
    setStepIndex(-1);
  }

  function handleStart(nextKey: string) {
    setStartKey(nextKey);
    setStepIndex(-1);
  }

  function handleStep() {
    setStepIndex((i) => Math.min(i + 1, maxStepIndex));
  }

  function handleReset() {
    setStepIndex(-1);
  }

  const otherStarts = startOptions.filter((o) => o.key !== start.key).map((o) => `"${o.label}"`);

  const ariaLabel = frame
    ? `k-means with k = ${k}, started ${start.label}. Step ${frame.index + 1} of ${frames.length}, ` +
      `${frame.kind}. Inertia is ${formatCount(frame.inertia)}${
        converged ? `, converged after ${iterations} iterations.` : "."
      }`
    : `k-means with k = ${k}, started ${start.label}. Ninety-eight unlabelled points, centres placed, ` +
      `nothing assigned yet.`;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Step the algorithm yourself
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Ninety-eight points, no colours, no labels. Pick how many groups to look for and where
        the centres begin, then press Step to watch <strong className="font-semibold">assign</strong>{" "}
        and <strong className="font-semibold">move</strong> alternate until nothing changes.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[420px]"
          role="img"
          aria-label={ariaLabel}
        >
          <rect
            x={PAD_LEFT}
            y={PAD_TOP}
            width={PLOT_WIDTH}
            height={PLOT_HEIGHT}
            fill="var(--learn-chart-plot)"
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={1}
          />

          {POINTS.map((point, i) => {
            const cx = xScale(point.x);
            const cy = yScale(point.y);
            if (!frame) {
              return <circle key={i} cx={cx} cy={cy} r={3} fill="var(--learn-chart-muted-mark)" />;
            }
            return (
              <ClusterMark
                key={i}
                x={cx}
                y={cy}
                cluster={frame.assignments[i]}
                size={3.2}
                centre={false}
              />
            );
          })}

          {displayedCentres.map((c, i) => (
            <ClusterMark
              key={`centre-${i}`}
              x={xScale(c.x)}
              y={yScale(c.y)}
              cluster={i}
              size={8}
              centre
            />
          ))}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        {Array.from({ length: k }, (_, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: SERIES_COLORS[i] }}
            />
            group {i + 1} — {SHAPE_NAMES[i]}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-4">
        <SegmentedControl
          label="How many groups to look for"
          value={String(k)}
          onValueChange={(value) => handleK(Number(value) as ClusterCount)}
          options={K_VALUES.map((value) => ({ value: String(value), label: `k = ${value}` }))}
        />

        <SegmentedControl
          label="Where the centres begin"
          variant="chips"
          value={start.key}
          onValueChange={handleStart}
          options={startOptions.map((option) => ({ value: option.key, label: option.label }))}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleStep}
          disabled={converged}
          className="learn-focusable rounded-full border-[0.5px] border-learn-inverse bg-learn-inverse px-5 py-2 text-sm font-medium text-learn-on-inverse transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          {converged ? "Converged" : "Step"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-5 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Reset
        </button>
        <span className="text-[13px] text-learn-subtle tabular-nums">
          {frame ? `Step ${frame.index + 1} of ${frames.length}` : "Not started"}
        </span>
      </div>

      <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{frameSummary(frame, k)}</p>

      {converged && otherStarts.length > 0 && (
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-accent-text">
          Reset and try {otherStarts.join(" or ")} at k = {k} to see whether it lands somewhere
          else.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array.from({ length: k }, (_, i) => (
          <div key={i} className="rounded-learn-md border-[0.5px] border-learn-line bg-white p-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rounded-[3px]"
                style={{ backgroundColor: SERIES_COLORS[i] }}
              />
              <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-learn-strong">
                Group {i + 1}
              </span>
            </div>
            <p className="mt-1 font-mono text-[20px] leading-none text-learn-strong tabular-nums">
              {counts ? counts[i] : "—"}
            </p>
            <p className="mt-1 text-[12px] leading-[1.4] text-learn-subtle">points assigned</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-learn-strong">Inertia</h3>
          <span className="font-mono text-[20px] leading-none text-learn-strong tabular-nums">
            {frame ? formatCount(frame.inertia) : "—"}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          The total squared distance from every point to the centre it belongs to. This is the
          only number k-means is trying to shrink — lower means tighter groups, and nothing else
          about the grouping is being judged.
        </p>
      </div>
    </figure>
  );
}
