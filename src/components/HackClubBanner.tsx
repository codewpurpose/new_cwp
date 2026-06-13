import { HACK_CLUB_HREF } from "@/lib/links";

export function HackClubBanner() {
  return (
    <a
      href={HACK_CLUB_HREF}
      target="_blank"
      rel="noreferrer"
      className="group relative z-20 flex items-center justify-center gap-2.5 bg-[#1e3c2c] px-4 py-2 text-[13px] text-[#dbefdb]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://assets.hackclub.com/flag-standalone.svg"
        alt="Hack Club"
        className="h-4 w-auto"
      />
      <span>
        Proudly fiscally sponsored by{" "}
        <span className="font-medium underline-offset-2 group-hover:underline">
          Hack Club
        </span>
      </span>
      <span aria-hidden="true" className="home-arrow">
        →
      </span>
    </a>
  );
}
