import type { Metadata } from "next";
import { PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Sign in to CodeWithPurpose to keep your course progress in sync across devices.",
  alternates: { canonical: "/login/" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <PageShell>
      <PageSection>
        <div className="py-10">
          <LoginForm />
        </div>
      </PageSection>
    </PageShell>
  );
}
