import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { VitalSignStream } from "@/components/health-in-tech/VitalSignStream";

export function RemotePatientMonitoringLesson() {
  return (
    <div>
      <Lead>
        Checking whether a heart-failure patient is stable used to mean bringing them back into
        a clinic every few weeks, whether or not anything had actually changed. Remote patient
        monitoring moves that check into an ordinary day at home, streaming a real measurement
        to a real clinician without the patient doing anything differently at all.
      </Lead>

      <LessonSection
        id="moving-monitoring-out-of-the-clinic-and-into-the-home"
        title="Moving monitoring out of the clinic and into the home"
      >
        <P>
          A patient recovering from heart surgery, managing diabetes, or living with a chronic
          condition used to generate one data point per visit — whatever their vitals happened
          to be during that specific fifteen-minute appointment. A connected scale, blood
          pressure cuff, or glucose monitor at home now generates that same data point every
          day, or every hour, without the patient scheduling anything.
        </P>
        <P>
          That shift matters because a condition rarely declares itself neatly during a
          scheduled visit — a warning sign that shows up on a Tuesday afternoon at home is
          invisible to a system that only checks in once a month.
        </P>
      </LessonSection>

      <LessonSection
        id="watching-a-vital-sign-update-in-real-time"
        title="Watching a vital sign update in real time"
      >
        <P>
          Below is a simplified version of what a remote-monitoring dashboard shows: one
          patient&apos;s heart rate, updating hour by hour over a single day. Click through the
          readings and watch what happens when one crosses the threshold a care team set in
          advance.
        </P>
      </LessonSection>

      <VitalSignStream />

      <LessonSection id="who-actually-looks-at-the-stream" title="Who actually looks at the stream">
        <P>
          Nobody is watching a single patient&apos;s line chart update live all day — that does
          not scale past a handful of patients. In practice, a nurse or a monitoring service
          watches a queue of alerts across dozens or hundreds of patients at once, and only
          looks closely at a specific patient&apos;s stream once a reading crosses a threshold
          like the one in the chart above.
        </P>
        <P>
          <Strong>The stream itself is not the intervention</Strong> — the threshold and the
          person who gets paged when it is crossed are. A remote-monitoring product that
          collects data beautifully but routes alerts to nobody, or to someone with no time to
          act on them, has built the easy half of the problem.
        </P>
        <Callout tone="warning" title="Alert fatigue is the real failure mode here">
          Set the threshold too sensitively and the nurse on the other end starts getting paged
          constantly for readings that turn out fine — and starts, understandably, taking every
          alert a little less seriously. Getting that threshold right is a genuine design
          problem, not a settings toggle to leave on the default.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Remote patient monitoring turns one data point per scheduled visit into a continuous stream generated during an ordinary day at home.",
          "A warning sign that appears between visits is invisible to a system that only checks in on a schedule, which is the entire case for monitoring continuously.",
          "Nobody watches a single patient's chart live — a care team watches a queue of alerts across many patients and reacts when a threshold is crossed.",
          "Setting that threshold too sensitively causes alert fatigue, where a nurse paged constantly for readings that turn out fine starts taking every alert less seriously.",
        ]}
      />
    </div>
  );
}
