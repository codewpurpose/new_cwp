import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";

export function WhatCountsAsAWearableLesson() {
  return (
    <div>
      <Lead>
        Say &ldquo;wearable&rdquo; and most people picture a fitness band counting steps. That
        is the least consequential end of the category. The same word covers a device a doctor
        actually prescribes to catch a heart condition — and the two ends of that spectrum are
        worth telling apart before you trust either one.
      </Lead>

      <LessonSection
        id="further-than-a-fitness-band-on-your-wrist"
        title="Further than a fitness band on your wrist"
      >
        <P>
          A smartwatch counting your steps is a wearable. So is a continuous glucose monitor
          taped to a diabetic patient&apos;s arm, a heart-rhythm patch a cardiologist has you
          wear for two weeks, and a smart ring tracking your sleep overnight. What ties them
          together is not the shape of the hardware — it is that a sensor is on or in your body,
          continuously, generating a stream of readings nobody had access to before you put it
          on.
        </P>
      </LessonSection>

      <LessonSection
        id="consumer-grade-versus-medical-grade"
        title="Consumer-grade versus medical-grade"
      >
        <P>
          The two ends of that spectrum are not just different in quality — they are built,
          tested, and regulated completely differently, and knowing which one you are holding
          changes what its number is actually worth.
        </P>
        <CompareGrid
          items={[
            {
              title: "Consumer-grade",
              tone: "neutral",
              children: (
                <>
                  <P>
                    Optimised for comfort and battery life. Accuracy is good enough for trends,
                    not for a diagnosis. No clinical trial required before it ships.
                  </P>
                  <P>Example: a fitness band&apos;s heart-rate estimate during a workout.</P>
                </>
              ),
            },
            {
              title: "Medical-grade",
              tone: "positive",
              children: (
                <>
                  <P>
                    Validated against a clinical gold-standard measurement, cleared by a
                    regulator, and built to a specific accuracy tolerance a doctor can rely on
                    for an actual decision.
                  </P>
                  <P>Example: a hospital-grade pulse oximeter used during surgery.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="what-a-wearable-is-actually-measuring"
        title="What a wearable is actually measuring"
      >
        <P>
          Almost nothing on your wrist measures what you think it measures directly. A
          smartwatch does not have a direct line to your heart — it shines light through your
          skin and infers your pulse from how much of that light bounces back, a technique
          called photoplethysmography. A step counter does not count steps; it infers them from
          acceleration patterns that look like a stride. Every reading you see is the output of
          a model guessing at the real number from an indirect signal, which is exactly the
          subject of the next two chapters.
        </P>
        <P>
          <Strong>The number on the screen is an estimate</Strong>, not a direct readout — true
          of both ends of the spectrum, though medical-grade devices are held to a far tighter
          standard for how close that estimate has to be.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A wearable is any sensor on or in your body generating a continuous stream of readings — the category runs from a fitness band to a prescribed heart-rhythm patch.",
          "Consumer-grade devices optimise for comfort and trends; medical-grade devices are validated against a clinical gold standard before a doctor can act on them.",
          "Neither kind measures your body directly — a wrist-worn heart-rate sensor infers your pulse from reflected light, not a direct electrical reading.",
          "Every reading on screen is an estimate produced by a model, which is why the next two chapters look at how much noise sits underneath that estimate.",
        ]}
      />
    </div>
  );
}
