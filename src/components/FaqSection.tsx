"use client";

import { Accordion } from "@base-ui/react/accordion";
import { CONTACT_HREF } from "@/lib/links";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "Is CodeWithPurpose really free?",
    answer:
      "Yes. Every course, workshop, and resource costs nothing. A family's budget should not decide who gets to learn how to code.",
  },
  {
    question: "Who runs CodeWithPurpose?",
    answer:
      "Students, start to finish. CodeWithPurpose is a student-run nonprofit, fiscally sponsored by Hack Club. We teach, organize, and build because we believe every young person deserves the chance to learn how to code.",
  },
  {
    question: "How do I start learning?",
    answer:
      "Open Courses and choose a beginner track. Create a free account to read our interactive lessons and sync your progress, or choose a free Udemy course if you prefer video lessons.",
  },
  {
    question: "How can I volunteer or join the team?",
    answer:
      "Go to our Join Us page and fill out the volunteer form. You can teach, mentor, or help organise workshops and outreach.",
  },
  {
    question: "Where do donations go?",
    answer:
      "Straight to students. Donations fund workshops, new lessons, and outreach to underserved communities, and they keep every single course free for learners everywhere.",
  },
  {
    question: "How is CodeWithPurpose recognised?",
    answer:
      "We're recognised by the U.S. House of Representatives for tremendous leadership and service to our community. Representative Mark DeSaulnier formally recognised our work in March 2026.",
  },
];

function FaqItem({ faq }: { faq: Faq }) {
  return (
    <Accordion.Item value={faq.question} className="home-card rounded-xl">
      <Accordion.Header className="m-0">
        <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-3 p-5 text-left sm:gap-4 sm:p-6 md:p-8">
          <span className="text-lg leading-[1.2] md:text-xl">
            {faq.question}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="var(--home-ink-quiet)"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 motion-reduce:transition-none group-data-[panel-open]:rotate-45"
          >
            <path d="M7 1v12M1 7h12" />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="faq-panel">
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-[1.5] text-[var(--home-ink-soft)] sm:px-6 sm:pb-6 md:px-8 md:pb-8 md:text-[15px]">
            {faq.answer}
          </p>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export function FaqSection() {
  return (
    <div id="faq" className="scroll-mt-24">
      <JsonLd data={faqJsonLd(faqs)} />
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 className="home-serif text-center text-2xl md:text-3xl">
            What students and families usually ask
          </h2>
          <p className="mt-3 text-center text-[15px] leading-snug text-[var(--home-ink-soft)]">
            {"Still have a question? "}
            <a
              href={CONTACT_HREF}
              className="text-[#397554] underline-offset-2 hover:underline"
            >
              Contact us
            </a>
            {" and ask us anything."}
          </p>
          <Accordion.Root multiple className="mx-auto mt-8 flex max-w-[51rem] flex-col gap-2">
            {faqs.map((faq) => <FaqItem key={faq.question} faq={faq} />)}
          </Accordion.Root>
          <div className="mx-auto mt-8 max-w-[51rem] rounded-xl border-[0.5px] border-[var(--home-hairline)] bg-[var(--home-page)] px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10">
            <h3 className="text-lg font-medium md:text-xl">Why we keep it free</h3>
            <blockquote className="mt-4 text-[15px] leading-[1.6] text-[var(--home-ink-soft)] md:text-base">
              &ldquo;Every dollar helps us build a more inclusive future where code
              is a tool for good. Whether it&apos;s $5 or $500, you&apos;re helping a
              student start learning today.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[var(--home-ink-quiet)]">
              Shreyan, Samanyu &amp; Bruhatt
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
