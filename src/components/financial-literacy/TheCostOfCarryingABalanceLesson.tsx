import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { MinimumPaymentChart } from "@/components/financial-literacy/MinimumPaymentChart";
import { formatPercent } from "@/lib/finance-format";

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
      </LessonSection>

      <MinimumPaymentChart />

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
          "Card interest is usually applied as a daily rate against the current balance, so it compounds far more often than the word 'annual' suggests.",
          "Minimum payment formulas are calibrated to be small on purpose — a flat floor or 1-2% of the balance keeps repayment slow by design.",
          "The same $1,000 balance can cost real money in interest paid over a minimum-only year, or a fraction of that paid off with a modestly higher fixed payment.",
          "Treat the minimum payment as a legal floor, not a plan — paying more than it shortens the payoff far more than the extra dollar amount suggests.",
        ]}
      />
    </div>
  );
}
