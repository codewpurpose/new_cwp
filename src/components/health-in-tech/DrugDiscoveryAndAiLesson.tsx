import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function DrugDiscoveryAndAiLesson() {
  return (
    <div>
      <Lead>
        &ldquo;AI discovered a new drug&rdquo; makes it sound like a model can conjure a
        medicine out of nothing. What actually happens is narrower and still useful:
        getting a molecule from a lab bench to an approved drug is a pipeline with years-long
        stages, and AI meaningfully shortens a few of them — without skipping a single one of
        the rest.
      </Lead>

      <LessonSection
        id="the-pipeline-from-molecule-to-approved-drug"
        title="The pipeline from molecule to approved drug"
      >
        <P>
          Before a drug reaches a pharmacy shelf, it passes through distinct stages that
          together typically take a decade or more, and the vast majority of candidates that
          enter the pipeline never make it out the other end.
        </P>
      </LessonSection>

      <StepList
        variant="timeline"
        steps={[
          {
            label: "Target identification",
            detail: "Find the specific biological mechanism a drug would need to act on.",
          },
          {
            label: "Candidate discovery",
            detail: "Search an enormous space of possible molecules for ones that might act on that target.",
          },
          {
            label: "Lab and animal testing",
            detail: "Test whether the most promising candidates actually behave as predicted outside a computer.",
          },
          {
            label: "Human clinical trials",
            detail: "Three phases, each larger than the last, checking safety and then effectiveness in real patients.",
          },
          {
            label: "Regulatory approval",
            detail: "A regulator reviews the full trial data before the drug can be prescribed to the public.",
          },
        ]}
      />

      <LessonSection id="where-ai-actually-shortens-it" title="Where AI actually shortens it">
        <P>
          <Strong>Candidate discovery</Strong> is where AI has made the clearest dent. Searching
          the space of chemically possible molecules by hand or by brute-force lab testing is
          slow — a model that has learned which molecular shapes tend to bind to a given target
          can narrow millions of theoretical candidates down to a shortlist worth actually
          synthesising and testing, in a fraction of the time a purely manual search would take.
        </P>
        <P>
          <Strong>Target identification</Strong> benefits too, in a smaller way — models that
          scan research literature and biological data can surface plausible targets a human
          researcher might not have connected on their own.
        </P>
      </LessonSection>

      <LessonSection id="where-it-still-cant-skip-a-single-step" title="Where it still can't skip a single step">
        <P>
          Nothing about a faster shortlist changes what has to happen after it. A candidate a
          model is confident about still has to survive lab testing, animal testing, and three
          separate phases of human trials, because none of those stages exist to find a good
          molecule — they exist to prove a specific molecule is safe and effective in an actual
          human body, which a model trained on existing data cannot certify on its own.
        </P>
        <Callout tone="tip" title="What this actually buys a company">
          A shorter candidate-discovery stage does not shorten a ten-year pipeline into a
          two-year one. It can shave real time off the earliest stage while leaving the years of
          required clinical testing exactly as long as they were — a meaningful head start, not
          a shortcut through the parts that exist for patient safety.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A drug's path to approval runs through target identification, candidate discovery, lab and animal testing, human trials, and regulatory review — typically a decade or more.",
          "AI's clearest advantage is narrowing an enormous space of candidate molecules down to a shortlist worth testing, in candidate discovery.",
          "A promising AI-flagged candidate still has to pass lab testing, animal testing, and three phases of human trials — none of that is optional.",
          "AI shortens the earliest stage of the pipeline; it does not shorten the years of clinical testing that exist specifically for patient safety.",
        ]}
      />
    </div>
  );
}
