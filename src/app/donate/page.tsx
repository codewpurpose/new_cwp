import type { Metadata } from "next";
import Link from "next/link";
import { PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { CONTACT_HREF, COURSES_HREF, HCB_DONATE_EMBED_SRC } from "@/lib/links";

export const metadata: Metadata = {
  title: "Donate | CWP",
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
    body: "Fund in-person workshops in underserved communities across 130+ countries.",
  },
  {
    title: "Curriculum development",
    body: "Build new lessons, translate content into 30+ languages, and improve our platform.",
  },
  {
    title: "Student scholarships",
    body: "Provide laptops, internet access, and materials to students who need them most.",
  },
];

export default function DonatePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] pt-12 pb-14 md:pt-20 md:pb-24">
        <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-[85rem] items-start gap-10 px-5 md:px-10 lg:grid-cols-2">
          <Reveal>
            <h1 className="home-serif text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]">
              Help a student start their journey today
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-[1.5] text-[#636363]">
              Every dollar helps us build a more inclusive future where code is a
              tool for good. CodeWithPurpose is fiscally sponsored by Hack Club,
              so donations are tax-deductible and go straight to keeping coding
              education free.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[#636363]">
              Pick any amount. Five dollars covers a student&apos;s first lesson.
            </p>
            <div className="mt-8">
              <Link href={CONTACT_HREF} className="home-btn home-btn-outline">
                Contact Us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="home-card rounded-[20px] p-4 md:p-6">
              <iframe
                src={HCB_DONATE_EMBED_SRC}
                name="donateFrame"
                title="Donate to CodeWithPurpose via Hack Club"
                allowFullScreen
                className="h-[1080px] w-full border-none"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)]">
        <div className="grid gap-4 md:grid-cols-2">
          {impactAreas.map((area, index) => (
            <Reveal key={area.title} delay={(index % 2) * 0.08}>
              <div className="home-card home-lift h-full rounded-xl p-6 md:p-8">
                <h2 className="text-xl">{area.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
                  {area.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[#1e3c2c]">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.team.bhim}
              alt="Bhim"
              className="h-14 w-14 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 text-sm opacity-80">Shreyan, Samanyu &amp; Bruhatt</p>
          <p className="mt-6 text-sm opacity-70">
            CodeWithPurpose is a nonprofit fiscally sponsored by Hack Club.
            Free education for every student, everywhere.
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
