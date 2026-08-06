import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";
import { posts } from "@/lib/posts";
import { getChapters } from "@/lib/learn-nav";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lessonRoutes = (
    ["ml", "vibecoding", "python", "financial-literacy", "health-in-tech"] as const
  ).flatMap((track) =>
    getChapters(track).map((chapter) => ({
      url: `${SITE_URL}/learn/${track}/${chapter.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...postRoutes, ...lessonRoutes];
}
