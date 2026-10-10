import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { FinancialLiteracyLessonCover } from "@/components/financial-literacy/FinancialLiteracyLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, FINANCIAL_LITERACY_COURSE_HREF, LEARN_HEALTH_IN_TECH_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Financial Literacy",
  description:
    "Free interactive financial literacy lessons from CodeWithPurpose, running from your first budget through investing, taxes, and retirement accounts.",
  alternates: { canonical: "/learn/financial-literacy/" },
};

export default function LearnFinancialLiteracyPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/financial-literacy/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/financial-literacy/" }])} />
      <LearnSpaceShell track="financial-literacy">
        <CourseHome
          track="financial-literacy"
          title="Money skills, from your first budget to your first plan"
          description="CodeWithPurpose lessons that turn personal finance into a set of skills you actually use, not jargon you look up. Twenty-four chapters, no experience required."
          udemy={{ href: FINANCIAL_LITERACY_COURSE_HREF, label: "Udemy Financial Literacy Course" }}
          chapterMedia={(chapter) => <FinancialLiteracyLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="Keep building your money skills"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
            { href: LEARN_HEALTH_IN_TECH_HREF, label: "Try Health in Tech", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
