"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, CircleCheck, CircleStop, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PythonError } from "./protocol";
import type { OutputChunk, RunStatus } from "./usePythonRunner";

const BUSY: readonly RunStatus[] = ["booting", "packages", "running"];

export function isBusy(status: RunStatus) {
  return BUSY.includes(status);
}

/** The small pill beside the console title. Purely visual: the live region
 *  next to it is what screen readers hear. */
export function StatusPill({ status, text }: { status: RunStatus; text: string }) {
  const busy = isBusy(status);
  const Icon = busy
    ? LoaderCircle
    : status === "done"
      ? CircleCheck
      : status === "error" || status === "unavailable"
        ? CircleAlert
        : status === "stopped"
          ? CircleStop
          : null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 truncate text-[11.5px] font-medium",
        status === "done" && "text-learn-code-ok",
        (status === "error" || status === "unavailable") && "text-learn-code-err",
        status === "stopped" && "text-learn-code-warn",
        (busy || status === "idle") && "text-learn-code-dim",
      )}
    >
      {Icon && <Icon className={cn("size-3.5 shrink-0", busy && "animate-spin motion-reduce:animate-none")} />}
      <span className="truncate">{text}</span>
    </span>
  );
}

/**
 * What the program printed, then — if it failed — the error, explained.
 *
 * The friendly part comes first (what went wrong, on which line, what that
 * usually means), and the real traceback sits underneath in a disclosure:
 * students should learn to read tracebacks, but not be ambushed by one.
 */
export function OutputConsole({
  output,
  error,
  status,
  placeholder,
  errorExtra,
  minHeight = "10rem",
  maxHeight = "28rem",
  label = "Program output",
}: {
  output: OutputChunk[];
  error: PythonError | null;
  status: RunStatus;
  placeholder: string;
  /** Extra sentence under the hint, e.g. "lesson snippets are excerpts". */
  errorExtra?: string | null;
  minHeight?: string;
  maxHeight?: string;
  label?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  // Follow the output as it streams in, like a terminal. Scrolling is a DOM
  // side effect, not state, so an effect is the right place for it.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output, error]);

  const empty = output.length === 0 && !error;

  return (
    <div
      ref={scroller}
      role="log"
      // Polite by default for role="log"; off here so a print loop does not
      // read out ten thousand lines. The run status region announces the end.
      aria-live="off"
      aria-label={label}
      tabIndex={0}
      className="learn-focusable overflow-auto px-4 py-3.5 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.65] text-learn-code-fg focus-visible:!rounded-none"
      style={{ minHeight, maxHeight }}
    >
      {empty ? (
        <p className="text-learn-code-dim">
          {isBusy(status) ? "…" : status === "idle" ? placeholder : "(no output)"}
        </p>
      ) : (
        <pre className="whitespace-pre-wrap break-words font-[inherit]">
          {output.map((chunk, index) => (
            <span
              key={index}
              className={cn(chunk.stream === "err" && "text-learn-code-warn", chunk.stream === "note" && "text-learn-code-dim")}
            >
              {chunk.text}
            </span>
          ))}
        </pre>
      )}

      {error && (
        <div className="mt-3 rounded-learn-sm border border-learn-code-err/30 bg-learn-code-err/[0.07] px-3.5 py-3 font-[family-name:var(--learn-font-sans)] text-[13.5px] leading-[1.55]">
          <p className="font-semibold text-learn-code-err">
            {error.type}
            {error.line ? <span className="font-normal text-learn-code-fg"> on line {error.line}</span> : null}
          </p>
          {error.message && (
            <p className="mt-1 break-words font-[family-name:var(--learn-font-mono)] text-[12.5px] text-learn-code-fg">
              {error.message}
            </p>
          )}
          {error.hint && <p className="mt-2 text-learn-code-fg/90">{error.hint}</p>}
          {errorExtra && <p className="mt-1.5 text-learn-code-dim">{errorExtra}</p>}
          {error.traceback && (
            <details className="group mt-2.5">
              <summary className="learn-focusable inline-flex min-h-8 cursor-pointer items-center text-[12px] font-medium text-learn-code-dim hover:text-learn-code-fg">
                <span className="group-open:hidden">Show the full traceback</span>
                <span className="hidden group-open:inline">Hide the full traceback</span>
              </summary>
              <pre className="mt-2 overflow-x-auto whitespace-pre font-[family-name:var(--learn-font-mono)] text-[12px] leading-[1.6] text-learn-code-dim">
                {error.traceback}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

/** matplotlib figures, as PNGs rendered by Agg inside the worker. */
export function FigureGallery({ figures, className }: { figures: string[]; className?: string }) {
  if (figures.length === 0) return null;
  return (
    <div className={cn("grid gap-3", className)}>
      {figures.map((png, index) => (
        // eslint-disable-next-line @next/next/no-img-element -- a data: URI made at runtime; next/image can't optimise it
        <img
          key={index}
          src={`data:image/png;base64,${png}`}
          alt={`Figure ${index + 1} drawn by your code`}
          className="h-auto w-full rounded-learn-sm border border-learn-line bg-white"
        />
      ))}
    </div>
  );
}
