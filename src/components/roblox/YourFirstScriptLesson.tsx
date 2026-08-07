import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { ScriptPlacement } from "@/components/roblox/ScriptPlacement";

export function YourFirstScriptLesson() {
  return (
    <div>
      <Lead>
        The same eight lines of Luau will run for everyone, run for one player, or never run at
        all, decided entirely by which object you dropped them under. Move one script between
        four parents and see which of them start it.
      </Lead>

      <LessonSection
        id="a-script-is-an-instance-like-everything-else"
        title="A script is an instance like everything else"
      >
        <P>
          A script is not a file attached to your project. It is an object in the tree, exactly
          like a part, with a Name, a ClassName, and a Parent. That is not a technicality — it
          is the whole reason placement decides behaviour.
        </P>
        <P>
          It also means a script can be moved, copied, cloned, and destroyed by other scripts
          while the game is running, and that a script sitting inside a part travels with that
          part when you duplicate it. Copy your laser and you have copied its killing logic
          too, which is exactly what you want.
        </P>
      </LessonSection>

      <LessonSection
        id="three-script-classes-and-what-each-is-for"
        title="Three script classes, and what each is for"
      >
        <LabelRows
          rows={[
            {
              label: "Script",
              text: "Runs on the server. Everything that affects all players — damage, scoring, spawning — belongs here, because the server is the only copy everybody shares.",
            },
            {
              label: "LocalScript",
              text: "Runs on one player's own machine. Camera control, key presses, and interface. Nothing here can be trusted, because the player owns the computer it runs on.",
            },
            {
              label: "ModuleScript",
              text: "Runs when something calls require() on it, and never on its own. Returns one value — usually a table of functions — so several scripts can share one implementation.",
            },
          ]}
        />
        <P>
          A ModuleScript is the one that surprises people. Putting one somewhere sensible and
          waiting does nothing at all; it is a library, and libraries do not start themselves.
        </P>
        <CodeBlock
          label="Luau"
          code={`-- ReplicatedStorage/ObbyUtil (a ModuleScript)
local ObbyUtil = {}

function ObbyUtil.getHumanoid(part)
    return part.Parent:FindFirstChildWhichIsA("Humanoid")
end

return ObbyUtil`}
        />
        <CodeBlock
          label="Luau"
          code={`-- Any Script or LocalScript that wants it
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ObbyUtil = require(ReplicatedStorage.ObbyUtil)

local humanoid = ObbyUtil.getHumanoid(somePart)`}
        />
        <P>
          The <Strong>return</Strong> at the bottom is mandatory. A ModuleScript with no return
          hands back nil, and every script that requires it fails on the next line with a
          message about indexing nil — an error that points at the caller and never at the
          module that caused it.
        </P>
      </LessonSection>

      <LessonSection
        id="where-you-put-it-decides-whether-it-runs"
        title="Where you put it decides whether it runs"
      >
        <P>
          Roblox does not run every script it finds. Each script class only starts inside
          particular containers, and outside them the script sits there looking completely
          normal and doing nothing.
        </P>
        <P>
          There is no warning for this. The Explorer shows the script, the code is valid, the
          Output window stays empty, and nothing anywhere tells you that the object you chose
          as a parent is not one that starts anything.
        </P>
      </LessonSection>

      <ScriptPlacement />

      <LessonSection id="runcontext-loosened-the-old-rule" title="RunContext loosened the old rule">
        <P>
          For most of Roblox&apos;s history the rule was simply &quot;class decides the
          side&quot;. A <Strong>Script</Strong> was server, a <Strong>LocalScript</Strong> was
          client, and where each would start was fixed.
        </P>
        <P>
          Modern <Strong>Script</Strong> instances have a <Strong>RunContext</Strong> property
          with three values, which changes that. <Strong>Legacy</Strong> is the historical
          behaviour above and is still the default. <Strong>Server</Strong> and{" "}
          <Strong>Client</Strong> make the script run in that context from wherever it sits,
          including containers that would previously have ignored it.
        </P>
        <Callout tone="note" title="Which to use while learning">
          Leave it on Legacy and use the containers. The placement rules are what every
          tutorial, every free model, and every person you ask for help will assume — learning
          them first means you can read other people&apos;s work. RunContext is worth knowing
          exists so that a script running somewhere &quot;impossible&quot; does not baffle you.
        </Callout>
      </LessonSection>

      <LessonSection id="print-is-your-first-and-best-instrument" title="print is your first and best instrument">
        <P>
          Before anything else, put a print at the top of every script you write. Not for
          debugging a problem — for answering, instantly and permanently, the question that
          precedes every other question: did this run at all?
        </P>
        <CodeBlock
          label="Luau"
          code={`print("KillScript loaded on", workspace.Obby.Laser:GetFullName())

local laser = script.Parent
laser.Touched:Connect(function(otherPart)
    print("touched by", otherPart.Name)
end)`}
        />
        <P>
          Two prints, and between them they answer nearly everything a beginner gets stuck on.
          Silence on the first means the script never started, and the problem is placement.
          The first without the second means the script ran but the event never fired, and the
          problem is the part. Those are entirely different bugs, and without the prints they
          look identical.
        </P>
        <P>
          <Strong>GetFullName()</Strong> is worth the extra characters — it prints the whole
          path, so a message from one of six duplicated lasers tells you which one.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A script is an instance in the tree, not a file attached to the project. That is why its parent decides its behaviour.",
          "A script inside a part travels with that part when you duplicate it, which is how one laser becomes six.",
          "Script runs on the server, LocalScript on one player's machine, ModuleScript only when something requires it.",
          "A ModuleScript must end with return. Without one it hands back nil, and the error appears in the caller rather than the module.",
          "Seven of the twelve common class-and-parent combinations do nothing at all, and Studio warns you about none of them.",
          "RunContext on modern Scripts can override the placement rules. Leave it on Legacy while learning, so other people's tutorials still apply.",
          "Put a print at the top of every script. Silence means it never ran; that is a different bug from an event that never fired.",
          "print(obj:GetFullName()) tells you which of six identical copies is talking.",
        ]}
      />
    </div>
  );
}
