import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";
import { getPost, posts } from "@/lib/posts";

export const alt = "A story from the CodeWithPurpose blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return ogImage({ eyebrow: "From the blog", title: getPost(slug)?.title ?? "CodeWithPurpose stories" });
}
