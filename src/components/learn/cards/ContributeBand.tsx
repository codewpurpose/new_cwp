import { PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GITHUB_HREF, LESSON_AUTHORING_HREF } from "@/lib/links";

interface ContributeBandProps {
  /** Override when a track wants to name its own subject matter. */
  title?: string;
  body?: React.ReactNode;
}

/**
 * The open-source invitation at the foot of the learn section.
 *
 * Sits below CtaBand on the track pages, so it is deliberately light against
 * that band's inverse fill — two dark blocks in a row read as one, and this is
 * a different ask to a different reader.
 */
export function ContributeBand({
  title = "Know something worth teaching?",
  body = "These lessons are open source, written by students in the open. Add a topic of your own, or fix a lesson that confused you — the guide walks through every step.",
}: ContributeBandProps) {
  return (
    <PageSection className="border-t-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)]">
      <Reveal>
        <div className="home-card mx-auto max-w-3xl rounded-[20px] p-8 text-center md:p-10">
          <h2 className="home-serif text-[1.5rem] text-learn-strong md:text-[2rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-learn-muted">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href={GITHUB_HREF}
              target="_blank"
              rel="noreferrer"
              className="home-btn home-btn-fill learn-focusable"
            >
              Contribute on GitHub
            </a>
            <a
              href={LESSON_AUTHORING_HREF}
              target="_blank"
              rel="noreferrer"
              className="home-btn home-btn-outline learn-focusable"
            >
              Read the authoring guide
            </a>
          </div>
        </div>
      </Reveal>
    </PageSection>
  );
}
