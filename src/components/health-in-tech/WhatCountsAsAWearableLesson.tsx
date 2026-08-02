import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { Callout } from "@/components/learn/primitives/Callout";

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
        <P>
          Two questions actually separate one wearable from another, and neither is &ldquo;how
          expensive is it.&rdquo; The first is <Strong>what it measures</Strong> — a step count
          and a heart rhythm are different kinds of signal entirely. The second is{" "}
          <Strong>what a regulator has said about the number it produces</Strong> — a distinction
          that decides whether a doctor can act on that number at all.
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
        id="a-wellness-claim-versus-a-cleared-medical-claim"
        title="A wellness claim versus a cleared medical claim"
      >
        <P>
          &ldquo;Medical-grade&rdquo; is a useful shorthand, but the regulatory reality
          underneath it runs through a specific pathway. In the United States, most fitness
          features — step counts, general activity, calories estimated from movement — ship
          under the FDA&apos;s <Strong>general wellness</Strong> category, which requires no
          premarket review at all as long as the claim stays low-risk and non-diagnostic.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "A general wellness claim needs no clearance",
              detail:
                "\"Tracks your daily activity\" or \"helps you build healthier habits\" stays inside a category the FDA does not review before it ships.",
            },
            {
              label: "A diagnostic claim needs evidence, submitted to the FDA",
              detail:
                "\"Detects atrial fibrillation\" is a medical claim. The manufacturer has to submit clinical validation data through a 510(k) clearance or De Novo pathway before making it.",
            },
            {
              label: "The regulator clears the claim, not the whole device",
              detail:
                "Clearance attaches to one specific feature and its specific evidence — not to every other function the same piece of hardware happens to perform.",
            },
          ]}
        />
        <Callout tone="note" title="One device, two regulatory categories at once">
          A single smartwatch can carry a general wellness step counter and a separately
          FDA-cleared ECG app for irregular rhythm notification, running on the exact same
          hardware. The step count and the rhythm alert do not carry the same weight of
          evidence behind them, even though they show up on the same screen a second apart.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-different-signals-a-wearable-can-actually-measure"
        title="The different signals a wearable can actually measure"
      >
        <P>
          &ldquo;Wearable&rdquo; also hides real variety in what physical signal a device is
          actually reading, before any regulatory question even applies:
        </P>
        <ChecklistCard
          marker="dot"
          items={[
            "Movement — an accelerometer and gyroscope infer steps, activity type, and fall detection from acceleration patterns.",
            "Optical — a light sensor infers heart rate and blood-oxygen trend from how much light reflects off blood near the skin.",
            "Electrical — a single-lead ECG reads the heart's actual electrical activity, closer to what a hospital ECG captures, though with far fewer leads.",
            "Electrochemical — a continuous glucose monitor reads glucose from interstitial fluid just under the skin, not from a blood draw.",
            "Thermal — a temperature sensor tracks skin temperature, used as an indirect signal for things like ovulation timing or early illness.",
          ]}
        />
        <P>
          Each of those signals has its own error profile and its own regulatory history —
          which is exactly why the next chapter deals with what a wearable is measuring instead
          of treating &ldquo;wearable data&rdquo; as one undifferentiated thing.
        </P>
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
          standard for how close that estimate has to be, and are required to prove it before
          they can make the claim.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A wearable is any sensor on or in your body generating a continuous stream of readings — the category runs from a fitness band to a prescribed heart-rhythm patch.",
          "Consumer-grade devices optimise for comfort and trends; medical-grade devices are validated against a clinical gold standard before a doctor can act on them.",
          "A general wellness claim needs no premarket review, but a diagnostic claim like arrhythmia detection needs submitted clinical evidence and formal FDA clearance.",
          "Regulatory clearance attaches to one specific feature and its specific evidence, not to every other function running on the same piece of hardware.",
          "Neither kind of wearable measures your body directly — a wrist-worn heart-rate sensor infers your pulse from reflected light, not a direct electrical reading.",
        ]}
      />
    </div>
  );
}
