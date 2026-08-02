import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CompoundGrowthChart } from "@/components/financial-literacy/CompoundGrowthChart";

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
      </LessonSection>

      <LessonSection id="the-same-monthly-amount-ten-years-earlier" title="The same monthly amount, ten years earlier">
        <P>
          The chart below runs two identical savers side by side: same monthly contribution, same
          7% average annual return, same retirement age. The only difference is when they started.
          Adjust the slider and watch both totals move together — but never by the same amount.
        </P>
      </LessonSection>

      <CompoundGrowthChart />

      <LessonSection id="why-the-rate-matters-less-than-the-runway" title="Why the rate matters less than the runway">
        <P>
          It is tempting to chase a higher rate to make up for a late start. Time is doing more of
          the work than the rate is — a decade of extra compounding routinely outweighs a
          percentage point or two of extra return, and chasing yield usually means taking on more
          risk than the decade of patience would have cost you.
        </P>
        <Callout tone="success" title="The one lever available to everyone">
          You cannot go back and start ten years earlier. You can start today instead of next
          year, and today is the earliest this particular chart will ever let you start again.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Compound interest pays you on your original deposit plus every dollar of interest already earned, which is why balances curve upward rather than climb in a straight line.",
          "Starting ten years earlier at the same contribution and rate produces a meaningfully larger balance — the chart above shows exactly how much, at every contribution level.",
          "An extra decade of compounding typically outweighs an extra percentage point or two of return, which makes runway more valuable than rate for most savers.",
          "The rate is out of your control day to day; the start date is the one lever you actually get to pull, and today is the earliest it can still be.",
        ]}
      />
    </div>
  );
}
