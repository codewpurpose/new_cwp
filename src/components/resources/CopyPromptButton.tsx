"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Copies a prompt template. Mirrors the contact page's copy button: the icon
 * swaps for a check, the label says "Copied" for a moment, and a polite live
 * region announces it. The prompt text stays visible on the page, so it can
 * still be selected by hand when the clipboard (or JavaScript) is unavailable.
 */
export function CopyPromptButton({ text, title }: { text: string; title: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  const label = state === "copied" ? "Copied" : state === "failed" ? "Couldn’t copy" : "Copy";

  return (
    <button
      type="button"
      onClick={copy}
      data-state={state}
      aria-label={state === "idle" ? `Copy prompt: ${title}` : undefined}
      className="pages-copy-btn shrink-0"
    >
      <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          {state === "copied" ? (
            <motion.svg
              key="check"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 24 }}
            >
              <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="copy"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <rect x="5" y="5" width="8.5" height="8.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 3.2V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span>{label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Prompt copied" : state === "failed" ? "Couldn’t copy the prompt" : ""}
      </span>
    </button>
  );
}
