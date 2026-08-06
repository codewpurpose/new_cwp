import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { images } from "@/lib/images";
import { COURSES_HREF } from "@/lib/links";

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
        description="Every lesson you finish earns XP. Here's how learners stack up — a little friendly competition, still completely free."
        image={images.codingLaptop}
        imageAlt="Students competing on the leaderboard"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse Courses
        </Link>
      </PageHero>

      <PageSection>
        <Leaderboard />
      </PageSection>
    </PageShell>
  );
}
