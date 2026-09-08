import type { Metadata } from "next";
import { FaqSection } from "@/components/FaqSection";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the CodeWithPurpose team.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact | CodeWithPurpose",
    description: "Get in touch with the CodeWithPurpose team.",
    url: "/contact/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | CodeWithPurpose",
    description: "Get in touch with the CodeWithPurpose team.",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        title="Contact the team"
        description="Questions about courses, volunteering, partnerships, or donations? Email the student team."
      />

      <PageSection>
        <Reveal>
          <div className="home-card mx-auto max-w-2xl rounded-[20px] p-8 text-center md:p-12">
            <h2 className="home-serif text-[1.625rem] md:text-[2rem]">
              Email us anything
            </h2>
            <a
              href={CONTACT_EMAIL_HREF}
              className="home-mono mt-4 inline-block break-all text-lg text-[#397554] underline-offset-4 hover:underline md:text-2xl"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">
              Questions, suggestions, or partnership ideas are welcome. A member
              of the team will read your message.
            </p>
          </div>
        </Reveal>
      </PageSection>

      <div className="pb-12 md:pb-20">
        <FaqSection />
      </div>
    </PageShell>
  );
}
