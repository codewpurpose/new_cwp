"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The same two branches, resolved two ways.
 *
 * Both panels start from an identical "before" so the comparison is honest.
 * The detail worth drawing and almost never drawn is that rebase produces C'
 * and D' — new commits with new hashes — while the originals are abandoned
 * rather than moved. That is the entire reason for the rule about rebasing
 * shared work, and it is invisible in a diagram that just slides the boxes
 * along.
 */

type Mode = "before" | "merge" | "rebase";

const MODES: readonly { value: Mode; label: string }[] = [
  { value: "before", label: "Before" },
  { value: "merge", label: "git merge main" },
  { value: "rebase", label: "git rebase main" },
];

interface Dot {
  id: string;
  x: number;
  y: number;
  tone: "main" | "feature" | "merge" | "ghost";
  parent?: string;
  parentTwo?: string;
}

const ROW_TOP = 46;
const ROW_BOTTOM = 106;

const SCENES: Record<Mode, { dots: Dot[]; head: { at: string; text: string }[]; caption: string }> = {
  before: {
    dots: [
      { id: "A", x: 56, y: ROW_BOTTOM, tone: "main" },
      { id: "B", x: 132, y: ROW_BOTTOM, tone: "main", parent: "A" },
      { id: "E", x: 208, y: ROW_BOTTOM, tone: "main", parent: "B" },
      { id: "C", x: 208, y: ROW_TOP, tone: "feature", parent: "B" },
      { id: "D", x: 284, y: ROW_TOP, tone: "feature", parent: "C" },
    ],
    head: [
      { at: "E", text: "main" },
      { at: "D", text: "feature" },
    ],
    caption:
      "Two branches that diverged at B. Your work is C and D; main has moved on to E. Nothing is wrong here — this is what every branch that took more than an afternoon looks like.",
  },
  merge: {
    dots: [
      { id: "A", x: 56, y: ROW_BOTTOM, tone: "main" },
      { id: "B", x: 132, y: ROW_BOTTOM, tone: "main", parent: "A" },
      { id: "E", x: 208, y: ROW_BOTTOM, tone: "main", parent: "B" },
      { id: "C", x: 208, y: ROW_TOP, tone: "feature", parent: "B" },
      { id: "D", x: 284, y: ROW_TOP, tone: "feature", parent: "C" },
      { id: "M", x: 372, y: ROW_BOTTOM, tone: "merge", parent: "E", parentTwo: "D" },
    ],
    head: [
      { at: "E", text: "main" },
      { at: "M", text: "feature" },
    ],
    caption:
      "A merge commit joins both lines. C and D keep their original hashes, so anybody who already fetched them still has exactly the same commits. The history records that a branch existed — which is either useful context or noise, depending on your team.",
  },
  rebase: {
    dots: [
      { id: "A", x: 56, y: ROW_BOTTOM, tone: "main" },
      { id: "B", x: 132, y: ROW_BOTTOM, tone: "main", parent: "A" },
      { id: "E", x: 208, y: ROW_BOTTOM, tone: "main", parent: "B" },
      { id: "C", x: 208, y: ROW_TOP, tone: "ghost", parent: "B" },
      { id: "D", x: 284, y: ROW_TOP, tone: "ghost", parent: "C" },
      { id: "C'", x: 284, y: ROW_BOTTOM, tone: "feature", parent: "E" },
      { id: "D'", x: 360, y: ROW_BOTTOM, tone: "feature", parent: "C'" },
    ],
    head: [
      { at: "E", text: "main" },
      { at: "D'", text: "feature" },
    ],
    caption:
      "Rebase replayed your changes on top of E as two brand-new commits. C and D still exist — greyed out here — but nothing points at them any more, so they will be garbage-collected. Same code, different hashes, and that is precisely what breaks for anyone who already had C and D.",
  },
};

const DOT_FILL: Record<Dot["tone"], string> = {
  main: "var(--learn-series-1)",
  feature: "var(--learn-series-3)",
  merge: "var(--learn-ink-strong)",
  ghost: "var(--learn-chart-plot)",
};

const DOT_TEXT: Record<Dot["tone"], string> = {
  main: "#ffffff",
  feature: "#ffffff",
  merge: "#ffffff",
  ghost: "var(--learn-chart-muted-mark)",
};

export function MergeVsRebase() {
  const [mode, setMode] = useState<Mode>("before");
  const scene = SCENES[mode];
  const byId = new Map(scene.dots.map((d) => [d.id, d]));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Same two branches, two ways to catch up
      </figcaption>

      <div className="mt-4">
        <SegmentedControl label="Which command" options={MODES} value={mode} onValueChange={setMode} />
      </div>

      <div className="mt-4 overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot">
        <svg viewBox="0 0 440 150" className="w-full" role="img" aria-label={scene.caption}>
          {scene.dots.map((dot) => {
            const parents = [dot.parent, dot.parentTwo].filter(Boolean) as string[];
            return parents.map((pid) => {
              const parent = byId.get(pid);
              if (!parent) return null;
              const ghost = dot.tone === "ghost" || parent.tone === "ghost";
              const straight = parent.y === dot.y;
              const up = parent.y > dot.y;
              const d = straight
                ? `M ${parent.x + 12} ${parent.y} H ${dot.x - 12}`
                : `M ${parent.x + 8} ${parent.y + (up ? -8 : 8)} ` +
                  `C ${parent.x + 36} ${parent.y + (up ? -28 : 28)}, ` +
                  `${dot.x - 36} ${dot.y + (up ? 28 : -28)}, ` +
                  `${dot.x - 8} ${dot.y + (up ? 8 : -8)}`;
              return (
                <path
                  key={`${pid}-${dot.id}`}
                  d={d}
                  fill="none"
                  stroke={ghost ? "var(--learn-chart-muted-mark)" : "var(--learn-chart-axis)"}
                  strokeWidth={1.5}
                  strokeDasharray={ghost ? "4 4" : undefined}
                />
              );
            });
          })}

          {scene.dots.map((dot) => (
            <g key={dot.id}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={12}
                fill={DOT_FILL[dot.tone]}
                stroke={
                  dot.tone === "ghost" ? "var(--learn-chart-muted-mark)" : "var(--learn-ink-strong)"
                }
                strokeWidth={dot.tone === "merge" ? 2.4 : 1.2}
                strokeDasharray={dot.tone === "ghost" ? "3 3" : undefined}
              />
              <text
                x={dot.x}
                y={dot.y + 4}
                textAnchor="middle"
                fontSize={10.5}
                fontFamily="var(--learn-font-mono)"
                fill={DOT_TEXT[dot.tone]}
              >
                {dot.id}
              </text>
            </g>
          ))}

          {scene.head
            .filter((h) => h.text)
            .map((h) => {
              const dot = byId.get(h.at);
              if (!dot) return null;
              const y = dot.y === ROW_TOP ? dot.y - 34 : dot.y + 22;
              const width = h.text.length * 7 + 16;
              return (
                <g key={h.text + h.at}>
                  <rect
                    x={dot.x - width / 2}
                    y={y}
                    width={width}
                    height={18}
                    rx={9}
                    fill="var(--learn-surface-quiet)"
                    stroke="var(--learn-ink-strong)"
                    strokeWidth={1}
                  />
                  <text
                    x={dot.x}
                    y={y + 12.5}
                    textAnchor="middle"
                    fontSize={10.5}
                    fontFamily="var(--learn-font-mono)"
                    fill="var(--learn-ink-strong)"
                  >
                    {h.text}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {scene.caption}
      </p>
    </figure>
  );
}
