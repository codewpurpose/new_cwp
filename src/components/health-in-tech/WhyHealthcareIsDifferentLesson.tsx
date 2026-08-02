import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";

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
          "\"Move fast and break things\" assumes bugs are cheap and reversible — healthcare breaks both assumptions at once.",
          "Moving slower here is not the same as moving worse. It is often the reason a team only has to ship a feature once.",
        ]}
      />
    </div>
  );
}
