import { Callout } from "@/components/learn/primitives/Callout";
import { ChecklistCard, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function FaceDetectionAndPrivacyLesson() {
  return (
    <div>
      <Lead>
        &ldquo;Facial recognition&rdquo; gets used as one phrase for two technically different
        things a camera can do to your face, and the difference between them is not a footnote —
        it is most of the actual ethical argument. Unlocking your phone and identifying you in a
        crowd run on related code. They are not the same act.
      </Lead>

      <LessonSection
        id="detection-finds-a-face-recognition-names-it"
        title="Detection finds a face, recognition names it"
      >
        <P>
          Face <Strong>detection</Strong> is the object-detection problem from earlier in this
          track with one class: is there a face here, and where. It answers no questions about
          whose face it is. A camera doing pure face detection can tell you a photo contains three
          faces and draw a box around each without having the faintest idea who any of them belong
          to.
        </P>
        <P>
          Face <Strong>recognition</Strong> is a second, separate step bolted on afterwards: take
          the detected face, turn it into a numeric representation, and compare that representation
          against a database of known identities to find a match. Detection is &ldquo;a face is
          here&rdquo;. Recognition is &ldquo;that face is Alex&rdquo;. Products routinely blur the
          two together in marketing copy; the underlying systems do not.
        </P>
      </LessonSection>

      <LessonSection id="the-line-between-them-is-consent" title="The line between them is consent">
        <P>
          Here is why the distinction matters ethically rather than just technically. Unlocking
          your phone with your own face is recognition you enrolled yourself in, for a purpose you
          chose, matched against a database of exactly one identity that you control. You opted
          in, you can opt out, and the only person it identifies is you.
        </P>
        <P>
          A camera over a public square running the same underlying recognition technology against
          a database of thousands of strangers who never enrolled, never consented, and in most
          cases never learn it happened, is the same technology aimed at a completely different
          consent situation. <Strong>The code can be nearly identical. The ethics are not.</Strong>{" "}
          &ldquo;It&rsquo;s just facial recognition&rdquo; treats a phone unlock and a surveillance
          camera as one category, when the entire difference that matters sits in who agreed to
          what.
        </P>
      </LessonSection>

      <LessonSection
        id="error-rates-that-are-not-even-across-faces"
        title="Error rates that are not even across faces"
      >
        <P>
          The previous chapter&rsquo;s Gender Shades findings apply directly here, and soberly: that
          research measured commercial facial-analysis error rates as high as 34% for darker-skinned
          women against under 1% for lighter-skinned men, on systems already deployed commercially.
          A wrongful match from a recognition system is not an abstract inconvenience — it can mean
          being stopped, questioned, or investigated for something you did not do.
        </P>
        <P>
          When that harm falls unevenly across who you are, the consent problem from the previous
          section gets worse, not better. A system already being used on people who never agreed to
          it, making more mistakes about some of those people than others, compounds the two
          problems rather than keeping them separate.
        </P>
      </LessonSection>

      <LessonSection id="rules-that-exist-because-of-this" title="Rules that exist because of this">
        <P>
          None of this stayed theoretical. Several cities and police departments in the United
          States have restricted or banned police use of facial recognition outright, after
          documented wrongful arrests traced back to recognition errors. A number of large
          companies paused or ended sales of facial recognition to law enforcement following the
          same evidence.
        </P>
        <ChecklistCard
          title="Rules already on the books"
          items={[
            "The EU's GDPR classes biometric data used to uniquely identify a person, including facial recognition templates, as a special category requiring explicit consent and a lawful basis.",
            "The EU AI Act specifically restricts real-time remote biometric identification in public spaces by law enforcement, treating it as high-risk rather than routine.",
            "Multiple U.S. cities and states have banned or restricted government use of facial recognition following documented wrongful-arrest cases.",
            "Several major vendors halted sales of facial recognition to police departments after independent audits confirmed uneven error rates across demographic groups.",
          ]}
        />
        <Callout tone="note" title="Not a hypothetical concern">
          These are not proposals or thought experiments — they are rules and corporate policies
          that already exist, written specifically because detection quietly turning into
          recognition, aimed at people who never consented, already caused documented harm.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Face detection answers 'is there a face here'; face recognition additionally matches that face against a known identity — two different technical steps routinely described as one.",
          "Unlocking your own phone is recognition you consented to, for a database of one; a public camera matching strangers against a database they never joined is the same technology under an opposite consent situation.",
          "Documented research found facial-recognition error rates far higher for darker-skinned women than for lighter-skinned men, meaning the harm of a wrongful match falls unevenly.",
          "Real, documented wrongful arrests led multiple cities and companies to restrict or end police use of facial recognition.",
          "The EU's GDPR and AI Act specifically single out biometric identification for stricter rules — this is already shaped policy, not a hypothetical concern.",
        ]}
      />
    </div>
  );
}
