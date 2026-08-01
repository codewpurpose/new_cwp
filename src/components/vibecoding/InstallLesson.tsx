"use client";

import { useState } from "react";
import { TOOL_MARKS } from "@/components/vibecoding/ToolMarks";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { StepList } from "@/components/learn/primitives/StepList";
import { Tag } from "@/components/learn/primitives/Tag";

type ToolKey = "cursor" | "claude-code" | "copilot" | "chat";

interface ToolSetup {
  name: string;
  runsIn: string;
  cost: string;
  bestFor: string;
  steps: { label: string; detail?: string; note?: string }[];
  verify?: { label: string; code: string; variant: "terminal" | "code" };
  gotcha: string;
}

const TOOLS: Record<ToolKey, ToolSetup> = {
  cursor: {
    name: "Cursor",
    runsIn: "Its own editor",
    cost: "Free tier, paid plan for heavier use",
    bestFor: "People who want an editor that already has AI built in.",
    steps: [
      {
        label: "Download it",
        detail: "Go to cursor.com and download the build for your operating system.",
      },
      {
        label: "Import your VS Code setup",
        detail:
          "On first launch it offers to bring across your VS Code extensions, theme, and keybindings. Accept — Cursor is a fork of VS Code, so everything transfers.",
      },
      {
        label: "Sign in",
        detail: "Create an account. The free tier is enough to complete this course.",
      },
      {
        label: "Open a project folder",
        detail:
          "File → Open Folder, and choose the folder you made in the previous chapter. Cursor indexes the whole folder so it can answer questions about any file in it.",
        note: "Opening a single file instead of a folder is the most common setup mistake — it removes almost all of the context.",
      },
      {
        label: "Find the two shortcuts that matter",
        detail:
          "Cmd/Ctrl+K edits the code you have selected. Cmd/Ctrl+L opens a chat about your project. Almost everything else is optional.",
      },
    ],
    gotcha:
      "Cursor replaces VS Code rather than plugging into it. Running both on the same project is fine, but changes made in one will not appear in the other until you save and refocus.",
  },
  "claude-code": {
    name: "Claude Code",
    runsIn: "Your terminal",
    cost: "Requires a paid Claude plan or API credit",
    bestFor: "Multi-file changes, and work you want to hand off rather than supervise.",
    steps: [
      {
        label: "Install it",
        detail: "One npm command, which is why Node was required in the last chapter.",
      },
      {
        label: "Move into your project first",
        detail:
          "Claude Code works on whatever folder you launch it from, so cd into the project before starting it.",
        note: "Launching it from your home folder gives it your entire computer as context, which is slow and rarely what you want.",
      },
      {
        label: "Start it and sign in",
        detail: "Run claude and follow the browser prompt to authenticate the first time.",
      },
      {
        label: "Describe what you want in plain English",
        detail:
          "It reads files, makes edits, and runs commands, showing you each step. You approve or reject as it goes.",
      },
    ],
    verify: {
      label: "Terminal",
      variant: "terminal",
      code: `npm install -g @anthropic-ai/claude-code
cd my-first-app
claude`,
    },
    gotcha:
      "It can run commands on your machine. Read what it proposes before approving, especially anything that deletes files or installs packages.",
  },
  copilot: {
    name: "GitHub Copilot",
    runsIn: "VS Code, JetBrains, and others",
    cost: "Free for verified students — worth checking before you pay",
    bestFor: "Staying in the editor you already use.",
    steps: [
      {
        label: "Check for free access",
        detail:
          "GitHub Education gives students Copilot at no cost. Apply at education.github.com before starting a paid trial.",
      },
      {
        label: "Install the extension",
        detail:
          "In VS Code, open the Extensions panel, search for GitHub Copilot, and install it. Install GitHub Copilot Chat as well — the two are separate.",
      },
      {
        label: "Sign in",
        detail: "A prompt appears in the bottom-right. Authorise it through GitHub.",
      },
      {
        label: "Watch for grey text",
        detail:
          "As you type, Copilot suggests the rest of the line in grey. Tab accepts, Esc dismisses.",
        note: "Accepting suggestions without reading them is the fastest way to introduce bugs you will not be able to explain.",
      },
    ],
    gotcha:
      "Autocomplete sees your open file and a little surrounding context — not your whole project. For questions that span files, use the chat panel instead.",
  },
  chat: {
    name: "ChatGPT or Claude.ai",
    runsIn: "A browser tab",
    cost: "Usable free tiers",
    bestFor: "Questions with no codebase context. Nothing to install.",
    steps: [
      {
        label: "Open the site and sign in",
        detail: "claude.ai or chatgpt.com. That is the whole setup.",
      },
      {
        label: "Paste the code you are asking about",
        detail:
          "It cannot see your files, so anything you do not paste does not exist as far as it is concerned.",
      },
      {
        label: "Say what you already tried",
        detail:
          "Without your project for context, what you have ruled out is the most useful thing you can provide.",
      },
    ],
    gotcha:
      "Never paste API keys, passwords, or customer data. Once it is in a chat box, treat it as no longer private.",
  },
};

