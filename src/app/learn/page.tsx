import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TopicCover, type TopicCoverVariant } from "@/components/TopicCover";
import { images } from "@/lib/images";
import {
  COURSES_HREF,
  LEARN_ML_HREF,
  LEARN_VIBECODING_HREF,
  ML_PART_1_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Learn | CWP",
  description:
    "Start with Vibe Coding or Machine Learning. Free tracks from student teachers, built for beginners.",
};

interface LearnTrack {
  title: string;
  tags: string[];
  description: string;
  cover: TopicCoverVariant;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const tracks: LearnTrack[] = [
  {
    title: "Vibe Coding",
    tags: ["Creative", "AI-Powered", "Interactive"],
    description:
      "Build real apps using AI tools like Cursor and Copilot. Explore animated, interactive lessons on prompting, pairing with AI, debugging, and shipping.",
    cover: "vibecoding",
    primaryHref: LEARN_VIBECODING_HREF,
    primaryLabel: "Explore Vibe Coding Lessons",
    primaryExternal: false,
    secondaryHref: VIBECODING_COURSE_HREF,
    secondaryLabel: "Udemy Course",
  },
  {
    title: "ML",
    tags: ["AI & ML", "Interactive"],
    description:
      "Explore machine learning through interactive visual lessons — from train/test splits to decision trees and beyond. Play with live demos and build intuition before you code.",
    cover: "ml1",
    primaryHref: LEARN_ML_HREF,
    primaryLabel: "Explore ML Lessons",
    primaryExternal: false,
    secondaryHref: ML_PART_1_COURSE_HREF,
    secondaryLabel: "Udemy Course",
  },
];

export default function LearnPage() {
  return (
    <PageShell>
      <PageHero
        title="Pick your path"
        description="Two focused tracks to start building real skills today. Completely free, taught by students who were in your shoes not long ago."
        image={images.codingLaptop}
        imageAlt="Student learning to code"
      >
        <Link href={LEARN_ML_HREF} className="home-btn home-btn-fill">Explore courses</Link>
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse All Courses
        </Link>
      </PageHero>

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map((track, index) => (
            <Reveal key={track.title} delay={index * 0.08}>
              <article className="home-card home-lift flex h-full flex-col overflow-hidden rounded-[20px]">
                <TopicCover
                  variant={track.cover}
                  className="aspect-[16/9] w-full"
                />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#dbefdb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1e3c2c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-xl md:text-2xl">{track.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-[#636363]">
                    {track.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {track.primaryExternal !== false ? (
                      <a
                        href={track.primaryHref}
                        target="_blank"
                        rel="noreferrer"
                        className="home-btn home-btn-fill"
                      >
                        {track.primaryLabel}
                      </a>
                    ) : (
                      <Link
                        href={track.primaryHref}
                        className="home-btn home-btn-fill"
                      >
                        {track.primaryLabel}
                      </Link>
                    )}
                    {track.secondaryHref && track.secondaryLabel && (
                      <a
                        href={track.secondaryHref}
                        target="_blank"
                        rel="noreferrer"
                        className="home-btn home-btn-outline"
                      >
                        {track.secondaryLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
