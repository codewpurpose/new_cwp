import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function VisionInSelfDrivingCarsLesson() {
  return (
    <div>
      <Lead>
        Every model in this track so far has had the luxury of being asked twice if it was unsure.
        A self-driving car cannot ask again. It has a fraction of a second, one pass through
        whatever the cameras and other sensors currently agree on, and then it has already braked
        or already not, with nothing to revise it.
      </Lead>

      <LessonSection
        id="a-decision-with-no-time-to-double-check"
        title="A decision with no time to double-check"
      >
        <P>
          A car moving at highway speed covers roughly 30 metres every second. Convert that to
          something more concrete: a vision pipeline that takes 200 milliseconds to decide
          &ldquo;object ahead, brake&rdquo; has already let the car travel about 6 metres before
          the decision even exists, before the brakes have engaged at all.
        </P>
        <P>
          Every one of the metrics built up across this track — accuracy, mAP, IoU thresholds — was
          computed offline, with no clock running, no consequence to being slow. In a car, latency
          is not a performance detail to optimise later. It is subtracted directly from the
          stopping distance the vehicle has left, before a single millisecond of thinking about
          model accuracy even starts.
        </P>
      </LessonSection>

      <LessonSection id="why-no-camera-works-alone" title="Why no camera works alone">
        <P>
          A camera is excellent at classifying and reading — it can tell a stop sign from
          a yield sign, read a speed limit, recognise a pedestrian&rsquo;s posture. It is also
          exactly as blind as your own eyes in direct low sun, heavy rain, or full darkness, because
          it is measuring the same thing your eyes measure: visible light bouncing off surfaces.
        </P>
        <P>
          That is why no production self-driving system trusts a camera by itself. Radar keeps
          working in rain, fog and darkness that would blind a camera, and measures distance and
          closing speed directly and precisely — but it is weak at telling you what kind of object
          it found, a plastic bag and a small dog can look similar to it. Lidar gives precise 3D
          distance to every surface it hits regardless of lighting, at real hardware cost, and can
          struggle with dark or reflective surfaces that absorb or scatter its laser pulses.
        </P>
        <CompareGrid
          items={[
            {
              title: "Camera",
              tone: "neutral",
              children: (
                <P>Best at classification and reading text. Fails in glare, rain, and darkness.</P>
              ),
            },
            {
              title: "Radar",
              tone: "neutral",
              children: (
                <P>Reliable distance and speed in poor visibility. Weak at object type.</P>
              ),
            },
            {
              title: "Lidar",
              tone: "neutral",
              children: (
                <P>Precise 3D distance in any light. Expensive, and struggles with some surfaces.</P>
              ),
            },
          ]}
          columns={3}
        />
      </LessonSection>

      <LessonSection id="when-the-sensors-disagree" title="When the sensors disagree">
        <P>
          Combining sensor readings is called sensor fusion, and the hard part is not the
          combining — it is what to do the moment the camera says one thing and radar says
          another. A tempting answer is to average the two readings. It is also close to the worst
          option available: averaging a correct radar distance with an incorrect camera-based
          depth guess produces a number that is wrong in a new way, confidently.
        </P>
        <P>
          Production systems instead generally weight each sensor by which one is more reliable for
          the specific kind of measurement and the specific condition. Radar&rsquo;s distance
          reading is trusted over a camera&rsquo;s depth estimate, because depth from a single
          camera is an inference, not a direct measurement. A camera&rsquo;s read of an object&rsquo;s
          class is trusted over radar&rsquo;s, because radar was never built to answer that
          question. <Strong>Fusion is a policy about which sensor gets believed for which question,
          not an average of everything the car currently hears.</Strong>
        </P>
      </LessonSection>

      <LessonSection id="the-cases-that-still-break-it" title="The cases that still break it">
        <P>
          None of this makes the problem solved, and it is worth being honest about where it still
          fails. An object with no real equivalent in the training data — an overturned trailer
          lying across a lane, a mattress that fell off a truck — can be missed entirely or
          misclassified, because the model has nothing in its experience to match it against.
        </P>
        <P>
          Construction zones are a standing problem: lane markings that contradict the permanent
          ones underneath, temporary signage, cones arranged in a pattern no dataset fully
          anticipated. And adverse weather remains the case that degrades every sensor at once —
          heavy snow scatters lidar, fog attenuates radar less than camera but still measurably, and
          a camera in blowing snow can lose the road entirely. These are not edge cases in the
          abstract; each of them has caused real, documented incidents in deployed systems.
        </P>
        <Callout tone="warning" title="No sensor stack is condition-independent">
          Every sensor degrades under some real-world condition. The engineering goal is not a
          sensor that never fails, it is a combination where the conditions that break one sensor
          are unlikely to break the others at the same time — and an honest acknowledgment of the
          conditions that still break all three together.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "At highway speed a car covers roughly 28 metres per second, so every millisecond of vision-pipeline latency is subtracted directly from the stopping distance left when a decision is finally made.",
          "A camera alone fails in direct glare, heavy rain and darkness, which is why production systems pair it with radar (reliable in poor visibility, weak at object type) and often lidar (precise distance, expensive, weak on some surfaces).",
          "Sensor fusion has to decide which sensor to believe when they disagree; naive averaging of a correct reading and an incorrect one produces a new, confidently wrong number.",
          "Production systems generally trust each sensor for the measurement it is best suited to — radar's distance over a camera's depth guess, a camera's classification over radar's — rather than averaging everything.",
          "Unfamiliar objects, contradictory construction-zone markings, and weather that degrades every sensor at once remain real, documented failure cases, not solved problems.",
        ]}
      />
    </div>
  );
}
