"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TOOL_MARKS } from "@/components/vibecoding/ToolMarks";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Reveal } from "@/components/Reveal";

interface Tool {
  key: string;
  name: string;
  worksIn: string;
  sees: string;
  blurb: string;
}

const TOOLS: Tool[] = [
  {
    key: "cursor",
    name: "Cursor",
    worksIn: "Your editor",
    sees: "Whole repo",
    blurb: "An AI-first code editor that edits files directly and understands your whole project.",
  },
  {
    key: "copilot",
    name: "GitHub Copilot",
    worksIn: "Your editor",
    sees: "Open file + repo search",
    blurb: "Autocomplete and a chat panel inside your existing editor, VS Code, JetBrains, and more.",
  },
  {
    key: "claude-code",
    name: "Claude Code",
    worksIn: "Your terminal",
    sees: "Whole repo + can run commands",
    blurb: "A command-line agent that reads your repo, runs tests, and makes multi-file changes on its own.",
  },
  {
    key: "chat",
    name: "ChatGPT / Claude.ai",
    worksIn: "Your browser",
    sees: "Only what you paste",
    blurb: "A chat window for quick questions or snippets, with no access to your files or terminal.",
  },
];

interface Task {
  key: string;
  label: string;
  recommended: string[];
  why: string;
}

const TASKS: Task[] = [
  {
    key: "new-app",
    label: "I'm starting a brand-new app",
    recommended: ["cursor", "claude-code"],
    why: "Both can scaffold many files at once and already see the whole (small) project as it grows.",
  },
  {
    key: "big-bug",
    label: "I'm fixing a bug in a large, existing codebase",
    recommended: ["claude-code", "cursor"],
    why: "You need something that can search across the repo to find where the bug actually lives, not just the file you have open.",
  },
  {
    key: "quick-question",
    label: "I just want to ask a quick coding question",
    recommended: ["chat"],
    why: "No repo access needed, just paste the snippet and get an answer. Fastest option for a one-off question.",
  },
];

export function ToolsLesson() {
  const [taskKey, setTaskKey] = useState<string | null>(null);
  const task = TASKS.find((t) => t.key === taskKey) ?? null;

  return (
    <div>
      <p className="text-[15px] leading-[1.6] text-learn-muted">
        There is no single best AI coding tool, only the one that fits what
        you&apos;re doing right now. Pick a task below to see what fits.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TASKS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTaskKey(t.key)}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors ${
              taskKey === t.key
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-white text-learn-muted hover:text-learn-strong"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => {
          const isRecommended = task?.recommended.includes(tool.key) ?? false;
          // Colour transitions run in CSS rather than through motion, which
          // interpolates computed values and so cannot animate a var(). This
          // also brings them under prefers-reduced-motion for free.
          return (
            <div
              key={tool.key}
              data-recommended={isRecommended || undefined}
              className="rounded-learn-lg border-[1.5px] border-learn-line bg-learn-surface p-5 transition-colors duration-300 data-[recommended]:border-learn-accent data-[recommended]:bg-learn-quiet-wash motion-reduce:transition-none"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-learn-strong">
                  <span className="text-learn-accent-text">
                    {(() => {
                      const Mark = TOOL_MARKS[tool.key];
                      return Mark ? <Mark /> : null;
                    })()}
                  </span>
                  {tool.name}
                </h3>
                {isRecommended && (
                  <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
                    Good fit
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-learn-accent-text">
                {tool.worksIn} · {tool.sees}
              </p>
              <p className="mt-3 text-[14px] leading-[1.5] text-learn-muted">
                {tool.blurb}
              </p>
            </div>
          );
        })}
      </div>

      {task && (
        <motion.div
          key={task.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="learn-card mt-6 rounded-learn-lg p-5"
        >
          <p className="text-[14px] leading-[1.5] text-learn-strong">
            <strong>Why:</strong> {task.why}
          </p>
        </motion.div>
      )}

      <Reveal className="mt-10">
        <h3 id="you-dont-have-to-pick-one" className="text-lg text-learn-strong">You don&apos;t have to pick one</h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-learn-muted">
          Most vibe coders end up using more than one of these: a repo-aware
          editor or agent for the actual building, and a chat window on the
          side for quick questions that don&apos;t need any codebase context at
          all.
        </p>
      </Reveal>

      <TakeawayCard
        items={[
          "Tools differ mainly in what they can see: one file, the whole repo, or nothing but what you paste.",
          "Repo-aware tools are worth it the moment the answer depends on code you did not write.",
          "A chat window is not a lesser tool, it is the right tool for questions with no codebase context.",
          "Most people end up running two: one that edits, one that answers.",
        ]}
      />
    </div>
  );
}
