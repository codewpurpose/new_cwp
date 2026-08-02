import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RevealCard } from "@/components/learn/primitives/RevealCard";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { formatCurrency } from "@/lib/finance-format";

export function InsuranceBasicsLesson() {
  return (
    <div>
      <Lead>
        Insurance is the one financial product you buy expecting, on average, to lose money on —
        and that&apos;s not a flaw in it. A small, certain cost every month in exchange for
        protection against a large, uncertain one you hope never happens is a trade, not an
        investment, and it stops looking like a product you&apos;re being upsold on once you
        understand exactly what you&apos;re paying for.
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
        <P>
          Follow the money and the &ldquo;expecting to lose&rdquo; part becomes literal. An
          insurer prices a premium to cover the average expected payout across every policyholder
          in the pool, plus the cost of running the company, plus a profit margin on top. That
          means the pool of policyholders, as a group, always pays in more than it collectively
          receives back — the insurer couldn&apos;t stay in business otherwise. Any individual
          policyholder might come out ahead in a bad year, but the premium is priced assuming most
          won&apos;t. You&apos;re not buying a return. You&apos;re buying the removal of a small
          chance of ruin, and paying a predictable price for it instead of an unpredictable one.
        </P>
      </LessonSection>

      <LessonSection id="a-premium-a-deductible-and-a-payout" title="A premium, a deductible, and a payout">
        <P>
          Five terms cover almost every policy you&apos;ll ever compare, and mixing two of them up
          is the single most common way people misread what a plan actually costs.
        </P>
        <LabelRows
          rows={[
            {
              label: "Premium",
              text: "What you pay, usually monthly, to keep the coverage active at all — due whether or not you ever file a claim.",
            },
            {
              label: "Deductible",
              text: "What you pay out of pocket on a claim before the insurer pays anything. A $500 deductible means the first $500 of any covered loss is yours.",
            },
            {
              label: "Co-pay",
              text: "A fixed fee paid at the time of a specific service, separate from the deductible — a $30 charge for a doctor's visit that applies whether or not the deductible has been met yet.",
            },
            {
              label: "Out-of-pocket max",
              text: "The absolute ceiling on what you'll pay in a policy period — deductible, co-pays, and coinsurance combined. Once you hit it, the insurer covers 100% of covered costs for the rest of the period.",
            },
            {
              label: "Coverage limit",
              text: "The ceiling on what the insurer will ever pay out — per claim, or per year. Costs above the limit are yours, in full, no matter how large the premium was.",
            },
          ]}
        />
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
        <P>
          Notice how the deductible and the out-of-pocket maximum do different jobs even though
          they sound similar. The deductible resets every policy period and applies claim by
          claim. The out-of-pocket maximum is the one number that actually caps your worst-case
          year — a $2,000 deductible on a plan with an $8,000 out-of-pocket max means a single bad
          year could still cost you up to $8,000, not just the deductible, once co-pays and
          coinsurance are added on top.
        </P>
      </LessonSection>

      <LessonSection id="insure-the-catastrophic-and-unaffordable-not-the-small-and-frequent" title="Insure the catastrophic and unaffordable, not the small and frequent">
        <P>
          The pricing logic from the first section gives you an actual rule, not a feeling. A risk
          is worth insuring when it&apos;s both <Strong>catastrophic</Strong> — large enough to
          genuinely derail your finances — and <Strong>uncertain enough</Strong> that you
          can&apos;t reasonably save your way around it in time. A risk is not worth insuring when
          it&apos;s <Strong>small</Strong> and <Strong>frequent</Strong> — the kind of cost you
          could absorb from an emergency fund without much trouble, and the kind an insurer prices
          knowing it will pay out often, which is exactly why the premium is never a bargain for
          it.
        </P>
        <CompareGrid
          items={[
            {
              title: "Worth insuring",
              tone: "positive",
              children: (
                <>
                  <P>Health insurance — a single hospitalisation can run into six figures.</P>
                  <P>Liability car insurance — a serious accident can exceed any reasonable savings.</P>
                  <P>Renters or homeowners insurance — a fire or theft can wipe out everything owned at once.</P>
                  <P>Life insurance, if someone depends on your income.</P>
                </>
              ),
            },
            {
              title: "Usually not worth it",
              tone: "caution",
              children: (
                <>
                  <P>Extended warranties on electronics — the maximum loss is the item&apos;s price.</P>
                  <P>Phone screen-protection plans, priced for a repair you could save for instead.</P>
                  <P>Flight-delay or trip-cancellation add-ons on a low-cost ticket.</P>
                  <P>Rental car insurance if your own auto policy already covers rentals.</P>
                </>
              ),
            },
          ]}
        />
        <Callout tone="note" title="The test that applies to any policy">
          Ask what the actual worst case costs without the coverage. If that number would derail
          your finances, the insurance is probably worth it. If you could absorb it from savings
          without much trouble, it probably isn&apos;t — you&apos;re better off self-insuring by
          keeping that money in an emergency fund instead of paying someone else to hold it for
          you.
        </Callout>
      </LessonSection>

      <LessonSection id="the-coverage-thats-hardest-to-skip" title="The coverage that's hardest to skip">
        <P>
          Not every type of insurance is equally urgent. Health insurance and liability car
          insurance protect against costs that can run into six figures and are, in most places,
          either required or close to it. A multi-day hospital stay alone can easily clear
          $50,000 before any surgery is counted, and most states set minimum liability limits
          for exactly this reason — a single at-fault accident can generate medical and repair
          bills well beyond what any household budget could absorb in cash.
        </P>
        <P>
          Extended warranties on small electronics sit at the opposite end. The maximum possible
          loss is the price of the item itself — a few hundred dollars, rarely more — which is
          small enough to self-insure by just keeping a bit of savings on hand instead of paying a
          recurring premium priced to make the insurer money on the bet.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Insurance trades a small, certain premium for protection against a large, uncertain loss — it's a financial trade, not a bet on being unlucky.",
          "Premium, deductible, co-pay, out-of-pocket maximum, and coverage limit are the five terms needed to compare almost any policy against another.",
          "A higher deductible usually means a lower premium — you're self-insuring the small losses to afford protection against the large one.",
          "The right test for any coverage is whether the uninsured worst case would actually derail your finances, not how likely it feels.",
          "Insure the catastrophic and unaffordable; self-insure the small and frequent, because that's exactly the risk an insurer prices to profit from.",
        ]}
      />
    </div>
  );
}
