import type { Metadata } from "next";
import Link from "next/link";
import { KodaLost } from "@/components/koda/KodaLost";
import Magnet from "@/components/reactbits/Magnet";
import Shuffle from "@/components/reactbits/Shuffle";
import { COURSES_HREF, HOME_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[40rem] flex-col items-center justify-center px-5 py-16 text-center md:py-24">
      {/* A big, puzzled Koda searching for the page. The corner mascot hides
          itself while this one is on screen. */}
      <KodaLost />
      <p className="home-mono mt-6 text-xs uppercase tracking-[0.18em] text-[var(--home-ink-quiet)]">
        <Shuffle text="Error 404" />
      </p>
      <h1 className="home-serif mt-3 text-[2rem] leading-[1.1] md:text-[2.75rem]">
        This page climbed away
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">
        We couldn&rsquo;t find what you were looking for. It might have moved,
        or the link may be out of date. Let&rsquo;s get you back to something
        useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Magnet>
          <Link href={HOME_HREF} className="home-btn home-btn-fill">
            Back home
          </Link>
        </Magnet>
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse courses
        </Link>
      </div>
    </main>
  );
}
