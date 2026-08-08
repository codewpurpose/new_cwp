import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function StagingAndCommittingLesson() {
  return (
    <div>
      <Lead>
        git commit -am is fast and it is why so many histories are useless six months later. Stage
        deliberately, split one messy file into two honest commits, and write the message the way the
        people reading git log need it.
      </Lead>

      <LessonSection id="git-add-is-a-choice-not-a-formality" title="git add is a choice, not a formality">
        <P>
          There are four ways to stage, and they are not interchangeable.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git add src/auth/redirect.ts    # one file
git add src/auth/               # a directory and everything under it
git add .                       # everything under the current directory
git add -A                      # everything in the repository, wherever you are standing`}
        />
        <P>
          <Strong>git add .</Strong> is the one everybody types and the one worth being slightly
          suspicious of. It stages every changed and every new file below you, including the ones you
          forgot about: the scratch file, the screenshot, the .env you created while debugging.
        </P>
        <Callout tone="warning" title="git add . is how secrets get committed">
          Almost every leaked credential on GitHub arrived by way of{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git add .</span> catching a
          file the author had forgotten existed. Running{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git status</span> first takes
          two seconds and shows you the list before it becomes permanent.
        </Callout>
        <P>
          Staging can also be undone freely. Nothing about <Strong>git add</Strong> is committal —
          it is a draft, and changing your mind costs nothing.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git restore --staged notes.md    # unstage one file, keeping the edit
git restore --staged .           # unstage everything, keeping every edit`}
        />
      </LessonSection>

      <LessonSection id="add-patch-stages-part-of-a-file" title="add --patch stages part of a file">
        <P>
          This is the command that turns staging from a formality into a tool, and most people go
          years without meeting it.
        </P>
        <CodeBlock variant="terminal" code={`git add -p`} />
        <P>
          Git walks you through your changes one <Strong>hunk</Strong> at a time — a hunk being a
          contiguous run of changed lines — and asks what to do with each. You answer with a single
          key.
        </P>
        <CodeBlock
          label="git add -p"
          copyable={false}
          code={`@@ -12,6 +12,9 @@ export async function loadUser(id) {
   const res = await fetch(\`/api/users/\${id}\`);
+  if (!res.ok) throw new Error("loadUser failed");
   return res.json();
 }
+
+console.log("DEBUG: got here");

(1/1) Stage this hunk [y,n,q,a,d,s,e,?]?`}
          lineTones={{ 2: "ok", 5: "warn", 6: "warn", 8: "accent" }}
        />
        <CompareGrid
          columns={3}
          items={[
            { title: "y / n", tone: "neutral", children: <P>Stage this hunk, or do not. The two you will use ninety per cent of the time.</P> },
            { title: "s", tone: "positive", children: <P>Split this hunk into smaller ones. This is how you separate the fix from the debug line above.</P> },
            { title: "e", tone: "neutral", children: <P>Edit the hunk by hand, line by line, when even a split will not separate them.</P> },
          ]}
        />
        <P>
          Press <Strong>s</Strong> on that hunk and Git offers the error check and the console.log
          separately. Stage the first, skip the second, and you have committed the fix without the
          debug statement — while the debug statement is still in your working tree, still useful,
          still there when you need it.
        </P>
      </LessonSection>

      <LessonSection
        id="a-message-has-a-subject-and-usually-a-body"
        title="A message has a subject and, usually, a body"
      >
        <P>
          A commit message has a shape, and it is not arbitrary. Git, GitHub, and every tool built on
          top of them treat the first line specially.
        </P>
        <CodeBlock
          label="The shape"
          copyable={false}
          code={`Fix the redirect when the next param is empty
<-- blank line, and it is load-bearing -->
Arriving from /pricing set next="" rather than omitting it,
so the guard treated it as a valid destination and sent
everyone to the dashboard instead of back to the page they
came from.

Checks for a non-empty string rather than a defined one.

Fixes #482`}
        />
        <P>
          The first line is the <Strong>subject</Strong>. It shows up in git log --oneline, in the
          GitHub commits list, in blame annotations, in bisect output, and in the sidebar of every
          code review tool ever made. Keep it under about fifty characters so it is not truncated.
        </P>
        <P>
          The blank line is not decoration. Git uses it to tell subject from body; without it the
          entire message is treated as one long subject and every tool that shows a summary shows the
          whole paragraph.
        </P>
        <P>
          The <Strong>body</Strong> explains why. The diff already shows what changed — nobody needs
          a prose translation of it. What the diff cannot show is the reasoning, the alternative you
          rejected, and the thing that will look wrong to whoever reads it next.
        </P>
        <RevealCard
          summaryTag="A real commit message"
          summary="Update the user service"
          detailTag="What it should have said"
          detail="Cache the user lookup for 60 seconds. The dashboard was calling loadUser four times per render because three separate components each needed the display name. Caching in the service was chosen over lifting state so the components stay independent."
          footnote="Same commit, same diff. One of them answers the question somebody will ask in March."
          openLabel="See the version that helps"
          closeLabel="Hide it"
        />
      </LessonSection>

      <LessonSection
        id="the-imperative-mood-is-a-convention-with-a-reason"
        title="The imperative mood is a convention with a reason"
      >
        <P>
          Write <Strong>&quot;Fix the redirect&quot;</Strong>, not &quot;Fixed the redirect&quot; or
          &quot;Fixes the redirect&quot; or &quot;Fixing the redirect&quot;.
        </P>
        <P>
          This looks like arbitrary pedantry and it is not. Git itself writes messages in the
          imperative when it generates them — &quot;Merge branch feature into main&quot;, &quot;Revert
          Add the caching layer&quot;. Your messages sit in the same list, and matching the mood makes
          the log read as one document rather than a pile of styles.
        </P>
        <P>
          The test that makes it stick: a commit message completes the sentence{" "}
          <em>&quot;If applied, this commit will…&quot;</em>. If applied, this commit will{" "}
          <Strong>fix the redirect</Strong>. If applied, this commit will{" "}
          <em>fixed the redirect</em> — which is not a sentence.
        </P>
        <CompareGrid
          items={[
            {
              title: "Reads well in a log",
              tone: "positive",
              children: (
                <P>
                  Add rate limiting to the search endpoint
                  <br />
                  Remove the deprecated export helper
                  <br />
                  Fix off-by-one in the pagination footer
                </P>
              ),
            },
            {
              title: "Costs the reader something",
              tone: "caution",
              children: (
                <P>
                  updates
                  <br />
                  fixed bug
                  <br />
                  asdf
                  <br />
                  final commit (please work)
                </P>
              ),
            },
          ]}
        />
        <Callout tone="note" title="Conventional Commits, if your project uses it">
          Some projects require a machine-readable prefix:{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">feat:</span>,{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">fix:</span>,{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">docs:</span>,{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">chore:</span>. It exists so
          tooling can generate changelogs and work out version numbers automatically. Follow it where
          it is the local convention; do not impose it on a project that has not chosen it.
        </Callout>
      </LessonSection>

      <LessonSection
        id="one-commit-should-do-exactly-one-thing"
        title="One commit should do exactly one thing"
      >
        <P>
          Everything above is in service of this. A commit that does one thing can be described in
          one line, reviewed on its own, reverted without collateral damage, and found by bisect. A
          commit that does four things can do none of those.
        </P>
        <ChecklistCard
          title="The test for whether a commit is one thing"
          marker="arrow"
          items={[
            "Can you describe it in one line without using the word \"and\"? If not, it is at least two commits.",
            "Would reverting it undo exactly one decision? If reverting the rename also reverts a bug fix, they should not have been together.",
            "Does the project still build and pass its tests at this commit? Bisect depends on this being true of every commit, not just the last one.",
            "Would a reviewer looking at only this diff have everything they need to judge it?",
          ]}
        />
        <P>
          The corresponding failure is the opposite extreme — twenty commits called &quot;wip&quot;,
          &quot;wip 2&quot;, &quot;fix lint&quot;. That is a normal way to work and a bad thing to
          merge, and there are two good answers to it. Tidy them up before opening the pull request
          with an interactive rebase, which is a later chapter. Or let GitHub squash them on merge,
          which is also a later chapter. Both are fine; committing rarely while you work is not the
          fix.
        </P>
        <Callout tone="tip" title="Commit more often than feels natural">
          A commit is local, free, and reversible. There is no cost to committing every twenty
          minutes and every reason to: the reflog can only recover work that was committed at least
          once. Tidy the history later — but you cannot tidy what you never recorded.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "git add . stages everything below you, including files you forgot about. Run git status first.",
          "Staging is reversible with git restore --staged, so nothing about git add is a commitment.",
          "git add -p stages one hunk at a time, and s splits a hunk further — this is how the fix gets committed without the debug line.",
          "A message is a subject line under fifty characters, a blank line, and a body explaining why.",
          "The blank line is load-bearing: without it every tool shows your whole paragraph as the summary.",
          "The diff shows what changed. The body should carry the reasoning the diff cannot.",
          "Use the imperative: \"If applied, this commit will fix the redirect.\" It matches the messages Git writes itself.",
          "One commit, one thing — testable by whether you can describe it without the word \"and\".",
          "Commit often while working and tidy the history afterwards. The reflog can only save what was committed.",
        ]}
      />
    </div>
  );
}
