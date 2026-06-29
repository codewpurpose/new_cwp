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
  title: "Join Us | CWP",
  description:
    "Volunteer with CodeWithPurpose. Teach, mentor, and help bring free coding education to students worldwide.",
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
        <a
          href={VOLUNTEER_FORM_HREF}
          target="_blank"
          rel="noreferrer"
          className="home-btn home-btn-fill"
        >
          Apply to Volunteer
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
                <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[#1e3c2c] text-[#dbefdb]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.25rem]">
            Ready to volunteer?
          </h2>
          <p className="mt-4 text-[#dbefdb]/90">
            Fill out our volunteer form and tell us how you&apos;d like to
            help. We read every application and we&apos;ll get back to you
            within a few days. Prefer email? Write to us at{" "}
            <a href={CONTACT_EMAIL_HREF} className="underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <a
            href={VOLUNTEER_FORM_HREF}
            target="_blank"
            rel="noreferrer"
            className="home-btn home-btn-fill mt-8 !border-[#dbefdb] !bg-[#dbefdb] !text-[#1e3c2c]"
          >
            Apply to Volunteer
          </a>
        </div>
      </PageSection>
    </PageShell>
  );
}
