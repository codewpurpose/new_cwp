import type { TopicCoverVariant } from "@/components/TopicCover";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: TopicCoverVariant;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "why-we-built-codewithpurpose",
    title: "Why we built CodeWithPurpose",
    date: "March 2026",
    excerpt:
      "What began as a frustration with $15,000 bootcamps became a movement to make coding education free for every student, everywhere.",
    cover: "origin",
    body: [
      "A few years ago, one of us looked up the price of a coding bootcamp. Fifteen thousand dollars. For a high schooler, that number might as well be a million. We kept thinking about all the kids who would never even get to find out whether they loved this stuff.",
      "So we did the most student thing possible: we decided to teach it ourselves, for free. We recorded lessons after homework, ran workshops on weekends, and put everything online where anyone could reach it.",
      "The first few students showed up. Then a few hundred. Then we started getting messages from countries we had to look up on a map. That was the moment CodeWithPurpose stopped being a project and became a mission.",
      "Today we're a nonprofit fiscally sponsored by Hack Club, with 4,000+ students in 130+ countries. The plan hasn't changed since day one: keep it free, keep it real, and keep showing up for the next student who wants in.",
    ],
  },
  {
    slug: "130-countries-and-counting",
    title: "130 countries and counting",
    date: "February 2026",
    excerpt:
      "From rural villages in India to classrooms in Nigeria, student volunteers are reaching learners across the globe.",
    cover: "global",
    body: [
      "We keep a quiet little ritual: every time a student from a new country enrolls, someone drops it in the group chat. Lately the chat has been very busy. We just passed 130 countries.",
      "What gets us is not the number itself. It's the stories behind the dots. A student in a rural village in India doing lessons on a shared phone. A classroom in Lagos working through Python exercises together because there are more students than laptops.",
      "None of this works without volunteers. Students translate lessons into their own languages, answer questions at midnight, and run workshops in places we've never been. They're the reason a free course recorded in California can land in a classroom in Nigeria.",
      "If you're reading this from a country we haven't reached yet, you might be our next dot on the map. The courses are free and they always will be.",
    ],
  },
  {
    slug: "congressional-recognition-for-our-work",
    title: "Congressional recognition for our work",
    date: "March 2026",
    excerpt:
      "Representative Mark DeSaulnier recognized CodeWithPurpose for tremendous leadership and service to our community.",
    cover: "congress",
    body: [
      "On March 4, 2026, a letter arrived that made the whole team go quiet for a minute. Representative Mark DeSaulnier of the U.S. House of Representatives formally recognized CodeWithPurpose for, in his words, tremendous leadership and service to our community.",
      "We're a team of students. We run this thing between classes, exams, and college apps. Seeing that work acknowledged at the federal level was surreal, and honestly, it took a while to sink in.",
      "But here's the part we care about most: the letter isn't really about us. It's proof that student-led education can reach a standard worth recognizing. Every volunteer who taught a workshop and every student who showed up to learn owns a piece of it.",
      "The framed letter is nice. The 4,000+ students are nicer. Back to work.",
    ],
  },
  {
    slug: "inside-our-python-bootcamp",
    title: "Inside our Python bootcamp",
    date: "January 2026",
    excerpt:
      "800+ students across 50+ countries have gone from zero experience to building real projects with our most popular course.",
    cover: "python",
    body: [
      "Python for Complete Beginners is our most popular course, and the name is the whole philosophy. You don't need any experience. You don't need a fancy laptop. You need curiosity and about thirty minutes a day.",
      "The course starts at the very beginning: what a program even is, how to print your first line, how to think in steps. From there students build up to loops, functions, and real projects they can actually show people.",
      "The part that surprises people most is the pace of wins. By the end of the first session you've written code that runs. That tiny moment, seeing your own words make a computer do something, is the hook that keeps students going.",
      "More than 800 students across 50+ countries have finished the bootcamp so far. Enrollment is free on Udemy, and our volunteers are around to help when you get stuck. Come write your first line.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
