"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";

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
    <div>
      <Lead>
        <strong className="text-learn-strong">Vibe coding</strong> is building
        software by describing what you want in natural language and letting
        an AI model generate and adjust the code, while you steer, review,
        and decide what ships. Toggle between the two workflows below to see
        what actually changes.
      </Lead>

      <div className="mt-8 inline-flex rounded-full border-[0.5px] border-learn-line bg-white p-1">
        {(["traditional", "vibe"] as Mode[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={`learn-focusable rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              mode === option
                ? "bg-learn-inverse text-learn-on-inverse"
                : "text-learn-muted hover:text-learn-strong"
            }`}
          >
            {option === "traditional" ? "Traditional coding" : "Vibe coding"}
          </button>
        ))}
      </div>

      <div className="learn-card mt-6 overflow-hidden rounded-learn-xl p-6 md:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-learn-muted">
          <span>Relative time to ship</span>
          <span>{TIME[mode]}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
          <motion.div
            className="h-full rounded-full bg-learn-accent"
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
                className="flex items-start gap-3 text-[15px] leading-[1.5] text-learn-strong"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-learn-quiet text-xs font-semibold">
                  {index + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>

      <LessonSection id="where-the-term-comes-from" title="Where the term comes from">
        <P>
          Former Tesla AI director Andrej Karpathy coined &ldquo;vibe
          coding&rdquo; in February 2025, describing a style of building
          software where you &ldquo;fully give in to the vibes&rdquo;: you
          describe what you want, accept AI suggestions, and iterate by
          prompting rather than typing every character yourself. The name
          stuck because it captures something real, the feel of coding
          changes, even though the underlying engineering discipline still
          matters just as much.
        </P>
        <P>
          The definition drifted fast, and it is worth naming the drift
          rather than pretending the word means one thing. Karpathy&rsquo;s
          original post described barely reading the output at all. Within
          months the term had grown into a catch-all for any development
          where an AI model is doing a meaningful share of the writing,
          careful diff-reading and test-running very much included. That
          split matters because two people can both call themselves vibe
          coders while meaning opposite things by it: one hears &ldquo;code
          without understanding it&rdquo;, the other hears &ldquo;code
          faster, understand it just as thoroughly&rdquo;. This course
          means the second one, on every page that follows.
        </P>
        <LabelRows
          rows={[
            {
              label: "Coined",
              text: "February 2025, by Andrej Karpathy, describing a specific way of working rather than a general term for AI-assisted coding.",
            },
            {
              label: "Original claim",
              text: "That you could give in to the vibes and barely look at the code it produced.",
            },
            {
              label: "How it is used now",
              text: "As a catch-all for building software with an AI model in the loop, review and testing included.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="where-it-earns-its-keep" title="Where it earns its keep, and where to slow down">
        <P>
          Neither half of that split is more &ldquo;real&rdquo; vibe coding
          than the other. What actually varies, task to task, is how much
          the approach is worth and how carefully you need to check the
          result. Both questions have the same answer: it depends what
          breaks if the AI is confidently wrong.
        </P>
        <CompareGrid
          items={[
            {
              title: "Where it earns its keep",
              tone: "positive",
              children: (
                <>
                  <p>
                    Prototypes you plan to throw away, one-off scripts, and
                    scaffolding a new screen from a description. Iteration
                    speed is the entire point here, and being wrong costs
                    you a re-prompt, not a rewrite.
                  </p>
                  <p>
                    Also anywhere you are fluent enough to read the output
                    and catch a mistake in seconds. There it is a
                    multiplier on judgement you already have, not a
                    replacement for it.
                  </p>
                </>
              ),
            },
            {
              title: "Where to slow down",
              tone: "caution",
              children: (
                <>
                  <p>
                    Security-critical or payment-handling code, and
                    anything with a performance budget the AI cannot
                    measure for you.
                  </p>
                  <p>
                    Anything you could not explain to a reviewer line by
                    line. If you cannot defend a change, you should not
                    ship it, regardless of who typed it.
                  </p>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-part-that-does-not-change" title="The part that does not change">
        <P>
          It is tempting to treat a generated feature as the AI&rsquo;s
          work, and therefore the AI&rsquo;s fault if it breaks. That is
          not how responsibility works here, and no amount of tooling
          progress changes it. You reviewed it, or you did not. You tested
          it, or you did not. You shipped it, or you did not. Every one of
          those is your decision, whichever tool typed the characters.
        </P>
        <Callout tone="warning" title="A rule worth keeping">
          Never ship a change you could not explain to a teammate without
          checking first. If you cannot say what a function does without
          re-reading it, you have not actually reviewed it, no matter how
          many times you clicked &ldquo;accept&rdquo;.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Vibe coding replaces typing with describing, reviewing, and steering — the review is not optional.",
          "The term drifted from Karpathy's original 'barely look at the code' framing into a catch-all for any AI-assisted development.",
          "It earns its keep fastest on throwaway prototypes and is slowest to trust on anything security-critical or hard to verify.",
          "You are responsible for what ships, whichever tool typed the characters.",
          "If you cannot explain a change to a teammate without re-reading it, you have not reviewed it yet.",
        ]}
      />
    </div>
  );
}
