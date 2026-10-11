"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  Blocks,
  Check,
  CircleAlert,
  CircleCheck,
  CircleStop,
  Code2,
  Copy,
  Link2,
  LoaderCircle,
  Play,
  RotateCcw,
  Square,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeEditor } from "./CodeEditor";
import { DEFAULT_EXAMPLE, EXAMPLES, exampleById, type Example } from "./examples";
import { MLBuilder } from "./MLBuilder";
import { FigureGallery, OutputConsole, StatusPill, isBusy } from "./OutputConsole";
import { codeFromHash, encodeCode, STORAGE_KEY } from "./share";
import { usePythonRunner, type RunState, type RunStatus } from "./usePythonRunner";

interface Saved {
  code: string;
  exampleId: string | null;
}

type Mode = "code" | "ml";
const MODE_KEY = "cwp-playground-mode";

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

/** A shared #code= link always opens the editor; #ml opens the builder;
 *  otherwise the tab the student last used. */
function initialMode(): Mode {
  const hash = window.location.hash;
  if (codeFromHash(hash) !== null) return "code";
  if (hash === "#ml") return "ml";
  try {
    return window.localStorage.getItem(MODE_KEY) === "ml" ? "ml" : "code";
  } catch {
    return "code";
  }
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
  if (window.location.hash.startsWith("#code=") || window.location.hash === "#ml") {
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

/** A short, fixed-width label for the toolbar. The full sentence lives in
 *  the output header and the live region. */
const BADGE: Record<RunStatus, string> = {
  idle: "Ready",
  booting: "Loading Python",
  packages: "Loading libraries",
  running: "Running",
  done: "Done",
  error: "Error",
  stopped: "Stopped",
  unavailable: "Offline",
};

function StatusBadge({ status }: { status: RunStatus }) {
  const busy = isBusy(status);
  const Icon = busy
    ? LoaderCircle
    : status === "done"
      ? CircleCheck
      : status === "error" || status === "unavailable"
        ? CircleAlert
        : status === "stopped"
          ? CircleStop
          : CircleCheck;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex min-h-8 min-w-[9.5rem] items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-medium",
        status === "error" || status === "unavailable"
          ? "border-[#f0c9a4] bg-[#fdf0e1] text-[#7a4a14]"
          : status === "stopped"
            ? "border-[var(--home-hairline-strong)] bg-[var(--home-grey-400)] text-[var(--home-ink-soft)]"
            : status === "idle"
              ? "border-[var(--home-hairline-strong)] bg-[var(--home-white)] text-[var(--home-ink-quiet)]"
              : "border-[#bfdcc3] bg-[#dbefdb] text-[var(--home-moss)]",
      )}
    >
      <Icon className={cn("size-3.5 shrink-0", busy && "animate-spin motion-reduce:animate-none")} />
      {BADGE[status]}
    </span>
  );
}

const TOOL_BTN =
  "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[var(--home-hairline-strong)] bg-[var(--home-white)] px-3 text-[0.875rem] font-medium text-[var(--home-ink)] transition-colors hover:border-[#3e7f5c] hover:bg-[#f3faf3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] disabled:cursor-not-allowed disabled:opacity-50";

const PANE_SHADOW = "shadow-[0_1px_0_rgba(21,18,12,0.04),0_18px_40px_-24px_rgba(21,18,12,0.55)]";

