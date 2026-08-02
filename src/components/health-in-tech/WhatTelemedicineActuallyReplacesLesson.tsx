import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function WhatTelemedicineActuallyReplacesLesson() {
  return (
    <div>
      <Lead>
        Telemedicine got sold, briefly, as a replacement for the doctor&apos;s office itself.
        It isn&apos;t one. It genuinely replaces some visits — a follow-up, a prescription
        refill, a quick consult — and it cannot replace a physical exam or an urgent procedure,
        no matter how good the video quality gets.
      </Lead>

      <LessonSection id="the-visits-it-genuinely-replaces" title="The visits it genuinely replaces">
        <P>
          A medication check-in, a follow-up after a procedure that is healing normally, a
          mental-health session, a renewed prescription for a condition already diagnosed — all
          of these are conversations, and a conversation works over video exactly as well as it
          works in a room. For a patient who would otherwise take half a day off work and drive
          an hour each way, replacing that visit with a fifteen-minute call is not a compromise.
          It is strictly better.
        </P>
      </LessonSection>

      <LessonSection id="the-visits-it-cant" title="The visits it can't">
        <P>
          A doctor cannot listen to your lungs, feel a suspicious lump, or set a broken bone
          through a screen. Anything that depends on physical contact, a specific piece of
          equipment in the room, or an intervention happening right now cannot move to video —
          not because the technology isn&apos;t good enough yet, but because the thing being
          replaced was never just a conversation.
        </P>
        <CompareGrid
          items={[
            {
              title: "Genuinely replaceable by video",
              tone: "positive",
              children: (
                <>
                  <P>Medication follow-ups, therapy sessions, prescription renewals, routine check-ins on a known condition.</P>
                </>
              ),
            },
            {
              title: "Cannot move to video",
              tone: "caution",
              children: (
                <>
                  <P>Physical exams, anything requiring equipment in the room, urgent procedures, a first diagnosis of an unclear symptom.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="why-the-difference-matters-for-trust-in-the-whole-system"
        title="Why the difference matters for trust in the whole system"
      >
        <P>
          <Strong>Blurring that line is where telemedicine loses people&apos;s trust</Strong>,
          not the technology itself. A patient routed to a video call for something that needed
          a physical exam, and told everything is fine over the phone, has a genuinely bad
          experience — and the natural conclusion they draw is not &ldquo;that specific visit
          was mis-routed,&rdquo; it is &ldquo;telemedicine doesn&apos;t work.&rdquo;
        </P>
        <Callout tone="tip" title="The real design problem, then">
          The hard part of telemedicine was never the video call. It is the triage step before
          it — correctly sorting which visits belong on a screen and which ones need a body in
          a room, before the patient ever picks a format.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Telemedicine genuinely replaces conversations — follow-ups, therapy, prescription renewals — as well as an in-person visit would.",
          "It cannot replace anything that depends on physical contact, equipment in the room, or an urgent in-person intervention.",
          "Routing a visit that needed a physical exam onto a video call is where trust in the whole system breaks, not a one-off mistake.",
          "The real design challenge is the triage step that sorts visits correctly before the patient ever picks a format.",
        ]}
      />
    </div>
  );
}
