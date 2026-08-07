"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { cn } from "@/lib/utils";

/**
 * Four sort rules applied to one fixed list of names.
 *
 * The list is a literal and every ordering is derived from it by a pure
 * comparator during render, so there is no seeded data to keep in step — the
 * server and the browser reach the same order by construction.
 *
 * JavaScript compares strings by UTF-16 code unit and Python by code point,
 * which agree exactly across this ASCII list. That is what lets the rendered
 * order double as an honest preview of what Python would print.
 */

const NAMES = ["ada", "Grace", "linus", "Barbara", "Ken", "margaret"];

type Rule = "plain" | "lower" | "length" | "reverse";

const RULES: readonly { value: Rule; label: string }[] = [
  { value: "plain", label: "no key" },
  { value: "lower", label: "key=str.lower" },
  { value: "length", label: "key=len" },
  { value: "reverse", label: "reverse=True" },
];

const CODE: Record<Rule, string> = {
  plain: "sorted(names)",
  lower: "sorted(names, key=str.lower)",
  length: "sorted(names, key=len)",
  reverse: "sorted(names, reverse=True)",
};

const NOTE: Record<Rule, string> = {
  plain:
    "Every capital sorts before every lowercase letter, because 'B' is code point 66 and 'a' is 97. This is not the alphabetical you meant.",
  lower:
    "The key is computed for each item purely to decide the order. What comes back is the original names, capitals intact — the key is never what you get.",
  length:
    "Ties keep the order they already had. Python's sort is stable, so among the three-letter names 'ada' still precedes 'Ken'.",
  reverse:
    "The same comparison as the first, walked backwards. Note what it is not: reverse=True does not sort case-insensitively, it just flips the wrong answer over.",
};

function ordered(rule: Rule): string[] {
  const copy = [...NAMES];
  switch (rule) {
    case "lower":
      return copy.sort((a, b) => {
        const x = a.toLowerCase();
        const y = b.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    case "length":
      return copy.sort((a, b) => a.length - b.length);
    case "reverse":
      return copy.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    default:
      return copy.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }
}

export function SortKeyPlayground() {
  const [rule, setRule] = useState<Rule>("plain");
  const result = ordered(rule);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One list, four sort rules
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="Sort rule"
        options={RULES}
        value={rule}
        onValueChange={setRule}
      />

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-fg">
          <span className="text-learn-code-dim">{">>> "}</span>
          {CODE[rule]}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-stretch gap-2">
        {result.map((name, i) => (
          <div
            key={name}
            className={cn(
              "flex flex-col items-center gap-1 rounded-[6px] border-[0.5px] px-3 py-2 transition-colors motion-reduce:transition-none",
              rule === "length"
                ? "border-learn-accent bg-learn-quiet"
                : "border-learn-line bg-white",
            )}
          >
            <span className="font-[family-name:var(--learn-font-mono)] text-[14px] text-learn-strong">
              {name}
            </span>
            <span className="text-[11px] tracking-[0.06em] text-learn-subtle">
              {rule === "length" ? `len ${name.length}` : `#${i}`}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">{NOTE[rule]}</p>
    </figure>
  );
}
