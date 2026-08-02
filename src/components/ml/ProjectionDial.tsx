"use client";

import { useId, useMemo, useState } from "react";
import { formatPercent } from "@/lib/ml/format";
import {
  BEST_ANGLE_DEGREES,
  BEST_VARIANCE_RETAINED,
  groupGapAt,
  loadingsAt,
  MAX_RADIUS,
  MEAN_ALGEBRA,
  MEAN_GEOMETRY,
  NEEDS_SUPPORT_COUNT,
  PROJECTION_DOMAIN,
  projectedValue,
  SCORE_DOMAIN,
  STUDENT_TOTAL,
  STUDENTS,
  varianceRetainedAt,
  VARIANCE_CURVE,
  WORST_ALIGNED_ANGLE_DEGREES,
} from "@/lib/ml/dimensionality-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 500;

const SCATTER_LEFT = 46;
const SCATTER_RIGHT = 386;
const SCATTER_TOP = 20;
const SCATTER_BOTTOM = 360;

const CURVE_LEFT = 432;
const CURVE_RIGHT = 660;
const CURVE_TOP = 20;
const CURVE_BOTTOM = 360;

const STRIP_LEFT = 46;
const STRIP_RIGHT = 660;
const STRIP_BASE_Y = 462;
const STRIP_ROW_STEP = 6;
const STRIP_BINS = 42;

const xScore = linearScale(SCORE_DOMAIN, [SCATTER_LEFT, SCATTER_RIGHT]);
const yScore = linearScale(SCORE_DOMAIN, [SCATTER_BOTTOM, SCATTER_TOP]);
const xAngle = linearScale([0, 180], [CURVE_LEFT, CURVE_RIGHT]);
const yRetain = linearScale([0, 1], [CURVE_BOTTOM, CURVE_TOP]);
const xProjection = linearScale(PROJECTION_DOMAIN, [STRIP_LEFT, STRIP_RIGHT]);

const CURVE_PATH = VARIANCE_CURVE.map(
  (p, i) => `${i === 0 ? "M" : "L"}${xAngle(p.angle).toFixed(1)} ${yRetain(p.retained).toFixed(1)}`,
).join(" ");

const PRESETS = [
  { key: "algebra-only", angle: 0, label: "Algebra only (0°)" },
  { key: "best", angle: BEST_ANGLE_DEGREES, label: "Snap to best" },
  {
    key: "worst",
    angle: WORST_ALIGNED_ANGLE_DEGREES,
    label: `Turn 90° off (${WORST_ALIGNED_ANGLE_DEGREES}°)`,
  },
] as const;

/**
 * On track is a filled circle; flagged for support is a hollow square. Shape
 * carries the group as well as hue does — fern and indigo both read fine to a
 * trichromat, but only the shape survives deuteranopia.
 */
function Mark({ x, y, needsSupport }: { x: number; y: number; needsSupport: boolean }) {
  if (needsSupport) {
    return (
      <rect
        x={x - 4.2}
        y={y - 4.2}
        width={8.4}
        height={8.4}
        fill="none"
        stroke="var(--learn-series-3)"
        strokeWidth={1.6}
      />
    );
  }
  return <circle cx={x} cy={y} r={4.2} fill="var(--learn-series-1)" />;
}

