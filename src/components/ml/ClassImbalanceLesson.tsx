import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ImbalanceDial } from "@/components/ml/ImbalanceDial";

export function ClassImbalanceLesson() {
  return (
    <div>
      <Lead>
        Chapter seven opened with a model that did nothing and scored 99.7%. This is what to do
        about it. The answer most tutorials give — rebalance the data — turns out to be an
        expensive way of doing something you can do for free, and this chapter is mostly about
        why.
      </Lead>

      <LessonSection id="the-rare-thing-is-the-point" title="The rare thing is the whole point">
        <P>
          Four thousand card transactions. Seventy-five are fraudulent, which is one in
          fifty-three. Train a perfectly ordinary logistic regression on them, take the usual
          probability cut-off of 0.5, and it flags nothing at all. Not one transaction. It scores
          98.1% accuracy.
        </P>
        <P>
          The model is not broken and it has not failed to learn. It has learned correctly that
          under the loss it was handed, guessing &ldquo;legitimate&rdquo; every time is the best
          available strategy. Every fraud costs it a little; every false alarm would cost it a
          little; there are fifty-three times as many chances to be wrong on the second. The
          arithmetic is unarguable and the result is useless.
        </P>
        <P>
          This is what imbalance does. The rare class is always the one you care about — the
          fraud, the tumour, the failing part — and it is always the one the default loss
          function is happiest to sacrifice.
        </P>
      </LessonSection>

      <ImbalanceDial />

      <LessonSection id="three-ways-to-rebalance" title="Three ways to rebalance, and what each costs" delay={0.05}>
        <P>
          The standard advice is to fix the data. There are three ways, and you should try all
          three in the panel above before reading on.
        </P>
        <P>
          <Strong>Undersampling</Strong> keeps every fraud and throws away legitimate
          transactions until the classes are level. It works, and it means learning the
          legitimate half of the problem from a few dozen rows out of two and a half thousand.
          You paid for that data.
        </P>
        <P>
          <Strong>Oversampling</Strong> keeps everything and copies each fraud until the counts
          match. Nothing is discarded, and nothing is added either — the model sees the same
          forty-eight frauds fifty times each and becomes confident about their particular
          quirks rather than about fraud.
        </P>
        <P>
          <Strong>Class weighting</Strong> leaves the rows alone and charges a mistake on a fraud
          fifty-three times what it charges a mistake on a legitimate transaction. Nothing is
          duplicated or deleted, which is why it is usually the right one of the three to reach
          for.
        </P>
        <P>
          Now the finding that should bother you. All three produce{" "}
          <Strong>the same result</Strong>: 59% recall, 4% precision, about 413 transactions
          flagged. Not similar — the same, to the row. Three different interventions, one outcome.
        </P>
        <Callout tone="note" title="Why they collapse into one another">
          For a linear model, all three do the same arithmetic. Duplicating a row fifty times and
          weighting it fifty times contribute identically to the gradient; discarding the majority
          class changes the same ratio from the other end. What each one really changes is the
          model&apos;s idea of how common fraud is — which shifts the intercept, which moves the
          probability at which it starts saying yes. Nothing else about the model moves at all.
          With a tree or a forest they can diverge, but rather less than the amount of
          writing about them suggests.
        </Callout>
      </LessonSection>

      <LessonSection id="moving-the-threshold-instead" title="Moving the threshold instead">
        <P>
          If all three are really moving the cut-off, then move the cut-off. Take the original
          model, trained on the untouched imbalanced data, and flag anything above a probability
          of 0.025 rather than 0.5.
        </P>
        <P>
          That reproduces the rebalanced result almost exactly: 59% recall, 4% precision, 372
          flagged. Same answer, no retraining, no discarded data, no duplicated rows.
        </P>
        <P>
          And once the cut-off is a dial rather than an accident, you can put it where the problem
          actually wants it. At 0.076 the model catches 30% of frauds at 14% precision, flagging
          56 transactions instead of 413. By F1 that is 0.19 against the 0.07 all three
          rebalancing strategies managed — nearly three times better, from changing one number
          after training.
        </P>
        <Callout tone="tip" title="0.5 was never a considered choice">
          A probability cut-off of 0.5 is the library default, not a recommendation. It is only
          correct when the classes are balanced and a false positive costs exactly what a false
          negative costs. On a fraud problem neither is true, and nothing warns you, because a
          default never announces itself as a decision.
        </Callout>
        <P>
          Which threshold is right is not a question the data can answer. A review team that can
          process sixty cases a day sets it one way; an automatic block on a customer&apos;s card
          sets it far more cautiously, because the cost of a false positive is a stranded
          customer. Pick the operating point from the cost of each mistake, then report where you
          picked it and why.
        </P>
      </LessonSection>

      <LessonSection id="what-to-report" title="What to report when the classes are lopsided">
        <P>
          Accuracy is the first thing to drop. At 98.1% for a model that flags nothing, it is not
          merely uninformative here — it actively rewards the failure. Any imbalanced problem
          where somebody quotes accuracy is a problem where nobody has looked closely.
        </P>
        <P>
          Report precision and recall as a pair, at a stated threshold, and say how many cases
          that threshold sends to a human. F1 combines the two into one number, which is
          convenient for comparing models and hides the trade-off you actually need to argue
          about, so quote it alongside its parts rather than instead of them.
        </P>
        <Callout tone="warning" title="Never rebalance the test set">
          Everything above resampled training data only. If you rebalance the held-back
          transactions too, you have built a test set where fraud is one in two, measured
          performance in a world that does not exist, and thrown away the only honest estimate you
          had. The test set keeps the rate it has in reality. Always.
        </Callout>
        <P>
          The uncomfortable summary: for a rare class, most of what you can do is choose which
          kind of mistake to make. Fifty-three to one is a hard problem, the model here tops out
          around 14% precision at 30% recall, and no amount of resampling changes the information
          in the data. Recognising that early is worth more than a better sampler.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "With one fraud in fifty-three, a correctly trained model flagged nothing at all and scored 98.1% accuracy. It had learned the right answer to the wrong question.",
          "Undersampling discards data you paid for; oversampling duplicates rows without adding information; class weighting leaves the data alone and is usually the best of the three.",
          "All three produced identical results here — 59% recall at 4% precision — because for a linear model they all do the same thing: shift where the model starts saying yes.",
          "Moving the decision threshold on the untouched model reproduced that exact result with no retraining.",
          "Choosing the threshold deliberately reached F1 0.19 against 0.07 for every rebalancing strategy.",
          "A cut-off of 0.5 is a library default, correct only when the classes are balanced and both mistakes cost the same.",
          "Pick the operating point from what each mistake costs, then report precision and recall at that threshold — never accuracy alone.",
          "Resample the training set if you like. Never resample the test set.",
        ]}
      />
    </div>
  );
}
