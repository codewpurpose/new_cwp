/**
 * Card art for the HTML and CSS track.
 *
 * Each cover is a miniature of that lesson's own idea, drawn from the design
 * tokens rather than shipped as an image. That keeps the track free of binary
 * assets, scales cleanly at any size, and means the card actually previews what
 * the reader is about to open.
 */

interface CoverProps {
  slug: string;
}

const W = 160;
const H = 90;
const INK = "var(--learn-ink)";
const MUTED = "var(--learn-ink-subtle)";
const ACCENT = "var(--learn-accent)";
const HIGHLIGHT = "var(--learn-chart-highlight)";
const DANGER = "var(--learn-outcome-fn)";
const INDIGO = "var(--learn-series-3)";
const OCHRE = "var(--learn-series-4)";

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

/** A browser chrome outline, reused by several covers. */
function Window({ x = 24, y = 18, w = 112, h = 54, children }: {
  x?: number; y?: number; w?: number; h?: number; children?: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.3} />
      <path d={`M${x} ${y + 10} H${x + w}`} stroke={MUTED} strokeWidth={1} />
      <circle cx={x + 7} cy={y + 5} r={1.8} fill={MUTED} />
      <circle cx={x + 13} cy={y + 5} r={1.8} fill={MUTED} />
      <circle cx={x + 19} cy={y + 5} r={1.8} fill={HIGHLIGHT} />
      {children}
    </g>
  );
}

