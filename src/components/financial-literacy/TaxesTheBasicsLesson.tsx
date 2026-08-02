import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
      </LessonSection>

      <LessonSection id="your-effective-rate-is-lower-than-your-top-bracket" title="Your effective rate is lower than your top bracket">
        <P>
          Your <Strong>marginal rate</Strong> is the rate on your next dollar earned. Your{" "}
          <Strong>effective rate</Strong> is total tax divided by total income — a blend of every
          bracket you passed through on the way up. The effective rate is always lower than the
          marginal rate, often by a wide margin, because the earlier, lower-taxed slices are still
          part of the average.
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
          and that can genuinely offset a raise&apos;s value. That&apos;s a separate, real
          calculation — but it is never the tax brackets themselves doing it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A marginal tax system taxes each slice of income only at that slice's own rate, never the whole income at the top rate.",
          "Marginal rate is the rate on your next dollar; effective rate is total tax divided by total income, and it's always lower.",
          "Crossing into a higher bracket only raises the rate on the income above that line, not on anything earned below it.",
          "A raise can never reduce your take-home pay from tax brackets alone — any real cases of that come from separate income-based benefit cutoffs, not the bracket system itself.",
        ]}
      />
    </div>
  );
}
