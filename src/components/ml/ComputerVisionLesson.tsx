import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ConvolutionExplorer } from "@/components/ml/ConvolutionExplorer";

export function ComputerVisionLesson() {
  return (
    <div>
      <Lead>
        You have heard that a neural network can recognise a cat. It cannot see one. What arrives at
        the network is a grid of brightness values, and what it learns is a stack of tiny filters
        that each react to one kind of edge. This lesson is that filter, made concrete: nine numbers
        and a little arithmetic, slid over a picture until something appears.
      </Lead>

      <LessonSection id="an-image-is-a-grid-of-numbers" title="An image is a grid of numbers">
        <P>
          Open any photo far enough and it stops being a photo. It is a rectangle of pixels, and
          each pixel is a number: how bright that spot is, from 0 for black to 1 for white. A small
          grey square is <Strong>0.4</Strong>. Its neighbour is <Strong>0.41</Strong>. There is no
          &ldquo;cat&rdquo; anywhere in the file — only a few hundred thousand of these values laid
          out in a grid.
        </P>
        <P>
          Colour changes nothing important. A colour image is three of these grids stacked — one
          for red, one for green, one for blue — and everything below works the same on each. The
          picture on the right is a single 14&times;14 grid, drawn so you can read the numbers off
          it: the disc is a patch of high values, the dark background is low ones.
        </P>
        <P>
          So the question of vision is not &ldquo;what is in the picture&rdquo;. It is a narrower,
          answerable one: <Strong>what can you compute from a grid of numbers</Strong> that tells
          you a corner is here, or a stroke of fur runs there?
        </P>
      </LessonSection>

      <LessonSection
        id="a-filter-is-nine-numbers-and-some-arithmetic"
        title="A filter is nine numbers and some arithmetic"
      >
        <P>
          Here is the whole operation. Take a small square of weights — three by three, so nine
          numbers. Lay it over one pixel and its eight neighbours. Multiply each pixel by the weight
          sitting on top of it, add the nine products up, and write the total into that pixel&rsquo;s
          spot in a new grid. That is a <Strong>convolution</Strong>, and it is the only arithmetic
          in this entire field that you cannot skip.
        </P>
        <P>
          The nine weights are the filter, and their pattern is everything. Make them all{" "}
          <Strong>one-ninth</Strong> and each pixel becomes the average of its neighbourhood: the
          picture blurs. Make the centre large and its neighbours negative and you get the opposite,
          a sharpen. Make them sum to <Strong>zero</Strong> and something stranger happens — a flat
          region cancels itself out to black, and only the places where brightness changes survive.
          That last one is an edge detector, and it is doing arithmetic, not magic.
        </P>
        <P>
          Drag the strength below from nothing to full. At zero you see the original untouched; on
          the way up, the filter&rsquo;s effect fades in, so you can watch exactly what those nine
          numbers add and take away.
        </P>
      </LessonSection>

      <ConvolutionExplorer />

      <LessonSection id="the-same-window-slid-everywhere" title="The same window, slid everywhere">
        <P>
          Notice what the filter is not. It is not a rule about the disc, or about the right-hand
          bar. It is nine numbers that know nothing about where they are, and they are applied at{" "}
          <Strong>every position in the grid</Strong>, unchanged. The edge filter finds the edge of
          the disc and the edge of the bar with the same nine weights, because an edge is an edge
          wherever it sits.
        </P>
        <P>
          That reuse is the point, and it buys two things at once. An edge detector learned in the
          top-left corner works in the bottom-right for free — the network does not have to see a
          cat in every position to recognise one that has moved. And it is cheap: a filter is nine
          weights whether the image is 14 pixels wide or 4,000. A fully-connected layer over a
          megapixel image would need a million weights per unit; a convolution needs nine, slid.
        </P>
        <CompareGrid
          items={[
            {
              title: "What sliding one small filter buys",
              tone: "positive",
              children: (
                <>
                  A pattern learned in one place is recognised everywhere. Nine weights cover an
                  image of any size. The same edge detector serves the whole picture.
                </>
              ),
            },
            {
              title: "What it assumes",
              tone: "caution",
              children: (
                <>
                  That what matters is <em>local</em> and the same everywhere — true for edges and
                  textures, less true when a pixel&rsquo;s meaning depends on the far side of the
                  image. That is what stacking layers is for.
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="what-the-network-learns-for-itself"
        title="What the network learns for itself"
      >
        <P>
          Every filter you just tried was chosen by hand — someone knew that{" "}
          <Strong>-1 -1 -1 / -1 8 -1 / -1 -1 -1</Strong> finds edges. A convolutional network throws
          that knowledge away. It starts with random weights in each filter and lets gradient descent
          adjust them, exactly as in the previous lesson, until the filters that help it name the
          picture are the ones that survive. Nobody tells it to look for edges. It discovers that
          edges are worth looking for.
        </P>
        <P>
          And it does not stop at one layer. Feed the edge grid into another convolution and its
          filters combine edges into corners and curves; feed that forward again and later filters
          respond to eyes, wheels, letters. This is the neural network you already met, with one
          structural idea added: <Strong>the same small filter, slid everywhere, stacked</Strong>.
          The depth builds meaning; the sliding makes it affordable.
        </P>
        <Callout tone="note" title="A filter has one more number than it looks">
          The nine weights are usually joined by a tenth, a <em>bias</em> added to every sum, and
          the result is passed through the same bend — the activation — that gave a plain network
          its curve. The convolution is what makes it a network <em>for images</em>; everything else
          is the machinery you have already seen.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "An image is a grid of brightness numbers. Colour is three such grids. There is no picture in there, only values.",
          "A convolution is nine weights laid over a pixel and its neighbours, multiplied and summed into a new grid. The pattern of the weights is the whole filter.",
          "Weights that sum to zero detect edges; all-equal weights blur; a heavy centre sharpens. Same arithmetic, different nine numbers.",
          "One small filter is slid over every position unchanged, so a pattern learned once is found anywhere — and nine weights cover an image of any size.",
          "A convolutional network does not use hand-picked filters. Gradient descent learns the nine numbers, and stacking layers builds edges into objects.",
        ]}
      />
    </div>
  );
}
