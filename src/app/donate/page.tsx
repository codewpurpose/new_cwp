import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { images } from "@/lib/images";
import { CONTACT_HREF, COURSES_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Donate — CodeWithPurpose",
  description:
    "Support CodeWithPurpose. Every dollar helps a student start their coding journey today.",
};

const impactAreas = [
  {
    title: "Free courses",
    body: "Keep Python, Vibecoding, and future courses free for every student worldwide.",
  },
  {
    title: "Workshops & outreach",
    body: "Fund in-person workshops in underserved communities across 110+ countries.",
  },
  {
    title: "Curriculum development",
    body: "Build new lessons, translate content into 20+ languages, and improve our platform.",
  },
  {
    title: "Student scholarships",
    body: "Provide laptops, internet access, and materials to students who need them most.",
  },
];

export default function DonatePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Donate"
        title="Help a student start their journey today"
        description="Every dollar helps us build a more inclusive future where code is a tool for good. Whether it's $5 or $500, you're making free education possible."
        image={images.heroStudent}
        imageAlt="Student learning with CodeWithPurpose"
      >
        <a
          href="mailto:contact@codewithpurpose.org?subject=Donation%20Inquiry"
          className="home-btn home-btn-fill"
        >
          Donate Now
        </a>
        <Link href={CONTACT_HREF} className="home-btn home-btn-outline">
          Contact Us
        </Link>
      </PageHero>

      <PageSection>
        <div className="grid gap-4 md:grid-cols-2">
          {impactAreas.map((area) => (
            <div key={area.title} className="home-card home-lift rounded-xl p-6 md:p-8">
              <h2 className="text-xl">{area.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[#e1e1e1] bg-[#1e3c2c]">
        <div className="mx-auto max-w-3xl text-center text-[#dbefdb]">
          <h2 className="home-serif text-[1.75rem] text-[#f9f9f9] md:text-[2.5rem]">
            A Note From Our Team
          </h2>
          <blockquote className="mt-6 text-lg leading-[1.6] md:text-xl">
            &ldquo;Every dollar helps us build a more inclusive future where code
            is a tool for good. Whether it&apos;s $5 or $500, you&apos;re helping a
            student start their journey today.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.team.shreyan}
              alt="Shreyan"
              className="h-14 w-14 rounded-full object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.team.samanyu}
              alt="Samanyu"
              className="h-14 w-14 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 text-sm opacity-80">Shreyan, Samanyu &amp; Bruhatt</p>
          <p className="mt-6 text-sm opacity-70">
            CodeWithPurpose is a 501(c)(3) nonprofit. Free education for every
            student, everywhere.
          </p>
          <Link
            href={COURSES_HREF}
            className="home-btn home-btn-fill mt-8 !border-[#dbefdb] !bg-[#dbefdb] !text-[#1e3c2c]"
          >
            See What We Teach
          </Link>
        </div>
      </PageSection>
    </PageShell>
  );
}
