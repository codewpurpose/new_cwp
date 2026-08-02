import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { BudgetAllocator } from "@/components/financial-literacy/BudgetAllocator";

export function BuildingABudgetLesson() {
  return (
    <div>
      <Lead>
        A budget is not a spreadsheet you fill in once and check on New Year&apos;s. It is a
        decision, made before the money arrives, about where each dollar is going — and the
        version below fights back the moment the categories ask for more than you actually have.
      </Lead>

      <LessonSection id="a-budget-is-just-income-minus-planned-spending" title="A budget is just income minus planned spending">
        <P>
          Strip away the apps and the spreadsheets and a budget is one subtraction:{" "}
          <Strong>income minus planned spending equals what&apos;s left</Strong>. The entire
          discipline of budgeting is deciding the &ldquo;planned spending&rdquo; side{" "}
          <Strong>before</Strong> the month happens, instead of discovering it afterward on a bank
          statement.
        </P>
      </LessonSection>

      <LessonSection id="the-50-30-20-split-as-a-starting-point-not-a-rule" title="The 50/30/20 split as a starting point, not a rule">
        <P>
          One common starting ratio: roughly 50% of take-home pay toward needs, 30% toward wants,
          20% toward savings and debt paydown beyond the minimum. It is not a law — someone paying
          off high-interest debt might run 40/20/40, and someone in a high cost-of-living city
          might need 65% just for needs. Treat it as a first guess to adjust, not a target to hit
          exactly.
        </P>
      </LessonSection>

      <BudgetAllocator />

      <LessonSection id="what-happens-when-the-categories-dont-add-up" title="What happens when the categories don't add up">
        <P>
          Push any category up in the allocator above and watch the total climb until it passes
          income entirely — that&apos;s the moment a budget stops being a plan and starts being
          fiction. Real budgets hit this constantly: rent goes up, a category was underestimated,
          an irregular expense lands in a month that already looked full.
        </P>
        <Callout tone="warning" title="Something specific has to give">
          &ldquo;Spend less&rdquo; is not a plan. The fix is always a specific category, cut by a
          specific amount, this month — not a vague resolution to be more careful in general.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A budget is one subtraction — income minus planned spending — decided before the month happens, not reconstructed afterward.",
          "50/30/20 is a starting ratio to adjust to your own costs and goals, not a rule every budget must hit exactly.",
          "When categories add up to more than income, the budget has stopped describing reality — something specific has to come down.",
          "The fix for an over-budget month is always a named category cut by a named amount, never a vague plan to 'spend less'.",
        ]}
      />
    </div>
  );
}
