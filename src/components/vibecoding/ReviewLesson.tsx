"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Reveal } from "@/components/Reveal";

interface Issue {
  id: string;
  token: string;
  explanation: string;
}

const ISSUES: Record<string, Issue> = {
  secret: {
    id: "secret",
    token: '"sk_live_51Hc8x7KLjq3mZ"',
    explanation:
      "A real API key, hardcoded and committed to the repo. Anyone with read access to the code can now use it. Move it to an environment variable.",
  },
  offByOne: {
    id: "offByOne",
    token: "<=",
    explanation:
      "Should be <. This loop runs one time too many and reads scores[scores.length], which is undefined, turning the total into NaN.",
  },
  divideByZero: {
    id: "divideByZero",
    token: "/ scores.length",
    explanation:
      "If scores is empty, this divides by zero and returns NaN instead of a sensible result or an error.",
  },
};

const CHECKLIST = [
  "Readability: could a teammate understand this without you explaining it?",
  "Edge cases: empty input, huge input, wrong types, network failure?",
  "Security: secrets, unsanitized input, permissions?",
  "Tests: does anything actually verify this still works?",
];

function IssueToken({
  id,
  isFound,
  onReveal,
}: {
  id: string;
  isFound: boolean;
  onReveal: (id: string) => void;
}) {
  const issue = ISSUES[id];
  return (
    <button
      type="button"
      onClick={() => onReveal(id)}
      className={`learn-focusable rounded px-1 font-mono transition-colors ${
        isFound
          ? "bg-learn-code-err text-learn-code-bg"
          : "bg-learn-code-err/25 text-learn-code-err underline decoration-dotted"
      }`}
    >
      {issue.token}
    </button>
  );
}

export function ReviewLesson() {
  const [found, setFound] = useState<Set<string>>(new Set());

  const reveal = (id: string) => {
    setFound((prev) => new Set(prev).add(id));
  };

  return (
    <div>
      <p className="text-[15px] leading-[1.6] text-learn-muted">
        AI-generated code runs, and running is not the same as correct. This
        snippet has 3 planted issues. Click on anything that looks
        suspicious to find them.
      </p>

      <div className="learn-card mt-6 overflow-hidden rounded-learn-xl p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.08em] text-learn-muted">
            average.js
          </span>
          <span className="text-xs text-learn-accent-text">
            {found.size} of {Object.keys(ISSUES).length} issues found
          </span>
        </div>

        <div className="mt-4 space-y-1 rounded-xl bg-learn-code-bg p-4 font-mono text-[13px] leading-[1.7] text-learn-code-fg">
          <p>function calculateAverage(scores) {"{"}</p>
          <p>
            {"  "}const apiKey ={" "}
            <IssueToken id="secret" isFound={found.has("secret")} onReveal={reveal} />;
          </p>
          <p>{"  "}let total = 0;</p>
          <p>
            {"  "}for (let i = 0; i{" "}
            <IssueToken id="offByOne" isFound={found.has("offByOne")} onReveal={reveal} />{" "}
            scores.length; i++) {"{"}
          </p>
          <p>{"    "}total += scores[i];</p>
          <p>{"  "}{"}"}</p>
          <p>
            {"  "}return total{" "}
            <IssueToken id="divideByZero" isFound={found.has("divideByZero")} onReveal={reveal} />;
          </p>
          <p>{"}"}</p>
        </div>

        <div className="mt-5 space-y-3">
          <AnimatePresence>
            {Array.from(found).map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="rounded-learn-md bg-learn-quiet p-4 text-[14px] leading-[1.5] text-learn-strong">
                  {ISSUES[id].explanation}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Reveal className="learn-card mt-10 rounded-learn-lg p-6 md:p-8">
        <h3 id="before-you-merge-check" className="text-lg text-learn-strong">Before you merge, check</h3>
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

      <TakeawayCard
        items={[
          "AI-generated code is a draft from a confident stranger. Review it that way.",
          "Look hardest at the edges: empty inputs, missing values, and anything touching auth or money.",
          "Anything you cannot explain line by line is not ready to ship.",
          "The review is not a formality — it is the step that makes the speed safe.",
        ]}
      />
    </div>
  );
}
