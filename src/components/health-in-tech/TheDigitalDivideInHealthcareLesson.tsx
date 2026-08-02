import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { ChecklistCard, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Callout } from "@/components/learn/primitives/Callout";
import { DigitalDivideChart } from "@/components/health-in-tech/DigitalDivideChart";

export function TheDigitalDivideInHealthcareLesson() {
  return (
    <div>
      <Lead>
        Every telemedicine pitch assumes the same three things without saying so: a working
        device, a reliable internet connection, and enough comfort with both to actually use them
        during an appointment. For a meaningful share of patients, at least one of those three
        assumptions is false.
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
        <P>
          Broadband access alone splits sharply by geography and income — rural households and
          lower-income urban households are meaningfully less likely to have a reliable home
          connection than the households a product team testing the app is likely to resemble.
          Device access splits differently again: a shared family phone with a data cap is not the
          same resource as a personal laptop on unlimited home broadband, even though both
          technically count as &ldquo;having a device&rdquo; on a survey.
        </P>
      </LessonSection>

      <LessonSection id="who-gets-left-out-by-that-assumption" title="Who gets left out by that assumption">
        <P>
          The gap is not evenly spread. Compare access across a few different groups below — the
          difference between the best-connected and least-connected group is not a rounding error,
          it is the difference between a product that works for someone and one that quietly does
          not.
        </P>
      </LessonSection>

      <DigitalDivideChart />

      <LessonSection
        id="literacy-language-and-disability-are-part-of-the-same-gap"
        title="Literacy, language, and disability are part of the same gap"
      >
        <P>
          The chart above measures two of the assumptions from earlier — a device and a
          connection. A patient can clear both and still be left out by three more, none of which
          show up on a broadband coverage map.
        </P>
        <LabelRows
          rows={[
            {
              label: "Digital literacy",
              text: "Owning a smartphone doesn't mean navigating a patient portal, joining a video call unassisted, or troubleshooting a dropped connection mid-appointment is second nature — especially for a patient who has rarely needed to do any of it before.",
            },
            {
              label: "Language",
              text: "A platform built and tested in English quietly assumes the patient's preferred language is English too, even in places where arranging a live interpreter for an in-person visit is routine and arranging one for a video call is not.",
            },
            {
              label: "Disability",
              text: "A blind patient using a screen reader, or a deaf patient who needs captions or an interpreter on the call, gets left out by a video interface that was built and tested without either in mind.",
            },
          ]}
        />
        <P>
          None of these three is solved by better broadband. They are a different obstacle stacked
          on top of the same divide, and a product that only measures &ldquo;do our users have a
          device and a connection&rdquo; will miss all three of them at once.
        </P>
      </LessonSection>

      <LessonSection
        id="closing-the-gap-is-part-of-the-product-not-an-afterthought"
        title="Closing the gap is part of the product, not an afterthought"
      >
        <P>
          <Strong>A phone-only fallback, not just a video option</Strong>, closes most of the
          device gap at once — a basic phone call still gets a patient a real consultation, even
          without a smartphone or broadband. Clinics that keep an in-person or phone path
          available, rather than treating it as a legacy option nobody should need anymore, are the
          ones that do not quietly lose exactly the patients who most need consistent care.
        </P>
        <Callout tone="warning" title="A pattern worth naming directly">
          Building the video-first version, shipping it, and treating access as a follow-up feature
          to add later is how a well-intentioned product ends up serving its best-connected users
          first and its most vulnerable users last, or never.
        </Callout>
        <ChecklistCard
          title="What an accessible telehealth product actually requires"
          items={[
            "A phone-only path that needs no app, no login, and no broadband — just a phone number.",
            "An interface available in more than one language, with a live interpreter actually reachable during the call itself.",
            "A portal and video client tested with a screen reader, and captions or interpretation built in for deaf and hard-of-hearing patients.",
            "Onboarding that assumes zero prior comfort with video calls, not a help page a struggling patient has to go find on their own.",
          ]}
        />
      </LessonSection>

      <TakeawayCard
        items={[
          "A video visit silently assumes a working device, a stable connection, and comfort using both — remove any one and it stops being an option.",
          "That access gap concentrates in lower-income, rural, and older populations — exactly the groups who often need consistent care the most.",
          "Digital literacy, language, and disability are three more barriers layered on top of device and connection access, and none of them show up on a broadband coverage map.",
          "A phone-only fallback closes most of the device gap at once, without requiring a smartphone or broadband at all.",
          "Treating access as a feature to add later, after a video-first launch, is how a well-meaning product ends up serving its best-connected users first — and widening exactly the gap it set out to close.",
        ]}
      />
    </div>
  );
}
