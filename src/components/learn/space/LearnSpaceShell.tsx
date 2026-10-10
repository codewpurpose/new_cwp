import Link from "next/link";
import { CwpLogo, GitHubIcon } from "@/components/icons";
import { getSwitcherCourses, getTrackOutline } from "@/components/courses/catalog";
import { CourseSwitcher } from "@/components/learn/space/CourseSwitcher";
import { HeaderProgress, TrackProgressProvider } from "@/components/learn/space/TrackProgress";
import { TRACK_ROUTES } from "@/lib/learn-routes";
import type { LearnTrackId } from "@/lib/learn-types";
import { ABOUT_HREF, CONTACT_HREF, COURSES_HREF, GITHUB_HREF, HOME_HREF } from "@/lib/links";

/**
 * The learning space: what a course looks like once you've walked into it.
 *
 * The marketing site's header, nav and footer are deliberately absent. In their
 * place is one compact moss bar that only knows about this course — its name,
 * how far you are through it, the other courses, and the way back out. The
 * moss is the same colour the catalogue's entry transition fills the screen
 * with, so arriving here reads as one continuous movement.
 *
 * Server component. The only client pieces are the progress islands (which
 * read the local store after mount) and the course switcher.
 */
export function LearnSpaceShell({
  track,
  children,
}: {
  track: LearnTrackId;
  children: React.ReactNode;
}) {
  const outline = getTrackOutline(track);

  return (
    <TrackProgressProvider track={track} outline={outline}>
      <div className="learnspace flex min-h-screen flex-col bg-[var(--home-page)]">
        <LearnSpaceSkipLink />
        <LearnSpaceBar track={track} />

        <main id="main-content" tabIndex={-1} className="learnspace-enter flex-1 outline-none">
          {children}
        </main>

        <LearnSpaceFooter />
      </div>
    </TrackProgressProvider>
  );
}

/** Shared with the lesson reader (LearnShell), so a chapter keeps the course's
 *  bar instead of dropping back to the marketing header. The bar must sit
 *  inside a TrackProgressProvider for its progress ring. */
export function LearnSpaceSkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#fcf4e8] focus:px-4 focus:py-3 focus:text-sm focus:text-[#15120c] focus:outline-none focus:ring-2 focus:ring-[var(--home-fern)]"
    >
      Skip to main content
    </a>
  );
}

export function LearnSpaceBar({ track }: { track: LearnTrackId }) {
  const route = TRACK_ROUTES[track];
  const courses = getSwitcherCourses();
  return (
    <header className="learnspace-bar sticky top-0 z-30 bg-[#1e3c2c] text-[#fcf4e8]">
      <div className="mx-auto flex h-14 w-full max-w-[85rem] items-center gap-3 px-4 md:px-10">
        <a
          href={HOME_HREF}
          aria-label="CodeWithPurpose home"
          className="learn-focusable flex shrink-0 items-center rounded-md"
        >
          <CwpLogo className="learnspace-logo !text-[#fcf4e8]" />
        </a>

        <span aria-hidden="true" className="h-6 w-px shrink-0 bg-[#fcf4e8]/20" />

        <div className="min-w-0 flex-1 leading-tight">
          <p className="home-mono text-[10px] uppercase tracking-[0.14em] text-[#9fd3a8]">
            Course
          </p>
          <p className="home-serif truncate text-[15px] md:text-[17px]">{route.title}</p>
        </div>

        <HeaderProgress />

        <CourseSwitcher current={track} courses={courses} />

        <a
          href={HOME_HREF}
          className="learn-focusable inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#fcf4e8] px-3 text-[13px] font-medium text-[#1e3c2c] transition-colors hover:bg-white"
          aria-label="Back to site"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
            <path d="M9.5 3.5L5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline" aria-hidden="true">
            Back to site
          </span>
        </a>
      </div>
    </header>
  );
}

export function LearnSpaceFooter() {
  return (
    <footer className="border-t-[0.5px] border-[var(--home-hairline-strong)] bg-[#15120c] text-[#fcf4e8]/80">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-4 px-5 py-8 text-[13.5px] md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <CwpLogo className="learnspace-logo-foot !text-[#fcf4e8]" />
          <span className="text-[#fcf4e8]/55">Free lessons, written by students.</span>
        </div>
        <nav aria-label="Learning space" className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={HOME_HREF} className="learn-focusable hover:text-white">
            Home
          </a>
          <Link href={COURSES_HREF} className="learn-focusable hover:text-white">
            All courses
          </Link>
          <a href={ABOUT_HREF} className="learn-focusable hover:text-white">
            About
          </a>
          <a href={CONTACT_HREF} className="learn-focusable hover:text-white">
            Contact
          </a>
          <a
            href={GITHUB_HREF}
            target="_blank"
            rel="noreferrer"
            className="learn-focusable inline-flex items-center gap-1.5 hover:text-white"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            Contribute
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
