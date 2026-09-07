import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { CommitsLeaderboard } from "@/components/leaderboard/CommitsLeaderboard";
import { images } from "@/lib/images";
import { LEADERBOARD_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Commits Leaderboard",
  description:
    "Link your GitHub account and see how CodeWithPurpose students stack up by real commit history.",
  alternates: { canonical: "/leaderboard/commits/" },
  robots: { index: false, follow: true },
};

export default function CommitsLeaderboardPage() {
  return (
    <PageShell>
      <PageHero
        title="The commits leaderboard"
        description="Link your GitHub account and your lifetime public commits count here — a second board, alongside the XP one, for the code you ship outside the lessons."
        image={images.codingLaptop}
        imageAlt="Students comparing their GitHub commit history"
      >
        <Link href={LEADERBOARD_HREF} className="home-btn home-btn-outline">
          XP Leaderboard
        </Link>
      </PageHero>

      <PageSection>
        <CommitsLeaderboard />
      </PageSection>
    </PageShell>
  );
}
