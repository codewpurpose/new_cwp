import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";

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

      <LessonSection id="what-actually-comes-out-of-a-payslip" title="What actually comes out of a payslip">
        <P>
          Take a gross biweekly pay of {formatCurrency(2400)} — about {formatCurrency(62400)} a
          year — and look at what actually survives to the deposit that lands in your account.
        </P>
        <LabelRows
          rows={[
            { label: "Federal tax", text: `${formatCurrency(216)} withheld against the year's federal income tax bill — a running estimate, reconciled at filing.` },
            { label: "FICA", text: `${formatCurrency(184)} — Social Security (6.2%) and Medicare (1.45%) combined, funding programmes you draw on decades from now, not this year.` },
            { label: "State tax", text: `${formatCurrency(90)}, if your state taxes income at all — a handful don't.` },
            { label: "Insurance", text: `${formatCurrency(85)} for the employer-sponsored health plan premium, taken before tax.` },
            { label: "401(k)", text: `${formatCurrency(120)} — 5% of gross, if you're enrolled, routed straight into a retirement account before it ever reaches you.` },
            { label: "Net pay", text: `${formatCurrency(1705)} — the figure that actually lands, ${formatCurrency(695)} less than gross, before you've spent a cent of it.` },
          ]}
        />
        <P>
          Notice what all of that has in common: none of it required a decision from you on
          payday. It already happened by the time the deposit clears. That is exactly why a
          budget built on the gross number is fiction — it plans against money that was never
          available to plan with.
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
        <P>
          Most budgets fail on the variable side first, because it is where every small,
          reasonable-feeling decision lives. A {formatCurrency(6)} coffee doesn&apos;t register as
          a budget event. Twenty of them in a month, at {formatCurrency(120)}, does.
        </P>
      </LessonSection>

      <LessonSection id="the-irregular-expenses-that-actually-break-a-budget" title="The irregular expenses that actually break a budget">
        <P>
          Fixed and variable are the two categories most budgets track. There is a third that
          quietly wrecks more of them than either: <Strong>irregular</Strong> expenses. Real,
          predictable in the sense that they will happen, but not monthly — so nothing on a
          monthly budget prompts you to plan for them, and they land as a surprise every single
          time.
        </P>
        <ChecklistCard
          title="Expenses that are irregular, not optional"
          items={[
            `Annual car registration — ${formatCurrency(180)}, due once a year, ignored for the other eleven months`,
            `Semi-annual dental or eye-care copay — ${formatCurrency(120)} that never shows up as a monthly line item`,
            `December gift and travel spending — often ${formatCurrency(400)} or more in a single month`,
            "Annual software or membership renewals — the yearly plan you forgot you chose over the monthly one",
            "A quarterly or annual insurance premium paid in one lump sum instead of spread across the year",
            "Car and home maintenance that isn't due monthly, but is due eventually — a tyre, a repair, a filter",
          ]}
        />
        <Callout tone="warning" title="This is where a careful budget still fails">
          Divide that {formatCurrency(180)} registration by twelve and it was never actually
          zero — it was {formatCurrency(15)} a month, hidden instead of budgeted. A budget that
          only accounts for fixed and variable spending will look perfectly balanced for eleven
          months and then blow a hole in the twelfth. The fix isn&apos;t predicting the exact
          month; it&apos;s setting aside the monthly average for irregular spending as its own
          category,
          every month, whether or not anything comes due.
        </Callout>
      </LessonSection>

      <LessonSection id="tracking-for-one-month-changes-what-you-believe" title="Tracking for one month changes what you believe">
        <P>
          Write down every dollar that leaves your account for thirty days — not a plan, a
          record of what actually happened. Most people who do this for the first time find one
          category running 20 to 40% higher than they would have guessed, almost always somewhere
          variable: dining out, subscriptions nobody cancelled, small purchases that individually
          felt too small to matter.
        </P>
        <StepList
          steps={[
            {
              label: "Pick one method and commit to it",
              detail: "A notes app, a spreadsheet, or your bank's own categorisation — whichever you'll actually keep up for thirty straight days.",
            },
            {
              label: "Log every dollar as it leaves, not from memory later",
              detail: "A purchase logged the same day is accurate. A purchase reconstructed on day thirty is a guess wearing a spreadsheet.",
            },
            {
              label: "Sort into categories weekly",
              detail: "Drift is easy to catch in week two. By week five it's just how much you spent, with no idea where it went.",
            },
            {
              label: "Total each category at day thirty",
              detail: "Compare it to the number you would have guessed before you started. The gap is the actual finding.",
            },
          ]}
        />
        <Callout tone="tip" title="The point isn't guilt">
          A month of tracking is a measurement, not a verdict. You cannot decide what to change
          about your spending until you know, specifically, what it currently is.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Income is every dollar that arrives, and the number that matters for budgeting is net pay, not gross — deductions like FICA and a 401(k) contribution leave before you ever see the money.",
          "Fixed expenses repeat at a set amount and are hard to change quickly; variable expenses swing month to month and are where your control actually lives.",
          "Irregular expenses — a car registration, a December gift budget, a semi-annual insurance premium — are the ones that break an otherwise careful budget, because nothing monthly prompts you to plan for them.",
          "A single month of honestly tracking every expense usually reveals one category running 20 to 40% higher than believed.",
          "Tracking is a measurement, not a judgement — you can't fix spending you haven't actually measured.",
        ]}
      />
    </div>
  );
}
