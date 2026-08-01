"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Reveal } from "@/components/Reveal";

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
    <div>
      <p className="text-[15px] leading-[1.6] text-learn-muted">
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
            className="learn-focusable learn-card block w-full overflow-hidden rounded-learn-xl p-6 text-left md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-learn-sunken px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-muted">
                Generic prompt
              </span>
              <span className="text-xs text-learn-accent-text">
                {revealed[i] ? "Hide the fix ↑" : "See the fix ↓"}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.5] text-learn-strong">
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
              <div className="mt-5 border-t-[0.5px] border-learn-line pt-5">
                <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-learn-strong">
                  Context-aware prompt
                </span>
                <p className="mt-3 text-[15px] leading-[1.55] text-learn-strong">
                  &ldquo;{example.aware}&rdquo;
                </p>
                <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
                  Why it works: {example.why}
                </p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>

      <Reveal className="learn-card mt-10 rounded-learn-lg p-6 md:p-8">
        <h3 id="before-you-prompt-gather-context" className="text-lg text-learn-strong">
          Before you prompt, gather context
        </h3>
        <ul className="mt-4 space-y-2">
          {CONTEXT_CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[14px] leading-[1.5] text-learn-strong"
            >
              <span className="mt-0.5 text-learn-accent-text">→</span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <TakeawayCard
        items={[
          "In a real repo, context is the whole game. The same prompt gets a different answer depending on what you attached.",
          "Point at the actual files. Do not make the model search for what you already know.",
          "Match the conventions that already exist rather than letting the AI invent new ones.",
          "Small, scoped changes are reviewable. Large ones are not.",
        ]}
      />
    </div>
  );
}
