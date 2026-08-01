"use client";

import { useState } from "react";

interface CodeCopyButtonProps {
  value: string;
}

export function CodeCopyButton({ value }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; leaving the label unchanged is a
      // truthful "nothing happened" rather than a false success.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="learn-focusable rounded-learn-sm border border-learn-code-line px-2 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-learn-code-dim transition-colors hover:text-learn-code-fg motion-reduce:transition-none"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
