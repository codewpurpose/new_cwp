"use client";

import { useId, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatPercent } from "@/lib/ml/format";
import { GRID, IMAGE, KERNELS, filteredImage } from "@/lib/ml/computer-vision-data";

const CELL = 18;
const DIM = GRID * CELL;

/** Brightness 0..1 to a warm ink-on-paper ramp. Deterministic by construction. */
function pixelFill(value: number): string {
  const dark = [35, 32, 27];
  const light = [251, 246, 236];
  const r = Math.round(dark[0] + (light[0] - dark[0]) * value);
  const g = Math.round(dark[1] + (light[1] - dark[1]) * value);
  const b = Math.round(dark[2] + (light[2] - dark[2]) * value);
  return `rgb(${r} ${g} ${b})`;
}

/** Integers print bare; fractions (the blur's 1/9) to two places. No locale. */
function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function PixelGrid({ pixels, label }: { pixels: readonly (readonly number[])[]; label: string }) {
  return (
    <svg
      viewBox={`0 0 ${DIM} ${DIM}`}
      className="w-full rounded-learn-md"
      role="img"
      aria-label={label}
    >
      {pixels.map((row, y) =>
        row.map((value, x) => (
          <rect
            key={`${x}-${y}`}
            x={x * CELL}
            y={y * CELL}
            width={CELL}
            height={CELL}
            fill={pixelFill(value)}
          />
        )),
      )}
      <rect
        x={0.5}
        y={0.5}
        width={DIM - 1}
        height={DIM - 1}
        fill="none"
        stroke="var(--learn-line)"
        strokeWidth={1}
      />
    </svg>
  );
}

export function ConvolutionExplorer() {
  const [kernelId, setKernelId] = useState("edges");
  const [strength, setStrength] = useState(1);
  const sliderId = useId();

  const kernel = KERNELS.find((k) => k.id === kernelId) ?? KERNELS[0];
  const output = filteredImage(kernelId, strength);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Slide a filter across the image
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The picture on the left is a grid of brightness values — nothing more.{" "}
        <strong className="font-semibold">Pick a filter</strong>, then{" "}
        <strong className="font-semibold">drag the strength</strong> from nothing to full and watch
        the same nine numbers, slid over every pixel, redraw it on the right.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">Original</h3>
          <div className="mt-2">
            <PixelGrid pixels={IMAGE} label="The original image as a grid of brightness values." />
          </div>
        </div>
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            {kernel.label === "None" ? "Filtered (no filter)" : `${kernel.label} filter`}
          </h3>
          <div className="mt-2">
            <PixelGrid
              pixels={output}
              label={`The image after the ${kernel.label} filter at ${formatPercent(strength)} strength.`}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-5 md:grid-cols-[auto_minmax(0,1fr)]">
        {/* The kernel itself: nine numbers, centre pixel picked out. */}
        <div>
          <h3 className="text-[12px] uppercase tracking-[0.08em] text-learn-subtle">
            The filter (3&times;3)
          </h3>
          <div className="mt-2 grid w-max grid-cols-3 gap-1">
            {kernel.weights.map((weight, index) => (
              <span
                key={index}
                className={`flex h-11 w-11 items-center justify-center rounded-learn-sm border-[0.5px] font-mono text-[13px] tabular-nums ${
                  index === 4
                    ? "border-learn-accent bg-learn-quiet text-learn-strong"
                    : "border-learn-line bg-white text-learn-muted"
                }`}
              >
                {formatWeight(weight)}
              </span>
            ))}
          </div>
        </div>

        <div>
          <SegmentedControl
            label="Filter"
            variant="chips"
            options={KERNELS.map((k) => ({ value: k.id, label: k.label }))}
            value={kernelId}
            onValueChange={setKernelId}
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <label htmlFor={sliderId} className="text-[13px] font-medium text-learn-strong">
              Strength
            </label>
            <span className="font-mono text-[14px] text-learn-strong tabular-nums">
              {formatPercent(strength)}
            </span>
          </div>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={strength}
            onChange={(event) => setStrength(Number(event.target.value))}
            className="mt-1 w-full accent-learn-accent"
          />

          <p className="mt-4 text-[14px] leading-[1.5] text-learn-muted">{kernel.note}</p>
        </div>
      </div>
    </figure>
  );
}
