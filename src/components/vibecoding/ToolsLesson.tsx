"use client";

import { useState } from "react";
import { motion } from "motion/react";

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
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        There is no single best AI coding tool, only the one that fits what
        you&apos;re doing right now. Pick a task below to see what fits.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TASKS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTaskKey(t.key)}
            className={`rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors ${
              taskKey === t.key
                ? "border-[#1e3c2c] bg-[#1e3c2c] text-[#dbefdb]"
                : "border-[#e1e1e1] bg-white text-[#636363] hover:text-[#1e3c2c]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => {
          const isRecommended = task?.recommended.includes(tool.key) ?? false;
          return (
            <motion.div
              key={tool.key}
              animate={{
                borderColor: isRecommended ? "#3e7f5c" : "#e1e1e1",
                backgroundColor: isRecommended ? "#f2f8f2" : "#fffbf5",
              }}
              transition={{ duration: 0.3 }}
              className="rounded-[16px] border-[1.5px] p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-[#1e3c2c]">
                  {tool.name}
                </h3>
                {isRecommended && (
                  <span className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#1e3c2c]">
                    Good fit
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-[#3e7f5c]">
                {tool.worksIn} · {tool.sees}
              </p>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#636363]">
                {tool.blurb}
              </p>
            </motion.div>
          );
        })}
      </div>

      {task && (
        <motion.div
          key={task.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="home-card mt-6 rounded-[16px] p-5"
        >
          <p className="text-[14px] leading-[1.5] text-[#1e3c2c]">
            <strong>Why:</strong> {task.why}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        <h3 className="text-lg text-[#1e3c2c]">You don&apos;t have to pick one</h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-[#636363]">
          Most vibe coders end up using more than one of these: a repo-aware
          editor or agent for the actual building, and a chat window on the
          side for quick questions that don&apos;t need any codebase context at
          all.
        </p>
      </motion.div>
    </div>
  );
}
