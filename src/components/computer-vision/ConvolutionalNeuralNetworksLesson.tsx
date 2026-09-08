import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { LayerStepper } from "@/components/computer-vision/LayerStepper";

export function ConvolutionalNeuralNetworksLesson() {
  return (
    <div>
      <Lead>
        A single kernel from the convolution chapter finds one kind of edge, in one place, at one
        scale. Stack a few dozen of them, each layer feeding the next, and the network starts
        finding wheels and faces without anyone writing a wheel detector or a face detector. This
        lesson is about what changes when depth enters the picture, and what it costs to get
        there.
      </Lead>

      <LessonSection
        id="stacking-the-kernel-you-already-know"
        title="Stacking the kernel you already know"
      >
        <P>
          You already have the operation. Convolution: a small grid of numbers, slid across every
          position in an image, multiplying and summing as it goes. A convolutional neural network
          does not introduce anything new here. It takes that exact operation and repeats it,
          dozens of times, with a different set of kernels learned at each layer.
        </P>
        <P>
          One layer might learn 32 kernels, each 3×3, each one a tiny pattern detector. Feed its
          output — 32 new grids, one per kernel — into a second layer of 64 more kernels, and each
          of those looks at all 32 inputs at once. Stack thirty layers like this and you are
          several million learned numbers deep before a single fully connected layer gets
          involved.
        </P>
        <P>
          <Strong>Nothing about a CNN is a new idea.</Strong> It is the old idea, repeated, with
          the output of one repetition becoming the input to the next.
        </P>
      </LessonSection>

      <LessonSection id="early-layers-learn-edges" title="Early layers learn edges, without being told to">
        <P>
          Open up the first layer of almost any trained image network and look at what its kernels
          actually detect. You will not find anything exotic. You will find edges — vertical ones,
          horizontal ones, diagonal ones at several angles — and a handful of kernels that respond
          to a colour contrast rather than a shape at all: orange next to blue, green next to red.
        </P>
        <P>
          Nobody wrote &ldquo;detect a 45-degree edge&rdquo; into the training code. Every one of
          those kernels started as random noise and was pushed, gradient by gradient, toward
          numbers that reduced the network&rsquo;s error on millions of labelled photos. Edges are
          simply what a network with a 3×3 window and one layer of depth is capable of noticing,
          and so edges are what it converges on.
        </P>
        <Callout tone="success" title="What changes">
          This is not a claim you have to take on faith. Feature visualisation techniques let you
          render exactly what pattern makes each first-layer kernel fire most strongly, and across
          published networks the result looks the same: a bank of oriented edges and colour
          blobs, resembling hand-designed filters nobody had to hand-design.
        </Callout>
      </LessonSection>

      <LessonSection id="later-layers-learn-parts" title="Later layers learn parts, then whole objects">
        <P>
          A second layer does not see raw pixels. It sees the first layer&rsquo;s edge map, and it
          can combine several edges at once. Two edges meeting at an angle is a corner. A corner
          repeated in a ring is close to a wheel&rsquo;s rim. An edge that curves is close to the
          outline of an eye.
        </P>
        <P>
          By the third or fourth layer, kernels stop responding to any single visual property and
          start responding to arrangements of parts — a headlight-shaped blob next to a
          wheel-shaped blob, roughly where a car would put them. Nothing forces this hierarchy to
          happen. It falls out of stacking simple operations and training on enough examples that
          &ldquo;part in the right place&rdquo; is the pattern that reduces error fastest.
        </P>
        <P>
          Step through a small trained network below and see what a kernel at each depth actually
          fires on, and how much of the original photo each one is even looking at.
        </P>
      </LessonSection>

      <LayerStepper />

      <LessonSection id="what-depth-actually-buys-you" title="What depth actually buys you">
        <P>
          Depth buys you two things, and they are related. The first is composability: a later
          layer can only detect a wheel because an earlier layer already handed it edges and
          corners to combine. Skip the early layers and there is nothing left for a later one to
          combine.
        </P>
        <P>
          The second is reach. A single 3×3 kernel in the first layer only ever looks at nine
          pixels. Stack five layers of 3×3 kernels and the fifth layer&rsquo;s output at any
          position is influenced by roughly an 11×11 patch of the original image — its{" "}
          <Strong>receptive field</Strong>. Stack thirty and that patch can cover most of the
          photo. Depth is how a network built from small, local operations ends up seeing
          something global.
        </P>
        <P>
          <Strong>Depth is not free.</Strong> More layers means more parameters to learn, more
          computation for every photo you show it, and a model that needs far more labelled
          examples to train from a random start than a shallow one does — training a serious
          network like this from nothing typically wants a dataset in the millions of images, not
          the thousands. The next lesson is about what you do instead of paying that price every
          time.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A convolutional neural network is not a new operation — it is the sliding kernel from the convolution chapter, repeated with a different set of learned kernels at each layer.",
          "Visualise a trained network's first-layer kernels and you find edge and colour-contrast detectors that nobody designed — they are simply what a 3×3 window one layer deep is capable of noticing.",
          "Later layers combine earlier detectors into parts, and parts arranged correctly into whole objects, without any layer being told what a wheel or a face is.",
          "Depth grows a network's receptive field: a fifth layer sees roughly an 11×11 patch of the original image, and a thirtieth layer can see most of the photo.",
          "That reach is not free. More layers means more parameters, more computation per photo, and a model that typically needs millions of training images to learn from a random start.",
        ]}
      />
    </div>
  );
}
