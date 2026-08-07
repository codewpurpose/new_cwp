"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * Three kinds of copy, two kinds of mutation, and the arrows that explain why
 * the answers differ.
 *
 * Nothing is measured or generated: every arrow position is derived from a
 * fixed identity model below, so the same diagram renders on the server and in
 * the browser. The two buttons exist as a pair on purpose — mutating the inner
 * list separates deepcopy from the other two, and mutating the outer list is
 * the only thing that separates `b = a` from `b = a.copy()`.
 */

type Mode = "alias" | "shallow" | "deep";

const MODES: readonly { value: Mode; label: string }[] = [
  { value: "alias", label: "b = a" },
  { value: "shallow", label: "b = a.copy()" },
  { value: "deep", label: "b = deepcopy(a)" },
];

/** Identity, not value: two cells holding the same id are the same object. */
type InnerId = "i0" | "i1" | "i0b" | "i1b" | "new";

const W = 580;
const H = 300;
const INNER_X = 356;
const INNER_W = 168;
const INNER_H = 32;
const OUTER_X = 116;
const OUTER_H = 58;
const CELL_W = 64;
const CELL_H = 28;
const FERN = "var(--learn-series-1)";
const INDIGO = "var(--learn-series-3)";
const LINE = "var(--learn-line-strong)";
const INK = "var(--learn-ink-strong)";

function contents(id: InnerId, innerHit: boolean, mode: Mode): number[] {
  switch (id) {
    case "i0":
      return innerHit && mode !== "deep" ? [1, 2, 9] : [1, 2];
    case "i0b":
      return innerHit ? [1, 2, 9] : [1, 2];
    case "i1":
    case "i1b":
      return [3, 4];
    case "new":
      return [5, 6];
  }
}

function repr(values: number[]): string {
  return `[${values.join(", ")}]`;
}

interface Arrow {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  from: "a" | "b";
}

function ArrowPath({ arrow }: { arrow: Arrow }) {
  const { x1, y1, x2, y2, from } = arrow;
  const colour = from === "a" ? FERN : INDIGO;
  const tip = x2 - 7;
  return (
    <g>
      <path
        d={`M ${x1} ${y1} C ${x1 + 44} ${y1}, ${x2 - 52} ${y2}, ${tip} ${y2}`}
        fill="none"
        stroke={colour}
        strokeWidth={1.6}
        strokeDasharray={from === "b" ? "5 4" : undefined}
      />
      <path d={`M ${tip} ${y2 - 4.5} L ${x2} ${y2} L ${tip} ${y2 + 4.5} Z`} fill={colour} />
    </g>
  );
}

