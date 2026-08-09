"use client";

import { useState } from "react";

/**
 * A viewport you can drag across a breakpoint.
 *
 * The media queries are evaluated in JavaScript against the simulated width
 * rather than written as real CSS, because a real @media query would read the
 * *browser's* viewport — the reader's actual window — and the whole point is to
 * change the width without resizing anything. The rules shown are the rules
 * being applied; they are just applied by a comparison rather than by the
 * cascade.
 */

const PRESETS: readonly { label: string; width: number }[] = [
  { label: "iPhone SE", width: 375 },
  { label: "Tablet", width: 768 },
  { label: "Laptop", width: 1024 },
];

const MIN = 320;
const MAX = 1200;

/** Mobile-first: the base rules, then two min-width queries on top. */
const BREAKPOINTS = [
  { at: 640, columns: 2, navRow: true, label: "min-width: 640px" },
  { at: 1024, columns: 3, navRow: true, label: "min-width: 1024px" },
];

function resolve(width: number) {
  let columns = 1;
  let navRow = false;
  const active: string[] = [];
  for (const bp of BREAKPOINTS) {
    if (width >= bp.at) {
      columns = bp.columns;
      navRow = bp.navRow;
      active.push(bp.label);
    }
  }
  return { columns, navRow, active };
}

export function ViewportSim() {
  const [width, setWidth] = useState(375);
  const { columns, navRow, active } = resolve(width);

  // The preview is drawn at a fraction of the simulated width so a 1200px
  // "viewport" fits inside a figure that is itself only ~700px wide.
  const scale = Math.min(1, 560 / width);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Drag the viewport and watch the queries fire
      </figcaption>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          aria-label="Simulated viewport width"
          className="learn-focusable min-w-[180px] flex-1 accent-learn-accent"
        />
        <span className="w-[86px] shrink-0 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
          {width}px
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setWidth(p.width)}
              className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[12px] font-medium transition-colors motion-reduce:transition-none ${
                width === p.width
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breakpoint ruler — where on the slider each query switches on. */}
      <div className="relative mt-3 h-6" aria-hidden="true">
        {BREAKPOINTS.map((bp) => (
          <span
            key={bp.at}
            style={{ left: `${((bp.at - MIN) / (MAX - MIN)) * 100}%` }}
            className="absolute top-0 -translate-x-1/2 text-[10px] text-learn-subtle"
          >
            <span className="mx-auto block h-2 w-px bg-learn-line-strong" />
            {bp.at}
          </span>
        ))}
      </div>

      <div className="mt-1 overflow-x-auto rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        <div
          className="mx-auto overflow-hidden rounded-[6px] border-[1.5px] border-learn-ink bg-white"
          // The simulated viewport itself.
          style={{ width: `${width * scale}px` }}
        >
          <div
            className="flex items-center gap-2 border-b-[0.5px] border-learn-line bg-learn-sunken px-3 py-2"
            style={{ flexDirection: navRow ? "row" : "column", alignItems: navRow ? "center" : "stretch" }}
          >
            <span className="font-[family-name:var(--learn-font-mono)] text-[11px] font-semibold text-learn-strong">
              Site
            </span>
            <span
              className="flex gap-1.5"
              style={{ flexDirection: navRow ? "row" : "column", marginLeft: navRow ? "auto" : 0 }}
            >
              {["Home", "Work", "About"].map((item) => (
                <span
                  key={item}
                  className="rounded-[3px] bg-learn-quiet px-2 py-1 text-center text-[10px] text-learn-strong"
                >
                  {item}
                </span>
              ))}
            </span>
          </div>
          <div
            className="p-3"
            style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "8px" }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-[4px] border-[0.5px] border-learn-line bg-learn-quiet-wash px-2 py-4 text-center font-[family-name:var(--learn-font-mono)] text-[10px] text-learn-strong"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
        {scale < 1 && (
          <p className="mt-2 text-center text-[11px] text-learn-subtle">
            drawn to scale, shrunk to fit
          </p>
        )}
      </div>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="whitespace-pre font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[1.7]">
          <span className={active.length === 0 ? "text-learn-code-ok" : "text-learn-code-dim"}>
            {`.grid { grid-template-columns: 1fr; }\n`}
          </span>
          {BREAKPOINTS.map((bp) => (
            <span
              key={bp.at}
              className={active.includes(bp.label) ? "text-learn-code-ok" : "text-learn-code-dim"}
            >
              {`\n@media (${bp.label}) {\n  .grid { grid-template-columns: repeat(${bp.columns}, 1fr); }\n}\n`}
            </span>
          ))}
        </p>
      </div>

      <p aria-live="polite" className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        At <strong>{width}px</strong>:{" "}
        {active.length === 0 ? (
          <>
            no media query applies. These are the <strong>base</strong> styles — one column, stacked
            navigation — and they are what every device gets before any query is consulted. That is
            what mobile-first means.
          </>
        ) : (
          <>
            {active.length} quer{active.length === 1 ? "y" : "ies"} appl
            {active.length === 1 ? "ies" : "y"}, and the <em>last</em> matching one wins — the same
            cascade rule as everywhere else in CSS, which is why min-width queries must be written
            smallest first.
          </>
        )}
      </p>
    </figure>
  );
}
