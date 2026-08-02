import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function GoodDebtBadDebtLesson() {
  return (
    <div>
      <Lead>
        The word &ldquo;debt&rdquo; covers a mortgage on a home gaining value and a payday loan
        against a paycheck that hasn&apos;t arrived yet. Calling both simply &ldquo;debt&rdquo; and
        judging them the same way is where a lot of bad financial advice starts.
      </Lead>

      <LessonSection id="debt-that-builds-an-asset-or-your-earning-power" title="Debt that builds an asset, or your earning power">
        <P>
          &ldquo;Good&rdquo; debt, loosely, is debt that either buys something likely to hold or
          grow in value, or increases what you&apos;re capable of earning. A mortgage on a home in
          a stable market, a reasonable student loan for a degree that measurably raises your
          earning potential, and a small business loan backed by a real plan all fit this shape —
          the debt is a tool for building something, not just a way to spend before you&apos;ve
          earned.
        </P>
      </LessonSection>

      <LessonSection id="debt-that-buys-something-already-losing-value" title="Debt that buys something already losing value">
        <CompareGrid
          items={[
            {
              title: "Tends toward good",
              tone: "positive",
              children: (
                <>
                  <P>A mortgage at a reasonable rate on a home you can actually afford.</P>
                  <P>A student loan for a degree with a clear path to higher earnings.</P>
                </>
              ),
            },
            {
              title: "Tends toward bad",
              tone: "caution",
              children: (
                <>
                  <P>A payday loan against next week&apos;s paycheck, at triple-digit APR.</P>
                  <P>Credit card debt carried for a depreciating purchase, like a vacation or electronics.</P>
                </>
              ),
            },
          ]}
        />
        <P>
          &ldquo;Bad&rdquo; debt finances something that loses value the moment you buy it, or
          worse, something already spent by the time the bill arrives — a night out, a vacation,
          a purchase with nothing left to show for it except the balance.
        </P>
      </LessonSection>

      <LessonSection id="the-same-loan-can-be-either-depending-on-the-terms" title="The same loan can be either, depending on the terms">
        <P>
          A car loan for reliable transportation to a job you couldn&apos;t otherwise reach is
          closer to good debt. The same car loan, at a punishing rate, for a car well beyond what
          the budget in this track&apos;s earlier chapters would support, tips toward bad — the
          category isn&apos;t fixed to the purpose, it moves with the rate, the term, and whether
          the payment actually fits.
        </P>
        <Callout tone="note" title="The label is a shortcut, not a rulebook">
          &ldquo;Good debt&rdquo; is not a licence to borrow freely for anything that sounds
          productive. It&apos;s a shortcut for asking one real question: does this loan build
          something, or does it just move today&apos;s spending onto tomorrow&apos;s balance?
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Debt that builds an asset or raises your earning power — a mortgage, a reasonable student loan — tends toward good.",
          "Debt that finances something already losing value, or already spent, tends toward bad, regardless of how it's framed.",
          "The same loan can sit on either side of the line depending on its rate, term, and whether the payment actually fits your budget.",
          "'Good debt' is a shortcut for one question — does this build something, or just shift today's spending onto a future balance — not a blank cheque.",
        ]}
      />
    </div>
  );
}
