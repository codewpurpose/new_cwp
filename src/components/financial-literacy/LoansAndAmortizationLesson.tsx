import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { AmortizationSchedule } from "@/components/financial-literacy/AmortizationSchedule";

export function LoansAndAmortizationLesson() {
  return (
    <div>
      <Lead>
        Every fixed loan payment looks identical on the statement, month after month. Underneath,
        the split between what pays down what you borrowed and what pays the lender for lending it
        to you is quietly moving the entire time — and it starts far more lopsided than most
        borrowers expect.
      </Lead>

      <LessonSection id="every-payment-splits-between-interest-and-principal" title="Every payment splits between interest and principal">
        <P>
          <Strong>Amortization</Strong> is the schedule that splits a fixed loan payment into two
          pieces every month: <Strong>interest</Strong>, which is the lender&apos;s fee on
          whatever balance is still outstanding, and <Strong>principal</Strong>, which actually
          reduces what you owe. The payment amount never changes — only the ratio between the two
          pieces does.
        </P>
      </LessonSection>

      <LessonSection id="early-payments-are-mostly-interest" title="Early payments are mostly interest">
        <P>
          Interest is calculated on the remaining balance, and early in a loan the remaining
          balance is close to the full amount borrowed — so early payments are mostly interest,
          with only a small sliver going toward principal. Step through the schedule below month
          by month and watch that ratio flip as the balance shrinks.
        </P>
      </LessonSection>

      <AmortizationSchedule />

      <LessonSection id="why-an-extra-payment-early-saves-more-than-one-late" title="Why an extra payment early saves more than one late">
        <P>
          An extra principal payment works by shrinking the balance interest gets calculated on,
          for every remaining month of the loan. Made early, it prevents interest across nearly
          the whole remaining term. Made near the end, there are only a handful of months left for
          it to matter — the same dollar amount, doing far less work.
        </P>
        <Callout tone="tip" title="Check for a prepayment penalty first">
          A small number of loans charge a fee for paying ahead of schedule. It&apos;s rare, but a
          five-minute check of the loan terms before sending an extra payment is worth doing once.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Amortization splits a fixed loan payment into interest, calculated on the remaining balance, and principal, which actually pays down the loan.",
          "Because interest is calculated on the outstanding balance, early payments on any loan are mostly interest and only slightly reduce what's owed.",
          "That ratio flips as the loan matures — later payments are mostly principal, since the remaining balance is smaller.",
          "An extra payment made early prevents interest across nearly the whole remaining term; the same amount made late has far fewer months left to save on.",
        ]}
      />
    </div>
  );
}
