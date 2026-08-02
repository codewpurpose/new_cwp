"use client";

import { useMemo, useState } from "react";
import { SegmentedControl } from "@/components/learn/primitives/SegmentedControl";
import { formatPercent } from "@/lib/ml/format";
import {
  APPLICANTS,
  CREDIT_RANGE,
  CREDIT_SPAN,
  contributionOf,
  INCOME_RANGE,
  INCOME_SPAN,
  K,
  nearestTo,
  QUERY,
  type ScaleMode,
  verdictOf,
} from "@/lib/ml/scaling-data";
import { linearScale } from "@/lib/ml/scale";

const VIEW_WIDTH = 680;
const VIEW_HEIGHT = 380;
const PAD_LEFT = 58;
const PAD_RIGHT = 16;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 300;

const xCredit = linearScale([CREDIT_RANGE[0], CREDIT_RANGE[1]], [PAD_LEFT, VIEW_WIDTH - PAD_RIGHT]);
const yIncome = linearScale([INCOME_RANGE[0], INCOME_RANGE[1]], [PLOT_BOTTOM, PLOT_TOP]);

const CREDIT_TICKS = [2, 9, 16, 23, 30];
const INCOME_TICKS = [18000, 73500, 129000, 184500, 240000];

const MODES: readonly { value: ScaleMode; label: string }[] = [
  { value: "raw", label: "Raw" },
  { value: "minmax", label: "Min-max" },
  { value: "standard", label: "Standardised" },
];

const MODE_NOTE: Record<ScaleMode, string> = {
  raw:
    "In the applicants' own units, income drowns out credit history. The five nearest are simply " +
    "whoever earns closest to $45,000, and three of those five were denied.",
  minmax:
    "Squashed onto 0-1, both columns count. The five nearest are now people with a similarly long " +
    "credit history, and all five were approved.",
  standard:
    "Centred on zero and scaled by their own spread, both columns count again. The five nearest are " +
    "almost the same five as min-max found, and the verdict agrees: approved.",
};

/**
 * Formats a dollar amount with thousands separators, without touching
 * `toLocaleString` or `Intl.NumberFormat` — both are banned in lesson
 * modules because they are locale-dependent. This is a plain, deterministic
 * regex, identical on the server and in the browser.
 */
