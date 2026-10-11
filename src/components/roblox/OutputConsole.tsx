"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The Output window, with three errors a first obby actually produces.
 *
 * The lines are written out rather than generated, because the teaching is in
 * their exact wording — "attempt to index nil with 'Health'" names the thing
 * you asked the nil for, and a paraphrase would lose the one word a reader needs to
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
        text: "  Workspace.Obby.Laser.KillScript:6: attempt to index nil with 'Health'",
        tone: "err",
      },
      { text: "  Stack Begin", tone: "info" },
      { text: "  Script 'Workspace.Obby.Laser.KillScript', Line 6", tone: "info" },
      { text: "  Stack End", tone: "info" },
    ],
    culprit: "index nil",
    reading:
      "Something on line 6 was nil and you asked it for a field. Line 5 looked inside the touching part's model for a Humanoid with FindFirstChildWhichIsA. The part did sit inside a model, but not a character, so that model had no Humanoid and the call returned nil. (A part with no model above it at all would have failed one line earlier, on line 5.) Line 6 then did humanoid.Health = 0. The fix is an `if not humanoid then return end` guard between them, not a different way of writing line 6.",
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
      "You used () on something that is not a function. Usually it is a spelling mistake in a function name — `ObbyUtil.getHumaniod(part)` looked up a field the module's table does not have, got nil, and then tried to call the nil. (A misspelled method on a Roblox object, like `part:Destory()`, fails differently: 'Destory is not a valid member of Part'.)",
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
      "No errors, but still inspect the output. The laser message appears twice for one crossing, which is the Touched event firing per limb — the thing a debounce exists to handle. An Output window with no red in it is not the same as a script that is behaving.",
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
