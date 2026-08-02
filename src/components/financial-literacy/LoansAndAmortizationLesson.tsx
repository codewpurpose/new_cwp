import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { AmortizationSchedule } from "@/components/financial-literacy/AmortizationSchedule";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

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
        <P>
          Take a {formatCurrency(20000)} loan at {formatPercent(6)} APR over 60 months — the exact
          loan the schedule below runs. The fixed monthly payment works out to{" "}
          {formatCurrency(386.66, 2)}. In month one, interest is calculated on the full{" "}
          {formatCurrency(20000)} balance: {formatCurrency(20000)} × ({formatPercent(6)} ÷ 12) ={" "}
          {formatCurrency(100)}. The remaining {formatCurrency(286.66, 2)} of that payment is what
          actually reduces the balance. Nothing about the {formatCurrency(386.66, 2)} payment
          changed — only how it&apos;s divided.
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

      <LessonSection
        id="the-interest-share-falls-every-month-not-evenly"
        title="The interest share falls every month, not evenly"
      >
        <P>
          Interest&apos;s share of that {formatCurrency(386.66, 2)} payment doesn&apos;t creep down
          in a straight line — it falls fast at first and barely at all near the end, because it
          tracks a shrinking balance multiplied by a fixed rate.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: `Month 1 — interest is ${formatPercent(25.9, 1)} of the payment`,
              detail: `${formatCurrency(100)} interest, ${formatCurrency(286.66, 2)} principal, on a ${formatCurrency(19713.34, 2)} remaining balance.`,
            },
            {
              label: `Month 12 — interest is ${formatPercent(21.7, 1)} of the payment`,
              detail: `${formatCurrency(83.83, 2)} interest, ${formatCurrency(302.82, 2)} principal, on a ${formatCurrency(16463.94, 2)} remaining balance.`,
            },
            {
              label: `Month 24 — interest is ${formatPercent(16.9, 1)} of the payment`,
              detail: `${formatCurrency(65.16, 2)} interest, ${formatCurrency(321.50, 2)} principal, on a ${formatCurrency(12709.78, 2)} remaining balance.`,
            },
            {
              label: `Month 36 — interest is ${formatPercent(11.7, 1)} of the payment`,
              detail: `${formatCurrency(45.33, 2)} interest, ${formatCurrency(341.33, 2)} principal, on a ${formatCurrency(8724.07, 2)} remaining balance.`,
            },
            {
              label: `Month 48 — interest is ${formatPercent(6.3, 1)} of the payment`,
              detail: `${formatCurrency(24.27, 2)} interest, ${formatCurrency(362.38, 2)} principal, on a ${formatCurrency(4492.53, 2)} remaining balance.`,
            },
            {
              label: `Month 60 — interest is ${formatPercent(0.5, 1)} of the payment`,
              detail: `${formatCurrency(1.92, 2)} interest, ${formatCurrency(384.73, 2)} principal — the final payment clears the loan.`,
            },
          ]}
        />
      </LessonSection>

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

      <LessonSection id="what-one-extra-payment-a-year-actually-does" title="What one extra payment a year actually does">
        <P>
          The effect gets far more dramatic on a longer loan. Take a {formatCurrency(300000)}{" "}
          mortgage at {formatPercent(6)} APR over 30 years — a standard {formatCurrency(1798.65, 2)}{" "}
          monthly payment. Committing to one additional full payment every year, applied directly
          to principal, changes the shape of the whole loan.
        </P>
        <CompareGrid
          items={[
            {
              title: "No extra payments",
              tone: "neutral",
              children: (
                <>
                  <P>360 monthly payments — the full 30 years.</P>
                  <P>
                    Total interest paid over the life of the loan:{" "}
                    <Strong>{formatCurrency(347515)}</Strong> — more than the amount originally
                    borrowed.
                  </P>
                </>
              ),
            },
            {
              title: "One extra payment every year",
              tone: "positive",
              children: (
                <>
                  <P>
                    Paid off in 297 months — <Strong>24.8 years</Strong>, 5.3 years sooner, from
                    one extra payment a year and nothing else changed.
                  </P>
                  <P>
                    Total interest paid: <Strong>{formatCurrency(276591)}</Strong> — a saving of{" "}
                    {formatCurrency(70924)}, on the same loan, the same rate, the same regular
                    payment.
                  </P>
                </>
              ),
            },
          ]}
        />
        <P>
          One extra payment a year is thirteen payments instead of twelve — an 8.3% increase in
          what leaves your account annually, for a saving that&apos;s a much larger share of the
          total interest. That asymmetry is the same mechanic as a single early extra payment,
          just repeated every year instead of made once.
        </P>
        <Callout tone="note" title="A way to automate it without deciding every year">
          Switching from monthly to biweekly payments — half the monthly amount, paid every two
          weeks — quietly produces 26 half-payments a year, which works out to 13 full monthly
          payments instead of 12. The extra payment happens without ever having to choose to send
          it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Amortization splits a fixed loan payment into interest, calculated on the remaining balance, and principal, which actually pays down the loan.",
          "Because interest is calculated on the outstanding balance, early payments on any loan are mostly interest and only slightly reduce what's owed.",
          `That split moves fastest early and flattens out near the end — on a five-year, ${formatPercent(6)} loan, interest falls from ${formatPercent(25.9, 1)} of the payment in month one to under ${formatPercent(1, 0)} in the final month.`,
          "An extra payment made early prevents interest across nearly the whole remaining term; the same amount made late has far fewer months left to save on.",
          `One extra payment a year on a 30-year, ${formatCurrency(300000)} mortgage at ${formatPercent(6)} APR pays it off 5.3 years sooner and saves ${formatCurrency(70924)} in interest — from an 8.3% increase in annual payments.`,
        ]}
      />
    </div>
  );
}
