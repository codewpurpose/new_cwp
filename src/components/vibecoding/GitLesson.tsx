import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function GitLesson() {
  return (
    <div>
      <Lead>
        Git has been the safety net under every chapter so far. Now use it properly: branches
        that make experiments free, and pull requests that give you a place to review AI output
        before it becomes permanent.
      </Lead>

      <LessonSection id="the-four-commands" title="The four commands you will actually use">
        <P>
          Git has hundreds of commands. Day to day you need four, plus one for emergencies.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git status                    # what has changed
git add .                     # stage everything
git commit -m "message"       # save a snapshot
git push                      # send it to GitHub`}
        />
        <P>And the one that makes the rest safe:</P>
        <CodeBlock
          variant="terminal"
          label="The undo"
          code={`git restore .                 # throw away uncommitted changes`}
        />
        <Callout tone="warning" title="Read that one carefully">
          <InlineCode>git restore .</InlineCode> permanently discards work you have not
          committed. That is exactly what you want after a bad AI run — and exactly what you do
          not want if the last hour of your own work is uncommitted. Commit often and it is
          always the former.
        </Callout>
      </LessonSection>

      <LessonSection id="branches" title="Branches make experiments free">
        <P>
          A branch is a parallel copy of your project. Work on it, and{" "}
          <InlineCode>main</InlineCode> stays exactly as it was until you decide otherwise.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git switch -c add-dark-mode     # create and move to a branch
# ... prompt, review, commit ...
git switch main                 # back to safety
git branch -D add-dark-mode     # delete the experiment`}
        />
        <P>
          This changes how you can work with an AI. A large or speculative request stops being
          risky, because the worst case is deleting a branch. You can let an agent attempt
          something ambitious knowing that rejecting all of it costs one command.
        </P>
      </LessonSection>

      <LessonSection id="review-the-diff-before-you-stage" title="Read the diff before you stage it">
        <P>
          <InlineCode>git add .</InlineCode> stages everything indiscriminately, including
          whatever the AI touched that you never asked about. That habit is forgivable for code
          you wrote yourself and already know. It is a bad one to inherit for a diff you have
          not read end to end.
        </P>
        <P>
          <InlineCode>git diff</InlineCode> shows every change before anything is staged. Read
          all of it, not just the file you expected — models edit configuration, delete
          comments, or quietly &ldquo;fix&rdquo; something you never mentioned, more often than a
          human collaborator would.
        </P>
        <CodeBlock
          variant="terminal"
          label="Terminal"
          code={`git diff                      # everything unstaged, file by file
git add -p                    # stage hunk by hunk, skip what you don't want
git diff --staged             # confirm exactly what's about to be committed`}
        />
        <Callout tone="tip" title="git add -p is the actual review tool">
          Stepping through hunk by hunk forces a decision on each change instead of one verdict
          on the whole diff. It is how you catch the single out-of-scope edit sitting inside
          nine good ones.
        </Callout>
      </LessonSection>

      <LessonSection id="commit-messages" title="Commit messages are notes to your future self">
        <P>
          You will read these when something breaks and you are trying to find where it came
          from. Write what changed and why — not what files were touched, which git already
          knows.
        </P>
        <StepList
          steps={[
            { label: "Weak", detail: "“updates”, “fix”, “wip”, “changes from AI”" },
            { label: "Useful", detail: "“Fix double-counted discount when two coupons apply”" },
          ]}
        />
        <P>
          You can hand this off, and the result is usually better than what people write by
          hand:
        </P>
        <CodeBlock
          variant="prompt"
          label="Prompt"
          code={`Look at my staged changes and write a commit message.
One short summary line, then a blank line, then a couple of
lines on why the change was needed.`}
        />
      </LessonSection>

      <LessonSection id="pull-requests" title="Pull requests: a place to actually review">
        <P>
          A pull request proposes merging your branch into main. Even working alone it is worth
          it, because GitHub shows you the complete diff in a readable view — which is a far
          better review surface than an editor as changes stream past.
        </P>
        <StepList
          variant="timeline"
          steps={[
            { label: "Push your branch", detail: "git push -u origin add-dark-mode" },
            { label: "Open the PR", detail: "GitHub prompts you, or use gh pr create." },
            { label: "Read the whole diff", detail: "This is the review. Look for things you did not ask for as much as for bugs." },
            { label: "Merge, then delete the branch", detail: "GitHub offers both in one click." },
          ]}
        />
        <Callout tone="success" title="The habit worth forming">
          Read the diff on GitHub rather than in your editor. Different surroundings make you
          read differently — plenty of people catch things in a PR view that they scrolled past
          an hour earlier while accepting the change.
        </Callout>
      </LessonSection>

      <LessonSection id="when-it-goes-wrong" title="When it goes wrong">
        <StepList
          steps={[
            { label: "Committed something you should not have", detail: "git reset --soft HEAD~1 undoes the commit and keeps the changes staged." },
            { label: "An AI change already merged to main turns out to be wrong", detail: "git revert <sha> undoes it with a new commit, instead of rewriting history that others may have already pulled — the right tool once a change is shared." },
            { label: "Committed a secret", detail: "Rotate the key. It is in the history now, and removing it from the current files does not remove it from the repo." },
            { label: "Branch is a mess", detail: "Switch back to main and delete it. That is what branches are for." },
            { label: "Merge conflict", detail: "Paste both versions and the conflict markers to the AI with context on what each side was doing — this is one of the things it is good at." },
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Four commands cover daily work: status, add, commit, push.",
          "git restore . is the undo that makes accepting AI changes safe — as long as you commit often.",
          "Read the diff, ideally hunk by hunk with git add -p, before you stage a change you did not write yourself.",
          "Branches make ambitious requests free, because rejecting everything costs one command.",
          "Write commit messages about why, not which files. Or have them written from the diff.",
          "Review the diff on GitHub, not in your editor. You will catch different things.",
          "Once a change is merged and shared, revert it forward — don't rewrite history other people already pulled.",
          "A committed secret must be rotated. Deleting the line does not remove it from history.",
        ]}
      />
    </div>
  );
}
