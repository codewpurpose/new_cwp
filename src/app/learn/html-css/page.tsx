import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { HtmlCssLessonCover } from "@/components/html-css/HtmlCssLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, HTML_CSS_COURSE_HREF, LEARN_GITHUB_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "HTML and CSS",
  description:
    "Free interactive HTML and CSS lessons from CodeWithPurpose. Twenty-four chapters from your first file through semantic markup, the cascade, the box model, flexbox, grid, and a real page you publish.",
  alternates: { canonical: "/learn/html-css/" },
};

export default function LearnHtmlCssPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/html-css/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/html-css/" }])} />
      <LearnSpaceShell track="html-css">
        <CourseHome
          track="html-css"
          title="HTML and CSS, from one file to a page you can send someone"
          description="CodeWithPurpose lessons that build one real page by hand and explain the browser underneath it. Twenty-four chapters: elements, semantic markup, the cascade, the box model, flexbox, grid, accessibility, and publishing. No framework, no build step."
          udemy={{ href: HTML_CSS_COURSE_HREF, label: "Udemy HTML & CSS Course" }}
          chapterMedia={(chapter) => <HtmlCssLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="The first thing you build is a page somebody can open"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
            { href: LEARN_GITHUB_HREF, label: "Then Publish It With Git", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
