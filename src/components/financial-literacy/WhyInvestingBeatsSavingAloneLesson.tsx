import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { InflationVsGrowthChart } from "@/components/financial-literacy/InflationVsGrowthChart";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

export function WhyInvestingBeatsSavingAloneLesson() {
  return (
    <div>
      <Lead>
        Cash that just sits doesn&apos;t feel like it&apos;s losing value — the number on the
        statement never goes down. What it buys goes down instead, quietly, every single year,
        which is a much easier kind of loss to miss.
      </Lead>

      <LessonSection id="inflation-quietly-shrinks-cash-that-just-sits" title="Inflation quietly shrinks cash that just sits">
        <P>
          Inflation is prices rising over time — historically averaging around {formatPercent(3)}
          {" "}a year in the US. A dollar that buys a candy bar today buys a little less of one next
          year, and meaningfully less of one in twenty years. A savings account paying 1% APY
          while inflation runs at {formatPercent(3)} isn&apos;t just growing slowly — it&apos;s
          losing real purchasing power every year, even while the balance itself keeps climbing.
        </P>
        <P>
          Put a number on it. {formatCurrency(10000)} left in that 1% account for twenty years
          grows, in nominal dollars, to a bit over {formatCurrency(12200)}. But measured in
          today&apos;s purchasing power — what it can actually buy, after inflation — it&apos;s
          worth only about {formatCurrency(6756)}. The account statement shows growth the entire
          time. The thing that actually matters, what the balance can buy, shrank by nearly a
          third.
        </P>
      </LessonSection>

      <LessonSection id="investing-is-accepting-risk-for-a-chance-at-a-higher-return" title="Investing is accepting risk for a chance at a higher return">
        <P>
          Investing means buying an asset — part ownership of a company, a share of a fund, a
          loan to a government — whose value can rise or fall with real economic outcomes.
          Historically, a diversified stock portfolio has returned an average of roughly{" "}
          {formatPercent(7)} a year after inflation over long periods, but &ldquo;average&rdquo;
          hides a bumpy ride: any single year can be sharply up or sharply down.
        </P>
        <P>
          Run the same {formatCurrency(10000)} through that {formatPercent(7)} real return instead
          and, after twenty years, it&apos;s worth about {formatCurrency(38697)} in today&apos;s
          purchasing power — more than five times the savings path over the identical stretch of
          time. Stretch it to thirty years and the gap widens further: roughly{" "}
          {formatCurrency(5553)} for the savings account against roughly {formatCurrency(76123)}
          {" "}for the invested amount. The two paths start at the same number and end multiple
          decades apart, purely from where the money sat.
        </P>
      </LessonSection>

      <InflationVsGrowthChart />

      <LessonSection id="the-average-return-is-a-summary-not-a-promise" title="The average return is a summary, not a promise">
        <P>
          None of those numbers are a guarantee, and stating them without the honest version of
          the risk would be a promise this lesson has no right to make. {formatPercent(7)} is an
          average smoothed over decades — the actual year-by-year path is nothing like a smooth
          line. The S&amp;P 500 fell roughly 37% in 2008 and about 18% in 2022. Anyone invested
          through either year watched a real chunk of their balance disappear on paper, with no
          way to know in advance how long the recovery would take.
        </P>
        <P>
          This is the real trade, stated plainly rather than softened: investing accepts the
          chance of a genuinely bad year, sometimes several in a row, in exchange for a
          historically higher return averaged over a long enough stretch to absorb them. There is
          no version of investing that removes that risk while keeping the higher expected return
          — the return is the compensation for carrying the risk, not a separate reward you get
          on top of safety.
        </P>
        <CompareGrid
          items={[
            {
              title: "Savings",
              tone: "neutral",
              children: (
                <>
                  <P>FDIC-insured up to $250,000 — the balance itself essentially can&apos;t fall.</P>
                  <P>At low rates, loses real purchasing power to inflation most years.</P>
                </>
              ),
            },
            {
              title: "Investing",
              tone: "caution",
              children: (
                <>
                  <P>Not insured — the balance can genuinely fall, sometimes by a third in a single year.</P>
                  <P>Historically the only path of the two that has outrun inflation over decades.</P>
                </>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="History is not a guarantee">
          Every number in this lesson describes what has happened, not what will. Treat the
          {" "}{formatPercent(7)} figure as the honest middle of a wide range, not as a promised
          floor — the next thirty years are not contractually obligated to look like the last
          thirty.
        </Callout>
      </LessonSection>

      <LessonSection id="why-the-emergency-fund-stays-in-savings-anyway" title="Why the emergency fund stays in savings anyway">
        <P>
          None of this is an argument to invest your emergency fund. Investing accepts short-term
          volatility for long-term growth — exactly the property you don&apos;t want in money you
          might need next month. The emergency fund stays in savings because it might be needed on
          a bad week; money you won&apos;t touch for five-plus years is where investing&apos;s
          trade actually pays off.
        </P>
        <LabelRows
          rows={[
            {
              label: "Savings",
              text: "For money you might need in the next one to three years — an emergency fund, a near-term purchase. The job is stability, not growth.",
            },
            {
              label: "Investing",
              text: "For money you won't touch for five-plus years, where there's time to ride out a bad year like 2008 or 2022 and still come out ahead.",
            },
          ]}
        />
        <Callout tone="note" title="Different money, different jobs">
          A savings account and an investment account aren&apos;t competing for the same dollars —
          they&apos;re doing two different jobs. One protects against a bad month; the other grows
          money you can afford to leave alone.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Inflation shrinks the real purchasing power of cash even while the account balance keeps climbing — $10,000 at 1% APY is worth only about $6,756 in today's money after twenty years.",
          "Investing trades short-term volatility for a historically higher long-term average return — roughly 7% after inflation for a diversified stock portfolio.",
          "That average hides real down years — the S&P 500 fell about 37% in 2008 and about 18% in 2022 — and the return is compensation for that risk, not a reward on top of safety.",
          "Over twenty years, the same $10,000 diverges to roughly $6,756 in savings versus $38,697 invested, purely from where it sat.",
          "An emergency fund still belongs in savings, not invested — it needs to be there on a bad week, which is exactly when a portfolio might be down.",
        ]}
      />
    </div>
  );
}
