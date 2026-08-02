import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

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
        id="accuracy-claims-versus-what-the-validation-study-actually-tested"
        title="Accuracy claims versus what the validation study actually tested"
      >
        <P>
          A marketing page saying a feature is &ldquo;highly accurate&rdquo; is describing
          performance under the specific conditions the validation study actually tested — and
          that scope is almost always narrower than how the device gets used afterward. The
          largest study of a wearable&apos;s irregular-rhythm alert enrolled more than 419,000
          participants, but the population skewed young and healthy, and atrial fibrillation is
          rare in exactly that group. Of the small number who got a notification and then wore a
          real clinical-grade ECG patch to check it, only about a third were actually confirmed
          to have the condition.
        </P>
        <CompareGrid
          items={[
            {
              title: "The marketing claim",
              tone: "caution",
              children: (
                <>
                  <P>
                    &ldquo;Detects irregular heart rhythms&rdquo; reads as a confident, general
                    statement about what the feature does.
                  </P>
                  <P>Says nothing about who was tested, or how often the alert is a false alarm.</P>
                </>
              ),
            },
            {
              title: "What the study actually showed",
              tone: "neutral",
              children: (
                <>
                  <P>
                    Tested on a specific, mostly young and healthy population, where the
                    condition is uncommon to begin with.
                  </P>
                  <P>Roughly two out of three people who followed up on an alert did not
                    actually have the condition.</P>
                </>
              ),
            },
          ]}
        />
        <P>
          That is not a reason to dismiss the feature — it caught real cases that would have
          gone unnoticed. It is a reason to read &ldquo;accurate&rdquo; as a claim with a
          population and a test protocol behind it, not a blanket guarantee that travels with
          the device wherever it goes.
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
        id="what-a-consumer-device-simply-cannot-detect"
        title="What a consumer device simply cannot detect"
      >
        <P>
          It is worth being specific about the boundary rather than treating &ldquo;it has
          limits&rdquo; as a vague disclaimer. A consumer wearable can only ever flag something
          that shows up as a pattern in the exact signal it measures — and most of what can go
          wrong in a body never touches that signal at all.
        </P>
        <ChecklistCard
          marker="dot"
          title="Outside a wearable's reach, even a well-reviewed one"
          items={[
            "A heart attack in progress — a wearable can notice an abnormal rhythm, not damaged heart muscle or a blocked artery.",
            "Cancer of any kind — nothing about a tumour shows up in heart rate, motion, or skin temperature.",
            "Internal bleeding or a stroke, unless it happens to produce a large enough change in the specific signal being tracked.",
            "Blood chemistry beyond what a device is specifically built to sense — electrolytes, kidney function, cholesterol, none of it visible to an optical or motion sensor.",
            "A mental health condition directly, though disrupted sleep or activity patterns can sometimes correlate with one.",
          ]}
        />
        <P>
          None of this is a flaw in a specific product. It is a description of what a sensor on
          your wrist physically can and cannot see, no matter how good the software behind it
          gets.
        </P>
      </LessonSection>

      <LessonSection
        id="the-cost-of-anxiety-and-over-testing-from-continuous-data"
        title="The cost of anxiety and over-testing from continuous data"
      >
        <P>
          A device that used to give you one number a year now gives you thousands. Somewhere
          in that many readings, an unusual one is inevitable — not because anything is wrong,
          but because that is what noisy data does across a large enough sample. Sleep
          researchers have a name for what happens next in one specific domain:{" "}
          <Strong>orthosomnia</Strong>, an unhealthy preoccupation with hitting a perfect
          sleep-tracker score that can make a person&apos;s actual sleep worse, not better.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "A continuous stream produces an unusual reading, purely by chance",
              detail: "With thousands of data points a year, a statistical outlier is expected, not exceptional.",
            },
            {
              label: "The reading triggers real worry, whether or not anything is actually wrong",
              detail: "A number with no context reads as a warning, because that is exactly how the app presents it.",
            },
            {
              label: "That worry leads to an appointment, or a repeat test, to rule something out",
              detail: "Reasonable on its own — but multiplied across millions of users, a meaningful new load on a healthcare system.",
            },
            {
              label: "Most of those follow-ups find nothing, at a real cost in money and time",
              detail: "The false alarm rate from the last section compounds here: most flagged readings were never the condition to begin with.",
            },
          ]}
        />
        <P>
          None of this argues for ignoring the data. It argues for treating a single unusual
          reading the way you would treat a single unusual comment from a stranger — worth
          noting, not worth rearranging your week over.
        </P>
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
        <P>
          That is the honest summary of this entire chapter: not that the data is worthless, and
          not that it is trustworthy either, but that it earns a specific, narrower kind of
          trust than the confident number on the screen implies.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A wearable's alert is an estimate tuned to flag anything unusual, not a diagnosis of a specific condition.",
          "An accuracy claim describes performance on the population and protocol the validation study actually used — in the largest such study of an irregular-rhythm alert, about two-thirds of people who followed up did not have the condition.",
          "A consumer device can only ever see what its specific sensor measures — a heart attack in progress, cancer, and internal bleeding all sit entirely outside that reach.",
          "Thousands of readings a year make a statistical outlier inevitable, and chasing every one of them carries a real cost in anxiety, unnecessary appointments, and money.",
          "A pattern that repeats across days, not a single reading, is what actually justifies booking a real appointment.",
        ]}
      />
    </div>
  );
}
