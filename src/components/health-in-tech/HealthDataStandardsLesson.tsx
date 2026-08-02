import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

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
        <P>
          FHIR is not the first attempt at this. It is the fourth major generation of a
          standard published by the same organisation, HL7, and it only makes sense once you
          have seen what it replaced — a format that is, remarkably, still running underneath
          most of American healthcare today.
        </P>
      </LessonSection>

      <LessonSection
        id="hl7-v2-and-the-problem-it-solved-first"
        title="HL7 v2 and the problem it solved first"
      >
        <P>
          Before FHIR, the standard almost every hospital system spoke was{" "}
          <Strong>HL7 version 2</Strong>, first published in 1987. Its job was narrower than
          FHIR&apos;s: get a lab result, an admission notice, or an order from one hospital
          system to another in real time, without a courier walking a printout down a hallway.
          For that job it worked, and it is the reason a message typed at a nurse&apos;s station
          can update a pharmacy system seconds later.
        </P>
        <CodeBlock
          label="ADT^A01 — a v2 admit message, shortened"
          variant="code"
          code={`MSH|^~\\&|REGISTRATION|GENHOSP|LAB|GENHOSP|202603140930||ADT^A01|4821|P|2.3
PID|1||482||DOE^JANE||19910604|F
PV1|1|I|MED^204^1||||1234^SMITH^ROBERT|||MED`}
        />
        <P>
          Read it as a stack of <Strong>segments</Strong>, each one starting with a three-letter
          code and each field inside it separated by a pipe: <InlineCode>MSH</InlineCode> is the
          message header, <InlineCode>PID</InlineCode> is patient identity, <InlineCode>PV1</InlineCode>{" "}
          is the visit. There is no field name anywhere in the message — position is the only
          thing telling a receiving system that the fourth pipe-separated value in{" "}
          <InlineCode>PID</InlineCode> is a birth date. Miscount a pipe and you have silently
          shifted every field after it.
        </P>
        <P>
          That positional format was fast to parse and cheap to implement in 1987, which is
          exactly why it spread. What it did not solve is the problem from the last chapter:
          v2 lets a message get <Strong>from</Strong> one system <Strong>to</Strong> another, but
          it never forced two hospitals to fill those positions with the same codes. Each
          hospital&apos;s interface team also had licence to bolt on custom{" "}
          <InlineCode>Z segments</InlineCode> — locally invented fields with no shared meaning
          outside that one building — so two &ldquo;standard&rdquo; v2 feeds could still be
          incompatible in practice.
        </P>
        <Callout tone="note" title="HL7 v2 has not gone away">
          Most hospital lab and admission traffic still runs on v2 today. FHIR usually sits on
          top of it as a translation layer at the edge of the hospital, not a wholesale
          replacement underneath — swapping out decades of working plumbing is a cost few
          hospitals choose to pay just to modernise the wire format.
        </Callout>
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
        <P>
          The part that actually changed the economics is not the JSON — plenty of older
          formats were structured too. It is that FHIR resources are fetched over ordinary{" "}
          <Strong>REST</Strong>: a plain <InlineCode>GET /Patient/482/Condition</InlineCode> over
          HTTPS, the same pattern a web developer already uses against any other API. Reading a
          v2 feed instead means standing up a dedicated interface engine and paying an analyst
          to hand-map every field position for every hospital you connect to.
        </P>
        <CompareGrid
          items={[
            {
              title: "HL7 v2, point to point",
              tone: "caution",
              children: (
                <>
                  <P>
                    Each new connection is its own project: a dedicated interface engine, a
                    mapping document, and an analyst reconciling field positions and local Z
                    segments by hand.
                  </P>
                  <P>Connecting to ten partners means roughly ten custom integrations.</P>
                </>
              ),
            },
            {
              title: "FHIR, over REST",
              tone: "positive",
              children: (
                <>
                  <P>
                    Any developer who has called a web API can call a FHIR endpoint. The shape
                    of the response is the same for every compliant system, so the integration
                    work does not scale with the number of partners.
                  </P>
                  <P>Connecting to ten partners means one thing learned, done ten times.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="the-terminologies-that-give-the-codes-meaning"
        title="The terminologies that give the codes meaning"
      >
        <P>
          FHIR and HL7 v2 are both just <Strong>envelopes</Strong> — shapes for carrying data
          from one place to another. Neither one tells you what code to put inside the envelope
          for &ldquo;Hemoglobin A1c&rdquo; or &ldquo;metformin.&rdquo; That job belongs to a
          separate layer of terminologies, each covering a different kind of fact:
        </P>
        <LabelRows
          rows={[
            { label: "SNOMED CT", text: "The broadest of the four — clinical findings, symptoms, and procedures. \"Diabetic retinopathy\" and \"appendectomy\" both live here." },
            { label: "LOINC", text: "Identifies what was measured or observed — a specific lab test, a specific vital sign — independent of which lab performed it." },
            { label: "ICD-10", text: "Diagnosis codes built primarily for billing and public-health statistics. This is the system that showed up as E11.9 in the Condition resource above." },
            { label: "RxNorm", text: "A normalised name for a medication, so \"metformin 500mg\" refers to the same drug no matter which pharmacy database originally listed it under its own name." },
          ]}
        />
        <P>
          Here is why the distinction matters in practice, not just in theory. The same lab
          result — a patient&apos;s A1c reading — looks completely different depending on
          which system carries it. Under the old approach, a lab result travelling in an HL7 v2
          message often carried whatever short code that specific lab invented:
        </P>
        <CodeBlock
          label="OBX segment — legacy local lab code"
          variant="code"
          code={`OBX|1|NM|A1C^Hemoglobin A1c^GENHOSP-LAB||7.2|%|4.0-5.6|H|||F`}
        />
        <P>
          <InlineCode>A1C</InlineCode> means something only inside that one lab&apos;s own
          system — <InlineCode>GENHOSP-LAB</InlineCode> is even named directly in the segment,
          because there is no shared registry to point to instead. The same result, expressed as
          a FHIR <InlineCode>Observation</InlineCode> using the correct terminology, looks like
          this:
        </P>
        <CodeBlock
          label="Observation.json — LOINC-coded"
          variant="code"
          code={`{
  "resourceType": "Observation",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "4548-4",
      "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
    }]
  },
  "subject": { "reference": "Patient/482" },
  "valueQuantity": { "value": 7.2, "unit": "%" }
}`}
        />
        <P>
          <InlineCode>4548-4</InlineCode> means the exact same test at every hospital on earth
          that uses LOINC, which is nearly all of them. A receiving system does not need to know
          which lab drew the blood to know what was measured — it just needs to recognise one
          code, once. That is the whole payoff of a shared terminology: the envelope carries the
          data, the terminology makes the data legible to a stranger.
        </P>
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
          The terminologies had their own slower path. SNOMED CT alone runs to more than
          350,000 concepts, and mapping a hospital&apos;s existing home-grown codes onto it —
          rather than just adopting it for new records going forward — is years of unglamorous
          clinical review work that no product roadmap prioritises on its own.
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
          "HL7 v2 solved real-time messaging in 1987 with pipe-delimited, position-based segments, and it still carries most hospital lab and admission traffic today.",
          "REST is what actually changed the economics: a FHIR endpoint is callable like any other web API, so connecting to ten partners no longer means ten custom integrations.",
          "SNOMED CT, LOINC, ICD-10, and RxNorm each name a different kind of fact — a finding, a test, a billing diagnosis, a medication — and the envelope format is useless without them.",
          "Regulation, not persuasion, is what finally made adoption spread, by giving every vendor the same deadline at the same time.",
        ]}
      />
    </div>
  );
}
