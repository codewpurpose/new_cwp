"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";

type ErrorKind = "IndexError" | "KeyError" | "TypeError" | "ZeroDivisionError";

const ERRORS: Record<
  ErrorKind,
  { code: string; traceback: string; fix: string }
> = {
  IndexError: {
    code: `scores = [88, 92, 79]
print(scores[3])`,
    traceback: `Traceback (most recent call last):
  File "report.py", line 2, in <module>
    print(scores[3])
          ~~~~~~^^^
IndexError: list index out of range`,
    fix: "scores only has indexes 0, 1, and 2 — three items, not four. Check len(scores) before indexing, or loop over the list instead of guessing an index.",
  },
  KeyError: {
    code: `prices = {"apple": 0.6}
print(prices["mango"])`,
    traceback: `Traceback (most recent call last):
  File "report.py", line 2, in <module>
    print(prices["mango"])
          ~~~~~~^^^^^^^^^
KeyError: 'mango'`,
    fix: 'prices.get("mango") returns None instead of raising, or check "mango" in prices first if you need to branch on whether it exists.',
  },
  TypeError: {
    code: `age = 25
print("Age: " + age)`,
    traceback: `Traceback (most recent call last):
  File "report.py", line 2, in <module>
    print("Age: " + age)
           ~~~~~~~^~~~~
TypeError: can only concatenate str (not "int") to str`,
    fix: 'age is an int, and + between a string and a number is not defined. Wrap it: "Age: " + str(age), or use an f-string: f"Age: {age}".',
  },
  ZeroDivisionError: {
    code: `total = 40
people = 0
print(total / people)`,
    traceback: `Traceback (most recent call last):
  File "report.py", line 3, in <module>
    print(total / people)
          ~~~~~~^~~~~~~~
ZeroDivisionError: division by zero`,
    fix: "Check people != 0 before dividing, and decide what the answer should be when there is nobody to divide among — often 0, not a crash.",
  },
};

export function ErrorPicker() {
  const [kind, setKind] = useState<ErrorKind>("IndexError");
  const [showFix, setShowFix] = useState(false);
  const current = ERRORS[kind];

  const select = (next: ErrorKind) => {
    setKind(next);
    setShowFix(false);
  };

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Read the traceback from the bottom up
      </figcaption>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(ERRORS) as ErrorKind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => select(k)}
            className={`learn-focusable rounded-full px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[13px] font-medium transition-colors motion-reduce:transition-none ${
              kind === k
                ? "bg-learn-inverse text-learn-on-inverse"
                : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <CodeBlock label="report.py" code={current.code} />
      <CodeBlock
        label="Traceback"
        variant="terminal"
        code={current.traceback}
        lineTones={{ [current.traceback.split("\n").length - 1]: "err" }}
      />

      <button
        type="button"
        onClick={() => setShowFix((v) => !v)}
        className="learn-focusable mt-2 rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
      >
        {showFix ? "Hide the fix ↑" : "See the fix ↓"}
      </button>
      {showFix && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{current.fix}</p>
      )}
    </figure>
  );
}
