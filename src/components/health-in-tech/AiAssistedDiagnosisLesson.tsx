import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { DiagnosisThresholdExplorer } from "@/components/health-in-tech/DiagnosisThresholdExplorer";

export function AiAssistedDiagnosisLesson() {
  return (
    <div>
      <Lead>
        &ldquo;AI diagnosed the tumour&rdquo; is a headline, not what actually happens in a
        clinic. A diagnosis-assist model does not hand a doctor a verdict — it hands them a
        probability, and where the system draws the line for what counts as a flag changes what
        gets caught and what gets missed, every single time.
      </Lead>

      <LessonSection id="a-second-opinion-not-a-replacement" title="A second opinion, not a replacement">
        <P>
          In actual clinical use, a diagnosis-assist model sits alongside a radiologist or
          physician, not in place of one. It reviews the same scan or the same chart, surfaces
          cases it thinks deserve a closer look, and the clinician makes the actual call — the
          model is there to catch what a tired reviewer on their fortieth case of the day might
          miss, not to remove the reviewer.
        </P>
        <P>
          That arrangement is not a temporary stepping stone toward full automation — it is the
          actual deployed shape almost everywhere one of these tools is in clinical use today. A
          model that is wrong in a way a busy clinician would catch is an acceptable cost of doing
          business; a model that is wrong with nobody checking is a different kind of product
          entirely, and regulators have been explicit that the second one is not what gets
          approved for anything but the narrowest, lowest-stakes uses.
        </P>
      </LessonSection>

      <LessonSection
        id="a-model-outputs-a-probability-not-a-verdict"
        title="A model outputs a probability, not a verdict"
      >
        <P>
          Underneath the alert a doctor sees, the model itself never outputs &ldquo;yes&rdquo; or
          &ldquo;no.&rdquo; It outputs a number between 0 and 1 — its estimate of how likely this
          case is to be positive, based on everything similar it has seen before.{" "}
          <Strong>Something has to turn that number into an actual flag</Strong>, and that
          something is a threshold, chosen in advance by the people who built and deployed the
          system.
        </P>
        <P>
          Two systems can share the exact same underlying number and behave completely differently
          once a hospital deploys them, because the number itself commits to nothing. A model that
          says 0.61 has not said &ldquo;probably positive&rdquo; or &ldquo;probably
          negative&rdquo; — it has said &ldquo;more likely than not, by not very much,&rdquo; and
          it is entirely up to the people deploying it to decide how much weight that deserves.
        </P>
      </LessonSection>

      <LessonSection
        id="moving-the-threshold-changes-what-counts-as-a-flag"
        title="Moving the threshold changes what counts as a flag"
      >
        <P>
          Move the slider below across forty simulated cases and watch what happens. Lower the
          threshold and more true cases get caught — but more healthy cases get flagged too, each
          one a false alarm that costs a clinician&apos;s time and a patient&apos;s anxiety on a
          follow-up that finds nothing. Raise it and false alarms drop — at the direct cost of
          missing real cases that scored just under the line.
        </P>
      </LessonSection>

      <DiagnosisThresholdExplorer />

      <Callout tone="warning" title="There is no threshold that eliminates both problems">
        Every choice of threshold is a trade-off between missed cases and false alarms, not a
        setting you can tune your way out of the trade-off entirely. A hospital deciding where to
        set that line is making a values decision — how many false alarms is it willing to
        generate to catch one more real case — dressed up as a technical setting.
      </Callout>

      <LessonSection
        id="sensitivity-and-specificity-are-not-the-number-a-patient-wants"
        title="Sensitivity and specificity are not the number a patient wants"
      >
        <P>
          Everything above describes properties of the test, not properties of your result.{" "}
          <Strong>Sensitivity</Strong> is the share of people who actually have the condition that
          the model correctly flags. <Strong>Specificity</Strong> is the share of people who
          don&apos;t have it that the model correctly clears. Both are honest, useful numbers —
          and neither one answers the question a patient is actually holding when a result comes
          back positive: given that I was flagged, how likely am I to actually have this?
        </P>
        <P>
          That number has a name — <Strong>positive predictive value</Strong>, or PPV — and it
          depends on something sensitivity and specificity don&apos;t capture at all: how common
          the condition actually is in the population being tested. A test can be excellent by
          every measure a manufacturer would put on a spec sheet and still produce a flag that is
          wrong far more often than it is right, once the condition it is looking for is rare
          enough.
        </P>
      </LessonSection>

      <LessonSection
        id="the-arithmetic-that-collapses-at-low-prevalence"
        title="The arithmetic that collapses at low prevalence"
      >
        <P>
          Work it out with real numbers rather than taking that on faith. Screen 10,000 people for
          a condition that actually affects 1% of them, using a test that is 90% sensitive and 90%
          specific — numbers a manufacturer would happily print on a box.
        </P>
        <CodeBlock
          label="10,000 people screened, 1% prevalence"
          code={`100 people actually have the condition. 9,900 don't.

Sensitivity 90%              Specificity 90%
  90 true positives            990 false positives
  10 false negatives         8,910 true negatives

Flagged positive: 90 + 990 = 1,080
Of those, 90 actually have the condition.

Positive predictive value: 90 / 1,080 ≈ 8%`}
        />
        <P>
          A test that is right nine times out of ten in both directions still produces a positive
          flag that is wrong about eleven times out of twelve, because at 1% prevalence the
          healthy population is so much larger than the sick one that even a small false-positive
          rate applied to it swamps the true positives. That is not the test failing. That is
          arithmetic — sensitivity and specificity stay the same 90% and 90% no matter how rare the
          condition is; prevalence is the variable actually doing the damage.
        </P>
        <LabelRows
          rows={[
            {
              label: "Population screening",
              text: "Testing everyone, prevalence 1% — positive predictive value lands around 8%. Most flags are false alarms.",
            },
            {
              label: "Testing after symptoms",
              text: "Testing only people already showing signs, prevalence 30% — the same test's positive predictive value climbs to around 79%. Same model, same threshold, a completely different number.",
            },
          ]}
        />
        <P>
          This is why a screening programme aimed at an entire healthy population and a diagnostic
          test ordered for someone already showing symptoms are different products wearing the
          same underlying model, and why moving the threshold in the section above changes
          sensitivity and specificity without ever touching the deeper problem. A model tuned to
          catch more true cases at a low prevalence still returns mostly false alarms — it just
          returns a different mix of them.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A diagnosis-assist model is deployed as a second opinion a clinician reviews, not a replacement for their judgement — and regulators have kept it that way.",
          "The model itself outputs a probability between 0 and 1, never a direct yes-or-no verdict; a threshold set by the people deploying it turns that number into a flag.",
          "Sensitivity and specificity describe the test, not your result — the number a patient actually wants is positive predictive value, and it depends on how common the condition is.",
          "At 1% prevalence, a test that's 90% sensitive and 90% specific still returns a positive flag that's wrong about eleven times out of twelve.",
          "No single threshold eliminates both missed cases and false alarms — choosing one is a values decision about which failure is more acceptable, not just a technical setting.",
        ]}
      />
    </div>
  );
}
