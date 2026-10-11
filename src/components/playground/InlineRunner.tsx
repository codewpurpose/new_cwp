"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Play, RotateCcw, Square, X } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { FigureGallery, OutputConsole, StatusPill, isBusy } from "./OutputConsole";
import { useRunnable } from "./RunnableCode";
import { playgroundHref } from "./share";

const BTN =
  "lr-copy learn-focusable !min-h-10 !px-2.5 !normal-case !tracking-normal !text-[12.5px] !font-medium disabled:cursor-not-allowed disabled:opacity-40";

/**
 * A lesson code block's own scratchpad: the snippet in an editable copy, its
 * output, and a way to carry it over to the full playground. Loaded only once
 * a reader presses Run, so lesson pages ship none of this up front.
 */
export function InlineRunner() {
  const { original, code, setCode, close, runCode, runner, panelId } = useRunnable();
  const [stdin, setStdin] = useState("");
  const [ranCode, setRanCode] = useState(code);
  const ids = useId();
  const busy = runner.isRunning || isBusy(runner.status);
  const wantsInput = /\binput\s*\(/.test(code);

  const run = () => {
    if (busy || runner.isBlocked) return;
    setRanCode(code);
    runCode(code, stdin === "" ? [] : stdin.replace(/\n$/, "").split("\n"));
  };

  // Lesson snippets are often one step of a longer example, so a name from an
  // earlier block is the most likely NameError here. Say so.
  const errorExtra =
    runner.error?.type === "NameError"
      ? "Lesson snippets are sometimes one piece of a longer example, so this name may come from an earlier block. Define it above and run again."
      : null;
  const liveText =
    runner.status === "error" && runner.error
      ? `${runner.statusText} ${runner.error.message}`
      : runner.status === "idle"
        ? ""
        : runner.statusText;

  return (
    <motion.section
      id={panelId}
      aria-label="Run this example"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="mt-2 overflow-hidden rounded-learn-md border border-learn-code-line bg-learn-code-bg shadow-[0_8px_24px_-16px_rgba(21,18,12,0.35)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-learn-code-line py-1 pl-4 pr-1.5 text-[11.5px] text-learn-code-dim">
        <span className="flex min-w-0 flex-1 items-center gap-3 py-2">
          <span className="shrink-0 uppercase tracking-[0.08em]">Try it</span>
          <StatusPill status={runner.status} text={runner.statusText} />
        </span>
        <span className="flex flex-wrap items-center">
          <button type="button" onClick={run} disabled={busy || runner.isBlocked} className={`${BTN} !text-learn-code-ok`}>
            <Play className="size-3.5 fill-current" aria-hidden="true" />
            Run
          </button>
          <button type="button" onClick={runner.stop} disabled={!runner.isRunning} className={BTN}>
            <Square className="size-3 fill-current" aria-hidden="true" />
            Stop
          </button>
          <button
            type="button"
            onClick={() => setCode(original)}
            disabled={code === original}
            className={BTN}
            aria-label="Reset to the lesson's code"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Reset
          </button>
          <a href={playgroundHref(code)} className={BTN} aria-label="Open this code in the playground">
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline" aria-hidden="true">Playground</span>
          </a>
          <button type="button" onClick={close} className={BTN} aria-label="Close the runner">
            <X className="size-4" aria-hidden="true" />
          </button>
        </span>
      </div>

      <div className="border-b border-learn-code-line">
        <p id={`${ids}-hint`} className="sr-only">
          Editable copy of the lesson code. Tab indents; press Escape then Tab to leave. Control or Command plus Enter runs.
        </p>
        <CodeEditor
          value={code}
          onChange={setCode}
          onRun={run}
          label="Edit the example code"
          describedBy={`${ids}-hint`}
          errorLine={runner.error && ranCode === code ? runner.error.line : null}
          minLines={Math.min(original.split("\n").length, 12)}
          maxHeight="22rem"
        />
      </div>

      {wantsInput && (
        <div className="border-b border-learn-code-line px-4 py-3">
          <label htmlFor={`${ids}-stdin`} className="text-[12.5px] font-medium text-learn-code-fg">
            Answers for input(), one per line
          </label>
          <textarea
            id={`${ids}-stdin`}
            value={stdin}
            onChange={(event) => setStdin(event.target.value)}
            rows={2}
            spellCheck={false}
            className="mt-1.5 block w-full resize-y rounded-learn-sm border border-learn-code-line bg-black/20 px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-code-fg outline-none focus-visible:ring-2 focus-visible:ring-learn-code-ok/60"
          />
        </div>
      )}

      <OutputConsole
        output={runner.output}
        error={runner.error}
        status={runner.status}
        placeholder="Output will appear here."
        errorExtra={errorExtra}
        minHeight="4.5rem"
        maxHeight="20rem"
        label="Output of this example"
      />
      {runner.figures.length > 0 && (
        <div className="border-t border-learn-code-line bg-[var(--home-white)] p-3">
          <FigureGallery figures={runner.figures} />
        </div>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {liveText}
      </p>
    </motion.section>
  );
}
