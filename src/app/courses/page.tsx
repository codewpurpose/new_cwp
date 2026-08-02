import type { Metadata } from "next";
import Link from "next/link";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover, type TopicCoverVariant } from "@/components/TopicCover";
import { images } from "@/lib/images";
import {
  ABOUT_HREF,
  FINANCIAL_LITERACY_COURSE_HREF,
  HEALTH_IN_TECH_COURSE_HREF,
  LEARN_ML_HREF,
  LEARN_PYTHON_HREF,
  LEARN_VIBECODING_HREF,
  ML_PART_1_COURSE_HREF,
  ML_PART_2_COURSE_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
  VIBECODING_PART_2_COURSE_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Free Coding Courses",
  description:
    "Free courses and interactive lessons for students worldwide. Python, Vibecoding, Machine Learning, Financial Literacy, and Health in Tech.",
  alternates: { canonical: "/courses" },
};

interface Course {
  title: string;
  tags: string[];
  description: string;
  cover: TopicCoverVariant;
  /**
   * Udemy enrolments. A subject taught in two parts is one card with two
   * buttons rather than two cards: split across cards, the pair repeated the
   * same art, tags and half the description, and read as unrelated courses
   * rather than as one course with a second half.
   */
  enrol: { href: string; label: string }[];
  /**
   * The interactive track on this site, for the subjects that have one. The
   * catalog and the lesson tracks used to be separate pages; a course that is
   * taught both ways now offers both from the same card rather than asking the
   * reader to find the other page.
   */
  lessonsHref?: string;
}

const courses: Course[] = [
  {
    title: "Python for Complete Beginners",
    tags: ["Beginner", "Most Popular"],
    description:
      "Zero experience? Perfect. You'll go from nothing to building real projects, just like 800+ students across 50+ countries already have.",
    cover: "python",
    enrol: [{ href: PYTHON_COURSE_HREF, label: "Enroll Free" }],
    lessonsHref: LEARN_PYTHON_HREF,
  },
  {
    title: "Vibecoding 101",
    tags: ["Creative", "AI-Powered"],
    description:
      "Build real apps using AI tools like Cursor and Copilot. Part 1 gets you shipping; Part 2 goes deeper on prompting and reviewing what the AI writes. This is where coding is headed: fast, creative, and full of purpose.",
    cover: "vibecoding",
    enrol: [
      { href: VIBECODING_COURSE_HREF, label: "Enroll Part 1" },
      { href: VIBECODING_PART_2_COURSE_HREF, label: "Enroll Part 2" },
    ],
    lessonsHref: LEARN_VIBECODING_HREF,
  },
  {
    title: "Intro to Machine Learning",
    tags: ["New", "AI & ML"],
    description:
      "Curious how machines actually learn? Part 1 starts from the ground up with data, models, and your first predictions. Part 2 trains smarter models, dodges the classic beginner pitfalls, and builds projects worth showing off.",
    cover: "ml1",
    enrol: [
      { href: ML_PART_1_COURSE_HREF, label: "Enroll Part 1" },
      { href: ML_PART_2_COURSE_HREF, label: "Enroll Part 2" },
    ],
    lessonsHref: LEARN_ML_HREF,
  },
  {
    title: "Financial Literacy: The Basics",
    tags: ["New", "Life Skills"],
    description:
      "The money skills every student should have: budgeting, saving, credit, and investing, taught simply and without the jargon.",
    cover: "finance",
    enrol: [{ href: FINANCIAL_LITERACY_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    title: "Health in Tech: An Introduction",
    tags: ["New", "Career"],
    description:
      "See where healthcare meets technology, from medical data to digital health careers, and learn how code is already saving lives.",
    cover: "health",
    enrol: [{ href: HEALTH_IN_TECH_COURSE_HREF, label: "Enroll Free" }],
  },
];

export default function CoursesPage() {
  return (
    <PageShell>
      <PageHero
        title="Courses built for the curious"
        description="Real coding skills from student teachers, completely free, forever. Take the full course on Udemy, or work through the interactive lessons right here."
        image={images.codingLaptop}
        imageAlt="Student learning to code on a laptop"
      >
        <a href="#catalog" className="home-btn home-btn-fill">Explore courses</a>
        <Link href={ABOUT_HREF} className="home-btn home-btn-outline">
          Our Story
        </Link>
      </PageHero>

      <PageSection id="catalog" className="scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <Reveal key={course.title} delay={(index % 2) * 0.08}>
              <article className="home-card home-lift overflow-hidden rounded-[20px]">
                <TopicCover
                  variant={course.cover}
                  className="aspect-[16/9] w-full"
                />
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-xl md:text-2xl">{course.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                    {course.description}
                  </p>
                  {/* Lessons lead where they exist — they are ours and they
                      are one click away, where enrolling leaves the site. The
                      enrolments carry the violet either way, so the button that
                      hands the reader to Udemy looks the same on every card. */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.lessonsHref && (
                      <Link
                        href={course.lessonsHref}
                        className="home-btn home-btn-fill"
                      >
                        Interactive Lessons
                      </Link>
                    )}
                    {course.enrol.map((enrol) => (
                      <a
                        key={enrol.href}
                        href={enrol.href}
                        target="_blank"
                        rel="noreferrer"
                        className="home-btn home-btn-violet"
                      >
                        {enrol.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-450)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          See our courses in action
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Students around the world learning Python, building projects, and
          discovering that code can be a tool for good.
        </p>
        <div className="mt-8">
          <PhotoGrid photos={images.gallery.slice(0, 8)} columns={4} />
        </div>
      </PageSection>

      {/* Came across with the lesson tracks when /learn folded in here: the
          contributor funnel used to live on that index and has nowhere else
          to sit. */}
      <ContributeBand />
    </PageShell>
  );
}
