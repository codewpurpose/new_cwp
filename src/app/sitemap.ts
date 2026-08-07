import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";
import { posts } from "@/lib/posts";

/** Absolute URL with a trailing slash, matching how the site serves pages
 *  (`trailingSlash: true`) so canonicals and the sitemap agree. */
function abs(path: string): string {
  return `${SITE_URL}${path === "" ? "/" : `${path}/`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Individual lesson pages (/learn/<track>/<slug>) require a login, so they are
  // deliberately left out — we don't advertise pages Google can't crawl. The
  // track index pages stay in; they're public course landing pages.
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/join",
    // No "/blog": it 308s to /impact now. Listing a redirect wastes crawl
    // budget and muddies which URL is canonical. The posts below still stand.
    "/impact",
    "/contact",
    "/donate",
    "/learn/ml",
    "/learn/vibecoding",
    "/learn/python",
    "/learn/financial-literacy",
    "/learn/health-in-tech",
    "/learn/roblox",
  ].map((path) => ({
    url: abs(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: abs(`/blog/${post.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
