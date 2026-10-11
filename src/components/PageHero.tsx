import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import Masonry from "@/components/reactbits/Masonry";
import TiltedCard from "@/components/reactbits/TiltedCard";

const HERO_TITLE_CLASS =
  "home-display text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]";

export function PageHero({
  title,
  description,
  children,
  image,
  imageAlt,
}: {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] pt-12 pb-14 md:pt-20 md:pb-24">
      <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
      <div
        className={`relative mx-auto grid w-full max-w-[85rem] items-center gap-10 px-5 md:px-10 ${
          image ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        <Reveal>
          {/* Plain-string titles get the React Bits word reveal; a few pages
              pass markup (links, line breaks), which stays a static heading. */}
          {typeof title === "string" ? (
            <BlurText as="h1" text={title} className={HERO_TITLE_CLASS} />
          ) : (
            <h1 className={HERO_TITLE_CLASS}>{title}</h1>
          )}
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-[1.5] text-[var(--home-ink-soft)]">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-2">{children}</div>}
        </Reveal>
        {image && (
          <Reveal delay={0.15}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rotate-[1.4deg] rounded-[24px] border-[0.5px] border-[#cde4cd] bg-[#dbefdb]/60"
              />
              {/* A small CSS lift keeps the photo responsive without pointer tracking. */}
              <TiltedCard className="relative">
                <div className="home-card relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
                  <Image
                    src={image}
                    alt={imageAlt ?? ""}
                    // The hero art is the largest thing above the fold on every
                    // page that has one, so it is almost always the LCP element.
                    // Left at default priority it queues behind the fonts and the
                    // rest of the head; deliberately NOT lazy for the same reason.
                    fill
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 80px), (max-width: 1359px) calc(50vw - 60px), 620px"
                    priority
                    className="object-cover"
                  />
                </div>
              </TiltedCard>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function PageSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">{children}</div>
    </section>
  );
}

export function PhotoGrid({
  photos,
  columns = 4,
}: {
  photos: readonly { src: string; alt: string; width: number; height: number }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2
      ? "columns-2"
      : columns === 3
        ? "columns-2 md:columns-3"
        : "columns-2 md:columns-3 lg:columns-4";

  // Intrinsic dimensions reserve each photo’s natural shape before it loads.
  return (
    <Masonry
      photos={photos}
      className={colClass}
    />
  );
}
