import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
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
        <P>
          The specific technique has a name: <Strong>photoplethysmography</Strong>, or PPG. An
          LED fires green light — green because tissue absorbs and scatters it strongly,
          which makes the small changes caused by blood flow easier to pick out — and a
          photodiode sitting right next to it measures how much light comes back. During{" "}
          <Strong>systole</Strong>, when the heart pushes a fresh pulse of blood into your
          wrist, more light gets absorbed and less reflects back. During the trough between
          beats, more light reflects. That rise-and-fall pattern, read many times a second, is
          the entire raw material a smartwatch has to work with — there is no direct electrical
          reading of your heart happening anywhere on your wrist.
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

      <LessonSection
        id="why-motion-skin-tone-and-tattoos-all-degrade-the-signal"
        title="Why motion, skin tone, and tattoos all degrade the signal"
      >
        <P>
          Motion is the obvious problem — running or lifting weights shakes the sensor against
          the skin and produces movement artefacts far larger than the pulse signal itself,
          which is exactly why heart-rate readings during a workout are the least reliable ones
          a wearable produces. It is not the only one.
        </P>
        <P>
          Melanin absorbs green light more strongly than lighter, less pigmented skin does,
          which means less light reaches the blood vessels and less of it returns to the
          photodiode — a weaker signal sitting under the same amount of motion and ambient
          noise. A tattoo directly over the sensor compounds the same problem: ink absorbs
          light too, regardless of skin tone underneath it, and can degrade the reading further
          still. Neither effect is a hypothetical edge case — it is a real accuracy gap that
          contributed to a 2021 FDA safety communication warning that pulse oximeter readings
          can be less accurate on patients with darker skin pigmentation.
        </P>
        <Callout tone="warning" title="A quieter signal is not a smaller problem">
          Manufacturers have responded by adding more LEDs at different wavelengths and more
          aggressive signal-confidence checks, which helps but does not close the gap entirely.
          A device that silently drops or flags &ldquo;low confidence&rdquo; readings more often
          for some skin tones than others is not a neutral engineering trade-off — it is an
          accuracy gap that lands unevenly on the people using the same device.
        </Callout>
      </LessonSection>

      <LessonSection
        id="how-sleep-stages-are-inferred-not-measured"
        title="How sleep stages are inferred, not measured"
      >
        <P>
          A hospital sleep study — <Strong>polysomnography</Strong> — measures sleep stages
          directly, from electrodes reading brain waves, eye movement, and muscle activity. A
          wearable has none of those sensors. It infers a sleep stage from proxies: how still
          your wrist is, how your heart rate and its beat-to-beat variability shift, and on some
          devices your breathing rate estimated from the same optical sensor.
        </P>
        <P>
          Those proxies correlate with sleep stage without being the same thing as it. Published
          validation studies comparing consumer wearables against clinical polysomnography
          typically find that total sleep time and overall time awake line up reasonably well,
          while agreement on which specific stage — light, deep, or REM — a given stretch of
          sleep belongs to is considerably weaker. A wearable telling you that you got ninety
          minutes of deep sleep is reporting the output of a model&apos;s best guess from
          movement and heart-rate patterns, not a measurement of your brain activity.
        </P>
      </LessonSection>

      <LessonSection
        id="a-step-count-versus-a-validated-clinical-measure"
        title="A step count versus a validated clinical measure"
      >
        <P>
          Not every wearable measurement is held to the same standard before it ships, and the
          gap is bigger than most people assume. A step count and a pulse oximeter reading both
          sound like straightforward numbers. The testing behind each one is not remotely
          comparable.
        </P>
        <CompareGrid
          items={[
            {
              title: "Step counting",
              tone: "neutral",
              children: (
                <>
                  <P>
                    Manufacturers can self-certify accuracy against a voluntary industry
                    standard, tested by walking a fixed course under controlled conditions. No
                    regulator reviews the result before the product ships.
                  </P>
                  <P>Good enough to notice you moved more this week than last.</P>
                </>
              ),
            },
            {
              title: "A cleared pulse oximeter",
              tone: "positive",
              children: (
                <>
                  <P>
                    Must demonstrate accuracy within a specified error margin during a
                    supervised study that deliberately lowers a volunteer&apos;s blood oxygen
                    under medical supervision, reviewed by a regulator before clearance.
                  </P>
                  <P>Built to be trusted for an actual clinical decision.</P>
                </>
              ),
            },
          ]}
        />
        <LabelRows
          rows={[
            { label: "Step count", text: "Self-certified against a voluntary walking-course standard. A count that is off by 10% rarely changes what you do about it." },
            { label: "Sleep stage", text: "Inferred from movement and heart-rate proxies, validated against polysomnography with only moderate agreement on the specific stage." },
            { label: "SpO2 (medical-grade)", text: "Validated against a controlled hypoxia study and reviewed by a regulator before the device can be sold for clinical use." },
          ]}
        />
        <P>
          None of that makes the step count useless — it was never built for the job a cleared
          pulse oximeter is built for. The mistake is treating every number that comes off a
          wearable as though it cleared the same bar, when the testing behind them can differ
          by an entire category.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A heart-rate sensor does not capture one clean instant — it samples reflected light dozens of times per second and reconstructs a pulse from the pattern.",
          "The raw signal is jagged with noise from wrist movement, skin contact, and ambient light, none of which is removable just by sampling harder.",
          "Melanin and tattoo ink both absorb the sensor's green light, weakening the signal and producing a real accuracy gap that regulators have formally flagged, not just an edge case.",
          "Sleep stage is inferred from movement and heart-rate proxies, not measured directly — validation studies show only moderate agreement with a real sleep study on which specific stage you were in.",
          "A step count and a cleared pulse oximeter reading are tested to entirely different standards, and treating every wearable number as equally validated is the mistake to avoid.",
        ]}
      />
    </div>
  );
}
