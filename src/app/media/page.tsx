import type { Metadata } from "next";
import { MediaGrid } from "@/components/media/MediaCard";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { getMediaItems } from "@/lib/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Short lessons, student stories, and behind-the-scenes videos from CodeWithPurpose.",
  alternates: { canonical: "/media/" },
};

export default function MediaPage() {
  return (
    <PageShell>
      <PageHero
        title="What we&apos;re making, in motion"
        description="Short lessons, student stories, and the work happening behind free coding education. Watch on the site or follow the original post to join the conversation."
      />
      <PageSection>
        <MediaGrid items={getMediaItems()} />
      </PageSection>
    </PageShell>
  );
}
