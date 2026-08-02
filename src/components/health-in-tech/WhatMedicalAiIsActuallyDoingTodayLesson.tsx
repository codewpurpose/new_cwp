import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function WhatMedicalAiIsActuallyDoingTodayLesson() {
  return (
    <div>
      <Lead>
        Headlines about medical AI tend to land on one of two extremes: it is either about to
        replace your doctor, or it is barely more than a gimmick. Neither is what is actually
        happening. Medical AI today is pattern-matching at a scale no single radiologist or
        researcher can hold in their head — genuinely useful in a few specific places, and
        mostly hype in a couple of others that happen to make better headlines.
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
          understanding, is where most of medical AI&apos;s genuine advantage actually comes
          from.
        </P>
        <P>
          <Strong>It is not reasoning about your case the way a doctor does.</Strong> It is
          recognising that a pattern in front of it statistically resembles patterns it has seen
          before, at a scale that makes rare patterns easier to catch than they would be for any
          one person.
        </P>
      </LessonSection>

      <LessonSection id="the-three-places-its-already-in-use" title="The three places it's already in use">
        <P>
          <Strong>Medical imaging</Strong> is the clearest success story — models that flag
          likely tumours on a scan for a radiologist to review are already deployed in real
          hospitals, catching patterns a tired reviewer on their fortieth scan of the day might
          miss.
        </P>
        <P>
          <Strong>Triage and risk scoring</Strong> uses a patient&apos;s existing record to flag
          who is likely to deteriorate soon, giving a nursing staff of a fixed size a ranked list
          instead of an unranked one.
        </P>
        <P>
          <Strong>Drug discovery</Strong> uses models to narrow an impossibly large space of
          candidate molecules down to a shortlist worth testing in a lab — the subject of the
          next chapter.
        </P>
      </LessonSection>

      <LessonSection id="the-two-places-its-still-mostly-hype" title="The two places it's still mostly hype">
        <P>
          <Strong>Fully autonomous diagnosis</Strong> — a model that receives your symptoms and
          returns a confident, unsupervised verdict with no clinician in the loop — is
          essentially not deployed anywhere serious today, for reasons the next chapter covers
          directly.
        </P>
        <P>
          <Strong>Predicting rare, highly individual outcomes</Strong> from limited data, the
          kind of headline that promises a model can tell you your exact personal risk of a
          one-in-a-million condition, usually overstates what a model trained on population-level
          patterns can actually say about one specific person.
        </P>
        <Callout tone="note" title="The pattern behind both categories">
          The places medical AI genuinely works share one trait: a human reviews the output
          before anything happens to a patient. The places it is mostly hype are exactly the
          ones proposing to remove that review.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Medical AI's real advantage is exposure at scale — millions of training examples versus one career's worth of cases — not a deeper kind of reasoning.",
          "Imaging review, patient triage scoring, and narrowing drug candidates are three places it is genuinely deployed today.",
          "Fully autonomous diagnosis with no clinician in the loop is essentially not deployed anywhere serious, despite the headlines.",
          "Every place it genuinely works keeps a human reviewing the output before it reaches a patient — the places that skip that step are exactly the overhyped ones.",
        ]}
      />
    </div>
  );
}
