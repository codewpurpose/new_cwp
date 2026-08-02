import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard, CompareGrid, LabelRows } from "@/components/learn/primitives/Cards";
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
        <P>
          Nothing about that mechanism is uniquely American, even though the names are. Whatever
          country you live in almost certainly has a version of the same trade: the UK pairs a
          workplace pension with a tax-free ISA, Canada pairs a pre-tax RRSP with a post-tax TFSA,
          Australia funnels retirement saving through superannuation. Different labels, the same
          three questions worth asking of any of them — what&apos;s the tax treatment, is there a
          match, and what does it cost to access the money early.
        </P>
      </LessonSection>

      <LessonSection id="pre-tax-and-post-tax-are-a-bet-on-which-tax-rate-is-lower" title="Pre-tax and post-tax are a bet on which tax rate is lower">
        <P>
          Say you earn an extra $100 and face a 22% tax rate. Contribute it to a{" "}
          <Strong>traditional</Strong> account and the full $100 goes in — no tax paid now — but
          withdrawals in retirement get taxed as ordinary income at whatever rate applies then.
          Contribute it to a <Strong>Roth</Strong> account instead and you pay the 22% first,
          landing about $78 in the account, but every dollar it grows into later comes out
          completely untaxed.
        </P>
        <P>
          If your tax rate is identical at contribution and at withdrawal, the two options land in
          the same place mathematically. The real decision is a bet on which direction that rate
          moves: expect a lower tax rate in retirement than you pay today and traditional tends to
          win; expect your rate to be the same or higher later — common for someone early in their
          career, likely to earn more over time — and Roth tends to win.
        </P>
        <CompareGrid
          columns={2}
          items={[
            {
              title: "Traditional",
              tone: "neutral",
              children: (
                <P>
                  Full contribution goes in pre-tax, lowering this year&apos;s taxable income.
                  Withdrawals in retirement are taxed as ordinary income. Favours a lower tax rate
                  later than now.
                </P>
              ),
            },
            {
              title: "Roth",
              tone: "neutral",
              children: (
                <P>
                  Contribution is taxed now, so less of it lands in the account. Withdrawals in
                  retirement are entirely tax-free. Favours a tax rate later that is the same or
                  higher than now.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="an-employer-match-is-money-left-on-the-table-if-skipped" title="An employer match is money left on the table if skipped">
        <P>
          A common match structure is 100% on the first few percent of salary you contribute, then
          50% on the next couple of percent. Contributing less than the full matched amount means
          walking away from money your employer would otherwise have paid you — not a missed
          investment opportunity, a direct pay cut you chose.
        </P>
        <P>
          Treat the match as what it actually is: a 100% or 50% <Strong>immediate return</Strong>,
          guaranteed, on the dollars you contribute up to the match limit. No stock, bond, or fund
          in the previous chapters offers anything close to that on day one — the best investment
          available to most people isn&apos;t a clever pick, it&apos;s claiming the match in full
          before optimising anything else.
        </P>
      </LessonSection>

      <MatchStackChart />

      <LessonSection id="vesting-decides-when-the-match-is-actually-yours" title="Vesting decides when the match is actually yours">
        <P>
          The match isn&apos;t always yours the moment it lands in the account. <Strong>Vesting</Strong>{" "}
          is the schedule that decides when employer contributions actually become yours to keep if
          you leave — your own contributions are always fully yours immediately, but the
          employer&apos;s match usually is not.
        </P>
        <LabelRows
          rows={[
            {
              label: "Cliff vesting",
              text: "You own 0% of the match until a set date — often three years — at which point you own 100% of it at once. Leave two years and eleven months in, and the entire match balance is forfeited.",
            },
            {
              label: "Graded vesting",
              text: "You own an increasing share each year — a common schedule is 20% per year over five years. Leave after two years under that schedule and you keep 40% of the match, not all of it.",
            },
          ]}
        />
        <P>
          This is worth checking before counting an employer match as guaranteed money, especially
          if a job change is on the horizon — the match shown in the chart above is the maximum
          available, and vesting is the condition attached to actually keeping it.
        </P>
      </LessonSection>

      <LessonSection id="early-withdrawal-turns-the-tax-break-into-a-trap" title="Early withdrawal turns the tax break into a trap">
        <P>
          The tax advantage inside these accounts comes with a price for accessing the money
          early: in the US, withdrawing from most retirement accounts before age 59½ triggers
          ordinary income tax plus an additional 10% penalty on top, with a short list of narrow
          exceptions. That penalty exists specifically because the tax break was granted on the
          assumption the money would stay put for decades.
        </P>
        <Callout tone="warning" title="This is not a backup emergency fund">
          A retirement account and the emergency fund from earlier in this track solve different
          problems on purpose. Raiding a 401(k) for a car repair converts a tax-advantaged
          long-term account into an expensive short-term loan from yourself, penalty included. Keep
          the emergency fund separate, liquid, and untouched by this account entirely.
        </Callout>
      </LessonSection>

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
          "Traditional accounts defer tax until withdrawal; Roth accounts tax contributions now and withdraw entirely tax-free later — the choice is a bet on which tax rate is lower.",
          "An employer match unclaimed is not a missed opportunity — it's compensation your employer already budgeted for you that goes unpaid.",
          "Vesting schedules decide when an employer's match is actually yours to keep, and leaving early under a cliff schedule can forfeit all of it.",
          "Withdrawing before retirement age typically costs ordinary income tax plus a 10% penalty, which is the price of the tax break, not a loophole around it.",
        ]}
      />
    </div>
  );
}
