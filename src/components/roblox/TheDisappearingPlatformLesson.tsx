import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function TheDisappearingPlatformLesson() {
  return (
    <div>
      <Lead>
        Making a part vanish is two properties; making it come back reliably is where every bug
        lives. Step on the naive version twice in a second and watch the platform stay gone for
        the rest of the round.
      </Lead>

      <LessonSection id="vanishing-is-two-properties-not-one" title="Vanishing is two properties, not one">
        <P>
          You met both in Part 1, and this is where the distinction earns its keep.{" "}
          <Strong>Transparency</Strong> controls whether the platform can be seen.{" "}
          <Strong>CanCollide</Strong> controls whether it can be stood on. Set one without the
          other and you get a bug that reads as physics being broken.
        </P>
        <StepList
          steps={[
            {
              label: "Transparency = 1, CanCollide unchanged",
              detail: "The platform is invisible and still completely solid. Players stand on thin air.",
            },
            {
              label: "CanCollide = false, Transparency unchanged",
              detail: "The platform is fully visible and players drop straight through it. This one gets reported as 'the game is broken'.",
            },
            {
              label: "Both",
              detail: "It is gone in the only sense that matters — invisible and intangible.",
            },
          ]}
        />
        <CodeBlock
          label="Luau"
          code={`local platform = script.Parent

-- Gone
platform.Transparency = 1
platform.CanCollide = false

-- Back
platform.Transparency = 0
platform.CanCollide = true`}
        />
        <Callout tone="tip" title="A half-transparent warning reads better than a hard cut">
          <Strong>Transparency = 0.6</Strong> with <Strong>CanCollide</Strong> still true is a
          platform that is visibly about to go. That single value is the difference between an
          obstacle players learn and one they resent.
        </Callout>
      </LessonSection>

      <LessonSection id="task-wait-is-the-one-to-reach-for" title="task.wait is the one to reach for">
        <P>
          The pause between vanishing and returning is <Strong>task.wait(seconds)</Strong>. It
          yields the current thread and resumes it on the first frame after the time has
          elapsed.
        </P>
        <P>
          You will see <Strong>wait()</Strong> everywhere in older material. It is throttled to
          roughly 30 updates a second and drifts further as the server gets busier, so a{" "}
          <Strong>wait(3)</Strong> on a loaded server can be four seconds or more — enough that
          a platform timed against an animation stops matching it.
        </P>
        <CodeBlock
          label="Luau"
          code={`task.wait(3)    -- resumes on the first frame after 3 seconds

wait(3)         -- the old global: 30Hz, and it drifts under load`}
          lineTones={{ 2: "dim" }}
        />
        <P>
          Two relatives are worth knowing. <Strong>task.delay(n, fn)</Strong> runs a function
          later without pausing the current thread, and <Strong>task.spawn(fn)</Strong> starts
          one immediately alongside the current one. Neither is needed here, and both are how
          you avoid a wait blocking something that should keep running.
        </P>
      </LessonSection>

      <LessonSection
        id="restoring-it-in-the-function-that-removed-it"
        title="Restoring it in the function that removed it"
      >
        <P>
          Put the whole cycle in one handler — remove, wait, restore — so that the code which
          took the platform away is visibly the code that brings it back. Splitting the restore
          into a second script or a separate timer is how a platform ends up permanently gone
          when one half fails.
        </P>
        <P>
          With the debounce from the last chapter, the complete version is short.
        </P>
        <CodeBlock
          label="Luau"
          code={`local platform = script.Parent
local busy = false

local WARNING_TIME = 0.4
local GONE_TIME = 3

platform.Touched:Connect(function(otherPart)
    if busy then return end

    local humanoid = otherPart.Parent:FindFirstChildWhichIsA("Humanoid")
    if not humanoid then return end

    busy = true

    platform.Transparency = 0.6
    task.wait(WARNING_TIME)

    platform.Transparency = 1
    platform.CanCollide = false
    task.wait(GONE_TIME)

    platform.Transparency = 0
    platform.CanCollide = true
    busy = false
end)`}
          lineTones={{ 7: "ok", 9: "ok", 10: "ok" }}
        />
        <P>
          Note the order of the two guards. The debounce is checked first because it is
          cheapest, and the Humanoid check comes before <Strong>busy</Strong> is claimed — so a
          falling brick landing on the platform does not consume the cycle and leave the
          platform stuck for three seconds having done nothing.
        </P>
        <Callout tone="warning" title="Naming the times is not tidiness">
          <Strong>WARNING_TIME</Strong> and <Strong>GONE_TIME</Strong> at the top mean you tune
          the platform by editing two obvious numbers rather than hunting for literals inside a
          handler. With six platforms in a course you will be doing that often.
        </Callout>
      </LessonSection>

      <LessonSection id="what-two-players-do-to-this-script" title="What two players do to this script">
        <P>
          The debounce here is one flag for the whole part, and that is the correct choice — but
          it is worth being clear about what it does and does not promise.
        </P>
        <P>
          It promises that the platform runs one cycle at a time. It does not promise anything
          per player. If a second player steps on the platform half a second after the first,
          nothing new happens: the cycle is already running, and they get the remaining two and
          a half seconds rather than a fresh three.
        </P>
        <P>
          That is right for this obstacle. A platform is a single physical thing and it cannot
          be both present and absent for two people standing on it — a per-player flag here
          would be strictly wrong, and the next chapter is about what happens when you try.
        </P>
        <Callout tone="note" title="The other order of events">
          A player standing on the platform when it returns is fine — they land on it. A player
          who jumped just as it returned may be pushed slightly; that is the physics engine
          resolving an overlap, not a bug in the script, and it is why platforms are usually
          thin.
        </Callout>
      </LessonSection>

      <LessonSection id="telegraph-it-before-it-drops" title="Telegraph it before it drops">
        <P>
          A platform that vanishes with no warning is not difficult, it is unfair — the player
          had no information they could have acted on. Every well-made obby telegraphs, and the
          cheapest telegraph is the transparency step already in the script above.
        </P>
        <P>
          Two more are worth the few lines. Colour communicates faster than transparency, and
          sound reaches a player who is looking somewhere else.
        </P>
        <CodeBlock
          label="Luau"
          code={`platform.BrickColor = BrickColor.new("Really red")
platform.Material = Enum.Material.Neon

-- A Sound parented to the part plays from its position in 3D.
local warningSound = platform:FindFirstChild("Warning")
if warningSound then
    warningSound:Play()
end`}
        />
        <P>
          Remember to restore anything you changed. If the warning sets{" "}
          <Strong>BrickColor</Strong>, the restore has to set it back, or your obby slowly turns
          red one platform at a time as people play it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Vanishing takes both Transparency = 1 and CanCollide = false. Setting only one produces invisible floors or visible holes.",
          "Use task.wait rather than wait. The old global runs at about 30Hz and drifts further as the server gets busier.",
          "task.delay runs something later without pausing you; task.spawn runs something alongside you. Neither is needed for a simple platform.",
          "Keep remove, wait, and restore in one handler, so the code that took the platform away is visibly the code that brings it back.",
          "Check the debounce first and the Humanoid second, but claim the flag only after both — or a falling brick locks the platform for three seconds.",
          "Name the durations as constants at the top. You will tune them on every platform in the course.",
          "One flag for the part is correct here: a platform cannot be present for one player and absent for another.",
          "Telegraph before dropping. A partial transparency, a colour change, and a sound cost four lines and turn an unfair trap into an obstacle.",
          "Restore everything the warning changed, or the course drifts permanently red as people play it.",
        ]}
      />
    </div>
  );
}
