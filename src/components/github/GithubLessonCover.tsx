/**
 * Card art for the Git and GitHub track.
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

/** A row of commit dots joined left to right — the motif the track keeps reusing. */
function Chain({ y, xs, fill = ACCENT, r = 6 }: { y: number; xs: number[]; fill?: string; r?: number }) {
  return (
    <g>
      <path d={`M ${xs[0]} ${y} H ${xs[xs.length - 1]}`} stroke={MUTED} strokeWidth={1.3} />
      {xs.map((x) => (
        <circle key={x} cx={x} cy={y} r={r} fill={fill} stroke={INK} strokeWidth={1.1} />
      ))}
    </g>
  );
}

function WhyCover() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={24 + i * 8}
          y={22 + i * 10}
          width={64}
          height={16}
          rx={3}
          fill="var(--learn-surface)"
          stroke={MUTED}
          strokeWidth={1.1}
          strokeDasharray="4 3"
        />
      ))}
      <path d="M100 45 h14" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M109 40 l6 5 l-6 5" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <Chain y={45} xs={[124, 138]} />
    </Frame>
  );
}

function InstallCover() {
  return (
    <Frame>
      <rect x={26} y={22} width={108} height={46} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <path d="M34 34 h6 l4 4 l-4 4" fill="none" stroke="var(--learn-code-ok)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 38 h34" stroke="var(--learn-code-fg)" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M34 50 h22M60 50 h44" stroke="var(--learn-code-dim)" strokeWidth={1.4} strokeLinecap="round" />
      <rect x={34} y={57} width={7} height={5} fill="var(--learn-code-accent)" />
      <circle cx={122} cy={30} r={5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.1} />
      <path d="M119.5 30 h5M122 27.5 v5" stroke={INK} strokeWidth={1.2} strokeLinecap="round" />
    </Frame>
  );
}

function TreesCover() {
  return (
    <Frame>
      {[26, 63, 100].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={26}
          width={34}
          height={38}
          rx={4}
          fill={i === 2 ? HIGHLIGHT : "var(--learn-surface)"}
          stroke={INK}
          strokeWidth={1.2}
        />
      ))}
      <path d="M60 45 h3M97 45 h3" stroke={MUTED} strokeWidth={1.2} />
      <path d="M55 41 l5 4 l-5 4M92 41 l5 4 l-5 4" fill="none" stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={32} y={34} width={22} height={5} rx={2.5} fill={DANGER} />
      <rect x={69} y={34} width={22} height={5} rx={2.5} fill={INDIGO} />
      <rect x={106} y={34} width={22} height={5} rx={2.5} fill={ACCENT} />
    </Frame>
  );
}

function CommitCover() {
  return (
    <Frame>
      <rect x={26} y={20} width={108} height={50} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M34 32 h56" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M34 44 h88M34 52 h74M34 60 h52" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
      <circle cx={122} cy={32} r={5.5} fill={ACCENT} stroke={INK} strokeWidth={1.1} />
    </Frame>
  );
}

function HistoryCover() {
  return (
    <Frame>
      <Chain y={58} xs={[26, 48, 70, 92]} r={5.5} />
      <path d="M70 58 C 84 58, 88 40, 100 34" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={106} cy={32} r={5.5} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <circle cx={126} cy={32} r={5.5} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <path d="M112 32 h8" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={126} cy={58} r={12} fill="none" stroke={ACCENT} strokeWidth={2} />
      <path d="M135 67 L146 78" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
    </Frame>
  );
}

