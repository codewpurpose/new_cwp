"use client";

import { useMemo, useState } from "react";

/**
 * A real .gitignore matcher, over a fixed tree.
 *
 * The matching is genuinely computed rather than looked up in a table, because
 * the two rules worth learning are both emergent: **the last matching pattern
 * wins**, and a `!` line only re-includes a file if nothing later re-excludes
 * it. A lookup table would show the right answers and teach neither.
 *
 * It is a subset of the real syntax — no `**`, no character classes, no
 * per-directory .gitignore files. Everything the toggles can produce is
 * handled exactly as Git would handle it.
 */

interface Pattern {
  id: string;
  text: string;
  note: string;
  defaultOn: boolean;
}

const PATTERNS: readonly Pattern[] = [
  { id: "node", text: "node_modules/", note: "Trailing slash: directories only, at any depth.", defaultOn: true },
  { id: "logs", text: "*.log", note: "No slash in the pattern, so it matches the file name at any depth.", defaultOn: true },
  { id: "env", text: ".env", note: "A plain name. Matches .env anywhere, not .env.example.", defaultOn: true },
  { id: "build", text: "build/", note: "Same directory rule — and it catches src/build/ too.", defaultOn: false },
  { id: "keep", text: "!logs/keep.log", note: "A negation. Re-includes one file the *.log line above already excluded.", defaultOn: false },
  { id: "pdf", text: "docs/*.pdf", note: "Contains a slash, so it anchors to the repository root. docs/api/spec.pdf is NOT matched.", defaultOn: false },
];

const PATHS: readonly string[] = [
  "index.html",
  ".env",
  ".env.example",
  "node_modules/react/index.js",
  "logs/app.log",
  "logs/keep.log",
  "src/build/bundle.js",
  "src/app.js",
  "docs/guide.pdf",
  "docs/api/spec.pdf",
];

/** Glob with `*` meaning "anything except a slash", which is Git's rule. */
function globToRegExp(glob: string): RegExp {
  const body = glob
    .split("")
    .map((ch) => {
      if (ch === "*") return "[^/]*";
      if (ch === "?") return "[^/]";
      return /[a-zA-Z0-9_]/.test(ch) ? ch : `\\${ch}`;
    })
    .join("");
  return new RegExp(`^${body}$`);
}

function matches(pattern: string, path: string): boolean {
  const negated = pattern.startsWith("!");
  const body = negated ? pattern.slice(1) : pattern;
  const isDir = body.endsWith("/");
  const core = isDir ? body.slice(0, -1) : body;
  const segments = path.split("/");

  if (isDir) {
    // A directory pattern matches if any ancestor segment is that directory.
    // Only ancestors, never the last segment — that one is the file itself.
    return segments.slice(0, -1).includes(core);
  }

  if (core.includes("/")) {
    // Anchored to the repository root, and `*` cannot cross a slash — so
    // docs/*.pdf matches docs/guide.pdf and not docs/api/spec.pdf.
    return globToRegExp(core).test(path);
  }

  // Unanchored: match the last segment at any depth.
  return globToRegExp(core).test(segments[segments.length - 1]);
}

interface Verdict {
  ignored: boolean;
  by: string | null;
}

function decide(path: string, active: readonly string[]): Verdict {
  let verdict: Verdict = { ignored: false, by: null };
  // Last match wins. This loop running forwards, and overwriting, IS that rule.
  for (const pattern of active) {
    if (matches(pattern, path)) {
      verdict = { ignored: !pattern.startsWith("!"), by: pattern };
    }
  }
  return verdict;
}

export function GitignoreTester() {
  const [on, setOn] = useState<readonly string[]>(
    PATTERNS.filter((p) => p.defaultOn).map((p) => p.id),
  );

  const active = useMemo(
    () => PATTERNS.filter((p) => on.includes(p.id)).map((p) => p.text),
    [on],
  );

  const results = useMemo(
    () => PATHS.map((path) => ({ path, ...decide(path, active) })),
    [active],
  );

  const toggle = (id: string) =>
    setOn((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const ignoredCount = results.filter((r) => r.ignored).length;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Toggle patterns, watch which files Git stops seeing
      </figcaption>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
            .gitignore
          </p>
          <div className="mt-2 space-y-1.5">
            {PATTERNS.map((pattern) => {
              const enabled = on.includes(pattern.id);
              return (
                <label
                  key={pattern.id}
                  className="flex cursor-pointer items-start gap-3 rounded-[6px] border-[0.5px] border-learn-line bg-learn-surface px-3 py-2 transition-colors has-[:focus-visible]:border-learn-accent motion-reduce:transition-none"
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggle(pattern.id)}
                    className="learn-focusable mt-0.5 h-4 w-4 shrink-0 accent-learn-accent"
                  />
                  <span className="flex-1">
                    <span
                      className={`block font-[family-name:var(--learn-font-mono)] text-[12.5px] ${
                        enabled ? "text-learn-strong" : "text-learn-subtle line-through"
                      }`}
                    >
                      {pattern.text}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-[1.45] text-learn-muted">
                      {pattern.note}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <p className="font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-subtle">
            files in the repository
          </p>
          <ul aria-live="polite" className="mt-2 space-y-1">
            {results.map((result) => (
              <li
                key={result.path}
                className={`flex items-center gap-2 rounded-[6px] border-[0.5px] px-3 py-1.5 ${
                  result.ignored
                    ? "border-learn-line bg-learn-sunken"
                    : "border-learn-success-line bg-learn-success-bg"
                }`}
              >
                {result.ignored ? (
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-learn-subtle" aria-hidden="true" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3.5 3.5 L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-learn-success-fg" aria-hidden="true" fill="none">
                    <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span
                  className={`flex-1 font-[family-name:var(--learn-font-mono)] text-[12.5px] ${
                    result.ignored ? "text-learn-subtle line-through" : "text-learn-strong"
                  }`}
                >
                  {result.path}
                </span>
                {result.by && (
                  <span className="shrink-0 font-[family-name:var(--learn-font-mono)] text-[11px] text-learn-muted">
                    {result.by}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-learn-muted">
            {ignoredCount} of {PATHS.length} ignored. Struck-through files are invisible to{" "}
            <span className="font-[family-name:var(--learn-font-mono)]">git status</span> and can
            never be committed by accident.
          </p>
        </div>
      </div>

      <p className="mt-5 text-[13px] leading-[1.6] text-learn-muted">
        Turn on the negation and watch{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">logs/keep.log</span> come back —
        because it is listed after{" "}
        <span className="font-[family-name:var(--learn-font-mono)]">*.log</span>. Move it above and
        it would do nothing at all. Order is the whole rule: the last pattern that matches a path is
        the one that decides.
      </p>
    </figure>
  );
}