const OPTIONS = [
  { value: "cursor" as const, label: "Cursor" },
  { value: "claude-code" as const, label: "Claude Code" },
  { value: "copilot" as const, label: "Copilot" },
  { value: "chat" as const, label: "Chat only" },
];

export function InstallLesson() {
  const [tool, setTool] = useState<ToolKey>("cursor");
  const active = TOOLS[tool];

  return (
    <div>
      <Lead>
        The previous chapter compared these tools. This one installs them. Pick the one you
        want to start with — you can come back and set up another later, and most people
        eventually run two.
      </Lead>

      <Callout tone="tip" title="Not sure which to pick?">
        Choose <Strong>Cursor</Strong>. It has the gentlest setup, a free tier, and it looks
        like a normal code editor, so nothing else in this course will feel unfamiliar.
      </Callout>

      <div className="mt-8">
        <SegmentedControl
          label="Choose a tool to set up"
          variant="chips"
          options={OPTIONS}
          value={tool}
          onValueChange={setTool}
        />
      </div>

      <div className="mt-6 rounded-learn-xl border-[0.5px] border-learn-line bg-learn-surface p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-learn-accent-text">
            {(() => {
              const Mark = TOOL_MARKS[tool];
              return Mark ? <Mark /> : null;
            })()}
          </span>
          <h2 className="text-xl text-learn-strong">{active.name}</h2>
          <Tag tone="neutral">{active.runsIn}</Tag>
        </div>
        <p className="mt-3 text-[15px] leading-[1.6] text-learn-muted">{active.bestFor}</p>
        <p className="mt-2 text-[13px] text-learn-subtle">Cost: {active.cost}</p>

        <StepList variant="timeline" steps={active.steps} />

        {active.verify && (
          <CodeBlock
            label={active.verify.label}
            variant={active.verify.variant}
            code={active.verify.code}
          />
        )}

        <Callout tone="warning" title="The thing people get wrong">
          {active.gotcha}
        </Callout>
      </div>

      <LessonSection id="point-it-at-a-folder" title="Whatever you chose: point it at a folder">
        <P>
          Every repo-aware tool has the same failure mode, and it is worth stating once on its
          own. These tools answer questions using what they can see. If you open a single file,
          they can see a single file — and they will still answer confidently, just with
          invented details about the rest of your project.
        </P>
        <P>
          Open the <Strong>folder</Strong>, not the file. This one habit removes a large share
          of the &ldquo;why is the AI making things up&rdquo; problem before it starts.
        </P>
      </LessonSection>

      <LessonSection id="a-first-real-test" title="A first real test">
        <P>
          Do not start with &ldquo;build me an app.&rdquo; Start with a question that has a
          verifiable answer, so you learn what the tool can actually see:
        </P>
        <CodeBlock
          variant="prompt"
          label="Try this prompt"
          code={`What files are in this project, and what does each one do?
Do not guess — if you cannot see something, say so.`}
        />
        <P>
          A repo-aware tool lists your real files. A chat window tells you it cannot see them.
          Both answers are correct for what that tool is, and knowing which you are holding is
          the whole point of this chapter.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Open the folder, never a single file. Context is the difference between an answer and a guess.",
          "Verify the install with a command that prints a version, rather than assuming it worked.",
          "Students should check GitHub Education before paying for Copilot.",
          "Never paste secrets into a browser chat window.",
          "Test a new tool with a question you can check, not a task you cannot.",
        ]}
      />
    </div>
  );
}
