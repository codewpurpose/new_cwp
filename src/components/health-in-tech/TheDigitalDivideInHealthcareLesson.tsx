import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { DigitalDivideChart } from "@/components/health-in-tech/DigitalDivideChart";

export function TheDigitalDivideInHealthcareLesson() {
  return (
    <div>
      <Lead>
        Every telemedicine pitch assumes the same three things without saying so: a working
        device, a reliable internet connection, and enough comfort with both to actually use
        them during an appointment. For a meaningful share of patients, at least one of those
        three assumptions is false.
      </Lead>

      <LessonSection
        id="telemedicine-assumes-a-device-and-a-connection"
        title="Telemedicine assumes a device and a connection"
      >
        <P>
          A video visit is not free to access just because it saves a drive to the clinic. It
          requires a device with a working camera and microphone, a connection stable enough to
          hold a video call without dropping, and — quietly assumed underneath both — enough
          familiarity with the software to join the call unassisted. Remove any one of those and
          the &ldquo;more convenient&rdquo; option stops being an option at all.
        </P>
      </LessonSection>

      <LessonSection id="who-gets-left-out-by-that-assumption" title="Who gets left out by that assumption">
        <P>
          The gap is not evenly spread. Compare access across a few different groups below —
          the difference between the best-connected and least-connected group is not a rounding
          error, it is the difference between a product that works for someone and one that
          quietly does not.
        </P>
      </LessonSection>

      <DigitalDivideChart />

      <LessonSection
        id="closing-the-gap-is-part-of-the-product-not-an-afterthought"
        title="Closing the gap is part of the product, not an afterthought"
      >
        <P>
          <Strong>A phone-only fallback, not just a video option</Strong>, closes most of the
          device gap at once — a basic phone call still gets a patient a real consultation, even
          without a smartphone or broadband. Clinics that keep an in-person or phone path
          genuinely available, rather than treating it as a legacy option nobody should need
          anymore, are the ones that do not quietly lose exactly the patients who most need
          consistent care.
        </P>
        <Callout tone="warning" title="A pattern worth naming directly">
          Building the video-first version, shipping it, and treating access as a follow-up
          feature to add later is how a well-intentioned product ends up serving its
          best-connected users first and its most vulnerable users last, or never.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A video visit silently assumes a working device, a stable connection, and comfort using both — remove any one and it stops being an option.",
          "That access gap is not evenly spread — it concentrates in lower-income, rural, and older populations, exactly the groups who often need care most consistently.",
          "A phone-only fallback closes most of the device gap at once, without requiring a smartphone or broadband at all.",
          "Treating access as a feature to add later, after a video-first launch, is how a well-meaning product ends up serving its best-connected users first.",
        ]}
      />
    </div>
  );
}
