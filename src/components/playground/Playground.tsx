"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Link2, Play, RotateCcw, Square, Undo2 } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { DEFAULT_EXAMPLE, EXAMPLES, exampleById, type Example } from "./examples";
import { FigureGallery, OutputConsole, StatusPill, isBusy } from "./OutputConsole";
import { codeFromHash, encodeCode, STORAGE_KEY } from "./share";
import { usePythonRunner, type RunState } from "./usePythonRunner";

interface Saved {
  code: string;
  exampleId: string | null;
}

/** Where the editor starts: a shared link wins, then the student's own last
 *  session, then the Hello starter. Client-only (this component is loaded
 *  with ssr: false), so reading location and storage here is safe. */
function initialCode(): Saved {
  const shared = codeFromHash(window.location.hash);
  if (shared !== null) return { code: shared, exampleId: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Saved>;
      if (typeof saved.code === "string") {
        return { code: saved.code, exampleId: exampleById(saved.exampleId)?.id ?? null };
      }
    }
  } catch {
    // Storage can be blocked (private mode, strict settings). Start fresh.
  }
  return { code: DEFAULT_EXAMPLE.code, exampleId: DEFAULT_EXAMPLE.id };
}

function save(value: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Full or blocked storage only costs persistence, never the session.
  }
}

/** Drop a consumed `#code=` once the student edits, so a reload brings back
 *  their edits (from storage) rather than the original shared snippet. */
