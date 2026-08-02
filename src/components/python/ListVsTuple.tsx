"use client";

import { useState } from "react";

export function ListVsTuple() {
  const [items, setItems] = useState(["1", "2", "3"]);
  const [tupleError, setTupleError] = useState(false);

  const addToList = () => setItems((prev) => [...prev, String(prev.length + 1)]);
  const removeFromList = () => setItems((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        The same action, on a list and a tuple
      </figcaption>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold text-learn-strong">
            numbers = [1, 2, 3]
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {items.map((item, i) => (
              <span
                key={i}
                className="flex h-9 min-w-9 items-center justify-center rounded-[4px] border-[0.5px] border-learn-accent bg-learn-quiet px-2 font-[family-name:var(--learn-font-mono)] text-[14px] text-learn-strong"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={addToList}
              className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 text-[13px] font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
            >
              .append()
            </button>
            <button
              type="button"
              onClick={removeFromList}
              className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 text-[13px] font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
            >
              .pop()
            </button>
          </div>
          <p className="mt-2 text-[13px] text-learn-muted">A list changes size in place.</p>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-learn-strong">
            numbers = (1, 2, 3)
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["1", "2", "3"].map((item, i) => (
              <span
                key={i}
                className="flex h-9 min-w-9 items-center justify-center rounded-[4px] border-[0.5px] border-learn-line bg-white px-2 font-[family-name:var(--learn-font-mono)] text-[14px] text-learn-muted"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setTupleError(true)}
              className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-1.5 text-[13px] font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
            >
              .append()
            </button>
          </div>
          {tupleError ? (
            <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.5] text-learn-code-err">
              AttributeError: &apos;tuple&apos; object has no attribute &apos;append&apos;
            </p>
          ) : (
            <p className="mt-2 text-[13px] text-learn-muted">A tuple never changes size.</p>
          )}
        </div>
      </div>
    </figure>
  );
}
