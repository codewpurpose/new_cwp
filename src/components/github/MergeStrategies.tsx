"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * What each of the three merge buttons leaves on main.
 *
 * The comparison is the same branch every time — three messy work-in-progress
 * commits, which is what a real branch looks like — so the difference in the
 * "after" column is entirely the button and not the work.
 */

type Strategy = "merge" | "squash" | "rebase";

const STRATEGIES: readonly { value: Strategy; label: string }[] = [
  { value: "merge", label: "Create a merge commit" },
  { value: "squash", label: "Squash and merge" },
  { value: "rebase", label: "Rebase and merge" },
];

const BRANCH: readonly string[] = [
  "wip",
  "fix the thing",
  "actually fix it",
  "lint",
];

interface Outcome {
  history: { text: string; tone: "main" | "new" | "merge" }[];
  bisect: string;
  revert: string;
  keeps: string;
  costs: string;
}

const OUTCOMES: Record<Strategy, Outcome> = {
  merge: {
    history: [
      { text: "Merge pull request #483 from fix/login", tone: "merge" },
      { text: "lint", tone: "new" },
      { text: "actually fix it", tone: "new" },
      { text: "fix the thing", tone: "new" },
      { text: "wip", tone: "new" },
      { text: "Add the settings page", tone: "main" },
    ],
    bisect:
      "Bisect can land on \"wip\", which does not build. Every intermediate commit is now a candidate, and half of them were never meant to be seen.",
    revert:
      "One revert of the merge commit undoes the whole branch — but it needs -m 1 to say which parent was mainline, and re-merging that branch later is genuinely awkward.",
    keeps: "Every commit, with its original hash, plus a record that a branch existed at all.",
    costs: "main's history is now four commits longer, and four of them are noise.",
  },
  squash: {
    history: [
      { text: "Fix the redirect after login (#483)", tone: "new" },
      { text: "Add the settings page", tone: "main" },
    ],
    bisect:
      "Every commit on main builds and passes, so bisect points at one commit that is a whole coherent change. This is the strongest argument for squashing.",
    revert:
      "One commit, one revert, no flags. The simplest possible undo.",
    keeps:
      "The pull request number, so the full commit-by-commit history is one click away on GitHub — as long as GitHub exists and the branch is not purged.",
    costs:
      "The individual commits are gone from main. A carefully staged five-commit story becomes one blob, which is why people who write good commits dislike this button.",
  },
  rebase: {
    history: [
      { text: "lint", tone: "new" },
      { text: "actually fix it", tone: "new" },
      { text: "fix the thing", tone: "new" },
      { text: "wip", tone: "new" },
      { text: "Add the settings page", tone: "main" },
    ],
    bisect:
      "Same problem as the merge commit — \"wip\" is still on main — but without a merge commit to identify where the branch began and ended.",
    revert:
      "No single commit represents the change. Undoing it means reverting a range, and you have to work out the range yourself.",
    keeps: "A perfectly linear history with no merge commits anywhere.",
    costs:
      "Every commit gets a new hash, so what is on main is not what was reviewed and tested — those exact commits never existed until the button was pressed.",
  },
};

const TONE: Record<"main" | "new" | "merge", string> = {
  main: "border-learn-line bg-learn-sunken text-learn-muted",
  new: "border-learn-accent bg-learn-quiet-wash text-learn-strong",
  merge: "border-learn-info-line bg-learn-info-bg text-learn-info-fg",
};

export function MergeStrategies() {
  const [strategy, setStrategy] = useState<Strategy>("merge");
  const outcome = OUTCOMES[strategy];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Same branch, same work — three different main branches
      </figcaption>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            The branch, as it was written
          </p>
          <ul className="mt-2 space-y-1.5">
            {BRANCH.map((commit) => (
              <li
                key={commit}
                className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-strong"
              >
                {commit}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] leading-[1.5] text-learn-muted">
            Four honest work-in-progress commits. This is what a real branch looks like before
            anybody tidies it.
          </p>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            main, afterwards — newest first
          </p>
          <ul aria-live="polite" className="mt-2 space-y-1.5">
            {outcome.history.map((commit, index) => (
              <li
                key={`${commit.text}-${index}`}
                className={`rounded-[6px] border-[0.5px] px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[12.5px] ${TONE[commit.tone]}`}
              >
                {commit.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <SegmentedControl
          variant="chips"
          label="Merge strategy"
          options={STRATEGIES}
          value={strategy}
          onValueChange={setStrategy}
        />
      </div>

      <dl aria-live="polite" className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { term: "Keeps", text: outcome.keeps },
          { term: "Costs", text: outcome.costs },
          { term: "git bisect", text: outcome.bisect },
          { term: "Undoing it", text: outcome.revert },
        ].map((row) => (
          <div
            key={row.term}
            className="rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3.5 py-3"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-learn-accent-text">
              {row.term}
            </dt>
            <dd className="mt-1 text-[12.5px] leading-[1.55] text-learn-muted">{row.text}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
