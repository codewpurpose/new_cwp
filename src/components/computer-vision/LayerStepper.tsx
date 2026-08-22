"use client";

import { useId, useState } from "react";

/**
 * A small, fixed illustration of what four depths of a trained network
 * respond to, and how much of the original image each depth can see.
 *
 * Every value here is hard-coded and illustrative — the point is the shape of
 * the idea (depth composes detectors and grows a receptive field), not a live
 * measurement of an actual network. No computation, no randomness.
 */

interface Layer {
  title: string;
  note: string;
  detail: string;
  /** Side length, in grid cells, of the illustrative receptive field. */
  receptiveCells: number;
}

const LAYERS: readonly Layer[] = [
  {
    title: "Layer 1",
    note: "Edges and colour blobs",
    detail:
      "Each kernel here looks at a handful of pixels. What survives training is a bank of edge and colour-contrast detectors, not anything more specific.",
    receptiveCells: 1,
  },
  {
    title: "Layer 2",
    note: "Corners and textures",
    detail:
      "Combining last layer's edges at different angles produces corners, and combining several edges at once produces texture — woven fabric, fur, bark.",
    receptiveCells: 2,
  },
  {
    title: "Layer 3",
    note: "Simple parts",
    detail:
      "Corners and textures combine into recognisable pieces: a wheel's rim, an eye's outline. Still nothing that knows what a car or a face is.",
    receptiveCells: 4,
  },
  {
    title: "Layer 4",
    note: "Whole objects",
    detail:
      "Parts arranged in roughly the right places become an object — four wheels and a body reads as a car, two eyes and a mouth reads as a face.",
    receptiveCells: 6,
  },
];

const GRID_SIZE = 6;
const CELL = 22;
const GRID_ORIGIN_X = 20;
const GRID_ORIGIN_Y = 15;
const GRID_PX = GRID_SIZE * CELL;

function ReceptiveFieldGrid({ receptiveCells }: { receptiveCells: number }) {
  const highlightPx = receptiveCells * CELL;
  const highlightX = GRID_ORIGIN_X + (GRID_PX - highlightPx) / 2;
  const highlightY = GRID_ORIGIN_Y + (GRID_PX - highlightPx) / 2;

  return (
    <g>
      <rect
        x={GRID_ORIGIN_X}
        y={GRID_ORIGIN_Y}
        width={GRID_PX}
        height={GRID_PX}
        fill="var(--learn-chart-plot)"
        stroke="var(--learn-chart-axis)"
        strokeWidth={1}
      />
      {Array.from({ length: GRID_SIZE - 1 }, (_, i) => i + 1).map((line) => (
        <g key={line}>
          <line
            x1={GRID_ORIGIN_X + line * CELL}
            y1={GRID_ORIGIN_Y}
            x2={GRID_ORIGIN_X + line * CELL}
            y2={GRID_ORIGIN_Y + GRID_PX}
            stroke="var(--learn-chart-grid)"
            strokeWidth={1}
          />
          <line
            x1={GRID_ORIGIN_X}
            y1={GRID_ORIGIN_Y + line * CELL}
            x2={GRID_ORIGIN_X + GRID_PX}
            y2={GRID_ORIGIN_Y + line * CELL}
            stroke="var(--learn-chart-grid)"
            strokeWidth={1}
          />
        </g>
      ))}
      <rect
        x={highlightX}
        y={highlightY}
        width={highlightPx}
        height={highlightPx}
        fill="var(--learn-chart-highlight)"
        stroke="var(--learn-accent)"
        strokeWidth={2}
      />
    </g>
  );
}

