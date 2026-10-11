import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the roblox track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-roblox-studio": [
    {
      q: "You spent an afternoon editing a published obby and pressed Ctrl+S to a .rbxl file on your desktop, but never published. What do players see?",
      options: [
        "The old version, because only publishing changes Roblox's hosted copy",
        "Your new version, because saving a file also uploads it",
        "Your new version, once Studio's autosave syncs it overnight",
        "Nothing, because saving locally takes the live place offline",
      ],
      answer: 0,
    },
    {
      q: "A script seems to do nothing when you press Play. What does the chapter say to check first?",
      options: [
        "Whether the script ran at all, using the Output window and a print at the top",
        "Whether the place has been published to Roblox yet",
        "Whether the Toolbox has a newer version of the script",
        "Whether the script uses Lua syntax instead of Luau syntax",
      ],
      answer: 0,
    },
    {
      q: "Which pair of terms is described correctly?",
      options: [
        "A place is one level; an experience is what players search for and can contain several places",
        "An experience is one level; a place is what players search for and holds several experiences",
        "A place is a saved .rbxl file; an experience is the same file once it is published",
        "A place and an experience are two names for exactly the same thing",
      ],
      answer: 0,
    },
    {
      q: "Why does every example in this track use task.wait() rather than wait()?",
      options: [
        "The older wait() is throttled to about 30Hz and drifts further when the server is busy",
        "wait() was removed from Luau and now throws an error when called",
        "task.wait() pauses every script in the game, which keeps timing in sync",
        "wait() only works inside LocalScripts, and these examples run on the server",
      ],
      answer: 0,
    },
  ],

  "the-data-model": [
    {
      q: "A script creates a part with Instance.new(\"Part\") and sets its Size, but nobody can see it. What is missing?",
      options: [
        "Setting part.Parent to workspace (or something inside it)",
        "Calling part:Destroy() and then re-creating it",
        "Giving the part a Name that is unique in the game",
        "Setting part.ClassName to \"Part\" after creating it",
      ],
      answer: 0,
    },
    {
      q: "Why is laser:IsA(\"BasePart\") a better check than laser.ClassName == \"Part\"?",
      options: [
        "IsA also returns true for classes descended from BasePart, so a MeshPart still passes",
        "IsA is the only one of the two that works on the server",
        "ClassName can be renamed in the Explorer, while IsA cannot",
        "IsA checks the Name property, which is more reliable than the class",
      ],
      answer: 0,
    },
    {
      q: "You want to hide a part now and bring the same object back later. Which line fits?",
      options: [
        "part.Parent = nil",
        "part:Destroy()",
        "part.ClassName = nil",
        "part.Name = \"\"",
      ],
      answer: 0,
    },
    {
      q: "Which is the recommended way to get the Players service in a script?",
      options: [
        "game:GetService(\"Players\")",
        "Instance.new(\"Players\")",
        "workspace.Players",
        "script.Players",
      ],
      answer: 0,
    },
  ],

  "parts-and-properties": [
    {
      q: "You build a floating course, press Play, and it all collapses onto the baseplate. Which property did you forget?",
      options: ["Anchored", "CanCollide", "Transparency", "CFrame"],
      answer: 0,
    },
    {
      q: "A part has Transparency = 1 and CanCollide = true. What happens when a player walks into it?",
      options: [
        "They are blocked by an invisible wall",
        "They walk straight through it",
        "The part falls because it is no longer anchored",
        "The part is removed from the Explorer",
      ],
      answer: 0,
    },
    {
      q: "Which property combination makes an invisible checkpoint trigger that players can walk through?",
      options: [
        "Anchored on, CanCollide off, Transparency = 1",
        "Anchored off, CanCollide on, Transparency = 0",
        "Anchored on, CanCollide on, Transparency = 1",
        "Anchored off, CanCollide off, Transparency = 0",
      ],
      answer: 0,
    },
    {
      q: "You need a spinning obstacle turned 45 degrees around the Y axis. Which property can express that?",
      options: [
        "CFrame, because it holds rotation as well as position",
        "Position, because it holds X, Y and Z",
        "Size, because a wider part reads as turned",
        "Anchored, because it locks the part's facing",
      ],
      answer: 0,
    },
  ],

  "your-first-script": [
    {
      q: "You put a LocalScript directly in Workspace. What happens when the game runs?",
      options: [
        "Nothing — a LocalScript does not run there, and no warning appears",
        "It runs once on the server instead",
        "It runs on every player's machine",
        "Studio shows a red error explaining the placement",
      ],
      answer: 0,
    },
    {
      q: "A ModuleScript in ReplicatedStorage has no return line at the bottom. What happens when a Script requires it?",
      options: [
        "require hands back nil, and the error appears in the calling script",
        "The module runs on its own and returns its last function",
        "Studio refuses to save the ModuleScript",
        "require waits forever, as if it were WaitForChild",
      ],
      answer: 0,
    },
    {
      q: "Where should a killbrick's Script live so it duplicates along with the laser part?",
      options: [
        "Inside the laser part in Workspace",
        "In StarterPlayerScripts",
        "In ReplicatedStorage",
        "Anywhere — placement does not affect whether it runs",
      ],
      answer: 0,
    },
    {
      q: "You added a print at the top of a script and one inside its Touched handler. Only the first appears. What does that tell you?",
      options: [
        "The script started, but the event never fired — look at the part",
        "The script never started — look at where it is placed",
        "Both prints ran, but Output hides repeated lines",
        "The script crashed before reaching its first line",
      ],
      answer: 0,
    },
  ],

  "variables-and-values": [
    {
      q: "A script runs local coins = 0 and then if coins then print(\"yes\") else print(\"no\") end. What prints?",
      options: ["yes", "no", "nil", "An error, because 0 is not a boolean"],
      answer: 0,
    },
    {
      q: "Which of these values does Luau treat as false in an if?",
      options: ["nil", "0", "\"\" (an empty string)", "{} (an empty table)"],
      answer: 0,
    },
    {
      q: "Which line joins a string and a name correctly in Luau?",
      options: [
        "print(\"Welcome, \" .. name)",
        "print(\"Welcome, \" + name)",
        "print(\"Welcome, \" & name)",
        "print(\"Welcome, \".join(name))",
      ],
      answer: 0,
    },
    {
      q: "platform is nil because of a typo in FindFirstChild. Which line errors?",
      options: [
        "platform.CanCollide = false",
        "print(\"platform:\", platform)",
        "if platform then print(\"found\") end",
        "local p = platform",
      ],
      answer: 0,
    },
  ],

  "instances-and-properties": [
    {
      q: "Obby exists but has no child called Laser. What happens when workspace.Obby.Laser.Transparency = 0.5 runs?",
      options: [
        "It throws: Laser is not a valid member of Model \"Workspace.Obby\"",
        "It quietly does nothing and carries on",
        "It creates a new part called Laser and sets its Transparency",
        "It waits until a child called Laser appears",
      ],
      answer: 0,
    },
    {
      q: "local laser = workspace.Obby:FindFirstChild(\"Laser\") returns nil, and the next line is laser.Transparency = 0.5. What error do you get?",
      options: [
        "attempt to index nil with 'Transparency'",
        "Laser is not a valid member of Model \"Workspace.Obby\"",
        "attempt to call a nil value",
        "Infinite yield possible on 'Laser'",
      ],
      answer: 0,
    },
    {
      q: "A LocalScript needs a part that is definitely in the place but may not have replicated yet. Which call fits?",
      options: [
        "workspace:WaitForChild(\"Obby\")",
        "workspace:FindFirstChild(\"Obby\")",
        "workspace.Obby",
        "workspace:FindFirstChildWhichIsA(\"Obby\")",
      ],
      answer: 0,
    },
    {
      q: "Why does part.Material = \"Neon\" fail?",
      options: [
        "Material wants an Enum item, such as Enum.Material.Neon, not a string",
        "Material can only be changed in the Properties panel, not from code",
        "Material must be set with a method, part:SetMaterial(\"Neon\")",
        "Neon only exists on MeshParts, not on Parts",
      ],
      answer: 0,
    },
  ],

  "client-and-server": [
    {
      q: "A LocalScript sets the laser's BrickColor to green. What do the other players see?",
      options: [
        "The original red — the change stays on that one client",
        "Green, because the change replicates to everyone",
        "Green, but only after the server confirms it",
        "Nothing, because the laser disappears for them",
      ],
      answer: 0,
    },
    {
      q: "Why must the killbrick be a server Script rather than a LocalScript?",
      options: [
        "A client-side kill never reaches the server, and the player controls whether it runs",
        "LocalScripts cannot connect to Touched events at all",
        "Server Scripts run faster, so the kill lands before the player escapes",
        "LocalScripts cannot read a Humanoid's Health",
      ],
      answer: 0,
    },
    {
      q: "A client wants the server to do something on its behalf. How should it ask, and how should the server treat the request?",
      options: [
        "Through a RemoteEvent, and the server treats it as untrusted",
        "Through a RemoteEvent, and the server does whatever it is told",
        "By changing a part, which replicates up to the server",
        "By printing a message, which the server reads from Output",
      ],
      answer: 0,
    },
    {
      q: "How many copies of the game are running when six players are in your obby?",
      options: ["Seven: one server and six clients", "One, shared by everybody", "Six, one per player", "Twelve: a server and a client per player"],
      answer: 0,
    },
  ],

  "events-and-connections": [
    {
      q: "Which line correctly connects the onTouch function?",
      options: [
        "part.Touched:Connect(onTouch)",
        "part.Touched:Connect(onTouch())",
        "part.Touched = onTouch",
        "part:Touched(onTouch)",
      ],
      answer: 0,
    },
    {
      q: "A player's leg touches the laser. What does the Touched handler receive as its argument?",
      options: [
        "The leg part itself, such as LeftLowerLeg",
        "The Player object for that person",
        "The character's Humanoid",
        "The laser part that was touched",
      ],
      answer: 0,
    },
    {
      q: "A coin script prints once per Touched. One player steps onto it once. What should you expect to see?",
      options: [
        "Many prints — one step fires Touched many times",
        "Exactly one print",
        "No prints until the player steps off",
        "Two prints: one on contact and one on release",
      ],
      answer: 0,
    },
    {
      q: "You want a handler to run only on the first touch, ever. What does the chapter show?",
      options: [
        "Store the connection Connect returns and call connection:Disconnect() inside the handler",
        "Call part:Destroy() at the top of the handler",
        "Wrap the handler in a while true do loop",
        "Connect the same function twice so they cancel out",
      ],
      answer: 0,
    },
  ],

  "debounce": [
    {
      q: "A debounce declares local busy = false as the first line inside the Touched handler, then checks if busy then return end. Why does it never block anything?",
      options: [
        "busy is declared inside the handler, so every event gets a fresh false",
        "busy should be set to nil instead of false",
        "The check should come after the work, not before it",
        "Touched handlers cannot read boolean variables",
      ],
      answer: 0,
    },
    {
      q: "A coin uses one shared busy flag. A second player touches it while the first player's run is still waiting. What does the second player get?",
      options: [
        "Nothing — the flag is still set, so their handler returns immediately",
        "A coin, because each player has their own flag",
        "Two coins, to make up for the wait",
        "An error, because the flag is locked",
      ],
      answer: 0,
    },
    {
      q: "Why does the per-player cooldown table clear each entry with nil rather than false?",
      options: [
        "nil removes the key, so the table does not keep one entry for every player who ever visited",
        "false is treated as true in Luau, so the cooldown would never end",
        "Tables cannot store the value false",
        "nil makes the player's character respawn",
      ],
      answer: 0,
    },
    {
      q: "Which statement fits the difference the chapter draws between a debounce and a cooldown?",
      options: [
        "A debounce collapses one action's burst of events; a cooldown is a gameplay rule about how often something may happen",
        "A debounce is for the server; a cooldown is for LocalScripts",
        "A debounce uses task.wait; a cooldown uses wait",
        "They are two names for the same technique",
      ],
      answer: 0,
    },
  ],

  "the-killbrick": [
    {
      q: "Why is otherPart.Parent:FindFirstChildWhichIsA(\"Humanoid\") safer than otherPart.Parent.Humanoid?",
      options: [
        "It searches by class and returns nil instead of throwing when nothing is found",
        "It searches the whole game, so it always finds a Humanoid",
        "It runs on the client, where Humanoids load sooner",
        "It also heals the player before damaging them",
      ],
      answer: 0,
    },
    {
      q: "A player wearing a top hat walks into the laser and only the hat's Handle touches it. Why does otherPart.Parent:FindFirstChildWhichIsA(\"Humanoid\") find nothing?",
      options: [
        "The Handle's parent is the Accessory, and the Humanoid is the Accessory's sibling",
        "Hats are not allowed to fire Touched events",
        "The Humanoid is a child of the Handle, one level down",
        "Accessories delete the Humanoid while they are worn",
      ],
      answer: 0,
    },
    {
      q: "A player has just spawned with a ForceField. Which line will NOT kill them?",
      options: [
        "humanoid:TakeDamage(100)",
        "humanoid.Health = 0",
        "humanoid.Health = humanoid.Health - humanoid.MaxHealth",
        "humanoid.Health = -1",
      ],
      answer: 0,
    },
    {
      q: "Players:GetPlayerFromCharacter(character) returns nil. What is the most likely reason?",
      options: [
        "The model is not a real player's character — an NPC, for example",
        "The player is wearing an accessory",
        "The character's Humanoid has already been damaged",
        "The script is a server Script instead of a LocalScript",
      ],
      answer: 0,
    },
  ],

  "the-disappearing-platform": [
    {
      q: "A platform sets CanCollide = false but leaves Transparency at 0. What do players experience?",
      options: [
        "A fully visible platform they drop straight through",
        "An invisible platform they can still stand on",
        "A platform that vanishes and blocks them like a wall",
        "Nothing changes at all",
      ],
      answer: 0,
    },
    {
      q: "In the complete script, why is the Humanoid check placed before busy = true?",
      options: [
        "So a falling brick does not claim the flag and lock the platform while doing nothing",
        "So the Humanoid check runs on the client instead of the server",
        "Because busy can only be set after the platform is transparent",
        "Because Luau requires every if to come before any assignment",
      ],
      answer: 0,
    },
    {
      q: "A second player steps on the platform half a second after the first, while the cycle is running. What happens?",
      options: [
        "Nothing new — they get the rest of the current cycle, not a fresh one",
        "The platform restarts a fresh three-second cycle for them",
        "The platform vanishes only for the second player",
        "The script errors because busy is already true",
      ],
      answer: 0,
    },
    {
      q: "Your warning step turns the platform red. What must the restore step also do?",
      options: [
        "Set BrickColor back to the original value",
        "Destroy the platform and create a new one",
        "Set Transparency to 0.6 again",
        "Disconnect the Touched connection",
      ],
      answer: 0,
    },
  ],

  "the-one-way-platform": [
    {
      q: "Why compare the HumanoidRootPart's height rather than the height of the part Touched handed you?",
      options: [
        "The part from Touched is usually a foot, which is level with the platform when landing",
        "Touched never hands you a part with a Position",
        "The HumanoidRootPart is always exactly at the platform's height",
        "Only the HumanoidRootPart is allowed to change CanCollide",
      ],
      answer: 0,
    },
    {
      q: "A platform is 4 studs thick. What is the height of its top surface?",
      options: [
        "platform.Position.Y + platform.Size.Y / 2",
        "platform.Position.Y",
        "platform.Position.Y + platform.Size.Y",
        "platform.Size.Y / 2",
      ],
      answer: 0,
    },
    {
      q: "Why does the simple CanCollide version break when a second player joins?",
      options: [
        "CanCollide belongs to the part, so one value is shared by every player",
        "Touched only fires for the first player in the server",
        "Two players make the platform unanchored",
        "The HumanoidRootPart is renamed when a second player joins",
      ],
      answer: 0,
    },
    {
      q: "Using collision groups, how do you let one player pass through the platform?",
      options: [
        "Set CollisionGroup on every BasePart of their character to the group that ignores the platform",
        "Set CollisionGroup on the character Model itself",
        "Set the platform's CanCollide to false for that player only",
        "Register a new collision group every time they touch it",
      ],
      answer: 0,
    },
  ],

  "debugging-in-studio": [
    {
      q: "Output shows: KillScript:6: attempt to index nil with 'Health'. Line 6 is humanoid.Health = 0. What was nil?",
      options: [
        "humanoid — Health is the field you asked the nil for",
        "Health — the property is misspelled",
        "The KillScript itself",
        "Line 6 — the line is empty",
      ],
      answer: 0,
    },
    {
      q: "Which call reports a problem in orange but lets the script keep going?",
      options: ["warn(...)", "error(...)", "print(...)", "assert(false, ...)"],
      answer: 0,
    },
    {
      q: "In a two-player test, a print in a server Script does not show up in a client's Output window. Why?",
      options: [
        "The server and each client have their own Output",
        "Server Scripts are not allowed to print",
        "Prints only appear after the place is published",
        "The client filters out every white message",
      ],
      answer: 0,
    },
    {
      q: "WaitForChild(\"Platfrom\") prints 'Infinite yield possible'. What is going on?",
      options: [
        "It is a warning: the script is still waiting, and the name probably has a typo",
        "It is a fatal error, and the script has stopped",
        "The child was found but is the wrong class",
        "The place is too large and needs to be published",
      ],
      answer: 0,
    },
  ],

  "publishing-your-experience": [
    {
      q: "You published your obby, but a friend still cannot open it. What should you check first?",
      options: [
        "Whether the experience is set to Public in its permissions",
        "Whether you saved a .rbxl file to your desktop",
        "Whether the place has a second place inside it",
        "Whether your friend has opened Studio",
      ],
      answer: 0,
    },
    {
      q: "Why can't you confirm that other people can open the experience by testing from your own account?",
      options: [
        "The owner can always open their own experience, whatever the permissions say",
        "Roblox blocks owners from joining their own experiences",
        "Your account sees the saved file instead of the published place",
        "Testing from the owner account resets the age rating",
      ],
      answer: 0,
    },
    {
      q: "Your obby has chat turned on. How does that affect the maturity questionnaire?",
      options: [
        "Chat counts as player interaction, so answer that question accordingly",
        "Chat is ignored by the questionnaire",
        "Chat automatically makes the experience 17+",
        "Chat means the questionnaire is no longer required",
      ],
      answer: 0,
    },
    {
      q: "A publish over your live obby broke the course. What does Roblox give you to recover?",
      options: [
        "Place version history, which can restore an earlier version from the Creator Dashboard",
        "An undo button on every running server",
        "Nothing — a publish can never be reversed",
        "Studio's local autosave, which republishes itself automatically",
      ],
      answer: 0,
    },
  ],
};
