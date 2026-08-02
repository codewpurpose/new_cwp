/**
 * Card art for the ML track.
 *
 * Each cover is a miniature of that lesson's own chart, drawn from the design
 * tokens rather than shipped as an image. That keeps the track free of binary
 * assets, scales cleanly at any size, and means the card actually previews what
 * the reader is about to open.
 */

interface CoverProps {
  slug: string;
}

const W = 160;
const H = 90;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--learn-chart-plot)" />
      {children}
    </svg>
  );
}

/** Deterministic pseudo-scatter so covers never shift between renders. */
function dots(count: number, fn: (i: number) => { x: number; y: number }) {
  return Array.from({ length: count }, (_, i) => fn(i));
}

function RulesCover() {
  const steps = [
    { w: 42, h: 22 },
    { w: 62, h: 34 },
    { w: 86, h: 46 },
    { w: 112, h: 58 },
  ];
  return (
    <Frame>
      {steps.map((s, i) => (
        <rect
          key={i}
          x={12}
          y={12}
          width={s.w}
          height={s.h}
          fill="var(--learn-chart-highlight)"
          stroke="var(--learn-accent)"
          strokeWidth={0.8}
        />
      ))}
      <line
        x1={12}
        y1={14}
        x2={144}
        y2={76}
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      {dots(16, (i) => ({ x: 16 + ((i * 37) % 128), y: 16 + ((i * 53) % 60) })).map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2.2}
          fill={i % 3 === 0 ? "var(--learn-series-2)" : "none"}
          stroke={i % 3 === 0 ? "none" : "var(--learn-series-3)"}
          strokeWidth={1}
        />
      ))}
    </Frame>
  );
}

function FeaturesCover() {
  return (
    <Frame>
      {dots(20, (i) => ({ x: 18 + ((i * 41) % 124), y: 14 + ((i * 29) % 62) })).map((p, i) => {
        const cooked = p.x * 0.45 + p.y * 0.55 > 52;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.4}
            fill={cooked ? "var(--learn-series-1)" : "none"}
            stroke={cooked ? "none" : "var(--learn-series-3)"}
            strokeWidth={1}
          />
        );
      })}
      <line
        x1={40}
        y1={72}
        x2={122}
        y2={20}
        stroke="var(--learn-chart-axis)"
        strokeWidth={2}
      />
      <circle cx={122} cy={20} r={3} fill="var(--learn-chart-axis)" />
    </Frame>
  );
}

function SlopeCover() {
  const pts = dots(12, (i) => ({ x: 16 + i * 11, y: 74 - i * 4.6 - ((i * 17) % 9) }));
  return (
    <Frame>
      {pts.map((p, i) => (
        <line
          key={`r${i}`}
          x1={p.x}
          y1={p.y}
          x2={p.x}
          y2={74 - (p.x - 16) * 0.42}
          stroke="var(--learn-chart-error)"
          strokeWidth={1.2}
          opacity={0.7}
        />
      ))}
      <line x1={14} y1={76} x2={148} y2={20} stroke="var(--learn-chart-model)" strokeWidth={2} />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.4} fill="var(--learn-series-3)" />
      ))}
    </Frame>
  );
}

function BucketsCover() {
  const bands = [18, 34, 50, 66];
  return (
    <Frame>
      {bands.map((y, i) => (
        <rect
          key={i}
          x={0}
          y={y}
          width={W}
          height={16}
          fill={i % 2 === 0 ? "var(--learn-surface)" : "transparent"}
          opacity={0.6}
        />
      ))}
      <path
        d="M12 74 L48 74 L48 58 L84 58 L84 42 L120 42 L120 26 L150 26"
        fill="none"
        stroke="var(--learn-series-4)"
        strokeWidth={2}
      />
      <line x1={12} y1={78} x2={150} y2={22} stroke="var(--learn-chart-model)" strokeWidth={1.6} />
      {dots(18, (i) => ({ x: 16 + ((i * 43) % 130), y: 20 + ((i * 31) % 56) })).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.8} fill="var(--learn-chart-muted-mark)" />
      ))}
    </Frame>
  );
}

function SplitCover() {
  return (
    <Frame>
      {Array.from({ length: 22 }, (_, i) => (
        <rect
          key={i}
          x={10 + i * 6.4}
          y={12}
          width={5}
          height={10}
          rx={1}
          fill={i % 4 === 1 ? "var(--learn-series-3)" : "var(--learn-series-1)"}
        />
      ))}
      <path
        d="M14 68 Q60 44 148 50 L148 62 Q60 60 14 78 Z"
        fill="var(--learn-chart-band)"
      />
      <path d="M14 73 Q60 52 148 56" fill="none" stroke="var(--learn-series-3)" strokeWidth={1.8} />
      {dots(6, (i) => ({ x: 40 + (i % 2) * 4, y: 52 + i * 4 })).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill="var(--learn-series-3)" opacity={0.85} />
      ))}
    </Frame>
  );
}

