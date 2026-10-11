import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { RobloxLessonCover } from "@/components/roblox/RobloxLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, LEARN_PYTHON_HREF, ROBLOX_COURSE_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Roblox Studio",
  description:
    "Free interactive Roblox Studio lessons from CodeWithPurpose. Build a working obby in Luau, from your first part through killbricks, debounce, and publishing.",
  alternates: { canonical: "/learn/roblox/" },
};

export default function LearnRobloxPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/roblox/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/roblox/" }])} />
      <LearnSpaceShell track="roblox">
        <CourseHome
          track="roblox"
          title="Roblox Studio, from a blank baseplate to a published obby"
          description="CodeWithPurpose lessons that build one real obstacle course in Luau, and explain the engine underneath it as you go. Studio is free."
          udemy={{ href: ROBLOX_COURSE_HREF, label: "Udemy Roblox Course" }}
          chapterMedia={(chapter) => <RobloxLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="Keep building things people can play"
          body="These lessons are part of CodeWithPurpose's free learning library, built by students, for students, everywhere."
          actions={[
            { href: COURSES_HREF, label: "Browse All Courses", variant: "primary" },
            { href: LEARN_PYTHON_HREF, label: "Try Python", variant: "secondary" },
          ]}
        />
      </LearnSpaceShell>
    </>
  );
}
