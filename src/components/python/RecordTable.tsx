"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatCount, formatNumber } from "@/lib/ml/format";
import { cn } from "@/lib/utils";

/**
 * A list of dictionaries, shown as the table it already is.
 *
 * Every view below is derived from the one ROWS literal, so the rendered table
 * and the Python expression above it cannot drift apart. No seeded randomness:
 * the data is written out by hand, which is also what makes each row's numbers
 * arguable in the prose.
 */

interface Row {
  name: string;
  track: string;
  chapters: number;
  minutes: number;
}

const ROWS: readonly Row[] = [
  { name: "Amara", track: "python", chapters: 18, minutes: 164 },
  { name: "Ben", track: "ml", chapters: 6, minutes: 71 },
  { name: "Chidi", track: "python", chapters: 24, minutes: 231 },
  { name: "Dara", track: "vibecoding", chapters: 9, minutes: 88 },
  { name: "Esi", track: "python", chapters: 11, minutes: 102 },
  { name: "Fen", track: "ml", chapters: 21, minutes: 195 },
];

type View = "all" | "filter" | "sort" | "total";

const VIEWS: readonly { value: View; label: string }[] = [
  { value: "all", label: "the whole table" },
  { value: "filter", label: "filter" },
  { value: "sort", label: "sort" },
  { value: "total", label: "summarise" },
];

const CODE: Record<View, string> = {
  all: "students",
  filter: '[s for s in students if s["chapters"] >= 18]',
  sort: 'sorted(students, key=lambda s: s["minutes"], reverse=True)',
  total: 'sum(s["minutes"] for s in students) / len(students)',
};

const NOTE: Record<View, string> = {
  all: "Six dictionaries in a list. Every one carries the same four keys, and that agreement is the only thing making this a table rather than six unrelated objects.",
  filter:
    "The comprehension keeps three of the six rows. Nothing counted, nothing indexed — the condition is asked of each row and the answer decides whether it survives.",
  sort: "The key function receives one whole row and returns the one field to order by. The rows themselves are never taken apart.",
  total:
    "The generator hands sum one number at a time, so the six-row average never builds an intermediate list. The result is one float, not a table at all.",
};

function shown(view: View): readonly Row[] {
  if (view === "filter") return ROWS.filter((r) => r.chapters >= 18);
  if (view === "sort") return [...ROWS].sort((a, b) => b.minutes - a.minutes);
  return ROWS;
}

const AVERAGE = ROWS.reduce((n, r) => n + r.minutes, 0) / ROWS.length;

export function RecordTable() {
  const [view, setView] = useState<View>("all");
  const rows = shown(view);
  const kept = new Set(rows.map((r) => r.name));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        A list of dictionaries, four ways
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="Table operation"
        options={VIEWS}
        value={view}
        onValueChange={setView}
      />

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          <span className="text-learn-code-dim">{">>> "}</span>
          {CODE[view]}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-left">
          <thead>
            <tr className="border-b-[0.5px] border-learn-line">
              {["name", "track", "chapters", "minutes"].map((head) => (
                <th
                  key={head}
                  className="py-2 pr-3 font-[family-name:var(--learn-font-mono)] text-[12px] font-medium tracking-[0.04em] text-learn-subtle"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(view === "sort" ? rows : ROWS).map((row) => {
              const dropped = view === "filter" && !kept.has(row.name);
              return (
                <tr
                  key={row.name}
                  className={cn(
                    "border-b-[0.5px] border-learn-line transition-opacity motion-reduce:transition-none",
                    dropped ? "opacity-35" : "opacity-100",
                    view === "filter" && !dropped ? "bg-learn-quiet-wash" : "",
                  )}
                >
                  <td className="py-2 pr-3 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
                    {row.name}
                  </td>
                  <td className="py-2 pr-3 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted">
                    {row.track}
                  </td>
                  <td className="py-2 pr-3 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted">
                    {formatCount(row.chapters)}
                  </td>
                  <td className="py-2 pr-3 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted">
                    {formatCount(row.minutes)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {view === "total" ? (
        <p className="mt-4 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-accent-text">
          {formatNumber(AVERAGE, 2)}
        </p>
      ) : null}

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">{NOTE[view]}</p>
    </figure>
  );
}
