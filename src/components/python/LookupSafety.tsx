"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * The same missing key, asked for four ways.
 *
 * Every outcome is a literal in the OUTCOMES table rather than something
 * computed, because the interesting part is the *shape* of each answer — a
 * traceback, a None, a default, a handled branch — and a traceback is not
 * something JavaScript can produce honestly by running anything.
 */

const SCORES = 'scores = {"amara": 18, "ben": 6, "chidi": 24}';

type Key = "amara" | "dara";
type Style = "square" | "get" | "getdefault" | "trycatch";

const KEYS: readonly { value: Key; label: string }[] = [
  { value: "amara", label: '"amara" — is there' },
  { value: "dara", label: '"dara" — is not' },
];

const STYLES: readonly { value: Style; label: string }[] = [
  { value: "square", label: "scores[key]" },
  { value: "get", label: "scores.get(key)" },
  { value: "getdefault", label: "scores.get(key, 0)" },
  { value: "trycatch", label: "try / except" },
];

const CODE: Record<Style, string> = {
  square: "scores[key]",
  get: "scores.get(key)",
  getdefault: "scores.get(key, 0)",
  trycatch: "try:\n    scores[key]\nexcept KeyError:\n    print(f\"no score for {key}\")",
};

interface Outcome {
  output: string;
  tone: "ok" | "err" | "warn";
  note: string;
}

const OUTCOMES: Record<Style, Record<Key, Outcome>> = {
  square: {
    amara: { output: "18", tone: "ok", note: "The key was there, so the plain lookup is the clearest thing you can write." },
    dara: {
      output: 'Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nKeyError: \'dara\'',
      tone: "err",
      note: "The exception names the missing key. That is more information than any of the quieter options below will give you.",
    },
  },
  get: {
    amara: { output: "18", tone: "ok", note: "Identical to the square brackets when the key exists. The difference only shows up when it does not." },
    dara: {
      output: "None",
      tone: "warn",
      note: "No crash, and no value either. This None now travels — and the TypeError it eventually causes will point at a line nowhere near this one.",
    },
  },
  getdefault: {
    amara: { output: "18", tone: "ok", note: "The default is never consulted, because there was nothing to fall back from." },
    dara: {
      output: "0",
      tone: "ok",
      note: "A zero is a real answer here: a student with no recorded score has completed zero chapters. Supply a default only when it means something.",
    },
  },
  trycatch: {
    amara: { output: "18", tone: "ok", note: "The except clause never runs. A try block costs essentially nothing when nothing goes wrong." },
    dara: {
      output: "no score for dara",
      tone: "ok",
      note: "You kept the crash's information and chose what to do with it. This is the version that scales to more than one thing going wrong.",
    },
  },
};

const TONE_CLASS: Record<Outcome["tone"], string> = {
  ok: "text-learn-code-ok",
  err: "text-learn-code-err",
  warn: "text-learn-code-warn",
};

export function LookupSafety() {
  const [key, setKey] = useState<Key>("dara");
  const [style, setStyle] = useState<Style>("square");
  const outcome = OUTCOMES[style][key];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One dictionary, one missing key, four ways to ask
      </figcaption>

      <div className="mt-4 space-y-3">
        <SegmentedControl variant="chips" label="Which key" options={KEYS} value={key} onValueChange={setKey} />
        <SegmentedControl variant="chips" label="Access style" options={STYLES} value={style} onValueChange={setStyle} />
      </div>

      <div className="mt-5 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-dim">{SCORES}</p>
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-dim">{`key = "${key}"`}</p>
        <p className="mt-2 overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {CODE[style]}
        </p>
        <p
          className={`mt-3 overflow-x-auto border-t-[0.5px] border-learn-line-inverse pt-3 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.55] whitespace-pre ${TONE_CLASS[outcome.tone]}`}
        >
          {outcome.output}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">{outcome.note}</p>
    </figure>
  );
}
