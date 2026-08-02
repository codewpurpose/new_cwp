"use client";

import { useId, useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatNumber, formatPercent } from "@/lib/ml/format";
import { linearScale } from "@/lib/ml/scale";
import {
  BY_DEPTH,
  DISTANCE_RANGE,
  type Flat,
  FEATURE_LABEL,
  MAX_DEPTH,
  RENT_RANGE,
  TEST,
  TRAIN,
  type TreeNode,
} from "@/lib/ml/tree-data";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 430;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PLOT_TOP = 16;
const PLOT_BOTTOM = 288;

const xRent = linearScale([RENT_RANGE[0], RENT_RANGE[1]], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yDistance = linearScale([DISTANCE_RANGE[0], DISTANCE_RANGE[1]], [PLOT_TOP, PLOT_BOTTOM]);

const STRIP_TOP = 340;
const STRIP_BOTTOM = 410;
const xDepth = linearScale([1, MAX_DEPTH], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yAccuracy = linearScale([0.55, 1], [STRIP_BOTTOM, STRIP_TOP]);

function accuracyPath(pick: (d: (typeof BY_DEPTH)[number]) => number): string {
  return BY_DEPTH.map(
    (d, i) => `${i === 0 ? "M" : "L"}${xDepth(d.depth).toFixed(1)} ${yAccuracy(pick(d)).toFixed(1)}`,
  ).join(" ");
}

const TRAIN_PATH = accuracyPath((d) => d.trainAccuracy);
const TEST_PATH = accuracyPath((d) => d.testAccuracy);

type Which = "train" | "test";

/** Let within a week is a filled circle; not let is a hollow square. */
function Mark({ flat }: { flat: Flat }) {
  const x = xRent(flat.rent);
  const y = yDistance(flat.distance);
  if (flat.letFast) return <circle cx={x} cy={y} r={4.4} fill="var(--learn-series-1)" />;
  return (
    <rect
      x={x - 3.8}
      y={y - 3.8}
      width={7.6}
      height={7.6}
      fill="none"
      stroke="var(--learn-series-3)"
      strokeWidth={1.6}
    />
  );
}

/** The tree as the flowchart it is, one indented rule per line. */
function Rules({ node, prefix = "" }: { node: TreeNode; prefix?: string }) {
  if (!node.split || !node.left || !node.right) {
    return (
      <div style={{ paddingLeft: node.depth * 14 }}>
        <span className="text-learn-subtle">{prefix}</span>
        <span className={node.prediction ? "text-learn-series-1" : "text-learn-muted"}>
          {node.prediction ? "let within a week" : "still listed"}
        </span>
        <span className="text-learn-subtle"> ({node.count})</span>
      </div>
    );
  }
  const unit = node.split.feature === "rent" ? "" : " km";
  const value =
    node.split.feature === "rent"
      ? `£${formatNumber(node.split.threshold, 0)}`
      : `${formatNumber(node.split.threshold, 1)}${unit}`;
  return (
    <>
      <div style={{ paddingLeft: node.depth * 14 }}>
        <span className="text-learn-subtle">{prefix}</span>
        <span className="text-learn-strong">
          {FEATURE_LABEL[node.split.feature]} &lt; {value}
        </span>
      </div>
      <Rules node={node.left} prefix="yes → " />
      <Rules node={node.right} prefix="no → " />
    </>
  );
}

export function TreeSplitter() {
  const [depth, setDepth] = useState(2);
  const [which, setWhich] = useState<Which>("train");
  const sliderId = useId();

  const result = BY_DEPTH[depth - 1];
  const shown = which === "train" ? TRAIN : TEST;
  const shownAccuracy = which === "train" ? result.trainAccuracy : result.testAccuracy;

  const gap = useMemo(
    () => result.trainAccuracy - result.testAccuracy,
    [result.trainAccuracy, result.testAccuracy],
  );

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Let the tree grow
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Seventy-two student flats by rent and distance from campus. Filled circles were let
        within a week; hollow squares were still listed. The shaded blocks are what the tree
        predicts — every boundary is a straight cut across one axis, because that is the only
        kind of question a tree can ask.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Rent against distance from campus. At depth ${depth} the tree has ` +
            `${result.leaves} leaves and scores ${formatPercent(result.trainAccuracy)} on the ` +
            `50 flats it learned from and ${formatPercent(result.testAccuracy)} on the 22 held ` +
            `back, a gap of ${formatPercent(gap)}.`
          }
        >
          {result.regions.map((region, i) => (
            <rect
              key={i}
              x={xRent(region.rentLow)}
              y={yDistance(region.distanceLow)}
              width={Math.max(0, xRent(region.rentHigh) - xRent(region.rentLow))}
              height={Math.max(0, yDistance(region.distanceHigh) - yDistance(region.distanceLow))}
              fill={region.prediction ? "var(--learn-chart-highlight)" : "var(--learn-chart-plot)"}
              stroke="var(--learn-chart-axis)"
              strokeWidth={0.7}
            />
          ))}

          {shown.map((flat, i) => (
            <Mark key={i} flat={flat} />
          ))}

          <line
            x1={PAD_LEFT}
            y1={PLOT_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {[300, 600, 900, 1200].map((r) => (
            <text
              key={r}
              x={xRent(r)}
              y={PLOT_BOTTOM + 15}
              textAnchor="middle"
              fontSize={12}
              fill="var(--learn-ink-subtle)"
            >
              £{r}
            </text>
          ))}
          <text x={6} y={PLOT_TOP + 10} fontSize={12} fill="var(--learn-ink-muted)">
            0 km
          </text>
          <text x={6} y={PLOT_BOTTOM - 4} fontSize={12} fill="var(--learn-ink-muted)">
            8 km
          </text>

          <text x={PAD_LEFT} y={STRIP_TOP - 8} fontSize={11} fill="var(--learn-ink-muted)">
            accuracy at every depth — solid is what it learned from, dashed is held back
          </text>
          <path d={TRAIN_PATH} fill="none" stroke="var(--learn-chart-train)" strokeWidth={2} />
          <path
            d={TEST_PATH}
            fill="none"
            stroke="var(--learn-chart-test)"
            strokeWidth={2}
            strokeDasharray="5 4"
          />
          <line
            x1={xDepth(depth)}
            y1={STRIP_TOP}
            x2={xDepth(depth)}
            y2={STRIP_BOTTOM}
            stroke="var(--learn-ink)"
            strokeWidth={1.4}
            strokeDasharray="3 3"
          />
          {BY_DEPTH.map((d) => (
            <text
              key={d.depth}
              x={xDepth(d.depth)}
              y={STRIP_BOTTOM + 14}
              textAnchor="middle"
              fontSize={11}
              fill={d.depth === depth ? "var(--learn-ink)" : "var(--learn-ink-subtle)"}
            >
              {d.depth}
            </text>
          ))}
        </svg>
      </div>

      <label htmlFor={sliderId} className="sr-only">
        How deep the tree may grow
      </label>
      <input
        id={sliderId}
        type="range"
        min={1}
        max={MAX_DEPTH}
        step={1}
        value={depth}
        onChange={(event) => setDepth(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        depth {depth} — {result.leaves} {result.leaves === 1 ? "block" : "blocks"}, so at most{" "}
        {depth} {depth === 1 ? "question" : "questions"} about any flat
      </p>

      <SegmentedControl
        className="mt-4"
        label="Which flats to show"
        value={which}
        onValueChange={setWhich}
        options={[
          { value: "train", label: "The 50 it learned from" },
          { value: "test", label: "The 22 held back" },
        ]}
      />
      <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
        Showing the {shown.length} flats it {which === "train" ? "learned from" : "never saw"}.
        It gets {formatPercent(shownAccuracy)} of them right.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-series-1">Learned from</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(result.trainAccuracy)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Reaches 100% by depth 4. The tree has memorised all fifty.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Held back</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(result.testAccuracy)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Peaks at depth 2 and falls back. This is the only number that means anything.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">The gap</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(gap)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            How much the tree is flattering itself at this depth.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <h3 className="text-[15px] font-semibold text-learn-strong">The flowchart it wrote</h3>
        {depth <= 3 ? (
          <div className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.7] text-learn-muted">
            <Rules node={result.tree} />
          </div>
        ) : (
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
            {result.leaves} blocks and {depth} levels of questions. Printing it would not help
            you — and a rule set you cannot read is not the interpretable model people say a tree
            gives you. That readability has a depth limit, and you have passed it.
          </p>
        )}
      </div>
    </figure>
  );
}
