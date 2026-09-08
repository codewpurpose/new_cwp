"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The same page, one layer at a time.
 *
 * The HTML-only panel is the one that matters and it has to be
 * unstyled — no card, no spacing, browser defaults only. Anything prettier and
 * the point is lost, which is why the markup here is rendered with real
 * elements inside a `layer-raw` wrapper rather than described in prose.
 *
 * `all: revert` on that wrapper is doing the work: it puts the browser's own
 * stylesheet back for the subtree, undoing the app's global resets. Without it
 * a Tailwind preflight has already removed the margins and bullet points that
 * are the entire demonstration.
 */

type Layer = "html" | "css" | "js";

const LAYERS: readonly { value: Layer; label: string }[] = [
  { value: "html", label: "HTML only" },
  { value: "css", label: "+ CSS" },
  { value: "js", label: "+ JavaScript" },
];

const NOTES: Record<Layer, { title: string; body: string }> = {
  html: {
    title: "Structure, and nothing else",
    body: "Browser defaults only. It is ugly and it is completely functional — the heading is a heading, the list is a list, the link works. Every word is readable and the page can be used. This is what a search engine and a screen reader see, and it is why HTML comes first in this track.",
  },
  css: {
    title: "The same HTML, described differently",
    body: "Not one character of the markup changed. Colour, spacing, type, and layout are a separate file making claims about elements that already existed. Delete the CSS and you are back to the panel before this one — the page degrades, it does not break.",
  },
  js: {
    title: "Behaviour, added on top",
    body: "The button did nothing in the previous panel; it was real markup with no handler. JavaScript is the layer that responds to what the visitor does. Note that it is last and it is optional — this page is useful without it, which is the order you should build in.",
  },
};

function RawMarkup() {
  return (
    <div className="layer-raw">
      <h1>Priya Raman</h1>
      <p>
        Second-year student. I build small tools and write about what breaks.
      </p>
      <ul>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#writing">Writing</a>
        </li>
      </ul>
      <button type="button">Say hello</button>
    </div>
  );
}

function StyledMarkup({ interactive }: { interactive: boolean }) {
  const [said, setSaid] = useState(false);

  return (
    <div className="rounded-[8px] bg-white p-5">
      <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-learn-strong">
        Priya Raman
      </h1>
      <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.6] text-learn-muted">
        Second-year student. I build small tools and write about what breaks.
      </p>
      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
        {["Projects", "Writing"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              onClick={(e) => e.preventDefault()}
              className="learn-focusable inline-block rounded-full border-[0.5px] border-learn-line px-3 py-1.5 text-[13px] text-learn-accent-text no-underline hover:border-learn-accent"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!interactive}
        onClick={() => setSaid((s) => !s)}
        className="learn-focusable mt-4 rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-45"
      >
        {said ? "Hello back" : "Say hello"}
      </button>
      {interactive && (
        <p aria-live="polite" className="mt-2 text-[12px] text-learn-subtle">
          {said ? "The button changed its own label. That is the third layer." : " "}
        </p>
      )}
    </div>
  );
}

export function LayerToggle() {
  const [layer, setLayer] = useState<Layer>("html");
  const note = NOTES[layer];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One page, three layers — the markup never changes
      </figcaption>

      <div className="mt-4">
        <SegmentedControl label="Which layers are switched on" options={LAYERS} value={layer} onValueChange={setLayer} />
      </div>

      <div className="mt-4 overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        {layer === "html" ? <RawMarkup /> : <StyledMarkup interactive={layer === "js"} />}
      </div>

      <div aria-live="polite" className="mt-4 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-4 py-3">
        <p className="text-[13.5px] font-semibold text-learn-strong">{note.title}</p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">{note.body}</p>
      </div>
    </figure>
  );
}
