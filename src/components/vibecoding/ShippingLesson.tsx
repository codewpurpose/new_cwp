"use client";

import { motion } from "motion/react";

interface Stage {
  label: string;
  description: string;
  tip: string;
}

const STAGES: Stage[] = [
  {
    label: "Idea",
    description: "You know the problem worth solving.",
    tip: "\"I keep forgetting to drink water during the day.\"",
  },
  {
    label: "Prompt",
    description: "Describe the app and its core feature in plain English.",
    tip: "\"Build a habit tracker with a streak counter and daily reminders.\"",
  },
  {
    label: "Build",
    description: "AI scaffolds pages, logic, and styling from your prompts.",
    tip: "You get a working app with a log button, a streak count, and local storage.",
  },
  {
    label: "Test",
    description: "Click through it yourself, catch what's broken or off.",
    tip: "The streak resets at midnight in the wrong timezone, so you flag it.",
  },
  {
    label: "Deploy",
    description: "Push it live with one command, no server to configure.",
    tip: "One deploy command, and it's live at a real URL.",
  },
  {
    label: "Share",
    description: "Send the link. Real people can use what you built.",
    tip: "A friend tries it and asks for a weekly summary, next feature.",
  },
];

const PROJECT_IDEAS = [
  "A tip calculator that splits the bill by person",
  "A random dinner-idea generator from a list of your favorites",
  "A countdown page for an upcoming event",
  "A simple flashcard app for studying",
  "A page that tracks how many days since a milestone",
];

export function ShippingLesson() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[15px] leading-[1.6] text-[#636363]">
        A single idea can go from nothing to a live, shareable app in one
        sitting. Scroll through each stage of the trip.
      </p>

      <div className="relative mt-10">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#e1e1e1]" />

        <div className="space-y-6">
          {STAGES.map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-5"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#1e3c2c] bg-[#dbefdb] text-xs font-semibold text-[#1e3c2c]"
              >
                {index + 1}
              </motion.span>
              <div className="home-card flex-1 rounded-[16px] p-5">
                <h3 className="text-lg">{stage.label}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#636363]">
                  {stage.description}
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#3e7f5c]">
                  {stage.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <h3 className="text-lg text-[#1e3c2c]">Ideas to try this week</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#636363]">
          Pick one, run it through the loop above, and see how far you get in
          an afternoon.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PROJECT_IDEAS.map((idea) => (
            <span
              key={idea}
              className="rounded-full bg-[#dbefdb] px-3 py-1.5 text-[13px] leading-[1.4] text-[#1e3c2c]"
            >
              {idea}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
