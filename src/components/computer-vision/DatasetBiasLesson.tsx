import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function DatasetBiasLesson() {
  return (
    <div>
      <Lead>
        You would like to believe a model trained on a million photos has learned something about
        the world — what a face looks like, what a stop sign looks like, in general. It has not.
        It has learned what a million <em>specific</em> photos looked like, taken by specific
        people, in specific places, under specific light. Whatever the dataset left out, the model
        never saw, and no amount of training makes up the gap.
      </Lead>

      <LessonSection
        id="the-model-learns-the-dataset-not-the-world"
        title="The model learns the dataset, not the world"
      >
        <P>
          A model is a set of numbers fitted to minimise error on the exact examples it was shown.
          That is all training ever optimises for. There is no separate step where the model
          checks its conclusions against the actual world — the training set <Strong>is</Strong>{" "}
          its entire experience of the world, and every regularity it learned is a regularity of
          that set, not necessarily a regularity of reality.
        </P>
        <P>
          If every daytime photo in the training set happens to be well-lit and every indoor photo
          happens to feature the same three or four skin tones, the model does not learn
          &ldquo;faces&rdquo; — it learns well-lit faces of those skin tones, and calls that
          &ldquo;faces&rdquo; with complete confidence, because nothing in its training ever told
          it there was more to the category.
        </P>
      </LessonSection>

      <LessonSection id="where-the-skew-actually-comes-from" title="Where the skew actually comes from">
        <P>
          Dataset skew is not an abstract statistical accident — it comes from concrete decisions
          made by concrete people. Who collected the photos, and where they happened to be
          standing. Which part of the world had reliable internet access and a research lab
          nearby, and therefore ended up over-represented in scraped web images. What camera
          hardware was used, and what lighting conditions that hardware was tested under. Whose
          faces were easiest for a research team to obtain consent and usable images for, which in
          practice has often meant the team&rsquo;s own city, university, or company.
        </P>
        <P>
          This is not hypothetical. Joy Buolamwini and Timnit Gebru&rsquo;s 2018 &ldquo;Gender
          Shades&rdquo; study tested three commercial facial-analysis systems and found error rates
          on darker-skinned women running as high as 34%, against under 1% for lighter-skinned men
          on the same systems. The gap was not a mysterious algorithmic quirk — it traced directly
          back to benchmark and training datasets that were overwhelmingly lighter-skinned and
          male.
        </P>
        <Callout tone="note" title="One dataset, many downstream models">
          A skewed public benchmark does not stay contained to one paper. Datasets get reused for
          years across dozens of teams, so a gap discovered once in one dataset is often a gap
          quietly inherited by every model trained against it since.
        </Callout>
      </LessonSection>

      <LessonSection id="a-rising-benchmark-can-still-hide-it" title="A rising benchmark can still hide it">
        <P>
          Here is the part that makes this hard to catch by accident: an overall benchmark score
          can rise, release after release, while an under-represented subgroup&rsquo;s error rate
          stays completely flat, or gets worse. If that subgroup is 4% of the test set, its errors
          contribute at most 4 percentage points to the overall number — improve the other 96% by
          two points each release and the headline metric climbs steadily, with nobody needing to
          fix, or even notice, the 4%.
        </P>
        <P>
          Nobody has to be acting in bad faith for this to happen. Teams optimise the metric they
          are shown, and the metric shown is almost always the single overall number. A subgroup
          too small to move the average is, mathematically, a subgroup the standard evaluation
          process cannot see failing.
        </P>
      </LessonSection>

      <LessonSection
        id="auditing-performance-by-subgroup"
        title="Auditing performance by subgroup, not just overall"
      >
        <P>
          The direct fix is not a smarter architecture, it is a different reporting habit: break
          accuracy out by subgroup — skin tone, gender presentation, age band, lighting condition,
          whatever the deployment context makes relevant — and report each one, not just the
          blended average. It is unglamorous and it is the only method that reliably surfaces a
          gap an overall score is mathematically built to hide.
        </P>
        <CompareGrid
          items={[
            {
              title: "Overall accuracy only",
              tone: "caution",
              children: (
                <P>
                  One number, easy to compare release over release, and structurally incapable of
                  showing an under-represented subgroup&rsquo;s error rate unless that subgroup is
                  large enough to move the average.
                </P>
              ),
            },
            {
              title: "Accuracy by subgroup",
              tone: "positive",
              children: (
                <P>
                  More numbers to report and defend, but it makes a subgroup&rsquo;s failure
                  visible the moment it happens, rather than years after enough people have been
                  affected by it.
                </P>
              ),
            },
          ]}
        />
        <P>
          This is a practice, not a cure. It only works for subgroups the test set actually
          measures — a subgroup the dataset never included at all still will not show up, broken
          out or not. Part of an honest evaluation is naming, explicitly, which subgroups the
          current test set does not cover well, rather than letting their absence read as
          &ldquo;no problem found&rdquo;.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A model only ever learns statistical regularities in the exact data it was shown; its 'understanding' of a category is really fluency in that dataset.",
          "Dataset skew traces back to concrete choices — who collected the photos, where, with what cameras, and whose faces were easiest to obtain consent for.",
          "The Gender Shades study found commercial facial-analysis error rates up to 34% for darker-skinned women versus under 1% for lighter-skinned men, tracing directly to skewed training data.",
          "An overall benchmark can keep rising release over release while an under-represented subgroup's error rate stays flat or worsens, because that subgroup is too small to move the average.",
          "Reporting accuracy broken out by subgroup, not just overall, is the practical fix — and it is a practice, not a guarantee, especially for subgroups the test set never included at all.",
        ]}
      />
    </div>
  );
}
