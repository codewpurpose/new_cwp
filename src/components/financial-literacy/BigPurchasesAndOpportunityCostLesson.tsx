import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard, CompareGrid, LabelRows } from "@/components/learn/primitives/Cards";
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
        <P>
          The trap is treating the sticker price as the whole answer. It is only the entry fee — a
          purchase&apos;s real cost is everything it takes out of your hands over its entire
          lifetime, plus whatever that money could have become instead. Both halves matter, and
          most people only ever look at the first one.
        </P>
      </LessonSection>

      <LessonSection id="total-cost-of-ownership-is-more-than-the-sticker-price" title="Total cost of ownership is more than the sticker price">
        <P>
          A car with a $28,000 sticker price does not cost $28,000 to own. Insurance runs roughly
          $1,400 a year. Fuel or charging adds another $1,600. Maintenance and repairs average
          around $700. Financing the purchase over five years rather than paying cash adds a few
          thousand more in interest on top of all of it. None of that is optional, and none of it
          shows up on the number in the dealership window.
        </P>
        <LabelRows
          rows={[
            { label: "Sticker price", text: "$28,000 — the number that gets all the attention." },
            { label: "Insurance", text: "Roughly $1,400 a year, or about $7,000 across five years." },
            { label: "Fuel or charging", text: "Roughly $1,600 a year, or about $8,000 across five years." },
            { label: "Maintenance", text: "Roughly $700 a year, or about $3,500 across five years." },
            { label: "Financing interest", text: "Several thousand more if financed rather than paid in cash." },
          ]}
        />
        <P>
          Add it up and the same $28,000 car costs closer to $48,000 across five years of actually
          owning it. That gap — the <Strong>total cost of ownership</Strong> beyond the sticker
          price — is the number a monthly payment calculator never shows you, and it is real money
          regardless of whether it shows up in one lump sum or in twelve small ones a year.
        </P>
      </LessonSection>

      <LessonSection id="the-real-cost-of-a-purchase-includes-what-it-could-have-become" title="The real cost of a purchase includes what it could have become">
        <P>
          Adjust the price and the time horizon below. The gap between the sticker price and the
          invested outcome grows fastest on purchases made earliest — the same compounding math
          from earlier in this track, run in reverse, on money that left the account instead of
          staying in it.
        </P>
        <P>
          Run that same $28,000 through the chart at a ten-year horizon instead of five, and the
          number it could have become dwarfs the total cost of ownership above. That&apos;s the
          full picture a car purchase actually represents: the sticker price, the recurring costs
          of keeping it running, and whatever all of that money would have grown into if it had
          gone into an index fund instead.
        </P>
      </LessonSection>

      <OpportunityCostChart />

      <LessonSection id="the-same-math-applied-to-a-college-degree" title="The same math, applied to a college degree">
        <P>
          A degree is the same calculation wearing different clothes, and it is worth doing
          honestly rather than as an argument for or against college. The direct cost is tuition
          and fees — call it $40,000 total at an in-state public university over four years. The
          opportunity cost is the wages given up by studying instead of working full-time during
          those same four years, which for an entry-level job can easily add another $100,000 or
          more on top of the direct cost.
        </P>
        <P>
          Unlike a car, though, a degree is also an investment with its own return: on average,
          someone with a bachelor&apos;s degree earns substantially more over a career than someone
          with only a high-school diploma — commonly cited figures put the gap at several hundred
          thousand dollars or more across a working lifetime. Whether that return is worth the
          combined cost depends heavily on the field, the school&apos;s cost, and what the
          alternative four years would have actually looked like — there is no single answer that
          applies to everyone.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "What a degree costs",
              tone: "caution",
              children: (
                <P>
                  Tuition and fees, plus the wages given up while studying instead of working —
                  often the larger of the two numbers, and the one most often left out entirely.
                </P>
              ),
            },
            {
              title: "What a degree can return",
              tone: "positive",
              children: (
                <P>
                  A measurable earnings premium over a career, on average — real, but variable by
                  field, school cost, and what the years would otherwise have held.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="note" title="This cuts both ways">
          The same honesty that reveals a car&apos;s hidden costs also applies to a degree pursued
          without a plan, or at a cost far above what the expected earnings premium can reasonably
          cover. Opportunity cost isn&apos;t a tool for arguing any one big purchase is
          automatically good or bad — it&apos;s a tool for seeing the whole number before deciding.
        </Callout>
      </LessonSection>

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
          "A purchase's total cost of ownership includes everything it takes to keep it — insurance, fuel, maintenance, financing — not just the sticker price.",
          "The gap between a purchase's price and its invested alternative grows fastest the earlier in life the purchase happens.",
          "A degree carries both a large combined cost — tuition plus forgone wages — and its own real earnings return, and neither number alone tells the whole story.",
          "Running the numbers before a big purchase doesn't dictate the answer — it just makes sure the decision accounts for what's actually being given up.",
        ]}
      />
    </div>
  );
}
