import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { HealthInTechLessonCover } from "@/components/health-in-tech/HealthInTechLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, HEALTH_IN_TECH_COURSE_HREF, LEARN_FINANCIAL_LITERACY_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Health in Tech",
  description:
    "Free interactive Health in Tech lessons from CodeWithPurpose, running from what health tech actually is through AI diagnosis bias, cybersecurity, and where it's headed.",
  alternates: { canonical: "/learn/health-in-tech/" },
};

export default function LearnHealthInTechPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/health-in-tech/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/health-in-tech/" }])} />
      <LearnSpaceShell track="health-in-tech">
        <CourseHome
          track="health-in-tech"
          title="Where healthcare meets technology, chapter by chapter"
          description="CodeWithPurpose lessons that turn health tech into a subject you actually understand, not headlines you half-follow. Twenty-four chapters, no medical or coding background required."
          udemy={{ href: HEALTH_IN_TECH_COURSE_HREF, label: "Udemy Health in Tech Course" }}
          chapterMedia={(chapter) => <HealthInTechLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="Keep exploring health tech"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
            { href: LEARN_FINANCIAL_LITERACY_HREF, label: "Try Financial Literacy", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
