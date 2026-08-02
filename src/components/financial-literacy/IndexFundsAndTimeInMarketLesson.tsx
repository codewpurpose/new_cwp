import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { MissedDaysChart } from "@/components/financial-literacy/MissedDaysChart";

export function IndexFundsAndTimeInMarketLesson() {
  return (
    <div>
      <Lead>
        Trying to dodge the market&apos;s worst days sounds like an obviously good idea. The
        problem is that nobody — not professional fund managers, not anyone — can reliably spot
        the worst days in advance, and the toggle below shows exactly what trying costs when it
        goes wrong.
      </Lead>

      <LessonSection id="an-index-fund-just-buys-the-whole-market" title="An index fund just buys the whole market">
        <P>
          An <Strong>index fund</Strong> doesn&apos;t try to pick winning companies — it simply
          buys all of them, in proportion to a benchmark like the S&amp;P 500, and holds them.
          There&apos;s no manager guessing which stock outperforms; the fund&apos;s return is just
          whatever the whole market did, minus a very small fee.
        </P>
      </LessonSection>

      <LessonSection id="time-in-the-market-beats-timing-the-market" title="Time in the market beats timing the market">
        <P>
          &ldquo;Timing the market&rdquo; means trying to buy right before it rises and sell right
          before it falls. It requires being right twice, repeatedly, for years — and the market&apos;s
          biggest single days routinely arrive during the most volatile stretches, often within
          days of the worst ones, which is exactly when a nervous investor is most likely to have
          already stepped out.
        </P>
      </LessonSection>

      <MissedDaysChart />

      <LessonSection id="missing-the-ten-best-days-changes-everything" title="Missing the ten best days changes everything">
        <P>
          Toggle between the two paths above. Ten trading days, out of thousands across a decade —
          a genuinely tiny fraction of the whole period — account for the entire gap between them.
          Nobody rings a bell on the best days in advance; the only way to guarantee you&apos;re
          invested on all of them is to stay invested on all of the days.
        </P>
        <Callout tone="success" title="The strategy that doesn't require predicting anything">
          Staying invested through the volatility, rather than trying to dodge it, is the version
          of this strategy available to literally everyone — no forecasting skill required.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "An index fund buys the entire market in proportion to a benchmark, rather than trying to pick individual winners.",
          "Timing the market requires being right about both an exit and a re-entry, repeatedly, which nobody has reliably managed over long periods.",
          "The market's best days cluster near its most volatile stretches — often within days of the worst ones — which is precisely when a nervous investor is likely to be out.",
          "Missing just the ten best trading days across a decade changes the ending balance dramatically, even though those days are a tiny fraction of the total.",
        ]}
      />
    </div>
  );
}
