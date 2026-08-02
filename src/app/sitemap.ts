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
    "/impact",
    "/blog",
    "/contact",
    "/donate",
    "/learn",
    "/learn/ml",
    "/learn/vibecoding",
    "/learn/python",
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

  const lessonRoutes = (["ml", "vibecoding", "python"] as const).flatMap((track) =>
    getChapters(track).map((chapter) => ({
      url: `${SITE_URL}/learn/${track}/${chapter.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...postRoutes, ...lessonRoutes];
}
