import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function ReadingHistoryLesson() {
  return (
    <div>
      <Lead>
        git log unshaped is a firehose, and four flags turn it into the tool you actually wanted.
        Then diff, show, and blame answer the three questions you will keep asking about code you did
        not write.
      </Lead>

      <LessonSection id="git-log-is-a-firehose-until-you-shape-it" title="git log is a firehose until you shape it">
        <P>
          Plain <Strong>git log</Strong> prints every commit in full, newest first, and opens a pager
          you then have to work out how to close. It is press <Strong>q</Strong>, by the way.
        </P>
        <P>
          Nobody reads it that way. These are the shapes people actually use.
        </P>
        <CodeBlock
          variant="terminal"
          code={`# One line each — the default view for most people
git log --oneline

# The last ten, with author and relative date
git log -10 --pretty=format:"%h %ad %an  %s" --date=relative

# Everything that touched one file, ever, including renames
git log --follow -- src/auth/redirect.ts

# Everything by one person, since a date
git log --author="Sam" --since="2 weeks ago"

# Commits whose message mentions a word
git log --grep="redirect"

# Commits whose DIFF added or removed a word — much rarer, much more powerful
git log -S "loadUser"`}
        />
        <P>
          That last one is worth pausing on. <Strong>-S</Strong> — the &quot;pickaxe&quot; — searches
          the content of the changes rather than the messages. It answers &quot;when did this
          function first appear, and when did it get deleted&quot;, which is a question no amount of
          reading commit messages will answer reliably.
        </P>
        <Callout tone="tip" title="Two dashes separate paths from everything else">
          <span className="font-[family-name:var(--learn-font-mono)]">git log -- src/</span> means
          &quot;in this path&quot;. Without the{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">--</span>, Git has to guess
          whether you meant a file or a branch, and when a branch and a file share a name it guesses
          wrong. The separator is not optional style; it is how you say which you meant.
        </Callout>
      </LessonSection>

      <LessonSection id="the-graph-flag-draws-the-branches" title="The graph flag draws the branches">
        <P>
          A linear log hides the shape of the history entirely. Adding <Strong>--graph</Strong> draws
          the branch structure in the margin with the same characters that make up every commit
          diagram you have ever seen.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git log --oneline --graph --all --decorate`}
        />
        <CodeBlock
          label="Output"
          copyable={false}
          code={`*   9f3c1a2 (HEAD -> main, origin/main) Merge pull request #483 from fix/login
|\\
| * 4b8e0d7 (fix/login) Handle the empty next param
| * 2c7a91f Fix the redirect when next is empty
* | 7d1f6b4 Add the settings page
|/
* 1a5e8c3 Set up the router
* 0b2d7f9 Initial commit`}
          lineTones={{ 0: "accent", 3: "ok", 5: "dim" }}
        />
        <LabelRows
          rows={[
            { label: "--graph", text: "Draws the lines. A commit with two lines going into it is a merge commit." },
            { label: "--all", text: "Every branch, not just the one you are standing on. Without it, work on other branches is invisible." },
            { label: "--decorate", text: "Shows the branch and tag labels in brackets. On by default in recent Git, but harmless to state." },
            { label: "--oneline", text: "One line per commit, so the graph fits on a screen. With full commit bodies the shape is unreadable." },
          ]}
        />
        <P>
          This combination is common enough to be worth an alias. Git aliases are just config, and
          they work anywhere in any repository.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git config --global alias.lg "log --oneline --graph --all --decorate"
# now: git lg`}
        />
      </LessonSection>

      <LessonSection id="diff-compares-two-things-you-have-to-name" title="diff compares two things you have to name">
        <P>
          <Strong>git diff</Strong> with no arguments is not &quot;show me my changes&quot;. It is
          one specific comparison out of several, and picking the wrong one is why people conclude
          their changes vanished.
        </P>
        <LabelRows
          rows={[
            { label: "git diff", text: "Working tree against the index. What you have changed and NOT staged. Silent if everything is staged." },
            { label: "--staged", text: "Index against HEAD. Exactly what your next commit will contain. Read this before every commit." },
            { label: "HEAD", text: "Working tree against the last commit. Everything you have done since, staged or not." },
            { label: "a..b", text: "Any two commits, branches, or tags. git diff main..fix/login shows what the branch adds." },
          ]}
        />
        <CodeBlock
          variant="terminal"
          code={`git diff                          # unstaged changes only
git diff --staged                 # what you are about to commit
git diff HEAD                     # everything since the last commit
git diff main..fix/login          # what the branch changes
git diff main...fix/login         # what the branch ADDS, ignoring what main did meanwhile
git diff HEAD~3 HEAD -- src/      # three commits ago to now, one directory`}
        />
        <P>
          The two-dot and three-dot forms are genuinely different and the difference matters on a
          branch that has been open for a while. <Strong>Two dots</Strong> compares the two endpoints
          directly, so it includes everything main did while you were away.{" "}
          <Strong>Three dots</Strong> compares against the point where the branches diverged, which
          is the change <em>your branch</em> is responsible for. GitHub shows the three-dot diff on a
          pull request, which is why the diff there is often smaller than the one you get locally.
        </P>
        <Callout tone="note" title="Reading a diff">
          Lines starting <span className="font-[family-name:var(--learn-font-mono)]">-</span> were
          removed, lines starting <span className="font-[family-name:var(--learn-font-mono)]">+</span>{" "}
          were added. A changed line appears as both. The{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">@@ -12,6 +12,9 @@</span> header
          means &quot;six lines starting at line 12 became nine lines starting at line 12&quot;. That
          is the whole notation.
        </Callout>
      </LessonSection>

      <LessonSection id="show-is-log-and-diff-for-a-single-commit" title="show is log and diff for a single commit">
        <P>
          Once <Strong>git log</Strong> has given you a hash, <Strong>git show</Strong> gives you
          everything about it: the message, the author, and the full diff.
        </P>
        <CodeBlock
          variant="terminal"
          code={`git show 2c7a91f                  # a commit by hash — a short prefix is enough
git show HEAD                     # the commit you are standing on
git show HEAD~2                   # two commits back along the first parent
git show main:src/auth/redirect.ts   # a whole FILE as it exists on main right now`}
        />
        <P>
          That last form is quietly one of the most useful commands in Git. It prints a file from any
          commit or branch without changing anything in your working tree, so you can look at how
          something used to be while your current edit stays exactly where it is.
        </P>
        <P>
          Hashes can be abbreviated to any unambiguous prefix — usually seven characters is plenty,
          and Git tells you if it is not.
        </P>
      </LessonSection>

      <LessonSection id="blame-answers-who-and-then-you-ask-why" title="blame answers who, and then you ask why">
        <P>
          <Strong>git blame</Strong> annotates every line of a file with the commit that last touched
          it. The name is unfortunate. The purpose is almost never to find somebody at fault; it is
          to find the commit message that explains a line you do not understand.
        </P>
        <CodeBlock
          label="git blame src/auth/redirect.ts"
          copyable={false}
          code={`2c7a91f (Sam    2026-08-04 09:14:22 +0100 12) export async function loadUser(id) {
2c7a91f (Sam    2026-08-04 09:14:22 +0100 13)   const res = await fetch(url);
9a1c4e8 (Priya  2026-05-19 16:02:41 +0100 14)   if (!res.ok) return null;
1a5e8c3 (Sam    2026-02-11 11:30:07 +0000 15)   return res.json();`}
          lineTones={{ 2: "accent" }}
        />
        <P>
          Line 14 looks wrong to you. Blame says Priya wrote it in May, in commit 9a1c4e8. Now run{" "}
          <Strong>git show 9a1c4e8</Strong> and read the message: it will very often say exactly why,
          and the reason will very often be one you had not thought of.
        </P>
        <ChecklistCard
          title="The four questions, and the command for each"
          marker="arrow"
          items={[
            "What has happened recently? — git log --oneline --graph --all",
            "What changed in this one commit? — git show <hash>",
            "What is different between these two things? — git diff a..b",
            "Why is this specific line here? — git blame <file>, then git show on the hash it names",
          ]}
        />
        <Callout tone="tip" title="Blame gets confused by reformatting">
          A project-wide reformat rewrites every line, so blame attributes the whole file to whoever
          ran the formatter. Adding{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">-w</span> makes it ignore
          whitespace-only changes, and a{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">.git-blame-ignore-revs</span>{" "}
          file lists commits blame should look straight through. GitHub honours that file too.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "git log --oneline is the everyday view; plain git log opens a pager you close with q.",
          "--author, --since, --grep and -- <path> narrow the log to something readable.",
          "git log -S searches the content of changes, not the messages — it finds when a function appeared or vanished.",
          "--graph --all --decorate draws the branch structure; alias it, because you will type it constantly.",
          "git diff compares two things and you must know which two: unstaged, staged, since HEAD, or between two refs.",
          "Three dots (main...branch) compares against the divergence point, which is what GitHub shows on a pull request.",
          "git show <hash> gives message plus diff; git show <ref>:<file> prints a whole file from another commit.",
          "git blame finds the commit behind a line so you can read its message. Finding the reasoning is the point, not finding a person.",
        ]}
      />
    </div>
  );
}
