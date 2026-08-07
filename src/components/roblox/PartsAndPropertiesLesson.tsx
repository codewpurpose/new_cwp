import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { PropertyPanel } from "@/components/roblox/PropertyPanel";

export function PartsAndPropertiesLesson() {
  return (
    <div>
      <Lead>
        A new block falls to the floor, drifts through walls, or hangs in mid-air, and a
        handful of checkboxes decide which. Toggle each one and watch the same part stop being
        the same object.
      </Lead>

      <LessonSection
        id="a-part-is-the-only-building-block-there-is"
        title="A part is the only building block there is"
      >
        <P>
          Every wall, floor, laser, coin, and platform in every Roblox game is a{" "}
          <Strong>Part</Strong>. There is no separate wall type or platform type. The
          difference between a decoration and a deadly obstacle is entirely which properties
          are set and which script is watching it.
        </P>
        <P>
          That is a genuinely good design and it has one consequence worth internalising: when
          a part behaves strangely, the answer is always a property. Not a hidden setting, not
          a mode, not something about how you inserted it. A property, visible in the
          Properties panel, that is set to something you did not intend.
        </P>
      </LessonSection>

      <LessonSection
        id="anchored-decides-whether-physics-applies"
        title="Anchored decides whether physics applies"
      >
        <P>
          An unanchored part is subject to gravity, collisions, and every other force in the
          simulation. An anchored part is not. It stays exactly where you put it, forever,
          and nothing can push it.
        </P>
        <P>
          Every static piece of your obby should be anchored, and forgetting is the single most
          common first-day mistake. You build a beautiful floating course, press Play, and the
          entire thing collapses into a heap on the baseplate before you have taken a step.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = workspace.Obby.Platform

platform.Anchored = true   -- stays put, ignores gravity entirely
platform.Anchored = false  -- falls, tumbles, can be pushed by a player`}
        />
        <Callout tone="tip" title="Select everything and anchor it">
          Drag a selection box over your whole course, then set Anchored once in the Properties
          panel — it applies to every selected part at once. Do this before your first test,
          not after.
        </Callout>
      </LessonSection>

      <LessonSection
        id="cancollide-decides-whether-anything-stops"
        title="CanCollide decides whether anything stops"
      >
        <P>
          <Strong>CanCollide</Strong> is whether the part is solid. With it off, players and
          objects pass straight through as though the part were not there — while still seeing
          it perfectly.
        </P>
        <P>
          It is easy to assume this and Anchored are the same idea in different words. They are
          independent, and all four combinations are useful.
        </P>
        <CompareGrid
          items={[
            {
              title: "Anchored, CanCollide on",
              tone: "positive",
              children: (
                <P>
                  A floor. The overwhelming majority of an obby is this, and it is what every
                  static part should be unless you have a reason otherwise.
                </P>
              ),
            },
            {
              title: "Anchored, CanCollide off",
              tone: "neutral",
              children: (
                <P>
                  A trigger volume, or a decoration players walk through. Combined with{" "}
                  <Strong>Transparency = 1</Strong> this is the invisible detector every
                  checkpoint uses.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <PropertyPanel />

      <LessonSection id="transparency-is-not-the-same-as-gone" title="Transparency is not the same as gone">
        <P>
          <Strong>Transparency</Strong> runs from 0 to 1, and it changes exactly one thing: how
          much you can see through the part. It does not affect collision, physics, or whether
          scripts can find the object.
        </P>
        <P>
          A part at <Strong>Transparency = 1</Strong> is still completely solid. That is the
          invisible wall that stops players leaving the map, and it is also, when unintended,
          the reason a player is blocked by nothing in the middle of an empty room.
        </P>
        <Callout tone="warning" title="Two properties, one apparent effect">
          To make a platform genuinely vanish you must set both:{" "}
          <Strong>Transparency = 1</Strong> so it cannot be seen, and{" "}
          <Strong>CanCollide = false</Strong> so it cannot be stood on. Setting one and not
          the other is the bug behind almost every broken disappearing platform, and you will
          meet it properly in Part 4.
        </Callout>
      </LessonSection>

      <LessonSection
        id="position-moves-a-part-cframe-also-turns-it"
        title="Position moves a part; CFrame also turns it"
      >
        <P>
          <Strong>Position</Strong> is a <Strong>Vector3</Strong> — three numbers, X, Y, and Z,
          describing where the centre of the part sits. Y is up, which is worth memorising now
          because every height comparison in this track depends on it.
        </P>
        <CodeBlock
          label="Luau"
          code={`local part = workspace.Obby.Platform

part.Position = Vector3.new(0, 20, 0)   -- 20 studs up, centred
part.Size = Vector3.new(12, 1, 12)      -- wide, thin, deep

-- Moving relative to where it already is:
part.Position = part.Position + Vector3.new(0, 5, 0)`}
        />
        <P>
          <Strong>CFrame</Strong> is position <em>and</em> rotation in one value. Anything
          that needs to face a direction — a spinning obstacle, a launch pad, a camera — needs
          CFrame rather than Position, because Position alone cannot express a turn.
        </P>
        <P>
          There is also a subtler reason to prefer it. Setting <Strong>Position</Strong> on an
          unanchored part asks the physics engine to move it and lets the engine resolve
          collisions on the way; setting <Strong>CFrame</Strong> places it there outright. When
          you need a part to be somewhere exactly, CFrame is the one that obeys.
        </P>
        <CodeBlock
          label="Luau"
          code={`-- Place it, and turn it 45 degrees around Y at the same time.
part.CFrame = CFrame.new(0, 20, 0) * CFrame.Angles(0, math.rad(45), 0)`}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Every object you build with is a Part. The difference between decoration and obstacle is properties plus a script, never a different type.",
          "When a part behaves strangely, the cause is a property. It is visible in the Properties panel and it is set to something you did not intend.",
          "Anchored means physics ignores the part. Anchor every static piece before your first test, or the course collapses on Play.",
          "CanCollide means the part is solid. It is independent of Anchored, and all four combinations are useful.",
          "Transparency only changes what you can see. A fully transparent part is still completely solid — that is the invisible wall.",
          "Making something vanish takes both Transparency = 1 and CanCollide = false. Setting one is the classic broken-platform bug.",
          "Position is a Vector3 and Y is up. Every height comparison later in this track reads Position.Y.",
          "CFrame carries rotation as well as position, and places a part outright rather than asking physics to move it there.",
        ]}
      />
    </div>
  );
}
