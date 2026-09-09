import type { LearnChapter, LearnPart } from "@/lib/learn-types";

export { LEARN_HTML_CSS_HREF } from "@/lib/links";

/**
 * The HTML and CSS track: twenty-four lessons that end with one real page,
 * written by hand and published.
 *
 * The arc follows the Udemy course this expands — what a website is, HTML
 * fundamentals, CSS basics, then a page built step by step — and deliberately
 * adds nothing outside it. What it adds is depth: the Udemy version covers
 * "Basics of CSS" in one lecture, and the three things that actually stop a
 * beginner are the cascade, the box model, and layout. Those get five chapters
 * between them.
 *
 * HTML is finished before CSS starts. That costs seven chapters up front and
 * buys the thing that makes CSS teachable: a selector is meaningless until the
 * reader knows what a well-formed document looks like, and specificity is
 * unlearnable when you are still guessing at markup.
 *
 * `headings` must match the ids the body component renders — scripts/validate-
 * learn-nav.mjs fails the build if they drift.
 */

export const HTML_CSS_PARTS: readonly LearnPart[] = [
  {
    id: "web",
    number: 1,
    title: "What a Website Actually Is",
    summary:
      "The journey from a typed URL to a drawn page, the three languages that make it, and your first file open in a browser.",
  },
  {
    id: "html",
    number: 2,
    title: "The Language of Structure",
    summary:
      "Every element you will actually use, what each one means, and why the tag you choose is a claim about content rather than a choice of appearance.",
  },
  {
    id: "css",
    number: 3,
    title: "The Language of Presentation",
    summary:
      "Getting styles onto a page, choosing what they apply to, and the two mechanisms — the cascade and the box model — behind most of what confuses people.",
  },
  {
    id: "layout",
    number: 4,
    title: "Putting Things Where You Want Them",
    summary:
      "Normal flow, then the two systems that replaced twenty years of workarounds, then making one page work on every screen.",
  },
  {
    id: "build",
    number: 5,
    title: "Building a Real Page",
    summary:
      "One page, start to finish. All of the markup before any of the styling, on purpose — and the reason that order matters.",
  },
  {
    id: "ship",
    number: 6,
    title: "Finishing It",
    summary:
      "Making it work for everyone, reading what the browser actually did with your code, and getting the result onto the internet.",
  },
];

