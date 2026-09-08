import { Callout } from "@/components/learn/primitives/Callout";
import { CompareGrid, TakeawayCard } from "@/components/learn/primitives/Cards";
import { InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";

export function ColourAndChannelsLesson() {
  return (
    <div>
      <Lead>
        You think of a coloured pixel as one thing — a dot of sky-blue, a dot of leaf-green. It is
        not one thing. It is three separate numbers, recorded independently, that happen to sit on
        top of each other and get displayed as a single dot. Pull them apart and one of the three
        turns out to be doing almost all of the work.
      </Lead>

      <LessonSection id="one-pixel-three-numbers" title="One pixel, three numbers">
        <P>
          The previous lesson said a grayscale pixel is one integer from 0 to 255. A colour pixel
          is the same idea, tripled: one integer for how much red light it holds, one for green,
          one for blue, each independently between 0 and 255.
        </P>
        <P>
          A clear midday sky is roughly <InlineCode>R = 135, G = 206, B = 235</InlineCode> — heavy
          on blue, as you would expect, but also more green than red, which is why a sky rendered
          with only its blue channel looks nothing like a sky. Zero out any one of those three
          numbers and the colour changes completely; there is no single &ldquo;important&rdquo;
          channel until you ask a specific question about a specific image.
        </P>
        <div className="mt-6 overflow-hidden rounded-learn-md border-[0.5px] border-learn-line bg-learn-chart-plot p-4">
          <svg viewBox="0 0 320 110" className="w-full max-w-[320px]" role="img" aria-label="A sky-blue pixel with RGB value 135, 206, 235, split into its red, green and blue channel values, each shown as its own shade of grey.">
            <g>
              <rect x={0} y={0} width={80} height={80} rx={8} fill="rgb(135,206,235)" />
              <text x={40} y={96} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">combined</text>
            </g>
            <g>
              <rect x={100} y={0} width={80} height={80} rx={8} fill="rgb(135,135,135)" />
              <text x={140} y={96} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">R = 135</text>
            </g>
            <g>
              <rect x={200} y={0} width={80} height={80} rx={8} fill="rgb(206,206,206)" />
              <text x={240} y={96} textAnchor="middle" fontSize={11} fill="var(--learn-ink-muted)">G = 206</text>
            </g>
            <g>
              <rect x={300} y={0} width={20} height={80} rx={4} fill="rgb(235,235,235)" />
            </g>
            <text x={310} y={96} textAnchor="middle" fontSize={9} fill="var(--learn-ink-muted)">B = 235</text>
          </svg>
        </div>
      </LessonSection>

      <LessonSection
        id="why-grayscale-is-a-choice-not-a-loss"
        title="Why grayscale is a choice, not a loss"
      >
        <P>
          It is tempting to think of converting a colour photo to grayscale as throwing information
          away, the way deleting two-thirds of a file would. It is closer to a deliberate
          calculation than a deletion: a common formula is{" "}
          <InlineCode>0.299R + 0.587G + 0.114B</InlineCode>, not a plain average of the three.
        </P>
        <P>
          <Strong>Green gets nearly five times the weight of blue</Strong> because human vision is
          far more sensitive to green light — your eye has more receptors tuned to that part of
          the spectrum than to red or blue. A grayscale conversion that used equal weights would
          produce a technically valid image that looked wrong to every person who looked at it,
          because it would not match how brightness actually registers for a human observer.
        </P>
        <Callout tone="note" title="A choice with a visible consequence">
          Two objects with identical brightness to a camera sensor but different colours — a
          saturated red and a saturated green of the same measured luminance — do not necessarily
          convert to the same grey. The weighting is tuned to human perception, not to the raw
          light hitting the sensor.
        </Callout>
      </LessonSection>

      <LessonSection id="channels-that-are-not-colour" title="Channels that are not colour at all">
        <P>
          Nothing about the word &ldquo;channel&rdquo; requires it to carry colour. A channel is
          just another grid of numbers, the same shape as the image, stacked alongside red, green
          and blue.
        </P>
        <CompareGrid
          columns={3}
          items={[
            {
              title: "Alpha",
              children: (
                <P>
                  A fourth channel recording transparency — 0 for fully see-through, 255 for fully
                  opaque. It changes nothing about colour and everything about what shows through.
                </P>
              ),
            },
            {
              title: "Depth",
              children: (
                <P>
                  Sensors like LiDAR or a structured-light camera record distance from the lens per
                  pixel, not brightness. A depth channel can sit right alongside an RGB image of the
                  same scene.
                </P>
              ),
            },
            {
              title: "Infrared",
              children: (
                <P>
                  Satellite and night-vision imagery often carry a channel for light outside what
                  your eyes can see at all, used precisely because it reveals things visible colour
                  does not.
                </P>
              ),
            },
          ]}
        />
      </LessonSection>

      <LessonSection
        id="the-order-of-channels-is-not-universal"
        title="The order of channels is not universal"
      >
        <P>
          Even once you have settled on red, green and blue, the order they are stored in is a
          convention, not a law — and it is not the same convention everywhere.
        </P>
        <P>
          <Strong>OpenCV loads images as BGR, not RGB, by default.</Strong> Read a photo with{" "}
          <InlineCode>cv2.imread</InlineCode> and the first channel in the array is blue, not red.
          Hand that array to a library that assumes RGB — Matplotlib, most plotting and
          machine-learning code — without converting it, and nothing crashes. Nothing throws an
          error at all. The image simply displays with red and blue silently swapped: skin turns a
          washed-out blue, a blue sky turns orange.
        </P>
        <Callout tone="danger" title="A bug that never announces itself">
          Because both BGR and RGB are valid three-number-per-pixel arrays of exactly the same
          shape, this mistake produces a perfectly well-formed image every time — just the wrong
          one. It is a common bug, not a hypothetical: forgetting one{" "}
          <InlineCode>cv2.cvtColor(img, cv2.COLOR_BGR2RGB)</InlineCode> call is enough to cause it.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "A colour pixel is not one value, it is three independent numbers for red, green and blue stacked on the same spot.",
          "Converting to grayscale is a weighted calculation, not a loss of information for free — green typically gets close to five times the weight of blue because human vision is far more sensitive to it.",
          "A channel does not have to carry colour: alpha carries transparency, depth carries distance, infrared carries light outside human vision.",
          "Channel order is a convention rather than a universal rule, and OpenCV's default of BGR instead of RGB is the concrete example that trips people up.",
          "Mixing up channel order does not error — it silently swaps red and blue in the displayed image, which is what makes the bug easy to miss.",
        ]}
      />
    </div>
  );
}
