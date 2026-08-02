import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { WearableSignalToggle } from "@/components/health-in-tech/WearableSignalToggle";

export function HowAWearableActuallyMeasuresYouLesson() {
  return (
    <div>
      <Lead>
        The heart-rate number on your wrist looks as clean and confident as a stopwatch
        reading. Underneath it is nothing like one. A sensor samples a signal — it does not
        capture a single clean instant — and what it actually picks up is far noisier than the
        tidy number that finally reaches your screen.
      </Lead>

      <LessonSection
        id="a-sensor-samples-not-a-single-instant"
        title="A sensor samples, not a single instant"
      >
        <P>
          A wrist-worn heart-rate sensor typically shines green light into your skin dozens of
          times per second and measures how much bounces back — blood absorbs more light than
          surrounding tissue, so the reflected amount rises and falls with every heartbeat.
          <Strong> One measurement is not one heartbeat.</Strong> It is dozens of individual
          light readings per second, stitched together afterward into something that looks like
          a single number.
        </P>
      </LessonSection>

      <LessonSection
        id="raw-signal-is-noisier-than-you-would-expect"
        title="Raw signal is noisier than you would expect"
      >
        <P>
          Toggle to <Strong>Raw signal</Strong> below and look at how jagged it is sample to
          sample. Every small wrist movement, every shift in how tightly the band sits against
          your skin, and the ambient light in the room all show up as noise layered directly on
          top of the real pulse — none of it removable by simply asking the sensor to try
          harder.
        </P>
      </LessonSection>

      <WearableSignalToggle />

      <LessonSection
        id="why-the-number-on-screen-is-already-smoothed"
        title="Why the number on screen is already smoothed"
      >
        <P>
          Toggle to <Strong>Smoothed signal</Strong> and the same data resolves into a clean,
          repeating pulse shape. That smoothing — averaging each point with its close
          neighbours — is not optional polish. Without it, the number you would see on screen
          would jump around too violently to mean anything, swinging on tiny movements rather
          than tracking your actual heart rate.
        </P>
        <P>
          Every consumer wearable does some version of this processing before a single number
          ever reaches its display. The reading you trust every day is already several steps
          removed from the raw physical signal — a fact worth remembering the next chapter,
          which is specifically about how much you should trust it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A heart-rate sensor does not capture one clean instant — it samples reflected light dozens of times per second and reconstructs a pulse from the pattern.",
          "The raw signal is jagged with noise from wrist movement, skin contact, and ambient light, none of which is removable just by sampling harder.",
          "Smoothing — averaging each sample with its close neighbours — is what turns that noisy signal into something readable, not an optional add-on.",
          "The number on your screen is already several processing steps removed from the raw physical signal, by the time you ever see it.",
        ]}
      />
    </div>
  );
}
