"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
];

export function PromptsLesson() {
  const [revealed, setRevealed] = useState<boolean[]>(
    () => EXAMPLES.map(() => false)
  );

  const toggle = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
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
            className="home-card block w-full overflow-hidden rounded-[20px] p-6 text-left md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[#f2f2f2] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#818181]">
                Vague prompt
              </span>
              <span className="text-xs text-[#3e7f5c]">
                {revealed[i] ? "Hide the fix ↑" : "See the fix ↓"}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#1e3c2c]">
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
              <div className="mt-5 border-t-[0.5px] border-[#e1e1e1] pt-5">
                <span className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]">
                  Specific prompt
                </span>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#1e3c2c]">
                  &ldquo;{example.specific}&rdquo;
                </p>
                <p className="mt-3 text-[13px] leading-[1.5] text-[#818181]">
                  Why it works: {example.why}
                </p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </div>
  );
}
