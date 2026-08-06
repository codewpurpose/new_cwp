import type { Metadata } from "next";
import { PageSection } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Create a free CodeWithPurpose account to sync your progress across devices and join the student leaderboard.",
  alternates: { canonical: "/sign-up/" },
  robots: { index: false, follow: true },
};

export default function SignUpPage() {
  return (
    <PageShell>
      <PageSection>
        <div className="py-10">
          <LoginForm mode="signup" />
        </div>
      </PageSection>
    </PageShell>
  );
}
