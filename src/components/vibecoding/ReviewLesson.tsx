"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
      className={`rounded px-1 font-mono transition-colors ${
        isFound
          ? "bg-[#ff8a8a] text-[#1e1e1e]"
          : "bg-[#ff8a8a]/25 text-[#ff8a8a] underline decoration-dotted"
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
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        AI-generated code runs, and running is not the same as correct. This
        snippet has 3 planted issues. Click on anything that looks
        suspicious to find them.
      </p>

      <div className="home-card mt-6 overflow-hidden rounded-[20px] p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.08em] text-[#636363]">
            average.js
          </span>
          <span className="text-xs text-[#3e7f5c]">
            {found.size} of {Object.keys(ISSUES).length} issues found
          </span>
        </div>

        <div className="mt-4 space-y-1 rounded-xl bg-[#1e1e1e] p-4 font-mono text-[13px] leading-[1.7] text-[#e8e8e8]">
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
                <div className="rounded-[12px] bg-[#dbefdb] p-4 text-[14px] leading-[1.5] text-[#1e3c2c]">
                  {ISSUES[id].explanation}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="home-card mt-10 rounded-[16px] p-6 md:p-8"
      >
        <h3 className="text-lg text-[#1e3c2c]">Before you merge, check</h3>
        <ul className="mt-4 space-y-2">
          {CHECKLIST.map((item) => (
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
