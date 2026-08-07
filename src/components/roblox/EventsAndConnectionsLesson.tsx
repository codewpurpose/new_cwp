import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { TouchedTimeline } from "@/components/roblox/TouchedTimeline";

export function EventsAndConnectionsLesson() {
  return (
    <div>
      <Lead>
        Nothing in an obby sits in a loop asking whether a player has arrived — the part
        announces it. Connect a function to Touched, walk across the part once, and count how
        many times it actually fired.
      </Lead>

      <LessonSection
        id="an-event-is-something-the-engine-announces"
        title="An event is something the engine announces"
      >
        <P>
          The obvious way to write a killbrick is a loop: check every frame whether a player is
          standing in the laser, and if so, kill them. It works, it burns a slice of every
          frame forever, and it is wrong in a way that gets worse with every part you add.
        </P>
        <P>
          Roblox inverts it. The part already knows when something touched it — the physics
          engine worked that out as part of the simulation it was doing anyway. So rather than
          you asking, it tells you.
        </P>
        <CodeBlock
          label="Luau"
          code={`-- The loop nobody should write:
while true do
    -- check every part in the workspace, every frame, forever
    task.wait()
end

-- What the engine offers instead:
script.Parent.Touched:Connect(function(otherPart)
    print("something touched me:", otherPart.Name)
end)`}
          lineTones={{ 1: "dim", 2: "dim", 3: "dim", 4: "dim" }}
        />
      </LessonSection>

      <LessonSection
        id="connect-hands-over-a-function-not-a-result"
        title="Connect hands over a function, not a result"
      >
        <P>
          Read that line carefully, because the shape of it is the thing to learn.{" "}
          <Strong>Touched</Strong> is a property of the part holding an event object.{" "}
          <Strong>Connect</Strong> is a method on that event. What you hand it is a function —
          not the result of calling one.
        </P>
        <CodeBlock
          label="Luau"
          code={`local function onTouch(otherPart)
    print("hit by", otherPart.Name)
end

part.Touched:Connect(onTouch)     -- correct: hands over the function
part.Touched:Connect(onTouch())   -- wrong: calls it now, connects the result`}
          lineTones={{ 4: "ok", 5: "err" }}
        />
        <P>
          The second version runs <Strong>onTouch</Strong> immediately, with no argument, and
          connects whatever it returned — which is nil. Nothing is connected, the touch never
          fires anything, and the error you got happened once at startup and scrolled away.
        </P>
        <P>
          The anonymous form is the same thing written inline, and it is what you will see in
          almost every example.
        </P>
        <CodeBlock
          label="Luau"
          code={`part.Touched:Connect(function(otherPart)
    print("hit by", otherPart.Name)
end)`}
        />
      </LessonSection>

      <LessonSection id="touched-passes-you-a-part-not-a-player" title="Touched passes you a part, not a player">
        <P>
          The argument your function receives is the <em>other part</em> in the collision. Not
          a player, not a character — a single part, which might be a player&apos;s left leg, a
          falling brick, or another piece of your own obby.
        </P>
        <P>
          This trips up every beginner exactly once. <Strong>otherPart.Name</Strong> on a
          player&apos;s limb prints <Strong>&quot;LeftLowerLeg&quot;</Strong>, and there is no{" "}
          <Strong>otherPart.Health</Strong> to set, because a leg does not have health. The
          next chapter of Part 4 is entirely about climbing from that limb to the player it
          belongs to.
        </P>
        <P>
          A handful of other events matter in an obby, and they follow the same shape.
        </P>
        <LabelRows
          rows={[
            { label: "part.Touched", text: "Something started touching this part. Gives you the other part." },
            { label: "part.TouchEnded", text: "Something stopped touching it. Less reliable than it sounds — a part destroyed mid-touch may never fire it." },
            { label: "Players.PlayerAdded", text: "Somebody joined. Gives you the Player object." },
            { label: "player.CharacterAdded", text: "That player's character spawned, which happens again on every respawn." },
            { label: "humanoid.Died", text: "That character died. The right place to hook a checkpoint respawn." },
          ]}
        />
      </LessonSection>

      <LessonSection id="one-crossing-fires-touched-many-times" title="One crossing fires Touched many times">
        <P>
          Here is the part that surprises everyone, and it is not a bug in your code or in
          Roblox. A character is made of many parts, each of which touches the plate
          separately. Physics jitter makes contacts break and re-form. One deliberate step onto
          a platform produces somewhere between ten and forty <Strong>Touched</Strong> events
          in well under a second.
        </P>
      </LessonSection>

      <TouchedTimeline />

      <P>
        If your handler prints a line, you get forty lines. If it awards a coin, you get forty
        coins. If it removes the platform, waits, and puts it back, you now have forty
        overlapping timers all putting the platform back at different moments — which is how a
        disappearing platform ends up permanently gone.
      </P>

      <P>
        The fix is a debounce, and it is the whole of the next chapter.
      </P>

      <LessonSection id="a-connection-you-never-disconnect-stays" title="A connection you never disconnect stays">
        <P>
          <Strong>Connect</Strong> returns a connection object, and most of the time you ignore
          it. Sometimes you should not.
        </P>
        <CodeBlock
          label="Luau"
          code={`local connection
connection = part.Touched:Connect(function(otherPart)
    print("first touch only")
    connection:Disconnect()
end)`}
        />
        <P>
          A connection keeps the function — and everything the function refers to — alive for
          as long as the connection exists. Connect inside a loop without disconnecting and you
          accumulate handlers: after ten rounds, ten copies of the same function fire on every
          touch, and the game gets slower for reasons that never appear in the Output window.
        </P>
        <Callout tone="tip" title="Destroy cleans up after you">
          Calling <Strong>:Destroy()</Strong> on an instance disconnects the events belonging to
          it. So a part that is destroyed when a round ends does not leak its own connections —
          the leak comes from connecting to something long-lived, like a Player or a service,
          once per round and never tidying up.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Events invert the question: the engine already knows something touched the part, so it tells you rather than you checking every frame.",
          "Connect takes a function, not a call. Connect(onTouch()) runs it immediately and connects nil — nothing fires and nothing warns you.",
          "Touched hands you the other part, not a player. A player's limb has a Name and no Health.",
          "TouchEnded is less reliable than Touched — a part destroyed mid-touch may never fire it.",
          "One step onto a plate fires Touched ten to forty times, because a character is many parts and contacts jitter.",
          "Every one of those firings runs your whole handler. Forty coins, forty prints, forty overlapping timers.",
          "Connect returns a connection you can Disconnect, which is how you make a handler fire once.",
          "Connections keep their function alive. Connecting once per round to something long-lived leaks handlers and slows the game silently.",
        ]}
      />
    </div>
  );
}
