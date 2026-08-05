"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

/**
 * A full sketch whiteboard powered by Excalidraw — shapes, arrows, text,
 * freehand, colours, the lot. Boards save to the student's own device (no
 * account, no upload): the scene JSON plus a thumbnail live in localStorage,
 * each under a name the student chooses when saving.
 *
 * Excalidraw is a heavy, browser-only component, so it's loaded client-side only
 * (ssr:false) and code-split away from the rest of the dashboard.
 */
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((m) => m.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-[var(--home-ink-soft)]">
        Loading whiteboard…
      </div>
    ),
  },
);

const BOARDS_KEY = "cwp-whiteboards-v2";
const BG = "#fffdf8";

interface SavedBoard {
  id: string;
  name: string;
  scene: string; // serializeAsJSON output
  thumb: string; // PNG data URL preview
  updated: number;
}

function loadBoards(): SavedBoard[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOARDS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function Whiteboard() {
  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null);

  const [boards, setBoards] = useState<SavedBoard[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeName, setActiveName] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoards(loadBoards());
  }, []);

  const persist = (next: SavedBoard[]) => {
    setBoards(next);
    try {
      localStorage.setItem(BOARDS_KEY, JSON.stringify(next));
      setError(null);
    } catch {
      setError("This board is too large to save on the device (try fewer images).");
    }
  };

  const openSaveDialog = () => {
    if (!apiRef.current) return;
    setNameDraft(activeName);
    setError(null);
    setSaveOpen(true);
  };

  const confirmSave = async () => {
    const api = apiRef.current;
    if (!api) return;
    setBusy(true);
    try {
      const { serializeAsJSON, exportToCanvas } = await import("@excalidraw/excalidraw");
      const elements = api.getSceneElements();
      const appState = api.getAppState();
      const files = api.getFiles();

      const scene = serializeAsJSON(elements, appState, files, "local");
      const canvas = await exportToCanvas({
        elements,
        appState: { ...appState, exportBackground: true, viewBackgroundColor: BG },
        files,
        maxWidthOrHeight: 480,
      });
      const thumb = canvas.toDataURL("image/png");

      const now = Date.now();
      const name = nameDraft.trim() || `Whiteboard ${boards.length + 1}`;

      if (activeId) {
        persist(boards.map((b) => (b.id === activeId ? { ...b, name, scene, thumb, updated: now } : b)));
      } else {
        const id = String(now);
        persist([{ id, name, scene, thumb, updated: now }, ...boards]);
        setActiveId(id);
      }
      setActiveName(name);
      setSaveOpen(false);
    } finally {
      setBusy(false);
    }
  };

  const openBoard = async (b: SavedBoard) => {
    const api = apiRef.current;
    if (!api) return;
    const { restore } = await import("@excalidraw/excalidraw");
    const restored = restore(JSON.parse(b.scene), null, null);
    api.updateScene({ elements: restored.elements, appState: restored.appState });
    if (restored.files) api.addFiles(Object.values(restored.files));
    api.scrollToContent(restored.elements, { fitToContent: true });
    setActiveId(b.id);
    setActiveName(b.name);
  };

  const newBoard = () => {
    apiRef.current?.resetScene();
    setActiveId(null);
    setActiveName("");
  };

  const removeBoard = (id: string) => {
    persist(boards.filter((b) => b.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setActiveName("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {activeName || "Untitled whiteboard"}
          </p>
          <p className="text-xs text-[var(--home-ink-soft)]">
            {activeId ? "Saved on this device" : "Unsaved — name it when you save"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={newBoard} className="home-btn home-btn-outline !py-1.5">
            New
          </button>
          <button type="button" onClick={openSaveDialog} className="home-btn home-btn-fill !py-1.5">
            {activeId ? "Save" : "Save board"}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-[#9c0006]">{error}</p>}

      <div className="excalidraw-cwp mt-4 h-[72vh] min-h-[520px] overflow-hidden rounded-xl border-[0.5px] border-[var(--home-hairline)]">
        <Excalidraw
          excalidrawAPI={(api) => {
            apiRef.current = api;
          }}
          initialData={{ appState: { viewBackgroundColor: BG } }}
        />
      </div>

      {saveOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => !busy && setSaveOpen(false)}
        >
          <div
            className="home-card w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl">
              {activeId ? "Save changes" : "Name this whiteboard"}
            </h3>
            <p className="mt-1 text-[13px] text-[var(--home-ink-soft)]">
              Give it a name so you can find it later.
            </p>
            <input
              type="text"
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) void confirmSave();
              }}
              placeholder="e.g. Binary search notes"
              className="mt-4 w-full rounded-lg border-[0.5px] border-[var(--home-hairline)] bg-white px-3 py-2.5 text-sm"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSaveOpen(false)}
                disabled={busy}
                className="home-btn home-btn-outline !py-1.5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSave}
                disabled={busy}
                className="home-btn home-btn-fill !py-1.5 disabled:opacity-50"
              >
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {boards.length > 0 && (
        <div className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
            Saved boards
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {boards.map((b) => (
              <div
                key={b.id}
                className={`home-card overflow-hidden rounded-xl ${
                  activeId === b.id ? "ring-2 ring-[var(--home-moss)]" : ""
                }`}
              >
                <button type="button" onClick={() => openBoard(b)} className="block w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.thumb}
                    alt={b.name}
                    className="aspect-[5/3] w-full bg-[#fffdf8] object-cover"
                  />
                </button>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="truncate text-xs font-medium">{b.name}</span>
                  <button
                    type="button"
                    onClick={() => removeBoard(b.id)}
                    aria-label={`Delete ${b.name}`}
                    className="shrink-0 text-xs text-[var(--home-ink-quiet)] hover:text-[#9c0006]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
