import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function MergingBranchesLesson() {
  return (
    <div>
      <Lead>
        Merging has a direction, and half of all merge confusion is standing on the wrong branch when
        you run it. See what a fast-forward really is, and why a three-way merge needs a third commit
        nobody mentions.
      </Lead>

      <LessonSection
        id="merging-has-a-direction-and-you-stand-on-the-target"
        title="Merging has a direction, and you stand on the target"
      >
        <P>
          <Strong>git merge X</Strong> means &quot;bring X into where I am standing&quot;. It never
          means the reverse, and it never touches X.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git switch main               # stand on the branch you want to CHANGE
git merge fix/login           # bring the other branch into it`}
        />
        <P>
          After that, main contains the work from fix/login and{" "}
          <Strong>fix/login is exactly where it was</Strong>. It has not moved, it has not gained
          anything, and it can be deleted or carried on with.
        </P>
        <P>
          Getting this backwards is the most common merge mistake there is. Running{" "}
          <Strong>git merge main</Strong> while standing on fix/login is a completely legitimate and
          often useful command — it brings main&apos;s recent work into your branch so you can catch
          up. It just is not what somebody means when they say &quot;merge my branch&quot;.
        </P>
        <LabelRows
          rows={[
            { label: "On main", text: "git merge fix/login — publishing your finished work. main changes." },
            { label: "On the branch", text: "git merge main — catching up with everyone else. Your branch changes." },
            { label: "Check first", text: "git status prints the branch you are on. Read it before merging, every time." },
          ]}
        />
      </LessonSection>

      <LessonSection id="a-fast-forward-is-not-really-a-merge" title="A fast-forward is not really a merge">
        <P>
          If main has not moved since your branch left it, there is nothing to combine. Your branch
          is simply main plus some commits. Git says so and slides the label forward.
        </P>
        <CodeBlock
          label="Before"
          copyable={false}
          code={`A ── B ── C ── D        C and D are on fix/login
     ↑         ↑
    main   fix/login`}
        />
        <CodeBlock
          label="After git merge fix/login, standing on main"
          copyable={false}
          code={`A ── B ── C ── D
               ↑
        main, fix/login       Updating 7d1f6b4..4b8e0d7
                              Fast-forward`}
          lineTones={{ 2: "ok" }}
        />
        <P>
          No commit was created. main was moved. That is all a fast-forward is, and it is why the
          history afterwards is perfectly linear with no evidence a branch ever existed.
        </P>
        <P>
          Whether that is good depends on your taste. Some teams want a clean straight line; others
          want the record that these three commits were one piece of work reviewed together. Git
          lets you insist on the record:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git merge --no-ff fix/login   # always create a merge commit, even when a fast-forward is possible
git merge --ff-only fix/login # refuse to merge unless it can fast-forward`}
        />
        <P>
          <Strong>--ff-only</Strong> is more useful than it looks. It fails loudly when your branch
          has fallen behind, rather than quietly producing a merge commit you did not intend, which
          makes it a good default for pulling.
        </P>
      </LessonSection>

      <LessonSection id="a-three-way-merge-invents-a-new-commit" title="A three-way merge invents a new commit">
        <P>
          When both branches have moved, there is no label to slide. Git has to build something.
        </P>
        <CodeBlock
          label="Before"
          copyable={false}
          code={`          C ── D          fix/login
         ╱
A ── B ── E              main`}
        />
        <CodeBlock
          label="After git merge fix/login, standing on main"
          copyable={false}
          code={`          C ── D
         ╱         ╲
A ── B ── E ─────── M    main
                    ↑
              the merge commit — two parents, E and D`}
          lineTones={{ 3: "ok" }}
        />
        <P>
          <Strong>M</Strong> is a merge commit, and it is the only kind of commit with two parents.
          It contains the combined result, it records that these two lines of development joined
          here, and Git writes its message for you.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git merge fix/login
# Merge made by the 'ort' strategy.
#  src/auth/redirect.ts | 12 +++++++++---
#  1 file changed, 9 insertions(+), 3 deletions(-)`}
        />
        <Callout tone="note" title="Merge commits are not clutter, and they are not free either">
          They record real information: what was developed together, and when it landed. They also
          make the history two-dimensional, so reading it needs{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">--graph</span> and bisecting it
          gets more complicated. Teams disagree about this, sincerely and at length. Both positions
          are defensible; what is not defensible is not knowing which one your team has taken.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-merge-base-decides-what-counts-as-a-change"
        title="The merge base decides what counts as a change"
      >
        <P>
          &quot;Three-way&quot; names the three commits Git compares, and the third one is the piece
          nobody explains.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "The merge base — commit B",
              detail: "The most recent commit both branches share. Git finds it automatically; git merge-base main fix/login prints it.",
            },
            {
              label: "Yours — commit E",
              detail: "The tip of the branch you are standing on.",
            },
            {
              label: "Theirs — commit D",
              detail: "The tip of the branch you are merging in.",
            },
          ]}
        />
        <P>
          Git compares the base to each side. A line that changed on one side and not the other is
          taken from the side that changed it — no ambiguity, no question asked. A line that changed
          on both sides is a conflict, which is the next chapter.
        </P>
        <P>
          This is why merging is not a naive line-by-line comparison of two files. Without the base,
          Git would have no way to tell a line somebody added from a line somebody deleted, and every
          merge would be a conflict.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git merge-base main fix/login
