/**
 * The contract between the page and the Python worker. Both sides import these
 * types, so a renamed field fails the typecheck instead of silently dropping
 * output on the floor.
 */

/**
 * Pinned to an exact release so a new Pyodide can never change behaviour under
 * a lesson overnight. 0.27.7 ships Python 3.12, numpy 2.0, pandas 2.2,
 * scikit-learn 1.6 and matplotlib 3.8. Bumping it means re-running every
 * starter in the playground.
 */
export const PYODIDE_VERSION = "0.27.7";
export const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** Wall-clock limit for the student's code itself. Downloading Python and its
 *  packages does not count against it; only the time spent executing does. */
export const RUN_TIMEOUT_MS = 30_000;

/** A runaway print loop would otherwise grow the console until the tab dies. */
export const MAX_OUTPUT_CHARS = 200_000;

export interface PythonError {
  /** Exception class name, e.g. "NameError". */
  type: string;
  message: string;
  /** 1-based line in the student's code, when Python could pin one down. */
  line: number | null;
  /** The traceback with the runner's own frames removed. */
  traceback: string;
  /** One plain-English sentence about what this kind of error usually means. */
  hint: string | null;
}

export type ToWorker =
  | { type: "init" }
  | { type: "run"; id: number; code: string; stdin: string[] };

export type WorkerPhase = "booting" | "packages" | "running";

export type FromWorker =
  | { type: "status"; id: number | null; phase: WorkerPhase; text: string }
  | { type: "ready" }
  | { type: "stdout"; id: number; text: string }
  | { type: "stderr"; id: number; text: string }
  | { type: "figure"; id: number; png: string }
  | { type: "done"; id: number; error: PythonError | null; durationMs: number }
  | { type: "fatal"; message: string };
