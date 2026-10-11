"use client";

import { useId, useMemo, useRef, useState, type DragEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CircleAlert,
  Code2,
  GripVertical,
  Lightbulb,
  Play,
  Plus,
  RotateCcw,
  Square,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FigureGallery, OutputConsole, StatusPill, isBusy } from "./OutputConsole";
import {
  BLOCK_INFO,
  BLOCK_ORDER,
  C_VALUES,
  DATASETS,
  MODELS,
  TEST_SIZES,
  TREE_COUNTS,
  generateCode,
  makeBlock,
  parsePipeline,
  starterPipeline,
  validate,
  type Block,
  type BlockSettings,
  type BlockType,
  type DatasetId,
  type ModelKind,
} from "./ml-pipeline";
import { usePythonRunner } from "./usePythonRunner";

const ML_STORAGE_KEY = "cwp-playground-ml";

function loadPipeline(): Block[] {
  try {
    const raw = window.localStorage.getItem(ML_STORAGE_KEY);
    if (raw) {
      const parsed = parsePipeline(JSON.parse(raw));
      if (parsed) return parsed;
    }
  } catch {
    // Blocked or corrupt storage: start from the example pipeline.
  }
  return starterPipeline();
}

function savePipeline(blocks: Block[]) {
  try {
    window.localStorage.setItem(
      ML_STORAGE_KEY,
      JSON.stringify(blocks.map(({ type, settings }) => ({ type, settings }))),
    );
  } catch {
    // Persistence is a convenience only.
  }
}

type DragSource = { kind: "palette"; type: BlockType } | { kind: "pipeline"; uid: string };

interface DragState {
  source: DragSource;
  /** Insertion index in the pipeline, or null while outside it. */
  over: number | null;
}

const LEAF = "#3e7f5c";

