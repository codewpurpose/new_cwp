import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { MatchStackChart } from "@/components/financial-literacy/MatchStackChart";

export function RetirementAccountsLesson() {
  return (
    <div>
      <Lead>
        A 401(k) isn&apos;t an investment — it&apos;s a box the government gives your investments
        a tax break for sitting inside. Skip the employer match available inside that box, and
        you&apos;re turning down money that was never yours to decline in the first place.
      </Lead>

      <LessonSection id="a-retirement-account-is-a-tax-advantaged-wrapper-not-an-investment-itself" title="A retirement account is a tax-advantaged wrapper, not an investment itself">
        <P>
          A <Strong>401(k)</Strong> (through an employer) and an <Strong>IRA</Strong> (opened
          individually) are both containers, not investments. Inside either one, you still choose
          stocks, bonds, or funds — the same building blocks from two chapters ago. What the
          container adds is a tax rule: a traditional account reduces your taxable income now and
          taxes withdrawals in retirement; a Roth account is taxed now and withdrawals are entirely
          tax-free later.
        </P>
      </LessonSection>

      <LessonSection id="an-employer-match-is-money-left-on-the-table-if-skipped" title="An employer match is money left on the table if skipped">
        <P>
          A common match structure is 100% on the first few percent of salary you contribute, then
          50% on the next couple of percent. Contributing less than the full matched amount means
          walking away from money your employer would otherwise have paid you — not a missed
          investment opportunity, a direct pay cut you chose.
        </P>
      </LessonSection>

      <MatchStackChart />

      <LessonSection id="starting-at-twenty-five-versus-thirty-five" title="Starting at twenty-five versus thirty-five">
        <P>
          Everything from the compound interest chapter applies here directly — a retirement
          account is simply where that growth happens with a tax advantage layered on top. The
          same ten-year head start that mattered in a plain savings comparison matters here too,
          amplified by decades of tax-advantaged compounding on top of the match itself.
        </P>
        <Callout tone="tip" title="The one-line version of this whole chapter">
          Contribute at least enough to get the full employer match, as early as you can. Every
          other decision about which account type or which funds to hold is worth getting right,
          but none of them matter if the free match is left unclaimed.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A 401(k) or IRA is a tax-advantaged wrapper around investments you still choose yourself, not an investment on its own.",
          "Traditional accounts defer tax until withdrawal; Roth accounts tax contributions now and withdraw entirely tax-free later.",
          "An employer match unclaimed is not a missed opportunity — it's compensation your employer already budgeted for you that goes unpaid.",
          "The compound interest math from earlier in this track applies fully here, so starting early matters at least as much as which account you pick.",
        ]}
      />
    </div>
  );
}
