import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { InteroperabilityRecords } from "@/components/health-in-tech/InteroperabilityRecords";

export function InteroperabilityLesson() {
  return (
    <div>
      <Lead>
        You would assume a patient&apos;s diagnosis reads the same no matter which hospital
        wrote it down. It does not. Two hospitals can run two entirely different record
        systems, and each one is free to code the exact same diagnosis a completely different
        way — which means a referral between them can arrive looking like it belongs to a
        different patient.
      </Lead>

      <LessonSection
        id="two-hospitals-two-different-ehr-systems"
        title="Two hospitals, two different EHR systems"
      >
        <P>
          There is no single EHR every hospital runs. More than a dozen major vendors compete
          for hospital contracts in the US alone, and large health systems, small clinics, and
          specialist practices each pick from that list, and nothing forces those vendors to
          store data the same way underneath. Two hospitals five miles apart can be running
          completely unrelated software, built by different companies, on different underlying
          database structures.
        </P>
        <P>
          That would be a minor inconvenience if patients only ever saw one hospital in their
          life. They do not. A referral to a specialist, a transfer after an emergency, a
          second opinion — all of them require one system to somehow hand data to a
          <Strong> different</Strong> system that was never designed to receive it.
        </P>
      </LessonSection>

      <LessonSection
        id="the-same-diagnosis-coded-two-different-ways"
        title="The same diagnosis, coded two different ways"
      >
        <P>
          Compare the two mock records below. Same patient, same diagnosis, same date — coded
          under two different standards, formatted with two different date conventions, and
          filed under two differently named sections of the chart.
        </P>
      </LessonSection>

      <InteroperabilityRecords />

      <LessonSection
        id="syntactic-interoperability-is-not-semantic-interoperability"
        title="Syntactic interoperability is not semantic interoperability"
      >
        <P>
          The mismatch above is worth naming precisely, because &ldquo;interoperability&rdquo;
          actually splits into two separate problems that get solved in two separate ways.
        </P>
        <LabelRows
          rows={[
            {
              label: "Syntactic",
              text: "Can the message even be parsed? Does the receiving system recognise the format the data arrived in at all, or does it just fail to open?",
            },
            {
              label: "Semantic",
              text: "Once it's parsed, does it mean the same thing? Does \"E11.9\" on one side match \"DX-2240\" on the other, or does each system just see a code it doesn't recognise?",
            },
          ]}
        />
        <P>
          Solve syntax without semantics and you get a system that opens the file successfully
          and still cannot tell you whether the patient has diabetes — which is exactly what the
          two mock records above demonstrate. The message technically arrives. Nothing in it
          means anything to the system receiving it. Fixing syntax is a plumbing problem, and it
          is the easier of the two. Fixing semantics means every vendor agreeing on the exact
          same code for the exact same condition, which is a coordination problem at the scale
          of an entire industry.
        </P>
      </LessonSection>

      <LessonSection
        id="information-blocking-is-a-business-choice-not-a-technical-limit"
        title="Information blocking is a business choice, not a technical limit"
      >
        <P>
          Not every failure to exchange a record is an accident. Sometimes a vendor or a health
          system has a real financial reason to make data exchange harder than it needs to be —
          a practice with a name in US health policy: <Strong>information blocking</Strong>.
        </P>
        <CompareGrid
          items={[
            {
              title: "Why a vendor might do it",
              tone: "caution",
              children: (
                <>
                  <P>Charging steep fees for the interface that lets another system connect to theirs.</P>
                  <P>Making their own product&apos;s export format deliberately awkward for a competitor to import.</P>
                </>
              ),
            },
            {
              title: "Why a health system might do it",
              tone: "caution",
              children: (
                <>
                  <P>
                    Making it slightly harder for a patient to take their full record to a
                    competing hospital across town.
                  </P>
                  <P>Treating the patient&apos;s own history as a competitive asset rather than the patient&apos;s property.</P>
                </>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="It's regulated for exactly this reason">
          US federal rules now explicitly define information blocking and prohibit it for
          certain vendors and providers, with real financial penalties attached. The rule exists
          because &ldquo;our systems just don&apos;t talk to each other&rdquo; was, often enough,
          a convenient story covering a deliberate business choice.
        </Callout>
      </LessonSection>

      <LessonSection
        id="why-a-shared-standard-is-the-only-real-fix"
        title="Why a shared standard is the only real fix"
      >
        <P>
          You could imagine solving this case by case: write a one-off translator between these
          two specific hospitals&apos; systems. That approach breaks the moment a third hospital
          joins, because now you need a translator for every pair — three systems need three
          translators, ten systems need forty-five. Goodwill and one-off integrations do not
          scale; a shared standard that every vendor agrees to speak does.
        </P>
        <P>
          What actually moved the needle historically was not goodwill, and it was not
          engineering elegance either — it was regulation forcing every vendor to adopt the same
          deadline at once, the same lever that eventually curbs information blocking above.
          Left purely voluntary, a shared standard is a coordination problem nobody wants to
          move first on. Made mandatory, it stops being a competition and starts being table
          stakes.
        </P>
        <Callout tone="note" title="This is exactly what the next chapter covers">
          That shared standard already exists and has a name — FHIR. The next chapter walks
          through what it actually looks like as data, and why it took decades to catch on even
          after it existed.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Hospitals run competing EHR systems with no shared underlying structure, so a referral between them means one system handing data to another that was never built to receive it.",
          "The same diagnosis can arrive coded under a different standard, a different date format, and a different section name depending on which system wrote it.",
          "A message can be syntactically readable — it opens fine — while still being semantically meaningless, because the codes inside it don't match anything the receiving system recognises.",
          "Some non-interoperability is deliberate: information blocking, where a vendor or provider profits from making data exchange harder, is now a regulated practice with real penalties.",
          "One-off translators between systems do not scale, and regulation — not goodwill — is what has actually forced a shared standard into wide use.",
        ]}
      />
    </div>
  );
}
