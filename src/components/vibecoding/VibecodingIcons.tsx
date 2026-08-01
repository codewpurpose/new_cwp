/**
 * One glyph per Vibe Coding chapter.
 *
 * Each is drawn on a 40x40 grid centred at the origin, stroke-only, so it can
 * be dropped into a cover at any size and take its colour from the caller.
 * Keeping them all in one file makes it obvious at a glance when a chapter is
 * missing one — and the build validator fails if any published chapter is.
 */

type Glyph = () => React.ReactElement;

/** Shared stroke setup, so every glyph reads at the same weight. */
function G({ children, w = 2.4 }: { children: React.ReactNode; w?: number }) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

/* ---- Part 1 · Getting Set Up ------------------------------------------ */

const Intro: Glyph = () => (
  <G>
    <path d="M-6 -14 l-10 10 10 10" />
    <path d="M6 -14 l10 10 -10 10" />
    <path d="M-1 15 l2 -30" strokeWidth={2} />
  </G>
);

const WhatYouNeed: Glyph = () => (
  <G>
    <rect x={-17} y={-11} width={34} height={24} rx={3} />
    <path d="M-6 -11 v-4 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v4" />
    <path d="M-6 2 l4 4 8 -9" />
  </G>
);

const Tools: Glyph = () => (
  <G w={2.2}>
    <rect x={-17} y={-17} width={15} height={15} rx={3} />
    <rect x={2} y={-17} width={15} height={15} rx={3} />
    <rect x={-17} y={2} width={15} height={15} rx={3} />
    <path d="M5 10 l3 3 7 -8" />
  </G>
);

const Install: Glyph = () => (
  <G>
    <path d="M0 -16 v20" />
    <path d="M-7 -3 l7 7 7 -7" />
    <path d="M-15 11 v4 a2 2 0 0 0 2 2 h26 a2 2 0 0 0 2 -2 v-4" />
  </G>
);

const FirstApp: Glyph = () => (
  <G>
    <rect x={-17} y={-13} width={34} height={26} rx={3} />
    <path d="M-17 -5 h34" />
    <path d="M-4 1 l9 5 -9 5 z" />
  </G>
);

/* ---- Part 2 · How the Model Thinks ------------------------------------ */

const WhatAiSees: Glyph = () => (
  <G>
    <path d="M-18 0 s7 -10 18 -10 11 0 18 10" />
    <path d="M-18 0 s7 10 18 10 11 0 18 -10" />
    <circle cx={0} cy={0} r={5} />
    <path d="M10 -14 l-20 28" strokeWidth={2.2} />
  </G>
);

const Prompts: Glyph = () => (
  <G>
    <path d="M-17 -12 h34 a2 2 0 0 1 2 2 v14 a2 2 0 0 1 -2 2 h-20 l-9 8 v-8 h-5 a2 2 0 0 1 -2 -2 v-14 a2 2 0 0 1 2 -2 z" />
    <path d="M-9 -4 h18 M-9 3 h11" strokeWidth={2} />
  </G>
);

const PromptPatterns: Glyph = () => (
  <G w={2.2}>
    <rect x={-16} y={-16} width={24} height={18} rx={3} />
    <rect x={-8} y={-6} width={24} height={18} rx={3} />
    <path d="M-2 3 h12" strokeWidth={2} />
  </G>
);

const ChoosingAModel: Glyph = () => (
  <G>
    <path d="M-16 8 a16 16 0 0 1 32 0" />
    <path d="M0 8 l9 -12" />
    <circle cx={0} cy={8} r={2.4} />
  </G>
);

/* ---- Part 3 · The Working Loop ---------------------------------------- */

const Loop: Glyph = () => (
  <G>
    <path d="M-15 -4 a15 15 0 0 1 26 -7" />
    <path d="M15 4 a15 15 0 0 1 -26 7" />
    <path d="M8 -16 l4 5 -6 3" />
    <path d="M-8 16 l-4 -5 6 -3" />
  </G>
);

const SmallDiffs: Glyph = () => (
  <G w={2.2}>
    <rect x={-17} y={-15} width={34} height={8} rx={2} />
    <rect x={-17} y={-4} width={22} height={8} rx={2} />
    <rect x={-17} y={7} width={28} height={8} rx={2} />
  </G>
);

const Steering: Glyph = () => (
  <G>
    <path d="M-16 10 c0 -16 12 -22 26 -22" />
    <path d="M3 -18 l8 6 -8 6" />
    <path d="M-16 10 h-1" />
    <circle cx={-16} cy={10} r={2.6} />
  </G>
);

const Review: Glyph = () => (
  <G>
    <circle cx={-3} cy={-3} r={12} />
    <path d="M7 7 l10 10" />
    <path d="M-9 -3 l4 4 7 -8" strokeWidth={2.2} />
  </G>
);

/* ---- Part 4 · Real Codebases ------------------------------------------ */

const GivingContext: Glyph = () => (
  <G w={2.2}>
    <path d="M-13 -17 h16 l10 10 v24 a2 2 0 0 1 -2 2 h-24 a2 2 0 0 1 -2 -2 v-32 a2 2 0 0 1 2 -2 z" />
    <path d="M3 -17 v10 h10" />
    <circle cx={0} cy={7} r={4} />
    <path d="M4 7 v3 a3 3 0 0 0 5 -2 a9 9 0 1 0 -4 7" strokeWidth={1.8} />
  </G>
);

const RulesFiles: Glyph = () => (
  <G w={2.2}>
    <path d="M-13 -17 h26 a2 2 0 0 1 2 2 v30 a2 2 0 0 1 -2 2 h-26 a2 2 0 0 1 -2 -2 v-30 a2 2 0 0 1 2 -2 z" />
    <path d="M-6 -8 h12 M-6 0 h12 M-6 8 h7" strokeWidth={2} />
  </G>
);

