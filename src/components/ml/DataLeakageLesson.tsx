import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { LeakInspector } from "@/components/ml/LeakInspector";

export function DataLeakageLesson() {
  return (
    <div>
      <Lead>
        Every rule in this track so far has been about not letting a model see its test data.
        This chapter is about the ways it sees them anyway — through a column that should not
        exist, a row that appears twice, a date nobody thought about. The score comes out
        excellent. The model does not work. Nothing in the code looks wrong.
      </Lead>

      <LessonSection id="a-score-too-good-to-be-true" title="A score too good to be true">
        <P>
          Leakage is any situation where information reaches the model at training time that
          would not be available at prediction time. That is the entire definition, and it is
          worth reading twice, because it says nothing about bugs. Every pipeline below runs
          without error and reports a real number.
        </P>
        <P>
          The reason it is the most expensive mistake in applied machine learning is the
          direction of the error. Overfitting makes your test score look bad, so you notice.
          Leakage makes your test score look <em>good</em>, so you ship. The correction arrives
          later, from production, in public.
        </P>
        <P>
          Below are four pipelines over the same 360 loan applications, predicting whether a loan
          defaults. Three of them are lying. Read the code first.
        </P>
      </LessonSection>

      <LeakInspector />

      <LessonSection id="the-column-that-knows-the-answer" title="The column that knows the answer" delay={0.05}>
        <P>
          The first pipeline reports 95.3%. The honest number is 79.4%, so it is overstating by
          nearly sixteen points, and it does it by including a column called{" "}
          <Strong>collectionsCalls</Strong>.
        </P>
        <P>
          Collections calls are what the lender does after a borrower stops paying. The column is
          not a cause of default, it is a <em>record</em> of default, written down months after
          the decision the model is supposed to make. Feed it in and the model learns the world&apos;s
          least useful rule: people who got chased for money tended to default.
        </P>
        <P>
          This is <Strong>target leakage</Strong>, and it is the most common serious version. It
          hides well because the column is real, populated, and obviously relevant. Nothing about
          the data says when it was written. The only defence is asking, for every column, one
          question: would this value be sitting in front of me at the moment I need the
          prediction? For collections calls the answer is no, and no amount of accuracy changes
          that.
        </P>
        <Callout tone="danger" title="Suspiciously good is a symptom, not a triumph">
          If a hard problem suddenly scores in the high nineties, the first hypothesis is leakage,
          not brilliance. Fraud detection, medical diagnosis and default prediction are hard
          because the outcome is not determined by what you can observe beforehand. A
          model that has apparently solved one of them has usually found a column it should not
          have.
        </Callout>
      </LessonSection>

      <LessonSection id="leaks-through-the-back-door" title="Leaks that come through the back door">
        <P>
          The other two are subtler, and neither involves a suspicious column.
        </P>
        <P>
          <Strong>Splitting rows instead of people.</Strong> Forty-five of these applicants
          reapplied twice, on almost identical terms, with the same eventual outcome. Split the
          table row by row and the same person sits on both sides of the wall. The model
          recognises them rather than generalising to them.
        </P>
        <P>
          Here it is worth 0.9 of a point, which is the honest and rather deflating answer. That
          smallness is the danger: nobody reviews a pipeline over a one-point discrepancy. Change
          the setting to a hospital, where one patient contributes fifty rows across a year of
          visits, and the identical mistake is worth twenty points.
        </P>
        <P>
          <Strong>Splitting at random when time matters.</Strong> The default rate on these loans
          drifts upward across the two years. A random split hands the model applications from
          month 20 and asks it about month 4 — it has read the ending. This pipeline reports
          85.8% against an honest 79.4%.
        </P>
        <P>
          Notice that this single careless line commits two leaks at once. It ignores time{" "}
          <em>and</em> puts the reapplications back on both sides. That is the normal case. Real
          pipelines rarely have one clean flaw; they have a default `train_test_split` call and
          a table nobody interrogated.
        </P>
      </LessonSection>

      <LessonSection id="catching-it-before-production" title="Catching it before production does">
        <P>
          There is no library for this. Leakage is a property of what your columns mean and where
          your rows came from, and no function can read a data dictionary. What there is instead
          is a short list of questions, asked before the first model is fitted.
        </P>

        <ChecklistCard
          title="Before you trust a score"
          intro="Four questions, asked of the data rather than the code."
          items={[
            "For every column: would this value exist, populated, at the moment the prediction is needed? If it is recorded later, drop it.",
            "Can one real-world entity — a person, a patient, a device — appear in more than one row? If so, split on the entity, never on the row.",
            "Does the data have an order that matters? If anything is timestamped, the test set must be later than the training set, not scattered through it.",
            "Was anything computed over the whole dataset before the split — a scaler, an average, a filled-in missing value? Fit it on the training set and apply it to the test set.",
          ]}
        />

        <P>
          The last one is worth a note of proportion. Fitting a scaler on everything is the
          textbook example of leakage, and on this data it moves the score by so little that the
          pipeline is not worth showing. It is still wrong, and it still belongs in a pipeline
          object rather than in a line above the split — but a beginner who is worrying about
          their scaler while their table has three rows per customer is worrying about the wrong
          end.
        </P>
        <Callout tone="tip" title="The question that catches most of it">
          Ask where each column comes from and who fills it in. Most target leakage is obvious
          the moment somebody describes the process that produces a column, and completely
          invisible from the column itself. The people who can answer that question usually do
          not work on the model.
        </Callout>
        <P>
          One last habit, and it is the cheapest insurance in this track. Keep a slice of data
          that is later than everything you trained on, do not look at it while you are
          building, and score it once at the end. It cannot catch a leaked column — that one
          leaks into every slice equally — but it catches every mistake involving time or
          duplication, which is most of them.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Leakage is information reaching the model at training time that would not be available at prediction time. It is not a bug and produces no error.",
          "It inflates your score, which is why it survives review — overfitting makes you look bad and gets fixed, leakage makes you look good and gets shipped.",
          "Target leakage means a column recorded after the outcome. Here it overstated the score by 15.9 points.",
          "Ask of every column: would this value be in front of me when the prediction is needed?",
          "Split on the entity, not the row. One person appearing on both sides is worth under a point here and twenty in a dataset with fifty rows per person.",
          "If anything is timestamped, the test set must come after the training set. A random split on this data overstated by 6.4 points.",
          "Fit scalers and imputers on the training set only — a small leak, and still worth closing.",
          "A suspiciously high score on a hard problem is evidence of leakage before it is evidence of skill.",
        ]}
      />
    </div>
  );
}
