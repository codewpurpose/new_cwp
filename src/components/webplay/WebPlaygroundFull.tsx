"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOCUS_RING, TOOL_BUTTON, WebWorkbench } from "./WebWorkbench";
import { DEFAULT_STARTER, WEB_STARTERS, starterById } from "./starters";
import { encodeWebCode, webCodeFromHash, type WebCode } from "./share";

const STORAGE_KEY = "cwp-web-playground";

interface Loaded {
  code: WebCode;
  /** What Reset goes back to. */
  original: WebCode;
  starterId: string | null;
}

function pick(code: WebCode): WebCode {
  return { html: code.html, css: code.css, js: code.js };
}

/** A shared link wins, then this browser's last session, then the first
 *  starter. Client-only (loaded with ssr: false), so window is safe here. */
function initialState(): Loaded {
  const shared = webCodeFromHash(window.location.hash);
  if (shared) return { code: shared, original: shared, starterId: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<WebCode> & { starterId?: string };
      if (typeof saved.html === "string" && typeof saved.css === "string") {
        const code = { html: saved.html, css: saved.css, js: typeof saved.js === "string" ? saved.js : "" };
        const starter = starterById(saved.starterId);
        return { code, original: starter ? pick(starter) : code, starterId: starter?.id ?? null };
      }
    }
  } catch {
    // Storage can be blocked. Start fresh.
  }
  return { code: pick(DEFAULT_STARTER), original: pick(DEFAULT_STARTER), starterId: DEFAULT_STARTER.id };
}

function save(code: WebCode, starterId: string | null) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...code, starterId }));
  } catch {
    // Full or blocked storage only costs persistence.
  }
}

function clearShareHash() {
  if (window.location.hash.startsWith("#code=")) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

export function WebPlaygroundFull() {
  const [state, setState] = useState<Loaded>(initialState);
  const [shared, setShared] = useState<"idle" | "copied" | "ready">("idle");
  const sharedTimer = useRef<number | undefined>(undefined);
  const { code, original, starterId } = state;
  const starter = starterById(starterId);
  const changed = code.html !== original.html || code.css !== original.css || code.js !== original.js;

  useEffect(() => () => window.clearTimeout(sharedTimer.current), []);

  // A different share link pasted into this tab's address bar.
  useEffect(() => {
    const onHashChange = () => {
      const next = webCodeFromHash(window.location.hash);
      if (next) setState({ code: next, original: next, starterId: null });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const update = (next: WebCode) => {
    setState((prev) => ({ ...prev, code: next }));
    save(next, starterId);
    clearShareHash();
  };

  const choose = (id: string) => {
    const next = starterById(id);
    if (!next) return;
    setState({ code: pick(next), original: pick(next), starterId: next.id });
    save(pick(next), next.id);
    clearShareHash();
  };

  const share = async () => {
    const hash = `#code=${encodeWebCode(code)}`;
    window.history.replaceState(null, "", window.location.pathname + window.location.search + hash);
    let status: "copied" | "ready" = "ready";
    try {
      await navigator.clipboard.writeText(window.location.href);
      status = "copied";
    } catch {
      // No clipboard permission: the link is in the address bar instead.
    }
    setShared(status);
    window.clearTimeout(sharedTimer.current);
    sharedTimer.current = window.setTimeout(() => setShared("idle"), 2400);
  };

  return (
    <div>
      <div role="group" aria-label="Starters" className="flex flex-wrap gap-2">
        {WEB_STARTERS.map((item) => {
          const selected = item.id === starterId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => choose(item.id)}
              className={cn(
                "min-h-10 rounded-full border px-4 text-[0.875rem] font-medium transition-colors",
                FOCUS_RING,
                selected
                  ? "border-[#3e7f5c] bg-[#dbefdb] text-[var(--home-moss)]"
                  : "border-[var(--home-hairline-strong)] bg-[var(--home-white)] text-[var(--home-ink-soft)] hover:border-[#3e7f5c] hover:text-[var(--home-moss)]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 min-h-[1.5rem] text-[0.9375rem] text-[var(--home-ink-soft)]">
        {starter ? starter.hint : "Edit anything and the preview follows. Share makes a link to exactly this code."}
      </p>

      <div className="mt-5">
        <WebWorkbench
          code={code}
          onChange={update}
          showJs
          wide
          editorHeight="min(30rem, 60vh)"
          previewHeight="min(30rem, 60vh)"
          actions={
            <>
              <button
                type="button"
                onClick={() => update(original)}
                disabled={!changed}
                className={`${TOOL_BUTTON} disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent`}
              >
                <RotateCcw aria-hidden="true" className="size-3.5" />
                Reset
              </button>
              <button type="button" onClick={share} className={TOOL_BUTTON}>
                {shared === "idle" ? <Link2 aria-hidden="true" className="size-3.5" /> : <Check aria-hidden="true" className="size-3.5" />}
                <span aria-live="polite">
                  {shared === "copied" ? "Link copied" : shared === "ready" ? "Link in address bar" : "Share"}
                </span>
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}
