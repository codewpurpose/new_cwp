"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * Grid, from the track definition down.
 *
 * Built around `grid-template-columns` because that one property is most of
 * grid, and around the `fr` unit because it is the piece with no equivalent
 * anywhere else in CSS — percentages do not account for the gap and fr does,
 * which is the difference between a layout that fits and one that overflows by
 * exactly the gap width.
 *
 * The span toggle earns its place by showing the thing flexbox cannot do at
 * all: one child covering two columns while its siblings stay in the grid.
 */

type Template =
  | "1fr 1fr 1fr"
  | "2fr 1fr"
  | "200px 1fr"
  | "repeat(auto-fit, minmax(140px, 1fr))";

const TEMPLATES: readonly { value: Template; label: string; note: string }[] = [
  {
    value: "1fr 1fr 1fr",
    label: "1fr 1fr 1fr",
    note: "Three equal columns. fr means \"one share of what is left after gaps and fixed tracks are taken out\" — which is why this never overflows, and why three 33.3% columns with a gap do.",
  },
  {
    value: "2fr 1fr",
    label: "2fr 1fr",
    note: "Two columns, the first twice as wide. Shares, not percentages: 2fr and 1fr means two parts to one, whatever the container turns out to be.",
  },
  {
    value: "200px 1fr",
    label: "200px 1fr",
    note: "A fixed sidebar and a flexible main column. The 200px is taken out first, and 1fr claims everything that remains. This one line is the classic page layout.",
  },
  {
    value: "repeat(auto-fit, minmax(140px, 1fr))",
    label: "repeat(auto-fit, minmax(140px, 1fr))",
    note: "As many columns as fit, each at least 140px, sharing the leftover equally. Resize the window and the column count changes on its own — a responsive grid with no media query anywhere.",
  },
];

export function GridPlayground() {
  const [template, setTemplate] = useState<Template>("1fr 1fr 1fr");
  const [gap, setGap] = useState(12);
  const [spanFirst, setSpanFirst] = useState(false);

  const current = TEMPLATES.find((t) => t.value === template) ?? TEMPLATES[0];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Define the tracks, then let the items fall into them
      </figcaption>

      <div className="mt-4 space-y-3">
        <SegmentedControl
          variant="chips"
          label="grid-template-columns"
          options={TEMPLATES.map((t) => ({ value: t.value, label: t.label }))}
          value={template}
          onValueChange={setTemplate}
        />
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="grid-gap" className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
            gap
          </label>
          <input
            id="grid-gap"
            type="range"
            min={0}
            max={40}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="learn-focusable w-40 accent-learn-accent"
          />
          <span className="w-10 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-muted">
            {gap}px
          </span>
          <label className="flex cursor-pointer items-center gap-2 rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5">
            <input
              type="checkbox"
              checked={spanFirst}
              onChange={(e) => setSpanFirst(e.target.checked)}
              className="learn-focusable h-4 w-4 accent-learn-accent"
            />
            <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
              A spans 2 columns
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        <div
          // The properties under demonstration.
          style={{
            display: "grid",
            gridTemplateColumns: template,
            gap: `${gap}px`,
          }}
        >
          {["A", "B", "C", "D", "E"].map((label, i) => (
            <div
              key={label}
              style={i === 0 && spanFirst ? { gridColumn: "span 2" } : undefined}
              className={`flex min-h-[58px] items-center justify-center rounded-[5px] border-[0.5px] border-learn-ink font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong ${
                i === 0 && spanFirst ? "bg-learn-info-bg" : "bg-learn-quiet"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto whitespace-pre font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.7] text-learn-code-fg">
          {`.grid {\n  display: grid;\n  grid-template-columns: ${template};\n  gap: ${gap}px;\n}`}
          {spanFirst ? `\n\n.grid > :first-child {\n  grid-column: span 2;\n}` : ""}
        </p>
      </div>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {current.note}
      </p>

      {spanFirst && (
        <p className="mt-3 rounded-[6px] border-[0.5px] border-learn-info-line bg-learn-info-bg px-4 py-3 text-[13px] leading-[1.6] text-learn-info-fg">
          A is now two columns wide and B, C, D and E have shuffled along to fill the remaining
          cells without you positioning any of them. This is the thing flexbox genuinely cannot do:
          a flex item can grow, but it cannot occupy a defined cell in a second dimension.
        </p>
      )}
    </figure>
  );
}
