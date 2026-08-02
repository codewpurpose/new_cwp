import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { MinimumPaymentChart } from "@/components/financial-literacy/MinimumPaymentChart";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

export function TheCostOfCarryingABalanceLesson() {
  return (
    <div>
      <Lead>
        Missing the grace period once doesn&apos;t just cost you interest on this month&apos;s
        purchases. It hands the card issuer a balance that compounds daily, and a minimum payment
        formula engineered to keep that going for as long as legally possible.
      </Lead>

      <LessonSection id="apr-compounds-daily-on-most-cards" title="APR compounds daily on most cards">
        <P>
          Most cards quote an <Strong>APR</Strong> — annual percentage rate — but apply it as a
          <Strong> daily periodic rate</Strong>, roughly APR divided by 365, charged every single
          day against your current balance. A card at {formatPercent(22.99, 2)} APR is charging
          interest on interest constantly, not once a year — the same compounding mechanic that
          makes savings grow works identically in reverse against a carried balance.
        </P>
        <P>
          Work out the daily rate and it looks tiny on its own: {formatPercent(22.99, 2)} divided
          by 365 is about {formatPercent(0.063, 3)} a day, or {formatCurrency(0.63, 2)} of interest
          on a {formatCurrency(1000)} balance for a single day. Compound that daily rate for a full
          year, though, and the <Strong>effective</Strong> annual rate comes out to roughly{" "}
          {formatPercent(25.84, 2)} — nearly three full percentage points above the{" "}
          {formatPercent(22.99, 2)} printed on the card, purely because the interest is being
          calculated on interest every single day rather than once at year&apos;s end.
        </P>
      </LessonSection>

      <LessonSection id="the-minimum-payment-is-designed-to-be-slow" title="The minimum payment is designed to be slow">
        <P>
          A typical minimum payment formula is the greater of a flat floor — often $25 to $35 —
          or a small percentage of the balance, commonly 1 to 2%. That percentage is deliberately
          calibrated so that, after interest is added back, the balance shrinks only slightly each
          month. Card issuers are legally required to disclose how long paying only the minimum
          would take — the number is usually measured in years, not months, for exactly this
          reason.
        </P>
        <P>
          There is a second, quieter mechanic working against you: because the minimum is a{" "}
          <em>percentage</em> of the balance, it shrinks along with the balance. A balance that
          starts at {formatCurrency(1000)} might carry a minimum near {formatCurrency(35)}. Once
          interest has eaten away at the progress and the balance is down to {formatCurrency(700)},
          the minimum recalculates too — smaller, at the same percentage — which is part of why the
          final stretch of a minimum-only payoff takes so much longer than the first stretch.
        </P>
      </LessonSection>

      <MinimumPaymentChart />

      <LessonSection
        id="the-real-payoff-timeline-runs-years-past-a-single-chart"
        title="The real payoff timeline runs years past a single chart"
      >
        <P>
          The chart above stops at twelve months, because a year is long enough to see the shape
          of the problem. It is nowhere near long enough to see the end of it.
        </P>
        <RevealCard
          summaryTag="A $1,000 balance, minimum payments only"
          summary="How long does this actually take to clear, and what does it end up costing?"
          detailTag="Run to the end"
          detail={
            <>
              77 months — 6.4 years — to pay off a single {formatCurrency(1000)} balance making
              only minimum payments at {formatPercent(22.99, 2)} APR, assuming not one more dollar
              gets charged to the card in the meantime. Total interest paid along the way:{" "}
              {formatCurrency(915)}. Total paid, principal and interest combined:{" "}
              {formatCurrency(1915)} — nearly double the original purchase, on a card that never
              added a single new charge.
            </>
          }
          footnote="This is the number printed on the back of a real statement, in the box titled something like 'Minimum Payment Warning' — most people have never read it."
        />
        <LabelRows
          rows={[
            { label: "Minimum only", text: `77 months to clear ${formatCurrency(1000)}. ${formatCurrency(915)} in interest — almost as much as the original balance.` },
            { label: `${formatCurrency(100)} a month`, text: `12 months to clear the same ${formatCurrency(1000)}. About ${formatCurrency(121)} in interest — roughly an eighth of the minimum-only total.` },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-carrying-1000-actually-costs-over-a-year" title="What carrying $1,000 actually costs over a year">
        <P>
          The chart above runs the same {"$1,000"} balance two ways: minimum payments only, and a
          fixed, modestly higher payment. The minimum-only path barely dents the balance across a
          full year and pays real money in interest for the privilege. The fixed-payment path
          clears the debt entirely and pays a fraction of the interest — from the same starting
          balance, at the same rate.
        </P>
        <Callout tone="danger" title="The minimum payment is a floor, not a plan">
          Treat the minimum payment as the least you&apos;re legally required to send, never as
          the amount you&apos;re actually planning to pay. Any amount above it shortens the payoff
          dramatically, because so much of the minimum is consumed by interest in the first place.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          `Card interest is usually applied as a daily rate against the current balance, which turns a printed ${formatPercent(22.99, 2)} APR into an effective annual rate closer to ${formatPercent(25.84, 2)}.`,
          "Minimum payment formulas are calibrated to be small on purpose — a flat floor or 1-2% of the balance keeps repayment slow by design, and shrinks further as the balance does.",
          `A single ${formatCurrency(1000)} balance on minimum payments alone takes 77 months to clear and costs ${formatCurrency(915)} in interest — nearly doubling the original amount before it's paid off.`,
          `The same balance at a fixed ${formatCurrency(100)} a month clears in 12 months for about ${formatCurrency(121)} in interest, roughly an eighth of the minimum-only cost.`,
          "Treat the minimum payment as a legal floor, not a plan — paying more than it shortens the payoff far more than the extra dollar amount suggests.",
        ]}
      />
    </div>
  );
}
