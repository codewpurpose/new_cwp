import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the github track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "why-version-control": [
    {
      q: "You change one character in one file and commit. How does the new commit's hash relate to the previous one?",
      options: [
        "It is completely different, because it is computed from the contents and the parent",
        "It is the previous hash plus one, because hashes count upwards",
        "It is the same hash, because only one character changed",
        "It differs only in the last character, matching the small change",
      ],
      answer: 0,
    },
    {
      q: "You commit on a laptop with no internet. Can a teammate see that commit yet?",
      options: [
        "No; committing is local, and sharing needs a separate push",
        "Yes; Git sends every commit to GitHub as soon as you make it",
        "Yes, but only if the teammate is on the same Wi-Fi network",
        "No, and the commit will fail until you are back online",
      ],
      answer: 0,
    },
    {
      q: "Your teammate's pull request on github.com is waiting for an approving review. Which is it?",
      options: [
        "A GitHub feature, so no Git command will change it",
        "A Git feature, so running git merge will approve it",
        "A Git feature that only works on a centralised server",
        "A local setting stored in your .git/config file",
      ],
      answer: 0,
    },
    {
      q: "Which of these is Git worst at tracking?",
      options: [
        "Large video files that change often",
        "HTML and CSS source files",
        "A Markdown README",
        "A JSON configuration file",
      ],
      answer: 0,
    },
  ],
  "installing-git": [
    {
      q: "Your commits show on GitHub with a grey silhouette instead of your avatar. What is the most likely cause?",
      options: [
        "Your user.email does not match an address on your GitHub account",
        "Your user.name contains a space, which GitHub cannot read",
        "You have not set init.defaultBranch to main yet",
        "Your core.editor is still set to vim",
      ],
      answer: 0,
    },
    {
      q: "You set user.email globally to a personal address and locally in one repository to a work address. Which does a commit in that repository use?",
      options: [
        "The work address, because the local setting is closer and wins",
        "The personal address, because global settings always win",
        "Both addresses, joined together on the commit",
        "Whichever address was set most recently on the machine",
      ],
      answer: 0,
    },
    {
      q: "On a mixed Windows and Mac team, a file shows every line as changed even though nobody edited it. What is the likely cause?",
      options: [
        "Different line endings, fixed with core.autocrlf or a .gitattributes file",
        "Different Git versions, fixed by everyone running the same release",
        "A wrong user.name, fixed by setting it with --global",
        "A missing default branch, fixed with init.defaultBranch main",
      ],
      answer: 0,
    },
    {
      q: "A commit message opened in vim and you cannot get out. What saves the message and quits?",
      options: ["Press Esc, then type :wq and Enter", "Press Ctrl+C twice", "Type exit and press Enter", "Press Esc, then type :q! and Enter"],
      answer: 0,
    },
  ],
  "repositories-and-the-three-trees": [
    {
      q: "You run git add report.md, keep editing report.md, then run git commit. What does the commit contain?",
      options: [
        "The version of report.md from when you ran git add",
        "The latest version of report.md on disk, including the new edits",
        "Nothing, because the file changed after it was staged",
        "Both versions of report.md, stored as two separate files",
      ],
      answer: 0,
    },
    {
      q: "You create a brand-new file notes.md and run git commit -am \"Add notes\". Is notes.md in the commit?",
      options: [
        "No; -a only stages files Git already tracks",
        "Yes; -a stages every file in the folder",
        "Yes, but only if notes.md is in the root folder",
        "No; new files can only be added with git init",
      ],
      answer: 0,
    },
    {
      q: "Which command shows exactly what your next commit will contain?",
      options: ["git diff --staged", "git diff", "git log", "git init"],
      answer: 0,
    },
    {
      q: "You delete the .git folder from a project. What happens?",
      options: [
        "Your files stay, but every commit and branch is gone",
        "Your files are deleted, but the commit history is kept",
        "Nothing; Git rebuilds .git automatically next time",
        "Only the staging area is cleared; commits survive",
      ],
      answer: 0,
    },
  ],
  "staging-and-committing": [
    {
      q: "You fixed a bug and added a debug console.log in the same hunk of one file. How do you commit only the fix?",
      options: [
        "git add -p, then split (s) or edit (e) the hunk so only the fix is staged",
        "git add . and then delete the log line in the next commit",
        "git commit -am with a message saying to ignore the log line",
        "git restore the whole file, then rewrite the fix from memory",
      ],
      answer: 0,
    },
    {
      q: "Which commit subject line follows the convention taught in this chapter?",
      options: [
        "Add rate limiting to the search endpoint",
        "Added rate limiting to the search endpoint",
        "adding rate limiting stuff",
        "Rate limiting changes and other fixes",
      ],
      answer: 0,
    },
    {
      q: "Why must a blank line separate the subject from the body of a commit message?",
      options: [
        "Git and other tools use it to tell where the subject ends",
        "Without it, Git refuses to create the commit",
        "It stops the body being shown to anyone but the author",
        "It is purely a style choice that tools ignore",
      ],
      answer: 0,
    },
    {
      q: "You staged a file by mistake. How do you unstage it but keep your edits?",
      options: [
        "git restore --staged notes.md",
        "git restore notes.md",
        "git rm notes.md",
        "git commit --undo notes.md",
      ],
      answer: 0,
    },
  ],
  "reading-history": [
    {
      q: "You want to know when a function called loadUser first appeared in the code. Which command finds it?",
      options: [
        "git log -S \"loadUser\"",
        "git log --grep=\"loadUser\"",
        "git log --author=\"loadUser\"",
        "git show loadUser",
      ],
      answer: 0,
    },
    {
      q: "You edited two files and staged both. You run plain git diff and it prints nothing. Why?",
      options: [
        "git diff compares the working tree to the index, and everything is staged",
        "Your edits were lost when you staged them",
        "git diff only works after you have made a commit",
        "git diff needs --all to show any changes",
      ],
      answer: 0,
    },
    {
      q: "How do you print config.json as it exists on the main branch without changing your working tree?",
      options: [
        "git show main:config.json",
        "git checkout main config.json",
        "git restore --source=main config.json",
        "git log main config.json",
      ],
      answer: 0,
    },
    {
      q: "One line in a file looks wrong and you want to understand why it was written. What should you do?",
      options: [
        "Run git blame on the file, then git show the commit it names",
        "Run git diff on the file to see who wrote the line",
        "Run git log --oneline and read every message from the start",
        "Delete the line and see whether anything breaks",
      ],
      answer: 0,
    },
  ],
  "undoing-things": [
    {
      q: "A bad commit is already on main and your teammates have pulled it. How should you undo it?",
      options: [
        "git revert <hash>, which adds a commit that cancels it",
        "git reset --hard HEAD~1, then force push main",
        "git restore . to put every file back",
        "Delete the commit on GitHub's website",
      ],
      answer: 0,
    },
    {
      q: "You want to redo your last commit (not pushed) with different contents, keeping all the changes staged. Which command?",
      options: ["git reset --soft HEAD~1", "git reset --hard HEAD~1", "git revert HEAD", "git restore --staged ."],
      answer: 0,
    },
    {
      q: "You ran git reset --hard HEAD~3 by mistake and lost three commits. What gets them back?",
      options: [
        "git reflog to find the old hash, then git reset --hard to it",
        "git restore . to restore the files from the last commit",
        "git stash pop, because reset stashes the commits it removes",
        "Nothing; reset --hard deletes commits permanently",
      ],
      answer: 0,
    },
    {
      q: "You are not sure you want to throw away some unstaged edits. What is the safe move?",
      options: [
        "git stash, so you can bring the changes back later",
        "git restore ., because it keeps a backup in the reflog",
        "git reset --hard, because reflog can recover the edits",
        "git revert, because it saves the edits as a new commit",
      ],
      answer: 0,
    },
  ],
  "ignoring-files": [
    {
      q: "Your .gitignore contains docs/*.pdf. Which file is NOT ignored?",
      options: ["docs/api/spec.pdf", "docs/guide.pdf", "docs/manual.pdf", "docs/notes.pdf"],
      answer: 0,
    },
    {
      q: "You committed .env last week. Today you add .env to .gitignore, but git status still shows changes to it. Why?",
      options: [
        ".gitignore has no effect on a file Git already tracks",
        "The .gitignore file must be committed before it works",
        ".env files can only be ignored in the global ignore file",
        "Patterns starting with a dot are not allowed",
      ],
      answer: 0,
    },
    {
      q: "An API key was pushed to a public repository an hour ago. What should you do first?",
      options: [
        "Revoke the key at the provider and issue a new one",
        "Delete the file and push a new commit",
        "Make the repository private and carry on",
        "Add the file to .gitignore and push again",
      ],
      answer: 0,
    },
    {
      q: "How do you stop tracking node_modules/ without deleting it from your disk?",
      options: [
        "git rm -r --cached node_modules/",
        "git rm -r node_modules/",
        "git restore node_modules/",
        "git reset --hard node_modules/",
      ],
      answer: 0,
    },
  ],
  "what-a-branch-is": [
    {
      q: "What is stored in .git/refs/heads/main?",
      options: [
        "One commit hash, the commit main currently points at",
        "A full copy of every file on the main branch",
        "A list of every commit ever made on main",
        "The name of the branch you are currently on",
      ],
      answer: 0,
    },
    {
      q: "You run git switch -c feature. What changes immediately?",
      options: [
        "A new label points at the current commit, and HEAD moves to it",
        "Every file in the project is copied into a new folder",
        "A new commit is created to mark the start of the branch",
        "The main branch is renamed to feature",
      ],
      answer: 0,
    },
    {
      q: "Git refuses to switch branches, saying your local changes would be overwritten. What is a safe way forward?",
      options: [
        "git stash, then switch, and git stash pop when you return",
        "git restore . to clear the changes, then switch",
        "git branch -D on the branch you are trying to leave",
        "git reset --hard, then switch",
      ],
      answer: 0,
    },
    {
      q: "You made two commits in detached HEAD state and want to keep them. What should you run while still there?",
      options: [
        "git switch -c experiment",
        "git switch main",
        "git branch -d experiment",
        "git restore --staged .",
      ],
      answer: 0,
    },
  ],
  "merging-branches": [
    {
      q: "You want your finished fix/login work to land on main. Which commands do that?",
      options: [
        "git switch main, then git merge fix/login",
        "git switch fix/login, then git merge main",
        "git switch main, then git merge main",
        "git merge fix/login main, from any branch",
      ],
      answer: 0,
    },
    {
      q: "main has not moved since fix/login branched off. What does git merge fix/login (standing on main) do?",
      options: [
        "Fast-forwards: main's label slides to fix/login's commit, with no new commit",
        "Creates a merge commit with two parents, even though nothing diverged",
        "Copies the branch's commits so they get new hashes on main",
        "Refuses to merge, because there is nothing to combine",
      ],
      answer: 0,
    },
    {
      q: "In a three-way merge, which three commits does Git compare?",
      options: [
        "The merge base and the tips of both branches",
        "The first commit, the last commit, and HEAD",
        "The tips of both branches and the newest tag",
        "The last three commits on the current branch",
      ],
      answer: 0,
    },
    {
      q: "You want main to fail loudly instead of creating a merge commit when it cannot simply fast-forward. Which flag?",
      options: ["--ff-only", "--no-ff", "--squash", "--abort"],
      answer: 0,
    },
  ],
  "merge-conflicts": [
    {
      q: "In a conflicted file, what is between <<<<<<< HEAD and =======?",
      options: [
        "The version from the branch you are standing on",
        "The version from the branch being merged in",
        "The version from the merge base",
        "Git's suggested combination of both sides",
      ],
      answer: 0,
    },
    {
      q: "You have edited a conflicted file into the code you want. How do you tell Git it is resolved?",
      options: [
        "git add the file",
        "git merge --continue-file",
        "git restore the file",
        "git stash the file",
      ],
      answer: 0,
    },
    {
      q: "A merge turns into far more conflicts than you expected and you want to start over. What do you run?",
      options: ["git merge --abort", "git reset --soft HEAD~1", "git branch -D main", "git commit -m \"wip\""],
      answer: 0,
    },
    {
      q: "Two branches both changed the same timeout value: one to 30, one to 60. What is the right resolution?",
      options: [
        "Whichever value is actually correct, or new code that satisfies both changes",
        "Always the value from HEAD, because your branch takes priority",
        "Always the value from the incoming branch, because it is newer",
        "Keep both lines and the markers so reviewers can decide later",
      ],
      answer: 0,
    },
  ],
  "rebase-and-history": [
    {
      q: "After git rebase main on your branch, why do your commits have new hashes?",
      options: [
        "They are new copies with a different parent, and the hash covers the parent",
        "Rebase deliberately scrambles hashes so the old commits cannot be found",
        "Git re-signs every commit with today's date and nothing else changes",
        "They keep the same hashes; only main's hashes change",
      ],
      answer: 0,
    },
    {
      q: "Which of these is safe to rebase without asking anyone?",
      options: [
        "Your own branch that nobody else has pulled",
        "main, after your teammates have pulled it",
        "A shared feature branch two people push to",
        "Any branch, as long as you use --force afterwards",
      ],
      answer: 0,
    },
    {
      q: "In git rebase -i, which command folds a \"fix typo\" commit into the one before it and throws its message away?",
      options: ["fixup", "squash", "reword", "drop"],
      answer: 0,
    },
    {
      q: "You rebased a branch you had already pushed. How should you publish it?",
      options: [
        "git push --force-with-lease",
        "git push --force",
        "git push, then git pull, then git push again",
        "Delete the remote branch on GitHub and push a new one",
      ],
      answer: 0,
    },
  ],
  "remotes-and-pushing": [
    {
      q: "What is origin/main on your machine?",
      options: [
        "A local record of where main was on the server when you last fetched",
        "A live view of the server's main branch, updated every second",
        "A copy of main that only exists on GitHub",
        "Another name for your own local main branch",
      ],
      answer: 0,
    },
    {
      q: "You want to see what teammates pushed without changing your branch or files. Which command?",
      options: ["git fetch", "git pull", "git push", "git merge origin/main"],
      answer: 0,
    },
    {
      q: "Your push is rejected because the remote contains work you do not have. What should you do?",
      options: [
        "Pull to integrate their commits, then push again",
        "Push again with --force to replace the remote",
        "Delete your local branch and clone again",
        "Wait a few minutes and retry the same push",
      ],
      answer: 0,
    },
    {
      q: "git status says \"Your branch is up to date with 'origin/main'\", but a teammate pushed ten minutes ago. Why?",
      options: [
        "The comparison uses origin/main, which only updates when you fetch",
        "Git status only checks the server once a day",
        "Your teammate's push has not finished on GitHub yet",
        "Git status ignores commits made by other people",
      ],
      answer: 0,
    },
  ],
  authentication: [
    {
      q: "You push over HTTPS, type your correct GitHub password, and get \"Authentication failed\". What is going on?",
      options: [
        "GitHub no longer accepts account passwords for Git; use a token or SSH key",
        "You mistyped the password and need to reset it on the website",
        "Your repository is private, so only SSH pushes are allowed",
        "GitHub is down, and the push will work if you retry later",
      ],
      answer: 0,
    },
    {
      q: "You are setting up SSH. Which file do you paste into GitHub's \"New SSH key\" form?",
      options: ["~/.ssh/id_ed25519.pub", "~/.ssh/id_ed25519", "~/.ssh/known_hosts", "~/.gitconfig"],
      answer: 0,
    },
    {
      q: "Which kind of personal access token does the chapter recommend?",
      options: [
        "Fine-grained, limited to specific repositories, with an expiry date",
        "Classic, with the repo scope and no expiration",
        "Classic, with every scope ticked so it never fails",
        "Fine-grained, with no expiration so you only set it up once",
      ],
      answer: 0,
    },
    {
      q: "You cloned with an https:// URL and want to switch to SSH. What do you do?",
      options: [
        "git remote set-url origin git@github.com:you/project.git",
        "Delete the folder and clone the repository again with SSH",
        "git push --ssh origin main",
        "Rename the remote from origin to ssh",
      ],
      answer: 0,
    },
  ],
  "anatomy-of-a-repository": [
    {
      q: "A public repository has no LICENSE file. Can others legally copy and reuse its code?",
      options: [
        "No; default copyright applies, so they may not",
        "Yes; public code is open source automatically",
        "Yes, as long as they credit the author",
        "Only for non-commercial projects",
      ],
      answer: 0,
    },
    {
      q: "You run git tag -a v1.2.0 -m \"Release\" and then git push. Is the tag on GitHub?",
      options: [
        "No; git push does not push tags, so run git push origin v1.2.0",
        "Yes; every push sends all new tags automatically",
        "Yes, but only annotated tags are pushed, and this one is",
        "No; tags can only be created on GitHub's Releases page",
      ],
      answer: 0,
    },
    {
      q: "You no longer maintain a project but want to keep its issues and history readable. What should you do?",
      options: [
        "Archive the repository",
        "Delete the repository",
        "Make the repository private",
        "Remove all collaborators",
      ],
      answer: 0,
    },
    {
      q: "Which of these gives you a real copy of a repository under your own account?",
      options: ["Fork", "Star", "Watch", "Release"],
      answer: 0,
    },
  ],
  "issues-and-tracking": [
    {
      q: "Which bug report is most likely to get fixed?",
      options: [
        "Steps to reproduce, expected versus actual result, the error text, and the version",
        "A short title saying \"Broken\" and a request to fix it as soon as possible",
        "A photo of the screen showing the error, with no other details",
        "Three unrelated bugs collected into one issue to save time",
      ],
      answer: 0,
    },
    {
      q: "Where must \"Fixes #482\" go so that merging the pull request closes issue #482?",
      options: [
        "In the pull request description or a commit message",
        "In any comment on the pull request",
        "In the title of issue #482",
        "In a label attached to the pull request",
      ],
      answer: 0,
    },
    {
      q: "You want to track everything left to do before version 2.5. Which tool fits?",
      options: ["A milestone", "An assignee", "A star", "A fork"],
      answer: 0,
    },
    {
      q: "You want to mention a related issue without closing it. What do you write?",
      options: ["A bare #482", "Closes #482", "Resolves #482", "Fixed #482"],
      answer: 0,
    },
  ],
  "opening-a-pull-request": [
    {
      q: "A reviewer asks for changes on your open pull request. How do you update it?",
      options: [
        "Push new commits to the same branch; the pull request updates itself",
        "Close it and open a new pull request with the changes",
        "Edit the diff directly in the pull request description",
        "Merge main into the base branch, then reopen it",
      ],
      answer: 0,
    },
    {
      q: "You want CI running and early feedback, but the work is not finished. What should you open?",
      options: [
        "A draft pull request",
        "An issue with the code pasted in",
        "A pull request with \"DO NOT MERGE\" in the title only",
        "Nothing until the work is completely finished",
      ],
      answer: 0,
    },
    {
      q: "Your branch passes every test locally, but the pull request's checks fail. What is a likely reason?",
      options: [
        "The checks test a merge with the latest base, and something on main changed",
        "GitHub runs tests on an older copy of your branch from last week",
        "Checks always fail the first time and pass when re-run",
        "Your local tests ran with the wrong Git user.name",
      ],
      answer: 0,
    },
    {
      q: "What does the pull request description most need that the diff cannot show?",
      options: [
        "Why the change was made, and anything you are unsure about",
        "A line-by-line restatement of what the diff changes",
        "A list of every file in the repository",
        "The full output of git log for the branch",
      ],
      answer: 0,
    },
  ],
  "reviewing-a-pull-request": [
    {
      q: "You have eight comments to leave on a pull request. What is the best way to post them?",
      options: [
        "Start a review, add them all as pending, then submit once",
        "Click \"Add single comment\" for each one as you find it",
        "Write them all in one long comment on the Conversation tab",
        "Email them to the author so the pull request stays clean",
      ],
      answer: 0,
    },
    {
      q: "You would have named a variable differently, but the code is correct. Which review verdict fits?",
      options: [
        "Approve, with a \"nit:\" comment about the name",
        "Request changes until the variable is renamed",
        "Comment only, and never approve over a naming issue",
        "Close the pull request and open your own version",
      ],
      answer: 0,
    },
    {
      q: "The author has pushed fixes for everything you raised. What should they do so you look again?",
      options: [
        "Re-request your review with the button in the Reviewers box",
        "Nothing; pushing a commit notifies you and clears your review",
        "Resolve every thread without replying, then wait",
        "Open a new pull request with the same branch",
      ],
      answer: 0,
    },
    {
      q: "What does a CODEOWNERS file do?",
      options: [
        "Automatically requests reviews from the owners of the paths a pull request touches",
        "Prevents anyone except the listed people from cloning those folders",
        "Records who wrote each line of code, like git blame",
        "Decides which merge strategy is allowed for each folder",
      ],
      answer: 0,
    },
  ],
  "merging-a-pull-request": [
    {
      q: "A branch has commits called \"wip\", \"fix the thing\", and \"lint\". Which merge option leaves a single tidy commit on main?",
      options: ["Squash and merge", "Create a merge commit", "Rebase and merge", "Fast-forward merge"],
      answer: 0,
    },
    {
      q: "What is the main drawback of Rebase and merge?",
      options: [
        "Every commit gets a new hash, and there is no single commit to revert",
        "It always creates a merge commit with two parents",
        "It combines all the commits into one and loses their messages",
        "It can only be used on branches with exactly one commit",
      ],
      answer: 0,
    },
    {
      q: "Someone approves a small pull request, then the author pushes a large unrelated change before merging. Which protection rule prevents that approval counting?",
      options: [
        "Dismiss stale approvals when new commits are pushed",
        "Block force pushes to main",
        "Require conversation resolution",
        "Automatically delete head branches",
      ],
      answer: 0,
    },
    {
      q: "A check is red on a pull request but the merge button is still green. What is the likely reason?",
      options: [
        "That check is not marked as required in branch protection",
        "GitHub ignores checks on pull requests from the same repository",
        "Red checks only block merging after 24 hours",
        "The button colour is cached and will turn grey on refresh",
      ],
      answer: 0,
    },
  ],
  "contributing-to-open-source": [
    {
      q: "You want to fix a bug in a popular project you have never contributed to. What should you do before writing code?",
      options: [
        "Read CONTRIBUTING.md and comment on the issue saying what you plan to do",
        "Write the whole fix first, so the maintainers can see it is serious",
        "Email the maintainer privately to ask for write access",
        "Open a pull request with an empty commit to reserve the issue",
      ],
      answer: 0,
    },
    {
      q: "You cloned your fork by hand with git clone. Why add a remote called upstream?",
      options: [
        "So you can fetch new work from the original project; origin is only your fork",
        "So you can push your changes directly to the original project",
        "Because Git refuses to commit in a fork without it",
        "So that GitHub counts your commits on your contribution graph",
      ],
      answer: 0,
    },
    {
      q: "Where should you make your changes in your fork?",
      options: [
        "On a new feature branch, keeping your fork's main a clean mirror of upstream",
        "Directly on your fork's main, since the fork belongs to you",
        "On the upstream main branch, using your fork's credentials",
        "In a separate fork for every single commit you make",
      ],
      answer: 0,
    },
    {
      q: "A project requires a DCO sign-off. How do you add one to a commit?",
      options: [
        "git commit -s",
        "git commit --cla",
        "git tag -s",
        "git push --signoff",
      ],
      answer: 0,
    },
  ],
  "automating-with-actions": [
    {
      q: "Where must a GitHub Actions workflow file be saved for it to run?",
      options: [".github/workflows/ci.yml", ".github/actions.yml", "workflows/ci.yml", ".git/workflows/ci.yml"],
      answer: 0,
    },
    {
      q: "A workflow has a lint job and a test job, with no needs between them. How do they run?",
      options: [
        "In parallel, each on its own fresh machine",
        "One after the other, on the same machine",
        "In parallel, sharing one checked-out folder",
        "Only lint runs; test waits for a manual trigger",
      ],
      answer: 0,
    },
    {
      q: "A test matrix has os: [ubuntu-latest, windows-latest] and node: [20, 22]. How many runs does it create?",
      options: ["4", "2", "6", "1"],
      answer: 0,
    },
    {
      q: "Your CI job fails on every pull request, but people can still merge. What is missing?",
      options: [
        "The job is not marked as a required check in branch protection",
        "The workflow needs runs-on: windows-latest to block merges",
        "The job needs a concurrency group before it can block",
        "Failing jobs only block merges on private repositories",
      ],
      answer: 0,
    },
  ],
  "choosing-a-workflow": [
    {
      q: "Your team deploys a web app several times a day and supports only one production version. Which workflow fits best to start with?",
      options: ["GitHub Flow", "Git Flow", "A develop branch for every developer", "Monthly release branches only"],
      answer: 0,
    },
    {
      q: "In trunk-based development, how is unfinished work kept from reaching users?",
      options: [
        "It is merged behind a feature flag that keeps it switched off",
        "It stays on a long-lived branch until it is finished",
        "It is committed to a develop branch that never deploys",
        "It is kept in a git stash on the developer's laptop",
      ],
      answer: 0,
    },
    {
      q: "Which kind of project is Git Flow designed for?",
      options: [
        "Versioned software with scheduled releases and several supported versions",
        "A personal website deployed every time main changes",
        "A small web service with one version in production",
        "A one-person project with no releases at all",
      ],
      answer: 0,
    },
    {
      q: "What makes a team's chosen workflow real rather than just a habit?",
      options: [
        "Writing it down and configuring branch protection to match",
        "Installing a Git plugin that enforces the workflow locally",
        "Naming the repository after the workflow it uses",
        "Choosing the workflow that has the most branches",
      ],
      answer: 0,
    },
  ],
};
