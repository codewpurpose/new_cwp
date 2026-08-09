"use client";

import { useState } from "react";

/**
 * Two selectors enter, one wins, and the arithmetic is shown.
 *
 * The counts are authored per selector rather than parsed, for the same reason
 * as SelectorPlayground: a hand-rolled parser here would be a second thing to
 * be wrong about. Every pair below is checkable by counting the symbols.
 *
 * The comparison is column-by-column and stops at the first difference — which
 * is the part people get wrong. Specificity is not a three-digit number and 0-1-11
 * does not beat 0-2-0; eleven classes lose to two classes plus nothing.
 */

interface Candidate {
  selector: string;
  ids: number;
  classes: number;
  types: number;
  label: string;
}

const CANDIDATES: readonly Candidate[] = [
  { selector: "p", ids: 0, classes: 0, types: 1, label: "one type" },
  { selector: ".note", ids: 0, classes: 1, types: 0, label: "one class" },
  { selector: "p.note", ids: 0, classes: 1, types: 1, label: "type + class" },
  { selector: "#intro", ids: 1, classes: 0, types: 0, label: "one ID" },
  { selector: "main p a", ids: 0, classes: 0, types: 3, label: "three types" },
  { selector: ".card .title .text", ids: 0, classes: 3, types: 0, label: "three classes" },
  { selector: "a:hover", ids: 0, classes: 1, types: 1, label: "type + pseudo-class" },
  { selector: "#intro p", ids: 1, classes: 0, types: 1, label: "ID + type" },
];

type Winner = "a" | "b" | "tie";

function compare(a: Candidate, b: Candidate): { winner: Winner; column: string } {
  if (a.ids !== b.ids) return { winner: a.ids > b.ids ? "a" : "b", column: "IDs" };
  if (a.classes !== b.classes) {
    return { winner: a.classes > b.classes ? "a" : "b", column: "classes" };
  }
  if (a.types !== b.types) {
    return { winner: a.types > b.types ? "a" : "b", column: "types" };
  }
  return { winner: "tie", column: "" };
}

function Picker({
  value, onChange, label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="learn-focusable mt-1.5 w-full rounded-[6px] border-[0.5px] border-learn-line bg-white px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong"
      >
        {CANDIDATES.map((c) => (
          <option key={c.selector} value={c.selector}>
            {c.selector}
          </option>
        ))}
      </select>
    </label>
  );
}

function Score({ c, won }: { c: Candidate; won: boolean }) {
  return (
    <div
      className={`rounded-learn-md border-[0.5px] p-4 ${
        won ? "border-learn-accent bg-learn-quiet-wash" : "border-learn-line bg-learn-surface"
      }`}
    >
      <p className="font-[family-name:var(--learn-font-mono)] text-[14px] font-semibold text-learn-strong">
        {c.selector}
      </p>
      <p className="mt-0.5 text-[12px] text-learn-muted">{c.label}</p>
      <div className="mt-3 flex gap-1.5">
        {([
          ["IDs", c.ids],
          ["classes", c.classes],
          ["types", c.types],
        ] as const).map(([name, n]) => (
          <div key={name} className="flex-1 rounded-[5px] bg-learn-sunken px-2 py-2 text-center">
            <p className="font-[family-name:var(--learn-font-mono)] text-[18px] text-learn-strong">
              {n}
            </p>
            <p className="text-[10px] uppercase tracking-[0.06em] text-learn-subtle">{name}</p>
          </div>
        ))}
      </div>
      {won && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-learn-accent px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-white">
          Wins
        </p>
      )}
    </div>
  );
}

export function SpecificityScorer() {
  const [left, setLeft] = useState("p.note");
  const [right, setRight] = useState(".card .title .text");

  const a = CANDIDATES.find((c) => c.selector === left) ?? CANDIDATES[0];
  const b = CANDIDATES.find((c) => c.selector === right) ?? CANDIDATES[1];
  const result = compare(a, b);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Both target the same element — which declaration applies
      </figcaption>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Picker label="Rule written first" value={left} onChange={setLeft} />
        <Picker label="Rule written second" value={right} onChange={setRight} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* On an exact tie the LATER rule wins, so b takes it. */}
        <Score c={a} won={result.winner === "a"} />
        <Score c={b} won={result.winner === "b" || result.winner === "tie"} />
      </div>

      <div aria-live="polite" className="mt-4 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-4 py-3">
        {result.winner === "tie" ? (
          <>
            <p className="text-[13.5px] font-semibold text-learn-strong">
              Exactly equal — so the later rule wins
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">
              Identical in all three columns. Only now does source order matter, and it is the last
              tie-breaker rather than the first rule. Move one of them and the outcome flips.
            </p>
          </>
        ) : (
          <>
            <p className="text-[13.5px] font-semibold text-learn-strong">
              <span className="font-[family-name:var(--learn-font-mono)]">
                {result.winner === "a" ? a.selector : b.selector}
              </span>{" "}
              wins on {result.column}
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">
              The columns are compared left to right and the comparison{" "}
              <em>stops at the first difference</em>. Everything to the right of that column is
              never looked at — which is why one ID beats any number of classes, and why{" "}
              <span className="font-[family-name:var(--learn-font-mono)]">
                .card .title .text
              </span>{" "}
              (0-3-0) loses to{" "}
              <span className="font-[family-name:var(--learn-font-mono)]">#intro</span> (1-0-0).
            </p>
          </>
        )}
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        This is not base-10 arithmetic. 0-1-11 does not beat 0-2-0 — the classes column is compared
        first, 1 is less than 2, and the eleven types are irrelevant. Thinking of it as a number is
        how people conclude specificity is unpredictable.
      </p>
    </figure>
  );
}