const Codebase: Glyph = () => (
  <G w={2.2}>
    <path d="M0 -17 l17 9 -17 9 -17 -9 z" />
    <path d="M-17 1 l17 9 17 -9" />
    <path d="M-17 10 l17 9 17 -9" />
  </G>
);

const McpAndTools: Glyph = () => (
  <G>
    <path d="M-6 -17 v8 M6 -17 v8" />
    <rect x={-12} y={-9} width={24} height={12} rx={3} />
    <path d="M0 3 v8 a6 6 0 0 0 12 0 v-3" />
  </G>
);

const Refactors: Glyph = () => (
  <G w={2.2}>
    <rect x={-18} y={-16} width={14} height={12} rx={2} />
    <rect x={4} y={4} width={14} height={12} rx={2} />
    <path d="M-11 -4 v8 a4 4 0 0 0 4 4 h8" />
    <path d="M4 8 l-5 4 5 4" transform="translate(0 -4)" />
  </G>
);

/* ---- Part 5 · Making It Correct ---------------------------------------- */

const Debugging: Glyph = () => (
  <G w={2.2}>
    <ellipse cx={0} cy={2} rx={10} ry={13} />
    <path d="M-10 -6 l-7 -6 M10 -6 l7 -6 M-10 10 l-7 7 M10 10 l7 7 M-14 2 h-4 M14 2 h4" />
    <path d="M-5 -12 v-3 a5 5 0 0 1 10 0 v3" />
  </G>
);

const Tests: Glyph = () => (
  <G>
    <rect x={-16} y={-16} width={32} height={32} rx={4} />
    <path d="M-7 0 l5 5 9 -11" strokeWidth={2.6} />
  </G>
);

const Security: Glyph = () => (
  <G>
    <path d="M0 -17 l15 6 v11 c0 9 -6 15 -15 17 c-9 -2 -15 -8 -15 -17 v-11 z" />
    <circle cx={0} cy={-1} r={3.5} />
    <path d="M0 2.5 v5" strokeWidth={2} />
  </G>
);

const WhenNotTo: Glyph = () => (
  <G>
    <circle cx={0} cy={0} r={16} />
    <path d="M-11 -11 l22 22" strokeWidth={2.6} />
  </G>
);

/* ---- Part 6 · Shipping -------------------------------------------------- */

const Git: Glyph = () => (
  <G>
    <circle cx={-10} cy={-11} r={4.5} />
    <circle cx={-10} cy={12} r={4.5} />
    <circle cx={11} cy={0} r={4.5} />
    <path d="M-10 -6.5 v13" />
    <path d="M-10 1 h9 a8 8 0 0 0 8 -1" />
  </G>
);

const Shipping: Glyph = () => (
  <G>
    <path d="M-15 9 a9 9 0 0 1 2 -17 a12 12 0 0 1 23 -1 a8 8 0 0 1 3 18 z" />
    <path d="M0 16 v-14" />
    <path d="M-5 6 l5 -5 5 5" />
  </G>
);

const AfterYouShip: Glyph = () => (
  <G>
    <path d="M-17 2 h9 l4 -10 6 18 5 -10 h10" strokeWidth={2.6} />
    <path d="M-17 13 h34" strokeWidth={2} opacity={0.5} />
  </G>
);

/* ---- Part 7 · Going Deeper ---------------------------------------------- */

const Agents: Glyph = () => (
  <G w={2.2}>
    <rect x={-14} y={-8} width={28} height={20} rx={5} />
    <circle cx={-5} cy={1} r={2.2} fill="currentColor" stroke="none" />
    <circle cx={5} cy={1} r={2.2} fill="currentColor" stroke="none" />
    <path d="M0 -8 v-6 M-6 -17 h12" />
  </G>
);

const Orchestration: Glyph = () => (
  <G w={2.2}>
    <circle cx={0} cy={-12} r={4.5} />
    <circle cx={-13} cy={11} r={4.5} />
    <circle cx={13} cy={11} r={4.5} />
    <path d="M-3 -8 l-8 15 M3 -8 l8 15 M-8 11 h16" />
  </G>
);

const CustomTooling: Glyph = () => (
  <G>
    <rect x={-17} y={-13} width={34} height={26} rx={3} />
    <path d="M-9 -3 l5 4 -5 4" strokeWidth={2.2} />
    <path d="M1 5 h8" strokeWidth={2.2} />
  </G>
);

const GettingBetter: Glyph = () => (
  <G>
    <path d="M-16 12 h32" strokeWidth={2} />
    <path d="M-13 6 v6 M-4 -1 v13 M5 -8 v20 M14 -15 v27" strokeWidth={2.6} />
  </G>
);

export const VIBECODING_GLYPHS: Record<string, Glyph> = {
  intro: Intro,
  "what-you-need": WhatYouNeed,
  tools: Tools,
  install: Install,
  "first-app": FirstApp,
  "what-ai-sees": WhatAiSees,
  prompts: Prompts,
  "prompt-patterns": PromptPatterns,
  "choosing-a-model": ChoosingAModel,
  loop: Loop,
  "small-diffs": SmallDiffs,
  steering: Steering,
  review: Review,
  "giving-context": GivingContext,
  "rules-files": RulesFiles,
  codebase: Codebase,
  "mcp-and-tools": McpAndTools,
  refactors: Refactors,
  debugging: Debugging,
  tests: Tests,
  security: Security,
  "when-not-to": WhenNotTo,
  git: Git,
  shipping: Shipping,
  "after-you-ship": AfterYouShip,
  agents: Agents,
  orchestration: Orchestration,
  "custom-tooling": CustomTooling,
  "getting-better": GettingBetter,
};
