import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { RemoteSync } from "@/components/github/RemoteSync";

export function RemotesAndPushingLesson() {
  return (
    <div>
      <Lead>
        A remote is a nickname for a URL, origin is a convention rather than a keyword, and the
        ahead/behind counts you trust are computed from a snapshot that may be hours old. Fetch,
        pull, and push one branch and watch each side move.
      </Lead>

      <LessonSection id="a-remote-is-a-nickname-for-a-url" title="A remote is a nickname for a URL">
        <P>
          Everything so far worked with no network and no account. A <Strong>remote</Strong> is how a
          repository on your machine learns about a repository somewhere else.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git remote -v
# origin  git@github.com:you/project.git (fetch)
# origin  git@github.com:you/project.git (push)

git remote add origin git@github.com:you/project.git
git remote rename origin upstream
git remote remove old-server
git remote set-url origin git@github.com:you/renamed.git`}
        />
        <P>
          That is the whole concept. A remote stores a name and a URL so you can type{" "}
          <Strong>origin</Strong> instead of the address every time. A repository can have as many as
          you like — which is exactly how open-source contribution works, with one remote for your
          fork and another for the original project.
        </P>
        <P>
          Cloning sets one up for you automatically:
        </P>
        <CodeBlock
          variant="terminal"
          code={`git clone git@github.com:you/project.git
# creates ./project, downloads the full history,
# adds a remote called origin, and checks out the default branch`}
        />
      </LessonSection>

      <LessonSection id="origin-is-a-convention-not-a-keyword" title="origin is a convention, not a keyword">
        <P>
          <Strong>origin</Strong> is not special to Git. It is the name{" "}
          <Strong>git clone</Strong> happens to use, and you can rename it to anything without
          breaking a thing. Knowing this is what makes the multi-remote setups later on stop looking
          like magic.
        </P>
        <P>
          There is a second, more important thing that is also just a name:{" "}
          <Strong>origin/main</Strong>. It looks like it refers to the server. It does not — it is a
          local ref, on your disk, recording what main looked like on the server{" "}
          <em>the last time you asked</em>.
        </P>
        <CodeBlock
          variant="terminal"
          code={`cat .git/refs/remotes/origin/main
# 9f3c1a2e8b4d7f0192c5e6a8b3d4f5c6e7a8b9c0     <- just another file on your machine

git branch -a
#   main
# * fix/login
#   remotes/origin/main         <- a remote-tracking branch: a cache, not a live view
#   remotes/origin/fix/login`}
        />
        <RemoteSync />
        <Callout tone="note" title="This is the single most useful thing in the chapter">
          Let the teammate push, then read the two boxes. Your{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">git status</span> still says
          you are up to date, confidently and incorrectly, because nothing has updated
          origin/main. Only a fetch changes that. Every &quot;but Git said I was up to date&quot;
          story is this.
        </Callout>
      </LessonSection>

      <LessonSection id="fetch-and-pull-are-not-the-same-operation" title="fetch and pull are not the same operation">
        <P>
          <Strong>git fetch</Strong> downloads new commits and updates your remote-tracking branches.
          It changes nothing about your branch or your files. It is completely safe and cannot cause
          a conflict.
        </P>
        <P>
          <Strong>git pull</Strong> is a fetch, followed immediately by a merge into your current
          branch. It moves your branch and can conflict.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git fetch                       # update origin/*, touch nothing else
git log --oneline main..origin/main   # what is on the server that I do not have
git diff main origin/main             # what would change if I merged it

git pull                        # fetch + merge, in one step`}
        />
        <P>
          The three-command sequence is a good habit on any branch that matters. Fetch, look at what
          arrived, then decide. Pulling blind into a branch with local work is how people find
          themselves in an unexpected conflicted merge in the middle of something else.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "pull (merge)",
              tone: "neutral",
              children: <P>The default. Creates a merge commit if both sides moved. Honest, and it litters the history with &quot;Merge branch main of…&quot; commits.</P>,
            },
            {
              title: "pull --rebase",
              tone: "positive",
              children: <P>Replays your local commits on top of what arrived. No merge commit. Safe for unpushed work, which is the usual case when pulling.</P>,
            },
            {
              title: "pull --ff-only",
              tone: "neutral",
              children: <P>Only if your branch has not diverged. Otherwise it refuses and makes you choose deliberately. The safest default.</P>,
            },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# Pick one, once, and stop thinking about it
git config --global pull.rebase true      # always rebase on pull
git config --global pull.ff only          # refuse anything that is not a fast-forward`}
        />
        <Callout tone="tip" title="Newer Git refuses to guess">
          Since version 2.27, pulling into a diverged branch with no preference configured prints a
          long message asking you to choose. That warning is not a problem to work around; it is Git
          declining to silently pick a strategy that changes your history. Set the config and it goes
          away.
        </Callout>
      </LessonSection>

      <LessonSection id="push-needs-an-upstream-the-first-time" title="push needs an upstream the first time">
        <P>
          Pushing a brand-new branch fails, because Git does not know which remote branch it
          corresponds to. The error tells you the exact command to fix it.
        </P>
        <CodeBlock
          label="The first push"
          copyable={false}
          code={`fatal: The current branch fix/login has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin fix/login`}
          lineTones={{ 0: "err", 3: "ok" }}
        />
        <CodeBlock
          variant="terminal"
          code={`git push -u origin fix/login    # -u is short for --set-upstream
git push                        # every push after that`}
        />
        <P>
          Setting the upstream links your local branch to the remote one permanently. From then on,{" "}
          <Strong>git push</Strong> and <Strong>git pull</Strong> with no arguments know where to go,
          and <Strong>git status</Strong> can tell you how far ahead or behind you are.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# Make -u the default and never think about it again
git config --global push.autoSetupRemote true`}
        />
        <P>
          The other push failure is the important one:
        </P>
        <CodeBlock
          label="A rejected push"
          copyable={false}
          code={`! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:you/project.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref.`}
          lineTones={{ 0: "err", 1: "err", 2: "warn" }}
        />
        <P>
          This is Git protecting somebody else&apos;s commits. The fix is to integrate their work and
          push again — <Strong>git pull</Strong> then <Strong>git push</Strong>. The fix is{" "}
          <em>not</em> <Strong>--force</Strong>, which deletes their commits, and which is the first
          suggestion you will find if you paste that error into a search engine.
        </P>
      </LessonSection>

      <LessonSection
        id="ahead-and-behind-are-counted-from-a-stale-copy"
        title="Ahead and behind are counted from a stale copy"
      >
        <P>
          <Strong>git status</Strong> reports things like &quot;Your branch is ahead of origin/main
          by 2 commits&quot;. Read that literally, because it is literally true and not what most
          people take it to mean.
        </P>
        <LabelRows
          rows={[
            { label: "Ahead", text: "Commits you have that origin/main — your cached copy — does not. This one is reliable, because it is about your own commits." },
            { label: "Behind", text: "Commits origin/main has that you do not. Only as fresh as your last fetch, which may have been on Tuesday." },
            { label: "Truth", text: "Unknowable without asking the server. git fetch is how you ask." },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`# The real answer, always
git fetch && git status

# Every branch, with its upstream and how far off it is
git branch -vv

# Just the numbers, scriptably
git rev-list --left-right --count main...origin/main
# 2	3      <- 2 ahead, 3 behind`}
        />
        <P>
          One last piece of housekeeping. When a branch is merged and deleted on GitHub, your
          machine keeps its remote-tracking ref forever, so{" "}
          <Strong>git branch -a</Strong> slowly fills with branches that no longer exist.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git fetch --prune                          # delete refs for branches gone from the server
git config --global fetch.prune true       # do it automatically, every fetch`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A remote is a name for a URL. A repository can have several, which is how forks work.",
          "origin is just the name git clone uses. Nothing about it is special to Git.",
          "origin/main is a file on your machine recording what the server looked like when you last fetched.",
          "git fetch updates that cache and changes nothing else. It is always safe.",
          "git pull is fetch plus merge, moves your branch, and can conflict.",
          "Configure pull.rebase or pull.ff to stop Git asking you to choose every time.",
          "The first push of a branch needs -u to link it to a remote branch; push.autoSetupRemote makes that automatic.",
          "A rejected push means the remote has commits you do not. Pull, then push. Never --force.",
          "\"Behind by N\" is measured against your last fetch, so it can be confidently wrong. Fetch first.",
          "fetch.prune true clears out remote-tracking branches for branches deleted on the server.",
        ]}
      />
    </div>
  );
}
