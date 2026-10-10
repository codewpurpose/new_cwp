"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Copies the team address, for readers whose mail link opens the wrong app (or
 * nothing at all). A small check swaps in for the copy icon and the label says
 * "Copied" for a couple of seconds; a polite live region announces it once.
 * If the clipboard is unavailable the label says so instead of failing
 * silently, and the address is still right there to select by hand.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  const label = state === "copied" ? "Copied" : state === "failed" ? "Couldn’t copy" : "Copy address";

  return (
    <button
      type="button"
      onClick={copy}
      data-state={state}
      className="pages-copy-btn"
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
        {state === "copied" ? "Email address copied" : state === "failed" ? "Couldn’t copy the email address" : ""}
      </span>
    </button>
  );
}
