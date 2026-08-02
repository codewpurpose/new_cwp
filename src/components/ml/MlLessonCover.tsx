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

function ClusterCover() {
  /* Three blobs and their centres. Shape carries the group as well as hue, so
     the split survives deuteranopia at 160px wide. */
  const blobs = [
    { cx: 40, cy: 30, fill: "var(--learn-series-1)", square: false },
    { cx: 112, cy: 34, fill: "var(--learn-series-3)", square: true },
    { cx: 72, cy: 68, fill: "var(--learn-series-5)", square: false },
  ];
  return (
    <Frame>
      {blobs.map((blob, b) =>
        dots(9, (i) => ({
          x: blob.cx + (((i * 37) % 23) - 11),
          y: blob.cy + (((i * 29) % 19) - 9),
        })).map((p, i) =>
          blob.square ? (
            <rect key={`${b}-${i}`} x={p.x - 2} y={p.y - 2} width={4} height={4} fill={blob.fill} />
          ) : (
            <circle key={`${b}-${i}`} cx={p.x} cy={p.y} r={2.2} fill={blob.fill} />
          ),
        ),
      )}
      {blobs.map((blob, i) => (
        <g key={`c${i}`} stroke="var(--learn-chart-model)" strokeWidth={1.8}>
          <line x1={blob.cx - 5} y1={blob.cy} x2={blob.cx + 5} y2={blob.cy} />
          <line x1={blob.cx} y1={blob.cy - 5} x2={blob.cx} y2={blob.cy + 5} />
        </g>
      ))}
    </Frame>
  );
}

function ProjectionCover() {
  /* A correlated cloud, the component it is flattened onto, and the shadows. */
  const cloud = dots(16, (i) => ({
    x: 22 + i * 7.4 + ((i * 23) % 13) - 6,
    y: 68 - i * 3.1 - ((i * 31) % 15) + 7,
  }));
  const project = (p: { x: number; y: number }) => {
    const t = ((p.x - 18) * 0.93 + (74 - p.y) * 0.37) / 1;
    return { x: 18 + t * 0.93, y: 74 - t * 0.37 };
  };
  return (
    <Frame>
      <line x1={18} y1={74} x2={146} y2={23} stroke="var(--learn-chart-model)" strokeWidth={2} />
      {cloud.map((p, i) => {
        const s = project(p);
        return (
          <line
            key={`d${i}`}
            x1={p.x}
            y1={p.y}
            x2={s.x}
            y2={s.y}
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={0.8}
          />
        );
      })}
      {cloud.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.3} fill="var(--learn-series-3)" />
      ))}
      {cloud.map((p, i) => {
        const s = project(p);
        return <circle key={`s${i}`} cx={s.x} cy={s.y} r={1.7} fill="var(--learn-series-2)" />;
      })}
    </Frame>
  );
}

function OutlierCover() {
  const normal = dots(30, (i) => ({ x: 74 + (((i * 37) % 41) - 20), y: 46 + (((i * 53) % 35) - 17) }));
  const odd = [
    { x: 22, y: 20 },
    { x: 134, y: 26 },
    { x: 26, y: 74 },
    { x: 140, y: 66 },
  ];
  return (
    <Frame>
      <ellipse
        cx={74}
        cy={46}
        rx={34}
        ry={28}
        fill="var(--learn-chart-highlight)"
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.4}
        strokeDasharray="5 4"
      />
      {normal.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill="var(--learn-chart-muted-mark)" />
      ))}
      {odd.map((p, i) => (
        <g key={`o${i}`}>
          <rect x={p.x - 3} y={p.y - 3} width={6} height={6} fill="var(--learn-series-2)" />
          <circle
            cx={p.x}
            cy={p.y}
            r={6.5}
            fill="none"
            stroke="var(--learn-series-2)"
            strokeWidth={1.2}
          />
        </g>
      ))}
    </Frame>
  );
}

function ScaleCover() {
  /* Left: raw units, one axis dwarfing the other. Right: the same cloud once
     both columns are on one scale. */
  const raw = dots(14, (i) => ({ x: 12 + ((i * 29) % 56), y: 44 + (((i * 17) % 9) - 4) }));
  const scaled = dots(14, (i) => ({ x: 92 + ((i * 29) % 44), y: 28 + ((i * 43) % 40) }));
  return (
    <Frame>
      <line x1={80} y1={8} x2={80} y2={82} stroke="var(--learn-chart-grid)" strokeWidth={1} />
      {raw.map((p, i) => (
        <circle key={`r${i}`} cx={p.x} cy={p.y} r={2.2} fill="var(--learn-chart-muted-mark)" />
      ))}
      {scaled.map((p, i) =>
        i % 2 === 0 ? (
          <circle key={`s${i}`} cx={p.x} cy={p.y} r={2.2} fill="var(--learn-series-1)" />
        ) : (
          <rect key={`s${i}`} x={p.x - 2} y={p.y - 2} width={4} height={4} fill="var(--learn-series-3)" />
        ),
      )}
      <path
        d="M62 62 L74 62 L70 58 M74 62 L70 66"
        fill="none"
        stroke="var(--learn-chart-model)"
        strokeWidth={1.6}
      />
    </Frame>
  );
}

