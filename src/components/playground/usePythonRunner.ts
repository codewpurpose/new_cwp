"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { MAX_OUTPUT_CHARS, type PythonError } from "./protocol";
import { getPythonRuntime, type RunEnd, type RuntimeSnapshot } from "./python-runtime";

export type RunStatus =
  | "idle"
  | "booting"
  | "packages"
  | "running"
  | "done"
  | "error"
  | "stopped"
  | "unavailable";

export interface OutputChunk {
  stream: "out" | "err" | "note";
  text: string;
}

export interface RunState {
  status: RunStatus;
  /** Short, human status for the live region and the status pill. */
  statusText: string;
  output: OutputChunk[];
  figures: string[];
  error: PythonError | null;
  durationMs: number | null;
}

const IDLE: RunState = {
  status: "idle",
  statusText: "Ready when you are.",
  output: [],
  figures: [],
  error: null,
  durationMs: null,
};

const FLUSH_MS = 40;

const subscribe = (listener: () => void) => getPythonRuntime().subscribe(listener);
const getSnapshot = () => getPythonRuntime().getSnapshot();
const SERVER_SNAPSHOT: RuntimeSnapshot = { engine: "cold", activeOwner: null };
const getServerSnapshot = () => SERVER_SNAPSHOT;

/** Merge a chunk into the console, joining runs of the same stream and keeping
 *  only the newest MAX_OUTPUT_CHARS so a print loop can't exhaust memory. */
function append(output: OutputChunk[], chunks: OutputChunk[]): OutputChunk[] {
  const next = output.slice();
  for (const chunk of chunks) {
    const last = next[next.length - 1];
    if (last && last.stream === chunk.stream) {
      next[next.length - 1] = { stream: chunk.stream, text: last.text + chunk.text };
    } else {
      next.push(chunk);
    }
  }
  let total = next.reduce((sum, chunk) => sum + chunk.text.length, 0);
  while (total > MAX_OUTPUT_CHARS && next.length > 0) {
    const overflow = total - MAX_OUTPUT_CHARS;
    const first = next[0];
    if (first.text.length <= overflow) {
      next.shift();
      total -= first.text.length;
    } else {
      next[0] = { stream: first.stream, text: first.text.slice(overflow) };
      total -= overflow;
    }
  }
  return next;
}

function endState(end: RunEnd): Pick<RunState, "status" | "statusText" | "error" | "durationMs"> {
  switch (end.kind) {
    case "ok":
      return {
        status: "done",
        statusText: `Finished in ${formatSeconds(end.durationMs)}.`,
        error: null,
        durationMs: end.durationMs,
      };
    case "error":
      return {
        status: "error",
        statusText: end.error.line
          ? `${end.error.type} on line ${end.error.line}.`
          : `${end.error.type}.`,
        error: end.error,
        durationMs: end.durationMs,
      };
    case "stopped":
      return {
        status: "stopped",
        statusText:
          end.reason === "timeout"
            ? "Stopped after 30 seconds. Is there a loop that never ends?"
            : "Stopped. Python has been restarted.",
        error: null,
        durationMs: null,
      };
    case "unavailable":
      return {
        status: "unavailable",
        statusText: "Couldn't start Python. Check your connection and press Run to try again.",
        error: null,
        durationMs: null,
      };
  }
}

export function formatSeconds(ms: number) {
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}

/**
 * One runner's view of the shared Python worker: its own console, figures and
 * status, plus whether *another* runner currently holds the interpreter.
 */
export function usePythonRunner() {
  const owner = useId();
  const engine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [state, setState] = useState<RunState>(IDLE);
  const pending = useRef<OutputChunk[]>([]);
  const flushTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(flushTimer.current), []);

  const flush = useCallback(() => {
    flushTimer.current = undefined;
    const chunks = pending.current;
    if (chunks.length === 0) return;
    pending.current = [];
    setState((prev) => ({ ...prev, output: append(prev.output, chunks) }));
  }, []);

  const run = useCallback(
    (code: string, stdin: string[] = []) => {
      window.clearTimeout(flushTimer.current);
      pending.current = [];
      const warm = getPythonRuntime().getSnapshot().engine === "ready";
      const started = getPythonRuntime().run(owner, code, stdin, {
        onStatus: (phase, text) => {
          setState((prev) => ({ ...prev, status: phase, statusText: text }));
        },
        onOutput: (stream, text) => {
          // Batched: a loop printing 10,000 lines becomes a few dozen renders.
          pending.current.push({ stream, text });
          flushTimer.current ??= window.setTimeout(flush, FLUSH_MS);
        },
        onFigure: (png) => {
          setState((prev) => ({ ...prev, figures: [...prev.figures, png] }));
        },
        onEnd: (end) => {
          window.clearTimeout(flushTimer.current);
          const chunks = pending.current;
          pending.current = [];
          flushTimer.current = undefined;
          setState((prev) => ({ ...prev, ...endState(end), output: append(prev.output, chunks) }));
        },
      });
      if (started) {
        setState({
          ...IDLE,
          status: warm ? "running" : "booting",
          statusText: warm ? "Running…" : "Starting Python…",
        });
      }
    },
    [owner, flush],
  );

  const stop = useCallback(() => getPythonRuntime().stop("user"), []);
  const clear = useCallback(() => setState(IDLE), []);

  const isMine = engine.activeOwner === owner;
  return {
    ...state,
    run,
    stop,
    clear,
    /** This runner's code is executing (including boot and package loading). */
    isRunning: isMine,
    /** Another runner on the page holds the interpreter right now. */
    isBlocked: engine.activeOwner !== null && !isMine,
    engine: engine.engine,
  };
}

export type PythonRunner = ReturnType<typeof usePythonRunner>;
