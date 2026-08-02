import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";

export function RegulationAndOversightLesson() {
  return (
    <div>
      <Lead>
        &ldquo;Software as a medical device&rdquo; sounds like a workaround someone invented to
        dodge oversight. It is the opposite — a real regulatory category built specifically
        because software started making the kind of decisions only hardware used to make, and
        it is exactly why approval takes so much longer than shipping a typical app.
      </Lead>

      <LessonSection
        id="who-actually-approves-a-new-piece-of-health-tech"
        title="Who actually approves a new piece of health tech"
      >
        <P>
          In the United States, the Food and Drug Administration reviews anything that meets
          the legal definition of a medical device before it can be marketed for a medical
          purpose — historically physical hardware like pacemakers and imaging machines, now
          extended to qualifying software as well. Most countries run an equivalent body; the
          specific name changes, the underlying idea does not.
        </P>
        <P>
          Not everything health-adjacent needs this review. A general wellness app that tracks
          steps and never claims to diagnose or treat anything typically falls outside it
          entirely — the trigger is a specific claim about diagnosing, treating, or preventing a
          disease, not just the general subject matter of health.
        </P>
        <P>
          Which review a given product actually gets, though, is not uniform even among the
          software that does qualify. Regulators sort medical devices, software included, into
          risk classes first, and the class is what actually decides how much evidence has to
          exist before anyone is allowed to use it.
        </P>
      </LessonSection>

      <LessonSection
        id="not-every-risk-class-gets-the-same-scrutiny"
        title="Not every risk class gets the same scrutiny"
      >
        <P>
          A device&apos;s risk class is set by how much harm a failure could cause, not by how
          sophisticated the technology inside it is — a simple piece of software making a
          high-stakes call can sit in a stricter class than a genuinely complex one making a
          low-stakes suggestion.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Class I — minimal risk",
              tone: "neutral",
              children: (
                <>
                  <P>Bandages, tongue depressors, most step-counting wellness trackers.</P>
                  <P>General controls only. No premarket review required at all.</P>
                </>
              ),
            },
            {
              title: "Class II — moderate risk",
              tone: "caution",
              children: (
                <>
                  <P>Infusion pumps, and most software as a medical device lands here.</P>
                  <P>
                    Has to show it is comparable to something already cleared, plus specific
                    controls — not usually a from-scratch clinical trial.
                  </P>
                </>
              ),
            },
            {
              title: "Class III — high risk",
              tone: "positive",
              children: (
                <>
                  <P>Pacemakers, and diagnostic algorithms making a high-stakes call alone.</P>
                  <P>Requires the most rigorous pathway, generally with original trial data.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="software-as-a-medical-device-is-a-real-category-now"
        title={'"Software as a medical device" is a real category now'}
      >
        <P>
          <Strong>SaMD</Strong> covers software that performs a medical function on its own,
          without needing to run on a piece of dedicated hardware — an app that analyses a scan
          and outputs a diagnosis-relevant result, for instance, without itself being a scanner.
          The category exists because that kind of software makes exactly the sort of decision
          that used to require a physical device a regulator had already been reviewing for
          decades, and pretending it was &ldquo;just an app&rdquo; because it ran on a phone
          would have left a real gap in oversight.
        </P>
        <P>
          Most SaMD lands in Class II, the moderate-risk tier — meaning most of it does not go
          through the full evidence-generation process Class III requires. That shortcut is
          common enough, and consequential enough, to be worth understanding on its own.
        </P>
      </LessonSection>

      <LessonSection
        id="the-shortcut-most-devices-actually-take"
        title="The shortcut most devices actually take"
      >
        <P>
          Most Class II devices, software included, clear a pathway that asks a narrower
          question than &ldquo;is this safe and effective&rdquo;: is it substantially
          equivalent to a device already on the market? Show that, and a company can clear a new
          product by comparing it to an existing <Strong>predicate</Strong>, rather than proving
          from first principles that it works.
        </P>
        <P>
          The weakness is what happens over years. A new device can cite a predicate cleared
          five years earlier, which itself cited a predicate from five years before that, and so
          on — a chain that in the most-criticised cases traces back decades, sometimes to a
          device that was never clinically tested at all because it reached the market before
          today&apos;s evidence standards existed. Being substantially equivalent to something
          that was itself never proven safe is not the same as being proven safe.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "A device is cleared as genuinely novel",
              detail: "It goes through full review because nothing like it exists on the market yet.",
            },
            {
              label: "A second device cites the first as its predicate",
              detail: "It only has to show substantial equivalence — not repeat the original evidence-gathering.",
            },
            {
              label: "A third device cites the second",
              detail: "The chain has now moved two steps away from any product actually tested from scratch.",
            },
            {
              label: "A later device in the chain reaches the market",
              detail: "On paper it is equivalent to a product from a different technological era — one that may never have faced a trial at all.",
            },
          ]}
        />
        <Callout tone="warning" title="What critics call predicate creep">
          This is the single most-repeated criticism of the pathway, including from government
          reviews of the process itself: substantial equivalence is a comparison, not a safety
          finding, and a long enough chain of comparisons can drift a long way from the last
          time anyone actually tested whether the underlying idea works.
        </Callout>
      </LessonSection>

      <LessonSection
        id="a-model-that-keeps-learning-is-a-problem-nobody-has-solved"
        title="A model that keeps learning is a problem nobody has solved"
      >
        <P>
          Every pathway above assumes a device is a fixed thing: it gets reviewed once, and what
          gets approved is what ships. That assumption holds for a locked algorithm — the exact
          weights the model uses on day one are the exact weights it uses five years later, so
          testing that one snapshot really does tell you what the product will keep doing.
        </P>
        <P>
          It does not hold for a model built to keep learning from new data after it is already
          deployed — what regulators call an adaptive algorithm. The version reviewed on
          approval day and the version actually running in a hospital eighteen months later can
          behave differently, and neither the original clearance nor a patient trusting the
          device particularly knows how differently. Regulators have started publishing draft
          frameworks for exactly this problem, mostly built around requiring a company to
          pre-specify the boundaries an algorithm is allowed to drift within rather than
          freezing it entirely — but there is no settled, universally adopted answer yet. It is
          one of the genuinely open questions in this entire field.
        </P>
      </LessonSection>

      <LessonSection
        id="why-approval-takes-longer-than-a-typical-app-launch"
        title="Why approval takes longer than a typical app launch"
      >
        <P>
          A typical consumer app ships, gets user feedback, and iterates in public — bugs get
          patched after launch, not eliminated before it. A regulated medical device, software
          or not, has to demonstrate safety and effectiveness with real evidence{" "}
          <Strong>before</Strong> a single patient can be affected by it, and any meaningful
          change afterward can trigger a fresh review rather than a routine update.
        </P>
        <Callout tone="note" title="This connects directly to an earlier chapter">
          This is the same trade-off Part 1 opened with: a shopping app can ship fast and fix
          bugs live because the cost of a mistake is small. A diagnosis-assist model cannot,
          because the cost of a mistake is a wrong medical decision — regulation is that
          trade-off made into an actual legal requirement rather than a team&apos;s internal
          judgement call.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A regulator like the FDA reviews software that makes a medical claim — diagnosing, treating, or preventing disease — before it can reach patients; a wellness app that makes no such claim typically falls outside that review entirely.",
          "Risk class, not sophistication, decides how much evidence a product needs — Class I needs almost none, Class III needs a full clinical trial, and most software as a medical device sits in the moderate-risk middle.",
          "Most moderate-risk devices take a shortcut, showing they're substantially equivalent to an already-cleared predicate rather than proving safety and effectiveness from first principles — a chain that can drift a long way from the last device anyone actually tested.",
          "Regulated approval requires proving safety and effectiveness before launch, not iterating live in public the way a typical consumer app does.",
          "A model that keeps learning after approval breaks the assumption every pathway above is built on — the version reviewed and the version running in a hospital a year later can genuinely differ, with no fully settled answer yet for how to regulate that.",
        ]}
      />
    </div>
  );
}