export function AliasTracer() {
  const [mode, setMode] = useState<Mode>("alias");
  const [innerHit, setInnerHit] = useState(false);
  const [outerHit, setOuterHit] = useState(false);

  const pick = (next: Mode) => {
    setMode(next);
    setInnerHit(false);
    setOuterHit(false);
  };

  // What each name's outer list actually holds, by object identity.
  const aCells: InnerId[] =
    mode === "alias" && outerHit ? ["i0", "i1", "new"] : ["i0", "i1"];
  const bCells: InnerId[] =
    mode === "deep"
      ? outerHit
        ? ["i0b", "i1b", "new"]
        : ["i0b", "i1b"]
      : outerHit
        ? ["i0", "i1", "new"]
        : ["i0", "i1"];

  const shared = mode === "alias";
  const innerIds: InnerId[] = shared
    ? aCells
    : [...aCells, ...bCells.filter((id) => !aCells.includes(id))];

  const innerY = (index: number): number =>
    innerIds.length === 1 ? H / 2 : 36 + index * ((H - 76) / (innerIds.length - 1));

  const aOuterY = shared ? 150 : 80;
  const bOuterY = shared ? 150 : 220;
  const aNameY = shared ? 116 : 80;
  const bNameY = shared ? 184 : 220;

  const cellCentre = (outerY: number, index: number) => ({
    x: OUTER_X + 16 + index * 76 + CELL_W,
    y: outerY,
  });

  const arrows: Arrow[] = [];
  aCells.forEach((id, i) => {
    const c = cellCentre(aOuterY, i);
    arrows.push({ x1: c.x, y1: c.y, x2: INNER_X, y2: innerY(innerIds.indexOf(id)), from: "a" });
  });
  if (!shared) {
    bCells.forEach((id, i) => {
      const c = cellCentre(bOuterY, i);
      arrows.push({ x1: c.x, y1: c.y, x2: INNER_X, y2: innerY(innerIds.indexOf(id)), from: "b" });
    });
  }

  const aRepr = repr2(aCells, innerHit, mode);
  const bRepr = repr2(bCells, innerHit, mode);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Which copy flinches, and at which level
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="Kind of copy"
        options={MODES}
        value={mode}
        onValueChange={pick}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setInnerHit(true)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          b[0].append(9)
        </button>
        <button
          type="button"
          onClick={() => setOuterHit(true)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          b.append([5, 6])
        </button>
        <button
          type="button"
          onClick={() => pick(mode)}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 text-[13px] font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-5 w-full"
        role="img"
        aria-label={`After the chosen operations, a is ${aRepr} and b is ${bRepr}.`}
      >
        <rect width={W} height={H} fill="var(--learn-chart-plot)" rx={6} />

        {arrows.map((arrow, i) => (
          <ArrowPath key={i} arrow={arrow} />
        ))}

        {/* Name nodes */}
        <circle cx={46} cy={aNameY} r={17} fill="var(--learn-surface)" stroke={FERN} strokeWidth={2} />
        <text x={46} y={aNameY + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={FERN}>
          a
        </text>
        <circle
          cx={46}
          cy={bNameY}
          r={17}
          fill="var(--learn-surface)"
          stroke={INDIGO}
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <text x={46} y={bNameY + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={INDIGO}>
          b
        </text>

        <ArrowPath arrow={{ x1: 63, y1: aNameY, x2: OUTER_X, y2: aOuterY, from: "a" }} />
        <ArrowPath arrow={{ x1: 63, y1: bNameY, x2: OUTER_X, y2: bOuterY, from: "b" }} />

        {/* Outer list boxes */}
        <OuterBox y={aOuterY} cells={aCells.length} shared={shared} />
        {!shared ? <OuterBox y={bOuterY} cells={bCells.length} shared={false} /> : null}

        {/* Inner list boxes */}
        {innerIds.map((id, i) => (
          <g key={id}>
            <rect
              x={INNER_X}
              y={innerY(i) - INNER_H / 2}
              width={INNER_W}
              height={INNER_H}
              rx={5}
              fill="var(--learn-surface)"
              stroke={LINE}
              strokeWidth={1.2}
            />
            <text
              x={INNER_X + 14}
              y={innerY(i) + 5}
              fontSize={14}
              fontFamily="var(--learn-font-mono)"
              fill={INK}
            >
              {repr(contents(id, innerHit, mode))}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          <span className="text-learn-code-dim">{"a  "}</span>
          {aRepr}
        </p>
        <p className="mt-1 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          <span className="text-learn-code-dim">{"b  "}</span>
          {bRepr}
        </p>
        <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-code-dim">
          {`b is a → ${shared ? "True" : "False"}    b[0] is a[0] → ${mode === "deep" ? "False" : "True"}`}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {aRepr === bRepr && innerHit
          ? "Both names still show the same thing. Mutating the inner list was never affected by copying the outer one — only deepcopy reaches that far down."
          : "Press both buttons under each mode. The first tells deepcopy apart from the other two; the second is the only one that tells b = a apart from b = a.copy()."}
      </p>
    </figure>
  );
}

function OuterBox({ y, cells, shared }: { y: number; cells: number; shared: boolean }) {
  const width = cells * 76 + 16;
  return (
    <g>
      <rect
        x={OUTER_X}
        y={y - OUTER_H / 2}
        width={width}
        height={OUTER_H}
        rx={6}
        fill="var(--learn-surface)"
        stroke={shared ? "var(--learn-accent)" : LINE}
        strokeWidth={shared ? 1.8 : 1.2}
      />
      {Array.from({ length: cells }, (_, i) => (
        <rect
          key={i}
          x={OUTER_X + 16 + i * 76}
          y={y - CELL_H / 2}
          width={CELL_W}
          height={CELL_H}
          rx={4}
          fill="var(--learn-chart-plot)"
          stroke={LINE}
          strokeWidth={1}
        />
      ))}
    </g>
  );
}

function repr2(cells: InnerId[], innerHit: boolean, mode: Mode): string {
  return `[${cells.map((id) => repr(contents(id, innerHit, mode))).join(", ")}]`;
}
