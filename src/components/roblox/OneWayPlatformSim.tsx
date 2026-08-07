"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/ml/format";
import { cn } from "@/lib/utils";

/**
 * The height comparison that drives a one-way platform, and the reason it
 * cannot survive a second player.
 *
 * CanCollide is a property of the PART. One part, one value, shared by everyone
 * in the server — so the moment two players want different answers, the last
 * Touched event to fire decides for both. That failure is what the second
 * player toggle exists to show; it is not a bug in the script, it is the wrong
 * place to store per-player state.
 */

const W = 480;
const H = 240;
const PLATFORM_Y = 130;
const PLATFORM_X = 140;
const PLATFORM_W = 200;
const WORLD_TOP = 30;
const WORLD_BOTTOM = 220;

/** Slider value (0 = low, 100 = high) mapped to a y coordinate on screen. */
const screenY = (height: number) => WORLD_BOTTOM - (height / 100) * (WORLD_BOTTOM - WORLD_TOP);

/** The platform's own height on the same 0-100 scale, for the comparison. */
const PLATFORM_HEIGHT = ((WORLD_BOTTOM - PLATFORM_Y) / (WORLD_BOTTOM - WORLD_TOP)) * 100;

export function OneWayPlatformSim() {
  const [heightA, setHeightA] = useState(75);
  const [twoPlayers, setTwoPlayers] = useState(false);
  const heightB = 20;

  const aAbove = heightA > PLATFORM_HEIGHT;
  const bAbove = heightB > PLATFORM_HEIGHT;

  // One shared property. With two players, whichever Touched fired last wins —
  // model that as player B, the most recent to move.
  const canCollide = twoPlayers ? bAbove : aAbove;

  const aCorrect = canCollide === aAbove;
  const bCorrect = canCollide === bAbove;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One property, and however many players want to use it
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label={`The platform's CanCollide is ${canCollide}. Player A is ${aAbove ? "above" : "below"} it and is ${aCorrect ? "handled correctly" : "handled wrongly"}.`}
      >
        <rect width={W} height={H} fill="var(--learn-chart-plot)" rx={6} />

        <rect
          x={PLATFORM_X}
          y={PLATFORM_Y}
          width={PLATFORM_W}
          height={12}
          rx={3}
          fill={canCollide ? "var(--learn-accent)" : "none"}
          stroke="var(--learn-ink-strong)"
          strokeWidth={1.6}
          strokeDasharray={canCollide ? undefined : "7 5"}
        />
        <text x={PLATFORM_X} y={PLATFORM_Y - 10} fontSize={11} fill="var(--learn-ink-subtle)">
          {canCollide ? "CanCollide = true — solid" : "CanCollide = false — you fall through"}
        </text>

        {/* Player A — circle head, the one you control */}
        <g>
          <circle cx={200} cy={screenY(heightA)} r={13} fill="var(--learn-series-1)" />
          <text x={200} y={screenY(heightA) + 4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--learn-surface)">
            A
          </text>
          {!aCorrect ? (
            <text x={222} y={screenY(heightA) + 4} fontSize={11} fill="var(--learn-outcome-fn)">
              {aAbove ? "falls through the floor" : "blocked from jumping up"}
            </text>
          ) : null}
        </g>

        {/* Player B — square, so the two differ in shape as well as hue */}
        {twoPlayers ? (
          <g>
            <rect x={280} y={screenY(heightB) - 13} width={26} height={26} rx={4} fill="var(--learn-series-3)" />
            <text x={293} y={screenY(heightB) + 4.5} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--learn-surface)">
              B
            </text>
            {!bCorrect ? (
              <text x={314} y={screenY(heightB) + 4} fontSize={11} fill="var(--learn-outcome-fn)">
                blocked from jumping up
              </text>
            ) : null}
          </g>
        ) : null}
      </svg>

      <label className="mt-4 block">
        <span className="text-[13px] text-learn-muted">
          Player A height — {formatNumber(heightA, 0)}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={heightA}
          onChange={(event) => setHeightA(Number(event.target.value))}
          className="learn-focusable mt-2 w-full accent-learn-accent"
        />
      </label>

      <button
        type="button"
        role="switch"
        aria-checked={twoPlayers}
        onClick={() => setTwoPlayers((v) => !v)}
        className={cn(
          "learn-focusable mt-3 rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
          twoPlayers
            ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
            : "border-learn-line bg-white text-learn-muted hover:text-learn-strong",
        )}
      >
        {twoPlayers ? "two players in the server" : "one player in the server"}
      </button>

      <div className="mt-4 rounded-[6px] bg-learn-code-bg px-4 py-3">
        <p className="overflow-x-auto font-[family-name:var(--learn-font-mono)] text-[13px] whitespace-pre text-learn-code-fg">
          {`local root = character:FindFirstChild("HumanoidRootPart")
platform.CanCollide = root.Position.Y > platform.Position.Y`}
        </p>
        <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[12px] text-learn-code-dim">
          {`platform.CanCollide → ${canCollide}`}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {twoPlayers
          ? "Two players, one property, and it can only hold one answer. B is underneath and wants to jump up, so the platform goes intangible — and A, standing on top of it, drops straight through a floor that was solid a frame ago. Nothing about the script is wrong. The state is simply in the wrong place."
          : "With one player this works, and works well. Slide A above the platform and it goes solid; slide below and it lets them through. Now turn on the second player."}
      </p>
    </figure>
  );
}
