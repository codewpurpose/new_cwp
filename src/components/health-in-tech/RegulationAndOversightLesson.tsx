import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

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
          "A regulator like the FDA reviews software that makes a medical claim — diagnosing, treating, or preventing disease — before it can reach patients.",
          "A general wellness app that makes no such claim typically falls outside this review entirely, regardless of how health-adjacent its data feels.",
          "Software as a Medical Device is a real category built because qualifying software makes the same kind of decision a regulated physical device used to make alone.",
          "Regulated approval requires proving safety and effectiveness before launch, not iterating live in public the way a typical consumer app does.",
        ]}
      />
    </div>
  );
}
