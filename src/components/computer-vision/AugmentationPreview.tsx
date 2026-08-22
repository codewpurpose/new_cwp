"use client";

/**
 * One fixed illustrated "photo" — a house, a tree, a sun — duplicated below
 * with a handful of augmentations applied. Every transform is a fixed amount
 * (a 12 degree rotation, a mirror flip, one crop rectangle, one lighting
 * overlay), so the result is identical on every render. The counter is
 * arithmetic (2 raised to the number of active toggles), not a simulation.
 */

import { useId, useMemo, useState } from "react";

const VIEW_WIDTH = 240;
const VIEW_HEIGHT = 160;
const CENTER_X = VIEW_WIDTH / 2;
const CENTER_Y = VIEW_HEIGHT / 2;
const ROTATE_DEGREES = 12;
const CROP_WIDTH = VIEW_WIDTH * 0.72;
const CROP_HEIGHT = VIEW_HEIGHT * 0.78;

type ToggleKey = "rotate" | "flip" | "crop" | "relight";

const TOGGLES: readonly { key: ToggleKey; label: string; detail: string }[] = [
  { key: "rotate", label: "Rotate", detail: `${ROTATE_DEGREES} degrees` },
  { key: "flip", label: "Flip", detail: "mirrored left to right" },
  { key: "crop", label: "Crop", detail: "trims the frame" },
  { key: "relight", label: "Relight", detail: "a warmer, dimmer light" },
];

/** The fixed scene, drawn once and reused for both the original and the preview. */
function Scene() {
  return (
    <>
      <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="#cfe8f3" />
      <rect x={0} y={116} width={VIEW_WIDTH} height={44} fill="#dbeecb" />
      <circle cx={204} cy={30} r={16} fill="#f4c95d" />
      {/* tree */}
      <rect x={40} y={90} width={10} height={30} fill="#7a5230" />
      <circle cx={45} cy={78} r={26} fill="#4f7942" />
      {/* house */}
      <rect x={110} y={96} width={70} height={44} fill="#e4ddce" />
      <polygon points="105,96 145,58 185,96" fill="#b6493c" />
      <rect x={135} y={112} width={16} height={28} fill="#5b3a29" />
      <rect x={158} y={106} width={14} height={14} fill="#9cc6de" />
    </>
  );
}

export function AugmentationPreview() {
  const clipId = useId();
  const [active, setActive] = useState<Record<ToggleKey, boolean>>({
    rotate: false,
    flip: false,
    crop: false,
    relight: false,
  });

  const activeCount = useMemo(
    () => TOGGLES.filter((t) => active[t.key]).length,
    [active],
  );
  const exampleCount = 2 ** activeCount;

  const transformParts: string[] = [];
  if (active.flip) transformParts.push("scale(-1,1)");
  if (active.rotate) transformParts.push(`rotate(${ROTATE_DEGREES})`);
  const innerTransform = transformParts.length
    ? `translate(${CENTER_X},${CENTER_Y}) ${transformParts.join(" ")} translate(${-CENTER_X},${-CENTER_Y})`
    : undefined;

  const cropX = (VIEW_WIDTH - CROP_WIDTH) / 2;
  const cropY = (VIEW_HEIGHT - CROP_HEIGHT) / 2;

  function toggle(key: ToggleKey) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One photo, several ways to see it
      </figcaption>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-[12px] uppercase tracking-[0.06em] text-learn-subtle">
            The original photo
          </p>
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="mt-2 w-full rounded-learn-md border-[0.5px] border-learn-line"
            role="img"
            aria-label="The unmodified training photo: a house, a tree, and a sun."
          >
            <Scene />
          </svg>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.06em] text-learn-subtle">
            With your augmentations applied
          </p>
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="mt-2 w-full rounded-learn-md border-[0.5px] border-learn-line"
            role="img"
            aria-label={
              activeCount === 0
                ? "Same as the original photo — no augmentations selected."
                : `The same photo with ${activeCount} augmentation${activeCount === 1 ? "" : "s"} applied: ${TOGGLES.filter((t) => active[t.key]).map((t) => t.label.toLowerCase()).join(", ")}.`
            }
          >
            <clipPath id={clipId}>
              <rect
                x={active.crop ? cropX : 0}
                y={active.crop ? cropY : 0}
                width={active.crop ? CROP_WIDTH : VIEW_WIDTH}
                height={active.crop ? CROP_HEIGHT : VIEW_HEIGHT}
              />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
              <g transform={innerTransform}>
                <Scene />
              </g>
              {active.relight && (
                <rect
                  x={0}
                  y={0}
                  width={VIEW_WIDTH}
                  height={VIEW_HEIGHT}
                  fill="#3b2a12"
                  opacity={0.35}
                />
              )}
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {TOGGLES.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => toggle(t.key)}
            aria-pressed={active[t.key]}
            className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-left text-sm font-medium transition-colors motion-reduce:transition-none ${
              active[t.key]
                ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-[11px] opacity-70">({t.detail})</span>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-learn-strong">
            This one photo becomes
          </h3>
          <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
            {exampleCount}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
          {activeCount === 0
            ? "training example — itself, and nothing else, until you switch something on."
            : `training examples: every combination of ${activeCount} independent on/off augmentation${activeCount === 1 ? "" : "s"} applied to the same original photo.`}
        </p>
      </div>
    </figure>
  );
}
