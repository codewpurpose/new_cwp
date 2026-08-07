import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";

export function DebounceLesson() {
  return (
    <div>
      <Lead>
        One step onto a platform can fire Touched forty times in a quarter of a second, and now
        forty copies of your handler are running at once. Add a single boolean and watch
        thirty-nine of them turn around at the door.
      </Lead>

      <LessonSection id="the-bug-is-repetition-not-timing" title="The bug is repetition, not timing">
        <P>
          The instinct on seeing forty prints is that something is happening too fast, and that
          the fix is to slow it down. It is not. Every one of those forty events is real and
          correct — forty distinct contacts genuinely occurred.
        </P>
        <P>
          The bug is that your handler assumed it was the only one running. Look at what
          happens when it is not.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = script.Parent

platform.Touched:Connect(function()
    platform.Transparency = 1
    platform.CanCollide = false
    task.wait(3)
    platform.Transparency = 0
    platform.CanCollide = true
end)`}
          lineTones={{ 5: "warn" }}
        />
        <P>
          Read it as forty simultaneous copies. Copy one hides the platform and starts waiting.
          Copies two through forty hide it again — harmless — and start their own waits, each
          three seconds from whenever <em>they</em> began. Copy one finishes and restores the
          platform. Then copy two finishes and restores it again. Then thirty-eight more.
        </P>
        <P>
          The player, standing on the restored platform, touches it again. Forty more copies
          start. The platform now flickers on a schedule nobody designed, and if the player
          steps off during the wrong window it stays gone.
        </P>
      </LessonSection>

      <LessonSection id="a-flag-that-says-i-am-already-busy" title="A flag that says I am already busy">
        <P>
          A <Strong>debounce</Strong> is one boolean. It records that the handler is already
          running, so every copy that arrives afterwards checks the flag and returns
          immediately.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = script.Parent
local busy = false

platform.Touched:Connect(function()
    if busy then return end
    busy = true

    platform.Transparency = 1
    platform.CanCollide = false
    task.wait(3)
    platform.Transparency = 0
    platform.CanCollide = true

    busy = false
end)`}
          lineTones={{ 4: "ok", 5: "ok", 13: "ok" }}
        />
        <P>
          Three added lines. The guard, the claim, and the release. The first copy through finds{" "}
          <Strong>busy</Strong> false, sets it true, and does the work. The other thirty-nine
          find it true and return on their first line.
        </P>
        <Callout tone="warning" title="Release it on every path out">
          If the function can return early after setting the flag — a guard clause, an
          <Strong> if </Strong> that does not match — and you have not set{" "}
          <Strong>busy</Strong> back to false, the platform is stuck for the rest of the round.
          Every path that sets the flag must clear it.
        </Callout>
      </LessonSection>

      <LessonSection id="where-the-flag-has-to-live" title="Where the flag has to live">
        <P>
          The <Strong>local busy = false</Strong> is outside the function on purpose, and
          moving it inside is the mistake that makes a debounce do nothing at all.
        </P>
        <CodeBlock
          label="Luau"
          code={`platform.Touched:Connect(function()
    local busy = false        -- created fresh on every single event
    if busy then return end   -- so it is always false, and never guards anything
    ...
end)`}
          lineTones={{ 1: "err", 2: "err" }}
        />
        <P>
          A variable declared inside the function is created anew each time the function runs.
          Forty events means forty separate <Strong>busy</Strong> variables, each false, each
          seeing none of the others. Declared outside, there is one variable that all forty
          calls share — and sharing is the entire mechanism.
        </P>
      </LessonSection>

      <LessonSection id="one-flag-per-part-or-one-per-player" title="One flag per part, or one per player">
        <P>
          The version above has one flag for the whole part, which is right for a disappearing
          platform: the platform is one object, and it is either mid-cycle or it is not.
        </P>
        <P>
          It is wrong for anything that should happen per player. A coin with a single shared
          flag means the second player to touch it during the window gets nothing, for reasons
          they will never work out.
        </P>
        <CompareGrid
          items={[
            {
              title: "One flag for the part",
              tone: "neutral",
              children: (
                <P>
                  Right when the part itself has a state: a platform that is currently
                  vanishing, a door that is currently opening, a trap that is currently armed.
                </P>
              ),
            },
            {
              title: "One flag per player",
              tone: "neutral",
              children: (
                <P>
                  Right when the effect belongs to a person: damage cooldowns, coins,
                  checkpoints. Two players must be able to trigger it independently.
                </P>
              ),
            },
          ]}
        />
        <P>
          The per-player version keeps a table keyed by the player rather than a single boolean.
        </P>
        <CodeBlock
          label="Luau"
          code={`local Players = game:GetService("Players")
local cooldown = {}

script.Parent.Touched:Connect(function(otherPart)
    local character = otherPart.Parent
    local player = Players:GetPlayerFromCharacter(character)
    if not player then return end
    if cooldown[player] then return end

    cooldown[player] = true
    -- award the coin, deal the damage, tick the checkpoint
    task.wait(2)
    cooldown[player] = nil
end)`}
        />
        <P>
          Setting the entry back to <Strong>nil</Strong> rather than <Strong>false</Strong> is
          deliberate. It removes the key entirely, so the table does not grow a permanent entry
          for every player who has ever visited — which on a popular experience is a leak that
          only shows up after hours of uptime.
        </P>
      </LessonSection>

      <LessonSection id="a-debounce-is-not-a-cooldown" title="A debounce is not a cooldown">
        <P>
          The two get used interchangeably and they answer different questions. Being clear
          about which you want stops you writing one and expecting the other.
        </P>
        <P>
          A <Strong>debounce</Strong> exists because one action produced many events, and it
          collapses them into one. Its duration should cover the burst — a fraction of a second
          — and nothing more.
        </P>
        <P>
          A <Strong>cooldown</Strong> is a design decision: this may only happen once every
          five seconds, because that is the rule of the game. Its duration is whatever the
          gameplay wants.
        </P>
        <Callout tone="tip" title="The tell that you have confused them">
          If a player deliberately steps off and back on and is surprised that nothing happens,
          you have a cooldown where you meant a debounce. If a single step awards two coins,
          you have a cooldown that is shorter than the touch burst — or no debounce at all.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Every one of the forty Touched events is real. The bug is a handler written as though it were the only copy running.",
          "A debounce is three lines: guard on the flag, set the flag, clear it when done.",
          "The flag must be declared outside the handler. Inside, a fresh false is created per event and guards nothing.",
          "Clear the flag on every path that sets it, including early returns, or the part stays stuck for the round.",
          "One flag per part is right when the part has a state. One flag per player is right when the effect belongs to a person.",
          "Key a per-player table by the Player and clear entries to nil, so the table does not grow forever on a long-running server.",
          "A debounce collapses one action's burst of events; a cooldown is a gameplay rule. Different durations, different purposes.",
        ]}
      />
    </div>
  );
}
