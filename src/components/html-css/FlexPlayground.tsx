"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * Flexbox, with the axis labelled.
 *
 * The axis overlay is the reason this exists. justify-content and align-items
 * swap which direction they move things the moment flex-direction changes, and
 * every learner memorises "justify is horizontal" and is then wrong forever
 * after their first column. Drawing the main axis on the container makes the
 * rule visible instead of memorable.
 */

type Direction = "row" | "column";
type Justify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
type Align = "stretch" | "flex-start" | "center" | "flex-end";

const DIRECTIONS: readonly { value: Direction; label: string }[] = [
  { value: "row", label: "row" },
  { value: "column", label: "column" },
];

const JUSTIFY: readonly { value: Justify; label: string }[] = [
  { value: "flex-start", label: "flex-start" },
  { value: "center", label: "center" },
  { value: "flex-end", label: "flex-end" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
];

const ALIGN: readonly { value: Align; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "flex-start", label: "flex-start" },
  { value: "center", label: "center" },
  { value: "flex-end", label: "flex-end" },
];

export function FlexPlayground() {
  const [direction, setDirection] = useState<Direction>("row");
  const [justify, setJustify] = useState<Justify>("flex-start");
  const [align, setAlign] = useState<Align>("stretch");
  const [gap, setGap] = useState(12);

  const mainAxis = direction === "row" ? "horizontal" : "vertical";
  const crossAxis = direction === "row" ? "vertical" : "horizontal";

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Four properties on the container — the children do not change
      </figcaption>

      <div className="mt-4 space-y-3">
        <SegmentedControl variant="chips" label="flex-direction" options={DIRECTIONS} value={direction} onValueChange={setDirection} />
        <SegmentedControl variant="chips" label="justify-content" options={JUSTIFY} value={justify} onValueChange={setJustify} />
        <SegmentedControl variant="chips" label="align-items" options={ALIGN} value={align} onValueChange={setAlign} />
        <div className="flex items-center gap-3">
          <label htmlFor="flex-gap" className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
            gap
          </label>
          <input
            id="flex-gap"
            type="range"
            min={0}
            max={40}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="learn-focusable flex-1 accent-learn-accent"
          />
          <span className="w-10 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-muted">
            {gap}px
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        <div className="mb-2 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.06em]">
          <span className="text-learn-accent-text">
            main axis &mdash; {mainAxis} (justify-content)
          </span>
          <span className="text-learn-series-3">
            cross axis &mdash; {crossAxis} (align-items)
          </span>
        </div>
        <div
          // Every one of these is the property being demonstrated.
          style={{
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            gap: `${gap}px`,
            minHeight: "190px",
          }}
          className="rounded-[6px] border-[1.5px] border-dashed border-learn-accent bg-learn-surface p-3"
        >
          {["A", "B", "C"].map((label, i) => (
            <div
              key={label}
              style={{ minWidth: "64px", minHeight: i === 1 ? "68px" : "44px" }}
              className="flex items-center justify-center rounded-[5px] border-[0.5px] border-learn-ink bg-learn-quiet px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="whitespace-pre font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.7] text-learn-code-fg">
          {`.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`}
        </p>
      </div>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Right now <span className="font-[family-name:var(--learn-font-mono)]">justify-content</span>{" "}
        moves things <strong>{mainAxis}ly</strong> and{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">align-items</span> moves them{" "}
        <strong>{crossAxis}ly</strong>. Switch direction and they swap — the properties did not
        change meaning, the axes did. That is the entire mental model, and it is why memorising
        &ldquo;justify is across, align is down&rdquo; fails the first time you build a column.
      </p>
    </figure>
  );
}
