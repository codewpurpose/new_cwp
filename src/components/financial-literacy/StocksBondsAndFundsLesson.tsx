import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { formatCurrency, formatPercent } from "@/lib/finance-format";

export function StocksBondsAndFundsLesson() {
  return (
    <div>
      <Lead>
        Almost every investment you&apos;ll ever hold is built from three pieces. Learn what each
        one actually is — what you own, and who owes you what — and a portfolio stops being a
        wall of unfamiliar tickers and starts being a mix you chose on purpose.
      </Lead>

      <LessonSection id="a-stock-is-a-small-piece-of-ownership" title="A stock is a small piece of ownership">
        <P>
          Buying one share of stock makes you a tiny part-owner of that company. Its value rises
          and falls with the market&apos;s view of the company&apos;s future profits, and some
          companies pay part of their profit back to shareholders as a <Strong>dividend</Strong>.
          Own the stock, and you own a real, if small, stake in whether that business does well.
        </P>
        <P>
          Ownership means nobody legally owes you anything. A bondholder has a contract; a
          stockholder has a residual claim — a right to whatever&apos;s left over after every
          bill, every employee, and every lender has been paid. That&apos;s why a stock can go to
          zero: if a company goes bankrupt, stockholders are paid last, after every creditor and
          bondholder, and often there&apos;s nothing left by the time it&apos;s their turn. The
          same feature that gives stocks their higher potential upside — you own the profit, not
          a fixed payment — is exactly what leaves shareholders with the least protection when
          things go wrong.
        </P>
      </LessonSection>

      <LessonSection id="a-bond-is-a-loan-you-make-to-someone-else" title="A bond is a loan you make to someone else">
        <P>
          Buying a bond means lending money — to a government or a company — for a fixed period, in
          exchange for regular interest payments and the return of your original amount at the
          end. Bonds are generally less volatile than stocks and pay a lower average return in
          exchange, which is the trade most investors are making when they hold both.
        </P>
        <P>
          Unlike a stock, a bond comes with an actual legal obligation. The issuer{" "}
          <Strong>owes</Strong> you those interest payments and that principal back, on a
          schedule stated in the contract, regardless of how well the business is doing that
          quarter. That obligation is also why bondholders get paid before stockholders if the
          issuer goes bankrupt — a company can suspend a dividend at will, but skipping a bond
          payment is a default, with legal consequences. It&apos;s a narrower promise than
          ownership — a bond can&apos;t multiply in value the way a growing company&apos;s stock
          can — but it&apos;s a promise with teeth, which is exactly what a stock isn&apos;t.
        </P>
      </LessonSection>

      <LessonSection id="a-fund-is-hundreds-of-both-in-one-purchase" title="A fund is hundreds of both in one purchase">
        <P>
          A fund pools money from many investors and buys a large basket of stocks, bonds, or both
          in one purchase — an index fund tracking a market benchmark is the most common kind, and
          it&apos;s covered in full two chapters ahead. One share of a fund can represent hundreds
          or thousands of underlying companies, which is how most people get diversification
          without buying each piece individually.
        </P>
        <P>
          Funds split into two management styles that end up mattering more than most people
          expect. An <Strong>index fund</Strong> just buys everything in a benchmark and holds it,
          with no one picking stocks. An <Strong>actively managed fund</Strong> pays a team of
          people to try to pick winners and beat that benchmark — which costs more to run, and
          which most active funds fail to do consistently enough to justify the extra cost, once
          that cost is measured honestly over a full decade rather than one good year.
        </P>
      </LessonSection>

      <CompareGrid
        columns={3}
        items={[
          {
            title: "Stock",
            tone: "positive",
            children: (
              <>
                <P>Ownership in one company.</P>
                <P>Higher potential return, higher volatility.</P>
              </>
            ),
          },
          {
            title: "Bond",
            tone: "neutral",
            children: (
              <>
                <P>A loan to a government or company.</P>
                <P>Lower potential return, generally steadier.</P>
              </>
            ),
          },
          {
            title: "Fund",
            tone: "positive",
            children: (
              <>
                <P>A basket of many stocks, bonds, or both.</P>
                <P>Diversification in a single purchase.</P>
              </>
            ),
          },
        ]}
      />

      <Callout tone="note" title="Almost every portfolio is some mix">
        A common shorthand is holding more stocks when retirement is decades away, and gradually
        shifting toward more bonds as it gets closer — trading some potential return for more
        stability right when the money is about to actually be needed.
      </Callout>

      <LessonSection id="the-expense-ratio-is-the-fee-you-never-see-charged" title="The expense ratio is the fee you never see charged">
        <P>
          Every fund charges an <Strong>expense ratio</Strong> — a percentage of your investment
          taken automatically, every year, straight out of the fund&apos;s assets. There&apos;s no
          separate bill for it and no line item on a statement to notice; it&apos;s simply
          deducted before any return is reported to you, which is exactly why it&apos;s the fee
          people are most likely to never actually see.
        </P>
        <P>
          A typical index fund charges around {formatPercent(0.03, 2)} a year. A typical actively
          managed fund charges closer to {formatPercent(1)}. That one-percentage-point gap sounds
          trivial — until it compounds against the same money for thirty years.
        </P>
        <LabelRows
          rows={[
            {
              label: "Low-fee fund",
              text: `${formatPercent(0.03, 2)} expense ratio — $10,000, growing at a 7% market return, reaches about ${formatCurrency(75485)} after thirty years.`,
            },
            {
              label: "High-fee fund",
              text: `${formatPercent(1)} expense ratio — the same $10,000 at the same 7% market return reaches only about ${formatCurrency(57435)}.`,
            },
            {
              label: "The gap",
              text: `About ${formatCurrency(18050)} — lost to one percentage point of annual fee, on identical money and an identical market return.`,
            },
          ]}
        />
        <Callout tone="warning" title="A percentage point looks small on a fact sheet">
          {formatPercent(1)} a year sounds like nothing next to a market that might return{" "}
          {formatPercent(7)} or fall {formatPercent(20)} in the same year. It isn&apos;t nothing —
          it&apos;s a fixed, guaranteed cost taken every single year regardless of how the market
          did, and over three decades it can consume close to a quarter of what the investment
          would otherwise be worth. Checking a fund&apos;s expense ratio before buying it is five
          minutes that pay for themselves many times over.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A stock is part ownership of a company; its value moves with the market's view of that company's future, and shareholders are paid last if it fails.",
          "A bond is a loan to a government or company — a legal obligation to pay interest and return principal, which is why bondholders are paid before stockholders in a bankruptcy.",
          "A fund bundles hundreds of stocks, bonds, or both into a single purchase, which is how most investors get diversification without buying each piece separately.",
          "An index fund holds a benchmark passively for a low fee; an actively managed fund charges more to try to beat it, and most fail to justify that cost over a full decade.",
          "One percentage point of annual expense ratio can cost tens of thousands of dollars over thirty years on the same starting amount and the same market return.",
        ]}
      />
    </div>
  );
}
