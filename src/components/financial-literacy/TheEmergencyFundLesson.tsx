import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";
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
        <P>
          The comparison holds further than it first sounds. An insurer prices a policy by
          estimating how often the bad event happens and how much it costs when it does. Sizing
          your own fund is the same calculation, run against your own life instead of an actuarial
          table — which is exactly why the next section asks for your actual expenses, not a
          number pulled from a rule of thumb you found online.
        </P>
      </LessonSection>

      <LessonSection id="what-counts-as-an-emergency-and-what-doesnt" title="What counts as an emergency, and what doesn't">
        <P>
          The fund only works if the definition of &ldquo;emergency&rdquo; stays narrow. Loosen
          it and the balance quietly becomes a second discretionary account, which defeats the
          entire point of keeping one.
        </P>
        <CompareGrid
          items={[
            {
              title: "Emergency",
              tone: "caution",
              children: (
                <>
                  <P>A job loss or a sudden cut to income you can&apos;t easily replace.</P>
                  <P>A medical, dental, or veterinary bill that can&apos;t wait.</P>
                  <P>A car repair that&apos;s the only way you get to work.</P>
                  <P>An essential home repair — a furnace failing in January, a burst pipe.</P>
                </>
              ),
            },
            {
              title: "Not an emergency",
              tone: "neutral",
              children: (
                <>
                  <P>A sale ending today on something you weren&apos;t already planning to buy.</P>
                  <P>An annual expense you knew was coming and didn&apos;t plan for — that&apos;s a budgeting gap, not an emergency.</P>
                  <P>Wanting the newer version of something that still works.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="three-to-six-months-of-expenses-not-income" title="Three to six months of expenses, not income">
        <P>
          The standard target is <Strong>three to six months of essential expenses</Strong> — not
          income. Income is what you&apos;d lose; expenses are what you&apos;d actually need to
          keep covering while you looked for the next one. Someone earning {formatCurrency(5000)}{" "}
          a month but spending {formatCurrency(2800)} on essentials needs a fund sized to the{" "}
          {formatCurrency(2800)}, not the {formatCurrency(5000)}.
        </P>
        <P>
          Run that {formatCurrency(2800)} through the range and the target moves from{" "}
          {formatCurrency(8400)} at three months to {formatCurrency(16800)} at six. Where you land
          in that range depends on how replaceable your income is — a specialised salaried role
          with one employer usually justifies leaning toward six months; two income streams or a
          fast-hiring field can justify leaning toward three.
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
          the one job it had.
        </P>
        <LabelRows
          rows={[
            { label: "Checking", text: "No. It pays close to nothing, and blurring it into your everyday balance makes it too easy to spend without noticing." },
            { label: "Regular savings", text: "Acceptable. Liquid and safe, but at your everyday bank it often pays close to nothing too." },
            { label: "High-yield savings", text: "Best fit. FDIC insured, reachable in a day or two, and pays several times more than a standard account — the next chapter covers exactly why." },
            { label: "Money market", text: "A reasonable alternative — similar safety and rate to high-yield savings, sometimes with cheque-writing attached." },
            { label: "Investments or CDs", text: "No. The fund's value can't drop the week you need it, and a CD locks the money up for a set term you don't control." },
          ]}
        />
      </LessonSection>

      <LessonSection id="funding-it-before-or-after-high-interest-debt" title="Funding it before or after high-interest debt">
        <P>
          There is a genuine trade-off here, and the honest version doesn&apos;t pretend there
          isn&apos;t. A {formatCurrency(1000)} balance carried at 22% APR costs roughly{" "}
          {formatCurrency(220)} a year sitting there. A {formatCurrency(500)} starter fund earning
          4.5% APY earns about {formatCurrency(23)} a year. On the arithmetic alone, paying the
          debt down first wins by a wide margin — a guaranteed 22% return beats an optional 4.5%
          one every time.
        </P>
        <P>
          But arithmetic assumes nothing goes wrong while you&apos;re paying it off. With zero
          buffer, the next flat tyre or emergency-room copay goes straight back onto the same
          card, and the progress made paying it down evaporates in one bad week. That&apos;s the
          honest argument for a small starter fund before attacking the debt aggressively — not
          because the maths changed, but because a household with no buffer keeps re-borrowing at
          the same rate it&apos;s trying to escape.
        </P>
        <StepList
          steps={[
            {
              label: "Save a small starter fund first",
              detail: `${formatCurrency(500)} to ${formatCurrency(1000)} — enough to absorb one bad week without reaching for the card again.`,
            },
            {
              label: "Attack the high-interest debt",
              detail: "Every dollar beyond minimums, until the balance carrying the highest rate is gone.",
            },
            {
              label: "Build the fund the rest of the way",
              detail: "Three to six months of essential expenses, now that a repeat emergency won't reopen the debt you just closed.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "An emergency fund is insurance you pay yourself instead of a company, held for the month everything goes wrong at once.",
          "A real emergency is a job loss, a medical or urgent repair bill, or losing the thing that gets you to work — a sale ending or a planned expense you forgot to plan for doesn't qualify.",
          "Size it to three to six months of essential expenses, not income — those are usually very different numbers.",
          "It belongs in a high-yield savings account reachable in a day or two, never invested — a fund that can lose value the week you need it isn't doing its job.",
          "The honest sequence with high-interest debt is a small starter fund first, then the debt, then the rest of the fund — the maths favours the debt, but a household with no buffer just re-borrows at the same rate.",
        ]}
      />
    </div>
  );
}
