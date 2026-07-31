"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface LoopStep {
  label: string;
  x: number;
  y: number;
  description: string;
  pitfall: string;
}

const STEPS: LoopStep[] = [
  {
    label: "Prompt",
    x: 160,
    y: 50,
    description:
      "Describe the change you want in plain English, with enough detail to act on: the file, the behavior, the outcome.",
    pitfall: "Common pitfall: staying so vague the AI has to guess the file or the outcome.",
  },
  {
    label: "Generate",
    x: 265,
    y: 126,
    description:
      "The AI drafts code based on your prompt and the surrounding codebase, in seconds instead of hours.",
    pitfall: "Common pitfall: accepting the first draft before you've even read it.",
  },
  {
    label: "Review",
    x: 225,
    y: 249,
    description:
      "Read the diff like a code review. Does it actually do what you asked? Is anything missing or wrong?",
    pitfall: "Common pitfall: skimming the diff instead of actually reading it.",
  },
  {
    label: "Refine",
    x: 95,
    y: 249,
    description:
      "Send a follow-up prompt to fix what's off, tighten the scope, or handle an edge case you spotted.",
    pitfall: "Common pitfall: starting over with a whole new prompt instead of a targeted follow-up.",
  },
  {
    label: "Ship",
    x: 55,
    y: 126,
    description:
      "Once it's right, commit it and move to the next thing. The loop starts again on the next feature.",
    pitfall: "Common pitfall: shipping without running it yourself first.",
  },
];

interface CaseStep {
  step: string;
  note: string;
}

const CASE_STUDY: CaseStep[] = [
  { step: "Prompt", note: "\"Add a dark mode toggle to the settings page that saves the choice in localStorage.\"" },
  { step: "Generate", note: "AI adds a toggle component, a theme context, and CSS variables for both themes." },
  { step: "Review", note: "The toggle works, but the theme resets on every page reload." },
  { step: "Refine", note: "\"The theme isn't persisting on reload. Read the saved value from localStorage on load.\"" },
  { step: "Ship", note: "Reload actually keeps the theme now. Commit it." },
];

export function LoopLesson() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        Vibe coding is not one prompt and done, it is a loop. Click each stop
        to see what happens there.
      </p>

      <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="relative h-[320px] w-[320px] shrink-0">
          <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle
              cx="160"
              cy="160"
              r="110"
              fill="none"
              stroke="#e1e1e1"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          </svg>

          {STEPS.map((step, index) => (
            <button
              key={step.label}
              type="button"
              onClick={() => setActive(index)}
              style={{
                left: `${(step.x / 320) * 100}%`,
                top: `${(step.y / 320) * 100}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.span
                animate={{
                  scale: active === index ? 1.15 : 1,
                  backgroundColor: active === index ? "#1e3c2c" : "#ffffff",
                  color: active === index ? "#dbefdb" : "#1e3c2c",
                }}
                transition={{ duration: 0.25 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-[1.5px] border-[#1e3c2c] text-center text-sm font-semibold shadow-sm"
              >
                {step.label}
              </motion.span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="home-card w-full rounded-[20px] p-6 md:p-8"
        >
          <span className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]">
            Step {active + 1} of {STEPS.length}
          </span>
          <h3 className="mt-4 text-xl">{STEPS[active].label}</h3>
          <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
            {STEPS[active].description}
          </p>
          <p className="mt-3 text-[13px] leading-[1.5] text-[#3e7f5c]">
            {STEPS[active].pitfall}
          </p>
          <button
            type="button"
            onClick={() => setActive((active + 1) % STEPS.length)}
            className="home-arrow-link mt-5"
          >
            Next step <span className="home-row-arrow text-[#397554]">→</span>
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <h3 className="text-lg text-[#1e3c2c]">Applied to a real example</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#636363]">
          Here is the same loop, start to finish, for one small feature.
        </p>
        <div className="mt-5 space-y-3">
          {CASE_STUDY.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="home-card flex items-start gap-4 rounded-[14px] p-4"
            >
              <span className="mt-0.5 shrink-0 rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#1e3c2c]">
                {item.step}
              </span>
              <p className="text-[14px] leading-[1.5] text-[#1e3c2c]">
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
