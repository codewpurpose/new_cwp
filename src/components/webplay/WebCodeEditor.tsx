"use client";

import { useRef, type KeyboardEvent } from "react";

const INDENT = "  ";

/**
 * A plain <textarea> dressed as a code editor for HTML, CSS and JS: line
 * numbers, Tab to indent (two spaces, the web convention), and Enter keeps the
 * current indent, adding one after an opening brace or tag.
 *
 * Tab is captured for indentation, which would trap keyboard users, so Escape
 * releases it: after Escape, the next Tab moves focus on as normal. The hint
 * is announced through aria-describedby.
 */
export function WebCodeEditor({
  value,
  onChange,
  label,
  describedBy,
  id,
  height,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  describedBy?: string;
  id?: string;
  /** CSS height of the scroll area. */
  height: string;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const tabReleased = useRef(false);
  const lineCount = value.split("\n").length;

  /** Replace [start, end) with `text` through the browser's own editing, so
   *  Cmd/Ctrl+Z still undoes it. Falls back to a direct edit. */
  const replace = (start: number, end: number, text: string, select?: [number, number]) => {
    const el = textarea.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(start, end);
    const native =
      typeof document.execCommand === "function" &&
      (text === "" ? document.execCommand("delete") : document.execCommand("insertText", false, text));
    if (!native) {
      onChange(el.value.slice(0, start) + text + el.value.slice(end));
      requestAnimationFrame(() => el.setSelectionRange(start + text.length, start + text.length));
    }
    if (select) {
      const [from, to] = select;
      requestAnimationFrame(() => el.setSelectionRange(from, to));
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = event.currentTarget;
    const { selectionStart: start, selectionEnd: end, value: text } = el;

    if (event.key === "Escape") {
      tabReleased.current = true;
      return;
    }
    if (event.key === "Tab" && tabReleased.current) {
      tabReleased.current = false;
      return;
    }
    tabReleased.current = false;

    if (event.key === "Tab") {
      event.preventDefault();
      if (!event.shiftKey && start === end) {
        replace(start, end, INDENT);
        return;
      }
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const blockEnd = end > start && text[end - 1] === "\n" ? end - 1 : end;
      const lineEndIndex = text.indexOf("\n", blockEnd);
      const blockStop = lineEndIndex === -1 ? text.length : lineEndIndex;
      const lines = text.slice(lineStart, blockStop).split("\n");
      const changed = lines.map((line) => (event.shiftKey ? line.replace(/^ {1,2}|^\t/, "") : INDENT + line));
      const replacement = changed.join("\n");
      if (replacement === lines.join("\n")) return;
      replace(lineStart, blockStop, replacement, [lineStart, lineStart + replacement.length]);
      return;
    }

    if (event.key === "Enter" && !event.shiftKey && !event.altKey && !event.metaKey && !event.ctrlKey) {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const before = text.slice(lineStart, start);
      const indent = before.match(/^[ \t]*/)?.[0] ?? "";
      // After "{", "(" or "[", or an opening tag that is not self-closing.
      const opens = /[{([]\s*$/.test(before) || /<(?!\/)(?!(?:br|hr|img|input|meta|link)\b)[a-z][^>]*[^/]>\s*$/i.test(before);
      event.preventDefault();
      replace(start, end, `\n${indent}${opens ? INDENT : ""}`);
    }
  };

  return (
    <div
      className="overflow-auto bg-learn-code-bg has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:-outline-offset-2 has-[textarea:focus-visible]:outline-[#9fd3b0]"
      style={{ height }}
    >
      <div className="flex min-h-full w-max min-w-full">
        <div
          aria-hidden="true"
          className="sticky left-0 z-[1] select-none bg-learn-code-bg py-3 pr-3 pl-3 text-right font-[family-name:var(--learn-font-mono)] text-[13px] leading-[22px] text-learn-code-dim/60"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index} className="tabular-nums">
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
          rows={lineCount}
          wrap="off"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label={label}
          aria-describedby={describedBy}
          style={{ minHeight: `${lineCount * 22 + 24}px` }}
          className="block flex-auto resize-none overflow-hidden whitespace-pre bg-transparent py-3 pr-4 pl-1 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[22px] text-learn-code-fg caret-[#9fd3b0] outline-none [field-sizing:content] [tab-size:2] selection:bg-[#9fd3b0]/25"
        />
      </div>
    </div>
  );
}
