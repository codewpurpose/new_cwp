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
  alternates: { canonical: "/about/" },
};

const founders: TeamMember[] = [
  {
    name: "Shreyan Mitra",
    role: "Co-founder",
    photo: images.team.shreyan,
    linkedin: "https://www.linkedin.com/in/shreyan-mitra-8910172b7/",
    bio: "Hey! I'm a rising senior at California High School and an aspiring research scientist. My mission is to make education free worldwide.",
  },
  {
    name: "Bruhatt Rao",
    role: "Co-founder",
    photo: images.team.bhim,
    linkedin: "https://www.linkedin.com/in/bruhatt-rao/",
    bio: "I'm an incoming senior at California High and the founder of Holmes AI. My mission is to make education free and accessible worldwide.",
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
    instagram: "https://www.instagram.com/def_notnaman/",
    bio: "Hello, I'm Naman Jain. I'm the Director of Outreach of Code With Purpose, and I enjoy helping and teaching kids to make them grow to their fullest.",
  },
  {
    name: "Om Anand Khuante",
    role: "Co-Director of Community",
    photo: images.team.om,
    linkedin: "https://www.linkedin.com/in/om-anand-khaunte/",
    bio: "Hey! I'm a robotics and AI student researcher who enjoys building cool things, learning fast, and working with my friends.",
  },
  {
    name: "Darsh Pande",
    role: "Co-Director of Community",
    photo: images.team.darsh,
    photoClass: "object-[50%_6%] scale-[1.3]",
    linkedin: "https://www.linkedin.com/in/darsh-pande-a73bb8421/",
    instagram: "https://www.instagram.com/darsh.04.dp/",
    bio: "Hello, my name is Darsh, and I have been coding and doing robotics projects for 6 years and would love to share the knowledge I've obtained on this journey with you all!",
  },
  {
    name: "Aakash Sanil",
    role: "Director of Media",
    photo: images.team.aakash,
    photoClass: "object-[50%_20%] scale-[1.2]",
    instagram: "https://www.instagram.com/sanilaakash/",
    bio: "Hi, my name is Aakash Sanil. I'm the Director of Media of Code With Purpose. I joined Code With Purpose to help reach kids all throughout the world and help them. I mainly focus on making social media videos, spreading our message.",
  },
  {
    name: "Karthik Tummala",
    role: "Lead Instructor",
    linkedin: "https://www.linkedin.com/in/karthik-tummala-6783233a4/",
    snapchat: "https://snapchat.com/t/0II9wX8h",
    tiktok: "https://www.tiktok.com/@ktummala88",
    bio: "I'm Karthik Tummala, Lead Instructor at Code With Purpose. For the past 4 years, I've turned code into real projects with results. I hope to spread my knowledge with CWP to kids who want to learn.",
  },
  {
    name: "Trey Lim",
    role: "Member of Finance",
    photo: images.team.trey,
    bio: "Hey, I'm Trey! I'm a finance bro that enjoys creating bonds with others, researching AI, and learning with friends.",
  },
  {
    name: "Aadi Naik",
    role: "Lead Instructor",
    photo: images.team.aadi,
    photoClass: "object-[45%_48%] scale-[1.15]",
    instagram: "https://www.instagram.com/naik_aadi4/",
    bio: "Hey everyone! My name is Aadi Naik. I'm an instructor for Code With Purpose that focuses on med courses. I've been with CWP for around 5 months and it's definitely taught me many things, such as responsibility and time management. I'm deeply interested in the human body, and I wanted to become an instructor so that I could educate people on it.",
  },
  {
    name: "Sirish Aytham",
    role: "Marketing",
    photo: images.team.sirish,
    linkedin: "https://www.linkedin.com/in/sirish-aytham-bb74753a3/",
    bio: "Hey, I'm Sirish Aytham, Marketing Lead here at Code With Purpose, where I help create content and share opportunities with our community. I'm passionate about combining creativity and technology to encourage students to innovate, learn, and make a positive impact in their communities and the world.",
  },
  {
    name: "Ashwika Ashok",
    role: "Instructor & Operations",
    photo: images.team.ashwika,
    instagram: "https://www.instagram.com/wika_pages/",
    bio: "Hi! I'm a student researcher interested in neuroscience, psychology, and AI. I have published a paper on Aphantasia through the Teens in Health Journal and have written two articles for Empathy in Medicine. I wish to pursue a career in computational neuroscience. When I do get free time, I enjoy reading, playing volleyball, and hanging out with family and friends.",
  },
  {
    name: "Bhoumik Sonawane",
    role: "Newspaper",
    photo: images.team.bhoumik,
    photoClass: "object-[50%_0%] scale-[2.5] translate-y-[45%]",
  },
  {
    name: "Hannah Mauro",
    role: "Social Media & Design",
    photo: images.team.hannah,
    photoClass: "object-[50%_8%]",
    instagram: "https://www.instagram.com/hannah_gm.9045/",
    bio: "Hi! I assist with media at Code With Purpose. I'm a student researcher interested in neuroscience and abnormal/forensic psychiatry, and have worked with professors from BU and Harvard on research into Parkinson's Disease as well as behavioral economics and neuroscience more broadly. In the future I hope to pursue a career in forensic psychiatry. In my free time I enjoy hanging out with my friends, family, and dogs, playing the violin and guitar, playing volleyball, and dancing.",
  },
  {
    name: "Vetrivel Jagath",
    role: "Instructor & Design",
    photo: images.team.vetri,
    photoClass: "object-[48%_30%] scale-[1.75] -translate-y-[5%]",
    bio: "Hi, I'm Vetrivel Jagath, a rising freshman with a strong interest in math and medicine, and I'm really interested in helping kids learn.",
  },
  {
    name: "Tvisha Arora",
    role: "Instructor",
    photo: images.team.tvisha,
    photoClass: "object-[50%_30%] scale-[4.2] translate-y-[30%]",
    bio: "Hey I'm a student interested in business and psychology. I helped my school take initiative to start a DECA chapter. Additionally, I am programming a mental health app for students. I want to pursue a career in product management or UX design. Some of my hobbies are teaching, learning dance, colorguard, and writing in my free time.",
  },
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
