import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { DiversificationOutcomes } from "@/components/financial-literacy/DiversificationOutcomes";

export function RiskAndDiversificationLesson() {
  return (
    <div>
      <Lead>
        Put every dollar into one company and your entire financial outcome depends on that one
        company&apos;s next year. Spread it across twenty and no single company&apos;s bad year
        can do that kind of damage — the risk hasn&apos;t disappeared, it has just changed shape.
      </Lead>

      <LessonSection id="concentration-means-one-bad-outcome-costs-everything" title="Concentration means one bad outcome costs everything">
        <P>
          Holding one stock means your return <Strong>is</Strong> that stock&apos;s return —
          whatever a single company&apos;s management, competitors, lawsuits, or bad quarter do to
          its price happens directly to your entire investment. A wonderful year is wonderful.
          A catastrophic one is catastrophic, with nothing else in the portfolio to absorb it.
        </P>
      </LessonSection>

      <LessonSection id="diversification-spreads-that-single-point-of-failure" title="Diversification spreads that single point of failure">
        <P>
          Diversification means holding many different investments so no single one can do that
          much damage. If one of twenty holdings has a disastrous year, it&apos;s one-twentieth of
          the portfolio, not the entire thing — and historically, on average, some other holding
          having a strong year has offset a meaningful part of that loss.
        </P>
      </LessonSection>

      <DiversificationOutcomes />

      <LessonSection id="diversification-doesnt-remove-risk-it-reshapes-it" title="Diversification doesn't remove risk, it reshapes it">
        <P>
          Toggle between the two views above and notice what actually changes: the best and worst
          single-year outcomes both move dramatically closer to the average once the outcomes are
          spread across twenty stocks instead of concentrated in one. That&apos;s the trade —
          diversification gives up the chance of an extraordinary single-stock win in exchange for
          taking the catastrophic single-stock loss off the table.
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
          "Holding a single stock means your entire return is that one company's outcome, for better or worse.",
          "Spreading across many holdings means no single one can do catastrophic damage to the whole portfolio.",
          "Diversification reshapes risk rather than eliminating it — it narrows both the best-case and worst-case single-year outcomes toward the average.",
          "Diversification only protects against risks unique to individual holdings, not risks shared across an entire industry or market.",
        ]}
      />
    </div>
  );
}
