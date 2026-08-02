import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";
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
        <P>
          Put numbers on it. Net income of {formatCurrency(3000)} a month, categories that add up
          to {formatCurrency(2850)}, leaves {formatCurrency(150)}. That {formatCurrency(150)}{" "}
          isn&apos;t leftover luck — it&apos;s a category too, the same as rent or groceries,
          just one you assigned to savings or margin on purpose instead of by accident.
        </P>
      </LessonSection>

      <LessonSection id="a-budget-forecasts-a-record-just-remembers" title="A budget forecasts; a record just remembers">
        <P>
          The tracked month from the previous chapter and the budget you&apos;re building now
          look similar on a page — both are a list of categories with dollar amounts next to
          them — and it&apos;s easy to treat them as the same document. They aren&apos;t.
        </P>
        <CompareGrid
          items={[
            {
              title: "Record",
              tone: "neutral",
              children: (
                <>
                  <P>Built after the month, from what actually happened.</P>
                  <P>Answers &ldquo;what did I do?&rdquo; A tool for measuring, not deciding.</P>
                </>
              ),
            },
            {
              title: "Forecast",
              tone: "positive",
              children: (
                <>
                  <P>Built before the month starts, from what you&apos;ve decided will happen.</P>
                  <P>Answers &ldquo;what will I do?&rdquo; A tool for deciding, not observing.</P>
                </>
              ),
            },
          ]}
        />
        <Callout tone="note" title="Neither one replaces the other">
          A budget built with no record behind it is a guess dressed up as a plan — you&apos;re
          forecasting numbers you&apos;ve never actually measured. A record with no forecast in
          front of it is just a diary of what your money did to you, one month after it was too
          late to change anything. The two feed each other every month: last month&apos;s record
          becomes this month&apos;s starting forecast, then gets checked against next month&apos;s
          record.
        </Callout>
      </LessonSection>

      <LessonSection id="the-50-30-20-split-as-a-starting-point-not-a-rule" title="The 50/30/20 split as a starting point, not a rule">
        <P>
          One common starting ratio: roughly 50% of take-home pay toward needs, 30% toward wants,
          20% toward savings and debt paydown beyond the minimum. It is not a law — someone paying
          off high-interest debt might run 40/20/40, and someone in a high cost-of-living city
          might need 65% just for needs. Treat it as a first guess to adjust, not a target to hit
          exactly.
        </P>
        <P>
          On a {formatCurrency(3000)} net monthly income, that first guess reads as{" "}
          {formatCurrency(1500)} toward needs, {formatCurrency(900)} toward wants, and{" "}
          {formatCurrency(600)} toward savings and extra debt payments. Nobody is required to
          land on those exact figures — the value of running the split is finding out by how much,
          and in which direction, your actual numbers disagree with it.
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

      <LessonSection id="the-four-steps-to-a-first-real-budget" title="The four steps to a first real budget">
        <P>
          Assembling the first one is less about formulas than about doing the steps in an order
          that keeps it honest:
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "List net income for one month",
              detail: "Every paycheck and irregular source, using the net figure from a real payslip — never the gross one.",
            },
            {
              label: "List fixed and known irregular costs first",
              detail: "Rent, phone, insurance premiums, plus irregular expenses divided by twelve, so nothing arrives as a surprise.",
            },
            {
              label: "Estimate variable spending from a real tracked month",
              detail: "Use last month's actual numbers, not a hopeful guess — a budget built on a guess just gets rebuilt in three weeks.",
            },
            {
              label: "Check the total against income, then adjust one category at a time",
              detail: "If it doesn't add up, cut a named category by a named amount. Rerun it next month — the first draft is never the final one.",
            },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A budget is one subtraction — income minus planned spending — decided before the month happens, not reconstructed afterward.",
          "A budget forecasts what you've decided will happen; a record of tracked spending describes what already did. Mixing the two up turns a plan into a guess, or a diary into a decision nobody made.",
          "50/30/20 is a starting ratio to adjust to your own costs and goals, not a rule every budget must hit exactly.",
          "When categories add up to more than income, the budget has stopped describing reality — something specific has to come down.",
          "The fix for an over-budget month is always a named category cut by a named amount, never a vague plan to 'spend less'.",
        ]}
      />
    </div>
  );
}
