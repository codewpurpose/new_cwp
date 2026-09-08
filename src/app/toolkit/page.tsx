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
    "Free templates for debugging logs, concept breakdowns, daily reflections, and project plans. Fill them in and save them as PDFs.",
  alternates: { canonical: "/toolkit/" },
  robots: { index: false, follow: true },
};

export default function ToolkitPage() {
  return (
    <PageShell>
      <PageHero
        title="Your Learning Toolkit"
        description="Use these templates to take notes, record questions, and plan projects. Fill one in as you go and save it as a PDF. Everything stays on your device."
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
