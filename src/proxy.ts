import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Attaches the Clerk session to every request. It no longer gates anything.
 *
 * This used to redirect signed-out requests for /learn/<track>/<slug> to Clerk's
 * hosted sign-in. That was a 307 off the domain, served before the page
 * rendered, and it cost more than it bought:
 *
 *   - `sitemap.xml` advertises ~123 chapter URLs and `robots.txt` says Allow: /.
 *     Every one of them answered a crawler with an off-site redirect, so the
 *     largest body of original work on the site could not be indexed at all.
 *   - Next's <Link> prefetch requests those same URLs. A cross-origin redirect
 *     fails CORS, which surfaces in the console as a bare "Failed to fetch"
 *     TypeError with nothing to point at.
 *   - The welcome email says "123 chapters, free forever. No paywall, no trial"
 *     and then had to route every link around the wall to keep that true.
 *
 * What replaced it is a blurred preview with an invitation to sign up, in
 * LessonPreviewWall. That is a softer gate on purpose — see its header.
 *
 * Removing the gate also removed the last `createRouteMatcher` call, which Clerk
 * deprecates and drops in v8. Nothing here needs replacing when that lands.
 *
 * Clerk's handler is only engaged once keys exist. Without them it's a
 * pass-through, so the site builds and runs exactly as before.
 *
 * Next 16 renamed the `middleware` file convention to `proxy`; Clerk still ships
 * `clerkMiddleware()`, which is just a request handler, so it drops straight in.
 */
export const proxy = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware()
  : () => NextResponse.next();

export const config = {
  matcher: [
    // Skip Next internals and static files, run on everything else + API routes.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
