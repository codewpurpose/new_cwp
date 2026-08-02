import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CompoundGrowthChart } from "@/components/financial-literacy/CompoundGrowthChart";
import { formatCurrency } from "@/lib/finance-format";

export function CompoundInterestLesson() {
  return (
    <div>
      <Lead>
        &ldquo;Interest earning interest&rdquo; sounds like a rounding error until a chart makes
        it visible. Move the starting age ten years earlier below, and the exact same monthly
        contribution turns into a very different number by retirement — not because the rate
        changed, but because the money had longer to work.
      </Lead>

      <LessonSection id="interest-earning-interest-on-itself" title="Interest earning interest on itself">
        <P>
          Simple interest pays you a percentage of your original deposit, every period, forever.
          <Strong> Compound interest pays you a percentage of the current balance</Strong> —
          original deposit plus every dollar of interest already earned. That second calculation
          is why a balance doesn&apos;t grow in a straight line; it curves upward, slowly at
          first, because each year&apos;s interest is calculated on a slightly larger number than
          the year before.
        </P>
        <P>
          Put {formatCurrency(1000)} in at 7% simple interest and you earn {formatCurrency(70)}{" "}
          every single year, always calculated on the original {formatCurrency(1000)}. After
          twenty years that&apos;s {formatCurrency(1000)} plus twenty payments of{" "}
          {formatCurrency(70)}, or {formatCurrency(2400)} in total. Compound the same deposit at
          the same rate and year one still ends at {formatCurrency(1070)} — but year two&apos;s
          interest is calculated on {formatCurrency(1070)}, not {formatCurrency(1000)}, so it
          pays {formatCurrency(75)} instead of {formatCurrency(70)}. Carry that forward for twenty
          years and the compounded balance reaches {formatCurrency(3870)} — {formatCurrency(1470)}{" "}
          more than simple interest, from an identical rate and an identical deposit.
        </P>
        <P>
          Over three years the gap is tiny — {formatCurrency(1225)} compounded against{" "}
          {formatCurrency(1210)} simple, {formatCurrency(15)} apart. That is the &ldquo;rounding
          error&rdquo; the lead paragraph mentioned, and it is exactly why compounding is easy to
          underestimate the first time you meet it. The gap doesn&apos;t look like anything until
          the years pile up.
        </P>
      </LessonSection>

      <LessonSection
        id="the-rule-of-72-turns-a-rate-into-a-timeline"
        title="The rule of 72 turns a rate into a timeline"
      >
        <P>
          There is a shortcut for turning any interest rate into &ldquo;how long until this
          doubles,&rdquo; accurate enough to use without a calculator: divide 72 by the rate. At
          7%, 72 ÷ 7 is about 10.3 years. Work out the exact answer with the real compounding
          formula and it comes to 10.24 years — close enough that the shortcut earns its keep.
        </P>
        <LabelRows
          rows={[
            { label: "4% APR", text: "Rule of 72: 18 years to double. Worked out exactly: 17.7 years." },
            { label: "7% APR", text: "Rule of 72: 10.3 years to double. Worked out exactly: 10.2 years." },
            { label: "10% APR", text: "Rule of 72: 7.2 years to double. Worked out exactly: 7.3 years." },
          ]}
        />
        <P>
          The shortcut is most accurate in the 6% to 10% range most long-term savers actually
          earn. It gets sloppier at very high or very low rates, but as a way to size up a rate in
          your head — a 401(k) match, a savings APY, a credit card APR — nothing beats it for
          speed.
        </P>
      </LessonSection>

      <LessonSection id="the-same-monthly-amount-ten-years-earlier" title="The same monthly amount, ten years earlier">
        <P>
          The chart below runs two identical savers side by side: same monthly contribution, same
          7% average annual return, same retirement age. The only difference is when they started.
          Adjust the slider and watch both totals move together — but never by the same amount.
        </P>
        <P>
          Run the numbers once outside the chart, at its default setting. {formatCurrency(200)} a
          month at 7%, contributed for 40 years, becomes {formatCurrency(524963)}. The same{" "}
          {formatCurrency(200)} a month, at the same rate, contributed for only 30 years —
          starting ten years later and nothing else different — becomes{" "}
          {formatCurrency(243994)}. The difference is {formatCurrency(280968)}, which is larger
          than either saver&apos;s total contributions: {formatCurrency(96000)} against{" "}
          {formatCurrency(72000)}. The extra {formatCurrency(24000)} paid in over that decade
          explains a small slice of the gap. Compounding explains the rest.
        </P>
      </LessonSection>

      <CompoundGrowthChart />

      <LessonSection id="the-first-five-years-feel-like-nothing" title="The first five years feel like nothing" delay={0.05}>
        <P>
          This is the part that talks people out of starting. Early on, the balance looks almost
          exactly like the contributions — because at first, it is. Interest has barely had
          anything to work with yet.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: `Year 1 — balance ${formatCurrency(2479)}`,
              detail: `Contributed ${formatCurrency(2400)}. Growth so far: just ${formatCurrency(79)}.`,
            },
            {
              label: `Year 2 — balance ${formatCurrency(5136)}`,
              detail: `Contributed ${formatCurrency(4800)}. Growth so far: ${formatCurrency(336)} — still small next to the deposits.`,
            },
            {
              label: `Year 5 — balance ${formatCurrency(14319)}`,
              detail: `Contributed ${formatCurrency(12000)}. Growth so far: ${formatCurrency(2319)}.`,
            },
            {
              label: `Year 10 — balance ${formatCurrency(34617)}`,
              detail: `Contributed ${formatCurrency(24000)}. Growth so far: ${formatCurrency(10617)} — closing in, but contributions are still ahead.`,
            },
            {
              label: `Year 20 — balance ${formatCurrency(104185)}`,
              detail: `Contributed ${formatCurrency(48000)}. Growth so far: ${formatCurrency(56185)} — growth has now overtaken every dollar you put in.`,
            },
            {
              label: `Year 40 — balance ${formatCurrency(524963)}`,
              detail: `Contributed ${formatCurrency(96000)}. Growth: ${formatCurrency(428963)} — more than four dollars of growth for every dollar contributed.`,
            },
          ]}
        />
        <Callout tone="note" title="Somewhere between year ten and year twenty">
          The crossover isn&apos;t at the start, and it isn&apos;t subtle once it happens. Until
          then, a compounding plan looks — misleadingly — like it&apos;s barely doing anything
          beyond holding what you put in.
        </Callout>
      </LessonSection>

      <LessonSection id="why-the-rate-matters-less-than-the-runway" title="Why the rate matters less than the runway">
        <P>
          It is tempting to chase a higher rate to make up for a late start. Time is doing more of
          the work than the rate is — a decade of extra compounding routinely outweighs a
          percentage point or two of extra return, and chasing yield usually means taking on more
          risk than the decade of patience would have cost you.
        </P>
        <P>
          Put a number on it. Starting at 35 and reaching for 9% instead of 7% —{" "}
          {formatCurrency(200)} a month for 30 years — reaches {formatCurrency(366149)}. Starting
          at 25 at the ordinary 7% for 40 years still beats it, at {formatCurrency(524963)}. Two
          extra percentage points of return, which usually means meaningfully more risk, still
          loses to ten extra years of an unremarkable rate.
        </P>
        <Callout tone="success" title="The one lever available to everyone">
          You cannot go back and start ten years earlier. You can start today instead of next
          year, and today is the earliest this particular chart will ever let you start again.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-same-maths-runs-in-reverse-on-debt"
        title="The same maths runs in reverse on debt"
      >
        <P>
          Compounding doesn&apos;t check whether the balance is helping you or hurting you — it
          applies exactly the same way to a debt left untouched. A {formatCurrency(5000)} credit
          card balance at 24% APR, compounding monthly with no payments and no new charges,
          doesn&apos;t grow by {formatCurrency(1200)} a year the way simple interest would suggest.
          It doubles. Run the rule of 72 the other direction: 72 ÷ 24 is 3. Left completely
          alone, that {formatCurrency(5000)} becomes {formatCurrency(10000)} in exactly three
          years — the identical mechanism that turned a decade of savings into an extra{" "}
          {formatCurrency(280968)}, now running against you.
        </P>
        <P>
          No real card sits untouched for three years — minimum payments slow this down, which is
          the entire subject of the next two lessons in this track. But the direction of the
          maths doesn&apos;t change: a balance you don&apos;t pay down compounds exactly as
          reliably as a balance you do save into. It has no opinion about which one you meant.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          `Compound interest calculates each period's interest on the balance so far, not the original deposit — over 20 years that turns an identical ${formatCurrency(1000)} at 7% into ${formatCurrency(3870)} instead of the ${formatCurrency(2400)} simple interest produces.`,
          "Dividing 72 by an interest rate gives a doubling time accurate to a few months either way — at 7% that's about 10.3 years, close enough to plan around without a calculator.",
          `${formatCurrency(200)} a month at 7% starting ten years earlier is worth ${formatCurrency(280968)} more at the finish line than starting late, even though the early saver only contributed ${formatCurrency(24000)} more.`,
          "The first five to ten years of a compounding plan barely move the balance beyond what was contributed — growth only overtakes contributions somewhere between year ten and year twenty, which is exactly when most people give up on it.",
          `The same mechanism runs in reverse on debt — a ${formatCurrency(5000)} balance at 24% APR, left untouched, doubles in three years, because compounding doesn't care which direction it's working.`,
        ]}
      />
    </div>
  );
}
