import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function WhatIsRobloxStudioLesson() {
  return (
    <div>
      <Lead>
        Studio looks like a level editor, and it is also a server, a client, and a publishing
        pipeline running together on your laptop. Knowing which of those you are looking at
        before you write a line matters, because each one fails in a different way.
      </Lead>

      <LessonSection id="one-program-wearing-three-hats" title="One program wearing three hats">
        <P>
          The obvious reading of Studio is that it is where you drag blocks around. That is
          true and it is the least interesting third of it. When you press Play, Studio stops
          being an editor and starts being an actual Roblox server, with an actual Roblox
          client connected to it, both running inside the same window.
        </P>
        <P>
          This is why the same script can work while you are editing and fail the moment you
          test, or work in a test and fail in a real server. You have not moved the script.
          You have changed which of Studio&apos;s three hats is on.
        </P>
        <LabelRows
          rows={[
            {
              label: "Editor",
              text: "The tree of objects sits still and you rearrange it. Nothing is running; scripts are inert text.",
            },
            {
              label: "Runtime",
              text: "Press Play and Studio starts a server, connects a client to it, and runs your scripts on both. This is the mode where bugs live.",
            },
            {
              label: "Publisher",
              text: "File → Publish uploads the tree to Roblox's servers, where other people's clients will connect to it.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="an-experience-is-not-a-file-on-your-laptop"
        title="An experience is not a file on your laptop"
      >
        <P>
          You can save a <Strong>.rbxl</Strong> file to your desktop, and doing so publishes
          nothing. What players open is a copy Roblox is hosting, and it only changes when you
          push a new one. A saved file and a published place are two separate things that
          happen to contain the same objects.
        </P>
        <P>
          Roblox&apos;s own vocabulary makes this worse before it makes it better. A{" "}
          <Strong>place</Strong> is one level. An <Strong>experience</Strong> is the thing
          players search for, and it contains one or more places, one of which is the start
          place. Your obby is a place; the page with the play button on it is an experience.
        </P>
        <Callout tone="warning" title="The version everyone loses work to">
          Studio does not autosave to Roblox. It autosaves locally, into a recovery folder,
          and if you have been editing a published place all afternoon without pressing
          publish, none of that afternoon is live. Publish early — the last chapter of this
          track is about doing it deliberately.
        </Callout>
      </LessonSection>

      <LessonSection id="the-four-windows-you-will-live-in" title="The four windows you will live in">
        <P>
          Studio has dozens of panels and you will use four of them almost exclusively. If any
          are missing, they are all under the <Strong>View</Strong> tab.
        </P>
        <LabelRows
          rows={[
            {
              label: "Explorer",
              text: "The tree of every object in the place. This is not a file browser — it is the running state of the game, and the next chapter is entirely about it.",
            },
            {
              label: "Properties",
              text: "Every setting on whatever is selected in the Explorer. Anything you can change here, a script can change too, using the same name.",
            },
            {
              label: "Output",
              text: "Where print goes and where errors land. Keep it open permanently. A closed Output window is why a beginner thinks their script did nothing.",
            },
            {
              label: "Toolbox",
              text: "Other people's models. Useful, and the usual way a place acquires a script nobody wrote — check what you insert.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="luau-is-lua-with-the-edges-filed-off"
        title="Luau is Lua with the edges filed off"
      >
        <P>
          Roblox does not run Lua. It runs <Strong>Luau</Strong>, its own fork — the syntax you
          will find in a Lua tutorial from 2009 mostly still works, and the parts Roblox has
          added are the parts worth using.
        </P>
        <P>
          Two differences show up on your first day. Luau has an optional type system, so you
          can write <Strong>local health: number = 100</Strong> and have Studio catch a
          mistake before you run it. And Luau has a proper task scheduler, which is why{" "}
          <Strong>task.wait()</Strong> exists alongside the older <Strong>wait()</Strong>.
        </P>
        <CodeBlock
          label="Luau"
          code={`-- The old global. Throttled to about 30 updates a second, and it drifts
-- further the busier the server gets.
wait(1)

-- The scheduler-aware version. Resumes on the next frame after the time is up.
task.wait(1)`}
          lineTones={{ 2: "dim", 3: "warn" }}
        />
        <P>
          Use <Strong>task.wait</Strong>. Every example in this track does. You will still meet{" "}
          <Strong>wait()</Strong> constantly in older tutorials and in free models, and now you
          know what it is and why it was replaced.
        </P>
      </LessonSection>

      <LessonSection
        id="what-studio-will-happily-let-you-do-wrong"
        title="What Studio will happily let you do wrong"
      >
        <P>
          This is the honest part, and it is the reason this track spends four chapters on
          fundamentals before building anything. Studio has almost no opinions about what you
          are doing, and it warns you about very little.
        </P>
        <P>
          It will let you put a script somewhere it can never run, and say nothing. It will let
          you name two parts the same thing. It will let you write a killbrick that works
          perfectly alone and fails with two players in the server. None of these produce an
          error, a red underline, or a message. They produce a game that does not do what you
          expected, and no explanation.
        </P>
        <Callout tone="tip" title="The one habit worth forming today">
          Keep the Output window open, and put a <Strong>print</Strong> at the top of every
          script you write. When something does nothing, the first question is always whether
          the script ran at all — and that one line answers it in a second instead of an hour.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Studio is an editor, a live server and client, and a publisher. Most confusing behaviour comes from expecting one of those while looking at another.",
          "Saving a file is not publishing. Players open Roblox's hosted copy, which changes only when you push a new one.",
          "A place is one level; an experience is what players search for and can hold several places.",
          "Explorer, Properties, Output, and Toolbox are the four panels you will actually use. All of them live under the View tab.",
          "Roblox runs Luau, not Lua — an optional type system and a real task scheduler are the differences you will notice first.",
          "Prefer task.wait() over wait(). The older global is throttled to roughly 30Hz and drifts further as the server gets busier.",
          "Studio warns you about almost nothing. A script in the wrong place produces silence, not an error.",
        ]}
      />
    </div>
  );
}