function OverfitCover() {
  return (
    <Frame>
      <path
        d="M12 70 Q34 66 48 44 T86 30 T124 24 L148 22"
        fill="none"
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.4}
        strokeDasharray="5 4"
      />
      <path
        d="M12 74 C26 34 34 82 48 40 C62 12 70 74 84 34 C98 8 108 70 122 30 L148 44"
        fill="none"
        stroke="var(--learn-chart-model)"
        strokeWidth={2}
      />
      {dots(9, (i) => ({ x: 16 + i * 15, y: 68 - i * 5 + ((i * 23) % 13) })).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.6} fill="var(--learn-chart-train)" />
      ))}
    </Frame>
  );
}

function ThresholdCover() {
  const bins = [3, 6, 10, 14, 17, 16, 12, 8, 5, 3];
  return (
    <Frame>
      <line x1={8} y1={45} x2={152} y2={45} stroke="var(--learn-chart-axis)" strokeWidth={1} />
      {bins.map((v, i) => {
        const x = 12 + i * 13.6;
        const flagged = i >= 5;
        return (
          <g key={i}>
            <rect
              x={x}
              y={45 - v * 1.7}
              width={10}
              height={v * 1.7}
              rx={1.5}
              fill={flagged ? "var(--learn-outcome-tp)" : "var(--learn-outcome-fn)"}
            />
            <rect
              x={x}
              y={45}
              width={10}
              height={(18 - v) * 1.7}
              rx={1.5}
              fill={flagged ? "var(--learn-outcome-fp)" : "var(--learn-outcome-tn)"}
            />
          </g>
        );
      })}
      <line
        x1={80}
        y1={6}
        x2={80}
        y2={84}
        stroke="var(--learn-ink)"
        strokeWidth={2}
        strokeDasharray="5 4"
      />
    </Frame>
  );
}

function NeighboursCover() {
  const pts = dots(22, (i) => ({ x: 14 + ((i * 47) % 132), y: 12 + ((i * 37) % 66) }));
  const query = { x: 78, y: 46 };
  const near = pts
    .map((p, i) => ({ p, i, d: Math.hypot(p.x - query.x, p.y - query.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 5);
  const nearSet = new Set(near.map((n) => n.i));
  return (
    <Frame>
      {near.map((n) => (
        <line
          key={`s${n.i}`}
          x1={query.x}
          y1={query.y}
          x2={n.p.x}
          y2={n.p.y}
          stroke="var(--learn-chart-axis)"
          strokeWidth={0.9}
          opacity={0.6}
        />
      ))}
      {pts.map((p, i) =>
        i % 2 === 0 ? (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.6}
            fill="var(--learn-series-1)"
            opacity={nearSet.has(i) ? 1 : 0.32}
          />
        ) : (
          <rect
            key={i}
            x={p.x - 2.3}
            y={p.y - 2.3}
            width={4.6}
            height={4.6}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={1.1}
            opacity={nearSet.has(i) ? 1 : 0.32}
          />
        ),
      )}
      <line x1={query.x - 5} y1={query.y} x2={query.x + 5} y2={query.y} stroke="var(--learn-ink)" strokeWidth={1.8} />
      <line x1={query.x} y1={query.y - 5} x2={query.x} y2={query.y + 5} stroke="var(--learn-ink)" strokeWidth={1.8} />
    </Frame>
  );
}

function TreeCover() {
  return (
    <Frame>
      <rect x={0} y={0} width={72} height={54} fill="var(--learn-chart-highlight)" />
      <rect x={72} y={0} width={88} height={90} fill="var(--learn-chart-plot)" />
      <rect x={0} y={54} width={72} height={36} fill="var(--learn-chart-plot)" />
      <line x1={72} y1={0} x2={72} y2={90} stroke="var(--learn-chart-axis)" strokeWidth={1.4} />
      <line x1={0} y1={54} x2={72} y2={54} stroke="var(--learn-chart-axis)" strokeWidth={1.4} />
      <line x1={72} y1={30} x2={160} y2={30} stroke="var(--learn-chart-axis)" strokeWidth={1} />
      {dots(24, (i) => ({ x: 10 + ((i * 43) % 142), y: 8 + ((i * 31) % 76) })).map((p, i) => {
        const fast = p.x < 72 && p.y < 54;
        return fast ? (
          <circle key={i} cx={p.x} cy={p.y} r={2.4} fill="var(--learn-series-1)" />
        ) : (
          <rect
            key={i}
            x={p.x - 2.1}
            y={p.y - 2.1}
            width={4.2}
            height={4.2}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={1}
          />
        );
      })}
    </Frame>
  );
}

function ForestCover() {
  // A staircase per tree, offset, fading into a soft band around the diagonal.
  const stairs = [0, 1, 2, 3].map((t) => {
    const steps = Array.from({ length: 7 }, (_, i) => {
      const x = 10 + i * 20 + t * 3;
      const y = 74 - i * 9 - ((t * 5 + i * 3) % 7);
      return `L${x} ${y} L${x + 20} ${y}`;
    }).join(" ");
    return `M10 ${78 - t * 2} ${steps}`;
  });
  return (
    <Frame>
      {stairs.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--learn-series-1)"
          strokeWidth={1.2}
          opacity={0.32}
        />
      ))}
      <line
        x1={10}
        y1={80}
        x2={150}
        y2={14}
        stroke="var(--learn-chart-truth)"
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      {dots(14, (i) => ({ x: 14 + ((i * 53) % 132), y: 12 + ((i * 41) % 70) })).map((p, i) =>
        p.y > 78 - (p.x - 10) * 0.47 ? (
          <circle key={i} cx={p.x} cy={p.y} r={2.3} fill="var(--learn-series-1)" />
        ) : (
          <rect
            key={i}
            x={p.x - 2}
            y={p.y - 2}
            width={4}
            height={4}
            fill="none"
            stroke="var(--learn-series-3)"
            strokeWidth={1}
          />
        ),
      )}
    </Frame>
  );
}

