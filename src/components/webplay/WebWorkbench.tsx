"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WebCodeEditor } from "./WebCodeEditor";
import { PREVIEW_MESSAGE_TAG, buildPreviewDocument } from "./preview";
import type { WebCode } from "./share";

export type WebTab = keyof WebCode;

const TAB_LABEL: Record<WebTab, string> = { html: "HTML", css: "CSS", js: "JS" };
const TAB_NAME: Record<WebTab, string> = { html: "HTML", css: "CSS", js: "JavaScript" };

/** How long typing has to pause before the preview redraws. */
const PREVIEW_DELAY_MS = 300;

/** Shared focus ring for every control in the editor. */
export const FOCUS_RING =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3e7f5c]";

export const TOOL_BUTTON = cn(
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-[0.8125rem] font-medium text-[var(--home-moss)] transition-colors hover:bg-white/80",
  FOCUS_RING,
);

/**
 * The controlled core of both the inline lesson editor and the full-page
 * editor: tabs for each language, a code editor, and a sandboxed live preview
 * that redraws shortly after typing stops.
 */
export function WebWorkbench({
  code,
  onChange,
  showJs,
  title,
  actions,
  editorHeight,
  previewHeight,
  wide = false,
}: {
  code: WebCode;
  onChange: (code: WebCode) => void;
  showJs: boolean;
  title?: string;
  /** Buttons on the right of the toolbar. */
  actions?: ReactNode;
  editorHeight: string;
  previewHeight: string;
  /** Full-page layout: side by side from a narrower container width. */
  wide?: boolean;
}) {
  const id = useId();
  const tabs: WebTab[] = showJs ? ["html", "css", "js"] : ["html", "css"];
  const [active, setActive] = useState<WebTab>("html");
  const current: WebTab = tabs.includes(active) ? active : "html";
  const tabRefs = useRef<Partial<Record<WebTab, HTMLButtonElement | null>>>({});

  const doc = buildPreviewDocument(code);
  const [previewDoc, setPreviewDoc] = useState(doc);
  const [error, setError] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (doc === previewDoc) return;
    const timer = window.setTimeout(() => {
      setError(null);
      setPreviewDoc(doc);
    }, PREVIEW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [doc, previewDoc]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data as { source?: string; message?: unknown } | null;
      if (data?.source === PREVIEW_MESSAGE_TAG && typeof data.message === "string") {
        setError(data.message.slice(0, 300));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.indexOf(current);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(tabs[next]);
    tabRefs.current[tabs[next]]?.focus();
  };

  const hintId = `${id}-hint`;
  const panelId = `${id}-panel`;

  return (
    <div className="@container overflow-hidden rounded-2xl border border-[var(--home-hairline-strong)] bg-[var(--home-white)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[var(--home-hairline)] bg-[#dbefdb]/60 px-3 py-2">
        {title ? (
          <p className="mr-1 font-[family-name:var(--learn-font-mono)] text-[0.75rem] font-medium tracking-[0.08em] text-[#3e7f5c] uppercase">
            {title}
          </p>
        ) : null}
        <div role="tablist" aria-label="Code to edit" className="flex gap-1 rounded-lg bg-white/55 p-0.5">
          {tabs.map((tab) => {
            const selected = tab === current;
            return (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${tab}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab)}
                onKeyDown={onTabKey}
                className={cn(
                  "min-h-8 rounded-md px-3 font-[family-name:var(--learn-font-mono)] text-[0.75rem] font-medium transition-colors",
                  FOCUS_RING,
                  selected
                    ? "bg-[var(--home-white)] text-[var(--home-moss)] shadow-[0_0_0_1px_rgba(62,127,92,0.35)]"
                    : "text-[var(--home-ink-quiet)] hover:text-[var(--home-moss)]",
                )}
              >
                {TAB_LABEL[tab]}
              </button>
            );
          })}
        </div>
        {actions ? <div className="ml-auto flex flex-wrap items-center gap-1">{actions}</div> : null}
      </div>

      <div className={cn("grid", wide ? "@3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "@4xl:grid-cols-2")}>
        <div role="tabpanel" id={panelId} aria-labelledby={`${id}-tab-${current}`} className="min-w-0 bg-learn-code-bg">
          <WebCodeEditor
            key={current}
            value={code[current]}
            onChange={(value) => onChange({ ...code, [current]: value })}
            label={`${TAB_NAME[current]} code`}
            describedBy={hintId}
            height={editorHeight}
          />
          <p id={hintId} className="sr-only">
            The preview updates as you type. Press Escape, then Tab, to move focus out of the editor.
          </p>
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-col border-t border-[var(--home-hairline)]",
            wide ? "@3xl:border-t-0 @3xl:border-l" : "@4xl:border-t-0 @4xl:border-l",
          )}
        >
          <div className="flex items-center gap-2 border-b border-[var(--home-hairline)] bg-[var(--home-page)] px-3 py-1.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#3e7f5c]" />
            <span className="font-[family-name:var(--learn-font-mono)] text-[0.6875rem] font-medium tracking-[0.08em] text-[var(--home-ink-quiet)] uppercase">
              Live preview
            </span>
          </div>
          <iframe
            ref={frame}
            title={title ? `${title}: live preview` : "Live preview"}
            srcDoc={previewDoc}
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="block w-full flex-auto bg-white"
            style={{ height: previewHeight }}
          />
          <p role="status" className={cn(error ? "block" : "sr-only")}>
            {error ? (
              <span className="block border-t border-[var(--home-hairline)] bg-[#fdf1ec] px-3 py-2 font-[family-name:var(--learn-font-mono)] text-[0.75rem] leading-[1.5] text-[#8a3a1f]">
                JavaScript error: {error}
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
