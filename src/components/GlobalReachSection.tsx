import { IMPACT_HREF, INDIA_CHAPTER_HREF } from "@/lib/links";

export function GlobalReachSection() {
  return (
    <section id="impact" className="scroll-mt-24" aria-labelledby="india-chapter-title">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-y border-[var(--home-hairline)] py-8 md:py-10">
          <div>
            <h2 id="india-chapter-title" className="home-serif text-3xl">CodeWithPurpose India</h2>
            <p className="mt-3 max-w-lg text-[var(--home-ink-soft)]">
              Find coding workshops in India or ask how to set up a chapter at your school or college.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={INDIA_CHAPTER_HREF} className="home-btn home-btn-outline">Visit the India chapter</a>
            <a href={IMPACT_HREF} className="home-arrow-link">Read our stories</a>
          </div>
        </div>
      </div>
    </section>
  );
}
