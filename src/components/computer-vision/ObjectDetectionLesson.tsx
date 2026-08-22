import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function ObjectDetectionLesson() {
  return (
    <div>
      <Lead>
        Ask a classifier what is in a photo and it gives you one answer for the entire image, no
        matter how many things are actually in it. Detection is the harder question underneath:
        where is each one, and how many are there.
      </Lead>

      <LessonSection id="from-what-to-where" title="From what, to where">
        <P>
          Classification, from a few lessons back, answers exactly one question: given the whole
          photo, what is the single most likely label. One photo in, one label out, and how many
          actual objects are in that photo is never asked.
        </P>
        <P>
          A photo of a street corner might contain three cars, two pedestrians, and a dog. A
          classifier gives you one word. Detection has to answer a question classification was
          never built to answer: not just what, but where, and how many — and the count is not
          known in advance. It could be zero objects or it could be forty.
        </P>
      </LessonSection>

      <LessonSection id="a-box-and-a-label-per-object" title="A box and a label, per object">
        <P>
          A detector&rsquo;s output is concrete, not a vague heat-map of interest. For every object
          it finds, it returns a tuple: four numbers describing a box (say, the coordinates of its
          top-left corner plus a width and height), a class label, and a confidence score for that
          label. A photo with three cars and two pedestrians should come back as five such tuples,
          not one.
        </P>
        <P>
          That is the entire contract. A detection pipeline can be built from almost any method
          underneath, as long as what comes out the other end is a list of{" "}
          <Strong>(box, label, confidence)</Strong> — nothing more is asked of it and nothing less
          will do.
        </P>
      </LessonSection>

      <LessonSection
        id="why-one-forward-pass-is-not-enough"
        title="Why one forward pass is not enough"
      >
        <P>
          The obvious first idea is to reuse the classifier: run it once, get an answer. That does
          not work, because a classifier only ever answers &ldquo;what is the single dominant
          thing in this entire image&rdquo;, and a street corner does not have a single dominant
          thing.
        </P>
        <P>
          The next idea is to run the classifier again and again, on every possible rectangle the
          image could contain — every position, every width, every height. A modest 224×224 photo
          has tens of thousands of plausible box positions at just a handful of sizes; check every
          size at every position and you are into the millions. That is a combinatorial explosion,
          not a plan, and it is exactly the problem the next two lessons exist to avoid solving the
          brute-force way.
        </P>
      </LessonSection>

      <LessonSection id="two-families-of-solution" title="Two families of solution">
        <P>
          Two real approaches survive contact with that problem, and they trade speed against
          accuracy in opposite directions.
        </P>
        <CompareGrid
          items={[
            {
              title: "Two-stage detectors",
              tone: "neutral",
              children: (
                <P>
                  First propose a modest number of candidate regions likely to contain something,
                  then run a classifier on each candidate. Historically more accurate, because
                  each region gets dedicated attention — and slower, because it is two
                  networks&rsquo; worth of work per photo.
                </P>
              ),
            },
            {
              title: "Single-stage detectors",
              tone: "neutral",
              children: (
                <P>
                  Predict every box and class directly in one pass, by dividing the image into a
                  grid and asking each cell what it sees. Faster, often fast enough for real-time
                  video, and the default choice when latency matters more than squeezing out the
                  last point of accuracy.
                </P>
              ),
            },
          ]}
        />
        <P>
          The chapters ahead build the two ideas a detector actually needs to work at all — a way
          to say a predicted box is &ldquo;close enough&rdquo; (bounding boxes and IoU), and a way
          to collapse a dozen boxes around one object into one (non-max suppression) — before
          returning to how either family is graded.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Classification answers one question for the whole photo. Detection answers an unknown number of questions — where is each object, and how many are there.",
          "A detector's real output is a list of tuples: a box, a class label, and a confidence score, one tuple per object found.",
          "Running a classifier once over an entire photo cannot solve detection, because a classifier only ever names the single dominant thing in front of it.",
          "Checking every possible box position and size by brute force is a combinatorial explosion, not a plan — a modest photo has millions of plausible boxes.",
          "Two-stage detectors propose regions before classifying them and tend to be more accurate but slower. Single-stage detectors predict boxes and classes in one pass and tend to be faster.",
        ]}
      />
    </div>
  );
}
