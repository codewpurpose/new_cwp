import { getTrackOutline } from "@/components/courses/catalog";
import { LearnSpaceBar, LearnSpaceFooter, LearnSpaceSkipLink } from "@/components/learn/space/LearnSpaceShell";
import { TrackProgressProvider } from "@/components/learn/space/TrackProgress";
import { LearnSidebar } from "@/components/learn/shell/LearnSidebar";
import { LessonKoda } from "@/components/learn/koda/LessonKoda";
import { ReadingProgress } from "@/components/learn/reader/ReadingProgress";
import { getSidebarNav } from "@/lib/learn-nav";
import type { LearnTrackId } from "@/lib/learn-types";

interface LearnShellProps {
  track: LearnTrackId;
  /** Rendered into the right-hand rail at >=1440px. */
  aside?: React.ReactNode;
  /** Sticky chapter bar shown below 1200px. */
  mobileBar?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Documentation layout for chapter pages.
 *
 * Wears the learning space's moss bar and footer (LearnSpaceShell) rather than
 * the marketing SiteHeader/SiteFooter, so opening a chapter stays inside the
 * course instead of dropping back onto the main site. The bar is 56px at every
 * width; the `learnspace-reader` rule in globals.css feeds that into
 * --learn-header-h for the sticky rails and scroll padding.
 *
 * Renders its own chrome rather than composing PageShell, because
 * the grid has to be the direct child of <main> — PageShell's <main> takes no
 * className and PageSection would re-centre the content a second time.
 *
 * The root is a <div>, not a <section>: globals.css sets
 * `.home-root section { border-color: var(--home-fern) }`, which would tint any
 * bordered section inside the shell green.
 */
export function LearnShell({ track, aside, mobileBar, children }: LearnShellProps) {
  return (
    <TrackProgressProvider track={track} outline={getTrackOutline(track)}>
      <div className="learnspace-reader">
      <LearnSpaceSkipLink />
      <LearnSpaceBar track={track} />
      <ReadingProgress />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="learn-shell">
          <aside className="learn-sidebar">
            {/* Read here, on the server, so the client sidebar receives a
                flattened chapter list rather than importing the graph. */}
            <LearnSidebar track={track} nav={getSidebarNav(track)} />
            {/* Koda docks at the rail's foot (sticky to its bottom edge). The
                rail is display:none below 1200px, which is what keeps Koda off
                the lesson text on phones and tablets. */}
            <LessonKoda />
          </aside>

          <div className="learn-main">
            {mobileBar}
            {children}
          </div>

          {/* The column always exists so the grid keeps its shape, but only
              becomes a landmark when there is something in it. */}
          <aside className="learn-toc" aria-hidden={aside ? undefined : true}>
            {aside}
          </aside>
        </div>
      </main>
      <LearnSpaceFooter />
      </div>
    </TrackProgressProvider>
  );
}
