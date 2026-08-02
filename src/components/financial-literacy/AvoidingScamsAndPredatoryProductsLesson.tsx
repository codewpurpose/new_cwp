import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { formatCurrency } from "@/lib/finance-format";

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
        <P>
          The two tells work together on purpose. Urgency shrinks the window to think; secrecy
          removes the people who&apos;d normally help you think in that window. Either one alone
          is a yellow flag. Both together, on the same offer, is close to a guarantee — no
          legitimate lender or investment needs you isolated <em>and</em> rushed to make a good
          decision on their behalf.
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
        <P>
          Do the arithmetic once and the number stops sounding abstract. Borrow {formatCurrency(300)}{" "}
          for two weeks at a typical $15-per-$100 fee, and the fee alone is {formatCurrency(45)} —
          which annualizes to roughly 391% APR, because a fee sized for two weeks gets multiplied
          out across a full year. Miss the deadline and roll it over three times, which is
          common, and that same {formatCurrency(300)} loan has cost {formatCurrency(135)} in fees
          in six weeks — more than a normal personal loan would charge in interest over an entire
          year, on a fraction of the balance.
        </P>
      </LessonSection>

      <LessonSection id="rent-to-own-and-the-advance-fee-trick" title="Rent-to-own and the advance-fee trick">
        <P>
          <Strong>Rent-to-own</Strong> advertises furniture, appliances, or electronics with
          &ldquo;no credit check&rdquo; and a small weekly payment, which sounds nothing like a
          loan. It is one, priced worse than almost any loan you&apos;d otherwise qualify for. A
          sofa that retails for {formatCurrency(900)} cash might rent for {formatCurrency(40)} a
          week over 78 weeks — {formatCurrency(3120)} total, more than three times the retail
          price, for an item you don&apos;t fully own until the very last payment clears. Miss
          enough payments along the way and the store can repossess it, keeping every payment
          made so far.
        </P>
        <P>
          The <Strong>advance-fee</Strong> pattern shows up everywhere from loans to apartments to
          lottery winnings: pay a fee upfront, before any money or item you were promised has
          actually arrived. &ldquo;We&apos;ll approve your {formatCurrency(5000)} loan once you wire a{" "}
          {formatCurrency(250)} processing fee&rdquo; is the loan version. A legitimate lender
          deducts its fees from the loan proceeds you actually receive — it never asks for a
          separate payment, sent before any money has changed hands, to release funds that may not
          exist.
        </P>
      </LessonSection>

      <LessonSection id="the-same-tricks-in-a-browser-tab-now" title="The same tricks, in a browser tab now">
        <P>
          The tells don&apos;t change online. Only the medium does — a phone call becomes a text
          message, a stranger at your door becomes a stranger in a group chat, and the payment
          method shifts to something even harder to trace or reverse than a wire transfer.
        </P>
        <LabelRows
          rows={[
            {
              label: "Urgency",
              text: "A text claiming your bank account will be frozen in one hour unless you click a link and re-enter your PIN.",
            },
            {
              label: "Secrecy",
              text: "A “trader” in an investing group chat says to keep the opportunity private until you’ve “proven you can follow instructions.”",
            },
            {
              label: "Guaranteed profit",
              text: "A crypto trading dashboard showing fabricated daily gains, shown only after you deposit more.",
            },
            {
              label: "Untraceable payment",
              text: "A caller posing as a tax agency demands payment by gift card codes read aloud, or by a QR code at a crypto ATM.",
            },
          ]}
        />
        <P>
          None of these are new scams wearing new clothes so much as the exact same four tells
          from the first section, run through a medium that makes them faster to send, harder to
          trace, and easier to send to thousands of people at once at zero marginal cost. The
          checklist below catches the online versions exactly as well as it catches the phone
          call.
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
            "A fee requested before any loan, prize, or item has actually been delivered to you.",
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
          "Payday loans are structured around short repayment windows and rollover fees that assume most borrowers can't repay on time — one $300 loan rolled over three times can cost $135 in fees alone.",
          "Rent-to-own routinely costs two to three times an item's retail price, and the advance-fee pattern always asks for money before you've received anything.",
          "A rate that isn't stated as a clear, comparable APR is a red flag by itself, whatever else the offer promises.",
          "Online scams use the same urgency-and-secrecy playbook as phone and door-to-door ones — the medium changed, the tells didn't.",
        ]}
      />
    </div>
  );
}
