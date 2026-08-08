"use client";

import { useState } from "react";

/**
 * Three repositories, and which one each command talks to.
 *
 * The whole confusion of a first open-source contribution is that there are
 * three copies and beginners think there are two. Highlighting the pair
 * involved in each step — and greying the third — is the point of the widget;
 * everything else is labelling.
 */

type Box = "upstream" | "fork" | "local";

interface Step {
  title: string;
  command: string;
  from: Box | null;
  to: Box | null;
  detail: string;
}

const STEPS: readonly Step[] = [
  {
    title: "Fork it",
    command: "(on github.com — the Fork button)",
    from: "upstream",
    to: "fork",
    detail:
      "GitHub copies the whole repository into your account. You now own a repository you can push to, which you did not before — that is the entire reason forks exist. Nothing has touched your computer yet.",
  },
  {
    title: "Clone your fork",
    command: "git clone git@github.com:you/project.git",
    from: "fork",
    to: "local",
    detail:
      "Clone YOUR fork, not the original. Cloning the original gives you a local copy you cannot push, and that mistake is not visible until the very last step.",
  },
  {
    title: "Add the original as a second remote",
    command: "git remote add upstream https://github.com/original/project.git",
    from: "upstream",
    to: "local",
    detail:
      "Now your clone knows about both: origin is your fork, upstream is the project. Without this you have no way to pull in what the project does next, and your fork silently rots.",
  },
  {
    title: "Branch, and do the work",
    command: "git switch -c fix/typo-in-readme",
    from: null,
    to: "local",
    detail:
      "Never work on main, even in your own fork. A branch keeps your main clean so it can track upstream, and it is what lets you have two contributions open at once.",
  },
  {
    title: "Push to your fork",
    command: "git push -u origin fix/typo-in-readme",
    from: "local",
    to: "fork",
    detail:
      "Your branch goes to your fork. You still have no write access to the original and never needed any — this is why a stranger can contribute to a project safely.",
  },
  {
    title: "Open the pull request",
    command: "gh pr create --repo original/project",
    from: "fork",
    to: "upstream",
    detail:
      "The pull request asks the maintainers to merge your branch from your fork into their main. They review it, they decide, and they press the button. You are proposing, not merging.",
  },
  {
    title: "Keep the fork in sync",
    command: "git fetch upstream && git rebase upstream/main",
    from: "upstream",
    to: "local",
    detail:
      "The project keeps moving while your pull request waits. Fetching from upstream and rebasing on top of it is what stops a two-week-old branch from arriving full of conflicts.",
  },
];

const BOXES: readonly { id: Box; title: string; subtitle: string; owner: string }[] = [
  { id: "upstream", title: "original/project", subtitle: "the real project", owner: "not yours" },
  { id: "fork", title: "you/project", subtitle: "your fork, on GitHub", owner: "yours" },
  { id: "local", title: "~/project", subtitle: "your clone, on your laptop", owner: "yours" },
];

export function ForkFlow() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const involved = (box: Box) => step.from === box || step.to === box;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Three repositories, seven steps — which two each command touches
      </figcaption>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {BOXES.map((box) => {
          const active = involved(box.id);
          return (
            <div
              key={box.id}
              className={`rounded-learn-md border-[0.5px] p-4 transition-colors motion-reduce:transition-none ${
                active
                  ? "border-learn-accent bg-learn-quiet-wash"
                  : "border-learn-line bg-learn-surface opacity-55"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-strong">
                  {box.title}
                </p>
                {step.to === box.id && (
                  <span className="rounded-full bg-learn-inverse px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-learn-heading-on-inverse">
                    writes here
                  </span>
                )}
              </div>
              <p className="mt-1 text-[12px] text-learn-muted">{box.subtitle}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.06em] text-learn-subtle">
                {box.owner}
              </p>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-4">
        <p className="text-[14px] font-semibold text-learn-strong">
          {index + 1}. {step.title}
        </p>
        <p className="mt-2 overflow-x-auto whitespace-pre rounded-[6px] bg-learn-code-bg px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-code-fg">
          {step.command}
        </p>
        <p className="mt-3 text-[13px] leading-[1.6] text-learn-muted">{step.detail}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(STEPS.length - 1, i + 1))}
          disabled={index === STEPS.length - 1}
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next &rarr;
        </button>
        <span className="text-[12px] text-learn-subtle">
          Step {index + 1} of {STEPS.length}
        </span>
      </div>
    </figure>
  );
}
