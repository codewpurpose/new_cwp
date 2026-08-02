import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { EhrRecordViewer } from "@/components/health-in-tech/EhrRecordViewer";

export function WhatIsAnEhrLesson() {
  return (
    <div>
      <Lead>
        An Electronic Health Record sounds like a straightforward swap: the manila folder at
        the end of your hospital bed became a screen. It is not a digital copy of that folder.
        It is a live, structured database that multiple people update at once, and the
        structure is exactly what a paper chart never had.
      </Lead>

      <LessonSection
        id="the-record-that-replaced-the-paper-chart"
        title="The record that replaced the paper chart"
      >
        <P>
          A paper chart was one physical object. Only one person could hold it at a time, its
          handwriting was only ever as legible as whoever wrote it, and finding &ldquo;every
          time this patient had a fever&rdquo; meant flipping through pages by hand. An EHR
          exists as data, not paper — a nurse, a specialist, and a billing clerk can all have a
          patient&apos;s chart open in different tabs at the same moment, each one seeing the
          parts relevant to their job.
        </P>
        <P>
          That shift, from <Strong>one physical object</Strong> to{" "}
          <Strong>structured data multiple systems can query</Strong>, is what makes an EHR the
          foundation the rest of health tech is built on top of. Interoperability, AI diagnosis,
          and remote monitoring in later parts of this track all assume a patient&apos;s history
          already exists somewhere as data, not ink.
        </P>
      </LessonSection>

      <LessonSection id="what-actually-lives-inside-one" title="What actually lives inside one">
        <P>
          Click through the mock chart below. A real EHR holds current medications and dosages,
          documented allergies with their severity, a chronological visit history, and lab
          results — each one a distinct section a clinician can pull up independently rather
          than reading a single long note top to bottom.
        </P>
      </LessonSection>

      <EhrRecordViewer />

      <LessonSection id="who-gets-to-see-which-parts" title="Who gets to see which parts">
        <P>
          Not everyone who can open the chart sees the same thing. A front-desk scheduler
          typically sees your name, appointment history, and insurance details — not your
          medication list. A nurse taking vitals sees allergies and current medications, which
          matter for immediate safety, but not necessarily years of old visit notes. A treating
          physician sees the full picture. This is <Strong>role-based access</Strong>, and it is
          enforced by the software itself, not by staff choosing to look away.
        </P>
        <P>
          That access boundary is not a courtesy. It is a legal requirement under privacy rules
          covered in full later in this part — a record system that let every employee see
          every field would fail an audit long before it failed a patient.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "An EHR is not a digital paper chart — it is structured data multiple people can query and update at the same moment.",
          "Medications, allergies, visit history, and lab results live as distinct sections, not one long note.",
          "Who sees which section is enforced by role-based access built into the software, not by staff discretion.",
          "Every later part of this track — interoperability, AI diagnosis, remote monitoring — assumes this structured record already exists.",
        ]}
      />
    </div>
  );
}
