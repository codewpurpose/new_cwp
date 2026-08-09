"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * Three display values, applied to the same three boxes.
 *
 * The demonstration that matters is the second one: `width: 120px` is set on
 * every variant and is silently ignored when display is inline. A reader who
 * has watched that happen stops filing "my width does nothing" as a mystery.
 */

type Display = "block" | "inline" | "inline-block";

const OPTIONS: readonly { value: Display; label: string }[] = [
  { value: "block", label: "display: block" },
  { value: "inline", label: "display: inline" },
  { value: "inline-block", label: "display: inline-block" },
];

const NOTES: Record<Display, { headline: string; body: string; width: string; margin: string }> = {
  block: {
    headline: "Takes the whole line, every time",
    width: "respected",
    margin: "respected on all four sides",
    body: "A block element starts on a new line and fills the available width unless you say otherwise. div, p, h1–h6, section, ul, li — the structural elements. Setting width makes it narrower, and it still refuses to share the line.",
  },
  inline: {
    headline: "Sits in the text, and ignores your width",
    width: "IGNORED",
    margin: "left and right only",
    body: "An inline element is part of the line of text. width and height do nothing at all, top and bottom margins do nothing, and top and bottom padding renders but does not push anything away. span, a, strong, em, img (mostly). This is the answer to \"why is my width not working\".",
  },
  "inline-block": {
    headline: "Sits in the line, and behaves like a box",
    width: "respected",
    margin: "respected on all four sides",
    body: "The compromise: flows inline with its neighbours, but honours width, height, and vertical margins. It was the standard way to lay out a row of things for a decade. Flexbox does this better now, but inline-block is still right for something that genuinely belongs in a sentence.",
  },
};

export function DisplayFlow() {
  const [display, setDisplay] = useState<Display>("block");
  const note = NOTES[display];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Same three boxes, same width: 120px — three display values
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          variant="chips"
          label="display"
          options={OPTIONS}
          value={display}
          onValueChange={setDisplay}
        />
      </div>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        <p className="text-[13px] leading-[1.7] text-learn-muted">
          Some text before.{" "}
          {["One", "Two", "Three"].map((label) => (
            <span
              key={label}
              // The property under test, so it has to be computed.
              style={{ display, width: "120px", margin: "8px" }}
              className="rounded-[4px] border-[0.5px] border-learn-accent bg-learn-quiet px-2 py-2 text-center font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong"
            >
              {label}
            </span>
          ))}{" "}
          Some text after.
        </p>
      </div>

      <div aria-live="polite" className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3.5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-learn-accent-text">
            width: 120px is
          </p>
          <p
            className={`mt-1 font-[family-name:var(--learn-font-mono)] text-[13px] ${
              note.width === "IGNORED" ? "text-learn-danger-fg" : "text-learn-strong"
            }`}
          >
            {note.width}
          </p>
        </div>
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3.5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-learn-accent-text">
            margin: 8px is
          </p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
            {note.margin}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-4 py-3">
        <p className="text-[13.5px] font-semibold text-learn-strong">{note.headline}</p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">{note.body}</p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Switch to <span className="font-[family-name:var(--learn-font-mono)]">inline</span> and
        watch the boxes collapse to the width of their text while the CSS still clearly says{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">width: 120px</span>. Nothing
        warns you. Devtools shows the declaration applied and not crossed out, because it <em>is</em>{" "}
        applied — it simply has no meaning for this display type.
      </p>
    </figure>
  );
}
