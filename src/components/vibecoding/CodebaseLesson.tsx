"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

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
  "Does something like this already exist elsewhere in the repo, that you should point at instead of letting it get invented twice?",
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
      <Lead>
        You assume more context always helps: paste in the whole repository and let the model
        sort out what matters. That is backwards. There is more code in a real repository than
        fits in front of the model at once, so somebody has to decide what it actually sees —
        and if that somebody is not you, it will guess.
      </Lead>

      <LessonSection id="the-repository-does-not-fit" title="The repository does not fit">
        <P>
          A fresh project fits inside a single request more or less completely, which is why
          the first demo everyone tries feels effortless. A real codebase does not. Fifty
          thousand lines of TypeScript is several times too large to hand over whole, before
          you have counted the conversation you are already having and the reply you are
          waiting on.
        </P>
        <P>
          So the model works from a fraction of the repository: whatever it searched for,
          whatever you attached, whatever survived from earlier in the conversation. That
          fraction is rarely the whole picture, and the model has no way to tell you what it is
          missing, because it cannot see what it cannot see.
        </P>
        <Callout tone="warning" title="The failure mode particular to large repos">
          It invents a second implementation of something that already exists forty files away,
          because it never saw the first one. A new date formatter next to three existing ones.
          A second validation helper doing almost, but not quite, the same thing as the first.
          The fix is not a longer prompt. It is asking it to look before it writes.
        </Callout>
        <P>
          &ldquo;Add a login page&rdquo; means something very different in a fresh repo versus a
          50,000-line one, for exactly this reason. In an existing codebase, the AI can only
          match your patterns if you tell it what they are. Click each card below to see the
          difference.
        </P>
      </LessonSection>

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

      <LessonSection id="work-in-slices-not-sweeps" title="Work in slices, not sweeps" delay={0.05}>
        <P>
          The strategies that follow all come from the same constraint: since the model cannot
          hold the whole repository, keep every request small enough that what it does hold is
          enough.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Let it search before it writes",
              detail:
                "Most tools can grep or search the repo on their own. Ask explicitly when it matters: \"check whether something like this already exists before creating it.\"",
            },
            {
              label: "Point at the entry point, not the whole feature",
              detail:
                "Name the file that should change and a similar one that already does it right, rather than describing the feature and hoping it finds the same files you would have.",
            },
            {
              label: "One module at a time",
              detail:
                "Scope a request to a single route or component tree instead of the whole app. A prompt that spans the codebase is a prompt nothing can verify against.",
            },
            {
              label: "Let a rules file carry the constants",
              detail:
                "Conventions that apply everywhere do not need to be re-explained per request, which frees the window's budget for what is actually specific to this one.",
            },
          ]}
        />
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Before adding a new date formatter, search the repo for an
existing one and reuse it if you find one.`}
        />
      </LessonSection>

      <LessonSection id="before-you-prompt-gather-context" title="Before you prompt, gather context" delay={0.1}>
        <ChecklistCard items={CONTEXT_CHECKLIST} />
      </LessonSection>

      <TakeawayCard
        items={[
          "A real repository does not fit in front of the model at once — something has to decide what it sees, and by default that something is you.",
          "Point at the actual files. Do not make the model search for what you already know it needs.",
          "Match the conventions that already exist rather than letting the AI invent new ones.",
          "Scope each request to one module or one slice. A prompt that spans the whole app is unreviewable and unverifiable.",
          "The failure mode specific to large repos is a second implementation of something that already exists elsewhere. Ask it to search before it writes.",
        ]}
      />
    </div>
  );
}
