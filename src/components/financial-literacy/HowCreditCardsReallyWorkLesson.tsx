import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StatementSimulator } from "@/components/financial-literacy/StatementSimulator";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

export function HowCreditCardsReallyWorkLesson() {
  return (
    <div>
      <Lead>
        Every swipe of a credit card is a short-term loan from the bank, due back in full at the
        end of the statement period. Pay it off inside that window and the loan is interest-free —
        one of the only ways to borrow money at 0% that&apos;s available to nearly everyone.
      </Lead>

      <LessonSection id="a-credit-card-is-a-short-term-loan-every-purchase" title="A credit card is a short-term loan, every purchase">
        <P>
          Swiping a card doesn&apos;t move your money — it moves the bank&apos;s money, on your
          behalf, with a promise to repay. Every purchase in a billing cycle gets bundled into one{" "}
          <Strong>statement balance</Strong> at the end of the month, and that single number is
          what determines what happens next.
        </P>
        <P>
          A billing cycle typically runs around 30 days, from one statement close to the next.
          Everything charged inside that window — the {formatCurrency(180)} of groceries on day 2,
          the {formatCurrency(425)} laptop accessory on day 24 — lands on the same statement and
          shares the same due date, regardless of when in the cycle it happened. A purchase made
          the day the cycle opens can get almost 60 days of interest-free credit before it&apos;s
          due; the same purchase made the day before the cycle closes gets barely 30.
        </P>
      </LessonSection>

      <LessonSection id="the-grace-period-is-the-entire-trick" title="The grace period is the entire trick">
        <P>
          The <Strong>grace period</Strong> is the window between your statement closing and your
          payment due date — typically around three weeks. Pay the full statement balance inside
          that window and no interest is ever charged on those purchases, no matter what the
          card&apos;s APR says. Miss it, even by paying most of the balance, and interest begins
          accruing on whatever&apos;s left.
        </P>
        <P>
          &ldquo;Missing it&rdquo; is more specific — and more expensive — than it sounds. Pay
          anything less than the full statement balance, and interest is typically calculated back
          to the date of each individual purchase, not from the missed due date forward. A{" "}
          {formatCurrency(425)} purchase made three weeks earlier doesn&apos;t start accruing
          interest today; it retroactively owes interest for every day since it was made.
        </P>
        <P>
          The second cost is easy to miss: new purchases made in the <em>next</em> billing cycle
          typically lose their grace period too, accruing interest immediately from the day
          they&apos;re made, until a full statement balance is paid off again from zero. One late
          or partial payment doesn&apos;t just cost interest on last month&apos;s purchases — it
          can cost the interest-free window on this month&apos;s as well.
        </P>
      </LessonSection>

      <StatementSimulator />

      <LessonSection id="why-the-statement-balance-and-the-current-balance-differ" title="Why the statement balance and the current balance differ">
        <P>
          Your <Strong>statement balance</Strong> is frozen the moment your billing cycle closes —
          it&apos;s what you owe for that period. Your <Strong>current balance</Strong> keeps
          moving as you make new purchases in the next cycle. Paying off the statement balance in
          full, not the current balance, is what keeps you inside the grace period — new purchases
          made after the statement closed have their own, later due date.
        </P>
        <Callout tone="tip" title="The habit that makes this automatic">
          Set autopay to &ldquo;pay statement balance in full&rdquo; rather than a fixed dollar
          amount. It adjusts every month and makes missing the grace period nearly impossible.
        </Callout>
      </LessonSection>

      <LessonSection
        id="how-the-minimum-payment-is-actually-calculated"
        title="How the minimum payment is actually calculated"
      >
        <P>
          Every statement lists a minimum payment, and it isn&apos;t an arbitrary number — it
          comes from a formula. A typical version is the greater of a flat floor, often{" "}
          {formatCurrency(25)} to {formatCurrency(35)}, or roughly 1% of the balance plus that
          month&apos;s interest and any fees.
        </P>
        <P>
          Work it on a {formatCurrency(2000)} balance at {formatPercent(24.99, 2)} APR: one
          month&apos;s interest is {formatCurrency(41.65, 2)}, and 1% of the balance is{" "}
          {formatCurrency(20)}. Add them and the minimum comes to roughly {formatCurrency(61.65, 2)}{" "}
          — a number that pays this month&apos;s interest in full and reduces the actual balance
          owed by only about {formatCurrency(20)}. Formulas vary by issuer, but the shape is
          consistent: the minimum is built to cover the interest first, with only a sliver left
          over for the balance itself.
        </P>
      </LessonSection>

      <LessonSection
        id="a-cash-advance-is-a-worse-loan-inside-the-same-card"
        title="A cash advance is a worse loan inside the same card"
      >
        <P>
          Withdrawing cash against a credit card looks like an ordinary card feature, and it is
          the one purchase type on the card that plays by none of the rules above. A cash advance
          has <Strong>no grace period at all</Strong> — interest starts accruing the moment the
          cash is withdrawn, even if the full balance gets paid off before the statement closes.
        </P>
        <P>
          It usually comes with two costs stacked on top of each other: an upfront fee, commonly
          the greater of {formatCurrency(10)} or around 5% of the amount withdrawn, and a separate,
          higher APR that applies from day one. A {formatCurrency(300)} cash advance at{" "}
          {formatPercent(29.99, 2)} APR, paid back in 25 days, costs about {formatCurrency(15)} in
          fees plus {formatCurrency(6.16, 2)} in interest that had already started — a total of
          roughly {formatCurrency(21.16, 2)} on a purchase that would have cost nothing on the same
          card if it had gone through as an ordinary swipe instead.
        </P>
        <Callout tone="danger" title="An ATM withdrawal on a credit card is almost never worth it">
          If cash is genuinely needed, a debit card draws from money already owned. A credit card
          cash advance draws from a loan with no grace period and an APR that&apos;s usually higher
          than the card&apos;s ordinary rate.
        </Callout>
      </LessonSection>

      <LessonSection
        id="deferred-interest-promotions-charge-for-the-whole-purchase"
        title="Deferred interest promotions charge for the whole purchase"
      >
        <P>
          &ldquo;0% for 18 months&rdquo; store financing sounds identical to the grace period
          already covered above. It isn&apos;t. A standard grace period forgives interest on
          whatever gets paid off in time. A <Strong>deferred interest</Strong> promotion forgives
          nothing — it postpones the entire calculation and charges it retroactively, on the full
          original purchase amount, the instant the promotional period ends with any balance left.
        </P>
        <P>
          A {formatCurrency(1200)} purchase financed at 0% for 18 months, with{" "}
          {formatCurrency(1150)} paid off and {formatCurrency(50)} still outstanding on day 540,
          doesn&apos;t owe interest on the leftover {formatCurrency(50)}. It owes interest on the
          entire {formatCurrency(1200)}, backdated to the day of purchase, at whatever the
          card&apos;s regular APR is — often {formatPercent(29.99, 2)} or higher. Worked out at
          that rate over 18 months, that backdated interest comes to about {formatCurrency(671)},
          on a plan that was marketed as free.
        </P>
        <LabelRows
          rows={[
            { label: "Grace period", text: "Forgives interest on whatever is paid off by the due date. Only the unpaid remainder ever accrues interest." },
            { label: "Deferred interest", text: "Forgives nothing — it postpones interest on the full original amount, charged in full if any balance remains at the deadline." },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A credit card purchase is a short-term loan from the bank, bundled with the rest of the month's purchases into one statement balance.",
          "The grace period — roughly three weeks between statement close and due date — is what makes paying in full interest-free, regardless of the card's APR.",
          "Missing the grace period charges interest retroactively from each purchase's date, and can strip the grace period from next cycle's purchases too, until a full balance is paid off again.",
          `A typical minimum payment is built to cover roughly one month's interest first, leaving only a sliver — on a ${formatCurrency(2000)} balance at ${formatPercent(24.99, 2)} APR, about ${formatCurrency(20)} of a ${formatCurrency(61.65, 2)} minimum actually reduces what's owed.`,
          `Cash advances lose the grace period entirely and add a fee on top, and a "0% for 18 months" deferred interest promotion charges interest on the full original amount, backdated, if anything is left owing at the deadline.`,
        ]}
      />
    </div>
  );
}
