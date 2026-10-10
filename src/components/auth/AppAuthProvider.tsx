"use client";

import { ClerkProvider, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ClerkDataSync = dynamic(
  () => import("@/lib/supabase/with-clerk").then((module) => module.ClerkDataSync),
  { ssr: false },
);

function SignedInDataSync() {
  const { isSignedIn } = useUser();
  return isSignedIn ? <ClerkDataSync /> : null;
}

/**
 * Wraps the app in Clerk and keeps the leaderboard profile in sync. Only mounted
 * when Clerk is configured (see the root layout) — without keys the tree renders
 * bare and the whole site stays local-first.
 */
export function AppAuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/login"
      signUpUrl="/sign-up"
      appearance={{ variables: { colorPrimary: "#3e7f5c" } }}
      localization={{
        signIn: {
          start: {
            actionText: "New to CodeWithPurpose?",
            actionLink: "Create a free account",
          },
        },
        signUp: {
          start: {
            actionText: "Already have an account?",
            actionLink: "Sign in",
          },
        },
      }}
    >
      <SignedInDataSync />
      {children}
    </ClerkProvider>
  );
}
