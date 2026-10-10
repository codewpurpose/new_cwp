/**
 * The course catalogue's data, and the per-track figures both the catalogue
 * and the learning space draw.
 *
 * Server-only in practice: it reads `learn-nav`, which carries every chapter of
 * every track. Client components receive the flattened shapes below
 * (`TrackStats`, `OutlineChapter[]`) as props, never this module.
 *
 * Every number here is counted from the published lesson graph. Nothing is
 * typed in by hand, so a chapter added to a track shows up on its card, its
 * course home and the switcher without anyone editing a figure.
 */

import type { TopicCoverVariant } from "@/components/TopicCover";
import { getChapters, getPartsWithChapters } from "@/lib/learn-nav";
import { TRACK_ROUTES } from "@/lib/learn-routes";
import type { LearnLevel, LearnTrackId } from "@/lib/learn-types";
import {
  COMPUTER_VISION_COURSE_HREF,
  FINANCIAL_LITERACY_COURSE_HREF,
  GITHUB_COURSE_HREF,
  HEALTH_IN_TECH_COURSE_HREF,
  HTML_CSS_COURSE_HREF,
  ML_PART_1_COURSE_HREF,
  ML_PART_2_COURSE_HREF,
  PYTHON_COURSE_HREF,
  PYTHON_PART_2_COURSE_HREF,
  ROBLOX_COURSE_HREF,
  VIBECODING_COURSE_HREF,
  VIBECODING_PART_2_COURSE_HREF,
} from "@/lib/links";

/**
 * Topic groups for the catalogue's filter. They follow the tags each course
 * already carries ("AI & ML", "AI-Powered", "Life Skills", "Career", "Game
 * Dev", "Essential"), so a course lands where its own card already says it
 * belongs.
 */
