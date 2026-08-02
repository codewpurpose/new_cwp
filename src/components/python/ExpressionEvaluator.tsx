"use client";

import { useMemo, useState } from "react";

type Op = "+" | "-" | "*" | "/" | "//" | "%" | "**";

const OPS: readonly Op[] = ["+", "-", "*", "/", "//", "%", "**"];

function evaluate(a: number, b: number, op: Op): { value: string; type: "int" | "float" } {
  switch (op) {
    case "+":
      return finish(a + b, a, b);
    case "-":
      return finish(a - b, a, b);
    case "*":
      return finish(a * b, a, b);
    case "/":
      // Python's / is always true division: always a float.
      return { value: formatFloat(a / b), type: "float" };
    case "//": {
      // Python's // floors toward negative infinity; result is int if both
      // operands are int, float otherwise (neither input here is ever a float).
      const floored = Math.floor(a / b);
      return { value: String(floored), type: "int" };
    }
    case "%": {
      // Python's % takes the sign of the divisor, unlike JS's %.
      const result = ((a % b) + b) % b;
      return { value: String(result), type: "int" };
    }
    case "**":
      return finish(a ** b, a, b);
  }
}

function finish(result: number, a: number, b: number): { value: string; type: "int" | "float" } {
  const isInt = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(result);
  return isInt ? { value: String(result), type: "int" } : { value: formatFloat(result), type: "float" };
}

function formatFloat(n: number): string {
  const rounded = Math.round(n * 1e6) / 1e6;
  return Number.isInteger(rounded) ? `${rounded}.0` : String(rounded);
}

export function ExpressionEvaluator() {
  const [a, setA] = useState(7);
  const [b, setB] = useState(2);
  const [op, setOp] = useState<Op>("/");

  const result = useMemo(() => {
    if (b === 0 && (op === "/" || op === "//" || op === "%")) return null;
    return evaluate(a, b, op);
  }, [a, b, op]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Try an expression
      </figcaption>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          className="learn-focusable w-20 rounded-learn-md border-[0.5px] border-learn-line bg-white px-3 py-2 text-center font-[family-name:var(--learn-font-mono)] text-[15px] text-learn-strong"
          aria-label="First number"
        />
        <div
          role="radiogroup"
          aria-label="Operator"
          className="flex flex-wrap gap-1.5"
        >
          {OPS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={op === option}
              onClick={() => setOp(option)}
              className={`learn-focusable rounded-full px-3 py-1.5 font-[family-name:var(--learn-font-mono)] text-[14px] font-medium transition-colors motion-reduce:transition-none ${
                op === option
                  ? "bg-learn-inverse text-learn-on-inverse"
                  : "border-[0.5px] border-learn-line bg-white text-learn-muted hover:text-learn-strong"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
          className="learn-focusable w-20 rounded-learn-md border-[0.5px] border-learn-line bg-white px-3 py-2 text-center font-[family-name:var(--learn-font-mono)] text-[15px] text-learn-strong"
          aria-label="Second number"
        />
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-subtle">
          {">>> "}
          {a} {op} {b}
        </p>
        {result ? (
          <>
            <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[22px] text-learn-strong">
              {result.value}
            </p>
            <p className="mt-1 text-[13px] text-learn-muted">
              type: <span className="font-[family-name:var(--learn-font-mono)]">{result.type}</span>
            </p>
          </>
        ) : (
          <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[16px] text-learn-code-err">
            ZeroDivisionError: division by zero
          </p>
        )}
      </div>
    </figure>
  );
}
