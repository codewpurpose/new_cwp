import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";

export function WhereHealthTechIsHeadedLesson() {
  return (
    <div>
      <Lead>
        Predicting the future of an entire industry is usually a bad bet. Predicting the next
        few years of health tech is a safer one, because three trends are already visible today
        if you know where to look — and every one of those predictions rests on the same single
        assumption, which is worth naming rather than taking for granted.
      </Lead>

      <LessonSection id="three-trends-already-visible-today" title="Three trends already visible today">
        <P>
          <Strong>AI moving from imaging into more of the record.</Strong> The models covered in
          Part 4 started with scans because images are a clean, well-labelled data type. The
          same pattern-matching approach is already expanding into unstructured clinical notes
          and lab trends, not just pictures — the same underlying technique, aimed at messier
          data that used to be too unstructured for it to touch.
        </P>
        <P>
          <Strong>Monitoring moving earlier, before a diagnosis exists.</Strong> Part 3&apos;s
          remote monitoring largely tracks people who already have a diagnosed condition. The
          next wave targets people who don&apos;t yet — flagging early patterns that predate a
          diagnosis, not just managing one that already happened, which means it inherits the
          same estimate-versus-diagnosis gap Part 3&apos;s wearable chapters covered.
        </P>
        <P>
          <Strong>Interoperability actually finishing, not just improving.</Strong> Part 2
          showed why standards took decades to catch on. Regulatory deadlines already in motion
          are pushing that adoption from &ldquo;most large systems&rdquo; toward
          &ldquo;essentially everyone,&rdquo; closing a gap this track spent an entire part on.
        </P>
        <P>
          Each of those is already happening in some form, not just proposed. What is worth
          asking of each one is narrower than &ldquo;will this keep growing&rdquo; — it is what,
          specifically, would have to stay true for it to keep working.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "AI beyond imaging",
              tone: "neutral",
              children: (
                <>
                  <P>Already true: pattern-matching works well on clean, well-labelled scans.</P>
                  <P>Has to become true: the same accuracy on messy, inconsistently written notes.</P>
                </>
              ),
            },
            {
              title: "Monitoring before diagnosis",
              tone: "neutral",
              children: (
                <>
                  <P>Already true: wearables can already flag an abnormal pattern.</P>
                  <P>Has to become true: an early flag has to lead somewhere useful, not just more anxiety.</P>
                </>
              ),
            },
            {
              title: "Interoperability finishing",
              tone: "neutral",
              children: (
                <>
                  <P>Already true: large systems mostly speak a shared standard now.</P>
                  <P>Has to become true: smaller clinics and older systems actually adopt it too.</P>
                </>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="the-one-thing-every-prediction-here-assumes"
        title="The one thing every prediction here assumes"
      >
        <P>
          Every one of those three trends assumes the trust problems covered earlier in this
          track — bias in Part 4, access gaps in Part 5, security in this part — get managed
          well enough that adoption keeps expanding rather than stalling out after a visible
          failure. A single high-profile AI misdiagnosis, breach, or access scandal doesn&apos;t
          just damage one product; it can slow trust in the entire category for years, the way a
          plane crash affects flying more than the accident statistics justify.
        </P>
        <P>
          That is not a hypothetical framing device. A hospital system deciding whether to adopt
          an early-monitoring product is weighing the same bias and access questions this track
          has already walked through — whether the training data behind it looks like its
          patients, and whether the product works for someone without a smartphone as well as it
          does for someone with the latest one. A trend can be technically ready and still stall
          for reasons that have nothing to do with the underlying technology.
        </P>
      </LessonSection>

      <LessonSection
        id="what-doesnt-have-enough-evidence-yet"
        title="What doesn't have enough evidence yet"
      >
        <P>
          Not every confident health-tech prediction deserves the same weight as the three
          above. The clearest example is the idea of an AI system reaching a full diagnosis and
          treatment decision with no clinician reviewing it at all, for anything beyond the
          narrowest, most tightly bounded case. It is a common prediction, it makes a better
          headline than any of the three trends above, and the evidence behind it does not
          currently support it — the bias and error problems in Part 4 are not solved, they are
          managed by exactly the human review step this prediction proposes removing.
        </P>
        <ChecklistCard
          title="Questions worth asking before believing a health-tech prediction"
          items={[
            "Is this already happening somewhere in a limited form, or is it purely proposed?",
            "What specifically would have to become true for it to work at scale, not just in a pilot?",
            "Does it remove a human reviewer, or does it change what that reviewer sees?",
            "Would the failure mode be visible immediately, or would it hide the way subgroup bias hid in Part 4?",
          ]}
        />
      </LessonSection>

      <LessonSection id="what-probably-wont-change" title="What probably won't change">
        <P>
          <Strong>The clinician stays in the loop.</Strong> Nothing in the current trajectory of
          medical AI points toward removing a human reviewer from a real medical decision — if
          anything, the bias and error problems in Part 4 make that reviewer more clearly
          necessary, not less. Whatever health tech looks like in a decade, the pattern
          established across this entire track — software assisting a decision, not making it
          alone — is the one part that isn&apos;t up for negotiation.
        </P>
        <P>
          That is a genuinely different kind of prediction from the three trends above. Those
          are bets on where the technology goes next. This one is closer to a constraint the
          rest of the track has been building toward the whole time — not a guess about the
          future, but a boundary nothing so far has given a real reason to expect will move.
        </P>
        <Callout tone="tip" title="A closing note for the next chapter">
          Every trend in this chapter is still just an idea until someone builds it against a
          real, specific problem. The capstone chapter that follows is where you sketch exactly
          that.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "AI expanding beyond imaging, monitoring moving earlier before a diagnosis exists, and interoperability actually finishing are three trends already visible today, not just proposed.",
          "Each trend rests on something specific that still has to become true — the same accuracy on messier data, an early flag leading somewhere useful, and smaller clinics actually adopting the standard, not just large systems.",
          "Every one of those trends assumes the bias, access, and security problems from earlier parts of this track get managed well enough that trust keeps expanding, and a single high-profile failure can slow the whole category, not just one product.",
          "A fully autonomous AI diagnosis with no clinician reviewing it is a common prediction that the current evidence does not support — Part 4's bias and error problems are managed by human review, not solved.",
          "What almost certainly won't change is the clinician staying in the loop — health tech assisting a decision, not replacing the person making it.",
        ]}
      />
    </div>
  );
}
