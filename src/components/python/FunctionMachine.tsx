"use client";

import { useState } from "react";

type Op = "square" | "double" | "half";

const OPS: Record<Op, { label: string; body: string; run: (x: number) => number }> = {
  square: { label: "square", body: "return x * x", run: (x) => x * x },
  double: { label: "double", body: "return x * 2", run: (x) => x * 2 },
  half: { label: "half", body: "return x / 2", run: (x) => x / 2 },
};

export function FunctionMachine() {
  const [input, setInput] = useState(4);
  const [op, setOp] = useState<Op>("square");
  const { label, body, run } = OPS[op];
  const output = run(input);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        def {label}(x):
      </figcaption>

      <div
        role="radiogroup"
        aria-label="Function"
        className="mt-4 inline-flex rounded-full border-[0.5px] border-learn-line bg-white p-1"
      >
        {(Object.keys(OPS) as Op[]).map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={op === key}
            onClick={() => setOp(key)}
            className={`learn-focusable rounded-full px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              op === key ? "bg-learn-inverse text-learn-on-inverse" : "text-learn-muted hover:text-learn-strong"
            }`}
          >
            {OPS[key].label}(x)
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-white px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.08em] text-learn-subtle">x =</p>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(Number(e.target.value))}
            className="learn-focusable mt-1 w-16 rounded-learn-md border-[0.5px] border-learn-line bg-white px-2 py-1 text-center font-[family-name:var(--learn-font-mono)] text-[18px] text-learn-strong"
          />
        </div>

        <span className="text-2xl text-learn-subtle" aria-hidden="true">→</span>

        <div className="rounded-learn-lg bg-learn-quiet px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.08em] text-learn-strong">{label}(x)</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-muted">{body}</p>
        </div>

        <span className="text-2xl text-learn-subtle" aria-hidden="true">→</span>

        <div className="rounded-learn-lg border-[0.5px] border-learn-accent bg-white px-5 py-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.08em] text-learn-subtle">returns</p>
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] text-learn-strong">{output}</p>
        </div>
      </div>

      <p className="mt-5 text-[13px] leading-[1.5] text-learn-muted">
        Change <span className="font-[family-name:var(--learn-font-mono)]">x</span> above, and
        only the input to the machine changes. The function&apos;s own definition — the middle
        box — never moves. That is what naming a piece of work buys you: change the input,
        run the same code, get the answer for that input.
      </p>
    </figure>
  );
}
