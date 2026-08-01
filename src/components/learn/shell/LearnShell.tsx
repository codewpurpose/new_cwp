import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LearnSidebar } from "@/components/learn/shell/LearnSidebar";
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
 * Renders SiteHeader/SiteFooter itself rather than composing PageShell, because
 * the grid has to be the direct child of <main> — PageShell's <main> takes no
 * className and PageSection would re-centre the content a second time.
 *
 * The root is a <div>, not a <section>: globals.css sets
 * `.home-root section { border-color: var(--home-fern) }`, which would tint any
 * bordered section inside the shell green.
 */
export function LearnShell({ track, aside, mobileBar, children }: LearnShellProps) {
  return (
    <>
      <SiteHeader />
      <div className="learn-header-scrim" aria-hidden="true" />
      <main id="learn-content">
        <div className="learn-shell">
          <aside className="learn-sidebar">
            <LearnSidebar track={track} />
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
      <SiteFooter />
    </>
  );
}
