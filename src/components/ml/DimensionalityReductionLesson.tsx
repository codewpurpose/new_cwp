import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";
import { ProjectionDial } from "@/components/ml/ProjectionDial";

export function DimensionalityReductionLesson() {
  return (
    <div>
      <Lead>
        You would expect forty columns of data to teach a model forty times what one column
        does. It teaches something closer to four or five times as much, once the columns start
        repeating each other and the space between points stops meaning what you think it means.
        This lesson is about the gap between the columns you were handed and the information
        actually sitting inside them.
      </Lead>

      <LessonSection
        id="more-columns-is-not-more-information"
        title="More columns is not more information"
      >
        <P>
          Every extra column feels like a small win. One more measurement, one more angle on the
          problem, surely a fuller picture of each example. It is not, and the reason is not
          simply that some columns turn out to be useless. Even useful ones can hurt once there
          are enough of them.
        </P>
        <P>
          Picture a scatter of points on a page. Some sit close together, some sit far apart, and
          &ldquo;close&rdquo; means something — the near ones really do resemble each other more
          than the far ones do. Keep adding measurements and something strange happens to that
          idea. By the time you are tracking forty things about each example, the nearest point
          and the farthest point end up almost the same distance away. Every direction looks
          equally empty. Anything that leans on distance — nearest neighbours, clustering,
          anything that measures how alike two examples are — starts guessing.
        </P>
        <P>
          There is a second cost, and it compounds the first. A modest number of examples is
          enough to see a pattern laid out along one axis. Add axes and the space you would need
          to fill grows exponentially: cover a line with ten points and it looks dense; cover a
          hundred-dimensional cube with ten points along every side and you would need far more
          examples than exist for anything anyone measures. Practically, more columns without
          more rows means a thinner picture of the same-sized dataset, not a richer one.
        </P>
        <P>
          The columns rarely earn their keep individually, either. Height in centimetres and
          height in inches are the same fact wearing two names — keeping both teaches a model
          nothing new, and it has spent one of its columns on a repeat. Two exam scores that move
          together are a softer version of the same problem: a student strong in algebra is
          usually strong in geometry too, so a good chunk of what one score tells you, the other
          one already told you.
        </P>
      </LessonSection>

      <LessonSection
        id="flattening-without-losing-the-point"
        title="Flattening without losing the point"
      >
        <P>
          Reduction sounds like deletion — pick a column, throw it away, hope you did not need
          it. That is one way to do it, and it is the crude one. The better way keeps every
          column&rsquo;s information and asks the data to stand at a different angle instead.
        </P>
        <P>
          Below are sixty-four students, placed by their algebra and geometry marks. The two
          scores are correlated, so the cloud is not round — it leans, spreading further along
          one diagonal than the other. A projection line is a direction you flatten every point
          onto: walk from each point straight across to the line and mark where it lands.
        </P>
        <P>
          Drag the angle and watch two things move together: the drop each point makes onto the
          line, and the one-dimensional strip of shadows collecting underneath it. Somewhere in
          that sweep is the angle that keeps the most of the original spread. Hunt for it before
          you read the next section.
        </P>
      </LessonSection>

      <ProjectionDial />

      <LessonSection id="what-a-component-actually-is" title="What a component actually is">
        <P>
          The angle you were hunting for has a name. It is the <Strong>first principal
          component</Strong>: the single direction along which the cloud spreads out the most.
          Here that is fifty-two degrees, and it keeps 86% of the total variance in the two
          scores. Turn the line ninety degrees the wrong way and it keeps 14%. Delete geometry
          outright and keep only the raw algebra axis and you retain 42%; delete algebra and
          keep geometry and it is 58%. Both of those single-column deletions lose more than the
          rotation you found by eye.
        </P>
        <P>
          A second component is defined the same way, with one restriction: it must sit at a
          right angle to the first. In two dimensions that leaves no freedom at all — once the
          best line is fixed, the second one runs perpendicular to it and mops up whatever
          variance the first missed. With forty original columns you keep going: a third
          component at right angles to the first two, a fourth at right angles to all three, each
          one required to explain less than the one before it.
        </P>
        <P>
          None of these directions is one of your original columns. The one you found is 0.62 ×
          algebra + 0.79 × geometry — a blend, weighted slightly toward geometry because geometry
          happened to spread out a little further. That blending is exactly why components resist
          a plain-English name. &ldquo;Overall academic strength&rdquo; is a reasonable gloss for
          this one, but it is a gloss, not a fact the data handed you. There is no column in the
          original table called that — only a formula for rebuilding it from the two you gave it.
        </P>
        <P>
          With two columns nobody bothers choosing how many components to keep — you use one or
          you use both. With forty, the choice is real, and it is normally made by looking at a
          single curve rather than inspecting each direction by hand.
        </P>
        <StepList
          steps={[
            {
              label: "Compute each component's share of the variance",
              detail:
                "Divide every component's variance by the total, and order them largest first. The first component's share is, by construction, the biggest any single direction can claim.",
            },
            {
              label: "Add the shares up as you go",
              detail:
                "A running total: after one component, after two, after three. It climbs fast at the start and flattens as the later components mop up smaller and smaller scraps.",
            },
            {
              label: "Stop where the curve bends",
              detail:
                "People commonly stop at the elbow — where one more component buys noticeably less than the last one did — or at a round threshold like 90% or 95% retained, whichever comes first.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="what-you-give-up" title="What you give up, and when it is worth it">
        <P>
          The blending that makes a component powerful is the same thing that makes it opaque.
          Tell someone a loan application was declined because of feature 3 — a mixture of
          income, existing debt, and two other columns weighted 0.4, 0.3, and 0.2 — and you have
          not really answered the question they asked. Before reduction, &ldquo;this decision was
          driven by income&rdquo; is a sentence you can say and defend. After it, the honest
          sentence is closer to &ldquo;this decision was driven by a direction we cannot
          name,&rdquo; which satisfies nobody in a room asking to be told why.
        </P>
        <P>
          There is a sharper version of the same problem sitting in the sixty-four students
          above. Twenty-one of them were flagged for extra support, and that flag is barely
          visible along the best angle — the two groups&rsquo; averages sit just 0.2 points apart
          on the fifty-two-degree line. Rotate ninety degrees off it, to the direction the dial
          liked least, and the gap widens to 6.8 points, the clearest separation on the whole
          dial. PCA never looks at the flag. It only ever asks which direction the cloud spreads
          out along, and nothing forces that to be the direction that mattered for the thing you
          actually wanted to predict.
        </P>
        <P>
          The fix for the other risk is procedural, and it is the same fix as scaling and every
          other transform learned from the data: fit the rotation on the training set only, then
          apply that exact rotation to the test set. Fit it on everything first and the test set
          has quietly leaked into the axes the model is trained on — the same rule the data
          leakage chapter spent an entire lesson on, wearing a new transform.
        </P>
        <CompareGrid
          items={[
            {
              title: "What you lose",
              tone: "caution",
              children: (
                <p>
                  A named story for any single prediction. Whatever direction the label actually
                  lived along, if PCA did not rate it high-variance, it can be thinned out or gone
                  entirely — and you will not find out until the model that follows underperforms
                  one that skipped reduction.
                </p>
              ),
            },
            {
              title: "What you keep",
              tone: "positive",
              children: (
                <p>
                  Almost all of the spread, in a fraction of the columns — 86% of it here, from
                  one direction instead of two. Distances stop flattening out, training gets
                  faster, and models that struggle with correlated inputs stop struggling.
                </p>
              ),
            },
          ]}
        />
        <Callout tone="note" title="t-SNE and UMAP are not this">
          Both are popular for turning many columns into a two-dimensional picture worth looking
          at, and both work by a completely different rule than the rotation above — they try to
          keep nearby points nearby, not to preserve variance along an axis. The trap is reading
          the gaps between clusters in one of these plots as meaningful distances. They are not.
          Two clusters drawn far apart are not necessarily more different than two drawn close
          together; the layout optimises local neighbourhoods, and it is free to stretch or
          compress the space between them however it likes.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "More columns is not more information once they overlap. Distances flatten out, the examples you need climbs, and correlated columns often say the same thing twice.",
          "Reduction is a rotation to a better set of axes, not a deletion of columns — the crude version throws information away that the rotated version keeps.",
          "A principal component is the direction of greatest variance, then the next at a right angle to it, and each one is a weighted blend of your original columns rather than a copy of one.",
          "People choose how many components to keep by watching the cumulative variance curve bend, not by judging each direction on its own.",
          "PCA is unsupervised. It can discard the exact direction that predicted your label, and it must be fitted inside the training split like every other learned transform.",
        ]}
      />
    </div>
  );
}
