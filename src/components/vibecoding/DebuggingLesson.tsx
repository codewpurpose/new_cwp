"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { Reveal } from "@/components/Reveal";

interface DebugStep {
  label: string;
  render: () => React.ReactElement;
}

const CRASH_STEPS: DebugStep[] = [
  {
    label: "1. Hit the error",
    render: () => (
      <div className="rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.6] text-learn-code-err">
        <p>TypeError: Cannot read properties of undefined</p>
        <p className="text-learn-code-dim">at handleSubmit (Form.jsx:24:19)</p>
      </div>
    ),
  },
  {
    label: "2. Hand it to the AI",
    render: () => (
      <div className="rounded-xl bg-learn-sunken p-4 text-[14px] leading-[1.5] text-learn-strong">
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
      <div className="rounded-xl bg-learn-quiet p-4 text-[14px] leading-[1.5] text-learn-strong">
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
      <div className="flex items-center gap-3 rounded-xl bg-learn-inverse p-4 text-[14px] text-learn-on-inverse">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-learn-quiet text-learn-strong">
          ✓
        </span>
        Fix applied. Form submits cleanly, all tests passing.
      </div>
    ),
  },
];

const LOGIC_STEPS: DebugStep[] = [
  {
    label: "1. Notice something's off",
    render: () => (
      <div className="rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.6] text-learn-code-warn">
        <p>Page 1: items 1-10</p>
        <p>Page 2: items 1-10 (again!)</p>
        <p className="text-learn-code-dim">No crash, no error, just wrong data</p>
      </div>
    ),
  },
  {
    label: "2. Hand it to the AI",
    render: () => (
      <div className="rounded-xl bg-learn-sunken p-4 text-[14px] leading-[1.5] text-learn-strong">
        &ldquo;My paginated list shows the exact same items on every page.
        Page 2 should start at item 11, but it shows items 1-10 again. Here&apos;s
        my slicing code: <span className="font-mono">items.slice(page * pageSize, pageSize)</span>&rdquo;
      </div>
    ),
  },
  {
    label: "3. Get a diagnosis",
    render: () => (
      <div className="rounded-xl bg-learn-quiet p-4 text-[14px] leading-[1.5] text-learn-strong">
        &ldquo;The second argument to{" "}
        <span className="font-mono">.slice()</span> is an end index, not a
        count, so you&apos;re always slicing up to{" "}
        <span className="font-mono">pageSize</span>. You want{" "}
        <span className="font-mono">
          items.slice((page - 1) * pageSize, page * pageSize)
        </span>
        .&rdquo;
      </div>
    ),
  },
  {
    label: "4. Apply & verify",
    render: () => (
      <div className="flex items-center gap-3 rounded-xl bg-learn-inverse p-4 text-[14px] text-learn-on-inverse">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-learn-quiet text-learn-strong">
          ✓
        </span>
        Fix applied. Page 2 now shows items 11-20.
      </div>
    ),
  },
];

const SCENARIOS = {
  crash: { label: "Scenario 1: A crash", steps: CRASH_STEPS },
  logic: { label: "Scenario 2: Wrong output", steps: LOGIC_STEPS },
} as const;

const CHECKLIST = [
  "What's the exact error and full stack trace, if there is one?",
  "What did you expect to happen vs. what actually happened?",
  "What changed recently, or what input triggers it?",
  "Can you share the smallest piece of code that reproduces it?",
];

export function DebuggingLesson() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>("crash");
  const [step, setStep] = useState(0);
  const STEPS = SCENARIOS[scenario].steps;

  const selectScenario = (key: keyof typeof SCENARIOS) => {
    setScenario(key);
    setStep(0);
  };

  return (
    <div>
      <Lead>
        An error message feels like a dead end. It is closer to the opposite — the most
        specific description of the bug you will get from anywhere, handed to you for free.
        Step through how a real one gets diagnosed and fixed with AI in the loop.
      </Lead>

      <div className="mt-6 inline-flex rounded-full border-[0.5px] border-learn-line bg-white p-1">
        {(Object.keys(SCENARIOS) as (keyof typeof SCENARIOS)[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => selectScenario(key)}
            className={`learn-focusable rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              scenario === key
                ? "bg-learn-inverse text-learn-on-inverse"
                : "text-learn-muted hover:text-learn-strong"
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStep(index)}
            aria-label={item.label}
            className="learn-focusable h-2 flex-1 overflow-hidden rounded-full bg-learn-sunken"
          >
            <motion.div
              className="h-full bg-learn-accent"
              initial={false}
              animate={{ width: index <= step ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      <div className="learn-card mt-6 overflow-hidden rounded-learn-xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.08em] text-learn-muted">
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

      <Reveal className="learn-card mt-10 rounded-learn-lg p-6 md:p-8">
        <h3 id="questions-to-ask-when-debugging" className="text-lg text-learn-strong">
          Questions to ask when debugging
        </h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-learn-muted">
          A good bug report to an AI looks a lot like a good bug report to a
          human. Answer these before you hit send.
        </p>
        <ul className="mt-4 space-y-2">
          {CHECKLIST.map((item) => (
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

      <LessonSection id="the-drift-loop" title="When each fix creates the next bug">
        <P>
          There is a specific way this goes wrong. You paste an error, the AI hands back a fix
          that sounds right, you apply it, and a different error appears one line downstream.
          You paste that one too. Three exchanges later you are patching symptoms in a file the
          original bug never touched, and nobody — you or the model — remembers what the actual
          problem was.
        </P>
        <P>
          It happens because each new error looks, to the model, like a fresh and separate
          puzzle. It reasons about what is in front of it, which is often locally correct and
          globally wrong: the fix removes the crash without touching the reason the value was
          wrong in the first place. The cause does not get fixed. It moves.
        </P>
        <Callout tone="warning" title="The tell">
          If you cannot state the original bug without scrolling back up the conversation, you
          are already deep in it. That is the moment to stop, not the moment to paste the next
          stack trace.
        </Callout>
      </LessonSection>

      <LessonSection id="getting-unstuck" title="Stop feeding it, start narrowing it">
        <P>
          After two fixes in a row miss, switch modes. Feeding the model another error keeps you
          moving forward through symptoms; narrowing works backward toward the cause.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Shrink it to the smallest failing case",
              detail:
                "Strip the app down to the least code that still reproduces the bug. Understanding every line you keep is usually enough on its own to find it.",
            },
            {
              label: "Separate what you know from what you were told",
              detail:
                "“Cannot read properties of undefined” is a fact. “It's probably the state initialisation” was a guess two fixes ago that turned out to be wrong.",
            },
            {
              label: "Check the value directly",
              detail:
                "A log statement or a debugger breakpoint at the point of failure answers the question instead of theorising about it again.",
              note: "One printed value ends more of these loops than another prompt does.",
            },
            {
              label: "Start a fresh conversation with what you found",
              detail:
                "Paste the minimal repro and the logged value, not the accumulated thread. A clean context reasons about the real cause instead of defending its last three guesses.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "An error message is data. Paste the whole thing, not your summary of it.",
          "Give the AI the trigger, the expectation, and the actual result — the same three things a bug report needs.",
          "“It says it is fixed” is not the same as fixed. Reproduce the original failure and confirm it is gone.",
          "Two fixes in a row that each produce a new error is a sign you are drifting from the cause, not closing in on it.",
          "When you cannot restate the original bug from memory, stop pasting errors and go check a value yourself.",
        ]}
      />
    </div>
  );
}
