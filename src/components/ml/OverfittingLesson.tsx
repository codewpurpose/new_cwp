import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { DegreeDial } from "@/components/ml/DegreeDial";

export function OverfittingLesson() {
  return (
    <div>
      <Lead>
        This is the failure that catches everyone, and it is the reason the previous lesson
        insisted you hold data back. A model can get better and better at the examples it
        studied while getting steadily worse at everything else — and nothing in the training
        numbers warns you it is happening.
      </Lead>

      <LessonSection id="too-simple" title="Too simple">
        <P>
          Start at the easy end. A model that is too simple cannot represent the pattern even
          if you show it a million examples. Set the slider to zero bends and you get a flat
          line: the model has learned exactly one thing, the average score, and applies it to
          everybody.
        </P>
        <P>
          That is <Strong>underfitting</Strong>. It is easy to spot, because the model is
          obviously bad at the data you trained it on — which means the training numbers tell
          you about it honestly.
        </P>
      </LessonSection>

      <LessonSection id="too-complicated" title="Too complicated">
        <P>
          Now the other end, which is where the trouble lives. Give the curve enough bends and
          it can wander through the training points almost exactly. Its error on them collapses
          toward zero.
        </P>
        <P>
          But it did not learn the pattern. It learned <Strong>the specific students</Strong>,
          noise and all — every random high scorer and unlucky low one treated as a rule to be
          honoured. Show it someone new and it has nothing useful to say.
        </P>
      </LessonSection>

      <DegreeDial />

      <LessonSection id="the-gap-is-the-definition" title="The gap is the definition" delay={0.05}>
        <P>
          Drag from left to right and watch the two error lines separate. That separation is
          not a symptom of overfitting; it <Strong>is</Strong> overfitting. There is no other
          definition worth carrying around.
        </P>
        <CompareGrid
          items={[
            {
              title: "Underfitting",
              tone: "caution",
              children: (
                <p>
                  Both errors are high. The model is too simple to capture the pattern, and it
                  is honest about that.
                </p>
              ),
            },
            {
              title: "Overfitting",
              tone: "caution",
              children: (
                <p>
                  Training error is tiny and test error is large. The model looks excellent and
                  is useless.
                </p>
              ),
            },
          ]}
        />
        <P>
          Notice the dashed line — the real pattern the model never gets to see. At three bends
          the fitted curve sits close to it. At twelve it is chasing individual dots and has
          wandered off the truth entirely, in places predicting scores that could not exist.
        </P>
        <P>
          Here is the slider as a loop: fifteen students to fit, two hundred new ones to test
          on, and polynomial curves with more and more bends.
        </P>
        <CodeBlock
          label="bends.py"
          code={`import numpy as np
from numpy.polynomial import Polynomial

rng = np.random.default_rng(5)

def students(n):
    hours = rng.uniform(0, 10, n)
    score = 40 + 8 * hours - 0.4 * hours ** 2 + rng.normal(0, 5, n)
    return hours, score

train_x, train_y = students(15)    # what the model studies
test_x, test_y = students(200)     # people it has never seen

def error(curve, x, y):
    return np.mean((curve(x) - y) ** 2)

for bends in [0, 1, 2, 5, 9, 12]:
    curve = Polynomial.fit(train_x, train_y, deg=bends)
    print(f"degree {bends:2}:  training error {error(curve, train_x, train_y):7.1f}"
          f"   test error {error(curve, test_x, test_y):9.1f}")`}
        />
        <P>
          Training error falls at every step, from 195 down to 3.7. Test error bottoms out at
          degree 2, which is the shape the data was generated from, and by degree 12 it has
          exploded past 22,000. Same students, same code; only the number of bends changed.
        </P>
      </LessonSection>

      <LessonSection
        id="why-training-error-cannot-help"
        title="Why training error cannot help you"
        delay={0.05}
      >
        <P>
          Here is the part that matters most, and it is worth stating carefully. As you add
          bends, training error drops from about 28 points to under 2 and essentially never
          stops improving. If you chose your model by that number alone, you would pick the
          most complicated one available, every single time.
        </P>
        <P>
          There is no wobble in the training line that says &ldquo;stop here.&rdquo; The warning
          simply is not in that number, and no amount of staring at it will make it appear.
        </P>
        <Callout tone="success" title="Which is exactly why you held data back">
          The held-back students are the only instrument that can see this. Their error falls,
          bottoms out, and then climbs — and that turn is the signal you were looking for. This
          is what the previous lesson was for.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Underfitting: too simple to capture the pattern, and honest about it — both errors stay high.",
          "Overfitting: it memorised the examples, noise and all. Training error tiny, test error large.",
          "The gap between training and test error is not a symptom of overfitting. It is the definition.",
          "Training error essentially never stops improving, so choosing by it always picks the most complex model.",
          "Held-back data is the only instrument that can see the turn. That is what it is for.",
        ]}
      />
    </div>
  );
}
