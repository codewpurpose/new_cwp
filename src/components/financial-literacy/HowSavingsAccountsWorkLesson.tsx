import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
      </LessonSection>

      <LessonSection id="apy-is-the-rate-that-actually-matters" title="APY is the rate that actually matters">
        <P>
          <Strong>APY</Strong> — annual percentage yield — is the rate a bank advertises, and it
          already accounts for compounding: interest earning interest on itself throughout the
          year. Two accounts both said to pay &ldquo;4%&rdquo; can pay meaningfully different
          amounts if one compounds daily and one compounds monthly — APY is the number that makes
          them comparable, because it&apos;s already the actual yearly return.
        </P>
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
          "A savings account is a loan you make to the bank, and the interest it pays is rent for the use of your money.",
          "APY already accounts for compounding, which is why it's the one number that makes two accounts' rates directly comparable.",
          "A typical checking account pays close to nothing, while a high-yield savings account can pay forty times more for the same idle cash.",
          "Moving idle cash from checking to a high-yield savings account is close to a free decision — same access, meaningfully more return.",
        ]}
      />
    </div>
  );
}
