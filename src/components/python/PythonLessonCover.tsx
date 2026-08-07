/**
 * Card art for the Python track.
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

function WhatIsPythonCover() {
  return (
    <Frame>
      <path d="M56 30 L36 45 L56 60" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 30 L124 45 L104 60" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 66 L88 24" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
    </Frame>
  );
}

function SettingUpCover() {
  return (
    <Frame>
      <rect x={30} y={22} width={100} height={46} rx={6} fill="var(--learn-code-bg)" stroke={INK} strokeWidth={1.4} />
      <text x={40} y={45} fontSize={13} fontFamily="var(--learn-font-mono)" fill={HIGHLIGHT}>{">>>"}</text>
      <rect className="home-blink" x={64} y={35} width={7} height={13} fill={HIGHLIGHT} />
    </Frame>
  );
}

function VariablesCover() {
  return (
    <Frame>
      <circle cx={40} cy={32} r={14} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <text x={40} y={37} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>a</text>
      <circle cx={40} cy={62} r={14} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <text x={40} y={67} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>b</text>
      <path d="M56 32 L110 45" stroke={MUTED} strokeWidth={1.6} fill="none" />
      <path d="M56 62 L110 47" stroke={MUTED} strokeWidth={1.6} fill="none" />
      <rect x={112} y={32} width={34} height={26} rx={5} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.6} />
    </Frame>
  );
}

function NumbersCover() {
  return (
    <Frame>
      <text x={80} y={55} textAnchor="middle" fontSize={26} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>
        7 // 2
      </text>
    </Frame>
  );
}

function StringsCover() {
  return (
    <Frame>
      <text x={80} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fill={ACCENT}>
        &ldquo;abc&rdquo;
      </text>
    </Frame>
  );
}

function ListsAndTuplesCover() {
  return (
    <Frame>
      <text x={44} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>[ ]</text>
      <text x={116} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={MUTED}>( )</text>
    </Frame>
  );
}

function DictionariesCover() {
  return (
    <Frame>
      <text x={80} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>
        {"{ }"}
      </text>
    </Frame>
  );
}

function SetsCover() {
  return (
    <Frame>
      <circle cx={66} cy={45} r={22} fill={HIGHLIGHT} opacity={0.85} stroke={INK} strokeWidth={1.2} />
      <circle cx={94} cy={45} r={22} fill="none" stroke={ACCENT} strokeWidth={1.6} />
    </Frame>
  );
}

function ConditionalsCover() {
  return (
    <Frame>
      <path d="M40 45 L80 45" stroke={INK} strokeWidth={2} />
      <path d="M80 45 L120 24" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <path d="M80 45 L120 66" stroke={MUTED} strokeWidth={2} strokeLinecap="round" />
      <circle cx={80} cy={45} r={5} fill={INK} />
    </Frame>
  );
}

function LoopsCover() {
  return (
    <Frame>
      <path
        d="M56 30 A18 18 0 1 1 55 60"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path d="M50 55 L55 62 L62 57" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function FunctionsCover() {
  return (
    <Frame>
      <path d="M20 45 L58 45" stroke={MUTED} strokeWidth={2} />
      <rect x={60} y={26} width={40} height={38} rx={6} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <text x={80} y={49} textAnchor="middle" fontSize={13} fontFamily="var(--learn-font-mono)" fill={INK}>f(x)</text>
      <path d="M102 45 L140 45" stroke={ACCENT} strokeWidth={2} />
    </Frame>
  );
}

function ScopeCover() {
  return (
    <Frame>
      <rect x={26} y={18} width={108} height={54} rx={8} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 4" />
      <rect x={50} y={32} width={60} height={28} rx={6} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
    </Frame>
  );
}

function ErrorsCover() {
  return (
    <Frame>
      <path d="M80 22 L104 62 L56 62 Z" fill="var(--learn-danger-bg)" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <text x={80} y={57} textAnchor="middle" fontSize={20} fontWeight={700} fill="var(--learn-danger-fg)">!</text>
    </Frame>
  );
}

function ModulesCover() {
  return (
    <Frame>
      <path d="M32 34 h30 l8 -8 h58 v40 h-96 Z" fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <rect x={78} y={38} width={26} height={20} rx={2} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function ClassesCover() {
  return (
    <Frame>
      <rect x={30} y={22} width={40} height={30} rx={5} fill="none" stroke={INK} strokeWidth={1.6} strokeDasharray="3 3" />
      <rect x={92} y={20} width={26} height={20} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={92} y={46} width={26} height={20} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <path d="M72 32 L90 28M72 42 L90 54" stroke={MUTED} strokeWidth={1.4} fill="none" />
    </Frame>
  );
}

function InheritanceCover() {
  return (
    <Frame>
      <rect x={62} y={16} width={36} height={22} rx={5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <rect x={30} y={54} width={36} height={22} rx={5} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <rect x={94} y={54} width={36} height={22} rx={5} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M80 38 L48 54M80 38 L112 54" stroke={MUTED} strokeWidth={1.4} fill="none" />
    </Frame>
  );
}

function FilesCover() {
  return (
    <Frame>
      <path d="M50 18 h36 l14 14 v40 h-50 Z" fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M86 18 v14 h14" fill="none" stroke={INK} strokeWidth={1.2} />
      <path d="M58 46 h34 M58 56 h34 M58 66 h20" stroke={MUTED} strokeWidth={1.4} />
    </Frame>
  );
}

function ComprehensionsCover() {
  return (
    <Frame>
      <text x={44} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>[</text>
      <path d="M60 45 A14 14 0 1 1 59 46" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <text x={118} y={58} textAnchor="middle" fontSize={30} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>]</text>
    </Frame>
  );
}

function GeneratorsCover() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={38 + i * 22}
          cy={45}
          r={i === 2 ? 9 : 6}
          fill={i === 2 ? ACCENT : HIGHLIGHT}
          stroke={INK}
          strokeWidth={1.2}
        />
      ))}
    </Frame>
  );
}

function DecoratorsCover() {
  return (
    <Frame>
      <rect x={54} y={30} width={52} height={34} rx={6} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
      <rect x={42} y={20} width={76} height={54} rx={9} fill="none" stroke={ACCENT} strokeWidth={1.8} strokeDasharray="4 4" />
      <text x={80} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={ACCENT}>@</text>
    </Frame>
  );
}

function LibrariesCover() {
  return (
    <Frame>
      <rect x={38} y={44} width={30} height={20} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={70} y={36} width={30} height={28} rx={4} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={102} y={26} width={30} height={38} rx={4} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
    </Frame>
  );
}

function JsonCover() {
  return (
    <Frame>
      <text x={80} y={58} textAnchor="middle" fontSize={28} fontFamily="var(--learn-font-mono)" fontWeight={700} fill={INK}>
        {"{ }"}
      </text>
      <circle cx={80} cy={20} r={4} fill={ACCENT} />
      <path d="M80 24 L80 32" stroke={ACCENT} strokeWidth={1.6} />
    </Frame>
  );
}

function TestingCover() {
  return (
    <Frame>
      <path
        d="M80 18 L112 28 V50 C112 64 98 72 80 76 C62 72 48 64 48 50 V28 Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M66 46 L76 56 L96 34" fill="none" stroke={ACCENT} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function FinalProjectCover() {
  return (
    <Frame>
      <path
        d="M80 16 C96 30 100 52 92 68 L80 60 L68 68 C60 52 64 30 80 16Z"
        fill={HIGHLIGHT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <circle cx={80} cy={38} r={6} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <path d="M70 66 L60 78M90 66 L100 78" stroke={MUTED} strokeWidth={1.6} strokeLinecap="round" />
    </Frame>
  );
}

function ListMethodsCover() {
  return (
    <Frame>
      {[26, 38, 52, 64].map((h, i) => (
        <rect
          key={h}
          x={44 + i * 20}
          y={70 - h}
          width={13}
          height={h}
          rx={2}
          fill={i === 3 ? ACCENT : HIGHLIGHT}
          stroke={INK}
          strokeWidth={1.2}
        />
      ))}
      <path d="M40 16 L118 16" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" />
      <path d="M112 12 L118 16 L112 20" fill="none" stroke={MUTED} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

function RecordsAndTablesCover() {
  return (
    <Frame>
      <rect x={30} y={20} width={100} height={50} rx={4} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <rect x={30} y={20} width={100} height={13} fill={HIGHLIGHT} />
      <path d="M30 33 H130M30 46 H130M30 58 H130" stroke={MUTED} strokeWidth={0.9} />
      <path d="M63 20 V70M97 20 V70" stroke={MUTED} strokeWidth={0.9} />
      <rect x={30} y={46} width={100} height={12} fill="rgba(62, 127, 92, 0.22)" />
    </Frame>
  );
}

function NestedStructuresCover() {
  return (
    <Frame>
      <rect x={26} y={16} width={108} height={58} rx={6} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <rect x={40} y={26} width={80} height={38} rx={5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.2} />
      <rect x={54} y={35} width={52} height={20} rx={4} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.4} />
      <circle cx={80} cy={45} r={3.4} fill={ACCENT} />
    </Frame>
  );
}

function CopyingAndAliasingCover() {
  return (
    <Frame>
      <circle cx={30} cy={30} r={9} fill="var(--learn-surface)" stroke={ACCENT} strokeWidth={1.6} />
      <text x={30} y={34} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>a</text>
      <circle cx={30} cy={62} r={9} fill="var(--learn-surface)" stroke={MUTED} strokeWidth={1.6} strokeDasharray="3 2" />
      <text x={30} y={66} textAnchor="middle" fontSize={9} fontWeight={700} fill={MUTED}>b</text>
      <path d="M41 31 C60 33, 66 42, 84 45" fill="none" stroke={ACCENT} strokeWidth={1.5} />
      <path d="M41 61 C60 59, 66 50, 84 47" fill="none" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 3" />
      <rect x={86} y={34} width={44} height={24} rx={5} fill={HIGHLIGHT} stroke={INK} strokeWidth={1.4} />
    </Frame>
  );
}

function ErrorsInDataCover() {
  return (
    <Frame>
      <rect x={36} y={20} width={88} height={50} rx={5} fill="var(--learn-surface)" stroke={INK} strokeWidth={1.4} />
      <rect x={46} y={28} width={68} height={11} rx={2} fill={HIGHLIGHT} />
      <rect x={46} y={44} width={68} height={11} rx={2} fill={HIGHLIGHT} />
      <rect x={46} y={60} width={68} height={11} rx={2} fill="var(--learn-danger-bg)" stroke="var(--learn-outcome-fn)" strokeWidth={1.2} />
      <path d="M74 63 L86 69M86 63 L74 69" stroke="var(--learn-outcome-fn)" strokeWidth={1.8} strokeLinecap="round" />
    </Frame>
  );
}

function CollectionsModuleCover() {
  return (
    <Frame>
      {[62, 46, 30, 18].map((w, i) => (
        <rect
          key={w}
          x={44}
          y={20 + i * 14}
          width={w}
          height={10}
          rx={2}
          fill={i === 0 ? ACCENT : HIGHLIGHT}
          stroke={INK}
          strokeWidth={1}
        />
      ))}
      <path d="M40 16 V74" stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
    </Frame>
  );
}

function ChoosingAStructureCover() {
  return (
    <Frame>
      <path d="M32 70 H128" stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M32 70 V18" stroke={MUTED} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M32 70 L126 22" fill="none" stroke="var(--learn-series-2)" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M32 66 L126 66" fill="none" stroke="var(--learn-series-3)" strokeWidth={2.2} strokeLinecap="round" strokeDasharray="6 4" />
      <circle cx={126} cy={22} r={3.6} fill="var(--learn-series-2)" />
      <rect x={122.4} y={62.4} width={7.2} height={7.2} fill="var(--learn-series-3)" />
    </Frame>
  );
}

const COVERS: Record<string, () => React.ReactElement> = {
  "what-is-python": WhatIsPythonCover,
  "setting-up": SettingUpCover,
  variables: VariablesCover,
  "numbers-and-operators": NumbersCover,
  strings: StringsCover,
  "lists-and-tuples": ListsAndTuplesCover,
  dictionaries: DictionariesCover,
  "sets-and-truthiness": SetsCover,
  conditionals: ConditionalsCover,
  loops: LoopsCover,
  functions: FunctionsCover,
  "scope-and-arguments": ScopeCover,
  errors: ErrorsCover,
  "modules-and-packages": ModulesCover,
  "classes-and-objects": ClassesCover,
  inheritance: InheritanceCover,
  "files-and-paths": FilesCover,
  comprehensions: ComprehensionsCover,
  "iterators-and-generators": GeneratorsCover,
  decorators: DecoratorsCover,
  "list-methods-in-depth": ListMethodsCover,
  "records-and-tables": RecordsAndTablesCover,
  "nested-structures": NestedStructuresCover,
  "copying-and-aliasing": CopyingAndAliasingCover,
  "errors-in-data": ErrorsInDataCover,
  "the-collections-module": CollectionsModuleCover,
  "choosing-a-structure": ChoosingAStructureCover,
  "working-with-libraries": LibrariesCover,
  "json-and-apis": JsonCover,
  "testing-your-code": TestingCover,
  "final-project": FinalProjectCover,
};

export function PythonLessonCover({ slug }: CoverProps) {
  const Cover = COVERS[slug] ?? WhatIsPythonCover;
  return <Cover />;
}
