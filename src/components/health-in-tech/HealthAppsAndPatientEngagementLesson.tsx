import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function HealthAppsAndPatientEngagementLesson() {
  return (
    <div>
      <Lead>
        A diabetes-management app built on genuinely sound medicine is worthless to a patient
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
        <Callout tone="warning" title="A rough test worth applying honestly">
          Ask whether a feature would still make sense to keep if it stopped increasing app
          opens tomorrow. A reminder timed to when a patient actually needs their medication
          passes that test. A streak that guilts someone into opening the app on a day they
          genuinely didn&apos;t need to does not.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A health app's clinical value depends entirely on sustained real-world use, not on the medicine behind it being sound.",
          "Reducing friction — seconds to log something, not a multi-step form — drives more real engagement than adding features usually does.",
          "Engagement tactics borrowed from social media and games work here too, which is exactly why they carry a stricter ethical bar in a health context.",
          "A useful test: would this feature still make sense if it stopped increasing app opens tomorrow? A well-timed reminder passes; a guilt-driven streak usually does not.",
        ]}
      />
    </div>
  );
}
