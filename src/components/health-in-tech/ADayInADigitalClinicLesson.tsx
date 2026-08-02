import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

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
        <P>
          None of those three systems were necessarily built by the same company, or even
          designed to talk to each other directly. The intake form, the text-reminder platform,
          and the check-in kiosk each write into a shared record, but each one got there through
          its own separate integration — which is exactly the kind of seam this track spends
          Part 2 taking apart.
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
        <P>
          Some of what gets typed lands in a structured field — a code selected from a dropdown,
          a lab value in a numbered box, both of which a computer can read and count later.
          Some of it lands as plain typed sentences, which a person can read perfectly well but
          which a downstream system generally cannot use for anything beyond displaying it back.
          That split, between what a machine can act on and what only a human can, is the whole
          subject of the next part of this track.
        </P>
      </LessonSection>

      <LessonSection
        id="the-handoffs-where-information-quietly-goes-missing"
        title="The handoffs where information quietly goes missing"
      >
        <P>
          Nothing above is a single unbroken pipe. Each arrow in the timeline is a handoff
          between two separate systems, and every handoff is a place where something written
          down clearly on one side arrives thinner on the other.
        </P>
        <CompareGrid
          items={[
            {
              title: "What you told the intake form",
              tone: "neutral",
              children: (
                <P>
                  &ldquo;I&apos;ve had this cough for about three weeks, and it&apos;s worse at
                  night, especially when I lie down.&rdquo;
                </P>
              ),
            },
            {
              title: "What the structured record captures",
              tone: "caution",
              children: <P>Cough. Onset: 3 weeks. That is often the entire coded entry.</P>,
            },
          ]}
        />
        <P>
          The nuance — worse at night, worse lying down, which a specialist reading a referral
          six weeks later might find genuinely useful — usually survives only if a clinician
          happened to also type it as a free-text note, and free-text notes are exactly the
          part least likely to travel cleanly to the next system in line.
        </P>
        <RevealCard
          summaryTag="The referral"
          summary="A referral to a specialist looks complete when it leaves the clinic's system."
          detailTag="What actually arrives"
          detail={
            <>
              Diagnosis code, current medication list, and basic vitals usually make the trip
              intact — they are structured, so the systems agree on how to package them. Your
              own account of when a symptom is worse, which over-the-counter remedies you
              already tried and how they went, and any context you gave verbally but was never
              typed anywhere often does not arrive at all. The specialist starts the appointment
              re-asking questions you already answered once.
            </>
          }
          footnote="This is not a rare failure. It's the default outcome of moving data between two systems that were never built by the same company."
        />
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
          The pharmacy, in turn, is running its own separate system that has to reconcile your
          new prescription against every medication it already has on file for you — which is
          exactly how a pharmacist catches a dangerous drug interaction the prescribing doctor
          might not have flagged, and exactly why that reconciliation occasionally flags
          something perfectly safe and delays your pickup by an extra ten minutes.
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
          "Every handoff between two systems is a place where nuance gets lost — the coded entry survives the trip, the free-text detail behind it usually doesn't.",
          "A prescription sent electronically can reach the pharmacy before you have left the parking lot, and the pharmacy's own reconciliation check is often the last line of defence against a missed interaction.",
          "A referral leaving the clinic's system and arriving at a specialist's different system is the exact handoff Part 2 of this track is built around.",
        ]}
      />
    </div>
  );
}