function FoldsCover() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <Frame>
      {rows.map((r) =>
        rows.map((c) => (
          <rect
            key={`${r}-${c}`}
            x={10 + c * 28}
            y={9 + r * 15}
            width={26}
            height={11}
            rx={1.5}
            fill={r === c ? "var(--learn-series-3)" : "var(--learn-series-1)"}
            opacity={r === c ? 1 : 0.34}
          />
        )),
      )}
      <line
        x1={152}
        y1={9}
        x2={152}
        y2={84}
        stroke="var(--learn-chart-axis)"
        strokeWidth={1}
      />
    </Frame>
  );
}

function LeakCover() {
  const bars = [
    { w: 118, leak: true },
    { w: 46, leak: true },
    { w: 74, leak: true },
    { w: 0, leak: false },
  ];
  return (
    <Frame>
      <line
        x1={30}
        y1={8}
        x2={30}
        y2={82}
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={30}
            y={14 + i * 18}
            width={b.w}
            height={11}
            rx={1.5}
            fill={b.leak ? "var(--learn-chart-error)" : "var(--learn-series-1)"}
            opacity={b.leak ? 0.8 : 1}
          />
          {!b.leak && <circle cx={30} cy={19 + i * 18} r={4} fill="var(--learn-series-1)" />}
        </g>
      ))}
    </Frame>
  );
}

function ImbalanceCover() {
  return (
    <Frame>
      {dots(150, (i) => ({ x: 8 + ((i * 17) % 148), y: 8 + ((i * 29) % 76) })).map((p, i) =>
        i % 37 === 0 ? (
          <circle key={i} cx={p.x} cy={p.y} r={2.8} fill="var(--learn-outcome-tp)" />
        ) : (
          <circle key={i} cx={p.x} cy={p.y} r={1.4} fill="var(--learn-chart-muted-mark)" opacity={0.5} />
        ),
      )}
      <line
        x1={44}
        y1={4}
        x2={44}
        y2={86}
        stroke="var(--learn-ink)"
        strokeWidth={2}
        strokeDasharray="5 4"
      />
    </Frame>
  );
}

function BaselineCover() {
  const bars = [
    { w: 34, beaten: false, baseline: true },
    { w: 20, beaten: false, baseline: true },
    { w: 118, beaten: false, baseline: true },
    { w: 82, beaten: true, baseline: false },
    { w: 74, beaten: true, baseline: false },
  ];
  return (
    <Frame>
      <line
        x1={24 + 118}
        y1={4}
        x2={24 + 118}
        y2={86}
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={12}
          y={10 + i * 16}
          width={b.w}
          height={11}
          rx={1.5}
          fill={
            b.beaten
              ? "var(--learn-chart-error)"
              : b.baseline
                ? "var(--learn-series-3)"
                : "var(--learn-series-1)"
          }
          opacity={b.beaten ? 0.78 : 1}
        />
      ))}
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-ml": RulesCover,
  "features-and-labels": FeaturesCover,
  "how-models-learn": SlopeCover,
  "classification-vs-regression": BucketsCover,
  "train-test-split": SplitCover,
  overfitting: OverfitCover,
  "precision-recall": ThresholdCover,
  "k-nearest-neighbours": NeighboursCover,
  "decision-trees": TreeCover,
  "random-forests": ForestCover,
  "cross-validation": FoldsCover,
  "data-leakage": LeakCover,
  "class-imbalance": ImbalanceCover,
  baselines: BaselineCover,
};

export function MlLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? SlopeCover;
  return <Cover />;
}
