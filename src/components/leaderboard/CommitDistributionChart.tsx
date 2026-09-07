/**
 * "How does everyone's commit count stack up?" — a histogram of public
 * commits across every linked account, distinct from the ranked list below it
 * (that answers "who's #1"; this answers "what does the whole board look
 * like"). Hand-written SVG with a fluid viewBox, per AGENTS.md: no chart
 * library, no canvas, no ResizeObserver.
 */

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 220;
const PAD_LEFT = 34;
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 28;
const BAR_GAP = 4;

/** Bucket edges for public commit counts. The last bucket is open-ended. */
const BUCKETS = [
  { max: 10, label: "0–10" },
  { max: 50, label: "11–50" },
  { max: 200, label: "51–200" },
  { max: 500, label: "201–500" },
  { max: 1000, label: "501–1k" },
  { max: 2500, label: "1k–2.5k" },
  { max: Infinity, label: "2.5k+" },
] as const;

function bucketIndex(commits: number): number {
  for (let i = 0; i < BUCKETS.length; i += 1) {
    if (commits <= BUCKETS[i].max) return i;
  }
  return BUCKETS.length - 1;
}

export function CommitDistributionChart({ commitCounts }: { commitCounts: number[] }) {
  const counts = BUCKETS.map(() => 0);
  for (const commits of commitCounts) counts[bucketIndex(commits)] += 1;
  const maxCount = Math.max(1, ...counts);

  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM;
  const barWidth = plotWidth / BUCKETS.length - BAR_GAP;

  return (
    <figure className="home-card rounded-2xl p-5 md:p-6">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-[var(--home-ink-quiet)]">
        Commit distribution
      </figcaption>
      <p className="mt-1 text-[14px] text-[var(--home-ink-soft)]">
        How many linked accounts fall into each range of lifetime public commits.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="mt-4 w-full"
        role="img"
        aria-label={`Distribution of ${commitCounts.length} linked accounts by public commit count: ${BUCKETS.map(
          (b, i) => `${counts[i]} in the ${b.label} range`,
        ).join(", ")}.`}
      >
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP + plotHeight}
          x2={VIEW_WIDTH - PAD_RIGHT}
          y2={PAD_TOP + plotHeight}
          stroke="var(--home-hairline-strong)"
          strokeWidth={1}
        />
        {BUCKETS.map((bucket, i) => {
          const height = (counts[i] / maxCount) * plotHeight;
          const x = PAD_LEFT + i * (plotWidth / BUCKETS.length) + BAR_GAP / 2;
          const y = PAD_TOP + plotHeight - height;
          return (
            <g key={bucket.label}>
              <rect
                x={x}
                y={y}
                width={Math.max(0, barWidth)}
                height={Math.max(0, height)}
                rx={3}
                fill="var(--home-fern)"
              />
              {counts[i] > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--home-ink-soft)"
                >
                  {counts[i]}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={PAD_TOP + plotHeight + 18}
                textAnchor="middle"
                fontSize={10}
                fill="var(--home-ink-quiet)"
              >
                {bucket.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
