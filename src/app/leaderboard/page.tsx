import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { LeaderboardExplainer } from "@/components/leaderboard/LeaderboardExplainer";
import { images } from "@/lib/images";
import { COMMITS_LEADERBOARD_HREF, COURSES_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See how CodeWithPurpose students stack up. Earn XP by completing lessons and climb the ranks.",
  alternates: { canonical: "/leaderboard/" },
  robots: { index: false, follow: true },
};

export default function LeaderboardPage() {
  return (
    <PageShell>
      <PageHero
        title="The leaderboard"
        description="Pass lesson quick checks to earn XP and see how learners stack up — a little friendly competition, still completely free."
        image={images.codingLaptop}
        imageAlt="Students competing on the leaderboard"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse Courses
        </Link>
        <Link href={COMMITS_LEADERBOARD_HREF} className="home-btn home-btn-outline">
          Commits Leaderboard
        </Link>
      </PageHero>

      <PageSection>
        <div className="mb-6">
          <LeaderboardExplainer current="xp" />
        </div>
        <Leaderboard />
      </PageSection>
    </PageShell>
  );
}
