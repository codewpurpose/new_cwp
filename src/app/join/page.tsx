import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import Magnet from "@/components/reactbits/Magnet";
import { images } from "@/lib/images";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  COURSES_HREF,
  DISCORD_HREF,
  INDIA_CHAPTERS_HREF,
  VOLUNTEER_FORM_HREF,
} from "@/lib/links";

const workshopInquiryHref = `${CONTACT_EMAIL_HREF}?subject=${encodeURIComponent("Host a CodeWithPurpose workshop")}&body=${encodeURIComponent(
  "School or organisation:\nCity and country:\nAge group and estimated group size:\nSuggested dates or timeframe:\nWhat would you like students to learn?\n",
)}`;

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Volunteer with CodeWithPurpose by teaching, mentoring, or helping run free coding courses.",
  alternates: { canonical: "/join/" },
  openGraph: {
    title: "Join Us | CodeWithPurpose",
    description:
      "Volunteer with CodeWithPurpose by teaching, mentoring, or helping run free coding courses.",
    url: "/join/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Us | CodeWithPurpose",
    description:
      "Volunteer with CodeWithPurpose by teaching, mentoring, or helping run free coding courses.",
  },
};

const roles = [
  {
    title: "Teach a course",
    body: "Lead workshops, record lessons, or mentor students through our Python and Vibecoding curricula. No teaching experience required, just a real desire to help others learn.",
  },
  {
    title: "Run a workshop",
    body: "Help organise hands-on coding sessions in schools, libraries, and community spaces.",
  },
  {
    title: "Spread the word",
    body: "Share CodeWithPurpose with students who need free education. Help us reach more classrooms and communities.",
  },
  {
    title: "Build with us",
    body: "Contribute to our website, curriculum, outreach, or operations. Coding, design, writing, organising: whatever your skill, there's room for you here.",
  },
];

export default function JoinPage() {
  return (
    <PageShell>
      <PageHero
        title="Help more students learn to code"
        description="Teach, mentor, or start a CodeWithPurpose chapter in your community, wherever you live."
        image={images.danvilleSanRamon}
        imageAlt="CodeWithPurpose volunteers at a community event"
      >
        {/* The form is on this page now, so this scrolls to it rather than
            opening a tab. An in-page jump keeps the back button meaningful. */}
        <Magnet>
          <a href="#apply" className="home-btn home-btn-fill">
            Register volunteer interest
          </a>
        </Magnet>
        <a href={INDIA_CHAPTERS_HREF} className="home-btn home-btn-outline">
          Join or start a chapter in India
        </a>
      </PageHero>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal key={role.title} delay={index * 0.06} className="h-full">
              <div className="home-card home-lift h-full rounded-xl p-6 md:p-8">
                <h2 className="text-xl">{role.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div id="chapters" className="home-card mt-6 scroll-mt-28 rounded-xl p-6 md:p-8">
          <h2 className="text-xl">Start a chapter in your community</h2>
          <p className="mt-2 max-w-2xl text-[var(--home-ink-soft)]">
            Bring students together to learn and host coding workshops at your school, college, or community organisation. Tell us where you are and what you would like to organise.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={DISCORD_HREF} target="_blank" rel="noreferrer" className="home-btn home-btn-fill">Join our Discord</a>
            <a href={`${CONTACT_EMAIL_HREF}?subject=Start%20a%20CodeWithPurpose%20chapter`} className="home-btn home-btn-outline">Email the team</a>
            <a href={INDIA_CHAPTERS_HREF} className="home-btn home-btn-outline">Explore CWP India</a>
          </div>
        </div>
        <div id="host-workshop" className="home-card mt-6 flex scroll-mt-28 flex-wrap items-center justify-between gap-4 rounded-xl p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl">Bring a workshop to your school or community</h2>
            <p className="mt-2 text-[var(--home-ink-soft)]">
              Tell us who you want to reach, where the group meets, and what students
              would like to learn. You can also{" "}
              <Link href={COURSES_HREF} className="underline underline-offset-2">
                explore our free courses
              </Link>
              .
            </p>
          </div>
          <a href={workshopInquiryHref} className="home-btn home-btn-outline">
            Email about hosting a workshop
          </a>
        </div>
      </PageSection>

      {/*
        The sign-up itself. Copy rewritten alongside the form swap: the previous
        version promised "we read every application and we'll get back to you
        within a few days", which described a volunteer application. This form
        collects a name, an email, and permission to contact you — so it says
        that instead. Copy that oversells the form underneath it is worse than
        no copy at all.

        scroll-mt-24 keeps the heading clear of the sticky header when the hero
        button jumps here.
      */}
      <PageSection
        id="apply"
        className="scroll-mt-24 border-t-[0.5px] border-[var(--home-hairline)] bg-[#1e3c2c] text-[#dbefdb]"
      >
        <div className="mx-auto max-w-3xl text-center">
          <BlurText
            as="h2"
            text="Register your interest in volunteering"
            className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]"
          />
          <p className="mt-4 text-[#dbefdb]/90">
            Answer four short questions and we&apos;ll let you know about
            workshops, webinars, and ways to help as they come up. It usually
            takes a couple of minutes. Prefer email? Write to us at{" "}
            <a href={CONTACT_EMAIL_HREF} className="underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <a
            href={VOLUNTEER_FORM_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block underline underline-offset-2"
          >
            Open the sign-up form in a new tab
          </a>
        </div>

        {/* A white card around the frame, matching the donate page. The form
            arrives on its own white background, so anything else leaves it
            sitting in a hard-edged rectangle on the moss. */}
        <div className="home-card mx-auto mt-8 max-w-2xl rounded-[20px] p-2 md:p-4">
          {/*
            The height is MEASURED, not guessed. A cross-origin frame cannot
            report its content height to us and cannot resize itself, so if this
            is short the form gets its own scrollbar inside a page that already
            scrolls, which is hard to get past on a phone.

            Measured content, signed out, with this form's four questions:
              320px viewport -> 1552px   (the tallest: everything wraps)
              390px viewport -> 1320px
              768px and up   -> 1082px   (the card hits max-w-2xl, so the frame
                                          stops getting wider and the height
                                          stops changing)

            Hence a mobile-first base sized for 320px and one md: override.
            The extra ~70px is headroom for the validation message a missed
            required field adds. RE-MEASURE IF THE FORM GAINS A QUESTION.
          */}
          <iframe
            src={VOLUNTEER_FORM_HREF}
            title="CodeWithPurpose sign-up form"
            loading="lazy"
            className="h-[1620px] w-full rounded-xl border-none md:h-[1160px]"
          >
            Loading the form…
          </iframe>
        </div>
      </PageSection>
    </PageShell>
  );
}
