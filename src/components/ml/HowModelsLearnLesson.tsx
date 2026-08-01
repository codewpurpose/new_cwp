import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { SlopeFinder } from "@/components/ml/SlopeFinder";

export function HowModelsLearnLesson() {
  return (
    <div>
      <Lead>
        &ldquo;The model learns from the data&rdquo; is the sentence that makes machine
        learning sound like magic. It is not magic, and this lesson is the whole of it: pick a
        setting, measure how wrong you are, notice which way is downhill, take a step. Repeat.
      </Lead>

      <LessonSection id="a-model-with-one-number" title="A model with one number">
        <P>
          Say you want to predict how much fuel a car trip will use. You have thirty-six past
          trips: how far each went, and how many litres it burned.
        </P>
        <P>
          The simplest useful model is one number — <Strong>litres per 100 kilometres</Strong>.
          Pick that number and you can predict any trip: multiply, done. A 150 km trip at 8
          L/100km is 12 litres.
        </P>
        <Callout tone="tip" title="Why this example and not a straight line">
          Most beginner examples fit a line with two numbers, a slope and a starting height.
          Fuel is better: a trip of zero kilometres uses zero litres, so the starting height is
          genuinely zero and the model honestly has <em>one</em> number to learn. One number is
          something you can find by hand, which is the point of the next section.
        </Callout>
      </LessonSection>

      <LessonSection id="measuring-how-wrong-you-are" title="Measuring how wrong you are">
        <P>
          Before you can improve a guess you need to score it. For each past trip, compare what
          the model predicts against what actually happened. The difference is the{" "}
          <Strong>miss</Strong>.
        </P>
        <P>
          Add up all the misses and you have a single number describing how wrong the whole
          model is. That number is the only thing the learning process ever looks at.
        </P>
        <P>
          One wrinkle worth knowing now: misses are usually <em>squared</em> before they are
          added. Squaring makes every miss positive, so overshooting by two does not cancel out
          undershooting by two — and it makes one large miss count for more than several small
          ones, which is usually what you want.
        </P>
      </LessonSection>

      <LessonSection id="the-shape-of-being-wrong" title="The shape of being wrong">
        <P>
          Now try it. Drag the slider to change the one number the model has, and watch two
          things at once: the rust sticks in the top chart, and the dot moving along the curve
          underneath.
        </P>
      </LessonSection>

      <SlopeFinder />

      <LessonSection id="that-is-the-whole-trick" title="That is the whole trick" delay={0.05}>
        <P>
          The curve underneath is the important part, and it is worth saying plainly what it
          is: <Strong>the total error at every setting you could have picked</Strong>. The dots
          are scattered and messy. The curve is a smooth bowl.
        </P>
        <P>
          That smoothness is the entire reason a machine can do this without understanding
          anything about cars. It does not need to know what fuel is. It only needs to be able
          to ask &ldquo;is the error smaller if I nudge this number up, or down?&rdquo; and then
          step that way. Thousands of times, very quickly.
        </P>
        <P>
          Real models have millions of numbers instead of one, and the bowl becomes a landscape
          in millions of dimensions that nobody can picture. But the move is identical, and you
          have now done it by hand.
        </P>

        <Callout tone="success" title="The thing most people get wrong">
          The best line passes through almost none of the dots — two of thirty-six, here. A
          line of best fit is not the line that touches the most points. It is the line that
          leaves the least total error, and with real, noisy data those are very different
          things.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A model is a setting, or a set of them. Learning means searching for good values.",
          "You cannot improve a guess until you can score it. That score is the total error.",
          "Misses are squared so they cannot cancel out, and so one big miss outweighs several small ones.",
          "The error landscape is smooth even when the data is not — that is what makes searching it possible.",
          "The best fit touches almost no points. It minimises total error, which is not the same thing.",
        ]}
      />
    </div>
  );
}
