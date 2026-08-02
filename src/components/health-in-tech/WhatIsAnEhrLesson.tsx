import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { InlineCode } from "@/components/learn/primitives/CodeBlock";
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

      <LessonSection
        id="what-an-ehr-is-actually-for"
        title="What an EHR is actually for, versus what you wish it were"
      >
        <P>
          Here is the fact that explains almost every complaint you will ever hear a clinician
          make about their EHR: it was not primarily built to help a doctor think. It was built
          to produce a legally defensible record and to justify a bill. Those are real, serious
          jobs — a hospital that cannot prove what it did cannot get paid for it, and cannot
          defend itself if something goes wrong — but they are a different job from
          &ldquo;help a clinician reason through a diagnosis,&rdquo; which is the job most
          patients assume the software is doing.
        </P>
        <CompareGrid
          items={[
            {
              title: "What it's built to be",
              tone: "neutral",
              children: (
                <>
                  <P>A billing record — every action coded so the visit can be charged for.</P>
                  <P>A legal record — proof of what was done, in case it is ever questioned.</P>
                </>
              ),
            },
            {
              title: "What clinicians wish it were",
              tone: "caution",
              children: (
                <>
                  <P>A thinking tool — something that surfaces the right fact at the right moment.</P>
                  <P>Fast — a system that gets out of the way of a three-minute visit.</P>
                </>
              ),
            },
          ]}
        />
        <P>
          The gap between those two columns is where most of the frustration lives. A
          field that exists to justify a billing code is not the same field a doctor would
          have designed to help them remember why they suspected pneumonia. Both jobs are being
          done by the same screen, and the screen was optimised for the one that pays the bills
          first.
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

      <LessonSection
        id="structured-data-and-the-documentation-burden"
        title="Structured data, free text, and the documentation burden"
      >
        <P>
          Every field in the mock chart above is <Strong>structured data</Strong> — a medication
          name picked from a known list, a dosage stored as a number with a unit, an allergy
          severity chosen from a fixed set of options. Structured data is what a computer can
          count, chart, flag, or hand to another system. It is also, by its nature, thinner than
          what a person would actually say out loud.
        </P>
        <P>
          The rest of a clinical note is <Strong>unstructured data</Strong> — full sentences
          typed or dictated by a clinician, closer to how the last chapter&apos;s intake form
          answer actually sounded. Unstructured data captures nuance a dropdown never could.
          It is also, for a computer, close to unreadable: a system built to flag rising
          <InlineCode>A1C</InlineCode> values across a patient population cannot act on a
          sentence buried in a note, no matter how clearly a person wrote it.
        </P>
        <P>
          Somebody has to produce all of that structured data, one click and one dropdown at a
          time, and that person is the clinician sitting across from you. One widely cited study
          of physician time found nearly two hours of documentation and EHR-related desk work
          for every single hour spent face-to-face with a patient — a ratio most patients never
          see, because it happens between visits and after the clinic has closed.
        </P>
        <Callout tone="warning" title="This is not a training problem">
          The usual assumption is that documentation burden is about clinicians being slow with
          the software. Mostly it is not. It is the direct cost of asking one screen to be a
          billing system, a legal record, and a clinical thinking tool at once — every extra
          click exists because some other stakeholder, somewhere, needs that field filled in.
        </Callout>
      </LessonSection>

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
          "It was built first to produce a billing-defensible, legally defensible record, not to help a clinician think — and that mismatch is behind almost every complaint about it.",
          "Structured data is what a computer can count and act on; unstructured free text carries the nuance but is nearly invisible to any other system.",
          "Nearly two hours of documentation for every hour of face-to-face time is a widely reported ratio, and it is a direct cost of the record serving three different jobs at once.",
          "Who sees which section is enforced by role-based access built into the software, not by staff discretion.",
        ]}
      />
    </div>
  );
}
