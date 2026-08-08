import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { MergeVsRebase } from "@/components/github/MergeVsRebase";

export function RebaseAndHistoryLesson() {
  return (
    <div>
      <Lead>
        Rebase does not move your commits; it copies them and abandons the originals, which is
        exactly why it is both tidy and dangerous. Compare the two histories side by side, then meet
        the one rule that keeps it safe.
      </Lead>

      <LessonSection
        id="rebase-copies-commits-it-does-not-move-them"
        title="Rebase copies commits, it does not move them"
      >
        <P>
          A rebase takes each of your commits in turn, computes the change it made, and applies that
          change on top of a different commit. The result is a new commit with the same message, the
          same author, the same content — and a different hash, because the parent is different and
          the hash covers the parent.
        </P>
        <MergeVsRebase />
        <P>
          Step through those three panels and watch what happens to C and D. They do not slide along
          the line. They stay exactly where they were, unreferenced, while C&apos; and D&apos; appear
          somewhere else. Nothing points at the originals any more, so Git will eventually collect
          them.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git switch fix/login
git rebase main
# Successfully rebased and updated refs/heads/fix/login.`}
        />
        <Callout tone="note" title="Rebasing does not touch the branch you rebase onto">
          <span className="font-[family-name:var(--learn-font-mono)]">git rebase main</span> changes{" "}
          <em>your</em> branch. main is not modified, not moved, and not aware anything happened —
          exactly the opposite of the direction people expect from the name.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-result-is-a-straight-line-and-a-small-lie"
        title="The result is a straight line, and a small lie"
      >
        <P>
          The output is a linear history with no merge commits. Reading it is genuinely easier;
          bisecting it is simpler; the log tells a clean story from top to bottom.
        </P>
        <P>
          The story is not quite true. It reads as though you started your work from the latest main,
          finished it, and pushed. In fact you started three days earlier, from a different commit,
          and this arrangement was constructed afterwards.
        </P>
        <CompareGrid
          items={[
            {
              title: "Merge preserves what happened",
              tone: "neutral",
              children: (
                <P>
                  The history records that you branched at B, worked in parallel, and joined at M.
                  Every commit keeps its hash, so anybody who already fetched your branch still has
                  exactly the same commits. The graph is two-dimensional and needs --graph to read.
                </P>
              ),
            },
            {
              title: "Rebase preserves what you meant",
              tone: "positive",
              children: (
                <P>
                  The history reads as a clean sequence of changes to main. Easier to follow and to
                  bisect, and every commit has a new hash — so what lands is not literally what was
                  tested on the branch.
                </P>
              ),
            },
          ]}
        />
        <P>
          Neither is correct in general. The genuinely useful compromise, and what a great many teams
          do, is: <Strong>rebase your own branch while it is still yours</Strong> to keep it tidy and
          up to date, then merge it into main so the landing is recorded.
        </P>
      </LessonSection>

      <LessonSection
        id="never-rebase-commits-somebody-else-already-has"
        title="Never rebase commits somebody else already has"
      >
        <P>
          This is the golden rule, and now the reason for it is obvious rather than mystical.
        </P>
        <P>
          Rebasing gives every commit a new hash. If a colleague has already pulled the originals,
          their Git still has C and D. Yours now has C&apos; and D&apos;. The two histories contain
          the same code under different names, and Git cannot tell they are the same work.
        </P>
        <CodeBlock
          label="What your colleague sees after they pull"
          copyable={false}
          code={`* 8f2a1c4 (origin/fix/login) Handle the empty next param   <- yours, rebased
* 3d9b7e0                     Fix the redirect                <- yours, rebased
* 4b8e0d7 (HEAD -> fix/login) Handle the empty next param     <- theirs, original
* 2c7a91f                     Fix the redirect                <- theirs, original
* 1a5e8c3                     Set up the router`}
          lineTones={{ 0: "ok", 1: "ok", 2: "err", 3: "err" }}
        />
        <P>
          Every commit is now duplicated. If they merge, both copies land and the diff applies twice.
          Untangling this is genuinely unpleasant and it is always somebody else&apos;s afternoon,
          not yours.
        </P>
        <LabelRows
          rows={[
            { label: "Safe", text: "Your own branch, that only you have pushed, or have not pushed at all. Rebase freely." },
            { label: "Ask first", text: "A shared feature branch two people are working on. Agree, and both re-sync afterwards." },
            { label: "Never", text: "main, or any branch other people build on. Use revert; that is what it is for." },
          ]}
        />
        <Callout tone="danger" title="The rule stated as a habit, not a principle">
          If in doubt about whether anyone else has your commits: merge, do not rebase. The worst
          outcome of an unnecessary merge is a slightly messier log. The worst outcome of an
          unnecessary rebase is somebody else&apos;s work duplicated or lost.
        </Callout>
      </LessonSection>

      <LessonSection id="interactive-rebase-is-where-you-tidy-up" title="Interactive rebase is where you tidy up">
        <P>
          <Strong>git rebase -i</Strong> is the same machinery pointed at your own recent commits,
          and it is how twelve commits called &quot;wip&quot; become three commits somebody can
          review.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git rebase -i HEAD~4        # the last four commits
git rebase -i main          # every commit on this branch since main`}
        />
        <CodeBlock
          label="The editor Git opens"
          copyable={false}
          code={`pick 2c7a91f Fix the redirect when next is empty
squash 4b8e0d7 fix typo
reword 7d1f6b4 wip
drop 9a1c4e8 add debug logging

# Commands:
# p, pick   = use commit as is
# r, reword = use commit, but edit the message
# s, squash = merge into the previous commit, combining the messages
# f, fixup  = merge into the previous commit, discarding this message
# e, edit   = stop here so you can amend the commit
# d, drop   = remove the commit entirely
#
# These lines are in OLDEST-FIRST order. Reordering them reorders history.`}
          lineTones={{ 0: "dim", 1: "ok", 2: "accent", 3: "err" }}
        />
        <P>
          Change the word at the start of each line, save, close. Git replays the commits according
          to your instructions. If a step conflicts it pauses exactly as a merge does, and{" "}
          <Strong>git rebase --continue</Strong> carries on once you have resolved and added.
        </P>
        <LabelRows
          rows={[
            { label: "squash", text: "Fold this commit into the one above and let you write a combined message. For assembling a feature from its pieces." },
            { label: "fixup", text: "Same, but throw this message away. For the \"fix typo\" commits that exist only to correct the one before." },
            { label: "reword", text: "Keep the changes, rewrite the message. The most common single use." },
            { label: "drop", text: "Remove it. For debug logging you committed and no longer want anywhere." },
          ]}
        />
        <Callout tone="tip" title="The autosquash workflow">
          Commit a correction with{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git commit --fixup &lt;hash&gt;</span>{" "}
          and it is labelled as belonging to that commit. Later,{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git rebase -i --autosquash main</span>{" "}
          arranges every fixup next to its target with the right command already filled in. It turns
          a fiddly manual edit into pressing save.
        </Callout>
      </LessonSection>

      <LessonSection
        id="force-with-lease-is-the-only-force-worth-typing"
        title="force-with-lease is the only force worth typing"
      >
        <P>
          After rebasing a branch you have already pushed, a normal push is rejected — correctly,
          because your history no longer contains the commits the remote has. Publishing the rebase
          requires overwriting the remote branch.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git push --force-with-lease
# Not: git push --force`}
        />
        <P>
          <Strong>--force</Strong> overwrites the remote branch unconditionally. If a teammate pushed
          a commit to that branch in the last ten minutes, it is now gone, with no warning and no
          record on your machine that it existed.
        </P>
        <P>
          <Strong>--force-with-lease</Strong> overwrites only if the remote is still exactly where
          you last saw it. If somebody has pushed since, the push is rejected and you find out before
          destroying anything.
        </P>
        <CompareGrid
          items={[
            {
              title: "--force",
              tone: "caution",
              children: <P>&quot;Make the remote match me, whatever is there.&quot; There is no situation where this is better than the alternative.</P>,
            },
            {
              title: "--force-with-lease",
              tone: "positive",
              children: <P>&quot;Make the remote match me, but only if nothing has changed since I last fetched.&quot; Same result, with a safety check.</P>,
            },
          ]}
        />
        <Callout tone="warning" title="The lease only holds if your view is fresh">
          <span className="font-[family-name:var(--learn-font-mono)]">--force-with-lease</span>{" "}
          compares against your{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">origin/branch</span> ref, which
          only updates when you fetch. A shell alias that fetches automatically before pushing
          quietly defeats the whole check by refreshing that ref first. Fetch deliberately, look, then
          push.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Rebase replays your changes as new commits with new hashes; the originals are abandoned, not moved.",
          "git rebase main changes your branch. main is untouched.",
          "The result is linear and easier to read, and it describes a sequence of events that did not happen.",
          "A common compromise: rebase your own branch to keep it tidy, then merge it into main so the landing is recorded.",
          "Never rebase commits other people have — new hashes make the same work look like different commits, and it duplicates.",
          "In doubt, merge. A messy log costs less than somebody else's lost work.",
          "git rebase -i squashes, rewords, reorders, and drops commits before review.",
          "fixup plus --autosquash automates the tidy-up almost entirely.",
          "After rebasing a pushed branch, use --force-with-lease, never --force.",
          "The lease is checked against your last fetch, so auto-fetching before pushing silently disables the protection.",
        ]}
      />
    </div>
  );
}
