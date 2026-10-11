import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { CodeBlock, InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { KernelSlider } from "@/components/computer-vision/KernelSlider";
import { RevealCard } from "@/components/learn/primitives/RevealCard";

export function ConvolutionLesson() {
  return (
    <div>
      <Lead>
        Blur, sharpen and edge-finding sound like three unrelated tools in three unrelated menus.
        They are the same operation, run with three different small grids of numbers. Learn the
        one operation and you already understand what every one of those menu items is doing
        underneath.
      </Lead>

      <LessonSection
        id="a-tiny-grid-that-does-all-the-work"
        title="A tiny grid that does all the work"
      >
        <P>
          A kernel is a small grid of numbers — 3-by-3 is the size you will see most — with one
          job: describe how to combine a pixel with the pixels immediately around it. That is the
          whole definition. It carries no code, no conditionals, no idea of what a face or an edge
          is. It is nine numbers.
        </P>
        <P>
          What those nine numbers <em>are</em> decides everything. Nine equal small numbers
          average a neighbourhood together. A large number in the centre with negative numbers
          around it exaggerates the difference between a pixel and its neighbours. Same size grid,
          same operation applied to it, opposite result.
        </P>
      </LessonSection>

      <LessonSection
        id="sliding-it-across-every-position"
        title="Sliding it across every position"
      >
        <P>
          Convolution is the procedure that puts the kernel to work: stop at every position in the
          image, multiply each of the kernel&rsquo;s nine numbers by the pixel currently underneath
          it, add the nine products together, and write that single sum into the output at that
          position. Then move one pixel over and do it again.
        </P>
        <P>
          Try it below. An 8-by-8 input, a 3-by-3 kernel, and a button that moves the kernel one
          position at a time — nine multiplications, one sum, one output pixel, repeated{" "}
          <Strong>36 times</Strong> until the entire 6-by-6 output is built. Nothing here is
          simulated or approximated; the arithmetic shown is exactly what produces the number in
          the highlighted output cell.
        </P>
      </LessonSection>

      <KernelSlider />

      <LessonSection
        id="the-same-operation-blurs-and-sharpens"
        title="The same operation blurs and sharpens"
      >
        <P>
          Switch the preset above between blur and sharpen and watch what actually changed: not
          the sliding, not the multiply-and-sum, not the number of stops. Only the nine numbers in
          the kernel changed.
        </P>
        <P>
          Blur&rsquo;s nine values are all <InlineCode>1/9</InlineCode> — every neighbour, including
          the centre, counted equally, which is just an average. Averaging a bright anomaly in with
          its darker neighbours pulls it toward them; that is what a blur <em>is</em>, arithmetically.
          Sharpen keeps a single large positive number in the centre and subtracts its four direct
          neighbours. Where the centre already matches its neighbours, the subtraction cancels out
          to roughly the same value. Where the centre is a genuine anomaly, the subtraction
          exaggerates it instead of averaging it away.
        </P>
        <div className="mt-6">
          <RevealCard
            summaryTag="Try it yourself"
            summary="A 3-by-3 patch is all 10s except a bright 100 in the centre. What does the blur kernel (nine values of 1/9) write into the output? What does a sharpen kernel with 5 in the centre and −1 on the four direct neighbours write?"
            detailTag="Answer"
            detail="Blur: (8 × 10 + 100) / 9 = 180 / 9 = 20, so the bright spot is pulled most of the way down towards its neighbours. Sharpen: 5 × 100 − 4 × 10 = 460, so the spot is pushed further away from them. The sum itself does no clipping: kept as a float, the output really is 460. Only when the result is stored as an ordinary 8-bit image, whose pixels run 0 to 255, does it get clipped to 255."
            openLabel="Show the answer"
            closeLabel="Hide the answer"
          />
        </div>
        <P>
          Here is the whole operation written by hand, run on a 5-by-5 patch of 10s with one
          bright 100 in the middle.
        </P>
        <CodeBlock
          label="convolve.py"
          code={`import numpy as np

def convolve(image, kernel):
    """Slide a 3x3 kernel over every position where it fits; multiply and sum."""
    rows, cols = image.shape[0] - 2, image.shape[1] - 2
    out = np.zeros((rows, cols))
    for r in range(rows):
        for c in range(cols):
            out[r, c] = np.sum(image[r:r + 3, c:c + 3] * kernel)
    return out

image = np.full((5, 5), 10.0)
image[2, 2] = 100                      # one bright pixel in a flat patch

blur = np.full((3, 3), 1 / 9)
sharpen = np.array([[0, -1, 0],
                    [-1, 5, -1],
                    [0, -1, 0]])

print("blur:\\n", convolve(image, blur).round(1))
print("sharpen:\\n", convolve(image, sharpen))

# The sum itself never clips. Storing it as an 8-bit image does.
as_8bit = np.clip(convolve(image, sharpen), 0, 255).astype(np.uint8)
print("sharpen, stored as 8-bit:\\n", as_8bit)`}
        />
        <P>
          Blur writes 20 everywhere, because every 3-by-3 window here contains the bright pixel.
          Sharpen writes 460 in the centre and −80 beside it. Only the 8-bit copy clips those to
          255 and 0. Swap in your own kernel and run it again.
        </P>
        <Callout tone="note" title="A detail you will meet in libraries">
          Strictly, the textbook definition of convolution flips the kernel before sliding it.
          Image libraries and neural networks almost always skip the flip — the operation they
          run is technically called cross-correlation — and for symmetric kernels like blur and
          sharpen the two give identical results.
        </Callout>
        <Callout tone="success" title="One operation, a menu of behaviours">
          Edge detection, sharpening, blurring and the very first layer of a neural network&rsquo;s
          convolution are all this same slide-multiply-sum procedure. What changes between all of
          them is never the operation — only the numbers inside the kernel.
        </Callout>
      </LessonSection>

      <LessonSection id="what-a-kernel-cannot-do-alone" title="What a kernel cannot do alone">
        <P>
          A hand-designed kernel only ever looks for the one pattern somebody built it to find.
          The sharpen kernel above always looks for &ldquo;a pixel different from its four
          neighbours&rdquo;, forever, on every image you ever give it. It has no way to notice that
          a particular photo would be better served by looking for something else — a diagonal
          line, a curve, a texture — because nobody wrote a kernel for that and handed it over.
        </P>
        <P>
          It also cannot improve. Feed a hand-designed kernel a thousand more photos and it
          performs identically on the thousand-and-first, because there is nothing in it that
          changes in response to data. <Strong>A trained convolutional network&rsquo;s kernels are the
          same nine-number grids, run through the exact same sliding-and-summing procedure</Strong>{" "}
          — the difference is that its numbers are not chosen by a person in advance. They are
          adjusted automatically until the network&rsquo;s own predictions improve, which is exactly how
          it ends up with kernels for patterns nobody thought to hand-design. That is the subject
          of a later chapter; for now, the sliding-multiply-sum arithmetic you just ran by hand is
          the same arithmetic running, unchanged, inside it.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A kernel is nothing more than a small grid of numbers with one job: describe how to combine a pixel with its neighbours.",
          "Convolution is the same three steps repeated at every position: multiply the kernel against the pixels underneath it, sum the products, write one output number.",
          "Blur and sharpen are not different operations — they are the identical sliding-multiply-sum procedure with different numbers inside the same 3-by-3 kernel.",
          "Averaging a neighbourhood (blur) and exaggerating the difference from a neighbourhood (sharpen) are opposite effects produced by opposite patterns of numbers.",
          "A hand-designed kernel only ever finds the one pattern it was built for, and it never improves from seeing more images.",
          "A trained network's kernels run the exact same arithmetic, but their numbers are adjusted from data instead of chosen in advance — the difference the next chapters build on.",
        ]}
      />
    </div>
  );
}
