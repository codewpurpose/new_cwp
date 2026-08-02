import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard, CompareGrid } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { InlineCode } from "@/components/learn/primitives/CodeBlock";
import { TaxBracketVisualizer } from "@/components/financial-literacy/TaxBracketVisualizer";

export function TaxesTheBasicsLesson() {
  return (
    <div>
      <Lead>
        &ldquo;I don&apos;t want a raise, it&apos;ll push me into a higher bracket&rdquo; is one of
        the most common pieces of financial folklore, and it describes something that cannot
        actually happen. A tax bracket only taxes the income that falls inside it — never your
        entire income at that rate.
      </Lead>

      <LessonSection id="a-tax-bracket-only-taxes-the-income-inside-it" title="A tax bracket only taxes the income inside it">
        <P>
          The US uses a <Strong>marginal</Strong> tax system: income is sliced into bands, and each
          band is taxed only at its own rate. Someone earning $60,000 doesn&apos;t pay one rate on
          the full amount — the first slice is taxed at 10%, the next slice at 12%, and so on, only
          up to wherever their income actually stops.
        </P>
        <P>
          Run the actual numbers for that $60,000. The first $11,600 is taxed at 10%, which is
          $1,160. The next $35,550, up to $47,150, is taxed at 12%, which is $4,266. The remaining
          $12,850, up to the full $60,000, is taxed at 22%, which is $2,827. Add the three slices
          together — $1,160 plus $4,266 plus $2,827 — and the total tax bill is $8,253, not the
          $13,200 you&apos;d get from applying 22% to the whole amount.
        </P>
      </LessonSection>

      <LessonSection id="your-effective-rate-is-lower-than-your-top-bracket" title="Your effective rate is lower than your top bracket">
        <P>
          Your <Strong>marginal rate</Strong> is the rate on your next dollar earned. Your{" "}
          <Strong>effective rate</Strong> is total tax divided by total income — a blend of every
          bracket you passed through on the way up. The effective rate is always lower than the
          marginal rate, often by a wide margin, because the earlier, lower-taxed slices are still
          part of the average.
        </P>
        <P>
          For the $60,000 example above, that&apos;s $8,253 in tax divided by $60,000 in income —
          an effective rate of about 13.8%, even though the marginal rate sitting on the last
          dollar earned is 22%. Nobody actually pays 22% of their income in this scenario; they pay
          13.8% of it, and the 22% only describes what the next dollar would face.
        </P>
      </LessonSection>

      <LessonSection id="deductions-and-credits-are-not-the-same-thing" title="Deductions and credits are not the same thing">
        <P>
          Both lower a tax bill, and people use the words interchangeably, which is exactly how the
          confusion starts. A <Strong>deduction</Strong> reduces the income that gets taxed in the
          first place — its value depends on your marginal rate. A <Strong>credit</Strong> reduces
          the tax bill itself, dollar for dollar, regardless of what bracket you&apos;re in.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "A $1,000 deduction",
              tone: "neutral",
              children: (
                <P>
                  Removes $1,000 from taxable income. At a 22% marginal rate, that&apos;s $220 less
                  tax owed — the deduction&apos;s value scales with whatever your top bracket
                  happens to be.
                </P>
              ),
            },
            {
              title: "A $1,000 credit",
              tone: "positive",
              children: (
                <P>
                  Removes $1,000 from the tax bill directly, no matter the bracket. The same
                  $1,000 credit is worth the same $1,000 to someone in the 10% bracket and someone
                  in the 32% bracket.
                </P>
              ),
            },
          ]}
        />
        <P>
          A credit of a given size is never worth less than a deduction of the same size, and for
          most people it&apos;s worth considerably more — which is why the two are worth telling
          apart rather than treating as synonyms.
        </P>
      </LessonSection>

      <TaxBracketVisualizer />

      <LessonSection id="why-a-raise-can-never-actually-shrink-your-paycheck" title="Why a raise can never actually shrink your paycheck">
        <P>
          Move the slider above across a bracket boundary and watch what actually happens: only
          the new income above the line gets taxed at the new, higher rate. Every dollar below that
          line keeps being taxed exactly as it was before. A raise can never leave you with less
          take-home pay than before it — the closest that folklore gets to true is a raise pushing
          some benefit with its own separate income cutoff out of reach, which is a real
          consideration, but a completely different mechanism from the tax bracket itself.
        </P>
        <Callout tone="note" title="Where this actually gets confusing">
          Some tax credits and government benefits do phase out above certain income thresholds,
          and that can offset a raise&apos;s value. That&apos;s a separate, real
          calculation — but it is never the tax brackets themselves doing it.
        </Callout>
      </LessonSection>

      <LessonSection id="withholding-is-a-guess-and-a-refund-means-it-guessed-wrong" title="Withholding is a guess, and a refund means it guessed wrong">
        <P>
          None of the tax owed above gets paid in one lump sum at the end of the year. Instead,
          your employer estimates it from every paycheck and sends that estimate to the government
          on your behalf — a process called <Strong>withholding</Strong>. Filing a tax return in
          the spring isn&apos;t paying your taxes; it&apos;s reconciling the estimate against the
          real number.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Every paycheck",
              detail: "Your employer withholds an estimate of tax owed, based on the form you filled out on hiring, and sends it to the government.",
            },
            {
              label: "Across the year",
              detail: "Those estimates add up. If they're too high, you've been overpaying all year; if too low, you've been underpaying.",
            },
            {
              label: "At filing",
              detail: "Your actual tax bill is calculated from your real income. A refund means you overpaid through withholding; a bill means you underpaid.",
            },
          ]}
        />
        <P>
          A large refund feels like a windfall, and it is treated like one constantly — but it
          means you handed the government more of your paycheck than you owed, every month, for a
          year, and got it back with no interest. That&apos;s money that could have sat in your own
          account or emergency fund the entire time instead. The better outcome is a refund close
          to <InlineCode>$0</InlineCode>, or a small bill, which means the estimate was accurate and
          your paycheck reflected what you actually owed as you earned it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A marginal tax system taxes each slice of income only at that slice's own rate, never the whole income at the top rate.",
          "Marginal rate is the rate on your next dollar; effective rate is total tax divided by total income, and it's always lower.",
          "A deduction's value depends on your marginal rate, but a credit removes its full amount from the tax bill regardless of bracket.",
          "Crossing into a higher bracket only raises the rate on the income above that line, not on anything earned below it.",
          "A large tax refund isn't a bonus — it means you overpaid through withholding all year and got an interest-free loan back from the government.",
        ]}
      />
    </div>
  );
}
