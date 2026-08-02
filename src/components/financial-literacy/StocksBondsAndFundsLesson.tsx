import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function StocksBondsAndFundsLesson() {
  return (
    <div>
      <Lead>
        Almost every investment you&apos;ll ever hold is built from three pieces. Learn what each
        one actually is, and a portfolio stops being a wall of unfamiliar tickers and starts being
        a mix you chose on purpose.
      </Lead>

      <LessonSection id="a-stock-is-a-small-piece-of-ownership" title="A stock is a small piece of ownership">
        <P>
          Buying one share of stock makes you a tiny part-owner of that company. Its value rises
          and falls with the market&apos;s view of the company&apos;s future profits, and some
          companies pay part of their profit back to shareholders as a <Strong>dividend</Strong>.
          Own the stock, and you own a real, if small, stake in whether that business does well.
        </P>
      </LessonSection>

      <LessonSection id="a-bond-is-a-loan-you-make-to-someone-else" title="A bond is a loan you make to someone else">
        <P>
          Buying a bond means lending money — to a government or a company — for a fixed period, in
          exchange for regular interest payments and the return of your original amount at the
          end. Bonds are generally less volatile than stocks and pay a lower average return in
          exchange, which is the trade most investors are making when they hold both.
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

      <TakeawayCard
        items={[
          "A stock is part ownership of a company; its value moves with the market's view of that company's future.",
          "A bond is a loan to a government or company, paying regular interest for generally steadier, lower average returns than stocks.",
          "A fund bundles hundreds of stocks, bonds, or both into a single purchase, which is how most investors get diversification without buying each piece separately.",
          "Most real portfolios are a deliberate mix of all three, shifted over time as the money gets closer to being needed.",
        ]}
      />
    </div>
  );
}
