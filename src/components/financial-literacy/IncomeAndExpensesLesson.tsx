import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function IncomeAndExpensesLesson() {
  return (
    <div>
      <Lead>
        Ask most people what they earn and the number comes back instantly, to the dollar.
        Ask what they spent last month and the answer is a shrug and a guess. That asymmetry — not
        a low income, not high prices — is the actual reason so many budgets never survive contact
        with a real month.
      </Lead>

      <LessonSection id="income-is-everything-that-comes-in" title="Income is everything that comes in">
        <P>
          Income is every dollar that lands in your account, not just the number on an offer
          letter. A salary is the obvious one, but tips, freelance payments, a refund, interest
          from a savings account, and a birthday transfer from a grandparent all count. Two
          numbers matter more than one: your <Strong>gross</Strong> pay, before anything is taken
          out, and your <Strong>net</Strong> pay, what actually reaches your account after taxes
          and any withholdings.
        </P>
        <P>
          Budgets built on gross pay are budgets built on money you never actually get to spend.
          Every number in this track that assumes an income assumes net income unless it says
          otherwise.
        </P>
      </LessonSection>

      <LessonSection id="expenses-split-into-fixed-and-variable" title="Expenses split into fixed and variable">
        <CompareGrid
          items={[
            {
              title: "Fixed",
              tone: "neutral",
              children: (
                <>
                  <P>
                    The same amount, due on roughly the same date, whether or not you think about
                    it: rent, a phone plan, a subscription, a car payment.
                  </P>
                  <P>Easy to forecast. Hard to change quickly — most require a contract change.</P>
                </>
              ),
            },
            {
              title: "Variable",
              tone: "positive",
              children: (
                <>
                  <P>
                    Changes month to month based on choices you make in the moment: groceries,
                    fuel, takeout, entertainment.
                  </P>
                  <P>Harder to forecast, but the part of a budget you can actually change.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="tracking-for-one-month-changes-what-you-believe" title="Tracking for one month changes what you believe">
        <P>
          Write down every dollar that leaves your account for thirty days — not a plan, a
          record of what actually happened. Most people who do this for the first time find one
          category running 20 to 40% higher than they would have guessed, almost always somewhere
          variable: dining out, subscriptions nobody cancelled, small purchases that individually
          felt too small to matter.
        </P>
        <Callout tone="tip" title="The point isn't guilt">
          A month of tracking is a measurement, not a verdict. You cannot decide what to change
          about your spending until you know, specifically, what it currently is.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Income is every dollar that arrives, and the number that matters for budgeting is net pay, not gross.",
          "Fixed expenses repeat at a set amount and are hard to change quickly; variable expenses swing month to month and are where your control actually lives.",
          "A single month of honestly tracking every expense usually reveals one category running 20 to 40% higher than believed.",
          "Tracking is a measurement, not a judgement — you can't fix spending you haven't actually measured.",
        ]}
      />
    </div>
  );
}
