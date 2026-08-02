import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function AvoidingScamsAndPredatoryProductsLesson() {
  return (
    <div>
      <Lead>
        A legitimate lender wants you to read the paperwork slowly. Anything designed to be taken
        advantage of wants the opposite — a decision made fast, alone, and before you have time to
        ask anyone else what they think.
      </Lead>

      <LessonSection id="urgency-and-secrecy-are-the-two-biggest-tells" title="Urgency and secrecy are the two biggest tells">
        <P>
          <Strong>Urgency</Strong> — &ldquo;this rate expires today,&rdquo; &ldquo;approval takes
          two minutes&rdquo; — exists to get a signature before anyone can compare it to another
          offer. <Strong>Secrecy</Strong> — being told not to mention it to family, a financial
          advisor, or a bank — exists to remove the one person most likely to spot the problem.
          Legitimate offers survive being slept on and survive a second opinion; almost nothing
          predatory does.
        </P>
      </LessonSection>

      <LessonSection id="a-loan-designed-to-be-impossible-to-pay-off" title="A loan designed to be impossible to pay off">
        <P>
          A payday loan is the clearest example: a small amount borrowed against a paycheck, due
          in full in roughly two weeks, at a fee that annualizes to 300% APR or more. Miss that
          two-week window and the loan is typically &ldquo;rolled over&rdquo; into a new one, with
          a new fee — the structure is built around the fact that most borrowers can&apos;t repay
          it on time, not around the assumption that they can.
        </P>
      </LessonSection>

      <LessonSection id="the-checklist-that-catches-most-of-them" title="The checklist that catches most of them">
        <ChecklistCard
          marker="check"
          items={[
            "Pressure to decide today, or a deal that 'expires' within hours.",
            "Being told to keep the offer secret from family, a bank, or an advisor.",
            "A rate or fee that isn't stated as a clear, comparable APR.",
            "Guaranteed returns on an investment — no legitimate investment guarantees a return.",
            "Payment requested by gift card, wire transfer, or cryptocurrency, which are all difficult or impossible to reverse.",
            "An unsolicited contact — call, text, or DM — about your accounts, taxes, or a prize you didn't enter for.",
          ]}
        />
      </LessonSection>

      <Callout tone="danger" title="When in doubt, stop and call the institution directly">
        Hang up, look up the official number yourself, and call back. A legitimate offer will
        still be there in an hour; almost nothing built to take advantage of you will survive that
        delay.
      </Callout>

      <TakeawayCard
        items={[
          "Urgency and secrecy are the two clearest tells of a predatory offer — legitimate deals survive being slept on and a second opinion.",
          "Payday loans are structured around short repayment windows and rollover fees that assume most borrowers can't repay on time.",
          "A rate that isn't stated as a clear, comparable APR is a red flag by itself, whatever else the offer promises.",
          "When something feels off, hang up and call the institution back at a number you looked up yourself, not one the caller gave you.",
        ]}
      />
    </div>
  );
}
