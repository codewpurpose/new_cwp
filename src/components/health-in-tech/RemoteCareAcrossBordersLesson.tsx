import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

export function RemoteCareAcrossBordersLesson() {
  return (
    <div>
      <Lead>
        A specialist who could answer your exact question exists somewhere in the world. The
        old problem was never that they didn&apos;t exist — it was that reaching them meant a
        flight, a visa, and money most people don&apos;t have. That is the same distance problem
        CodeWithPurpose exists to close in education, showing up again in healthcare.
      </Lead>

      <LessonSection
        id="the-same-problem-cwp-exists-to-solve-shows-up-here"
        title="The same problem CodeWithPurpose exists to solve shows up here"
      >
        <P>
          CodeWithPurpose exists because good coding education was historically locked behind
          location and cost — a great teacher existed, but reaching them required money or
          geography most students didn&apos;t have. Cross-border telemedicine is the identical
          shape of problem in a different field: a specialist who could genuinely help exists
          somewhere, and for most of history the only thing standing between them and a patient
          who needed them was distance nobody could afford to close.
        </P>
      </LessonSection>

      <LessonSection
        id="a-consultation-that-doesnt-require-a-flight"
        title="A consultation that doesn't require a flight"
      >
        <P>
          A rare-disease specialist practising in one country can now review a patient&apos;s
          scans and history from another country entirely, over a video call that costs a
          fraction of what a flight and a hotel would have. A patient in a region with no local
          specialist in a specific condition can get a genuine second opinion without leaving
          their city. None of this required new medicine — it required the connectivity and
          record-sharing infrastructure covered earlier in this track to exist first.
        </P>
      </LessonSection>

      <LessonSection id="what-still-has-to-happen-in-person" title="What still has to happen in person">
        <P>
          <Strong>A remote consultation is still a consultation</Strong>, subject to the same
          limits as Part 5&apos;s first chapter — it can inform a diagnosis and a treatment
          plan, but any actual procedure, physical exam, or urgent intervention still requires a
          body in a room, usually the patient&apos;s own local system carrying out what the
          remote specialist recommended.
        </P>
        <Callout tone="success" title="Worth sitting with">
          The value here was never replacing local care. It is giving a patient without local
          access to a specific specialist a real second opinion they could not otherwise have
          reached — the exact kind of gap CodeWithPurpose was built to close, just in a
          different field.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Cross-border telemedicine and CodeWithPurpose's own mission solve the same shape of problem: a distance between someone who needs help and someone who can give it, that used to be unaffordable to close.",
          "A specialist in one country can now review scans and history from a patient in another for a fraction of the cost of a flight and a hotel.",
          "None of this required new medicine — it required the connectivity and record-sharing infrastructure covered earlier in this track.",
          "A remote consultation still can't replace an in-person procedure or physical exam — it closes a gap in access to expertise, not a gap in what a screen can physically do.",
        ]}
      />
    </div>
  );
}
