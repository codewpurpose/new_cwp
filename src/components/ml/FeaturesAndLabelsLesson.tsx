import { Callout } from "@/components/learn/primitives/Callout";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { FeatureBlender } from "@/components/ml/FeatureBlender";

export function FeaturesAndLabelsLesson() {
  return (
    <div>
      <Lead>
        Data does not arrive ready to learn from. Before any model runs, somebody decides what
        to measure and what counts as the right answer — and those two decisions matter more
        than almost anything the model does afterwards.
      </Lead>

      <LessonSection id="the-two-words" title="The two words">
        <P>
          Nearly all of supervised machine learning is described by two words, and they are
          both simpler than they sound.
        </P>
        <LabelRows
          rows={[
            {
              label: "Feature",
              text: "Something you measure about a thing. A loaf's baking time. A message's word count. A house's floor area. Models only ever see features.",
            },
            {
              label: "Label",
              text: "The answer you want, for examples where you already know it. Was this loaf cooked? Was this message spam? What did this house sell for?",
            },
          ]}
        />
        <P>
          Learning means finding a pattern that gets from the features to the label reliably
          enough to be useful on examples you have not seen.
        </P>
      </LessonSection>

      <LessonSection id="a-feature-is-a-choice" title="A feature is a choice">
        <P>
          Here is the part beginners rarely get told. Features are not handed down. Somebody
          chose them, and a different choice would have produced a different model.
        </P>
        <P>
          Take bread. You have two measurements for every loaf: how many minutes it baked, and
          how hot the oven was. Neither one is the answer on its own — a loaf can be in a long
          time at a low temperature, or briefly at a high one, and come out the same.
        </P>
      </LessonSection>

      <LessonSection id="inventing-a-better-one" title="Inventing a better one">
        <P>
          So invent a third measurement out of the two you have. Slide between them and watch
          both the direction you are measuring in and the error at the best possible cut.
        </P>
      </LessonSection>

      <FeatureBlender />

      <LessonSection id="where-labels-come-from" title="Where labels come from" delay={0.05}>
        <P>
          Time alone is not useless — it gets you most of the way, because longer usually does
          mean more cooked. Temperature alone is much worse. But a{" "}
          <Strong>mix of the two</Strong> roughly halves the error of the better one, and it is
          a number nobody handed you. You made it up, and it corresponds to something real:
          roughly thirty minutes at 200 °C.
        </P>
        <P>
          That is <Strong>feature engineering</Strong>, and for most of the history of machine
          learning it was where the actual work happened. Modern systems can sometimes discover
          combinations like this themselves, which is a large part of why they are impressive —
          but somebody still chose what to measure in the first place.
        </P>
        <Callout tone="warning" title="Labels are a decision too, and a costlier one">
          Every label in this dataset means a person cut a loaf open and made a judgement.
          &ldquo;Cooked through&rdquo; is not a fact sitting in the world waiting to be
          collected — it is a line somebody drew. If two people draw it differently, the model
          learns the disagreement. Wrong labels are the most expensive problem in machine
          learning, because no amount of clever modelling recovers from them.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A feature is something you measure. A label is the answer you already know. Models only see features.",
          "Features are chosen, not given — and you are allowed to invent new ones from the ones you have.",
          "A combination of two mediocre measurements can beat either of them alone.",
          "An invented feature should still mean something you can say out loud, like “thirty minutes at 200 degrees”.",
          "Labels come from human judgement. Wrong labels are the one problem better modelling cannot fix.",
        ]}
      />
    </div>
  );
}
