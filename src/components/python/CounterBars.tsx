"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatCount } from "@/lib/ml/format";

/**
 * What Counter does, drawn as the tally it is.
 *
 * The counts are computed from the sample strings at module scope — pure string
 * work, no randomness and no clock — so the bars are identical on the server and
 * in the browser. The bar chart is hand-written SVG with a fluid viewBox, per
 * the track's charting rule.
 */

type Sample = "colours" | "votes" | "dna";

const SAMPLES: readonly { value: Sample; label: string }[] = [
  { value: "colours", label: "colours" },
  { value: "votes", label: "votes" },
  { value: "dna", label: "bases" },
];

const TEXTS: Record<Sample, string[]> = {
  colours: ["red", "blue", "red", "green", "blue", "red", "amber", "blue", "red"],
  votes: ["ada", "grace", "ada", "linus", "ada", "grace", "ada", "ken", "grace"],
  dna: ["A", "C", "G", "T", "A", "A", "C", "T", "A", "G", "A", "C"],
};

/** Insertion-ordered tally — exactly what collections.Counter builds. */
function tally(items: string[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

const TALLIES: Record<Sample, { label: string; count: number }[]> = {
  colours: tally(TEXTS.colours),
  votes: tally(TEXTS.votes),
  dna: tally(TEXTS.dna),
};

const W = 520;
const ROW_H = 34;
const LABEL_W = 92;
const BAR_MAX = W - LABEL_W - 56;

export function CounterBars() {
  const [sample, setSample] = useState<Sample>("colours");
  const rows = TALLIES[sample];
  const items = TEXTS[sample];
  const top = rows[0].count;
  const height = rows.length * ROW_H + 12;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Counter, on three different lists
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="Sample list"
        options={SAMPLES}
        value={sample}
        onValueChange={setSample}
      />

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-dim">
          {`items = [${items.map((i) => `"${i}"`).join(", ")}]`}
        </p>
        <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-fg">
          <span className="text-learn-code-dim">{">>> "}</span>
          {"Counter(items).most_common()"}
        </p>
        <p className="mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-ok">
          {`[${rows.map((r) => `('${r.label}', ${r.count})`).join(", ")}]`}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="mt-4 w-full"
        role="img"
        aria-label={rows.map((r) => `${r.label}: ${r.count}`).join(", ")}
      >
        {rows.map((row, i) => {
          const y = i * ROW_H + 6;
          const width = (row.count / top) * BAR_MAX;
          return (
            <g key={row.label}>
              <text
                x={LABEL_W - 10}
                y={y + 18}
                textAnchor="end"
                fontSize={13}
                fontFamily="var(--learn-font-mono)"
                fill="var(--learn-ink-strong)"
              >
                {row.label}
              </text>
              <rect
                x={LABEL_W}
                y={y + 4}
                width={BAR_MAX}
                height={20}
                rx={3}
                fill="var(--learn-chart-plot)"
              />
              <rect
                x={LABEL_W}
                y={y + 4}
                width={width}
                height={20}
                rx={3}
                fill={i === 0 ? "var(--learn-series-1)" : "var(--learn-outcome-tn)"}
              />
              <text
                x={LABEL_W + width + 10}
                y={y + 18}
                fontSize={13}
                fontFamily="var(--learn-font-mono)"
                fill="var(--learn-ink-subtle)"
              >
                {formatCount(row.count)}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-3 text-[13px] leading-[1.6] text-learn-muted">
        {`most_common() hands back the pairs already ordered, so the winner is rows[0] rather than something you have to search for. Every count here came from one call — no loop, no conditional, and no key that had to exist first.`}
      </p>
    </figure>
  );
}
