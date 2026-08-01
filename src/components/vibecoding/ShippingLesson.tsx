"use client";

import { motion } from "motion/react";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Reveal } from "@/components/Reveal";

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
    <div>
      <p className="text-[15px] leading-[1.6] text-learn-muted">
        A single idea can go from nothing to a live, shareable app in one
        sitting. Scroll through each stage of the trip.
      </p>

      <div className="relative mt-10">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-learn-line" />

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
                className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-learn-inverse bg-learn-quiet text-xs font-semibold text-learn-strong"
              >
                {index + 1}
              </motion.span>
              <div className="learn-card flex-1 rounded-learn-lg p-5">
                <h3 className="text-lg">{stage.label}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-learn-muted">
                  {stage.description}
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-learn-accent-text">
                  {stage.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal className="mt-12">
        <h3 id="ideas-to-try-this-week" className="text-lg text-learn-strong">Ideas to try this week</h3>
        <p className="mt-3 text-[15px] leading-[1.5] text-learn-muted">
          Pick one, run it through the loop above, and see how far you get in
          an afternoon.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PROJECT_IDEAS.map((idea) => (
            <span
              key={idea}
              className="rounded-full bg-learn-quiet px-3 py-1.5 text-[13px] leading-[1.4] text-learn-strong"
            >
              {idea}
            </span>
          ))}
        </div>
      </Reveal>

      <TakeawayCard
        items={[
          "Deploying is a skill you can practise, not a final exam you take once.",
          "Get something live early and ugly, then improve it — a local-only project teaches you less.",
          "Secrets go in environment variables, never in the code you are about to push.",
          "The first real bug report is worth more than another day of polishing.",
        ]}
      />
    </div>
  );
}
