import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { EmergencyFundCalculator } from "@/components/financial-literacy/EmergencyFundCalculator";

export function TheEmergencyFundLesson() {
  return (
    <div>
      <Lead>
        An emergency fund never earns much, sits in a boring account, and — if it&apos;s doing its
        job — mostly just sits there. That&apos;s not a design flaw. Its entire job is to exist
        for the one month it&apos;s the only thing standing between a job loss and a credit card
        balance you&apos;ll be paying off for years.
      </Lead>

      <LessonSection id="an-emergency-fund-is-insurance-you-self-underwrite" title="An emergency fund is insurance you self-underwrite">
        <P>
          Insurance trades a small certain cost for protection against a large uncertain one — a
          later chapter covers that trade in full. An emergency fund is the version of that trade
          you run yourself: instead of paying a company a premium, you pay yourself one, into an
          account you don&apos;t touch until the roof leaks or the job ends.
        </P>
      </LessonSection>

      <LessonSection id="three-to-six-months-of-expenses-not-income" title="Three to six months of expenses, not income">
        <P>
          The standard target is <Strong>three to six months of essential expenses</Strong> — not
          income. Income is what you&apos;d lose; expenses are what you&apos;d actually need to
          keep covering while you looked for the next one. Someone earning $5,000 a month but
          spending $2,800 on essentials needs a fund sized to the $2,800, not the $5,000.
        </P>
        <Callout tone="note" title="Essential means essential">
          Rent, groceries, utilities, insurance, minimum debt payments. Leave out the streaming
          subscriptions and the takeout — those are the first things you&apos;d cut anyway if the
          fund were ever actually in use.
        </Callout>
      </LessonSection>

      <EmergencyFundCalculator />

      <LessonSection id="where-it-should-live-while-it-waits" title="Where it should live while it waits">
        <P>
          An emergency fund belongs in a savings account you can reach within a day or two, not
          in the market. The point of the fund is that it&apos;s there exactly when everything
          else is going wrong, and a fund that&apos;s down 15% the week you need it has failed at
          the one job it had. The next chapter covers what that account is actually doing for you
          while it waits.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "An emergency fund is insurance you pay yourself instead of a company, held for the month everything goes wrong at once.",
          "Size it to three to six months of essential expenses, not income — those are usually very different numbers.",
          "Essential means rent, groceries, utilities, insurance, and minimum debt payments, not your current lifestyle in full.",
          "It belongs in a savings account reachable in a day or two, never invested — a fund that can lose value isn't doing its job.",
        ]}
      />
    </div>
  );
}
