"use client";

import { useState } from "react";

/**
 * A workflow run, opened up.
 *
 * Two things are being taught and neither is the YAML. First, jobs are parallel
 * and steps are serial, which is why one job can be finished while another is
 * still queued. Second, a step that fails stops its job and skips everything
 * after it — the greyed-out steps below the red one are the part people
 * misread as "also broken".
 */

type Status = "pass" | "fail" | "skipped" | "queued";

interface Step {
  name: string;
  status: Status;
  seconds: number;
}

interface Job {
  id: string;
  name: string;
  runner: string;
  status: Status;
  steps: Step[];
}

const JOBS: readonly Job[] = [
  {
    id: "lint",
    name: "lint",
    runner: "ubuntu-latest",
    status: "pass",
    steps: [
      { name: "Set up job", status: "pass", seconds: 2 },
      { name: "actions/checkout@v4", status: "pass", seconds: 3 },
      { name: "actions/setup-node@v4", status: "pass", seconds: 6 },
      { name: "npm ci", status: "pass", seconds: 24 },
      { name: "npm run lint", status: "pass", seconds: 9 },
    ],
  },
  {
    id: "typecheck",
    name: "typecheck",
    runner: "ubuntu-latest",
    status: "fail",
    steps: [
      { name: "Set up job", status: "pass", seconds: 2 },
      { name: "actions/checkout@v4", status: "pass", seconds: 3 },
      { name: "actions/setup-node@v4", status: "pass", seconds: 6 },
      { name: "npm ci", status: "pass", seconds: 25 },
      { name: "npm run typecheck", status: "fail", seconds: 11 },
      { name: "npm run build", status: "skipped", seconds: 0 },
      { name: "Upload artifact", status: "skipped", seconds: 0 },
    ],
  },
  {
    id: "test",
    name: "test (node 20, node 22)",
    runner: "ubuntu-latest · matrix",
    status: "pass",
    steps: [
      { name: "Set up job", status: "pass", seconds: 2 },
      { name: "actions/checkout@v4", status: "pass", seconds: 3 },
      { name: "actions/setup-node@v4", status: "pass", seconds: 7 },
      { name: "npm ci", status: "pass", seconds: 26 },
      { name: "npm test", status: "pass", seconds: 41 },
    ],
  },
];

const FAIL_OUTPUT = `src/lib/users.ts:14:22 - error TS2532: Object is possibly 'undefined'.

14   return res.body.id;
                ~~~~

Found 1 error in src/lib/users.ts:14

Error: Process completed with exit code 2.`;

const STATUS_TONE: Record<Status, string> = {
  pass: "text-learn-success-fg",
  fail: "text-learn-danger-fg",
  skipped: "text-learn-subtle",
  queued: "text-learn-subtle",
};

function StatusIcon({ status }: { status: Status }) {
  if (status === "pass") {
    return (
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-learn-success-fg" aria-hidden="true" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.2 7.2 L6.2 9.2 L9.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "fail") {
    return (
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-learn-danger-fg" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill="currentColor" />
        <path d="M4.6 4.6 L9.4 9.4 M9.4 4.6 L4.6 9.4" stroke="var(--learn-danger-bg)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-learn-subtle" aria-hidden="true" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.5 2.5" />
    </svg>
  );
}

export function WorkflowRun() {
  const [openJob, setOpenJob] = useState<string>("typecheck");
  const job = JOBS.find((j) => j.id === openJob) ?? JOBS[0];
  const total = JOBS.reduce((n, j) => n + j.steps.reduce((m, s) => m + s.seconds, 0), 0);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One push, three jobs, one red X
      </figcaption>

      <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-muted">
        .github/workflows/ci.yml &middot; on: pull_request &middot; run #241
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            Jobs — all started at once
          </p>
          <ul className="mt-2 space-y-1.5">
            {JOBS.map((j) => {
              const selected = j.id === openJob;
              return (
                <li key={j.id}>
                  <button
                    type="button"
                    onClick={() => setOpenJob(j.id)}
                    aria-pressed={selected}
                    className={`learn-focusable flex w-full items-center gap-2.5 rounded-[6px] border-[0.5px] px-3 py-2.5 text-left transition-colors motion-reduce:transition-none ${
                      selected
                        ? "border-learn-accent bg-learn-quiet-wash"
                        : "border-learn-line bg-learn-surface hover:border-learn-line-strong"
                    }`}
                  >
                    <StatusIcon status={j.status} />
                    <span className="flex-1">
                      <span className="block font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-strong">
                        {j.name}
                      </span>
                      <span className="block text-[11px] text-learn-muted">{j.runner}</span>
                    </span>
                    <span className="font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-subtle">
                      {j.steps.reduce((n, s) => n + s.seconds, 0)}s
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[12px] leading-[1.5] text-learn-muted">
            {total}s of machine time, but the run took as long as the slowest job — they ran side by
            side on three separate throwaway virtual machines.
          </p>
        </div>

        <div aria-live="polite">
          <p className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            Steps in <span className="font-[family-name:var(--learn-font-mono)]">{job.name}</span> —
            strictly in order
          </p>
          <ol className="mt-2 space-y-1">
            {job.steps.map((step) => (
              <li
                key={step.name}
                className="flex items-center gap-2.5 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3 py-1.5"
              >
                <StatusIcon status={step.status} />
                <span
                  className={`flex-1 font-[family-name:var(--learn-font-mono)] text-[12px] ${
                    step.status === "skipped" ? "text-learn-subtle" : "text-learn-strong"
                  }`}
                >
                  {step.name}
                </span>
                <span className={`font-[family-name:var(--learn-font-mono)] text-[11px] ${STATUS_TONE[step.status]}`}>
                  {step.status === "skipped" ? "skipped" : `${step.seconds}s`}
                </span>
              </li>
            ))}
          </ol>

          {job.status === "fail" && (
            <pre className="mt-3 overflow-x-auto rounded-[6px] bg-learn-code-bg p-3 text-[12px] leading-[1.6]">
              <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-err">
                {FAIL_OUTPUT}
              </code>
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-[6px] border-[0.5px] border-learn-danger-line bg-learn-danger-bg px-4 py-3">
        <p className="text-[13px] font-semibold text-learn-danger-fg">
          On the pull request: &ldquo;Some checks were not successful — 1 failing, 2 successful&rdquo;
        </p>
        <p className="mt-1.5 text-[12.5px] leading-[1.6] text-learn-danger-fg">
          If <span className="font-[family-name:var(--learn-font-mono)]">typecheck</span> is a{" "}
          <em>required</em> check in the branch protection rules, the merge button is disabled until
          it is green. If it is not required, the red X is a suggestion and anyone can merge straight
          past it — which is the difference between having CI and having CI that means something.
        </p>
      </div>
    </figure>
  );
}
