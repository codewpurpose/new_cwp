import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
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
          and lab trends, not just pictures.
        </P>
        <P>
          <Strong>Monitoring moving earlier, before a diagnosis exists.</Strong> Part 3&apos;s
          remote monitoring largely tracks people who already have a diagnosed condition. The
          next wave targets people who don&apos;t yet — flagging early patterns that predate a
          diagnosis, not just managing one that already happened.
        </P>
        <P>
          <Strong>Interoperability actually finishing, not just improving.</Strong> Part 2
          showed why standards took decades to catch on. Regulatory deadlines already in motion
          are pushing that adoption from &ldquo;most large systems&rdquo; toward
          &ldquo;essentially everyone,&rdquo; closing a gap this track spent an entire part on.
        </P>
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
        <Callout tone="tip" title="A closing note for the next chapter">
          Every trend in this chapter is still just an idea until someone builds it against a
          real, specific problem. The capstone chapter that follows is where you sketch exactly
          that.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "AI expanding beyond imaging, monitoring moving earlier before a diagnosis exists, and interoperability actually finishing are three trends already visible today.",
          "Every one of those trends assumes the bias, access, and security problems from earlier parts of this track get managed well enough that trust keeps expanding.",
          "A single high-profile failure can slow trust in the entire category, not just the one product responsible for it.",
          "What almost certainly won't change is the clinician staying in the loop — health tech assisting a decision, not replacing the person making it.",
        ]}
      />
    </div>
  );
}
