import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function WhatIsHealthTechLesson() {
  return (
    <div>
      <Lead>
        Say &ldquo;health tech&rdquo; and most people picture one thing: a hospital running
        software instead of paper charts. That is a sliver of it. Health tech is any software
        that touches an actual patient somewhere along the way — a record, a device, a
        diagnosis, or an appointment — and once you see it that way, three things you already
        use every month turn out to belong to the same category.
      </Lead>

      <LessonSection
        id="health-tech-is-software-touching-an-actual-patient"
        title="Health tech is software touching an actual patient"
      >
        <P>
          It is not an industry the way &ldquo;retail&rdquo; or &ldquo;banking&rdquo; is. It is a
          description that applies the moment code touches something a real person&apos;s body,
          treatment, or medical history depends on. A hospital&apos;s billing system barely
          counts — a bug there loses money. The same hospital&apos;s medication-dosing screen
          absolutely counts — a bug there can hurt someone.
        </P>
        <P>
          That distinction, <Strong>does this software sit between a decision and a
          patient</Strong>, is the thread the rest of this track pulls on. It is why a
          scheduling app and a diagnosis-assist model get discussed in the same breath here,
          even though they look nothing alike.
        </P>
      </LessonSection>

      <LessonSection
        id="three-places-it-already-lives-in-your-life"
        title="Three places it already lives in your life"
      >
        <P>
          Booked a doctor&apos;s appointment online in the last year? That booking flowed into
          the same electronic record system the doctor pulls up during your visit — you already
          touched health tech before you sat in the waiting room.
        </P>
        <P>
          Checked your step count or resting heart rate on a phone or watch? Roughly a third of
          adults in the US now own a wearable that tracks something health-adjacent, and a
          meaningful share of those readings get shown to an actual clinician at some point.
        </P>
        <P>
          Had a video call with a doctor instead of driving to a clinic? Telehealth visits
          went from a rounding error before 2020 to a routine option most insurers now cover
          without a second thought. All three are health tech. None of them look like a
          hospital.
        </P>
      </LessonSection>

      <LessonSection
        id="why-this-track-treats-it-as-one-connected-system"
        title="Why this track treats it as one connected system"
      >
        <P>
          A patient&apos;s data gets created somewhere (a record), has to move somewhere else
          (interoperability), sometimes gets analysed by something (AI), reaches the patient
          through something (an app or a video call), and has to stay protected the entire time
          (security and regulation). Six parts, one pipeline — each part of this track is a
          stage that data actually passes through, not an unrelated topic bolted on because it
          sounded relevant.
        </P>
        <P>
          Skip a stage and the others stop making sense. Bias in a diagnosis model (Part 4)
          is only dangerous because that model&apos;s output reaches a real patient through an
          app or a doctor&apos;s screen (Part 5) built on a record that was supposed to be
          protected the whole way through (Part 2). Treat health tech as one system and every
          later chapter has somewhere to attach to.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Health tech is not an industry — it is any software that sits between a decision and an actual patient, from a scheduling form to a diagnosis-assist model.",
          "You have already used it this year: an online booking, a wearable reading, or a telehealth call all count, and none of them look like a hospital.",
          "The six parts of this track follow one real pipeline — data created, moved, analysed, delivered, and protected — not six unrelated topics.",
          "A problem in any one stage, like bias in an AI model, only matters because of how it reaches the patient through every other stage.",
        ]}
      />
    </div>
  );
}
