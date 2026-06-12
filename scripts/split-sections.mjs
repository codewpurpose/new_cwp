import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const html = readFileSync('docs/research/tryglen-page.html', 'utf8');
mkdirSync('docs/research/sections', { recursive: true });

// Extract <body>...</body>
const body = html.slice(html.indexOf('<body'), html.indexOf('</body>'));

// Find top-level structural pieces by known markers
const markers = [
  ['header', /<header[^>]*>/],
  ['main-open', /<main[^>]*>/],
  ['footer', /<footer[^>]*>/],
];

// Simple balanced-tag extractor
function extractElement(src, startIdx) {
  const tagMatch = src.slice(startIdx).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
  if (!tagMatch) return null;
  const tag = tagMatch[1];
  const re = new RegExp(`<${tag}[\\s>]|</${tag}>`, 'g');
  re.lastIndex = startIdx;
  let depth = 0, m;
  while ((m = re.exec(src))) {
    if (m[0].startsWith('</')) { depth--; if (depth === 0) return src.slice(startIdx, m.index + m[0].length); }
    else depth++;
  }
  return null;
}

// header
const headerIdx = body.search(/<header/);
const headerHtml = extractElement(body, headerIdx);
writeFileSync('docs/research/sections/00-header.html', headerHtml);

// main children
const mainIdx = body.search(/<main/);
const mainHtml = extractElement(body, mainIdx);
const mainInner = mainHtml.slice(mainHtml.indexOf('>') + 1, mainHtml.lastIndexOf('</main>'));
let i = 0, n = 0;
const names = [];
while (i < mainInner.length) {
  const next = mainInner.slice(i).search(/<(section|div)[\s>]/);
  if (next === -1) break;
  const start = i + next;
  const el = extractElement(mainInner, start);
  if (!el) break;
  const idMatch = el.match(/id="([^"]+)"/);
  const name = `${String(n).padStart(2, '0')}-${idMatch ? idMatch[1] : 'section'}`;
  writeFileSync(`docs/research/sections/main-${name}.html`, el);
  names.push(`main-${name}.html (${el.length} bytes)`);
  n++;
  i = start + el.length;
}

// footer
const footerIdx = body.search(/<footer/);
writeFileSync('docs/research/sections/99-footer.html', extractElement(body, footerIdx));

// any body-level section (modal?)
const bodySectionIdx = body.search(/<\/main>[\s\S]*?<section/);
console.log(names.join('\n'));
console.log('header:', headerHtml.length, 'footer ok');