function clearShareHash() {
  if (window.location.hash.startsWith("#code=")) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

function kodaLine(run: RunState, example: Example | null): string {
  switch (run.status) {
    case "booting":
      return "Waking Python up. The first run downloads it once; after that your browser keeps a copy.";
    case "packages":
      return `${run.statusText.replace(/…$/, "")}. Big libraries take a moment the first time, then they're cached.`;
    case "running":
      return "Running your code… If it never finishes, press Stop.";
    case "error":
      return run.error?.line
        ? `Start with the last line of the error: it names the problem. Line ${run.error.line} is marked in the editor.`
        : "Start with the last line of the error: it names the problem.";
    case "stopped":
      return run.statusText.startsWith("Stopped after")
        ? "That ran for 30 seconds, so I stopped it. Look for a while loop whose condition never becomes False."
        : "Stopped. Python restarted fresh and is ready for another go.";
    case "unavailable":
      return "I couldn't download Python. Check your connection, then press Run again.";
    case "done":
      return run.figures.length > 0
        ? "There's your chart. Change a number and run it again to redraw it."
        : "It worked! Now change one thing and predict what will happen before you run it again.";
    default:
      return example?.koda ?? "Write some Python, then press Run. Nothing you type leaves this page.";
  }
}

const TOOL_BTN =
  "home-btn home-btn-outline !min-h-10 !px-3 !text-[0.875rem] disabled:cursor-not-allowed disabled:opacity-50";

export function Playground() {
  const [saved, setSaved] = useState<Saved>(initialCode);
  const { code, exampleId } = saved;
  const [stdin, setStdin] = useState("");
  const [ranCode, setRanCode] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [undo, setUndo] = useState<Saved | null>(null);
  const [flash, setFlash] = useState<"copied" | "shared" | null>(null);
  const flashTimer = useRef<number | undefined>(undefined);
  const runner = usePythonRunner();
  const ids = useId();
  const editorHintId = `${ids}-editor-hint`;
  const statusId = `${ids}-status`;

  const example = exampleById(exampleId);
  const busy = runner.isRunning || isBusy(runner.status);
  const wantsInput = /\binput\s*\(/.test(code);

  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  // A share link pasted into this same tab only changes the hash, which
  // doesn't remount anything; pick it up here.
  useEffect(() => {
    const onHash = () => {
      const shared = codeFromHash(window.location.hash);
      if (shared === null) return;
      setSaved({ code: shared, exampleId: null });
      setNotice("Loaded the code from this link. It came in the link itself; nothing was downloaded.");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const update = (next: Saved) => {
    setSaved(next);
    save(next);
  };

  const onEdit = (value: string) => {
    clearShareHash();
    setUndo(null);
    // Once edited, it is the student's code, not the starter any more; the
    // picker keeps showing which starter it came from, and Reset returns there.
    update({ code: value, exampleId });
  };

  const run = () => {
    if (busy || runner.isBlocked) return;
    setNotice(null);
    setRanCode(code);
    const answers = stdin === "" ? [] : stdin.replace(/\n$/, "").split("\n");
    runner.run(code, answers);
  };

  const loadExample = (next: Example, message: string) => {
    if (code !== next.code) setUndo({ code, exampleId });
    clearShareHash();
    update({ code: next.code, exampleId: next.id });
    runner.clear();
    setRanCode(null);
    setNotice(message);
  };

  const restoreUndo = () => {
    if (!undo) return;
    update(undo);
    setUndo(null);
    setNotice("Your previous code is back.");
  };

  const showFlash = (kind: "copied" | "shared") => {
    setFlash(kind);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(null), 2000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      showFlash("copied");
      setNotice("Copied. Paste it into a .py file to run it on your own computer later.");
    } catch {
      setNotice("Your browser blocked the clipboard. Select the code and copy it by hand.");
    }
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#code=${encodeCode(code)}`;
    window.history.replaceState(null, "", url);
    try {
      await navigator.clipboard.writeText(url);
      showFlash("shared");
      setNotice("Link copied. The code is packed inside the link itself, so nothing is uploaded anywhere.");
    } catch {
      setNotice("The share link is now in the address bar. Copy it from there.");
    }
  };

  const errorLine = runner.error && ranCode === code ? runner.error.line : null;
  const line = notice ?? kodaLine(runner, example);
  const liveText =
    runner.status === "done"
      ? `${runner.statusText} ${runner.figures.length > 0 ? `${runner.figures.length} figure${runner.figures.length === 1 ? "" : "s"} drawn.` : ""}`
      : runner.status === "error" && runner.error
        ? `${runner.statusText} ${runner.error.message}`
        : runner.status === "idle"
          ? ""
          : runner.statusText;

  return (
    <div className="pg-root">
      {/* Toolbar */}
      <div className="flex flex-wrap items-end gap-x-3 gap-y-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={`${ids}-example`} className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--home-ink-quiet)]">
            Starter
          </label>
          <select
            id={`${ids}-example`}
            value={exampleId ?? ""}
            onChange={(event) => {
              const next = exampleById(event.target.value);
              if (next) loadExample(next, next.koda);
            }}
            className="min-h-10 min-w-[13.5rem] max-w-full cursor-pointer rounded-lg border border-[var(--home-hairline-strong)] bg-[var(--home-white)] px-3 pr-8 text-[0.9375rem] text-[var(--home-ink)] shadow-[var(--home-shadow-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)]"
          >
            {exampleId === null && <option value="">Your own code</option>}
            {EXAMPLES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={busy || runner.isBlocked}
            className="home-btn home-btn-moss !min-h-10 !px-4 disabled:cursor-progress disabled:opacity-70"
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Run
            <kbd className="ml-1 hidden rounded border border-white/25 px-1.5 py-0.5 font-[family-name:var(--learn-font-mono)] text-[0.6875rem] font-normal text-white/80 sm:inline">
              Ctrl/⌘ ↵
            </kbd>
          </button>
          <button type="button" onClick={runner.stop} disabled={!runner.isRunning} className={TOOL_BTN}>
            <Square className="size-3.5 fill-current" aria-hidden="true" />
            Stop
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => loadExample(example ?? DEFAULT_EXAMPLE, `Back to the original ${(example ?? DEFAULT_EXAMPLE).title} starter.`)}
            className={TOOL_BTN}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </button>
          <button type="button" onClick={copy} className={TOOL_BTN}>
            {flash === "copied" ? (
              <Check className="size-4 text-[var(--home-fern)]" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {flash === "copied" ? "Copied" : "Copy"}
          </button>
          <button type="button" onClick={share} className={TOOL_BTN}>
            {flash === "shared" ? (
              <Check className="size-4 text-[var(--home-fern)]" aria-hidden="true" />
            ) : (
              <Link2 className="size-4" aria-hidden="true" />
            )}
            {flash === "shared" ? "Link copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Koda */}
      <div className="mt-5 flex min-h-12 items-center gap-3">
        <Image
          src="/koala/koala-read.png"
          alt=""
          width={464}
          height={560}
          className="h-12 w-auto shrink-0 drop-shadow-[0_4px_8px_rgba(46,38,24,0.12)]"
        />
        <p className="min-w-0 flex-1 rounded-2xl rounded-bl-sm border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] px-4 py-2.5 text-[0.9375rem] leading-[1.45] text-[var(--home-ink-soft)] shadow-[var(--home-shadow-sm)]">
          <span className="font-semibold text-[var(--home-moss)]">Koda: </span>
          {line}
          {undo && notice && (
            <button
              type="button"
              onClick={restoreUndo}
              className="ml-2 inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 align-middle text-[0.875rem] font-medium text-[var(--home-link-green)] underline decoration-[var(--home-fern)] underline-offset-2 hover:text-[var(--home-moss)] focus-visible:outline-2 focus-visible:outline-[var(--home-fern)]"
            >
              <Undo2 className="size-3.5" aria-hidden="true" />
              Undo
            </button>
          )}
        </p>
      </div>

      {/* Workspace */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="overflow-hidden rounded-learn-lg bg-learn-code-bg shadow-[0_1px_0_rgba(21,18,12,0.04),0_18px_40px_-24px_rgba(21,18,12,0.55)]">
            <div className="flex min-h-11 items-center justify-between gap-3 border-b border-learn-code-line px-4 text-[11.5px] text-learn-code-dim">
              <span className="flex items-center gap-2">
                <span className="font-[family-name:var(--learn-font-mono)]">main.py</span>
                <span className="lr-code-lang">Python</span>
              </span>
              <span id={editorHintId} className="hidden truncate md:inline">
                Tab indents · Esc then Tab leaves · Ctrl/⌘ + Enter runs
              </span>
            </div>
            <CodeEditor
              id={`${ids}-editor`}
              value={code}
              onChange={onEdit}
              onRun={run}
              label="Python code editor"
              describedBy={editorHintId}
              errorLine={errorLine}
              minLines={14}
              maxHeight="34rem"
            />
          </div>

          {wantsInput && (
            <div className="rounded-learn-md border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-3.5">
              <label htmlFor={`${ids}-stdin`} className="text-[0.875rem] font-semibold text-[var(--home-ink)]">
                Answers for input()
              </label>
              <p id={`${ids}-stdin-hint`} className="mt-0.5 text-[0.8125rem] leading-[1.45] text-[var(--home-ink-quiet)]">
                Your code asks for input. Type each answer on its own line before you press Run; each input() call takes the next line.
              </p>
              <textarea
                id={`${ids}-stdin`}
                value={stdin}
                onChange={(event) => setStdin(event.target.value)}
                aria-describedby={`${ids}-stdin-hint`}
                rows={3}
                spellCheck={false}
                className="mt-2 block w-full resize-y rounded-md border border-[var(--home-hairline-strong)] bg-[var(--home-page)] px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.6] text-[var(--home-ink)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--home-fern)]"
              />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <section
            aria-labelledby={`${ids}-output-title`}
            className="overflow-hidden rounded-learn-lg bg-learn-code-bg shadow-[0_1px_0_rgba(21,18,12,0.04),0_18px_40px_-24px_rgba(21,18,12,0.55)]"
          >
            <div className="flex min-h-11 items-center justify-between gap-3 border-b border-learn-code-line pl-4 pr-1.5 text-[11.5px] text-learn-code-dim">
              <span className="flex min-w-0 items-center gap-3">
                <h2 id={`${ids}-output-title`} className="shrink-0 uppercase tracking-[0.08em]">
                  Output
                </h2>
                <StatusPill status={runner.status} text={runner.statusText} />
              </span>
              <button
                type="button"
                onClick={runner.clear}
                disabled={busy || (runner.output.length === 0 && !runner.error && runner.figures.length === 0)}
                className="lr-copy learn-focusable disabled:opacity-40"
              >
                Clear
              </button>
            </div>
            <OutputConsole
              output={runner.output}
              error={runner.error}
              status={runner.status}
              placeholder="Press Run to see what your program prints."
              minHeight="14rem"
              maxHeight="26rem"
            />
          </section>

          <section
            aria-labelledby={`${ids}-figures-title`}
            className="rounded-learn-lg border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-4 shadow-[var(--home-shadow-sm)]"
          >
            <h2
              id={`${ids}-figures-title`}
              className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--home-ink-quiet)]"
            >
              Figures
            </h2>
            {runner.figures.length > 0 ? (
              <FigureGallery figures={runner.figures} className="mt-3" />
            ) : (
              <p className="mt-2 text-[0.875rem] leading-[1.5] text-[var(--home-ink-quiet)]">
                Charts from matplotlib appear here. Try the “Plot a line” starter.
              </p>
            )}
          </section>
        </div>
      </div>

      {/* The one place run progress is announced, so it is heard once. */}
      <p id={statusId} role="status" aria-live="polite" className="sr-only">
        {liveText}
      </p>
    </div>
  );
}
