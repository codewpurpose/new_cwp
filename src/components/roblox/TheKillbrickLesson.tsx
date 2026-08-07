import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { KillbrickFlow } from "@/components/roblox/KillbrickFlow";

export function TheKillbrickLesson() {
  return (
    <div>
      <Lead>
        A killbrick is four lines, and three of them exist to answer the question Touched
        refuses to: whose leg was that. Trace one touch from the limb it hit all the way back
        to the player it belonged to.
      </Lead>

      <LessonSection id="what-touched-actually-hands-you" title="What Touched actually hands you">
        <P>
          You know the shape already. What matters here is being precise about the argument,
          because everything else in the chapter follows from it.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = script.Parent

laser.Touched:Connect(function(otherPart)
    print(otherPart.Name)         --> LeftLowerLeg
    print(otherPart.ClassName)    --> MeshPart
    print(otherPart.Parent.Name)  --> Amara
end)`}
        />
        <P>
          A leg. Not a player, not a character, not something with health. The player&apos;s
          name is one level up, and the thing that can actually be damaged is up there too —
          as a sibling of the leg, not as one of its children.
        </P>
        <P>
          A character model is flat: every limb, the <Strong>Humanoid</Strong>, and the{" "}
          <Strong>HumanoidRootPart</Strong> all sit as direct children of the model. That
          flatness is what makes one step up exactly the right distance, and it is also what
          breaks when a hat is involved.
        </P>
      </LessonSection>

      <LessonSection id="climbing-from-a-limb-to-a-humanoid" title="Climbing from a limb to a Humanoid">
        <P>
          The <Strong>Humanoid</Strong> is the object that makes a model a character. It holds{" "}
          <Strong>Health</Strong>, controls walking and jumping, and is what dies. Damage is
          something you do to a Humanoid, never to a part.
        </P>
        <CodeBlock
          label="Luau"
          code={`laser.Touched:Connect(function(otherPart)
    local humanoid = otherPart.Parent.Humanoid   -- works, and is fragile
    humanoid.Health = 0
end)`}
          lineTones={{ 1: "warn" }}
        />
        <P>
          This is the version in most tutorials and it is one falling brick away from breaking
          the laser for everybody. A brick&apos;s parent is the Workspace, the Workspace has no
          child called <Strong>Humanoid</Strong>, so the lookup returns nil and the next line
          throws. An unhandled error inside a <Strong>Touched</Strong> handler kills that
          invocation — and the laser now has a stack trace in the Output window and a bug
          nobody can reproduce on purpose.
        </P>
      </LessonSection>

      <LessonSection
        id="findfirstchildwhichisa-is-the-safe-climb"
        title="FindFirstChildWhichIsA is the safe climb"
      >
        <P>
          Two changes make it correct. Search by <em>class</em> rather than by name, and check
          the result before using it.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = script.Parent

laser.Touched:Connect(function(otherPart)
    local humanoid = otherPart.Parent:FindFirstChildWhichIsA("Humanoid")
    if not humanoid then return end

    humanoid:TakeDamage(100)
end)`}
          lineTones={{ 3: "ok", 4: "ok" }}
        />
        <P>
          Searching by class rather than name matters because nothing guarantees the Humanoid is
          called &quot;Humanoid&quot;. It usually is, and a custom character rig or a badly
          behaved free model can rename it, at which point a name lookup fails and a class
          lookup does not.
        </P>
        <P>
          The <Strong>if not humanoid then return end</Strong> is the whole safety of the
          script. It is the guard from the chapter on nil, in the place it matters most.
        </P>
      </LessonSection>

      <KillbrickFlow />

      <P>
        The hat case is worth dwelling on, because it is a real bug that ships in real
        experiences. A hat&apos;s <Strong>Handle</Strong> lives inside an{" "}
        <Strong>Accessory</Strong>, which lives inside the character — so{" "}
        <Strong>otherPart.Parent</Strong> is the Accessory, and the Humanoid is the
        Accessory&apos;s sibling rather than its child. The search finds nothing and the player
        walks through your laser wearing a top hat.
      </P>

      <P>
        Do not fix it with a second <Strong>.Parent</Strong>. That would break the ordinary leg
        case, which is far more common. Search upward instead, and both work.
      </P>

      <CodeBlock
        label="Luau"
        code={`laser.Touched:Connect(function(otherPart)
    local character = otherPart:FindFirstAncestorOfClass("Model")
    if not character then return end

    local humanoid = character:FindFirstChildWhichIsA("Humanoid")
    if not humanoid then return end

    humanoid:TakeDamage(100)
end)`}
      />

      <LessonSection
        id="takedamage-and-health-are-different-choices"
        title="TakeDamage and Health are different choices"
      >
        <P>
          Both will kill a player and they are not interchangeable.
        </P>
        <CompareGrid
          items={[
            {
              title: "humanoid:TakeDamage(n)",
              tone: "positive",
              children: (
                <P>
                  Subtracts <Strong>n</Strong>, and respects a ForceField. A player who has just
                  spawned is protected, which is what stops a laser next to the spawn point
                  killing people before they can move.
                </P>
              ),
            },
            {
              title: "humanoid.Health = 0",
              tone: "caution",
              children: (
                <P>
                  Sets health directly and ignores every protection. Correct for a void floor
                  where nothing should survive; wrong as a default, because it makes spawn
                  protection meaningless.
                </P>
              ),
            },
          ]}
        />
        <P>
          Prefer <Strong>TakeDamage</Strong> unless you have specifically decided that nothing
          should save the player. Passing 100 kills a default character outright, and passing 25
          gives you a laser that takes four hits — which is a design decision you now get to
          make.
        </P>
        <Callout tone="warning" title="MaxHealth is not always 100">
          <Strong>TakeDamage(100)</Strong> assumes the default. If anything in your experience
          changes <Strong>MaxHealth</Strong>, use{" "}
          <Strong>humanoid:TakeDamage(humanoid.MaxHealth)</Strong> so the laser stays lethal
          rather than becoming a scratch.
        </Callout>
      </LessonSection>

      <LessonSection id="getting-from-a-character-to-a-player" title="Getting from a character to a Player">
        <P>
          A character is a model in the Workspace. A <Strong>Player</Strong> is the account
          behind it, living in the Players service, and holding everything that should survive
          a death — leaderstats, checkpoints, settings.
        </P>
        <CodeBlock
          label="Luau"
          code={`local Players = game:GetService("Players")
local laser = script.Parent

laser.Touched:Connect(function(otherPart)
    local character = otherPart:FindFirstAncestorOfClass("Model")
    if not character then return end

    local player = Players:GetPlayerFromCharacter(character)
    if not player then return end   -- an NPC has a Humanoid and no Player

    local humanoid = character:FindFirstChildWhichIsA("Humanoid")
    if humanoid then
        humanoid:TakeDamage(humanoid.MaxHealth)
        print(player.Name, "hit the laser")
    end
end)`}
        />
        <P>
          <Strong>GetPlayerFromCharacter</Strong> returns nil for anything that is not a real
          player&apos;s character, which makes it a precise filter as well as a lookup. An NPC
          with a Humanoid passes every earlier check and fails this one — so if you want the
          laser to kill NPCs too, this is the line you leave out on purpose.
        </P>
        <Callout tone="tip" title="Where this script belongs">
          A <Strong>Script</Strong>, inside the laser part, so it duplicates with the part. Not
          a LocalScript: a client-side kill is not real, as the previous chapter showed.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Touched hands you a part. The player's name is one level up, and the damageable object is a sibling of that part.",
          "A character model is flat — every limb, the Humanoid, and the HumanoidRootPart are direct children of it.",
          "otherPart.Parent.Humanoid throws the moment a falling brick touches the laser, and an unhandled error kills that invocation.",
          "FindFirstChildWhichIsA(\"Humanoid\") searches by class, so it survives a rig whose Humanoid was renamed.",
          "if not humanoid then return end is the whole safety of the script. Without it, one brick produces a stack trace.",
          "A hat's Handle is one level deeper than a limb. FindFirstAncestorOfClass(\"Model\") handles both; a second .Parent breaks the common case.",
          "TakeDamage respects ForceFields and spawn protection; setting Health = 0 ignores everything. Prefer TakeDamage.",
          "Use TakeDamage(humanoid.MaxHealth) rather than a literal 100, in case MaxHealth is not the default.",
          "GetPlayerFromCharacter returns nil for NPCs, which makes it a filter as well as a lookup.",
        ]}
      />
    </div>
  );
}
