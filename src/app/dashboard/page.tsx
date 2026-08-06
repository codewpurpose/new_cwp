import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { images } from "@/lib/images";
import { COURSES_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "My Progress",
  description:
    "Track your progress across every CodeWithPurpose course, earn XP and badges, unlock Koda avatars, and keep a whiteboard — all saved right on your device, no account needed.",
  alternates: { canonical: "/dashboard/" },
  robots: { index: false, follow: true },
};

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHero
        title="Your learning, leveled up"
        description="Tick off chapters as you go, earn XP and badges, and unlock your own Koda. It all saves on your device — no sign-up, still completely free."
        image={images.codingLaptop}
        imageAlt="A student tracking their coding progress"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse Courses
        </Link>
      </PageHero>

      <PageSection>
        <StudentDashboard />
      </PageSection>
    </PageShell>
  );
}
