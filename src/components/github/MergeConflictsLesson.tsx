import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { ConflictResolver } from "@/components/github/ConflictResolver";

export function MergeConflictsLesson() {
  return (
    <div>
      <Lead>
        A conflict is not an error and not a failure — it is Git declining to guess which of two
        edits to the same lines you meant. Resolve one by hand, marker by marker, and see why the
        answer is sometimes neither side.
      </Lead>

      <LessonSection
        id="a-conflict-means-two-commits-changed-the-same-lines"
        title="A conflict means two commits changed the same lines"
      >
        <P>
          Git merges most things without asking. Two people editing different files, different
          functions, or even different parts of the same function merge silently and correctly.
        </P>
        <P>
          A conflict happens in one narrow situation: <Strong>both sides changed the same lines
          since the merge base</Strong>, and Git has no basis for preferring one. Rather than pick,
          it stops and hands the decision to you.
        </P>
        <CodeBlock
          label="What Git prints"
          copyable={false}
          code={`Auto-merging src/config.ts
CONFLICT (content): Merge conflict in src/config.ts
Automatic merge failed; fix conflicts and then commit the result.`}
          lineTones={{ 0: "ok", 1: "err", 2: "warn" }}
        />
        <P>
          Notice the first line. Files that merged cleanly are still merged — the merge is partly
          done. You are in a paused merge, and <Strong>git status</Strong> will now tell you exactly
          what is left.
        </P>
        <CodeBlock
          label="git status, mid-conflict"
          copyable={false}
          code={`You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
        modified:   src/routes.ts

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/config.ts`}
          lineTones={{ 0: "warn", 8: "err" }}
        />
        <Callout tone="note" title="Conflicts are proportional to overlap, not to team size">
          Twenty people working on twenty different files never conflict. Two people editing the same
          fifty-line file every day conflict constantly. If your team conflicts a lot, that is
          information about how the code is organised, not about Git.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-markers-are-a-literal-edit-of-your-file"
        title="The markers are a literal edit of your file"
      >
        <P>
          This is the part that startles people. Git does not show you conflicts in a special
          interface — <Strong>it writes them into the file on disk</Strong>. Open it in any editor
          and the markers are really there, as text.
        </P>
        <ConflictResolver />
        <LabelRows
          rows={[
            {
              label: "<<<<<<<",
              text: "Start of the conflict. Everything until the divider is the version from the branch you are standing on — labelled HEAD.",
            },
            {
              label: "=======",
              text: "The divider. It is not a change; it is the boundary between the two versions.",
            },
            {
              label: ">>>>>>>",
              text: "End of the conflict, labelled with the branch or commit being merged in.",
            },
          ]}
        />
        <Callout tone="warning" title="Committing the markers is a real and common accident">
          They are just text, so nothing stops you staging and committing a file that still contains{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>.
          The code will not run, and the diff on the pull request looks bizarre. Before committing a
          merge, search the whole repository:{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            git diff --check
          </span>{" "}
          flags leftover markers, and{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">
            grep -rn &quot;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&quot; .
          </span>{" "}
          catches the rest.
        </Callout>
      </LessonSection>

      <LessonSection
        id="resolving-means-producing-the-file-you-want"
        title="Resolving means producing the file you want"
      >
        <P>
          Git does not check your answer. It checks only that you claimed to have one, and you make
          that claim with <Strong>git add</Strong>.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Open every file git status lists as unmerged",
              detail: "There may be several, and each may have several conflicted regions. Work through them one at a time.",
            },
            {
              label: "Edit the file until it is the code you want",
              detail: "Delete all three markers. Keep one side, the other, both, or write something new — whatever is actually correct.",
            },
            {
              label: "git add the file",
              detail: "This is how you tell Git the conflict is resolved. Nothing is verified; adding IS the claim.",
            },
            {
              label: "Run the tests before committing",
              detail: "A resolved merge is new code that has never existed anywhere. It compiled on both branches and may not compile now.",
            },
            {
              label: "git commit",
              detail: "With no -m, Git offers a pre-written merge message listing the conflicted files. Accepting it is fine.",
            },
          ]}
        />
        <P>
          If you know one side is simply correct — a lockfile, a generated file, something you know
          was regenerated — you can say so without editing:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git checkout --ours package-lock.json     # the branch you are standing on
git checkout --theirs package-lock.json   # the branch being merged in
git add package-lock.json`}
        />
        <Callout tone="danger" title="ours and theirs invert during a rebase">
          In a merge, &quot;ours&quot; is the branch you are on. In a rebase, Git is replaying{" "}
          <em>your</em> commits on top of the other branch, so &quot;ours&quot; is the branch you are
          rebasing onto and &quot;theirs&quot; is your own work. This is not a quirk to memorise so
          much as a reason to read the actual content rather than trusting the label.
        </Callout>
      </LessonSection>

      <LessonSection id="abort-is-always-available-and-always-safe" title="Abort is always available and always safe">
        <P>
          Nothing about a conflicted merge is permanent until you commit. If the conflict turns out
          to be larger than you thought, or you started the merge in the wrong direction, or you just
          want to look at something first — back out completely.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git merge --abort         # a conflicted merge
git rebase --abort        # a conflicted rebase
git cherry-pick --abort   # a conflicted cherry-pick`}
        />
        <P>
          Every one of these restores the state from immediately before the command. No commits are
          lost, no edits made before the merge are lost, and there is no cleanup to do.
        </P>
        <P>
          Knowing that is what makes conflicts stop being frightening. The worst realistic outcome of
          attempting a merge is that you type six more words and are exactly where you started.
        </P>
        <Callout tone="tip" title="A three-pane view is worth setting up">
          <span className="font-[family-name:var(--learn-font-mono)]">git mergetool</span> opens a
          configured merge tool, and VS Code has a built-in one that shows yours, theirs, and the
          merge base side by side. Seeing the base is a genuine advantage — it often makes obvious
          which side is the change and which side is the original.
        </Callout>
      </LessonSection>

      <LessonSection id="most-conflicts-are-prevented-not-resolved" title="Most conflicts are prevented, not resolved">
        <P>
          Conflicts scale with how long a branch has been away and how much of the file it touches.
          Both of those are things you control.
        </P>
        <ChecklistCard
          title="What actually reduces conflicts"
          marker="arrow"
          items={[
            "Merge main into your branch regularly rather than once at the end. Five small conflicts across a week beat one enormous one on Friday.",
            "Keep branches short-lived. A two-day branch rarely conflicts; a three-week branch reliably does.",
            "Do reformatting in its own commit, on its own, merged immediately. A formatting change mixed into a feature conflicts with everything.",
            "Agree a formatter and commit its config. Half of all conflicts in some codebases are two editors disagreeing about indentation.",
            "Split files that everybody edits. A single 2,000-line routes file is a conflict generator; the fix is architectural.",
          ]}
        />
        <Callout tone="success" title="rerere remembers how you resolved something last time">
          <span className="font-[family-name:var(--learn-font-mono)]">
            git config --global rerere.enabled true
          </span>{" "}
          switches on &quot;reuse recorded resolution&quot;. Git records how you resolved each
          conflict and replays that resolution automatically when it sees the same one again — which
          happens constantly if you rebase a long-lived branch repeatedly. It is off by default and
          almost everybody who turns it on keeps it on.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A conflict means both sides changed the same lines since the merge base. Everything else merges silently.",
          "Files that merged cleanly are already staged; only the conflicted ones are waiting for you.",
          "The markers are real text written into your file. Any editor will show them.",
          "Between <<<<<<< and ======= is your side; between ======= and >>>>>>> is theirs.",
          "Committing leftover markers is easy and common — git diff --check flags them.",
          "Resolving means editing the file until it is right, then git add. Git verifies nothing.",
          "The answer is often neither side: two correct changes need code that satisfies both.",
          "ours and theirs swap meaning during a rebase, so read the content rather than trusting the label.",
          "git merge --abort restores everything from before the merge. Attempting a merge risks nothing.",
          "Prevent conflicts with short branches, frequent merges from main, separate formatting commits, and rerere.",
        ]}
      />
    </div>
  );
}
