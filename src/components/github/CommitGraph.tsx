"use client";

import { useState } from "react";

/**
 * A commit history, built one command at a time.
 *
 * Every step is a hand-authored frame rather than a simulated Git — the point
 * is the *shape*, and specifically the moment a branch label moves while the
 * commits under it do not. Simulating it would produce the same pictures with
 * more ways to be subtly wrong.
 *
 * Coordinates are in a fixed 480×170 viewBox with a fluid width, per the
 * hand-written-SVG rule. No layout measurement, no ResizeObserver.
 */

interface Node {
  id: string;
  x: number;
  y: number;
  parent?: string;
  /** A merge commit's second parent. */
  parentTwo?: string;
  tone: "main" | "feature" | "merge";
}

interface Label {
  text: string;
  at: string;
  /** Where the flag sits relative to its commit. */
  side: "above" | "below";
  head?: boolean;
}

interface Frame {
  command: string;
  caption: string;
  nodes: Node[];
  labels: Label[];
}

const ROW_MAIN = 108;
const ROW_FEATURE = 52;

const C = (id: string, x: number, y: number, parent: string | undefined, tone: Node["tone"]): Node => ({
  id,
  x,
  y,
  parent,
  tone,
});

const A = C("a", 60, ROW_MAIN, undefined, "main");
const B = C("b", 140, ROW_MAIN, "a", "main");

const FRAMES: readonly Frame[] = [
  {
    command: "git commit  (twice)",
    caption:
      "Two commits on main. Each one points at the one before it — that backwards arrow is the entire structure of a Git history.",
    nodes: [A, B],
    labels: [{ text: "main", at: "b", side: "below", head: true }],
  },
  {
    command: "git switch -c feature",
    caption:
      "A second label on the same commit. Nothing was copied and nothing moved; creating a branch wrote forty-one bytes to a file. HEAD now points at feature instead of main.",
    nodes: [A, B],
    labels: [
      { text: "main", at: "b", side: "below" },
      { text: "feature", at: "b", side: "above", head: true },
    ],
  },
  {
    command: "git commit  (twice, on feature)",
    caption:
      "Two commits later, feature has moved forward and main has not. The commits are drawn on their own row, but there is no row in Git — they are just commits whose parent chain leads back to B.",
    nodes: [A, B, C("c", 220, ROW_FEATURE, "b", "feature"), C("d", 300, ROW_FEATURE, "c", "feature")],
    labels: [
      { text: "main", at: "b", side: "below" },
      { text: "feature", at: "d", side: "above", head: true },
    ],
  },
  {
    command: "git switch main && git commit",
    caption:
      "Somebody else moved main too. Now the two branches genuinely diverge: there is a commit on each side that the other does not have. This is the situation a merge exists for.",
    nodes: [
      A,
      B,
      C("c", 220, ROW_FEATURE, "b", "feature"),
      C("d", 300, ROW_FEATURE, "c", "feature"),
      C("e", 220, ROW_MAIN, "b", "main"),
    ],
    labels: [
      { text: "main", at: "e", side: "below", head: true },
      { text: "feature", at: "d", side: "above" },
    ],
  },
  {
    command: "git merge feature",
    caption:
      "A merge commit is the only commit with two parents. It joins both histories, keeps every original commit exactly as it was, and main moves onto it. feature has not moved — it never does during a merge.",
    nodes: [
      A,
      B,
      C("c", 220, ROW_FEATURE, "b", "feature"),
      C("d", 300, ROW_FEATURE, "c", "feature"),
      C("e", 220, ROW_MAIN, "b", "main"),
      { id: "m", x: 380, y: ROW_MAIN, parent: "e", parentTwo: "d", tone: "merge" },
    ],
    labels: [
      { text: "main", at: "m", side: "below", head: true },
      { text: "feature", at: "d", side: "above" },
    ],
  },
];

