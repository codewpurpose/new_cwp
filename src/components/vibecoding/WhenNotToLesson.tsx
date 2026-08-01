import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { StepList } from "@/components/learn/primitives/StepList";

export function WhenNotToLesson() {
  return (
    <div>
      <Lead>
        A course that only argues for its subject is marketing. Here is the honest accounting:
        the situations where reaching for an AI makes things slower, worse, or genuinely
        irresponsible — and how to recognise them before you are already in one.
      </Lead>

      <LessonSection id="when-you-are-learning" title="When the point is that you learn it">
        <P>
          The clearest case. If you are working through an exercise to understand recursion,
          having it written for you removes the entire value of the exercise. You will recognise
          the solution, feel that you understood it, and be unable to reproduce it a week later.
        </P>
        <P>
          Recognition is not the same as comprehension, and AI output produces recognition very
          efficiently. When learning is the goal, struggle is not an obstacle to it — it{" "}
          <Strong>is</Strong> the mechanism.
        </P>
        <Callout tone="tip" title="A middle path">
          Write it yourself first, however badly. Then ask for a critique of what you wrote. You
          get the struggle and the feedback, which is strictly better than either alone.
        </Callout>
      </LessonSection>

      <LessonSection id="when-you-cannot-verify" title="When you cannot verify the answer">
        <P>
          This is the deepest one. AI output is only as safe as your ability to tell whether it
          is right. In a domain you know, a wrong answer looks wrong. In a domain you do not,
          a wrong answer looks like an answer.
        </P>
        <StepList
          steps={[
            { label: "Cryptography", detail: "Code that is subtly wrong runs perfectly and protects nothing." },
            { label: "Concurrency", detail: "A race condition passes every test you write and fails in production at 3am." },
            { label: "Numerical and financial code", detail: "Rounding and precision errors are invisible until they are audited." },
            { label: "Anything safety-related", detail: "Medical, legal, structural. The cost of being confidently wrong is not measured in developer time." },
          ]}
        />
        <P>
          The rule: if you could not tell a correct answer from a plausible one, you are not
          reviewing — you are hoping.
        </P>
      </LessonSection>

      <LessonSection id="when-it-is-faster-to-type" title="When it is genuinely faster to type it">
        <P>
          Describing a three-line change precisely takes longer than making it. Writing the
          prompt, waiting, reading the diff, and correcting the parts it over-reached on is
          real overhead — and for small, well-understood edits it exceeds the work.
        </P>
        <P>
          Watch for the tell: if you are on your third prompt for something you could have typed
          in a minute, you are not being efficient, you are avoiding starting.
        </P>
      </LessonSection>

      <LessonSection id="when-it-is-not-yours-to-share" title="When the code is not yours to share">
        <P>
          Prompts leave your machine. Depending on your tool and plan, they may be retained,
          reviewed, or used for training. Before pasting, check whether you are allowed to:
        </P>
        <StepList
          steps={[
            { label: "Employer policy", detail: "Many organisations restrict which tools may touch their source." },
            { label: "Client confidentiality", detail: "Contract terms often cover disclosure to third-party services." },
            { label: "Personal data", detail: "Real customer records in a prompt can be a regulatory problem regardless of intent." },
            { label: "Licence terms", detail: "Some code cannot be redistributed, and a prompt is a form of transmission." },
          ]}
        />
      </LessonSection>

      <LessonSection id="when-the-thread-is-lost" title="When the loop has stopped converging">
        <P>
          A specific in-the-moment signal, worth naming because it is easy to miss while it is
          happening: each fix creates the next problem, and you have stopped moving toward
          working software.
        </P>
        <P>
          After the second failure, close the conversation. Read the code yourself. Write a
          minimal reproduction. Frequently you find the actual cause in five minutes — and it
          was something the model could never have seen.
        </P>
      </LessonSection>

      <LessonSection id="the-underlying-principle" title="The principle underneath all of these">
        <P>
          Every case here is the same rule wearing different clothes:{" "}
          <Strong>AI is an accelerator, and accelerating is only good when you know where you
          are going</Strong>.
        </P>
        <P>
          When you can judge the output, it makes you dramatically faster. When you cannot, it
          makes you faster at producing something you cannot evaluate — which is not the same
          thing, and is occasionally much worse than being slow.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "When learning is the point, the struggle is the mechanism. Write it first, then ask for a critique.",
          "If you could not tell a correct answer from a plausible one, you are hoping, not reviewing.",
          "For a three-line change, typing it is often faster than describing it.",
          "Check what you are allowed to send before you paste. Prompts leave your machine.",
          "When each fix creates the next problem, stop and read the code yourself.",
          "Accelerating is only useful when you know where you are going.",
        ]}
      />
    </div>
  );
}
