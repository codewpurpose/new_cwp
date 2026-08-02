import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";

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

      <LessonSection id="the-checklist-any-idea-here-should-survive" title="The checklist any idea here should survive">
        <P>
          Run your sketch against the same questions this entire track has been asking of real
          systems, one part at a time.
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

      <TakeawayCard
        items={[
          "A real health tech idea names a specific person and a specific moment — not a general mood about improving health.",
          "Sketching the data pipeline — what's collected, where it lives, who can see it — surfaces problems no amount of enthusiasm for the idea would.",
          "Every AI component in a serious idea needs a named human reviewer, the same pattern held across every part of this track.",
          "An idea that only works with a smartphone and broadband has already excluded someone — naming who, and their fallback, is part of finishing the idea, not a later add-on.",
        ]}
      />
    </div>
  );
}