const TONE_FILL: Record<Node["tone"], string> = {
  main: "var(--learn-series-1)",
  feature: "var(--learn-series-3)",
  merge: "var(--learn-ink-strong)",
};

export function CommitGraph() {
  const [step, setStep] = useState(0);
  const frame = FRAMES[step];
  const byId = new Map(frame.nodes.map((n) => [n.id, n]));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Five commands, and what each one moves
      </figcaption>

      <div className="mt-4 overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot">
        <svg viewBox="0 0 480 170" className="w-full" role="img" aria-label={frame.caption}>
          {frame.nodes.map((node) => {
            const parents = [node.parent, node.parentTwo].filter(Boolean) as string[];
            return parents.map((pid) => {
              const parent = byId.get(pid);
              if (!parent) return null;
              const straight = parent.y === node.y;
              const d = straight
                ? `M ${parent.x + 13} ${parent.y} H ${node.x - 13}`
                : `M ${parent.x + 9} ${parent.y - (parent.y > node.y ? 9 : -9)} ` +
                  `C ${parent.x + 40} ${parent.y - (parent.y > node.y ? 30 : -30)}, ` +
                  `${node.x - 40} ${node.y + (parent.y > node.y ? 30 : -30)}, ` +
                  `${node.x - 9} ${node.y + (parent.y > node.y ? 9 : -9)}`;
              return (
                <path
                  key={`${pid}-${node.id}`}
                  d={d}
                  fill="none"
                  stroke="var(--learn-chart-axis)"
                  strokeWidth={1.6}
                />
              );
            });
          })}

          {frame.nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={13}
                fill={TONE_FILL[node.tone]}
                stroke="var(--learn-ink-strong)"
                strokeWidth={node.tone === "merge" ? 2.4 : 1.2}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontSize={11}
                fontFamily="var(--learn-font-mono)"
                fill="#ffffff"
              >
                {node.id.toUpperCase()}
              </text>
            </g>
          ))}

          {frame.labels.map((label) => {
            const node = byId.get(label.at);
            if (!node) return null;
            const y = label.side === "above" ? node.y - 40 : node.y + 26;
            // Size the pill from the string that is actually drawn. Measuring
            // `label.text` and adding a guess for the "HEAD → " prefix is how
            // the arrow ended up hanging out of both ends of the capsule.
            const caption = label.head ? `HEAD → ${label.text}` : label.text;
            const width = caption.length * 7 + 20;
            return (
              <g key={label.text}>
                <path
                  d={`M ${node.x} ${label.side === "above" ? node.y - 15 : node.y + 15} V ${
                    label.side === "above" ? y + 16 : y
                  }`}
                  stroke="var(--learn-chart-axis)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
                <rect
                  x={node.x - width / 2}
                  y={y}
                  width={width}
                  height={19}
                  rx={9.5}
                  fill={label.head ? "var(--learn-surface-inverse)" : "var(--learn-surface-quiet)"}
                  stroke="var(--learn-ink-strong)"
                  strokeWidth={1}
                />
                <text
                  x={node.x}
                  y={y + 13.5}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--learn-font-mono)"
                  fill={label.head ? "var(--learn-heading-on-inverse)" : "var(--learn-ink-strong)"}
                >
                  {caption}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(FRAMES.length - 1, s + 1))}
          disabled={step === FRAMES.length - 1}
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next &rarr;
        </button>
        <span className="text-[12px] text-learn-subtle">
          Step {step + 1} of {FRAMES.length}
        </span>
      </div>

      <div aria-live="polite" className="mt-4">
        <p className="rounded-[6px] bg-learn-code-bg px-4 py-2.5 font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-code-fg">
          <span className="select-none text-learn-code-dim">$ </span>
          {frame.command}
        </p>
        <p className="mt-3 text-[13px] leading-[1.6] text-learn-muted">{frame.caption}</p>
      </div>
    </figure>
  );
}
