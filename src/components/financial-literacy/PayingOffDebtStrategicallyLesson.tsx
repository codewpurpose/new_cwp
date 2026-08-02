import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { PayoffRaceChart } from "@/components/financial-literacy/PayoffRaceChart";

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
      </LessonSection>

      <LessonSection id="the-snowball-method-attacks-the-smallest-balance-first" title="The snowball method attacks the smallest balance first">
        <P>
          <Strong>Snowball:</Strong> pay the minimum on every debt, then send every extra dollar to
          whichever balance is smallest, regardless of rate. It usually costs somewhat more in
          total interest, but it clears an entire debt off the list fastest — a visible finish
          line early on, which is what keeps a lot of people actually sticking with the plan for
          the debts still ahead.
        </P>
      </LessonSection>

      <PayoffRaceChart />

      <LessonSection id="the-math-favors-one-the-motivation-favors-the-other" title="The math favors one, the motivation favors the other">
        <P>
          The chart above runs both methods on the same three debts with the same monthly budget.
          Avalanche finishes with less interest paid, in most cases. Snowball clears its first debt
          sooner, which is a real, measurable effect on the odds that someone follows the plan all
          the way through.
        </P>
        <Callout tone="tip" title="Neither is the wrong answer">
          If you know you&apos;ll stick with a spreadsheet regardless of how it feels, avalanche
          saves real money. If early wins are what keep you going, snowball&apos;s small extra
          cost is often worth paying for a plan you actually finish.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Avalanche directs extra payments to the highest interest rate first, which minimises total interest paid across every debt.",
          "Snowball directs extra payments to the smallest balance first, clearing a full debt sooner at a modest interest cost.",
          "Both methods pay the same minimums on every other debt — they only differ in where the leftover budget goes.",
          "The right choice depends on you: avalanche wins on pure math, snowball often wins on follow-through.",
        ]}
      />
    </div>
  );
}
