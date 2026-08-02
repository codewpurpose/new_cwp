import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { ChecklistCard, TakeawayCard, LabelRows } from "@/components/learn/primitives/Cards";

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
        <P>
          This is deliberately the least exciting part of the whole track, and skipping it is the
          single most common reason a financial plan gets abandoned within a month. A goal built on
          top of a number you made up doesn&apos;t fail because the goal was wrong — it fails
          because the foundation underneath it was never real to begin with.
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

      <LessonSection id="what-to-actually-do-this-week" title="What to actually do this week">
        <P>
          A plan that stays theoretical for months never gets tested against a real month. Here is
          a version of the exercise above broken into seven concrete actions, each one pulling from
          an earlier chapter, each one small enough to actually finish in a day.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Day 1 — pull the real numbers",
              detail: "Total last month's actual income and spending from your statements, not from memory.",
            },
            {
              label: "Day 2 — build the split",
              detail: "Sort those real numbers into needs, wants, and savings, and see whether they add up to what you actually earn.",
            },
            {
              label: "Day 3 — check the emergency fund",
              detail: "Divide the current balance by one month's real expenses to see how many months of coverage you actually have.",
            },
            {
              label: "Day 4 — check the match",
              detail: "Confirm you're contributing enough to a retirement account to claim the full employer match, and increase it if not.",
            },
            {
              label: "Day 5 — check credit and cards",
              detail: "Pull your credit report for errors, and confirm autopay is on for at least the statement balance on every card.",
            },
            {
              label: "Day 6 — name one goal per horizon",
              detail: "Write down the short-, medium-, and long-term goal from the previous section in specific, checkable terms.",
            },
            {
              label: "Day 7 — assemble the page",
              detail: "Put everything from this week onto the one page below, and set a reminder to revisit it after your next real change.",
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
        <P>
          One page is the point, not a limitation. A plan that needs a spreadsheet with twelve tabs
          to understand is a plan that only gets opened once, on the day it was built. A single page
          gets opened again — on a bad month, before a big purchase, the week a raise comes through
          — which is the only way any of this compounds the way the earlier chapters showed it can.
        </P>
      </LessonSection>

      <LessonSection id="what-this-track-didnt-cover" title="What this track didn't cover">
        <P>
          Twenty-four chapters is enough to build the instincts, not enough to cover everything
          money touches. Some real topics were deliberately left out, and knowing what they are is
          part of finishing this honestly rather than pretending the plan above is the whole
          picture.
        </P>
        <LabelRows
          rows={[
            {
              label: "Mortgages",
              text: "Buying a home involves a down payment, a mortgage structure, and closing costs that deserve their own deep dive when you're actually shopping, not a paragraph here.",
            },
            {
              label: "Self-employment",
              text: "Quarterly estimated payments, business deductions, and payroll taxes follow different rules than a single employer paycheck.",
            },
            {
              label: "Wills & estates",
              text: "Deciding where your money and belongings go after you're gone is a real gap in this track, and it doesn't require significant wealth to start being relevant.",
            },
            {
              label: "Picking investments",
              text: "This track taught what a stock, bond, and index fund are — not which specific fund to buy. That decision is worth researching on its own, or asking a fee-only planner about, once the amount at stake justifies it.",
            },
            {
              label: "Local rules",
              text: "Tax brackets, retirement account names, and credit systems vary by country and by state. The mechanisms in this track transfer everywhere; the exact numbers do not.",
            },
          ]}
        />
        <P>
          None of that is a reason to wait on the plan above. It&apos;s a reason to treat this track
          as a foundation you keep building on, not a finished structure.
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
          "Breaking the plan into seven small, specific actions gets it built this week, instead of staying a good intention indefinitely.",
          "A plan that fits on one page and gets revisited after real changes gets used; a long document gets written once and forgotten.",
          "This track built the instincts, not a complete map — mortgages, self-employment, estate planning, and specific investment choices are real gaps worth learning next, when they become relevant.",
        ]}
      />
    </div>
  );
}
