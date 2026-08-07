import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function InstancesAndPropertiesLesson() {
  return (
    <div>
      <Lead>
        script.Parent works beautifully until somebody renames a part, and then it fails with a
        message about indexing nil. Compare the four ways to find an object and see which of
        them survive a part that has not loaded yet.
      </Lead>

      <LessonSection id="script-parent-is-the-shortest-path" title="script.Parent is the shortest path, and the most fragile">
        <P>
          Inside any script, the global <Strong>script</Strong> refers to that script itself. So{" "}
          <Strong>script.Parent</Strong> is whatever it is sitting inside — for a killbrick,
          the laser part.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = script.Parent   -- the part this script lives in

laser.Touched:Connect(function(otherPart)
    print("hit", otherPart.Name)
end)`}
        />
        <P>
          This is the right tool for a script that belongs to one part, and it has a real
          advantage: duplicate the laser and the copy works immediately, with no names to
          update. Nothing about the path depends on what anything is called.
        </P>
        <P>
          It becomes fragile the moment you chain it. <Strong>script.Parent.Parent.Parent</Strong>{" "}
          encodes the exact depth of your model into the script, and reorganising the Explorer —
          dropping the laser into a folder, say — silently changes what that expression means.
        </P>
      </LessonSection>

      <LessonSection id="dot-notation-is-a-lookup-that-can-fail" title="Dot notation is a lookup that can fail">
        <P>
          <Strong>workspace.Obby.Laser</Strong> looks like a path in a language that has paths.
          It is not. Each dot is a search of that object&apos;s children for one matching the
          name, done freshly, at the moment the line runs.
        </P>
        <P>
          So the expression is only as reliable as the names in it. If <Strong>Laser</Strong>{" "}
          has been renamed, is inside a folder now, or has not loaded yet, that dot returns nil
          — and the <em>next</em> dot is the one that throws.
        </P>
        <CodeBlock
          label="Luau"
          code={`workspace.Obby.Laser.Transparency = 0.5

-- If Obby exists but Laser does not:
--> attempt to index nil with 'Transparency'
-- The error names Transparency. The missing thing is Laser.`}
          lineTones={{ 3: "err" }}
        />
        <Callout tone="warning" title="The error always names the wrong step">
          Luau reports the property you tried to reach <em>through</em> the nil, never the
          lookup that produced it. Read it as &quot;the thing to the left of this was
          nil&quot; and you will find the bug immediately instead of staring at a property that
          is spelled perfectly.
        </Callout>
      </LessonSection>

      <LessonSection id="findfirstchild-asks-without-crashing" title="FindFirstChild asks without crashing">
        <P>
          <Strong>FindFirstChild</Strong> does the same search and returns nil instead of
          throwing. That single difference is what lets you check before you act.
        </P>
        <CodeBlock
          label="Luau"
          code={`local laser = workspace.Obby:FindFirstChild("Laser")

if laser then
    laser.Transparency = 0.5
else
    warn("No Laser in Obby — was it renamed?")
end`}
        />
        <P>
          The <Strong>warn</Strong> in the else branch is doing real work. A script that
          silently does nothing when a part is missing is worse than one that crashes, because
          a crash at least tells you where to look.
        </P>
        <P>
          There is a family of these, and two are worth knowing by name.
        </P>
        <LabelRows
          rows={[
            {
              label: "FindFirstChild(name)",
              text: "Searches direct children by name. Add true as a second argument to search all descendants — slower, and usually a sign the structure is wrong.",
            },
            {
              label: "FindFirstChildWhichIsA(class)",
              text: "Searches by class rather than name. This is how you find a Humanoid without caring what the character is called.",
            },
            {
              label: "FindFirstAncestorOfClass(class)",
              text: "Searches upward instead of down. The reliable way to get from a hat's handle back to the character wearing it.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="waitforchild-is-for-things-that-arrive-late" title="WaitForChild is for things that arrive late">
        <P>
          A Roblox place does not load all at once. On the client especially, a script can run
          before the object it needs has replicated in — so a lookup fails not because the
          object is missing but because it is late.
        </P>
        <P>
          <Strong>WaitForChild</Strong> yields the script until the child appears, then returns
          it.
        </P>
        <CodeBlock
          label="Luau"
          code={`local obby = workspace:WaitForChild("Obby")
local laser = obby:WaitForChild("Laser")

-- Both exist by the time this line runs.
laser.Transparency = 0.5`}
        />
        <P>
          It waits indefinitely by default, and after five seconds it prints an &quot;Infinite
          yield possible&quot; warning to the Output window. That warning is not an error and
          the script has not stopped — it is Roblox telling you the thing you are waiting for
          may never arrive, which usually means a typo.
        </P>
        <CompareGrid
          items={[
            {
              title: "Use WaitForChild when",
              tone: "positive",
              children: (
                <P>
                  You are on the client, or early in a server script, and the object is
                  expected to exist. Waiting is correct — the object is coming.
                </P>
              ),
            },
            {
              title: "Use FindFirstChild when",
              tone: "caution",
              children: (
                <P>
                  The object genuinely might not exist and your script has something sensible
                  to do about that. Waiting forever for something optional is a hang, not a
                  guard.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="setting-a-property-is-a-line-not-a-method" title="Setting a property is a line, not a method">
        <P>
          Roblox has no getters and setters. A property is read and written with{" "}
          <Strong>=</Strong>, using exactly the name shown in the Properties panel — including
          its capitals.
        </P>
        <CodeBlock
          label="Luau"
          code={`local part = script.Parent

part.Transparency = 0.5
part.CanCollide = false
part.BrickColor = BrickColor.new("Really red")
part.Material = Enum.Material.Neon`}
        />
        <P>
          Two things there are not plain values. <Strong>BrickColor</Strong> and{" "}
          <Strong>Color3</Strong> are constructed types, and <Strong>Material</Strong> is an{" "}
          <Strong>Enum</Strong> — a fixed set of named options. Writing{" "}
          <Strong>part.Material = &quot;Neon&quot;</Strong> with a plain string fails, because
          the property wants the enum item and not text that resembles it.
        </P>
        <Callout tone="tip" title="Let the Properties panel write it for you">
          Change a property by hand in Studio, and the name and exact value you need are right
          there in the panel. That is faster than searching documentation, and it is how you
          discover that the colour property on a Part is called BrickColor rather than Colour
          or Color.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "script refers to the script itself, so script.Parent is the object it lives inside — and duplicating that object copies a working script with it.",
          "Chained script.Parent.Parent encodes your Explorer layout into the code. Reorganising the tree silently changes what it means.",
          "Dot notation is a fresh search by name every time the line runs, not a stored path.",
          "The nil error always names the step after the one that failed. Read it as 'the thing to the left was nil'.",
          "FindFirstChild returns nil instead of throwing, which is what lets you check before acting. Warn in the else branch.",
          "FindFirstChildWhichIsA searches by class; FindFirstAncestorOfClass searches upward. Both matter for the killbrick.",
          "WaitForChild yields until the object replicates in. 'Infinite yield possible' after five seconds is a warning, not an error, and usually means a typo.",
          "Wait for things that are coming; Find things that might not exist. Waiting forever for something optional is a hang.",
          "Properties are set with =, using the exact name and capitals from the Properties panel. Material wants an Enum, not a string.",
        ]}
      />
    </div>
  );
}
