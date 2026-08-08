"use client";

import { useState } from "react";

/**
 * The working tree, the index, and the repository — as three columns a file
 * actually moves between.
 *
 * Modelled as one state per file rather than three copies of its contents,
 * which is the simplification every explanation makes. It is honest here
 * because the state names ARE the three answers `git status` gives: a file is
 * unchanged since the last commit, changed but not staged, or staged.
 *
 * Deliberately reversible in both directions. Almost every diagram of this
 * draws add and commit as one-way arrows, and then the reader has nowhere to
 * put `git restore --staged`, which is the command they will actually need.
 */

type FileState = "clean" | "modified" | "staged";

interface TrackedFile {
  name: string;
  state: FileState;
}

const INITIAL: readonly TrackedFile[] = [
  { name: "index.html", state: "clean" },
  { name: "styles.css", state: "modified" },
  { name: "app.js", state: "modified" },
];

const COLUMNS: readonly {
  state: FileState;
  title: string;
  command: string;
  blurb: string;
}[] = [
  {
    state: "modified",
    title: "Working tree",
    command: "the folder you edit",
    blurb: "Your actual files on disk. Git watches this and reports differences; it never changes anything here unless you ask.",
  },
  {
    state: "staged",
    title: "Staging area",
    command: "also called the index",
    blurb: "A draft of your next commit. Nothing here is saved yet — it is a list of exactly which changes you intend to record.",
  },
  {
    state: "clean",
    title: "Repository",
    command: ".git, on your machine",
    blurb: "Committed history. Once a change lands here it has a hash and a parent, and it is very hard to lose.",
  },
];

const COLUMN_TONE: Record<FileState, string> = {
  modified: "border-learn-warning-line bg-learn-warning-bg",
  staged: "border-learn-info-line bg-learn-info-bg",
  clean: "border-learn-success-line bg-learn-success-bg",
};

const CHIP_TONE: Record<FileState, string> = {
  modified: "border-learn-warning-line bg-learn-surface text-learn-warning-fg",
  staged: "border-learn-info-line bg-learn-surface text-learn-info-fg",
  clean: "border-learn-success-line bg-learn-surface text-learn-success-fg",
};

/** Shape as well as colour — fern and ochre converge under deuteranopia. */
function StateMark({ state }: { state: FileState }) {
  if (state === "clean") {
    return (
      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true" fill="none">
        <path d="M2.5 6.5 L5 9 L9.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === "staged") {
    return (
      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
        <rect x="2" y="2" width="8" height="8" rx="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
      <circle cx="6" cy="6" r="4" fill="currentColor" />
    </svg>
  );
}

export function ThreeTrees() {
  const [files, setFiles] = useState<readonly TrackedFile[]>(INITIAL);
  const [log, setLog] = useState<readonly string[]>([]);

  const run = (command: string, next: (f: TrackedFile) => TrackedFile) => {
    setFiles((prev) => prev.map(next));
    setLog((prev) => [...prev.slice(-3), command]);
  };

  const staged = files.filter((f) => f.state === "staged");
  const modified = files.filter((f) => f.state === "modified");

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One file, three places — move it and watch which command does what
      </figcaption>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {COLUMNS.map((column) => {
          const here = files.filter((f) => f.state === column.state);
          return (
            <div
              key={column.state}
              className={`rounded-learn-md border-[0.5px] p-4 ${COLUMN_TONE[column.state]}`}
            >
              <p className="text-[14px] font-semibold text-learn-strong">{column.title}</p>
              <p className="mt-0.5 font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-muted">
                {column.command}
              </p>

              <div className="mt-3 min-h-[86px] space-y-1.5">
                {here.length === 0 ? (
                  <p className="text-[12px] italic text-learn-subtle">nothing here</p>
                ) : (
                  here.map((file) => (
                    <span
                      key={file.name}
                      className={`flex items-center gap-2 rounded-[6px] border-[0.5px] px-2.5 py-1.5 font-[family-name:var(--learn-font-mono)] text-[12px] ${CHIP_TONE[column.state]}`}
                    >
                      <StateMark state={column.state} />
                      {file.name}
                    </span>
                  ))
                )}
              </div>

              <p className="mt-3 text-[12px] leading-[1.5] text-learn-muted">{column.blurb}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={modified.length === 0}
          onClick={() =>
            run("git add .", (f) => (f.state === "modified" ? { ...f, state: "staged" } : f))
          }
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          git add .
        </button>
        <button
          type="button"
          disabled={staged.length === 0}
          onClick={() =>
            run('git commit -m "…"', (f) => (f.state === "staged" ? { ...f, state: "clean" } : f))
          }
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          git commit
        </button>
        <button
          type="button"
          disabled={staged.length === 0}
          onClick={() =>
            run("git restore --staged .", (f) =>
              f.state === "staged" ? { ...f, state: "modified" } : f,
            )
          }
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          git restore --staged .
        </button>
        <button
          type="button"
          disabled={modified.length === 0}
          onClick={() =>
            run("git restore .", (f) => (f.state === "modified" ? { ...f, state: "clean" } : f))
          }
          className="learn-focusable rounded-full border-[0.5px] border-learn-danger-line bg-learn-danger-bg px-4 py-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-danger-fg hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
        >
          git restore .
        </button>
        <button
          type="button"
          onClick={() => {
            setFiles(INITIAL);
            setLog([]);
          }}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[12px] font-medium text-learn-muted hover:text-learn-strong"
        >
          Reset
        </button>
      </div>

      <div aria-live="polite" className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-code-dim">
          {log.length === 0 ? "# run something" : "# last few commands"}
        </p>
        {log.map((entry, index) => (
          <p
            key={`${entry}-${index}`}
            className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-code-fg"
          >
            <span className="select-none text-learn-code-dim">$ </span>
            {entry}
          </p>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Notice that <span className="font-[family-name:var(--learn-font-mono)]">git restore --staged</span>{" "}
        and <span className="font-[family-name:var(--learn-font-mono)]">git restore</span> both sound
        like undo and unstaging is completely safe while the other one destroys your edit with no
        warning and no way back. They are one word apart.
      </p>
    </figure>
  );
}
