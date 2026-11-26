import BounceCards from "@/components/reactbits/BounceCards";
import { images } from "@/lib/images";
import { JOIN_HREF } from "@/lib/links";

const GALLERY_IMAGES = images.gallery.slice(0, 4);

export function HowItWorksSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="overflow-hidden rounded-xl bg-[var(--home-grey-450)]">
          <figure id="how" className="grid scroll-mt-24 md:grid-cols-[2fr_3fr]">
            <div className="flex items-center p-5 sm:p-6 md:p-8">
              {/* React Bits BounceCards: the four photos as a fanned stack that
                  spreads apart on hover (tap on a phone). The fan is
                  server-rendered in place, so it reads fine without JS.
                  Eight sections below the fold and ~1.6MB between them, so
                  these are deferred: eager, they were fetched on first paint
                  and held up `window.load` — and with it the splash screen —
                  for the whole download on a slow connection. */}
              <BounceCards
                images={GALLERY_IMAGES}
                loading="lazy"
                className="aspect-[2/1] w-full md:aspect-[16/10]"
              />
            </div>
            <figcaption className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
              <h2 className="mt-3 text-lg leading-[1.15] md:text-[1.375rem]">
                Photos from our workshops
              </h2>
              <p className="mt-3 max-w-[40rem] text-sm leading-[1.5] text-[var(--home-ink-soft)]">
                Our volunteers teach in classrooms and at community events.
                Tell us what your group would like to learn.
              </p>
              <a href={`${JOIN_HREF}#host-workshop`} className="home-arrow-link mt-5 self-start">
                Host a workshop
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
