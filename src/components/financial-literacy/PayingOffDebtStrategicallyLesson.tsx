import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { PayoffRaceChart } from "@/components/financial-literacy/PayoffRaceChart";
import { formatCurrency } from "@/lib/finance-format";

export function PayingOffDebtStrategicallyLesson() {
  return (
    <div>
      <Lead>
        Multiple debts and one monthly budget raises an actual question: which one gets the extra
        dollar? Two answers are both defensible, and they optimise for two different things —
        total cost, and whether you actually finish.
      </Lead>

      <LessonSection id="the-avalanche-method-attacks-the-highest-rate-first" title="The avalanche method attacks the highest rate first">
        <P>
          <Strong>Avalanche:</Strong> pay the minimum on every debt, then send every extra dollar
          to whichever balance carries the highest interest rate. Once that one&apos;s gone, roll
          its entire payment into the next-highest rate, and so on. This minimises total interest
          paid, mathematically, every time — the highest rate is where each extra dollar prevents
          the most future interest.
        </P>
        <P>
          The logic doesn&apos;t depend on the size of any particular balance. A $1,200 card at
          19% APR and a $5,000 loan at 12% APR both accrue interest every single month regardless
          of how you feel about them; avalanche just always points the spare dollar at whichever
          one is currently the most expensive to be carrying.
        </P>
      </LessonSection>

      <LessonSection id="the-snowball-method-attacks-the-smallest-balance-first" title="The snowball method attacks the smallest balance first">
        <P>
          <Strong>Snowball:</Strong> pay the minimum on every debt, then send every extra dollar to
          whichever balance is smallest, regardless of rate. It usually costs somewhat more in
          total interest, but it clears an entire debt off the list fastest — a visible finish
          line early on, which is what keeps a lot of people actually sticking with the plan for
          the debts still ahead.
        </P>
        <P>
          That&apos;s not a hand-wave. Behavioural research on debt payoff consistently finds that
          closing an account entirely — not just shrinking it — is what people report as
          motivating, in a way that a slightly smaller balance on three still-open accounts
          isn&apos;t. Snowball is a plan built around that fact, deliberately, rather than around
          the spreadsheet math avalanche optimises for.
        </P>
      </LessonSection>

      <PayoffRaceChart />

      <LessonSection id="the-math-favors-one-the-motivation-favors-the-other" title="The math favors one, the motivation favors the other">
        <P>
          The chart above runs both methods on the same three debts — two cards and a personal
          loan, {formatCurrency(9200)} total — against the same {formatCurrency(400)} monthly
          budget. Here are the actual numbers behind it, not just the shape of the lines.
        </P>
        <CompareGrid
          items={[
            {
              title: "Avalanche",
              tone: "positive",
              children: (
                <>
                  <P>Total interest paid: {formatCurrency(1790)}.</P>
                  <P>First debt cleared: month 17 (Card A, the 24% APR card).</P>
                  <P>Fully debt-free: month 28.</P>
                </>
              ),
            },
            {
              title: "Snowball",
              tone: "neutral",
              children: (
                <>
                  <P>Total interest paid: {formatCurrency(1863)}.</P>
                  <P>First debt cleared: month 9 (Card B, the smallest balance).</P>
                  <P>Fully debt-free: month 28.</P>
                </>
              ),
            },
          ]}
        />
        <P>
          Snowball costs about {formatCurrency(73)} more in total interest over the entire
          payoff — a genuinely small amount, spread across more than two years — in exchange for
          closing an entire account eight months sooner. Both plans reach zero in the same 28th
          month here, which is worth noticing on its own: the total time to debt-free doesn&apos;t
          always diverge as much as people assume. What actually differs between the two methods
          is the interest total and which debt disappears first, not necessarily how long the
          whole thing takes.
        </P>
        <Callout tone="tip" title="Neither is the wrong answer">
          If you know you&apos;ll stick with a spreadsheet regardless of how it feels, avalanche
          saves real money. If early wins are what keep you going, snowball&apos;s modest extra
          cost is often worth paying for a plan you actually finish. {formatCurrency(73)} to buy
          eight months of visible progress is a trade a lot of people would happily make on
          purpose — the mistake is only in not knowing you&apos;re making it.
        </Callout>
      </LessonSection>

      <LessonSection id="refinancing-and-consolidation-and-where-each-goes-wrong" title="Refinancing and consolidation, and where each goes wrong">
        <P>
          Avalanche and snowball both assume the debts themselves stay fixed and only the payment
          order changes. Two other moves change the debts instead — and both can genuinely help,
          or genuinely backfire, depending on the fine print.
        </P>
        <P>
          <Strong>Refinancing</Strong> replaces an existing loan with a new one, usually to get a
          lower rate. It goes wrong in a specific way: refinancing resets the clock. A car loan
          three years into a five-year term has already paid down most of its early, interest-heavy
          months; refinancing into a fresh five-year term at a lower rate can still mean paying
          <em> more</em> total interest, because you&apos;ve restarted the part of the schedule
          where payments are mostly interest. On federal student loans specifically, refinancing
          into a private loan is a one-way door — it permanently forfeits income-driven repayment
          and forgiveness eligibility that the federal loan carried, in exchange for a rate that
          may only be marginally better.
        </P>
        <P>
          <Strong>Consolidation</Strong> combines several debts — usually credit cards — into one
          loan or one balance-transfer card. The failure mode here is behavioural rather than
          mathematical: the old cards get paid to zero but stay open, and it is very easy to run
          them back up while also paying down the new consolidation loan, ending up with more
          total debt than before. A 0% balance-transfer offer adds a second trap — a
          {" "}3% transfer fee upfront ({formatCurrency(150)} on a {formatCurrency(5000)} balance)
          is real interest even during the &ldquo;0%&rdquo; window, and whatever balance is left
          when the 18-month promotional period ends reverts to a standard APR, often above 20%.
        </P>
        <StepList
          steps={[
            {
              label: "Compare the new rate to your current weighted-average rate, after fees.",
              detail: "An origination fee or transfer fee can erase a rate cut that looks good on paper.",
            },
            {
              label: "Check whether the term resets.",
              detail: "A lower monthly payment on a longer term can mean more total interest, not less.",
            },
            {
              label: "If it's a federal student loan, confirm what protections you'd be giving up.",
              detail: "Income-driven repayment and forgiveness eligibility don't come back once you refinance to private.",
            },
            {
              label: "Decide what happens to the old accounts before you consolidate.",
              detail: "A paid-off card that stays open and unused is fine. A paid-off card you keep spending on is a second debt stacked on the first.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Avalanche directs extra payments to the highest interest rate first, which minimises total interest paid across every debt.",
          "Snowball directs extra payments to the smallest balance first, clearing a full debt sooner at a modest interest cost — about $73 more, here, for a debt closed eight months earlier.",
          "Both methods pay the same minimums on every other debt — they only differ in where the leftover budget goes, and the total payoff time can end up identical either way.",
          "Refinancing that resets a loan's term can raise total interest even at a lower rate, and refinancing a federal student loan into a private one is not reversible.",
          "Consolidation only helps if the old accounts stay closed in practice — a paid-off card that gets spent on again turns one debt into two.",
        ]}
      />
    </div>
  );
}
