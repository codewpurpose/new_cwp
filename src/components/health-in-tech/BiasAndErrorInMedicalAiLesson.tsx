import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
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
          Overall accuracy is an average across every case a model was tested on. Averages hide
          exactly the kind of unevenness that matters here — a model can be excellent for most
          patients and meaningfully worse for a specific group, and the overall number will still
          look reassuring, because the group doing well outnumbers the group doing badly.
        </P>
        <P>
          Work a simplified version of that out to see how much an average can hide. Imagine a
          model tested on a population that is 90% one group and 10% another, and every single one
          of its errors happens to land in the smaller group. An overall accuracy of 95% is
          entirely consistent with that model being closer to 50% accurate for the group making up
          a tenth of the test set — the ten percent barely moves the overall number, precisely
          because it is ten percent. The one number on the slide cannot tell you, on its own,
          whether that is what happened.
        </P>
      </LessonSection>

      <LessonSection
        id="the-model-learns-from-access-not-illness"
        title="The model learns from access, not illness"
      >
        <P>
          The uneven training data in the chart below is one way this happens. A quieter, more
          common one is that a model ends up predicting who has historically received care rather
          than who actually needs it, because the label it was trained on was never really
          &ldquo;is this person sick&rdquo; — it was something easier to measure that the people
          building the model used as a stand-in.
        </P>
        <P>
          One widely studied example did exactly this. A commercial algorithm used across US
          health systems to identify patients who would benefit from extra care management was
          trained to predict future healthcare costs, on the reasonable-sounding assumption that
          sicker patients cost more. But at the same level of illness, Black patients had
          historically generated lower healthcare costs than white patients — not because they
          were healthier, but because of unequal access to care that had nothing to do with the
          algorithm. The model faithfully learned the pattern in the data it was given: cost
          predicted risk score, and Black patients, despite being just as sick, got systematically
          lower risk scores and were flagged for extra help less often. Researchers estimated that
          correcting this one substitution — training on actual illness instead of cost — would
          have raised the share of Black patients identified for extra care from under one in five
          to nearly one in two.
        </P>
        <P>
          Nobody involved chose to build a biased algorithm. Cost looked like a defensible,
          measurable proxy for need, right up until someone checked whether it actually measured
          the same thing for every group it was used on. That is the mechanism worth remembering
          more than the specific example: a model does not need to be told anyone&apos;s race, sex,
          or income to reproduce exactly the inequality already baked into whichever number it was
          told to predict.
        </P>
      </LessonSection>

      <LessonSection
        id="training-data-that-doesnt-look-like-everyone-it-treats"
        title="Training data that doesn't look like everyone it treats"
      >
        <P>
          The chart below simulates a second, more direct version of the same problem. Same model,
          same day, one overall accuracy figure — and three subgroups underneath it that received
          wildly different shares of the training data before the model was ever deployed.
        </P>
      </LessonSection>

      <SubgroupAccuracyChart />

      <LessonSection
        id="what-a-sensor-or-a-dataset-can-quietly-leave-out"
        title="What a sensor or a dataset can quietly leave out"
      >
        <P>
          A proxy variable standing in for illness is one mechanism. Two more, both well
          documented and both simpler than anything involving a learned model, are worth knowing
          by name.
        </P>
        <LabelRows
          rows={[
            {
              label: "Pulse oximetry",
              text: "A pulse oximeter estimates blood oxygen by shining light through skin, and that estimate is measurably less accurate on darker skin. One large study found dangerously low oxygen levels the device failed to flag — readings that looked normal when the patient's actual blood oxygen was not — occurred about three times more often in Black patients than in white patients. The device isn't AI. The failure mode is the same one this chapter is about: a measurement calibrated on one population and deployed on everyone.",
            },
            {
              label: "Dermatology datasets",
              text: "Image sets used to train skin-cancer detection models have repeatedly been found to be overwhelmingly photos of lighter skin, with darker Fitzpatrick skin types making up a small single-digit share. A model trained mostly on one skin type learns patterns that are less reliable on the skin types it barely saw — on a condition where a late diagnosis measurably changes survival.",
            },
          ]}
        />
        <P>
          Neither of these is a training-data problem a bigger dataset trivially fixes, because the
          gap isn&apos;t random — it reflects who historically had access to the dermatologists,
          the studies, and the equipment that generated the data in the first place. A model built
          on that record inherits the record&apos;s blind spot rather than correcting it.
        </P>
      </LessonSection>

      <LessonSection
        id="why-checking-subgroup-accuracy-isnt-optional"
        title="Why checking subgroup accuracy isn't optional"
      >
        <P>
          <Strong>A group that made up 7% of the training data is not a rounding error to that
          group</Strong> — it is the entire population the model performs worse for, every single
          time it is used on someone from that group. The model was never lying about its overall
          accuracy. It was just never asked to report the number that actually mattered to the
          patients it was failing.
        </P>
        <Callout tone="danger" title="This is not a hypothetical failure mode">
          Real deployed systems — a healthcare cost algorithm, a pulse oximeter, a dermatology
          model — have each measurably underperformed for a specific group, not because anyone
          deliberately excluded them, but because nobody checked the subgroup number before
          deployment. Checking it is not extra diligence. It is the minimum bar for claiming a
          model is safe for everyone it will actually be used on.
        </Callout>
        <ChecklistCard
          title="What a subgroup report actually needs to include"
          items={[
            "Accuracy broken out by the groups most likely to be underrepresented — race, ethnicity, sex, age, skin tone — not just an overall figure.",
            "The false negative rate specifically, not just accuracy, because a missed case and a false alarm cost the patient completely different things.",
            "Numbers measured on the population the model will actually be used on, not just the population it happened to be tested on.",
            "A named threshold for what gap between subgroups is acceptable before deployment, decided before the results come in, not after.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Overall accuracy is an average, and averages can hide a large gap between a model's best-served and worst-served groups.",
          "A model can learn to reproduce inequality it was never told about, by training on a proxy — like cost — that means something different for different groups.",
          "Pulse oximeters reading less accurately on darker skin, and dermatology datasets skewed toward lighter skin, show the same failure mode outside of AI entirely.",
          "A subgroup that made up a small share of the training data can experience meaningfully worse accuracy, invisible in the one overall number reported.",
          "Checking subgroup accuracy before deployment, on the population the model will actually serve, is the minimum bar for calling it safe — not extra diligence.",
        ]}
      />
    </div>
  );
}