export const HTML_CSS_CHAPTERS: readonly LearnChapter[] = [
  {
    slug: "what-is-a-website",
    partId: "web",
    order: 1,
    title: "What Sits Between a URL and a Page",
    description:
      "Between pressing Enter and seeing a page, six things happen, and none of them are magic. Follow one request from your keyboard to a server on another continent and back, and see exactly which step you will be writing.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "a-website-is-files-on-somebody-elses-computer", text: "A website is files on somebody else's computer", level: 2 },
      { id: "the-url-is-an-address-in-four-parts", text: "The URL is an address in four parts", level: 2 },
      { id: "dns-turns-a-name-into-a-number", text: "DNS turns a name into a number", level: 2 },
      { id: "the-server-sends-text-not-a-picture", text: "The server sends text, not a picture", level: 2 },
      { id: "the-browser-is-the-thing-that-draws-it", text: "The browser is the thing that draws it", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-a-browser-builds-a-page",
    partId: "web",
    order: 2,
    title: "Three Languages, Three Jobs",
    description:
      "HTML, CSS, and JavaScript are not three ways to do the same thing — they answer three different questions, and mixing up which is which is the root of most beginner confusion. Strip a page back to each layer in turn.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Interactive"],
    headings: [
      { id: "html-is-what-it-is-css-is-what-it-looks-like", text: "HTML is what it is; CSS is what it looks like", level: 2 },
      { id: "javascript-is-what-happens-when-you-touch-it", text: "JavaScript is what happens when you touch it", level: 2 },
      { id: "a-page-with-no-css-still-works", text: "A page with no CSS still works", level: 2 },
      { id: "the-browser-parses-then-paints", text: "The browser parses, then paints", level: 2 },
      { id: "view-source-is-the-whole-lesson", text: "View source is the whole lesson", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "your-first-page",
    partId: "web",
    order: 3,
    title: "One File, One Browser, Nothing Installed",
    description:
      "You need a text editor and a browser, both of which you already have. Write six lines, save the file, double-click it, and you are a web developer — then learn the two habits that stop the next hundred files from being painful.",
    level: "beginner",
    minutes: 9,
    prerequisites: [],
    tags: ["Foundations", "Setup"],
    headings: [
      { id: "the-entire-toolchain-is-a-text-editor", text: "The entire toolchain is a text editor", level: 2 },
      { id: "the-extension-is-what-makes-it-a-web-page", text: "The extension is what makes it a web page", level: 2 },
      { id: "double-clicking-the-file-is-a-real-way-to-view-it", text: "Double-clicking the file is a real way to view it", level: 2 },
      { id: "index-html-is-a-name-with-a-meaning", text: "index.html is a name with a meaning", level: 2 },
      { id: "save-then-refresh-is-the-whole-loop", text: "Save, then refresh, is the whole loop", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "elements-and-tags",
    partId: "html",
    order: 4,
    title: "Elements, Tags, and the Ones That Never Close",
    description:
      "An element, a tag, an attribute, and a value are four different things that everybody calls tags. Take one line of HTML apart piece by piece, and meet the handful of elements that have no closing tag at all.",
    level: "beginner",
    minutes: 10,
    prerequisites: ["your-first-page"],
    tags: ["HTML", "Interactive"],
    headings: [
      { id: "an-element-is-an-opening-tag-content-and-a-closing-tag", text: "An element is an opening tag, content, and a closing tag", level: 2 },
      { id: "attributes-live-in-the-opening-tag-only", text: "Attributes live in the opening tag only", level: 2 },
      { id: "void-elements-have-nothing-to-close-around", text: "Void elements have nothing to close around", level: 2 },
      { id: "elements-nest-and-they-must-not-overlap", text: "Elements nest, and they must not overlap", level: 2 },
      { id: "the-browser-will-forgive-you-and-that-is-the-problem", text: "The browser will forgive you, and that is the problem", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "document-structure",
    partId: "html",
    order: 5,
    title: "The Skeleton Every Page Has",
    description:
      "Every page on the internet starts with the same eight lines, and each one is doing a job you can name. Then see the same markup as a tree, because that is what the browser turns it into and what CSS selects from.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["HTML", "Interactive"],
    headings: [
      { id: "doctype-is-not-a-tag-and-is-not-optional", text: "doctype is not a tag, and is not optional", level: 2 },
      { id: "head-is-about-the-page-body-is-the-page", text: "head is about the page; body is the page", level: 2 },
      { id: "the-four-things-that-belong-in-head", text: "The four things that belong in head", level: 2 },
      { id: "your-markup-becomes-a-tree", text: "Your markup becomes a tree", level: 2 },
      { id: "parents-children-and-siblings-are-css-vocabulary", text: "Parents, children, and siblings are CSS vocabulary", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "text-and-headings",
    partId: "html",
    order: 6,
    title: "Marking Words Up So They Mean Something",
    description:
      "There are six heading levels and they are an outline, not six font sizes — using h3 because it looked right is a common HTML mistake. Learn what each text element claims, and which two look identical and are not.",
    level: "beginner",
    minutes: 10,
    prerequisites: ["elements-and-tags"],
    tags: ["HTML"],
    headings: [
      { id: "headings-are-an-outline-not-a-size-chart", text: "Headings are an outline, not a size chart", level: 2 },
      { id: "one-h-one-per-page-and-no-skipped-levels", text: "One h1 per page, and no skipped levels", level: 2 },
      { id: "a-paragraph-is-a-block-and-whitespace-is-not", text: "A paragraph is a block, and whitespace is not", level: 2 },
      { id: "strong-and-em-mean-more-than-bold-and-italic", text: "strong and em mean more than bold and italic", level: 2 },
      { id: "entities-are-for-characters-html-would-eat", text: "Entities are for characters HTML would eat", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "links-and-images",
    partId: "html",
    order: 7,
    title: "The Two Elements That Made the Web",
    description:
      "A link and an image are the whole reason the web is a web rather than a pile of documents. Both are one tag with one critical attribute — and both have a second attribute people skip that decides whether the page works at all.",
    level: "beginner",
    minutes: 11,
    prerequisites: ["elements-and-tags"],
    tags: ["HTML"],
    headings: [
      { id: "an-anchor-is-a-tag-around-the-thing-you-click", text: "An anchor is a tag around the thing you click", level: 2 },
      { id: "relative-and-absolute-paths-answer-from-where", text: "Relative and absolute paths answer: from where?", level: 2 },
      { id: "link-text-is-read-out-of-context", text: "Link text is read out of context", level: 2 },
      { id: "img-needs-alt-and-alt-is-not-a-caption", text: "img needs alt, and alt is not a caption", level: 2 },
      { id: "width-and-height-stop-the-page-from-jumping", text: "width and height stop the page from jumping", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "lists-and-tables",
    partId: "html",
    order: 8,
    title: "Data That Has Shape",
    description:
      "Lists are the most-used element on the web and most of them are not visibly lists. Tables are the most-abused element in its history. Learn what each is for, and the one rule that decides between them.",
    level: "beginner",
    minutes: 10,
    prerequisites: [],
    tags: ["HTML"],
    headings: [
      { id: "ordered-and-unordered-differ-in-meaning-not-marker", text: "Ordered and unordered differ in meaning, not marker", level: 2 },
      { id: "navigation-is-a-list-and-should-be-marked-up-as-one", text: "Navigation is a list, and should be marked up as one", level: 2 },
      { id: "only-li-may-be-a-child-of-ul", text: "Only li may be a child of ul", level: 2 },
      { id: "tables-are-for-data-with-rows-and-columns", text: "Tables are for data with rows and columns", level: 2 },
      { id: "th-and-caption-are-what-make-a-table-readable", text: "th and caption are what make a table readable", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "forms-and-inputs",
    partId: "html",
    order: 9,
    title: "Asking the Visitor for Something",
    description:
      "A form is the only part of HTML that sends data anywhere, and one unlabelled input is the difference between a usable form and an unusable one. Meet the input types that give phones the right keyboard for free.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["elements-and-tags"],
    tags: ["HTML"],
    headings: [
      { id: "a-form-wraps-the-inputs-and-says-where-they-go", text: "A form wraps the inputs and says where they go", level: 2 },
      { id: "every-input-needs-a-label-that-is-joined-to-it", text: "Every input needs a label that is joined to it", level: 2 },
      { id: "the-type-attribute-changes-the-keyboard", text: "The type attribute changes the keyboard", level: 2 },
      { id: "placeholder-is-not-a-label-and-never-was", text: "placeholder is not a label, and never was", level: 2 },
      { id: "the-browser-validates-before-your-server-does", text: "The browser validates before your server does", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "semantic-html",
    partId: "html",
    order: 10,
    title: "div Is the Last Resort, Not the First",
    description:
      "A div says nothing about its contents, and a page built from thirty of them is invisible to a screen reader, a search engine, and reader mode alike. Swap them for the elements that mean something and lose nothing at all.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["document-structure"],
    tags: ["HTML"],
    headings: [
      { id: "a-div-is-a-box-with-no-meaning", text: "A div is a box with no meaning", level: 2 },
      { id: "header-nav-main-and-footer-name-the-regions", text: "header, nav, main, and footer name the regions", level: 2 },
      { id: "article-and-section-are-not-interchangeable", text: "article and section are not interchangeable", level: 2 },
      { id: "semantic-markup-is-free-accessibility", text: "Semantic markup is free accessibility", level: 2 },
      { id: "when-a-div-is-genuinely-the-right-answer", text: "When a div is the right answer", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "how-css-attaches",
    partId: "css",
    order: 11,
    title: "Three Ways In, One You Should Use",
    description:
      "CSS can be written in an attribute, in the head, or in its own file, and only one of those scales past a single page. See what a rule is made of, then meet the styles the browser applied before you wrote anything.",
    level: "beginner",
    minutes: 10,
    prerequisites: ["document-structure"],
    tags: ["CSS"],
    headings: [
      { id: "a-rule-is-a-selector-and-a-block-of-declarations", text: "A rule is a selector and a block of declarations", level: 2 },
      { id: "inline-styles-are-the-fastest-and-the-worst", text: "Inline styles are the fastest and the worst", level: 2 },
      { id: "a-style-tag-works-for-exactly-one-page", text: "A style tag works for exactly one page", level: 2 },
      { id: "an-external-stylesheet-is-the-real-answer", text: "An external stylesheet is the real answer", level: 2 },
      { id: "the-browser-had-a-stylesheet-before-you-did", text: "The browser had a stylesheet before you did", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "selectors",
    partId: "css",
    order: 12,
    title: "Choosing What to Style",
    description:
      "Everything CSS does begins with picking elements, and about eight selectors cover most of the cases you will meet. Try each against a real document and watch exactly which elements light up.",
    level: "beginner",
    minutes: 12,
    prerequisites: ["how-css-attaches"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "type-selectors-match-every-element-of-a-kind", text: "Type selectors match every element of a kind", level: 2 },
      { id: "classes-are-the-ones-you-will-use-constantly", text: "Classes are the ones you will use constantly", level: 2 },
      { id: "ids-match-one-element-and-cause-trouble-later", text: "IDs match one element, and cause trouble later", level: 2 },
      { id: "descendant-and-child-combinators-are-different", text: "Descendant and child combinators are different", level: 2 },
      { id: "pseudo-classes-match-a-state-not-an-element", text: "Pseudo-classes match a state, not an element", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-cascade-and-specificity",
    partId: "css",
    order: 13,
    title: "Why Your Rule Did Not Apply",
    description:
      "Two rules target the same element and one of them wins, by a procedure that is completely deterministic and almost never taught. Score two selectors against each other and find out why the one you wrote lost.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["selectors"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "three-questions-decide-every-conflict-in-order", text: "Three questions decide every conflict, in order", level: 2 },
      { id: "specificity-is-counted-not-weighed", text: "Specificity is counted, not weighed", level: 2 },
      { id: "source-order-only-breaks-an-exact-tie", text: "Source order only breaks an exact tie", level: 2 },
      { id: "inheritance-is-a-separate-mechanism-entirely", text: "Inheritance is a separate mechanism entirely", level: 2 },
      { id: "important-is-a-debt-not-a-tool", text: "!important is a debt, not a tool", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "the-box-model",
    partId: "css",
    order: 14,
    title: "Every Element Is a Box With Four Layers",
    description:
      "Set an element to 300 pixels wide, add padding, and measure it: it is 340. That one behaviour has confused every person who has ever learned CSS, and one line of code fixes it permanently.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["how-css-attaches"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "content-padding-border-margin-from-inside-out", text: "Content, padding, border, margin — from the inside out", level: 2 },
      { id: "width-means-the-content-box-by-default", text: "width means the content box, by default", level: 2 },
      { id: "border-box-makes-width-mean-what-you-meant", text: "border-box makes width mean what you meant", level: 2 },
      { id: "vertical-margins-collapse-into-each-other", text: "Vertical margins collapse into each other", level: 2 },
      { id: "padding-versus-margin-is-inside-versus-outside", text: "Padding versus margin is inside versus outside", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "colour-and-typography",
    partId: "css",
    order: 15,
    title: "Readable First, Pretty Second",
    description:
      "Most of what makes a page look designed is line height, line length, and contrast — three properties, none of them exciting. Learn the four ways to write a colour and why the default line-height is wrong for body text.",
    level: "beginner",
    minutes: 12,
    prerequisites: [],
    tags: ["CSS"],
    headings: [
      { id: "four-ways-to-write-a-colour-and-when-each-helps", text: "Four ways to write a colour, and when each helps", level: 2 },
      { id: "font-family-is-a-list-because-fonts-go-missing", text: "font-family is a list, because fonts go missing", level: 2 },
      { id: "line-height-does-more-for-readability-than-anything", text: "line-height does more for readability than anything", level: 2 },
      { id: "line-length-has-a-right-answer", text: "Line length has a right answer", level: 2 },
      { id: "rem-and-em-respect-a-choice-the-reader-made", text: "rem and em respect a choice the reader made", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "display-and-flow",
    partId: "layout",
    order: 16,
    title: "Block, Inline, and the Normal Flow",
    description:
      "Before any layout system, the browser already has one, and half of learning CSS layout is understanding what it does by default. Find out why width does nothing on a span and why an image leaves a gap underneath it.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["the-box-model"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "normal-flow-is-a-layout-you-did-not-ask-for", text: "Normal flow is a layout you did not ask for", level: 2 },
      { id: "block-elements-take-the-whole-line", text: "Block elements take the whole line", level: 2 },
      { id: "inline-elements-ignore-width-and-vertical-margin", text: "Inline elements ignore width and vertical margin", level: 2 },
      { id: "inline-block-is-the-compromise", text: "inline-block is the compromise", level: 2 },
      { id: "display-none-versus-visibility-hidden", text: "display: none versus visibility: hidden", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "flexbox",
    partId: "layout",
    order: 17,
    title: "One Dimension, Solved",
    description:
      "Flexbox exists because centring a box vertically used to require a genuine trick. Set four properties, watch a row become a column and back, and learn which axis each property is actually talking about.",
    level: "intermediate",
    minutes: 13,
    prerequisites: ["display-and-flow"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "display-flex-changes-the-children-not-the-parent", text: "display: flex changes the children, not the parent", level: 2 },
      { id: "the-main-axis-is-whichever-direction-you-chose", text: "The main axis is whichever direction you chose", level: 2 },
      { id: "justify-content-runs-along-the-main-axis", text: "justify-content runs along the main axis", level: 2 },
      { id: "align-items-runs-across-it", text: "align-items runs across it", level: 2 },
      { id: "gap-replaced-margins-between-children", text: "gap replaced margins between children", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "grid",
    partId: "layout",
    order: 18,
    title: "Two Dimensions, Solved",
    description:
      "Grid is the first CSS layout system designed for layout rather than adapted into it, and it makes a page skeleton about four lines long. Draw columns, span a cell across two of them, and meet the unit that only exists here.",
    level: "advanced",
    minutes: 13,
    prerequisites: ["flexbox"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "grid-defines-the-tracks-and-then-fills-them", text: "Grid defines the tracks, and then fills them", level: 2 },
      { id: "the-fr-unit-divides-what-is-left-over", text: "The fr unit divides what is left over", level: 2 },
      { id: "spanning-cells-is-what-flexbox-cannot-do", text: "Spanning cells is what flexbox cannot do", level: 2 },
      { id: "repeat-and-minmax-remove-the-media-query", text: "repeat and minmax remove the media query", level: 2 },
      { id: "grid-for-the-page-flex-for-the-parts", text: "Grid for the page, flex for the parts", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "responsive-design",
    partId: "layout",
    order: 19,
    title: "One Page, Every Screen",
    description:
      "More than half of everyone reading your page is holding it in one hand, and a page that ignores that is unusable rather than merely ugly. Drag a viewport across a breakpoint and watch a media query fire.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["flexbox"],
    tags: ["CSS", "Interactive"],
    headings: [
      { id: "one-meta-tag-decides-whether-any-of-this-works", text: "One meta tag decides whether any of this works", level: 2 },
      { id: "a-media-query-applies-rules-conditionally", text: "A media query applies rules conditionally", level: 2 },
      { id: "mobile-first-means-the-base-styles-are-the-small-ones", text: "Mobile-first means the base styles are the small ones", level: 2 },
      { id: "breakpoints-come-from-the-content-not-from-devices", text: "Breakpoints come from the content, not from devices", level: 2 },
      { id: "the-most-responsive-css-has-no-media-queries", text: "The most responsive CSS has no media queries at all", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "marking-up-the-page",
    partId: "build",
    order: 20,
    title: "The Whole Page in HTML, Before Any CSS",
    description:
      "Build a complete personal site as markup alone — no styles, no colours, nothing but structure. It will look like a 1994 document, and it will already be readable, navigable, and correct, which is the entire point.",
    level: "intermediate",
    minutes: 14,
    prerequisites: ["semantic-html"],
    tags: ["Project"],
    headings: [
      { id: "decide-the-content-before-you-decide-anything-else", text: "Decide the content before you decide anything else", level: 2 },
      { id: "the-skeleton-and-the-four-regions", text: "The skeleton and the four regions", level: 2 },
      { id: "the-hero-and-the-project-list", text: "The hero and the project list", level: 2 },
      { id: "the-contact-form-and-the-footer", text: "The contact form and the footer", level: 2 },
      { id: "read-it-once-with-no-styles-at-all", text: "Read it once, with no styles at all", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "styling-the-page",
    partId: "build",
    order: 21,
    title: "From Unstyled Markup to Something You Would Show Someone",
    description:
      "Take the page from the last chapter and style it in five passes, in an order that stops you from repainting the same thing four times. Reset, tokens, typography, layout, detail — and no markup changes at all.",
    level: "intermediate",
    minutes: 15,
    prerequisites: ["marking-up-the-page", "grid"],
    tags: ["Project"],
    headings: [
      { id: "a-three-line-reset-before-anything-else", text: "A three-line reset before anything else", level: 2 },
      { id: "custom-properties-are-your-design-decisions", text: "Custom properties are your design decisions", level: 2 },
      { id: "typography-and-measure-come-before-colour", text: "Typography and measure come before colour", level: 2 },
      { id: "layout-with-grid-outside-and-flex-inside", text: "Layout with grid outside and flex inside", level: 2 },
      { id: "the-details-that-make-it-feel-finished", text: "The details that make it feel finished", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "accessibility-basics",
    partId: "ship",
    order: 22,
    title: "It Works for Everyone or It Does Not Work",
    description:
      "Most accessibility is not extra work — it is the HTML you already know, used correctly, plus enough contrast to read. Check a real colour pair against the standard and find out how many popular palettes fail it.",
    level: "intermediate",
    minutes: 12,
    prerequisites: ["semantic-html"],
    tags: ["Shipping", "Interactive"],
    headings: [
      { id: "semantic-html-was-most-of-the-work-already", text: "Semantic HTML was most of the work already", level: 2 },
      { id: "contrast-is-a-ratio-with-a-number-to-hit", text: "Contrast is a ratio, with a number to hit", level: 2 },
      { id: "never-signal-with-colour-alone", text: "Never signal with colour alone", level: 2 },
      { id: "everything-must-work-from-the-keyboard", text: "Everything must work from the keyboard", level: 2 },
      { id: "alt-text-and-the-images-that-need-none", text: "Alt text, and the images that need none", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "devtools",
    partId: "ship",
    order: 23,
    title: "Reading What the Browser Actually Did",
    description:
      "Every browser ships a tool that shows you the live page, every rule applied to any element, and which ones were crossed out and why. Most beginners never open it, and it answers nearly every question they ask.",
    level: "intermediate",
    minutes: 11,
    prerequisites: ["the-cascade-and-specificity"],
    tags: ["Shipping"],
    headings: [
      { id: "inspect-element-shows-the-live-tree-not-your-file", text: "Inspect element shows the live tree, not your file", level: 2 },
      { id: "the-styles-panel-lists-every-rule-in-order", text: "The styles panel lists every rule, in order", level: 2 },
      { id: "a-crossed-out-declaration-tells-you-it-lost", text: "A crossed-out declaration tells you it lost", level: 2 },
      { id: "editing-in-devtools-changes-nothing-on-disk", text: "Editing in devtools changes nothing on disk", level: 2 },
      { id: "the-device-toolbar-and-the-network-tab", text: "The device toolbar and the network tab", level: 2 },
    ],
    status: "published",
  },
  {
    slug: "publishing-your-site",
    partId: "ship",
    order: 24,
    title: "Getting It on the Internet",
    description:
      "A folder of HTML files is a website the moment somebody else can open it, and for a static page that is free and takes about five minutes. Then the three checks worth doing before you send anyone the link.",
    level: "beginner",
    minutes: 11,
    prerequisites: [],
    tags: ["Shipping"],
    lastReviewed: "2026-08-09",
    headings: [
      { id: "a-static-site-needs-no-server-you-manage", text: "A static site needs no server you manage", level: 2 },
      { id: "github-pages-is-a-repository-with-a-switch", text: "GitHub Pages is a repository with a switch", level: 2 },
      { id: "netlify-and-vercel-take-a-dragged-folder", text: "Netlify and Vercel take a dragged folder", level: 2 },
      { id: "relative-paths-and-case-sensitivity-break-on-deploy", text: "Relative paths and case sensitivity break on deploy", level: 2 },
      { id: "three-checks-before-you-send-the-link", text: "Three checks before you send the link", level: 2 },
    ],
    status: "published",
  },
];

export type { LearnChapter as HtmlCssLesson } from "@/lib/learn-types";
