import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

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
    <section className="relative overflow-hidden border-b-[0.5px] border-[var(--home-grey-500)] bg-[var(--home-page)] pt-12 pb-14 md:pt-20 md:pb-24">
      <div aria-hidden="true" className="cwp-hero-bg absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-[85rem] items-center gap-10 px-5 md:px-10 lg:grid-cols-2">
        <Reveal>
          <h1 className="home-serif text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-[1.5] text-[#636363]">
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
              <div className="home-card relative overflow-hidden rounded-[20px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
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
  photos: readonly { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-2.5 ${colClass}`}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="home-card home-lift overflow-hidden rounded-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
