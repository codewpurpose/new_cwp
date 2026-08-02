import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function TheLimitsOfConsumerHealthDataLesson() {
  return (
    <div>
      <Lead>
        A watch that flags an irregular heartbeat feels like it just diagnosed you with
        something. It didn&apos;t. A wearable estimates — it doesn&apos;t diagnose — and the gap
        between those two words is exactly where a lot of unnecessary panic, and a fair amount
        of missed care, both actually live.
      </Lead>

      <LessonSection
        id="a-wearable-estimates-it-doesnt-diagnose"
        title="A wearable estimates, it doesn't diagnose"
      >
        <P>
          The last chapter showed how much processing sits between a raw sensor reading and the
          number on your screen — noise removed, samples averaged, a pattern inferred rather
          than measured directly. A consumer wearable&apos;s &ldquo;irregular rhythm
          detected&rdquo; alert is the output of exactly that kind of estimate, tuned to flag
          anything unusual rather than to confirm a specific condition.
        </P>
        <P>
          <Strong>Flagging unusual</Strong> and <Strong>diagnosing a condition</Strong> are not
          the same claim, even though a notification on your wrist can make them feel identical
          in the moment.
        </P>
      </LessonSection>

      <LessonSection
        id="the-gap-between-wellness-data-and-medical-data"
        title="The gap between wellness data and medical data"
      >
        <P>
          Wellness data is built to be directionally useful across millions of different bodies
          cheaply and continuously — good enough to notice a trend, not built to survive a
          courtroom or a treatment decision. Medical data is validated against a clinical
          gold-standard measurement, on a specific device, cleared for a specific claim. A
          hospital ECG and a watch&apos;s single-lead reading can describe the same heartbeat and
          still not carry the same evidentiary weight.
        </P>
        <Callout tone="warning" title="Where this actually goes wrong">
          The failure mode runs in both directions. Some people ignore a real, repeated
          wearable alert because &ldquo;it&apos;s just the watch.&rdquo; Others walk into an
          emergency room over a single blip that a proper reading would have shown was nothing.
          Neither reaction treats the number for what it actually is: a reason to look closer,
          not a verdict.
        </Callout>
      </LessonSection>

      <LessonSection
        id="when-a-number-is-worth-a-real-appointment"
        title="When a number is worth a real appointment"
      >
        <P>
          A single unusual reading is weak evidence — noise from the last two chapters can
          produce one on its own. A pattern that repeats across multiple days, especially paired
          with a symptom you can actually feel, is worth a real appointment where a clinician
          can order the medical-grade version of the same measurement. The wearable&apos;s real
          job is not to replace that appointment — it is to give you a reason to book it sooner
          than you otherwise would have.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A wearable's alert is an estimate tuned to flag anything unusual, not a diagnosis of a specific condition.",
          "Wellness data is built to be cheap and directionally useful across millions of bodies; medical data is validated against a clinical gold standard for a specific claim.",
          "The same failure happens in both directions — dismissing a real repeated alert as \"just the watch,\" or panicking over a single blip that noise alone could explain.",
          "A pattern that repeats across days, not a single reading, is what actually justifies booking a real appointment.",
        ]}
      />
    </div>
  );
}
