import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function ClientAndServerLesson() {
  return (
    <div>
      <Lead>
        Your obby runs on Roblox&apos;s server and on every player&apos;s own machine at once,
        and by default they disagree. Move a part from a LocalScript, watch it move for exactly
        one person, and see why a killbrick cannot live there.
      </Lead>

      <LessonSection
        id="the-server-is-the-copy-everybody-shares"
        title="The server is the copy everybody shares"
      >
        <P>
          When six people join your obby, there are seven copies of it running. One on
          Roblox&apos;s server, and one on each player&apos;s computer. The server&apos;s copy
          is the real one; each player&apos;s copy is a local mirror that exists so the game
          can draw a frame without asking the server about every brick first.
        </P>
        <P>
          Everything confusing about Roblox scripting comes from this. Not because it is
          complicated — because a script never says which copy it is running on, and looks
          identical either way.
        </P>
      </LessonSection>

      <LessonSection id="a-localscript-runs-on-one-machine-only" title="A LocalScript runs on one machine only">
        <P>
          A <Strong>Script</Strong> runs once, on the server. A <Strong>LocalScript</Strong>{" "}
          runs once <em>per player</em>, on that player&apos;s machine, and it can only see
          that player&apos;s copy of the world.
        </P>
        <P>
          So a LocalScript that turns the laser green turns it green for the person running it
          and for absolutely nobody else. Everyone else keeps seeing red. Neither player can
          tell anything is wrong, and no error is produced.
        </P>
        <CodeBlock
          label="Luau"
          code={`-- In a LocalScript. Runs on one machine.
workspace.Obby.Laser.BrickColor = BrickColor.new("Lime green")

-- That player now sees a green laser.
-- Every other player still sees red. The server still says red.`}
          lineTones={{ 4: "warn" }}
        />
        <Callout tone="note" title="This is a feature far more often than a bug">
          Changes that should only be seen by one person — a highlight on the block they are
          looking at, a preview of where they are about to build, their own camera — are
          exactly what the client is for. Doing that work on the server would broadcast it to
          everybody.
        </Callout>
      </LessonSection>

      <LessonSection id="replication-flows-one-way-by-default" title="Replication flows one way by default">
        <P>
          The rule is short and worth memorising exactly.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Server changes something",
              detail: "It replicates to every client automatically. This is why a server script moving a platform moves it for everyone.",
            },
            {
              label: "Client changes something",
              detail: "It stays on that client. Nothing is sent to the server, and nothing reaches the other players.",
            },
            {
              label: "Client wants the server to act",
              detail: "It must ask, through a RemoteEvent. The server receives the request and decides whether to honour it.",
            },
          ]}
        />
        <P>
          That third step is where a lot of Roblox architecture lives, and an obby barely needs
          it — almost everything you build in this track happens on the server, which is one
          reason an obby is a good first project.
        </P>
        <P>
          The word to be careful with is &quot;asks&quot;. A RemoteEvent is a request from a
          machine the player controls, so a server that does whatever a RemoteEvent tells it is
          exactly as exploitable as having no server at all.
        </P>
      </LessonSection>

      <LessonSection
        id="why-the-killbrick-has-to-be-a-server-script"
        title="Why the killbrick has to be a server Script"
      >
        <P>
          Put the killbrick logic in a LocalScript and it will appear to work. You will touch
          the laser, you will die, and you will conclude it is finished.
        </P>
        <P>
          It is not. You died on your own machine, and the server was never told. To the server
          and to every other player you are alive and standing in the laser. Worse, the player
          owns the machine that decided this, so anyone who wants to can simply not run it.
        </P>
        <CompareGrid
          items={[
            {
              title: "Server Script",
              tone: "positive",
              children: (
                <P>
                  Damage, checkpoints, scoring, spawning, anything that persists. One copy,
                  authoritative, and out of reach of the player.
                </P>
              ),
            },
            {
              title: "LocalScript",
              tone: "caution",
              children: (
                <P>
                  Camera, input, interface, and effects only that player should see. Assume
                  anything here can be read, changed, or switched off by the person running it.
                </P>
              ),
            },
          ]}
        />
        <Callout tone="danger" title="Never trust a number the client sent you">
          If a client tells the server &quot;I finished the obby in 12 seconds&quot;, the
          server has learned nothing except that the client sent that message. The server
          should be the one holding the stopwatch. This is not paranoia about Roblox
          specifically — it is the same rule as every networked game ever written.
        </Callout>
      </LessonSection>

      <LessonSection id="test-the-split-before-you-trust-it" title="Test the split before you trust it">
        <P>
          Studio can run both sides at once, and this is the feature that turns the client and
          server split from an abstraction into something you can see.
        </P>
        <StepList
          steps={[
            {
              label: "Test tab → Players → set to 2",
              detail: "Then press Start. Studio opens one server window and two client windows.",
            },
            {
              label: "Watch the Explorer in each",
              detail: "The server window and each client window show their own copy of the tree. Change something in one and see what the others do.",
            },
            {
              label: "Use the Client/Server toggle",
              detail: "In the single-player Play mode, this switches which side the command bar and Output are talking to. Most 'my script did nothing' reports are the wrong side being selected.",
            },
          ]}
        />
        <P>
          Two players is also the minimum to catch the class of bug the rest of this track keeps
          returning to. A killbrick with a single shared debounce, and a one-way platform with a
          single shared <Strong>CanCollide</Strong>, are both perfect with one player and broken
          with two.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "Six players means seven running copies of the game: one server, six clients. The server's copy is the real one.",
          "A Script runs once on the server. A LocalScript runs once per player, on that player's machine.",
          "A client change stays on that client. Nobody else sees it, and no error tells you so.",
          "A server change replicates to every client automatically. That is why gameplay logic belongs on the server.",
          "A client can only ask the server to act, through a RemoteEvent — and the server must treat every such request as untrusted.",
          "A killbrick in a LocalScript appears to work and is not real: the server never learns you died, and the player can switch it off.",
          "Anything that persists or affects others goes on the server. Camera, input, and one-player effects go on the client.",
          "Test with two players. A single shared debounce or a single shared CanCollide is flawless alone and broken in company.",
        ]}
      />
    </div>
  );
}
