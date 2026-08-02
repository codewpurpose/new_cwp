import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhyHealthcareIsDifferentLesson() {
  return (
    <div>
      <Lead>
        &ldquo;Move fast and break things&rdquo; built half the apps on your phone, and most of
        the time a broken thing is just an inconvenience. A bug in a shopping app loses a sale.
        A bug in a health app can lose something you cannot refund. That single difference is
        why the fastest-moving habit in software engineering runs straight into a wall the
        moment it enters healthcare.
      </Lead>

      <LessonSection
        id="a-bug-in-a-shopping-app-loses-a-sale"
        title="A bug in a shopping app loses a sale"
      >
        <P>
          Ship a checkout bug and a customer&apos;s cart empties itself. They are annoyed, they
          maybe tweet about it, and they buy the thing tomorrow instead. The company loses a
          transaction worth a few dollars to a few hundred. The failure is fully recoverable —
          refund the order, patch the code, apologise, move on. Most software failures, even bad
          ones, look like this.
        </P>
        <P>
          Notice what makes that recoverable: the loss is measured in money, money is fungible,
          and the customer who was harmed is the same person who can be made whole again with a
          refund. All three of those hold for almost every consumer app you have ever used.
          Health tech is the category of software where none of the three reliably hold.
        </P>
      </LessonSection>

      <LessonSection
        id="a-bug-in-a-health-app-can-lose-more-than-that"
        title="A bug in a health app can lose more than that"
      >
        <P>
          Ship a dosage-calculation bug and a patient gets the wrong amount of a drug. Ship a
          bug that silently drops a penicillin allergy from a record, and the next prescription
          written against that record can trigger a reaction. Neither failure has an
          &ldquo;undo&rdquo; button. You cannot refund a medication error the way you refund an
          order.
        </P>
        <P>
          These are not hypothetical categories. Medication errors — wrong drug, wrong dose,
          wrong patient, or a dropped allergy flag like the one above — are estimated to harm
          well over a million people a year in the US alone, and a share of those errors trace
          back to exactly the kind of software bug that would be a shrugged-off ticket in a
          shopping app: a default value that silently overwrote a manual entry, a dropdown that
          defaulted to the wrong unit, a field that failed to carry over during a system
          migration.
        </P>
        <CompareGrid
          items={[
            {
              title: "Shopping app bug",
              tone: "positive",
              children: (
                <>
                  <P>Lost sale, refunded order, an annoyed customer who buys again tomorrow.</P>
                  <P>Fully recoverable. The cost is measured in dollars.</P>
                </>
              ),
            },
            {
              title: "Health app bug",
              tone: "caution",
              children: (
                <>
                  <P>
                    A dropped allergy, a wrong dosage, a missed alert — the kind of failure a
                    patch cannot undo after the fact.
                  </P>
                  <P>Not always recoverable. The cost is measured in harm.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="the-person-who-uses-it-is-not-who-pays"
        title="The person who uses it is not who pays"
      >
        <P>
          In a shopping app, the person who clicks the button, the person who feels the
          consequence, and the person whose card gets charged are the same person. Their
          incentives point in one direction: they want the thing to work.
        </P>
        <P>
          In healthcare, that alignment breaks into three separate parties. The <Strong>
          patient</Strong> uses the software and lives with the outcome. The{" "}
          <Strong>provider</Strong> — the hospital or clinic — chooses which software to buy and
          trains its staff on it. The <Strong>payer</Strong> — an insurer or employer — is who
          actually settles most of the bill, and was rarely in the room when the software was
          selected. Three parties, three different things each one wants: the patient wants to
          get better, the provider wants a tool its staff will actually use, and the payer wants
          the bill to be as small as the outcome allows.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Patient",
              tone: "neutral",
              children: <P>Uses the software. Lives with the outcome. Rarely chose it.</P>,
            },
            {
              title: "Provider",
              tone: "neutral",
              children: (
                <P>Chooses and buys it. Wants staff to actually adopt it, not route around it.</P>
              ),
            },
            {
              title: "Payer",
              tone: "neutral",
              children: <P>Settles most of the bill. Wants the cost contained, not the UX.</P>,
            },
          ]}
        />
        <P>
          Almost none of that lines up in a consumer app. When it doesn&apos;t line up here,
          software gets built to satisfy whoever is actually writing the cheque — which is not
          always the person the software is supposedly designed for.
        </P>
      </LessonSection>

      <LessonSection
        id="procurement-runs-in-years-not-sprints"
        title="Procurement runs in years, not sprints"
      >
        <P>
          A consumer app ships an update on a Tuesday and the whole user base has it by Friday.
          A hospital buying a new piece of clinical software is more often making an eighteen-
          month to three-year commitment before a single clinician touches it, because the
          software has to be evaluated, secured, integrated with an existing record system, and
          trained on before it goes anywhere near a patient.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Request for proposal",
              detail: "The hospital defines what it needs and invites vendors to bid, often over months.",
            },
            {
              label: "Security and privacy review",
              detail: "The hospital's own IT and compliance teams audit the vendor before any contract is signed.",
            },
            {
              label: "Clinical validation",
              detail: "Clinicians test whether the tool fits an actual workflow, not just a demo.",
            },
            {
              label: "Integration with the existing record system",
              detail: "The new software has to exchange data with whatever the hospital already runs — see Part 2 of this track.",
            },
            {
              label: "Staff training and phased rollout",
              detail: "One department at a time, because a hospital cannot afford every unit learning a new system on the same day.",
            },
          ]}
        />
        <P>
          None of that is bureaucracy for its own sake. Every one of those stages exists because
          the cost of getting it wrong is the harm described two sections ago, not a bad app
          store review.
        </P>
      </LessonSection>

      <LessonSection
        id="regulation-decides-whether-you-can-ship-at-all"
        title="Regulation decides whether you can ship at all"
      >
        <P>
          A consumer app answers to its app store and, loosely, to its own terms of service.
          Software that diagnoses, doses, or monitors a patient can fall under &ldquo;software
          as a medical device&rdquo; — a real regulatory category, not a loophole — and that
          means a government body has to sign off before it reaches a patient at all, not just
          review it after a complaint.
        </P>
        <Callout tone="note" title="Covered in full later in this track">
          Part 6 walks through exactly how that approval process works and why it routinely
          takes longer than an entire consumer product&apos;s life cycle. The point to hold onto
          here is simpler: in most software, regulation is a constraint you design around. In
          health tech, it is frequently the reason you are allowed to ship at all.
        </Callout>
      </LessonSection>

      <LessonSection
        id="why-move-fast-and-break-things-doesnt-work-here"
        title={'Why "move fast and break things" doesn\'t work here'}
      >
        <P>
          That slogan works when the cost of a bug is small and reversible enough that shipping
          fast and fixing later beats shipping slow and safe. Healthcare inverts both halves of
          that trade: the cost of a bug is not small, and it is frequently not reversible.
          Moving fast still matters — a clinic drowning in paperwork is its own kind of harm —
          but the same three months a startup spends on user growth, a health tech team often
          spends on validating that a feature is safe before anyone with a real diagnosis
          touches it.
        </P>
        <P>
          Add the misaligned incentives from two sections ago and the picture completes itself.
          A shopping app that breaks things fast finds out from angry users within a day. Health
          software built to satisfy a payer, sold through a years-long procurement cycle, and
          gated by a regulator before launch can go a long time before the person actually
          affected by a design flaw ever gets a say in it.
        </P>
        <Callout tone="warning" title="Slower is not the same as worse">
          <Strong>Careful</Strong> and <Strong>slow</Strong> get treated as synonyms in most
          software criticism. In health tech they are opposites: the careful team is usually the
          one moving deliberately enough that it does not have to move twice.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A shopping-app bug costs a transaction and is fully recoverable — refund it, patch it, move on.",
          "A health-app bug can drop an allergy or miscalculate a dose, and neither failure has an undo button.",
          "The patient, the provider who buys the software, and the payer who settles the bill want three different things, and none of them is guaranteed to be the same as what's best for the patient.",
          "Procurement here runs eighteen months to three years, not a sprint, because integration, security review, and clinical validation all have to clear before a patient is exposed to it.",
          "\"Move fast and break things\" assumes bugs are cheap and reversible, and cheap to notice — healthcare breaks all three assumptions at once.",
        ]}
      />
    </div>
  );
}
