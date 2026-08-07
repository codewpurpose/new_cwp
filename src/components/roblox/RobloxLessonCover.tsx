/**
 * Card art for the Roblox Studio track.
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

function StudioCover() {
  return (
    <Frame>
      <rect x={22} y={18} width={116} height={54} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <rect x={22} y={18} width={116} height={10} rx={4} fill={HIGHLIGHT} />
      <path d="M96 28 V72" stroke={MUTED} strokeWidth={1} />
      <path d="M22 56 H96" stroke={MUTED} strokeWidth={1} />
      <path d="M30 38 h20M30 44 h28M30 50 h16" stroke={ACCENT} strokeWidth={1.4} strokeLinecap="round" />
    </Frame>
  );
}

function DataModelCover() {
  return (
    <Frame>
      <circle cx={38} cy={45} r={7} fill={ACCENT} />
      <path d="M45 45 h16M61 45 V26 h14M61 45 V64 h14" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <rect x={76} y={19} width={16} height={14} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={76} y={57} width={16} height={14} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M92 26 h12" stroke={MUTED} strokeWidth={1.3} />
      <rect x={104} y={19} width={16} height={14} rx={3} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function PartsCover() {
  return (
    <Frame>
      <path d="M52 30 L80 20 L108 30 L108 58 L80 68 L52 58 Z" fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M52 30 L80 40 L108 30M80 40 V68" fill="none" stroke={INK} strokeWidth={1.2} />
      <rect x={22} y={36} width={9} height={9} rx={2} fill={ACCENT} />
      <rect x={22} y={50} width={9} height={9} rx={2} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.2} />
    </Frame>
  );
}

function FirstScriptCover() {
  return (
    <Frame>
      <rect x={24} y={26} width={40} height={38} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <path d="M31 36 h20M31 43 h14M31 50 h22" stroke="var(--learn-code-ok)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M66 38 h26" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M86 34 l6 4 l-6 4" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 56 h26" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M100 50 l12 12M112 50 l-12 12" stroke={DANGER} strokeWidth={1.8} strokeLinecap="round" />
      <rect x={98} y={28} width={30} height={20} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

function VariablesCover() {
  return (
    <Frame>
      <rect x={26} y={32} width={44} height={26} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.3} />
      <text x={48} y={50} textAnchor="middle" fontSize={13} fontFamily="var(--learn-font-mono)" fill={INK}>0</text>
      <path d="M74 45 h16" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" />
      <rect x={94} y={32} width={40} height={26} rx={13} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.6} />
      <text x={114} y={50} textAnchor="middle" fontSize={11} fontFamily="var(--learn-font-mono)" fill={ACCENT}>true</text>
    </Frame>
  );
}

function InstancesCover() {
  return (
    <Frame>
      <circle cx={38} cy={30} r={6} fill={MUTED} />
      <path d="M44 30 h14M58 30 V52 h12" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <rect x={70} y={44} width={18} height={16} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <circle cx={106} cy={38} r={15} fill="none" stroke={ACCENT} strokeWidth={2.2} />
      <path d="M117 49 L128 60" stroke={ACCENT} strokeWidth={2.6} strokeLinecap="round" />
    </Frame>
  );
}

function ClientServerCover() {
  return (
    <Frame>
      <rect x={20} y={30} width={38} height={30} rx={4} fill={ACCENT} stroke={INK} strokeWidth={1.3} />
      <text x={39} y={49} textAnchor="middle" fontSize={9} fontWeight={700} fill="var(--learn-surface)">SRV</text>
      <path d="M62 40 h32" stroke={INK} strokeWidth={1.5} />
      <path d="M88 36 l6 4 l-6 4" fill="none" stroke={INK} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M94 52 h-32" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 3" />
      <path d="M68 48 l-6 4 l6 4" fill="none" stroke={MUTED} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={98} y={22} width={30} height={22} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <rect x={98} y={48} width={30} height={22} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
    </Frame>
  );
}

function EventsCover() {
  return (
    <Frame>
      <rect x={54} y={54} width={52} height={12} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.3} />
      <path d="M80 50 V22" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <path d="M62 44 L52 26M98 44 L108 26" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={80} cy={18} r={4} fill={ACCENT} />
      <circle cx={50} cy={22} r={3} fill={MUTED} />
      <circle cx={110} cy={22} r={3} fill={MUTED} />
    </Frame>
  );
}

function DebounceCover() {
  return (
    <Frame>
      <path d="M22 66 H138" stroke={MUTED} strokeWidth={1.2} />
      {[30, 38, 44, 52, 60, 66, 76, 84].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={66}
          x2={x}
          y2={i === 0 ? 24 : 50}
          stroke={i === 0 ? ACCENT : "var(--learn-chart-muted-mark)"}
          strokeWidth={i === 0 ? 2.6 : 1.4}
        />
      ))}
      <circle cx={30} cy={24} r={4} fill={ACCENT} />
      <path d="M100 34 h28M100 34 a14 14 0 0 1 0 28 h-0" fill="none" stroke={MUTED} strokeWidth={1.4} />
      <rect x={98} y={44} width={16} height={8} rx={2} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
    </Frame>
  );
}

function KillbrickCover() {
  return (
    <Frame>
      <rect x={26} y={40} width={16} height={22} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M46 51 H118" stroke={DANGER} strokeWidth={3} strokeLinecap="round" />
      <path d="M46 51 H118" stroke="var(--learn-danger-bg)" strokeWidth={1} strokeLinecap="round" />
      <circle cx={122} cy={51} r={10} fill="none" stroke={DANGER} strokeWidth={1.8} />
      <path d="M117 46 l10 10M127 46 l-10 10" stroke={DANGER} strokeWidth={1.8} strokeLinecap="round" />
    </Frame>
  );
}

function DisappearingCover() {
  return (
    <Frame>
      <rect x={22} y={48} width={34} height={11} rx={3} fill={ACCENT} stroke={INK} strokeWidth={1.2} />
      <rect x={62} y={48} width={34} height={11} rx={3} fill={ACCENT} fillOpacity={0.35} stroke={INK} strokeWidth={1.2} />
      <rect x={102} y={48} width={34} height={11} rx={3} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
      <circle cx={119} cy={30} r={7} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M119 40 v12" stroke={MUTED} strokeWidth={1.3} strokeDasharray="3 3" />
    </Frame>
  );
}

function OneWayCover() {
  return (
    <Frame>
      <rect x={34} y={44} width={92} height={10} rx={3} fill={ACCENT} stroke={INK} strokeWidth={1.3} />
      <path d="M58 74 V30" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M52 36 l6 -6 l6 6" fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 22 V40" stroke={DANGER} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="5 4" />
      <path d="M94 62 l16 16M110 62 l-16 16" stroke={DANGER} strokeWidth={2} strokeLinecap="round" />
    </Frame>
  );
}

function DebuggingCover() {
  return (
    <Frame>
      <rect x={24} y={20} width={112} height={50} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.3} />
      <path d="M32 32 h44" stroke="var(--learn-code-fg)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M32 42 h72" stroke="var(--learn-code-err)" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M32 52 h34" stroke="var(--learn-code-warn)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M32 61 h52" stroke="var(--learn-code-dim)" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={120} cy={42} r={5} fill="var(--learn-code-err)" />
    </Frame>
  );
}

function PublishingCover() {
  return (
    <Frame>
      <circle cx={80} cy={54} r={22} fill="none" stroke={MUTED} strokeWidth={1.3} />
      <path d="M58 54 h44M80 32 a30 30 0 0 1 0 44 a30 30 0 0 1 0 -44" fill="none" stroke={MUTED} strokeWidth={1.1} />
      <path d="M80 44 V16" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M72 24 l8 -8 l8 8" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={64} y={44} width={32} height={20} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-roblox-studio": StudioCover,
  "the-data-model": DataModelCover,
  "parts-and-properties": PartsCover,
  "your-first-script": FirstScriptCover,
  "variables-and-values": VariablesCover,
  "instances-and-properties": InstancesCover,
  "client-and-server": ClientServerCover,
  "events-and-connections": EventsCover,
  debounce: DebounceCover,
  "the-killbrick": KillbrickCover,
  "the-disappearing-platform": DisappearingCover,
  "the-one-way-platform": OneWayCover,
  "debugging-in-studio": DebuggingCover,
  "publishing-your-experience": PublishingCover,
};

export function RobloxLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? StudioCover;
  return <Cover />;
}
