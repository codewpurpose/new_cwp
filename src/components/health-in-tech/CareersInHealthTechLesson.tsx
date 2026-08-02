import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function CareersInHealthTechLesson() {
  return (
    <div>
      <Lead>
        Picture a career in health tech and you probably picture a doctor who learned to code,
        or an engineer who happens to work at a hospital. Some of the most valuable people in
        this field are neither — they are the ones who sit specifically between the two,
        translating what a clinic actually needs into something engineers can build, and back
        again.
      </Lead>

      <LessonSection
        id="its-not-just-doctors-and-its-not-just-engineers"
        title="It's not just doctors, and it's not just engineers"
      >
        <P>
          A hospital&apos;s software team includes plenty of engineers who have never treated a
          patient, and its clinical staff includes plenty of doctors and nurses who have never
          written a line of code. Both groups build health tech every day, just from different
          ends: engineers ship the record system, clinicians decide what has to appear on the
          screen during a three-minute visit before the next patient is waiting.
        </P>
        <P>
          Neither group alone gets it right. An engineer who has never sat through a real
          appointment will build a form with fields nobody fills in correctly. A clinician who
          has never seen a database schema will ask for something that takes six months instead
          of six days. The gap between those two mistakes is where an entire category of job
          exists.
        </P>
      </LessonSection>

      <LessonSection
        id="the-roles-that-sit-between-the-two"
        title="The roles that sit between the two"
      >
        <P>
          <Strong>Clinical informaticists</Strong> are usually nurses or doctors who moved into
          software, and they are the ones who catch that a dropdown menu is going to get
          misread at 2 a.m. by someone on their fourteenth patient of the shift.
        </P>
        <P>
          <Strong>Health data analysts</Strong> turn years of visit records into an answer to a
          specific question — which patients are likely to miss a follow-up, which unit is
          running over budget — without needing to touch the underlying software at all.
        </P>
        <P>
          <Strong>Product managers on clinical software</Strong> write the requirements an
          engineering team builds against, and the job is mostly translation: turning
          &ldquo;nurses keep missing this allergy alert&rdquo; into a specific, buildable change
          to a specific screen.
        </P>
        <P>
          <Strong>Regulatory and compliance specialists</Strong> decide whether a feature can
          ship at all under HIPAA or FDA rules covered later in this track — a role that barely
          exists outside regulated industries, and exists constantly here.
        </P>
      </LessonSection>

      <LessonSection
        id="what-actually-gets-you-hired-into-one"
        title="What actually gets you hired into one"
      >
        <P>
          Nobody expects a nursing degree and a computer science degree from the same person.
          What actually gets you hired is being able to hold a conversation with both sides
          without an interpreter — reading a data schema well enough to ask an engineer a
          precise question, and sitting through a clinical workflow well enough to know which
          step is about to break under a new feature.
        </P>
        <ChecklistCard
          title="A realistic starting checklist"
          items={[
            "One real technical skill — SQL, Python, or basic data analysis is enough to start.",
            "Direct exposure to how care actually happens, even a volunteering shift, not just reading about it.",
            "Practice explaining a technical constraint to someone with zero technical background, and the reverse.",
            "Familiarity with one real standard covered later in this track — FHIR or HIPAA are the two that come up in almost every interview.",
          ]}
        />
        <Callout tone="tip" title="You don't have to pick a side first">
          Most people in this field started firmly on one side — clinical or technical — and
          picked up the other over a few years on the job. The translating skill is learnable
          later; showing curiosity about the side you don&apos;t already know is what
          gets you the interview.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Health tech runs on more than doctors and engineers — clinical informaticists, data analysts, and regulatory specialists sit specifically between the two.",
          "An engineer who has never sat through a real visit and a clinician who has never seen a schema make opposite mistakes, and the roles between them exist to catch both.",
          "Getting hired rarely requires two full degrees — it requires one real technical skill plus direct exposure to how care actually happens.",
          "Most people in the field started on one side and picked up the other over time; showing curiosity about the unfamiliar side matters more than already having it.",
        ]}
      />
    </div>
  );
}
