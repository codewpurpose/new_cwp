import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  COURSES_HREF,
  VOLUNTEER_FORM_HREF,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Volunteer with CodeWithPurpose. Teach, mentor, and help bring free coding education to students worldwide.",
  alternates: { canonical: "/join/" },
};

const roles = [
  {
    title: "Teach a course",
    body: "Lead workshops, record lessons, or mentor students through our Python and Vibecoding curricula. No teaching experience required, just a real desire to help others learn.",
  },
  {
    title: "Run a workshop",
    body: "Organize hands-on coding sessions in your school, library, or community. We provide curriculum, materials, and support to help you get started.",
  },
  {
    title: "Spread the word",
    body: "Share CodeWithPurpose with students who need free education. Help us reach more countries, more classrooms, and more curious minds.",
  },
  {
    title: "Build with us",
    body: "Contribute to our website, curriculum, outreach, or operations. Coding, design, writing, organizing: whatever your skill, there's room for you here.",
  },
];

export default function JoinPage() {
  return (
    <PageShell>
      <PageHero
        title="Help us bring free coding education to every student"
        description="CodeWithPurpose runs on volunteers. Whether you teach one workshop or mentor one student, you help build a more inclusive future where code is a tool for good."
        image={images.danvilleSanRamon}
        imageAlt="CodeWithPurpose volunteers at a community event"
      >
        {/* The form is on this page now, so this scrolls to it rather than
            opening a tab. An in-page jump keeps the back button meaningful. */}
        <a href="#apply" className="home-btn home-btn-fill">
          Sign Up
        </a>
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          See Our Courses
        </Link>
      </PageHero>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal key={role.title} delay={(index % 2) * 0.08}>
              <div className="home-card home-lift h-full rounded-xl p-6 md:p-8">
                <h2 className="text-xl">{role.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
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
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]">
            Ready to get involved?
          </h2>
          <p className="mt-4 text-[#dbefdb]/90">
            Leave your name and email and we&apos;ll let you know about
            workshops, webinars, and ways to help as they come up. It takes
            about thirty seconds. Prefer email? Write to us at{" "}
            <a href={CONTACT_EMAIL_HREF} className="underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        {/* A white card around the frame, matching the donate page. The form
            arrives on its own white background, so anything else leaves it
            sitting in a hard-edged rectangle on the moss. */}
        <div className="home-card mx-auto mt-8 max-w-2xl rounded-[20px] p-2 md:p-4">
          {/*
            The height is MEASURED, not guessed. A cross-origin frame cannot
            report its content height to us and cannot resize itself, so if this
            is short the form gets its own scrollbar inside a page that already
            scrolls — which on a phone is genuinely hard to get past.

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

        {/* Third-party frames are blocked by more browser settings and
            extensions than people expect, and a blocked iframe fails silently
            — an empty box with nothing to click. This link is the way out of
            that, and it costs one line. */}
        <p className="mt-4 text-center text-[14px] text-[#dbefdb]/80">
          Form not loading?{" "}
          <a
            href={VOLUNTEER_FORM_HREF}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Open it in a new tab
          </a>
          .
        </p>
      </PageSection>
    </PageShell>
  );
}
