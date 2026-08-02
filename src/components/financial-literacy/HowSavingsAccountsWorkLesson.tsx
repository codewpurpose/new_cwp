import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { formatCurrency } from "@/lib/finance-format";

export function HowSavingsAccountsWorkLesson() {
  return (
    <div>
      <Lead>
        A savings account feels like a digital jar, but the bank isn&apos;t just holding your
        money — it&apos;s borrowing it, lending most of it back out to other customers, and
        paying you rent for the privilege. The rate it pays you is the entire difference between
        an account that helps and one that just holds.
      </Lead>

      <LessonSection id="a-savings-account-is-a-loan-to-the-bank" title="A savings account is a loan to the bank">
        <P>
          When you deposit money into a savings account, you are lending it to the bank. The bank
          uses that money — loaning a portion of it to other customers as mortgages and car loans
          — and pays you interest in exchange for the use of your funds. Deposits at
          FDIC-insured banks are protected up to {formatCurrency(250000)} per depositor, per bank,
          so this is a very low-risk loan to make.
        </P>
        <StepList
          steps={[
            {
              label: `You deposit ${formatCurrency(100)}`,
              detail: "It's federally insured up to the FDIC limit, and it's still legally yours in full, on demand.",
            },
            {
              label: "The bank keeps a slice, lends out the rest",
              detail: "As mortgages, car loans, and business credit — deposits like yours are the raw material behind nearly every other loan the bank makes.",
            },
            {
              label: "Borrowers pay the bank interest",
              detail: "A mortgage might run 6-7%, an auto loan more, a carried credit card balance far more. This is where a bank's revenue actually comes from.",
            },
            {
              label: "The bank pays you a cut of that spread",
              detail: "The APY on your account is a fraction of what the bank earns on your money, in exchange for you agreeing not to need all of it back with no notice.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="apy-is-the-rate-that-actually-matters" title="APY is the rate that actually matters">
        <P>
          <Strong>APY</Strong> — annual percentage yield — is the rate a bank advertises, and it
          already accounts for compounding: interest earning interest on itself throughout the
          year. The <Strong>interest rate</Strong> is the raw, un-compounded number; APY is what
          that same rate turns into once compounding is applied, which is why it&apos;s the
          number that actually belongs on a comparison.
        </P>
        <P>
          Watch the same 4% nominal rate produce three different balances on{" "}
          {formatCurrency(10000)}, purely from how often it compounds:
        </P>
        <LabelRows
          rows={[
            { label: "Annually", text: `${formatCurrency(10400)} after one year — exactly the stated 4%, compounded once.` },
            { label: "Monthly", text: `${formatCurrency(10407)} — the same nominal rate, but interest starts earning interest twelve times during the year instead of once.` },
            { label: "Daily", text: `${formatCurrency(10408)} — the same nominal rate again, now compounded 365 times.` },
          ]}
        />
        <P>
          Two accounts both said to pay &ldquo;4%&rdquo; can pay meaningfully different amounts if
          one compounds daily and one compounds annually — APY is the number that makes them
          comparable, because it&apos;s already the actual yearly return, not the raw rate before
          compounding is folded in.
        </P>
      </LessonSection>

      <LessonSection id="an-account-paying-under-inflation-is-losing-you-money" title="An account paying under inflation is losing you money">
        <P>
          A balance can grow every month and still be losing value. What matters isn&apos;t the{" "}
          <Strong>nominal</Strong> return printed on the statement — it&apos;s the{" "}
          <Strong>real</Strong> return, the nominal return minus inflation, which measures what
          the balance can actually buy.
        </P>
        <P>
          Take {formatCurrency(10000)} sitting in a checking account paying 0.01% APY, with
          inflation running at 3% for the year. The account earns about {formatCurrency(1)}. The
          same {formatCurrency(10000)} needs roughly {formatCurrency(300)} more just to buy what
          it bought twelve months earlier. The balance grew by a dollar and lost about{" "}
          {formatCurrency(299)} of real purchasing power in the same year. Move the same{" "}
          {formatCurrency(10000)} into an account paying 4.5% APY and it earns about{" "}
          {formatCurrency(450)} — a real gain of roughly {formatCurrency(150)} once that same 3%
          inflation is subtracted out.
        </P>
        <Callout tone="warning" title="Safe and growing are not the same claim">
          An account paying less than inflation is shrinking your buying power exactly as
          reliably as a well-chosen investment could grow it — just in the other direction, and
          with none of the volatility that would make you notice. &ldquo;It never lost a
          dollar&rdquo; and &ldquo;it never lost value&rdquo; are different sentences, and only
          the second one is the one that matters.
        </Callout>
      </LessonSection>

      <LessonSection id="why-a-high-yield-account-beats-a-checking-account" title="Why a high-yield account beats a checking account">
        <P>
          A typical checking account pays close to nothing — often 0.01% APY. A high-yield savings
          account, usually offered by an online-only bank with lower overhead than a branch
          network, can pay forty or more times that rate. On a {formatCurrency(10000)} balance,
          the difference between 0.01% and 4.5% APY is roughly {formatCurrency(449)} a year — for
          holding the exact same cash, doing nothing differently except which account it sits in.
        </P>
        <Callout tone="tip" title="This is close to a free decision">
          Moving an emergency fund from checking to a high-yield savings account costs nothing,
          takes minutes, and the money remains just as reachable. There is very little reason not
          to.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A savings account is a loan you make to the bank, and the interest it pays is a cut of what the bank earns lending that same money back out at a higher rate.",
          "APY already accounts for compounding, which is why it's the one number that makes two accounts' rates directly comparable — the stated interest rate alone doesn't.",
          "Compounding more often on the same nominal rate earns you more, but the gap is small next to the gap between rates themselves.",
          "An account paying less than inflation is losing you real purchasing power every year, even while the balance on the screen keeps growing.",
          "Moving idle cash from checking to a high-yield savings account is close to a free decision — same access, meaningfully more return.",
        ]}
      />
    </div>
  );
}
