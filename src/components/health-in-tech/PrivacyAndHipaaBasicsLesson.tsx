import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function PrivacyAndHipaaBasicsLesson() {
  return (
    <div>
      <Lead>
        Most people assume HIPAA means &ldquo;anything about my health is legally private.&rdquo;
        It doesn&apos;t. HIPAA protects specific information, handled by specific kinds of
        organisations — and the fitness app on your phone almost certainly falls outside both
        boundaries, no matter how personal the data it holds feels.
      </Lead>

      <LessonSection
        id="hipaa-protects-specific-information-not-all-of-it"
        title="HIPAA protects specific information, not all of it"
      >
        <P>
          HIPAA — the Health Insurance Portability and Accountability Act — covers{" "}
          <Strong>Protected Health Information</Strong>: data created or held by a covered
          healthcare provider, health plan, or their business partners, tied to an identifiable
          patient. A doctor&apos;s note about your diagnosis is squarely inside that boundary. A
          lot of health-adjacent data people assume is covered is not.
        </P>
      </LessonSection>

      <LessonSection id="who-is-actually-bound-by-it" title="Who is actually bound by it">
        <P>
          The law binds <Strong>covered entities</Strong> — hospitals, clinics, insurers,
          pharmacies — and their <Strong>business associates</Strong>, companies those entities
          hire to handle patient data on their behalf, like a billing service or a cloud
          storage provider. Step outside that specific relationship and HIPAA typically has
          nothing to say, even about data that looks exactly like medical information.
        </P>
        <RevealCard
          summaryTag="Scenario"
          summary="Your cardiologist's office emails you your latest EKG results."
          detailTag="Covered"
          detail={
            <>
              This is Protected Health Information, created by a covered entity about an
              identifiable patient. Its handling, storage, and any breach of it fall directly
              under HIPAA.
            </>
          }
          footnote="The organisation and the data both sit inside the boundary the law was written for."
        />
        <RevealCard
          summaryTag="Scenario"
          summary="A step-counting app you downloaded from the app store logs your daily heart rate."
          detailTag="Not covered"
          detail={
            <>
              Unless that app was built by, or contracted to, a covered healthcare provider or
              insurer, HIPAA does not apply to it — even though the data is arguably more
              detailed than what your doctor sees in a single visit. The app is instead governed
              by its own privacy policy and general consumer-protection law, which offer weaker
              guarantees.
            </>
          }
          footnote="This is the single most common misunderstanding people bring to this topic — the sensitivity of the data does not determine whether HIPAA applies; who is holding it does."
        />
      </LessonSection>

      <LessonSection id="what-a-breach-actually-triggers" title="What a breach actually triggers">
        <P>
          When a covered entity has a breach — a hacked hospital database, a lost
          laptop with patient files on it — HIPAA requires notifying every affected patient,
          notifying the federal government, and in large breaches notifying the media, all
          within a fixed number of days. Fines follow, and they can run into the millions for a
          large or negligent breach.
        </P>
        <P>
          None of those specific obligations apply to a consumer wellness app leaking the same
          kind of data. It might violate its own privacy policy, and general data-protection or
          state consumer law might apply — but not the specific machinery HIPAA sets in motion,
          because the app was never a covered entity to begin with.
        </P>
        <Callout tone="tip" title="Why this boundary matters if you build health tech">
          Knowing whether your product counts as a covered entity or a business associate is
          not a legal detail to defer — it decides which security requirements, breach
          procedures, and contracts you are actually obligated to have in place before you ship.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "HIPAA protects Protected Health Information handled by covered entities and their business associates — not every piece of health-adjacent data everywhere.",
          "A consumer wellness app is usually outside HIPAA entirely, even when its data is more detailed than what a doctor's office holds.",
          "What determines HIPAA coverage is who is holding the data, not how sensitive the data feels.",
          "A real HIPAA breach triggers fixed notification deadlines and potential fines running into the millions — obligations a non-covered app simply doesn't have.",
        ]}
      />
    </div>
  );
}
