import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { images } from "@/lib/images";
import { COURSES_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Blog — CodeWithPurpose",
  description: "Stories, updates, and insights from the CodeWithPurpose community.",
};

const posts = [
  {
    title: "Why we built CodeWithPurpose",
    date: "March 2026",
    excerpt:
      "What began as a frustration with $15,000 bootcamps became a movement to make coding education free for every student, everywhere.",
    image: images.volunteerHelp,
  },
  {
    title: "110 countries and counting",
    date: "February 2026",
    excerpt:
      "From rural villages in India to classrooms in Nigeria — how student volunteers are reaching learners across the globe.",
    image: images.heroStudent,
  },
  {
    title: "Congressional recognition for our work",
    date: "March 2026",
    excerpt:
      "Representative Mark DeSaulnier recognized CodeWithPurpose for tremendous leadership and service to our community.",
    image: images.congressLetter,
  },
  {
    title: "Inside our Python bootcamp",
    date: "January 2026",
    excerpt:
      "800+ students across 50+ countries have gone from zero experience to building real projects with our most popular course.",
    image: images.pythonCourse,
  },
];

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Stories from our community"
        description="Updates on our courses, impact, and the students and volunteers making free education possible worldwide."
      />

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.title}
              className="home-card home-lift overflow-hidden rounded-[20px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#818181]">
                  {post.date}
                </p>
                <h2 className="mt-2 text-xl md:text-2xl">{post.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={COURSES_HREF} className="home-btn home-btn-outline">
            Explore Free Courses
          </Link>
        </div>
      </PageSection>
    </PageShell>
  );
}
