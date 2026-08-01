import type { NextConfig } from "next";

/**
 * The ML track used to be six vendored static HTML bundles served out of
 * public/, reached through rewrites. They have been replaced by original React
 * lessons on different topics, so these slugs no longer exist.
 *
 * Redirects rather than 404s: the old URLs were live and may be linked from
 * elsewhere. They land on the track index, where the reader can pick from the
 * new lineup.
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
    return RETIRED_ML_SLUGS.map((slug) => ({
      source: `/learn/ml/${slug}`,
      destination: "/learn/ml",
      permanent: true,
    }));
  },
};

export default nextConfig;