function DescentCover() {
  /* A parabola and the chain of steps walking down it. */
  const curve = (x: number) => 22 + ((x - 80) * (x - 80)) / 88;
  const steps = [16, 30, 46, 58, 66, 72, 76, 78];
  return (
    <Frame>
      <path
        d={`M10 ${curve(10).toFixed(1)} Q80 ${(curve(80) - 58).toFixed(1)} 150 ${curve(150).toFixed(1)}`}
        fill="none"
        stroke="var(--learn-chart-model)"
        strokeWidth={2}
      />
      {steps.map((x, i) => (
        <g key={i}>
          {i > 0 && (
            <line
              x1={steps[i - 1]}
              y1={curve(steps[i - 1])}
              x2={x}
              y2={curve(x)}
              stroke="var(--learn-series-2)"
              strokeWidth={1.2}
            />
          )}
          <circle cx={x} cy={curve(x)} r={2.6} fill="var(--learn-series-2)" />
        </g>
      ))}
      <circle cx={80} cy={curve(80)} r={3.4} fill="none" stroke="var(--learn-series-1)" strokeWidth={1.6} />
    </Frame>
  );
}

function PenaltyCover() {
  /* Coefficient paths collapsing toward zero as the penalty rises. */
  const paths = [
    { start: 14, dashed: false, colour: "var(--learn-series-1)" },
    { start: 26, dashed: true, colour: "var(--learn-series-3)" },
    { start: 34, dashed: false, colour: "var(--learn-series-5)" },
    { start: 58, dashed: true, colour: "var(--learn-series-2)" },
  ];
  const zero = 70;
  return (
    <Frame>
      <line x1={10} y1={zero} x2={150} y2={zero} stroke="var(--learn-chart-grid-strong)" strokeWidth={1} />
      {paths.map((p, i) => (
        <path
          key={i}
          d={`M12 ${p.start} C 60 ${p.start + 4}, 96 ${zero - 4}, 148 ${zero}`}
          fill="none"
          stroke={p.colour}
          strokeWidth={1.8}
          strokeDasharray={p.dashed ? "5 3" : undefined}
        />
      ))}
    </Frame>
  );
}

function NetworkCover() {
  const inputs = [30, 60];
  const hidden = [22, 45, 68];
  return (
    <Frame>
      <path
        d="M104 12 C 118 34, 92 56, 108 80"
        fill="none"
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.6}
        strokeDasharray="5 4"
      />
      {inputs.map((iy, i) =>
        hidden.map((hy, h) => (
          <line
            key={`${i}-${h}`}
            x1={24}
            y1={iy}
            x2={62}
            y2={hy}
            stroke="var(--learn-chart-grid-strong)"
            strokeWidth={0.9}
          />
        )),
      )}
      {hidden.map((hy, h) => (
        <line
          key={`o${h}`}
          x1={62}
          y1={hy}
          x2={96}
          y2={45}
          stroke="var(--learn-chart-grid-strong)"
          strokeWidth={0.9}
        />
      ))}
      {inputs.map((iy, i) => (
        <circle key={`i${i}`} cx={24} cy={iy} r={4} fill="var(--learn-series-3)" />
      ))}
      {hidden.map((hy, h) => (
        <circle key={`h${h}`} cx={62} cy={hy} r={4} fill="var(--learn-series-1)" />
      ))}
      <circle cx={96} cy={45} r={4.4} fill="var(--learn-chart-model)" />
    </Frame>
  );
}

function DriftCover() {
  /* Accuracy decaying, a cliff where the world changed, then a retrain. */
  return (
    <Frame>
      <path
        d="M10 24 L46 28 L62 30 L62 56 L92 60 L118 64"
        fill="none"
        stroke="var(--learn-chart-model)"
        strokeWidth={2}
      />
      <path
        d="M118 64 L124 32 L150 34"
        fill="none"
        stroke="var(--learn-series-1)"
        strokeWidth={2}
      />
      <path
        d="M10 74 L48 72 L62 62 L94 50 L118 44 L150 46"
        fill="none"
        stroke="var(--learn-series-2)"
        strokeWidth={1.6}
        strokeDasharray="5 3"
      />
      <line
        x1={62}
        y1={8}
        x2={62}
        y2={84}
        stroke="var(--learn-chart-truth)"
        strokeWidth={1.2}
        strokeDasharray="3 3"
      />
      <line
        x1={118}
        y1={8}
        x2={118}
        y2={84}
        stroke="var(--learn-chart-axis)"
        strokeWidth={1.2}
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
  "k-nearest-neighbours": NeighboursCover,
  "decision-trees": TreeCover,
  "random-forests": ForestCover,
  "cross-validation": FoldsCover,
  "data-leakage": LeakCover,
  "class-imbalance": ImbalanceCover,
  baselines: BaselineCover,
  clustering: ClusterCover,
  "dimensionality-reduction": ProjectionCover,
  "anomaly-detection": OutlierCover,
  "feature-scaling": ScaleCover,
  "gradient-descent": DescentCover,
  regularisation: PenaltyCover,
  "neural-networks": NetworkCover,
  "from-notebook-to-production": DriftCover,
};

export function MlLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? SlopeCover;
  return <Cover />;
}
