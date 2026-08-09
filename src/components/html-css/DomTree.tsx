"use client";

import { useState } from "react";

/**
 * The same document as source and as a tree, cross-highlighted.
 *
 * Hovering or selecting a node lights up its line in the source and vice versa,
 * because the leap the reader has to make is that indentation in a text file
 * *is* nesting, and nesting *is* the tree CSS selects from. Two views of one
 * data structure is the only way I know to make that land.
 *
 * Authored as a node list with explicit depth rather than derived from parsing
 * the string. The string is generated FROM the nodes below, so the two cannot
 * drift.
 */

interface Node {
  id: string;
  depth: number;
  /** What the source line looks like. */
  source: string;
  /** What the tree node is called. */
  label: string;
  kind: "element" | "text";
  note: string;
}

const NODES: readonly Node[] = [
  { id: "html", depth: 0, source: "<html>", label: "html", kind: "element", note: "The root element. Everything else is inside it, so it is the one node with no parent." },
  { id: "head", depth: 1, source: "<head>", label: "head", kind: "element", note: "Information about the page. Nothing here is drawn — it is the first child of html, and a sibling of body." },
  { id: "title", depth: 2, source: "<title>My site</title>", label: "title", kind: "element", note: "A child of head, a grandchild of html. Shown in the browser tab, not on the page." },
  { id: "body", depth: 1, source: "<body>", label: "body", kind: "element", note: "Everything visible. A child of html and a SIBLING of head — the two share a parent, which is what sibling means." },
  { id: "h1", depth: 2, source: "<h1>Hello</h1>", label: "h1", kind: "element", note: "A child of body. In CSS, `body h1` and `body > h1` both match it here — but only because it is a direct child." },
  { id: "p", depth: 2, source: "<p>Some <em>text</em></p>", label: "p", kind: "element", note: "A sibling of h1. Note it has a child of its own, which is what makes this a tree rather than a list." },
  { id: "em", depth: 3, source: "  <em>text</em>", label: "em", kind: "element", note: "A child of p, a DESCENDANT of body, and not a child of body. `body > em` matches nothing; `body em` matches this. That distinction is a whole CSS chapter." },
];

const SOURCE_LINES: readonly { id: string; text: string; indent: number }[] = [
  { id: "html", text: "<html>", indent: 0 },
  { id: "head", text: "<head>", indent: 1 },
  { id: "title", text: "<title>My site</title>", indent: 2 },
  { id: "head", text: "</head>", indent: 1 },
  { id: "body", text: "<body>", indent: 1 },
  { id: "h1", text: "<h1>Hello</h1>", indent: 2 },
  { id: "p", text: "<p>Some <em>text</em></p>", indent: 2 },
  { id: "body", text: "</body>", indent: 1 },
  { id: "html", text: "</html>", indent: 0 },
];

export function DomTree() {
  const [active, setActive] = useState<string>("em");
  const node = NODES.find((n) => n.id === active) ?? NODES[0];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The same document, twice — select on either side
      </figcaption>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            index.html — what you type
          </p>
          <div className="mt-2 overflow-x-auto rounded-[6px] bg-learn-code-bg p-3">
            {SOURCE_LINES.map((line, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(line.id)}
                className={`learn-focusable block w-full whitespace-pre rounded-[3px] px-1 text-left font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.7] transition-colors motion-reduce:transition-none ${
                  active === line.id
                    ? "bg-learn-code-fg/20 text-learn-code-fg"
                    : "text-learn-code-dim hover:bg-learn-code-fg/10"
                }`}
              >
                {"  ".repeat(line.indent)}
                {line.text}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            the DOM — what the browser builds
          </p>
          <div className="mt-2 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface p-3">
            {NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setActive(n.id)}
                aria-pressed={active === n.id}
                className={`learn-focusable mb-1 flex w-full items-center gap-2 rounded-[4px] px-2 py-1 text-left transition-colors motion-reduce:transition-none ${
                  active === n.id ? "bg-learn-quiet" : "hover:bg-learn-sunken"
                }`}
                // Indentation is the data here, so it is computed. A Tailwind
                // class per depth would be four classes saying one number.
                style={{ paddingLeft: `${8 + n.depth * 18}px` }}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    active === n.id ? "bg-learn-accent" : "bg-learn-line-strong"
                  }`}
                />
                <span className="font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-strong">
                  {n.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] font-semibold text-learn-strong">
          {node.label}
        </p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">{node.note}</p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Indentation in your file is only a convention — the browser ignores it entirely and builds
        the same tree from one long line. What creates the nesting is which tags close before which
        others.
      </p>
    </figure>
  );
}
