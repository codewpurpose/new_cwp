import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  COURSES_HREF,
  LEARN_HREF,
  LEARN_ML_HREF,
  ML_PART_1_COURSE_HREF,
} from "@/lib/links";
import { ML_LESSONS } from "@/lib/ml-lessons";

export const metadata: Metadata = {
  title: "Machine Learning | CWP",
  description:
    "Free interactive machine learning lessons from CodeWithPurpose. Explore train/test splits, decision trees, bias-variance, and more.",
};

export default function LearnMlPage() {
  return (
    <PageShell>
      <PageHero
        title="Machine learning, made visual"
        description="CodeWithPurpose lessons that explain core ML ideas through live demos and clear visuals. Click any topic to explore — no setup required."
        image={images.codingLaptop}
        imageAlt="Student exploring machine learning with CodeWithPurpose"
      >
        <Link href={LEARN_HREF} className="home-btn home-btn-outline">
          All Learning Tracks
        </Link>
        <a
          href={ML_PART_1_COURSE_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Udemy ML Course
        </a>
      </PageHero>

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {ML_LESSONS.map((lesson, index) => (
            <Reveal key={lesson.slug} delay={index * 0.08}>
              <Link
                href={`${LEARN_ML_HREF}/${lesson.slug}/`}
                className="home-card home-lift home-template-row group block overflow-hidden rounded-[20px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lesson.thumbnail}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    {lesson.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-xl md:text-2xl">{lesson.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                    {lesson.description}
                  </p>
                  <p className="home-arrow-link mt-5">
                    Start lesson{" "}
                    <span className="home-row-arrow text-[#397554]">→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[#1e3c2c]">
        <div className="mx-auto max-w-3xl text-center text-[#dbefdb]">
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]">
            Keep building your ML foundation
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] opacity-90">
            These lessons are part of CodeWithPurpose&apos;s free learning
            library — built by students, for students, everywhere.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={COURSES_HREF}
              className="home-btn home-btn-fill !border-[#dbefdb] !bg-[#dbefdb] !text-[#1e3c2c]"
            >
              Browse All Courses
            </Link>
            <Link href={LEARN_HREF} className="home-btn home-btn-outline !border-[#dbefdb] !text-[#dbefdb]">
              Back to Learn
            </Link>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
