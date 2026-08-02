import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { InflationVsGrowthChart } from "@/components/financial-literacy/InflationVsGrowthChart";
import { formatPercent } from "@/lib/finance-format";

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
      </LessonSection>

      <LessonSection id="investing-is-accepting-risk-for-a-chance-at-a-higher-return" title="Investing is accepting risk for a chance at a higher return">
        <P>
          Investing means buying an asset — part ownership of a company, a share of a fund, a
          loan to a government — whose value can rise or fall with real economic outcomes.
          Historically, a diversified stock portfolio has returned an average of roughly{" "}
          {formatPercent(7)} a year after inflation over long periods, but &ldquo;average&rdquo;
          hides a bumpy ride: any single year can be sharply up or sharply down.
        </P>
      </LessonSection>

      <InflationVsGrowthChart />

      <LessonSection id="why-the-emergency-fund-stays-in-savings-anyway" title="Why the emergency fund stays in savings anyway">
        <P>
          None of this is an argument to invest your emergency fund. Investing accepts short-term
          volatility for long-term growth — exactly the property you don&apos;t want in money you
          might need next month. The emergency fund stays in savings because it might be needed on
          a bad week; money you won&apos;t touch for five-plus years is where investing&apos;s
          trade actually pays off.
        </P>
        <Callout tone="note" title="Different money, different jobs">
          A savings account and an investment account aren&apos;t competing for the same dollars —
          they&apos;re doing two different jobs. One protects against a bad month; the other grows
          money you can afford to leave alone.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Inflation shrinks the real purchasing power of cash even while the account balance keeps climbing, especially at low savings rates.",
          "Investing trades short-term volatility for a historically higher long-term average return — roughly 7% after inflation for a diversified stock portfolio.",
          "The chart above shows the same starting amount diverging sharply over decades, purely from the gap between a savings rate and an invested return.",
          "An emergency fund still belongs in savings, not invested — it needs to be there on a bad week, which is exactly when a portfolio might be down.",
        ]}
      />
    </div>
  );
}
