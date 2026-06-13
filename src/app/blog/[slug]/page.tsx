import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover } from "@/components/TopicCover";
import { BLOG_HREF, SUBSTACK_EMBED_SRC } from "@/lib/links";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog | CWP" };
  return {
    title: `${post.title} | CWP`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <article className="relative overflow-hidden border-b-[0.5px] border-[#e1e1e1] bg-[#f9f9f9] pb-16 pt-10 md:pb-24 md:pt-16">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[46rem] px-5 md:px-0">
          <Reveal>
            <Link href={BLOG_HREF} className="home-arrow-link text-sm">
              <span className="home-arrow rotate-180">→</span> All stories
            </Link>
            <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-[#818181]">
              {post.date}
            </p>
            <h1 className="home-serif mt-3 text-[2rem] leading-[1.08] tracking-[-0.02em] md:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-[1.5] text-[#636363]">
              {post.excerpt}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="home-card mt-8 overflow-hidden rounded-[20px]">
              <TopicCover variant={post.cover} className="aspect-[16/9] w-full" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-6">
              {post.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[17px] leading-[1.75] text-[#1f1f1f]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-10 border-t-[0.5px] border-[#e1e1e1] pt-6 text-sm text-[#818181]">
              Written by the CodeWithPurpose team
            </p>
          </Reveal>
        </div>
      </article>

      <section className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-[46rem] px-5 md:px-0">
          <div className="home-card rounded-[20px] p-8 text-center md:p-10">
            <h2 className="home-serif text-[1.5rem] md:text-[1.875rem]">
              Want the next story in your inbox?
            </h2>
            <p className="mt-3 text-[#636363]">
              Subscribe on Substack. It&apos;s free, just like everything else
              we make.
            </p>
            <div className="mt-6 flex justify-center">
              <iframe
                src={SUBSTACK_EMBED_SRC}
                title="Subscribe to the CodeWithPurpose Substack"
                scrolling="no"
                className="h-[320px] w-full max-w-[480px] rounded-xl border-[0.5px] border-[#e1e1e1] bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
