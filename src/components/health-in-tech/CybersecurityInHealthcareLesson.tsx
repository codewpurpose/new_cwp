import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
        <P>
          The way in is rarely a sophisticated exploit. It is a phishing email, and clinical
          staff are a specifically good target for one — not because they are careless, but
          because the job trains a reflex an attacker can write straight against. A nurse
          fourteen patients into a shift, or a doctor between rooms, is primed to act fast on
          anything marked urgent: a lab result, a scheduling alert, a message from
          &ldquo;IT&rdquo; about a locked account. That is precisely the instinct a
          well-written phishing email depends on, and healthcare&apos;s own urgency culture
          makes it a more reliable target than the same email sent to an office worker with time
          to pause.
        </P>
      </LessonSection>

      <LessonSection
        id="a-device-that-cannot-be-patched-is-a-permanent-hole"
        title="A device that cannot be patched is a permanent hole"
      >
        <P>
          Patch a laptop and the update finishes in minutes. Patch an MRI machine, and a
          hospital often cannot do it at all. Medical imaging and monitoring equipment routinely
          runs for fifteen to twenty years, frequently on an operating system its vendor stopped
          supporting long ago, because changing the software of a certified medical device can
          trigger a fresh regulatory review before it is allowed back into service. Updating it
          is not the routine, low-stakes patch it would be on an ordinary office computer — it is
          closer to re-certifying the device from scratch.
        </P>
        <P>
          The result is a building full of machines nobody can safely update, sitting on the
          same network as the record system, the scheduling system, and everything else.
          Network segmentation exists mostly because of exactly this: an unpatchable scanner
          isolated on its own segment can be infected without that infection reaching the record
          system next door. The same scanner sitting on the general hospital network turns one
          permanently vulnerable device into an open door for the whole building.
        </P>
        <Callout tone="danger" title="Legacy equipment does not need a keyboard to be an entry point">
          A device that nobody is typing into all day is still a computer on the network. An
          unpatched imaging machine or infusion pump can be the first thing an attacker
          compromises, purely because it was the least-watched machine in the building, not
          because anyone did anything wrong operating it.
        </Callout>
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
        <P>
          A retailer measures an outage in lost sales — recoverable the moment the site comes
          back up, refunded or resold the next day. A hospital&apos;s downtime does not reverse
          that cleanly. An ambulance diverted to another facility during an outage is a delay in
          someone&apos;s care that has already happened, not a transaction that can simply be
          replayed once the systems return. That is the real unit of cost here, and it rarely
          shows up as a line item next to the ransom figure.
        </P>
        <LabelRows
          rows={[
            {
              label: "Ransom",
              text: "The number attackers actually ask for, and the one that makes headlines — often the smallest real cost of the three.",
            },
            {
              label: "Downtime",
              text: "Days of postponed surgeries and paper-chart workarounds while systems are rebuilt from backup, if backups exist at all.",
            },
            {
              label: "Diverted care",
              text: "Ambulances redirected and appointments cancelled during the outage — a delay that already happened to a real patient and cannot be undone by restoring a server.",
            },
          ]}
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
          "Attackers targeting healthcare aim at urgency, not carelessness — clinical staff working under time pressure are primed to act fast on anything marked urgent, which is exactly the instinct phishing depends on.",
          "Legacy imaging and monitoring equipment often can't be patched at all, because changing a certified medical device's software can trigger a fresh regulatory review, leaving networks full of machines nobody can safely update.",
          "Staff training, network segmentation, and offline tested backups stop most of these attacks before they start, and none of the three are exotic or expensive relative to a single ransom payment.",
          "The real cost of hospital downtime isn't a dollar figure — it's a diverted ambulance and a delayed diagnosis, neither of which gets undone once the systems come back online.",
        ]}
      />
    </div>
  );
}