function UndoCover() {
  return (
    <Frame>
      <path
        d="M104 34 a24 24 0 1 0 8 22"
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path d="M104 22 v14 h-14" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Chain y={72} xs={[34, 56, 78]} r={4.5} fill={MUTED} />
      <circle cx={100} cy={72} r={4.5} fill="none" stroke={DANGER} strokeWidth={1.6} strokeDasharray="3 2" />
      <path d="M95 67 l10 10M105 67 l-10 10" stroke={DANGER} strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

function IgnoreCover() {
  return (
    <Frame>
      {[24, 38, 52, 66].map((y, i) => (
        <g key={y}>
          <rect x={30} y={y} width={62} height={9} rx={2} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1} />
          {(i === 1 || i === 3) && <path d={`M32 ${y + 4.5} h58`} stroke={DANGER} strokeWidth={1.4} />}
        </g>
      ))}
      <circle cx={118} cy={45} r={15} fill="none" stroke={DANGER} strokeWidth={2.2} />
      <path d="M107 34 L129 56" stroke={DANGER} strokeWidth={2.2} strokeLinecap="round" />
    </Frame>
  );
}

function BranchCover() {
  return (
    <Frame>
      <Chain y={60} xs={[26, 50, 74]} r={6} />
      <path d="M50 60 C 66 60, 70 34, 86 30" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={92} cy={29} r={6} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <circle cx={116} cy={29} r={6} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <path d="M98 29 h12" stroke={MUTED} strokeWidth={1.3} />
      <rect x={98} y={62} width={36} height={13} rx={6.5} fill="var(--learn-surface-inverse)" />
      <text x={116} y={71.5} textAnchor="middle" fontSize={8} fontFamily="var(--learn-font-mono)" fill="var(--learn-heading-on-inverse)">
        HEAD
      </text>
    </Frame>
  );
}

function MergeCover() {
  return (
    <Frame>
      <Chain y={60} xs={[24, 46, 68]} r={5.5} />
      <path d="M46 60 C 60 60, 62 32, 76 30" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={82} cy={30} r={5.5} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <circle cx={104} cy={30} r={5.5} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <path d="M88 30 h10" stroke={MUTED} strokeWidth={1.3} />
      <path d="M110 30 C 122 32, 122 58, 128 60" fill="none" stroke={MUTED} strokeWidth={1.3} />
      <path d="M74 60 h48" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={132} cy={60} r={8} fill="var(--learn-ink-strong)" stroke={INK} strokeWidth={2} />
    </Frame>
  );
}

function ConflictCover() {
  return (
    <Frame>
      <rect x={26} y={20} width={108} height={50} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <path d="M34 28 h40" stroke="var(--learn-code-warn)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M34 38 h56" stroke="var(--learn-code-ok)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M34 46 h88" stroke="var(--learn-code-accent)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M34 54 h48" stroke="var(--learn-code-err)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M34 62 h40" stroke="var(--learn-code-warn)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M112 56 l8 8 l12 -16" fill="none" stroke="var(--learn-code-ok)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function RebaseCover() {
  return (
    <Frame>
      <Chain y={62} xs={[24, 46, 68, 90, 112]} r={5.5} />
      <circle cx={68} cy={28} r={5.5} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="3 2" />
      <circle cx={90} cy={28} r={5.5} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="3 2" />
      <path d="M74 28 h10" stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
      <path d="M96 32 C 108 38, 100 50, 108 56" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeDasharray="4 3" />
      <path d="M104 51 l5 6 l-7 2" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function RemoteCover() {
  return (
    <Frame>
      <rect x={20} y={32} width={40} height={30} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <rect x={100} y={32} width={40} height={30} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M62 40 h34" stroke={ACCENT} strokeWidth={1.6} />
      <path d="M91 36 l6 4 l-6 4" fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 54 h-34" stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 3" />
      <path d="M69 50 l-6 4 l6 4" fill="none" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 42 h24M28 50 h16" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
      <path d="M108 42 h24M108 50 h16" stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
    </Frame>
  );
}

function AuthCover() {
  return (
    <Frame>
      <rect x={44} y={40} width={40} height={28} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <path d="M52 40 V32 a12 12 0 0 1 24 0 v8" fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={64} cy={52} r={3.4} fill={ACCENT} />
      <path d="M64 55 v6" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={104} cy={45} r={8} fill="none" stroke={ACCENT} strokeWidth={2} />
      <path d="M112 45 h22M128 45 v7M134 45 v5" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
    </Frame>
  );
}

function RepoCover() {
  return (
    <Frame>
      <rect x={26} y={18} width={108} height={54} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <path d="M26 30 H134" stroke={MUTED} strokeWidth={1} />
      <circle cx={34} cy={24} r={2.5} fill={HIGHLIGHT} stroke={INK} strokeWidth={0.9} />
      <rect x={34} y={38} width={58} height={26} rx={3} fill={HIGHLIGHT} stroke={MUTED} strokeWidth={1} />
      <path d="M40 46 h34M40 54 h24" stroke={INK} strokeWidth={1.3} strokeLinecap="round" />
      <path d="M100 40 h26M100 48 h20M100 56 h26" stroke={MUTED} strokeWidth={1.3} strokeLinecap="round" />
      <path
        d="M120 22 l1.6 3.4 l3.6 .5 l-2.6 2.6 l.6 3.7 l-3.2 -1.7 l-3.2 1.7 l.6 -3.7 l-2.6 -2.6 l3.6 -.5 Z"
        fill={ACCENT}
      />
    </Frame>
  );
}

function IssueCover() {
  return (
    <Frame>
      <circle cx={40} cy={30} r={9} fill="none" stroke={ACCENT} strokeWidth={2} />
      <circle cx={40} cy={30} r={3} fill={ACCENT} />
      <path d="M56 26 h58M56 34 h38" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" />
      <circle cx={40} cy={60} r={9} fill={ACCENT} />
      <path d="M36 60 l3 3 l6 -7" fill="none" stroke="var(--learn-surface)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 56 h48M56 64 h30" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" />
      <rect x={112} y={54} width={22} height={10} rx={5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1} />
    </Frame>
  );
}

function PullRequestCover() {
  return (
    <Frame>
      <circle cx={40} cy={26} r={6} fill="none" stroke={ACCENT} strokeWidth={2} />
      <path d="M40 32 V64" stroke={ACCENT} strokeWidth={2} />
      <circle cx={40} cy={70} r={6} fill={ACCENT} />
      <circle cx={104} cy={26} r={6} fill="none" stroke={INDIGO} strokeWidth={2} />
      <path d="M104 32 V50 C 104 62, 92 66, 78 68" fill="none" stroke={INDIGO} strokeWidth={2} />
      <path d="M84 64 l-7 4 l7 4" fill="none" stroke={INDIGO} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={56} y={20} width={62} height={2.6} rx={1.3} fill={MUTED} />
      <rect x={116} y={54} width={24} height={12} rx={6} fill={HIGHLIGHT} stroke={INK} strokeWidth={1} />
    </Frame>
  );
}

function ReviewCover() {
  return (
    <Frame>
      <rect x={22} y={20} width={72} height={50} rx={4} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.2} />
      <path d="M30 30 h44" stroke="var(--learn-code-dim)" strokeWidth={1.4} strokeLinecap="round" />
      <path d="M30 40 h52" stroke="var(--learn-code-ok)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M30 50 h34" stroke="var(--learn-code-err)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M30 60 h44" stroke="var(--learn-code-dim)" strokeWidth={1.4} strokeLinecap="round" />
      <path
        d="M100 28 h34 a5 5 0 0 1 5 5 v18 a5 5 0 0 1 -5 5 h-22 l-8 8 v-8 h-4 a5 5 0 0 1 -5 -5 v-18 a5 5 0 0 1 5 -5 Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path d="M104 38 h24M104 46 h16" stroke={INK} strokeWidth={1.3} strokeLinecap="round" />
    </Frame>
  );
}

function MergeButtonCover() {
  return (
    <Frame>
      <rect x={30} y={22} width={100} height={14} rx={7} fill={ACCENT} stroke={INK} strokeWidth={1.1} />
      <path d="M40 29 h14M60 29 h30" stroke="var(--learn-surface)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M116 26 l5 5 l5 -5" fill="none" stroke="var(--learn-surface)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      {[44, 58, 72].map((y, i) => (
        <g key={y}>
          <rect x={30} y={y} width={100} height={10} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1} />
          <circle cx={38} cy={y + 5} r={2.6} fill={[ACCENT, INDIGO, DANGER][i]} />
          <path d={`M46 ${y + 5} h${[70, 52, 60][i]}`} stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
        </g>
      ))}
    </Frame>
  );
}

