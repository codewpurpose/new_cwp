"use client";

import { useState } from "react";

/**
 * WCAG contrast, computed properly.
 *
 * The maths is the real algorithm from the WCAG 2 definition — sRGB channels
 * linearised, weighted to relative luminance, then (L1 + 0.05) / (L2 + 0.05).
 * It is fifteen lines and there was no reason to approximate it.
 *
 * The pairs offered are deliberately mostly *failures*, and they are the ones
 * beginners actually pick: grey-on-white placeholder text, a mid-grey caption,
 * white on a pastel button. Showing a reader that their favourite subtle grey
 * scores 2.8:1 does more than any amount of prose about accessibility.
 */

interface Pair {
  label: string;
  fg: string;
  bg: string;
}

const PAIRS: readonly Pair[] = [
  { label: "Black on white", fg: "#000000", bg: "#ffffff" },
  { label: "Classic body grey", fg: "#636363", bg: "#ffffff" },
  { label: "Placeholder grey", fg: "#999999", bg: "#ffffff" },
  { label: "Light grey caption", fg: "#bbbbbb", bg: "#ffffff" },
  { label: "White on brand green", fg: "#ffffff", bg: "#3e7f5c" },
  { label: "White on pastel", fg: "#ffffff", bg: "#dbefdb" },
  { label: "Link blue on white", fg: "#2f5d8f", bg: "#ffffff" },
  { label: "Dark mode body", fg: "#e7efe7", bg: "#17241d" },
];

function channel(v: number): number {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const light = Math.max(a, b);
  const dark = Math.min(a, b);
  return (light + 0.05) / (dark + 0.05);
}

/** Banned in lesson modules: toLocaleString / Intl. toFixed only. */
function fmt(n: number): string {
  return n.toFixed(2);
}

function Verdict({ pass, label, detail }: { pass: boolean; label: string; detail: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-[6px] border-[0.5px] px-3.5 py-2.5 ${
        pass
          ? "border-learn-success-line bg-learn-success-bg text-learn-success-fg"
          : "border-learn-danger-line bg-learn-danger-bg text-learn-danger-fg"
      }`}
    >
      {pass ? (
        <svg viewBox="0 0 14 14" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
          <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 14 14" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
          <path d="M3.5 3.5 L10.5 10.5 M10.5 3.5 L3.5 10.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      )}
      <span className="flex-1">
        <span className="block text-[12.5px] font-semibold">{label}</span>
        <span className="block text-[11.5px] leading-[1.45] opacity-90">{detail}</span>
      </span>
    </div>
  );
}

export function ContrastChecker() {
  const [fg, setFg] = useState("#999999");
  const [bg, setBg] = useState("#ffffff");

  const r = ratio(fg, bg);
  const passAA = r >= 4.5;
  const passAALarge = r >= 3;
  const passAAA = r >= 7;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Two colours, one ratio, one number to beat
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-2">
        {PAIRS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setFg(p.fg);
              setBg(p.bg);
            }}
            className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[12px] font-medium transition-colors motion-reduce:transition-none ${
              fg === p.fg && bg === p.bg
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3 py-2.5">
          <span className="flex-1 text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            Text
          </span>
          <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
            {fg}
          </span>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            aria-label="Text colour"
            className="learn-focusable h-8 w-10 cursor-pointer rounded border-[0.5px] border-learn-line bg-transparent"
          />
        </label>
        <label className="flex items-center gap-3 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3 py-2.5">
          <span className="flex-1 text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            Background
          </span>
          <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong">
            {bg}
          </span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            aria-label="Background colour"
            className="learn-focusable h-8 w-10 cursor-pointer rounded border-[0.5px] border-learn-line bg-transparent"
          />
        </label>
      </div>

      {/* The two colours under test, so both are computed. */}
      <div
        className="mt-4 rounded-learn-md border-[0.5px] border-learn-line p-5"
        style={{ backgroundColor: bg, color: fg }}
      >
        <p className="text-[19px] font-semibold">Large text, 19px semibold</p>
        <p className="mt-2 text-[15px] leading-[1.6]">
          Body copy at fifteen pixels. This is the size most of a page is set in, and the size the
          4.5:1 threshold was written for.
        </p>
        <p className="mt-2 text-[12px]">Small print at twelve pixels — the hardest case.</p>
      </div>

      <div aria-live="polite" className="mt-4">
        <div className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-4 py-3">
          <p className="font-[family-name:var(--learn-font-mono)] text-[26px] font-semibold text-learn-strong">
            {fmt(r)}:1
          </p>
          <p className="text-[12px] text-learn-muted">contrast ratio &mdash; 1:1 to 21:1</p>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Verdict
            pass={passAA}
            label={`AA body — ${passAA ? "pass" : "fail"}`}
            detail="4.5:1. The one that matters for normal text."
          />
          <Verdict
            pass={passAALarge}
            label={`AA large — ${passAALarge ? "pass" : "fail"}`}
            detail="3:1. Only for 24px, or 19px bold and above."
          />
          <Verdict
            pass={passAAA}
            label={`AAA — ${passAAA ? "pass" : "fail"}`}
            detail="7:1. Stricter; worth aiming at for body copy."
          />
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Try &ldquo;Placeholder grey&rdquo; and &ldquo;White on pastel&rdquo;. Both look perfectly
        fine on a bright laptop indoors, and both fail — which is the point: contrast is not a
        question about your eyesight in your office. It is a question about a phone in sunlight, a
        cheap projector, and about eight per cent of men.
      </p>
    </figure>
  );
}
