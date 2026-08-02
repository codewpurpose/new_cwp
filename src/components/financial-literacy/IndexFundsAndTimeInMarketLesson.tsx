import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard, CompareGrid } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
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
        <P>
          The alternative is an <Strong>actively managed</Strong> fund, where a manager and a
          research team pick a smaller set of companies they believe will beat the market, and
          charge more for the attempt. That&apos;s the entire distinction — passive funds copy the
          market, active funds try to beat it — and it turns out to matter enormously for what
          ends up in your account.
        </P>
      </LessonSection>

      <LessonSection id="the-arithmetic-that-most-active-funds-must-lose" title="The arithmetic that most active funds must lose">
        <P>
          Before any fees are charged, all the money invested in a market — indexed and actively
          managed alike — collectively <Strong>is</Strong> the market. That means the
          dollar-weighted average return across every active investor, before costs, has to equal
          the index return exactly. Some managers beat it and some lag it, but the average can&apos;t
          be anything other than the whole.
        </P>
        <P>
          Then costs get subtracted, and costs are not symmetric. An index fund&apos;s expense
          ratio commonly runs around 0.03% to 0.1% a year — it barely has a job to do beyond
          tracking a list. An actively managed fund typically charges somewhere between 0.5% and
          1%, on top of trading costs from buying and selling more often, a habit called{" "}
          <Strong>turnover</Strong>. Higher turnover also tends to generate more taxable events in
          a regular brokerage account, a cost an index fund&apos;s low turnover mostly avoids.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "Index fund",
              tone: "positive",
              children: (
                <P>
                  Roughly 0.03%–0.1% expense ratio. Low turnover, so fewer trading costs and fewer
                  taxable events along the way. Return is the market&apos;s return, minus almost
                  nothing.
                </P>
              ),
            },
            {
              title: "Actively managed fund",
              tone: "caution",
              children: (
                <P>
                  Roughly 0.5%–1% expense ratio, plus trading costs from higher turnover. Has to
                  beat the market by more than that gap just to match an index fund&apos;s
                  after-cost return.
                </P>
              ),
            },
          ]}
        />
        <P>
          That gap is the whole argument. Independent scorecards that track this every year
          consistently find that over any 15-year stretch, somewhere around 85% of actively
          managed US large-cap funds fail to beat the S&amp;P 500 itself — not because their
          managers are bad at picking stocks, but because the fee and turnover drag is a cost the
          index fund never has to pay back.
        </P>
        <RevealCard
          summaryTag="A fair question"
          summary="Doesn't that mean some active funds do beat the index — so why not just find one of those?"
          detailTag="The catch"
          detail="Some do, in any given year. The problem is picking one in advance, and having it keep winning. Studies that track the same funds forward find almost no persistence — this year's top-quartile active fund has close to a coin-flip's chance of being top-quartile again next year. Fund rankings you see are also usually built from funds that survived long enough to still exist, quietly dropping the ones that closed after underperforming, which flatters the average further."
          footnote="Picking the market's best day in advance and picking next decade's best fund in advance are the same problem wearing different clothes."
        />
      </LessonSection>

      <LessonSection id="time-in-the-market-beats-timing-the-market" title="Time in the market beats timing the market">
        <P>
          &ldquo;Timing the market&rdquo; means trying to buy right before it rises and sell right
          before it falls. It requires being right twice, repeatedly, for years — and the market&apos;s
          biggest single days routinely arrive during the most volatile stretches, often within
          days of the worst ones, which is exactly when a nervous investor is most likely to have
          already stepped out.
        </P>
        <P>
          A 1% annual fee sounds trivial, and by itself it is easy to wave off. Compounded over 30
          years at a hypothetical 7% average market return, though, the difference between paying
          it and not turns $10,000 into roughly $57,000 instead of roughly $76,000 — nearly
          $19,000 gone to a percentage point most people never look at on a statement. Trying to
          beat the market and merely matching it after fees produces a worse outcome than simply
          buying the market outright.
        </P>
      </LessonSection>

      <MissedDaysChart />

      <LessonSection id="missing-the-ten-best-days-changes-everything" title="Missing the ten best days changes everything">
        <P>
          Toggle between the two paths above. Ten trading days, out of thousands across a decade —
          a tiny fraction of the whole period — account for the entire gap between them.
          Nobody rings a bell on the best days in advance; the only way to guarantee you&apos;re
          invested on all of them is to stay invested on all of the days.
        </P>
        <Callout tone="note" title="The honest caveat">
          This isn&apos;t a coincidence you could dodge with a slightly smarter strategy. The
          market&apos;s worst days and its best days cluster together, in the same volatile
          stretches — a crash is usually followed within days or weeks by some of the sharpest
          rebounds on record. An investor who sells after the bad days to &ldquo;wait for
          safety&rdquo; is, by construction, exactly the person positioned to miss the best days
          when they arrive.
        </Callout>
        <Callout tone="success" title="The strategy that doesn't require predicting anything">
          Staying invested through the volatility, rather than trying to dodge it, is the version
          of this strategy available to literally everyone — no forecasting skill required.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "An index fund buys the entire market in proportion to a benchmark, rather than trying to pick individual winners.",
          "Before fees, the average active investor's return must equal the index return exactly, because active and passive money together make up the whole market.",
          "Active funds typically charge several times an index fund's fee and trade more often, which is a cost an index fund almost never pays.",
          "Around 85% of actively managed large-cap funds fail to beat the S&P 500 over a 15-year stretch, and this year's winning fund rarely stays a winner.",
          "The market's best days cluster right alongside its worst ones, so trying to dodge the bad days tends to mean missing the good ones too.",
        ]}
      />
    </div>
  );
}
