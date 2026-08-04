import type { Metadata } from "next";
import Link from "next/link";
import { COURSES_HREF, HOME_HREF } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[40rem] flex-col items-center justify-center px-5 py-24 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/koala/koala-sleep.png"
        alt="A sleeping koala"
        width={260}
        className="h-auto w-[220px] md:w-[260px]"
        style={{ filter: "drop-shadow(0 12px 20px rgba(21,18,12,0.12))" }}
      />
      <p className="home-mono mt-6 text-xs uppercase tracking-[0.18em] text-[var(--home-ink-quiet)]">
        Error 404
      </p>
      <h1 className="home-serif mt-3 text-[2rem] leading-[1.1] md:text-[2.75rem]">
        This page is having a nap
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--home-ink-soft)]">
        We couldn&rsquo;t find what you were looking for. It might have moved, or
        maybe Koda dozed off on it. Let&rsquo;s get you back to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={HOME_HREF} className="home-btn home-btn-fill">
          Back home
        </Link>
        <Link href={COURSES_HREF} className="home-btn home-btn-outline">
          Browse courses
        </Link>
      </div>
    </main>
  );
}
