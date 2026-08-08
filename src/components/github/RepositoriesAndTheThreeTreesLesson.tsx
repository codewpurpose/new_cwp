import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ThreeTrees } from "@/components/github/ThreeTrees";

export function RepositoriesAndTheThreeTreesLesson() {
  return (
    <div>
      <Lead>
        The staging area is the one part of Git nobody explains, and it is the reason git add exists
        as a separate step from git commit. Move one file through all three places and watch which
        commands touch which.
      </Lead>

      <LessonSection
        id="git-init-creates-one-hidden-directory"
        title="git init creates one hidden directory"
      >
        <P>
          Turning a folder into a repository is one command, and it adds exactly one thing.
        </P>
        <CodeBlock
          variant="terminal"
          code={`cd my-project
git init
# Initialized empty Git repository in /Users/you/my-project/.git/`}
        />
        <P>
          That <Strong>.git</Strong> directory is the repository. Your files are not &quot;in
          Git&quot; — they are in the folder, exactly where they were, and .git sits alongside them
          holding every commit, every branch, and all the configuration.
        </P>
        <CodeBlock
          label="Inside .git"
          copyable={false}
          code={`.git/
  HEAD          # which branch you are on, as one line of text
  config        # this repository's settings
  objects/      # every commit, every version of every file
  refs/heads/   # one file per branch, each holding a commit hash
  index         # the staging area — a single binary file`}
        />
        <Callout tone="warning" title="Deleting .git deletes the history, not the code">
          Your files survive; every commit does not. There is no undo and no server copy unless you
          pushed. Conversely, copying a folder without its .git gives somebody the code with none of
          the history — which is occasionally exactly what you want.
        </Callout>
      </LessonSection>

      <LessonSection
        id="a-file-exists-in-three-places-at-once"
        title="A file exists in three places at once"
      >
        <P>
          This is the model that makes every later command make sense. At any moment, one file has
          up to three different versions on your machine simultaneously.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Working tree",
              tone: "neutral",
              children: <P>The actual file on disk, as your editor sees it. Git never changes this unless you ask it to.</P>,
            },
            {
              title: "Index (staging area)",
              tone: "neutral",
              children: <P>What your next commit will contain. A draft. Changed by git add, and by nothing else you do in an editor.</P>,
            },
            {
              title: "HEAD (the repository)",
              tone: "positive",
              children: <P>The version in the last commit on your current branch. Frozen, hashed, and effectively permanent.</P>,
            },
          ]}
        />
        <P>
          Edit a file and the working tree differs from the index. Run{" "}
          <Strong>git add</Strong> and the index catches up. Run <Strong>git commit</Strong> and the
          repository catches up. All three are now identical, and git status says nothing to report.
        </P>
        <ThreeTrees />
      </LessonSection>

      <LessonSection
        id="the-staging-area-is-a-draft-of-your-next-commit"
        title="The staging area is a draft of your next commit"
      >
        <P>
          Nearly every other version control system commits whatever is on disk. Git makes you name
          the changes first, and beginners reasonably experience this as an extra step for no reason.
          It buys one specific thing: the ability to commit <em>some</em> of your current work.
        </P>
        <P>
          A real afternoon does not produce one clean change. You fix the bug you sat down to fix,
          rename a confusing variable you tripped over, and delete some dead code. Three unrelated
          things, in four files. Without staging you have one choice: one commit called
          &quot;stuff&quot;.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Commit the bug fix on its own
git add src/auth/redirect.ts
git commit -m "Fix the redirect when next is empty"

# Then the rename, separately
git add src/lib/users.ts src/lib/session.ts
git commit -m "Rename usr to currentUser for readability"

