import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function HealthAppsAndPatientEngagementLesson() {
  return (
    <div>
      <Lead>
        A diabetes-management app built on sound medicine is worthless to a patient
        who deletes it after day three. An app nobody opens twice doesn&apos;t help the person
        it was built for, no matter how good the medicine underneath it is — and what actually
        keeps someone coming back sits right next to a line that is easy to cross into
        manipulation.
      </Lead>

      <LessonSection
        id="an-app-that-nobody-opens-twice-doesnt-help-anyone"
        title="An app that nobody opens twice doesn't help anyone"
      >
        <P>
          Most health apps are downloaded once, opened a handful of times, and abandoned within
          a few weeks — a pattern true of consumer apps generally, but far more costly here.
          The whole clinical value of a medication reminder or a symptom tracker depends on
          someone actually using it consistently, for months, not on the app existing in an app
          store with good reviews.
        </P>
        <P>
          The numbers are blunt. Something close to a quarter of people who download a health
          app never open it a second time at all, and by the two-week mark most of the people
          who did have already stopped. By three months, ongoing daily use is the exception
          rather than the rule for anything that stands alone — a wellness app someone
          downloaded on their own after a symptom worried them at 2 a.m., say, with nobody and
          nothing else pulling them back to it.
        </P>
        <P>
          What survives that drop-off is not the apps with the best medicine underneath. It is
          usually the ones tied to something outside the app itself — a clinician who prescribed
          it and will ask about it at the next visit, an insurer&apos;s programme watching for
          gaps, or discharge instructions that made using it feel less optional. Take that
          external anchor away and even a clinically excellent app behaves like every other one
          nobody opens twice.
        </P>
      </LessonSection>

      <LessonSection
        id="what-actually-keeps-a-patient-coming-back"
        title="What actually keeps a patient coming back"
      >
        <P>
          <Strong>Friction, not features, is usually the deciding factor.</Strong> A patient
          managing a chronic condition already has a full life to run around their treatment —
          an app that takes ten seconds to log a symptom gets used; one that requires five taps
          through three screens does not, regardless of how much more thorough that longer flow
          would be.
        </P>
        <ChecklistCard
          title="What consistently drives real engagement"
          items={[
            "Logging something takes seconds, not a multi-step form.",
            "The app reflects something back — a trend, a streak, a doctor's note — rather than only ever collecting input.",
            "Reminders are timed around the patient's actual routine, not a fixed clock time nobody chose.",
            "A real person, not just an algorithm, is visibly on the other end when something looks concerning.",
          ]}
        />
        <P>
          Put next to each other, the difference between an app that holds on to patients and
          one that doesn&apos;t is rarely a difference in medical sophistication.
        </P>
        <CompareGrid
          items={[
            {
              title: "Apps that hold on to patients",
              tone: "positive",
              children: (
                <>
                  <P>Tied to a clinician, an insurer&apos;s programme, or discharge instructions.</P>
                  <P>Logging takes seconds. Someone real is watching what comes in.</P>
                </>
              ),
            },
            {
              title: "Apps that don't",
              tone: "caution",
              children: (
                <>
                  <P>Downloaded alone, with nothing outside the app pulling a patient back.</P>
                  <P>Every entry costs several taps. Nobody visible is on the other end.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="engagement-is-not-the-same-as-outcome"
        title="Engagement is not the same as outcome"
      >
        <P>
          A product team watching a dashboard sees daily opens, streak length, and session time.
          None of those measure the thing the app is actually supposed to be doing, which is
          usually something closer to blood sugar in range, blood pressure trending down, or
          medication actually taken on schedule. Those two sets of numbers can move in
          completely different directions.
        </P>
        <P>
          A medication app can post rising daily opens for months, driven by a well-tuned streak
          mechanic, while the thing it exists to improve — whether the medication actually gets
          taken — barely changes, because opening the app and taking the pill turned out to be
          two different habits the design never actually connected. Engagement is a proxy. It is
          a reasonable one to watch, but it is not the outcome, and treating a rising open rate
          as proof the app is working skips the only measurement that was ever the point.
        </P>
      </LessonSection>

      <LessonSection
        id="why-a-popular-app-can-still-be-useless"
        title="Why a popular app can still be useless"
      >
        <P>
          App stores carry mental-health and wellness apps with five-star ratings and millions
          of downloads that have never been tested in anything resembling a clinical trial.
          Unlike a drug, or the regulated diagnostic tools this track covers later, most
          consumer wellness apps face no requirement to show they actually work before they can
          be sold — the review that decides whether an app is popular and the review that would
          decide whether it is effective are two completely different processes, and most apps
          only ever go through the first one.
        </P>
        <P>
          That gap is not a minor footnote. A popular app and an effective one can be the same
          product, or they can share nothing but a name in the same category — and from the
          outside, a five-star rating and a real clinical result look identical on a phone
          screen.
        </P>
      </LessonSection>

      <LessonSection
        id="the-line-between-engagement-and-manipulation"
        title="The line between engagement and manipulation"
      >
        <P>
          Streaks, badges, and daily-open reminders are borrowed directly from social media and
          mobile games, and they work here too — which is exactly why they need a different
          ethical bar. A game wants your attention for its own sake. A health app is supposed to
          want your attention only in service of an actual health outcome, and it is easy to
          drift from &ldquo;design that helps a patient stay consistent&rdquo; into
          &ldquo;design that exploits the same psychology a slot machine uses,&rdquo; without
          the team building it necessarily noticing the shift.
        </P>
        <P>
          The drift is easiest to miss because both versions look identical on a product roadmap
          — &ldquo;increase daily active use&rdquo; reads the same whether the underlying goal
          is a patient&apos;s health or a growth metric on a slide. The only real difference is
          what the team is actually optimising for once the two start to pull apart, which they
          eventually do.
        </P>
        <Callout tone="warning" title="A rough test worth applying honestly">
          Ask whether a feature would still make sense to keep if it stopped increasing app
          opens tomorrow. A reminder timed to when a patient actually needs their medication
          passes that test. A streak that guilts someone into opening the app on a day they
          didn&apos;t need to does not.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Most people who download a health app stop using it within weeks — something close to a quarter never open it a second time at all, and sustained daily use is the exception without a clinical relationship behind it.",
          "Reducing friction — seconds to log something, not a multi-step form — drives more real engagement than adding features usually does, and apps tied to a clinician or insurer hold on to patients far longer than ones downloaded alone.",
          "Engagement and outcome are different questions with different dashboards. A rising open rate proves people are using the app, not that the condition it claims to manage is any better controlled.",
          "Most consumer wellness apps face no requirement to prove they work before reaching an app store, which is exactly how a five-star, million-download app and a useless one can look identical from the outside.",
          "A useful test for any engagement feature: would it still make sense to keep if it stopped increasing app opens tomorrow? A well-timed reminder passes; a guilt-driven streak usually does not.",
        ]}
      />
    </div>
  );
}
