"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * Pick a selector, watch exactly which elements light up.
 *
 * Match sets are authored per selector rather than computed by a matcher I
 * would have to write and you would have to trust. The document is eight
 * elements; every answer here is checkable by eye against the tree, which is
 * the point — a reader who disagrees with one of these can work out which of us
 * is wrong.
 */

interface El {
  id: string;
  depth: number;
  tag: string;
  className?: string;
  domId?: string;
  text: string;
}

const DOC: readonly El[] = [
  { id: "nav", depth: 0, tag: "nav", domId: "top", text: "" },
  { id: "nav-a1", depth: 1, tag: "a", className: "link", text: "Home" },
  { id: "nav-a2", depth: 1, tag: "a", className: "link current", text: "Blog" },
  { id: "main", depth: 0, tag: "main", text: "" },
  { id: "h1", depth: 1, tag: "h1", text: "Posts" },
  { id: "p1", depth: 1, tag: "p", className: "lead", text: "Things I wrote." },
  { id: "p2", depth: 1, tag: "p", text: "Older things." },
  { id: "main-a", depth: 2, tag: "a", className: "link", text: "Read more" },
];

interface Selector {
  value: string;
  label: string;
  matches: readonly string[];
  note: string;
}

const SELECTORS: readonly Selector[] = [
  {
    value: "a",
    label: "a",
    matches: ["nav-a1", "nav-a2", "main-a"],
    note: "A type selector. Every anchor in the document, wherever it sits. Simple, and the reason a bare type selector is rarely what you want on a real page — it reaches things you have not thought about yet.",
  },
  {
    value: ".link",
    label: ".link",
    matches: ["nav-a1", "nav-a2", "main-a"],
    note: "A class selector. Identical result here, and completely different in intent: it matches whatever you chose to label, not whatever happens to be an anchor. Add a class to a button and it joins the set.",
  },
  {
    value: ".current",
    label: ".current",
    matches: ["nav-a2"],
    note: "An element can carry several classes, separated by spaces in the attribute. This anchor has both `link` and `current`, so it is matched by either selector — and both sets of declarations apply to it.",
  },
  {
    value: "#top",
    label: "#top",
    matches: ["nav"],
    note: "An ID selector. Matches the single element with id=\"top\" — IDs must be unique in a document. Powerful, and a specificity problem later: an ID beats any number of classes, which is how people end up reaching for !important.",
  },
  {
    value: "nav a",
    label: "nav a",
    matches: ["nav-a1", "nav-a2"],
    note: "A descendant combinator — a space. Anchors ANYWHERE inside a nav, at any depth. The anchor inside main is excluded because it has no nav ancestor.",
  },
  {
    value: "main > a",
    label: "main > a",
    matches: [],
    note: "A child combinator. Direct children only — and the anchor inside main is nested inside a paragraph, so it is a grandchild. Nothing matches. This is the single most common cause of \"my selector does nothing\".",
  },
  {
    value: "main a",
    label: "main a",
    matches: ["main-a"],
    note: "The same pair with a space instead of the >. Now the anchor matches, because descendant means any depth. One character is the whole difference.",
  },
  {
    value: "p, h1",
    label: "p, h1",
    matches: ["h1", "p1", "p2"],
    note: "A selector list. The comma means OR — this is two independent selectors sharing one block of declarations, not a relationship between them.",
  },
];

const TAG_COLOUR: Record<string, string> = {
  nav: "var(--learn-series-3)",
  main: "var(--learn-series-5)",
  a: "var(--learn-series-1)",
  h1: "var(--learn-series-4)",
  p: "var(--learn-ink-subtle)",
};

export function SelectorPlayground() {
  const [selected, setSelected] = useState<string>("a");
  const selector = SELECTORS.find((s) => s.value === selected) ?? SELECTORS[0];
  const matched = new Set(selector.matches);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Eight elements, eight selectors — which ones match
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          variant="chips"
          label="Selector"
          options={SELECTORS.map((s) => ({ value: s.value, label: s.label }))}
          value={selected}
          onValueChange={setSelected}
        />
      </div>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-fg">
          <span className="text-learn-code-accent">{selector.value}</span>
          <span className="text-learn-code-dim"> {"{ outline: 2px solid; }"}</span>
        </p>
      </div>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-3">
        {DOC.map((el) => {
          const hit = matched.has(el.id);
          return (
            <div
              key={el.id}
              // Depth is data. One computed value beats three depth classes.
              style={{ marginLeft: `${el.depth * 20}px` }}
              className={`mb-1 flex flex-wrap items-center gap-2 rounded-[4px] border-[1.5px] px-2.5 py-1.5 transition-colors motion-reduce:transition-none ${
                hit
                  ? "border-learn-accent bg-learn-quiet-wash"
                  : "border-transparent bg-learn-sunken"
              }`}
            >
              <span
                className="font-[family-name:var(--learn-font-mono)] text-[12.5px] font-semibold"
                style={{ color: TAG_COLOUR[el.tag] ?? "var(--learn-ink-strong)" }}
              >
                &lt;{el.tag}
                {el.domId ? ` id="${el.domId}"` : ""}
                {el.className ? ` class="${el.className}"` : ""}&gt;
              </span>
              {el.text && (
                <span className="text-[12.5px] text-learn-muted">{el.text}</span>
              )}
              {hit && (
                <span className="ml-auto rounded-full bg-learn-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-white">
                  match
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        <p className="text-[13px] font-semibold text-learn-strong">
          {selector.matches.length === 0
            ? "Matches nothing"
            : `Matches ${selector.matches.length} element${selector.matches.length === 1 ? "" : "s"}`}
        </p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">{selector.note}</p>
      </div>
    </figure>
  );
}