export const TOPICS = [
  { id: "code", label: "Code & the web" },
  { id: "ai", label: "AI & ML" },
  { id: "life", label: "Life & career" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export interface Enrolment {
  href: string;
  label: string;
}

export interface CatalogCourse {
  track: LearnTrackId;
  title: string;
  tags: string[];
  description: string;
  cover: TopicCoverVariant;
  topic: TopicId;
  /**
   * Udemy enrolments. A subject taught in two parts is one card with two
   * buttons rather than two cards: split across cards, the pair repeated the
   * same art, tags and half the description, and read as unrelated courses
   * rather than as one course with a second half.
   */
  enrol: Enrolment[];
}

export const CATALOG: CatalogCourse[] = [
  {
    track: "python",
    title: "Python for Complete Beginners",
    tags: ["Beginner", "Most Popular"],
    description:
      "Zero experience? Perfect. Part 1 takes you from nothing to building real projects, just like 800+ students across 50+ countries already have. Part 2 goes deeper on the data structures real programs are built from: advanced lists, nested data, and the errors messy data actually throws.",
    cover: "python",
    topic: "code",
    enrol: [
      { href: PYTHON_COURSE_HREF, label: "Enroll Part 1" },
      { href: PYTHON_PART_2_COURSE_HREF, label: "Enroll Part 2" },
    ],
  },
  {
    track: "html-css",
    title: "Master HTML and CSS",
    tags: ["New", "Start Here"],
    description:
      "The two languages every website is made of, and the fastest thing in programming to see working — save a file, refresh, it changed. Twenty-four chapters take you from your first line of markup through semantic HTML, the cascade, the box model, flexbox and grid, to a real page you build by hand and publish. No framework, no build step.",
    cover: "htmlcss",
    topic: "code",
    enrol: [{ href: HTML_CSS_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    track: "github",
    title: "Learn Git and GitHub",
    tags: ["New", "Essential"],
    description:
      "The tool every developer uses every day, and the platform every project lives on. Twenty-one chapters take you from your first commit through branches, merge conflicts, and rebasing, to pull requests, code review, and your first contribution to somebody else's open-source project.",
    cover: "github",
    topic: "code",
    enrol: [{ href: GITHUB_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    track: "roblox",
    title: "Master Roblox Studio",
    tags: ["New", "Game Dev"],
    description:
      "Build a real obby and publish it, so other people can actually play what you made. You'll write Luau for lasers, disappearing platforms, and one-way floors — and learn why each of them breaks the moment a second player joins.",
    cover: "roblox",
    topic: "code",
    enrol: [{ href: ROBLOX_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    track: "vibecoding",
    title: "Vibecoding 101",
    tags: ["Creative", "AI-Powered"],
    description:
      "Build real apps using AI tools like Cursor and Copilot. Part 1 gets you shipping; Part 2 goes deeper on prompting and reviewing what the AI writes. This is where coding is headed: fast, creative, and full of purpose.",
    cover: "vibecoding",
    topic: "ai",
    enrol: [
      { href: VIBECODING_COURSE_HREF, label: "Enroll Part 1" },
      { href: VIBECODING_PART_2_COURSE_HREF, label: "Enroll Part 2" },
    ],
  },
  {
    track: "ml",
    title: "Intro to Machine Learning",
    tags: ["New", "AI & ML"],
    description:
      "Learn how machines learn from data, build your first predictions, and train models that avoid common beginner mistakes. Part 2 adds projects you can explain and test.",
    cover: "ml1",
    topic: "ai",
    enrol: [
      { href: ML_PART_1_COURSE_HREF, label: "Enroll Part 1" },
      { href: ML_PART_2_COURSE_HREF, label: "Enroll Part 2" },
    ],
  },
  {
    track: "financial-literacy",
    title: "Financial Literacy: The Basics",
    tags: ["New", "Life Skills"],
    description:
      "The money skills every student should have: budgeting, saving, credit, and investing, taught simply and without the jargon.",
    cover: "finance",
    topic: "life",
    enrol: [{ href: FINANCIAL_LITERACY_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    track: "health-in-tech",
    title: "Health in Tech: An Introduction",
    tags: ["New", "Career"],
    description:
      "Learn how technology is used with medical data, digital health services, and healthcare careers.",
    cover: "health",
    topic: "life",
    enrol: [{ href: HEALTH_IN_TECH_COURSE_HREF, label: "Enroll Free" }],
  },
  {
    track: "computer-vision",
    title: "Computer Vision in 30 Minutes",
    tags: ["New", "AI & ML"],
    description:
      "Learn how models use pixels and edges to classify images and detect objects. The course covers ideas used in tools such as face unlock and driver-assistance systems.",
    cover: "computervision",
    topic: "ai",
    enrol: [{ href: COMPUTER_VISION_COURSE_HREF, label: "Enroll Free" }],
  },
];

export function getCatalogCourse(track: LearnTrackId): CatalogCourse {
  const course = CATALOG.find((entry) => entry.track === track);
  if (!course) throw new Error(`No catalogue entry for track "${track}"`);
  return course;
}

/** One chapter, reduced to what progress UI needs on the client. */
export interface OutlineChapter {
  slug: string;
  title: string;
}

export interface TrackStats {
  chapters: number;
  parts: number;
  minutes: number;
  levels: Record<LearnLevel, number>;
}

export function getTrackStats(track: LearnTrackId): TrackStats {
  const chapters = getChapters(track);
  const levels: Record<LearnLevel, number> = { beginner: 0, intermediate: 0, advanced: 0 };
  let minutes = 0;
  for (const chapter of chapters) {
    levels[chapter.level] += 1;
    minutes += chapter.minutes;
  }
  return {
    chapters: chapters.length,
    parts: getPartsWithChapters(track).length,
    minutes,
    levels,
  };
}

/** Published chapters in reading order — the order LessonGate unlocks them in. */
export function getTrackOutline(track: LearnTrackId): OutlineChapter[] {
  return getChapters(track).map((chapter) => ({ slug: chapter.slug, title: chapter.title }));
}

export interface SwitcherCourse {
  track: LearnTrackId;
  title: string;
  href: string;
  chapterSlugs: string[];
}

/** The learning space's course switcher: every on-site track, catalogue order. */
export function getSwitcherCourses(): SwitcherCourse[] {
  return CATALOG.map((course) => ({
    track: course.track,
    title: TRACK_ROUTES[course.track].title,
    href: TRACK_ROUTES[course.track].href,
    chapterSlugs: getChapters(course.track).map((chapter) => chapter.slug),
  }));
}

/** "About 6 hours" from a minute total. Rounded, because it is an estimate. */
export function formatDuration(minutes: number): string {
  if (minutes < 90) return `${Math.max(1, Math.round(minutes / 5) * 5)} min`;
  const hours = Math.round(minutes / 30) / 2;
  return `${hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1)} hours`;
}
