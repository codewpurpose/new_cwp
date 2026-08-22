import { Callout } from "@/components/learn/primitives/Callout";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { InlineCode } from "@/components/learn/primitives/CodeBlock";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { KernelSlider } from "@/components/computer-vision/KernelSlider";

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
