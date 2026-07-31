"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface DebugStep {
  label: string;
  render: () => React.ReactElement;
}

const STEPS: DebugStep[] = [
  {
    label: "1. Hit the error",
    render: () => (
      <div className="rounded-xl bg-[#1e1e1e] p-4 font-mono text-[13px] leading-[1.6] text-[#ff8a8a]">
        <p>TypeError: Cannot read properties of undefined</p>
        <p className="text-[#9c9c9c]">at handleSubmit (Form.jsx:24:19)</p>
      </div>
    ),
  },
  {
    label: "2. Hand it to the AI",
    render: () => (
      <div className="rounded-xl bg-[#f2f2f2] p-4 text-[14px] leading-[1.5] text-[#1e3c2c]">
        &ldquo;I&apos;m getting{" "}
        <span className="font-mono">
          TypeError: Cannot read properties of undefined
        </span>{" "}
        in Form.jsx line 24, inside handleSubmit, right when the user clicks
        Submit with an empty field. Here&apos;s the function: ...&rdquo;
      </div>
    ),
  },
  {
    label: "3. Get a diagnosis",
    render: () => (
      <div className="rounded-xl bg-[#dbefdb] p-4 text-[14px] leading-[1.5] text-[#1e3c2c]">
        &ldquo;<span className="font-mono">values.email</span>{" "}
        is undefined because the field isn&apos;t initialized in state before
        the first render. Add a default value, or check for it before
        reading{" "}
        <span className="font-mono">.trim()</span>
        {" "}on it.&rdquo;
      </div>
    ),
  },
  {
    label: "4. Apply & verify",
    render: () => (
      <div className="flex items-center gap-3 rounded-xl bg-[#1e3c2c] p-4 text-[14px] text-[#dbefdb]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dbefdb] text-[#1e3c2c]">
          ✓
        </span>
        Fix applied. Form submits cleanly, all tests passing.
      </div>
    ),
  },
];

export function DebuggingLesson() {
  const [step, setStep] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        An error message is not a dead end, it is information. Step through
        how a real bug gets diagnosed and fixed with AI in the loop.
      </p>

      <div className="mt-8 flex items-center gap-2">
        {STEPS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStep(index)}
            aria-label={item.label}
            className="h-2 flex-1 overflow-hidden rounded-full bg-[#f2f2f2]"
          >
            <motion.div
              className="h-full bg-[#3e7f5c]"
              initial={false}
              animate={{ width: index <= step ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      <div className="home-card mt-6 overflow-hidden rounded-[20px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.08em] text-[#818181]">
          {STEPS[step].label}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
          >
            {STEPS[step].render()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="home-btn home-btn-outline disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={step === STEPS.length - 1}
            className="home-btn home-btn-fill disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
