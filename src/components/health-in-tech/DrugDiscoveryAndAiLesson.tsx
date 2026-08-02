import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function DrugDiscoveryAndAiLesson() {
  return (
    <div>
      <Lead>
        &ldquo;AI discovered a new drug&rdquo; makes it sound like a model can conjure a medicine
        out of nothing. What actually happens is narrower and still useful: getting a molecule
        from a lab bench to an approved drug is a pipeline with years-long stages, and AI
        meaningfully shortens a few of them — without skipping a single one of the rest.
      </Lead>

      <LessonSection
        id="the-pipeline-from-molecule-to-approved-drug"
        title="The pipeline from molecule to approved drug"
      >
        <P>
          Before a drug reaches a pharmacy shelf, it passes through distinct stages that together
          typically take a decade or more, and the vast majority of candidates that enter the
          pipeline never make it out the other end.
        </P>
        <P>
          The scale of that attrition is worth sitting with before AI enters the picture at all.
          Roughly nine in ten candidates that make it as far as human trials still fail somewhere
          along the way — most often in the phase built specifically to test whether the drug
          actually works, rather than the earlier phase that just checks whether it is safe.
          Nothing about a faster start changes how unforgiving that filter is.
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
          <Strong>Target identification</Strong> benefits too, in a smaller way — models that scan
          research literature and biological data can surface plausible targets a human researcher
          might not have connected on their own.
        </P>
        <P>
          Both are real, and both are also two of the narrowest stages in the pipeline above —
          which is exactly why the improvement doesn&apos;t show up as a shorter overall timeline
          yet, and why it is worth being precise about which specific tool did which specific job
          before crediting AI with the whole pipeline.
        </P>
      </LessonSection>

      <LessonSection id="what-alphafold-actually-solved" title="What AlphaFold actually solved">
        <P>
          The single most-cited example of AI in this space is DeepMind&apos;s AlphaFold, and
          it&apos;s worth being exact about what it did, because the popular version of the story
          credits it with more than it delivered. Predicting the three-dimensional shape a protein
          folds into, from nothing but the sequence of amino acids that make it up, was an open
          problem biologists had chased for decades. Solving it well enough to compete with a
          physical lab measurement was a genuine scientific breakthrough, and the resulting
          database now holds predicted structures for well over 200 million proteins, most of
          which had never been measured directly at all.
        </P>
        <P>
          Knowing a target protein&apos;s shape is genuinely useful for candidate discovery — it
          lets a model reason about which molecules might physically fit against it, rather than
          searching blind. It is also a smaller piece of the pipeline than the headline suggests.
        </P>
        <CompareGrid
          items={[
            {
              title: "What it solved",
              tone: "positive",
              children: (
                <P>
                  Given a protein&apos;s sequence, predicting the shape it physically folds into —
                  to an accuracy that rivals a lab measurement, for the vast majority of proteins
                  ever catalogued.
                </P>
              ),
            },
            {
              title: "What it didn't solve",
              tone: "caution",
              children: (
                <P>
                  Which protein to target for a given disease, how strongly two molecules actually
                  bind under real biological conditions, and everything from lab testing through
                  three phases of human trials — all still separate, unsolved problems.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="what-ai-does-inside-a-trial-not-just-before-one"
        title="What AI does inside a trial, not just before one"
      >
        <P>
          Trial design is a third category, distinct from finding a target and generating
          candidate molecules, and it is where a newer wave of AI use is concentrated. Matching
          eligible patients to a trial used to mean a coordinator manually checking medical records
          against a long list of inclusion and exclusion criteria — a model that scans records at
          that scale can surface eligible patients in days instead of months, which matters
          enormously for a trial that cannot start recruiting until enough patients are found.
        </P>
        <P>
          Adaptive trial designs go a step further, using interim results to adjust which dosing
          arms keep enrolling patients while the trial is still running, rather than waiting for a
          fixed design set in advance to finish before learning anything. Both genuinely speed up
          parts of running a trial. Neither shortens the part that actually takes the years —
          following enough patients for long enough to know whether a drug works and stays safe,
          which is a biological constraint no amount of faster matching or smarter enrolment gets
          around.
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
          A shorter candidate-discovery stage does not shorten a ten-year pipeline into a two-year
          one. It can shave real time off the earliest stage while leaving the years of required
          clinical testing exactly as long as they were — a meaningful head start, not a shortcut
          through the parts that exist for patient safety.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A drug's path to approval runs through target identification, candidate discovery, lab and animal testing, human trials, and regulatory review — typically a decade or more.",
          "Roughly nine in ten candidates that reach human trials still fail, most often at the phase that tests whether the drug actually works.",
          "AlphaFold solved protein structure prediction to near-experimental accuracy — it did not solve which target to pick, how molecules bind in practice, or a single stage of clinical testing.",
          "Newer AI use inside trials — matching eligible patients faster, adjusting dosing arms as results come in — speeds up running a trial without shortening the years patients have to be followed.",
          "AI's real advantage sits in the earliest, narrowest stages of the pipeline; the years-long safety requirement in the middle is a floor, not a bottleneck AI has found a way around.",
        ]}
      />
    </div>
  );
}
