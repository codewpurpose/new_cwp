import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ConfusionGrid } from "@/components/computer-vision/ConfusionGrid";

export function ConfusionMatrixForVisionLesson() {
  return (
    <div>
      <Lead>
        A classifier that scores 78% sounds like it has a fifth of a problem, spread evenly across
        everything it looks at. It almost never is. Most of that missing fifth usually comes from
        one pair of classes the model cannot reliably tell apart, while the other three are nearly
        perfect — and a single accuracy number cannot say which shape of failure you have.
      </Lead>

      <LessonSection id="accuracy-hides-which-classes-fail" title="Accuracy hides which classes fail">
        <P>
          Imagine a five-class animal classifier — cat, dog, fox, wolf, coyote — evaluated on 250
          held-out photos, 50 per class. Report one number, and 78.4% is what comes back. That is a
          respectable score for a five-way problem with random chance at 20%.
        </P>
        <P>
          It is also compatible with wildly different failure modes. A model that is <Strong>a
          little</Strong> wrong on every class could land at 78.4%. So could a model that is
          essentially flawless on cats, dogs and foxes and badly, specifically wrong about wolves
          and coyotes. Same headline number, two completely different engineering problems, and
          nothing about &ldquo;78.4% accuracy&rdquo; tells you which one you are looking at.
        </P>
      </LessonSection>

      <LessonSection id="the-matrix-behind-the-single-number" title="The matrix behind the single number">
        <P>
          Every accuracy score is an average over a matrix, and the matrix is what actually
          happened. Rows are the truth — what the photo really shows. Columns are the
          prediction — what the model said. Cell (row, column) is a count: how many photos of the
          row&rsquo;s class the model called the column&rsquo;s class.
        </P>
        <P>
          The diagonal — row equals column — is where the prediction matched reality. Everything
          off the diagonal is a mistake, and unlike the accuracy number, it is a <Strong>nameable</Strong>{" "}
          mistake: not just &ldquo;wrong&rdquo;, but wrong in one specific, countable direction. 19
          wolves called coyotes is a different fact from 19 wolves called cats, even though both
          would show up identically in the overall score.
        </P>
      </LessonSection>

      <ConfusionGrid />

      <LessonSection
        id="finding-the-pair-that-drives-the-error"
        title="Finding the pair that drives the error"
      >
        <P>
          Click through the matrix above and one pair dominates. Cats, dogs and foxes are each
          confused with something else once or twice out of fifty — noise, essentially. Wolves and
          coyotes are a different story: 19 wolves called coyotes, 21 coyotes called wolves, out of
          50 of each. That is 40 of the 54 total errors in the entire matrix, from one pair of
          classes out of five.
        </P>
        <P>
          That number changes what you would do next. Improving every class&rsquo;s accuracy by a
          point each is 5 points of work for a few points of overall gain. Fixing the wolf/coyote
          confusion alone — better ear and muzzle features, more training photos of exactly this
          pair side by side — recovers up to 40 of the 54 errors on its own, which would push
          accuracy from 78.4% into the low-to-mid 90s. <Strong>The matrix tells you where to spend
          the next month</Strong>, and the single number never could.
        </P>
        <Callout tone="tip" title="Where this generalises">
          Real classifiers rarely have five classes; a hundred or a thousand is common, and the
          matrix is a hundred-by-hundred or thousand-by-thousand grid. The technique does not
          change: sort the off-diagonal cells by count and look at the top few. The dominant
          confusion is almost always a small number of visually or semantically similar classes,
          not a uniform smear.
        </Callout>
      </LessonSection>

      <LessonSection
        id="what-a-clean-diagonal-does-not-prove"
        title="What a clean diagonal does not prove"
      >
        <P>
          Suppose the test set above had 50 cats, 50 dogs and 50 birds instead of wolves and
          coyotes — three classes nobody, model or human, seriously confuses. The diagonal would
          look close to perfect, accuracy would land somewhere near 98%, and it would prove almost
          nothing about whether the model has learned to see.
        </P>
        <P>
          A clean diagonal on an easy test set is not evidence the model handles hard cases well.
          It is evidence the test set did not contain any hard cases. The wolf/coyote pair above is
          hard because the two animals genuinely look alike at the pixel level — similar coat
          colour, similar build, overlapping habitats in photos. A benchmark that never pairs
          visually similar classes together will never surface that failure, no matter how good the
          model&rsquo;s overall score looks.
        </P>
        <P>
          The honest question is not &ldquo;what is the accuracy&rdquo; but &ldquo;which confusable
          pairs did this test set actually contain&rdquo;. A model can be genuinely excellent at
          telling a cat from a bird and still fail constantly at the one distinction its
          deployment will actually need.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A single accuracy number is an average over a confusion matrix, and the same score can hide either uniform weakness or one badly confused pair of classes.",
          "The matrix's rows are truth and its columns are prediction; the diagonal is correct, and every off-diagonal cell names a specific, countable mistake.",
          "In the five-class example, wolves and coyotes alone accounted for 40 of 54 total errors — fixing that one pair would do more than spreading effort evenly across all five classes.",
          "Sorting off-diagonal cells by count, not staring at the overall percentage, is how you find where to spend engineering time next.",
          "A clean diagonal proves the test set had no hard, visually similar pairs in it — not that the model would survive one if it showed up.",
        ]}
      />
    </div>
  );
}
