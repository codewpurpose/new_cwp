"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const INDENT = "    ";

/**
 * A plain <textarea> dressed as a code editor: line numbers, Tab to indent,
 * Enter keeps the indent (and adds one after a colon), Cmd/Ctrl+Enter runs.
 *
 * A textarea rather than CodeMirror or Monaco: those are 150–900 kB for
 * features a first-week Python student doesn't need, and a textarea is
 * already accessible, works with every screen reader and mobile keyboard, and
 * keeps native undo.
 *
 * Tab is captured for indentation, which would trap keyboard users, so Escape
 * releases it: after Escape, the next Tab moves focus on as normal.
 */
export function CodeEditor({
  value,
  onChange,
  onRun,
  label,
  describedBy,
  errorLine,
  minLines = 8,
  maxHeight,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  /** Accessible name for the textarea. */
  label: string;
  describedBy?: string;
  /** 1-based line to flag in the gutter after an error. */
  errorLine?: number | null;
  minLines?: number;
  /** CSS max-height of the scroll area; the editor grows until it reaches it. */
  maxHeight?: string;
  id?: string;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const tabReleased = useRef(false);
  const lineCount = value.split("\n").length;
  const rows = Math.max(minLines, lineCount);

  /** Replace [start, end) with `text`, through the browser's own editing so
   *  Cmd/Ctrl+Z still undoes it. Falls back to a direct edit where
   *  execCommand is unavailable. */
  const replace = (start: number, end: number, text: string, select?: [number, number]) => {
    const el = textarea.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(start, end);
    // An empty insertText misplaces the caret in Chrome; "delete" is the
    // native way to remove a selection.
    const native =
      typeof document.execCommand === "function" &&
      (text === "" ? document.execCommand("delete") : document.execCommand("insertText", false, text));
    if (!native) {
      const next = el.value.slice(0, start) + text + el.value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        el.setSelectionRange(start + text.length, start + text.length);
      });
    }
    if (select) {
      const [from, to] = select;
      requestAnimationFrame(() => el.setSelectionRange(from, to));
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = event.currentTarget;
    const { selectionStart: start, selectionEnd: end, value: text } = el;

    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      onRun?.();
      return;
    }

    if (event.key === "Escape") {
      tabReleased.current = true;
      return;
    }
    if (event.key === "Tab" && tabReleased.current) {
      // Let the browser move focus. Released for this one Tab only.
      tabReleased.current = false;
      return;
    }
    tabReleased.current = false;

    if (event.key === "Tab") {
      event.preventDefault();
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const multiLine = text.slice(start, end).includes("\n");

      if (!event.shiftKey && start === end) {
        replace(start, end, INDENT);
        return;
      }

      // Indent or dedent every line the selection touches.
      const blockEnd = end > start && text[end - 1] === "\n" ? end - 1 : end;
      const lineEndIndex = text.indexOf("\n", blockEnd);
      const blockStop = lineEndIndex === -1 ? text.length : lineEndIndex;
      const lines = text.slice(lineStart, blockStop).split("\n");
      const changed = lines.map((line) =>
        event.shiftKey ? line.replace(/^ {1,4}|^\t/, "") : INDENT + line,
      );
      const replacement = changed.join("\n");
      if (replacement === lines.join("\n")) return;
      const firstDelta = changed[0].length - lines[0].length;
      const newStart = Math.max(lineStart, start + firstDelta);
      replace(lineStart, blockStop, replacement, multiLine
        ? [lineStart, lineStart + replacement.length]
        : [newStart, newStart + (end - start)]);
      return;
    }

    if (event.key === "Enter" && !event.shiftKey && !event.altKey) {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const before = text.slice(lineStart, start);
      const indent = before.match(/^[ \t]*/)?.[0] ?? "";
      const opensBlock = /:\s*(#.*)?$/.test(before);
      event.preventDefault();
      replace(start, end, `\n${indent}${opensBlock ? INDENT : ""}`);
      return;
    }

    if (event.key === "Backspace" && start === end && start > 0) {
      // Inside leading whitespace, step back one indent level, not one space.
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const before = text.slice(lineStart, start);
      if (before.length > 0 && /^ +$/.test(before)) {
        const remove = before.length % 4 === 0 ? 4 : before.length % 4;
        event.preventDefault();
        replace(start - remove, start, "");
      }
    }
  };

  return (
    <div
      className="overflow-auto rounded-[inherit] has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:-outline-offset-2 has-[textarea:focus-visible]:outline-learn-code-ok/70"
      style={maxHeight ? { maxHeight } : undefined}
    >
      <div className="flex min-w-full w-max">
        <div
          aria-hidden="true"
          className="sticky left-0 z-[1] select-none bg-learn-code-bg py-4 pl-3 pr-3 text-right font-[family-name:var(--learn-font-mono)] text-[13px] leading-[22px] text-learn-code-dim/70"
        >
          {Array.from({ length: rows }, (_, index) => (
            <div
              key={index}
              className={cn(
                "tabular-nums",
                index >= lineCount && "opacity-0",
                errorLine === index + 1 && "rounded-sm bg-learn-code-err/20 text-learn-code-err",
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textarea}
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          wrap="off"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label={label}
          aria-describedby={describedBy}
          // `[field-sizing]` lets the textarea widen with long lines so the
          // outer box scrolls both ways and the gutter stays in step. Browsers
          // without it scroll horizontally inside the textarea instead.
          style={{ minHeight: `${rows * 22 + 32}px` }}
          className="block flex-auto resize-none overflow-x-auto overflow-y-hidden whitespace-pre bg-transparent py-4 pl-1 pr-4 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[22px] text-learn-code-fg caret-learn-code-ok outline-none [field-sizing:content] [tab-size:4] selection:bg-learn-code-ok/25"
        />
      </div>
    </div>
  );
}
