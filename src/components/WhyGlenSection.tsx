"use client";

import { Fragment, useState, type ReactNode } from "react";
import { DONATE_HREF } from "@/lib/links";

interface ImpactDetail {
  title: string;
  body: string;
  scenario: string;
}

interface ImpactItem {
  label: string;
  icon: ReactNode;
  detail: ImpactDetail;
}

const items: ImpactItem[] = [
  {
    label: "Free forever",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M10 2.5v15M5 5.5h10M5 14.5h10" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Education that never costs a dime",
      body: "Every course, workshop, and resource is completely free. No hidden fees, no premium tiers — just quality coding education for every student who wants it.",
      scenario:
        "A student in rural India joins our Python course on day one. They never see a paywall, a subscription prompt, or a credit card form.",
    },
  },
  {
    label: "Student-run nonprofit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="7" cy="7" r="3" />
        <circle cx="13.5" cy="7" r="2.5" />
        <path d="M2 17c0-2.8 2.2-5 5-5s5 2.2 5 5" />
        <path d="M13 12c1.8 0 3.5 1 4.5 2.5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Made by students, for students",
      body: "CodeWithPurpose is run by students who believe every young person deserves access to coding skills. We teach, organize, and build because we've seen what happens when education is out of reach.",
      scenario:
        "Our curriculum is designed by students who recently learned to code themselves — so every lesson speaks to what beginners actually need.",
    },
  },
  {
    label: "Global reach",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <ellipse cx="10" cy="10" rx="3.2" ry="7.5" />
        <path d="M2.5 10h15" />
      </svg>
    ),
    detail: {
      title: "Students on every corner of the Earth",
      body: "From San Francisco to Lagos, Bangalore to São Paulo — over 110 countries and counting. Every dot on our map is a student who got access to free, real education because of this community.",
      scenario:
        "2,000+ students across 110 countries already learning with us — for free, with no strings attached.",
    },
  },
  {
    label: "Congressional recognition",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 2.5h7l3 3v12H5v-15Z" />
        <path d="M12 2.5v3h3M7.5 9.5h5M7.5 12.5h5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Recognized at the highest level",
      body: "Representative Mark DeSaulnier of the U.S. House of Representatives recognized CodeWithPurpose for tremendous leadership and service to our community in 2026.",
      scenario:
        "A formal letter from the U.S. House of Representatives celebrating our work reaching students who otherwise couldn't access coding education.",
    },
  },
  {
    label: "Real projects, real skills",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <path d="M7 8h6M7 12h4" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "From zero to building real projects",
      body: "Our Python course takes complete beginners to building real projects — loved by 800+ students across 50+ countries. Vibecoding 101 teaches students to build apps with AI tools like Cursor and Copilot.",
      scenario:
        "A student with zero experience finishes our Python bootcamp and ships their first project — not a toy exercise, but something they can show the world.",
    },
  },
  {
    label: "Volunteer-powered",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13.5c4.5-2.5 6.5-6.5 6.5-11-4.5 0-8.5 2-11 6.5l4.5 4.5Z" />
      </svg>
    ),
    detail: {
      title: "A community that leans in",
      body: "Volunteers mentor students in classrooms, workshops, and one-on-one sessions. They troubleshoot bugs, celebrate breakthroughs, and make coding feel approachable for everyone.",
      scenario:
        "A volunteer leans in to help a young student at their laptop — the kind of moment that defines what CodeWithPurpose is all about.",
    },
  },
  {
    label: "20+ languages taught",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M3 4.5h14v11H3v-11Z" />
        <path d="M3 8h14M7 4.5V15.5" />
      </svg>
    ),
    detail: {
      title: "Education that crosses borders",
      body: "We teach in 20+ languages so students can learn in the language they're most comfortable with. Coding is universal, but learning shouldn't require English fluency.",
      scenario:
        "A student learns Python in their native language, then joins a global community of 2,000+ learners who share the same passion for code.",
    },
  },
];

function DetailContent({ detail }: { detail: ImpactDetail }) {
  return (
    <>
      <h4 className="pr-8 text-lg leading-[1.2] md:text-xl">{detail.title}</h4>
      <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
        {detail.body}
      </p>
      <div className="mt-5 border-t-[0.5px] border-[#e1e1e1] pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#818181]">
          In the field
        </p>
        <p className="mt-2 text-[14px] leading-[1.55] text-[#0a0e19]">
          {detail.scenario}
        </p>
      </div>
    </>
  );
}

export function WhyGlenSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState(0);
  const activeDetail = items[lastIndex].detail;

  return (
    <div id="impact" className="mt-28 scroll-mt-24 md:mt-44">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="relative flex overflow-hidden rounded-[24px] md:min-h-[760px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 18% 22%, #2c4636 0%, transparent 55%), radial-gradient(110% 80% at 85% 75%, #20303f 0%, transparent 60%), radial-gradient(70% 60% at 60% 35%, #3a3128 0%, transparent 65%), #11161c",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/30" />
          <div className="relative z-[1] flex w-full flex-col justify-between gap-10 p-7 md:flex-row md:p-[46px]">
            <h3 className="home-serif text-[1.75rem] leading-[1.05] text-white md:text-[2.75rem]">
              Global reach
            </h3>
            <div className="flex w-full flex-col md:w-auto md:flex-row md:self-stretch">
              <div className="flex w-full flex-col rounded-xl bg-white/95 p-2 backdrop-blur-[10px] md:w-[452px] md:max-w-none">
                {items.map((item, index) => (
                  <Fragment key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        if (open === index) {
                          setOpen(null);
                        } else {
                          setLastIndex(index);
                          setOpen(index);
                        }
                      }}
                      aria-expanded={open === index}
                      aria-controls={`impact-detail impact-detail-${index}`}
                      className={[
                        "home-template-row group flex flex-1 items-center gap-3 border-t-[0.5px] border-[#e1e1e1] px-4 py-4 text-left first:border-t-0",
                        open === index ? "rounded-lg bg-[#f3f3f1]" : "",
                      ].join(" ")}
                    >
                      <span className="shrink-0 text-[#0a0e19]">
                        {item.icon}
                      </span>
                      <span className="flex-1 text-[15px]">{item.label}</span>
                      <span className="home-row-arrow text-[#397554]">→</span>
                    </button>
                    <div
                      id={`impact-detail-${index}`}
                      className={[
                        "home-detail min-[1200px]:hidden",
                        open === index ? "home-detail-open" : "",
                      ].join(" ")}
                      aria-hidden={open !== index}
                    >
                      <div className="home-detail-inner">
                        <div className="rounded-lg bg-[#f3f3f1] px-4 py-5">
                          <DetailContent detail={item.detail} />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <aside
                id="impact-detail"
                className={[
                  "home-detail hidden shrink-0 min-[1200px]:block",
                  open !== null ? "home-detail-open" : "",
                ].join(" ")}
                aria-hidden={open === null}
              >
                <div className="home-detail-inner">
                  <div className="relative h-full rounded-xl bg-white/95 p-6 backdrop-blur-[10px] md:p-7">
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      aria-label="Close detail window"
                      className="absolute right-5 top-5 text-xl leading-none text-[#818181] transition-colors hover:text-[#0a0e19]"
                      tabIndex={open === null ? -1 : 0}
                    >
                      ×
                    </button>
                    <DetailContent detail={activeDetail} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <a href={DONATE_HREF} className="home-arrow-link">
            Support our mission <span className="home-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
