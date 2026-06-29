import { images } from "@/lib/images";
import { COURSES_HREF } from "@/lib/links";

const GALLERY_IMAGES = images.gallery.slice(0, 4);

export function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="overflow-hidden rounded-xl bg-[var(--home-grey-450)]">
          <figure className="grid md:grid-cols-[2fr_3fr]">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-lg border-[0.5px] border-[var(--home-grey-500)]">
                {GALLERY_IMAGES.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ))}
              </div>
            </div>
            <figcaption className="flex flex-col justify-center p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#818181]">
                Watch our story
              </p>
              <h2 className="mt-3 text-lg leading-[1.15] md:text-[1.375rem]">
                See what CodeWithPurpose looks like in action
              </h2>
              <p className="mt-3 max-w-[40rem] text-sm leading-[1.5] text-[#636363]">
                In classrooms, at workshops, and in booths around the world,
                you&apos;ll find students coding, volunteers presenting, and
                communities gathering around free education. Every photo here is
                a student who got real skills because of this movement.
              </p>
              <a href={COURSES_HREF} className="home-arrow-link mt-5 self-start">
                Start Learning Free <span className="home-arrow">→</span>
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
