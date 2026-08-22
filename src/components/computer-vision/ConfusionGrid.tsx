"use client";

import { useState } from "react";
import { formatPercent } from "@/lib/ml/format";

/**
 * A fixed 5×5 confusion matrix for a five-animal classifier. Rows are truth,
 * columns are prediction — the same convention the lesson prose uses. Counts
 * are hard-coded, not generated: the whole point is that this exact matrix,
 * with this exact wolf/coyote confusion, is what the reader inspects.
 */
const CLASSES = ["Cat", "Dog", "Fox", "Wolf", "Coyote"] as const;

const MATRIX: readonly (readonly number[])[] = [
  [47, 1, 1, 1, 0],
  [1, 47, 1, 1, 0],
  [1, 1, 46, 1, 1],
  [0, 1, 2, 28, 19],
  [0, 0, 1, 21, 28],
];

const TOTAL = MATRIX.reduce((sum, row) => sum + row.reduce((a, b) => a + b, 0), 0);
const CORRECT = MATRIX.reduce((sum, row, index) => sum + row[index], 0);
const MAX_COUNT = Math.max(...MATRIX.flatMap((row) => row));

const GRID = CLASSES.length;
const CELL = 72;
const LABEL_COL_WIDTH = 100;
const LABEL_ROW_HEIGHT = 60;
const VIEW_WIDTH = LABEL_COL_WIDTH + GRID * CELL;
const VIEW_HEIGHT = LABEL_ROW_HEIGHT + GRID * CELL;

type Selection =
  | { kind: "row"; index: number }
  | { kind: "col"; index: number }
  | { kind: "cell"; row: number; col: number }
  | null;

function opacityFor(count: number): number {
  if (count === 0) return 0.05;
  return 0.16 + (count / MAX_COUNT) * 0.78;
}

function explanationFor(selection: Selection): string {
  if (!selection) {
    return "Click a row or column label to highlight it. Click a single cell to see exactly what it means.";
  }

  if (selection.kind === "cell") {
    const { row, col } = selection;
    const count = MATRIX[row][col];
    const truth = CLASSES[row].toLowerCase();
    const predicted = CLASSES[col].toLowerCase();
    if (row === col) {
      return `${count} photos of a ${truth} were correctly predicted as ${truth}.`;
    }
    return `${count} photos of a ${truth} were predicted as ${predicted}.`;
  }

  if (selection.kind === "row") {
    const row = MATRIX[selection.index];
    const truth = CLASSES[selection.index].toLowerCase();
    const rowTotal = row.reduce((a, b) => a + b, 0);
    const correct = row[selection.index];
    const missed = rowTotal - correct;
    return missed === 0
      ? `${rowTotal} real ${truth} photos, and every one of them was correctly called ${truth}.`
      : `${rowTotal} real ${truth} photos: ${correct} correctly called ${truth}, ${missed} sent to another class instead.`;
  }

  const col = selection.index;
  const predicted = CLASSES[col].toLowerCase();
  const colTotal = MATRIX.reduce((sum, row) => sum + row[col], 0);
  const correct = MATRIX[col][col];
  const wrong = colTotal - correct;
  return wrong === 0
    ? `${colTotal} photos were predicted as ${predicted}, and every one of them actually was.`
    : `${colTotal} photos were predicted as ${predicted}: ${correct} actually were, ${wrong} were something else the model mistook for it.`;
}

