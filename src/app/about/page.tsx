import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection, PhotoGrid } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { TeamCard, type TeamMember } from "@/components/TeamCard";
import { images } from "@/lib/images";
import {
  CONGRESS_LETTER_HREF,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  COURSES_HREF,
  DONATE_HREF,
  JOIN_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A student-run nonprofit making tech education free and accessible for everyone, everywhere.",
  alternates: { canonical: "/about" },
};

const founders: TeamMember[] = [
  {
    name: "Shreyan Mitra",
    role: "Co-founder",
    photo: images.team.shreyan,
    linkedin: "https://www.linkedin.com/in/shreyan-mitra-8910172b7/",
  },
  {
    name: "Bruhatt Rao",
    role: "Co-founder",
    photo: images.team.bhim,
    linkedin: "https://www.linkedin.com/in/bruhatt-rao/",
  },
  {
    name: "Samanyu Goyal",
    role: "Co-founder",
    photo: images.team.samanyu,
    photoClass: "scale-[3] -translate-x-[50%] translate-y-[9%]",
    linkedin: "https://www.linkedin.com/in/samanyu-goyal/",
    bio: "Hey guys, I'm Samanyu Goyal. I'm the co-founder of Code With Purpose. What I plan to do with this organization is make the largest nonprofit in the world that helps everyone get access to high-quality CS education, specifically focused on how they can take advantage of the AI revolution.",
  },
];

/** Add and remove freely — the layout below centres whatever ends up on the
 *  final row, so no count needs the column classes retuned.
 *
 *  Every card opens a dialog whether or not it is filled in, so a member with
 *  no `bio` yet gets the "check back later" placeholder rather than a dead
 *  card. To finish someone's profile, add the two optional fields:
 *
 *    bio: "First person, a few sentences.",
 *    instagram: "https://www.instagram.com/<handle>/",
 *
 *  `instagram` renders as an icon beside LinkedIn in the dialog. Only add one
 *  once the member has said yes to it being public. */
const teamMembers: TeamMember[] = [
  {
    name: "Sanjay Vellore",
    role: "Director of Operations",
    photo: images.team.sanjay,
    linkedin: "https://www.linkedin.com/in/sanjay-vellore-6247a63b1/",
    bio: 'Hi! I\'m Sanjay Vellore, Director of Operations at Code With Purpose. I oversee sponsorships, spearhead new initiatives, and ensure our day-to-day operations run smoothly. My goal is to help scale Code With Purpose into one of the top student-led non-profits worldwide. Believing in Chamath Palihapitiya\'s vision that AI is "the most important economic leveler of our lifetime," I\'m dedicated to empowering all of you to succeed along the way.',
  },
  {
    name: "Naman Jain",
    role: "Director of Outreach",
    photo: images.team.naman,
    linkedin: "https://www.linkedin.com/in/naman-jain-9276593a5/",
  },
  {
    name: "Om Anand Khuante",
    role: "Co-Director of Community",
    photo: images.team.om,
    linkedin: "https://www.linkedin.com/in/om-anand-khaunte/",
  },
  {
    name: "Darsh Pande",
    role: "Co-Director of Community",
    photo: images.team.darsh,
    linkedin: "https://www.linkedin.com/in/darsh-pande-a73bb8421/",
  },
  { name: "Aakash Sanil", role: "Director of Media" },
  {
    name: "Karthik Tummala",
    role: "Lead Instructor",
    linkedin: "https://www.linkedin.com/in/karthik-tummala-6783233a4/",
  },
  { name: "Trey Lim", role: "Member of Finance", photo: images.team.trey },
  { name: "Aadi Naik", role: "Lead Instructor", photo: images.team.aadi },
  {
    name: "Sirish Aytham",
    role: "Marketing",
    photo: images.team.sirish,
    linkedin: "https://www.linkedin.com/in/sirish-aytham-bb74753a3/",
  },
  { name: "Ashwika Ashok", role: "Instructor & Operations" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        title="Our Mission to Bring Knowledge Where It's Needed Most"
        description="We're a community of students who share one belief: quality coding education should cost nothing. We got tired of $15,000 bootcamps deciding who gets to learn, so we built a movement of free courses, real skills, and people who show up."
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
            <p className="mt-4 text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
              Representative Mark DeSaulnier recognized CodeWithPurpose for
              tremendous leadership and service to our community. We work every
              day to reach students in 130+ countries, from rural villages in
              India to classrooms in Nigeria.
            </p>
            <blockquote className="mt-6 border-l-2 border-[#397554] pl-4 text-lg italic text-[var(--home-ink)]">
              &ldquo;Tremendous leadership and service to your community.&rdquo;
            </blockquote>
            <p className="mt-2 text-sm text-[var(--home-ink-quiet)]">
              Representative Mark DeSaulnier · March 4, 2026
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
              loading="lazy"
              decoding="async"
              className="aspect-[1002/1304] w-full object-cover"
            />
          </div>
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-hairline)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">Our Team</h2>
        <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
          Made by students, for students. Shreyan, Samanyu, Bruhatt, and
          volunteers around the world building a more inclusive future.
        </p>
        {/* flex-wrap rather than a grid, so a partial final row centres itself.
            Widths are percentage-minus-gap-share: with gap-4 (1rem), four
            across means three 1rem gaps split four ways, hence 25% - 0.75rem.
            Nobody has to retune column counts when the roster changes size. */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {founders.map((member) => (
            <TeamCard
              key={member.name}
              member={member}
              avatar="w-16 text-base sm:w-20 sm:text-lg md:w-28 md:text-2xl"
              width="w-[calc(33.333%-0.667rem)]"
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {teamMembers.map((member) => (
            <TeamCard
              key={member.name}
              member={member}
              avatar="w-20 text-lg md:w-24 md:text-xl"
              width="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]"
            />
          ))}
        </div>

        {/* Sits below the grid rather than as a ninth card: eight members fill
            two rows exactly at every breakpoint, and a card here would orphan. */}
        <div className="home-card mt-4 flex flex-col items-center gap-4 rounded-xl p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-medium">Want to see your face here?</p>
            <p className="mt-1 text-sm text-[var(--home-ink-soft)]">
              We&rsquo;re always looking for volunteers. Email us at{" "}
              <span className="whitespace-nowrap">{CONTACT_EMAIL}</span>{" "}
              and tell us what you&rsquo;d like to work on.
            </p>
          </div>
          <a href={CONTACT_EMAIL_HREF} className="home-btn home-btn-moss shrink-0">
            Join Us
          </a>
        </div>
      </PageSection>

      <PageSection className="bg-[var(--home-grey-450)]">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">
          Watch our story
        </h2>
        <div className="mt-6 home-card overflow-hidden rounded-[20px]">
          <video
            src={images.promoVideo}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black"
            poster={images.heroStudent}
          />
        </div>
        <div className="mt-10 md:mt-16">
          <PhotoGrid photos={images.gallery.slice(0, 6)} columns={3} />
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <Link href={DONATE_HREF} className="home-btn home-btn-moss">
            Support Our Mission
          </Link>
        </div>
      </PageSection>
    </PageShell>
  );
}
