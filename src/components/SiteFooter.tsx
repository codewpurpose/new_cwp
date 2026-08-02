import Link from "next/link";
import { CwpLogo, DiscordIcon, InstagramIcon } from "@/components/icons";
import {
  ABOUT_HREF,
  BLOG_HREF,
  CONTACT_HREF,
  COURSES_HREF,
  DISCORD_HREF,
  DONATE_HREF,
  HOME_HREF,
  INSTAGRAM_HREF,
  JOIN_HREF,
  LEARN_HREF,
  LEARN_ML_HREF,
  LEARN_VIBECODING_HREF,
} from "@/lib/links";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-[var(--home-grey-500)] text-[#636363] transition-colors hover:border-[var(--home-fern)] hover:bg-[#f3faf3] hover:text-[var(--home-moss)]"
    >
      {children}
    </a>
  );
}

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
                <p className="text-xs text-[#636363]">
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
                      <a href={LEARN_ML_HREF} className="home-footer-link">
                        ML Lessons
                      </a>
                    </li>
                    <li>
                      <a href={LEARN_VIBECODING_HREF} className="home-footer-link">
                        Vibe Coding Lessons
                      </a>
                    </li>
                    <li>
                      <a href={LEARN_HREF} className="home-footer-link">
                        Learn
                      </a>
                    </li>
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
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2">
                <SocialLink href={DISCORD_HREF} label="Join us on Discord">
                  <DiscordIcon className="h-[18px] w-[18px]" />
                </SocialLink>
                <SocialLink href={INSTAGRAM_HREF} label="Follow us on Instagram">
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </SocialLink>
              </div>
              <span className="text-xs opacity-70">
                Student-led free education for everyone
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
