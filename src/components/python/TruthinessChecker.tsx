"use client";

import { useState } from "react";

const VALUES: { label: string; truthy: boolean }[] = [
  { label: "0", truthy: false },
  { label: '""', truthy: false },
  { label: "[]", truthy: false },
  { label: "{}", truthy: false },
  { label: "None", truthy: false },
  { label: '"False"', truthy: true },
  { label: "1", truthy: true },
  { label: '"a"', truthy: true },
  { label: "[0]", truthy: true },
];

export function TruthinessChecker() {
  const [selected, setSelected] = useState(0);
  const value = VALUES[selected];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        bool(value)
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-2">
        {VALUES.map((v, i) => (
          <button
            key={v.label}
            type="button"
            onClick={() => setSelected(i)}
            className={`learn-focusable rounded-full px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[13px] font-medium transition-colors motion-reduce:transition-none ${
              selected === i
                ? "bg-learn-inverse text-learn-on-inverse"
                : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-subtle">
          {">>> "}bool({value.label})
        </p>
        <p
          className={`mt-1 font-[family-name:var(--learn-font-mono)] text-[20px] ${
            value.truthy ? "text-learn-strong" : "text-learn-code-err"
          }`}
        >
          {value.truthy ? "True" : "False"}
        </p>
      </div>

      <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
        Only <span className="font-[family-name:var(--learn-font-mono)]">{"0, \"\", [], {}, "}</span>
        and <span className="font-[family-name:var(--learn-font-mono)]">None</span> count as
        false. The string <span className="font-[family-name:var(--learn-font-mono)]">&quot;False&quot;</span>{" "}
        is not empty, so it is true — a common surprise the first time you read a value from
        user input and check it directly.
      </p>
    </figure>
  );
}
