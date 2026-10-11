import { playgroundHref } from "@/components/playground/share";
import type { ProjectCode } from "@/lib/projects";

/**
 * Where "Open in playground" goes for a piece of project code.
 *
 * Python and ML code use the Python playground's own share encoder, so the
 * link format stays in one place. Web code goes to /playground/web/, whose
 * fragment is `#code=` + base64url (no padding) of the UTF-8 JSON
 * `{"html","css","js"}`. That route owns its decoder; this is the matching
 * encoder, kept local so this folder doesn't depend on files still in flux.
 */
export const WEB_PLAYGROUND_PATH = "/playground/web/";

export function encodeWebCode(files: { html: string; css: string; js: string }): string {
  const json = JSON.stringify({ html: files.html, css: files.css, js: files.js });
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function projectPlaygroundHref(code: ProjectCode): string {
  if (code.kind === "python") return playgroundHref(code.code);
  return `${WEB_PLAYGROUND_PATH}#code=${encodeWebCode(code)}`;
}
