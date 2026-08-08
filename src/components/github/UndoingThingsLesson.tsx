import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { UndoChooser } from "@/components/github/UndoChooser";

export function UndoingThingsLesson() {
  return (
    <div>
      <Lead>
        Four commands undo four different things and the internet recommends them interchangeably.
        Name what you regret first — a file, a staging decision, a commit, a pushed commit — and the
        right command falls out of the answer.
      </Lead>

      <LessonSection
        id="name-what-you-regret-before-picking-a-command"
        title="Name what you regret before picking a command"
      >
        <P>
          This chapter exists because the top search result for &quot;git undo&quot; is a Stack
          Overflow answer with eleven commands and forty thousand upvotes, and running the wrong one
          of them destroys work.
        </P>
        <P>
          The reliable method is to stop and say out loud what you want to lose. There are only six
          answers, and each has exactly one right command.
        </P>
        <UndoChooser />
      </LessonSection>

      <LessonSection id="restore-throws-away-work-and-does-not-ask" title="restore throws away work, and does not ask">
        <P>
          <Strong>git restore</Strong> overwrites a file in your working tree with the version from
          the last commit. Whatever you had typed is gone — not in the index, not in a commit, not in
          the reflog. Gone.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git restore src/app.js       # this file, back to the last commit
git restore .                 # every modified file. There is no confirmation prompt.`}
        />
        <P>
          There is no undo for this because there is nothing to undo <em>from</em>. Git can recover
          anything it has ever recorded, and it never recorded that edit.
        </P>
        <Callout tone="danger" title="git checkout -- . is the same command with an older name">
          You will see it constantly in older answers.{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git restore</span> was
          introduced in Git 2.23 precisely because{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">checkout</span> did four
          unrelated jobs and people invoked the destructive one by accident. Prefer the new name; it
          only does one thing.
        </Callout>
        <P>
          If you are not sure you want to lose it, do not. <Strong>git stash</Strong> sets your
          changes aside somewhere you can get them back.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git stash push -m "half-finished search filter"
# working tree is clean now

git stash list                # what is stashed
git stash pop                 # bring the most recent one back and remove it from the stash
git stash apply stash@{1}     # bring an older one back and KEEP it in the stash`}
        />
      </LessonSection>

      <LessonSection id="reset-moves-a-branch-pointer-backwards" title="reset moves a branch pointer backwards">
        <P>
          <Strong>git reset</Strong> does one thing: it points your current branch at a different
          commit. What it does to your files afterwards is decided entirely by which of three flags
          you pass, and those three flags are the whole difficulty.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "--soft",
              tone: "positive",
              children: (
                <P>
                  Move the branch. Leave the index and the working tree alone. Your changes are still
                  staged, ready to be re-committed differently.
                </P>
              ),
            },
            {
              title: "--mixed (the default)",
              tone: "neutral",
              children: (
                <P>
                  Move the branch and reset the index. Your changes are in the working tree,
                  unstaged. Nothing is lost.
                </P>
              ),
            },
            {
              title: "--hard",
              tone: "caution",
              children: (
                <P>
                  Move the branch, reset the index, and overwrite the working tree. Your changes are
                  destroyed. This is the one people mean when they say reset is dangerous.
                </P>
              ),
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# "I want to redo the last commit differently"
git reset --soft HEAD~1
# ... adjust what is staged ...
git commit -m "The message and contents I actually meant"

# "Uncommit the last three, keep all the work in my folder"
git reset HEAD~3

# "Throw the last commit away entirely, including the code"
git reset --hard HEAD~1`}
        />
        <P>
          <Strong>HEAD~1</Strong> means &quot;one commit before HEAD&quot;, HEAD~3 means three
          before, and so on. You can also give a hash directly.
        </P>
        <Callout tone="warning" title="Reset rewrites history, so it is for commits nobody else has">
          Resetting a commit you have already pushed leaves your branch behind the remote, and the
          only way to publish the result is a force push — which deletes a commit other people may
          already have pulled. For anything already shared, the command in the next section is the
          one you want.
        </Callout>
      </LessonSection>

      <LessonSection id="revert-adds-a-commit-that-cancels-an-old-one" title="revert adds a commit that cancels an old one">
        <P>
          <Strong>git revert</Strong> is the safe undo, and it is the only one that is honest about
          what happened. It does not remove the bad commit. It computes the opposite of that
          commit&apos;s diff and commits that.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git revert 2c7a91f            # opens an editor with a pre-written message
git revert --no-edit 2c7a91f  # accept the default message
git revert HEAD               # undo the very last commit, safely`}
        />
        <CodeBlock
          label="After git revert"
          copyable={false}
          code={`* 8e2f1d5  Revert "Cache the user lookup for 60 seconds"
* 2c7a91f  Cache the user lookup for 60 seconds
* 1a5e8c3  Set up the router`}
          lineTones={{ 0: "ok", 1: "err" }}
        />
        <P>
          Both commits are in the history. That is not clutter — it is the record. Anyone reading it
          later sees that the caching was tried and withdrawn, which is genuinely useful information
          and is exactly what a reset would have erased.
        </P>
        <LabelRows
          rows={[
            { label: "Reset", text: "Pretends the commit never existed. Only safe on commits that only you have." },
            { label: "Revert", text: "Records that it existed and was undone. Safe always, including on main, including after a hundred people pulled it." },
            { label: "Rule", text: "Pushed? Revert. Not pushed? Either, and reset is tidier." },
          ]}
        />
        <Callout tone="note" title="Reverting a merge commit needs -m 1">
          A merge commit has two parents, so &quot;the opposite of this commit&quot; is ambiguous —
          Git cannot tell which side you consider the mainline.{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git revert -m 1 &lt;hash&gt;</span>{" "}
          says &quot;the first parent&quot;, which is the branch you were on when you merged. Without
          the flag Git refuses rather than guessing.
        </Callout>
      </LessonSection>

      <LessonSection id="reflog-is-the-safety-net-under-all-of-it" title="reflog is the safety net under all of it">
        <P>
          Every time HEAD moves — every commit, checkout, reset, merge, rebase, amend — Git writes a
          line to the <Strong>reflog</Strong>. It is local, it is not part of the history, nobody
          else ever sees it, and it keeps roughly ninety days.
        </P>
        <P>
          It is how you recover from a reset --hard you should not have run.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git reflog`}
        />
        <CodeBlock
          label="git reflog"
          copyable={false}
          code={`9f3c1a2 HEAD@{0}: reset: moving to HEAD~3
4b8e0d7 HEAD@{1}: commit: Handle the empty next param
2c7a91f HEAD@{2}: commit: Fix the redirect when next is empty
7d1f6b4 HEAD@{3}: commit: Add the settings page
1a5e8c3 HEAD@{4}: checkout: moving from main to fix/login`}
          lineTones={{ 0: "warn", 1: "ok" }}
        />
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Find where you were before the mistake",
              detail: "HEAD@{1} here is the commit the branch pointed at immediately before the reset. Its hash is 4b8e0d7.",
            },
            {
              label: "Look before you leap",
              detail: "git show 4b8e0d7 confirms it is the commit you think it is. Cheap, and it costs nothing to check.",
            },
            {
              label: "Put the branch back",
              detail: "git reset --hard 4b8e0d7 moves your branch back to where it was. The three commits are exactly as they were, with the same hashes.",
            },
          ]}
        />
        <Callout tone="success" title="What reflog cannot save">
          Anything that was never committed. A file you edited and then{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git restore</span>d was never
          in Git, so it is not in the reflog either. This is the practical argument for committing
          often: a commit is what makes work recoverable, and everything after that is just moving
          pointers around.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Say what you want to lose before you pick a command. Six situations, six answers.",
          "git restore overwrites a file from the last commit and the edit is unrecoverable — it was never in Git.",
          "git stash sets work aside safely when you are not sure you want to lose it.",
          "git reset moves the branch pointer; --soft keeps changes staged, --mixed keeps them unstaged, --hard destroys them.",
          "git reset --soft HEAD~1 is how you redo the last commit differently.",
          "git revert adds a new commit that cancels an old one, leaving both in the history.",
          "Pushed? Revert. Not pushed? Reset is fine and tidier.",
          "Reverting a merge needs -m 1 to say which parent was the mainline.",
          "git reflog records every move of HEAD for about ninety days and can recover a branch after a bad reset --hard.",
          "The reflog cannot recover work that was never committed. That is the case for committing often.",
        ]}
      />
    </div>
  );
}
