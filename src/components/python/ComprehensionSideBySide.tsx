"use client";

import { useState } from "react";

const SOURCE = [1, 2, 3, 4, 5, 6];

export function ComprehensionSideBySide() {
  const [squareOnly, setSquareOnly] = useState(true);

  const result = squareOnly
    ? SOURCE.map((n) => n * n)
    : SOURCE.filter((n) => n % 2 === 0).map((n) => n * n);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        numbers = [1, 2, 3, 4, 5, 6]
      </figcaption>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setSquareOnly(true)}
          className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
            squareOnly
              ? "border-learn-accent bg-learn-quiet text-learn-strong"
              : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
          }`}
        >
          square every number
        </button>
        <button
          type="button"
          onClick={() => setSquareOnly(false)}
          className={`learn-focusable rounded-full border-[0.5px] px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
            !squareOnly
              ? "border-learn-accent bg-learn-quiet text-learn-strong"
              : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
          }`}
        >
          square only the even ones
        </button>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold text-learn-strong">The loop version</p>
          <div className="mt-2 rounded-learn-md bg-learn-code-bg p-4">
            <pre className="text-[13px] leading-[1.7]">
              <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-fg">
                {squareOnly
                  ? `squares = []
for n in numbers:
    squares.append(n * n)`
                  : `squares = []
for n in numbers:
    if n % 2 == 0:
        squares.append(n * n)`}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-learn-strong">The comprehension</p>
          <div className="mt-2 rounded-learn-md bg-learn-code-bg p-4">
            <pre className="text-[13px] leading-[1.7]">
              <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-fg">
                {squareOnly
                  ? `squares = [n * n for n in numbers]`
                  : `squares = [n * n for n in numbers if n % 2 == 0]`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[13px] font-semibold text-learn-strong">squares</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {result.map((n, i) => (
            <span
              key={i}
              className="flex h-9 min-w-9 items-center justify-center rounded-[4px] border-[0.5px] border-learn-accent bg-learn-quiet px-2 font-[family-name:var(--learn-font-mono)] text-[14px] text-learn-strong"
            >
              {n}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
          Both versions produce the exact same list. The comprehension just says it in the order
          you would say it out loud: what to compute, then what to loop over, then which ones
          to keep.
        </p>
      </div>
    </figure>
  );
}
