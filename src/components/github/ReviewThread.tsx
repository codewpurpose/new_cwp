"use client";

import { useState } from "react";

/**
 * A review comment anchored to a diff line, and the suggestion block that turns
 * it into a commit.
 *
 * Built as a real state change rather than a screenshot: pressing "Commit
 * suggestion" rewrites the diff line and adds a commit to the thread, because
 * that is the fact people miss. A suggestion is not a note about the code. It
 * is a patch, and accepting it puts a commit authored by the reviewer into the
 * pull request.
 */

interface Line {
  no: number;
  text: string;
  kind: "context" | "added" | "removed";
}

const BEFORE: readonly Line[] = [
  { no: 12, text: "export async function loadUser(id) {", kind: "context" },
  { no: 13, text: "  const res = await fetch(`/api/users/${id}`);", kind: "added" },
  { no: 14, text: "  return res.json();", kind: "added" },
  { no: 15, text: "}", kind: "context" },
];

const AFTER: readonly Line[] = [
  { no: 12, text: "export async function loadUser(id) {", kind: "context" },
  { no: 13, text: "  const res = await fetch(`/api/users/${id}`);", kind: "added" },
  { no: 14, text: "  if (!res.ok) throw new Error(`loadUser ${id}: ${res.status}`);", kind: "added" },
  { no: 15, text: "  return res.json();", kind: "added" },
  { no: 16, text: "}", kind: "context" },
];

const LINE_TONE: Record<Line["kind"], string> = {
  context: "text-learn-code-dim",
  added: "text-learn-code-ok",
  removed: "text-learn-code-err",
};

const LINE_MARK: Record<Line["kind"], string> = {
  context: " ",
  added: "+",
  removed: "-",
};

export function ReviewThread() {
  const [applied, setApplied] = useState(false);
  const lines = applied ? AFTER : BEFORE;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        A comment on line 14, and what happens when the author accepts it
      </figcaption>

      <p className="mt-3 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
        src/lib/users.ts
      </p>

      <pre className="mt-2 overflow-x-auto rounded-[6px] bg-learn-code-bg p-4 text-[12.5px] leading-[1.7]">
        <code className="font-[family-name:var(--learn-font-mono)]">
          {lines.map((line) => (
            <span key={line.no} className={`block ${LINE_TONE[line.kind]}`}>
              <span className="select-none text-learn-code-dim">
                {String(line.no).padStart(3, " ")} {LINE_MARK[line.kind]}{" "}
              </span>
              {line.text}
            </span>
          ))}
        </code>
      </pre>

      <div className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-learn-quiet px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-strong">
            Review comment
          </span>
          <span className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-accent-text">
            @maintainer
          </span>
          <span className="text-[12px] text-learn-subtle">on line 14</span>
        </div>

        <p className="mt-3 text-[13.5px] leading-[1.6] text-learn-strong">
          <span className="font-[family-name:var(--learn-font-mono)] text-[12.5px]">fetch</span>{" "}
          does not reject on a 404 — it resolves with{" "}
          <span className="font-[family-name:var(--learn-font-mono)] text-[12.5px]">ok: false</span>
          . As written, a missing user parses an error page as JSON and fails somewhere much less
          obvious. Worth checking here:
        </p>

        <div className="mt-3 overflow-hidden rounded-[6px] border-[0.5px] border-learn-line">
          <p className="border-b-[0.5px] border-learn-line bg-learn-sunken px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] text-learn-muted">
            Suggested change
          </p>
          <pre className="overflow-x-auto bg-learn-code-bg p-3 text-[12.5px] leading-[1.7]">
            <code className="font-[family-name:var(--learn-font-mono)] text-learn-code-ok">
              {"  if (!res.ok) throw new Error(`loadUser ${id}: ${res.status}`);"}
            </code>
          </pre>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setApplied(true)}
            disabled={applied}
            className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-40"
          >
            {applied ? "Suggestion committed" : "Commit suggestion"}
          </button>
          {applied && (
            <button
              type="button"
              onClick={() => setApplied(false)}
              className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-muted hover:text-learn-strong"
            >
              Reset
            </button>
          )}
        </div>

        <div aria-live="polite" className="mt-3">
          {applied ? (
            <div className="rounded-[6px] border-[0.5px] border-learn-success-line bg-learn-success-bg px-3 py-2.5 text-[12.5px] leading-[1.55] text-learn-success-fg">
              <p className="font-semibold">
                Commit c4f2a91 — &ldquo;Apply suggestion from @maintainer&rdquo;
              </p>
              <p className="mt-1">
                Pushed straight to the branch, with the reviewer recorded as a co-author. The
                conversation is now resolvable, and the checks will re-run against the new commit.
              </p>
            </div>
          ) : (
            <p className="text-[12.5px] leading-[1.55] text-learn-muted">
              The author sees a button, not an instruction. That is the whole advantage of a
              suggestion over &ldquo;you should check res.ok here&rdquo; — no retyping, no
              misreading, and no round trip.
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}
