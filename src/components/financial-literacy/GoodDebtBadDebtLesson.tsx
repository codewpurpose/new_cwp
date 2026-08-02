import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

export function GoodDebtBadDebtLesson() {
  return (
    <div>
      <Lead>
        You&apos;ve probably heard debt sorted into two piles: good debt and bad debt. That
        sorting is a slogan, not a test — it tells you nothing about the loan sitting in front of
        you right now. The word &ldquo;debt&rdquo; covers a mortgage on a home gaining value and a
        payday loan against a paycheck that hasn&apos;t arrived yet, and treating both the same
        way is where a lot of bad financial advice starts.
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
        <P>
          Run the numbers on a concrete case. A $40,000 nursing degree, financed at 6% over ten
          years, costs roughly $444 a month and about $13,300 in total interest. If that degree
          moves your income from $32,000 a year to $58,000, the raise pays the entire loan
          payment inside the first four months of the first year, every year, for as long as
          you hold the job. The debt bought a permanently higher earning line, not a thing that
          sits on a shelf losing value.
        </P>
        <P>
          A mortgage works on the same logic from the asset side rather than the income side. A
          $320,000 home loan at 6.5% fixed over 30 years costs about $2,022 a month. Home prices
          don&apos;t rise every year, but historically they&apos;ve tracked somewhere near
          {" "}{formatPercent(3)}&ndash;{formatPercent(4)} annually over long stretches — meaning
          a meaningful share of that monthly payment is, slowly, buying an asset rather than
          renting one.
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
        <P>
          Put a number on it. A new car bought with a $30,000 loan typically loses{" "}
          {formatPercent(20)} of its value the moment it leaves the lot and roughly{" "}
          {formatPercent(50)} within five years — meaning the loan balance can outpace the
          car&apos;s resale value for years at a stretch. A $3,000 vacation charged to a card at
          {" "}{formatPercent(22)} APR and paid off at $100 a month takes 44 months — three and a
          half years — to clear and adds about {formatCurrency(1395)} in interest, for a trip
          that ended the week it started. Neither loan bought anything that&apos;s still there.
        </P>
      </LessonSection>

      <LessonSection id="the-rate-the-term-and-whether-it-survives-a-lost-paycheck" title="The rate, the term, and whether it survives a lost paycheck">
        <P>
          Retire the slogan and you&apos;re left with a real test, and it has four parts. None of
          them is &ldquo;what was the money spent on,&rdquo; which is the question the good/bad
          framing tricks people into asking first.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "The rate",
              detail:
                "What APR are you actually paying, compared to what that money could otherwise earn, or to what inflation is running? A 6% mortgage and a 24% credit card are not the same category of decision just because both are called debt.",
            },
            {
              label: "The term",
              detail:
                "How long are you locked into this payment, and does that length match how long the thing you bought will still have value or use? A five-year loan on a car you'll trade in after three years means still owing money on something you no longer have.",
            },
            {
              label: "Does the thing bought hold or lose value",
              detail:
                "A home historically holds or grows. A car depreciates from day one. A vacation is already spent by the time the statement arrives. This is the closest thing to the old 'good versus bad' split, but it's one input, not the whole answer.",
            },
            {
              label: "Does the payment survive a lost paycheck",
              detail:
                "If your income stopped for three months tomorrow, could this payment still be made from savings or a lower income? A loan with an unaffordable payment is fragile debt no matter how good the rate looks on paper.",
            },
          ]}
        />
        <Callout tone="warning" title="A good rate on an unaffordable payment is still bad debt">
          A 6.5% mortgage is a textbook example of &ldquo;good&rdquo; debt right up until the
          payment consumes half a household&apos;s take-home pay. At that point{" "}
          <Strong>the fourth question overrides the first three</Strong> — a single missed
          paycheck turns a well-priced loan into a foreclosure risk. The rate tells you what the
          debt costs. The fourth question tells you whether you can actually afford to keep
          paying it.
        </Callout>
      </LessonSection>

      <LessonSection id="the-same-loan-can-be-either-depending-on-the-terms" title="The same loan can be either, depending on the terms">
        <P>
          A car loan for reliable transportation to a job you couldn&apos;t otherwise reach is
          closer to good debt. The same car loan, at a punishing rate, for a car well beyond what
          the budget in this track&apos;s earlier chapters would support, tips toward bad — the
          category isn&apos;t fixed to the purpose, it moves with the rate, the term, and whether
          the payment actually fits.
        </P>
        <P>
          Compare two versions of the same $22,000 car loan directly. At {formatPercent(5.9)}{" "}
          over five years, the payment is about {formatCurrency(424)} a month and total interest
          comes to roughly {formatCurrency(3458)}. At {formatPercent(18)} over seven years —
          the kind of offer a buy-here-pay-here lot might extend to someone with thin credit — the
          payment only rises to about {formatCurrency(462)} a month, a $38 difference that&apos;s
          easy to wave off. But total interest climbs to roughly {formatCurrency(16841)}, nearly
          five times as much, and the car is worth less than what&apos;s still owed for most of
          that stretch. Same purpose, similar monthly payment, radically different debt.
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
          "The real test has four parts: the rate, the term, whether the thing bought holds value, and whether the payment survives a lost paycheck.",
          "A good rate doesn't make a payment affordable — the fourth question, whether the debt survives a lost income, can override the other three.",
          "The same loan can sit on either side of the line depending on its rate and term alone, even when the purpose stays identical.",
        ]}
      />
    </div>
  );
}
