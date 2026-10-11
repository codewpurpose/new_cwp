import type { WebCode } from "./share";

/**
 * Builds the document the preview iframe renders.
 *
 * Safety is layered:
 * - The iframe uses srcdoc with sandbox="allow-scripts" only. No
 *   allow-same-origin, so the page runs in an opaque origin and cannot read
 *   this site's cookies, storage or DOM; no allow-forms, allow-popups or
 *   allow-top-navigation either.
 * - A Content-Security-Policy meta tag blocks every network request: no
 *   external scripts, stylesheets, images, fonts or fetch. Inline code and
 *   data: URLs still work, which is all a lesson snippet needs.
 * - A tiny guard stops link clicks from navigating the frame away, and
 *   reports uncaught script errors to the editor via postMessage.
 *
 * No base styles are added: what learners see is the browser's own default
 * rendering, exactly as it would be in a file they opened themselves.
 */
export const PREVIEW_MESSAGE_TAG = "cwp-webplay";

const CSP = [
  "default-src 'none'",
  "style-src 'unsafe-inline'",
  "script-src 'unsafe-inline'",
  "img-src data: blob:",
  "font-src data:",
  "media-src data: blob:",
].join("; ");

const GUARD = `(function(){
  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a[href]") : null;
    if (link && (link.getAttribute("href") || "").charAt(0) !== "#") event.preventDefault();
  }, true);
  window.addEventListener("error", function (event) {
    try {
      parent.postMessage({ source: "${PREVIEW_MESSAGE_TAG}", message: String(event.message || "Script error") }, "*");
    } catch (e) {}
  });
})();`;

/** Keep author code from closing the wrapping tag early. */
function escapeClosing(code: string, tag: "script" | "style"): string {
  return code.replace(new RegExp(`</(${tag})`, "gi"), "<\\/$1");
}

export function buildPreviewDocument({ html, css, js }: WebCode): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>${GUARD}</script>
<style>${escapeClosing(css, "style")}</style>
</head>
<body>
${html}
${js.trim() ? `<script>${escapeClosing(js, "script")}</script>` : ""}
</body>
</html>`;
}
