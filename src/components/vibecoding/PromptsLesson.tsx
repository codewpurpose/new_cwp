"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Reveal } from "@/components/Reveal";

interface PromptExample {
  vague: string;
  specific: string;
  why: string;
}

const EXAMPLES: PromptExample[] = [
  {
    vague: "Make my website better",
    specific:
      "The signup button on my homepage is hard to find on mobile. Move it above the fold and make it a solid green button with white text.",
    why: "Naming the exact element, the problem, and the device gives the AI something concrete to change instead of guessing.",
  },
  {
    vague: "Fix the bug",
    specific:
      "When I click \"Submit\" on the contact form with an empty email field, the page crashes instead of showing a validation error. Add a check that shows \"Email is required\" and stops the crash.",
    why: "Describing the trigger, the current (wrong) behavior, and the expected behavior turns a guess into a spec.",
  },
  {
    vague: "Add a login feature",
    specific:
      "Add email/password login using our existing users table. On success, redirect to /dashboard. On failure, show \"Invalid email or password\" under the form.",
    why: "Naming the data source and both outcomes (success and failure) means the AI does not have to invent the missing half.",
  },
  {
    vague: "Clean up this file",
    specific:
      "Refactor UserCard.jsx to split the avatar, name, and bio into three small components. Keep the same props and exported name, and don't change any styling.",
    why: "Saying what to split into, and what must stay the same, stops the AI from rewriting more than you asked for.",
  },
];

const ANATOMY = [
  {
    label: "Context",
    text: "I have a Next.js blog with posts stored in a posts array in src/lib/posts.ts.",
  },
  {
    label: "Goal",
    text: "Add a search bar above the post list that filters posts by title as the user types.",
  },
  {
    label: "Constraints",
    text: "Don't add any new dependencies, use plain React state.",
  },
  {
    label: "Format",
    text: "Show me the full updated component.",
  },
];

const CHECKLIST = [
  "Named the specific file, component, or page",
  "Described the current (wrong) behavior, if fixing something",
  "Described the expected outcome, including edge cases",
  "Said what should NOT change",
];

export function PromptsLesson() {
  const [revealed, setRevealed] = useState<boolean[]>(
    () => EXAMPLES.map(() => false)
  );
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<boolean[]>(
    () => CHECKLIST.map(() => false)
  );

  const toggle = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const toggleCheck = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div>
      <p className="text-[15px] leading-[1.6] text-learn-muted">
        A vague prompt gets a vague answer. Click each card to see how adding
        specifics, the element, the trigger, the expected outcome, changes
        the result.
      </p>

      <div className="mt-8 space-y-4">
        {EXAMPLES.map((example, i) => (
          <button
            key={example.vague}
            type="button"
            onClick={() => toggle(i)}
            className="learn-focusable learn-card block w-full overflow-hidden rounded-learn-xl p-6 text-left md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-learn-sunken px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-muted">
                Vague prompt
              </span>
              <span className="text-xs text-learn-accent-text">
                {revealed[i] ? "Hide the fix ↑" : "See the fix ↓"}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.5] text-learn-strong">
              &ldquo;{example.vague}&rdquo;
            </p>

            <motion.div
              initial={false}
              animate={{
                height: revealed[i] ? "auto" : 0,
                opacity: revealed[i] ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t-[0.5px] border-learn-line pt-5">
                <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-strong">
                  Specific prompt
                </span>
                <p className="mt-3 text-[15px] leading-[1.55] text-learn-strong">
                  &ldquo;{example.specific}&rdquo;
                </p>
                <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
                  Why it works: {example.why}
                </p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>

      <Reveal className="mt-10">
        <h3 id="anatomy-of-a-good-prompt" className="text-lg text-learn-strong">Anatomy of a good prompt</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-learn-muted">
          Most working prompts break down into the same four parts. You don&apos;t
          need all four every time, but the more of them you&apos;re missing, the
          more the AI is guessing.
        </p>
        <div className="learn-card mt-5 space-y-4 rounded-learn-lg p-5 md:p-6">
          {ANATOMY.map((part) => (
            <div key={part.label} className="flex gap-4">
              <span className="mt-0.5 w-24 shrink-0 rounded-full bg-learn-quiet px-2.5 py-1 text-center text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
                {part.label}
              </span>
              <p className="text-[14px] leading-[1.5] text-learn-strong">
                {part.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <h3 id="try-it-yourself" className="text-lg text-learn-strong">Try it yourself</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-learn-muted">
          Draft a prompt for something you actually want to build or fix,
          then check it against the list below.
        </p>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Describe what you want to build or fix..."
          rows={4}
          className="mt-4 w-full rounded-learn-lg border-[0.5px] border-learn-line bg-white p-4 text-[14px] leading-[1.5] text-learn-strong placeholder:text-learn-subtle learn-focusable focus:border-learn-accent"
        />
        <ul className="mt-4 space-y-2">
          {CHECKLIST.map((item, i) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggleCheck(i)}
                className="learn-focusable flex w-full items-start gap-3 text-left"
              >
                <span
                  data-checked={checked[i] || undefined}
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-learn-line bg-white text-[11px] text-white transition-colors duration-200 data-[checked]:border-learn-accent data-[checked]:bg-learn-accent motion-reduce:transition-none"
                >
                  {checked[i] ? "✓" : ""}
                </span>
                <span
                  className={`text-[14px] leading-[1.5] ${
                    checked[i] ? "text-learn-muted line-through" : "text-learn-strong"
                  }`}
                >
                  {item}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <TakeawayCard
        items={[
          "Name the file, the current behaviour, and the expected behaviour. Missing any of the three means the AI guesses.",
          "Saying what must NOT change is as useful as saying what should.",
          "A prompt that would not brief a human will not brief a model either.",
          "If the reply is wrong twice in a row, the prompt is the problem, not the model.",
        ]}
      />
    </div>
  );
}
