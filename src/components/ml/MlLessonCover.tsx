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

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-ml": RulesCover,
  "features-and-labels": FeaturesCover,
  "how-models-learn": SlopeCover,
  "classification-vs-regression": BucketsCover,
  "train-test-split": SplitCover,
  overfitting: OverfitCover,
  "precision-recall": ThresholdCover,
};

export function MlLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? SlopeCover;
  return <Cover />;
}
