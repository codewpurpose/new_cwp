"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * A conflicted file, and the four things you can do to it.
 *
 * The fourth option is the one that matters and the one no tutorial offers:
 * neither side. Every "accept current / accept incoming" button in every editor
 * quietly implies the answer is one of the two, and for a conflict like this —
 * two people changing the same limit for different reasons — it is not.
 */

type Choice = "ours" | "theirs" | "both" | "neither";

const CHOICES: readonly { value: Choice; label: string }[] = [
  { value: "ours", label: "Keep ours" },
  { value: "theirs", label: "Keep theirs" },
  { value: "both", label: "Keep both" },
  { value: "neither", label: "Write something else" },
];

const CONFLICTED = `export function pageSize() {
<<<<<<< HEAD
  return 25;
=======
  return 50;
>>>>>>> feature/bigger-pages
}`;

interface Resolution {
  code: string;
  verdict: string;
  tone: "good" | "bad" | "warn";
}

const RESOLUTIONS: Record<Choice, Resolution> = {
  ours: {
    code: `export function pageSize() {
  return 25;
}`,
    verdict:
      "Valid, and it silently discards the other person's work. Sometimes right — but you should be able to say why 25 beat 50, and the commit message is where you say it.",
    tone: "warn",
  },
  theirs: {
    code: `export function pageSize() {
  return 50;
}`,
    verdict:
      "Also valid, also a decision. Whoever wrote 25 had a reason; if you cannot reconstruct it from the diff, that is a message to send, not a button to press.",
    tone: "warn",
  },
  both: {
    code: `export function pageSize() {
  return 25;
  return 50;
}`,
    verdict:
      "Syntactically fine and completely wrong. Git will accept it, the merge will finish clean, and the second line is unreachable. This is what happens when you resolve conflicts by deleting markers instead of reading code.",
    tone: "bad",
  },
  neither: {
    code: `export function pageSize() {
  // 25 was a mobile decision, 50 was a desktop one.
  return isMobile() ? 25 : 50;
}`,
    verdict:
      "Neither side, and the only answer that keeps both intentions. A conflict is often two correct changes to the same lines — the resolution is the code that satisfies both, which by definition is in neither branch.",
    tone: "good",
  },
};

const TONE_BOX: Record<Resolution["tone"], string> = {
  good: "border-learn-success-line bg-learn-success-bg text-learn-success-fg",
  warn: "border-learn-warning-line bg-learn-warning-bg text-learn-warning-fg",
  bad: "border-learn-danger-line bg-learn-danger-bg text-learn-danger-fg",
};

const TONE_LABEL: Record<Resolution["tone"], string> = {
  good: "Resolves the actual disagreement",
  warn: "Compiles — but it is a decision, so own it",
  bad: "Compiles, and is broken",
};

function CodePanel({ code, tones }: { code: string; tones?: Record<number, string> }) {
  return (
    <pre className="overflow-x-auto rounded-[6px] bg-learn-code-bg p-4 text-[12.5px] leading-[1.7]">
      <code className="font-[family-name:var(--learn-font-mono)]">
        {code.split("\n").map((line, index) => (
          <span key={index} className={`block ${tones?.[index] ?? "text-learn-code-fg"}`}>
            {line.length === 0 ? " " : line}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function ConflictResolver() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const resolution = choice ? RESOLUTIONS[choice] : null;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One conflict, four resolutions — only one of them is right
      </figcaption>

      <p className="mt-3 text-[13px] leading-[1.6] text-learn-muted">
        Both branches changed the page size. Git stopped and wrote this into your file — the markers
        are real text, sitting on disk right now.
      </p>

      <div className="mt-4">
        <CodePanel
          code={CONFLICTED}
          tones={{
            1: "text-learn-code-warn",
            2: "text-learn-code-ok",
            3: "text-learn-code-warn",
            4: "text-learn-code-accent",
            5: "text-learn-code-warn",
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 text-[12.5px] leading-[1.5] text-learn-muted sm:grid-cols-3">
        <p>
          <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
            &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
          </span>{" "}
          — everything until the next marker is what the branch you are standing on says.
        </p>
        <p>
          <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
            =======
          </span>{" "}
          — the divider. Not a change; just the boundary between the two versions.
        </p>
        <p>
          <span className="font-[family-name:var(--learn-font-mono)] text-learn-strong">
            &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/…
          </span>{" "}
          — what the branch you are merging in says, and the name of that branch.
        </p>
      </div>

      <div className="mt-5">
        <SegmentedControl
          variant="chips"
          label="How do you resolve it?"
          options={CHOICES}
          value={choice}
          onValueChange={setChoice}
        />
      </div>

      <div aria-live="polite" className="mt-4">
        {resolution ? (
          <>
            <CodePanel code={resolution.code} />
            <div className={`mt-3 rounded-[6px] border-[0.5px] px-4 py-3 ${TONE_BOX[resolution.tone]}`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em]">
                {TONE_LABEL[resolution.tone]}
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.6]">{resolution.verdict}</p>
            </div>
          </>
        ) : (
          <p className="rounded-[6px] border-[0.5px] border-dashed border-learn-line px-4 py-6 text-center text-[13px] text-learn-subtle">
            Pick one to see the file you would end up committing.
          </p>
        )}
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        Whichever you choose, the merge is not finished until you{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">git add</span> the file — that is
        how you tell Git the conflict is handled — and then{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">git commit</span>. Git does not
        check your answer. It checks only that the markers are gone.
      </p>
    </figure>
  );
}
