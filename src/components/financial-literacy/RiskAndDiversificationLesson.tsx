import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard, CompareGrid, LabelRows } from "@/components/learn/primitives/Cards";
import { DiversificationOutcomes } from "@/components/financial-literacy/DiversificationOutcomes";

export function RiskAndDiversificationLesson() {
  return (
    <div>
      <Lead>
        Put every dollar into one company and your entire financial outcome depends on that one
        company&apos;s next year. Spread it across twenty and no single company&apos;s bad year
        can do that kind of damage — the risk hasn&apos;t disappeared, it has just changed shape.
      </Lead>

      <LessonSection id="risk-is-the-spread-of-outcomes-not-a-feeling-of-danger" title="Risk is the spread of outcomes, not a feeling of danger">
        <P>
          Ask someone to define risk and they usually reach for a synonym — danger, uncertainty,
          something bad happening. That&apos;s not what the word means to anyone actually pricing
          an investment. <Strong>Risk is the spread of outcomes</Strong> an investment could
          produce: how far the good years and the bad years sit from each other, not how alarming
          the word sounds in a sentence.
        </P>
        <P>
          A savings account paying 4% is low risk because its outcome is almost always 4%, full
          stop — the spread is nearly zero. A single stock is high risk not because it&apos;s
          &ldquo;dangerous&rdquo; in some vague sense, but because its one-year return could
          concretely land anywhere from an 80% loss to a 120% gain, and you don&apos;t know which
          until the year is already over. Same underlying idea, a wildly different band of
          possible outcomes.
        </P>
        <P>
          That band has a name — volatility — but you don&apos;t need the formula to use the idea.
          Wider band, riskier holding. Narrower band, safer one. Everything else in this chapter
          is about what does and doesn&apos;t narrow that band.
        </P>
      </LessonSection>

      <LessonSection id="concentration-means-one-bad-outcome-costs-everything" title="Concentration means one bad outcome costs everything">
        <P>
          Holding one stock means your return <Strong>is</Strong> that stock&apos;s return —
          whatever a single company&apos;s management, competitors, lawsuits, or bad quarter do to
          its price happens directly to your entire investment. A wonderful year is wonderful.
          A catastrophic one is catastrophic, with nothing else in the portfolio to absorb it.
        </P>
        <P>
          Put $10,000 into one company and a rough year that costs it 80% of its value leaves you
          with $2,000. There is no averaging, no other holding quietly having a decent year
          alongside it — the company&apos;s outcome and your outcome are the same number, because
          they are the same bet.
        </P>
        <P>
          This is also why holding a large amount of your employer&apos;s stock is riskier than it
          feels. Your paycheck already depends on that company doing well. Loading your
          investments with the same company&apos;s stock means a bad year for it can cost you your
          income and your savings at once, for the same underlying reason.
        </P>
      </LessonSection>

      <LessonSection id="correlation-is-whether-things-move-together" title="Correlation is whether things move together">
        <P>
          Before diversification can make sense, one more idea has to click: not all combinations
          of stocks are equally diversified, even when they&apos;re different companies.{" "}
          <Strong>Correlation</Strong> is just whether two things tend to move together — no
          algebra required, only the pattern.
        </P>
        <LabelRows
          rows={[
            {
              label: "Moves together",
              text: "Two cloud-software companies selling to the same corporate customers tend to have good quarters and bad quarters for the same reasons — a tightening tech budget hurts both at once.",
            },
            {
              label: "Moves apart",
              text: "An airline and an oil producer often move in opposite directions — a spike in oil prices raises the airline's costs while raising the producer's profits.",
            },
            {
              label: "Barely related",
              text: "A retailer's stock and a utility company's stock mostly respond to different pressures, so a bad month for one says little about the other.",
            },
          ]}
        />
        <P>
          Twenty stocks that are all positively correlated — say, twenty companies in the same
          industry, riding the same trend — behave a lot more like one big stock than twenty small
          ones. Real diversification needs holdings that don&apos;t rise and fall for the same
          reasons, which is a different requirement from simply owning &ldquo;a lot of
          companies.&rdquo;
        </P>
      </LessonSection>

      <LessonSection id="diversification-spreads-that-single-point-of-failure" title="Diversification spreads that single point of failure">
        <P>
          Diversification means holding many different investments so no single one can do that
          much damage. If one of twenty holdings has a disastrous year, it&apos;s one-twentieth of
          the portfolio, not the entire thing — and historically, on average, some other holding
          having a strong year has offset a meaningful part of that loss.
        </P>
        <P>
          The chart below runs the same idea thirty separate times. Each trial draws twenty
          companies from an identical, genuinely volatile world — one-year returns anywhere from
          an 80% loss to a 120% gain are on the table for any of them. Toggle between holding just
          the first company from each trial and holding the average of all twenty, and watch what
          happens to the range of outcomes.
        </P>
      </LessonSection>

      <DiversificationOutcomes />

      <LessonSection id="the-risk-you-cant-diversify-away" title="The risk you can't diversify away">
        <P>
          There are two different kinds of risk hiding inside &ldquo;risk,&rdquo; and only one of
          them responds to diversification. <Strong>Idiosyncratic risk</Strong> is specific to one
          company — a lawsuit, a product recall, a fraud, a bad management decision. Because these
          events are largely independent of each other, spreading across many companies genuinely
          cancels a lot of it out, which is exactly what the chart above shows.
        </P>
        <P>
          <Strong>Systematic risk</Strong> — also called market risk — is the part that hits
          nearly everything at once: a recession, a spike in interest rates, a war, a pandemic. In
          2008, broad stock indices fell by roughly half across nearly every industry and nearly
          every country simultaneously. Owning twenty companies instead of one did nothing to
          soften that, because the source of the risk was never any individual company to begin
          with.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "Diversification helps here",
              tone: "positive",
              children: (
                <P>
                  A single company&apos;s fraud, lawsuit, failed product, or leadership scandal —
                  events that happen to one holding without happening to the rest at the same time.
                </P>
              ),
            },
            {
              title: "Diversification can't help here",
              tone: "caution",
              children: (
                <P>
                  A recession, an interest-rate shock, a war, or any event that moves the entire
                  market at once — the whole basket is still made of stocks, and stocks fall
                  together in a broad downturn.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="diversification-doesnt-remove-risk-it-reshapes-it" title="Diversification doesn't remove risk, it reshapes it">
        <P>
          Toggle between the two views above and notice what actually changes: the best and worst
          single-year outcomes both move dramatically closer to the average once the outcomes are
          spread across twenty stocks instead of concentrated in one. That&apos;s the trade —
          diversification gives up the chance of an extraordinary single-stock win in exchange for
          taking the catastrophic single-stock loss off the table.
        </P>
        <P>
          It doesn&apos;t give up the market-wide swings underneath it. Spreading across many
          holdings tightens the band that idiosyncratic risk carves out, but the whole diversified
          basket can still fall 30% or 40% in a genuinely bad year for the market as a whole —
          it&apos;s just no longer at risk of falling to zero because one company failed.
        </P>
        <Callout tone="warning" title="Diversification doesn't protect against everything">
          Spreading across twenty stocks in the same industry, or the same country, still leaves
          you exposed to whatever risk they all share. Real diversification spans industries,
          company sizes, and asset types — which is exactly what a broad fund, covered next, is
          built to do in a single purchase.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Risk means the spread of possible outcomes, not a vague sense of danger — a wider spread is a riskier holding, whatever the word feels like.",
          "Holding a single stock means your entire return is that one company's outcome, for better or worse, with nothing else to absorb a bad year.",
          "Two holdings that rise and fall for the same reasons are correlated, and owning both adds far less diversification than owning two unrelated ones.",
          "Diversification cancels out risk specific to individual companies, but does nothing against a downturn that hits the whole market at once.",
          "Diversification reshapes risk rather than eliminating it — it narrows both the best-case and worst-case single-year outcomes toward the average.",
        ]}
      />
    </div>
  );
}
