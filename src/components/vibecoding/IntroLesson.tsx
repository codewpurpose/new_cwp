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
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[#636363]">
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <h3 className="text-lg text-[#1e3c2c]">Where the term comes from</h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-[#636363]">
          Former Tesla AI director Andrej Karpathy coined &ldquo;vibe
          coding&rdquo; in February 2025, describing a style of building
          software where you &ldquo;fully give in to the vibes&rdquo;: you
          describe what you want, accept AI suggestions, and iterate by
          prompting rather than typing every character yourself. The name
          stuck because it captures something real, the feel of coding
          changes, even though the underlying engineering discipline still
          matters just as much.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-10 grid gap-4 md:grid-cols-2"
      >
        <div className="home-card rounded-[16px] p-5">
          <h3 className="text-[15px] font-semibold text-[#1e3c2c]">
            Vibe coding shines for
          </h3>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.5] text-[#636363]">
            <li>Prototypes and proofs of concept</li>
            <li>One-off scripts and automations</li>
            <li>Scaffolding new UI from a description</li>
            <li>Exploring an unfamiliar library quickly</li>
          </ul>
        </div>
        <div className="home-card rounded-[16px] p-5">
          <h3 className="text-[15px] font-semibold text-[#1e3c2c]">
            Be more careful with
          </h3>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.5] text-[#636363]">
            <li>Security-critical or payment-handling code</li>
            <li>Code with tight performance budgets</li>
            <li>Anything you can&apos;t explain line by line</li>
            <li>Changes you can&apos;t easily test before shipping</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="mt-10 rounded-[16px] bg-[#1e3c2c] p-6 text-[#dbefdb] md:p-8"
      >
        <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em]">
          Key takeaways
        </h3>
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] opacity-90">
          <li>Vibe coding replaces typing with describing and reviewing.</li>
          <li>You are still responsible for what ships, the AI is not.</li>
          <li>
            It is fastest for prototypes, slowest to trust for critical
            systems.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
