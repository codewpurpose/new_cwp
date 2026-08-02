import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhatMedicalAiIsActuallyDoingTodayLesson() {
  return (
    <div>
      <Lead>
        Headlines about medical AI tend to land on one of two extremes: it is either about to
        replace your doctor, or it is barely more than a gimmick. Neither is what is actually
        happening. Medical AI today is pattern-matching at a scale no single radiologist or
        researcher can hold in their head — deployed, under supervision, in a specific handful of
        places, and mostly hype in a couple of others that happen to make better headlines.
      </Lead>

      <LessonSection
        id="pattern-matching-at-a-scale-no-person-can"
        title="Pattern-matching at a scale no person can"
      >
        <P>
          A radiologist reviewing a scan is comparing it, in their head, against every similar
          case they have personally seen across a career — a few tens of thousands at most. A
          model trained on scans can be shown millions of labelled examples before it ever looks
          at a real patient&apos;s image. That gap in raw exposure, not some deeper form of
          understanding, is where most of medical AI&apos;s advantage actually comes from.
        </P>
        <P>
          <Strong>It is not reasoning about your case the way a doctor does.</Strong> It is
          recognising that a pattern in front of it statistically resembles patterns it has seen
          before, at a scale that makes rare patterns easier to catch than they would be for any
          one person.
        </P>
        <P>
          That gap has a limit worth naming early, because it explains a failure mode the rest of
          this part of the track keeps returning to. A model recognises a case because it
          resembles cases in its training data — it has no mechanism for reasoning about a case
          that resembles nothing it has seen. Feed it patients who look, in the data sense, like
          the patients it trained on, and the pattern-matching holds. Feed it a patient the
          training data barely represented, and the same model that looked brilliant on paper
          gets quietly worse, without ever announcing that it has.
        </P>
      </LessonSection>

      <LessonSection id="the-three-places-its-already-in-use" title="The three places it's already in use">
        <P>
          <Strong>Medical imaging</Strong> is the clearest success story. Several imaging-assist
          tools already hold regulatory clearance for narrow, specific jobs — flagging a suspected
          stroke on a CT scan fast enough to change how quickly a patient reaches a specialist, or
          measuring the exact volume of a lesion on a follow-up scan so a radiologist is checking
          a number instead of redrawing an outline by hand. They run in real hospitals, a
          radiologist reviews every result before it reaches a chart, and they catch patterns a
          tired reviewer on their fortieth scan of the day might genuinely miss.
        </P>
        <P>
          <Strong>Triage and worklist prioritisation</Strong> use a patient&apos;s existing record
          to flag who is likely to deteriorate soon. A well-known example reorders a hospital
          ward&apos;s sepsis watch list hours before a nurse working strictly in order of who was
          admitted first would otherwise have noticed. The nursing staff does not get bigger. The
          list they work from gets ranked instead of arbitrary.
        </P>
        <P>
          <Strong>Drug discovery</Strong> uses models to narrow an impossibly large space of
          candidate molecules down to a shortlist worth testing in a lab — the subject of the next
          chapter.
        </P>
        <LabelRows
          rows={[
            {
              label: "Imaging",
              text: "Flags and measures; a radiologist confirms every read before it reaches a chart.",
            },
            {
              label: "Triage",
              text: "Reorders a worklist by risk; a clinician still decides what actually happens next.",
            },
            {
              label: "Drug discovery",
              text: "Narrows candidate molecules; every shortlisted one still goes through a lab.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="the-unglamorous-work-doing-most-of-the-actual-volume"
        title="The unglamorous work doing most of the actual volume"
      >
        <P>
          None of the above is where most of medical AI&apos;s actual deployed hours go. The
          highest-volume use, by a wide margin, is duller than any of it: turning a conversation
          into a chart, a chart into a bill, and a full clinic schedule into one with fewer empty
          slots.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "The visit is recorded",
              detail: "An ambient listening tool picks up the conversation in the room, with the patient's consent.",
            },
            {
              label: "A draft note is generated",
              detail: "The model turns the conversation into a structured clinical note in the format the electronic record expects.",
            },
            {
              label: "A clinician edits and signs it",
              detail: "Nothing reaches the permanent record without a clinician reading it first and making it theirs.",
            },
            {
              label: "Codes are suggested",
              detail: "A separate model maps the finished note to the billing codes it implies, for a human coder to check rather than submit blind.",
            },
          ]}
        />
        <P>
          A quieter, separate category does the same kind of pattern-matching on a hospital&apos;s
          calendar rather than a patient&apos;s chart — predicting which appointments are likely
          to go unfilled, or which slot actually fits a given procedure&apos;s typical length
          rather than the generic thirty minutes the booking system defaults to. Adopted faster
          than anything diagnostic, for an unglamorous reason: getting a documentation draft or a
          schedule slightly wrong costs an edit, not a delayed diagnosis, so hospitals took the
          risk sooner.
        </P>
      </LessonSection>

      <LessonSection id="the-two-places-its-still-mostly-hype" title="The two places it's still mostly hype">
        <P>
          <Strong>Fully autonomous diagnosis</Strong> — a model that receives your symptoms and
          returns a confident, unsupervised verdict with no clinician in the loop — is essentially
          not deployed anywhere serious today, for reasons the next chapter covers directly.
        </P>
        <P>
          <Strong>Predicting rare, highly individual outcomes</Strong> from limited data, the kind
          of headline that promises a model can tell you your exact personal risk of a
          one-in-a-million condition, usually overstates what a model trained on population-level
          patterns can actually say about one specific person.
        </P>
        <Callout tone="note" title="The pattern behind both categories">
          The places medical AI works share one trait: a human reviews the output before anything
          happens to a patient. The places it is mostly hype are exactly the ones proposing to
          remove that review.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Medical AI's real advantage is exposure at scale — millions of training examples against one career's worth of cases — not a deeper kind of reasoning.",
          "Imaging review, triage worklists, and narrowing drug candidates are three places it is deployed today, always with a clinician reviewing the output.",
          "The highest-volume use isn't diagnostic at all — it's turning conversations into notes, notes into billing codes, and calendars into fuller schedules.",
          "Fully autonomous diagnosis with no clinician in the loop is essentially not deployed anywhere serious, despite the headlines it generates.",
          "A model that looks brilliant on data resembling its training set can quietly get worse on data that doesn't — the subject the next few chapters take on directly.",
        ]}
      />
    </div>
  );
}
