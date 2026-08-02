import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { formatCurrency } from "@/lib/finance-format";

export function InsuranceBasicsLesson() {
  return (
    <div>
      <Lead>
        Insurance is a trade, not a purchase: a small, certain cost every month in exchange for
        protection against a large, uncertain one you hope never happens. Understood that way, it
        stops looking like a product you&apos;re being upsold and starts looking like a specific,
        comparable transaction.
      </Lead>

      <LessonSection id="insurance-trades-a-small-certain-cost-for-a-large-uncertain-one" title="Insurance trades a small, certain cost for a large, uncertain one">
        <P>
          Nobody can predict which specific driver gets in an accident this year, but insurers can
          predict, across a large enough pool of drivers, roughly how many will. Everyone in the
          pool pays a small amount; the unlucky few who actually need it get a large payout funded
          by everyone else&apos;s contributions. You are not betting you&apos;ll be one of the
          unlucky few — you&apos;re paying to make sure it wouldn&apos;t be financially
          catastrophic if you were.
        </P>
      </LessonSection>

      <LessonSection id="a-premium-a-deductible-and-a-payout" title="A premium, a deductible, and a payout">
        <P>
          Three terms cover almost every policy you&apos;ll compare. The <Strong>premium</Strong>{" "}
          is what you pay, usually monthly, to keep the coverage active. The{" "}
          <Strong>deductible</Strong> is what you pay out of pocket before the insurer pays
          anything on a claim. The <Strong>payout</Strong> is what the insurer covers once the
          deductible is met, often up to some coverage limit.
        </P>
        <RevealCard
          summaryTag="Scenario"
          summary={`A $600 repair bill, a policy with a $500 deductible, and a $50-a-month premium.`}
          detailTag="What actually happens"
          detail={
            <>
              You pay the first {formatCurrency(500)} yourself. The insurer covers the remaining{" "}
              {formatCurrency(100)}. Filing a claim this small is rarely worth it — the{" "}
              {formatCurrency(600)} monthly premiums saved over the same period, plus the risk of
              a rate increase after a claim, usually costs more than the {formatCurrency(100)} the
              insurer would have paid.
            </>
          }
          footnote="A higher deductible generally means a lower premium — you're accepting more of the small, likely losses yourself in exchange for a cheaper policy against the large, unlikely one."
        />
      </LessonSection>

      <LessonSection id="the-coverage-thats-hardest-to-skip" title="The coverage that's hardest to skip">
        <P>
          Not every type of insurance is equally urgent. Health insurance and liability car
          insurance protect against costs that can run into six figures and are, in most places,
          either required or close to it. Extended warranties on small electronics, by contrast,
          are usually a bad trade — the maximum possible loss is small enough to self-insure by
          just keeping a bit of savings on hand instead.
        </P>
        <Callout tone="note" title="The test that applies to any policy">
          Ask what the actual worst case costs without the coverage. If that number would derail
          your finances, the insurance is probably worth it. If you could absorb it from savings
          without much trouble, it probably isn&apos;t.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Insurance trades a small, certain premium for protection against a large, uncertain loss — it's a financial trade, not a bet on being unlucky.",
          "Premium, deductible, and payout are the three terms needed to compare almost any policy against another.",
          "A higher deductible usually means a lower premium — you're self-insuring the small losses to afford protection against the large one.",
          "The right test for any coverage is whether the uninsured worst case would actually derail your finances, not how likely it feels.",
        ]}
      />
    </div>
  );
}
