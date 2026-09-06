import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import { MediaGrid } from "@/components/media/MediaCard";
import { getFeaturedMedia } from "@/lib/media";
import { INSTAGRAM_HREF, MEDIA_HREF } from "@/lib/links";

export function MediaSection() {
  const featured = getFeaturedMedia();

  return (
    <section id="media" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="flex flex-col gap-4 border-b-[0.5px] border-[var(--home-hairline)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">See what we&apos;re making</h2>
            <p className="mt-3 max-w-2xl text-[var(--home-ink-soft)]">
              Short lessons, student stories, and the work happening behind free
              education.
            </p>
          </div>
          <Link href={MEDIA_HREF} className="home-arrow-link shrink-0 self-start sm:self-auto">
            View all videos <span className="home-arrow">→</span>
          </Link>
        </div>

        <div className="mt-8">
          {featured.length > 0 ? (
            <MediaGrid items={featured} />
          ) : (
            <div className="home-card rounded-[20px] bg-[var(--home-grey-450)] p-7 md:p-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="home-serif text-[1.5rem] md:text-[1.9rem]">New videos are on the way</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">
                    Follow along while we bring our lessons and workshops to the
                    screen.
                  </p>
                </div>
                <a
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="home-btn home-btn-outline shrink-0"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Follow on Instagram
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
