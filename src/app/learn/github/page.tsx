import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { GithubLessonCover } from "@/components/github/GithubLessonCover";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { CtaBand } from "@/components/learn/cards/CtaBand";
import { CourseHome } from "@/components/learn/space/CourseHome";
import { LearnSpaceShell } from "@/components/learn/space/LearnSpaceShell";
import { COURSES_HREF, GITHUB_COURSE_HREF, LEARN_PYTHON_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Git and GitHub",
  description:
    "Free interactive Git and GitHub lessons from CodeWithPurpose. Twenty-one chapters from your first commit through branches, merge conflicts, rebasing, pull requests, code review, and open-source contribution.",
  alternates: { canonical: "/learn/github/" },
};

export default function LearnGithubPage() {
  return (
    <>
      <JsonLd data={courseJsonLd({ name: String(metadata.title), description: String(metadata.description), path: "/learn/github/" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses/" }, { name: String(metadata.title), path: "/learn/github/" }])} />
      <LearnSpaceShell track="github">
        <CourseHome
          track="github"
          title="Git and GitHub, from your first commit to your first open-source pull request"
          description="CodeWithPurpose lessons that teach the tool and the platform as one subject. Commits, branches, conflicts, rebasing, pull requests, code review, Actions, and contributing to somebody else's project."
          udemy={{ href: GITHUB_COURSE_HREF, label: "Udemy GitHub Course" }}
          chapterMedia={(chapter) => <GithubLessonCover slug={chapter.slug} />}
        />

        <ContributeBand noun="chapter" />

        <CtaBand
          title="Every project you build from here lives in a repository"
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
