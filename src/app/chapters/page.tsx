import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { CHAPTER_APPLICATION_HREF, INDIA_CHAPTER_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Chapters",
  description: "Explore CodeWithPurpose chapters and bring free coding education to your community.",
  alternates: { canonical: "/chapters/" },
};

const chapters = [
  {
    name: "CodeWithPurpose India",
    location: "India",
    description: "Discover the students and initiatives bringing CodeWithPurpose to communities across India.",
    href: INDIA_CHAPTER_HREF,
  },
] as const;

export default function ChaptersPage() {
  return (
    <PageShell>
      <PageHero
        title="CodeWithPurpose chapters"
        description="Students bringing free coding education to their communities, one chapter at a time."
      >
        <a href={CHAPTER_APPLICATION_HREF} className="home-btn home-btn-fill">Apply to start a chapter</a>
      </PageHero>
      <PageSection>
        <h2 className="home-serif text-[1.625rem] md:text-[2rem]">Explore our chapters</h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Meet our chapters and learn about their work. As our community grows, you can find new chapters here.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <article key={chapter.name} className="home-card rounded-xl p-6 md:p-8">
              <p className="home-mono text-sm text-[var(--home-ink-soft)]">{chapter.location}</p>
              <h3 className="mt-3 text-xl">{chapter.name}</h3>
              <p className="mt-3 leading-[1.55] text-[var(--home-ink-soft)]">{chapter.description}</p>
              <a href={chapter.href} className="home-btn home-btn-outline mt-6">Explore chapter</a>
            </article>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
