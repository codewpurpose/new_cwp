import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover } from "@/components/TopicCover";
import { images } from "@/lib/images";
import { posts } from "@/lib/posts";
import { CONGRESS_LETTER_HREF, DONATE_HREF, SUBSTACK_EMBED_SRC } from "@/lib/links";

/**
 * Impact and the blog, on one page.
 *
 * They were two routes making the same argument from opposite ends — the
 * numbers, and the students behind them — and each was weaker alone. `/blog`
 * now redirects here (see next.config.ts). Individual posts keep their own
 * `/blog/<slug>` URLs: those are linked from outside and there is no reason to
 * move them.
 */
export const metadata: Metadata = {
  title: "Impact & Stories",
  description:
    "4,000+ students across 130+ countries, and the stories behind the numbers.",
  alternates: { canonical: "/impact/" },
};

const stats = [
  { value: "4,000+", label: "Students Reached" },
  { value: "130+", label: "Countries" },
  { value: "30+", label: "Languages Taught" },
  { value: "15,000", label: "Minutes of Teaching" },
];

export default function ImpactPage() {
  return (
    <PageShell>
      <PageHero
        title="Students on every corner of the Earth"
        description="From San Francisco to Lagos, Bangalore to São Paulo: over 130 countries and counting. Every student is someone who got access to free, real education because of this community."
        image={images.heroStudent}
        imageAlt="Student smiling while learning to code"
      >
        <Link href={DONATE_HREF} className="home-btn home-btn-fill">
          Support Our Mission
        </Link>
      </PageHero>

      <PageSection>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07}>
              <div className="home-card home-lift h-full rounded-xl px-4 py-8 text-center md:px-6">
                <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[2.75rem]">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-[var(--home-ink-soft)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          In classrooms, workshops, and communities
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Hands-on learning, smiling students, crowded workshops, and volunteers
          presenting. This is what CodeWithPurpose looks like in action.
        </p>
        <div className="mt-8">
          <PhotoGrid photos={images.gallery} columns={4} />
        </div>
      </PageSection>

      <PageSection className="bg-[var(--home-grey-450)]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="home-card overflow-hidden rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.congressLetter}
              alt="Congressional recognition letter"
              className="w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554]">
              Congressional Recognition · 2026
            </p>
            <h2 className="home-serif mt-4 text-[1.75rem] md:text-[2.25rem]">
              Recognized for leadership and service
            </h2>
            <p className="mt-4 text-[var(--home-ink-soft)]">
              Representative Mark DeSaulnier of the U.S. House of Representatives
              formally recognized our work bringing free coding education to
              underserved communities worldwide.
            </p>
            <a
              href={CONGRESS_LETTER_HREF}
              target="_blank"
              rel="noreferrer"
              className="home-btn home-btn-moss mt-6"
            >
              Read the letter
            </a>
          </div>
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          Stories from our community
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Updates on our courses, and the students and volunteers making free
          education possible worldwide.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="home-card home-lift home-template-row group block overflow-hidden rounded-[20px]"
              >
                <TopicCover variant={post.cover} className="aspect-[16/9] w-full" />
                <div className="p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
                    {post.date}
                  </p>
                  {/* h3, not h2: this section already owns the h2 above. */}
                  <h3 className="mt-2 text-xl md:text-2xl">{post.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
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

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-450)]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
            Get our stories in your inbox
          </h2>
          <p className="mt-3 text-[var(--home-ink-soft)]">
            We write about the students, volunteers, and small wins behind free
            education. Subscribe on Substack and never miss one.
          </p>
          <div className="mt-8 flex justify-center">
            <iframe
              src={SUBSTACK_EMBED_SRC}
              title="Subscribe to the CodeWithPurpose Substack"
              scrolling="no"
              loading="lazy"
              className="h-[320px] w-full max-w-[480px] rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-white"
            />
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
