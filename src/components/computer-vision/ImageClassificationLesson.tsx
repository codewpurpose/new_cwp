import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function ImageClassificationLesson() {
  return (
    <div>
      <Lead>
        Ask what is in this photo and you would expect the honest answer to be complicated: a
        dog, in the foreground, on a leash, next to a person, on a paved path, under a tree.
        Image classification answers a much narrower question than that, on purpose, and the
        narrowing is most of why it works at all.
      </Lead>

      <LessonSection id="one-label-for-the-whole-photo" title="One label for the whole photo">
        <P>
          Classification&rsquo;s contract is exactly this: one label, for the entire image, and
          nothing else. Not where the dog is. Not how many dogs. Not whether there is also a
          person in frame. Feed it a photo with three dogs and one cat and it still returns a
          single answer, and if that answer is &ldquo;dog&rdquo;, the model has done its job correctly by
          its own rules — the cat and the count were never part of the question.
        </P>
        <P>
          <Strong>That narrowness is the whole design, not a limitation someone forgot to
          fix.</Strong> Detection and segmentation, two chapters ahead, exist specifically to
          answer the questions classification refuses to.
        </P>
      </LessonSection>

      <LessonSection
        id="why-this-is-the-easy-version"
        title="Why this is the easy version of seeing"
      >
        <P>
          Compare the two problems directly. Classification needs one number out of the model
          per photo — really, one probability per class it knows about, and it reports whichever
          is highest. Detection needs an unknown number of boxes, each with its own label and its
          own confidence, and the model does not even know in advance how many objects it is
          about to find. That single difference — a fixed-size answer versus a variable-size one
          — is most of why classification came first and detection took longer to get right.
        </P>
        <P>
          One label per photo is also, not incidentally, much easier to grade. A classifier is
          either right or wrong about the whole image. A detector can be right about the label
          and wrong about the box, by a little or a lot, which is a genuinely harder thing to
          score — the subject of a later chapter on its own.
        </P>
      </LessonSection>

      <LessonSection
        id="what-a-confident-wrong-answer-looks-like"
        title="What a confident wrong answer looks like"
      >
        <P>
          A well-known example: a model trained to tell huskies from wolves reported 97%
          confidence on a photo of a wolf standing in a grassy field — correctly, this time,
          identifying it as a wolf, but for the wrong reason entirely. In earlier tests the same
          model had called wolves &ldquo;husky&rdquo; whenever the photo had snow in the
          background, because most of its husky training photos happened to have snow in them
          and most of its wolf photos did not. The model had learned to detect snow, not dogs,
          and reported startling confidence while doing it.
        </P>
        <P>
          <Strong>A confidence score describes how sure the model is, not how right it
          is.</Strong> Those are the same number only when the training data taught the model
          the thing you actually wanted it to learn.
        </P>
      </LessonSection>

      <LessonSection
        id="top-1-and-top-5-are-different-promises"
        title="Top-1 and top-5 are different promises"
      >
        <P>
          Two benchmark numbers get quoted for the same classifier, and they are not
          interchangeable. <Strong>Top-1 accuracy</Strong> asks whether the single best guess is
          correct. <Strong>Top-5 accuracy</Strong> asks whether the correct answer appears
          anywhere among the model&rsquo;s five best guesses. A model can score 76% top-1 and 93%
          top-5 on the same test set, and both numbers are true at once — they are simply
          answering different questions.
        </P>
        <P>
          A benchmark that reports only the flattering one is not lying, exactly, but it is
          choosing which promise to advertise. Ask which figure you are looking at before
          comparing two models, because the gap between them tends to be largest on exactly the
          fine-grained categories — breeds of dog, species of bird — where the correct answer and
          the model&rsquo;s honest second guess are easy to confuse.
        </P>
        <CompareGrid
          items={[
            {
              title: "Top-1",
              tone: "neutral",
              children: (
                <P>The single best guess must be exactly right. The harder promise to keep.</P>
              ),
            },
            {
              title: "Top-5",
              tone: "neutral",
              children: (
                <P>
                  Right if the true label is anywhere in the model&rsquo;s five best guesses. Always
                  the higher number, and quietly a lower bar.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="warning" title="Ask which number you are reading">
          A headline accuracy figure with no qualifier is usually top-1. If a benchmark only
          reports top-5, ask why the harder number was left out.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Image classification promises exactly one label per photo, with no information about location or count — a deliberately narrow contract.",
          "That narrowness is precisely what makes classification tractable and easy to grade compared with detection, which must answer a variable-size question.",
          "A model can report high confidence for the wrong reason, having learned a correlated background detail instead of the object itself.",
          "Confidence measures how sure a model is, not how correct it is; the two only line up when training data taught the right lesson.",
          "Top-1 accuracy requires the single best guess to be right; top-5 counts a correct answer anywhere in the top five guesses — different promises.",
          "A benchmark quoting only one of the two accuracy figures is quietly picking the more flattering number.",
        ]}
      />
    </div>
  );
}
