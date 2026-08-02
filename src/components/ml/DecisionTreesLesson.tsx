import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TreeSplitter } from "@/components/ml/TreeSplitter";

export function DecisionTreesLesson() {
  return (
    <div>
      <Lead>
        Chapter one showed you that stacking hand-written rules stops paying off. This chapter is
        the twist: the rules were never the problem. Writing them yourself was. A decision tree
        is a flowchart of exactly the kind you gave up on, except that the questions and their
        order are worked out from the data.
      </Lead>

      <LessonSection id="a-flowchart-nobody-wrote" title="A flowchart nobody wrote">
        <P>
          You already know how to read one. Is the rent under £700? If yes, is it within 3.5 km
          of campus? If yes, predict it lets within a week. Follow the branches to a leaf and the
          leaf is your answer.
        </P>
        <P>
          What makes it a model rather than a flowchart is that nobody chose those questions.
          Two things get decided from the data at every step: <Strong>which feature</Strong> to
          ask about, and <Strong>where to cut it</Strong>. Everything else follows.
        </P>
        <P>
          This buys something the previous chapter could not. A k-Nearest Neighbours prediction
          justifies itself with a list of neighbours. A tree hands you a rule in words, and a
          landlord could argue with it. That is a real difference, and it is most of why trees
          survive in places where somebody has to explain a decision.
        </P>
      </LessonSection>

      <LessonSection id="what-makes-a-question-good" title="What makes a question good">
        <P>
          A good question separates the classes. Before any split, these fifty flats are a
          jumble. After splitting on rent at £697, one side is mostly flats that let quickly and
          the other is mostly flats that did not. The mess went down.
        </P>
        <P>
          That mess has a number. <Strong>Gini impurity</Strong> asks: if you picked a flat from
          this group at random and guessed its outcome using nothing but the group&apos;s own
          proportions, how often would you be wrong? An even 50/50 split scores 0.5, the worst
          possible. A group where every flat agrees scores 0.
        </P>
        <P>
          To score a candidate split, measure the impurity of both sides, weight each by how many
          flats it holds, and subtract from the parent&apos;s. That drop is the{" "}
          <Strong>gain</Strong>. The tree tries every feature at every sensible cut point and
          keeps the largest gain. On this data the winner is rent at £697, worth 0.185 — close to
          the £700 the flats were actually generated around.
        </P>
      </LessonSection>

      <TreeSplitter />

      <LessonSection id="choosing-the-split" title="Choosing the split, one level at a time" delay={0.05}>
        <P>
          Having made that cut, the tree forgets it was ever part of a bigger problem and repeats
          the same procedure on each side independently. Cheap flats get their own best question.
          Expensive flats get theirs. Down and down until something stops it.
        </P>
        <P>
          This is a <Strong>greedy</Strong> algorithm: it takes the best-looking step available
          right now and never revisits it. That is worth being suspicious of, because the best
          first question is not always part of the best overall tree. A pair of mediocre splits
          that work brilliantly together will lose to one good split followed by nothing, and the
          tree will never find out. Nobody solves this properly — searching every possible tree
          is computationally hopeless — so every tree you will ever use is greedy and slightly
          suboptimal by construction.
        </P>
        <Callout tone="note" title="Why the cuts are always straight">
          Every boundary in the chart is a vertical or horizontal line, because every question
          asks about one feature at a time. A tree cannot ask &ldquo;is rent plus fifty times
          distance under 900?&rdquo; Give it a diagonal boundary and it will approximate the
          diagonal with a staircase, needing many splits to do badly what one line would do
          well. That is a real weakness, and it is the mirror image of the last chapter: this
          data was built rectangular precisely so a tree could shine on it.
        </Callout>
      </LessonSection>

      <LessonSection id="a-tree-left-to-grow" title="A tree left to grow will memorise">
        <P>
          Drag the depth slider to 4 and look at the training score. It is 100%. Every one of the
          fifty flats it studied is now classified correctly, including the roughly one in eleven
          whose outcome was pure chance.
        </P>
        <P>
          Now read the held-back line. It peaked at 82% back at depth 2 and has fallen to 68%.
          The tree spent depths 3 and 4 carving out tiny blocks around individual flats that
          happened to defy the pattern. Each of those blocks is the tree learning something true
          about one flat and false about everything else.
        </P>
        <P>
          Left unrestrained, a tree will always reach this point. It can keep asking questions
          until every leaf holds a single flat, at which point it has stopped being a model and
          become a lookup table with extra steps. That is why every tree implementation ships
          with limits — a maximum depth, a minimum number of samples in a leaf, a minimum gain
          worth splitting for.
        </P>
        <Callout tone="warning" title="Depth 2 wins here. Do not memorise the 2.">
          The best depth on this data is 2, and that number is a property of these seventy-two
          flats rather than a fact about trees. More data, noisier labels or a more complicated
          truth all move it. What transfers is the shape: training accuracy climbs forever, held-
          back accuracy peaks and then declines, and the peak is the only place worth stopping.
        </Callout>
        <P>
          Switch the view to the twenty-two held-back flats at depth 6 and you can watch the
          failure directly. The thin slivers the tree cut around awkward training flats now
          collect held-back flats that land in them for no reason at all, and each one is a
          confident wrong answer.
        </P>
        <P>
          One tree, then, is easy to read, cheap to train, and reliably overfits. The next
          chapter takes that last flaw and turns it into the ingredient that fixes it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A decision tree is a flowchart where the questions and their order are chosen from the data rather than by you.",
          "Gini impurity measures how mixed a group is: 0.5 for an even split, 0 when every example agrees.",
          "A split is scored by how much weighted impurity it removes. The tree tries every feature at every cut point and keeps the best.",
          "Splitting is greedy — it never reconsiders an earlier cut, so the tree you get is reliably good and reliably not optimal.",
          "Every question is about one feature, so every boundary is axis-aligned. Diagonal boundaries cost a tree a staircase of splits.",
          "Training accuracy hits 100% at depth 4 here while held-back accuracy peaked at 82% back at depth 2. Unrestrained, a tree memorises.",
          "A tree deep enough to be accurate is usually too deep to read, which costs you the interpretability you chose it for.",
        ]}
      />
    </div>
  );
}
