/**
 * Guided build projects for /projects.
 *
 * Every project is small, free and runs entirely in the browser: Python and ML
 * projects open in the Python playground (Pyodide, with numpy, pandas,
 * scikit-learn and matplotlib), web projects open in the web playground.
 *
 * Code is written with String.raw so backslashes reach Python untouched.
 * Inline `backticks` in step text and hints render as code.
 *
 * Chapter links name real chapter slugs. The detail page resolves each one
 * through getChapter() and fails the build if a slug ever disappears.
 */

import type { LearnTrackId } from "@/lib/learn-types";

export type ProjectTrack = "python" | "web" | "ml";

export const PROJECT_TRACKS: readonly { id: ProjectTrack; label: string; blurb: string }[] = [
  { id: "python", label: "Python", blurb: "Small programs that make text, games and numbers do something useful." },
  { id: "web", label: "Web", blurb: "Real pages built with plain HTML and CSS." },
  { id: "ml", label: "Machine learning", blurb: "Teach a model to spot patterns in real datasets." },
];

export interface PythonCode {
  kind: "python";
  code: string;
}

export interface WebCode {
  kind: "web";
  html: string;
  css: string;
  js: string;
}

export type ProjectCode = PythonCode | WebCode;

export interface ProjectStep {
  title: string;
  body: string;
  hint?: string;
}

export interface ProjectChapterLink {
  track: LearnTrackId;
  slug: string;
}

export interface Project {
  slug: string;
  track: ProjectTrack;
  title: string;
  /** One friendly line for the card. */
  pitch: string;
  /** A short paragraph at the top of the project page. */
  intro: string;
  skills: readonly string[];
  steps: readonly ProjectStep[];
  starter: ProjectCode;
  solution: ProjectCode;
  stretch: string;
  chapters: readonly ProjectChapterLink[];
}

const py = (code: string): PythonCode => ({ kind: "python", code: code.trim() + "\n" });
const web = (html: string, css: string, js = ""): WebCode => ({
  kind: "web",
  html: html.trim() + "\n",
  css: css.trim() + "\n",
  js: js.trim() === "" ? "" : js.trim() + "\n",
});

