/**
 * Share links for the web playground carry the code in the URL fragment:
 *
 *   /playground/web/#code=<base64url of UTF-8 JSON {"html":"…","css":"…","js":"…"}, no padding>
 *
 * The fragment never leaves the browser, so sharing needs no server and stores
 * nothing anywhere. Other parts of the site (project pages, lessons) build
 * links in exactly this format, so keep it stable.
 */
export const WEB_PLAYGROUND_PATH = "/playground/web/";

export interface WebCode {
  html: string;
  css: string;
  js: string;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

/** Base64url (no padding) of the UTF-8 JSON {"html","css","js"}. */
export function encodeWebCode(code: Partial<WebCode>): string {
  const payload: WebCode = { html: code.html ?? "", css: code.css ?? "", js: code.js ?? "" };
  return toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
}

/**
 * The inverse of encodeWebCode. Tolerates standard base64, padding and
 * percent-encoding too, and missing keys (treated as empty). Returns null for
 * anything that is not a valid payload.
 */
export function decodeWebCode(encoded: string): WebCode | null {
  try {
    const bytes = fromBase64Url(decodeURIComponent(encoded.trim()));
    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const record = parsed as Record<string, unknown>;
    const field = (key: keyof WebCode) => (typeof record[key] === "string" ? (record[key] as string) : "");
    if (!["html", "css", "js"].some((key) => typeof record[key] === "string")) return null;
    return { html: field("html"), css: field("css"), js: field("js") };
  } catch {
    return null;
  }
}

/** A link to the full web editor, opened on this code. */
export function webPlaygroundHref(code: Partial<WebCode>): string {
  return `${WEB_PLAYGROUND_PATH}#code=${encodeWebCode(code)}`;
}

/** The code in a `#code=` fragment, or null when there isn't a valid one. */
export function webCodeFromHash(hash: string): WebCode | null {
  const match = hash.match(/^#?code=([^&]+)/);
  return match ? decodeWebCode(match[1]) : null;
}