export function ConfusionGrid() {
  const [selection, setSelection] = useState<Selection>(null);

  const isCellActive = (row: number, col: number) =>
    (selection?.kind === "cell" && selection.row === row && selection.col === col) ||
    (selection?.kind === "row" && selection.index === row) ||
    (selection?.kind === "col" && selection.index === col);

  const isCellFocal = (row: number, col: number) =>
    selection?.kind === "cell" && selection.row === row && selection.col === col;

  const isLabelActive = (kind: "row" | "col", index: number) =>
    (selection?.kind === kind && selection.index === index) ||
    (selection?.kind === "cell" &&
      ((kind === "row" && selection.row === index) || (kind === "col" && selection.col === index)));

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        250 test photos, five classes
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Rows are the truth, columns are the prediction. Darker cells hold more photos. Overall
        accuracy here is {formatPercent(CORRECT / TOTAL, 1)} — click around to see exactly where
        the other {TOTAL - CORRECT} photos went.
      </p>

      <div className="mt-5 flex justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full max-w-[460px]"
          role="img"
          aria-label="Confusion matrix of five animal classes, wolf and coyote showing the largest off-diagonal counts."
        >
          {/* axis titles */}
          <text
            x={LABEL_COL_WIDTH + (GRID * CELL) / 2}
            y={14}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            predicted as
          </text>
          <text
            x={14}
            y={LABEL_ROW_HEIGHT + (GRID * CELL) / 2}
            textAnchor="middle"
            fontSize={11}
            fill="var(--learn-ink-muted)"
            transform={`rotate(-90 14 ${LABEL_ROW_HEIGHT + (GRID * CELL) / 2})`}
          >
            actually a
          </text>

          {/* column labels */}
          {CLASSES.map((name, col) => (
            <text
              key={`col-${name}`}
              x={LABEL_COL_WIDTH + col * CELL + CELL / 2}
              y={LABEL_ROW_HEIGHT - 10}
              textAnchor="middle"
              fontSize={12}
              fontWeight={isLabelActive("col", col) ? 700 : 500}
              fill={isLabelActive("col", col) ? "var(--learn-accent-text)" : "var(--learn-ink-strong)"}
              className="cursor-pointer"
              onClick={() => setSelection({ kind: "col", index: col })}
            >
              {name}
            </text>
          ))}

          {/* row labels */}
          {CLASSES.map((name, row) => (
            <text
              key={`row-${name}`}
              x={LABEL_COL_WIDTH - 10}
              y={LABEL_ROW_HEIGHT + row * CELL + CELL / 2 + 4}
              textAnchor="end"
              fontSize={12}
              fontWeight={isLabelActive("row", row) ? 700 : 500}
              fill={isLabelActive("row", row) ? "var(--learn-accent-text)" : "var(--learn-ink-strong)"}
              className="cursor-pointer"
              onClick={() => setSelection({ kind: "row", index: row })}
            >
              {name}
            </text>
          ))}

          {/* cells */}
          {MATRIX.map((row, r) =>
            row.map((count, c) => {
              const x = LABEL_COL_WIDTH + c * CELL;
              const y = LABEL_ROW_HEIGHT + r * CELL;
              const diagonal = r === c;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x + 2}
                    y={y + 2}
                    width={CELL - 4}
                    height={CELL - 4}
                    rx={4}
                    fill="var(--learn-accent)"
                    fillOpacity={opacityFor(count)}
                    stroke={
                      isCellFocal(r, c)
                        ? "var(--learn-ink-strong)"
                        : isCellActive(r, c)
                          ? "var(--learn-accent-text)"
                          : "var(--learn-chart-grid)"
                    }
                    strokeWidth={isCellFocal(r, c) ? 3 : isCellActive(r, c) ? 2 : 0.75}
                    className="cursor-pointer"
                    onClick={() => setSelection({ kind: "cell", row: r, col: c })}
                  />
                  {diagonal && (
                    <rect
                      x={x + CELL - 16}
                      y={y + 6}
                      width={6}
                      height={6}
                      fill="none"
                      stroke="var(--learn-ink-muted)"
                      strokeWidth={1}
                      className="pointer-events-none"
                    />
                  )}
                  <text
                    x={x + CELL / 2}
                    y={y + CELL / 2 + 4}
                    textAnchor="middle"
                    fontSize={13}
                    fontFamily="var(--learn-font-mono)"
                    fill="var(--learn-ink-strong)"
                    className="pointer-events-none select-none"
                  >
                    {count}
                  </text>
                </g>
              );
            }),
          )}
        </svg>
      </div>

      <p className="mt-4 text-[11px] text-learn-subtle">
        The small hollow square marks the diagonal — where the prediction matched the truth.
      </p>

      <p className="mt-3 min-h-[40px] text-[13px] leading-[1.5] text-learn-strong">
        {explanationFor(selection)}
      </p>
    </figure>
  );
}
