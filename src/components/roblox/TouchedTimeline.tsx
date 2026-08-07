"use client";

import { useState } from "react";
import { formatCount, formatNumber } from "@/lib/ml/format";
import { cn } from "@/lib/utils";

/**
 * One crossing of a part, and every Touched it produces.
 *
 * The firing times are a literal: they are roughly what a character's limbs
 * produce walking over a plate, and writing them down rather than simulating
 * them keeps the chart identical on the server and in the browser. The
 * accept/reject decision below IS computed, because that logic is the lesson.
 */

/** Seconds from first contact. Fourteen touches inside half a second. */
const FIRINGS = [0.02, 0.04, 0.05, 0.09, 0.11, 0.12, 0.16, 0.19, 0.21, 0.26, 0.28, 0.31, 0.36, 0.42];

const WINDOW = 0.3;
const W = 520;
const H = 132;
const PAD_L = 20;
const PAD_R = 20;
const AXIS_Y = 92;
const SPAN = 0.5;

const x = (t: number) => PAD_L + (t / SPAN) * (W - PAD_L - PAD_R);

/** Which firings actually reach the body of the handler. */
function accepted(debounced: boolean): boolean[] {
  if (!debounced) return FIRINGS.map(() => true);
  let openAt = -Infinity;
  return FIRINGS.map((t) => {
    if (t >= openAt) {
      openAt = t + WINDOW;
      return true;
    }
    return false;
  });
}

export function TouchedTimeline() {
  const [debounced, setDebounced] = useState(false);
  const runs = accepted(debounced);
  const ran = runs.filter(Boolean).length;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One player, one step onto the plate
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label={`Fourteen Touched events in half a second; ${formatCount(ran)} of them run the handler.`}
      >
        <rect width={W} height={H} fill="var(--learn-chart-plot)" rx={6} />

        <line x1={PAD_L} y1={AXIS_Y} x2={W - PAD_R} y2={AXIS_Y} stroke="var(--learn-chart-axis)" strokeWidth={1.4} />

        {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={AXIS_Y} x2={x(t)} y2={AXIS_Y + 5} stroke="var(--learn-chart-axis)" strokeWidth={1} />
            <text x={x(t)} y={AXIS_Y + 20} textAnchor="middle" fontSize={11} fill="var(--learn-ink-subtle)">
              {`${formatNumber(t, 1)}s`}
            </text>
          </g>
        ))}

        {FIRINGS.map((t, i) => {
          const on = runs[i];
          return (
            <g key={t}>
              <line
                x1={x(t)}
                y1={AXIS_Y}
                x2={x(t)}
                y2={on ? 26 : 58}
                stroke={on ? "var(--learn-series-1)" : "var(--learn-chart-muted-mark)"}
                strokeWidth={on ? 2.4 : 1.4}
              />
              {on ? (
                <circle cx={x(t)} cy={26} r={4} fill="var(--learn-series-1)" />
              ) : (
                <rect x={x(t) - 3} y={55} width={6} height={6} fill="var(--learn-chart-muted-mark)" />
              )}
            </g>
          );
        })}

        <text x={PAD_L} y={16} fontSize={11} fill="var(--learn-ink-subtle)">
          handler runs
        </text>
        {debounced ? (
          <text x={PAD_L} y={72} fontSize={11} fill="var(--learn-ink-subtle)">
            turned away at the door
          </text>
        ) : null}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={debounced}
          onClick={() => setDebounced((v) => !v)}
          className={cn(
            "learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none",
            debounced
              ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
              : "border-learn-line bg-white text-learn-muted hover:text-learn-strong",
          )}
        >
          debounce {debounced ? "on" : "off"}
        </button>
        <p className="font-[family-name:var(--learn-font-mono)] text-[13px] text-learn-strong">
          {`${formatCount(FIRINGS.length)} events → ${formatCount(ran)} handler ${ran === 1 ? "run" : "runs"}`}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        {debounced
          ? `The flag closes the door for ${formatNumber(WINDOW, 1)} seconds after the first touch, so twelve of the fourteen events return immediately. The second run at 0.36s is the player still standing on the plate — a debounce limits how often the handler runs, it does not stop it happening twice.`
          : "Fourteen copies of your handler are now running at once, each convinced it is the only one. If that handler removes the platform and puts it back, thirteen of them will put it back on a schedule nobody planned."}
      </p>
    </figure>
  );
}
