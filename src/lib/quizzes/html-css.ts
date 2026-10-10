import type { AuthoredQuestion } from "@/lib/quizzes/types";

/**
 * Hand-written quick checks for the html-css track, keyed by chapter slug.
 * A chapter listed here uses these questions instead of the auto-drafted
 * quiz in src/lib/quiz.ts. Each question tests something the chapter
 * actually teaches; `answer` is the zero-based index of the correct option.
 */
export const QUIZZES: Record<string, readonly AuthoredQuestion[]> = {
  "what-is-a-website": [
    {
      q: "In https://example.com/blog/post.html#comments, which part never reaches the server?",
      options: ["#comments", "/blog/", "example.com", "post.html"],
      answer: 0,
    },
    {
      q: "You point your domain at a new server, but some visitors still see the old site for a few hours. What is the most likely reason?",
      options: [
        "Cached DNS answers for the old address have not expired yet",
        "The new server is sending a 500 status code to some visitors",
        "Their browsers cannot draw the new HTML until they restart",
        "The URL's protocol changed from http to https during the move",
      ],
      answer: 0,
    },
    {
      q: "What does the server actually send back when you request a web page?",
      options: [
        "Text: a few header lines, then the HTML file itself",
        "A finished image of the page, drawn by the server",
        "A layout of boxes that the browser just has to colour in",
        "A compiled program that the browser runs to show the page",
      ],
      answer: 0,
    },
    {
      q: "A link on your site leads to a page showing a 404. What does that status code tell you?",
      options: [
        "The server looked and there is no file at that path",
        "The server crashed while trying to build the page",
        "The page moved permanently and the browser followed it",
        "The file was found and sent back without any problem",
      ],
      answer: 0,
    },
  ],
  "how-a-browser-builds-a-page": [
    {
      q: "A beginner uses an <h3> for a line of text only because they wanted it smaller. What is wrong with that?",
      options: [
        "Size is a CSS question; the tag should say what the content is",
        "An h3 cannot be used unless there is an h4 straight after it",
        "Browsers refuse to render an h3 that is not inside a section",
        "Nothing; picking tags by how they look is the intended approach",
      ],
      answer: 0,
    },
    {
      q: "Which of these features genuinely needs JavaScript?",
      options: [
        "Search results that update live as you type",
        "A link that takes you to another page",
        "A form that submits to the server",
        "Headings shown in decreasing sizes",
      ],
      answer: 0,
    },
    {
      q: "A well-built page loads with its stylesheet missing. What should the visitor see?",
      options: [
        "Plain but readable content: black text, blue links, sized headings",
        "A blank white page until the stylesheet finally arrives",
        "An error message saying the page could not be displayed",
        "The raw HTML source with all of the tags visible as text",
      ],
      answer: 0,
    },
    {
      q: "Why are script tags conventionally placed at the end of the body, or given the defer attribute?",
      options: [
        "A script in the middle stops HTML parsing until it downloads and runs",
        "Scripts placed in the head are ignored by every modern browser",
        "The DOM cannot be built at all until every script has finished",
        "CSS rules are not applied to elements that come after a script",
      ],
      answer: 0,
    },
  ],
  "your-first-page": [
    {
      q: "You save index.html in Notepad on Windows, but double-clicking it opens it as plain text. What is the most likely cause?",
      options: [
        "It was saved as index.html.txt, hidden because extensions are off",
        "The file is missing a <script> tag that tells it to open in a browser",
        "Windows can only open web pages that are served from a real server",
        "The file needs to be named Index.html with a capital letter",
      ],
      answer: 0,
    },
    {
      q: "A visitor goes to example.com/about/ with no file name. Which file does a typical server send?",
      options: ["/about/index.html", "/about.html", "/index.html", "/about/home.html"],
      answer: 0,
    },
    {
      q: "Your page shows photo.jpg on your laptop but the image 404s once published. The file on disk is named Photo.JPG. What went wrong?",
      options: [
        "Web servers are usually case-sensitive, while your laptop is not",
        "JPG images cannot be displayed on a page served over https",
        "The image needs to be inside the same folder as the server",
        "Published pages can only use PNG images, not JPG",
      ],
      answer: 0,
    },
    {
      q: "You edit your page, refresh the browser, and nothing changes. What should you check first?",
      options: [
        "Whether the file is actually saved",
        "Whether your doctype is up to date",
        "Whether the browser needs reinstalling",
        "Whether the domain's DNS has updated",
      ],
      answer: 0,
    },
  ],
  "elements-and-tags": [
    {
      q: "What does <input type=\"email\" required=\"false\"> do?",
      options: [
        "It makes the field required, because the attribute is present",
        "It makes the field optional, because the value is false",
        "It causes an error that stops the form from showing",
        "It hides the field until the user clicks on the form",
      ],
      answer: 0,
    },
    {
      q: "Which of these is a void element that takes no closing tag?",
      options: ["<link>", "<a>", "<p>", "<title>"],
      answer: 0,
    },
    {
      q: "Which line is correctly nested?",
      options: [
        "<p>This is <em>really</em> good.</p>",
        "<p>This is <em>really good.</p></em>",
        "<em><p>This is really</em> good.</p>",
        "<p>This is <em>really good.</p>",
      ],
      answer: 0,
    },
    {
      q: "You forgot a closing tag and the page looks wrong, but the browser shows no error. What is the best way to find the problem?",
      options: [
        "Run the markup through the W3C validator",
        "Open the browser's settings and turn on HTML errors",
        "Rename the file from .html to .htm and reload",
        "Add more indentation until the error appears",
      ],
      answer: 0,
    },
  ],
  "document-structure": [
    {
      q: "A page is missing <!doctype html>. What happens?",
      options: [
        "The browser uses quirks mode, which changes how width is calculated",
        "The browser refuses to display the page and shows an error",
        "Nothing at all; the doctype is only a comment for humans",
        "The page loads, but every CSS file linked from it is ignored",
      ],
      answer: 0,
    },
    {
      q: "Which of these belongs in the head rather than the body?",
      options: [
        "<link rel=\"stylesheet\" href=\"styles.css\">",
        "<h1>Welcome to my site</h1>",
        "<img src=\"logo.png\" alt=\"Logo\">",
        "<p>Thanks for visiting.</p>",
      ],
      answer: 0,
    },
    {
      q: "Your page looks tiny on a phone and your small-screen media queries never apply. What is most likely missing?",
      options: [
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        "<meta charset=\"utf-8\">",
        "<html lang=\"en\">",
        "<meta name=\"description\" content=\"...\">",
      ],
      answer: 0,
    },
    {
      q: "In <main><section><a href=\"/\">Home</a></section></main>, how does the a element relate to main?",
      options: [
        "It is a descendant of main but not a child",
        "It is a direct child of main",
        "It is a sibling of main",
        "It is an ancestor of main",
      ],
      answer: 0,
    },
  ],
  "text-and-headings": [
    {
      q: "A page goes <h1>, then straight to <h3>, because the h3 size looked right. What should you change?",
      options: [
        "Use an h2 for that heading and resize it with CSS if needed",
        "Keep the h3 and add an empty h2 above it to fill the gap",
        "Swap the h3 for a bold paragraph so the outline is skipped",
        "Nothing; heading levels can be chosen freely by size",
      ],
      answer: 0,
    },
    {
      q: "What does <p>Hello      there</p> (with many spaces between the words) render as?",
      options: ["Hello there", "Hello      there", "Hello on one line, there on the next", "Hellothere"],
      answer: 0,
    },
    {
      q: "Which element marks a word you would stress when speaking, possibly changing the sentence's meaning?",
      options: ["em", "i", "b", "span"],
      answer: 0,
    },
    {
      q: "You want the text \"Use the <p> element\" to appear on the page. What should you write?",
      options: [
        "Use the &lt;p&gt; element",
        "Use the <p> element",
        "Use the \"<p>\" element",
        "Use the <!-- p --> element",
      ],
      answer: 0,
    },
  ],
  "links-and-images": [
    {
      q: "From about/index.html, which src correctly reaches images/logo.png in the site root (my-site/images/logo.png)?",
      options: ["../images/logo.png", "images/logo.png", "./images/logo.png", "about/images/logo.png"],
      answer: 0,
    },
    {
      q: "Your image src=\"/images/logo.png\" works on the published site but breaks when you double-click the file locally. Why?",
      options: [
        "Over file://, a leading slash means the top of your disk, not your site folder",
        "Browsers only show images when the page is served over https",
        "Local files cannot contain img elements without a width attribute",
        "The leading slash makes the browser look on another website",
      ],
      answer: 0,
    },
    {
      q: "Which alt text is best for a decorative background swirl that adds no information?",
      options: ["alt=\"\"", "alt=\"swirl.svg\"", "alt=\"image\"", "No alt attribute at all"],
      answer: 0,
    },
    {
      q: "Why add width and height attributes to an img?",
      options: [
        "So the browser can reserve the right space and the page does not jump",
        "So the image is always displayed at exactly that size on every screen",
        "So the image downloads faster by being compressed to those dimensions",
        "So screen readers can announce how large the image is",
      ],
      answer: 0,
    },
  ],
  "lists-and-tables": [
    {
      q: "You are marking up a recipe's method, where step 3 must come after step 2. Which element fits?",
      options: ["ol", "ul", "dl", "table"],
      answer: 0,
    },
    {
      q: "Which of these is valid markup?",
      options: [
        "<ul><li><p>Some text</p></li></ul>",
        "<ul><p>Some text</p><li>Item</li></ul>",
        "<ul><li>Fruit</li><ul><li>Apples</li></ul></ul>",
        "<ul><div><li>Item</li></div></ul>",
      ],
      answer: 0,
    },
    {
      q: "Which of these should be built as an HTML table?",
      options: [
        "A train timetable with stations as rows and times as columns",
        "A gallery of photos arranged in three columns",
        "A two-column page with a sidebar and main content",
        "A row of product cards on a shop's home page",
      ],
      answer: 0,
    },
    {
      q: "What does scope=\"col\" on a th do?",
      options: [
        "Tells assistive technology that this header labels the cells in its column",
        "Makes the column scrollable when the table is wider than the screen",
        "Forces the header text to be bold and centred in every browser",
        "Lets the column be sorted when the visitor clicks its header",
      ],
      answer: 0,
    },
  ],
  "forms-and-inputs": [
    {
      q: "A form submits, but the server never receives the \"email\" field. The input is <input type=\"email\" id=\"email\">. What is missing?",
      options: ["A name attribute", "A label element", "A placeholder", "A required attribute"],
      answer: 0,
    },
    {
      q: "Clicking an \"Add another\" button inside your form reloads the page. What fixes it?",
      options: [
        "Add type=\"button\" to that button",
        "Move the button above the first input",
        "Change the form's method to get",
        "Give the button a name attribute",
      ],
      answer: 0,
    },
    {
      q: "Three radio buttons can all be selected at once, but only one should be. What is wrong?",
      options: [
        "They do not share the same name attribute",
        "They are not wrapped in a fieldset element",
        "They do not each have a placeholder",
        "They are missing the required attribute",
      ],
      answer: 0,
    },
    {
      q: "Your signup form uses required and pattern on every field. Is the data safe for the server to trust?",
      options: [
        "No; browser checks can be bypassed, so the server must validate too",
        "Yes; the browser will not send anything that fails these checks",
        "Yes, as long as the form also uses method=\"post\"",
        "Only if every input also has a matching label",
      ],
      answer: 0,
    },
  ],
  "semantic-html": [
    {
      q: "Your page uses <div class=\"nav\"> around the site's main menu links. What should it be instead?",
      options: ["<nav>", "<section>", "<aside>", "<header class=\"nav\">"],
      answer: 0,
    },
    {
      q: "How many main elements should a page have?",
      options: [
        "Exactly one, holding the content unique to that page",
        "One inside every article on the page",
        "As many as there are sections with headings",
        "None; main is optional decoration for screen readers",
      ],
      answer: 0,
    },
    {
      q: "A blog post on your home page would still make sense if it were republished on its own. Which element fits it best?",
      options: ["article", "section", "aside", "div"],
      answer: 0,
    },
    {
      q: "You need a clickable control that opens a menu without navigating anywhere. What should you use?",
      options: [
        "A <button>, styled however you like",
        "A <div> with a click handler",
        "An <a> with no href attribute",
        "A <span> with a pointer cursor",
      ],
      answer: 0,
    },
  ],
  "how-css-attaches": [
    {
      q: "In the rule h1 { color: green; }, what is \"color: green;\"?",
      options: ["A declaration", "A selector", "A declaration block", "A property"],
      answer: 0,
    },
    {
      q: "You write p { color: red font-size: 18px; } (no semicolon after red). What happens?",
      options: [
        "Both declarations are discarded, and the browser reports nothing",
        "The colour applies and only the font size is ignored",
        "The browser shows an error message on the page",
        "The browser adds the missing semicolon for you",
      ],
      answer: 0,
    },
    {
      q: "Your site has five pages that should share the same look. Where should the CSS go?",
      options: [
        "In one external .css file linked from every page",
        "In a <style> tag copied into each page's head",
        "In style attributes on each element that needs it",
        "In a <style> tag at the end of each page's body",
      ],
      answer: 0,
    },
    {
      q: "Your about/index.html page suddenly has no styling, while the home page looks fine. The stylesheet is css/styles.css in the site root. What is the likely fix?",
      options: [
        "Change its href to ../css/styles.css",
        "Move the link tag into the body",
        "Rename the file to style.css",
        "Add !important to every rule",
      ],
      answer: 0,
    },
  ],
  selectors: [
    {
      q: "Given <nav><ul><li><a href=\"/\">Home</a></li></ul></nav>, which selector matches the link?",
      options: ["nav a", "nav > a", "nav + a", "ul > a"],
      answer: 0,
    },
    {
      q: "What does the selector p.intro match?",
      options: [
        "A p element that also has the class intro",
        "Any element with class intro inside a p",
        "Every p element and every element with class intro",
        "A p element that comes right after an element with class intro",
      ],
      answer: 0,
    },
    {
      q: "You need to style a \"Save\" button and a \"Send\" button the same way. What is the best choice?",
      options: [
        "Give both a shared class, such as .btn, and style that",
        "Give both buttons the same id and style the id",
        "Style each button with its own id selector",
        "Use a long chain such as body main form div button",
      ],
      answer: 0,
    },
    {
      q: "The default focus outline looks ugly on your links. What should you do?",
      options: [
        "Restyle it with :focus-visible, for example a clearer outline colour",
        "Remove it with :focus { outline: none; } and leave it at that",
        "Show the outline only on :hover so mouse users see it",
        "Hide it with a ::before element placed over the link",
      ],
      answer: 0,
    },
  ],
  "the-cascade-and-specificity": [
    {
      q: "Which selector wins: #nav .link (written first) or .menu .link.active (written later)?",
      options: [
        "#nav .link, because 1-1-0 beats 0-3-0",
        ".menu .link.active, because it has more classes",
        ".menu .link.active, because it is written later",
        "Neither; the browser applies both values at once",
      ],
      answer: 0,
    },
    {
      q: "What is the specificity of nav ul li a?",
      options: ["0-0-4", "0-4-0", "0-1-3", "1-0-3"],
      answer: 0,
    },
    {
      q: "Two rules, .btn { color: grey; } and then .btn { color: green; }, both target a button. What colour is it?",
      options: [
        "Green, because the specificity ties and the later rule wins",
        "Grey, because the first matching rule always wins",
        "Grey, because the browser keeps the first value it finds",
        "Whichever colour is darker, because CSS picks by contrast",
      ],
      answer: 0,
    },
    {
      q: "You set font-family on body, but your inputs and buttons still use a different font. What fixes it?",
      options: [
        "input, textarea, select, button { font: inherit; }",
        "body { font-family: inherit !important; }",
        "Moving the body rule to the bottom of the file",
        "Wrapping every input in a <span> element",
      ],
      answer: 0,
    },
  ],
  "the-box-model": [
    {
      q: "With the default box-sizing, how wide is .box { width: 200px; padding: 10px; border: 5px solid; } on screen?",
      options: ["230px", "200px", "215px", "220px"],
      answer: 0,
    },
    {
      q: "The same box has box-sizing: border-box. How wide is it on screen now?",
      options: ["200px", "230px", "170px", "215px"],
      answer: 0,
    },
    {
      q: "An h2 has margin-bottom: 30px and the p after it has margin-top: 20px. How big is the gap between them?",
      options: ["30px", "50px", "20px", "10px"],
      answer: 0,
    },
    {
      q: "You want a link styled as a button to be easier to tap on a phone. What should you increase?",
      options: [
        "Its padding, because padding is part of the clickable area",
        "Its margin, because margin enlarges the clickable area",
        "Its border-radius, because round buttons are easier to hit",
        "Its line-height on the parent, because it spaces out links",
      ],
      answer: 0,
    },
  ],
  "colour-and-typography": [
    {
      q: "body has font-size: 16px; line-height: 24px; and h1 has font-size: 40px. What goes wrong?",
      options: [
        "The h1 inherits a fixed 24px line height, so its lines overlap",
        "The h1 ignores line-height entirely and uses the browser default",
        "The body text becomes 24px tall instead of 16px",
        "Nothing; a pixel line-height scales with each element's size",
      ],
      answer: 0,
    },
    {
      q: "Your paragraphs stretch across a wide monitor and are hard to read. Which rule fixes that best?",
      options: [
        ".prose { max-width: 65ch; }",
        ".prose { width: 100vw; }",
        ".prose { line-height: 1; }",
        ".prose { font-size: 2vw; }",
      ],
      answer: 0,
    },
    {
      q: "Why should the last item in a font-family list be a generic family such as sans-serif?",
      options: [
        "It always exists, so the browser has a guaranteed fallback",
        "It makes the browser download the other fonts faster",
        "It is required, or the whole font-family declaration is ignored",
        "It tells the browser to use the heaviest weight available",
      ],
      answer: 0,
    },
    {
      q: "A reader has set their browser's default font size to 24px. Which h1 size respects that choice?",
      options: ["font-size: 2.5rem", "font-size: 40px", "font-size: 3vw", "font-size: 30pt"],
      answer: 0,
    },
  ],
  "display-and-flow": [
    {
      q: "You set width: 150px on a span and nothing changes. Why?",
      options: [
        "A span is inline, and inline elements ignore width",
        "Width only works when it is written in rem, not px",
        "Spans need a border before width takes effect",
        "The browser's stylesheet forces every span to auto width",
      ],
      answer: 0,
    },
    {
      q: "There is a small gap under an image inside a container. What is a correct fix?",
      options: [
        "img { display: block; }",
        "img { margin-bottom: 0; }",
        "img { border: none; }",
        "img { padding: 0; }",
      ],
      answer: 0,
    },
    {
      q: "You want small tag badges inside a sentence to have vertical margin and padding that push lines apart. Which display value fits?",
      options: ["inline-block", "inline", "none", "contents"],
      answer: 0,
    },
    {
      q: "A closed dropdown menu is hidden with opacity: 0. What problem does that cause?",
      options: [
        "Keyboard users can still tab into its invisible links",
        "The menu can never be shown again with CSS",
        "The links are removed from the page entirely",
        "Screen readers announce the menu twice",
      ],
      answer: 0,
    },
  ],
  flexbox: [
    {
      q: "A container has display: flex; flex-direction: column;. Which property centres its children vertically?",
      options: ["justify-content: center", "align-items: center", "text-align: center", "vertical-align: middle"],
      answer: 0,
    },
    {
      q: "Which declarations put a logo at the left of a header and the nav at the right, both vertically centred?",
      options: [
        "display: flex; justify-content: space-between; align-items: center;",
        "display: flex; align-items: space-between; justify-content: center;",
        "display: block; text-align: justify; vertical-align: middle;",
        "display: flex; flex-direction: column; gap: auto;",
      ],
      answer: 0,
    },
    {
      q: "A flex container holds a ul, and the ul holds three li items. Which elements become flex items?",
      options: [
        "Only the ul, because it is the direct child",
        "Only the three li elements",
        "The ul and all three li elements",
        "None of them until each one has display: flex",
      ],
      answer: 0,
    },
    {
      q: "What does flex: 1 1 250px on a card mean?",
      options: [
        "It may grow, it may shrink, and its ideal width is 250px",
        "It is exactly 250px wide and can never change size",
        "It takes one column, one row, and 250px of padding",
        "It may grow to at most 250px and never shrink",
      ],
      answer: 0,
    },
  ],
  grid: [
    {
      q: "A grid has grid-template-columns: 200px 1fr 1fr; and is 600px wide with no gap. How wide is each 1fr column?",
      options: ["200px", "300px", "150px", "400px"],
      answer: 0,
    },
    {
      q: "Why do three columns at 33.333% with a 1rem gap overflow, while 1fr 1fr 1fr does not?",
      options: [
        "Percentages ignore the gaps; fr divides the space left after them",
        "Percentages are always rounded up to the nearest whole pixel",
        "The fr unit adds an automatic negative margin to each column",
        "Percentages only work inside flex containers, not grids",
      ],
      answer: 0,
    },
    {
      q: "Which rule makes a hero element span the full width of any grid, whatever its column count?",
      options: ["grid-column: 1 / -1;", "grid-column: span 1;", "grid-row: 1 / -1;", "width: 100fr;"],
      answer: 0,
    },
    {
      q: "What does grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); do?",
      options: [
        "Fits as many columns as possible, each at least 250px, sharing leftover space",
        "Creates exactly 250 columns that each take one fraction of the space",
        "Makes every column exactly 250px and leaves any extra space empty",
        "Creates one column until a media query adds more",
      ],
      answer: 0,
    },
  ],
  "responsive-design": [
    {
      q: "Your page looks shrunken on a phone and none of your max-width: 600px rules apply. What should you check first?",
      options: [
        "That the viewport meta tag is in the head",
        "That the stylesheet uses px instead of rem",
        "That every image has a width attribute",
        "That the media queries use !important",
      ],
      answer: 0,
    },
    {
      q: "You write @media (min-width: 1024px) { … } and then @media (min-width: 640px) { … } below it, both setting the grid's columns. What happens on a 1200px screen?",
      options: [
        "The 640px rules win, because both match and they come later",
        "The 1024px rules win, because larger breakpoints always take priority",
        "Neither applies, because two matching queries cancel each other out",
        "The browser merges both, giving five columns in total",
      ],
      answer: 0,
    },
    {
      q: "In a mobile-first stylesheet, what do the base styles outside any media query describe?",
      options: [
        "The small-screen layout, with min-width queries adding to it",
        "The desktop layout, with max-width queries taking things away",
        "Only the print layout, used when the page is printed",
        "Nothing; every rule must be inside some media query",
      ],
      answer: 0,
    },
    {
      q: "How should you choose where to put breakpoints?",
      options: [
        "Widen the browser slowly and add one where the layout starts to look wrong",
        "Use the exact screen widths of the most popular phones and tablets",
        "Add a breakpoint every 100 pixels so every width is covered",
        "Use 768px only, because that is the width of every tablet",
      ],
      answer: 0,
    },
  ],
  "marking-up-the-page": [
    {
      q: "Why does this chapter have you write real words instead of lorem ipsum before building the page?",
      options: [
        "Real content has uneven lengths, so a layout built around it does not break later",
        "Browsers refuse to render pages that contain Latin placeholder text",
        "Lorem ipsum is ignored by screen readers, so the page cannot be tested",
        "Real words make the HTML file smaller and quicker to download",
      ],
      answer: 0,
    },
    {
      q: "What is the skip link at the top of the page for?",
      options: [
        "Letting keyboard users jump past the navigation straight to main",
        "Letting search engines skip the header when indexing the page",
        "Hiding the navigation on phones until the user taps it",
        "Reloading the page without the stylesheet for faster loading",
      ],
      answer: 0,
    },
    {
      q: "The projects are marked up as <ul> with an <article> inside each <li>. Why?",
      options: [
        "They are several of the same kind of thing, and each stands alone",
        "Articles cannot be placed directly inside a section element",
        "A ul is the only element that can be styled as a card grid",
        "Search engines only index articles that are inside list items",
      ],
      answer: 0,
    },
    {
      q: "Before writing any CSS, what should you do with the unstyled page?",
      options: [
        "Read it top to bottom and press Tab through every link and field",
        "Add divs around each section so the layout is ready for styling",
        "Remove the headings so they do not clash with the styles later",
        "Publish it so you can test the CSS on the live site",
      ],
      answer: 0,
    },
  ],
  "styling-the-page": [
    {
      q: "Why does this chapter set typography before layout?",
      options: [
        "Containers sized before the real type is set end up the wrong size",
        "Browsers ignore layout rules written before font rules in the file",
        "Typography rules have higher specificity than layout rules",
        "Layout properties only work once a font-family has been declared",
      ],
      answer: 0,
    },
    {
      q: "All colours are read through custom properties on :root. What does adding dark mode then involve?",
      options: [
        "Redeclaring the colour tokens inside a prefers-color-scheme: dark query",
        "Rewriting every rule that uses a colour with a new hex value",
        "Adding a second stylesheet that copies the whole file with new colours",
        "Adding a dark class to every element in the HTML",
      ],
      answer: 0,
    },
    {
      q: "Why use minmax(min(100%, 260px), 1fr) rather than minmax(260px, 1fr) for the project grid?",
      options: [
        "On screens narrower than 260px it stops the track forcing horizontal scrolling",
        "It makes every card exactly 260px wide on large screens",
        "It lets the grid use more than 100% of the container's width",
        "It is required for auto-fit to create more than one column",
      ],
      answer: 0,
    },
    {
      q: "What does wrapping the focus rule in :where(...) achieve?",
      options: [
        "The rule has zero specificity, so it is easy to override later",
        "The rule only applies to elements inside a where element",
        "The rule gets the highest possible specificity, so it always wins",
        "The rule is ignored by browsers that do not support focus-visible",
      ],
      answer: 0,
    },
  ],
  "accessibility-basics": [
    {
      q: "Light grey #999999 text on a white background scores about 2.8:1. Does it pass WCAG AA for normal body text?",
      options: [
        "No; normal text needs at least 4.5:1",
        "Yes; anything above 2:1 passes for body text",
        "Yes; grey text is exempt as secondary content",
        "Only if the text is in a bold font weight",
      ],
      answer: 0,
    },
    {
      q: "An invalid form field is shown only by turning its border red. What is the best improvement?",
      options: [
        "Keep the red border and add a visible error message in words",
        "Make the red border thicker so it is easier to notice",
        "Change the border to green so it stands out more",
        "Add a tooltip that appears only when the mouse hovers over it",
      ],
      answer: 0,
    },
    {
      q: "An icon-only search button shows a magnifying glass image. What should its alt text be?",
      options: ["alt=\"Search\"", "alt=\"Magnifying glass\"", "alt=\"\"", "alt=\"search-icon.png\""],
      answer: 0,
    },
    {
      q: "You need a clickable \"Menu\" control. Which approach does the chapter recommend?",
      options: [
        "A native <button>, adding aria-expanded for its open state",
        "A <div role=\"button\" tabindex=\"0\"> with keyboard handlers",
        "A <span> with a click handler and a pointer cursor",
        "An <a> with no href, styled to look like a button",
      ],
      answer: 0,
    },
  ],
  devtools: [
    {
      q: "Your .card { background: hotpink; } is struck through in the Styles panel, under a #sidebar .card rule. What does that tell you?",
      options: [
        "A more specific rule won, so your declaration lost",
        "The value hotpink is not a valid CSS colour",
        "The stylesheet containing your rule failed to load",
        "Your rule will apply after the page is refreshed",
      ],
      answer: 0,
    },
    {
      q: "You spend ten minutes perfecting spacing in the Styles panel, then refresh. What happens?",
      options: [
        "The changes are lost; devtools edits never touch your files",
        "The changes are saved into your stylesheet automatically",
        "The changes stay until you close the browser completely",
        "The changes are kept in the browser cache for next time",
      ],
      answer: 0,
    },
    {
      q: "Your published page is completely unstyled. Where should you look first?",
      options: [
        "The Network tab, for a red 404 on the stylesheet",
        "The Computed tab, for the body's font size",
        "The Lighthouse tab, for the performance score",
        "The device toolbar, for a phone preset",
      ],
      answer: 0,
    },
    {
      q: "Why might the Elements panel show a different structure from view source?",
      options: [
        "It shows the live DOM, including fixes the browser made and changes from JavaScript",
        "It only shows elements that have CSS applied to them",
        "It shows the file as it was before the server sent it",
        "It hides any elements that are inside the head",
      ],
      answer: 0,
    },
  ],
  "publishing-your-site": [
    {
      q: "You publish to yourname.github.io/my-site/ and your <link href=\"/styles.css\"> stops working. Why?",
      options: [
        "The leading slash points at yourname.github.io, one level too high",
        "GitHub Pages does not allow CSS files to be published",
        "Stylesheets must be in a folder called css on GitHub Pages",
        "The link tag must use an absolute https:// address when published",
      ],
      answer: 0,
    },
    {
      q: "Your img src=\"images/Logo.png\" works on your laptop but 404s once published. The file is images/logo.png. What is wrong?",
      options: [
        "The server is case-sensitive, so Logo.png and logo.png are different files",
        "Published sites can only show images listed in the head",
        "The images folder must be renamed to img before publishing",
        "PNG files have to be converted to JPG for the web",
      ],
      answer: 0,
    },
    {
      q: "You set up GitHub Pages but get a 404 at the site's address. Your files are in a docs-site/ subfolder of the repo. What is the likely fix?",
      options: [
        "Move index.html to the root of the repository (or the folder Pages publishes)",
        "Rename index.html to home.html so Pages can find it",
        "Make the repository private so Pages can serve it",
        "Add a second index.html inside every image folder",
      ],
      answer: 0,
    },
    {
      q: "Why open the published URL in a private window before sharing it?",
      options: [
        "So nothing is served from your cache and you see what visitors see",
        "So the site loads with JavaScript turned off automatically",
        "So GitHub Pages republishes the site from scratch",
        "So the browser checks the HTML against the validator",
      ],
      answer: 0,
    },
  ],
};
