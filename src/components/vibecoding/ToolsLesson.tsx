"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TOOL_MARKS } from "@/components/vibecoding/ToolMarks";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

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
      <Lead>
        There is no single best AI coding tool, only the one that fits what
        you&apos;re doing right now. Pick a task below to see what fits.
      </Lead>

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

      <LessonSection id="you-dont-have-to-pick-one" title="You don't have to pick one">
        <P>
          Most vibe coders end up using more than one of these: a repo-aware
          editor or agent for the actual building, and a chat window on the
          side for quick questions that don&apos;t need any codebase context at
          all.
        </P>
        <P>
          Picking wrong at this stage costs less than it feels like it does.
          Every one of these tools reads and writes ordinary text — a prompt,
          a diff, a file — so trying a second one later means an afternoon,
          not a migration. Treat the choice below as a starting point rather
          than a commitment.
        </P>
        <StepList
          steps={[
            {
              label: "What does the task touch?",
              detail:
                "One function you can already see on screen, or files you would have to go find first? The second needs something repo-aware.",
            },
            {
              label: "How much do you trust the result before you look?",
              detail:
                "If you will read every line regardless, autocomplete is enough. If you want a full draft before you look, you need something that can act, not just suggest.",
            },
            {
              label: "Is this a one-off or a daily habit?",
              detail:
                "A single question does not justify installing anything. A workflow you will repeat every day justifies the setup cost.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="three-jobs-not-four-products" title="Three jobs, not four products">
        <P>
          The four tools above are not four points on the same scale. They do
          three different jobs, and the job determines what the tool needs to
          see and what it is allowed to do — which is the part that survives
          once the products themselves change name or get replaced.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Autocomplete-style",
              tone: "neutral",
              children: (
                <>
                  <p>
                    Predicts the next few lines as you type, using your open
                    file and a little surrounding code. Fast, cheap, and
                    blind to anything it was not already looking at.
                  </p>
                  <p>
                    Good for finishing a thought you have already started.
                    Useless for a task that begins with &ldquo;go find where
                    X happens&rdquo;.
                  </p>
                </>
              ),
            },
            {
              title: "Agentic editors and terminal agents",
              tone: "positive",
              children: (
                <>
                  <p>
                    Can read your whole repo, edit multiple files, and run
                    commands, then show you what changed. This is the
                    category that can actually build a feature rather than
                    complete a line.
                  </p>
                  <p>
                    The cost is trust: you are approving actions, not just
                    text, and a command it runs is a command your machine
                    ran.
                  </p>
                </>
              ),
            },
            {
              title: "Chat only",
              tone: "caution",
              children: (
                <>
                  <p>
                    Sees nothing except what you paste into the box. No
                    files, no commands, no memory of your project between
                    sessions.
                  </p>
                  <p>
                    That is a limitation and a feature: the one category
                    with nothing to configure, and the one where you decide
                    exactly what it can see.
                  </p>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-a-feature-list-wont-tell-you" title="What a feature list won't tell you">
        <P>
          Comparing tools by their feature list is a trap, because the
          feature list is the part that changes every few months. Two things
          about a tool matter more, and change slower: where your code
          actually goes, and how you pay for using it.
        </P>
        <Callout tone="note" title="Where your code goes">
          An editor-integrated agent typically sends your files to a cloud
          model unless you have deliberately set up something local. If a
          school or employer has a policy about what code may leave the
          building, that policy applies to your AI tool too, not only to
          you.
        </Callout>
        <P>
          The other axis is how you pay. Some tools bundle usage into a flat
          subscription, so a slow, careful session costs the same as a fast
          one. Others meter by how much you actually send and receive, so a
          habit of pasting a whole file when a single function would do gets
          expensive in a way autocomplete never was. Neither model is wrong,
          but knowing which one you are on before you build a habit around
          it saves a surprise later.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "The tools on this page are three jobs, not four points on one scale: autocomplete, agentic editing, and chat.",
          "Repo-aware tools earn their setup cost the moment the answer depends on code you did not write.",
          "A chat window is not a lesser tool — it is the right one for a question with no codebase context, and the one where you control exactly what it can see.",
          "Where your code goes and how you're billed for using it matter more, and change slower, than any single feature.",
          "Most people end up running two: one that edits, one that answers.",
        ]}
      />
    </div>
  );
}
