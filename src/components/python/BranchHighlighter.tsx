"use client";

import { useState } from "react";

function branchFor(age: number): 0 | 1 | 2 {
  if (age >= 18) return 0;
  if (age >= 13) return 1;
  return 2;
}

const LINES = [
  { code: 'if age >= 18:', result: '    print("adult")' },
  { code: "elif age >= 13:", result: '    print("teenager")' },
  { code: "else:", result: '    print("child")' },
];

export function BranchHighlighter() {
  const [age, setAge] = useState(16);
  const active = branchFor(age);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Exactly one branch runs
      </figcaption>

      <label className="mt-4 block text-[13px] text-learn-muted">
        age = {age}
        <input
          type="range"
          min={0}
          max={30}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-1 w-full accent-learn-accent"
        />
      </label>

      <div className="mt-5 overflow-hidden rounded-learn-md bg-learn-code-bg">
        <pre className="p-4 text-[13px] leading-[1.8]">
          <code className="font-[family-name:var(--learn-font-mono)]">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={`rounded-[3px] px-1 ${
                  active === i ? "bg-learn-code-accent/20 text-learn-code-accent" : "text-learn-code-fg"
                }`}
              >
                {line.code}
                <br />
                {line.result}
              </div>
            ))}
          </code>
        </pre>
      </div>

      <p className="mt-3 text-[13px] leading-[1.5] text-learn-strong">
        {active === 0 && "age >= 18 is true, so Python runs this branch and skips every branch after it — the elif and else never even get checked."}
        {active === 1 && "age >= 18 is false, so Python checks the elif. age >= 13 is true, so this branch runs and the else is skipped."}
        {active === 2 && "Both age >= 18 and age >= 13 are false, so control falls all the way to else."}
      </p>
    </figure>
  );
}
