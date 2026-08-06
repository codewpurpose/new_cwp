import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnChapterHeader } from "@/components/learn/shell/LearnChapterHeader";
import { LearnMobileBar } from "@/components/learn/shell/LearnMobileBar";
import { LessonQuiz } from "@/components/learn/shell/LessonQuiz";
import { LessonGate } from "@/components/learn/shell/LessonGate";
import { getQuiz } from "@/lib/quiz";
import { LearnShell } from "@/components/learn/shell/LearnShell";
import { LearnToc } from "@/components/learn/shell/LearnToc";
import { WhatIsPythonLesson } from "@/components/python/WhatIsPythonLesson";
import { SettingUpLesson } from "@/components/python/SettingUpLesson";
import { VariablesLesson } from "@/components/python/VariablesLesson";
import { NumbersAndOperatorsLesson } from "@/components/python/NumbersAndOperatorsLesson";
import { StringsLesson } from "@/components/python/StringsLesson";
import { ListsAndTuplesLesson } from "@/components/python/ListsAndTuplesLesson";
import { DictionariesLesson } from "@/components/python/DictionariesLesson";
import { SetsAndTruthinessLesson } from "@/components/python/SetsAndTruthinessLesson";
import { ConditionalsLesson } from "@/components/python/ConditionalsLesson";
import { LoopsLesson } from "@/components/python/LoopsLesson";
import { FunctionsLesson } from "@/components/python/FunctionsLesson";
import { ScopeAndArgumentsLesson } from "@/components/python/ScopeAndArgumentsLesson";
import { ErrorsLesson } from "@/components/python/ErrorsLesson";
import { ModulesAndPackagesLesson } from "@/components/python/ModulesAndPackagesLesson";
import { ClassesAndObjectsLesson } from "@/components/python/ClassesAndObjectsLesson";
import { InheritanceLesson } from "@/components/python/InheritanceLesson";
import { FilesAndPathsLesson } from "@/components/python/FilesAndPathsLesson";
import { ComprehensionsLesson } from "@/components/python/ComprehensionsLesson";
import { IteratorsAndGeneratorsLesson } from "@/components/python/IteratorsAndGeneratorsLesson";
import { DecoratorsLesson } from "@/components/python/DecoratorsLesson";
import { WorkingWithLibrariesLesson } from "@/components/python/WorkingWithLibrariesLesson";
import { JsonAndApisLesson } from "@/components/python/JsonAndApisLesson";
import { TestingYourCodeLesson } from "@/components/python/TestingYourCodeLesson";
import { FinalProjectLesson } from "@/components/python/FinalProjectLesson";
import { COURSES_HREF } from "@/lib/links";
import { getAdjacent, getChapter, getChapters, getPositionLabel } from "@/lib/learn-nav";

const TRACK = "python" as const;

/**
 * Every published lesson needs an entry here. The build validator fails if a
 * published slug is missing one.
 */
const PYTHON_LESSON_BODIES: Record<string, () => React.ReactElement> = {
  "what-is-python": WhatIsPythonLesson,
  "setting-up": SettingUpLesson,
  variables: VariablesLesson,
  "numbers-and-operators": NumbersAndOperatorsLesson,
  strings: StringsLesson,
  "lists-and-tuples": ListsAndTuplesLesson,
  dictionaries: DictionariesLesson,
  "sets-and-truthiness": SetsAndTruthinessLesson,
  conditionals: ConditionalsLesson,
  loops: LoopsLesson,
  functions: FunctionsLesson,
  "scope-and-arguments": ScopeAndArgumentsLesson,
  errors: ErrorsLesson,
  "modules-and-packages": ModulesAndPackagesLesson,
  "classes-and-objects": ClassesAndObjectsLesson,
  inheritance: InheritanceLesson,
  "files-and-paths": FilesAndPathsLesson,
  comprehensions: ComprehensionsLesson,
  "iterators-and-generators": IteratorsAndGeneratorsLesson,
  decorators: DecoratorsLesson,
  "working-with-libraries": WorkingWithLibrariesLesson,
  "json-and-apis": JsonAndApisLesson,
  "testing-your-code": TestingYourCodeLesson,
  "final-project": FinalProjectLesson,
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
  if (!chapter) return { title: "Python" };
  return {
    title: chapter.title,
    description: chapter.description,
    alternates: { canonical: `/learn/python/${slug}/` },
  };
}

export default async function PythonLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(TRACK, slug);
  const LessonBody = chapter ? PYTHON_LESSON_BODIES[slug] : undefined;
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
