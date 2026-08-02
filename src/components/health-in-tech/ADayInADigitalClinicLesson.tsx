import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function ADayInADigitalClinicLesson() {
  return (
    <div>
      <Lead>
        You experience a doctor&apos;s visit as maybe fifteen minutes with one person in one
        room. Behind that fifteen minutes, a single appointment now generates data before you
        arrive, during the visit itself, and long after you have left — most of it invisible
        to you the entire time.
      </Lead>

      <LessonSection
        id="checking-in-before-you-even-arrive"
        title="Checking in before you even arrive"
      >
        <P>
          Fill out an online intake form the night before, and that data is already sitting in
          the clinic&apos;s system before you leave your house. Confirm the appointment by text,
          and a scheduling system just logged that confirmation against your record. Arrive and
          tap a check-in kiosk, and the system has already matched you to today&apos;s slot,
          pulled your insurance details, and flagged your provider that you are in the building —
          three separate pieces of software, none of which you thought of as
          &ldquo;health tech&rdquo; while you were using them.
        </P>
      </LessonSection>

      <StepList
        variant="timeline"
        steps={[
          {
            label: "Online intake, the night before",
            detail:
              "Symptoms, current medications, and insurance details entered once, syncing to the record the clinic will open tomorrow.",
          },
          {
            label: "Appointment confirmation and check-in",
            detail:
              "A text reminder, then a kiosk or front-desk scan that matches you to today's slot and tells your provider you have arrived.",
          },
          {
            label: "The visit itself",
            detail:
              "Vitals captured on a connected device, notes typed directly into the record as the doctor talks, orders for labs or prescriptions sent electronically before you leave the room.",
          },
          {
            label: "After-visit summary",
            detail:
              "A written summary posts to your patient portal within minutes, usually before you have reached the parking lot.",
          },
          {
            label: "Downstream routing",
            detail:
              "Lab orders route to a lab system, prescriptions route to a pharmacy's system, and a referral routes to a specialist's own record — three more systems, three more handoffs.",
          },
        ]}
      />

      <LessonSection
        id="the-visit-itself-generates-more-data-than-you-notice"
        title="The visit itself generates more data than you notice"
      >
        <P>
          A pulse oximeter clipped on your finger for ten seconds writes a number straight into
          your chart. A blood-pressure cuff does the same. The doctor is typing while talking
          to you, and what they type becomes the permanent clinical note for this visit — not a
          summary written up later from memory, but the actual real-time record. None of this
          existed in a paper-chart world, where the note got written by hand after you had
          already left.
        </P>
      </LessonSection>

      <LessonSection
        id="what-happens-to-that-data-after-you-leave"
        title="What happens to that data after you leave"
      >
        <P>
          A prescription does not get handed to you on paper anymore — it gets transmitted
          electronically to the pharmacy of your choice, often arriving before you have left the
          parking lot. A lab order routes to whichever lab the clinic partners with. A referral
          to a specialist routes to that specialist&apos;s own record system, which may or may
          not be the same system the clinic itself runs — a mismatch you will see up close in
          Part 2 of this track.
        </P>
        <P>
          <Strong>One visit, five or six separate systems</Strong>, each one a stage this track
          treats as its own subject: the record itself, how it moves between systems, the
          device that measured you, and eventually the software that decides what any of it
          means.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A single fifteen-minute visit already touches five or six separate systems, most of which you never see directly.",
          "Check-in, vitals, and the clinical note now all write directly into the record in real time, not on paper written up afterward.",
          "A prescription sent electronically can reach the pharmacy before you have left the parking lot.",
          "A referral leaving the clinic's system and arriving at a specialist's different system is the exact handoff Part 2 of this track is built around.",
        ]}
      />
    </div>
  );
}
