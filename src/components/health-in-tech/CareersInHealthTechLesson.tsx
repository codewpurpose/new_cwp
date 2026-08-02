import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
          misread at 2 a.m. by someone on their fourteenth patient of the shift. On a Tuesday,
          that might mean sitting in on a nurses&apos; shift-change meeting to hear which alert
          everyone has quietly learned to click through unread, then filing a change request
          against the exact screen that produces it.
        </P>
        <P>
          <Strong>Health data analysts</Strong> turn years of visit records into an answer to a
          specific question — which patients are likely to miss a follow-up, which unit is
          running over budget — without needing to touch the underlying software at all. A
          Tuesday for one of them looks like a SQL query against last quarter&apos;s
          appointment data, followed by a fifteen-minute meeting explaining what the number
          actually means to someone who does not read query results for a living.
        </P>
        <P>
          <Strong>Product managers on clinical software</Strong> write the requirements an
          engineering team builds against, and the job is mostly translation: turning
          &ldquo;nurses keep missing this allergy alert&rdquo; into a specific, buildable change
          to a specific screen, then sitting through the engineering standup to defend why that
          change is the one worth doing this sprint.
        </P>
        <P>
          <Strong>Regulatory and compliance specialists</Strong> decide whether a feature can
          ship at all under HIPAA or FDA rules covered later in this track — a role that barely
          exists outside regulated industries, and exists constantly here. Their Tuesday can be
          a single paragraph of a submission document, re-drafted for the fourth time, because
          one imprecise word changes what the software is legally allowed to claim it does.
        </P>
        <P>
          <Strong>Implementation and training specialists</Strong> are the ones who actually
          go on-site when a hospital switches record systems, running a week of hands-on
          sessions for nurses who have used the old system for a decade and have exactly one
          shift to learn the new one. It is one of the few roles here that spends more time in a
          hospital hallway than at a desk.
        </P>
      </LessonSection>

      <LessonSection
        id="what-you-would-actually-study"
        title="What you would actually study"
      >
        <P>
          None of the five roles above require the same degree, and most people who end up in
          one did not study &ldquo;health tech&rdquo; directly — there is rarely a major with
          that exact name. What actually prepares you is closer to a mix: a technical track
          plus deliberate exposure to how care happens.
        </P>
        <LabelRows
          rows={[
            {
              label: "Informaticist",
              text: "A nursing or medical degree, plus a health informatics graduate certificate or master's layered on top later.",
            },
            {
              label: "Data analyst",
              text: "A statistics, data science, or computer science degree; SQL and Python are what actually get used day to day.",
            },
            {
              label: "Product manager",
              text: "No fixed degree — often computer science or business, built up through a first job in general software before moving into clinical products.",
            },
            {
              label: "Regulatory specialist",
              text: "Public health, health policy, or a science degree, plus a willingness to read federal regulation for a living.",
            },
            {
              label: "Implementation specialist",
              text: "Often a clinical background (nursing especially) rather than a technical degree at all — the job is teaching, not building.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="which-paths-need-a-clinical-licence-and-which-dont"
        title="Which paths need a clinical licence, and which don't"
      >
        <P>
          This is the part career advice usually skips, and it changes how long a path takes.
          Data analysis, product management, and regulatory work do not require a clinical
          licence at any point — you can walk in with a technical or policy degree and never sit
          a nursing or medical board exam.
        </P>
        <P>
          Clinical informatics is the genuinely mixed case. Plenty of working informaticists
          hold an active RN or MD and treat the role as a second career built on top of clinical
          practice — that pathway usually leads to the most senior positions, up to Chief
          Medical Information Officer, which in most hospitals is an MD role by expectation, not
          just tradition. But a growing share of entry-level informatics and implementation jobs
          hire straight out of a health informatics master&apos;s programme, no licence required,
          especially at software vendors rather than hospitals themselves.
        </P>
        <CompareGrid
          items={[
            {
              title: "No clinical licence needed",
              tone: "positive",
              children: (
                <>
                  <P>Health data analyst.</P>
                  <P>Product manager on clinical software.</P>
                  <P>Regulatory and compliance specialist.</P>
                </>
              ),
            },
            {
              title: "Depends on the seniority and employer",
              tone: "caution",
              children: (
                <>
                  <P>
                    Clinical informaticist — entry-level and vendor-side roles often don&apos;t
                    require one; hospital leadership roles almost always do.
                  </P>
                  <P>Implementation specialist — a clinical background helps but is not universal.</P>
                </>
              ),
            },
          ]}
        />
        <Callout tone="note" title="This varies by employer, not just by role">
          A hospital hiring for its own informatics team will lean harder on a clinical licence
          than an EHR vendor hiring for the same job title. Read the actual posting rather than
          the job title — &ldquo;clinical informaticist&rdquo; means something slightly
          different depending on who is doing the hiring.
        </Callout>
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
          "Health tech runs on more than doctors and engineers — clinical informaticists, data analysts, product managers, regulatory specialists, and implementation specialists sit specifically between the two.",
          "An engineer who has never sat through a real visit and a clinician who has never seen a schema make opposite mistakes, and the roles between them exist to catch both.",
          "Most of these roles require no clinical licence at all — data analysis, product, and regulatory paths are open to a purely technical or policy background.",
          "Clinical informatics is the genuine exception: entry-level and vendor-side jobs often skip the licence requirement, but hospital leadership roles almost always expect one.",
          "Getting hired rarely requires two full degrees — it requires one real technical skill plus direct exposure to how care actually happens.",
        ]}
      />
    </div>
  );
}
