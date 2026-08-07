import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ExplorerTree } from "@/components/roblox/ExplorerTree";

export function TheDataModelLesson() {
  return (
    <div>
      <Lead>
        The Explorer looks like a list of folders and is really your running game, live, with
        every object in it. Click down through the tree and watch the path assemble itself
        exactly as a script would have to write it.
      </Lead>

      <LessonSection
        id="the-explorer-is-the-game-not-a-file-list"
        title="The Explorer is the game, not a file list"
      >
        <P>
          A file browser shows you things that are sitting on a disk. The Explorer shows you
          things that <em>exist right now</em>, in memory, in the game. Delete a row from it
          while the game is running and that object is gone from the world in the same frame.
        </P>
        <P>
          This one idea explains most of Roblox. There is no separate scene format, no build
          step, and no compile. The tree you are looking at is the game, the whole game, and a
          script changing it is changing what players can see.
        </P>
        <P>
          The root of that tree is called <Strong>game</Strong>, and Roblox&apos;s
          documentation calls the whole structure the <Strong>data model</Strong>. Both names
          refer to the same thing you are clicking on.
        </P>
      </LessonSection>

      <LessonSection
        id="every-object-is-an-instance-with-a-class"
        title="Every object is an instance with a class"
      >
        <P>
          Every row in that tree is an <Strong>Instance</Strong>. A brick, a script, a sound,
          a player, a light — all instances, all with a <Strong>Name</Strong> you chose and a{" "}
          <Strong>ClassName</Strong> you did not.
        </P>
        <P>
          The distinction matters more than it looks. The name is a label you can change
          freely and duplicate carelessly. The class is what the object <em>is</em>, and it
          decides which properties exist on it — a <Strong>Part</Strong> has{" "}
          <Strong>CanCollide</Strong>, a <Strong>Script</Strong> does not, and no amount of
          renaming changes that.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = workspace.Obby.Laser

print(laser.Name)       --> Laser
print(laser.ClassName)  --> Part
print(laser:IsA("BasePart"))  --> true`}
        />
        <P>
          That last line is the useful one. <Strong>IsA</Strong> asks whether an object is a
          class <em>or anything descended from it</em>, so a <Strong>Part</Strong> answers true
          to <Strong>BasePart</Strong>. Checking with <Strong>IsA</Strong> rather than
          comparing <Strong>ClassName</Strong> to a string is what makes a script keep working
          when somebody swaps a Part for a MeshPart.
        </P>
      </LessonSection>

      <ExplorerTree />

      <LessonSection id="parenting-is-what-makes-a-thing-exist" title="Parenting is what makes a thing exist">
        <P>
          An instance is not in the world because you created it. It is in the world because
          its <Strong>Parent</Strong> points somewhere the world can reach.
        </P>
        <CodeBlock
          label="Luau"
          code={`local part = Instance.new("Part")
part.Size = Vector3.new(8, 1, 8)
-- Nothing is visible yet. The part exists, and it is nowhere.

part.Parent = workspace
-- Now it is in the game.`}
          lineTones={{ 2: "dim", 5: "ok" }}
        />
        <P>
          Setting <Strong>Parent</Strong> last is a real convention and not a stylistic one.
          The moment a part enters the workspace, physics and replication begin acting on it,
          so configuring it first means players never see a half-built object flicker into
          place.
        </P>
        <Callout tone="note" title="Removing something is the same idea, backwards">
          <Strong>part.Parent = nil</Strong> takes an object out of the world while keeping it
          in memory, which is how you hide something you intend to bring back.{" "}
          <Strong>part:Destroy()</Strong> parents it to nil <em>and</em> makes it unusable
          forever. Reach for Destroy unless you specifically want the object again.
        </Callout>
      </LessonSection>

      <LessonSection
        id="services-are-the-branches-you-never-create"
        title="Services are the branches you never create"
      >
        <P>
          Directly under <Strong>game</Strong> sit a fixed set of top-level objects called{" "}
          <Strong>services</Strong>. You cannot make one, delete one, or have two. Each is a
          department with a job.
        </P>
        <LabelRows
          rows={[
            {
              label: "Workspace",
              text: "Everything with a physical presence. If a player can see it or bump into it, it is in here.",
            },
            {
              label: "Players",
              text: "One Player object per person connected. Not their character — the account behind it.",
            },
            {
              label: "ServerScriptService",
              text: "Server code. Never replicated to any client, so players cannot read what is in it.",
            },
            {
              label: "ReplicatedStorage",
              text: "A shelf both sides can reach. Shared modules and things you intend to clone live here.",
            },
            {
              label: "StarterPlayer",
              text: "The template for each player: the scripts and gear they get a copy of when they join.",
            },
          ]}
        />
        <P>
          The correct way to reach one from a script is{" "}
          <Strong>{'game:GetService("Players")'}</Strong> rather than{" "}
          <Strong>game.Players</Strong>. Both usually work; only the first still works if the
          service has not been created yet, which is a real situation in an empty place.
        </P>
        <CodeBlock
          label="Luau"
          code={`local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- workspace is the one exception: it has its own global, all lowercase.
local baseplate = workspace.Baseplate`}
        />
      </LessonSection>

      <LessonSection id="naming-things-is-load-bearing-here" title="Naming things is load-bearing here">
        <P>
          In most languages a variable name is for humans. In Roblox an object&apos;s name is
          how code finds it, which means renaming a part in the Explorer can break a script
          across the game and produce no warning anywhere.
        </P>
        <P>
          Worse, names are not unique. Nothing stops you having four parts called{" "}
          <Strong>Part</Strong> inside one model, and <Strong>model.Part</Strong> will return
          one of them without telling you there were others. It is not random, but it is not
          something you should rely on either.
        </P>
        <Callout tone="tip" title="Name things after what they do">
          <Strong>Laser</Strong>, <Strong>DropPlatform</Strong>,{" "}
          <Strong>CheckpointThree</Strong>. Not <Strong>Part</Strong>,{" "}
          <Strong>Part2</Strong>, <Strong>Part3</Strong>. You are not naming these for
          tidiness — you are writing the identifiers your scripts will use, and every duplicate
          is a bug waiting for the day somebody moves something.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "The Explorer is the live game, not a file list. Deleting a row deletes the object from the world in that frame.",
          "Every object is an Instance with a Name you chose and a ClassName you did not. The class decides which properties exist.",
          "Use :IsA() rather than comparing ClassName, so a script keeps working when a Part becomes a MeshPart.",
          "An object exists in the world because its Parent points somewhere reachable — not because you created it.",
          "Configure an instance fully, then set Parent last, so players never see a half-built object appear.",
          "Parent = nil removes an object but keeps it usable; :Destroy() removes it permanently. Prefer Destroy.",
          "Services are the fixed top-level branches. Reach them with game:GetService(\"Name\"); workspace is the one with its own global.",
          "Object names are how code finds things, and they are not unique. Renaming a part can silently break scripts across the game.",
        ]}
      />
    </div>
  );
}
