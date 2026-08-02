"use client";

import { useState } from "react";

const STARTER: [string, string][] = [
  ["apple", "0.60"],
  ["banana", "0.35"],
];

export function DictBuilder() {
  const [entries, setEntries] = useState<[string, string][]>(STARTER);
  const [lookupKey, setLookupKey] = useState("apple");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const add = () => {
    if (!key.trim()) return;
    setEntries((prev) => {
      const next = prev.filter(([k]) => k !== key);
      return [...next, [key, value]];
    });
    setKey("");
    setValue("");
  };

  const found = entries.find(([k]) => k === lookupKey);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        prices = {"{ }"}
      </figcaption>

      <div className="mt-4 space-y-1.5 font-[family-name:var(--learn-font-mono)] text-[14px]">
        {entries.map(([k, v]) => (
          <div
            key={k}
            className="flex items-center gap-2 rounded-[6px] border-[0.5px] border-learn-line bg-white px-3 py-1.5"
          >
            <span className="text-learn-strong">&apos;{k}&apos;</span>
            <span className="text-learn-subtle">:</span>
            <span className="text-learn-accent-text">&apos;{v}&apos;</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="key"
          className="learn-focusable w-28 rounded-learn-md border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px]"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          className="learn-focusable w-28 rounded-learn-md border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px]"
        />
        <button
          type="button"
          onClick={add}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-3 py-2 text-[13px] font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
        >
          Add entry
        </button>
      </div>

      <div className="mt-6 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="text-[13px] text-learn-muted">Look something up by key:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entries.map(([k]) => (
            <button
              key={k}
              type="button"
              onClick={() => setLookupKey(k)}
              className={`learn-focusable rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
                lookupKey === k
                  ? "bg-learn-inverse text-learn-on-inverse"
                  : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong"
              }`}
            >
              {k}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLookupKey("mango")}
            className={`learn-focusable rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors motion-reduce:transition-none ${
              lookupKey === "mango"
                ? "bg-learn-inverse text-learn-on-inverse"
                : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong"
            }`}
          >
            mango
          </button>
        </div>
        <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-subtle">
          {">>> "}prices[&apos;{lookupKey}&apos;]
        </p>
        {found ? (
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[18px] text-learn-strong">
            &apos;{found[1]}&apos;
          </p>
        ) : (
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[15px] text-learn-code-err">
            KeyError: &apos;{lookupKey}&apos;
          </p>
        )}
      </div>
    </figure>
  );
}