const SMALL_BTN =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-[var(--home-ink-quiet)] transition-colors hover:bg-[#dbefdb] hover:text-[var(--home-moss)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--home-fern)] disabled:pointer-events-none disabled:opacity-30";

const FIELD =
  "min-h-9 w-full cursor-pointer rounded-md border border-[var(--home-hairline-strong)] bg-[var(--home-white)] px-2.5 text-[0.875rem] text-[var(--home-ink)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--home-fern)]";

const LABEL = "text-[0.75rem] font-medium text-[var(--home-ink-quiet)]";

/**
 * Drag blocks into an ordered pipeline; the Python for it is written live
 * beside it and runs in the same Pyodide worker as the editor.
 *
 * Dragging works three ways, and none of them is required:
 * - a mouse uses native HTML5 drag and drop;
 * - touch and pen use pointer events on the grip, since mobile browsers'
 *   native drag is patchy;
 * - the keyboard (and anyone who prefers it) uses the Add, Move up, Move down
 *   and Remove buttons, which do the same things.
 */
export function MLBuilder({ onOpenInEditor }: { onOpenInEditor: (code: string) => void }) {
  const [blocks, setBlocks] = useState<Block[]>(loadPipeline);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const listRef = useRef<HTMLOListElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const pointerDrag = useRef<{ source: DragSource; over: number | null } | null>(null);
  const runner = usePythonRunner();
  const ids = useId();

  const generated = useMemo(() => generateCode(blocks), [blocks]);
  const issues = useMemo(() => validate(blocks), [blocks]);
  const errors = issues.filter((issue) => issue.level === "error");
  const tips = issues.filter((issue) => issue.level === "tip");
  const busy = runner.isRunning || isBusy(runner.status);
  const canRun = errors.length === 0 && !busy && !runner.isBlocked;
  const used = new Set(blocks.map((block) => block.type));

  const commit = (next: Block[], message?: string) => {
    setBlocks(next);
    savePipeline(next);
    if (message) setAnnouncement(message);
  };

  const insertAt = (type: BlockType, index: number) => {
    if (used.has(type)) return;
    const next = blocks.slice();
    const at = Math.max(0, Math.min(index, next.length));
    next.splice(at, 0, makeBlock(type));
    commit(next, `Added ${BLOCK_INFO[type].title} at step ${at + 1}.`);
  };

  /** Where a new block of this type most naturally goes: after the last block
   *  that normally comes before it. Keeps button-adding in a sensible order. */
  const naturalIndex = (type: BlockType) => {
    const rank = BLOCK_ORDER.indexOf(type);
    let index = 0;
    blocks.forEach((block, i) => {
      if (BLOCK_ORDER.indexOf(block.type) < rank) index = i + 1;
    });
    return index;
  };

  const moveTo = (uid: string, insertion: number) => {
    const from = blocks.findIndex((block) => block.uid === uid);
    if (from === -1) return;
    let to = insertion;
    if (to > from) to -= 1;
    if (to === from) return;
    const next = blocks.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    commit(next, `Moved ${BLOCK_INFO[moved.type].title} to step ${to + 1}.`);
  };

  const remove = (uid: string) => {
    const block = blocks.find((b) => b.uid === uid);
    if (!block) return;
    commit(
      blocks.filter((b) => b.uid !== uid),
      `Removed ${BLOCK_INFO[block.type].title}. It's back in the blocks list.`,
    );
    if (active === uid) setActive(null);
  };

  const updateSettings = <T extends BlockType>(uid: string, patch: Partial<BlockSettings[T]>) => {
    commit(
      blocks.map((block) =>
        block.uid === uid ? ({ ...block, settings: { ...block.settings, ...patch } } as Block) : block,
      ),
    );
  };

  const dropSource = (source: DragSource, index: number) => {
    if (source.kind === "palette") insertAt(source.type, index);
    else moveTo(source.uid, index);
  };

  /** The insertion index for a point, or null when it is outside the list. */
  const indexAt = (x: number, y: number): number | null => {
    const list = listRef.current;
    if (!list) return null;
    const box = list.getBoundingClientRect();
    const margin = 24;
    if (x < box.left - margin || x > box.right + margin || y < box.top - margin || y > box.bottom + margin) {
      return null;
    }
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-block-uid]"));
    for (let i = 0; i < items.length; i += 1) {
      const rect = items[i].getBoundingClientRect();
      if (y < rect.top + rect.height / 2) return i;
    }
    return items.length;
  };

  const setOver = (source: DragSource, over: number | null) => {
    setDrag((prev) =>
      prev && prev.over === over && sameSource(prev.source, source) ? prev : { source, over },
    );
  };

  /* --- native HTML5 drag and drop (mouse) --- */

  const onNativeDragStart = (event: DragEvent<HTMLElement>, source: DragSource, image?: HTMLElement | null) => {
    if (pointerDrag.current) {
      // A touch drag is already under way on the same element.
      event.preventDefault();
      return;
    }
    event.dataTransfer.effectAllowed = source.kind === "palette" ? "copy" : "move";
    event.dataTransfer.setData("text/plain", source.kind === "palette" ? source.type : source.uid);
    if (image) {
      const rect = image.getBoundingClientRect();
      event.dataTransfer.setDragImage(image, event.clientX - rect.left, event.clientY - rect.top);
    }
    setDrag({ source, over: null });
  };

  const onListDragOver = (event: DragEvent<HTMLElement>) => {
    if (!drag) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = drag.source.kind === "palette" ? "copy" : "move";
    setOver(drag.source, indexAt(event.clientX, event.clientY) ?? blocks.length);
  };

  const onListDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!drag) return;
    const index = indexAt(event.clientX, event.clientY) ?? drag.over ?? blocks.length;
    dropSource(drag.source, index);
    setDrag(null);
  };

  const onListDragLeave = (event: DragEvent<HTMLElement>) => {
    if (!drag) return;
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    setOver(drag.source, null);
  };

  /* --- pointer events (touch and pen) --- */

  const moveGhost = (x: number, y: number) => {
    const ghost = ghostRef.current;
    if (ghost) ghost.style.transform = `translate(${x + 12}px, ${y - 20}px)`;
  };

  const onGripPointerDown = (event: ReactPointerEvent<HTMLElement>, source: DragSource, label: string) => {
    if (event.pointerType === "mouse" || event.button !== 0) return;
    event.preventDefault();
    try {
      // Keeps move and up events coming to the grip even when the finger
      // leaves it.
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // An already-released pointer: the drag still works while over the grip.
    }
    pointerDrag.current = { source, over: null };
    const ghost = ghostRef.current;
    if (ghost) {
      ghost.textContent = label;
      ghost.hidden = false;
    }
    moveGhost(event.clientX, event.clientY);
    setDrag({ source, over: null });
  };

  const onGripPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const current = pointerDrag.current;
    if (!current) return;
    moveGhost(event.clientX, event.clientY);
    // Nudge the page when the finger nears an edge, since the grip has
    // touch-action: none and the page can't be scrolled by hand mid-drag.
    if (event.clientY < 56) window.scrollBy(0, -12);
    else if (event.clientY > window.innerHeight - 56) window.scrollBy(0, 12);
    const over = indexAt(event.clientX, event.clientY);
    current.over = over;
    setOver(current.source, over);
  };

  const endPointerDrag = (commitDrop: boolean) => {
    const current = pointerDrag.current;
    pointerDrag.current = null;
    const ghost = ghostRef.current;
    if (ghost) ghost.hidden = true;
    setDrag(null);
    if (commitDrop && current && current.over !== null) dropSource(current.source, current.over);
  };

  const gripHandlers = (source: DragSource, label: string) => ({
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => onGripPointerDown(event, source, label),
    onPointerMove: onGripPointerMove,
    onPointerUp: () => endPointerDrag(true),
    onPointerCancel: () => endPointerDrag(false),
  });

  const run = () => {
    if (!canRun) return;
    runner.run(generated.code);
  };

  const issueFor = (uid: string) => errors.find((issue) => issue.uid === uid) ?? tips.find((issue) => issue.uid === uid);
  const generalIssues = issues.filter((issue) => issue.uid === null);
  const activeSection = generated.sections.find((section) => section.uid === active && active !== null);
  const codeLines = generated.code.replace(/\n$/, "").split("\n");

  const liveText =
    runner.status === "done"
      ? `${runner.statusText} ${runner.figures.length > 0 ? "A chart was drawn." : ""}`
      : runner.status === "error" && runner.error
        ? `${runner.statusText} ${runner.error.message}`
        : runner.status === "idle"
          ? ""
          : runner.statusText;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
      {/* Left: palette and pipeline */}
      <div className="flex min-w-0 flex-col gap-4">
        <section
          aria-labelledby={`${ids}-palette`}
          className="rounded-2xl border-[0.5px] border-[var(--home-hairline-strong)] bg-[var(--home-white)] p-4 shadow-[var(--home-shadow-sm)]"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 id={`${ids}-palette`} className="text-[0.9375rem] font-semibold text-[var(--home-ink)]">
              Blocks
            </h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => commit(starterPipeline(), "Loaded the example pipeline.")}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-[0.8125rem] font-medium text-[var(--home-ink-soft)] hover:bg-[#dbefdb] hover:text-[var(--home-moss)] focus-visible:outline-2 focus-visible:outline-[var(--home-fern)]"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Example
              </button>
              <button
                type="button"
                onClick={() => commit([], "Cleared the pipeline.")}
                disabled={blocks.length === 0}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-[0.8125rem] font-medium text-[var(--home-ink-soft)] hover:bg-[#dbefdb] hover:text-[var(--home-moss)] focus-visible:outline-2 focus-visible:outline-[var(--home-fern)] disabled:opacity-40"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Clear
              </button>
            </div>
          </div>
          <p className="mt-1 text-[0.8125rem] leading-[1.45] text-[var(--home-ink-quiet)]">
            Drag a block into your pipeline, or press its + button.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BLOCK_ORDER.map((type) => {
              const info = BLOCK_INFO[type];
              const inUse = used.has(type);
              return (
                <li key={type}>
                  <div
                    draggable={!inUse}
                    onDragStart={(event) => onNativeDragStart(event, { kind: "palette", type })}
                    onDragEnd={() => setDrag(null)}
                    title={info.why}
                    className={cn(
                      "flex min-h-10 items-center rounded-full border text-[0.875rem] font-medium transition-colors",
                      inUse
                        ? "border-transparent bg-[var(--home-grey-400)] text-[var(--home-ink-quiet)]"
                        : "cursor-grab border-[#bfdcc3] bg-[#dbefdb] text-[var(--home-moss)] hover:border-[#3e7f5c] active:cursor-grabbing",
                    )}
                  >
                    {inUse ? (
                      <span className="flex items-center gap-1.5 py-1 pl-3 pr-3.5">
                        <Check className="size-3.5" aria-hidden="true" />
                        {info.title}
                        <span className="sr-only">(in your pipeline)</span>
                      </span>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="flex h-10 touch-none items-center pl-2 pr-0.5 text-[#3e7f5c]"
                          {...gripHandlers({ kind: "palette", type }, info.title)}
                        >
                          <GripVertical className="size-4" />
                        </span>
                        <span className="select-none pr-1">{info.title}</span>
                        <button
                          type="button"
                          onClick={() => insertAt(type, naturalIndex(type))}
                          aria-label={`Add ${info.title} to the pipeline`}
                          className="mr-1 inline-flex size-8 items-center justify-center rounded-full text-[var(--home-moss)] hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-[var(--home-fern)]"
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby={`${ids}-pipeline`} className="min-w-0">
          <h3 id={`${ids}-pipeline`} className="text-[0.9375rem] font-semibold text-[var(--home-ink)]">
            Your pipeline
          </h3>
          <p className="mt-0.5 text-[0.8125rem] text-[var(--home-ink-quiet)]">
            Steps run from top to bottom. Drag the grip or use the arrows to reorder.
          </p>
          <ol
            ref={listRef}
            onDragOver={onListDragOver}
            onDrop={onListDrop}
            onDragLeave={onListDragLeave}
            aria-describedby={`${ids}-pipeline-help`}
            className={cn(
              "relative mt-3 flex min-h-28 flex-col gap-3 rounded-2xl pb-2 transition-colors",
              drag && "bg-[#dbefdb]/40 outline-2 outline-dashed outline-offset-4 outline-[#3e7f5c]/40",
            )}
          >
            {blocks.length === 0 && (
              <li
                className={cn(
                  "flex min-h-28 items-center justify-center rounded-2xl border-2 border-dashed px-4 text-center text-[0.9375rem]",
                  drag?.over === 0
                    ? "border-[#3e7f5c] bg-[#dbefdb] text-[var(--home-moss)]"
                    : "border-[var(--home-hairline-strong)] text-[var(--home-ink-quiet)]",
                )}
              >
                Drop a Load dataset block here to begin.
              </li>
            )}
            {blocks.map((block, index) => {
              const issue = issueFor(block.uid);
              const isSource = drag?.source.kind === "pipeline" && drag.source.uid === block.uid;
              const info = BLOCK_INFO[block.type];
              return (
                <li
                  key={block.uid}
                  data-block-uid={block.uid}
                  id={`${ids}-${block.uid}`}
                  onMouseEnter={() => setActive(block.uid)}
                  onMouseLeave={() => setActive((current) => (current === block.uid ? null : current))}
                  onFocus={() => setActive(block.uid)}
                  className={cn(
                    "relative rounded-xl border bg-[var(--home-white)] shadow-[var(--home-shadow-sm)] transition-[border-color,opacity]",
                    issue?.level === "error"
                      ? "border-[#e0a46b]"
                      : active === block.uid
                        ? "border-[#3e7f5c]"
                        : "border-[var(--home-hairline-strong)]",
                    isSource && "opacity-45",
                  )}
                >
                  {drag?.over === index && (
                    <span aria-hidden="true" className="absolute inset-x-2 -top-2 h-[3px] rounded-full" style={{ background: LEAF }} />
                  )}
                  {drag?.over === blocks.length && index === blocks.length - 1 && (
                    <span aria-hidden="true" className="absolute inset-x-2 -bottom-2 h-[3px] rounded-full" style={{ background: LEAF }} />
                  )}
                  <div className="flex items-center gap-1 py-1.5 pl-1 pr-1.5">
                    <span
                      aria-hidden="true"
                      draggable
                      onDragStart={(event) =>
                        onNativeDragStart(event, { kind: "pipeline", uid: block.uid }, event.currentTarget.closest("li"))
                      }
                      onDragEnd={() => setDrag(null)}
                      title="Drag to reorder"
                      className="flex h-10 w-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-[var(--home-ink-quiet)] hover:bg-[#dbefdb] hover:text-[var(--home-moss)] active:cursor-grabbing"
                      {...gripHandlers({ kind: "pipeline", uid: block.uid }, info.title)}
                    >
                      <GripVertical className="size-4" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dbefdb] font-[family-name:var(--learn-font-mono)] text-[0.75rem] font-semibold text-[var(--home-moss)]"
                    >
                      {index + 1}
                    </span>
                    <h4 className="ml-1.5 min-w-0 flex-1 truncate text-[0.9375rem] font-semibold text-[var(--home-ink)]">
                      <span className="sr-only">Step {index + 1}: </span>
                      {info.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => moveTo(block.uid, index - 1)}
                      disabled={index === 0}
                      aria-label={`Move ${info.title} up`}
                      className={SMALL_BTN}
                    >
                      <ArrowUp className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveTo(block.uid, index + 2)}
                      disabled={index === blocks.length - 1}
                      aria-label={`Move ${info.title} down`}
                      className={SMALL_BTN}
                    >
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(block.uid)}
                      aria-label={`Remove ${info.title}`}
                      className={SMALL_BTN}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="border-t-[0.5px] border-[var(--home-hairline)] px-4 pt-2.5 pb-3.5">
                    <p className="text-[0.8125rem] leading-[1.5] text-[var(--home-ink-soft)]">
                      <span className="font-semibold text-[#3e7f5c]">Why: </span>
                      {info.why}
                    </p>
                    <BlockFields block={block} ids={`${ids}-${block.uid}`} onChange={(patch) => updateSettings(block.uid, patch)} />
                    {issue && (
                      <p
                        className={cn(
                          "mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-[0.8125rem] leading-[1.45]",
                          issue.level === "error"
                            ? "bg-[#fdf0e1] text-[#7a4a14]"
                            : "bg-[#dbefdb]/70 text-[var(--home-moss)]",
                        )}
                      >
                        {issue.level === "error" ? (
                          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        )}
                        <span>{issue.message}</span>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <p id={`${ids}-pipeline-help`} className="sr-only">
            Each step has Move up, Move down and Remove buttons. Add steps with the plus buttons in the blocks list.
          </p>
          {generalIssues.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2">
              {generalIssues.map((issue) => (
                <li
                  key={issue.message}
                  className={cn(
                    "flex items-start gap-2 rounded-lg px-3 py-2 text-[0.8125rem] leading-[1.45]",
                    issue.level === "error" ? "bg-[#fdf0e1] text-[#7a4a14]" : "bg-[#dbefdb]/70 text-[var(--home-moss)]",
                  )}
                >
                  {issue.level === "error" ? (
                    <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{issue.message}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Right: generated code and results */}
      <div className="flex min-w-0 flex-col gap-4">
        <section
          aria-labelledby={`${ids}-code`}
          className="overflow-hidden rounded-2xl bg-learn-code-bg shadow-[0_18px_40px_-24px_rgba(21,18,12,0.55)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-learn-code-line py-2 pl-4 pr-2">
            <h3 id={`${ids}-code`} className="flex items-center gap-2 text-[12px] text-learn-code-dim">
              <span className="font-[family-name:var(--learn-font-mono)]">pipeline.py</span>
              <span className="lr-code-lang">Live</span>
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenInEditor(generated.code)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-[0.8125rem] font-medium text-learn-code-fg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-learn-code-ok"
              >
                <Code2 className="size-4" aria-hidden="true" />
                Open in the editor
              </button>
              <button
                type="button"
                onClick={runner.stop}
                disabled={!runner.isRunning}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-[0.8125rem] font-medium text-learn-code-fg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-learn-code-ok disabled:opacity-40"
              >
                <Square className="size-3 fill-current" aria-hidden="true" />
                Stop
              </button>
              <button
                type="button"
                onClick={run}
                disabled={!canRun}
                aria-describedby={errors.length > 0 ? `${ids}-blocked` : undefined}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[#dbefdb] px-3.5 text-[0.875rem] font-semibold text-[var(--home-moss-deep)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-learn-code-ok disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="size-3.5 fill-current" aria-hidden="true" />
                Run pipeline
              </button>
            </div>
          </div>
          <div
            className="max-h-[26rem] overflow-auto py-3 font-[family-name:var(--learn-font-mono)] text-[12.5px] leading-[20px]"
            tabIndex={0}
            role="region"
            aria-label="Generated Python code"
          >
            <pre className="min-w-max font-[inherit]">
              {codeLines.map((line, index) => {
                const number = index + 1;
                const highlighted =
                  activeSection !== undefined && number >= activeSection.startLine && number <= activeSection.endLine;
                const comment = /^\s*#/.test(line);
                return (
                  <div
                    key={index}
                    className={cn("flex pr-4", highlighted ? "bg-[#dbefdb]/[0.12]" : "")}
                    style={highlighted ? { boxShadow: "inset 3px 0 0 #a7e0b4" } : undefined}
                  >
                    <span aria-hidden="true" className="w-10 shrink-0 select-none pr-3 text-right tabular-nums text-learn-code-dim/60">
                      {number}
                    </span>
                    <code className={cn("whitespace-pre", comment ? "text-learn-code-dim" : "text-learn-code-fg")}>
                      {line || " "}
                    </code>
                  </div>
                );
              })}
            </pre>
          </div>
        </section>

        {errors.length > 0 && (
          <p id={`${ids}-blocked`} className="-mt-1 flex items-start gap-2 text-[0.8125rem] leading-[1.45] text-[#7a4a14]">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Fix the step marked in orange, then you can run the pipeline.
          </p>
        )}
        {runner.isBlocked && (
          <p className="-mt-1 text-[0.8125rem] text-[var(--home-ink-quiet)]">
            Python is busy with the editor&apos;s code. Run this when it finishes.
          </p>
        )}

        <section
          aria-labelledby={`${ids}-results`}
          className="overflow-hidden rounded-2xl bg-learn-code-bg shadow-[0_18px_40px_-24px_rgba(21,18,12,0.55)]"
        >
          <div className="flex min-h-11 items-center justify-between gap-3 border-b border-learn-code-line pl-4 pr-1.5 text-[11.5px] text-learn-code-dim">
            <span className="flex min-w-0 items-center gap-3">
              <h3 id={`${ids}-results`} className="shrink-0 uppercase tracking-[0.08em]">
                Results
              </h3>
              <StatusPill status={runner.status} text={runner.statusText} />
            </span>
            <button
              type="button"
              onClick={runner.clear}
              disabled={busy || (runner.output.length === 0 && !runner.error && runner.figures.length === 0)}
              className="lr-copy learn-focusable disabled:opacity-40"
            >
              Clear
            </button>
          </div>
          <OutputConsole
            output={runner.output}
            error={runner.error}
            status={runner.status}
            placeholder="Press Run pipeline to train your model and see how it scores."
            minHeight="9rem"
            maxHeight="20rem"
            label="Pipeline output"
          />
          {runner.figures.length > 0 && (
            <div className="border-t border-learn-code-line bg-[var(--home-white)] p-3">
              <FigureGallery figures={runner.figures} />
            </div>
          )}
        </section>
      </div>

      {/* Follows the finger during a touch drag. Positioned by the handlers. */}
      <div
        ref={ghostRef}
        hidden
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-[#3e7f5c] bg-[#dbefdb] px-3.5 py-2 text-[0.875rem] font-semibold text-[var(--home-moss)] shadow-[var(--home-shadow-lg)]"
      />

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {liveText}
      </p>
    </div>
  );
}

function sameSource(a: DragSource, b: DragSource) {
  if (a.kind === "palette" && b.kind === "palette") return a.type === b.type;
  if (a.kind === "pipeline" && b.kind === "pipeline") return a.uid === b.uid;
  return false;
}

function BlockFields({
  block,
  ids,
  onChange,
}: {
  block: Block;
  ids: string;
  onChange: (patch: Record<string, unknown>) => void;
}) {
  switch (block.type) {
    case "load":
      return (
        <div className="mt-3">
          <label htmlFor={`${ids}-dataset`} className={LABEL}>
            Dataset
          </label>
          <select
            id={`${ids}-dataset`}
            value={block.settings.dataset}
            onChange={(event) => onChange({ dataset: event.target.value as DatasetId })}
            className={cn(FIELD, "mt-1")}
          >
            {(Object.keys(DATASETS) as DatasetId[]).map((id) => (
              <option key={id} value={id}>
                {DATASETS[id].label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[0.75rem] text-[var(--home-ink-quiet)]">{DATASETS[block.settings.dataset].blurb}</p>
        </div>
      );
    case "split":
      return (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:items-end">
          <div>
            <label htmlFor={`${ids}-test`} className={LABEL}>
              Test size
            </label>
            <select
              id={`${ids}-test`}
              value={block.settings.testSize}
              onChange={(event) => onChange({ testSize: Number(event.target.value) })}
              className={cn(FIELD, "mt-1")}
            >
              {TEST_SIZES.map((size) => (
                <option key={size} value={size}>
                  {Math.round(size * 100)}% held back for testing
                </option>
              ))}
            </select>
          </div>
          <Toggle
            id={`${ids}-stratify`}
            checked={block.settings.stratify}
            onChange={(stratify) => onChange({ stratify })}
            label="Keep the class mix the same in both sets"
          />
        </div>
      );
    case "scale":
      return (
        <div className="mt-3">
          <label htmlFor={`${ids}-scaler`} className={LABEL}>
            Method
          </label>
          <select
            id={`${ids}-scaler`}
            value={block.settings.method}
            onChange={(event) => onChange({ method: event.target.value })}
            className={cn(FIELD, "mt-1")}
          >
            <option value="standard">Standardise (average 0, spread 1)</option>
            <option value="minmax">Min-max (squeeze into 0 to 1)</option>
          </select>
        </div>
      );
    case "model": {
      const s = block.settings;
      return (
        <div className="mt-3 grid gap-3">
          <div>
            <label htmlFor={`${ids}-kind`} className={LABEL}>
              Model
            </label>
            <select
              id={`${ids}-kind`}
              value={s.kind}
              onChange={(event) => onChange({ kind: event.target.value as ModelKind })}
              className={cn(FIELD, "mt-1")}
            >
              {(Object.keys(MODELS) as ModelKind[]).map((kind) => (
                <option key={kind} value={kind}>
                  {MODELS[kind].label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[0.75rem] text-[var(--home-ink-quiet)]">{MODELS[s.kind].short}</p>
          </div>
          {s.kind === "knn" && (
            <Slider id={`${ids}-k`} label="k (neighbours that vote)" min={1} max={15} value={s.k} onChange={(k) => onChange({ k })} />
          )}
          {(s.kind === "tree" || s.kind === "forest") && (
            <Slider
              id={`${ids}-depth`}
              label="max_depth (questions in a row)"
              min={1}
              max={10}
              value={s.maxDepth}
              onChange={(maxDepth) => onChange({ maxDepth })}
            />
          )}
          {s.kind === "forest" && (
            <div>
              <label htmlFor={`${ids}-trees`} className={LABEL}>
                Number of trees
              </label>
              <select
                id={`${ids}-trees`}
                value={s.trees}
                onChange={(event) => onChange({ trees: Number(event.target.value) })}
                className={cn(FIELD, "mt-1")}
              >
                {TREE_COUNTS.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          )}
          {s.kind === "logistic" && (
            <div>
              <label htmlFor={`${ids}-c`} className={LABEL}>
                C (smaller = simpler model)
              </label>
              <select
                id={`${ids}-c`}
                value={s.c}
                onChange={(event) => onChange({ c: Number(event.target.value) })}
                className={cn(FIELD, "mt-1")}
              >
                {C_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      );
    }
    case "train":
      return (
        <div className="mt-3">
          <Toggle
            id={`${ids}-trainscore`}
            checked={block.settings.showTrainScore}
            onChange={(showTrainScore) => onChange({ showTrainScore })}
            label="Also show accuracy on the training examples"
          />
        </div>
      );
    case "evaluate":
      return (
        <div className="mt-3">
          <Toggle
            id={`${ids}-report`}
            checked={block.settings.report}
            onChange={(report) => onChange({ report })}
            label="Add a report for each class"
          />
        </div>
      );
    case "plot":
      return (
        <div className="mt-3">
          <label htmlFor={`${ids}-chart`} className={LABEL}>
            Chart
          </label>
          <select
            id={`${ids}-chart`}
            value={block.settings.chart}
            onChange={(event) => onChange({ chart: event.target.value })}
            className={cn(FIELD, "mt-1")}
          >
            <option value="confusion">Confusion matrix</option>
            <option value="scatter">Test examples on the first two features</option>
          </select>
        </div>
      );
  }
}

function Slider({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={LABEL}>
          {label}
        </label>
        <output
          htmlFor={id}
          className="min-w-8 rounded-md bg-[#dbefdb] px-1.5 text-center font-[family-name:var(--learn-font-mono)] text-[0.8125rem] font-semibold text-[var(--home-moss)] tabular-nums"
        >
          {value}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 h-8 w-full cursor-pointer"
        style={{ accentColor: LEAF }}
      />
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[0.8125rem] text-[var(--home-ink-soft)]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 cursor-pointer"
        style={{ accentColor: LEAF }}
      />
      {label}
    </label>
  );
}
