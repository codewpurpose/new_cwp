import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { DebuggingLesson } from "@/components/vibecoding/DebuggingLesson";
import { IntroLesson } from "@/components/vibecoding/IntroLesson";
import { LoopLesson } from "@/components/vibecoding/LoopLesson";
import { PromptsLesson } from "@/components/vibecoding/PromptsLesson";
import { ShippingLesson } from "@/components/vibecoding/ShippingLesson";
import { images } from "@/lib/images";
import { COURSES_HREF, LEARN_VIBECODING_HREF } from "@/lib/links";
import { VIBECODING_LESSONS } from "@/lib/vibecoding-lessons";

const LESSON_BODIES: Record<string, () => React.ReactElement> = {
  intro: IntroLesson,
  prompts: PromptsLesson,
  loop: LoopLesson,
  debugging: DebuggingLesson,
  shipping: ShippingLesson,
};

export function generateStaticParams() {
  return VIBECODING_LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = VIBECODING_LESSONS.find((item) => item.slug === slug);
  if (!lesson) return { title: "Vibe Coding | CWP" };
  return {
    title: `${lesson.title} | CWP`,
    description: lesson.description,
  };
}

export default async function VibecodingLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = VIBECODING_LESSONS.find((item) => item.slug === slug);
  const LessonBody = LESSON_BODIES[slug];
  if (!lesson || !LessonBody) notFound();

  const index = VIBECODING_LESSONS.findIndex((item) => item.slug === slug);
  const next = VIBECODING_LESSONS[(index + 1) % VIBECODING_LESSONS.length];

  return (
    <PageShell>
      <PageHero
        title={lesson.title}
        description={lesson.description}
        image={images.codingLaptop}
        imageAlt="Student vibe coding with AI tools"
      >
        <Link href={LEARN_VIBECODING_HREF} className="home-btn home-btn-outline">
          All Vibe Coding Lessons
        </Link>
      </PageHero>

      <PageSection>
        <LessonBody />
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[#1e3c2c]">
        <div className="mx-auto max-w-3xl text-center text-[#dbefdb]">
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]">
            Keep going
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] opacity-90">
            Next up: {next.title}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href={`${LEARN_VIBECODING_HREF}/${next.slug}/`}
              className="home-btn home-btn-fill !border-[#dbefdb] !bg-[#dbefdb] !text-[#1e3c2c]"
            >
              Next lesson
            </Link>
            <Link href={COURSES_HREF} className="home-btn home-btn-outline !border-[#dbefdb] !text-[#dbefdb]">
              Browse All Courses
            </Link>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
