import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PythonLessonCover } from "@/components/python/PythonLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, LEARN_ML_HREF, PYTHON_COURSE_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Python",
  description:
    "Free interactive Python lessons from CodeWithPurpose, running from your first program through decorators, generators, and shipping tested code.",
  alternates: { canonical: "/learn/python/" },
};

export default function LearnPythonPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/python/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/python/" }])} />
      <LearnSpaceShell track="python">
        <CourseHome
          track="python"
          title="Python, from your first line to your first library"
          description="CodeWithPurpose lessons that turn Python into a language you actually think in, not one you look up. Thirty-one chapters, no setup required."
          udemy={{ href: PYTHON_COURSE_HREF, label: "Udemy Python Course" }}
          chapterMedia={(chapter) => <PythonLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="Keep building your Python practice"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
            { href: LEARN_ML_HREF, label: "Try Machine Learning", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
