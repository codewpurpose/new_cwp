import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_ROBLOX_HREF } from "@/lib/links";

/**
 * The Roblox Studio track: fourteen lessons that build one obby and, on the way,
 * explain the engine underneath it.
 *
 * Scoped around a single project on purpose. Roblox is a large surface and a
 * beginner can spend a month reading about it without shipping anything; an obby
 * is small enough to finish and wide enough to need the data model, the
 * client/server split, events, debounce, and publishing — which is most of what
 * anybody needs before their second project.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const ROBLOX_PARTS: readonly LearnPart[] = [
  {
    id: "studio",
    number: 1,
    title: "Inside Studio",
    summary:
      "What the editor actually is, the live tree of objects behind it, and the handful of properties that decide what a block does.",
  },
  {
    id: "scripting",
    number: 2,
    title: "Scripting in Luau",
    summary:
      "Where code goes, what it can reach, and the fact that your game is running on two computers that do not agree by default.",
  },
  {
    id: "events",
    number: 3,
    title: "Events, and Doing Something Once",
    summary:
      "Nothing polls in Roblox — the engine tells you. Then it tells you forty more times, and you deal with that.",
  },
  {
    id: "obby",
    number: 4,
    title: "Building the Obby",
    summary:
      "The three classic obstacles, written properly: a laser that kills, a platform that drops you, and one you can only pass one way.",
  },
  {
    id: "shipping",
    number: 5,
    title: "Shipping It",
    summary:
      "Reading what the engine says when it breaks, and the settings that stand between a finished place and a friend being able to open it.",
  },
];

export const ROBLOX_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "what-is-roblox-studio",
    partId: "studio",
    order: 1,
    title: "What Studio Actually Is",
    description:
      "Studio looks like a level editor, and it is also a server, a client, and a publishing pipeline running together on your laptop. Notice which of those you are looking at before you write a line, because each one fails differently.",
    level: "beginner",
    minutes: 8,
    prerequisites: [],
    tags: ["Foundations"],
    headings: [
      { id: "one-program-wearing-three-hats", text: "One program wearing three hats", level: 2 },
      { id: "an-experience-is-not-a-file-on-your-laptop", text: "An experience is not a file on your laptop", level: 2 },
      { id: "the-four-windows-you-will-live-in", text: "The four windows you will live in", level: 2 },
      { id: "luau-is-lua-with-the-edges-filed-off", text: "Luau is Lua with the edges filed off", level: 2 },
      { id: "what-studio-will-happily-let-you-do-wrong", text: "What Studio will happily let you do wrong", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-data-model",
    partId: "studio",
    order: 2,
    title: "Everything Is an Instance in a Tree",
    description:
      "The Explorer looks like a list of folders and is really your running game, live, with every object in it. Click down through the tree and watch the path assemble itself exactly as a script would have to write it.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "the-explorer-is-the-game-not-a-file-list", text: "The Explorer is the game, not a file list", level: 2 },
      { id: "every-object-is-an-instance-with-a-class", text: "Every object is an instance with a class", level: 2 },
      { id: "parenting-is-what-makes-a-thing-exist", text: "Parenting is what makes a thing exist", level: 2 },
      { id: "services-are-the-branches-you-never-create", text: "Services are the branches you never create", level: 2 },
      { id: "naming-things-is-load-bearing-here", text: "Naming things is load-bearing here", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "parts-and-properties",
    partId: "studio",
    order: 3,
    title: "A Part, and the Four Properties That Matter",
    description:
      "A new block falls to the floor, drifts through walls, or hangs in mid-air, and a handful of checkboxes decide which. Toggle each one and watch the same part stop being the same object.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-part-is-the-only-building-block-there-is", text: "A part is the only building block there is", level: 2 },
      { id: "anchored-decides-whether-physics-applies", text: "Anchored decides whether physics applies", level: 2 },
      { id: "cancollide-decides-whether-anything-stops", text: "CanCollide decides whether anything stops", level: 2 },
      { id: "transparency-is-not-the-same-as-gone", text: "Transparency is not the same as gone", level: 2 },
      { id: "position-moves-a-part-cframe-also-turns-it", text: "Position moves a part; CFrame also turns it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "your-first-script",
    partId: "scripting",
    order: 4,
    title: "Where Code Goes, and Where It Runs",
    description:
      "The same eight lines of Luau will run for everyone, run for one player, or never run at all, decided entirely by which object you dropped them under. Move one script between four parents and see which of them start it.",
    level: "beginner",
    minutes: 10,
    prerequisites: ["the-data-model"],
    tags: ["Scripting", "Interactive"],
    headings: [
      { id: "a-script-is-an-instance-like-everything-else", text: "A script is an instance like everything else", level: 2 },
      { id: "three-script-classes-and-what-each-is-for", text: "Three script classes, and what each is for", level: 2 },
      { id: "where-you-put-it-decides-whether-it-runs", text: "Where you put it decides whether it runs", level: 2 },
      { id: "runcontext-loosened-the-old-rule", text: "RunContext loosened the old rule", level: 2 },
      { id: "print-is-your-first-and-best-instrument", text: "print is your first and best instrument", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "variables-and-values",
    partId: "scripting",
    order: 5,
    title: "Names, Values, and the Only Two Things That Are False",
    description:
      "Luau agrees with most languages about what a variable is and disagrees sharply about what counts as false. Hand it a zero and an empty string, and find that it treats both as true.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Scripting", "Interactive"],
    headings: [
      { id: "local-is-not-optional-decoration", text: "local is not optional decoration", level: 2 },
      { id: "the-types-you-will-actually-meet", text: "The types you will actually meet", level: 2 },
      { id: "nil-is-a-value-and-it-spreads", text: "nil is a value, and it spreads", level: 2 },
      { id: "only-nil-and-false-are-false", text: "Only nil and false are false", level: 2 },
      { id: "joining-strings-with-two-dots", text: "Joining strings with two dots", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "instances-and-properties",
    partId: "scripting",
    order: 6,
    title: "Reaching Into the Tree From Code",
    description:
      "script.Parent works beautifully until somebody renames a part, and then it fails with a message about indexing nil. Compare the four ways to find an object and see which survive a part that has not loaded yet.",
    level: "intermediate",
    minutes: 10,
    prerequisites: ["the-data-model"],
    tags: ["Scripting"],
    headings: [
      { id: "script-parent-is-the-shortest-path", text: "script.Parent is the shortest path, and the most fragile", level: 2 },
      { id: "dot-notation-is-a-lookup-that-can-fail", text: "Dot notation is a lookup that can fail", level: 2 },
      { id: "findfirstchild-asks-without-crashing", text: "FindFirstChild asks without crashing", level: 2 },
      { id: "waitforchild-is-for-things-that-arrive-late", text: "WaitForChild is for things that arrive late", level: 2 },
      { id: "setting-a-property-is-a-line-not-a-method", text: "Setting a property is a line, not a method", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "client-and-server",
    partId: "scripting",
    order: 7,
    title: "Two Computers, One Experience",
    description:
      "Your obby runs on Roblox's server and on every player's own machine at once, and by default they disagree. Move a part from a LocalScript, watch it move for exactly one person, and see why a killbrick cannot live there.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["your-first-script"],
    tags: ["Scripting"],
    headings: [
      { id: "the-server-is-the-copy-everybody-shares", text: "The server is the copy everybody shares", level: 2 },
      { id: "a-localscript-runs-on-one-machine-only", text: "A LocalScript runs on one machine only", level: 2 },
      { id: "replication-flows-one-way-by-default", text: "Replication flows one way by default", level: 2 },
      { id: "why-the-killbrick-has-to-be-a-server-script", text: "Why the killbrick has to be a server Script", level: 2 },
      { id: "test-the-split-before-you-trust-it", text: "Test the split before you trust it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "events-and-connections",
    partId: "events",
    order: 8,
    title: "Code That Waits to Be Told",
    description:
      "Nothing in an obby sits in a loop asking whether a player has arrived — the part announces it. Connect a function to Touched, walk across the part once, and count how many times it actually fired.",
    level: "intermediate",
    minutes: 10,
    prerequisites: ["your-first-script"],
    tags: ["Scripting", "Interactive"],
    headings: [
      { id: "an-event-is-something-the-engine-announces", text: "An event is something the engine announces", level: 2 },
      { id: "connect-hands-over-a-function-not-a-result", text: "Connect hands over a function, not a result", level: 2 },
      { id: "touched-passes-you-a-part-not-a-player", text: "Touched passes you a part, not a player", level: 2 },
      { id: "one-crossing-fires-touched-many-times", text: "One crossing fires Touched many times", level: 2 },
      { id: "a-connection-you-never-disconnect-stays", text: "A connection you never disconnect stays", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "debounce",
    partId: "events",
    order: 9,
    title: "Doing It Once, When the Engine Says It Forty Times",
    description:
      "One step onto a platform can fire Touched forty times in a quarter of a second, and now forty copies of your handler are running at once. Add a single boolean and watch thirty-nine of them turn around at the door.",
    level: "intermediate",
    minutes: 10,
    prerequisites: [],
    tags: ["Scripting"],
    headings: [
      { id: "the-bug-is-repetition-not-timing", text: "The bug is repetition, not timing", level: 2 },
      { id: "a-flag-that-says-i-am-already-busy", text: "A flag that says I am already busy", level: 2 },
      { id: "where-the-flag-has-to-live", text: "Where the flag has to live", level: 2 },
      { id: "one-flag-per-part-or-one-per-player", text: "One flag per part, or one per player", level: 2 },
      { id: "a-debounce-is-not-a-cooldown", text: "A debounce is not a cooldown", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-killbrick",
    partId: "obby",
    order: 10,
    title: "The Laser That Actually Kills",
    description:
      "A killbrick is four lines, and three of them exist to answer the question Touched refuses to: whose leg was that. Trace one touch from the limb it hit all the way back to the player it belonged to.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["instances-and-properties"],
    tags: ["Obby", "Interactive"],
    headings: [
      { id: "what-touched-actually-hands-you", text: "What Touched actually hands you", level: 2 },
      { id: "climbing-from-a-limb-to-a-humanoid", text: "Climbing from a limb to a Humanoid", level: 2 },
      { id: "findfirstchildwhichisa-is-the-safe-climb", text: "FindFirstChildWhichIsA is the safe climb", level: 2 },
      { id: "takedamage-and-health-are-different-choices", text: "TakeDamage and Health are different choices", level: 2 },
      { id: "getting-from-a-character-to-a-player", text: "Getting from a character to a Player", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-disappearing-platform",
    partId: "obby",
    order: 11,
    title: "The Platform That Drops You",
    description:
      "Making a part vanish is two properties; making it come back reliably is where every bug lives. Step on the naive version twice in a second and watch the platform stay gone for the rest of the round.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["debounce"],
    tags: ["Obby"],
    headings: [
      { id: "vanishing-is-two-properties-not-one", text: "Vanishing is two properties, not one", level: 2 },
      { id: "task-wait-is-the-one-to-reach-for", text: "task.wait is the one to reach for", level: 2 },
      { id: "restoring-it-in-the-function-that-removed-it", text: "Restoring it in the function that removed it", level: 2 },
      { id: "what-two-players-do-to-this-script", text: "What two players do to this script", level: 2 },
      { id: "telegraph-it-before-it-drops", text: "Telegraph it before it drops", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-one-way-platform",
    partId: "obby",
    order: 12,
    title: "Solid From Above, Empty From Below",
    description:
      "A one-way platform compares two heights and flips one property, and that version falls apart the moment a second player joins. Drag one player through it, add another, and watch a single shared property fail them both.",
    level: "advanced",
    minutes: 12,
    prerequisites: ["parts-and-properties"],
    tags: ["Obby", "Interactive"],
    headings: [
      { id: "the-idea-is-a-comparison-of-two-heights", text: "The idea is a comparison of two heights", level: 2 },
      { id: "read-the-players-root-not-their-limbs", text: "Read the player's root, not their limbs", level: 2 },
      { id: "cancollide-belongs-to-the-part-not-the-player", text: "CanCollide belongs to the part, not the player", level: 2 },
      { id: "collision-groups-are-the-real-fix", text: "Collision groups are the real fix", level: 2 },
      { id: "when-to-accept-the-simple-version", text: "When to accept the simple version", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "debugging-in-studio",
    partId: "shipping",
    order: 13,
    title: "Reading What Went Wrong",
    description:
      "The Output window names the script, the line, and the exact object that was nil, and most people close it. Read three real Roblox errors and find the single word in each that identifies the problem.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["your-first-script"],
    tags: ["Scripting", "Interactive"],
    headings: [
      { id: "the-output-window-is-the-whole-instrument", text: "The Output window is the whole instrument", level: 2 },
      { id: "print-warn-and-error-are-three-signals", text: "print, warn, and error are three signals", level: 2 },
      { id: "attempt-to-index-nil-is-the-one-you-will-see", text: "attempt to index nil is the one you will see", level: 2 },
      { id: "breakpoints-beat-scattering-print-statements", text: "Breakpoints beat scattering print statements", level: 2 },
      { id: "client-and-server-log-separately", text: "Client and server log separately", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "publishing-your-experience",
    partId: "shipping",
    order: 14,
    title: "Getting It in Front of People",
    description:
      "Publishing is one menu item, and four settings underneath it decide whether a friend can actually open what you made. Walk each one, in the order that stops a finished obby from being unplayable.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["Shipping"],
    lastReviewed: "2026-08-07",
    headings: [
      { id: "saving-to-file-is-not-publishing", text: "Saving to file is not publishing", level: 2 },
      { id: "a-place-lives-inside-an-experience", text: "A place lives inside an experience", level: 2 },
      { id: "private-by-default-and-what-changes-it", text: "Private by default, and what changes it", level: 2 },
      { id: "the-age-rating-questionnaire-is-mandatory", text: "The age rating questionnaire is mandatory", level: 2 },
      { id: "updating-a-live-experience-without-breaking-it", text: "Updating a live experience without breaking it", level: 2 },
    ],
    status: "published",
  },
];

export type { LearnChapter as RobloxLesson } from "@/lib/learn-types";
