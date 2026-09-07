import { InstagramIcon } from "@/components/icons";
import { getYouTubeEmbedUrl, type MediaItem } from "@/lib/media-types";

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  if (item.platform === "youtube") {
    if (!item.videoId) {
      throw new Error(`YouTube item ${item.id} is missing its videoId.`);
    }

    return (
      <article className="home-card overflow-hidden rounded-[20px]">
        <div className="aspect-video bg-[var(--home-grey-450)]">
          <iframe
            src={getYouTubeEmbedUrl(item.videoId)}
            title={`${item.title} on YouTube`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--home-hairline)] px-6 py-4 md:px-7">
          <p className="text-sm text-[var(--home-ink-soft)]">
            Player not loading?
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} — watch on YouTube`}
            className="home-arrow-link text-sm"
          >
            Watch on YouTube <span className="home-arrow">→</span>
          </a>
        </div>
        <div className="p-6 md:p-7">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--home-ink-quiet)]">
            YouTube
          </p>
          <h2 className="mt-2 text-xl leading-tight md:text-2xl">{item.title}</h2>
          <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
            {item.description}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="home-card home-lift overflow-hidden rounded-[20px]">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} — watch on Instagram`}
        className="group block"
      >
        <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,#f4d7d2,#e1d7f3_52%,#d7eedb)]">
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-[var(--home-moss)]">
              <InstagramIcon className="h-12 w-12" />
              <span className="text-sm font-medium">Watch on Instagram</span>
            </div>
          )}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[var(--home-ink)] px-3 py-1.5 text-xs font-medium text-white shadow-[var(--home-shadow-sm)]">
            <InstagramIcon className="h-3.5 w-3.5" />
            Instagram
          </span>
        </div>
        <div className="p-6 md:p-7">
          <h2 className="text-xl leading-tight md:text-2xl">{item.title}</h2>
          <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-ink-soft)]">
            {item.description}
          </p>
          <span className="home-arrow-link mt-5">
            Watch on Instagram <span className="home-arrow">→</span>
          </span>
        </div>
      </a>
    </article>
  );
}

export function MediaGrid({
  items,
  emptyTitle = "New videos are on the way",
  emptyDescription = "We're collecting the lessons, workshops, and small moments that make CodeWithPurpose what it is. Check back soon for the first set.",
}: {
  items: readonly MediaItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (items.length === 0) {
    return (
      <div className="home-card rounded-[20px] bg-[var(--home-grey-450)] p-8 text-center md:p-12">
        <h2 className="home-serif text-[1.75rem] md:text-[2.25rem]">{emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