function RequestCover() {
  return (
    <Frame>
      <rect x={18} y={38} width={30} height={20} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M52 44 h22" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M69 40 l6 4 l-6 4" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 54 h-22" stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 3" />
      <path d="M57 50 l-6 4 l6 4" fill="none" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={78} y={30} width={30} height={36} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M84 38 h18M84 46 h12M84 54 h18" stroke={INK} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M112 48 h12" stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 3" />
      <circle cx={132} cy={48} r={9} fill="none" stroke={ACCENT} strokeWidth={1.8} />
      <path d="M126 48 h12M132 42 v12" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function LayersCover() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${44 + i * 6} ${28 + i * 15} l36 -12 l36 12 l-36 12 Z`}
          fill={[HIGHLIGHT, "var(--learn-surface-quiet)", "var(--learn-surface)"][i]}
          stroke={INK}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      ))}
      <text x={28} y={33} fontSize={8} fontFamily="var(--learn-font-mono)" fill={MUTED}>JS</text>
      <text x={22} y={48} fontSize={8} fontFamily="var(--learn-font-mono)" fill={MUTED}>CSS</text>
      <text x={14} y={63} fontSize={8} fontFamily="var(--learn-font-mono)" fill={ACCENT}>HTML</text>
    </Frame>
  );
}

function FirstPageCover() {
  return (
    <Frame>
      <rect x={30} y={20} width={44} height={52} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.3} />
      <path d="M62 20 v10 h12" fill="none" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M37 40 h28M37 48 h20M37 56 h26" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
      <text x={37} y={33} fontSize={7} fontFamily="var(--learn-font-mono)" fill={ACCENT}>.html</text>
      <path d="M80 46 h12" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M87 42 l5 4 l-5 4" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <Window x={98} y={26} w={44} h={40}>
        <path d="M104 46 h20M104 54 h14" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
        <path d="M104 40 h26" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      </Window>
    </Frame>
  );
}

function TagCover() {
  return (
    <Frame>
      <rect x={22} y={30} width={116} height={30} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <text x={30} y={50} fontSize={13} fontFamily="var(--learn-font-mono)" fill="var(--learn-code-accent)">
        &lt;a
      </text>
      <text x={48} y={50} fontSize={13} fontFamily="var(--learn-font-mono)" fill="var(--learn-code-warn)">
        href
      </text>
      <text x={76} y={50} fontSize={13} fontFamily="var(--learn-font-mono)" fill="var(--learn-code-ok)">
        =&quot;/&quot;
      </text>
      <text x={104} y={50} fontSize={13} fontFamily="var(--learn-font-mono)" fill="var(--learn-code-accent)">
        &gt;
      </text>
      <path d="M34 64 v6M56 64 v6M84 64 v6" stroke={MUTED} strokeWidth={1} />
      <circle cx={34} cy={72} r={2} fill={ACCENT} />
      <circle cx={56} cy={72} r={2} fill={OCHRE} />
      <circle cx={84} cy={72} r={2} fill={ACCENT} />
    </Frame>
  );
}

function TreeCover() {
  return (
    <Frame>
      <circle cx={34} cy={45} r={6} fill={ACCENT} />
      <path d="M40 45 h14M54 45 V26 h12M54 45 V64 h12" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={72} cy={26} r={5.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <circle cx={72} cy={64} r={5.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <path d="M78 64 h12M90 64 V52 h10M90 64 V76 h10" fill="none" stroke={MUTED} strokeWidth={1.2} />
      <circle cx={106} cy={52} r={4.5} fill="var(--learn-surface)" stroke={INDIGO} strokeWidth={1.4} />
      <circle cx={106} cy={76} r={4.5} fill="var(--learn-surface)" stroke={INDIGO} strokeWidth={1.4} />
      <path d="M78 26 h12" stroke={MUTED} strokeWidth={1.2} />
      <circle cx={96} cy={26} r={4.5} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.2} />
    </Frame>
  );
}

function HeadingsCover() {
  return (
    <Frame>
      <path d="M26 26 h52" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M34 42 h40" stroke={INK} strokeWidth={3.4} strokeLinecap="round" />
      <path d="M42 55 h30" stroke={MUTED} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M50 66 h22" stroke={MUTED} strokeWidth={1.7} strokeLinecap="round" />
      <text x={96} y={30} fontSize={11} fontFamily="var(--learn-font-mono)" fill={ACCENT}>h1</text>
      <text x={96} y={46} fontSize={10} fontFamily="var(--learn-font-mono)" fill={MUTED}>h2</text>
      <text x={96} y={59} fontSize={9} fontFamily="var(--learn-font-mono)" fill={MUTED}>h3</text>
      <text x={96} y={70} fontSize={8} fontFamily="var(--learn-font-mono)" fill={MUTED}>h4</text>
    </Frame>
  );
}

function LinkCover() {
  return (
    <Frame>
      <path
        d="M56 45 a11 11 0 0 1 11 -11 h8 a11 11 0 0 1 0 22 h-8"
        fill="none"
        stroke={ACCENT}
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path
        d="M104 45 a11 11 0 0 0 -11 -11 h-8 a11 11 0 0 0 0 22 h8"
        fill="none"
        stroke={ACCENT}
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path d="M70 45 h20" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <rect x={22} y={56} width={26} height={20} rx={2.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M25 71 l6 -6 l5 5 l4 -4 l5 5" fill="none" stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
      <circle cx={30} cy={62} r={2} fill={INK} />
      <rect x={112} y={56} width={26} height={20} rx={2.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M115 71 l6 -6 l5 5 l4 -4 l5 5" fill="none" stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
    </Frame>
  );
}

function ListCover() {
  return (
    <Frame>
      {[26, 38, 50, 62].map((y) => (
        <g key={y}>
          <circle cx={32} cy={y} r={2.6} fill={ACCENT} />
          <path d={`M40 ${y} h30`} stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
        </g>
      ))}
      <rect x={84} y={20} width={54} height={48} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <rect x={84} y={20} width={54} height={12} rx={3} fill={HIGHLIGHT} />
      <path d="M84 44 H138M84 56 H138M102 32 V68M120 32 V68" stroke={MUTED} strokeWidth={1} />
    </Frame>
  );
}

function FormCover() {
  return (
    <Frame>
      <path d="M28 24 h22" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
      <rect x={28} y={29} width={80} height={12} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M28 50 h30" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
      <rect x={28} y={55} width={80} height={12} rx={3} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.6} />
      <rect x={32} y={59} width={1.6} height={5} fill={INK} />
      <rect x={114} y={38} width={26} height={16} rx={8} fill={ACCENT} stroke={INK} strokeWidth={1.2} />
      <path d="M121 46 h9M127 43 l4 3 l-4 3" fill="none" stroke="var(--learn-surface)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function SemanticCover() {
  return (
    <Frame>
      <rect x={26} y={20} width={108} height={12} rx={2.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <text x={30} y={29} fontSize={7} fontFamily="var(--learn-font-mono)" fill={INK}>header</text>
      <rect x={26} y={36} width={30} height={34} rx={2.5} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.1} />
      <text x={29} y={45} fontSize={6.5} fontFamily="var(--learn-font-mono)" fill={MUTED}>aside</text>
      <rect x={60} y={36} width={74} height={22} rx={2.5} fill="var(--learn-surface-quiet)" stroke={ACCENT} strokeWidth={1.4} />
      <text x={64} y={45} fontSize={7} fontFamily="var(--learn-font-mono)" fill={ACCENT}>main</text>
      <rect x={60} y={62} width={74} height={8} rx={2} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.1} />
      <text x={64} y={68} fontSize={6} fontFamily="var(--learn-font-mono)" fill={MUTED}>footer</text>
    </Frame>
  );
}

function AttachCover() {
  return (
    <Frame>
      <rect x={20} y={26} width={46} height={40} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <text x={26} y={38} fontSize={7} fontFamily="var(--learn-font-mono)" fill={MUTED}>index.html</text>
      <path d="M26 48 h32M26 56 h24" stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M70 46 h18" stroke={ACCENT} strokeWidth={1.6} strokeDasharray="4 3" />
      <path d="M83 42 l5 4 l-5 4" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={92} y={26} width={46} height={40} rx={3} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <text x={98} y={38} fontSize={7} fontFamily="var(--learn-font-mono)" fill="var(--learn-code-dim)">styles.css</text>
      <path d="M98 48 h20" stroke="var(--learn-code-accent)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M102 56 h26" stroke="var(--learn-code-ok)" strokeWidth={1.4} strokeLinecap="round" />
    </Frame>
  );
}

function SelectorCover() {
  return (
    <Frame>
      {[
        [30, 26], [58, 26], [86, 26],
        [30, 46], [58, 46], [86, 46],
      ].map(([x, y], i) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={22}
          height={16}
          rx={3}
          fill={i === 1 || i === 4 ? HIGHLIGHT : "var(--learn-surface)"}
          stroke={i === 1 || i === 4 ? ACCENT : MUTED}
          strokeWidth={i === 1 || i === 4 ? 1.8 : 1.1}
        />
      ))}
      <text x={30} y={76} fontSize={11} fontFamily="var(--learn-font-mono)" fill={ACCENT}>
        .card
      </text>
      <circle cx={122} cy={40} r={14} fill="none" stroke={INK} strokeWidth={2} />
      <path d="M132 50 L142 60" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
    </Frame>
  );
}

function CascadeCover() {
  return (
    <Frame>
      <rect x={24} y={22} width={54} height={16} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.1} />
      <text x={30} y={33} fontSize={8} fontFamily="var(--learn-font-mono)" fill={MUTED}>0-1-0</text>
      <path d="M28 30 h46" stroke={DANGER} strokeWidth={1.4} />
      <rect x={24} y={46} width={54} height={16} rx={3} fill={HIGHLIGHT} stroke={ACCENT} strokeWidth={1.6} />
      <text x={30} y={57} fontSize={8} fontFamily="var(--learn-font-mono)" fill={INK}>1-0-0</text>
      <path d="M86 44 h14" stroke={MUTED} strokeWidth={1.2} />
      <path d="M104 30 V58" stroke={INK} strokeWidth={1.4} />
      <path d="M104 58 l-4 -5M104 58 l4 -5" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <rect x={112} y={36} width={26} height={18} rx={3} fill={ACCENT} stroke={INK} strokeWidth={1.2} />
      <path d="M118 45 l4 4 l8 -9" fill="none" stroke="var(--learn-surface)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function BoxCover() {
  return (
    <Frame>
      <rect x={26} y={16} width={108} height={58} rx={3} fill="none" stroke={OCHRE} strokeWidth={1.3} strokeDasharray="4 3" />
      <rect x={38} y={25} width={84} height={40} rx={2} fill="var(--learn-info-bg)" stroke={INDIGO} strokeWidth={1.6} />
      <rect x={50} y={33} width={60} height={24} rx={2} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <text x={80} y={48} textAnchor="middle" fontSize={8} fontFamily="var(--learn-font-mono)" fill={INK}>
        content
      </text>
      <path d="M26 80 H134" stroke={MUTED} strokeWidth={1} />
      <path d="M26 77 v6M134 77 v6" stroke={MUTED} strokeWidth={1} />
      <text x={80} y={88} textAnchor="middle" fontSize={7} fontFamily="var(--learn-font-mono)" fill={MUTED}>
        348px
      </text>
    </Frame>
  );
}

function TypeCover() {
  return (
    <Frame>
      <text x={26} y={58} fontSize={44} fontFamily="var(--learn-font-serif)" fill={INK}>
        Aa
      </text>
      <path d="M86 30 h48M86 40 h48M86 50 h48M86 60 h32" stroke={MUTED} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M80 26 v40" stroke={ACCENT} strokeWidth={1.2} strokeDasharray="3 3" />
      <path d="M140 26 v40" stroke={ACCENT} strokeWidth={1.2} strokeDasharray="3 3" />
      <path d="M80 70 h60" stroke={ACCENT} strokeWidth={1.2} />
      <path d="M80 67 v6M140 67 v6" stroke={ACCENT} strokeWidth={1.2} />
    </Frame>
  );
}

function FlowCover() {
  return (
    <Frame>
      <rect x={24} y={20} width={64} height={12} rx={2} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <rect x={24} y={36} width={64} height={12} rx={2} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <rect x={24} y={52} width={64} height={12} rx={2} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <path d="M96 26 h40" stroke={MUTED} strokeWidth={1.2} />
      {[100, 116, 132].map((x) => (
        <rect key={x} x={x} y={36} width={12} height={10} rx={2} fill="var(--learn-surface)" stroke={INDIGO} strokeWidth={1.2} />
      ))}
      <path d="M96 58 h40" stroke={MUTED} strokeWidth={1.2} />
    </Frame>
  );
}

function FlexCover() {
  return (
    <Frame>
      <rect x={22} y={26} width={116} height={38} rx={4} fill="none" stroke={ACCENT} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={32} y={36} width={22} height={18} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={68} y={32} width={22} height={26} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={104} y={36} width={22} height={18} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M22 74 h116" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M132 70 l6 4 l-6 4" fill="none" stroke={ACCENT} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <text x={26} y={82} fontSize={7} fontFamily="var(--learn-font-mono)" fill={ACCENT}>main axis</text>
    </Frame>
  );
}

function GridCover() {
  return (
    <Frame>
      <rect x={24} y={18} width={70} height={20} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={100} y={18} width={36} height={20} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.1} />
      <rect x={24} y={44} width={36} height={28} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.1} />
      <rect x={66} y={44} width={70} height={28} rx={3} fill="var(--learn-surface-quiet)" stroke={ACCENT} strokeWidth={1.6} />
      <path d="M62 14 V78M96 14 V42" stroke={ACCENT} strokeWidth={0.9} strokeDasharray="3 3" />
      <path d="M20 41 H140" stroke={ACCENT} strokeWidth={0.9} strokeDasharray="3 3" />
    </Frame>
  );
}

function ResponsiveCover() {
  return (
    <Frame>
      <rect x={20} y={22} width={56} height={46} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.3} />
      <path d="M20 30 H76" stroke={MUTED} strokeWidth={1} />
      <rect x={25} y={35} width={20} height={12} rx={2} fill={HIGHLIGHT} />
      <rect x={49} y={35} width={22} height={12} rx={2} fill={HIGHLIGHT} />
      <rect x={25} y={51} width={20} height={12} rx={2} fill={HIGHLIGHT} />
      <rect x={49} y={51} width={22} height={12} rx={2} fill={HIGHLIGHT} />
      <rect x={100} y={18} width={30} height={54} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.3} />
      <path d="M100 26 H130" stroke={MUTED} strokeWidth={1} />
      <rect x={105} y={31} width={20} height={10} rx={2} fill={HIGHLIGHT} />
      <rect x={105} y={45} width={20} height={10} rx={2} fill={HIGHLIGHT} />
      <rect x={105} y={59} width={20} height={8} rx={2} fill={HIGHLIGHT} />
      <path d="M82 45 h12" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M89 41 l5 4 l-5 4" fill="none" stroke={ACCENT} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function MarkupCover() {
  return (
    <Frame>
      <rect x={24} y={18} width={112} height={54} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M32 28 h34" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M32 38 h84M32 46 h70M32 54 h84M32 62 h52" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
      <text x={122} y={31} fontSize={9} fontFamily="var(--learn-font-mono)" fill={MUTED}>
        &lt;/&gt;
      </text>
    </Frame>
  );
}

function StyledCover() {
  return (
    <Frame>
      <Window x={22} y={16} w={116} h={58}>
        <path d="M30 36 h34" stroke={ACCENT} strokeWidth={3.4} strokeLinecap="round" />
        <path d="M30 44 h58" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
        <rect x={30} y={52} width={30} height={16} rx={3} fill={HIGHLIGHT} stroke={MUTED} strokeWidth={1} />
        <rect x={66} y={52} width={30} height={16} rx={3} fill={HIGHLIGHT} stroke={MUTED} strokeWidth={1} />
        <rect x={102} y={52} width={30} height={16} rx={3} fill={HIGHLIGHT} stroke={MUTED} strokeWidth={1} />
        <rect x={104} y={30} width={28} height={12} rx={6} fill={ACCENT} />
      </Window>
    </Frame>
  );
}

function AccessCover() {
  return (
    <Frame>
      <circle cx={54} cy={45} r={24} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.6} />
      <path d="M42 45 h24" stroke={INK} strokeWidth={1.2} />
      <path d="M30 45 A 24 24 0 0 1 78 45" fill={INK} opacity={0.12} />
      <circle cx={54} cy={33} r={4.5} fill={ACCENT} />
      <path d="M54 39 v13M45 44 h18M54 52 l-6 12M54 52 l6 12" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" />
      <rect x={92} y={30} width={46} height={14} rx={3} fill="#ffffff" stroke={INK} strokeWidth={1.1} />
      <path d="M97 37 h30" stroke="#111111" strokeWidth={2} strokeLinecap="round" />
      <rect x={92} y={50} width={46} height={14} rx={3} fill="#ffffff" stroke={INK} strokeWidth={1.1} />
      <path d="M97 57 h30" stroke="#c9c9c9" strokeWidth={2} strokeLinecap="round" />
      <path d="M132 50 l6 14" stroke={DANGER} strokeWidth={1.8} strokeLinecap="round" />
    </Frame>
  );
}

function DevtoolsCover() {
  return (
    <Frame>
      <rect x={20} y={18} width={62} height={54} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M27 32 h30" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={27} y={40} width={48} height={26} rx={2} fill={HIGHLIGHT} stroke={ACCENT} strokeWidth={1.4} />
      <rect x={88} y={18} width={52} height={54} rx={3} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <path d="M94 28 h34" stroke="var(--learn-code-accent)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M98 36 h30" stroke="var(--learn-code-ok)" strokeWidth={1.4} strokeLinecap="round" />
      <g>
        <path d="M98 45 h26" stroke="var(--learn-code-dim)" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M96 45 h30" stroke="var(--learn-code-err)" strokeWidth={1} />
      </g>
      <path d="M98 54 h22M94 63 h20" stroke="var(--learn-code-dim)" strokeWidth={1.4} strokeLinecap="round" />
    </Frame>
  );
}

function PublishCover() {
  return (
    <Frame>
      <circle cx={62} cy={48} r={22} fill="none" stroke={MUTED} strokeWidth={1.3} />
      <path d="M40 48 h44M62 26 a30 30 0 0 1 0 44 a30 30 0 0 1 0 -44" fill="none" stroke={MUTED} strokeWidth={1.1} />
      <path d="M96 48 h20" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M110 43 l6 5 l-6 5" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={22} y={30} width={20} height={16} rx={2.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M62 38 V18" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M55 25 l7 -7 l7 7" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={120} y={38} width={20} height={20} rx={4} fill={ACCENT} stroke={INK} strokeWidth={1.2} />
      <path d="M125 48 l4 4 l7 -8" fill="none" stroke="var(--learn-surface)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-a-website": RequestCover,
  "how-a-browser-builds-a-page": LayersCover,
  "your-first-page": FirstPageCover,
  "elements-and-tags": TagCover,
  "document-structure": TreeCover,
  "text-and-headings": HeadingsCover,
  "links-and-images": LinkCover,
  "lists-and-tables": ListCover,
  "forms-and-inputs": FormCover,
  "semantic-html": SemanticCover,
  "how-css-attaches": AttachCover,
  selectors: SelectorCover,
  "the-cascade-and-specificity": CascadeCover,
  "the-box-model": BoxCover,
  "colour-and-typography": TypeCover,
  "display-and-flow": FlowCover,
  flexbox: FlexCover,
  grid: GridCover,
  "responsive-design": ResponsiveCover,
  "marking-up-the-page": MarkupCover,
  "styling-the-page": StyledCover,
  "accessibility-basics": AccessCover,
  devtools: DevtoolsCover,
  "publishing-your-site": PublishCover,
};

export function HtmlCssLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? RequestCover;
  return <Cover />;
}
