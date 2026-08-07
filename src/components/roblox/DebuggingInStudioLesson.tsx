import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { OutputConsole } from "@/components/roblox/OutputConsole";

export function DebuggingInStudioLesson() {
  return (
    <div>
      <Lead>
        The Output window names the script, the line, and the exact object that was nil, and
        most people close it. Read three real Roblox errors and find the single word in each
        that identifies the problem.
      </Lead>

      <LessonSection
        id="the-output-window-is-the-whole-instrument"
        title="The Output window is the whole instrument"
      >
        <P>
          Roblox has a debugger, a script analyser, and a performance profiler, and you will use
          all three eventually. You will use the Output window every single session, and almost
          every problem in a first obby is solved there.
        </P>
        <P>
          Open it from <Strong>View → Output</Strong> and leave it open. A closed Output window
          is the reason a beginner believes their script did nothing — the script threw an error
          on line four, said so clearly, and nobody was listening.
        </P>
        <Callout tone="tip" title="Filter it before you need to">
          The Output window has a search box and level filters. On a busy place, filtering to
          errors and warnings only is the difference between reading your bug and scrolling past
          it in a river of prints.
        </Callout>
      </LessonSection>

      <LessonSection
        id="print-warn-and-error-are-three-signals"
        title="print, warn, and error are three signals"
      >
        <P>
          They look similar and they mean quite different things. Using the right one is how
          your own messages stay readable at a glance six months later.
        </P>
        <LabelRows
          rows={[
            {
              label: "print(...)",
              text: "Plain white. Information you wanted to see. Does not stop anything.",
            },
            {
              label: "warn(...)",
              text: "Orange. Something is not right but the script can continue. The correct level for 'this part was missing so I skipped it'.",
            },
            {
              label: "error(...)",
              text: "Red, and it stops the current thread immediately. Use it when carrying on would produce nonsense.",
            },
          ]}
        />
        <CodeBlock
          label="Luau"
          code={`local platform = workspace.Obby:FindFirstChild("Platform")

if not platform then
    warn("No Platform found in Obby — check the name in the Explorer")
    return
end

print("Platform script armed on", platform:GetFullName())`}
        />
        <P>
          There is also <Strong>assert(condition, message)</Strong>, which errors when the
          condition is false and does nothing otherwise. It is the shortest way to state an
          assumption in a line that would otherwise silently proceed on nil.
        </P>
      </LessonSection>

      <OutputConsole />

      <LessonSection
        id="attempt-to-index-nil-is-the-one-you-will-see"
        title="attempt to index nil is the one you will see"
      >
        <P>
          If you learn to read one Roblox error properly, make it this one. It accounts for the
          clear majority of crashes in beginner code, and it is precise about everything except
          the thing people look at first.
        </P>
        <CodeBlock
          label="Luau"
          code={`Workspace.Obby.Laser.KillScript:5: attempt to index nil with 'Humanoid'`}
          lineTones={{ 0: "err" }}
        />
        <P>
          Read it in three pieces. The path and number say <em>where</em>: line 5 of KillScript,
          inside the Laser. <Strong>attempt to index nil</Strong> says <em>what</em>: something
          was nil and you asked it for a child. And <Strong>&apos;Humanoid&apos;</Strong> is the
          name you asked for.
        </P>
        <P>
          The trap is that <Strong>Humanoid</Strong> is not the thing that was missing. It is
          the thing you wanted <em>from</em> the thing that was missing. In{" "}
          <Strong>otherPart.Parent.Humanoid</Strong>, the nil is{" "}
          <Strong>otherPart.Parent</Strong> — and once you read it that way, the fix is obvious
          and it is a guard, not a spelling correction.
        </P>
        <ChecklistCard
          marker="arrow"
          title="Three errors and what each means"
          items={[
            "attempt to index nil with 'X' — the expression to the left of .X was nil. Guard it.",
            "attempt to call a nil value — you put () after something that is not a function. Almost always a misspelled method name.",
            "Infinite yield possible on 'WaitForChild(\"X\")' — a warning, not an error. The script is still waiting, and X probably has a typo.",
          ]}
        />
      </LessonSection>

      <LessonSection
        id="breakpoints-beat-scattering-print-statements"
        title="Breakpoints beat scattering print statements"
      >
        <P>
          Prints are excellent and they have a ceiling. Once you are adding a fourth one to work
          out which of six values is wrong, you are rebuilding a debugger badly, and Studio
          already has one.
        </P>
        <P>
          Click the gutter to the left of a line number to set a breakpoint. When execution
          reaches it the game pauses, and the <Strong>Watch</Strong> window shows you every
          variable in scope at that instant — not the ones you thought to print.
        </P>
        <CodeBlock
          label="Luau"
          code={`laser.Touched:Connect(function(otherPart)
    local character = otherPart:FindFirstAncestorOfClass("Model")
    local humanoid = character and character:FindFirstChildWhichIsA("Humanoid")
    -- Breakpoint here shows otherPart, character, and humanoid at once.
    if humanoid then
        humanoid:TakeDamage(100)
    end
end)`}
        />
        <Callout tone="warning" title="Breakpoints and Touched are an awkward pair">
          Pausing the game inside a physics event stops physics too, so stepping through a
          Touched handler can produce contact behaviour you would never see at full speed. For
          event-driven code, a well-placed print is often the more honest instrument — use
          breakpoints for logic you can reach deliberately.
        </Callout>
      </LessonSection>

      <LessonSection id="client-and-server-log-separately" title="Client and server log separately">
        <P>
          This one costs people hours. In a multi-client test, the server and each client have
          their own Output. A print from a server Script does not appear in the client&apos;s
          window, and vice versa.
        </P>
        <P>
          In single-player Play mode there is a <Strong>Client / Server</Strong> toggle in the
          Test tab that switches which context you are inspecting. A large fraction of &quot;my
          script printed nothing&quot; is the other side being selected.
        </P>
        <ChecklistCard
          marker="check"
          title="When a script appears to do nothing"
          items={[
            "Is the Output window open, and filtered so your message could appear?",
            "Are you looking at the right side — client or server?",
            "Did the print at the top of the script run at all? If not, the problem is placement, not logic.",
            "Is the script's parent a container that starts that class? Seven common placements start nothing.",
            "Is the part named what the script thinks it is named?",
            "Is the script Disabled? It is a property, it is easy to set by accident, and it produces perfect silence.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Keep the Output window open. A closed one is why a beginner thinks a script did nothing when it reported an error clearly.",
          "print is information, warn is a problem you survived, error stops the thread. Use the right one and your logs stay readable.",
          "assert(condition, message) states an assumption in one line instead of letting a nil proceed quietly.",
          "attempt to index nil with 'X' means the expression LEFT of .X was nil. X itself is spelled fine.",
          "attempt to call a nil value is almost always a misspelled method name.",
          "'Infinite yield possible' is a warning, not an error — the script is still waiting, and the name probably has a typo.",
          "Breakpoints show every variable in scope, not only the ones you thought to print — but pausing inside a physics event distorts the physics.",
          "Client and server have separate Output. Checking the wrong side is a common cause of 'it printed nothing'.",
          "A Disabled script produces perfect silence. Check the property before rewriting the logic.",
        ]}
      />
    </div>
  );
}