# And the deletion last
git add src/legacy/
git commit -m "Delete the unused legacy exporter"`}
        />
        <P>
          Three commits that each do one thing, from one messy working tree. Six months later, when
          somebody bisects a bug to the rename commit, they can revert it without also reverting the
          bug fix. That is what the staging area is for.
        </P>
        <Callout tone="note" title="git commit -a skips it, and that is fine sometimes">
          <span className="font-[family-name:var(--learn-font-mono)]">git commit -am &quot;…&quot;</span>{" "}
          stages every tracked file and commits in one step. On a solo project where you genuinely
          did one thing, it is not a sin. Reach for it as a shortcut you chose, not as the only
          command you know — and note that it ignores brand-new files entirely, which surprises
          people regularly.
        </Callout>
      </LessonSection>

      <LessonSection
        id="git-status-is-the-instrument-you-never-stop-reading"
        title="git status is the instrument you never stop reading"
      >
        <P>
          Run it constantly. It is free, it changes nothing, and it tells you the state of all three
          trees in one screen. Experienced people run it more often than beginners, not less.
        </P>
        <CodeBlock
          label="git status"
          copyable={false}
          code={`On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/auth/redirect.ts

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/lib/users.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notes.md`}
          lineTones={{ 3: "ok", 6: "ok", 8: "warn", 12: "warn", 14: "dim" }}
        />
        <LabelRows
          rows={[
            {
              label: "Staged",
              text: "Under \"Changes to be committed\". These go into the next commit. redirect.ts is here.",
            },
            {
              label: "Modified",
              text: "Under \"Changes not staged\". Git knows this file and has seen it change, but the change is not in the next commit yet.",
            },
            {
              label: "Untracked",
              text: "Git has never seen this file and is not watching it. It will not be committed, ever, until you git add it once.",
            },
          ]}
        />
        <P>
          Untracked is the category that catches people. A brand-new file is invisible to{" "}
          <Strong>git commit -a</Strong> and absent from every diff. The number of times a new file
          has been left out of a commit and broken the build for everybody else is not small.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Same information, one line per file, once you know the letters
git status --short
#  M src/auth/redirect.ts     staged modification
#   M src/lib/users.ts        modified, not staged
# ?? notes.md                 untracked`}
        />
      </LessonSection>

      <LessonSection
        id="a-commit-freezes-the-index-not-the-folder"
        title="A commit freezes the index, not the folder"
      >
        <P>
          This sentence is the whole chapter and it is worth reading twice.{" "}
          <Strong>git commit records the index, not your working tree.</Strong>
        </P>
        <P>
          So if you stage a file, then keep editing it, and then commit — the commit contains the
          version as it was when you staged it. Your newer edit is still sitting in the working tree,
          uncommitted. Git will tell you this, in the status output, in a section you have to
          actually read.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git add report.md          # index now matches disk
# ... you keep typing ...
git status --short
#  M report.md               staged: the version from the git add
#   M report.md              not staged: everything you typed since`}
        />
        <P>
          The same file appears twice, because there genuinely are two different versions of it. The
          fix is to <Strong>git add</Strong> again before committing. This is not a bug and it is not
          a trap — it is exactly the behaviour that makes staging useful — but it is the single most
          common source of &quot;I committed it and the change is not there&quot;.
        </P>
        <Callout tone="tip" title="Read the diff you are about to commit">
          <span className="font-[family-name:var(--learn-font-mono)]">git diff --staged</span> shows
          precisely what the next commit will contain, and nothing else. Making this a habit before
          every commit catches the half-staged file, the stray debug print, and the accidentally
          pasted password — in that order of frequency.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "git init adds one .git directory. Your files do not move; the repository sits next to them.",
          "Deleting .git deletes every commit and keeps every file. There is no undo.",
          "A file exists in three places at once: the working tree on disk, the index, and the last commit.",
          "git add copies working tree to index. git commit copies index to repository.",
          "The staging area exists so you can commit part of a messy afternoon as several clean commits.",
          "git status names all three states: staged, modified-but-not-staged, and untracked.",
          "Untracked files are invisible to git commit -a, which is how new files get left out of commits.",
          "A commit freezes the index, not the folder — so editing after staging leaves the newer version behind.",
          "git diff --staged shows exactly what you are about to commit. Read it every time.",
        ]}
      />
    </div>
  );
}
