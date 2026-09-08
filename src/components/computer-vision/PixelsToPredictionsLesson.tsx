import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { PixelWeightDial } from "@/components/computer-vision/PixelWeightDial";

export function PixelsToPredictionsLesson() {
  return (
    <div>
      <Lead>
        Strip a neural network down to the smallest thing that still deserves the name and you
        get something almost embarrassingly plain: one number per pixel, multiplied by its own
        personal weight, added together into a single score. It is a real classifier. It is also
        about to fail in an entirely predictable way, and watching it fail is the fastest way to
        understand why convolution exists at all.
      </Lead>

      <LessonSection id="a-weight-for-every-pixel" title="A weight for every pixel">
        <P>
          Take a small image — say 6 by 6, 36 pixels — and unroll it into a flat list of 36
          numbers. The simplest possible classifier assigns one learned weight to each of those
          36 positions, entirely independently. Pixel number 14 gets its own weight. Pixel number
          15, its immediate neighbour, gets a completely unrelated one. Nothing in the model
          knows they are next to each other.
        </P>
        <CodeBlock
          label="the whole model"
          code={`score = sum(pixel[i] * weight[i] for i in range(36))`}
        />
      </LessonSection>

      <LessonSection id="adding-them-up-into-one-score" title="Adding them up into one score">
        <P>
          Multiply every pixel value by its weight and add the 36 results together, and you get
          a single number: the score. Above some threshold, predict &ldquo;yes&rdquo; — this is
          the shape the model was trained to spot. Below it, predict &ldquo;no&rdquo;. That is
          the entire inference step, and it is trainable: adjust the 36 weights until
          the score comes out above threshold for positive examples and below it for negative
          ones.
        </P>
        <P>
          <Strong>The training is not the problem here.</Strong> The problem is what this
          particular shape of model — one independent weight per pixel — can and cannot learn,
          no matter how well it is trained.
        </P>
      </LessonSection>

      <LessonSection id="why-position-defeats-this-model" title="Why position defeats this model">
        <P>
          Below, four sliders control the weight for each quarter of a 6-by-6 grid, and a fixed
          bright 2-by-2 square sits in the top-left quarter — the &ldquo;shape&rdquo; this toy
          model is scoring. Set the weights, note the score, then press <InlineCode>Shift pattern
          one cell right</InlineCode>. The square moves one cell over. Nothing about its size or
          brightness changed. Watch the score anyway.
        </P>
        <P>
          It moves, often by a lot, because two of the four bright cells now sit under a
          different region&rsquo;s weight than they did before. <Strong>The model has no concept of
          &ldquo;a bright square,&rdquo; only of &ldquo;this exact pixel, at this exact
          position.&rdquo;</Strong> A shape it has correctly learned to recognise in one spot is,
          as far as its weights are concerned, an entirely different pattern one pixel over.
        </P>
      </LessonSection>

      <PixelWeightDial />

      <LessonSection id="what-convolution-fixes-about-it" title="What convolution fixes about it">
        <P>
          A convolution kernel, from the earlier chapter on filters, fixes exactly this failure.
          Instead of one independent weight per pixel position, a kernel is a small set of
          weights — say nine, for a 3-by-3 kernel — reused at every position in the image by
          sliding it across. The same nine numbers that detect a vertical edge in the top-left
          corner detect a vertical edge in the bottom-right corner too, because it is the same
          nine numbers doing the looking, wherever they happen to be looking.
        </P>
        <P>
          That single change — share the weights across positions instead of giving every pixel
          its own — is the entire reason a convolutional network can recognise a shape wherever
          it appears in the frame, rather than only in the one spot it happened to appear during
          training. It is also, not coincidentally, the direct motivation for stacking that
          operation into the deep networks the next chapter builds.
        </P>
        <Callout tone="success" title="One idea, reused everywhere">
          Weight sharing is the single idea that separates a convolutional network from the
          per-pixel model above. Everything else in a CNN — depth, pooling, stacking layers —
          is built on top of that one decision.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "The simplest possible image classifier multiplies every pixel by its own independent learned weight and adds the results into one score.",
          "That score is compared against a threshold to produce a yes-or-no prediction — the entire inference step in one sum.",
          "A per-pixel-weight model has no notion of shape, only of exact pixel position, because every pixel's weight is learned independently of its neighbours.",
          "Moving an identical shape by a single pixel can swing the score dramatically, since different pixels now fall under different learned weights.",
          "A convolution kernel fixes this by reusing the same small set of weights at every position, rather than learning a separate weight per pixel.",
          "Weight sharing, not depth, is the specific idea that lets a convolutional network recognise a pattern wherever it appears in the frame.",
        ]}
      />
    </div>
  );
}
