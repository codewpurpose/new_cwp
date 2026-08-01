import { VIBECODING_GLYPHS } from "@/components/vibecoding/VibecodingIcons";

/**
 * Card art for the Vibe Coding track.
 *
 * Each chapter gets its own glyph, coloured by the part it belongs to and
 * numbered by its position in the curriculum. So a card tells you three things
 * at a glance: what it is about, which part it sits in, and how far through you
 * are. Inline SVG from the design tokens — no binary assets.
 */

interface CoverProps {
  slug: string;
  partId: string;
  order: number;
}

const W = 160;
const H = 90;

/** Colour and wash per part, so a grid of cards still groups visually. */
const PART_STYLE: Record<string, { colour: string; wash: string }> = {
  setup: { colour: "var(--learn-series-1)", wash: "var(--learn-chart-highlight)" },
  model: { colour: "var(--learn-series-3)", wash: "var(--learn-chart-band)" },
  loop: { colour: "var(--learn-series-1)", wash: "var(--learn-chart-highlight)" },
  codebases: { colour: "var(--learn-series-5)", wash: "var(--learn-chart-band)" },
  correctness: { colour: "var(--learn-series-4)", wash: "var(--learn-chart-highlight)" },
  shipping: { colour: "var(--learn-series-2)", wash: "var(--learn-chart-band)" },
  depth: { colour: "var(--learn-series-5)", wash: "var(--learn-chart-band)" },
};

const FALLBACK_STYLE = PART_STYLE.setup;

export function VibecodingLessonCover({ slug, partId, order }: CoverProps) {
  const part = PART_STYLE[partId] ?? FALLBACK_STYLE;
  const Glyph = VIBECODING_GLYPHS[slug];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-[16/9] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      data-slug={slug}
    >
      <rect width={W} height={H} fill="var(--learn-chart-plot)" />

      {/* A quiet wash keyed to the part, so a grid of cards groups visually. */}
      <circle cx={W - 26} cy={22} r={44} fill={part.wash} />

      {Glyph && (
        <g
          transform={`translate(${W / 2 - 14}, ${H / 2}) scale(0.82)`}
          style={{ color: part.colour }}
        >
          <Glyph />
        </g>
      )}

      <text
        x={W - 16}
        y={H - 14}
        textAnchor="end"
        fontSize={28}
        fontWeight={700}
        fill={part.colour}
        opacity={0.32}
        className="font-[family-name:var(--learn-font-sans)]"
      >
        {order}
      </text>
    </svg>
  );
}
