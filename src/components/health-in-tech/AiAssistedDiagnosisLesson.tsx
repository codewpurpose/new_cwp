import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { DiagnosisThresholdExplorer } from "@/components/health-in-tech/DiagnosisThresholdExplorer";

export function AiAssistedDiagnosisLesson() {
  return (
    <div>
      <Lead>
        &ldquo;AI diagnosed the tumour&rdquo; is a headline, not what actually happens in a
        clinic. A diagnosis-assist model does not hand a doctor a verdict — it hands them a
        probability, and where the system draws the line for what counts as a flag changes
        what gets caught and what gets missed, every single time.
      </Lead>

      <LessonSection id="a-second-opinion-not-a-replacement" title="A second opinion, not a replacement">
        <P>
          In actual clinical use, a diagnosis-assist model sits alongside a radiologist or
          physician, not in place of one. It reviews the same scan or the same chart, surfaces
          cases it thinks deserve a closer look, and the clinician makes the actual call — the
          model is there to catch what a tired reviewer on their fortieth case of the day might
          miss, not to remove the reviewer.
        </P>
      </LessonSection>

      <LessonSection
        id="a-model-outputs-a-probability-not-a-verdict"
        title="A model outputs a probability, not a verdict"
      >
        <P>
          Underneath the alert a doctor sees, the model itself never outputs
          &ldquo;yes&rdquo; or &ldquo;no.&rdquo; It outputs a number between 0 and 1 — its
          estimate of how likely this case is to be positive, based on everything similar it
          has seen before. <Strong>Something has to turn that number into an actual
          flag</Strong>, and that something is a threshold, chosen in advance by the people who
          built and deployed the system.
        </P>
      </LessonSection>

      <LessonSection
        id="moving-the-threshold-changes-what-counts-as-a-flag"
        title="Moving the threshold changes what counts as a flag"
      >
        <P>
          Move the slider below across forty simulated cases and watch what happens. Lower the
          threshold and more true cases get caught — but more healthy cases get flagged too,
          each one a false alarm that costs a clinician&apos;s time and a patient&apos;s anxiety
          on a follow-up that finds nothing. Raise it and false alarms drop — at the direct cost
          of missing real cases that scored just under the line.
        </P>
      </LessonSection>

      <DiagnosisThresholdExplorer />

      <Callout tone="warning" title="There is no threshold that eliminates both problems">
        Every choice of threshold is a trade-off between missed cases and false alarms, not a
        setting you can tune your way out of the trade-off entirely. A hospital deciding where
        to set that line is making a values decision — how many false alarms is it
        willing to generate to catch one more real case — dressed up as a technical setting.
      </Callout>

      <TakeawayCard
        items={[
          "A diagnosis-assist model is deployed as a second opinion a clinician reviews, not a replacement for their judgement.",
          "The model itself outputs a probability between 0 and 1, never a direct yes-or-no verdict.",
          "Lowering the flag threshold catches more real cases but also raises false alarms; raising it does the reverse.",
          "No single threshold eliminates both missed cases and false alarms — choosing one is a values decision about which failure is more acceptable, not just a technical setting.",
        ]}
      />
    </div>
  );
}
