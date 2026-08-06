import type { NextConfig } from "next";

/**
 * The ML track used to be six vendored static HTML bundles served out of
 * public/, reached through rewrites. They have been replaced by original React
 * lessons on different topics, so these slugs no longer exist.
 *
 * Redirects rather than 404s: the old URLs were live and may be linked from
 * elsewhere. They land on the track index, where the reader can pick from the
 * new lineup.
 *
 * The destination carries a trailing slash so it matches `trailingSlash: true`
 * on the first hop. With "/learn/ml" the redirect landed back on "/learn/ml"
 * without a slash, which a second 308 then appended — a two-hop chain per
 * request. "/learn/ml/" lands directly.
 */
const RETIRED_ML_SLUGS = [
  "train-test-validation",
  "decision-tree",
  "random-forest",
  "bias-variance",
  "double-descent",
  "double-descent2",
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  async redirects() {
    return [
      ...RETIRED_ML_SLUGS.map((slug) => ({
        source: `/learn/ml/${slug}`,
        destination: "/learn/ml/",
        permanent: true,
      })),
      /**
       * The /learn index and /courses were two catalogs of the same material,
       * so they are one page now. Only the index moved — the per-track
       * indexes and every chapter under them still live at /learn/<track>/,
       * and this matches the index exactly, not its children.
       *
       * Trailing slash on the destination for the same reason as above: it
       * lands in one hop instead of being 308'd again by trailingSlash.
       */
      { source: "/learn", destination: "/courses/", permanent: true },
      /**
       * The blog and the impact page argued the same case from opposite ends —
       * the numbers, and the students behind them — so they are one page now.
       *
       * Matches the index exactly, not its children: the posts still live at
       * /blog/<slug> and are linked from outside. Trailing slash on the
       * destination so it lands in one hop, as above.
       */
      { source: "/blog", destination: "/impact/", permanent: true },
    ];
  },
};

export default nextConfig;
