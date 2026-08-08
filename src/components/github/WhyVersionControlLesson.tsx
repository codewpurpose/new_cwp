import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function WhyVersionControlLesson() {
  return (
    <div>
      <Lead>
        Everyone invents version control before they learn it, and the version they invent is a
        folder full of files ending in final-v2-ACTUAL. Look at what that folder cannot answer, and
        at the three ideas Git replaces it with.
      </Lead>

      <LessonSection
        id="the-folder-of-finals-is-version-control-done-badly"
        title="The folder of finals is version control, done badly"
      >
        <P>
          You have done this. Everybody has done this. The project is going well, you are about to
          change something risky, and you duplicate the folder first.
        </P>
        <CodeBlock
          label="A directory you have definitely seen"
          copyable={false}
          code={`site/
site-backup/
site-backup-2/
site-final/
site-final-USE-THIS-ONE/
site-final-USE-THIS-ONE (copy)/`}
        />
        <P>
          This is a real version control system. It stores versions, it lets you go back, and for a
          weekend project it genuinely works. It is worth being precise about what it cannot do,
          because each failure is a feature Git exists to provide.
        </P>
        <LabelRows
          rows={[
            {
              label: "Why",
              text: "Nothing anywhere records why site-final-USE-THIS-ONE was made. Three weeks later the folder names are the only evidence and they say nothing.",
            },
            {
              label: "What",
              text: "Finding what actually changed between two of these folders means comparing them by hand, file by file.",
            },
            {
              label: "Who",
              text: "With two people on the project there is no answer at all. One of you overwrites the other, silently.",
            },
            {
              label: "Both",
              text: "You cannot take the good half of one folder and the good half of another. You pick a folder and lose the rest.",
            },
          ]}
        />
        <P>
          Git answers all four, and the price is learning a handful of ideas that are genuinely
          strange the first time. It is worth it — this is the tool every professional developer on
          earth uses, every day, and it has been the standard for twenty years.
        </P>
      </LessonSection>

      <LessonSection
        id="a-commit-is-a-snapshot-with-a-name-and-a-parent"
        title="A commit is a snapshot with a name and a parent"
      >
        <P>
          The single idea underneath all of Git: a <Strong>commit</Strong> is a complete snapshot of
          your project at one moment, plus a note about who made it, when, and why, plus a pointer to
          the commit that came before it.
        </P>
        <P>
          That last part is what makes a history. Each commit knows its parent, so from any commit
          you can walk backwards through every state the project has ever been in.
        </P>
        <CodeBlock
          label="What a commit records"
          copyable={false}
          code={`commit a3f9c21e8b4d7f0192c5e6a8b3d4f5c6e7a8b9c0
Author:  Sam <sam@example.com>
Date:    Tue Aug 4 09:14:22 2026 +0100
Parent:  91b2d4f0a7c3e5b8d1f4a6c9e2b5d8f1a4c7e0b3

    Fix the redirect after login

    The next param was being dropped when it was empty,
    so anyone arriving from the pricing page landed on
    the dashboard instead of coming back.`}
        />
        <P>
          The forty-character string at the top is the commit&apos;s name. It is not a counter — it
          is a <Strong>hash</Strong>, computed from the contents of that snapshot plus its metadata
          plus its parent&apos;s hash. Change one character of one file and the hash is completely
          different.
        </P>
        <Callout tone="note" title="Why the hash matters more than it looks like it should">
          Because the hash covers the parent&apos;s hash, and that one covers its parent, a commit
          hash effectively signs the entire history behind it. Nobody can alter an old commit without
          every commit after it changing name. This is not a security feature bolted on afterwards;
          it is what a Git history structurally is.
        </Callout>
        <P>
          People say &quot;Git stores diffs&quot;. It does not, conceptually — each commit is a full
          snapshot. Git is very clever about not storing the same file twice on disk, but that is a
          storage optimisation happening far below anything you will ever type.
        </P>
      </LessonSection>

      <LessonSection
        id="every-clone-is-a-complete-repository"
        title="Every clone is a complete repository"
      >
        <P>
          Git is <Strong>distributed</Strong>, which is a word that means something concrete: when
          you clone a project, you do not get a working copy that phones home. You get the entire
          repository — every commit, every branch, all of the history — on your own machine.
        </P>
        <CompareGrid
          items={[
            {
              title: "Centralised (the older idea)",
              tone: "caution",
              children: (
                <P>
                  One server holds the history. Committing, viewing the log, and creating a branch
                  all need the network. If the server is down, you cannot work; if it is lost without
                  a backup, the history is gone.
                </P>
              ),
            },
            {
              title: "Distributed (Git)",
              tone: "positive",
              children: (
                <P>
                  Every clone holds the full history. Commit, branch, and read the log on a plane
                  with no internet. The network is needed only to exchange work with somebody else,
                  and every clone is a complete backup.
                </P>
              ),
            },
          ]}
        />
        <P>
          This is why Git feels instant. Almost everything you do is a local file operation. It also
          explains a thing that confuses beginners endlessly: committing does not put your work
          anywhere anybody else can see. Sharing is a separate, explicit step, and it is called{" "}
          <Strong>push</Strong>.
        </P>
      </LessonSection>

      <LessonSection
        id="git-is-not-github-and-the-difference-matters"
        title="Git is not GitHub, and the difference matters"
      >
        <P>
          Git is a program on your computer, written by Linus Torvalds in 2005 to manage the Linux
          kernel. It is free, open source, and has no company behind it.
        </P>
        <P>
          GitHub is a website, founded in 2008, that hosts Git repositories and adds everything Git
          deliberately does not have: a user interface, issues, pull requests, code review,
          permissions, automation. Microsoft bought it in 2018. GitLab, Bitbucket, Codeberg and
          Gitea are the same idea from other people.
        </P>
        <LabelRows
          rows={[
            { label: "Git", text: "commit, branch, merge, rebase, log, diff. Runs on your machine. Works with no account and no internet." },
            { label: "GitHub", text: "pull requests, code review, issues, Actions, releases, stars. A website. Needs an account." },
            { label: "Both", text: "clone, push, pull, fetch — the commands where your Git talks to a Git repository somewhere else." },
          ]}
        />
        <P>
          Keeping these apart makes the rest of this track much easier, because it tells you where to
          look when something breaks. A merge conflict is a Git problem and no amount of clicking on
          github.com will help. A rejected review is a GitHub problem and no Git command will change
          it.
        </P>
        <Callout tone="tip" title="You will hear people say Git when they mean GitHub">
          Constantly, including in job descriptions. It is usually harmless. It stops being harmless
          the moment somebody tells you to &quot;just use Git&quot; to solve something that is
          actually a permissions setting on a website.
        </Callout>
      </LessonSection>

      <LessonSection id="what-git-will-not-do-for-you" title="What Git will not do for you">
        <P>
          Git is good at text. It compares files line by line, which is why it is superb with source
          code, configuration, and prose, and close to useless with anything else.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Excellent",
              tone: "positive",
              children: <P>Source code, YAML, JSON, Markdown, CSV, SVG — anything where a line is a meaningful unit.</P>,
            },
            {
              title: "Workable",
              tone: "neutral",
              children: <P>Small images and PDFs. Git stores them fine but cannot show you what changed, and every version is kept in full.</P>,
            },
            {
              title: "Bad",
              tone: "caution",
              children: <P>Video, large datasets, compiled binaries, node_modules. The repository grows forever and never shrinks.</P>,
            },
          ]}
        />
        <P>
          Two more things worth knowing before you start. Git does not protect you from committing a
          password — it will happily record it and then preserve it forever, which is a whole
          chapter later on. And Git does not decide what your team&apos;s process is: whether you
          review before merging, whether you rebase, whether main is protected. Those are agreements
          between people, and the tool will let you do any of them.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "The folder of dated copies is real version control; it just cannot say what changed, why, or who did it, and it cannot combine two versions.",
          "A commit is a full snapshot, plus author, date, message, and a pointer to its parent.",
          "A commit's name is a hash of its contents and its parent's hash, which means old history cannot be quietly altered.",
          "Git is distributed: every clone holds the entire history, so almost everything works offline and instantly.",
          "Committing shares nothing. Pushing is a separate step, on purpose.",
          "Git is a program on your machine. GitHub is a website that hosts Git repositories and adds review, issues, and automation.",
          "Knowing which of the two you are fighting is most of knowing how to fix it.",
          "Git is built for text. Large binaries make repositories that grow forever.",
        ]}
      />
    </div>
  );
}
