import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { OneWayPlatformSim } from "@/components/roblox/OneWayPlatformSim";

export function TheOneWayPlatformLesson() {
  return (
    <div>
      <Lead>
        A one-way platform compares two heights and flips one property, and that version falls
        apart the moment a second player joins. Drag one player through it, add another, and
        watch a single shared property fail them both.
      </Lead>

      <LessonSection
        id="the-idea-is-a-comparison-of-two-heights"
        title="The idea is a comparison of two heights"
      >
        <P>
          A one-way platform is solid when you are above it and empty when you are below, so you
          can jump up through the floor and then stand on it. Every implementation is a
          variation on one comparison: is the player higher than the platform.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = script.Parent

local function isAbove(root)
    return root.Position.Y > platform.Position.Y
end`}
        />
        <P>
          Y is up, which you established in Part 1, and both positions are the{" "}
          <em>centre</em> of the object rather than its surface. For a platform one stud thick
          the difference is half a stud and does not matter; for a thick one it does, and the
          honest comparison adds half the height.
        </P>
        <CodeBlock
          label="Luau"
          code={`local topSurface = platform.Position.Y + (platform.Size.Y / 2)
return root.Position.Y > topSurface`}
        />
      </LessonSection>

      <LessonSection id="read-the-players-root-not-their-limbs" title="Read the player's root, not their limbs">
        <P>
          The obvious mistake is to compare the height of <Strong>otherPart</Strong> — the thing
          Touched handed you. That is a foot, and a foot is exactly the part of a player that
          is level with the platform when they land on it.
        </P>
        <P>
          Compare the <Strong>HumanoidRootPart</Strong> instead. It sits at the centre of the
          character, roughly two studs above their feet, so it is unambiguously above the
          platform when standing on it and unambiguously below when jumping up through.
        </P>
        <CodeBlock
          label="Luau"
          code={`platform.Touched:Connect(function(otherPart)
    local character = otherPart:FindFirstAncestorOfClass("Model")
    if not character then return end

    local root = character:FindFirstChild("HumanoidRootPart")
    if not root then return end

    platform.CanCollide = root.Position.Y > platform.Position.Y
end)`}
        />
        <Callout tone="tip" title="Velocity is the more robust signal">
          Height says where they are; <Strong>root.AssemblyLinearVelocity.Y</Strong> says which
          way they are going. A player moving upward is jumping through, whatever their exact
          height — which is why production implementations usually check both.
        </Callout>
      </LessonSection>

      <LessonSection
        id="cancollide-belongs-to-the-part-not-the-player"
        title="CanCollide belongs to the part, not the player"
      >
        <P>
          Everything above is correct, tested, and works perfectly. Then a second player joins,
          and it stops working for both of them at once.
        </P>
        <P>
          The reason is not in the logic. It is that <Strong>CanCollide</Strong> is a property
          of the <em>part</em>. One part, one value, shared by everybody in the server. The
          script is trying to store per-player state in a place that can only hold one answer.
        </P>
      </LessonSection>

      <OneWayPlatformSim />

      <P>
        Turn on the second player and watch what a Touched event from below does to the person
        standing on top. Whichever event fired most recently wins, so the platform flickers
        between solid and intangible as two players move — and a player standing on it drops
        through a floor that was there a frame ago.
      </P>

      <P>
        This is worth recognising as a <em>shape</em> of bug rather than a fact about platforms.
        Any time a per-player decision is written into a property that the part owns, the second
        player breaks it. A door that opens for whoever has the key, a block that is solid only
        for players who have finished stage three — same bug, same cause.
      </P>

      <LessonSection id="collision-groups-are-the-real-fix" title="Collision groups are the real fix">
        <P>
          Roblox has a mechanism for exactly this, and it works because it stops asking one
          property to hold several answers. A <Strong>collision group</Strong> is a named
          category, and you configure which groups collide with which.
        </P>
        <P>
          Put the platform in one group, put each player&apos;s character in a group of their
          own, and then turning collision on or off for one player is a change to that
          player&apos;s group rather than to the platform.
        </P>
        <CodeBlock
          label="Luau"
          code={`local PhysicsService = game:GetService("PhysicsService")

PhysicsService:RegisterCollisionGroup("Platform")
PhysicsService:RegisterCollisionGroup("PassesThrough")

-- Members of PassesThrough ignore the platform entirely.
PhysicsService:CollisionGroupSetCollidable("PassesThrough", "Platform", false)

platform.CollisionGroup = "Platform"`}
        />
        <P>
          Then, per player, move their character&apos;s parts between groups as they rise and
          fall. Each player&apos;s collision is now their own, and one player passing through
          changes nothing for anybody else.
        </P>
        <CodeBlock
          label="Luau"
          code={`local function setGroup(character, groupName)
    for _, descendant in character:GetDescendants() do
        if descendant:IsA("BasePart") then
            descendant.CollisionGroup = groupName
        end
    end
end`}
        />
        <P>
          Two details that bite. You must set the group on <em>every</em> BasePart of the
          character, not the model — a model has no <Strong>CollisionGroup</Strong>. And
          registering a group that already exists throws, so a script that runs more than once
          needs to check first or be somewhere that only runs once.
        </P>
      </LessonSection>

      <LessonSection id="when-to-accept-the-simple-version" title="When to accept the simple version">
        <P>
          Collision groups are the correct answer and they are meaningfully more work. There is
          a real decision here rather than an obvious one.
        </P>
        <CompareGrid
          items={[
            {
              title: "The simple version is fine when",
              tone: "positive",
              children: (
                <P>
                  The obby is single-player, or the platform sits somewhere two players are
                  unlikely to be at once. Ship it, and know exactly what it will do if that
                  assumption breaks.
                </P>
              ),
            },
            {
              title: "Use collision groups when",
              tone: "caution",
              children: (
                <P>
                  Players will genuinely be there together, or the platform is on the critical
                  path and dropping someone through it ends their run. The cost of the bug is
                  now higher than the cost of the fix.
                </P>
              ),
            },
          ]}
        />
        <P>
          What is not acceptable is not knowing which you have. A one-way platform written the
          simple way is a documented limitation if you know about it, and an unexplainable bug
          report if you do not.
        </P>
        <Callout tone="note" title="The third option, which is often the right one">
          Design around it. Two one-way platforms side by side, or a platform wide enough that
          players do not share it, removes the problem without any code. The best fix for a hard
          engineering problem is frequently a small change to the level.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A one-way platform is one comparison: is the player higher than the platform's top surface.",
          "Position is the centre of an object. Add half of Size.Y to compare against the surface players actually stand on.",
          "Compare the HumanoidRootPart, not the part Touched gave you — that is a foot, and a foot is level with the platform on landing.",
          "AssemblyLinearVelocity.Y tells you which way they are going, which is more robust than height alone.",
          "CanCollide belongs to the part. One part, one value, shared by every player in the server.",
          "With two players the last Touched event wins, and someone standing on the platform falls through a floor that was solid a frame ago.",
          "This is a shape of bug, not a fact about platforms: per-player state written into a property the part owns always breaks on the second player.",
          "Collision groups fix it properly by giving each player their own collision, so one player passing through changes nothing for anyone else.",
          "Set the group on every BasePart of the character — a Model has no CollisionGroup — and registering an existing group throws.",
          "Shipping the simple version is a legitimate choice. Not knowing which version you shipped is not.",
        ]}
      />
    </div>
  );
}
