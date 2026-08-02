import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { SubgroupAccuracyChart } from "@/components/health-in-tech/SubgroupAccuracyChart";

export function BiasAndErrorInMedicalAiLesson() {
  return (
    <div>
      <Lead>
        &ldquo;95% accurate&rdquo; sounds like a single, settled fact about a model. It almost
        never is. A model that is 95% accurate overall can still be far less accurate for one
        group of patients than another, and the one clean number on the slide is usually the
        reason nobody in the room noticed.
      </Lead>

      <LessonSection
        id="95-percent-accurate-overall-can-still-fail-unevenly"
        title="95% accurate overall can still fail unevenly"
      >
        <P>
          Overall accuracy is an average across every case a model was tested on. Averages
          hide exactly the kind of unevenness that matters here — a model can be excellent for
          most patients and meaningfully worse for a specific group, and the overall number
          will still look reassuring, because the group doing well outnumbers the group doing
          badly.
        </P>
      </LessonSection>

      <LessonSection
        id="training-data-that-doesnt-look-like-everyone-it-treats"
        title="Training data that doesn't look like everyone it treats"
      >
        <P>
          The chart below simulates exactly this. Same model, same day, one overall accuracy
          figure — and three subgroups underneath it that received wildly different shares of
          the training data before the model was ever deployed.
        </P>
      </LessonSection>

      <SubgroupAccuracyChart />

      <LessonSection
        id="why-checking-subgroup-accuracy-isnt-optional"
        title="Why checking subgroup accuracy isn't optional"
      >
        <P>
          <Strong>A group that made up 7% of the training data is not a rounding error to that
          group</Strong> — it is the entire population the model performs worse for, every
          single time it is used on someone from that group. The model was never lying about
          its overall accuracy. It was just never asked to report the number that actually
          mattered to the patients it was failing.
        </P>
        <Callout tone="danger" title="This is not a hypothetical failure mode">
          Real deployed medical models have measurably underperformed for patients whose skin
          tone, sex, or ethnicity was underrepresented in the images or records the model
          trained on — not because anyone deliberately excluded them, but because nobody
          checked subgroup accuracy before deployment. Checking it is not extra diligence. It is
          the minimum bar for claiming the model is safe for everyone it will actually be used
          on.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Overall accuracy is an average, and averages can hide a large gap between a model's best-served and worst-served groups.",
          "A subgroup that made up a small share of the training data can experience meaningfully worse accuracy, invisible in the one overall number.",
          "The disparity is usually not deliberate — it traces back to which patients were, and weren't, well represented in the training data.",
          "Checking subgroup accuracy before deployment is not extra diligence — it's the minimum bar for claiming a model is safe for everyone it treats.",
        ]}
      />
    </div>
  );
}
