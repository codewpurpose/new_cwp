import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover, type TopicCoverVariant } from "@/components/TopicCover";
import { WaitlistButton } from "@/components/WaitlistButton";
import { images } from "@/lib/images";
import {
  ABOUT_HREF,
  FINANCIAL_LITERACY_COURSE_HREF,
  HEALTH_IN_TECH_COURSE_HREF,
  ML_PART_1_COURSE_HREF,
  ML_PART_2_COURSE_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Courses | CWP",
  description:
    "Free courses for students worldwide. Python, Vibecoding, Machine Learning, Financial Literacy, and Health in Tech.",
};

interface Course {
  title: string;
  tags: string[];
  description: string;
  href: string;
  cover: TopicCoverVariant;
}

const courses: Course[] = [
  {
    title: "Python for Complete Beginners",
    tags: ["Beginner", "Most Popular"],
    description:
      "Zero experience? Perfect. You'll go from nothing to building real projects, just like 800+ students across 50+ countries already have.",
    cover: "python",
    href: PYTHON_COURSE_HREF,
  },
  {
    title: "Vibecoding 101",
    tags: ["Creative", "AI-Powered"],
    description:
      "Build real apps using AI tools like Cursor and Copilot. This is where coding is headed: fast, creative, and full of purpose.",
    cover: "vibecoding",
    href: VIBECODING_COURSE_HREF,
  },
  {
    title: "Intro to Machine Learning: Part 1",
    tags: ["New", "AI & ML"],
    description:
      "Curious how machines actually learn? Start from the ground up with data, models, and your first predictions, all explained in plain English.",
    cover: "ml1",
    href: ML_PART_1_COURSE_HREF,
  },
  {
    title: "Intro to Machine Learning: Part 2",
    tags: ["New", "AI & ML"],
    description:
      "Pick up right where Part 1 left off. Train smarter models, dodge the classic beginner pitfalls, and build projects worth showing off.",
    cover: "ml2",
    href: ML_PART_2_COURSE_HREF,
  },
  {
    title: "Financial Literacy: The Basics",
    tags: ["New", "Life Skills"],
    description:
      "The money skills every student should have: budgeting, saving, credit, and investing, taught simply and without the jargon.",
    cover: "finance",
    href: FINANCIAL_LITERACY_COURSE_HREF,
  },
  {
    title: "Health in Tech: An Introduction",
    tags: ["New", "Career"],
    description:
      "See where healthcare meets technology, from medical data to digital health careers, and learn how code is already saving lives.",
    cover: "health",
    href: HEALTH_IN_TECH_COURSE_HREF,
  },
];

export default function CoursesPage() {
  return (
    <PageShell>
      <PageHero
        title="Courses built for the curious"
        description="Real coding skills from student teachers, completely free, forever. Enroll and start learning today."
        image={images.codingLaptop}
        imageAlt="Student learning to code on a laptop"
      >
        <WaitlistButton location="courses_hero" className="home-btn home-btn-fill">
          Start Learning Free
        </WaitlistButton>
        <Link href={ABOUT_HREF} className="home-btn home-btn-outline">
          Our Story
        </Link>
      </PageHero>

      <PageSection>
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
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                    {course.description}
                  </p>
                  <a
                    href={course.href}
                    target="_blank"
                    rel="noreferrer"
                    className="home-btn home-btn-fill mt-6"
                  >
                    Enroll Free
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-grey-450)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          See our courses in action
        </h2>
        <p className="mt-3 max-w-2xl text-[#636363]">
          Students around the world learning Python, building projects, and
          discovering that code can be a tool for good.
        </p>
        <div className="mt-8">
          <PhotoGrid photos={images.gallery.slice(0, 8)} columns={4} />
        </div>
      </PageSection>
    </PageShell>
  );
}
