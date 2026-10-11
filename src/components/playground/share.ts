/**
 * Share links carry the code in the URL fragment: /playground/#code=<base64>.
 *
 * The fragment never leaves the browser (it is not sent with the request), so
 * sharing needs no server and stores nothing anywhere. Base64 of the UTF-8
 * bytes, so comments in any language and emoji survive the round trip.
 */
export const PLAYGROUND_PATH = "/playground/";
export const STORAGE_KEY = "cwp-playground-code";

export function encodeCode(code: string): string {
  const bytes = new TextEncoder().encode(code);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeCode(encoded: string): string | null {
  try {
    const binary = atob(decodeURIComponent(encoded));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export function playgroundHref(code: string) {
  return `${PLAYGROUND_PATH}#code=${encodeCode(code)}`;
}

/** The code in a `#code=` fragment, or null when there isn't a valid one. */
export function codeFromHash(hash: string): string | null {
  const match = hash.match(/^#?code=(.+)$/);
  return match ? decodeCode(match[1]) : null;
}
