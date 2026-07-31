"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Mode = "traditional" | "vibe";

const STEPS: Record<Mode, string[]> = {
  traditional: [
    "Read the docs for the library you need",
    "Write boilerplate and imports by hand",
    "Type every line of the implementation",
    "Chase down syntax errors one at a time",
    "Run it, and hope it works",
  ],
  vibe: [
    "Describe the feature you want in plain English",
    "AI drafts a working first version",
    "You review the diff and steer it",
    "Ask follow-up prompts to refine it",
    "Ship it",
  ],
};

const TIME: Record<Mode, number> = {
  traditional: 100,
  vibe: 28,
};

export function IntroLesson() {
  const [mode, setMode] = useState<Mode>("traditional");

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        <strong className="text-[#1e3c2c]">Vibe coding</strong> is building
        software by describing what you want in natural language and letting
        an AI model generate and adjust the code, while you steer, review,
        and decide what ships. Toggle between the two workflows below to see
        what actually changes.
      </p>

      <div className="mt-8 inline-flex rounded-full border-[0.5px] border-[#e1e1e1] bg-white p-1">
        {(["traditional", "vibe"] as Mode[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              mode === option
                ? "bg-[#1e3c2c] text-[#dbefdb]"
                : "text-[#636363] hover:text-[#1e3c2c]"
            }`}
          >
            {option === "traditional" ? "Traditional coding" : "Vibe coding"}
          </button>
        ))}
      </div>

      <div className="home-card mt-6 overflow-hidden rounded-[20px] p-6 md:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[#818181]">
          <span>Relative time to ship</span>
          <span>{TIME[mode]}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
          <motion.div
            className="h-full rounded-full bg-[#3e7f5c]"
            initial={false}
            animate={{ width: `${TIME[mode]}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 space-y-3"
          >
            {STEPS[mode].map((step, index) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.3 }}
                className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#1e3c2c]"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dbefdb] text-xs font-semibold">
                  {index + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}