export const PROJECTS: readonly Project[] = [
  /* ------------------------------------------------------------------ */
  /* Python                                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "mad-libs",
    track: "python",
    title: "Mad Libs story generator",
    pitch: "Fill in a few silly words and let Python write the story.",
    intro:
      "Mad Libs are stories with blanks. You choose the words first, without seeing the story, and the result is usually ridiculous. You'll store your words in a dictionary, drop them into story templates, and let Python pick which story to tell.",
    skills: ["Strings", "Dictionaries", "Lists", "random.choice"],
    steps: [
      {
        title: "Collect your words",
        body: "Store each word in a dictionary, with the kind of word as the key: `\"animal\": \"otter\"`. The starter has one blank left for you to fill.",
        hint: "Every value should be a string in quotes, and every pair needs a comma after it.",
      },
      {
        title: "Write a story template",
        body: "Write a sentence with `{adjective}`, `{animal}` and the other keys in curly braces where the blanks go.",
        hint: "The names inside the braces must match your dictionary keys exactly, including spaces and capital letters.",
      },
      {
        title: "Fill in the blanks",
        body: "Call `template.format(**words)` to swap every `{name}` for its word, then print the result.",
        hint: "The `**` unpacks the dictionary, so `format` receives `adjective=\"sparkly\", animal=\"otter\"` and so on.",
      },
      {
        title: "Catch empty words",
        body: "Before printing, check whether any word is still an empty string and tell the player which ones to fill in.",
        hint: "A list comprehension works well: `[name for name, word in words.items() if word.strip() == \"\"]`.",
      },
      {
        title: "Add more stories",
        body: "Put two or three templates in a list and use `random.choice` to pick one each time you run it.",
      },
    ],
    starter: py(String.raw`
import random

# 1. Your words. Change any of them to whatever you like.
words = {
    "adjective": "sparkly",
    "animal": "otter",
    "place": "the library",
    "verb": "juggling",
    "food": "",  # TODO: fill this one in
}

# 2. A story template. Each {name} is a blank.
template = "Yesterday a {adjective} {animal} walked into {place}."

# 3. TODO: fill the blanks with template.format(**words) and print the story.
print(template)
`),
    solution: py(String.raw`
import random

words = {
    "adjective": "sparkly",
    "animal": "otter",
    "place": "the library",
    "verb": "juggling",
    "food": "pancakes",
}

templates = [
    "Yesterday a {adjective} {animal} walked into {place} and started {verb}. "
    "Everyone cheered, and then they all shared some {food}.",
    "Breaking news: a {adjective} {animal} has been spotted {verb} near {place}. "
    "Witnesses say it smelled faintly of {food}.",
    "My favourite memory is {verb} with a {adjective} {animal} in {place}, "
    "eating {food} until the sun went down.",
]

missing = [name for name, word in words.items() if word.strip() == ""]

if missing:
    print("Fill in these words first:", ", ".join(missing))
else:
    story = random.choice(templates).format(**words)
    print(story)
`),
    stretch:
      "Let a friend play: use `input()` to ask for each word (type the answers in the playground's input box before you press Run), so they choose words without seeing the story.",
    chapters: [
      { track: "python", slug: "strings" },
      { track: "python", slug: "dictionaries" },
      { track: "python", slug: "lists-and-tuples" },
    ],
  },
  {
    slug: "number-guessing",
    track: "python",
    title: "Number-guessing game",
    pitch: "Build the brains of a guessing game, then teach the computer to play it.",
    intro:
      "Instead of typing guesses one at a time, you'll give the game a list of guesses and let it judge each one. Once the rules work, you'll write a computer player that never needs more than seven guesses to find a number from 1 to 100.",
    skills: ["Functions", "Conditionals", "Loops", "random"],
    steps: [
      {
        title: "Judge one guess",
        body: "Finish `check_guess(guess, secret)` so it returns `\"Too low\"`, `\"Too high\"` or `\"Correct!\"`.",
        hint: "Two `if` checks are enough. If the guess is neither too low nor too high, it must be correct.",
      },
      {
        title: "Play through a list of guesses",
        body: "Loop over the `guesses` list and print each guess with its result.",
        hint: "`enumerate(guesses, start=1)` gives you the attempt number and the guess together.",
      },
      {
        title: "Stop when it's right",
        body: "As soon as a guess is correct, print how many tries it took and leave the loop.",
        hint: "`return` inside a function ends the loop and the function in one go.",
      },
      {
        title: "Limit the tries",
        body: "Give the player at most seven guesses. If they run out, reveal the secret number.",
      },
      {
        title: "Let the computer play",
        body: "Write a player that always guesses the middle of the range that's left, then narrows the range using the hint. Pick the secret with `random.randint(1, 100)`.",
        hint: "Keep `low` and `high`. On \"Too low\", set `low = guess + 1`; on \"Too high\", set `high = guess - 1`.",
      },
    ],
    starter: py(String.raw`
import random


def check_guess(guess, secret):
    # TODO: return "Too low", "Too high" or "Correct!"
    return "?"


def play(secret, guesses):
    # TODO: loop over the guesses, print each result,
    # and stop as soon as one is correct.
    for guess in guesses:
        print(guess, check_guess(guess, secret))


play(42, [50, 25, 37, 43, 40, 42])
`),
    solution: py(String.raw`
import random

MAX_TRIES = 7


def check_guess(guess, secret):
    if guess < secret:
        return "Too low"
    if guess > secret:
        return "Too high"
    return "Correct!"


def play(secret, guesses):
    for attempt, guess in enumerate(guesses, start=1):
        if attempt > MAX_TRIES:
            break
        result = check_guess(guess, secret)
        print(f"Guess {attempt}: {guess} -> {result}")
        if result == "Correct!":
            print(f"Got it in {attempt} tries.")
            return attempt
    print(f"Out of guesses. The number was {secret}.")
    return None


def computer_guesses(secret, low=1, high=100):
    """Always guess the middle of what's left."""
    guesses = []
    while low <= high:
        guess = (low + high) // 2
        guesses.append(guess)
        result = check_guess(guess, secret)
        if result == "Too low":
            low = guess + 1
        elif result == "Too high":
            high = guess - 1
        else:
            break
    return guesses


print("You:")
play(42, [50, 25, 37, 43, 40, 42])

print()
print("The computer:")
secret = random.randint(1, 100)
play(secret, computer_guesses(secret))
`),
    stretch:
      "Run the computer player against every number from 1 to 100 and find which secret numbers take the most guesses. Can you explain why it never needs more than seven?",
    chapters: [
      { track: "python", slug: "functions" },
      { track: "python", slug: "conditionals" },
      { track: "python", slug: "loops" },
    ],
  },
  {
    slug: "grade-calculator",
    track: "python",
    title: "Grade calculator",
    pitch: "Turn a pile of marks into one weighted final grade.",
    intro:
      "Many classes weight their marks: homework might count for a quarter of the grade and the final exam for more. You'll average each category, weight it, add it all up and turn the result into a letter grade.",
    skills: ["Dictionaries", "Functions", "Loops", "f-strings"],
    steps: [
      {
        title: "Average a list of marks",
        body: "Finish `average(marks)` so it returns the mean of a list of numbers.",
        hint: "`sum(marks) / len(marks)`. Return 0 for an empty list so you never divide by zero.",
      },
      {
        title: "Average every category",
        body: "Loop over the `scores` dictionary and print the average for each category.",
        hint: "`for category, marks in scores.items():` gives you the name and the list together.",
      },
      {
        title: "Apply the weights",
        body: "Multiply each category's average by its weight from `weights` and add the results into a running total.",
      },
      {
        title: "Check the weights",
        body: "Weights should add up to 1 (that is, 100%). Print a warning if they don't.",
        hint: "Decimals aren't always exact in Python, so compare with `abs(total - 1) > 0.001` rather than `!=`.",
      },
      {
        title: "Turn it into a letter",
        body: "Write `letter_grade(percent)` that returns A, B, C, D or F, and print the final result.",
        hint: "Check from the top down: `if percent >= 90`, then `elif percent >= 80`, and so on.",
      },
    ],
    starter: py(String.raw`
scores = {
    "homework": [92, 88, 95, 79],
    "quizzes": [85, 90, 78],
    "project": [94],
    "final exam": [81],
}

weights = {
    "homework": 0.25,
    "quizzes": 0.20,
    "project": 0.25,
    "final exam": 0.30,
}


def average(marks):
    # TODO: return the mean of the list
    return 0


for category, marks in scores.items():
    print(category, average(marks))
`),
    solution: py(String.raw`
scores = {
    "homework": [92, 88, 95, 79],
    "quizzes": [85, 90, 78],
    "project": [94],
    "final exam": [81],
}

weights = {
    "homework": 0.25,
    "quizzes": 0.20,
    "project": 0.25,
    "final exam": 0.30,
}


def average(marks):
    if not marks:
        return 0
    return sum(marks) / len(marks)


def letter_grade(percent):
    if percent >= 90:
        return "A"
    elif percent >= 80:
        return "B"
    elif percent >= 70:
        return "C"
    elif percent >= 60:
        return "D"
    return "F"


total_weight = sum(weights.values())
if abs(total_weight - 1) > 0.001:
    print(f"Warning: the weights add up to {total_weight:.0%}, not 100%.")

final = 0
for category, marks in scores.items():
    avg = average(marks)
    weight = weights[category]
    final += avg * weight
    print(f"{category:<12} average {avg:5.1f}   counts for {weight:.0%}")

print()
print(f"Final grade: {final:.1f}% ({letter_grade(final)})")
`),
    stretch:
      "Work backwards: write a function that tells you the lowest final-exam mark you'd need to finish with an A.",
    chapters: [
      { track: "python", slug: "dictionaries" },
      { track: "python", slug: "functions" },
      { track: "python", slug: "numbers-and-operators" },
    ],
  },
  {
    slug: "word-frequency",
    track: "python",
    title: "Word-frequency counter",
    pitch: "Find out which words a piece of writing leans on the most.",
    intro:
      "Writers, search engines and spam filters all count words. You'll clean up a paragraph, count every word, skip the tiny ones like \"the\" and \"and\", and draw a little bar chart of the favourites in plain text.",
    skills: ["Strings", "Dictionaries", "Sorting", "Loops"],
    steps: [
      {
        title: "Split the text into words",
        body: "Lower-case the text and split it on spaces so \"Garden\" and \"garden\" count as the same word.",
        hint: "`text.lower().split()` splits on any run of spaces or new lines.",
      },
      {
        title: "Strip the punctuation",
        body: "Remove commas, full stops and quotes from the ends of each word.",
        hint: "`word.strip(string.punctuation)` removes punctuation from both ends. Skip anything that ends up empty.",
      },
      {
        title: "Count each word",
        body: "Use a dictionary where each key is a word and each value is how many times you've seen it.",
        hint: "`counts[word] = counts.get(word, 0) + 1` works whether or not the word is already there.",
      },
      {
        title: "Skip the filler words",
        body: "Make a set of common words like \"the\", \"a\" and \"and\", and leave them out of the count.",
      },
      {
        title: "Show the top ten",
        body: "Sort the words by count, biggest first, and print each one with a bar of `#` characters.",
        hint: "`sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))` sorts by count, then alphabetically to break ties.",
      },
    ],
    starter: py(String.raw`
import string

text = """
Our school garden started as one bed of tomatoes. Then someone planted beans,
and the beans climbed the fence, and the fence became a wall of green.
Now the garden has herbs, flowers and a bench where people sit and read.
Every spring, new students ask what they can plant, and the garden grows again.
"""

# TODO: lower-case the text, split it into words, strip punctuation,
# and count how many times each word appears.
words = text.split()
print(len(words), "words")
`),
    solution: py(String.raw`
import string

text = """
Our school garden started as one bed of tomatoes. Then someone planted beans,
and the beans climbed the fence, and the fence became a wall of green.
Now the garden has herbs, flowers and a bench where people sit and read.
Every spring, new students ask what they can plant, and the garden grows again.
"""

STOP_WORDS = {"a", "an", "and", "as", "of", "the", "then", "they", "what", "where", "can", "has", "now", "our"}


def clean_words(text):
    words = []
    for raw in text.lower().split():
        word = raw.strip(string.punctuation)
        if word:
            words.append(word)
    return words


counts = {}
for word in clean_words(text):
    if word in STOP_WORDS:
        continue
    counts[word] = counts.get(word, 0) + 1

top = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))[:10]

for word, count in top:
    print(f"{word:<10} {'#' * count} {count}")
`),
    stretch:
      "Paste in a longer piece of your own writing, or try `collections.Counter` and its `most_common()` method and compare it with your version.",
    chapters: [
      { track: "python", slug: "strings" },
      { track: "python", slug: "dictionaries" },
      { track: "python", slug: "list-methods-in-depth" },
      { track: "python", slug: "the-collections-module" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Web                                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "profile-card",
    track: "web",
    title: "Personal profile card",
    pitch: "Make a small, friendly card that says who you are.",
    intro:
      "A profile card is a tiny web page: a picture, a name, a few lines about you and some links. It's a good first build because you'll use headings, lists and links, then style a single box until it looks finished.",
    skills: ["HTML structure", "Lists and links", "The box model", "Flexbox"],
    steps: [
      {
        title: "Write the content",
        body: "Inside the `<article>`, add a heading with your name, a short paragraph about you, and a list of three things you like.",
        hint: "Use `<h1>` for the name, `<p>` for the bio and `<ul>` with `<li>` items for the list.",
      },
      {
        title: "Add an avatar",
        body: "Make a round avatar with your initials. A `<div>` with a background colour and `border-radius: 50%` is all it takes.",
      },
      {
        title: "Style the card",
        body: "Give the card a white background, padding, rounded corners and a soft shadow, and limit its width so it doesn't stretch.",
        hint: "`max-width: 320px` stops the card growing, and `margin: auto` centres it.",
      },
      {
        title: "Centre it on the page",
        body: "Use flexbox on the `<body>` to place the card in the middle of the screen.",
        hint: "`display: flex; justify-content: center; align-items: center; min-height: 100vh;`",
      },
      {
        title: "Add your links",
        body: "Finish with a row of links (a portfolio, a project, a club) styled as small rounded buttons.",
      },
    ],
    starter: web(
      String.raw`
<article class="card">
  <!-- TODO: add an avatar, your name, a short bio and a list of interests -->
  <h1>Your Name</h1>
  <p>A sentence or two about you.</p>
</article>
`,
      String.raw`
body {
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
  color: #15120c;
}

.card {
  /* TODO: background, padding, rounded corners and a shadow */
}
`,
    ),
    solution: web(
      String.raw`