export function Playground() {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [saved, setSaved] = useState<Saved>(initialCode);
  const { code, exampleId } = saved;
  const [stdin, setStdin] = useState("");
  const [ranCode, setRanCode] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [undo, setUndo] = useState<Saved | null>(null);
  const [flash, setFlash] = useState<"copied" | "shared" | null>(null);
  const flashTimer = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ code: null, ml: null });
  const runner = usePythonRunner();
  const ids = useId();
  const editorId = `${ids}-editor`;
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
      setModeState("code");
      setNotice("Loaded the code from this link. It came in the link itself; nothing was downloaded.");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setMode = (next: Mode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(MODE_KEY, next);
    } catch {
      // Remembering the tab is a convenience only.
    }
  };

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

  const replaceCode = (next: Saved, message: string) => {
    if (code !== next.code) setUndo({ code, exampleId });
    clearShareHash();
    update(next);
    if (runner.isRunning) runner.stop();
    runner.clear();
    setRanCode(null);
    setNotice(message);
  };

  const loadExample = (next: Example, message: string) => {
    replaceCode({ code: next.code, exampleId: next.id }, message);
  };

  const openFromBuilder = (generated: string) => {
    replaceCode(
      { code: generated, exampleId: null },
      "Here's your pipeline as plain Python. Change anything you like, then press Run.",
    );
    setMode("code");
    rootRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    tabRefs.current.code?.focus({ preventScroll: true });
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

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next: Mode =
      event.key === "Home" ? "code" : event.key === "End" ? "ml" : mode === "code" ? "ml" : "code";
    setMode(next);
    tabRefs.current[next]?.focus();
  };

  const errorLine = runner.error && ranCode === code ? runner.error.line : null;
  const line = notice ?? kodaLine(runner, example);
  const hasOutput = runner.output.length > 0 || runner.error !== null || runner.figures.length > 0;
  const liveText =
    runner.status === "done"
      ? `${runner.statusText} ${runner.figures.length > 0 ? `${runner.figures.length} figure${runner.figures.length === 1 ? "" : "s"} drawn.` : ""}`
      : runner.status === "error" && runner.error
        ? `${runner.statusText} ${runner.error.message}`
        : runner.status === "idle"
          ? ""
          : runner.statusText;

  const tabs: { mode: Mode; label: string; hint: string; Icon: typeof Code2 }[] = [
    { mode: "code", label: "Code editor", hint: "Write and run Python", Icon: Code2 },
    { mode: "ml", label: "ML builder", hint: "Drag blocks to train a model", Icon: Blocks },
  ];

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {/* Mode switch */}
      <div
        role="tablist"
        aria-label="Playground mode"
        className="inline-flex w-full gap-1 rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-1 shadow-[var(--home-shadow-sm)] sm:w-auto"
      >
        {tabs.map((tab) => {
          const selected = mode === tab.mode;
          return (
            <button
              key={tab.mode}
              ref={(el) => {
                tabRefs.current[tab.mode] = el;
              }}
              type="button"
              role="tab"
              id={`${ids}-tab-${tab.mode}`}
              aria-selected={selected}
              aria-controls={`${ids}-panel-${tab.mode}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setMode(tab.mode)}
              onKeyDown={onTabKey}
              className={cn(
                "flex min-h-12 flex-1 items-center gap-2.5 rounded-xl px-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)] sm:flex-none sm:px-4",
                selected ? "bg-[#dbefdb] text-[var(--home-moss)]" : "text-[var(--home-ink-soft)] hover:bg-[var(--home-grey-400)]",
              )}
            >
              <tab.Icon className={cn("size-[1.125rem] shrink-0", selected ? "text-[#3e7f5c]" : "")} aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="text-[0.9375rem] font-semibold">{tab.label}</span>
                <span className="hidden text-[0.75rem] font-normal text-[var(--home-ink-quiet)] sm:block">{tab.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Code editor */}
      <div
        role="tabpanel"
        id={`${ids}-panel-code`}
        aria-labelledby={`${ids}-tab-code`}
        hidden={mode !== "code"}
        className="mt-6"
      >
        <fieldset>
          <legend className="text-[0.8125rem] font-semibold text-[var(--home-ink-soft)]">
            Start from an example
            {exampleId === null && (
              <span className="ml-2 font-normal text-[var(--home-ink-quiet)]">(you&apos;re editing your own code)</span>
            )}
          </legend>
          <div className="mt-2.5 grid grid-cols-2 gap-2 md:grid-cols-4">
            {EXAMPLES.map((item) => {
              const current = item.id === exampleId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={current}
                  onClick={() => loadExample(item, item.koda)}
                  className={cn(
                    "group flex min-h-11 sm:min-h-[3.75rem] flex-col items-start justify-center rounded-xl border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-fern)]",
                    current
                      ? "border-[#3e7f5c] bg-[#dbefdb]"
                      : "border-[var(--home-hairline-strong)] bg-[var(--home-white)] hover:border-[#3e7f5c] hover:bg-[#f3faf3]",
                  )}
                >
                  <span className="text-[0.9375rem] font-semibold leading-tight text-[var(--home-ink)]">{item.title}</span>
                  <span className="mt-1 hidden text-[0.8125rem] leading-snug text-[var(--home-ink-quiet)] sm:block">{item.blurb}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Toolbar */}
        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-2 shadow-[var(--home-shadow-sm)]">
          <button
            type="button"
            onClick={run}
            disabled={busy || runner.isBlocked}
            className="home-btn home-btn-moss !min-h-10 !px-4 disabled:cursor-progress disabled:opacity-60"
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
          <StatusBadge status={runner.status} />

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => loadExample(example ?? DEFAULT_EXAMPLE, `Back to the original ${(example ?? DEFAULT_EXAMPLE).title} starter.`)}
              className={TOOL_BTN}
              aria-label="Reset to the starter code"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline" aria-hidden="true">Reset</span>
            </button>
            <button type="button" onClick={copy} className={TOOL_BTN} aria-label={flash === "copied" ? "Copied" : "Copy the code"}>
              {flash === "copied" ? (
                <Check className="size-4 text-[var(--home-fern)]" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline" aria-hidden="true">{flash === "copied" ? "Copied" : "Copy"}</span>
            </button>
            <button type="button" onClick={share} className={TOOL_BTN} aria-label={flash === "shared" ? "Link copied" : "Share a link to this code"}>
              {flash === "shared" ? (
                <Check className="size-4 text-[var(--home-fern)]" aria-hidden="true" />
              ) : (
                <Link2 className="size-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline" aria-hidden="true">{flash === "shared" ? "Link copied" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Koda */}
        <div className="mt-4 flex items-start gap-3">
          <Image
            src="/koala/koala-read.png"
            alt=""
            width={464}
            height={560}
            className="mt-0.5 h-11 w-auto shrink-0"
          />
          <p className="min-h-11 min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-[#dbefdb]/60 px-4 py-2.5 text-[0.9375rem] leading-[1.45] text-[var(--home-ink-soft)]">
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

        {runner.isBlocked && (
          <p className="mt-3 text-[0.875rem] text-[var(--home-ink-quiet)]">
            Python is busy with the ML builder. You can run this as soon as it finishes.
          </p>
        )}

        {/* Workspace */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className={cn("overflow-hidden rounded-2xl bg-learn-code-bg", PANE_SHADOW)}>
              <div className="flex min-h-11 items-center justify-between gap-3 border-b border-learn-code-line px-4 text-[11.5px] text-learn-code-dim">
                <label htmlFor={editorId} className="flex items-center gap-2">
                  <span className="font-[family-name:var(--learn-font-mono)]">main.py</span>
                  <span className="lr-code-lang">Python</span>
                </label>
                <span id={editorHintId} className="hidden truncate md:inline">
                  Tab indents · Esc then Tab leaves · Ctrl/⌘ + Enter runs
                </span>
              </div>
              <CodeEditor
                id={editorId}
                value={code}
                onChange={onEdit}
                onRun={run}
                label="Python code editor"
                describedBy={editorHintId}
                errorLine={errorLine}
                minLines={16}
                maxHeight="34rem"
              />
            </div>

            {wantsInput && (
              <div className="rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-3.5">
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

          <section
            aria-labelledby={`${ids}-output-title`}
            className={cn("flex min-w-0 flex-col overflow-hidden rounded-2xl bg-learn-code-bg lg:self-start", PANE_SHADOW)}
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
                disabled={busy || !hasOutput}
                className="lr-copy learn-focusable disabled:opacity-40"
              >
                Clear
              </button>
            </div>
            <OutputConsole
              output={runner.output}
              error={runner.error}
              status={runner.status}
              placeholder="Press Run to see what your program prints. Charts from matplotlib show up here too."
              minHeight="18rem"
              maxHeight="30rem"
            />
            {runner.figures.length > 0 && (
              <div className="border-t border-learn-code-line bg-[var(--home-white)] p-3">
                <h3 className="sr-only">Figures</h3>
                <FigureGallery figures={runner.figures} />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ML builder. Kept mounted while hidden so its pipeline and results
          survive a trip to the editor and back. */}
      <div
        role="tabpanel"
        id={`${ids}-panel-ml`}
        aria-labelledby={`${ids}-tab-ml`}
        hidden={mode !== "ml"}
        className="mt-6"
      >
        <MLBuilder onOpenInEditor={openFromBuilder} />
      </div>

      {/* The one place the editor's run progress is announced, so it is heard once. */}
      <p id={statusId} role="status" aria-live="polite" className="sr-only">
        {mode === "code" ? liveText : ""}
      </p>
    </div>
  );
}
