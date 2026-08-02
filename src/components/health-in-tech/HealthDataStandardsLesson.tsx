import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { LabelRows } from "@/components/learn/primitives/Cards";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function HealthDataStandardsLesson() {
  return (
    <div>
      <Lead>
        &ldquo;Health data standard&rdquo; sounds like paperwork — a compliance document
        nobody outside legal actually reads. FHIR is the opposite of that: a plain JSON shape
        that any system, from any vendor, can read without a translator, and it is the single
        reason the mismatch from the last chapter has an actual fix.
      </Lead>

      <LessonSection
        id="fhir-is-the-standard-most-new-systems-speak"
        title="FHIR is the standard most new systems speak"
      >
        <P>
          FHIR — Fast Healthcare Interoperability Resources, almost always just said as
          &ldquo;fire&rdquo; — breaks a patient&apos;s record into small, named pieces called
          <Strong> resources</Strong>: a <InlineCode>Patient</InlineCode> resource, a{" "}
          <InlineCode>Condition</InlineCode> resource, a{" "}
          <InlineCode>MedicationRequest</InlineCode> resource. Every vendor that supports FHIR
          agrees on the same field names and the same coding systems inside each one, which is
          exactly the agreement the last chapter&apos;s two hospitals were missing.
        </P>
      </LessonSection>

      <LessonSection
        id="a-patient-record-as-plain-structured-data"
        title="A patient record as plain, structured data"
      >
        <P>
          Here is a simplified <InlineCode>Condition</InlineCode> resource — the FHIR shape for
          exactly the diabetes diagnosis from the last chapter, written one single way instead
          of two competing ways.
        </P>
        <CodeBlock
          label="Condition.json"
          variant="code"
          code={`{
  "resourceType": "Condition",
  "code": {
    "coding": [{
      "system": "http://hl7.org/fhir/sid/icd-10-cm",
      "code": "E11.9",
      "display": "Type 2 diabetes mellitus without complications"
    }]
  },
  "subject": { "reference": "Patient/482" },
  "recordedDate": "2026-03-14",
  "clinicalStatus": "active"
}`}
        />
        <P>Reading each field in plain English:</P>
        <LabelRows
          rows={[
            { label: "resourceType", text: "This is a diagnosis entry, not a medication or a lab result." },
            { label: "code", text: "The diagnosis itself, tagged to a specific, universally recognised code — no ambiguity about which condition this is." },
            { label: "subject", text: "Which patient this belongs to, referenced by a stable internal ID." },
            { label: "recordedDate", text: "One fixed date format, always year-month-day, no matter which country or vendor wrote it." },
            { label: "clinicalStatus", text: "Whether the condition is still active, resolved, or in remission — a field neither of the last chapter's two systems even named the same way." },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="why-standards-took-decades-to-actually-catch-on"
        title="Why standards took decades to actually catch on"
      >
        <P>
          Standards like this existed in earlier forms decades before most hospitals adopted
          them. The delay was never really about the technology. Every hospital that had
          already built its own record system had years of data locked into its own format, and
          rewriting that system to speak a new standard cost real money with no obvious
          short-term payoff for that specific hospital — the benefit mostly accrued to{" "}
          <Strong>other</Strong> hospitals trying to read its data.
        </P>
        <P>
          What finally moved the needle was regulation, not persuasion: government rules
          requiring certified systems to support FHIR gave every vendor the same deadline at
          the same time, which is the only way an industry-wide standard actually spreads —
          nobody wants to be first, and nobody wants to be last once everyone else has moved.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "FHIR breaks a patient's record into small, named resources — Patient, Condition, MedicationRequest — that every supporting vendor agrees to structure identically.",
          "A Condition resource pairs a diagnosis with one universal code, one fixed date format, and one clearly named status field, closing exactly the gap from the last chapter.",
          "The technology behind FHIR existed for years before most hospitals adopted it — the real barrier was the cost of rewriting an already-working system.",
          "Regulation, not persuasion, is what finally made adoption spread, by giving every vendor the same deadline at the same time.",
        ]}
      />
    </div>
  );
}
