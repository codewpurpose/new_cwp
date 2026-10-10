import { RUN_TIMEOUT_MS, type FromWorker, type PythonError, type ToWorker } from "./protocol";

/**
 * One Python worker per tab, shared by every runner on the page: the
 * playground's editor and each lesson code block's inline runner. Booting
 * Pyodide costs seconds and tens of megabytes, so a lesson with eight runnable
 * blocks must not start eight copies.
 *
 * Only one run is in flight at a time; runners read `activeOwner` to disable
 * their Run button while someone else's code is executing.
 *
 * Stopping terminates the worker outright (the only way to interrupt a
 * `while True:` without SharedArrayBuffer) and immediately starts a
 * replacement, which boots from the browser's HTTP cache.
 */

export type RunEnd =
  | { kind: "ok"; durationMs: number }
  | { kind: "error"; error: PythonError; durationMs: number }
  | { kind: "stopped"; reason: "user" | "timeout" }
  | { kind: "unavailable"; message: string };

export interface RunHandlers {
  onStatus(phase: "booting" | "packages" | "running", text: string): void;
  onOutput(stream: "out" | "err", text: string): void;
  onFigure(png: string): void;
  onEnd(end: RunEnd): void;
}

export interface RuntimeSnapshot {
  /** "cold" until the first Run; nothing has been downloaded yet. */
  engine: "cold" | "booting" | "ready";
  /** useId() of the runner whose code is executing, or null when idle. */
  activeOwner: string | null;
}

interface ActiveRun {
  id: number;
  owner: string;
  handlers: RunHandlers;
  timer: number | undefined;
}

const COLD: RuntimeSnapshot = { engine: "cold", activeOwner: null };

class PythonRuntime {
  private worker: Worker | null = null;
  private snapshot: RuntimeSnapshot = COLD;
  private listeners = new Set<() => void>();
  private active: ActiveRun | null = null;
  private nextId = 1;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.snapshot;

  getServerSnapshot = () => COLD;

  run(owner: string, code: string, stdin: string[], handlers: RunHandlers) {
    if (this.active) return false;
    const id = this.nextId++;
    this.active = { id, owner, handlers, timer: undefined };
    const worker = this.ensureWorker();
    this.update({ activeOwner: owner });
    worker.postMessage({ type: "run", id, code, stdin } satisfies ToWorker);
    return true;
  }

  /** Kill whatever is running and bring up a fresh interpreter. */
  stop(reason: "user" | "timeout" = "user") {
    const active = this.active;
    if (!active) return;
    this.finish({ kind: "stopped", reason });
    this.worker?.terminate();
    this.worker = null;
    this.update({ engine: "cold" });
    // Restart straight away, so the next Run doesn't pay for the boot. Only
    // reachable after a run, so this never downloads anything uninvited.
    this.ensureWorker();
  }

  private ensureWorker() {
    if (this.worker) return this.worker;
    // The literal `new URL(…, import.meta.url)` is what lets webpack and
    // Turbopack find the worker and emit it as its own chunk.
    const worker = new Worker(new URL("./pyodide.worker.ts", import.meta.url));
    worker.addEventListener("message", (event: MessageEvent<FromWorker>) => {
      if (worker === this.worker) this.receive(event.data);
    });
    worker.addEventListener("error", () => {
      if (worker !== this.worker) return;
      this.finish({ kind: "unavailable", message: "The Python worker crashed." });
      this.worker.terminate();
      this.worker = null;
      this.update({ engine: "cold" });
    });
    worker.postMessage({ type: "init" } satisfies ToWorker);
    this.worker = worker;
    this.update({ engine: "booting" });
    return worker;
  }

  private receive(message: FromWorker) {
    const active = this.active;
    switch (message.type) {
      case "ready":
        this.update({ engine: "ready" });
        return;
      case "fatal":
        this.finish({ kind: "unavailable", message: message.message });
        this.worker?.terminate();
        this.worker = null;
        this.update({ engine: "cold" });
        return;
      case "status":
        if (!active || (message.id !== null && message.id !== active.id)) return;
        if (message.phase === "running") {
          // The clock starts when the student's code does, not while numpy
          // downloads on a slow connection.
          window.clearTimeout(active.timer);
          active.timer = window.setTimeout(() => this.stop("timeout"), RUN_TIMEOUT_MS);
        }
        active.handlers.onStatus(message.phase, message.text);
        return;
      case "stdout":
      case "stderr":
        if (active?.id === message.id) {
          active.handlers.onOutput(message.type === "stdout" ? "out" : "err", message.text);
        }
        return;
      case "figure":
        if (active?.id === message.id) active.handlers.onFigure(message.png);
        return;
      case "done":
        if (active?.id !== message.id) return;
        this.finish(
          message.error
            ? { kind: "error", error: message.error, durationMs: message.durationMs }
            : { kind: "ok", durationMs: message.durationMs },
        );
        return;
    }
  }

  private finish(end: RunEnd) {
    const active = this.active;
    if (!active) return;
    window.clearTimeout(active.timer);
    this.active = null;
    this.update({ activeOwner: null });
    active.handlers.onEnd(end);
  }

  private update(patch: Partial<RuntimeSnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((listener) => listener());
  }
}

let runtime: PythonRuntime | null = null;

/** Created on first use in the browser; importing this module costs nothing. */
export function getPythonRuntime() {
  runtime ??= new PythonRuntime();
  return runtime;
}
