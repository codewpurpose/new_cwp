"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
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
    label: "Free courses",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M2 10c0-1.6 1.4-2.8 3.2-2.8 3 0 6.6 5.6 9.6 5.6 1.8 0 3.2-1.2 3.2-2.8s-1.4-2.8-3.2-2.8c-3 0-6.6 5.6-9.6 5.6C3.4 12.8 2 11.6 2 10Z" strokeLinejoin="round" />
      </svg>
    ),
    detail: {
      title: "Education without a fee",
      body: "Every course, workshop, and resource is free. There are no premium tiers or payment forms.",
      scenario:
        "A student in rural India joins our Python course on day one. They never see a paywall, a subscription prompt, or a credit card form.",
    },
  },
  {
    label: "Student-run nonprofit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M10 3.5 2.5 7 10 10.5 17.5 7 10 3.5Z" strokeLinejoin="round" />
        <path d="M5.5 9v3c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5V9" />
        <path d="M17.5 7v4.5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Made by students, for students",
      body: "CodeWithPurpose is run by students who want every young person to have access to coding skills. We teach, organise, and build courses for people who cannot afford a bootcamp.",
      scenario:
        "Our curriculum is written by students who just learned to code themselves, so every lesson speaks to what beginners actually need.",
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
      title: "Students in 150+ countries",
      body: "Students use CodeWithPurpose from San Francisco, Lagos, Bangalore, São Paulo, and many other places.",
      scenario:
        "5,000+ students across 150 countries can learn with us for free.",
    },
  },
  {
    label: "Congressional recognition",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 3 3 7.5h14L10 3Z" />
        <path d="M5 10v4.5M8.33 10v4.5M11.67 10v4.5M15 10v4.5" strokeLinecap="round" />
        <path d="M3 17h14" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Recognized by Congress",
      body: "Representative Mark DeSaulnier of the U.S. House of Representatives recognized CodeWithPurpose for tremendous leadership and service to our community in 2026.",
      scenario:
        "A formal letter from the U.S. House of Representatives celebrating our work reaching students who otherwise couldn't access coding education.",
    },
  },
  {
    label: "Real projects, real skills",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 6.5 3 10l3.5 3.5" />
        <path d="M13.5 6.5 17 10l-3.5 3.5" />
        <path d="M11.5 4.5l-3 11" />
      </svg>
    ),
    detail: {
      title: "Build projects from the start",
      body: "Our Python course takes complete beginners through their first projects. Vibecoding 101 teaches students to build apps with AI tools like Cursor and Copilot.",
      scenario:
        "A student with zero experience finishes our Python bootcamp and ships their first project. Not a toy exercise, but something they can show the world.",
    },
  },
  {
    label: "Volunteer-powered",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 16.5s-6.5-3.8-6.5-8.2C3.5 5.9 5.4 4.5 7.3 4.5c1.1 0 2.1.5 2.7 1.4.6-.9 1.6-1.4 2.7-1.4 1.9 0 3.8 1.4 3.8 3.8 0 4.4-6.5 8.2-6.5 8.2Z" />
      </svg>
    ),
    detail: {
      title: "Volunteers who teach",
      body: "Volunteers mentor students in classrooms, workshops, and one-on-one sessions. They troubleshoot bugs, celebrate breakthroughs, and make coding feel approachable for everyone.",
      scenario:
        "A volunteer leans in to help a young student at their laptop. That moment is what CodeWithPurpose is all about.",
    },
  },
  {
    label: "30+ languages taught",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3.5h9V9H7.5L5 11.5V9H3V3.5Z" />
        <path d="M17 16.5H8V11h4.5L15 8.5V11h2v5.5Z" />
      </svg>
    ),
    detail: {
      title: "Education that crosses borders",
      body: "We teach in 30+ languages so students can learn in the language they're most comfortable with. Coding is universal, but learning shouldn't require English fluency.",
      scenario:
        "A student learns Python in their native language, then joins other learners from more than 150 countries.",
    },
  },
];

function DetailContent({ detail }: { detail: ImpactDetail }) {
  return (
    <>
      <h3 className="global-reach-detail-title">{detail.title}</h3>
      <p className="global-reach-detail-copy">
        {detail.body}
      </p>
      <p className="global-reach-scenario">{detail.scenario}</p>
    </>
  );
}

export function GlobalReachSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="impact" className="global-reach-section mt-16 scroll-mt-28 md:mt-44 md:scroll-mt-24">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="global-reach-heading">
          <div>
            <p className="global-reach-kicker">THE REACH OF FREE LEARNING</p>
            <h2>Every learner deserves a way in.</h2>
          </div>
          <div className="global-reach-intro-copy">
            <p>
              Free courses, translated lessons, real mentors, and student-built
              projects make coding feel possible wherever learners are.
            </p>
            <a href={DONATE_HREF} className="home-arrow-link">
              Support our mission <span className="home-arrow">→</span>
            </a>
          </div>
        </div>
        <ul className="global-reach-list">
          {items.map((item, index) => (
            <li key={item.label} className="global-reach-item">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                aria-controls={`impact-detail-${index}`}
                className="global-reach-button cursor-pointer"
              >
                <span className="global-reach-icon">{item.icon}</span>
                <span className="global-reach-label">{item.label}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`global-reach-chevron ${open === index ? "global-reach-chevron-open" : ""}`}
                  size={18}
                  strokeWidth={1.8}
                />
              </button>
              <div
                id={`impact-detail-${index}`}
                className="global-reach-panel"
                data-open={open === index}
                aria-hidden={open !== index}
              >
                <div className="global-reach-panel-inner">
                  <DetailContent detail={item.detail} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
