import Link from "next/link";
import { CwpLogo } from "@/components/icons";
import {
  ABOUT_HREF,
  BLOG_HREF,
  CONTACT_HREF,
  COURSES_HREF,
  DONATE_HREF,
  HACK_CLUB_HREF,
  HOME_HREF,
  JOIN_HREF,
} from "@/lib/links";

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 pb-6">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="rounded-xl bg-white p-5 shadow-[0_0_7.5rem_rgba(0,0,0,0.07)] md:p-6">
          <div className="grid items-end gap-y-10 lg:[grid-template-columns:repeat(20,minmax(0,1fr))]">
            <div className="self-start lg:col-span-8">
              <a
                href={HOME_HREF}
                className="flex flex-col gap-3"
                aria-label="CodeWithPurpose home"
              >
                <CwpLogo height={40} />
                <p className="max-w-sm text-sm text-[#636363]">
                  A student-run nonprofit making tech education free and
                  accessible for everyone, everywhere.
                </p>
                <p className="text-xs text-[#818181]">
                  Recognized by the U.S. House of Representatives
                </p>
              </a>
            </div>
            <div className="lg:col-span-12">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:gap-x-8">
                <div>
                  <h3 className="mb-3 text-xs opacity-60">Learn</h3>
                  <ul className="space-y-2 text-xs xl:text-base">
                    <li>
                      <a href={COURSES_HREF} className="home-footer-link">
                        All Courses
                      </a>
                    </li>
                    <li>
                      <a href={COURSES_HREF} className="home-footer-link">
                        Free Courses
                      </a>
                    </li>
                    <li>
                      <a href={ABOUT_HREF} className="home-footer-link">
                        Our Story
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-xs opacity-60">Get Involved</h3>
                  <ul className="space-y-2 text-xs xl:text-base">
                    <li>
                      <a href={JOIN_HREF} className="home-footer-link">
                        Volunteer
                      </a>
                    </li>
                    <li>
                      <a href={DONATE_HREF} className="home-footer-link">
                        Donate
                      </a>
                    </li>
                    <li>
                      <a href={CONTACT_HREF} className="home-footer-link">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-xs opacity-60">Resources</h3>
                  <ul className="space-y-2 text-xs xl:text-base">
                    <li>
                      <a href={BLOG_HREF} className="home-footer-link">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/impact" className="home-footer-link">
                        Impact
                      </a>
                    </li>
                    <li>
                      <Link href="/#faq" className="home-footer-link">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <div className="text-xs opacity-70">
              <span>© 2026 CodeWithPurpose</span>
              <p className="mt-1">
                Made by students, for students · Free education for every
                student, everywhere.
              </p>
            </div>
            <a
              href={HACK_CLUB_HREF}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs opacity-70 transition-opacity hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://assets.hackclub.com/flag-standalone.svg"
                alt="Hack Club"
                className="h-6 w-auto"
              />
              <span>A nonprofit fiscally sponsored by Hack Club</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
