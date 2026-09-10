import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { CommitsLeaderboard } from "@/components/leaderboard/CommitsLeaderboard";
import { LeaderboardExplainer } from "@/components/leaderboard/LeaderboardExplainer";
import { images } from "@/lib/images";
import { LEADERBOARD_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Commits Leaderboard",
  description:
    "Link your GitHub account and see how CodeWithPurpose students stack up by total GitHub commits.",
  alternates: { canonical: "/leaderboard/commits/" },
  robots: { index: false, follow: true },
};

export default function CommitsLeaderboardPage() {
  return (
    <PageShell>
      <PageHero
        title="The commits leaderboard"
        description="See GitHub commit history on its own board. It is separate from course XP and does not change your level or lesson progress."
        image={images.codingLaptop}
        imageAlt="Students comparing their GitHub commit history"
      >
        <Link href={LEADERBOARD_HREF} className="home-btn home-btn-outline">
          XP Leaderboard
        </Link>
      </PageHero>

      <PageSection>
        <LeaderboardExplainer current="commits" />
        <CommitsLeaderboard />
      </PageSection>
    </PageShell>
  );
}
