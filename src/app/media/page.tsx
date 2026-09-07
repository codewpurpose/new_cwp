import type { Metadata } from "next";
import { MediaLibrary } from "@/components/media/MediaLibrary";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { getMediaItems } from "@/lib/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Short lessons, student stories, and behind-the-scenes videos from CodeWithPurpose.",
  alternates: { canonical: "/media/" },
  openGraph: {
    title: "Media | CodeWithPurpose",
    description:
      "Short lessons, student stories, and behind-the-scenes videos from CodeWithPurpose.",
    url: "/media/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media | CodeWithPurpose",
    description:
      "Short lessons, student stories, and behind-the-scenes videos from CodeWithPurpose.",
  },
};

export default async function MediaPage() {
  const items = await getMediaItems();

  return (
    <PageShell>
      <PageHero
        title="What we&apos;re making, in motion"
        description="Short lessons, student stories, and the work happening behind free coding education. Watch on the site or follow the original post to join the conversation."
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--home-hairline-strong)] bg-[var(--home-white)]/80 px-3.5 py-2 text-sm text-[var(--home-ink-soft)] shadow-[var(--home-shadow-sm)]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--home-fern)]"
          />
          {items.length === 0
            ? "The first videos are on the way"
            : `${items.length} ${items.length === 1 ? "video" : "videos"} to explore`}
        </div>
      </PageHero>
      <PageSection>
        <div className="mb-8 flex flex-col gap-4 border-b border-[var(--home-hairline)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">The collection</h2>
            <p className="mt-2 max-w-2xl text-[var(--home-ink-soft)]">
              Start with a lesson, stay for a student story, or see what we&apos;re
              building next.
            </p>
          </div>
          <p className="text-sm text-[var(--home-ink-quiet)]">
            {items.length === 0 ? "No videos published yet" : "Newest first"}
          </p>
        </div>
        <MediaLibrary items={items} />
      </PageSection>
    </PageShell>
  );
}
