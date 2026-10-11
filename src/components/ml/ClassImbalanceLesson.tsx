import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
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
          In this experiment, all three come down to the same arithmetic. Duplicating a row fifty
          times and weighting it fifty times contribute identically to the gradient; discarding
          the majority class changes the same ratio from the other end. What each one mainly
          changed here was the model&apos;s idea of how common fraud is — which shifts the
          intercept, which moves the probability at which it starts saying yes. That is a result
          about this data, not a law of linear models: undersampling can throw away rows that
          shaped the boundary, and a penalty on the weights can make the slopes shift as well.
          With a tree or a forest the three diverge more readily.
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
        <P>
          Here is the same comparison on a fresh set of generated transactions, about one in
          fifty fraudulent.
        </P>
        <CodeBlock
          label="cutoff.py"
          code={`import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(1)
n = 6000
fraud = rng.random(n) < 0.02                       # about 1 in 50
amount = rng.normal(0, 1, n) + 1.2 * fraud         # fraud skews larger...
night = rng.normal(0, 1, n) + 0.8 * fraud          # ...and later, with heavy overlap
X = np.column_stack([amount, night])
X_train, X_test, y_train, y_test = train_test_split(
    X, fraud, test_size=0.5, stratify=fraud, random_state=0)

print(f"flag nothing: accuracy {np.mean(~y_test):.1%}, recall 0%")

def report(name, flagged):
    print(f"{name:28} recall {recall_score(y_test, flagged):.0%}"
          f"   precision {precision_score(y_test, flagged):.0%}   flagged {flagged.sum()}")

plain = LogisticRegression().fit(X_train, y_train)
report("plain model, cut-off 0.5", plain.predict(X_test))

weighted = LogisticRegression(class_weight="balanced").fit(X_train, y_train)
report("class weights, cut-off 0.5", weighted.predict(X_test))

# No retraining: just lower the plain model's cut-off.
for cutoff in [0.1, 0.04, 0.02]:   # try others
    report(f"plain model, cut-off {cutoff}", plain.predict_proba(X_test)[:, 1] >= cutoff)`}
        />
        <P>
          Flagging nothing scores 98.1% accuracy. The plain model at 0.5 catches 5% of frauds;
          class weighting catches 80% by flagging 707 transactions. Lowering the plain
          model&rsquo;s cut-off to 0.02, with no retraining, lands next to it: 77% recall, 6%
          precision, 684 flagged.
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
          "All three produced identical results here — 59% recall at 4% precision — because in this logistic regression they all did the same thing: shift where the model starts saying yes.",
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
