import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
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
        <P>
          It is tempting to treat remote monitoring as a device problem — pick a good cuff,
          pick a good scale, ship it. The device is the easy 10%. Everything that actually
          determines whether a patient benefits from it is a staffing and process question, and
          that is what the rest of this chapter is actually about.
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
          alert a little less seriously. Getting that threshold right is a design
          problem, not a settings toggle to leave on the default.
        </Callout>
      </LessonSection>

      <LessonSection id="who-is-actually-watching-at-3am" title="Who is actually watching at 3am">
        <P>
          &ldquo;Someone gets paged&rdquo; hides a real staffing decision that has to hold at
          three in the morning, not just during business hours. A patient&apos;s heart failure
          does not decompensate on a schedule, so the alert queue has to be watched around the
          clock — by an actual person with the authority to act, not a queue that quietly waits
          for the morning shift.
        </P>
        <CompareGrid
          items={[
            {
              title: "In-house monitoring team",
              tone: "positive",
              children: (
                <>
                  <P>
                    The hospital&apos;s own nurses staff the queue, already familiar with the
                    patient and able to escalate directly into that hospital&apos;s own systems.
                  </P>
                  <P>Costs full 24/7 staffing directly, which most single clinics cannot absorb.</P>
                </>
              ),
            },
            {
              title: "Third-party monitoring service",
              tone: "neutral",
              children: (
                <>
                  <P>
                    A contracted service watches the queue overnight across many client
                    practices at once, escalating to an on-call clinician only when a threshold
                    is crossed.
                  </P>
                  <P>Cheaper per patient, at the cost of a handoff between two organisations.</P>
                </>
              ),
            },
          ]}
        />
        <P>
          Either way, the alert has to travel through an actual escalation path before it turns
          into anything:
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "A reading crosses the threshold set for that patient",
              detail: "The device or platform flags it automatically — no human involved yet.",
            },
            {
              label: "It lands in a monitoring tech's queue, ranked by severity",
              detail: "A first-line reviewer checks it against the patient's recent trend, not just the single number.",
            },
            {
              label: "A concerning reading is escalated to the on-call clinician",
              detail: "This is the step that requires a real person to be reachable at 3am, not just a dashboard that is technically live.",
            },
            {
              label: "The clinician decides: adjust medication, schedule an urgent visit, or send the patient to the ER",
              detail: "The device never makes this call. It only ever gets a human to the decision faster.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="getting-paid-for-a-service-that-happens-between-visits"
        title="Getting paid for a service that happens between visits"
      >
        <P>
          None of the staffing above happens for free, and remote monitoring only exists at
          scale because it can actually be billed. In the U.S., Medicare pays for it through a
          specific set of CPT codes, and the requirements attached to those codes shape the
          whole programme, not just the invoice.
        </P>
        <LabelRows
          rows={[
            { label: "99453", text: "One-time setup and patient education on the device, billed once per episode of care." },
            { label: "99454", text: "Covers the device and data transmission itself — but only pays if the patient actually transmits readings on at least 16 of the 30 days in that billing period." },
            { label: "99457", text: "The first 20 minutes of a clinician's monitoring and interactive communication with the patient in a month." },
            { label: "99458", text: "Each additional 20-minute block of that same clinical time, billed separately." },
          ]}
        />
        <P>
          That 16-day threshold on <Strong>99454</Strong> is the number that quietly runs the
          whole programme. A patient who wears the device for nine days out of thirty generates
          real data and real staff attention, and the practice still cannot bill for that
          patient&apos;s monitoring that month at all. Reimbursement is not a footnote here — it
          is the reason a monitoring programme that cannot keep patients transmitting reliably
          eventually gets shut down regardless of how well the alerts themselves work.
        </P>
      </LessonSection>

      <LessonSection id="when-the-patient-stops-wearing-it" title="When the patient stops wearing it">
        <P>
          Every design above assumes the patient keeps the cuff on, the scale plugged in, the
          ring charged. In practice a meaningful share of patients drift off within the first
          few weeks — the device is uncomfortable, the routine is easy to forget, or they simply
          feel fine and stop seeing the point. The stream does not fail loudly when this
          happens. It just goes quiet.
        </P>
        <Callout tone="danger" title="Silence is not the same as stable">
          A dashboard that has stopped receiving readings looks identical whether the patient is
          doing perfectly well and took the device off, or the patient is in real trouble and
          nobody is checking in. Treating silence as &ldquo;no news is good news&rdquo; is the
          single most dangerous assumption a remote-monitoring workflow can make, and a
          well-designed programme flags a missing patient the same way it flags an abnormal
          reading.
        </Callout>
        <P>
          That is also exactly where the reimbursement threshold and the clinical risk point
          in the same direction for once: a patient who falls quiet is both a billing problem
          and a safety problem, which is the rare case where the financial incentive and the
          right thing to do line up cleanly.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Remote patient monitoring turns one data point per scheduled visit into a continuous stream generated during an ordinary day at home.",
          "A warning sign that appears between visits is invisible to a system that only checks in on a schedule, which is the entire case for monitoring continuously.",
          "The device is the easy part — the harder problem is staffing an alert queue that someone is actually watching at 3am, not just during business hours.",
          "Reimbursement isn't a footnote: Medicare's own billing code only pays for a month where the patient transmitted readings on at least 16 of 30 days.",
          "A device that goes silent is not the same as a stable patient, and a workflow that treats silence as good news has built the wrong assumption into its core.",
        ]}
      />
    </div>
  );
}
