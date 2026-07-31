"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface Example {
  generic: string;
  aware: string;
  why: string;
}

const EXAMPLES: Example[] = [
  {
    generic: "Add a login page",
    aware:
      "Add a login page following the same pattern as src/app/signup/page.tsx. Reuse the <AuthForm> component from src/components/AuthForm.tsx, and use our existing useAuth() hook for the session.",
    why: "Naming the existing pattern and component to mirror means the AI matches your codebase's conventions instead of inventing new ones that don't fit.",
  },
  {
    generic: "Make the dashboard faster",
    aware:
      "The dashboard re-fetches all 3 API calls every time any filter changes. Memoize them with our existing useDebouncedFetch hook in src/hooks/useDebouncedFetch.ts, so only the changed filter re-fetches.",
    why: "Pointing at the actual bottleneck and an existing utility stops the AI from reaching for a new dependency to solve a problem you already have tools for.",
  },
  {
    generic: "Add tests for this function",
    aware:
      "Add a test for calculateAverage in src/utils/math.ts, following the same Vitest structure as the existing tests in src/utils/math.test.ts.",
    why: "Matching the existing test structure means the new test actually runs alongside the others, instead of introducing a second testing pattern.",
  },
];

const CONTEXT_CHECKLIST = [
  "Which files are actually relevant, not just the one you're staring at?",
  "Is there an existing pattern, component, or hook to point at?",
  "What naming and styling conventions does this codebase already use?",
  "What tests or checks should still pass after the change?",
];

export function CodebaseLesson() {
  const [revealed, setRevealed] = useState<boolean[]>(
    () => EXAMPLES.map(() => false)
  );

  const toggle = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        &ldquo;Add a login page&rdquo; means something very different in a
        fresh repo versus a 50,000-line one. In an existing codebase, the AI
        can only match your patterns if you tell it what they are. Click
        each card to see the difference.
      </p>

      <div className="mt-8 space-y-4">
        {EXAMPLES.map((example, i) => (
          <button
            key={example.generic}
            type="button"
            onClick={() => toggle(i)}
            className="home-card block w-full overflow-hidden rounded-[20px] p-6 text-left md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[#f2f2f2] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#636363]">
                Generic prompt
              </span>
              <span className="text-xs text-[#3e7f5c]">
                {revealed[i] ? "Hide the fix ↑" : "See the fix ↓"}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#1e3c2c]">
              &ldquo;{example.generic}&rdquo;
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
                  Context-aware prompt
                </span>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#1e3c2c]">
                  &ldquo;{example.aware}&rdquo;
                </p>
                <p className="mt-3 text-[13px] leading-[1.5] text-[#636363]">
                  Why it works: {example.why}
                </p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="home-card mt-10 rounded-[16px] p-6 md:p-8"
      >
        <h3 className="text-lg text-[#1e3c2c]">
          Before you prompt, gather context
        </h3>
        <ul className="mt-4 space-y-2">
          {CONTEXT_CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#1e3c2c]"
            >
              <span className="mt-0.5 text-[#3e7f5c]">→</span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
