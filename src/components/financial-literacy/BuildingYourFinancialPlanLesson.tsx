import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";

export function BuildingYourFinancialPlanLesson() {
  return (
    <div>
      <Lead>
        Twenty-three chapters have each proven one idea in isolation — a budget, an emergency
        fund, a match, a bracket. None of them do much good sitting separately in your head. This
        chapter turns them into one page you&apos;ll actually look at again.
      </Lead>

      <LessonSection id="starting-with-where-the-money-already-goes" title="Starting with where the money already goes">
        <P>
          Before setting a single new goal, write down what&apos;s already true: your net monthly
          income, your fixed and variable expenses from a real tracked month, and your current
          balances — savings, debt, and any retirement accounts. A plan built on guessed numbers
          fails the same way a budget built on guessed expenses does.
        </P>
      </LessonSection>

      <LessonSection id="setting-one-goal-for-each-time-horizon" title="Setting one goal for each time horizon">
        <P>
          Pick exactly one goal per horizon, specific enough to check off. Trying to optimise
          everything at once is how a plan collapses under its own size within a week.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Short term (this year)",
              detail: "Usually: finish the emergency fund, or clear the highest-rate debt.",
            },
            {
              label: "Medium term (2 to 5 years)",
              detail: "Usually: a house down payment, a car replacement fund, or a career-building expense.",
            },
            {
              label: "Long term (5+ years)",
              detail: "Usually: retirement contributions at least matching the employer match, and beyond.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="the-one-page-plan-you-can-actually-maintain" title="The one-page plan you can actually maintain">
        <P>
          The plan itself should fit on one page: your budget split, your emergency fund target
          and current progress, your one goal per horizon, and the automatic transfers that move
          money toward each without a monthly decision. Revisit it after any real change — a raise,
          a move, a new debt — not on a fixed calendar that may not match when your numbers
          actually shift.
        </P>
      </LessonSection>

      <ChecklistCard
        title="Before you close this chapter"
        marker="check"
        items={[
          "Net monthly income and last month's actual expenses, written down from real numbers, not estimates.",
          "A budget split across needs, wants, and savings that adds up to your actual income.",
          "An emergency fund target in months of expenses, and where the current balance stands against it.",
          "One named goal for this year, one for the next few years, and one for the long term.",
          "Automatic transfers set up for savings and at least the full employer retirement match.",
          "A date to revisit this page — tied to your next real financial change, not just a fixed interval.",
        ]}
      />

      <TakeawayCard
        items={[
          "A financial plan starts with real numbers — actual income, actual tracked expenses, actual balances — not estimates.",
          "One specific goal per time horizon beats a long list that tries to optimise everything simultaneously.",
          "A plan that fits on one page and gets revisited after real changes gets used; a long document gets written once and forgotten.",
          "Every mechanism in this track — budgeting, saving, credit, debt, investing — only pays off once it's actually assembled into a plan you follow.",
        ]}
      />
    </div>
  );
}
