import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover } from "@/components/TopicCover";
import { posts } from "@/lib/posts";
import { SUBSTACK_EMBED_SRC } from "@/lib/links";

export const metadata: Metadata = {
  title: "Blog | CWP",
  description: "Stories, updates, and insights from the CodeWithPurpose community.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        title="Stories from our community"
        description="Updates on our courses, impact, and the students and volunteers making free education possible worldwide."
      />

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="home-card home-lift home-template-row group block overflow-hidden rounded-[20px]"
              >
                <TopicCover variant={post.cover} className="aspect-[16/9] w-full" />
                <div className="p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#818181]">
                    {post.date}
                  </p>
                  <h2 className="mt-2 text-xl md:text-2xl">{post.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                    {post.excerpt}
                  </p>
                  <p className="home-arrow-link mt-5">
                    Read the story{" "}
                    <span className="home-row-arrow text-[#397554]">→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-450)]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
            Get our stories in your inbox
          </h2>
          <p className="mt-3 text-[#636363]">
            We write about the students, volunteers, and small wins behind free
            education. Subscribe on Substack and never miss one.
          </p>
          <div className="mt-8 flex justify-center">
            <iframe
              src={SUBSTACK_EMBED_SRC}
              title="Subscribe to the CodeWithPurpose Substack"
              scrolling="no"
              className="h-[320px] w-full max-w-[480px] rounded-xl border-[0.5px] border-[var(--home-grey-500)] bg-white"
            />
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
