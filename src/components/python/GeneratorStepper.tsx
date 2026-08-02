"use client";

import { useState } from "react";

const VALUES = [1, 1, 2, 3, 5, 8];

export function GeneratorStepper() {
  const [pulled, setPulled] = useState(0);
  const done = pulled >= VALUES.length;

  const next = () => setPulled((prev) => Math.min(prev + 1, VALUES.length));
  const reset = () => setPulled(0);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        gen = fibonacci_below(20)
      </figcaption>

      <div className="mt-3 rounded-learn-md bg-learn-code-bg p-4">
        <pre className="text-[13px] leading-[1.7]">
          <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-fg">
            {`def fibonacci_below(limit):
    a, b = 1, 1
    while a < limit:
        yield a
        a, b = b, a + b`}
          </code>
        </pre>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={next}
          disabled={done}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          next(gen)
        </button>
        <button
          type="button"
          onClick={reset}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {VALUES.map((v, i) => (
          <span
            key={i}
            className={`flex h-9 min-w-9 items-center justify-center rounded-[4px] border-[0.5px] px-2 font-[family-name:var(--learn-font-mono)] text-[14px] transition-colors motion-reduce:transition-none ${
              i < pulled
                ? "border-learn-accent bg-learn-quiet text-learn-strong"
                : "border-learn-line bg-white text-learn-subtle"
            }`}
          >
            {v}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        {pulled === 0 &&
          "Nothing has run yet. Calling fibonacci_below(20) doesn't compute anything — it just creates a paused generator."}
        {pulled > 0 &&
          !done &&
          `Only ${pulled} value${pulled === 1 ? "" : "s"} computed so far — the rest of the function hasn't run yet, and won't until the next next() call.`}
        {done &&
          "The function ran out of values under 20 and stopped naturally. A generator never builds the full list at once — it produces exactly as many values as are actually asked for."}
      </p>
    </figure>
  );
}
