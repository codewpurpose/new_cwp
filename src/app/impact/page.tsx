import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { CONGRESS_LETTER_HREF, DONATE_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Impact | CWP",
  description:
    "4,000+ students across 130+ countries. See the impact of free coding education.",
};

const stats = [
  { value: "4,000+", label: "Students Reached" },
  { value: "130+", label: "Countries" },
  { value: "30+", label: "Languages Taught" },
  { value: "15,000", label: "Minutes of Teaching" },
];

export default function ImpactPage() {
  return (
    <PageShell>
      <PageHero
        title="Students on every corner of the Earth"
        description="From San Francisco to Lagos, Bangalore to São Paulo: over 130 countries and counting. Every student is someone who got access to free, real education because of this community."
        image={images.heroStudent}
        imageAlt="Student smiling while learning to code"
      >
        <Link href={DONATE_HREF} className="home-btn home-btn-fill">
          Support Our Mission
        </Link>
      </PageHero>

      <PageSection>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07}>
              <div className="home-card home-lift h-full rounded-xl px-4 py-8 text-center md:px-6">
                <p className="home-serif text-[2rem] leading-none text-[#3e7f5c] md:text-[2.75rem]">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-[#636363]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          In classrooms, workshops, and communities
        </h2>
        <p className="mt-3 max-w-2xl text-[#636363]">
          Hands-on learning, smiling students, crowded workshops, and volunteers
          presenting. This is what CodeWithPurpose looks like in action.
        </p>
        <div className="mt-8">
          <PhotoGrid photos={images.gallery} columns={4} />
        </div>
      </PageSection>

      <PageSection className="bg-[var(--home-grey-450)]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="home-card overflow-hidden rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.congressLetter}
              alt="Congressional recognition letter"
              className="w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554]">
              Congressional Recognition · 2026
            </p>
            <h2 className="home-serif mt-4 text-[1.75rem] md:text-[2.25rem]">
              Recognized for leadership and service
            </h2>
            <p className="mt-4 text-[#636363]">
              Representative Mark DeSaulnier of the U.S. House of Representatives
              formally recognized our work bringing free coding education to
              underserved communities worldwide.
            </p>
            <a
              href={CONGRESS_LETTER_HREF}
              target="_blank"
              rel="noreferrer"
              className="home-btn home-btn-moss mt-6"
            >
              Read the letter
            </a>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
