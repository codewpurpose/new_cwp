import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function RemoteCareAcrossBordersLesson() {
  return (
    <div>
      <Lead>
        A specialist who could answer your exact question exists somewhere in the world. The
        old problem was never that they didn&apos;t exist — it was that reaching them meant a
        flight, a visa, and money most people don&apos;t have. That is the same distance problem
        CodeWithPurpose exists to close in education, showing up again in healthcare, and it
        comes with a set of legal problems education never had to solve.
      </Lead>

      <LessonSection
        id="the-same-problem-cwp-exists-to-solve-shows-up-here"
        title="The same problem CodeWithPurpose exists to solve shows up here"
      >
        <P>
          CodeWithPurpose exists because good coding education was historically locked behind
          location and cost — a great teacher existed, but reaching them required money or
          geography most students didn&apos;t have. Cross-border telemedicine is the identical
          shape of problem in a different field: a specialist who could help exists
          somewhere, and for most of history the only thing standing between them and a patient
          who needed them was distance nobody could afford to close.
        </P>
      </LessonSection>

      <LessonSection
        id="a-consultation-that-doesnt-require-a-flight"
        title="A consultation that doesn't require a flight"
      >
        <P>
          A rare-disease specialist practising in one country can now review a patient&apos;s
          scans and history from another country entirely, over a video call that costs a
          fraction of what a flight and a hotel would have. A patient in a region with no local
          specialist in a specific condition can get a second opinion without leaving
          their city. None of this required new medicine — it required the connectivity and
          record-sharing infrastructure covered earlier in this track to exist first.
        </P>
        <P>
          The cases where this genuinely earns its keep, rather than being a nice-to-have, are
          fairly specific.
        </P>
        <LabelRows
          rows={[
            {
              label: "Specialist scarcity",
              text: "A condition rare enough that a country, or even a region, has no local specialist in it at all — a remote consult is the only real option, not a convenience over a real one.",
            },
            {
              label: "Second opinions",
              text: "A patient facing a serious diagnosis or an unusual case can get an independent read from someone with more relevant experience, without a second flight to a second country.",
            },
            {
              label: "Humanitarian and disaster settings",
              text: "A field clinic in a conflict zone or after a natural disaster can put a local worker in contact with a remote specialist for a case beyond what anyone on site has trained for.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="who-is-actually-allowed-to-treat-you"
        title="Who is actually allowed to treat you"
      >
        <P>
          Being able to see a doctor over video does not mean that doctor is legally allowed to
          treat you. Medical licensure is granted per jurisdiction — typically the place where
          the patient physically is, not where the doctor sits — because that is the system
          meant to be able to discipline a bad doctor or handle a complaint on the ground. A
          cardiologist properly licensed in the country where they trained can be practising
          entirely unlicensed the moment their patient is physically located somewhere else.
        </P>
        <P>
          This shows up within a single country too, not just between them. Inside the United
          States, a physician has historically needed a licence in the state where the patient
          is sitting during the call, not just the state where the doctor practises day to day —
          a handful of states have built compacts to ease this for specific groups of
          clinicians, but no equivalent system exists for most international consultations. A
          lot of genuinely useful cross-border care happens in a legal grey zone that both
          doctor and patient are trusting will never actually get tested.
        </P>
      </LessonSection>

      <LessonSection
        id="where-your-data-is-legally-allowed-to-live"
        title="Where your data is legally allowed to live"
      >
        <P>
          A remote consultation crosses a border twice — the doctor is in one place, and so is
          the record their advice depends on. Which country&apos;s privacy law governs that
          record depends on where the patient is, not where the software company happens to be
          headquartered, and the two regimes a cross-border service is most likely to collide
          with do not agree on much.
        </P>
        <CompareGrid
          items={[
            {
              title: "GDPR (EU)",
              tone: "neutral",
              children: (
                <>
                  <P>
                    Treats health data as a &ldquo;special category&rdquo; that follows the
                    person, not the organisation handling it.
                  </P>
                  <P>
                    Restricts moving that data outside the EU unless the receiving country is
                    judged adequate, or the transfer carries specific contractual safeguards.
                  </P>
                </>
              ),
            },
            {
              title: "HIPAA (US)",
              tone: "neutral",
              children: (
                <>
                  <P>
                    Covers Protected Health Information, but only when handled by a specific
                    list of &ldquo;covered entities&rdquo; and their contractors.
                  </P>
                  <P>
                    Says comparatively little about moving data across a border, and a lot about
                    who is allowed to see it and logging every time they do.
                  </P>
                </>
              ),
            },
          ]}
        />
        <P>
          The mismatch is the actual problem for anyone building this. A service that is
          compliant on one side of the call can be non-compliant on the other, and &ldquo;the
          app works in both countries&rdquo; is a much lower bar to clear than &ldquo;the
          data-handling in both countries is legal.&rdquo;
        </P>
      </LessonSection>

      <LessonSection
        id="who-is-liable-when-the-clinician-is-elsewhere"
        title="Who is liable when the clinician is elsewhere"
      >
        <P>
          Malpractice law is written assuming a doctor and a patient share a jurisdiction.
          Cross-border care breaks that assumption cleanly: if a remote specialist&apos;s advice
          contributes to a bad outcome, it is often unclear whose malpractice law even applies —
          the country where the doctor is licensed, the country where the patient received the
          advice, or wherever the platform connecting them happens to be incorporated.
        </P>
        <P>
          Malpractice insurance compounds it. A policy covering a clinician&apos;s ordinary
          practice frequently does not extend to advice given to a patient physically located in
          another country, leaving both sides exposed in a way neither may have realised at the
          time of the call. In practice, a lot of cross-border telemedicine sidesteps the
          sharpest version of this problem by keeping the remote clinician in an advisory role —
          the local treating provider stays legally responsible for the patient, and the remote
          specialist is formally a consultant to that provider rather than the treating
          physician of record.
        </P>
        <Callout tone="warning" title="A workaround, not a settled answer">
          Keeping the remote specialist advisory avoids the sharpest version of the liability
          question. It does not answer it. Whose law actually governs a cross-border
          consultation remains genuinely unresolved in a lot of jurisdictions, which is a real
          risk both sides of the call are quietly absorbing.
        </Callout>
      </LessonSection>

      <LessonSection id="what-still-has-to-happen-in-person" title="What still has to happen in person">
        <P>
          <Strong>A remote consultation is still a consultation</Strong>, subject to the same
          limits as Part 5&apos;s first chapter — it can inform a diagnosis and a treatment
          plan, but any actual procedure, physical exam, or urgent intervention still requires a
          body in a room, usually the patient&apos;s own local system carrying out what the
          remote specialist recommended.
        </P>
        <P>
          That handoff back to a local provider is not a footnote — it is where most of the
          licensure and liability questions above actually get resolved in practice, by keeping
          the person physically responsible for the patient inside a single jurisdiction, even
          when the expertise behind their decision travelled from somewhere else entirely.
        </P>
        <Callout tone="success" title="Worth sitting with">
          The value here was never replacing local care. It is giving a patient without local
          access to a specific specialist a real second opinion they could not otherwise have
          reached — the exact kind of gap CodeWithPurpose was built to close, just in a
          different field.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Cross-border telemedicine and CodeWithPurpose's own mission solve the same shape of problem: a distance between someone who needs help and someone who can give it, that used to be unaffordable to close.",
          "It genuinely earns its keep in three places: specialist scarcity, second opinions a patient couldn't otherwise reach, and humanitarian or disaster settings with no local specialist at all.",
          "Medical licensure is granted per jurisdiction, usually the patient's location rather than the doctor's, which means a lot of useful cross-border care happens in a legal grey area nobody has fully closed.",
          "GDPR and HIPAA protect health data on fundamentally different logic — GDPR follows the person and restricts moving data across borders, HIPAA governs specific organisations and says comparatively little about borders — so compliance on one side of a call doesn't guarantee compliance on the other.",
          "When a remote specialist's advice contributes to a bad outcome, whose malpractice law applies is often unclear, which is why most cross-border care keeps the remote clinician advisory rather than the treating physician of record.",
        ]}
      />
    </div>
  );
}
