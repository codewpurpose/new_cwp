import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { HiddenUnitDial } from "@/components/ml/HiddenUnitDial";

export function NeuralNetworksLesson() {
  return (
    <div>
      <Lead>
        Call it a neural network and it sounds like it thinks. It does not. Take the word apart
        and what is left is machinery you already built by hand, earlier in this track — copied
        several times over, with one deliberate kink wedged between the copies. This chapter is
        that machinery, with the mystique stripped off.
      </Lead>

      <LessonSection id="what-is-actually-inside-one" title="What is actually inside one">
        <P>
          Start with a single unit — one circle in any diagram you have ever seen of a network.
          Inside it: a weighted sum of its inputs, plus a bias —{" "}
          <InlineCode>z = w1·x1 + w2·x2 + … + b</InlineCode>. That is the
          exact shape of the model you built in{" "}
          <Strong>How a Model Learns</Strong>, just admitting the one term that example
          deliberately left out. Nothing about a single unit is neural in any sense a biologist
          would recognise. It is a straight-line fit, drawn as a circle instead of a graph.
        </P>
        <P>
          A network is many of these, arranged in layers, each layer&rsquo;s output feeding the next
          layer&rsquo;s input. So try the obvious question: what happens if you stack two of these
          weighted sums, with nothing in between?
        </P>
        <CodeBlock
          label="Stacking two linear layers, with nothing between them"
          variant="code"
          code={
            "layer 1:  h = W1x + b1\n" +
            "layer 2:  y = W2h + b2\n" +
            "        = W2(W1x + b1) + b2\n" +
            "        = (W2W1)x + (W2b1 + b2)"
          }
        />
        <P>
          The last line is a weighted sum and a bias. Nothing else survives. Layer two just
          relabelled layer one&rsquo;s numbers — <InlineCode>W2W1</InlineCode> is one matrix,{" "}
          <InlineCode>W2b1 + b2</InlineCode> is one bias — and ten stacked layers collapse the
          same way, in one more step each. A network built entirely from this circle, however
          deep, can compute nothing that a single weighted sum could not.
        </P>
        <P>
          Which means the activation function — the one piece not yet mentioned — is not a
          detail bolted onto the design. It is the entire reason stacking layers does anything at
          all.
        </P>
      </LessonSection>

      <LessonSection id="the-bend-that-changes-everything" title="The bend that changes everything">
        <P>
          The activation most networks reach for by default is called ReLU, and the name is more
          intimidating than the definition. The whole of it: <Strong>negatives become zero</Strong>.
          Feed a unit&rsquo;s weighted sum through ReLU and anything above zero passes through
          untouched; anything below zero is clamped to exactly zero.
        </P>
        <P>
          One unit, run through that, gives you one fold in an otherwise straight line — flat on
          one side, sloped on the other. That alone breaks the collapse from the last section: a
          fold is not a weighted sum, so relabelling stops working, and stacking starts buying
          you something.
        </P>
        <P>
          One fold is not a curve. But a handful of them, each oriented and positioned
          differently by training, cut the input into a patchwork of flat pieces that — looked at
          from far enough away — trace something that bends. A network never has a{" "}
          <InlineCode>circle</InlineCode> or a <InlineCode>curve</InlineCode> operation available
          to it. It only ever has straight pieces, glued together at a growing number of folds.
          Watch that happen below: an inner ring and an outer ring that no straight line can
          separate, and a decision boundary built entirely out of ReLU folds, one hidden unit at
          a time.
        </P>
      </LessonSection>

      <HiddenUnitDial />

      <LessonSection
        id="width-depth-and-what-each-buys"
        title="Width, depth, and what each one buys"
        delay={0.05}
      >
        <P>
          At zero hidden units the widget above is exactly the straight-line model from the first
          section, and it shows: 62.5% on the points it trained on, 61.7% on the ones it did not
          — barely past guessing, because half of each ring sits on either side of any line you
          could draw. One or two units bend that line slightly and buy almost nothing (69.2%,
          then 85.0% training accuracy, with validation trailing well behind at 63.3% and 68.3%).
          By three units the fold count catches up with the shape: 99.2% training accuracy, 93.3%
          held back. Five is where this particular ring stops needing help — 98.3% on data it
          never trained on, the best any width reaches here. Pushing on to eight buys nothing
          further: training accuracy tops out at 100%, and validation sits exactly where it sat
          at five. The extra capacity is not fitting the ring any better. It is chasing individual
          training points that happened to land where they did.
        </P>
        <P>
          That is <Strong>width</Strong> — more units in the same layer, each one a fresh fold
          available at once. <Strong>Depth</Strong> is the other axis: more layers, stacked, so a
          fold in a later layer can bend a fold the earlier layer already made.
        </P>
        <CompareGrid
          items={[
            {
              title: "More width",
              tone: "neutral",
              children: (
                <P>
                  More independent folds side by side in one layer. Cheap to reason about, and
                  exactly what the widget above is varying — every extra unit is one more straight
                  edge available to carve the input with.
                </P>
              ),
            },
            {
              title: "More depth",
              tone: "neutral",
              children: (
                <P>
                  Later layers get to compose what earlier layers already folded. A bend of a bend
                  can trace shapes that would need far more width to fake with a single layer —
                  which is why deep networks, not just wide ones, became the default.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="What the universal approximation theorem does not say">
          There is a real theorem here, and it gets quoted like a design instruction: a single
          hidden layer, wide enough, can approximate any continuous function to any accuracy you
          like. Read it again. It says the weights <em>exist</em>. It says nothing about whether
          gradient descent — the walking-downhill loop from a couple of chapters back — will ever
          find them, and nothing about how much data you would need to pin them down even if it
          did. A proof of existence is not a recipe, and &ldquo;wide enough&rdquo; is doing all of
          the work that the theorem declines to quantify.
        </Callout>
      </LessonSection>

      <LessonSection id="what-they-cost-you" title="What they cost you">
        <P>
          None of the above is an argument against networks. It is the case for reading this
          section before reaching for one, because everything that made the models earlier in
          this track pleasant to work with, a network mostly gives up.
        </P>
        <ChecklistCard
          title="What you are actually signing up for"
          items={[
            <>
              <Strong>Far more data.</Strong> The ring above lives in two dimensions and still
              needed 120 training points to fit well. A network doing anything real is fitting
              thousands or millions of numbers, and each one needs examples to pin it down. The
              trees, forests, and neighbour models earlier in this track were routinely trained on
              dozens of rows.
            </>,
            <>
              <Strong>Many more knobs, and no formula for most of them.</Strong> How many units,
              how many layers, which learning rate, how long to train, how the weights start —
              each is set before training begins, usually by trial. Regularisation, the
              complexity rent from the last chapter, is still one lever among a dozen others here,
              tuned the same trial-based way.
            </>,
            <>
              <Strong>Much harder to interrogate when it is wrong.</Strong> A decision tree can
              name, in one sentence, which split sent a case down the wrong branch. Ask a network
              the same question about one wrong prediction and the honest answer is that
              thousands of numbers shared the blame, in proportions nobody has agreed how to
              compute. Finding out why a network is wrong is a research problem, not a debugging
              session.
            </>,
            <>
              <Strong>Frequently beaten on the data you actually have.</Strong> Feed a rows-and-columns
              dataset — the shape every model in this track has trained on — to a well-tuned
              gradient-boosted tree, and it routinely beats a neural network of any width or
              depth, for less tuning and none of the data appetite. Reaching for a network on
              tabular data is usually solving a problem you do not have.
            </>,
          ]}
        />
        <P>
          The next chapter does not touch the model at all. It assumes you already have one that
          scores well and asks the harder question: what happens to that number on Tuesday&rsquo;s
          data, six months from now, once nobody is watching it. The model was never the hard
          part. Keeping it working is.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A unit is a weighted sum and a bias — the same shape from How a Model Learns — and stacking that shape with nothing between the layers collapses straight back into one linear layer.",
          "ReLU is the entire trick: negatives become zero. Every curve a network draws is straight pieces, folded together in growing numbers.",
          "Width adds independent folds side by side; depth lets later folds bend what earlier ones already bent.",
          "The universal approximation theorem proves the right weights exist. It says nothing about whether gradient descent can find them or how much data that would take.",
          "On ordinary spreadsheet-shaped data a well-tuned gradient-boosted tree usually beats a network outright. Reach for one because the problem needs it, not because it sounds more advanced.",
        ]}
      />
    </div>
  );
}
