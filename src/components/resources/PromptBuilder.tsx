"use client";

import { useId, useState } from "react";
import { CopyPromptButton } from "@/components/resources/CopyPromptButton";
import { BEGINNER_NOTE, PROMPT_GOALS, type PromptGoal } from "@/components/resources/ai-coding-content";

type Values = Record<string, string>;

function valueOf(values: Values, goal: PromptGoal, key: string) {
  return (values[`${goal.id}.${key}`] ?? "").trim();
}

function blankFor(goal: PromptGoal, key: string) {
  const field = goal.fields.find((f) => f.key === key);
  return `[${field?.placeholder ?? key}]`;
}

function buildText(goal: PromptGoal, values: Values, beginner: boolean) {
  const body = goal.parts
    .map((part) => (typeof part === "string" ? part : valueOf(values, goal, part.field) || blankFor(goal, part.field)))
    .join("");
  return beginner ? body + BEGINNER_NOTE : body;
}

const INPUT =
  "mt-1.5 w-full rounded-xl border border-[var(--home-hairline-strong)] bg-white px-3.5 py-2.5 text-[15px] leading-[1.5] text-[var(--home-ink)] placeholder:text-[var(--home-ink-quiet)] transition-[border-color,box-shadow] duration-150 focus:border-[#3e7f5c] focus:outline-none focus:ring-[3px] focus:ring-[#dbefdb] motion-reduce:transition-none";

/**
 * Pick a goal, fill in the blanks, copy the prompt. Everything stays in the
 * browser: nothing typed here is sent anywhere. Blanks left empty stay in the
 * prompt as [brackets] so it is still usable as a template.
 */
export function PromptBuilder() {
  const uid = useId();
  const [goalId, setGoalId] = useState(PROMPT_GOALS[0].id);
  const [values, setValues] = useState<Values>({});
  const [beginner, setBeginner] = useState(true);

  const goal = PROMPT_GOALS.find((g) => g.id === goalId) ?? PROMPT_GOALS[0];
  const text = buildText(goal, values, beginner);

  const setValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [`${goal.id}.${key}`]: value }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
      {/* Inputs */}
      <div>
        <fieldset>
          <legend className="text-sm font-medium text-[var(--home-ink)]">1. What do you need?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROMPT_GOALS.map((g) => {
              const selected = g.id === goal.id;
              return (
                <label
                  key={g.id}
                  className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#3e7f5c]/40 motion-reduce:transition-none ${
                    selected
                      ? "border-[#3e7f5c] bg-[#dbefdb] text-[var(--home-moss)]"
                      : "border-[var(--home-hairline-strong)] bg-white text-[var(--home-ink-soft)] hover:border-[#3e7f5c] hover:text-[var(--home-ink)]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${uid}-goal`}
                    value={g.id}
                    checked={selected}
                    onChange={() => setGoalId(g.id)}
                    className="sr-only"
                  />
                  {g.label}
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-[var(--home-ink-quiet)]">{goal.hint}</p>
        </fieldset>

        <div className="mt-7">
          <p className="text-sm font-medium text-[var(--home-ink)]">2. Fill in the blanks</p>
          <div className="mt-3 space-y-4">
            {goal.fields.map((field) => {
              const id = `${uid}-${goal.id}-${field.key}`;
              const value = values[`${goal.id}.${field.key}`] ?? "";
              return (
                <div key={id}>
                  <label htmlFor={id} className="text-sm text-[var(--home-ink-soft)]">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      id={id}
                      rows={3}
                      value={value}
                      placeholder={field.placeholder}
                      spellCheck={false}
                      onChange={(e) => setValue(field.key, e.target.value)}
                      className={`${INPUT} home-mono resize-y text-[13px]`}
                    />
                  ) : (
                    <input
                      id={id}
                      type="text"
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(e) => setValue(field.key, e.target.value)}
                      className={INPUT}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-[var(--home-ink-soft)]">
            <input
              type="checkbox"
              checked={beginner}
              onChange={(e) => setBeginner(e.target.checked)}
              className="size-4 accent-[#3e7f5c]"
            />
            Ask for beginner-friendly explanations
          </label>
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col rounded-[20px] border border-[#3e7f5c]/25 bg-[#dbefdb]/55 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-[var(--home-moss)]">3. Copy your prompt</p>
          <CopyPromptButton text={text} title={goal.label} />
        </div>
        <pre
          aria-label={`Prompt: ${goal.label}`}
          className="home-mono mt-4 flex-1 whitespace-pre-wrap break-words rounded-xl border border-[var(--home-hairline)] bg-white p-4 text-[13px] leading-[1.65] text-[var(--home-ink)]"
        >
          {goal.parts.map((part, i) => {
            if (typeof part === "string") return part;
            const filled = valueOf(values, goal, part.field);
            return filled ? (
              <span key={i}>{filled}</span>
            ) : (
              <span key={i} className="rounded bg-[var(--home-pistachio)] px-1 text-[var(--home-moss)]">
                {blankFor(goal, part.field)}
              </span>
            );
          })}
          {beginner && BEGINNER_NOTE}
        </pre>
        <p className="mt-3 text-xs leading-[1.5] text-[var(--home-ink-quiet)]">
          Paste it into any AI chat. What you type here stays on this page.
        </p>
      </div>
    </div>
  );
}
