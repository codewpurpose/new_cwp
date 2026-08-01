import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { BucketDial } from "@/components/ml/BucketDial";

export function ClassificationVsRegressionLesson() {
  return (
    <div>
      <Lead>
        Almost every supervised problem is one of two shapes, and telling them apart is easy.
        What is less obvious — and much more useful — is that the line between them is a choice
        you make, and moving it changes what your accuracy score is even measuring.
      </Lead>

      <LessonSection id="two-kinds-of-question" title="Two kinds of question">
        <CompareGrid
          items={[
            {
              title: "Classification",
              tone: "positive",
              children: (
                <p>
                  The answer is one of a fixed set of categories. Spam or not spam. Cooked or
                  doughy. Which of ten digits. You measure it with{" "}
                  <strong>accuracy</strong> — how often the named category was right.
                </p>
              ),
            },
            {
              title: "Regression",
              tone: "positive",
              children: (
                <p>
                  The answer is a number on a scale. Minutes. Price. Temperature tomorrow. You
                  measure it with <strong>average miss</strong> — how far off you typically
                  were, in the units of the thing itself.
                </p>
              ),
            },
          ]}
        />
        <P>
          That is the whole distinction, and you can usually tell within a sentence of hearing
          the problem. &ldquo;Will this customer cancel?&rdquo; is classification. &ldquo;How
          much will they spend?&rdquo; is regression.
        </P>
      </LessonSection>

      <LessonSection id="the-same-model-both-ways" title="The same model, both ways">
        <P>
          Here is the interesting part. A number can always be chopped into categories.
          &ldquo;How many minutes will this delivery take?&rdquo; becomes &ldquo;is it fast or
          slow?&rdquo; the moment you pick a dividing line — and now the same problem is a
          classification.
        </P>
        <P>
          Below, one model predicts delivery time from distance. The only thing the slider
          changes is how many categories that prediction gets rounded into.
        </P>
      </LessonSection>

      <BucketDial />

      <LessonSection id="accuracy-is-not-comparable" title="Accuracy is not comparable" delay={0.05}>
        <P>
          Drag from two buckets to twenty and watch the two numbers move in{" "}
          <Strong>opposite directions</Strong>. Accuracy falls off a cliff. The average miss —
          how wrong the answer actually is, in minutes — gets better.
        </P>
        <P>
          At two categories the model is right most of the time, and telling a customer their
          delivery is &ldquo;slow&rdquo; when that covers a half-hour window is nearly useless.
          At twenty categories it is right far less often, and its answer is far more use.
        </P>
        <Callout tone="warning" title="The mistake this is here to prevent">
          A beginner sees 84% accuracy and thinks &ldquo;good model&rdquo;, then sees 12% and
          thinks &ldquo;broken model&rdquo;. Both numbers come from the same model on the same
          data. Accuracy depends on how many categories you chose, so it is{" "}
          <Strong>meaningless to compare across differently-shaped questions</Strong>. Ninety
          percent on a two-category problem may be worse than thirty on a twenty-category one.
        </Callout>
      </LessonSection>

      <LessonSection id="choosing-the-shape" title="Choosing the shape of your answer" delay={0.05}>
        <P>
          So which should you build? Ask what the person receiving the answer will actually do
          with it.
        </P>
        <P>
          If they need to <Strong>act differently</Strong> depending on the answer — approve or
          decline, urgent or routine — categories are the right shape, and you should pick the
          boundaries to match those actions rather than splitting the range evenly.
        </P>
        <P>
          If they need to <Strong>plan against a quantity</Strong> — how many drivers, how much
          stock, when to leave — give them the number. Notice in the chart that no amount of
          bucketing ever quite catches the plain number: rounding an answer into a band can only
          lose information, never add it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Classification predicts a category and is scored with accuracy. Regression predicts a number and is scored with average miss.",
          "Any number can be turned into categories by choosing dividing lines — so the distinction is partly your decision.",
          "Chopping a number into more categories makes accuracy fall while the answer gets more useful.",
          "Accuracy cannot be compared across problems with different numbers of categories. It is not a universal score.",
          "Choose categories when someone will act differently on each one; choose a number when they need to plan against it.",
        ]}
      />
    </div>
  );
}
