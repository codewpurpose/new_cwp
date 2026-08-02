import { Callout } from "@/components/learn/primitives/Callout";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { DescentStepper } from "@/components/ml/DescentStepper";

export function GradientDescentLesson() {
  return (
    <div>
      <Lead>
        You just found the bottom of a bowl by hand — one slider, thirty-six trips, an eyeball
        for which direction felt better. That worked because there was exactly one number to
        move. This lesson is about the moment there is more than one, and why the search has to
        change shape entirely once eyeballing it stops being an option.
      </Lead>

      <LessonSection id="why-you-cannot-try-everything" title="Why you cannot just try everything">
        <P>
          Try every value of one number at a resolution of a hundred steps and that is a hundred
          tries — an afternoon, and more or less what the last lesson&rsquo;s bowl already was: a
          curve you could have plotted point by point and read the bottom off with your eyes.
        </P>
        <P>
          Add a second number — a slope <em>and</em> a starting height, say — and every value of
          the first now needs testing against every value of the second. A hundred becomes ten
          thousand. A model with ten numbers at that same resolution needs a hundred raised to
          the tenth power tries. A small neural network has on the order of a million numbers to
          set, which puts the count at a hundred raised to the millionth power — a figure with no
          name worth learning, because the point is not the size of the number, it is that grid
          search does not slow down as parameters increase. It stops being an option at all.
        </P>
        <P>
          The shape of the search has to change. Instead of trying values, you need a way to be
          told, from wherever you currently stand, which direction is better — without checking
          everywhere else first.
        </P>
      </LessonSection>

      <LessonSection id="walking-downhill" title="Walking downhill on the error">
        <P>
          Stand at one point on the error curve and ask a single question: if this number went up
          a little, would the error go up or down? That question has an exact answer, and the
          answer is the <Strong>derivative</Strong> — the slope of the error exactly where you
          are standing, nothing more, and nothing about the rest of the curve required.
        </P>
        <P>
          The last lesson&rsquo;s widget already computed this every time you dragged its slider.
          A badge told you which way to nudge the number, and that badge was reading the{" "}
          <em>sign</em> of the derivative — positive or negative, downhill left or downhill
          right. Gradient descent is that badge with nobody left to read it: the sign alone
          chooses a direction, and once there is more than one number to move, the same idea
          applied to all of them at once gets a new name, the <Strong>gradient</Strong>.
        </P>
        <P>
          Turn &ldquo;which way&rdquo; into &ldquo;how far&rdquo; and you have the entire
          algorithm. Multiply the gradient by a step size and subtract it from where you are:
        </P>
        <CodeBlock code={"new = old − rate × gradient"} label="The update rule" variant="code" />
        <P>
          That line, run in a loop until it stops moving meaningfully, is the whole of how a model
          with one number and a model with a hundred billion numbers both learn. Nothing gets
          added on the way from one to the other. Only more numbers pass through the identical
          line, once each, every step.
        </P>
        <P>
          Set a rate below and press <InlineCode>Step</InlineCode>. Nobody is dragging anything
          this time — watch what the loop does on its own.
        </P>
      </LessonSection>

      <DescentStepper />

      <LessonSection id="the-step-size-decides-everything" title="The step size decides everything">
        <P>
          The rate is the only knob in the whole loop, and it does more work than its size
          suggests. At <Strong>0.001</Strong> the direction is right every single step and the
          pace is not: after fifty steps the parameter has crept from 0.5 to 4.54, a little over
          half the distance to the target of 7.8, with the error still sitting at 85.37 against a
          floor of 0.4. Fifty more steps would close less than half of what is left.
        </P>
        <P>
          At <Strong>0.03</Strong> the same loop reaches 7.761 — within the widget&rsquo;s own
          tolerance of the target — by step eight. Nothing about the algorithm changed between
          these two runs. Only the size of the step did.
        </P>
        <P>
          At <Strong>0.3</Strong> the step overshoots the bottom entirely: step one lands at
          35.54, past the target on the far side, and step two overshoots the overshoot, landing
          at &minus;97.61. The error that started at 426.72 is 88,893.92 by then and still
          climbing. At <Strong>1.02</Strong> one step is enough — the parameter jumps from 0.5 to
          119.64 and the error goes from 426.72 to 100,058.73 before a second step is ever taken.
        </P>
        <Callout tone="warning" title="This is not a rendering bug">
          The widget does not stop those numbers from growing, and it will not clamp a diverging
          run back onto the chart. A parameter of &minus;97.61 or a hundred thousand units of
          error is the honest output of the same one-line update rule you just read — divergence
          is not a glitch in gradient descent, it is gradient descent, applied with a step size
          that guarantees each correction overshoots worse than the one before it.
        </Callout>
        <P>
          In practice nobody knows the right rate in advance. It gets found by trying a handful
          of values on a small run and watching for exactly the three behaviours above — which is
          why you now know what each one looks like before it costs you a real training run to
          find out.
        </P>
      </LessonSection>

      <LessonSection id="what-it-does-not-promise" title="What it does not promise you" delay={0.05}>
        <P>
          The bowl in this lesson has exactly one bottom, chosen deliberately so every run has a
          single honest answer to arrive at. Real error surfaces are rarely that considerate. A
          model with enough numbers folds its error into a landscape with several low points, and
          gradient descent has no way to tell, from where it is standing, whether the valley it
          just walked into is the deepest one on the map or simply the first one it fell into. It
          only ever knows the slope under its own feet.
        </P>
        <P>
          There is a second requirement, easy to miss because the last lesson already met it:
          the error has to have a slope everywhere, which is why accuracy — the percentage of
          cases you got right — is never the number being minimised directly. Accuracy jumps in
          whole steps as one example flips from wrong to right; it has nothing to take a
          derivative of. Models are trained against a stand-in that does have a slope everywhere
          — squared error, or its cousins — and accuracy is only measured afterwards, as a report
          card, never handed the wheel.
        </P>
        <P>
          You will meet five more words attached to this exact loop before the next chapter is
          through. Each one changes a single part of it and none of them replace the update rule
          above:
        </P>
        <LabelRows
          rows={[
            {
              label: "Batch",
              text: "Using every training example to compute one gradient before taking a single step.",
            },
            {
              label: "Stochastic",
              text: "Estimating the gradient from one example at a time — noisy, but cheap enough to run constantly.",
            },
            {
              label: "Mini-batch",
              text: "The usual default: a gradient estimated from a small handful of examples, not one and not all of them.",
            },
            {
              label: "Epoch",
              text: "One full pass through the training data — not one step, and not the whole run.",
            },
            {
              label: "Momentum",
              text: "Carrying part of the previous step's direction into the next one, so the search does not rediscover the same slope from a standing start each time.",
            },
          ]}
        />
        <P>
          Every one of those is a variation on the four-word line you already have. The next
          lesson stacks that same loop underneath something with vastly more numbers to move — a
          neural network — and the loop itself does not change. Only the size of the bowl does.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Grid search costs multiply per parameter. A small neural network with around a million numbers puts it out of reach entirely, not just slow.",
          "The gradient is only the slope where the search currently stands. Its sign is enough to choose a direction without ever seeing the whole curve.",
          "The update rule is one line, new = old − rate × gradient, repeated until it stops moving. Every model this size or a billion times bigger runs that same line.",
          "The learning rate is the only knob, and it fails in opposite directions: 0.001 was still 3.26 away from the target after fifty steps, while 0.3 turned an error of 426.72 into 88,893.92 in two.",
          "Gradient descent only ever proves it found the bottom of the valley it was standing in, never the lowest point that exists.",
        ]}
      />
    </div>
  );
}
