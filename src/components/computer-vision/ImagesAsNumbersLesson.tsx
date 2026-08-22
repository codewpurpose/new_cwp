import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { PixelZoom } from "@/components/computer-vision/PixelZoom";

export function ImagesAsNumbersLesson() {
  return (
    <div>
      <Lead>
        You believe a photograph has a face in it somewhere, tucked inside the file, the way a
        letter has words tucked inside an envelope. It does not. Zoom in far enough on any photo
        and the face runs out — not blurs, not fades, <em>runs out</em> — and what is left is a
        grid of numbers with nothing else hiding behind it.
      </Lead>

      <LessonSection id="a-grid-with-nowhere-to-hide" title="A grid with nowhere to hide">
        <P>
          Open any image file and there is no layer underneath the pixels. No hidden field says
          &ldquo;dog&rdquo;, no outline marks where the ears are. A photograph is a rectangle of
          numbers, full stop. Whatever meaning you get out of it, you or a model built back up
          from that grid — the file never carried it.
        </P>
        <P>
          The interactive below is a real image, not a metaphor for one: a 12-by-12 grid of 144
          numbers that happens to render as a smiling face. Step through the four views and watch
          the same 144 numbers stop looking like a photo and start looking like exactly what they
          are.
        </P>
      </LessonSection>

      <PixelZoom />

      <LessonSection id="what-one-pixel-actually-stores" title="What one pixel actually stores">
        <P>
          Click any square in the grid above and the value it shows is the entire content of that
          pixel — <Strong>one integer, from 0 to 255</Strong>, for a grayscale image. Nothing else
          is stored there. 0 is black, 255 is white, and everything between is a shade of grey with
          no unit finer than a whole number: 255 possible steps and not one more.
        </P>
        <P>
          A colour pixel is not one number, it is three — one each for red, green and blue,
          stacked on the same spot. That is enough of a different problem that it gets its own
          lesson next; for now, what matters is that whether it takes one number or three, a pixel
          never stores anything about what is <em>near</em> it. It has no idea it is part of an
          eye.
        </P>
      </LessonSection>

      <LessonSection id="resolution-is-a-budget" title="Resolution is a budget">
        <P>
          Resolution is just a name for how many of those numbers you have. The smiley above is
          144 numbers. A typical 4K photograph is 3840 pixels wide and 2160 tall —{" "}
          <Strong>8,294,400 pixels</Strong>, each with three colour values, for just under 25
          million numbers in one photo. A classic machine-learning thumbnail, the kind used for
          handwritten-digit recognition, is 28 pixels by 28 — 784 numbers.
        </P>
        <P>
          Neither size is correct in some absolute sense. More pixels buys detail — the edge of a
          leaf, a strand of hair, a distant street sign made legible — and it costs storage,
          transfer time, and computation, because every one of those millions of numbers has to be
          read by whatever processes the image. A model built to run on a phone in real time is
          often deliberately fed a smaller grid than the camera captured, because the detail it
          would gain is not worth the numbers it would have to chew through to get it.
        </P>
        <Callout tone="tip" title="A concrete trade">
          Doubling an image&rsquo;s width and height does not double the pixel count — it
          quadruples it. Going from a 500-pixel-wide thumbnail to a 1000-pixel-wide one is four
          times the numbers to store and four times the numbers a model has to process, for
          roughly twice the visible detail.
        </Callout>
      </LessonSection>

      <LessonSection
        id="zooming-in-until-the-picture-breaks"
        title="Zooming in until the picture breaks"
      >
        <P>
          Zoom into a real photograph on your phone and the same thing happens as with the grid
          above, just at a scale your eye is not used to noticing. Past a certain point, the
          picture stops looking like a face or a leaf or a street sign and starts looking like
          what the earlier &ldquo;Pixel grid&rdquo; and &ldquo;Numbers&rdquo; views showed you —
          flat squares of colour, each one a number, arranged in rows.
        </P>
        <P>
          That is not the camera failing or the file corrupting. It is the picture running out —
          you have reached the resolution budget the photo was captured at, and there is nothing
          finer underneath to zoom into. <Strong>Recognisability was never a property of the
          file.</Strong> It was a property of the numbers being dense enough, at the size you were
          viewing them, for your visual system to stitch them back into a face.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A photograph has no hidden layer of meaning — it is a rectangle of numbers, and nothing else is stored in the file.",
          "One grayscale pixel is a single integer from 0 to 255. A colour pixel is three of them, stacked on the same spot.",
          "Resolution is simply a count of how many of those numbers you have, and it is a budget, not a virtue — more pixels costs more storage and more computation for every downstream step.",
          "A 4K photo (about 25 million numbers) and a 28-by-28 thumbnail (784 numbers) are the same kind of object at wildly different budgets.",
          "Zoom into any real photo far enough and recognisability collapses into flat squares of colour, because you have reached the resolution it was captured at.",
        ]}
      />
    </div>
  );
}
