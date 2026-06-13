"use client";

import { useId, useState } from "react";
import { CONTACT_HREF } from "@/lib/links";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "Is CodeWithPurpose really free?",
    answer:
      "Yes. Really. Every course, workshop, and resource costs nothing, and it always will. We don't think a family's budget should ever decide who gets to learn how to code.",
  },
  {
    question: "Who runs CodeWithPurpose?",
    answer:
      "Students, start to finish. CodeWithPurpose is a student-run nonprofit, fiscally sponsored by Hack Club. We teach, organize, and build because we believe every young person deserves the chance to learn how to code.",
  },
  {
    question: "How do I start learning?",
    answer:
      "Pick a course and go. Python for Complete Beginners and Vibecoding 101 are both great starting points. Sign up with your email, enroll on Udemy at no cost, and you'll be writing code today.",
  },
  {
    question: "How can I volunteer or join the team?",
    answer:
      "We'd love to have you. Head to our Join Us page and fill out the volunteer form. Whether you want to teach, mentor, or organize, there's a place for you here.",
  },
  {
    question: "Where do donations go?",
    answer:
      "Straight to students. Donations fund workshops, new lessons, and outreach to underserved communities, and they keep every single course free for learners everywhere.",
  },
  {
    question: "How is CodeWithPurpose recognized?",
    answer:
      "We're recognized by the U.S. House of Representatives for tremendous leadership and service to our community. Representative Mark DeSaulnier formally recognized our work in March 2026.",
  },
];

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="home-card rounded-xl">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((e) => !e)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left md:p-8"
        >
          <span className="text-lg leading-[1.2] md:text-xl">
            {faq.question}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="#818181"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-45" : ""
            }`}
          >
            <path d="M7 1v12M1 7h12" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-6 pb-6 text-sm leading-[1.5] text-[#636363] transition-opacity duration-300 motion-reduce:transition-none md:px-8 md:pb-8 md:text-[15px] ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <div id="faq" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 className="text-center text-base md:text-lg">
            {"What students and families usually ask. Still have a question? "}
            <a
              href={CONTACT_HREF}
              className="text-[#397554] underline-offset-2 hover:underline"
            >
              Contact us
            </a>
            {" and ask us anything."}
          </h2>
          <div className="mx-auto mt-8 flex max-w-[51rem] flex-col gap-2">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-[51rem] rounded-xl border-[0.5px] border-[#e1e1e1] bg-[#f9f9f9] px-6 py-8 md:px-10 md:py-10">
            <h3 className="text-lg font-medium md:text-xl">A Note From Our Team</h3>
            <blockquote className="mt-4 text-[15px] leading-[1.6] text-[#636363] md:text-base">
              &ldquo;Every dollar helps us build a more inclusive future where code
              is a tool for good. Whether it&apos;s $5 or $500, you&apos;re helping a
              student start their journey today.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[#818181]">
              Shreyan, Samanyu &amp; Bruhatt
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
