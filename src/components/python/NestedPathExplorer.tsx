"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Click down through a nested structure and watch the access path assemble.
 *
 * The row list is flattened once at module scope from a literal, so the order
 * is Python's own insertion order and the server and browser walk it
 * identically. Nothing here is generated or timed.
 */

type Json = string | number | Json[] | { [key: string]: Json };

const CLUB: Json = {
  name: "Robotics",
  room: { building: "C", number: 214 },
  members: [
    { name: "Amara", badges: ["solder", "cad"] },
    { name: "Ben", badges: ["python"] },
  ],
};

interface Node {
  path: string;
  depth: number;
  label: string;
  preview: string;
  branch: boolean;
}

function isBranch(value: Json): boolean {
  return typeof value === "object";
}

function preview(value: Json): string {
  if (Array.isArray(value)) return `list · ${value.length} items`;
  if (typeof value === "object") return `dict · ${Object.keys(value).length} keys`;
  if (typeof value === "string") return `"${value}"`;
  return String(value);
}

function walk(value: Json, path: string, depth: number, out: Node[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const next = `${path}[${i}]`;
      out.push({ path: next, depth, label: `[${i}]`, preview: preview(item), branch: isBranch(item) });
      if (isBranch(item)) walk(item, next, depth + 1, out);
    });
    return;
  }
  if (typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const next = `${path}["${key}"]`;
      out.push({ path: next, depth, label: `"${key}"`, preview: preview(item), branch: isBranch(item) });
      if (isBranch(item)) walk(item, next, depth + 1, out);
    }
  }
}

const NODES: Node[] = [];
walk(CLUB, "club", 0, NODES);

export function NestedPathExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = NODES.find((node) => node.path === selected) ?? null;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Click any level to build the path to it
      </figcaption>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          <span className="text-learn-code-dim">{">>> "}</span>
          {active ? active.path : "club"}
        </p>
        <p className="mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-ok">
          {active ? active.preview : preview(CLUB)}
        </p>
      </div>

      <ul className="mt-4 space-y-1">
        {NODES.map((node) => {
          const onPath = selected !== null && selected.startsWith(node.path);
          return (
            <li key={node.path}>
              <button
                type="button"
                onClick={() => setSelected(node.path === selected ? null : node.path)}
                style={{ marginInlineStart: `${node.depth * 1.25}rem` }}
                className={cn(
                  "learn-focusable flex w-full items-baseline gap-3 rounded-[4px] border-[0.5px] px-3 py-1.5 text-left transition-colors motion-reduce:transition-none",
                  node.path === selected
                    ? "border-learn-accent bg-learn-quiet"
                    : onPath
                      ? "border-learn-accent bg-learn-quiet-wash"
                      : "border-learn-line bg-white hover:border-learn-line-strong",
                )}
              >
                <span className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
                  {node.label}
                </span>
                <span className="text-[12px] text-learn-subtle">{node.preview}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {active
          ? `That is ${active.depth + 1} ${active.depth === 0 ? "bracket" : "brackets"} deep. Every highlighted row above it is a level the interpreter walked through to get there — and every one of them is a level that can be missing.`
          : "Nothing selected. The whole structure is one dictionary of three keys, and only one of those three keys holds something flat."}
      </p>
    </figure>
  );
}
