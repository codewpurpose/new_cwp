"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeCopyButtonProps {
  value: string;
  /** "light" for the prompt variant, which sits on a paper surface. */
  tone?: "dark" | "light";
}

export function CodeCopyButton({ value, tone = "dark" }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied; leaving the label unchanged is a
      // truthful "nothing happened" rather than a false success.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        data-copied={copied ? "true" : undefined}
        data-tone={tone}
        className="lr-copy learn-focusable"
        aria-label="Copy code"
      >
        {/* Both icons stay mounted and cross-fade, so the button never changes
            width when its label flips. */}
        <span className="lr-copy-icons" aria-hidden="true">
          <Copy className="lr-copy-icon lr-copy-icon-idle size-3.5" />
          <Check className="lr-copy-icon lr-copy-icon-done size-3.5" strokeWidth={3} />
        </span>
        <span className="lr-copy-label" aria-hidden="true">
          <span className="lr-copy-label-idle">Copy</span>
          <span className="lr-copy-label-done">Copied</span>
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
}
