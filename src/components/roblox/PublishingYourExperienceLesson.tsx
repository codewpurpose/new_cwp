import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { StepList } from "@/components/learn/primitives/StepList";

export function PublishingYourExperienceLesson() {
  return (
    <div>
      <Lead>
        Publishing is one menu item, and four settings underneath it decide whether a friend can
        actually open what you made. Walk each one, in the order that stops a finished obby from
        being unplayable.
      </Lead>

      <LessonSection id="saving-to-file-is-not-publishing" title="Saving to file is not publishing">
        <P>
          Studio offers both and they do entirely different things.{" "}
          <Strong>File → Save to File</Strong> writes an <Strong>.rbxl</Strong> onto your own
          computer, where nobody else will ever see it.{" "}
          <Strong>File → Publish to Roblox</Strong> uploads the place to Roblox&apos;s servers,
          which is the only version players can open.
        </P>
        <P>
          Once a place has been published, <Strong>Ctrl+S</Strong> saves to Roblox rather than to
          a file, and the distinction stops mattering day to day. Before that first publish, it
          matters completely: an afternoon of work saved perfectly to your desktop is an
          afternoon nobody can play.
        </P>
        <Callout tone="tip" title="Publish early, on purpose">
          Publish the moment the obby is walkable, not when it is finished. It costs nothing,
          it gives you a link you can send someone, and it makes every later publish a small
          update rather than a nervous first one.
        </Callout>
      </LessonSection>

      <LessonSection id="a-place-lives-inside-an-experience" title="A place lives inside an experience">
        <P>
          The vocabulary from the first chapter matters here, because the publish dialog uses it
          and the settings live at different levels.
        </P>
        <LabelRows
          rows={[
            {
              label: "Place",
              text: "One level. Your obby is a place. A place has its own settings, and it is what Studio actually uploads.",
            },
            {
              label: "Experience",
              text: "The thing players search for and follow, with a name, an icon, and a thumbnail. It contains one or more places, one of which is the start place.",
            },
            {
              label: "Start place",
              text: "The place players land in. If you add more places later, teleporting between them is code you write; nothing is automatic.",
            },
          ]}
        />
        <P>
          The consequence that catches people: some settings belong to the place and some to the
          experience, and they are edited in different windows. Making a place public does not
          make the experience public, and that is the single most common reason a friend gets an
          error page from a working obby.
        </P>
      </LessonSection>

      <LessonSection id="private-by-default-and-what-changes-it" title="Private by default, and what changes it">
        <P>
          Every new experience is private. You can play it, and nobody else can — not with a
          link, not by searching, not by being your friend.
        </P>
        <StepList
          variant="timeline"
          steps={[
            {
              label: "Publish the place",
              detail: "File → Publish to Roblox. Give the experience a name and a description. It is live, and it is private.",
            },
            {
              label: "Open the Creator Dashboard",
              detail: "From Studio, or at create.roblox.com. This is where experience-level settings live, not in Studio's own settings window.",
            },
            {
              label: "Set the experience to Public",
              detail: "Under the experience's permissions. This is the step people miss — the place being published is not the same as the experience being open.",
            },
            {
              label: "Send the link and have someone else try it",
              detail: "Someone not on your account. You cannot test 'can other people open this' from the account that owns it.",
            },
          ]}
        />
        <Callout tone="warning" title="Test with an account that is not yours">
          The owner can always open their own experience regardless of permissions, so
          everything looks correct from where you are sitting. If a friend cannot get in,
          permissions are the first thing to check and the last thing anyone checks.
        </Callout>
      </LessonSection>

      <LessonSection
        id="the-age-rating-questionnaire-is-mandatory"
        title="The age rating questionnaire is mandatory"
      >
        <P>
          Roblox requires a completed maturity questionnaire before an experience can be made
          broadly available. It asks about violence, language, realistic hazards, user
          interaction, and whether you sell anything, and it produces an age label that
          determines who can find your experience.
        </P>
        <P>
          Answer it honestly. It is not a formality, and getting it wrong in either direction has
          real consequences: understate and the experience can be restricted or taken down;
          overstate and you have narrowed your audience for nothing.
        </P>
        <P>
          For a standard obby the answers are usually straightforward — an obby is not violent in
          the sense the questionnaire means, and a killbrick is not realistic harm. The question
          that most often surprises people is the one about player interaction: if your
          experience has a chat, that counts, and chat is on by default.
        </P>
      </LessonSection>

      <LessonSection
        id="updating-a-live-experience-without-breaking-it"
        title="Updating a live experience without breaking it"
      >
        <P>
          Once people are playing, publishing is no longer a neutral act. A publish replaces the
          place immediately, and anyone in a server that starts afterwards gets your new version
          — including the half-finished thing you were in the middle of.
        </P>
        <CompareGrid
          items={[
            {
              title: "Safe habit",
              tone: "positive",
              children: (
                <P>
                  Do risky work in a separate place, or in a copy, and publish over the live one
                  only when it plays. Studio&apos;s Team Test lets you try a build without
                  publishing it at all.
                </P>
              ),
            },
            {
              title: "What goes wrong",
              tone: "caution",
              children: (
                <P>
                  Publishing mid-edit with a part deleted, a script disabled, or an unanchored
                  section. It is live for everyone within a minute and there is no undo button
                  on the server.
                </P>
              ),
            },
          ]}
        />
        <P>
          Roblox keeps a version history for each place, and you can restore an older version
          from the Creator Dashboard. Knowing that exists before you need it is the point of
          mentioning it.
        </P>
        <ChecklistCard
          marker="check"
          title="Before you publish over a live obby"
          items={[
            "Every static part is anchored — walk the whole course once in Play mode.",
            "No script is Disabled that should not be, and no debugging print is left shouting on every touch.",
            "The spawn point is where you think it is, and a fresh player can reach the first obstacle.",
            "You have tested with two players, not one. The debounce and platform bugs in this track only appear with company.",
            "The experience is Public and the age questionnaire is complete, if you want anyone to find it.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "Save to File writes to your computer; Publish to Roblox uploads the copy players open. Before your first publish these are completely different acts.",
          "A place is one level; an experience contains places and is what players search for. Their settings live in different windows.",
          "Publishing a place does not make the experience public. That is the most common reason a friend gets an error page.",
          "Every new experience is private by default, and the owner can always open their own — so test with an account that is not yours.",
          "The maturity questionnaire is required before broad availability. Chat counts as player interaction, and it is on by default.",
          "Publishing replaces the live place immediately. Anyone joining a new server gets whatever state you were in.",
          "Roblox keeps place version history and you can restore an earlier one from the Creator Dashboard. Learn that before you need it.",
          "Publish early, while the obby is merely walkable. It makes every later publish an update rather than an event.",
        ]}
      />
    </div>
  );
}
