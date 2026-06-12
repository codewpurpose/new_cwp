import type { Metadata } from "next";
import { ContactForm, ContactSidebar } from "@/components/ContactForm";
import { PageHero, PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact — CodeWithPurpose",
  description: "Get in touch with the CodeWithPurpose team.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about our courses, volunteering, partnerships, or donations? Reach out and our team will get back to you."
        image={images.codingLaptop}
        imageAlt="Student coding on a laptop"
      />

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />
          <ContactSidebar />
        </div>
      </PageSection>
    </PageShell>
  );
}
