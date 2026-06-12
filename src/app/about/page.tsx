import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { images } from "@/lib/images";
import {
  CONGRESS_LETTER_HREF,
  COURSES_HREF,
  DONATE_HREF,
  JOIN_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "About Us — CodeWithPurpose",
  description:
    "A student-run nonprofit making tech education free and accessible for everyone, everywhere.",
};

const team = [
  { name: "Shreyan", role: "Co-founder", photo: images.team.shreyan },
  { name: "Samanyu", role: "Co-founder", photo: images.team.samanyu },
  { name: "Bhim", role: "Team", photo: images.team.bhim },
  { name: "Naman", role: "Team", photo: images.team.naman },
  { name: "Prithvi", role: "Team", photo: images.team.prithvi },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Our Mission to Bring Knowledge Where It's Needed Most"
        description="We are a community of students united by one belief — that quality coding education should cost nothing. What began as a frustration with $15,000 bootcamps has grown into a movement of free courses, real skills, and unwavering commitment."
        image={images.volunteerHelp}
        imageAlt="Volunteer helping a student at their laptop"
      >
        <Link href={COURSES_HREF} className="home-btn home-btn-fill">
          Free Courses
        </Link>
        <Link href={JOIN_HREF} className="home-btn home-btn-outline">
          Join Us
        </Link>
      </PageHero>

      <PageSection id="mission">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="home-serif text-[1.75rem] md:text-[2.5rem]">
              Recognized by the U.S. House of Representatives
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-[#636363] md:text-base">
              Representative Mark DeSaulnier recognized CodeWithPurpose for
              tremendous leadership and service to our community. We work every
              day to reach students in 110+ countries — from rural villages in
              India to classrooms in Nigeria.
            </p>
            <blockquote className="mt-6 border-l-2 border-[#397554] pl-4 text-lg italic text-[#1f1f1f]">
              &ldquo;Tremendous leadership and service to your community.&rdquo;
            </blockquote>
            <p className="mt-2 text-sm text-[#818181]">
              — Representative Mark DeSaulnier · March 4, 2026
            </p>
            <a
              href={CONGRESS_LETTER_HREF}
              target="_blank"
              rel="noreferrer"
              className="home-arrow-link mt-6"
            >
              Read the letter <span className="home-arrow">→</span>
            </a>
          </div>
          <div className="home-card overflow-hidden rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.congressLetter}
              alt="Letter from Representative Mark DeSaulnier recognizing CodeWithPurpose"
              className="w-full object-cover"
            />
          </div>
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[#e1e1e1]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">Our Team</h2>
        <p className="mt-3 max-w-2xl text-[#636363]">
          Made by students, for students. Shreyan, Samanyu, Bruhatt, and
          volunteers around the world building a more inclusive future.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <div key={member.name} className="home-card home-lift rounded-xl p-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.photo}
                alt={member.name}
                className="mx-auto aspect-square w-20 rounded-full object-cover md:w-24"
              />
              <p className="mt-3 font-medium">{member.name}</p>
              <p className="text-sm text-[#818181]">{member.role}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-[#ececec]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          Watch our story
        </h2>
        <div className="mt-6 home-card overflow-hidden rounded-[20px]">
          <video
            src={images.promoVideo}
            controls
            playsInline
            className="aspect-video w-full bg-black"
            poster={images.heroStudent}
          />
        </div>
        <PhotoGrid photos={images.gallery.slice(0, 6)} columns={3} />
        <div className="mt-10 flex flex-wrap gap-2">
          <Link href={DONATE_HREF} className="home-btn home-btn-moss">
            Support Our Mission
          </Link>
        </div>
      </PageSection>
    </PageShell>
  );
}
