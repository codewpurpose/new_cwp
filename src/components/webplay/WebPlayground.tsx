"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Maximize2, RotateCcw } from "lucide-react";
import { TOOL_BUTTON, WebWorkbench } from "./WebWorkbench";
import { webPlaygroundHref, type WebCode } from "./share";

export interface WebPlaygroundProps {
  initialHtml: string;
  initialCss?: string;
  /** Pass this (even as "") to show a JS tab. */
  initialJs?: string;
  /** Height of the preview, and the most the editor grows to, in px. Default 300. */
  height?: number;
  /** Short label shown in the toolbar, e.g. "Try it: the box model". */
  title?: string;
}

/**
 * A small live HTML/CSS (and optional JS) editor for lessons. The preview runs
 * in a sandboxed iframe with no network access; see preview.ts.
 */
export function WebPlayground({ initialHtml, initialCss = "", initialJs, height = 300, title }: WebPlaygroundProps) {
  const initial: WebCode = { html: initialHtml, css: initialCss, js: initialJs ?? "" };
  const [code, setCode] = useState<WebCode>(initial);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);
  // Size the editor to the longest starting snippet (plus room to add a few
  // lines), capped at `height`, so a two-line example is not a tall dark box.
  // Based on the initial code so the frame never jumps while typing.
  const longest = Math.max(...[initial.html, initial.css, initial.js].map((text) => text.split("\n").length));
  const editorHeight = Math.min(height, Math.max(6, longest + 3) * 22 + 24);
  const changed =code.html !== initial.html || code.css !== initial.css || code.js !== initial.js;

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const copy = async () => {
    const parts = [
      code.html.trim() && code.html,
      code.css.trim() && `<style>\n${code.css}\n</style>`,
      code.js.trim() && `<script>\n${code.js}\n</script>`,
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setCopied(true);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be refused; the code is still selectable.
    }
  };

  return (
    <div className="my-8">
      <WebWorkbench
        code={code}
        onChange={setCode}
        showJs={initialJs !== undefined}
        title={title}
        editorHeight={`${editorHeight}px`}
        previewHeight={`${height}px`}
        actions={
          <>
            <button
              type="button"
              onClick={() => setCode(initial)}
              disabled={!changed}
              className={`${TOOL_BUTTON} disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent`}
            >
              <RotateCcw aria-hidden="true" className="size-3.5" />
              Reset
            </button>
            <button type="button" onClick={copy} className={TOOL_BUTTON}>
              {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
            <Link
              href={webPlaygroundHref(code)}
              target="_blank"
              rel="noopener"
              prefetch={false}
              className={TOOL_BUTTON}
            >
              <Maximize2 aria-hidden="true" className="size-3.5" />
              <span className="@md:hidden">Full editor</span>
              <span className="hidden @md:inline">Pop out to full editor</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
          </>
        }
      />
    </div>
  );
}
