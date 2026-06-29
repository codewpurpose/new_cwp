import type { NextConfig } from "next";

const MLU_ARTICLE_SLUGS = [
  "train-test-validation",
  "precision-recall",
  "decision-tree",
  "random-forest",
  "bias-variance",
  "double-descent",
  "double-descent2",
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  async rewrites() {
    return MLU_ARTICLE_SLUGS.flatMap((slug) => [
      {
        source: `/learn/ml/${slug}`,
        destination: `/learn/ml/${slug}/index.html`,
      },
    ]);
  },
};

export default nextConfig;
