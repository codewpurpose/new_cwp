"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/ml/format";
import { cn } from "@/lib/utils";

/**
 * Three properties, one part, drawn side-on.
 *
 * Every position in the SVG is derived from the three booleans below rather
 * than simulated, so there is no physics loop and no clock — the drawing is a
 * pure function of the toggles, and identical on the server and in the browser.
 */

const W = 480;
const H = 220;
const FLOOR_Y = 176;
const BLOCK_W = 120;
const BLOCK_H = 46;
const BLOCK_X = 230;
const FLOATING_Y = 74;

export function PropertyPanel() {
  const [anchored, setAnchored] = useState(true);
  const [canCollide, setCanCollide] = useState(true);
  const [transparency, setTransparency] = useState(0);

  const blockY = anchored ? FLOATING_Y : FLOOR_Y - BLOCK_H;
  // With collision off the character walks into the same space as the block.
  const charX = canCollide ? BLOCK_X - 54 : BLOCK_X + 42;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One part, three properties, side-on
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label={`A part that is ${anchored ? "anchored in mid-air" : "resting on the floor"}, ${canCollide ? "solid" : "passed through by the character"}, at transparency ${formatNumber(transparency, 1)}.`}
      >
        <rect width={W} height={H} fill="var(--learn-chart-plot)" rx={6} />

        <line
          x1={24}
          y1={FLOOR_Y}
          x2={W - 24}
          y2={FLOOR_Y}
          stroke="var(--learn-chart-axis)"
          strokeWidth={2}
        />
        <text x={24} y={FLOOR_Y + 18} fontSize={11} fill="var(--learn-ink-subtle)">
          Baseplate
        </text>

        {!anchored ? (
          <path
            d={`M ${BLOCK_X + BLOCK_W / 2} ${FLOATING_Y + 6} L ${BLOCK_X + BLOCK_W / 2} ${blockY - 10}`}
            stroke="var(--learn-ink-subtle)"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            markerEnd=""
          />
        ) : null}

        <rect
          x={BLOCK_X}
          y={blockY}
          width={BLOCK_W}
          height={BLOCK_H}
          rx={4}
          fill="var(--learn-accent)"
          fillOpacity={1 - transparency}
          stroke="var(--learn-ink-strong)"
          strokeWidth={1.6}
          strokeDasharray={canCollide ? undefined : "6 4"}
        />

        {/* Character: a capsule, deliberately a different shape from the part. */}
        <g>
          <rect x={charX} y={FLOOR_Y - 52} width={22} height={34} rx={11} fill="var(--learn-series-3)" />
          <circle cx={charX + 11} cy={FLOOR_Y - 62} r={11} fill="var(--learn-series-3)" />
        </g>

        <text x={BLOCK_X} y={blockY - 10} fontSize={11} fill="var(--learn-ink-subtle)">
          {anchored ? "Anchored — physics ignores it" : "Unanchored — it fell"}
        </text>
        {!canCollide ? (
          <text x={24} y={30} fontSize={11} fill="var(--learn-outcome-fn)">
            CanCollide off — the character walked straight through
          </text>
        ) : null}
      </svg>

      <div className="mt-4 flex flex-wrap gap-2">
        <Toggle label="Anchored" on={anchored} onClick={() => setAnchored((v) => !v)} />
        <Toggle label="CanCollide" on={canCollide} onClick={() => setCanCollide((v) => !v)} />
      </div>

      <label className="mt-4 block">
        <span className="text-[13px] text-learn-muted">
          Transparency — {formatNumber(transparency, 1)}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={transparency}
          onChange={(event) => setTransparency(Number(event.target.value))}
          className="learn-focusable mt-2 w-full accent-learn-accent"
        />
      </label>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {`local part = workspace.Obby.Platform
part.Anchored = ${anchored}
part.CanCollide = ${canCollide}
part.Transparency = ${formatNumber(transparency, 1)}`}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {transparency === 1 && canCollide
          ? "Fully transparent and still solid. This is the invisible wall every obby uses, and the reason Transparency and CanCollide have to be two separate properties."
          : !canCollide && transparency === 0
            ? "Fully visible and completely intangible. A player sees a platform and falls straight through it — the single most common obby bug there is."
            : "Change one at a time. Each of these three is independent of the other two, and almost every strange part behaviour is one of them set to something you did not intend."}
      </p>
    </figure>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={cn(
        "learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
        on
          ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
          : "border-learn-line bg-white text-learn-muted hover:text-learn-strong",
      )}
    >
      {label} {on ? "on" : "off"}
    </button>
  );
}
