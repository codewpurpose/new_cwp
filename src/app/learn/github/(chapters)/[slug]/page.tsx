import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhyVersionControlLesson } from "@/components/github/WhyVersionControlLesson";
import { InstallingGitLesson } from "@/components/github/InstallingGitLesson";
import { RepositoriesAndTheThreeTreesLesson } from "@/components/github/RepositoriesAndTheThreeTreesLesson";
import { StagingAndCommittingLesson } from "@/components/github/StagingAndCommittingLesson";
import { ReadingHistoryLesson } from "@/components/github/ReadingHistoryLesson";
import { UndoingThingsLesson } from "@/components/github/UndoingThingsLesson";
import { IgnoringFilesLesson } from "@/components/github/IgnoringFilesLesson";
import { WhatABranchIsLesson } from "@/components/github/WhatABranchIsLesson";
import { MergingBranchesLesson } from "@/components/github/MergingBranchesLesson";
import { MergeConflictsLesson } from "@/components/github/MergeConflictsLesson";
import { RebaseAndHistoryLesson } from "@/components/github/RebaseAndHistoryLesson";
import { RemotesAndPushingLesson } from "@/components/github/RemotesAndPushingLesson";
import { AuthenticationLesson } from "@/components/github/AuthenticationLesson";
import { AnatomyOfARepositoryLesson } from "@/components/github/AnatomyOfARepositoryLesson";
import { IssuesAndTrackingLesson } from "@/components/github/IssuesAndTrackingLesson";
import { OpeningAPullRequestLesson } from "@/components/github/OpeningAPullRequestLesson";
import { ReviewingAPullRequestLesson } from "@/components/github/ReviewingAPullRequestLesson";
import { MergingAPullRequestLesson } from "@/components/github/MergingAPullRequestLesson";
import { ContributingToOpenSourceLesson } from "@/components/github/ContributingToOpenSourceLesson";
import { AutomatingWithActionsLesson } from "@/components/github/AutomatingWithActionsLesson";
import { ChoosingAWorkflowLesson } from "@/components/github/ChoosingAWorkflowLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "github" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const GITHUB_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "why-version-control": WhyVersionControlLesson,
  "installing-git": InstallingGitLesson,
  "repositories-and-the-three-trees": RepositoriesAndTheThreeTreesLesson,
  "staging-and-committing": StagingAndCommittingLesson,
  "reading-history": ReadingHistoryLesson,
  "undoing-things": UndoingThingsLesson,
  "ignoring-files": IgnoringFilesLesson,
  "what-a-branch-is": WhatABranchIsLesson,
  "merging-branches": MergingBranchesLesson,
  "merge-conflicts": MergeConflictsLesson,
  "rebase-and-history": RebaseAndHistoryLesson,
  "remotes-and-pushing": RemotesAndPushingLesson,
  authentication: AuthenticationLesson,
  "anatomy-of-a-repository": AnatomyOfARepositoryLesson,
  "issues-and-tracking": IssuesAndTrackingLesson,
  "opening-a-pull-request": OpeningAPullRequestLesson,
  "reviewing-a-pull-request": ReviewingAPullRequestLesson,
  "merging-a-pull-request": MergingAPullRequestLesson,
  "contributing-to-open-source": ContributingToOpenSourceLesson,
  "automating-with-actions": AutomatingWithActionsLesson,
  "choosing-a-workflow": ChoosingAWorkflowLesson,
};

export function generateStaticParams() {
  return getChapters(TRACK).map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  if (!chapter) return { title: "Git and GitHub" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/github/${slug}/` },
  };
}

export default async function GithubLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? GITHUB_LESSON_BODIES[slug] : undefined;
  if (!chapter || !LessonBody) notFound();

  const { prev, next } = getAdjacent(TRACK, slug);

  return (
    <LearnShell
      track={TRACK}
      aside={<LearnToc headings={chapter.headings} />}
      mobileBar={<LearnMobileBar track={TRACK} label={getPositionLabel(TRACK, slug)} />}
    >
      <LearnChapterHeader track={TRACK} chapter={chapter} />

      <LessonGate
        key={slug}
        track={TRACK}
        slug={slug}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
      >
        <div className="learn-prose mt-10">
          <LessonBody />
        </div>

        <LessonQuiz
          track={TRACK}
          slug={slug}
          quiz={getQuiz(TRACK, slug)}
          prev={prev ? { slug: prev.slug, title: prev.title } : null}
          next={next ? { slug: next.slug, title: next.title } : null}
          endHref={COURSES_HREF}
        />
      </LessonGate>
    </LearnShell>
  );
}
