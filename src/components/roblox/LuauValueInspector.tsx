"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * What Luau calls each value, and which of them are false.
 *
 * The point of the widget is the second column. Almost every language a reader
 * arrives from treats 0 or "" as falsy; Luau treats exactly two values as
 * false, and that difference silently changes what an `if` does.
 */

interface Value {
  literal: string;
  type: string;
  truthy: boolean;
  note: string;
}

const VALUES: readonly Value[] = [
  {
    literal: "true",
    type: "boolean",
    truthy: true,
    note: "The obvious one, and the only value most people picture when they write an if.",
  },
  {
    literal: "false",
    type: "boolean",
    truthy: false,
    note: "One of exactly two false values in the entire language.",
  },
  {
    literal: "nil",
    type: "nil",
    truthy: false,
    note: "The other one. nil means there is nothing here — an object that was never found, a property that does not exist, a variable never assigned.",
  },
  {
    literal: "0",
    type: "number",
    truthy: true,
    note: "True. This is the one that catches people arriving from Python, JavaScript, or C: a health of 0 passes an if check in Luau.",
  },
  {
    literal: '""',
    type: "string",
    truthy: true,
    note: "True. An empty string is still a string, so `if playerName then` succeeds for a player with no name.",
  },
  {
    literal: '"false"',
    type: "string",
    truthy: true,
    note: "True, and worth staring at. It is text that spells a word; the language never reads it.",
  },
  {
    literal: "{}",
    type: "table",
    truthy: true,
    note: "True. An empty table is a real table, so this never tells you whether it has anything in it — use #t == 0 for that.",
  },
  {
    literal: "workspace.Missing",
    type: "nil",
    truthy: false,
    note: "An object that is not there evaluates to nil, which is false. That is what makes `if part then` the standard guard before touching one.",
  },
];

export function LuauValueInspector() {
  const [index, setIndex] = useState(3);
  const value = VALUES[index];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        What Luau calls it, and whether an if accepts it
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-2">
        {VALUES.map((v, i) => (
          <button
            key={v.literal}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "learn-focusable rounded-full border-[0.5px] px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[13px] transition-colors motion-reduce:transition-none",
              i === index
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-white text-learn-muted hover:text-learn-strong",
            )}
          >
            {v.literal}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {`local value = ${value.literal}`}
        </p>
        <p className="mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-dim">
          {`print(typeof(value))  --> ${value.type}`}
        </p>
        <p
          className={`mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre ${value.truthy ? "text-learn-code-ok" : "text-learn-code-err"}`}
        >
          {`if value then ... end  --> ${value.truthy ? "the block runs" : "the block is skipped"}`}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-white px-4 py-3">
          <p className="text-[12px] uppercase tracking-[0.06em] text-learn-subtle">typeof</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[16px] text-learn-strong">
            {value.type}
          </p>
        </div>
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-white px-4 py-3">
          <p className="text-[12px] uppercase tracking-[0.06em] text-learn-subtle">an if sees it as</p>
          <p
            className={`mt-1 font-[family-name:var(--learn-font-mono)] text-[16px] ${value.truthy ? "text-learn-accent-text" : "text-learn-outcome-fn"}`}
          >
            {value.truthy ? "true" : "false"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">{value.note}</p>
    </figure>
  );
}
