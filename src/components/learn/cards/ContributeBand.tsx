import { PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/learn/primitives/Tag";
import { GitHubIcon } from "@/components/icons";
import { GITHUB_HREF, LESSON_AUTHORING_HREF, LESSON_PROPOSAL_HREF } from "@/lib/links";

interface ContributeBandProps {
  /** What this track calls a unit: "lesson" for ML, "chapter" for vibe coding. */
  noun?: string;
}

/**
 * The empty slot at the end of the track.
 *
 * Every card above this one carries generated SVG art that previews the lesson
 * it opens. This is one more card in that family, left blank and marked Draft —
 * the reader has just scrolled past seven or twenty-nine of them, so an eighth
 * empty one says "yours goes here" without a sentence of explanation, and
 * teaches the draft state at the same time.
 *
 * Deliberately left-aligned and asymmetric rather than a centred box, and
 * deliberately one button rather than two: the guide is a quieter path than
 * opening the repo, so it reads as the site's arrow link instead of competing
 * for the same weight.
 */
export function ContributeBand({ noun = "lesson" }: ContributeBandProps) {
  return (
    <PageSection className="border-t-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)]">
      <Reveal>
        <div className="home-card mx-auto max-w-4xl rounded-learn-xl p-6 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[200px_1fr] md:gap-12">
            <EmptySlot />

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-learn-accent-text">
                Open source
              </p>

              <h2 className="home-serif mt-3 text-[1.6rem] leading-[1.15] text-learn-strong md:text-[2.1rem]">
                Your {noun} goes here
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-learn-muted">
                Every {noun} here was written by a student.{" "}
                <a
                  href={LESSON_PROPOSAL_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="learn-focusable text-learn-link underline underline-offset-2"
                >
                  Propose your own topic
                </a>
                , or fix one that confused you. Drafts stay invisible until they are ready, so
                nothing you start can break the site.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={GITHUB_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="home-btn home-btn-moss learn-focusable gap-2"
                >
                  <GitHubIcon className="h-[1.05em] w-[1.05em]" />
                  Contribute on GitHub
                </a>

                <a
                  href={LESSON_AUTHORING_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="home-arrow-link learn-focusable"
                >
                  Read the authoring guide{" "}
                  <span aria-hidden="true" className="home-arrow">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </PageSection>
  );
}

/**
 * A lesson card with nothing in it yet — same proportions and chrome as the
 * real ones, drawn from tokens so it stays in step with them.
 */
function EmptySlot() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[200px] overflow-hidden rounded-learn-lg border-[0.5px] border-learn-line bg-learn-surface"
    >
      <div className="relative aspect-[16/9] bg-[var(--learn-chart-plot)]">
        <div className="absolute inset-2 rounded-learn-sm border border-dashed border-learn-accent/55" />
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 32 32" className="h-9 w-9" fill="none">
            <circle
              cx={16}
              cy={16}
              r={11}
              fill="var(--learn-surface-quiet)"
              stroke="var(--learn-accent)"
              strokeWidth={1}
            />
            <path
              d="M16 10.5v11M10.5 16h11"
              stroke="var(--learn-accent-text)"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="p-4">
        <Tag>Draft</Tag>
        <div className="mt-3 h-[6px] w-[70%] rounded-full bg-learn-quiet" />
        <div className="mt-2 h-[6px] w-[45%] rounded-full bg-learn-quiet" />
      </div>
    </div>
  );
}
