"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The Explorer, clickable, building the Luau path as you descend.
 *
 * The tree is a literal flattened once at module scope, so the row order is
 * fixed and the server and browser render the same list. Nothing here is
 * generated, timed, or random.
 */

interface Node {
  name: string;
  className: string;
  children?: Node[];
}

const GAME: Node = {
  name: "game",
  className: "DataModel",
  children: [
    {
      name: "Workspace",
      className: "Workspace",
      children: [
        {
          name: "Obby",
          className: "Model",
          children: [
            {
              name: "Laser",
              className: "Part",
              children: [{ name: "KillScript", className: "Script" }],
            },
            { name: "Platform", className: "Part" },
          ],
        },
        { name: "Baseplate", className: "Part" },
      ],
    },
    { name: "Players", className: "Players" },
    { name: "ReplicatedStorage", className: "ReplicatedStorage" },
    { name: "ServerScriptService", className: "ServerScriptService" },
  ],
};

interface Row {
  path: string;
  depth: number;
  name: string;
  className: string;
}

const ROWS: Row[] = [];

function walk(node: Node, path: string, depth: number): void {
  ROWS.push({ path, depth, name: node.name, className: node.className });
  for (const child of node.children ?? []) {
    walk(child, `${path}.${child.name}`, depth + 1);
  }
}

walk(GAME, "game", 0);

/** The one path Roblox lets you shorten. Worth showing rather than hiding. */
function shortcut(path: string): string | null {
  if (path === "game.Workspace") return "workspace";
  if (path.startsWith("game.Workspace.")) return path.replace("game.Workspace", "workspace");
  return null;
}

export function ExplorerTree() {
  const [selected, setSelected] = useState<string>("game.Workspace.Obby.Laser");
  const row = ROWS.find((r) => r.path === selected) ?? ROWS[0];
  const short = shortcut(row.path);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Click an object to see the path a script would need
      </figcaption>

      <ul className="mt-4 space-y-1">
        {ROWS.map((r) => {
          const onPath = selected.startsWith(r.path);
          return (
            <li key={r.path}>
              <button
                type="button"
                onClick={() => setSelected(r.path)}
                style={{ marginInlineStart: `${r.depth * 1.15}rem` }}
                className={cn(
                  "learn-focusable flex w-full items-baseline gap-3 rounded-[4px] border-[0.5px] px-3 py-1.5 text-left transition-colors motion-reduce:transition-none",
                  r.path === selected
                    ? "border-learn-accent bg-learn-quiet"
                    : onPath
                      ? "border-learn-accent bg-learn-quiet-wash"
                      : "border-learn-line bg-white hover:border-learn-line-strong",
                )}
              >
                <span className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
                  {r.name}
                </span>
                <span className="text-[12px] text-learn-subtle">{r.className}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {`local target = ${row.path}`}
        </p>
        {short ? (
          <p className="mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-ok">
            {`local target = ${short}   -- the same object, shorter`}
          </p>
        ) : null}
        <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-code-dim">
          {`target.ClassName → "${row.className}"`}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {row.depth === 0
          ? "game is the root, and the only name that is always there. Every path in every script you write starts here or at a shortcut to somewhere inside it."
          : `Each dot is one step down the tree, and each step is a lookup that can fail. If anything above ${row.name} is renamed, this whole line stops working — which is why the next chapter is about the safer ways to write it.`}
      </p>
    </figure>
  );
}
