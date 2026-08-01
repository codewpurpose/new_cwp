import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { SplitLottery } from "@/components/ml/SplitLottery";

export function TrainTestSplitLesson() {
  return (
    <div>
      <Lead>
        There is one rule in machine learning that everything else leans on, and it is this: a
        model must never be graded on the examples it studied. This lesson is why that rule
        exists, and what it costs to follow it.
      </Lead>

      <LessonSection id="grading-your-own-homework" title="Grading your own homework">
        <P>
          Imagine revising for an exam using a set of past questions, then being tested on those
          exact questions. You would score brilliantly, and the score would tell nobody anything
          about whether you understood the subject.
        </P>
        <P>
          A model is worse than you at this, because it has a perfect memory. Give it enough
          capacity and it can store the answers outright — and then report a near-perfect score
          on them, honestly and uselessly.
        </P>
      </LessonSection>

      <LessonSection id="holding-some-back" title="Holding some back">
        <P>
          The fix is simple enough to state in one sentence. Before training, put some of your
          data in a drawer. Train on the rest. Grade on the drawer.
        </P>
        <P>
          The data you train on is the <Strong>training set</Strong>. The data in the drawer is
          the <Strong>test set</Strong>. The test set has to stay in the drawer — if you look at
          it, tune your model, and look again, you have started revising for those questions
          too, just more slowly.
        </P>
      </LessonSection>

      <LessonSection id="the-score-is-a-lottery-ticket" title="The score is a lottery ticket">
        <P>
          Now the part nobody tells beginners. Which examples go in the drawer is decided at
          random — and that choice changes your score.
        </P>
        <P>
          Below, the same sixty students are split many different ways at each setting. You only
          ever perform one split in real life, so you only ever see one of those dots. Drag the
          slider and watch how much they disagree.
        </P>
      </LessonSection>

      <SplitLottery />

      <LessonSection id="how-much-to-hold-back" title="How much to hold back" delay={0.05}>
        <P>
          At a 5% test set the reported score swings by nearly six points depending purely on
          which three students landed in the drawer. You would never learn that. You would run
          it once, write down whatever you got, and believe it.
        </P>
        <P>
          Hold back more and the estimate steadies, because you are averaging over more people.
          By 70% the spread is about a fifth of what it was. That is the trade: a bigger test set
          buys you a more trustworthy number.
        </P>
        <Callout tone="tip" title="What it costs — and what it does not, here">
          The usual warning is that holding back too much starves the model. In this data it
          barely does: even with fifteen students to learn from, the model is about as good as
          with fifty-four. That is worth noticing rather than glossing over — a{" "}
          <em>simple</em> model needs very few examples. How much data you need depends on how
          complicated your model is, which is exactly the next lesson.
        </Callout>
        <P>
          In practice people hold back somewhere between 20% and 30%, which is a compromise
          rather than a law. Now you know what is being traded on each side of it.
        </P>
        <P>
          One more thing visible in the chart: the training error line sits{" "}
          <Strong>below</Strong> the test line at every single setting. That gap never closes,
          and it is the model flattering itself. Never quote a training score as though it were
          a measure of how good your model is.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Never grade a model on data it trained on. It has a perfect memory and will score brilliantly for no reason.",
          "Put some data in a drawer before training, and keep it there.",
          "Which examples land in the drawer is random, and that changes your score — a small test set makes the number a lottery.",
          "A bigger test set buys a more trustworthy estimate. That is the whole trade.",
          "Training error sits below test error at every split. It always flatters, so never quote it.",
        ]}
      />
    </div>
  );
}