export function ProjectionDial() {
  const [angle, setAngle] = useState(8);
  const sliderId = useId();

  const rad = (angle * Math.PI) / 180;
  const retained = useMemo(() => varianceRetainedAt(angle), [angle]);
  const loadings = useMemo(() => loadingsAt(angle), [angle]);
  const gap = useMemo(() => groupGapAt(angle), [angle]);
  const isBest = angle === BEST_ANGLE_DEGREES;
  const activePreset = PRESETS.find((p) => p.angle === angle);

  const lineHalf = MAX_RADIUS * 1.15;
  const lineStart = {
    x: xScore(MEAN_ALGEBRA - Math.cos(rad) * lineHalf),
    y: yScore(MEAN_GEOMETRY - Math.sin(rad) * lineHalf),
  };
  const lineEnd = {
    x: xScore(MEAN_ALGEBRA + Math.cos(rad) * lineHalf),
    y: yScore(MEAN_GEOMETRY + Math.sin(rad) * lineHalf),
  };

  const drops = useMemo(
    () =>
      STUDENTS.map((student) => {
        const t = projectedValue(student, angle);
        const footAlgebra = MEAN_ALGEBRA + t * Math.cos(rad);
        const footGeometry = MEAN_GEOMETRY + t * Math.sin(rad);
        return {
          x1: xScore(student.algebra),
          y1: yScore(student.geometry),
          x2: xScore(footAlgebra),
          y2: yScore(footGeometry),
        };
      }),
    [angle, rad],
  );

  const shadowMarks = useMemo(() => {
    const [domainMin, domainMax] = PROJECTION_DOMAIN;
    const binWidth = (domainMax - domainMin) / STRIP_BINS;
    const rowsUsed = new Array(STRIP_BINS).fill(0);
    return STUDENTS.map((student) => {
      const t = projectedValue(student, angle);
      let bin = Math.floor((t - domainMin) / binWidth);
      bin = Math.min(STRIP_BINS - 1, Math.max(0, bin));
      const row = rowsUsed[bin];
      rowsUsed[bin] += 1;
      return {
        needsSupport: student.needsSupport,
        x: xProjection(t),
        y: STRIP_BASE_Y - row * STRIP_ROW_STEP - STRIP_ROW_STEP,
      };
    });
  }, [angle]);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Rotate the line
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        {STUDENT_TOTAL} students, placed by their algebra and geometry exam scores. Drag the
        angle and watch the line the whole cloud gets flattened onto, and the strip of shadows
        it leaves underneath.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[620px]"
          role="img"
          aria-label={
            `${STUDENT_TOTAL} students plotted by algebra and geometry exam scores, ` +
            `${NEEDS_SUPPORT_COUNT} of them flagged for extra support. Projected onto a line at ` +
            `${angle} degrees, this keeps ${formatPercent(retained)} of the total spread, and the ` +
            `flagged group's average sits ${gap.toFixed(1)} points from the rest along that line. ` +
            `The best possible angle is ${BEST_ANGLE_DEGREES} degrees, keeping ` +
            `${formatPercent(BEST_VARIANCE_RETAINED)} of the spread.`
          }
        >
          <clipPath id="projection-dial-scatter">
            <rect
              x={SCATTER_LEFT}
              y={SCATTER_TOP}
              width={SCATTER_RIGHT - SCATTER_LEFT}
              height={SCATTER_BOTTOM - SCATTER_TOP}
            />
          </clipPath>

          <rect
            x={SCATTER_LEFT}
            y={SCATTER_TOP}
            width={SCATTER_RIGHT - SCATTER_LEFT}
            height={SCATTER_BOTTOM - SCATTER_TOP}
            fill="var(--learn-chart-plot)"
          />

          <g clipPath="url(#projection-dial-scatter)">
            {drops.map((d, i) => (
              <line
                key={i}
                x1={d.x1}
                y1={d.y1}
                x2={d.x2}
                y2={d.y2}
                stroke="var(--learn-chart-error)"
                strokeWidth={1}
                opacity={0.5}
              />
            ))}
            <line
              x1={lineStart.x}
              y1={lineStart.y}
              x2={lineEnd.x}
              y2={lineEnd.y}
              stroke={isBest ? "var(--learn-accent)" : "var(--learn-ink-strong)"}
              strokeWidth={isBest ? 2.6 : 2}
            />
            {STUDENTS.map((student, i) => (
              <Mark
                key={i}
                x={xScore(student.algebra)}
                y={yScore(student.geometry)}
                needsSupport={student.needsSupport}
              />
            ))}
            <circle cx={xScore(MEAN_ALGEBRA)} cy={yScore(MEAN_GEOMETRY)} r={3} fill="var(--learn-ink)" />
          </g>

          <rect
            x={SCATTER_LEFT}
            y={SCATTER_TOP}
            width={SCATTER_RIGHT - SCATTER_LEFT}
            height={SCATTER_BOTTOM - SCATTER_TOP}
            fill="none"
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <text x={SCATTER_LEFT} y={SCATTER_TOP - 7} fontSize={11} fill="var(--learn-ink-muted)">
            geometry score
          </text>
          <text
            x={SCATTER_RIGHT}
            y={SCATTER_BOTTOM + 17}
            textAnchor="end"
            fontSize={11}
            fill="var(--learn-ink-muted)"
          >
            algebra score
          </text>

          {/* Variance-retained-against-angle panel */}
          <line
            x1={CURVE_LEFT}
            y1={CURVE_BOTTOM}
            x2={CURVE_RIGHT}
            y2={CURVE_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <line
            x1={CURVE_LEFT}
            y1={CURVE_TOP}
            x2={CURVE_LEFT}
            y2={CURVE_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <path d={CURVE_PATH} fill="none" stroke="var(--learn-ink-strong)" strokeWidth={1.6} />
          <circle
            cx={xAngle(BEST_ANGLE_DEGREES)}
            cy={yRetain(BEST_VARIANCE_RETAINED)}
            r={4}
            fill="var(--learn-accent)"
          />
          <text
            x={xAngle(BEST_ANGLE_DEGREES)}
            y={yRetain(BEST_VARIANCE_RETAINED) - 9}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="var(--learn-accent-text)"
          >
            best
          </text>
          <line
            x1={xAngle(angle)}
            y1={CURVE_TOP}
            x2={xAngle(angle)}
            y2={CURVE_BOTTOM}
            stroke="var(--learn-ink)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
            opacity={0.6}
          />
          <circle cx={xAngle(angle)} cy={yRetain(retained)} r={4} fill="var(--learn-ink)" />
          <text x={CURVE_LEFT} y={CURVE_TOP - 6} fontSize={11} fill="var(--learn-ink-muted)">
            variance retained
          </text>
          <text x={CURVE_LEFT} y={CURVE_BOTTOM + 16} fontSize={11} fill="var(--learn-ink-subtle)">
            0°
          </text>
          <text
            x={CURVE_RIGHT}
            y={CURVE_BOTTOM + 16}
            textAnchor="end"
            fontSize={11}
            fill="var(--learn-ink-subtle)"
          >
            180°
          </text>

          {/* The 1-D shadow strip */}
          <line
            x1={STRIP_LEFT}
            y1={STRIP_BASE_Y}
            x2={STRIP_RIGHT}
            y2={STRIP_BASE_Y}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          <line
            x1={xProjection(0)}
            y1={STRIP_BASE_Y - 5}
            x2={xProjection(0)}
            y2={STRIP_BASE_Y + 5}
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={1.4}
          />
          {shadowMarks.map((mark, i) =>
            mark.needsSupport ? (
              <rect
                key={i}
                x={mark.x - 2.4}
                y={mark.y - 2.4}
                width={4.8}
                height={4.8}
                fill="none"
                stroke="var(--learn-series-3)"
                strokeWidth={1.3}
              />
            ) : (
              <circle key={i} cx={mark.x} cy={mark.y} r={2.4} fill="var(--learn-series-1)" />
            ),
          )}
          <text x={STRIP_LEFT} y={STRIP_BASE_Y + 22} fontSize={11} fill="var(--learn-ink-muted)">
            every student, flattened onto the line above
          </text>
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          on track
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 border-[1.5px] border-learn-series-3" />
          flagged for support
        </li>
        <li>
          <span className="mr-1.5 inline-block h-0.5 w-4 align-middle bg-learn-chart-error opacity-60" />
          perpendicular drop
        </li>
      </ul>

      <label htmlFor={sliderId} className="sr-only">
        Projection angle, in degrees
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={180}
        step={1}
        value={angle}
        onChange={(event) => setAngle(Number(event.target.value))}
        className="mt-3 w-full accent-learn-accent"
      />
      <p className="mt-1 text-center text-[13px] text-learn-muted">
        {angle}° — retains{" "}
        <span className="font-semibold text-learn-strong">{formatPercent(retained)}</span> of the
        spread
        {isBest && <span className="ml-1 text-learn-accent-text">— this is the best angle</span>}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset?.key === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setAngle(preset.angle)}
              aria-pressed={isActive}
              className={`learn-focusable rounded-full border-[0.5px] px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none ${
                isActive
                  ? "border-learn-inverse bg-learn-inverse text-learn-on-inverse"
                  : "border-learn-line bg-learn-surface text-learn-muted hover:text-learn-strong"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {activePreset && (
        <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">
          {activePreset.key === "algebra-only" &&
            `Keep the x-axis and throw geometry away outright. Only ${formatPercent(retained)} of the spread survives — a deletion, not a rotation, and it shows.`}
          {activePreset.key === "best" &&
            `The direction of greatest spread: ${formatPercent(retained)} of the variance survives. Along it the flagged students sit only ${gap.toFixed(1)} points from everyone else — nearly invisible.`}
          {activePreset.key === "worst" &&
            `Ninety degrees off the best line. Variance collapses to ${formatPercent(retained)} — but the flagged students are now ${gap.toFixed(1)} points from the rest, the widest gap on the whole dial. The direction PCA likes least was the one that actually separated them.`}
        </p>
      )}

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Variance retained</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {formatPercent(retained)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            Of the cloud&rsquo;s total spread, measured across both original columns.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">This line is</h3>
          </div>
          <p className="mt-2 font-[family-name:var(--learn-font-mono)] text-[13px] leading-[1.5] text-learn-strong tabular-nums">
            {loadings.algebra.toFixed(2)} × algebra + {loadings.geometry.toFixed(2)} × geometry
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            A component is a weighted mix of the original columns, not a copy of one.
          </p>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">Group gap here</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {gap.toFixed(1)}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-learn-muted">
            {NEEDS_SUPPORT_COUNT} flagged students against the rest, measured along this line.
          </p>
        </div>
      </div>
    </figure>
  );
}
