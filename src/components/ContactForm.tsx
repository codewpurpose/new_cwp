"use client";

import { useState } from "react";
import { CONTACT_EMAIL_HREF, JOIN_HREF } from "@/lib/links";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="home-card rounded-[20px] p-6 md:p-10" role="status">
        <h2 className="text-2xl font-medium">Message sent.</h2>
        <p className="mt-3 text-[#636363]">
          Thanks for reaching out. We&apos;ll respond within a few business days.
        </p>
      </div>
    );
  }

  return (
    <div className="home-card rounded-[20px] p-6 md:p-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <h2 className="text-2xl font-medium">Send us a message</h2>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2"
            />
          </div>
        </div>
        <button type="submit" className="home-btn home-btn-fill mt-6 w-full">
          Send Message
        </button>
      </form>
    </div>
  );
}

export function ContactSidebar() {
  return (
    <div className="space-y-6">
      <div className="home-card rounded-xl p-6">
        <h3 className="text-lg font-medium">Email</h3>
        <a href={CONTACT_EMAIL_HREF} className="home-arrow-link mt-2">
          contact@codewithpurpose.org <span className="home-arrow">→</span>
        </a>
      </div>
      <div className="home-card rounded-xl p-6">
        <h3 className="text-lg font-medium">Volunteer</h3>
        <p className="mt-2 text-[15px] text-[#636363]">
          Interested in teaching or mentoring? Visit our Join Us page to learn
          how to get involved.
        </p>
        <a href={JOIN_HREF} className="home-arrow-link mt-4">
          Join Us <span className="home-arrow">→</span>
        </a>
      </div>
      <div className="home-card rounded-xl p-6">
        <h3 className="text-lg font-medium">A Note From Our Team</h3>
        <blockquote className="mt-3 text-[15px] italic leading-[1.6] text-[#636363]">
          &ldquo;Every dollar helps us build a more inclusive future where code
          is a tool for good.&rdquo;
        </blockquote>
        <p className="mt-3 text-sm text-[#818181]">Shreyan, Samanyu &amp; Bruhatt</p>
      </div>
    </div>
  );
}
