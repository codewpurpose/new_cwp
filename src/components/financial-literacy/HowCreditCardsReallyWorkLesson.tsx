import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { StatementSimulator } from "@/components/financial-literacy/StatementSimulator";

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
      </LessonSection>

      <LessonSection id="the-grace-period-is-the-entire-trick" title="The grace period is the entire trick">
        <P>
          The <Strong>grace period</Strong> is the window between your statement closing and your
          payment due date — typically around three weeks. Pay the full statement balance inside
          that window and no interest is ever charged on those purchases, no matter what the
          card&apos;s APR says. Miss it, even by paying most of the balance, and interest begins
          accruing on whatever&apos;s left.
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

      <TakeawayCard
        items={[
          "A credit card purchase is a short-term loan from the bank, bundled with the rest of the month's purchases into one statement balance.",
          "The grace period — roughly three weeks between statement close and due date — is what makes paying in full interest-free, regardless of the card's APR.",
          "Paying less than the full statement balance, even by a small amount, forfeits the grace period and lets interest begin accruing.",
          "Statement balance is frozen at cycle close; current balance keeps moving — autopay should target the statement balance, not a fixed amount.",
        ]}
      />
    </div>
  );
}
