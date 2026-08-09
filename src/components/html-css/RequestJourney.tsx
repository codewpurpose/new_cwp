"use client";

import { useState } from "react";

/**
 * One request, from keypress to painted pixel.
 *
 * Stepped rather than animated on purpose: the interesting thing is not that it
 * is fast, it is that there are discrete stages and the reader will be writing
 * exactly one of them. The `you` flag on each stage is what carries that — it
 * marks the two steps that are the reader's job and greys out the four that are
 * somebody else's problem.
 */

interface Stage {
  label: string;
  where: string;
  detail: string;
  /** True when this stage is the reader's own work. */
  you: boolean;
  ms: number;
}

const STAGES: readonly Stage[] = [
  {
    label: "You type a URL and press Enter",
    where: "your browser",
    detail:
      "The browser first checks whether it already knows the answer — a cached page, a cached address. A lot of the time the journey stops here and nothing touches the network at all.",
    you: false,
    ms: 0,
  },
  {
    label: "DNS turns the name into a number",
    where: "a DNS resolver",
    detail:
      "codewithpurpose.org means nothing to the network. A DNS lookup exchanges it for an IP address like 76.76.21.21, which is the thing a computer can actually route to.",
    you: false,
    ms: 24,
  },
  {
    label: "The browser opens a connection",
    where: "across the internet",
    detail:
      "A TCP connection to that address, then a TLS handshake for the padlock. This is the part that makes a page from another continent slower than one nearby — the distance is real.",
    you: false,
    ms: 62,
  },
  {
    label: "It asks for one specific file",
    where: "the request",
    detail:
      "GET / HTTP/1.1 — plain text, a verb and a path. That is the entire ask. The server decides what to send back, and for a static site it sends a file straight off a disk.",
    you: false,
    ms: 71,
  },
  {
    label: "The server sends HTML back",
    where: "the response",
    detail:
      "Text. Not a picture of a page, not a layout — the same characters you typed into your editor. This is the file you write, and everything downstream is the browser interpreting it.",
    you: true,
    ms: 138,
  },
  {
    label: "The browser parses it and finds more to fetch",
    where: "your browser",
    detail:
      "Every <link>, <img>, and <script> in that HTML is another request, made automatically. A page is rarely one file; it is one file that names the others.",
    you: true,
    ms: 156,
  },
  {
    label: "It paints the page",
    where: "your screen",
    detail:
      "Structure from the HTML, appearance from the CSS, combined into boxes with positions and colours, and drawn. Now you can see it.",
    you: false,
    ms: 310,
  },
];

export function RequestJourney() {
  const [step, setStep] = useState(0);
  const stage = STAGES[step];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Enter, to pixels — seven stages, two of them yours
      </figcaption>

      <ol className="mt-5 space-y-1.5">
        {STAGES.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={active ? "step" : undefined}
                className={`learn-focusable flex w-full items-center gap-3 rounded-[6px] border-[0.5px] px-3 py-2.5 text-left transition-colors motion-reduce:transition-none ${
                  active
                    ? "border-learn-accent bg-learn-quiet-wash"
                    : done
                      ? "border-learn-line bg-learn-surface"
                      : "border-learn-line bg-learn-surface opacity-55"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    s.you
                      ? "bg-learn-inverse text-learn-heading-on-inverse"
                      : "bg-learn-quiet text-learn-strong"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-[13.5px] leading-[1.4] text-learn-strong">
                  {s.label}
                </span>
                <span className="hidden shrink-0 font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-subtle sm:inline">
                  {s.ms} ms
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
            {stage.where}
          </span>
          {stage.you && (
            <span className="rounded-full bg-learn-inverse px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-heading-on-inverse">
              this part is yours
            </span>
          )}
        </div>
        <p className="mt-2.5 text-[13px] leading-[1.6] text-learn-muted">{stage.detail}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STAGES.length - 1, s + 1))}
          disabled={step === STAGES.length - 1}
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next &rarr;
        </button>
        <span className="text-[12px] text-learn-subtle">
          Step {step + 1} of {STAGES.length}
        </span>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        The timings are illustrative, but the proportions are not: the network is most of the wait
        and your file is usually a tiny part of it. Note how much happens before your HTML is even
        involved — and that everything after step five is the browser reading what you wrote.
      </p>
    </figure>
  );
}
