"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { ClerkDataSync } from "@/lib/supabase/with-clerk";

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
    >
      <ClerkDataSync />
      {children}
    </ClerkProvider>
  );
}
