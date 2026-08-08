import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";
import { ReviewThread } from "@/components/github/ReviewThread";

export function ReviewingAPullRequestLesson() {
  return (
    <div>
      <Lead>
        A review is a batch, not a stream of notifications, and the three buttons at the end of one
        are a promise about what happens next. Leave a line comment, turn it into a commit the author
        can accept, and learn what resolving a thread claims.
      </Lead>

      <LessonSection
        id="a-review-is-a-batch-not-one-comment-at-a-time"
        title="A review is a batch, not one comment at a time"
      >
        <P>
          On the Files changed tab, hovering over a line shows a blue plus. Click it and you get a
          comment box with two buttons, and the difference between them is the most useful thing in
          this chapter.
        </P>
        <CompareGrid
          items={[
            {
              title: "Add single comment",
              tone: "caution",
              children: (
                <P>
                  Posts immediately. The author gets a notification now. Do this eleven times and you
                  have sent eleven notifications, and the author starts fixing the first one before
                  you have found the real problem on line 340.
                </P>
              ),
            },
            {
              title: "Start a review",
              tone: "positive",
              children: (
                <P>
                  Holds the comment as pending — only you can see it. Keep adding, revise, delete the
                  ones that answered themselves, then submit the whole set at once as one
                  notification with a verdict attached.
                </P>
              ),
            },
          ]}
        />
        <P>
          Almost always use the second. It is better for the author, who gets a coherent set of
          feedback rather than a drip. It is also better for you: half the comments you write early
          in a review turn out to be answered further down, and a pending review lets you quietly
          delete them instead of posting a correction.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh pr review 483 --comment --body "Looks good, two small things inline"
gh pr review 483 --approve
gh pr review 483 --request-changes --body "The export still drops newlines"

# Read it locally, which is often faster than the web diff
gh pr checkout 483
git diff main...HEAD`}
        />
        <Callout tone="tip" title="Check the pull request out and run it">
          <span className="font-[family-name:var(--learn-font-mono)]">gh pr checkout 483</span>{" "}
          fetches the branch — including from a fork — and switches to it. For anything non-trivial,
          five minutes actually running the code finds things no amount of reading the diff will.
        </Callout>
      </LessonSection>

      <LessonSection
        id="approve-comment-and-request-changes-mean-three-things"
        title="Approve, comment, and request changes mean three things"
      >
        <P>
          Submitting a review makes you pick one of three, and they are not interchangeable — they
          have mechanical consequences, not just tone.
        </P>
        <LabelRows
          rows={[
            {
              label: "Approve",
              text: "\"This can merge.\" Counts towards a required approval. Say it even with minor comments attached — trusting somebody to fix a nit without re-reviewing is normal and keeps things moving.",
            },
            {
              label: "Comment",
              text: "Feedback with no verdict. Neither unblocks nor blocks. Right for a question, for a partial review, or for a repository you do not own.",
            },
            {
              label: "Request changes",
              text: "\"Do not merge yet.\" On a protected branch this is a hard block that only you can lift — pushing a fix does not clear it. Use it when something is genuinely wrong, not for a preference.",
            },
          ]}
        />
        <Callout tone="warning" title="Request changes and then go on holiday">
          This is the failure mode worth naming. Because only the reviewer who requested changes can
          dismiss them, an absent reviewer blocks a pull request completely. An administrator can
          dismiss the review, which is a slightly awkward thing to ask for. If your objection is
          &quot;I would have named this differently&quot;, approve and say so.
        </Callout>
        <P>
          The other half of the etiquette is how a comment reads. The same technical point can be a
          collaboration or a verdict, and the difference is mostly grammar.
        </P>
        <CompareGrid
          items={[
            {
              title: "Lands well",
              tone: "positive",
              children: (
                <P>
                  &quot;What happens here if items is empty?&quot;
                  <br />
                  &quot;Could we pull this into a helper? It is the third copy.&quot;
                  <br />
                  &quot;nit: spelling. Not blocking.&quot;
                  <br />
                  &quot;I did not know about this API — nice.&quot;
                </P>
              ),
            },
            {
              title: "Costs you something",
              tone: "caution",
              children: (
                <P>
                  &quot;This is wrong.&quot;
                  <br />
                  &quot;Why would you do it this way?&quot;
                  <br />
                  &quot;Obviously this should be a map.&quot;
                  <br />
                  &quot;Did you even test this?&quot;
                </P>
              ),
            },
          ]}
        />
        <P>
          Two conventions worth adopting because they carry real information.{" "}
          <Strong>nit:</Strong> marks a comment as non-blocking taste, so the author knows they may
          ignore it. And praising something specific is not politeness — it tells the author which
          decisions to repeat, which is the half of review that never gets written down.
        </P>
      </LessonSection>

      <LessonSection
        id="a-suggested-change-is-a-commit-in-one-click"
        title="A suggested change is a commit in one click"
      >
        <P>
          Instead of describing an edit, write it. A fenced block tagged{" "}
          <Strong>suggestion</Strong> in a line comment renders as a proposed diff with a button.
        </P>
        <CodeBlock
          label="What you type in the comment box"
          code={`\`\`\`suggestion
  if (!res.ok) throw new Error(\`loadUser \${id}: \${res.status}\`);
\`\`\``}
        />
        <ReviewThread />
        <P>
          Press the button and it becomes a real commit on the branch, authored by the pull request
          author with you recorded as co-author. Checks re-run. The thread becomes resolvable.
        </P>
        <StepList
          steps={[
            {
              label: "Multi-line suggestions work",
              detail: "Click the line number and drag to select a range before commenting, and the suggestion replaces the whole range.",
            },
            {
              label: "Batch them",
              detail: "\"Add suggestion to batch\" collects several and commits them all as one commit, rather than one commit per typo.",
            },
            {
              label: "The indentation is literal",
              detail: "Whatever whitespace you type is what lands in the file. A suggestion that drops two spaces of indentation breaks the code.",
            },
          ]}
        />
        <Callout tone="note" title="Suggestions are for small, certain changes">
          A typo, a missing null check, a clearer variable name. If the fix needs judgement or is
          more than a few lines, describing the problem is better — the author understands the
          context and may have a reason you cannot see from the diff.
        </Callout>
      </LessonSection>

      <LessonSection
        id="resolving-a-conversation-is-a-claim-so-make-it-true"
        title="Resolving a conversation is a claim, so make it true"
      >
        <P>
          Every comment thread on the diff has a <Strong>Resolve conversation</Strong> button, which
          collapses it and marks it handled. It is the mechanism a long review uses to stay readable —
          twenty threads collapse to the three still open.
        </P>
        <P>
          It is also a claim, and the etiquette around who presses it is a genuine source of friction.
        </P>
        <LabelRows
          rows={[
            { label: "Author", text: "Resolve after making the change, ideally replying with the commit that did it. Resolving without addressing it hides the comment, and reviewers notice." },
            { label: "Reviewer", text: "Resolve when the answer satisfies you. Some teams reserve resolution to the reviewer entirely, which is a defensible rule if it is written down." },
            { label: "Either", text: "Reply before resolving. \"Fixed in a1b2c3d\" or \"Good point, left as is because…\" takes five seconds and prevents the whole argument." },
          ]}
        />
        <P>
          Threads on a specific line have a second behaviour worth knowing:{" "}
          <Strong>outdated</Strong>. Push a commit that changes the line a comment was anchored to and
          GitHub hides the thread as outdated. The comment is not gone and not resolved — it is
          collapsed, and it is very easy for a real objection to disappear this way without anybody
          deciding it was answered.
        </P>
        <Callout tone="tip" title="Re-request review when you have made the changes">
          Pushing a commit does not notify the reviewer, and it does not clear a &quot;changes
          requested&quot;. The circular-arrow button next to their name in the Reviewers box asks
          them to look again. Without it, a pull request can sit for days with both people waiting
          for the other.
        </Callout>
      </LessonSection>

      <LessonSection
        id="requesting-a-review-is-how-work-reaches-a-person"
        title="Requesting a review is how work reaches a person"
      >
        <P>
          A pull request nobody was asked to review is a pull request nobody reviews. Requesting a
          review puts it in a named person&apos;s queue — their{" "}
          <Strong>Review requested</Strong> filter, which is what most people actually work from.
        </P>
        <CodeBlock
          variant="terminal"
          code={`gh pr create --reviewer alice,bob
gh pr edit 483 --add-reviewer carol
gh pr list --search "review-requested:@me"     # your actual queue`}
        />
        <P>
          You can request a team as well as a person, and GitHub will optionally assign a subset by
          round robin or by load, so the request lands on somebody specific rather than on a group
          everybody assumes somebody else will handle.
        </P>
        <P>
          The automatic version is <Strong>CODEOWNERS</Strong> — a file mapping path patterns to
          people or teams. Anyone opening a pull request that touches those paths gets those
          reviewers requested for them, without having to know who owns what.
        </P>
        <CodeBlock
          label=".github/CODEOWNERS"
          code={`# Later rules win, so put the general ones first.

*                       @org/maintainers
/src/auth/              @org/security
/src/billing/           @alice @org/payments
*.sql                   @org/data
/.github/workflows/     @org/platform`}
        />
        <P>
          Combined with branch protection&apos;s &quot;Require review from Code Owners&quot;, this
          becomes enforcement: a change to the auth directory cannot merge without somebody from the
          security team, no matter who approved it. That is how a large repository stays safe without
          a human router in the middle.
        </P>
        <ChecklistCard
          title="Reviewing well, in one list"
          marker="check"
          items={[
            "Start a review rather than posting single comments, and submit once",
            "Read the description first — it tells you what the author was trying to do",
            "Check the pull request out and run it for anything non-trivial",
            "Ask questions rather than issuing verdicts; the author usually knows something you do not",
            "Use suggestions for the small certain fixes and prose for everything else",
            "Mark taste as \"nit:\" so it is clearly not blocking",
            "Say what is good, specifically. It is the only feedback that tells somebody what to repeat",
            "Reserve \"request changes\" for genuinely wrong, and dismiss it promptly once it is fixed",
            "Review quickly. A day of waiting costs the author more than the review costs you",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "\"Start a review\" holds comments as pending; submit once, as a coherent batch with a verdict.",
          "Approve counts towards required approvals; Comment is neutral; Request changes is a hard block only that reviewer can lift.",
          "A blocking review from somebody who then disappears stops the pull request entirely. Do not use it for preferences.",
          "gh pr checkout fetches the branch, including from a fork, so you can run the code.",
          "A ```suggestion block becomes a real commit the author accepts with one button.",
          "Suggestions carry literal indentation and suit small certain fixes; describe anything needing judgement.",
          "Resolving a conversation is a claim that it is handled. Reply with what you did before resolving.",
          "Editing a commented line marks the thread outdated and collapses it — real objections vanish this way.",
          "Pushing a fix notifies nobody. Re-request review explicitly.",
          "CODEOWNERS requests the right reviewers automatically, and with branch protection it becomes enforcement.",
        ]}
      />
    </div>
  );
}
