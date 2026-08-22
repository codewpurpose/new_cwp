"use client";

import { useId, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";

/**
 * A tiny 12×12 grayscale smiley, hard-coded as a literal array — the same
 * approach CommitGraph uses for its frames. No randomness, no seeded
 * generator: the point is that this exact grid is the entire image, and it
 * has to look identical on every render.
 *
 * '.' background = 255, 'o' face = 235, '#' outline = 40, 'e'/'m' features = 15.
 */
const PIXELS: readonly (readonly number[])[] = [
  [255, 255, 255, 235, 235, 235, 235, 235, 235, 255, 255, 255],
  [255, 235, 235, 40, 40, 40, 40, 40, 40, 235, 235, 255],
  [255, 235, 40, 235, 235, 235, 235, 235, 235, 40, 235, 255],
  [235, 40, 235, 235, 15, 235, 235, 235, 15, 235, 40, 235],
  [235, 40, 235, 235, 15, 235, 235, 235, 15, 235, 40, 235],
  [235, 40, 235, 235, 235, 235, 235, 235, 235, 235, 40, 235],
  [235, 40, 235, 15, 235, 235, 235, 235, 235, 15, 40, 235],
  [235, 40, 235, 235, 15, 235, 235, 15, 235, 235, 40, 235],
  [235, 40, 235, 235, 235, 15, 15, 235, 235, 235, 40, 235],
  [255, 235, 40, 235, 235, 235, 235, 235, 235, 40, 235, 255],
  [255, 235, 235, 40, 40, 40, 40, 40, 40, 235, 235, 255],
  [255, 255, 255, 235, 235, 235, 235, 235, 235, 255, 255, 255],
];

const GRID_SIZE = PIXELS.length;
const VIEW = 360;
const CELL = VIEW / GRID_SIZE;

type Stage = "photo" | "zoomed" | "grid" | "numbers";

const STAGES: readonly { value: Stage; label: string }[] = [
  { value: "photo", label: "Photo" },
  { value: "zoomed", label: "Zoomed in" },
  { value: "grid", label: "Pixel grid" },
  { value: "numbers", label: "Numbers" },
];

function grayFill(value: number): string {
  return `rgb(${value}, ${value}, ${value})`;
}

function textOn(value: number): string {
  return value > 130 ? "#1a1a1a" : "#f2f2f2";
}

export function PixelZoom() {
  const [stage, setStage] = useState<Stage>("photo");
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const filterId = useId();

  const showGridLines = stage === "grid" || stage === "numbers";
  const showNumbers = stage === "numbers";
  const blur = stage === "photo";

  const selectedValue = selected ? PIXELS[selected.row][selected.col] : null;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Twelve by twelve, the whole way down
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The same 144 numbers, rendered four ways. Nothing is added or hidden between stages —
        only how closely you are looking changes.
      </p>

      <div className="mt-5 flex justify-center overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="w-full max-w-[360px]"
          role="img"
          aria-label={
            stage === "photo"
              ? "A small smiling face, softly blurred as a photo would render it."
              : `A ${GRID_SIZE} by ${GRID_SIZE} grid of grayscale pixel values forming a smiling face.`
          }
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={blur ? 3.2 : 0} />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            {PIXELS.map((row, r) =>
              row.map((value, c) => {
                const isSelected = selected?.row === r && selected?.col === c;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * CELL}
                    y={r * CELL}
                    width={CELL}
                    height={CELL}
                    fill={grayFill(value)}
                    stroke={
                      isSelected
                        ? "var(--learn-accent-text)"
                        : showGridLines
                          ? "var(--learn-chart-axis)"
                          : "none"
                    }
                    strokeWidth={isSelected ? 2.5 : showGridLines ? 0.75 : 0}
                    className="cursor-pointer"
                    onClick={() => setSelected({ row: r, col: c })}
                  />
                );
              }),
            )}
          </g>
          {showNumbers &&
            PIXELS.map((row, r) =>
              row.map((value, c) => (
                <text
                  key={`t${r}-${c}`}
                  x={c * CELL + CELL / 2}
                  y={r * CELL + CELL / 2 + 3}
                  textAnchor="middle"
                  fontSize={8}
                  fontFamily="var(--learn-font-mono)"
                  fill={textOn(value)}
                  className="pointer-events-none select-none"
                >
                  {value}
                </text>
              )),
            )}
        </svg>
      </div>

      <div className="mt-4">
        <SegmentedControl
          label="Reveal stage"
          options={STAGES}
          value={stage}
          onValueChange={setStage}
          variant="chips"
        />
      </div>

      <p className="mt-3 min-h-[20px] text-[13px] leading-[1.5] text-learn-muted">
        {selected ? (
          <>
            Row {selected.row + 1}, column {selected.col + 1}: the value stored there is{" "}
            <span className="font-[family-name:var(--learn-font-mono)] font-semibold text-learn-strong">
              {selectedValue}
            </span>
            .
          </>
        ) : (
          "Click any square above to read the exact number stored in that pixel."
        )}
      </p>
    </figure>
  );
}
