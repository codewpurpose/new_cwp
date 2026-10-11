import type { WebCode } from "./share";

export interface WebStarter extends WebCode {
  id: string;
  label: string;
  /** One line suggesting something to change. */
  hint: string;
}

export const WEB_STARTERS: readonly WebStarter[] = [
  {
    id: "profile-card",
    label: "Profile card",
    hint: "Change the --accent colour, then the border-radius, and watch the whole card follow.",
    html: `<article class="card">
  <div class="avatar" aria-hidden="true">AK</div>
  <h1>Ada Kim</h1>
  <p class="role">Learning to build for the web</p>
  <p>I like small projects, clear writing and good tea.</p>
  <a class="button" href="#">Say hello</a>
</article>`,
    css: `:root {
  --accent: #3e7f5c;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #fcf4e8;
  font-family: system-ui, sans-serif;
  color: #15120c;
}

.card {
  width: min(320px, 90vw);
  padding: 28px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e0d4c4;
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #dbefdb;
  color: var(--accent);
  font-weight: 700;
  font-size: 1.5rem;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.role {
  margin: 4px 0 16px;
  color: var(--accent);
  font-weight: 600;
}

.button {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--accent);
  color: white;
  text-decoration: none;
}`,
    js: "",
  },
  {
    id: "flexbox",
    label: "Flexbox layout",
    hint: "Swap justify-content: space-between for center, then set flex-direction: column on .bar.",
    html: `<header class="bar">
  <a class="logo" href="#">Leaf</a>
  <nav class="links">
    <a href="#">Lessons</a>
    <a href="#">Projects</a>
    <a href="#">About</a>
  </nav>
</header>

<main class="row">
  <div class="box">One</div>
  <div class="box">Two</div>
  <div class="box grow">Three grows</div>
</main>`,
    css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #fcf4e8;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #1e3c2c;
}

.bar a {
  color: white;
  text-decoration: none;
}

.logo {
  font-weight: 700;
}

.links {
  display: flex;
  gap: 16px;
}

.row {
  display: flex;
  gap: 12px;
  padding: 20px;
}

.box {
  padding: 24px;
  border-radius: 12px;
  background: #dbefdb;
  border: 1px solid #3e7f5c;
}

.grow {
  flex: 1;
}`,
    js: "",
  },
  {
    id: "buttons",
    label: "Buttons and hover",
    hint: "Change the transition time, or add a transform to .primary:hover. Tab to the buttons to see the focus ring.",
    html: `<div class="buttons">
  <button class="primary">Save</button>
  <button class="secondary">Cancel</button>
  <button class="primary" disabled>Disabled</button>
</div>
<p class="note">Clicked <span id="count">0</span> times</p>`,
    css: `body {
  font-family: system-ui, sans-serif;
  padding: 24px;
  background: #fcf4e8;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

button {
  font: inherit;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #3e7f5c;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.primary {
  background: #3e7f5c;
  color: white;
}

.primary:hover {
  background: #1e3c2c;
}

.secondary {
  background: white;
  color: #1e3c2c;
}

.secondary:hover {
  background: #dbefdb;
}

button:focus-visible {
  outline: 3px solid #9fd3b0;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.note {
  color: #4f483d;
}`,
    js: `const count = document.querySelector("#count");
let clicks = 0;

document.querySelectorAll("button:not([disabled])").forEach((button) => {
  button.addEventListener("click", () => {
    clicks += 1;
    count.textContent = clicks;
  });
});`,
  },
  {
    id: "responsive-grid",
    label: "Responsive grid",
    hint: "Change 160px in minmax() to 240px, then make the window narrower and watch the columns drop.",
    html: `<h1>Plants I grow</h1>
<ul class="grid">
  <li>Basil</li>
  <li>Mint</li>
  <li>Tomato</li>
  <li>Pea</li>
  <li>Rosemary</li>
  <li>Spinach</li>
</ul>`,
    css: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
  background: #fcf4e8;
  color: #15120c;
}

h1 {
  font-size: 1.5rem;
  margin-top: 0;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.grid li {
  padding: 28px 16px;
  border-radius: 14px;
  background: #dbefdb;
  text-align: center;
  font-weight: 600;
  color: #1e3c2c;
}

@media (max-width: 400px) {
  h1 {
    font-size: 1.2rem;
  }
}`,
    js: "",
  },
];

export const DEFAULT_STARTER = WEB_STARTERS[0];

export function starterById(id: string | null | undefined): WebStarter | undefined {
  return WEB_STARTERS.find((starter) => starter.id === id);
}
