import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ForestVote } from "@/components/ml/ForestVote";

export function RandomForestsLesson() {
  return (
    <div>
      <Lead>
        The last chapter ended with a tree that had memorised its training data. The obvious
        response is to build a better tree. The response that actually works is to build two
        hundred worse ones and let them argue. This is the least intuitive idea in the track, and
        it is the one that wins competitions.
      </Lead>

      <LessonSection id="many-mediocre-opinions" title="Many mediocre opinions">
        <P>
          A deep tree is not wrong on average. It is wrong <em>erratically</em>. Move three flats
          in the training set and whole branches rearrange themselves, because one different
          split near the root changes everything beneath it. That instability is a nuisance if
          you want one reliable tree. It is the raw material if you want a crowd.
        </P>
        <P>
          Here is the bet. If you can build many trees whose mistakes are unrelated to each
          other, then averaging them cancels the mistakes and keeps the signal. Each tree is
          worse than the careful single tree you would have built. The average of them is better
          than any of them. That only holds if the errors really are unrelated — which is why the
          next section is about forcing the trees apart rather than about trees at all.
        </P>
        <P>
          The data has changed slightly for this chapter, and deliberately. The previous
          chapter&apos;s flats were arranged in rectangles, which is the shape a tree draws
          naturally. These 250 flats follow the honest rule: a flat lets quickly when the rent
          plus the cost of travelling to campus is low. That boundary is a diagonal, and a
          diagonal is precisely what an axis-aligned tree cannot express.
        </P>
      </LessonSection>

      <LessonSection id="making-the-trees-disagree" title="Making the trees disagree on purpose">
        <P>
          Given identical data and the same greedy procedure, every tree you grow is the same
          tree. Two hundred copies of one opinion is still one opinion. So a random forest
          handicaps each tree in two independent ways.
        </P>
        <P>
          <Strong>Bootstrapping.</Strong> Each tree gets its own training set, drawn from the
          original with replacement and the same size. Some flats appear three times, some not at
          all — roughly a third are missing from any given tree. Every tree therefore sees a
          slightly different world.
        </P>
        <P>
          <Strong>Feature subsetting.</Strong> At every split, a tree may only consider a random
          subset of the features rather than all of them. With just two features here, that means
          each split is decided by a coin flip and the best cut on whichever feature it landed
          on. This is the more important of the two, and the less obvious: without it, one
          dominant feature would be chosen at the root of nearly every tree no matter how the
          rows were resampled, and the trees would stay correlated.
        </P>
        <Callout tone="note" title="Bagging is the half of this that has its own name">
          Bootstrapping plus aggregating the votes is called <em>bagging</em>, and it works with
          any unstable model. Random forests are bagging plus the feature trick. The addition is
          what makes the ensemble more than the sum of resampled parts, and it is why the method
          has its own name rather than being filed under bagged trees.
        </Callout>
      </LessonSection>

      <ForestVote />

      <LessonSection id="watching-the-vote-settle" title="Watching the vote settle" delay={0.05}>
        <P>
          At one tree the shading is blocky and absolute: solid or nothing, with a staircase
          edge where the tree tried to trace the diagonal. It scores 72.5% on the held-back
          flats, the same as the single unrestricted tree it is a copy of in spirit.
        </P>
        <P>
          Add trees and a soft band appears along the true boundary. Those are the cells where
          the trees disagree, and their position is not arbitrary — the disagreement
          collects exactly where the answer is actually uncertain. By 120 trees the staircase has
          become a diagonal, drawn by an ensemble of models none of which can draw a diagonal.
        </P>
        <P>
          The score climbs to 82.5%. Ten points above the unrestricted tree, and six and a half
          above the best pruned single tree, which was found by cheating slightly — trying all
          fourteen depths and keeping whichever scored best on the very data it was being
          measured on.
        </P>
        <Callout tone="tip" title="Why two trees are worse than one">
          The curve dips at two trees, to 68.5%. With an even number of voters a tie is possible,
          and a tie has to be broken by a rule that is not evidence — here it falls to
          &ldquo;lets quickly&rdquo;. Three trees recovers it. Ensembles want odd sizes for the
          same reason k did two chapters ago, and in practice nobody notices because nobody
          builds a forest of two.
        </Callout>
        <P>
          Notice where the gain stops. Between 32 and 120 trees the score moves by half a point.
          More trees never makes a forest worse — the average just gets less noisy — but the
          returns flatten early. Practitioners pick a few hundred and stop thinking about it,
          because the parameter that matters is how the trees are made, not how many.
        </P>
      </LessonSection>

      <LessonSection id="what-you-give-up" title="What you give up for it">
        <P>
          The previous chapter sold you the tree on the strength of being able to read it. A
          forest throws that away completely. There is no flowchart to print. The answer is a
          tally across 120 disagreeing flowcharts, and no sentence summarises it.
        </P>
        <P>
          What you get back is a partial substitute: the forest can tell you which features
          mattered, by measuring how much impurity each one removed across every split in every
          tree. That is useful and it is not the same thing. &ldquo;Rent mattered
          most&rdquo; does not tell a landlord why <em>their</em> flat was predicted to sit
          empty.
        </P>
        <P>
          It also costs more of everything. Training is a hundred-odd times the work of one
          tree, prediction asks every tree before it can answer, and the model is a hundred times
          the size on disk. All three are usually acceptable, and all three are the reason a
          single tree still ships in places where a forest would not fit.
        </P>
        <P>
          The honest summary is that random forests are the strongest thing in this track that
          you can understand completely, and they are a reasonable first attempt on almost any
          table of rows and columns. They will not read a sentence or recognise a photograph.
          Nothing here will. What they do is take a model that was too unstable to trust and
          make its instability the point.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A random forest trains many deliberately weakened trees and predicts by majority vote.",
          "It only works if the trees make unrelated mistakes, so a forest forces them apart on purpose.",
          "Bootstrapping gives each tree its own resampled training set, leaving roughly a third of the rows out of any given tree.",
          "Feature subsetting limits each split to a random handful of features, which is what stops one strong feature dominating every root.",
          "Here the forest reached 82.5% against 72.5% for one unrestricted tree and 76.0% for the best pruned one.",
          "120 trees drew a clean diagonal boundary that no individual member could express.",
          "Returns flatten fast — most of the gain arrives by about 30 trees, and more trees never hurt.",
          "You lose readability entirely. Feature importances tell you what mattered overall, never why one particular prediction came out as it did.",
        ]}
      />
    </div>
  );
}
