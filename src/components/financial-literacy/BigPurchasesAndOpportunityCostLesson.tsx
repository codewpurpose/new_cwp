import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { OpportunityCostChart } from "@/components/financial-literacy/OpportunityCostChart";

export function BigPurchasesAndOpportunityCostLesson() {
  return (
    <div>
      <Lead>
        A price tag only tells you what leaves your account. It never mentions what that same
        amount could have become if it had gone somewhere else instead — and for a big enough
        purchase, that second number is often larger than the first.
      </Lead>

      <LessonSection id="every-dollar-spent-is-a-dollar-that-cant-also-be-invested" title="Every dollar spent is a dollar that can't also be invested">
        <P>
          <Strong>Opportunity cost</Strong> is what you give up by choosing one option over
          another. Every dollar can only be used once — spent, it&apos;s spent; invested, it has
          decades to compound instead. Neither choice is wrong on its own, but pretending the
          second option doesn&apos;t exist is how a purchase&apos;s real cost gets underestimated.
        </P>
      </LessonSection>

      <LessonSection id="the-real-cost-of-a-purchase-includes-what-it-could-have-become" title="The real cost of a purchase includes what it could have become">
        <P>
          Adjust the price and the time horizon below. The gap between the sticker price and the
          invested outcome grows fastest on purchases made earliest — the same compounding math
          from earlier in this track, run in reverse, on money that left the account instead of
          staying in it.
        </P>
      </LessonSection>

      <OpportunityCostChart />

      <LessonSection id="this-doesnt-mean-never-spend-it-means-spend-on-purpose" title="This doesn't mean never spend — it means spend on purpose">
        <P>
          Opportunity cost is a way to see a decision clearly, not a rule against ever spending
          money. Some purchases are worth far more than their invested alternative — reliable
          transportation to a job, a purchase that improves your health, an experience that
          actually matters to you. The chart above isn&apos;t an argument against spending; it&apos;s
          the missing number that makes the decision an informed one instead of a guess.
        </P>
        <Callout tone="tip" title="A useful gut-check for anything large">
          Before a big purchase, run the number above once. If the invested alternative still
          feels clearly smaller than what the purchase is worth to you, that&apos;s a real answer
          — you just made the decision with the full picture instead of half of it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Opportunity cost is what a dollar could have become elsewhere — every dollar spent is a dollar that can no longer also compound.",
          "The gap between a purchase's price and its invested alternative grows fastest the earlier in life the purchase happens.",
          "Opportunity cost is a lens for seeing a decision clearly, not a rule against ever spending money on anything.",
          "Running the numbers before a big purchase doesn't dictate the answer — it just makes sure the decision accounts for what's actually being given up.",
        ]}
      />
    </div>
  );
}
