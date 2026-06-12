import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { WaitlistButton } from "@/components/WaitlistButton";
import { images } from "@/lib/images";
import {
  ABOUT_HREF,
  CONTACT_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Courses — CodeWithPurpose",
  description:
    "Free coding courses for students worldwide. Python for Complete Beginners and Vibecoding 101.",
};

const courses = [
  {
    title: "Python for Complete Beginners",
    tags: ["Beginner", "Most Popular"],
    description:
      "Zero experience? Perfect. Go from nothing to building real projects — loved by 800+ students across 50+ countries.",
    image: images.pythonCourse,
    href: PYTHON_COURSE_HREF,
  },
  {
    title: "Vibecoding 101",
    tags: ["Creative", "AI-Powered"],
    description:
      "Build real apps using AI tools like Cursor and Copilot. The future of coding — learn to build fast, creatively, and with purpose.",
    image: images.vibecodingCourse,
    href: VIBECODING_COURSE_HREF,
  },
];

export default function CoursesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Courses"
        title="Courses built for the curious"
        description="Real coding skills from student teachers — completely free, forever. Enroll and start learning today."
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
          {courses.map((course) => (
            <article
              key={course.title}
              className="home-card home-lift overflow-hidden rounded-[20px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.image}
                alt={course.title}
                className="aspect-[16/9] w-full object-cover"
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
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[#e1e1e1] bg-[#ececec]">
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
