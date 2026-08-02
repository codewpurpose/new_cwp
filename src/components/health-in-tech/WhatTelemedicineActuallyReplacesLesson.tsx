import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function WhatTelemedicineActuallyReplacesLesson() {
  return (
    <div>
      <Lead>
        Telemedicine got sold, briefly, as a replacement for the doctor&apos;s office itself. It
        isn&apos;t one. It replaces some visits — a follow-up, a prescription refill, a quick
        consult — and it cannot replace a physical exam or an urgent procedure, no matter how good
        the video quality gets.
      </Lead>

      <LessonSection id="the-visits-it-genuinely-replaces" title="The visits it replaces">
        <P>
          A medication check-in, a follow-up after a procedure that is healing normally, a
          mental-health session, a renewed prescription for a condition already diagnosed — all of
          these are conversations, and a conversation works over video exactly as well as it works
          in a room. For a patient who would otherwise take half a day off work and drive an hour
          each way, replacing that visit with a fifteen-minute call is not a compromise. It is
          strictly better.
        </P>
        <P>
          The savings compound in a specific direction too — toward the patient who has the least
          slack to spare. A parent who can take a fifteen-minute call from a break room keeps their
          income for the day; a parent who has to arrange transport, childcare, and half a day of
          unpaid leave for a five-minute conversation with a doctor is paying a cost that has
          nothing to do with medicine at all.
        </P>
      </LessonSection>

      <LessonSection id="the-visits-it-cant" title="The visits it can't">
        <P>
          A doctor cannot listen to your lungs, feel a suspicious lump, or set a broken bone
          through a screen. Anything that depends on physical contact, a specific piece of
          equipment in the room, or an intervention happening right now cannot move to video — not
          because the technology isn&apos;t good enough yet, but because the thing being replaced
          was never just a conversation.
        </P>
        <CompareGrid
          items={[
            {
              title: "Replaceable by video",
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

      <LessonSection id="the-visits-it-only-adds-to" title="The visits it only adds to">
        <P>
          There is a third category the replace-or-can&apos;t framing misses, and it complicates
          the tidy story that telemedicine straightforwardly saves the system money: visits that
          would not have happened in any form without the cheap, easy option, which means they
          are not replacing an in-person visit at all — they are new demand.
        </P>
        <P>
          One frequently cited study of a large direct-to-consumer telehealth service found that
          only about 12% of its visits substituted for a visit that would otherwise have happened
          in person or at an emergency room. The remaining share was largely new utilisation —
          visits for symptoms a patient would most likely have waited out or treated at home if a
          video consult had not been one tap away.
        </P>
        <P>
          None of that makes the extra visits worthless — catching a treatable infection early
          instead of waiting it out has a real value of its own. It does mean the cost argument for
          telemedicine is more complicated than &ldquo;it replaces an expensive visit with a cheap
          one,&rdquo; because a meaningful share of the time, there was no expensive visit being
          replaced in the first place.
        </P>
      </LessonSection>

      <LessonSection id="licensing-draws-a-line-state-by-state" title="Licensing draws a line state by state">
        <P>
          A second limit has nothing to do with what a video call can or can&apos;t examine, and
          everything to do with law: a doctor generally has to be licensed in the state or country
          where the patient is physically sitting at the moment of the call, not where the doctor
          happens to be. &ldquo;Any doctor, anywhere&rdquo; was always the pitch. The actual
          product is closer to &ldquo;any licensed doctor in the specific place you are currently
          standing.&rdquo;
        </P>
        <P>
          That constraint is why most telemedicine platforms only work within a single country, and
          often only within specific states inside it, despite nothing about the technology itself
          caring where either person is. Multi-state licensure compacts have expanded coverage in
          places, but they have not erased the underlying rule, and prescribing certain controlled
          medications over video adds its own extra layer of requirements on top of the licence
          itself.
        </P>
        <ChecklistCard
          title="What has to line up before a video visit is legal"
          items={[
            "The doctor holds a licence in the state the patient is physically located in right now, not the state either of them normally lives in.",
            "The platform meets that state's specific telehealth rules — some require an initial in-person visit before certain prescriptions can be issued by video at all.",
            "Prescribing a controlled substance over video usually requires clearing extra requirements beyond an ordinary medical licence.",
          ]}
        />
      </LessonSection>

      <LessonSection
        id="why-the-difference-matters-for-trust-in-the-whole-system"
        title="Why the difference matters for trust in the whole system"
      >
        <P>
          <Strong>Blurring that line is where telemedicine loses people&apos;s trust</Strong>, not
          the technology itself. A patient routed to a video call for something that needed a
          physical exam, and told everything is fine over the phone, has a bad experience — and
          the natural conclusion they draw is not &ldquo;that specific visit was mis-routed,&rdquo;
          it is &ldquo;telemedicine doesn&apos;t work.&rdquo;
        </P>
        <Callout tone="tip" title="The real design problem, then">
          The hard part of telemedicine was never the video call. It is the triage step before
          it — correctly sorting which visits belong on a screen and which ones need a body in a
          room, before the patient ever picks a format.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Telemedicine replaces conversations — follow-ups, therapy, prescription renewals — as well as an in-person visit would, at a fraction of the cost to the patient's time.",
          "It cannot replace anything that depends on physical contact, equipment in the room, or an urgent in-person intervention.",
          "A meaningful share of telehealth visits aren't replacing an in-person visit at all — they're new demand that wouldn't exist without the cheap, easy option.",
          "A doctor generally needs a licence in the state the patient is physically in during the call, which is why 'any doctor, anywhere' is not what most platforms actually deliver.",
          "Routing a visit that needed a physical exam onto a video call is where trust in the whole system breaks, not a one-off mistake.",
        ]}
      />
    </div>
  );
}
