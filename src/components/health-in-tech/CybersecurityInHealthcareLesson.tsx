import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function CybersecurityInHealthcareLesson() {
  return (
    <div>
      <Lead>
        Most businesses hit by ransomware can wait a few days to pay or recover before real
        damage sets in. A hospital cannot — its systems control which patient gets which
        medication, right now — and that single difference is exactly why hospitals are one of
        the most common ransomware targets in existence.
      </Lead>

      <LessonSection
        id="hospitals-are-a-common-ransomware-target-and-heres-why"
        title="Hospitals are a common ransomware target, and here's why"
      >
        <P>
          Ransomware works by locking an organisation out of its own systems until it pays.
          That threat only has teeth if the organisation cannot simply wait it out — and a
          hospital, unlike almost any other kind of business, cannot pause patient care for a
          week while IT rebuilds servers from backup. Attackers know this. It is exactly why
          healthcare gets targeted disproportionately relative to how much money actually flows
          through it.
        </P>
      </LessonSection>

      <LessonSection
        id="what-a-single-breach-actually-costs-a-hospital"
        title="What a single breach actually costs a hospital"
      >
        <P>
          Walk through what one real attack looks like, from the moment it lands to what
          stopping it would have required.
        </P>
        <RevealCard
          summaryTag="Before"
          summary="A single employee opens an email attachment that looks like a routine vendor invoice."
          detailTag="What happens next"
          detail={
            <>
              The attachment silently installs ransomware, which spreads across the hospital
              network overnight and encrypts patient records, scheduling systems, and even some
              connected medical devices by morning. Staff arrive to find they cannot pull up a
              single chart. Scheduled surgeries get postponed, ambulances get diverted to other
              facilities, and the hospital faces a ransom demand — often in the hundreds of
              thousands to millions of dollars — with patient safety, not just data, now on the
              line.
            </>
          }
          footnote="This exact chain of events — one email, one click, a hospital-wide shutdown by morning — has happened at real hospitals, not as a hypothetical."
        />
      </LessonSection>

      <LessonSection id="the-basic-defenses-that-stop-most-attacks" title="The basic defenses that stop most attacks">
        <RevealCard
          summaryTag="After"
          summary="The same hospital, with a handful of basic defenses already in place."
          detailTag="What changes"
          detail={
            <>
              <Strong>Staff training</Strong> that makes that specific email look suspicious
              before anyone clicks it. <Strong>Network segmentation</Strong> that keeps one
              infected computer from spreading to every other system in the building.{" "}
              <Strong>Offline, regularly tested backups</Strong> that let the hospital restore
              its records without paying anyone, because the ransom&apos;s entire leverage
              depended on there being no other way back in.
            </>
          }
          footnote="None of these three are exotic security research — they are the same basic hygiene most industries already treat as table stakes."
        />
        <Callout tone="tip" title="Why this keeps happening anyway">
          The defenses above are neither secret nor expensive relative to a single ransom
          payment. What is expensive, and easy to defer, is the ongoing discipline of staff
          training and backup testing that never has an urgent deadline — until the week it
          suddenly does.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Hospitals are a disproportionate ransomware target because they cannot pause patient care to wait out an attack the way most businesses can.",
          "A single employee clicking one attachment can cascade into a hospital-wide shutdown by the next morning, postponing surgeries and diverting ambulances.",
          "Staff training, network segmentation, and offline tested backups stop most of these attacks before they start, and none of the three are exotic.",
          "What actually fails is not the technology — it's the ongoing discipline of maintaining these defenses when there's no urgent deadline forcing it.",
        ]}
      />
    </div>
  );
}
