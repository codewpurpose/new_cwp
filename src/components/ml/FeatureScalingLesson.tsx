import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ScaleToggle } from "@/components/ml/ScaleToggle";

export function FeatureScalingLesson() {
  return (
    <div>
      <Lead>
        You hand a model two columns and assume it studies each one on its own merits. Most
        models never see &ldquo;a column&rdquo; at all. They see one long list of numbers, and
        whatever arithmetic touches that list first does not know or care that the third entry
        was measured in years and the fourth in pounds.
      </Lead>

      <LessonSection id="the-column-that-shouts" title="The column that shouts over the others">
        <P>
          Nearest-neighbour models, and a good number of others, decide everything with Euclidean
          distance: take the difference between two points in each column, square it, add the
          squares up, and take the root. That formula treats every column identically — it adds
          whatever numbers it is handed, in whatever units they arrived in.
        </P>
        <P>
          Below, a loan applicant is described by two columns: years of credit history, which
          runs 2 to 30, and annual income, which runs $18,000 to $240,000. Credit history spans
          28. Income spans 222,000. Square those spans before you add them and income&rsquo;s
          contribution outweighs credit history&rsquo;s by a factor of roughly 62 million to one. A gap
          of a few hundred dollars in income now counts for more than a decade of credit history
          — not because income is more important, but because it is measured in smaller units and
          therefore produces bigger numbers.
        </P>
        <P>
          Nobody decided that income should matter sixty-two million times more. The columns were
          just typed into a spreadsheet using whatever units people normally use for them, and the
          distance formula took that literally.
        </P>
      </LessonSection>

      <LessonSection id="two-ways-onto-one-scale" title="Two ways onto one scale">
        <P>
          The fix is to put every column on a common scale before distance ever gets computed.
          There are two ways to do it, and it is worth writing both out plainly rather than
          waving at &ldquo;normalise your data&rdquo;.
        </P>
        <P>
          <Strong>Min-max scaling</Strong> squashes a column onto [0, 1]:{" "}
          <InlineCode>x&prime; = (x − min) / (max − min)</InlineCode>. The smallest value in the
          column becomes 0, the largest becomes 1, and everything else lands proportionally
          between them.
        </P>
        <P>
          <Strong>Standardisation</Strong> centres a column on its own mean and divides by its own
          spread: <InlineCode>x&prime; = (x − mean) / standard deviation</InlineCode>. The result
          has mean 0 and standard deviation 1, and it is not bounded — a value three standard
          deviations out still reads as 3.
        </P>
        <P>
          The choice between them turns on one thing: outliers. Min-max is at the mercy of a
          single extreme value, because that value <em>defines</em> one end of the scale. One
          applicant reporting a $4,000,000 income stretches the whole column, and every other
          applicant gets crushed into the bottom sliver near 0. Standardisation does not do this.
          An outlier pulls the mean a little and the standard deviation a little, but it does not
          redefine the axis for everybody else. When you cannot rule out an extreme value —
          which, with real data, is most of the time — standardisation is the safer default.
          Min-max earns its place when the bounds are genuine and fixed, such as a pixel value
          that is always 0 to 255.
        </P>
      </LessonSection>

      <ScaleToggle />

      <LessonSection id="which-models-care" title="Which models care, and which genuinely do not" delay={0.05}>
        <P>
          You just watched the same applicant get two different verdicts from the same five
          neighbours. In raw units, income decides essentially 100% of the distance and the
          nearest applicants are simply whoever earns close to $45,000 — three of whom were
          denied. Standardise both columns and credit history claims most of the distance back;
          the nearest applicants become the other long-tenured ones, and every one of them was
          approved. Nothing about the applicant changed. Only the arithmetic did.
        </P>
        <P>
          That failure is specific to a family of models, not universal to machine learning.
        </P>
        <CompareGrid
          items={[
            {
              title: "Cares about scale",
              tone: "caution",
              children: (
                <>
                  <p>
                    <InlineCode>k-NN</InlineCode> and <InlineCode>k-means</InlineCode> — the
                    entire prediction, or the entire grouping, is a distance calculation.
                  </p>
                  <p>
                    SVMs, and anything with a gradient-based penalty on its coefficients — a
                    column with a huge range needs a huge coefficient to matter, and the penalty
                    punishes huge coefficients specifically, regardless of whether the size is
                    doing real work.
                  </p>
                  <p>
                    PCA — it finds the directions of largest variance, and a column measured in
                    dollars has trivially larger variance than one measured in years, whether or
                    not it carries more signal.
                  </p>
                  <p>
                    Neural networks are scale-invariant in principle and slow in practice —
                    unscaled inputs drag convergence out for far longer than it needs to take.
                  </p>
                </>
              ),
            },
            {
              title: "Genuinely does not care",
              tone: "positive",
              children: (
                <>
                  <p>
                    Decision trees, random forests, gradient boosting — anything built out of
                    splits.
                  </p>
                  <p>
                    A split like <InlineCode>income &gt; 50,000</InlineCode> asks a yes-or-no
                    question about order, not magnitude. Multiply every income by a thousand, or
                    subtract off the mean, and the same applicants land on the same side of the
                    same split. Any monotonic rescaling leaves a tree-based model byte-for-byte
                    unchanged.
                  </p>
                </>
              ),
            },
          ]}
        />
        <Callout tone="tip" title="A cheap way to remember which side a model is on">
          If the model has to measure how far apart two rows are, or penalise a coefficient for
          being large, it cares. If the model only ever asks &ldquo;is this column above or below
          some cut-off&rdquo;, it does not — order survives scaling even though the numbers
          themselves do not.
        </Callout>
      </LessonSection>

      <LessonSection id="scaling-belongs-inside-the-split" title="Scaling belongs inside the split">
        <P>
          Here is the part that goes wrong even after everyone agrees scaling matters: where the
          mean and standard deviation — or the min and max — get computed.
        </P>
        <P>
          The tempting order is to scale the whole dataset once, then split it into training and
          test folds. It looks harmless; scaling is &ldquo;just preprocessing&rdquo;, not
          modelling. But computing a mean over the whole dataset means the test fold&rsquo;s incomes
          and credit histories helped decide what &ldquo;average&rdquo; is — and that average gets
          baked into every training row. The test set has quietly influenced the training data
          before the model has seen a single example. That is exactly the shape of leak the{" "}
          <Strong>data leakage</Strong> chapter warned about: information that should only exist
          after the split leaking into the numbers computed before it.
        </P>
        <P>The correct order fits the scaler on the training fold only, and reuses those two saved numbers — nothing else — on the test fold:</P>
        <CodeBlock
          label="scaling.py"
          code={`scaler = fit_scaler(train)
train_scaled = scaler.transform(train)
test_scaled  = scaler.transform(test)

# Wrong: fits mean and std on the whole dataset, so the test fold has
# already shaped the numbers the training fold is scaled with.
scaler = fit_scaler(features)
features_scaled = scaler.transform(features)
train, test = random_split(features_scaled, 0.33)`}
          lineTones={{ 0: "ok", 1: "ok", 2: "ok", 4: "err", 5: "err", 6: "err", 7: "err", 8: "err" }}
        />
        <P>
          The test fold never contributes to the mean, the standard deviation, the min, or the
          max. It only ever gets <em>transformed</em> by numbers that were fixed before it was
          looked at — which is the same rule the model itself has to follow, applied one step
          earlier in the pipeline.
        </P>
        <Callout tone="warning" title="Cross-validation makes this easy to get wrong by accident">
          If you scale before splitting into folds for cross-validation, every fold leaks a little
          into every other fold, and the leak is small enough per fold that the reported score
          barely moves — which is exactly why it survives code review. Fit the scaler inside each
          fold, on that fold&rsquo;s training rows only.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Euclidean distance adds squared differences in whatever units it is handed, so a column with a wide range dominates before anybody decided it should.",
          "Min-max squashes a column onto [0, 1] and is at the mercy of a single outlier; standardisation centres on the mean and divides by the standard deviation, and shrugs one off.",
          "k-NN, k-means, SVMs, PCA, anything with a gradient-based penalty, and neural networks all care about scale.",
          "Decision trees and the ensembles built from them do not — a split like “income > 50,000” survives any monotonic rescaling untouched.",
          "Fit the scaler on the training fold only, and carry its saved numbers into the test fold. Computing them over the whole dataset leaks test information into training.",
        ]}
      />
    </div>
  );
}
