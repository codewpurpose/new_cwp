import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function CapstoneMappingAHealthTechIdeaLesson() {
  return (
    <div>
      <Lead>
        Every chapter until now has proven one idea in isolation — a record, a device, a
        model, a regulation. Pick one real problem, sketch the data it would actually need and
        who could see it, and check the result against everything this track has covered, not
        just the part that inspired it.
      </Lead>

      <LessonSection id="picking-a-real-problem-not-a-vague-one" title="Picking a real problem, not a vague one">
        <P>
          &ldquo;An app for better health&rdquo; is not a problem, it is a mood. A real one
          names a specific person, a specific moment, and a specific gap: a patient managing a
          chronic condition who cannot tell whether a symptom is worth an appointment, a rural
          clinic with no specialist for a specific condition, a patient discharged from hospital
          with no easy way to flag that something feels wrong before it becomes an emergency.
          Pick something that specific before moving to the next step — everything after this
          depends on the problem being real enough to actually break against.
        </P>
        <P>
          Run the same test on your own idea that the rest of this chapter runs on a worked
          example: a patient discharged after a cardiac event, sent home with a printed sheet of
          warning signs and no easy way to tell whether today&apos;s tiredness is normal
          recovery or something worth calling about. That is specific enough to have a real
          answer at every step below. &ldquo;Help heart patients recover better&rdquo; is not —
          it is the mood version of the same idea, and it could survive the checklist at the end
          of this chapter without ever being tested against anything.
        </P>
      </LessonSection>

      <LessonSection
        id="sketching-the-data-it-would-need-and-who-could-see-it"
        title="Sketching the data it would need, and who could see it"
      >
        <P>
          Walk your idea through the same stages a real patient&apos;s data passes through,
          from Part 1 onward.
        </P>
      </LessonSection>

      <StepList
        variant="timeline"
        steps={[
          {
            label: "What data does it need to collect?",
            detail: "Name the specific fields — a symptom, a vital sign, a medication list — not just \"health data\" in general.",
          },
          {
            label: "Where does that data already live, and in what format?",
            detail: "Does it already sit in an EHR? A wearable? Does it need to be entered by hand, and does that even matter for your idea?",
          },
          {
            label: "Who is allowed to see each piece of it?",
            detail: "A patient, a specific clinician, a caregiver — name the roles the way Part 2's record viewer separated sections by role.",
          },
          {
            label: "Where could an AI model help, and where should a human stay in charge?",
            detail: "Be specific about which decision, if any, gets assisted rather than automated.",
          },
          {
            label: "Who gets left out if this only works with a smartphone and broadband?",
            detail: "Name the group Part 5's digital-divide chapter would flag, and what the fallback for them would be.",
          },
        ]}
      />

      <LessonSection
        id="seeing-one-idea-answer-all-five-questions"
        title="Seeing one idea answer all five questions"
      >
        <P>
          Before you answer those five questions for your own idea, see what a real answer
          actually looks like, worked through end to end for the discharged cardiac patient
          above.
        </P>
      </LessonSection>

      <RevealCard
        summaryTag="The idea"
        summary="A check-in app for patients discharged after a cardiac event, built to catch a worsening symptom before it becomes an emergency room visit."
        detailTag="Worked through the five questions"
        detail={
          <>
            <Strong>Data:</Strong> a short daily symptom check — breathlessness, swelling,
            weight — plus whatever vitals a home blood-pressure cuff already reports.{" "}
            <Strong>Where it lives:</Strong> the vitals come from a consumer wearable,
            wellness-grade under Part 3&apos;s distinction, not medical-grade; the symptom
            answers are typed in by hand. <Strong>Who sees it:</Strong> the patient sees their
            own trend; a nurse on the discharging team sees flagged entries only, not the full
            daily log; nobody else does without the patient&apos;s consent.{" "}
            <Strong>AI and the human:</Strong> a model flags an entry as worth a nurse&apos;s
            attention; it never contacts emergency services or changes medication on its own — a
            nurse decides what happens next, every time.{" "}
            <Strong>Who gets left out:</Strong> a patient without a smartphone or reliable data
            plan, handled here with a weekly automated phone call covering the same three
            questions, read out loud instead of tapped in.
          </>
        }
        footnote="Notice that every answer above is a specific fact, not a description of how good the idea sounds. That's what makes it checkable against the list below."
      />

      <LessonSection id="the-checklist-any-idea-here-should-survive" title="The checklist any idea here should survive">
        <P>
          Run your sketch against the same questions this entire track has been asking of real
          systems, one part at a time.
        </P>
        <P>
          Most ideas fail this checklist quietly, not with an obvious dealbreaker. The most
          common failure isn&apos;t a legal one — it&apos;s the last item: an idea that sounds
          low-risk right up until someone asks what happens the one time the model is wrong, and
          nobody in the room has an actual answer.
        </P>
      </LessonSection>

      <ChecklistCard
        title="Before calling this idea finished"
        items={[
          "The problem names a specific person and a specific moment, not a general mood about health.",
          "You can say which fields count as Protected Health Information, and which don't, under Part 2's HIPAA boundary.",
          "You've named who sees which section of the data, not just that \"the data is secure.\"",
          "Any AI component has a named human reviewer in the loop, not an unsupervised verdict.",
          "You've named a real fallback for someone without a smartphone or reliable broadband.",
          "A bug in this specific idea would cost an inconvenience, not something unrecoverable — and if it's the latter, you've named what would actually have to be validated first.",
        ]}
      />

      <LessonSection
        id="what-this-track-was-actually-teaching-you-to-notice"
        title="What this track was actually teaching you to notice"
      >
        <P>
          Twenty-four chapters ago, this track opened with a claim: health tech is not four
          separate topics, it is one connected system, and every part of it changes shape the
          moment it touches an actual patient. The exercise you just ran is the proof of that
          claim, not a summary of it. You didn&apos;t just sketch an app — you touched every
          part this track walked through, in order, on one idea.
        </P>
        <P>
          Part 1 gave you the reason the stakes are different here at all. Part 2 gave you the
          record, and the boundary around what has to stay private inside it. Part 3 gave you
          the gap between a wearable&apos;s estimate and a medical-grade measurement, which is
          exactly what decided whether your idea&apos;s data needed a nurse in the loop at all.
          Part 4 gave you the reason an AI component in your sketch needs a named human
          reviewer, not an unsupervised verdict. Part 5 gave you the patient who gets left out
          if an idea assumes a smartphone and a broadband connection everyone doesn&apos;t
          actually have. This part gave you the ransomware target your idea would become the
          moment it holds real patient data, and the regulator who decides whether it is even
          allowed to launch.
        </P>
        <Callout tone="success" title="The actual takeaway of this entire track">
          None of those six parts was ever a separate subject. They were six ways of asking the
          same question a real patient is entitled to ask about anything built for them: does
          this actually help me, who can see it while it does, and who is responsible if it gets
          it wrong. Carry that question into whatever you build next — inside health tech or
          anywhere else software touches a person&apos;s life.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A real health tech idea names a specific person and a specific moment — not a general mood about improving health.",
          "Sketching the data pipeline — what's collected, where it lives, who can see it — surfaces problems no amount of enthusiasm for the idea would.",
          "Every AI component in a serious idea needs a named human reviewer, the same pattern held across every part of this track.",
          "An idea that only works with a smartphone and broadband has already excluded someone — naming who, and their fallback, is part of finishing the idea, not a later add-on.",
          "The question underneath all twenty-four chapters was never really six separate topics — it was always: does this help the patient, who can see it, and who answers for it when it's wrong.",
        ]}
      />
    </div>
  );
}
