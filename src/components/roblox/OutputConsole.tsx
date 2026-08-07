"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The Output window, with three errors a first obby actually produces.
 *
 * The lines are written out rather than generated, because the teaching is in
 * their exact wording — "attempt to index nil with 'Humanoid'" names the thing
 * that was missing, and a paraphrase would lose the one word a reader needs to
 * learn to look for.
 */

type Case = "index" | "call" | "clean";

const CASES: readonly { value: Case; label: string }[] = [
  { value: "index", label: "indexing nil" },
  { value: "call", label: "calling nil" },
  { value: "clean", label: "a healthy run" },
];

type Tone = "out" | "warn" | "err" | "info";

interface Line {
  text: string;
  tone: Tone;
}

const LOGS: Record<Case, { lines: Line[]; culprit: string; reading: string }> = {
  index: {
    lines: [
      { text: "  Laser armed", tone: "out" },
      {
        text: "  Workspace.Obby.Laser.KillScript:5: attempt to index nil with 'Humanoid'",
        tone: "err",
      },
      { text: "  Stack Begin", tone: "info" },
      { text: "  Script 'Workspace.Obby.Laser.KillScript', Line 5", tone: "info" },
      { text: "  Stack End", tone: "info" },
    ],
    culprit: "index nil",
    reading:
      "Something on line 5 was nil and you asked it for a child. Almost always hit.Parent came back as something without the child you wanted — a falling brick, or a hat. The fix is the `if humanoid then` guard, not a different way of writing line 5.",
  },
  call: {
    lines: [
      { text: "  Workspace.Obby.Platform.Drop:8: attempt to call a nil value", tone: "err" },
      { text: "  Stack Begin", tone: "info" },
      { text: "  Script 'Workspace.Obby.Platform.Drop', Line 8", tone: "info" },
      { text: "  Stack End", tone: "info" },
    ],
    culprit: "call a nil",
    reading:
      "You used () on something that is not a function. Nine times in ten it is a spelling mistake in a method name — Luau looked up `part:Destory()`, found nothing, and then tried to call the nothing it found.",
  },
  clean: {
    lines: [
      { text: "  Laser armed", tone: "out" },
      { text: "  Amara touched the laser", tone: "out" },
      { text: "  Platform will drop in 1s", tone: "warn" },
      { text: "  Amara touched the laser", tone: "out" },
    ],
    culprit: "",
    reading:
      "No errors, and still worth reading. The laser message appears twice for one crossing, which is the Touched event firing per limb — the thing a debounce exists to handle. An Output window with no red in it is not the same as a script that is behaving.",
  },
};

const TONE_CLASS: Record<Tone, string> = {
  out: "text-learn-code-fg",
  warn: "text-learn-code-warn",
  err: "text-learn-code-err",
  info: "text-learn-code-dim",
};

export function OutputConsole() {
  const [which, setWhich] = useState<Case>("index");
  const log = LOGS[which];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Output, reading three real runs
      </figcaption>

      <SegmentedControl
        className="mt-4"
        variant="chips"
        label="Which run"
        options={CASES}
        value={which}
        onValueChange={setWhich}
      />

      <div className="mt-5 overflow-hidden rounded-[6px] bg-learn-code-bg">
        <p className="border-b border-learn-line-inverse px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-learn-code-dim">
          Output
        </p>
        <div className="overflow-x-auto px-4 py-3">
          {log.lines.map((line, i) => (
            <p
              key={i}
              className={`font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.65] whitespace-pre ${TONE_CLASS[line.tone]}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>

      {log.culprit ? (
        <p className="mt-4 text-[13px] text-learn-muted">
          The words that matter:{" "}
          <span className="rounded-[3px] bg-learn-warning-bg px-1.5 py-0.5 font-[family-name:var(--learn-font-mono)] text-learn-warning-fg">
            {log.culprit}
          </span>
        </p>
      ) : null}

      <p className="mt-3 text-[13px] leading-[1.6] text-learn-muted">{log.reading}</p>
    </figure>
  );
}
