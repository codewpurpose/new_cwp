import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * The interactive lessons themselves require an account (progress + quizzes are
 * the point). A chapter route is `/learn/<track>/<slug>` — two segments after
 * /learn — so track index pages like `/learn/ml` stay open for browsing.
 */
const isLessonRoute = createRouteMatcher([/^\/learn\/[^/]+\/[^/]+/]);

/**
 * Clerk's handler is only engaged once keys exist. Without them it's a
 * pass-through, so the site builds and runs exactly as before (local-first,
 * lessons open to everyone).
 *
 * Next 16 renamed the `middleware` file convention to `proxy`; Clerk still ships
 * `clerkMiddleware()`, which is just a request handler, so it drops straight in.
 */
export const proxy = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware(async (auth, req) => {
      if (isLessonRoute(req)) {
        const { userId, redirectToSignIn } = await auth();
        if (!userId) return redirectToSignIn();
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    // Skip Next internals and static files, run on everything else + API routes.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
