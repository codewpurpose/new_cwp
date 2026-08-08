import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { CommitGraph } from "@/components/github/CommitGraph";

export function WhatABranchIsLesson() {
  return (
    <div>
      <Lead>
        A branch is a file containing a forty-character hash, which is why creating one is instant
        and why deleting one deletes almost nothing. Build a history one commit at a time and watch
        the labels move.
      </Lead>

      <LessonSection id="a-branch-is-a-file-containing-one-hash" title="A branch is a file containing one hash">
        <P>
          Most people picture a branch as a copy of the project, or a line on a diagram, or a folder
          somewhere. It is none of those. Look at it directly:
        </P>
        <CodeBlock
          variant="terminal"
          code={`cat .git/refs/heads/main
# 9f3c1a2e8b4d7f0192c5e6a8b3d4f5c6e7a8b9c0

ls .git/refs/heads/
# main    fix/login    feature/search`}
        />
        <P>
          One file per branch, each containing one commit hash and a newline. Forty-one bytes. That
          is the entire implementation.
        </P>
        <P>
          Everything else follows from this. Creating a branch writes forty-one bytes, so it is
          instant regardless of how big your project is. Deleting a branch deletes forty-one bytes;
          the commits it pointed at are untouched. And committing on a branch simply overwrites those
          forty-one bytes with the new commit&apos;s hash — which is what &quot;the branch moves
          forward&quot; actually means.
        </P>
        <Callout tone="note" title="This is why branching in Git is cheap and was not, elsewhere">
          Older systems implemented a branch by copying the whole tree on the server, which made
          branching a decision with a cost. Git made it free, and the entire modern workflow —
          branch per feature, branch per experiment, branch you throw away — exists because somebody
          made branching cost forty-one bytes.
        </Callout>
      </LessonSection>

      <LessonSection id="head-is-a-pointer-to-a-pointer" title="HEAD is a pointer to a pointer">
        <P>
          If a branch says which commit, <Strong>HEAD</Strong> says which branch. It is also a file,
          and it is also readable.
        </P>
        <CodeBlock
          variant="terminal"
          code={`cat .git/HEAD
# ref: refs/heads/main`}
        />
        <P>
          So there are two levels. HEAD points at a branch; the branch points at a commit. That
          indirection is what makes <Strong>git commit</Strong> work without you naming anything: Git
          reads HEAD to find the current branch, and moves that branch to the new commit.
        </P>
        <CommitGraph />
        <P>
          Step two of that sequence is the one worth staring at.{" "}
          <Strong>git switch -c feature</Strong> created a second label on the same commit and moved
          HEAD to it. No files changed. No commits were copied. The only difference between main and
          feature at that instant is which one HEAD is looking at.
        </P>
      </LessonSection>

      <LessonSection id="switching-branches-rewrites-your-working-tree" title="Switching branches rewrites your working tree">
        <P>
          Switching does change files — it has to. Moving to a branch means making your working tree
          match that branch&apos;s commit, so files appear, disappear, and change content.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git switch fix/login              # move to an existing branch
git switch -c fix/login           # create it at the current commit, and move there
git switch -                      # back to the previous branch, like cd -
git branch                        # list local branches, * marks the current one
git branch -d fix/login           # delete it — refuses if it is not merged
git branch -D fix/login           # delete it anyway`}
        />
        <P>
          Git protects you from losing work here. If you have uncommitted changes that switching
          would overwrite, it refuses and says so rather than silently discarding them.
        </P>
        <CodeBlock
          label="What that refusal looks like"
          copyable={false}
          code={`error: Your local changes to the following files would be overwritten by checkout:
        src/auth/redirect.ts
Please commit your changes or stash them before you switch branches.
Aborting`}
          lineTones={{ 0: "err", 2: "warn" }}
        />
        <LabelRows
          rows={[
            { label: "Commit", text: "If the work is coherent. It is your branch; a rough commit can be tidied up later." },
            { label: "Stash", text: "git stash push -m \"…\" if it is half-finished. Switch, do the other thing, come back, git stash pop." },
            { label: "Take it with you", text: "If the changes do not conflict with either branch, Git carries them across untouched. This is often what you actually wanted." },
          ]}
        />
        <Callout tone="tip" title="switch and restore replaced checkout in 2019">
          <span className="font-[family-name:var(--learn-font-mono)]">git checkout</span> changed
          branches AND threw away file changes AND created branches, which is how people destroyed
          work with a command they thought was navigation. Git 2.23 split it:{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">switch</span> for branches,{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">restore</span> for files.
          Checkout still works, and older documentation is full of it, but there is no reason to
          learn the ambiguous one first.
        </Callout>
      </LessonSection>

      <LessonSection id="detached-head-is-a-state-not-an-error" title="Detached HEAD is a state, not an error">
        <P>
          Check out a commit hash rather than a branch name and Git prints an alarming paragraph
          about being in &quot;detached HEAD state&quot;. Nothing is broken. HEAD is simply pointing
          straight at a commit rather than at a branch.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git switch --detach 2c7a91f
# HEAD is now at 2c7a91f Fix the redirect when next is empty

cat .git/HEAD
# 2c7a91f...        <- a hash, not "ref: refs/heads/..."`}
        />
        <P>
          This is genuinely useful: it is how you look at the project as it was, run the tests
          against an old commit, or check whether a bug existed in March. Get out by switching back
          to a branch.
        </P>
        <P>
          The one real hazard is committing while detached. Those commits are real, but no branch
          points at them, so the moment you switch away nothing refers to them and they become
          eligible for garbage collection. Git warns you clearly. If you did want to keep them:
        </P>
        <CodeBlock
          variant="terminal"
          code={`# While still detached, give the work a name
git switch -c experiment/faster-parser

# Or, if you already switched away, find it in the reflog
git reflog
git switch -c rescued 4b8e0d7`}
        />
      </LessonSection>

      <LessonSection
        id="branch-names-are-cheap-so-make-them-say-something"
        title="Branch names are cheap, so make them say something"
      >
        <P>
          Branch names show up in pull request titles, in merge commit messages, and in every
          teammate&apos;s branch list. The near-universal convention is a category, a slash, and a
          short description in hyphens.
        </P>
        <CodeBlock
          label="Names that work"
          copyable={false}
          code={`fix/login-redirect
feat/csv-export
docs/contributing-guide
refactor/extract-user-service
chore/bump-eslint
482-empty-next-param        # some teams lead with the issue number`}
        />
        <P>
          Slashes are allowed and are just part of the name, though several tools display them as
          folders, which is pleasant. Spaces are not allowed. Avoid a name that is only a number, and
          avoid one that already exists as a tag — both make Git ask you to disambiguate later.
        </P>
        <ChecklistCard
          title="Habits that make branches useful rather than administrative"
          marker="arrow"
          items={[
            "One branch, one purpose. A branch that fixes a bug and adds a feature cannot be reviewed or reverted cleanly.",
            "Branch from an up-to-date main. Starting from a two-week-old main means merging two weeks of divergence later.",
            "Keep them short-lived. Days, not weeks. The longer a branch lives, the more it costs to merge.",
            "Delete after merging. git branch -d refuses if it is unmerged, which makes it a safe habit rather than a risky one.",
            "Push early, even when unfinished. A branch only on your laptop is not backed up and is invisible to everybody.",
          ]}
        />
        <Callout tone="note" title="git branch -d is a safety check worth using">
          The lowercase{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">-d</span> refuses to delete a
          branch whose commits are not reachable from anywhere else — it is Git telling you that you
          are about to orphan work. The uppercase{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">-D</span> ignores that. Use{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">-d</span> by default and let it
          object.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A branch is a file in .git/refs/heads containing one commit hash. Forty-one bytes.",
          "Creating a branch copies nothing, so it is instant on a project of any size.",
          "HEAD is a file naming the current branch; the branch names the current commit. Committing moves the branch, and HEAD follows.",
          "Switching branches rewrites your working tree to match that branch's commit.",
          "Git refuses to switch if it would overwrite uncommitted changes. Commit, stash, or note that it often carries them across.",
          "Use switch for branches and restore for files; checkout does both jobs and that ambiguity destroyed work.",
          "Detached HEAD means HEAD points at a commit rather than a branch. It is useful, and commits made there need a branch to survive.",
          "Name branches category/short-description. They appear in pull requests and merge commits.",
          "One branch one purpose, branched from an up-to-date main, short-lived, pushed early, deleted after merge.",
        ]}
      />
    </div>
  );
}
