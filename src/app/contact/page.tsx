import type { Metadata } from "next";
import { FaqSection } from "@/components/FaqSection";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact | CWP",
  description: "Get in touch with the CodeWithPurpose team.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        title="We'd love to hear from you"
        description="Questions about courses, volunteering, partnerships, or donations? It all lands in one inbox, answered by actual students."
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
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-[#636363]">
              Big idea, small question, or just want to say hi? Write to us.
              Every message gets read by a real person on the team.
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
