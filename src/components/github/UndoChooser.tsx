"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * "What do you regret?" → the command.
 *
 * The reason this is a picker rather than a table is that the six situations
 * look almost identical when written down, and the commands are not
 * interchangeable at all. Forcing one choice before showing one answer is the
 * whole teaching device.
 *
 * `safety` drives shape as well as colour: destructive answers get a filled
 * warning triangle, recoverable ones a hollow circle.
 */

type Situation =
  | "edit"
  | "staged"
  | "message"
  | "commit-local"
  | "commit-pushed"
  | "lost";

const SITUATIONS: readonly { value: Situation; label: string }[] = [
  { value: "edit", label: "An edit I have not staged" },
  { value: "staged", label: "Something I staged by mistake" },
  { value: "message", label: "My last commit message" },
  { value: "commit-local", label: "My last commit, not pushed" },
  { value: "commit-pushed", label: "A commit I already pushed" },
  { value: "lost", label: "Something I think I destroyed" },
];

type Safety = "safe" | "destructive";

interface Answer {
  command: string;
  headline: string;
  detail: string;
  safety: Safety;
  aside: string;
}

const ANSWERS: Record<Situation, Answer> = {
  edit: {
    command: "git restore path/to/file",
    headline: "Overwrites the file from the last commit",
    detail:
      "Your edit was never in Git — not committed, not staged, not stored anywhere. Nothing can bring it back. This is the single most dangerous command a beginner runs while trying to be careful.",
    safety: "destructive",
    aside: "Want to keep it for later instead? git stash sets it aside where you can get it back.",
  },
  staged: {
    command: "git restore --staged path/to/file",
    headline: "Unstages it, keeping the edit exactly as it was",
    detail:
      "This moves the change back from the staging area to the working tree. Your file on disk is untouched. There is nothing to lose here — it is purely a change of mind about the next commit.",
    safety: "safe",
    aside: "Older guides say git reset HEAD <file>. Same effect, worse name — restore was added in 2019 to split this off from reset.",
  },
  message: {
    command: 'git commit --amend -m "the message you meant"',
    headline: "Replaces the last commit with a new one",
    detail:
      "Amend does not edit a commit; commits are immutable. It builds a replacement with the same changes and a different message, and points your branch at that instead. The old one is orphaned.",
    safety: "safe",
    aside: "Safe only while the commit is yours alone. Amending something you pushed means everyone else now has a commit that no longer exists.",
  },
  "commit-local": {
    command: "git reset --soft HEAD~1",
    headline: "Removes the commit, keeps every change staged",
    detail:
      "The branch pointer moves back one commit and your changes sit in the staging area, ready to be re-committed differently. This is how you split one commit into two, or fold something you forgot into it.",
    safety: "safe",
    aside: "--mixed drops them to the working tree instead. --hard throws the changes away entirely, and that one is not recoverable from the working tree.",
  },
  "commit-pushed": {
    command: "git revert <commit-hash>",
    headline: "Adds a new commit that undoes the old one",
    detail:
      "Nothing is rewritten. The bad commit stays in history and a new commit reverses its changes, which is exactly what you want when other people have already pulled it. The record shows both the mistake and the fix.",
    safety: "safe",
    aside: "Reverting a merge needs -m 1 to say which parent is the mainline. Without it Git refuses, because it genuinely cannot tell.",
  },
  lost: {
    command: "git reflog",
    headline: "Lists every commit HEAD has pointed at, including the abandoned ones",
    detail:
      "Reflog is local, it is not part of history, and it remembers roughly ninety days of where your branches have been. A commit you reset away, an amend you regret, a branch you deleted — find the hash here and check it out.",
    safety: "safe",
    aside: "This does not cover work that was never committed. A change that was only ever in the working tree is not in the reflog, because it was never in Git.",
  },
};

const SAFETY_BOX: Record<Safety, string> = {
  safe: "border-learn-success-line bg-learn-success-bg text-learn-success-fg",
  destructive: "border-learn-danger-line bg-learn-danger-bg text-learn-danger-fg",
};

const SAFETY_LABEL: Record<Safety, string> = {
  safe: "Recoverable",
  destructive: "Destroys work permanently",
};

function SafetyMark({ safety }: { safety: Safety }) {
  if (safety === "destructive") {
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path d="M8 2 L15 14 H1 Z" fill="currentColor" />
        <path d="M8 6.5 V10" stroke="var(--learn-danger-bg)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="12" r="0.9" fill="var(--learn-danger-bg)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 8.2 L7 10.2 L11 5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UndoChooser() {
  const [situation, setSituation] = useState<Situation>("edit");
  const answer = ANSWERS[situation];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Name the regret, get the command
      </figcaption>

      <div className="mt-4">
        <SegmentedControl
          variant="chips"
          label="What do you want to undo?"
          options={SITUATIONS}
          value={situation}
          onValueChange={setSituation}
        />
      </div>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto whitespace-pre font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-fg">
          <span className="select-none text-learn-code-dim">$ </span>
          {answer.command}
        </p>
      </div>

      <div className={`mt-4 rounded-[6px] border-[0.5px] px-4 py-3 ${SAFETY_BOX[answer.safety]}`}>
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em]">
          <SafetyMark safety={answer.safety} />
          {SAFETY_LABEL[answer.safety]}
        </p>
        <p className="mt-2 text-[14px] font-semibold">{answer.headline}</p>
        <p className="mt-1.5 text-[13px] leading-[1.6]">{answer.detail}</p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">{answer.aside}</p>
    </figure>
  );
}