function formatDollars(value: number): string {
  const rounded = Math.round(value);
  const digits = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${rounded < 0 ? "-" : ""}$${digits}`;
}

/**
 * An applicant who was approved is a filled circle; one who was denied is a
 * hollow square. Shape carries the class as well as hue does — fern and
 * indigo converge under deuteranopia, so colour alone would not survive it.
 */
function Mark({ x, y, approved, dim }: { x: number; y: number; approved: boolean; dim: boolean }) {
  const opacity = dim ? 0.26 : 1;
  if (approved) {
    return <circle cx={x} cy={y} r={4.6} fill="var(--learn-series-1)" opacity={opacity} />;
  }
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width={8}
      height={8}
      fill="none"
      stroke="var(--learn-series-3)"
      strokeWidth={1.6}
      opacity={opacity}
    />
  );
}

export function ScaleToggle() {
  const [mode, setMode] = useState<ScaleMode>("raw");

  const neighbours = useMemo(() => nearestTo(QUERY, K, mode), [mode]);
  const verdict = useMemo(() => verdictOf(neighbours), [neighbours]);
  const contribution = useMemo(() => contributionOf(QUERY, mode), [mode]);
  const neighbourIndices = useMemo(() => new Set(neighbours.map((n) => n.index)), [neighbours]);

  const qx = xCredit(QUERY.creditYears);
  const qy = yIncome(QUERY.income);

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Rescale the axes
      </figcaption>

      <p className="mt-2 text-[15px] leading-[1.6] text-learn-strong">
        Sixty loan applicants, placed by years of credit history and annual income. Filled circles
        were approved; hollow squares were denied. Credit history runs {CREDIT_RANGE[0]} to{" "}
        {CREDIT_RANGE[1]} years — a span of {CREDIT_SPAN}. Income runs {formatDollars(INCOME_RANGE[0])}{" "}
        to {formatDollars(INCOME_RANGE[1])} — a span of {formatDollars(INCOME_SPAN)}. The cross is an
        applicant nobody has decided on yet, {QUERY.creditYears} years of history on{" "}
        {formatDollars(QUERY.income)} a year.
      </p>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={
            `Credit history against income for 60 loan applicants. Measuring distance ` +
            `${mode === "raw" ? "in the columns' own units" : mode === "minmax" ? "after squashing both columns onto 0 to 1" : "after standardising both columns to mean 0 and standard deviation 1"}, ` +
            `the ${K} nearest applicants to a 27-year, $45,000 query vote ${verdict.approveVotes} to ` +
            `${verdict.denyVotes} for ${verdict.approved ? "approved" : "denied"}. Credit history accounts for ` +
            `${formatPercent(contribution.credit, 1)} of the distance and income accounts for ` +
            `${formatPercent(contribution.income, 1)}.`
          }
        >
          {INCOME_TICKS.map((tick) => (
            <line
              key={tick}
              x1={PAD_LEFT}
              y1={yIncome(tick)}
              x2={VIEW_WIDTH - PAD_RIGHT}
              y2={yIncome(tick)}
              stroke="var(--learn-chart-grid)"
              strokeWidth={1}
            />
          ))}

          {/* Spokes first, so the marks sit on top of them. */}
          {neighbours.map((n) => (
            <line
              key={`spoke-${n.index}`}
              x1={qx}
              y1={qy}
              x2={xCredit(n.applicant.creditYears)}
              y2={yIncome(n.applicant.income)}
              stroke="var(--learn-chart-axis)"
              strokeWidth={1.2}
              opacity={0.55}
            />
          ))}

          {APPLICANTS.map((applicant, i) => (
            <Mark
              key={i}
              x={xCredit(applicant.creditYears)}
              y={yIncome(applicant.income)}
              approved={applicant.approved}
              dim={!neighbourIndices.has(i)}
            />
          ))}

          <g>
            <line x1={qx - 7} y1={qy} x2={qx + 7} y2={qy} stroke="var(--learn-ink)" strokeWidth={2.4} />
            <line x1={qx} y1={qy - 7} x2={qx} y2={qy + 7} stroke="var(--learn-ink)" strokeWidth={2.4} />
          </g>

          <line
            x1={PAD_LEFT}
            y1={PLOT_BOTTOM}
            x2={VIEW_WIDTH - PAD_RIGHT}
            y2={PLOT_BOTTOM}
            stroke="var(--learn-chart-axis)"
            strokeWidth={1}
          />
          {CREDIT_TICKS.map((tick) => (
            <text
              key={tick}
              x={xCredit(tick)}
              y={PLOT_BOTTOM + 18}
              textAnchor="middle"
              fontSize={12}
              fill="var(--learn-ink-subtle)"
            >
              {tick}y
            </text>
          ))}
          <text
            x={PAD_LEFT + (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT) / 2}
            y={VIEW_HEIGHT - 4}
            textAnchor="middle"
            fontSize={12}
            fill="var(--learn-ink-muted)"
          >
            years of credit history
          </text>

          {INCOME_TICKS.map((tick) => (
            <text key={tick} x={6} y={yIncome(tick) + 4} fontSize={11} fill="var(--learn-ink-subtle)">
              {Math.round(tick / 1000)}k
            </text>
          ))}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-learn-muted">
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-learn-series-1" />
          approved
        </li>
        <li>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 border-[1.5px] border-learn-series-3" />
          denied
        </li>
        <li>+ the applicant in question</li>
      </ul>

      <SegmentedControl
        className="mt-4"
        label="How the two columns are measured"
        value={mode}
        onValueChange={setMode}
        options={MODES}
      />

      <p className="mt-3 text-[14px] leading-[1.5] text-learn-strong">{MODE_NOTE[mode]}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <h3 className="text-[15px] font-semibold text-learn-strong">Where the distance comes from</h3>
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex items-baseline justify-between text-[13px] text-learn-muted">
                <span>Credit history</span>
                <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
                  {formatPercent(contribution.credit, 1)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
                <div
                  className="h-full rounded-full bg-learn-series-1 transition-[width] duration-200 ease-out motion-reduce:transition-none"
                  style={{ width: `${contribution.credit * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between text-[13px] text-learn-muted">
                <span>Income</span>
                <span className="font-[family-name:var(--learn-font-mono)] tabular-nums text-learn-strong">
                  {formatPercent(contribution.income, 1)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-learn-sunken">
                <div
                  className="h-full rounded-full bg-learn-series-3 transition-[width] duration-200 ease-out motion-reduce:transition-none"
                  style={{ width: `${contribution.income * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-learn-strong">The verdict</h3>
            <span className="font-[family-name:var(--learn-font-mono)] text-[20px] leading-none text-learn-strong tabular-nums">
              {verdict.approveVotes}&ndash;{verdict.denyVotes}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-learn-muted">
            {verdict.approveVotes} of the {K} nearest applicants were approved, so the model predicts{" "}
            <strong className="font-semibold text-learn-strong">
              {verdict.approved ? "approved" : "denied"}
            </strong>
            .
          </p>
        </div>
      </div>
    </figure>
  );
}