# 91b2d4f0a7c3e5b8d1f4a6c9e2b5d8f1a4c7e0b3

# What each side did since the base
git log --oneline main..fix/login      # their commits
git log --oneline fix/login..main      # yours`}
        />
      </LessonSection>

      <LessonSection id="no-ff-keeps-the-shape-of-the-work" title="--no-ff keeps the shape of the work">
        <P>
          Everything so far, as a single decision: what should main&apos;s history look like after a
          branch lands?
        </P>
        <CompareGrid
          items={[
            {
              title: "Fast-forward where possible",
              tone: "neutral",
              children: (
                <P>
                  A straight line. Simple to read, easy to bisect, and it loses the information that
                  three commits were one feature. Suits small teams and short branches.
                </P>
              ),
            },
            {
              title: "--no-ff always",
              tone: "positive",
              children: (
                <P>
                  Every branch leaves a merge commit. The history shows what was developed together
                  and can be reverted as a unit. Suits teams that review by pull request — which is
                  why GitHub&apos;s &quot;Create a merge commit&quot; button does exactly this.
                </P>
              ),
            },
          ]}
        />
        <P>
          Two more things before the next chapter. If a merge starts and you decide against it:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git merge --abort         # during a conflicted merge, put everything back
git merge --no-commit …   # merge but stop before committing, so you can inspect first`}
        />
        <P>
          And once a branch is merged, delete it. The commits are safely in main; the label is
          forty-one bytes of noise in everybody&apos;s branch list.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git branch --merged          # branches whose work is already in the current branch
git branch -d fix/login      # safe delete: refuses if the work is NOT merged`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "git merge X brings X into where you are standing. X is never modified.",
          "Stand on main and merge the branch to publish work; stand on the branch and merge main to catch up.",
          "A fast-forward happens when the target has not moved: no commit is created, the label slides.",
          "--no-ff forces a merge commit anyway; --ff-only refuses to merge unless it can fast-forward.",
          "A three-way merge builds a merge commit — the only commit with two parents.",
          "The merge base is the most recent shared commit, and it is what lets Git tell an addition from a deletion.",
          "A line changed on one side is taken silently. A line changed on both sides is a conflict.",
          "git merge --abort undoes a merge in progress completely.",
          "Delete merged branches; git branch -d refuses if the work is not actually merged.",
        ]}
      />
    </div>
  );
}
