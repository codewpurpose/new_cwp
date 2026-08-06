import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { LearningToolkit } from "@/components/toolkit/LearningToolkit";
import { images } from "@/lib/images";
import { COURSES_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Learning Toolkit",
  description:
    "Free note templates and guides to help students take better notes and apply what they learn — a debugging log, concept breakdown, daily reflection, and project planner. Fill them in and save as PDF.",
  alternates: { canonical: "/toolkit/" },
  robots: { index: false, follow: true },
};

export default function ToolkitPage() {
  return (
    <PageShell>
      <PageHero
        title="Your Learning Toolkit"
        description="Blank pages are intimidating. These templates give you a structure to take notes and actually apply what you learn — fill one in as you go, and save it as a PDF to keep. Everything stays on your device."
        image={images.codingLaptop}
        imageAlt="Student taking notes while learning to code"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse Courses
        </Link>
      </PageHero>

      <PageSection>
        <LearningToolkit />
      </PageSection>
    </PageShell>
  );
}