<article class="card">
  <div class="avatar" aria-hidden="true">AK</div>
  <h1>Alex Kim</h1>
  <p class="bio">Ninth grader who likes building small websites and drawing comics.</p>

  <h2>Things I like</h2>
  <ul class="likes">
    <li>Sketching characters</li>
    <li>Learning Python</li>
    <li>Long bike rides</li>
  </ul>

  <nav class="links" aria-label="My links">
    <a href="#">Portfolio</a>
    <a href="#">Comics</a>
    <a href="#">Contact</a>
  </nav>
</article>
`,
      String.raw`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
  color: #15120c;
}

.card {
  width: 100%;
  max-width: 320px;
  padding: 28px 24px;
  text-align: center;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(46, 38, 24, 0.1);
}

.avatar {
  width: 88px;
  height: 88px;
  margin: 0 auto 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #dbefdb;
  color: #3e7f5c;
  font-size: 28px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: 24px;
}

.bio {
  color: #4f483d;
  line-height: 1.5;
}

h2 {
  margin: 20px 0 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #3e7f5c;
}

.likes {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 1.8;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.links a {
  padding: 6px 14px;
  border-radius: 999px;
  background: #dbefdb;
  color: #1e3c2c;
  text-decoration: none;
  font-size: 14px;
}

.links a:hover {
  background: #c6e5c6;
}
`,
    ),
    stretch:
      "Add a second card for a friend and lay the two out side by side with flexbox, wrapping onto separate lines on a narrow screen.",
    chapters: [
      { track: "html-css", slug: "elements-and-tags" },
      { track: "html-css", slug: "the-box-model" },
      { track: "html-css", slug: "flexbox" },
    ],
  },
  {
    slug: "photo-gallery",
    track: "web",
    title: "Responsive photo gallery",
    pitch: "A tidy grid of pictures that rearranges itself for any screen.",
    intro:
      "Galleries are a classic use of CSS Grid: one line of CSS can decide how many columns fit. The starter uses coloured tiles as stand-ins for photos, so it works anywhere. Swap in your own pictures whenever you like.",
    skills: ["Semantic HTML", "CSS Grid", "Responsive design", "aspect-ratio"],
    steps: [
      {
        title: "Mark up the photos",
        body: "Each photo is a `<figure>` with the picture and a `<figcaption>`. Add at least six.",
        hint: "Using a real image? Write `<img src=\"...\" alt=\"what the picture shows\">` in place of the coloured `<div>`.",
      },
      {
        title: "Make a grid",
        body: "Turn the gallery into a grid with a gap between the tiles.",
        hint: "`display: grid; gap: 16px;` on the `.gallery` element.",
      },
      {
        title: "Let the columns decide themselves",
        body: "Use `repeat(auto-fill, minmax(180px, 1fr))` so the grid fits as many columns as it can, with no media queries.",
      },
      {
        title: "Keep every tile the same shape",
        body: "Give each photo `aspect-ratio: 4 / 3` so tiles stay even however wide they get.",
        hint: "For real images, add `object-fit: cover` so they fill the tile without stretching.",
      },
      {
        title: "Add a gentle hover",
        body: "Lift a tile slightly on hover, and turn the effect off for people who prefer reduced motion.",
        hint: "Wrap the transition in `@media (prefers-reduced-motion: no-preference) { ... }`.",
      },
    ],
    starter: web(
      String.raw`
<main>
  <h1>My gallery</h1>
  <section class="gallery">
    <figure>
      <div class="photo sunrise"></div>
      <figcaption>Sunrise</figcaption>
    </figure>
    <figure>
      <div class="photo forest"></div>
      <figcaption>Forest</figcaption>
    </figure>
    <!-- TODO: add at least four more figures -->
  </section>
</main>
`,
      String.raw`
body {
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
  color: #15120c;
}

.gallery {
  /* TODO: make this a responsive grid */
}

.photo {
  height: 120px;
}

.sunrise { background: linear-gradient(135deg, #ffd59e, #f28c6b); }
.forest { background: linear-gradient(135deg, #a8d5a2, #3e7f5c); }
`,
    ),
    solution: web(
      String.raw`
<main>
  <h1>My gallery</h1>
  <section class="gallery" aria-label="Photos">
    <figure>
      <div class="photo sunrise" role="img" aria-label="Orange sunrise"></div>
      <figcaption>Sunrise</figcaption>
    </figure>
    <figure>
      <div class="photo forest" role="img" aria-label="Green forest"></div>
      <figcaption>Forest</figcaption>
    </figure>
    <figure>
      <div class="photo ocean" role="img" aria-label="Blue ocean"></div>
      <figcaption>Ocean</figcaption>
    </figure>
    <figure>
      <div class="photo meadow" role="img" aria-label="Pale green meadow"></div>
      <figcaption>Meadow</figcaption>
    </figure>
    <figure>
      <div class="photo dusk" role="img" aria-label="Purple dusk sky"></div>
      <figcaption>Dusk</figcaption>
    </figure>
    <figure>
      <div class="photo desert" role="img" aria-label="Sandy desert"></div>
      <figcaption>Desert</figcaption>
    </figure>
  </section>
</main>
`,
      String.raw`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
  color: #15120c;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
}

h1 {
  margin: 0 0 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

figure {
  margin: 0;
  overflow: hidden;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(46, 38, 24, 0.08);
}

.photo {
  width: 100%;
  aspect-ratio: 4 / 3;
}

figcaption {
  padding: 10px 12px;
  font-size: 14px;
  color: #4f483d;
}

.sunrise { background: linear-gradient(135deg, #ffd59e, #f28c6b); }
.forest { background: linear-gradient(135deg, #a8d5a2, #3e7f5c); }
.ocean { background: linear-gradient(135deg, #a7d8f0, #2f6f9f); }
.meadow { background: linear-gradient(135deg, #e6f4d7, #9cc98a); }
.dusk { background: linear-gradient(135deg, #c9b6e4, #5b4b8a); }
.desert { background: linear-gradient(135deg, #f5e0b7, #c9935a); }

@media (prefers-reduced-motion: no-preference) {
  figure {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  figure:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(46, 38, 24, 0.12);
  }
}
`,
    ),
    stretch:
      "Make one photo stand out by letting it span two columns with `grid-column: span 2`, and check the layout still works on a phone-sized screen.",
    chapters: [
      { track: "html-css", slug: "links-and-images" },
      { track: "html-css", slug: "grid" },
      { track: "html-css", slug: "responsive-design" },
    ],
  },
  {
    slug: "cause-landing-page",
    track: "web",
    title: "Landing page for a cause",
    pitch: "Build a one-page site that invites people to help with something you care about.",
    intro:
      "A landing page has one job: explain an idea quickly and ask people to act. You'll build a page for a made-up neighbourhood tree-planting club (or any cause you choose), with a welcoming header, three short reasons to care and a clear call to action.",
    skills: ["Semantic HTML", "Flexbox", "Media queries", "Colour and type"],
    steps: [
      {
        title: "Sketch the sections",
        body: "Use `<header>`, `<main>` with a few `<section>` elements, and a `<footer>`, so the page has a clear structure before any styling.",
        hint: "Semantic tags help screen readers and search engines understand the page, and they look the same as a `<div>` until you style them.",
      },
      {
        title: "Write a strong headline",
        body: "Give the header a short headline, one sentence explaining the cause, and a button-style link.",
      },
      {
        title: "Add three reasons",
        body: "Make a section with three small blocks, each with a heading and one or two sentences.",
      },
      {
        title: "Lay the reasons out side by side",
        body: "Use flexbox so the three blocks sit in a row on wide screens and stack on narrow ones.",
        hint: "`display: flex; flex-wrap: wrap; gap: 16px;` on the parent, and `flex: 1 1 220px;` on each block.",
      },
      {
        title: "Finish with a call to action",
        body: "End with a section that repeats the main ask, and a small footer. Check it at phone width.",
        hint: "A media query like `@media (max-width: 600px) { ... }` can shrink the headline on small screens.",
      },
    ],
    starter: web(
      String.raw`
<header class="hero">
  <h1>Green Streets Club</h1>
  <p>TODO: one sentence about your cause.</p>
  <a class="button" href="#join">Join us</a>
</header>

<main>
  <!-- TODO: a section with three reasons, then a call to action with id="join" -->
</main>

<footer>
  <p>Made by a student who cares.</p>
</footer>
`,
      String.raw`
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
  color: #15120c;
}

.hero {
  padding: 48px 16px;
  text-align: center;
  /* TODO: give the header a background colour */
}

.button {
  /* TODO: make this link look like a button */
}
`,
    ),
    solution: web(
      String.raw`
<header class="hero">
  <h1>Green Streets Club</h1>
  <p>We plant and care for trees on the streets around our school, one weekend at a time.</p>
  <a class="button" href="#join">Join us</a>
</header>

<main>
  <section class="reasons" aria-labelledby="why">
    <h2 id="why">Why trees?</h2>
    <div class="reason-list">
      <article class="reason">
        <h3>Shade</h3>
        <p>Trees cool the pavement on hot days and make walking to school more pleasant.</p>
      </article>
      <article class="reason">
        <h3>Wildlife</h3>
        <p>Birds and insects use street trees for food and shelter.</p>
      </article>
      <article class="reason">
        <h3>Community</h3>
        <p>Planting days are a simple way to meet neighbours and do something together.</p>
      </article>
    </div>
  </section>

  <section id="join" class="cta">
    <h2>Come to our next planting day</h2>
    <p>No experience needed. Bring gloves and a friend.</p>
    <a class="button" href="#">Sign up</a>
  </section>
</main>

<footer>
  <p>Made by a student who cares.</p>
</footer>
`,
      String.raw`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  background: #fcf4e8;
  color: #15120c;
}

.hero {
  padding: 64px 16px;
  text-align: center;
  background: #dbefdb;
}

.hero h1 {
  margin: 0 0 12px;
  font-size: 44px;
  color: #1e3c2c;
}

.hero p {
  max-width: 520px;
  margin: 0 auto 24px;
  color: #4f483d;
}

.button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background: #1e3c2c;
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
}

.button:hover {
  background: #3e7f5c;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}

h2 {
  margin-top: 0;
  color: #1e3c2c;
}

.reason-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.reason {
  flex: 1 1 220px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  border-top: 4px solid #3e7f5c;
}

.reason h3 {
  margin: 0 0 6px;
}

.reason p {
  margin: 0;
  color: #4f483d;
}

.cta {
  margin-top: 48px;
  padding: 32px 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 12px;
}

footer {
  padding: 24px 16px;
  text-align: center;
  font-size: 14px;
  color: #6b6255;
}

@media (max-width: 600px) {
  .hero h1 {
    font-size: 32px;
  }
}
`,
    ),
    stretch:
      "Add a simple sign-up form in the call-to-action section with a labelled name field, an email field and a submit button, styled to match.",
    chapters: [
      { track: "html-css", slug: "semantic-html" },
      { track: "html-css", slug: "flexbox" },
      { track: "html-css", slug: "colour-and-typography" },
      { track: "html-css", slug: "responsive-design" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Machine learning                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "iris-classifier",
    track: "ml",
    title: "Iris flower classifier",
    pitch: "Teach a model to name a flower from four measurements.",
    intro:
      "The iris dataset is a classic first dataset: 150 flowers from three species, each described by the length and width of its petals and sepals. You'll train a model on most of the flowers, test it on the ones it hasn't seen, and ask it about a flower of your own.",
    skills: ["Features and labels", "Train/test split", "k-nearest neighbours", "Accuracy"],
    steps: [
      {
        title: "Load the data",
        body: "Load the dataset and look at the feature names, the species names and the first few rows.",
        hint: "`iris.data` holds the measurements (the features), `iris.target` holds the species as numbers (the labels).",
      },
      {
        title: "Hold some flowers back",
        body: "Split the data so the model trains on most flowers and is tested on ones it has never seen.",
        hint: "`train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)` keeps a quarter back with all three species represented.",
      },
      {
        title: "Train a model",
        body: "Create a `KNeighborsClassifier` and call `.fit()` on the training data.",
      },
      {
        title: "Check how often it's right",
        body: "Predict the test flowers and compare the predictions with the true species using `accuracy_score`.",
      },
      {
        title: "Ask about a new flower",
        body: "Make up four measurements and ask the model which species it thinks the flower is.",
        hint: "`predict` expects a list of flowers, so wrap a single flower in an extra pair of brackets: `[[5.0, 3.4, 1.5, 0.2]]`.",
      },
    ],
    starter: py(String.raw`
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X = iris.data
y = iris.target

print("Features:", iris.feature_names)
print("Species:", ", ".join(iris.target_names))
print("First flower:", X[0], "->", iris.target_names[y[0]])

# TODO: split the data, train a KNeighborsClassifier,
# and print its accuracy on the test flowers.
`),
    solution: py(String.raw`
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X = iris.data
y = iris.target

print("Features:", iris.feature_names)
print("Species:", ", ".join(iris.target_names))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y
)

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(f"Accuracy on unseen flowers: {accuracy_score(y_test, predictions):.0%}")

# sepal length, sepal width, petal length, petal width (cm)
new_flower = [[6.1, 2.9, 4.6, 1.4]]
guess = model.predict(new_flower)[0]
print("My flower looks like:", iris.target_names[guess])
`),
    stretch:
      "Try `n_neighbors` values from 1 to 15 in a loop and print the test accuracy for each. Does more neighbours always help?",
    chapters: [
      { track: "ml", slug: "features-and-labels" },
      { track: "ml", slug: "train-test-split" },
      { track: "ml", slug: "k-nearest-neighbours" },
    ],
  },
  {
    slug: "wine-decision-tree",
    track: "ml",
    title: "Wine detective with a decision tree",
    pitch: "Work out which grower made a wine, and see exactly which clues the model used.",
    intro:
      "scikit-learn's wine dataset describes 178 wines from three different growers in the same region of Italy, using chemistry measurements like alcohol, colour intensity and flavonoids. A decision tree learns a set of yes/no questions to tell the growers apart, and unlike many models, you can read every question it asks.",
    skills: ["Decision trees", "Train/test split", "Feature importance", "Overfitting"],
    steps: [
      {
        title: "Load the wines",
        body: "Load the dataset as a pandas DataFrame and look at the first few rows and the column names.",
        hint: "`load_wine(as_frame=True).frame` gives you one table with the features and a `target` column.",
      },
      {
        title: "Split, then train a small tree",
        body: "Hold back a quarter of the wines, then fit a `DecisionTreeClassifier` with `max_depth=3` on the rest.",
        hint: "A shallow tree is easier to read and less likely to memorise the training data.",
      },
      {
        title: "Test it",
        body: "Print the accuracy on the wines the tree hasn't seen.",
      },
      {
        title: "Read the tree's questions",
        body: "Print the tree as text with `export_text` to see each question it asks, in order.",
      },
      {
        title: "Find the most useful clues",
        body: "Sort `feature_importances_` to see which measurements did most of the work.",
        hint: "Put them in a pandas Series with the feature names as the index, then call `.sort_values(ascending=False)`.",
      },
    ],
    starter: py(String.raw`
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

wine = load_wine(as_frame=True)
df = wine.frame

print(df.head())
print()
print("Growers:", ", ".join(wine.target_names))

# TODO: split into training and test wines, train a
# DecisionTreeClassifier(max_depth=3), and print its accuracy.
`),
    solution: py(String.raw`
import pandas as pd
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

wine = load_wine(as_frame=True)
X = wine.data
y = wine.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y
)

tree = DecisionTreeClassifier(max_depth=3, random_state=0)
tree.fit(X_train, y_train)

print(f"Accuracy on unseen wines: {tree.score(X_test, y_test):.0%}")
print()
print("The questions the tree asks:")
print(export_text(tree, feature_names=list(X.columns)))

importance = pd.Series(tree.feature_importances_, index=X.columns)
print("Most useful clues:")
print(importance.sort_values(ascending=False).head(5).round(2))
`),
    stretch:
      "Train trees with `max_depth` from 1 to 10 and print both the training and the test accuracy for each. Where does the tree start memorising instead of learning?",
    chapters: [
      { track: "ml", slug: "decision-trees" },
      { track: "ml", slug: "train-test-split" },
      { track: "ml", slug: "overfitting" },
    ],
  },
  {
    slug: "digit-recogniser",
    track: "ml",
    title: "Handwritten-digit recogniser",
    pitch: "Teach a model to read handwritten numbers, using its nearest neighbours.",
    intro:
      "scikit-learn ships with about 1,800 tiny scans of handwritten digits, each 8 by 8 pixels. You'll draw a few of them as text so you can see what the model sees, train a k-nearest neighbours model, and look at the digits it gets wrong.",
    skills: ["Images as numbers", "k-nearest neighbours", "Accuracy", "Reading mistakes"],
    steps: [
      {
        title: "Look at a digit",
        body: "Load the digits and print one 8×8 image as text, using a character for each shade of grey.",
        hint: "Pixel values run from 0 (blank) to 16 (darkest). Picking a character by `pixel // 5` gives four shades.",
      },
      {
        title: "Split the scans",
        body: "Use `digits.data`, where each image is flattened into a row of 64 numbers, and hold back a quarter for testing.",
      },
      {
        title: "Train kNN",
        body: "Fit a `KNeighborsClassifier` with three neighbours on the training scans.",
        hint: "kNN labels a new digit by finding the training digits whose 64 pixel values are closest to it.",
      },
      {
        title: "Measure it",
        body: "Print the accuracy on the test scans.",
      },
      {
        title: "Look at the mistakes",
        body: "Find the test digits the model got wrong and draw one, with what it guessed and what it really was.",
        hint: "`wrong = np.where(predictions != y_test)[0]` gives the positions of the mistakes.",
      },
    ],
    starter: py(String.raw`
from sklearn.datasets import load_digits

digits = load_digits()

SHADES = " .:#"  # blank, light, medium, dark


def draw(image):
    for row in image:
        print("".join(SHADES[int(pixel) // 5] for pixel in row))


print("This is a", digits.target[0])
draw(digits.images[0])

# TODO: split digits.data and digits.target, train a
# KNeighborsClassifier(n_neighbors=3), and print its accuracy.
`),
    solution: py(String.raw`
import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

digits = load_digits()

SHADES = " .:#"  # blank, light, medium, dark


def draw(image):
    for row in image:
        print("".join(SHADES[int(pixel) // 5] for pixel in row))


X_train, X_test, y_train, y_test = train_test_split(
    digits.data, digits.target, test_size=0.25, random_state=0, stratify=digits.target
)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(f"Accuracy on unseen digits: {accuracy_score(y_test, predictions):.1%}")

wrong = np.where(predictions != y_test)[0]
print(f"It got {len(wrong)} of {len(y_test)} wrong.")

if len(wrong) > 0:
    first = wrong[0]
    print()
    print(f"It guessed {predictions[first]}, but this is a {y_test[first]}:")
    draw(X_test[first].reshape(8, 8))
`),
    stretch:
      "Use matplotlib to show a grid of the digits it got wrong with `plt.imshow(image, cmap=\"gray_r\")`, titled with the guess and the true label.",
    chapters: [
      { track: "ml", slug: "k-nearest-neighbours" },
      { track: "ml", slug: "precision-recall" },
      { track: "computer-vision", slug: "images-as-numbers" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function trackLabel(track: ProjectTrack): string {
  return PROJECT_TRACKS.find((item) => item.id === track)?.label ?? track;
}
