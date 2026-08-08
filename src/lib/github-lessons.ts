import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_GITHUB_HREF } from "@/lib/links";

/**
 * The Git and GitHub track: twenty-one lessons covering the tool and the
 * platform as one subject, because in practice nobody learns them separately.
 *
 * The ordering is deliberate and it is not the order most tutorials use. Git
 * comes first and entirely — commits, branches, merges, conflicts, rebase —
 * before GitHub appears at all. That costs eleven chapters up front and buys
 * the thing that makes the rest teachable: a pull request is a merge, a review
 * comment is anchored to a diff, a failing check is a command someone ran on a
 * copy of your branch. A reader who met GitHub first learns a website; a reader
 * who met Git first learns what the website is doing.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const GITHUB_PARTS: readonly LearnPart[] = [
  {
    id: "foundations",
    number: 1,
    title: "What Git Actually Is",
    summary:
      "Why the tool exists, how to install it without inheriting somebody else's config, and the three places a file can be at the same time.",
  },
  {
    id: "everyday",
    number: 2,
    title: "The Everyday Loop",
    summary:
      "Stage, commit, read the history back, undo the thing you regret, and keep the files that should never have been in there out.",
  },
  {
    id: "branching",
    number: 3,
    title: "Branches",
    summary:
      "A branch is smaller than you think and merging is stranger. Conflicts, rebases, and the one rule about rewriting history.",
  },
  {
    id: "github",
    number: 4,
    title: "GitHub, the Platform",
    summary:
      "Pushing to a second copy of your repository, proving you are allowed to, and everything a repository page holds besides the code.",
  },
  {
    id: "collaboration",
    number: 5,
    title: "Pull Requests and Review",
    summary:
      "The unit of work on GitHub, the review that gates it, and the three different things the green merge button can do.",
  },
  {
    id: "open-source",
    number: 6,
    title: "Working in the Open",
    summary:
      "Contributing to a project you do not own, letting a robot check the boring parts, and agreeing with your team on how any of it happens.",
  },
];

export const GITHUB_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "why-version-control",
    partId: "foundations",
    order: 1,
    title: "The Problem Git Exists to Solve",
    description:
      "Everyone invents version control before they learn it, and the version they invent is a folder full of files ending in final-v2-ACTUAL. Look at what that folder cannot answer, and at the three ideas Git replaces it with.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "the-folder-of-finals-is-version-control-done-badly", text: "The folder of finals is version control, done badly", level: 2 },
      { id: "a-commit-is-a-snapshot-with-a-name-and-a-parent", text: "A commit is a snapshot with a name and a parent", level: 2 },
      { id: "every-clone-is-a-complete-repository", text: "Every clone is a complete repository", level: 2 },
      { id: "git-is-not-github-and-the-difference-matters", text: "Git is not GitHub, and the difference matters", level: 2 },
      { id: "what-git-will-not-do-for-you", text: "What Git will not do for you", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "installing-git",
    partId: "foundations",
    order: 2,
    title: "Getting Git, and Telling It Who You Are",
    description:
      "Installing Git takes one command; configuring it takes four, and skipping them is why somebody's first hundred commits are authored by unknown@localhost. Set identity, default branch, editor, and line endings before the first commit rather than after.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Setup"],
    headings: [
      { id: "installing-git-is-one-command-on-every-system", text: "Installing Git is one command on every system", level: 2 },
      { id: "your-name-and-email-are-stamped-into-every-commit", text: "Your name and email are stamped into every commit", level: 2 },
      { id: "set-the-default-branch-to-main-once", text: "Set the default branch to main, once", level: 2 },
      { id: "line-endings-are-the-classic-cross-platform-trap", text: "Line endings are the classic cross-platform trap", level: 2 },
      { id: "config-lives-at-three-levels-and-the-closest-wins", text: "Config lives at three levels, and the closest one wins", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "repositories-and-the-three-trees",
    partId: "foundations",
    order: 3,
    title: "The Working Tree, the Index, and the Repository",
    description:
      "The staging area is the one part of Git nobody explains, and it is the reason git add exists as a separate step from git commit. Move one file through all three places and watch which commands touch which.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "git-init-creates-one-hidden-directory", text: "git init creates one hidden directory", level: 2 },
      { id: "a-file-exists-in-three-places-at-once", text: "A file exists in three places at once", level: 2 },
      { id: "the-staging-area-is-a-draft-of-your-next-commit", text: "The staging area is a draft of your next commit", level: 2 },
      { id: "git-status-is-the-instrument-you-never-stop-reading", text: "git status is the instrument you never stop reading", level: 2 },
      { id: "a-commit-freezes-the-index-not-the-folder", text: "A commit freezes the index, not the folder", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "staging-and-committing",
    partId: "everyday",
    order: 4,
    title: "Making a Commit Worth Reading",
    description:
      "git commit -am is fast and it is why so many histories are useless six months later. Stage deliberately, split one messy file into two honest commits, and write the message the way the people reading git log need it.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["repositories-and-the-three-trees"],
    tags: ["Everyday"],
    headings: [
      { id: "git-add-is-a-choice-not-a-formality", text: "git add is a choice, not a formality", level: 2 },
      { id: "add-patch-stages-part-of-a-file", text: "add --patch stages part of a file", level: 2 },
      { id: "a-message-has-a-subject-and-usually-a-body", text: "A message has a subject and, usually, a body", level: 2 },
      { id: "the-imperative-mood-is-a-convention-with-a-reason", text: "The imperative mood is a convention with a reason", level: 2 },
      { id: "one-commit-should-do-exactly-one-thing", text: "One commit should do exactly one thing", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "reading-history",
    partId: "everyday",
    order: 5,
    title: "Reading What Everyone Already Did",
    description:
      "git log unshaped is a firehose, and four flags turn it into the tool you actually wanted. Then diff, show, and blame answer the three questions you will keep asking about code you did not write.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["Everyday"],
    headings: [
      { id: "git-log-is-a-firehose-until-you-shape-it", text: "git log is a firehose until you shape it", level: 2 },
      { id: "the-graph-flag-draws-the-branches", text: "The graph flag draws the branches", level: 2 },
      { id: "diff-compares-two-things-you-have-to-name", text: "diff compares two things you have to name", level: 2 },
      { id: "show-is-log-and-diff-for-a-single-commit", text: "show is log and diff for a single commit", level: 2 },
      { id: "blame-answers-who-and-then-you-ask-why", text: "blame answers who, and then you ask why", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "undoing-things",
    partId: "everyday",
    order: 6,
    title: "Every Way to Undo, and Which One You Want",
    description:
      "Four commands undo four different things and the internet recommends them interchangeably. Name what you regret first — a file, a staging decision, a commit, a pushed commit — and the right command falls out of the answer.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["staging-and-committing"],
    tags: ["Everyday", "Interactive"],
    headings: [
      { id: "name-what-you-regret-before-picking-a-command", text: "Name what you regret before picking a command", level: 2 },
      { id: "restore-throws-away-work-and-does-not-ask", text: "restore throws away work, and does not ask", level: 2 },
      { id: "reset-moves-a-branch-pointer-backwards", text: "reset moves a branch pointer backwards", level: 2 },
      { id: "revert-adds-a-commit-that-cancels-an-old-one", text: "revert adds a commit that cancels an old one", level: 2 },
      { id: "reflog-is-the-safety-net-under-all-of-it", text: "reflog is the safety net under all of it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "ignoring-files",
    partId: "everyday",
    order: 7,
    title: "What Must Never Reach the Repository",
    description:
      "A .gitignore is a list of patterns matched against paths, and it has no effect whatsoever on a file Git is already tracking — which is the trap that leaks credentials. Toggle patterns against a real tree and watch which paths survive.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["Everyday", "Interactive"],
    headings: [
      { id: "gitignore-is-patterns-matched-against-paths", text: "gitignore is patterns, matched against paths", level: 2 },
      { id: "dependencies-and-build-output-are-noise", text: "Dependencies and build output are noise", level: 2 },
      { id: "a-committed-secret-is-a-leaked-secret", text: "A committed secret is a leaked secret", level: 2 },
      { id: "gitignore-does-nothing-to-an-already-tracked-file", text: "gitignore does nothing to an already tracked file", level: 2 },
      { id: "three-places-to-put-an-ignore-rule", text: "Three places to put an ignore rule", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "what-a-branch-is",
    partId: "branching",
    order: 8,
    title: "A Branch Is a Sticky Note on One Commit",
    description:
      "A branch is a file containing a forty-character hash, which is why creating one is instant and why deleting one deletes almost nothing. Build a history one commit at a time and watch the labels move.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["repositories-and-the-three-trees"],
    tags: ["Branching", "Interactive"],
    headings: [
      { id: "a-branch-is-a-file-containing-one-hash", text: "A branch is a file containing one hash", level: 2 },
      { id: "head-is-a-pointer-to-a-pointer", text: "HEAD is a pointer to a pointer", level: 2 },
      { id: "switching-branches-rewrites-your-working-tree", text: "Switching branches rewrites your working tree", level: 2 },
      { id: "detached-head-is-a-state-not-an-error", text: "Detached HEAD is a state, not an error", level: 2 },
      { id: "branch-names-are-cheap-so-make-them-say-something", text: "Branch names are cheap, so make them say something", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "merging-branches",
    partId: "branching",
    order: 9,
    title: "Bringing Two Histories Back Together",
    description:
      "Merging has a direction, and half of all merge confusion is standing on the wrong branch when you run it. See what a fast-forward really is, and why a three-way merge needs a third commit nobody mentions.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["what-a-branch-is"],
    tags: ["Branching"],
    headings: [
      { id: "merging-has-a-direction-and-you-stand-on-the-target", text: "Merging has a direction, and you stand on the target", level: 2 },
      { id: "a-fast-forward-is-not-really-a-merge", text: "A fast-forward is not really a merge", level: 2 },
      { id: "a-three-way-merge-invents-a-new-commit", text: "A three-way merge invents a new commit", level: 2 },
      { id: "the-merge-base-decides-what-counts-as-a-change", text: "The merge base decides what counts as a change", level: 2 },
      { id: "no-ff-keeps-the-shape-of-the-work", text: "--no-ff keeps the shape of the work", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "merge-conflicts",
    partId: "branching",
    order: 10,
    title: "When Git Refuses to Choose",
    description:
      "A conflict is not an error and not a failure — it is Git declining to guess which of two edits to the same lines you meant. Resolve one by hand, marker by marker, and see why the answer is sometimes neither side.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["merging-branches"],
    tags: ["Branching", "Interactive"],
    headings: [
      { id: "a-conflict-means-two-commits-changed-the-same-lines", text: "A conflict means two commits changed the same lines", level: 2 },
      { id: "the-markers-are-a-literal-edit-of-your-file", text: "The markers are a literal edit of your file", level: 2 },
      { id: "resolving-means-producing-the-file-you-want", text: "Resolving means producing the file you want", level: 2 },
      { id: "abort-is-always-available-and-always-safe", text: "Abort is always available and always safe", level: 2 },
      { id: "most-conflicts-are-prevented-not-resolved", text: "Most conflicts are prevented, not resolved", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "rebase-and-history",
    partId: "branching",
    order: 11,
    title: "Replaying Commits Somewhere Else",
    description:
      "Rebase does not move your commits; it copies them and abandons the originals, which is exactly why it is both tidy and dangerous. Compare the two histories side by side, then meet the one rule that keeps it safe.",
    level: "advanced",
    minutes: 13,
    prerequisites: ["merging-branches"],
    tags: ["Branching", "Interactive"],
    headings: [
      { id: "rebase-copies-commits-it-does-not-move-them", text: "Rebase copies commits, it does not move them", level: 2 },
      { id: "the-result-is-a-straight-line-and-a-small-lie", text: "The result is a straight line, and a small lie", level: 2 },
      { id: "never-rebase-commits-somebody-else-already-has", text: "Never rebase commits somebody else already has", level: 2 },
      { id: "interactive-rebase-is-where-you-tidy-up", text: "Interactive rebase is where you tidy up", level: 2 },
      { id: "force-with-lease-is-the-only-force-worth-typing", text: "force-with-lease is the only force worth typing", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "remotes-and-pushing",
    partId: "github",
    order: 12,
    title: "Your Repository Now Lives in Two Places",
    description:
      "A remote is a nickname for a URL, origin is a convention rather than a keyword, and the ahead/behind counts you trust are computed from a snapshot that may be hours old. Fetch, pull, and push one branch and watch each side move.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["what-a-branch-is"],
    tags: ["GitHub", "Interactive"],
    headings: [
      { id: "a-remote-is-a-nickname-for-a-url", text: "A remote is a nickname for a URL", level: 2 },
      { id: "origin-is-a-convention-not-a-keyword", text: "origin is a convention, not a keyword", level: 2 },
      { id: "fetch-and-pull-are-not-the-same-operation", text: "fetch and pull are not the same operation", level: 2 },
      { id: "push-needs-an-upstream-the-first-time", text: "push needs an upstream the first time", level: 2 },
      { id: "ahead-and-behind-are-counted-from-a-stale-copy", text: "Ahead and behind are counted from a stale copy", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "authentication",
    partId: "github",
    order: 13,
    title: "Proving You Are Allowed to Push",
    description:
      "GitHub stopped accepting account passwords over Git in 2021, and the error it gives instead sends people in the wrong direction. Pick between a token and an SSH key on purpose, and know where the machine cached the answer.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["remotes-and-pushing"],
    tags: ["GitHub", "Setup"],
    headings: [
      { id: "github-stopped-taking-your-password-in-2021", text: "GitHub stopped taking your password in 2021", level: 2 },
      { id: "a-token-is-a-password-with-a-scope-and-an-expiry", text: "A token is a password with a scope and an expiry", level: 2 },
      { id: "an-ssh-key-never-travels-over-the-wire", text: "An SSH key never travels over the wire", level: 2 },
      { id: "the-gh-cli-sets-all-of-this-up-in-one-command", text: "The gh CLI sets all of this up in one command", level: 2 },
      { id: "credentials-get-cached-and-that-is-the-confusion", text: "Credentials get cached, and that is the confusion", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "anatomy-of-a-repository",
    partId: "github",
    order: 14,
    title: "What a Repository Page Actually Holds",
    description:
      "Most of a GitHub repository is not code, and the parts that are not decide whether anybody can use the parts that are. Walk the README, the licence, releases, and the settings nobody sees until they matter.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["GitHub"],
    headings: [
      { id: "the-readme-is-the-front-door-and-it-is-just-a-file", text: "The README is the front door, and it is just a file", level: 2 },
      { id: "a-licence-is-what-makes-public-code-usable", text: "A licence is what makes public code usable", level: 2 },
      { id: "tags-and-releases-are-two-different-objects", text: "Tags and releases are two different objects", level: 2 },
      { id: "settings-hold-the-decisions-nobody-sees", text: "Settings hold the decisions nobody sees", level: 2 },
      { id: "stars-forks-and-watches-count-three-things", text: "Stars, forks, and watches count three different things", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "issues-and-tracking",
    partId: "github",
    order: 15,
    title: "Writing an Issue Somebody Can Act On",
    description:
      "\"It doesn't work\" is the most common issue on GitHub and the least useful. Learn the four things a maintainer needs, the filing system of labels and milestones, and the keyword that closes an issue from a commit message.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["GitHub", "Collaboration"],
    headings: [
      { id: "an-issue-is-a-conversation-with-a-state", text: "An issue is a conversation with a state", level: 2 },
      { id: "a-good-issue-has-a-reproduction-and-an-expectation", text: "A good issue has a reproduction and an expectation", level: 2 },
      { id: "labels-milestones-and-assignees-are-the-filing-system", text: "Labels, milestones, and assignees are the filing system", level: 2 },
      { id: "templates-make-good-issues-the-default", text: "Templates make good issues the default", level: 2 },
      { id: "closing-keywords-link-the-fix-to-the-report", text: "Closing keywords link the fix to the report", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "opening-a-pull-request",
    partId: "collaboration",
    order: 16,
    title: "The Pull Request, From Branch to Button",
    description:
      "A pull request is a merge you have not run yet, wrapped in a conversation. Follow one from the branch that starts it through the description, the draft state, and the checks that run against a commit you never made.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["merging-branches", "remotes-and-pushing"],
    tags: ["Collaboration", "Interactive"],
    headings: [
      { id: "a-pull-request-is-a-merge-you-have-not-run-yet", text: "A pull request is a merge you have not run yet", level: 2 },
      { id: "fork-and-pull-and-shared-branch-are-two-setups", text: "Fork-and-pull and shared-branch are two setups", level: 2 },
      { id: "the-description-is-read-more-often-than-the-diff", text: "The description is read more often than the diff", level: 2 },
      { id: "a-draft-pull-request-says-not-yet-on-purpose", text: "A draft pull request says not yet, on purpose", level: 2 },
      { id: "checks-run-against-the-merge-not-your-branch", text: "Checks run against the merge, not your branch", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "reviewing-a-pull-request",
    partId: "collaboration",
    order: 17,
    title: "Comments, Suggestions, and Requesting Review",
    description:
      "A review is a batch, not a stream of notifications, and the three buttons at the end of one are a promise about what happens next. Leave a line comment, turn it into a commit the author can accept, and learn what resolving a thread claims.",
    level: "intermediate",
    minutes: 14,
    prerequisites: ["opening-a-pull-request"],
    tags: ["Collaboration", "Interactive"],
    headings: [
      { id: "a-review-is-a-batch-not-one-comment-at-a-time", text: "A review is a batch, not one comment at a time", level: 2 },
      { id: "approve-comment-and-request-changes-mean-three-things", text: "Approve, comment, and request changes mean three things", level: 2 },
      { id: "a-suggested-change-is-a-commit-in-one-click", text: "A suggested change is a commit in one click", level: 2 },
      { id: "resolving-a-conversation-is-a-claim-so-make-it-true", text: "Resolving a conversation is a claim, so make it true", level: 2 },
      { id: "requesting-a-review-is-how-work-reaches-a-person", text: "Requesting a review is how work reaches a person", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "merging-a-pull-request",
    partId: "collaboration",
    order: 18,
    title: "Merge, Squash, or Rebase",
    description:
      "The green button hides three different operations that leave three different histories on your main branch, and most teams pick by accident. See what each one writes, then meet the protection rules that decide who may press it.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["rebase-and-history"],
    tags: ["Collaboration", "Interactive"],
    headings: [
      { id: "the-green-button-hides-three-operations", text: "The green button hides three operations", level: 2 },
      { id: "create-a-merge-commit-keeps-everything", text: "Create a merge commit keeps everything", level: 2 },
      { id: "squash-and-merge-turns-a-branch-into-one-commit", text: "Squash and merge turns a branch into one commit", level: 2 },
      { id: "rebase-and-merge-replays-with-no-merge-commit", text: "Rebase and merge replays with no merge commit", level: 2 },
      { id: "branch-protection-decides-who-may-press-it", text: "Branch protection decides who may press it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "contributing-to-open-source",
    partId: "open-source",
    order: 19,
    title: "Your First Contribution to Someone Else's Project",
    description:
      "The mechanics are a fork, a branch, and a pull request; everything hard about a first contribution is the part before that. Read the project's own rules, pick something small and real, and keep your fork from drifting.",
    level: "intermediate",
    minutes: 14,
    prerequisites: ["opening-a-pull-request"],
    tags: ["Open Source", "Interactive"],
    headings: [
      { id: "read-contributing-md-before-you-write-anything", text: "Read CONTRIBUTING.md before you write anything", level: 2 },
      { id: "fork-branch-push-pull-request-is-the-whole-loop", text: "Fork, branch, push, pull request is the whole loop", level: 2 },
      { id: "keeping-a-fork-in-sync-needs-a-second-remote", text: "Keeping a fork in sync needs a second remote", level: 2 },
      { id: "a-sign-off-or-a-cla-is-sometimes-required", text: "A sign-off or a CLA is sometimes required", level: 2 },
      { id: "the-smallest-useful-contribution-is-not-code", text: "The smallest useful contribution is not code", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "automating-with-actions",
    partId: "open-source",
    order: 20,
    title: "Making the Robot Do the Boring Part",
    description:
      "A workflow is a YAML file in one exact directory, and once it exists your tests run on somebody else's computer every time anyone pushes. Watch a run break into jobs and steps, and see where its verdict shows up on a pull request.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["opening-a-pull-request"],
    tags: ["Open Source", "Interactive"],
    headings: [
      { id: "a-workflow-is-a-yaml-file-in-one-exact-directory", text: "A workflow is a YAML file in one exact directory", level: 2 },
      { id: "events-decide-when-a-workflow-runs", text: "Events decide when a workflow runs", level: 2 },
      { id: "jobs-run-in-parallel-on-fresh-machines", text: "Jobs run in parallel, on fresh machines", level: 2 },
      { id: "a-failing-check-blocks-the-merge-which-is-the-point", text: "A failing check blocks the merge, which is the point", level: 2 },
      { id: "secrets-are-how-a-workflow-gets-a-password-safely", text: "Secrets are how a workflow gets a password safely", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "choosing-a-workflow",
    partId: "open-source",
    order: 21,
    title: "Picking How Your Team Actually Works",
    description:
      "Every Git argument a team has is really an argument about branch lifetime. Compare the three common answers, see which problem each was invented for, and decide what your repository should agree on.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["merging-a-pull-request"],
    tags: ["Open Source"],
    lastReviewed: "2026-08-07",
    headings: [
      { id: "every-workflow-argument-is-about-branch-lifetime", text: "Every workflow argument is about branch lifetime", level: 2 },
      { id: "github-flow-is-one-long-lived-branch", text: "GitHub Flow is one long-lived branch", level: 2 },
      { id: "trunk-based-development-shortens-the-branch", text: "Trunk-based development shortens the branch", level: 2 },
      { id: "git-flow-solves-a-release-problem-you-may-not-have", text: "Git Flow solves a release problem you may not have", level: 2 },
      { id: "the-workflow-is-an-agreement-not-a-setting", text: "The workflow is an agreement, not a setting", level: 2 },
    ],
    status: "published",
  },
];

export type { LearnChapter as GithubLesson } from "@/lib/learn-types";
