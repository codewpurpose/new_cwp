import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";

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
        <P>
          Run the test on a few real examples and the category gets less abstract. A hospital
          payroll system, a shift-swap tool for nurses, the cafeteria&apos;s ordering app —
          none of that is health tech, no matter how much of it runs inside a hospital&apos;s
          walls. A medication-dosing screen, a diagnosis-assist model, an appointment booking
          that syncs straight into your chart — all three are, no matter how far outside the
          hospital&apos;s walls they run.
        </P>
        <CompareGrid
          items={[
            {
              title: "Sits between a decision and a patient",
              tone: "positive",
              children: (
                <>
                  <P>A medication-dosing screen.</P>
                  <P>A diagnosis-assist model.</P>
                  <P>An online booking that syncs to your chart.</P>
                </>
              ),
            },
            {
              title: "Doesn't, even inside a hospital",
              tone: "neutral",
              children: (
                <>
                  <P>A hospital&apos;s payroll system.</P>
                  <P>The cafeteria ordering app.</P>
                  <P>An internal shift-swap tool for staff.</P>
                </>
              ),
            },
          ]}
        />
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
        <P>
          Requested a prescription refill through a pharmacy app, or checked whether a claim was
          approved through your insurer&apos;s portal instead of calling and waiting on hold?
          Same category, just quieter. Insurance and pharmacy software now handle a meaningful
          share of what used to require a phone call, and both eventually write into systems
          that feed back into the record your doctor sees.
        </P>
      </LessonSection>

      <LessonSection
        id="where-the-boundary-gets-blurry"
        title="Where the boundary gets blurry"
      >
        <P>
          Not every case resolves as cleanly as a payroll system versus a dosing screen. A
          general meditation app, a step counter, a sleep tracker — by default, none of these
          are health tech. They are wellness software, and a bug in one is an inconvenience,
          not a harm, exactly like the shopping-app comparison in the next chapter.
        </P>
        <P>
          Then a cardiologist enrols the same person in a remote-monitoring programme built on
          that same watch&apos;s heart-rate feature, and overnight, the identical code is now
          feeding a clinical decision. Nothing about the software changed. What changed is what
          sits downstream of it.
        </P>
        <Callout tone="note" title="The test travels with the data, not the app">
          Whether something counts as health tech is not a fixed property of the codebase — it
          is a fact about what happens to its output. The same fitness feature can be ordinary
          consumer software for ninety-nine users and health tech for the one whose doctor is
          reading it. Part 3 of this track, on wearables and remote monitoring, lives almost
          entirely in that grey zone.
        </Callout>
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
        <StepList
          steps={[
            {
              label: "A record gets created",
              detail: "Part 2 — the EHR and what actually lives inside one.",
            },
            {
              label: "It has to move between systems",
              detail: "Part 2 — why two hospitals' systems don't just talk to each other.",
            },
            {
              label: "Sometimes something analyses it",
              detail: "Part 4 — what a diagnosis-assist model actually outputs.",
            },
            {
              label: "It reaches the patient through something",
              detail: "Part 5 — an app, a portal, or a video call, and who gets left out.",
            },
            {
              label: "It has to stay protected the entire way",
              detail: "Part 6 — security, and how new health tech actually gets approved.",
            },
          ]}
        />
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
          "The same feature can be ordinary consumer software for most users and health tech for the one whose doctor is reading its output — the test is about what's downstream, not the codebase itself.",
          "The six parts of this track follow one real pipeline — data created, moved, analysed, delivered, and protected — not six unrelated topics.",
          "A problem in any one stage, like bias in an AI model, only matters because of how it reaches the patient through every other stage.",
        ]}
      />
    </div>
  );
}
