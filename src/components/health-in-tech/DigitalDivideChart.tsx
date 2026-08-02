import { mulberry32 } from "@/lib/ml/random";

interface Group {
  key: string;
  label: string;
  detail: string;
  trueAccessRate: number;
  shape: "circle" | "square" | "triangle" | "diamond";
}

const GROUPS: readonly Group[] = [
  { key: "urban-higher-income", label: "Urban, higher income", detail: "Broadband + a personal device at home", trueAccessRate: 0.95, shape: "circle" },
  { key: "urban-lower-income", label: "Urban, lower income", detail: "Broadband + a personal device at home", trueAccessRate: 0.7, shape: "square" },
  { key: "rural", label: "Rural households", detail: "Broadband + a personal device at home", trueAccessRate: 0.6, shape: "triangle" },
  { key: "older-adults", label: "Adults 65+", detail: "Broadband + a personal device at home", trueAccessRate: 0.56, shape: "diamond" },
];

const HOUSEHOLDS_PER_GROUP = 160;
const random = mulberry32(20260503);

/** Simulated per-household access, generated once at module scope from a
 *  fixed seed, then reduced to an observed percentage per group. */
const OBSERVED = GROUPS.map((group) => {
  let withAccess = 0;
  for (let i = 0; i < HOUSEHOLDS_PER_GROUP; i += 1) {
    if (random() < group.trueAccessRate) withAccess += 1;
  }
  return { ...group, percent: (withAccess / HOUSEHOLDS_PER_GROUP) * 100 };
});

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 260;
const PAD_LEFT = 40;
const PAD_RIGHT = 20;
const PAD_TOP = 20;
const PAD_BOTTOM = 66;
const PLOT_HEIGHT = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
const BAR_GAP = 20;
const BAR_WIDTH = (VIEW_WIDTH - PAD_LEFT - PAD_RIGHT - BAR_GAP * (OBSERVED.length - 1)) / OBSERVED.length;

function heightFor(percent: number): number {
  return (percent / 100) * PLOT_HEIGHT;
}

function Mark({ shape, cx, cy }: { shape: Group["shape"]; cx: number; cy: number }) {
  const fill = "var(--learn-ink)";
  if (shape === "circle") return <circle cx={cx} cy={cy} r={5} fill={fill} />;
  if (shape === "square") return <rect x={cx - 5} y={cy - 5} width={10} height={10} fill={fill} />;
  if (shape === "triangle") return <path d={`M${cx} ${cy - 6} L${cx + 6} ${cy + 5} L${cx - 6} ${cy + 5} Z`} fill={fill} />;
  return <path d={`M${cx} ${cy - 6} L${cx + 6} ${cy} L${cx} ${cy + 6} L${cx - 6} ${cy} Z`} fill={fill} />;
}

export function DigitalDivideChart() {
  const widest = OBSERVED[0].percent;
  const narrowest = OBSERVED[OBSERVED.length - 1].percent;

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        Share of households with both broadband and a personal device
      </figcaption>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="w-full min-w-[460px]"
          role="img"
          aria-label={OBSERVED.map((g) => `${g.label}: ${g.percent.toFixed(0)} percent`).join(". ")}
        >
          {[100, 75, 50, 25, 0].map((tick) => (
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

          {OBSERVED.map((group, i) => {
            const x = PAD_LEFT + i * (BAR_WIDTH + BAR_GAP);
            const h = heightFor(group.percent);
            const y = PAD_TOP + PLOT_HEIGHT - h;

            return (
              <g key={group.key}>
                <rect x={x} y={y} width={BAR_WIDTH} height={h} rx={4} fill="var(--learn-accent)" opacity={0.88} />
                <Mark shape={group.shape} cx={x + BAR_WIDTH / 2} cy={y - 12} />
                <text x={x + BAR_WIDTH / 2} y={y - 20} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--learn-ink)">
                  {group.percent.toFixed(0)}%
                </text>
                <text x={x + BAR_WIDTH / 2} y={VIEW_HEIGHT - PAD_BOTTOM + 18} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--learn-ink)">
                  {group.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-learn-muted">
        A {(widest - narrowest).toFixed(0)}-point gap sits between the best-connected and
        least-connected group here. A telemedicine product built only against the top bar looks
        finished and is not — the bottom bar is who gets quietly routed back to a system that
        assumes everyone can make a video call.
      </p>
    </figure>
  );
}
