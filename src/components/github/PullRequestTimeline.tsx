"use client";

import { useState } from "react";

/**
 * A pull request as a state machine, stepped one event at a time.
 *
 * The mergeable/blocked banner at the bottom is the part worth building: it is
 * computed from the three conditions GitHub actually checks (a passing set of
 * checks, no outstanding "changes requested", and enough approvals), rather
 * than described in prose. A reader who steps to "changes requested" and
 * watches the green button go grey has learned the rule without being told it.
 */

interface Event {
  id: string;
  actor: string;
  text: string;
  kind: "open" | "commit" | "review" | "check" | "merge";
}

interface Step {
  command: string;
  events: Event[];
  checks: "pending" | "passing" | "failing";
  approvals: number;
  changesRequested: boolean;
  merged: boolean;
  draft: boolean;
}

const STEPS: readonly Step[] = [
  {
    command: "gh pr create --draft",
    checks: "pending",
    approvals: 0,
    changesRequested: false,
    merged: false,
    draft: true,
    events: [
      { id: "e1", actor: "you", text: "opened this as a draft from fix/login-redirect", kind: "open" },
      { id: "e2", actor: "github-actions", text: "CI queued — 3 jobs", kind: "check" },
    ],
  },
  {
    command: "checks finish",
    checks: "failing",
    approvals: 0,
    changesRequested: false,
    merged: false,
    draft: true,
    events: [
      { id: "e1", actor: "you", text: "opened this as a draft from fix/login-redirect", kind: "open" },
      { id: "e3", actor: "github-actions", text: "CI failed — typecheck (1 error)", kind: "check" },
    ],
  },
  {
    command: "git push  →  checks re-run",
    checks: "passing",
    approvals: 0,
    changesRequested: false,
    merged: false,
    draft: true,
    events: [
      { id: "e4", actor: "you", text: "pushed 1 commit — fix the type on the redirect param", kind: "commit" },
      { id: "e5", actor: "github-actions", text: "CI passed — 3 of 3 jobs green", kind: "check" },
    ],
  },
  {
    command: "click “Ready for review”",
    checks: "passing",
    approvals: 0,
    changesRequested: false,
    merged: false,
    draft: false,
    events: [
      { id: "e6", actor: "you", text: "marked this ready for review", kind: "open" },
      { id: "e7", actor: "you", text: "requested a review from @maintainer", kind: "review" },
    ],
  },
  {
    command: "reviewer submits “Request changes”",
    checks: "passing",
    approvals: 0,
    changesRequested: true,
    merged: false,
    draft: false,
    events: [
      { id: "e8", actor: "maintainer", text: "requested changes — 2 comments on src/auth/redirect.ts", kind: "review" },
    ],
  },
  {
    command: "git push  →  reviewer re-reviews",
    checks: "passing",
    approvals: 1,
    changesRequested: false,
    merged: false,
    draft: false,
    events: [
      { id: "e9", actor: "you", text: "pushed 1 commit — handle the empty next param", kind: "commit" },
      { id: "e10", actor: "maintainer", text: "approved these changes", kind: "review" },
    ],
  },
  {
    command: "Squash and merge",
    checks: "passing",
    approvals: 1,
    changesRequested: false,
    merged: true,
    draft: false,
    events: [
      { id: "e11", actor: "you", text: "squashed and merged into main — closed #482", kind: "merge" },
      { id: "e12", actor: "github", text: "deleted branch fix/login-redirect", kind: "merge" },
    ],
  },
];

const KIND_DOT: Record<Event["kind"], string> = {
  open: "var(--learn-series-1)",
  commit: "var(--learn-series-3)",
  review: "var(--learn-series-5)",
  check: "var(--learn-series-4)",
  merge: "var(--learn-ink-strong)",
};

function statusOf(step: Step): { label: string; detail: string; tone: "ok" | "block" | "done" } {
  if (step.merged) {
    return { label: "Merged", detail: "The branch is in main and has been deleted.", tone: "done" };
  }
  if (step.draft) {
    return {
      label: "Draft — cannot be merged",
      detail: "A draft is a pull request that says so. Reviewers are not requested automatically and the merge button is disabled by design.",
      tone: "block",
    };
  }
  if (step.checks === "failing") {
    return { label: "Blocked — checks failing", detail: "A required check is red.", tone: "block" };
  }
  if (step.changesRequested) {
    return {
      label: "Blocked — changes requested",
      detail: "A reviewer asked for changes. Pushing a commit does not clear this; the same reviewer has to re-review.",
      tone: "block",
    };
  }
  if (step.approvals === 0) {
    return {
      label: "Waiting for review",
      detail: "Checks are green and nobody has approved yet. On a protected branch that is enough to keep the button grey.",
      tone: "block",
    };
  }
  return {
    label: "Ready to merge",
    detail: "Checks green, one approval, nothing outstanding.",
    tone: "ok",
  };
}

const STATUS_TONE = {
  ok: "border-learn-success-line bg-learn-success-bg text-learn-success-fg",
  block: "border-learn-warning-line bg-learn-warning-bg text-learn-warning-fg",
  done: "border-learn-info-line bg-learn-info-bg text-learn-info-fg",
} as const;

export function PullRequestTimeline() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const status = statusOf(step);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One pull request, start to finish
      </figcaption>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
            {step.merged ? "Merged" : step.draft ? "Draft" : "Open"}
          </span>
          <p className="text-[15px] font-semibold text-learn-strong">
            Fix the redirect after login
          </p>
          <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
            #483
          </span>
        </div>
        <p className="mt-1 font-[family-name:var(--learn-font-mono)] text-[11.5px] text-learn-muted">
          fix/login-redirect &rarr; main
        </p>

        <ol className="mt-4 space-y-2">
          {step.events.map((event) => (
            <li key={event.id} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: KIND_DOT[event.kind] }}
              />
              <p className="text-[13px] leading-[1.5] text-learn-strong">
                <span className="font-[family-name:var(--learn-font-mono)] text-learn-accent-text">
                  @{event.actor}
                </span>{" "}
                {event.text}
              </p>
            </li>
          ))}
        </ol>

        <div
          aria-live="polite"
          className={`mt-4 rounded-[6px] border-[0.5px] px-4 py-3 ${STATUS_TONE[status.tone]}`}
        >
          <p className="text-[13px] font-semibold">{status.label}</p>
          <p className="mt-1 text-[12.5px] leading-[1.55]">{status.detail}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-learn-muted">
          <span>
            Checks:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
              {step.checks}
            </span>
          </span>
          <span>
            Approvals:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
              {step.approvals}
            </span>
          </span>
          <span>
            Changes requested:{" "}
            <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
              {step.changesRequested ? "yes" : "no"}
            </span>
          </span>
        </div>
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
        <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
          {step.command}
        </span>
      </div>
    </figure>
  );
}
