import type { Metadata } from "next";
import { PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Sign in to CodeWithPurpose to sync your course progress across devices and compete on the student leaderboard.",
  alternates: { canonical: "/login" },
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
