"use client";

import { useState } from "react";

type Scenario = "shared" | "reassign";

const VIEW_WIDTH = 420;
const VIEW_HEIGHT = 200;

export function NamePointer() {
  const [scenario, setScenario] = useState<Scenario>("shared");
  const [appended, setAppended] = useState(false);
  const [reassigned, setReassigned] = useState(false);

  const select = (next: Scenario) => {
    setScenario(next);
    setAppended(false);
    setReassigned(false);
  };

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        What a name actually points at
      </figcaption>

      <div
        role="radiogroup"
        aria-label="Scenario"
        className="mt-4 inline-flex rounded-full border-[0.5px] border-learn-line bg-white p-1"
      >
        {(
          [
            { value: "shared" as Scenario, label: "Two names, one list" },
            { value: "reassign" as Scenario, label: "Reassigning a name" },
          ]
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={scenario === option.value}
            onClick={() => select(option.value)}
            className={`learn-focusable rounded-full px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
              scenario === option.value
                ? "bg-learn-inverse text-learn-on-inverse"
                : "text-learn-muted hover:text-learn-strong"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[360px]"
          role="img"
          aria-label={
            scenario === "shared"
              ? appended
                ? "a and b both point at the same list, which now reads 1, 2, 3, 4 after appending through b."
                : "a and b both point at the same list, reading 1, 2, 3."
              : reassigned
                ? "a now points at a new value, 5. b still points at the original value, 3."
                : "a and b both point at the value 3."
          }
        >
          {scenario === "shared" ? (
            <>
              <circle cx={60} cy={60} r={22} fill="var(--learn-quiet)" stroke="var(--learn-ink)" strokeWidth={1.4} />
              <text x={60} y={65} textAnchor="middle" fontSize={16} fontWeight={600} fill="var(--learn-ink)">a</text>
              <circle cx={60} cy={140} r={22} fill="var(--learn-quiet)" stroke="var(--learn-ink)" strokeWidth={1.4} />
              <text x={60} y={145} textAnchor="middle" fontSize={16} fontWeight={600} fill="var(--learn-ink)">b</text>

              <path d="M82 60 L280 95" stroke="var(--learn-ink-subtle)" strokeWidth={1.6} fill="none" markerEnd="url(#arrow)" />
              <path d="M82 140 L280 105" stroke="var(--learn-ink-subtle)" strokeWidth={1.6} fill="none" markerEnd="url(#arrow)" />

              <rect x={290} y={70} width={110} height={60} rx={8} fill="var(--learn-surface)" stroke="var(--learn-accent)" strokeWidth={1.6} />
              <text x={345} y={106} textAnchor="middle" fontSize={14} fontFamily="var(--learn-font-mono)" fill="var(--learn-strong)">
                {appended ? "[1,2,3,4]" : "[1,2,3]"}
              </text>
            </>
          ) : (
            <>
              <circle cx={60} cy={60} r={22} fill="var(--learn-quiet)" stroke="var(--learn-ink)" strokeWidth={1.4} />
              <text x={60} y={65} textAnchor="middle" fontSize={16} fontWeight={600} fill="var(--learn-ink)">a</text>
              <circle cx={60} cy={140} r={22} fill="var(--learn-quiet)" stroke="var(--learn-ink)" strokeWidth={1.4} />
              <text x={60} y={145} textAnchor="middle" fontSize={16} fontWeight={600} fill="var(--learn-ink)">b</text>

              <path
                d={reassigned ? "M82 60 L280 55" : "M82 60 L280 105"}
                stroke="var(--learn-ink-subtle)"
                strokeWidth={1.6}
                fill="none"
                markerEnd="url(#arrow)"
              />
              <path d="M82 140 L280 105" stroke="var(--learn-ink-subtle)" strokeWidth={1.6} fill="none" markerEnd="url(#arrow)" />

              <rect x={290} y={70} width={90} height={60} rx={8} fill="var(--learn-surface)" stroke="var(--learn-accent)" strokeWidth={1.6} />
              <text x={335} y={106} textAnchor="middle" fontSize={16} fontFamily="var(--learn-font-mono)" fill="var(--learn-strong)">3</text>

              {reassigned && (
                <>
                  <rect x={290} y={24} width={90} height={44} rx={8} fill="var(--learn-surface)" stroke="var(--learn-accent)" strokeWidth={1.6} />
                  <text x={335} y={52} textAnchor="middle" fontSize={16} fontFamily="var(--learn-font-mono)" fill="var(--learn-strong)">5</text>
                </>
              )}
            </>
          )}

          <defs>
            <marker id="arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="var(--learn-ink-subtle)" />
            </marker>
          </defs>
        </svg>
      </div>

      {scenario === "shared" ? (
        <>
          <button
            type="button"
            onClick={() => setAppended((v) => !v)}
            className="learn-focusable mt-2 rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
          >
            {appended ? "Undo b.append(4)" : "Run b.append(4)"}
          </button>
          <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
            {appended
              ? "a and b were never two lists. There was one list, and two names pointing at it — so a sees the append too."
              : "a and b point at the same list right now. Append through b and watch what a sees."}
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setReassigned((v) => !v)}
            className="learn-focusable mt-2 rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-sm font-medium text-learn-muted transition-colors hover:text-learn-strong motion-reduce:transition-none"
          >
            {reassigned ? "Undo a = 5" : "Run a = 5"}
          </button>
          <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
            {reassigned
              ? "a now points at a new value, 5. The 3 has not changed — b still points at it. Reassignment moves an arrow, it does not edit a value."
              : "a and b both point at 3 right now. Reassign a and watch which arrow moves."}
          </p>
        </>
      )}
    </figure>
  );
}