function ForkCover() {
  return (
    <Frame>
      <rect x={22} y={36} width={30} height={20} rx={3} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.2} />
      <rect x={66} y={16} width={30} height={20} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={66} y={56} width={30} height={20} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={110} y={36} width={30} height={20} rx={3} fill={ACCENT} stroke={INK} strokeWidth={1.2} />
      <path d="M52 44 C 60 44, 58 26, 64 26" fill="none" stroke={MUTED} strokeWidth={1.4} />
      <path d="M52 50 C 60 50, 58 66, 64 66" fill="none" stroke={MUTED} strokeWidth={1.4} />
      <path d="M96 26 C 104 26, 102 42, 108 42" fill="none" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M96 66 C 104 66, 102 50, 108 50" fill="none" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function ActionsCover() {
  return (
    <Frame>
      <rect x={22} y={20} width={44} height={14} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1} />
      <rect x={22} y={38} width={44} height={14} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1} />
      <rect x={22} y={56} width={44} height={14} rx={3} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1} />
      <circle cx={32} cy={27} r={4} fill={ACCENT} />
      <circle cx={32} cy={45} r={4} fill={DANGER} />
      <circle cx={32} cy={63} r={4} fill={ACCENT} />
      <path d="M40 27 h20M40 45 h14M40 63 h22" stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M70 45 h12" stroke={MUTED} strokeWidth={1.3} />
      <circle cx={110} cy={45} r={20} fill="none" stroke={ACCENT} strokeWidth={2.4} strokeDasharray="7 5" />
      <path d="M104 45 l5 5 l10 -12" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function WorkflowCover() {
  return (
    <Frame>
      <Chain y={30} xs={[26, 50, 74, 98, 122]} r={5} fill={MUTED} />
      <Chain y={62} xs={[26, 50, 74]} r={5} />
      <path d="M50 62 C 66 62, 70 40, 84 36" fill="none" stroke={MUTED} strokeWidth={1.2} />
      <circle cx={98} cy={62} r={5} fill={INDIGO} stroke={INK} strokeWidth={1.1} />
      <path d="M80 62 h12" stroke={MUTED} strokeWidth={1.3} />
      <rect x={112} y={54} width={26} height={16} rx={3} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <text x={125} y={65} textAnchor="middle" fontSize={8} fontFamily="var(--learn-font-mono)" fill={INK}>
        v1.4
      </text>
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "why-version-control": WhyCover,
  "installing-git": InstallCover,
  "repositories-and-the-three-trees": TreesCover,
  "staging-and-committing": CommitCover,
  "reading-history": HistoryCover,
  "undoing-things": UndoCover,
  "ignoring-files": IgnoreCover,
  "what-a-branch-is": BranchCover,
  "merging-branches": MergeCover,
  "merge-conflicts": ConflictCover,
  "rebase-and-history": RebaseCover,
  "remotes-and-pushing": RemoteCover,
  authentication: AuthCover,
  "anatomy-of-a-repository": RepoCover,
  "issues-and-tracking": IssueCover,
  "opening-a-pull-request": PullRequestCover,
  "reviewing-a-pull-request": ReviewCover,
  "merging-a-pull-request": MergeButtonCover,
  "contributing-to-open-source": ForkCover,
  "automating-with-actions": ActionsCover,
  "choosing-a-workflow": WorkflowCover,
};

export function GithubLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? WhyCover;
  return <Cover />;
}
