import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhatYouNeedLesson() {
  return (
    <div>
      <Lead>
        This chapter assumes you have never opened a terminal. By the end of it you will have
        four things installed, and you will understand what each one is actually for — which
        matters more than having them, because every later chapter assumes you know why they
        are there.
      </Lead>

      <LessonSection id="the-four-things" title="The four things you need">
        <P>
          Every setup in this course, on every operating system, comes down to the same four
          pieces. Nothing else is required to start.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "A terminal",
              detail:
                "A window where you type commands instead of clicking. It ships with your computer — you do not install it.",
              note: "macOS: Terminal. Windows: PowerShell or Windows Terminal. Linux: you already know.",
            },
            {
              label: "An editor",
              detail:
                "Where you read and write code. VS Code is the safe default because almost every AI tool plugs into it.",
              note: "Download from code.visualstudio.com. Accept every default in the installer.",
            },
            {
              label: "Node.js",
              detail:
                "The runtime that lets your computer execute JavaScript outside a browser. Most modern web tooling needs it.",
              note: "Download the LTS version from nodejs.org. LTS means long-term support, i.e. the boring stable one.",
            },
            {
              label: "Git and a GitHub account",
              detail:
                "Git records versions of your work so any change can be undone. GitHub stores those versions online.",
              note: "This is the safety net that makes AI-generated changes safe to accept.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-terminal-in-five-commands" title="The terminal, in five commands">
        <P>
          The terminal feels intimidating because it gives no hints. In practice you will use
          about five commands over and over. Open your terminal and try each one.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`pwd
ls
cd Documents
mkdir my-first-app
cd my-first-app`}
        />
        <P>
          In order: <Strong>pwd</Strong> prints where you currently are.{" "}
          <Strong>ls</Strong> lists what is here. <Strong>cd</Strong> moves you into a folder
          (<InlineCode>cd ..</InlineCode> moves back out). <Strong>mkdir</Strong> makes a new
          folder. That is genuinely most of it.
        </P>
        <Callout tone="tip" title="If a command is not found">
          Close the terminal and open a new one. Installers add themselves to your PATH — the
          list of places your terminal looks for programs — but only new terminal windows pick
          that up. This one detail causes more &ldquo;it did not work&rdquo; than anything else
          on this page.
        </Callout>
      </LessonSection>

      <LessonSection id="check-it-worked" title="Checking it actually worked">
        <P>
          Every install should be verified rather than assumed. Each of these prints a version
          number if the tool is present.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`node --version
npm --version
git --version`}
        />
        <P>
          You want three version numbers. If any command reports{" "}
          <InlineCode>command not found</InlineCode>, that tool did not install — reopen your
          terminal first, then reinstall it if the message persists.
        </P>
      </LessonSection>

      <LessonSection id="git-in-ten-minutes" title="Git, in ten minutes">
        <P>
          You do not need to understand Git deeply to benefit from it. You need to understand
          one idea: Git takes a snapshot of your project whenever you ask, and you can return
          to any snapshot later. That is what makes it safe to let an AI change twenty files at
          once.
        </P>
        <P>Tell Git who you are, once per computer:</P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`}
        />
        <P>Then, inside a project folder, the loop you will repeat forever:</P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git init
git add .
git commit -m "Describe what changed"`}
        />
        <P>
          <Strong>init</Strong> starts tracking this folder. <Strong>add</Strong> stages your
          current changes. <Strong>commit</Strong> saves the snapshot with a message.
        </P>
        <Callout tone="success" title="Why this matters more with AI">
          When you write code by hand, you remember what you changed. When an AI edits eleven
          files in four seconds, you do not. A commit before you start means{" "}
          <InlineCode>git restore .</InlineCode> throws away everything since — no matter how
          confidently wrong the AI was.
        </Callout>
      </LessonSection>

      <LessonSection id="before-you-continue" title="Before you continue">
        <ChecklistCard
          marker="check"
          title="You are ready for the next chapter when"
          items={[
            <>
              <InlineCode>node --version</InlineCode> and <InlineCode>git --version</InlineCode>{" "}
              both print a number
            </>,
            "You can open a terminal and move into a folder with cd",
            "You have a GitHub account you can sign in to",
            "You have made at least one commit in a folder of your own",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "You need four things: a terminal, an editor, Node, and Git. Everything else is optional.",
          "Reopen your terminal after any install — a stale PATH is the most common false failure.",
          "Verify installs with --version instead of assuming they worked.",
          "Commit before you let an AI make changes. That single habit is what makes the rest safe.",
        ]}
      />
    </div>
  );
}
