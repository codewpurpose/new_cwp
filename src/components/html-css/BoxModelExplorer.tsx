"use client";

import { useId, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The box model, with the arithmetic on screen.
 *
 * The whole widget exists for one number: the total width, computed live and
 * shown as a sum. Every diagram of the box model shows four nested rectangles
 * and none of them show that `width: 300px` plus `padding: 20px` measures 340 —
 * which is the only part anybody is actually confused by.
 *
 * `box-sizing` is a toggle rather than a footnote for the same reason. Reading
 * that border-box "includes padding in the width" teaches nothing; watching 340
 * become 300 while the content box shrinks to 260 teaches it in one click.
 */

type Sizing = "content-box" | "border-box";

const SIZINGS: readonly { value: Sizing; label: string }[] = [
  { value: "content-box", label: "content-box (default)" },
  { value: "border-box", label: "border-box" },
];

function Slider({
  label, value, onChange, max, unit = "px",
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
          {label}
        </label>
        <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-muted">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="learn-focusable mt-1 w-full accent-learn-accent"
      />
    </div>
  );
}

export function BoxModelExplorer() {
  const [width, setWidth] = useState(300);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(4);
  const [margin, setMargin] = useState(16);
  const [sizing, setSizing] = useState<Sizing>("content-box");

  // The rule the whole chapter is about.
  const contentWidth =
    sizing === "content-box" ? width : Math.max(0, width - 2 * padding - 2 * border);
  const borderBoxWidth = contentWidth + 2 * padding + 2 * border;
  const spaceTaken = borderBoxWidth + 2 * margin;

  // Scale the drawing so the widest possible box still fits the figure.
  const scale = Math.min(1, 420 / Math.max(spaceTaken, 1));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Four layers, and the width they add up to
      </figcaption>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <div className="space-y-3">
          <Slider label="width" value={width} onChange={setWidth} max={420} />
          <Slider label="padding" value={padding} onChange={setPadding} max={60} />
          <Slider label="border-width" value={border} onChange={setBorder} max={20} />
          <Slider label="margin" value={margin} onChange={setMargin} max={60} />
          <div className="pt-1">
            <SegmentedControl
              variant="chips"
              label="box-sizing"
              options={SIZINGS}
              value={sizing}
              onValueChange={setSizing}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
          {/* Every dimension here is the value under test, so all of it is
              computed. This is the one component where a static class set
              would defeat the purpose entirely. */}
          <div
            className="mx-auto"
            style={{ width: `${spaceTaken * scale}px`, transition: "width 120ms" }}
          >
            <div
              className="rounded-[4px] border border-dashed border-learn-outcome-fp bg-learn-warning-bg/40"
              style={{ padding: `${margin * scale}px` }}
            >
              <p className="mb-1 text-center text-[10px] uppercase tracking-[0.06em] text-learn-warning-fg">
                margin {margin}
              </p>
              <div
                className="rounded-[3px] border-solid border-learn-series-3 bg-learn-info-bg"
                style={{ borderWidth: `${Math.max(border * scale, border ? 1 : 0)}px`, padding: `${padding * scale}px` }}
              >
                <p className="mb-1 text-center text-[10px] uppercase tracking-[0.06em] text-learn-info-fg">
                  padding {padding}
                </p>
                <div className="rounded-[2px] bg-learn-quiet px-2 py-6 text-center">
                  <p className="font-[family-name:var(--learn-font-mono)] text-[12px] font-semibold text-learn-strong">
                    content
                  </p>
                  <p className="font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-muted">
                    {contentWidth}px
                  </p>
                </div>
              </div>
            </div>
          </div>
          {scale < 1 && (
            <p className="mt-2 text-center text-[11px] text-learn-subtle">
              drawn to scale, shrunk to fit
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite" className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.8] text-learn-code-fg">
          <span className="text-learn-code-dim">width: </span>
          {width}px<span className="text-learn-code-dim">; padding: </span>
          {padding}px<span className="text-learn-code-dim">; border: </span>
          {border}px<span className="text-learn-code-dim"> solid; box-sizing: </span>
          <span className="text-learn-code-accent">{sizing}</span>
          <span className="text-learn-code-dim">;</span>
        </p>
        <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.8] text-learn-code-ok">
          {contentWidth} + {padding}&times;2 + {border}&times;2 ={" "}
          <span className="font-semibold">{borderBoxWidth}px</span>
          <span className="text-learn-code-dim"> on screen</span>
        </p>
        <p className="font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.8] text-learn-code-dim">
          + {margin}&times;2 margin = {spaceTaken}px of horizontal space consumed
        </p>
      </div>

      <div className="mt-4 rounded-[6px] border-[0.5px] border-learn-info-line bg-learn-info-bg px-4 py-3">
        <p className="text-[13px] leading-[1.6] text-learn-info-fg">
          {sizing === "content-box" ? (
            <>
              You asked for <strong>{width}px</strong> and the element occupies{" "}
              <strong>{borderBoxWidth}px</strong>. With{" "}
              <span className="font-[family-name:var(--learn-font-mono)]">content-box</span>,{" "}
              <span className="font-[family-name:var(--learn-font-mono)]">width</span> means the
              content only — padding and border are added on the outside. Two of these side by side
              in a 50%-wide container overflow, and this is why.
            </>
          ) : (
            <>
              You asked for <strong>{width}px</strong> and the element occupies{" "}
              <strong>{borderBoxWidth}px</strong>. With{" "}
              <span className="font-[family-name:var(--learn-font-mono)]">border-box</span>, padding
              and border are taken <em>out of</em> the width, so the content box shrinks to{" "}
              <strong>{contentWidth}px</strong> instead. The number you typed is the number on
              screen.
            </>
          )}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Margin is outside the box in both modes and is never included in{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">width</span>. That is the one
        part <span className="font-[family-name:var(--learn-font-mono)]">border-box</span> does not
        change.
      </p>
    </figure>
  );
}
