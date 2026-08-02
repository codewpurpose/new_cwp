"use client";

import { useState } from "react";

const ITEMS = [12, 45, 7, 23];

export function LoopStepper() {
  const [i, setI] = useState(0);
  const done = i >= ITEMS.length;
  const total = ITEMS.slice(0, i).reduce((a, b) => a + b, 0);

  const step = () => setI((prev) => Math.min(prev + 1, ITEMS.length));
  const reset = () => setI(0);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        for number in numbers:
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-2">
        {ITEMS.map((item, index) => (
          <span
            key={index}
            className={`flex h-11 w-11 items-center justify-center rounded-[6px] border-[0.5px] font-[family-name:var(--learn-font-mono)] text-[15px] ${
              index === i
                ? "border-learn-accent bg-learn-quiet text-learn-strong"
                : index < i
                  ? "border-learn-line bg-white text-learn-subtle"
                  : "border-learn-line bg-white text-learn-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="text-[13px] text-learn-muted">
          {done ? "Loop finished." : `Current iteration: number = ${ITEMS[i]}`}
        </p>
        <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] text-learn-strong">
          total = {total}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={step}
          disabled={done}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong disabled:opacity-30 motion-reduce:transition-none"
        >
          Step forward
        </button>
        <button
          type="button"
          onClick={reset}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Reset
        </button>
      </div>

      {done && (
        <p className="mt-3 text-[13px] leading-[1.5] text-learn-strong">
          The loop is over, but <span className="font-[family-name:var(--learn-font-mono)]">number</span>{" "}
          still exists — it holds {ITEMS[ITEMS.length - 1]}, the last value it was assigned.
          Python does not delete loop variables when the loop ends.
        </p>
      )}
    </figure>
  );
}
