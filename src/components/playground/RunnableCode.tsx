"use client";
import "@/components/playground/tools.css";

import { createContext, useContext, useId, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import { usePythonRunner, type PythonRunner } from "./usePythonRunner";

/**
 * The Run button on a lesson's Python code block, and the inline runner it
 * opens underneath.
 *
 * CodeBlock stays a server component: the lesson's code is rendered on the
 * server as before, and this provider only wraps it. The Run button (inside
 * the block's header) and the runner (after the block) are two separate
 * islands that share state through this context.
 *
 * The run starts in the click handler rather than in an effect when the
 * runner mounts, so the runner UI can load lazily without delaying or
 * double-firing the run.
 */

interface RunnableContextValue {
  original: string;
  code: string;
  setCode: (code: string) => void;
  open: boolean;
  close: () => void;
  runCode: (code: string, stdin?: string[]) => void;
  runner: PythonRunner;
  panelId: string;
}

const RunnableContext = createContext<RunnableContextValue | null>(null);

export function useRunnable() {
  const value = useContext(RunnableContext);
  if (!value) throw new Error("useRunnable must be used inside <RunnableCode>");
  return value;
}

export function RunnableCode({ code: original, children }: { code: string; children: ReactNode }) {
  const [code, setCode] = useState(original);
  const [open, setOpen] = useState(false);
  const runner = usePythonRunner();
  const panelId = `${useId()}-runner`;

  const runCode = (next: string, stdin: string[] = []) => {
    setOpen(true);
    runner.run(next, stdin);
  };

  const close = () => {
    if (runner.isRunning) runner.stop();
    setOpen(false);
  };

  return (
    <RunnableContext.Provider value={{ original, code, setCode, open, close, runCode, runner, panelId }}>
      {children}
    </RunnableContext.Provider>
  );
}

/** Sits beside Copy in the code block's header. */
export function CodeRunButton() {
  const { code, open, runCode, runner, panelId } = useRunnable();
  const disabled = runner.isRunning || runner.isBlocked;
  return (
    <button
      type="button"
      onClick={() => runCode(code)}
      disabled={disabled}
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      aria-label={open ? "Run this code again" : "Run this code"}
      className="lr-copy learn-focusable !text-learn-code-ok hover:!text-learn-code-fg disabled:cursor-progress disabled:opacity-60"
    >
      <Play className="size-3.5 fill-current" aria-hidden="true" />
      <span aria-hidden="true">Run</span>
    </button>
  );
}

const InlineRunner = dynamic(() => import("./InlineRunner").then((mod) => mod.InlineRunner), {
  ssr: false,
  loading: () => (
    <div className="mt-2 h-24 rounded-learn-md bg-learn-code-bg/90" aria-busy="true" aria-label="Loading the code runner" />
  ),
});

/** Renders nothing until Run is pressed; then loads the runner UI. */
export function InlineRunnerSlot() {
  const { open } = useRunnable();
  return open ? <InlineRunner /> : null;
}
