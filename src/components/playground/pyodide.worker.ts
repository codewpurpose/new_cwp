/**
 * Runs Python off the main thread, so a `while True:` freezes this worker and
 * never the page. The page stops runaway code by terminating the worker and
 * starting a new one (see python-runtime.ts); there is no cooperative
 * interrupt, because that would need SharedArrayBuffer and cross-origin
 * isolation headers the site does not send.
 *
 * Nothing is fetched until the page posts "init", which it only does on the
 * student's first Run. Pyodide then comes from jsDelivr at a pinned version,
 * and packages are fetched from the same place as the code imports them.
 */
import { PYODIDE_INDEX_URL, type FromWorker, type ToWorker } from "./protocol";
import { RUNNER_PRELUDE } from "./runner-prelude";

/* The slice of Pyodide's API used here. Pyodide's own types would mean a
   dependency for one file; these are checked against v0.27's docs. */
interface PyProxyFunction {
  (...args: unknown[]): unknown;
  destroy(): void;
}
interface Pyodide {
  runPython(code: string): unknown;
  loadPackagesFromImports(
    code: string,
    options?: { messageCallback?: (message: string) => void; errorCallback?: (message: string) => void },
  ): Promise<unknown>;
  setStdout(options: { write: (buffer: Uint8Array) => number }): void;
  setStderr(options: { write: (buffer: Uint8Array) => number }): void;
  registerJsModule(name: string, module: object): void;
  globals: { get(name: string): PyProxyFunction };
  loadedPackages: Record<string, string>;
}
interface WorkerScope {
  postMessage(message: FromWorker): void;
  addEventListener(type: "message", listener: (event: MessageEvent<ToWorker>) => void): void;
  importScripts(...urls: string[]): void;
  loadPyodide?: (options: { indexURL: string }) => Promise<Pyodide>;
}

const scope = self as unknown as WorkerScope;
const post = (message: FromWorker) => scope.postMessage(message);

/** Import name -> the name students know it by, for the "Loading …" status. */
const KNOWN_PACKAGES: Record<string, string> = {
  numpy: "numpy",
  pandas: "pandas",
  sklearn: "scikit-learn",
  matplotlib: "matplotlib",
  scipy: "scipy",
};

let pyodidePromise: Promise<Pyodide> | null = null;
/** Which run the stdout/stderr callbacks belong to. Runs never overlap. */
let currentId = -1;
let queue: Promise<void> = Promise.resolve();

function streamTo(kind: "stdout" | "stderr") {
  // Pyodide hands over raw bytes; a streaming decoder keeps a multi-byte
  // character that straddles two writes (an emoji, say) in one piece.
  const decoder = new TextDecoder();
  return (buffer: Uint8Array) => {
    const text = decoder.decode(buffer, { stream: true });
    if (text) post({ type: kind, id: currentId, text });
    return buffer.length;
  };
}

function boot(): Promise<Pyodide> {
  pyodidePromise ??= (async () => {
    post({ type: "status", id: null, phase: "booting", text: "Starting Python (first run downloads about 10 MB)…" });
    scope.importScripts(`${PYODIDE_INDEX_URL}pyodide.js`);
    if (!scope.loadPyodide) throw new Error("Pyodide did not load");
    const pyodide = await scope.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
    pyodide.setStdout({ write: streamTo("stdout") });
    pyodide.setStderr({ write: streamTo("stderr") });
    pyodide.registerJsModule("cwp_bridge", {
      figure: (png: string) => post({ type: "figure", id: currentId, png }),
    });
    pyodide.runPython(RUNNER_PRELUDE);
    post({ type: "ready" });
    return pyodide;
  })();
  return pyodidePromise;
}

function importsOf(pyodide: Pyodide, code: string): string[] {
  const find = pyodide.globals.get("_cwp_find_imports");
  try {
    return JSON.parse(String(find(code))) as string[];
  } catch {
    // A syntax error: compile() will report it properly in a moment.
    return [];
  } finally {
    find.destroy();
  }
}

async function run(id: number, code: string, stdin: string[]) {
  let pyodide: Pyodide;
  try {
    pyodide = await boot();
  } catch (error) {
    pyodidePromise = null;
    post({ type: "fatal", message: error instanceof Error ? error.message : String(error) });
    return;
  }

  currentId = id;
  const imports = importsOf(pyodide, code);
  const missing = imports
    .filter((name) => KNOWN_PACKAGES[name] && !pyodide.loadedPackages[KNOWN_PACKAGES[name]])
    .map((name) => KNOWN_PACKAGES[name]);
  if (missing.length > 0) {
    post({ type: "status", id, phase: "packages", text: `Loading ${missing.join(", ")}…` });
  }
  try {
    await pyodide.loadPackagesFromImports(code, {
      messageCallback: (message) => {
        // Unknown-to-us packages from Pyodide's index still get a status line.
        if (missing.length === 0 && message.startsWith("Loading ")) {
          post({ type: "status", id, phase: "packages", text: `${message}…` });
        }
      },
      errorCallback: () => {},
    });
  } catch {
    // Not fatal: the import itself will raise ModuleNotFoundError, which the
    // student can read, instead of a network error they can't act on.
  }

  post({ type: "status", id, phase: "running", text: "Running…" });
  const started = performance.now();
  const runner = pyodide.globals.get("_cwp_run");
  let error = null;
  try {
    const result = runner(code, stdin, imports.includes("matplotlib"));
    if (typeof result === "string") error = JSON.parse(result);
  } catch (caught) {
    // Only reachable if the runner itself breaks; still show something.
    error = {
      type: "InternalError",
      message: caught instanceof Error ? caught.message : String(caught),
      line: null,
      traceback: "",
      hint: null,
    };
  } finally {
    runner.destroy();
  }
  post({ type: "done", id, error, durationMs: Math.round(performance.now() - started) });
}

scope.addEventListener("message", (event) => {
  const message = event.data;
  if (message.type === "init") {
    boot().catch((error) => {
      pyodidePromise = null;
      post({ type: "fatal", message: error instanceof Error ? error.message : String(error) });
    });
  } else if (message.type === "run") {
    // Runs are queued: a second Run while one is still loading packages waits
    // its turn rather than interleaving output.
    queue = queue.then(() => run(message.id, message.code, message.stdin));
  }
});
