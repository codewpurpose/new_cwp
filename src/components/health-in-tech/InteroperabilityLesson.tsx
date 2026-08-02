import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { InteroperabilityRecords } from "@/components/health-in-tech/InteroperabilityRecords";

export function InteroperabilityLesson() {
  return (
    <div>
      <Lead>
        You would assume a patient&apos;s diagnosis reads the same no matter which hospital
        wrote it down. It does not. Two hospitals can run two entirely different record
        systems, and each one is free to code the exact same diagnosis a completely different
        way — which means a referral between them can arrive looking like it belongs to a
        different patient.
      </Lead>

      <LessonSection
        id="two-hospitals-two-different-ehr-systems"
        title="Two hospitals, two different EHR systems"
      >
        <P>
          There is no single EHR every hospital runs. Large health systems, small clinics, and
          specialist practices each pick from a handful of competing vendors, and nothing
          forces those vendors to store data the same way underneath. Two hospitals five miles
          apart can be running completely unrelated software, built by different companies, on
          different underlying database structures.
        </P>
        <P>
          That would be a minor inconvenience if patients only ever saw one hospital in their
          life. They do not. A referral to a specialist, a transfer after an emergency, a
          second opinion — all of them require one system to somehow hand data to a
          <Strong> different</Strong> system that was never designed to receive it.
        </P>
      </LessonSection>

      <LessonSection
        id="the-same-diagnosis-coded-two-different-ways"
        title="The same diagnosis, coded two different ways"
      >
        <P>
          Compare the two mock records below. Same patient, same diagnosis, same date — coded
          under two different standards, formatted with two different date conventions, and
          filed under two differently named sections of the chart.
        </P>
      </LessonSection>

      <InteroperabilityRecords />

      <LessonSection
        id="why-a-shared-standard-is-the-only-real-fix"
        title="Why a shared standard is the only real fix"
      >
        <P>
          You could imagine solving this case by case: write a one-off translator between these
          two specific hospitals&apos; systems. That approach breaks the moment a third hospital
          joins, because now you need a translator for every pair — three systems need three
          translators, ten systems need forty-five. Goodwill and one-off integrations do not
          scale; a shared standard that every vendor agrees to speak does.
        </P>
        <Callout tone="note" title="This is exactly what the next chapter covers">
          That shared standard already exists and has a name — FHIR. The next chapter walks
          through what it actually looks like as data, and why it took decades to catch on even
          after it existed.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Hospitals run competing EHR systems with no shared underlying structure, so a referral between them means one system handing data to another that was never built to receive it.",
          "The same diagnosis can arrive coded under a different standard, a different date format, and a different section name depending on which system wrote it.",
          "One-off translators between systems do not scale — ten hospitals would need forty-five separate translators, one per pair.",
          "A shared standard that every vendor agrees to speak is the only fix that scales past two systems.",
        ]}
      />
    </div>
  );
}
