"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Learning Toolkit — note templates and guides students fill in as they
 * learn. From Ashwika Ashok's proposal: give students a structure for taking
 * notes and applying what they learn, not a blank page.
 *
 * Everything is saved on the student's own device (localStorage) — nothing is
 * sent anywhere, so there are no accounts and no privacy footprint. "Save as
 * PDF" goes through the browser's print dialog, so there's no dependency and
 * nothing to upload.
 */

interface Field {
  k: string;
  label: string;
  hint?: string;
}
interface Template {
  id: string;
  name: string;
  blurb: string;
  track: string;
  koala: string;
  fields: Field[];
}

const TEMPLATES: Template[] = [
  {
    id: "debugging-log",
    name: "Debugging Log",
    blurb: "Track a bug from the first symptom all the way to the fix.",
    track: "Python · Vibecoding",
    koala: "/koala/koala-climb.png",
    fields: [
      { k: "goal", label: "Goal", hint: "What were you trying to make happen?" },
      { k: "expected", label: "Expected behavior" },
      { k: "actual", label: "Actual behavior" },
      { k: "tried", label: "What I tried" },
      { k: "root", label: "Root cause" },
      { k: "fix", label: "Fix" },
    ],
  },
  {
    id: "concept-breakdown",
    name: "Concept Breakdown",
    blurb: "Make an abstract idea actually click before you move on.",
    track: "Any course",
    koala: "/koala/koala-read.png",
    fields: [
      { k: "concept", label: "Concept" },
      { k: "problem", label: "What problem does this solve?" },
      { k: "how", label: "How does it work?" },
      { k: "example", label: "Example" },
      { k: "where", label: "Where would I use this?" },
    ],
  },
  {
    id: "learned-today",
    name: "What I Learned Today",
    blurb: "A quick daily reflection so it actually sticks.",
    track: "Any course",
    koala: "/koala/koala-wave.png",
    fields: [
      { k: "topic", label: "Today I learned about" },
      { k: "click", label: "The thing that finally clicked" },
      { k: "stuck", label: "Something I'm still unsure about" },
      { k: "next", label: "What I'll try next" },
    ],
  },
  {
    id: "project-plan",
    name: "Project Plan",
    blurb: "Shape a project before you write a single line.",
    track: "Capstones",
    koala: "/koala/koala-heart.png",
    fields: [
      { k: "idea", label: "What I'm building" },
      { k: "who", label: "Who it's for, and why" },
      { k: "pieces", label: "The pieces it needs" },
      { k: "first", label: "The very first step" },
      { k: "done", label: "How I'll know it's done" },
    ],
  },
];

type Values = Record<string, string>;

function storageKey(id: string) {
  return `cwp-toolkit-${id}`;
}

export function LearningToolkit() {
  const [activeId, setActiveId] = useState<string>(TEMPLATES[0].id);
  const [values, setValues] = useState<Values>({});
  const loadedFor = useRef<string | null>(null);

  const active = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];

  // Load this template's saved answers whenever the selection changes.
  useEffect(() => {
    let stored: Values = {};
    try {
      stored = JSON.parse(localStorage.getItem(storageKey(activeId)) || "{}");
    } catch {
      stored = {};
    }
    loadedFor.current = activeId;
    // Syncing the browser's saved note into React state when the template
    // changes — a deliberate external-store read, not a render cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(stored);
  }, [activeId]);

  // Persist on every edit (only once the right template's data is loaded).
  useEffect(() => {
    if (loadedFor.current !== activeId) return;
    try {
      localStorage.setItem(storageKey(activeId), JSON.stringify(values));
    } catch {
      /* private mode — fine, it just won't persist */
    }
  }, [values, activeId]);

  const update = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));
  const clear = () => {
    if (typeof window !== "undefined" && window.confirm("Clear everything in this note?")) {
      setValues({});
    }
  };

  const filled = active.fields.filter((f) => (values[f.k] || "").trim()).length;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
      {/* Template picker */}
      <aside className="toolkit-screen flex flex-col gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
          Pick a template
        </p>
        {TEMPLATES.map((t) => {
          const selected = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`home-card home-lift flex items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                selected ? "ring-2 ring-[var(--home-fern)]" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.koala} alt="" className="h-11 w-11 shrink-0 object-contain" />
              <span className="min-w-0">
                <span className="block text-[15px] font-medium leading-tight">{t.name}</span>
                <span className="block truncate text-xs text-[var(--home-ink-quiet)]">{t.track}</span>
              </span>
            </button>
          );
        })}
        <p className="mt-1 text-xs leading-[1.5] text-[var(--home-ink-quiet)]">
          Your notes are saved right here in your browser — nothing is uploaded. Use{" "}
          <span className="font-medium">Save as PDF</span> to keep or print a copy.
        </p>
      </aside>

      {/* Editable note */}
      <section className="toolkit-screen home-card rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="home-serif text-2xl md:text-[1.75rem]">{active.name}</h2>
            <p className="mt-1 text-[15px] text-[var(--home-ink-soft)]">{active.blurb}</p>
          </div>
          <span className="rounded-full bg-[var(--home-pistachio)] px-3 py-1 text-xs font-medium text-[var(--home-moss)]">
            {filled}/{active.fields.length} filled
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          {active.fields.map((f) => (
            <label key={f.k} className="block">
              <span className="text-sm font-medium">{f.label}</span>
              {f.hint && (
                <span className="ml-2 text-xs text-[var(--home-ink-quiet)]">{f.hint}</span>
              )}
              <textarea
                value={values[f.k] || ""}
                onChange={(e) => update(f.k, e.target.value)}
                rows={2}
                className="mt-1.5 w-full resize-y rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-white/70 px-3 py-2 text-[15px] leading-[1.5] outline-none focus:border-[var(--home-fern)] focus:ring-2 focus:ring-[#dbefdb]"
              />
            </label>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="home-btn home-btn-fill"
          >
            Save as PDF
          </button>
          <button type="button" onClick={clear} className="home-btn home-btn-outline">
            Clear
          </button>
        </div>
      </section>

      {/* Print-only clean rendering (off-screen normally; the browser print
          dialog isolates this via the @media print rules in globals.css). */}
      <div className="toolkit-printable" aria-hidden="true">
        <h1>{active.name}</h1>
        <p className="toolkit-printable__track">CodeWithPurpose · {active.track}</p>
        <dl>
          {active.fields.map((f) => (
            <div key={f.k} className="toolkit-printable__row">
              <dt>{f.label}</dt>
              <dd>{values[f.k]?.trim() ? values[f.k] : " "}</dd>
            </div>
          ))}
        </dl>
        <p className="toolkit-printable__foot">codewithpurpose.org</p>
      </div>
    </div>
  );
}