/** Fixed, hand-drawn illustrative marks — not a rendering of a real kernel. */
function LayerGlyph({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <g>
          <line x1={20} y1={70} x2={70} y2={20} stroke="var(--learn-series-1)" strokeWidth={4} strokeLinecap="round" />
          <line x1={40} y1={90} x2={95} y2={35} stroke="var(--learn-series-3)" strokeWidth={4} strokeLinecap="round" />
          <circle cx={95} cy={80} r={14} fill="var(--learn-series-2)" opacity={0.75} />
          <circle cx={60} cy={100} r={10} fill="var(--learn-series-4)" opacity={0.75} />
        </g>
      );
    case 1:
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`h${i}`}
              x1={16}
              y1={24 + i * 20}
              x2={112}
              y2={24 + i * 20}
              stroke="var(--learn-series-3)"
              strokeWidth={2.5}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`v${i}`}
              x1={24 + i * 24}
              y1={16}
              x2={24 + i * 24}
              y2={104}
              stroke="var(--learn-series-3)"
              strokeWidth={2.5}
            />
          ))}
          <path
            d="M 16 24 L 46 24 L 46 54"
            fill="none"
            stroke="var(--learn-accent)"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      );
    case 2:
      return (
        <g>
          <circle cx={45} cy={65} r={30} fill="none" stroke="var(--learn-series-1)" strokeWidth={4} />
          {[0, 60, 120].map((deg) => (
            <line
              key={deg}
              x1={45}
              y1={65}
              x2={45 + 30 * Math.cos((deg * Math.PI) / 180)}
              y2={65 + 30 * Math.sin((deg * Math.PI) / 180)}
              stroke="var(--learn-series-1)"
              strokeWidth={3}
            />
          ))}
          <ellipse cx={95} cy={45} rx={20} ry={12} fill="none" stroke="var(--learn-series-2)" strokeWidth={4} />
          <circle cx={95} cy={45} r={5} fill="var(--learn-series-2)" />
        </g>
      );
    default:
      return (
        <g>
          <rect
            x={24}
            y={50}
            width={80}
            height={28}
            rx={6}
            fill="none"
            stroke="var(--learn-series-1)"
            strokeWidth={4}
          />
          <path
            d="M 34 50 L 46 30 L 82 30 L 94 50"
            fill="none"
            stroke="var(--learn-series-1)"
            strokeWidth={4}
            strokeLinejoin="round"
          />
          <circle cx={42} cy={80} r={11} fill="var(--learn-ink-strong)" />
          <circle cx={86} cy={80} r={11} fill="var(--learn-ink-strong)" />
        </g>
      );
  }
}

export function LayerStepper() {
  const [step, setStep] = useState(0);
  const layer = LAYERS[step];
  const captionId = useId();

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Step through the depth of a small network
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        The left panel is the receptive field: how much of the original photo one position in this
        layer&rsquo;s output actually depends on. The right panel is what a kernel at this depth has
        learned to respond to.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox="0 0 330 130"
          className="w-full min-w-[420px]"
          role="img"
          aria-labelledby={captionId}
        >
          <ReceptiveFieldGrid receptiveCells={layer.receptiveCells} />
          <g transform="translate(200, 6)">
            <LayerGlyph step={step} />
          </g>
        </svg>
        <p id={captionId} className="sr-only">
          {layer.title}: {layer.note}. Receptive field {layer.receptiveCells} by{" "}
          {layer.receptiveCells} cells of a {GRID_SIZE} by {GRID_SIZE} grid representing the whole
          image.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="learn-focusable rounded-full border-[0.5px] border-learn-line bg-white px-4 py-2 text-[13px] font-medium text-learn-strong hover:border-learn-line-strong disabled:cursor-not-allowed disabled:opacity-35"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(LAYERS.length - 1, s + 1))}
          disabled={step === LAYERS.length - 1}
          className="learn-focusable rounded-full bg-learn-inverse px-4 py-2 text-[13px] font-medium text-learn-heading-on-inverse disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next &rarr;
        </button>
        <span className="text-[12px] text-learn-subtle">
          {layer.title} of {LAYERS.length}
        </span>
      </div>

      <div aria-live="polite" className="mt-4">
        <p className="text-[15px] font-semibold text-learn-strong">{layer.note}</p>
        <p className="mt-2 text-[13px] leading-[1.6] text-learn-muted">{layer.detail}</p>
      </div>
    </figure>
  );
}
