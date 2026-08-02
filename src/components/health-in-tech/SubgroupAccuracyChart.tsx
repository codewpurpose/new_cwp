import { mulberry32 } from "@/lib/ml/random";
import { formatPercent } from "@/lib/finance-format";

interface Group {
  key: string;
  label: string;
  detail: string;
  /** Share of the model's training data this group actually made up. */
  trainingShare: string;
  /** Underlying probability the simulated model gets a case in this group right. */
  trueAccuracy: number;
  shape: "circle" | "square" | "triangle";
}

const GROUPS: readonly Group[] = [
  {
    key: "group-a",
    label: "Group A",
    detail: "Made up most of the training data",
    trainingShare: "72% of training cases",
    trueAccuracy: 0.965,
    shape: "circle",
  },
  {
    key: "group-b",
    label: "Group B",
    detail: "Moderately represented in training",
    trainingShare: "21% of training cases",
    trueAccuracy: 0.9,
    shape: "square",
  },
  {
    key: "group-c",
    label: "Group C",
    detail: "Barely represented in training",
    trainingShare: "7% of training cases",
    trueAccuracy: 0.78,
    shape: "triangle",
  },
];

const CASES_PER_GROUP = 140;
const random = mulberry32(20260428);

/** Simulated per-case outcomes, generated once at module scope from a fixed
 *  seed, then reduced to an observed accuracy per group — deliberately close
 *  to, but not identical to, each group's underlying probability. */
const OBSERVED = GROUPS.map((group) => {
  let correct = 0;
  for (let i = 0; i < CASES_PER_GROUP; i += 1) {
    if (random() < group.trueAccuracy) correct += 1;
  }
  return { ...group, accuracy: (correct / CASES_PER_GROUP) * 100, correct, total: CASES_PER_GROUP };
});

const OVERALL_CORRECT = OBSERVED.reduce((sum, g) => sum + g.correct, 0);
const OVERALL_TOTAL = OBSERVED.reduce((sum, g) => sum + g.total, 0);
const OVERALL_ACCURACY = (OVERALL_CORRECT / OVERALL_TOTAL) * 100;

const BARS = [
  { key: "overall", label: "Overall", detail: "Every case, pooled together", accuracy: OVERALL_ACCURACY, shape: "diamond" as const },
  ...OBSERVED,
];

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 260;
const PAD_LEFT = 40;
const PAD_RIGHT = 20;
const PAD_TOP = 20;
const PAD_BOTTOM = 60;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const BAR_GAP = 18;
const BAR_WIDTH = (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT - BAR_GAP * (BARS.length - 1)) / BARS.length;
const MIN_SCALE = 60;

function heightFor(accuracy: number): number {
  const ratio = (accuracy - MIN_SCALE) / (100 - MIN_SCALE);
  return Math.max(2, ratio * PLOT_HEIGHT);
}

function Mark({ shape, cx, cy, fill }: { shape: Group["shape"] | "diamond"; cx: number; cy: number; fill: string }) {
  if (shape === "circle") return <circle cx={cx} cy={cy} r={5} fill={fill} />;
  if (shape === "square") return <rect x={cx - 5} y={cy - 5} width={10} height={10} fill={fill} />;
  if (shape === "triangle") return <path d={`M${cx} ${cy - 6} L${cx + 6} ${cy + 5} L${cx - 6} ${cy + 5} Z`} fill={fill} />;
  return <path d={`M${cx} ${cy - 6} L${cx + 6} ${cy} L${cx} ${cy + 6} L${cx - 6} ${cy} Z`} fill={fill} />;
}

export function SubgroupAccuracyChart() {
  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Accuracy overall versus accuracy per subgroup, same model, same day
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[460px]"
          role="img"
          aria-label={`Overall accuracy ${OVERALL_ACCURACY.toFixed(1)} percent. ${OBSERVED.map((g) => `${g.label}: ${g.accuracy.toFixed(1)} percent`).join(". ")}.`}
        >
          {[100, 90, 80, 70, 60].map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                y1={PAD_TOP + PLOT_HEIGHT - heightFor(tick)}
                x2={VIEW_WIDTH - PAD_RIGHT}
                y2={PAD_TOP + PLOT_HEIGHT - heightFor(tick)}
                stroke="var(--learn-line)"
                strokeWidth={0.75}
              />
              <text x={PAD_LEFT - 6} y={PAD_TOP + PLOT_HEIGHT - heightFor(tick) + 4} textAnchor="end" fontSize={10} fill="var(--learn-ink-subtle)">
                {tick}%
              </text>
            </g>
          ))}

          {BARS.map((bar, i) => {
            const x = PAD_LEFT + i * (BAR_WIDTH + BAR_GAP);
            const h = heightFor(bar.accuracy);
            const y = PAD_TOP + PLOT_HEIGHT - h;
            const isOverall = bar.key === "overall";
            const fill = isOverall ? "var(--learn-ink)" : "var(--learn-accent)";

            return (
              <g key={bar.key}>
                <rect x={x} y={y} width={BAR_WIDTH} height={h} rx={4} fill={fill} opacity={isOverall ? 0.85 : 0.9} />
                <Mark shape={bar.shape} cx={x + BAR_WIDTH / 2} cy={y - 12} fill={fill} />
                <text x={x + BAR_WIDTH / 2} y={y - 20} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--learn-ink)">
                  {bar.accuracy.toFixed(1)}%
                </text>
                <text x={x + BAR_WIDTH / 2} y={VIEW_HEIGHT - PAD_BOTTOM + 18} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--learn-ink)">
                  {bar.label}
                </text>
                <text x={x + BAR_WIDTH / 2} y={VIEW_HEIGHT - PAD_BOTTOM + 34} textAnchor="middle" fontSize={10} fill="var(--learn-ink-subtle)">
                  {bar.detail}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        The headline number — {formatPercent(OVERALL_ACCURACY, 1)} accurate overall — is real.
        It is also an average that hides a {(OBSERVED[0].accuracy - OBSERVED[2].accuracy).toFixed(0)}-point
        gap between the best-served and worst-served group, entirely explained by how much of
        each group&apos;s data the model actually trained on.
      </p>
    </figure>
  );
}
