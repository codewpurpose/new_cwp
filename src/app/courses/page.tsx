import type { Metadata } from "next";
import { ContributeBand } from "@/components/learn/cards/ContributeBand";
import { PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { TopicCover } from "@/components/TopicCover";
import { CourseCatalog, type CatalogItem } from "@/components/courses/CourseCatalog";
import { CoursesHero } from "@/components/courses/CoursesHero";
import {
  CATALOG,
  TOPICS,
  formatDuration,
  getTrackOutline,
  getTrackStats,
} from "@/components/courses/catalog";
import { images } from "@/lib/images";
import { TRACK_ROUTES } from "@/lib/learn-routes";

export const metadata: Metadata = {
  title: "Free Coding Courses",
  description:
    "Free courses and interactive lessons for students worldwide. Python, Vibecoding, Machine Learning, Financial Literacy, and Health in Tech.",
  alternates: { canonical: "/courses/" },
  openGraph: {
    title: "Free Coding Courses | CodeWithPurpose",
    description:
      "Free courses and interactive lessons for students worldwide. Python, Vibecoding, Machine Learning, Financial Literacy, and Health in Tech.",
    url: "/courses/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Coding Courses | CodeWithPurpose",
    description:
      "Free courses and interactive lessons for students worldwide. Python, Vibecoding, Machine Learning, Financial Literacy, and Health in Tech.",
  },
};

export default function CoursesPage() {
  // Lessons lead on every card — they are ours and one click away, where
  // enrolling leaves the site. Every figure below is counted, not typed.
  const items: CatalogItem[] = CATALOG.map((course) => {
    const stats = getTrackStats(course.track);
    return {
      track: course.track,
      title: course.title,
      tags: course.tags,
      description: course.description,
      topic: course.topic,
      topicLabel: TOPICS.find((topic) => topic.id === course.topic)?.label ?? "",
      enrol: course.enrol,
      href: TRACK_ROUTES[course.track].href,
      stats,
      duration: formatDuration(stats.minutes),
      outline: getTrackOutline(course.track),
      cover: <TopicCover variant={course.cover} />,
    };
  });

  const totalChapters = items.reduce((sum, item) => sum + item.stats.chapters, 0);
  const totalEnrolments = CATALOG.reduce((sum, course) => sum + course.enrol.length, 0);
  // Suggested to newcomers by the courses' own tags, not by a hand-picked list.
  const startHere = CATALOG.filter((course) =>
    course.tags.some((tag) => tag === "Start Here" || tag === "Beginner" || tag === "Essential"),
  ).map((course) => course.track);

  return (
    <PageShell>
      <CoursesHero
        courses={items.length}
        chapters={totalChapters}
        enrolments={totalEnrolments}
        fan={["htmlcss", "python", "ml1"]}
      />

      <PageSection id="catalog" className="scroll-mt-24">
        <CourseCatalog items={items} topics={TOPICS} startHere={startHere} />
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)] bg-[var(--home-grey-450)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          See our courses in action
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Students around the world learning Python, building projects, and
          discovering that code can be a tool for good.
        </p>
        <div className="mt-8">
          <PhotoGrid photos={images.gallery.slice(0, 8)} columns={4} />
        </div>
      </PageSection>

      {/* Came across with the lesson tracks when /learn folded in here: the
          contributor funnel used to live on that index and has nowhere else
          to sit. */}
      <ContributeBand />
    </PageShell>
  );
}
