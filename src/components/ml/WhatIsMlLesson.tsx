import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { TakeawayCard } from "@/components/learn/primitives/Cards";
import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { RuleStacker } from "@/components/ml/RuleStacker";

export function WhatIsMlLesson() {
  return (
    <div>
      <Lead>
        Machine learning is not a kind of magic and it is not a kind of intelligence. It is a
        different way of getting a computer to do something: instead of telling it the rules,
        you show it examples and let it work the rules out. This lesson is about when that
        trade is worth making — and when it is not.
      </Lead>

      <LessonSection
        id="a-problem-you-can-write-rules-for"
        title="A problem you can write rules for"
      >
        <P>
          Ordinary programming is telling a computer exactly what to do. If you want to know
          whether someone can vote, you write the rule:
        </P>
        <CodeBlock
          label="ordinary code"
          code={`def can_vote(person):
    return person.age >= 18 and person.is_registered`}
        />
        <P>
          This is a good program. It is fast, it is exactly right, anyone can read it, and when
          the law changes you change one line. <Strong>Do not use machine learning for
          this.</Strong> If you can write the rule down, write the rule down.
        </P>
      </LessonSection>

      <LessonSection id="a-problem-you-cannot" title="A problem you cannot">
        <P>
          Now try: <em>is this message spam?</em>
        </P>
        <P>
          You start writing rules. Lots of links is suspicious — unless it is a newsletter. ALL
          CAPS is suspicious — unless it is a short excited message from a friend. The word
          &ldquo;free&rdquo; is suspicious — unless the email is about free shipping on
          something you ordered.
        </P>
        <P>
          Every rule you write needs an exception, and the exceptions need exceptions. Try it
          below: each step adds the single best rule that can be added, chosen automatically, so
          you are seeing hand-written rules at their absolute best.
        </P>
      </LessonSection>

      <RuleStacker />

      <LessonSection
        id="what-the-machine-does-instead"
        title="What the machine does instead"
        delay={0.05}
      >
        <P>
          Two things are worth noticing, and the second is the one that matters.
        </P>
        <P>
          First, <Strong>the returns collapse</Strong>. The first rule buys you thirty
          percentage points. By rule six the gains are down to fractions of a point, and rules
          seven and eight buy literally nothing — there is no rectangle left worth adding. The
          effort per unit of improvement climbs until it is not worth paying.
        </P>
        <P>
          Second, look at the shape. Each rule is a <Strong>rectangle</Strong>, because that is
          what an if-statement about two numbers draws. But the real boundary between spam and
          not-spam runs <Strong>diagonally</Strong> — three links in a short message is
          suspicious, three links in a long newsletter is not. A staircase of rectangles can get
          closer and closer to a diagonal and never become one.
        </P>
        <P>
          The dashed line is what a model learns from the same data. It is one line rather than
          eight rules, nobody wrote it, and it does better than the rules ever manage.
        </P>
        <Callout tone="success" title="So what is a model, really">
          A model is a shape with adjustable numbers in it, and training is the search for
          numbers that fit your examples. Here the shape is &ldquo;a straight line&rdquo; and
          there are two numbers to find. That is genuinely all it is — the next lessons take
          that apart step by step.
        </Callout>
      </LessonSection>

      <LessonSection id="what-this-costs-you" title="What this costs you" delay={0.05}>
        <P>
          This trade is not free, and it is worth knowing the price before you start.
        </P>
        <P>
          <Strong>You need examples, and lots of them.</Strong> The rule for voting needed
          nobody&rsquo;s data. A spam filter needs thousands of messages that somebody already
          labelled.
        </P>
        <P>
          <Strong>You lose the ability to read it.</Strong> You can read{" "}
          <code className="rounded-[4px] bg-learn-sunken px-1 py-0.5 text-[0.9em]">
            age &gt;= 18
          </code>{" "}
          and know exactly what it does. A learned model is a pile of numbers, and explaining
          any single decision is its own hard problem.
        </P>
        <P>
          <Strong>It is never exactly right.</Strong> Notice that even the learned line does not
          get everything — some of these messages are genuinely ambiguous, and no method
          recovers those. Machine learning trades certainty for coverage.
        </P>
        <Callout tone="warning" title="The question to ask first">
          Not &ldquo;could machine learning do this?&rdquo; but &ldquo;can I write the rule
          down?&rdquo; If yes, write it. Rules are faster, clearer, cheaper, and correct. Reach
          for learning when the rules would never end.
        </Callout>
      </LessonSection>

      <TakeawayCard
        items={[
          "Ordinary programming: you write the rules. Machine learning: you supply examples and the rules are worked out.",
          "If you can write the rule down, write the rule down. Rules are faster, clearer and exactly right.",
          "Hand-written rules do not fail all at once — each one buys less than the last until they buy nothing.",
          "If-statements draw rectangles. When the real boundary is a diagonal, a staircase can approach it but never become it.",
          "The trade costs you data, readability, and certainty. Make it when the exceptions would never end.",
        ]}
      />
    </div>
  );
}
