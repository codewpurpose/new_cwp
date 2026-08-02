import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function PrivacyAndHipaaBasicsLesson() {
  return (
    <div>
      <Lead>
        Most people assume HIPAA means &ldquo;anything about my health is legally private.&rdquo;
        It doesn&apos;t. HIPAA protects specific information, handled by specific kinds of
        organisations — and the fitness app on your phone almost certainly falls outside both
        boundaries, no matter how personal the data it holds feels.
      </Lead>

      <LessonSection
        id="hipaa-protects-specific-information-not-all-of-it"
        title="HIPAA protects specific information, not all of it"
      >
        <P>
          HIPAA — the Health Insurance Portability and Accountability Act — covers{" "}
          <Strong>Protected Health Information</Strong>, or PHI: data created or held by a
          covered healthcare provider, health plan, or their business partners, tied to an
          identifiable patient. A doctor&apos;s note about your diagnosis is squarely inside
          that boundary. A lot of health-adjacent data people assume is covered is not.
        </P>
        <P>
          PHI is not just the diagnosis itself. It is any of a defined list of identifiers —
          name, address, birth date, and more — attached to health information, held by one of
          those specific organisations. Strip every identifier from that same data and, under
          the rules covered later in this chapter, it can stop being PHI entirely. The
          identifiers are doing almost all of the legal work, which is worth seeing spelled out
          rather than taken on faith.
        </P>
      </LessonSection>

      <LessonSection
        id="the-eighteen-identifiers-that-actually-define-phi"
        title="The eighteen identifiers that actually define PHI"
      >
        <P>
          HIPAA&apos;s regulations name eighteen specific identifiers. Health information tied
          to any one of them, held by a covered entity, is PHI. A representative slice of the
          list:
        </P>
        <ChecklistCard
          marker="dot"
          items={[
            "Name",
            "Any geographic subdivision smaller than a state — street address, county, or ZIP code",
            "All dates directly tied to an individual, other than the year — birth date, admission date, discharge date",
            "Telephone and fax numbers, email addresses",
            "Social Security number, medical record number, health plan beneficiary number",
            "Biometric identifiers, including fingerprints and voiceprints",
            "Full-face photographs",
            "Any other unique identifying number, characteristic, or code",
          ]}
        />
        <P>
          That last line does most of the quiet work — it is a catch-all, not a loophole. A
          hospital-assigned patient ID that looks meaningless to an outsider still counts,
          because it can be traced back to one specific person inside that hospital&apos;s own
          systems.
        </P>
      </LessonSection>

      <LessonSection
        id="treatment-payment-and-operations-need-no-extra-authorization"
        title="Treatment, payment, and operations need no extra authorisation"
      >
        <P>
          HIPAA is often pictured as requiring a fresh signature every time PHI moves between
          two people. It doesn&apos;t. The law carves out three broad purposes — usually
          shortened to <Strong>TPO</Strong> — where a covered entity can use or share PHI
          without asking the patient again each time: <Strong>treatment</Strong> (a specialist
          pulling your primary care notes before an appointment), <Strong>payment</Strong> (a
          hospital sending your claim details to your insurer), and{" "}
          <Strong>healthcare operations</Strong> (a hospital reviewing its own case outcomes to
          improve quality).
        </P>
        <P>
          An emergency room doctor at a hospital you have never visited before can request your
          records from your regular clinic in the middle of treating you, without a new consent
          form, because that request falls inside treatment. The one blanket document you sign —
          the Notice of Privacy Practices, usually on a clipboard at a first visit — is what
          covers all three going forward. Anything outside TPO, like selling PHI to a
          marketer, needs the patient&apos;s specific authorisation instead.
        </P>
      </LessonSection>

      <LessonSection id="who-is-actually-bound-by-it" title="Who is actually bound by it">
        <P>
          The law binds <Strong>covered entities</Strong> — hospitals, clinics, insurers,
          pharmacies — and their <Strong>business associates</Strong>, companies those entities
          hire to handle patient data on their behalf, like a billing service or a cloud
          storage provider. Step outside that specific relationship and HIPAA typically has
          nothing to say, even about data that looks exactly like medical information.
        </P>
        <P>
          That relationship with a business associate is not informal. The law requires a{" "}
          <Strong>Business Associate Agreement</Strong>, or BAA, before PHI can be shared at
          all — a signed contract that obligates the vendor to use appropriate safeguards, to
          report a breach on its end back to the covered entity, and to limit its use of the
          data to exactly what the contract permits. A cloud provider hosting patient records
          without a BAA in place is not a grey area; it is a compliance failure on both sides of
          the contract, regardless of how good that provider&apos;s actual security is.
        </P>
        <RevealCard
          summaryTag="Scenario"
          summary="Your cardiologist's office emails you your latest EKG results."
          detailTag="Covered"
          detail={
            <>
              This is Protected Health Information, created by a covered entity about an
              identifiable patient. Its handling, storage, and any breach of it fall directly
              under HIPAA.
            </>
          }
          footnote="The organisation and the data both sit inside the boundary the law was written for."
        />
        <RevealCard
          summaryTag="Scenario"
          summary="A step-counting app you downloaded from the app store logs your daily heart rate."
          detailTag="Not covered"
          detail={
            <>
              Unless that app was built by, or contracted to, a covered healthcare provider or
              insurer, HIPAA does not apply to it — even though the data is arguably more
              detailed than what your doctor sees in a single visit. The app is instead governed
              by its own privacy policy and general consumer-protection law, which offer weaker
              guarantees.
            </>
          }
          footnote="This is the single most common misunderstanding people bring to this topic — the sensitivity of the data does not determine whether HIPAA applies; who is holding it does."
        />
      </LessonSection>

      <LessonSection
        id="de-identifying-data-and-how-re-identification-can-undo-it"
        title="De-identifying data, and how re-identification can undo it"
      >
        <P>
          Once PHI has every one of those eighteen identifiers stripped out — the{" "}
          <Strong>Safe Harbor</Strong> method — HIPAA no longer treats it as PHI at all, and a
          hospital can share it freely for research without patient authorisation. The
          alternative, <Strong>Expert Determination</Strong>, lets a qualified statistician
          certify a smaller, more tailored set of removals as sufficiently low-risk instead of
          following the fixed list.
        </P>
        <P>
          The gap in Safe Harbor is that &ldquo;identifier removed&rdquo; is not the same
          guarantee as &ldquo;person unidentifiable.&rdquo; Researcher Latanya Sweeney showed
          that <Strong>ZIP code, birth date, and sex alone — none of them a full identifier on
          their own — uniquely identify roughly 87% of the U.S. population</Strong> when
          combined with an outside, publicly available list like a voter roll. De-identified
          data can be <Strong>re-identified</Strong> by cross-referencing it against a second
          dataset that was never covered by HIPAA in the first place.
        </P>
        <Callout tone="danger" title="De-identified is not the same claim as anonymous">
          Removing the eighteen identifiers satisfies the legal definition of de-identified. It
          does not guarantee the data cannot be traced back to a person once it is combined with
          something else — and the second dataset doing the linking is very often outside
          HIPAA&apos;s reach entirely, which is exactly what makes this risk easy to
          underestimate.
        </Callout>
      </LessonSection>

      <LessonSection id="what-a-breach-actually-triggers" title="What a breach actually triggers">
        <P>
          When a covered entity has a breach — a hacked hospital database, a lost
          laptop with patient files on it — HIPAA requires notifying every affected patient,
          notifying the federal government, and in large breaches notifying the media, all
          within a fixed number of days. Fines follow, and they can run into the millions for a
          large or negligent breach.
        </P>
        <P>
          None of those specific obligations apply to a consumer wellness app leaking the same
          kind of data. It might violate its own privacy policy, and general data-protection or
          state consumer law might apply — but not the specific machinery HIPAA sets in motion,
          because the app was never a covered entity to begin with.
        </P>
        <Callout tone="tip" title="Why this boundary matters if you build health tech">
          Knowing whether your product counts as a covered entity or a business associate is
          not a legal detail to defer — it decides which security requirements, breach
          procedures, and contracts you are actually obligated to have in place before you ship.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "HIPAA protects Protected Health Information handled by covered entities and their business associates — not every piece of health-adjacent data everywhere.",
          "PHI is defined by eighteen specific identifiers attached to health data, including a catch-all for any other unique identifying code — strip all eighteen and the legal category can disappear.",
          "Treatment, payment, and healthcare operations need no fresh authorisation each time; one signed notice at the first visit covers all three going forward.",
          "A business associate can only touch PHI under a signed agreement obligating it to safeguard the data and report its own breaches — sharing without one is a compliance failure regardless of actual security.",
          "De-identified data is a legal category, not a guarantee of anonymity — ZIP code, birth date, and sex alone re-identify most Americans once cross-referenced against an outside dataset.",
        ]}
      />
    </div>
  );
}
