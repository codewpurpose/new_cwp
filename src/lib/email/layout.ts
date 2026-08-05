/**
 * The email layout.
 *
 * One renderer for every message the site sends. You describe an email as a
 * list of blocks; this turns that into the table-and-inline-styles HTML that
 * mail clients actually render, AND into the plain-text alternative, from the
 * same source. That pairing is the point: a missing or stale text part is one
 * of the strongest spam signals there is, and hand-maintaining two copies of
 * every email guarantees they drift.
 *
 * Why tables and inline styles: Outlook renders through Word's HTML engine —
 * no flexbox, no grid, and stylesheet support that varies by version. The
 * <style> block below is a progressive enhancement (responsive tweaks and dark
 * mode); the layout itself has to survive with it stripped.
 *
 * Inline markup: block text supports `[label](https://…)` links and nothing
 * else. Everything outside a link is escaped. Keeping the authoring surface
 * this small is what lets the plain-text renderer stay honest — a link becomes
 * "label (https://…)" rather than silently vanishing.
 */

import { EMAIL_WIDTH, emailFont, emailTheme as t } from "./theme";

export interface EmailLink {
  label: string;
  href: string;
  /** Trailing context, shown after a separator. Optional. */
  note?: string;
}

export type EmailBlock =
  | { kind: "text"; text: string }
  | { kind: "button"; label: string; href: string }
  | { kind: "eyebrow"; text: string }
  | { kind: "links"; items: EmailLink[] }
  | { kind: "callout"; title: string; text: string }
  | { kind: "divider" };

export interface EmailDocument {
  /** Subject line. Also used as the document <title>. */
  subject: string;
  /** The grey line after the subject in an inbox list. Write it as real copy. */
  preheader: string;
  /** Large serif line that opens the card. */
  heading: string;
  blocks: EmailBlock[];
  /** Small-caps caption under the mascot. Omit to drop the masthead entirely. */
  masthead?: { imageUrl: string; alt: string; caption: string };
  /** Why this person is receiving the message. Required — every email owes one. */
  footerNote: string;
  /** Omit for genuinely transactional mail that carries no list membership. */
  unsubscribeUrl?: string;
  /** Absolute URLs. Relative paths do not resolve in an inbox. */
  siteUrl: string;
  logoUrl: string;
  contactEmail: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/* ---- Inline markup ------------------------------------------------------ */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** `[label](url)` becomes an anchor; everything else is escaped. */
function inlineHtml(s: string): string {
  let out = "";
  let last = 0;
  for (const m of s.matchAll(LINK_RE)) {
    const at = m.index;
    out += escapeHtml(s.slice(last, at));
    out += `<a href="${escapeHtml(m[2])}" style="color:${t.link}; text-decoration:underline;">${escapeHtml(m[1])}</a>`;
    last = at + m[0].length;
  }
  return out + escapeHtml(s.slice(last));
}

/** The same string with links flattened to `label (url)`. */
function inlineText(s: string): string {
  return s.replace(LINK_RE, (_m, label: string, href: string) => `${label} (${href})`);
}

/** Wrap plain text at 78 columns so it reads in a fixed-width client. */
function wrap(s: string, width = 78): string {
  const out: string[] = [];
  for (const paragraph of s.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (line && line.length + word.length + 1 > width) {
        out.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    out.push(line);
  }
  return out.join("\n");
}

/* ---- Block renderers ---------------------------------------------------- */

const PX = `padding-left:40px; padding-right:40px;`;

function blockHtml(block: EmailBlock): string {
  switch (block.kind) {
    case "text":
      return `<tr><td class="px" style="${PX} padding-top:0; padding-bottom:16px;">
        <p class="t-soft" style="margin:0; font-family:${emailFont.sans}; font-size:16px; line-height:26px; color:${t.inkSoft};">${inlineHtml(block.text)}</p>
      </td></tr>`;

    case "eyebrow":
      return `<tr><td class="px" style="${PX} padding-top:14px; padding-bottom:18px;">
        <div class="t-quiet" style="font-family:${emailFont.sans}; font-size:12px; font-weight:600; letter-spacing:1.3px; text-transform:uppercase; color:${t.inkQuiet};">${escapeHtml(block.text)}</div>
      </td></tr>`;

    case "button":
      return `<tr><td class="px" align="left" style="${PX} padding-top:10px; padding-bottom:28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn"><tr>
          <td bgcolor="${t.moss}" style="background-color:${t.moss}; border-radius:999px;">
            <a href="${escapeHtml(block.href)}" style="display:inline-block; padding:15px 34px; font-family:${emailFont.sans}; font-size:16px; font-weight:600; line-height:20px; color:${t.onMoss}; text-decoration:none; border-radius:999px;">${escapeHtml(block.label)}</a>
          </td>
        </tr></table>
      </td></tr>`;

    case "links":
      return `<tr><td class="px" style="${PX} padding-top:0; padding-bottom:18px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${block.items
            .map(
              (item) => `<tr><td style="padding:0 0 14px 0;">
            <a href="${escapeHtml(item.href)}" style="font-family:${emailFont.sans}; font-size:16px; font-weight:600; color:${t.link}; text-decoration:none;">${escapeHtml(item.label)}</a>${
              item.note
                ? `<span class="t-quiet" style="font-family:${emailFont.sans}; font-size:14px; color:${t.inkQuiet};">&nbsp;&middot;&nbsp;${escapeHtml(item.note)}</span>`
                : ""
            }
          </td></tr>`,
            )
            .join("\n          ")}
        </table>
      </td></tr>`;

    case "callout":
      return `<tr><td class="px" style="${PX} padding-top:8px; padding-bottom:28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-quiet" style="background-color:${t.quiet}; border-radius:14px;"><tr>
          <td style="padding:18px 22px;">
            <p class="t-ink" style="margin:0 0 6px 0; font-family:${emailFont.sans}; font-size:15px; font-weight:600; line-height:22px; color:${t.moss};">${escapeHtml(block.title)}</p>
            <p class="t-soft" style="margin:0; font-family:${emailFont.sans}; font-size:14px; line-height:22px; color:${t.inkSoft};">${inlineHtml(block.text)}</p>
          </td>
        </tr></table>
      </td></tr>`;

    case "divider":
      return `<tr><td class="px" style="${PX} padding-top:6px; padding-bottom:6px;">
        <div class="rule" style="border-top:1px solid ${t.line}; font-size:0; line-height:0;">&nbsp;</div>
      </td></tr>`;
  }
}

function blockText(block: EmailBlock): string {
  switch (block.kind) {
    case "text":
      return wrap(inlineText(block.text));
    case "eyebrow":
      return block.text.toUpperCase();
    case "button":
      // Decorative arrows earn their keep in a rendered button and read as
      // punctuation noise in a text part ("Browse the courses →:").
      return `${block.label.replace(/\s*[→>]+\s*$/, "")}:\n${block.href}`;
    case "links":
      return block.items
        .map((i) => `${i.label}${i.note ? ` - ${i.note}` : ""}\n${i.href}`)
        .join("\n\n");
    case "callout":
      return `${block.title.toUpperCase()}\n\n${wrap(inlineText(block.text))}`;
    case "divider":
      return "-".repeat(74);
  }
}

/* ---- Document ----------------------------------------------------------- */

/**
 * Renders one email to its HTML and plain-text parts. Send both — `resend.ts`
 * spreads the result straight into the Resend payload.
 */
export function renderEmail(doc: EmailDocument): RenderedEmail {
  const masthead = doc.masthead
    ? `<tr><td align="center" bgcolor="${t.moss}" style="background-color:${t.moss}; padding:34px 24px 30px 24px;">
          <img src="${escapeHtml(doc.masthead.imageUrl)}" width="104" height="104" alt="${escapeHtml(doc.masthead.alt)}" style="display:block; width:104px; height:auto; margin:0 auto 16px auto; border:0;" />
          <div style="font-family:${emailFont.serif}; font-size:13px; letter-spacing:1.6px; text-transform:uppercase; color:${t.mossSoft};">${escapeHtml(doc.masthead.caption)}</div>
        </td></tr>`
    : "";

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${escapeHtml(doc.subject)}</title>
<style type="text/css">
  body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; display:block; }
  a { text-decoration:none; }
  @media only screen and (max-width:600px) {
    .wrap { width:100% !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:28px !important; line-height:34px !important; }
    .btn a { display:block !important; }
  }
  /* Honoured by Apple Mail, Outlook for Mac and iOS; ignored by Gmail, so the
     light design is the one that has to hold up everywhere. */
  @media (prefers-color-scheme: dark) {
    .bg-page { background-color:#12160f !important; }
    .bg-card { background-color:#1b211a !important; }
    .bg-quiet { background-color:#222a20 !important; }
    .t-ink { color:#f3ece0 !important; }
    .t-soft { color:#c2bcae !important; }
    .t-quiet { color:#9e988c !important; }
    .rule { border-color:#33402f !important; }
    .card-border { border-color:#33402f !important; }
  }
</style>
</head>
<body class="bg-page" style="margin:0; padding:0; background-color:${t.page};">

<div style="display:none; font-size:1px; color:${t.page}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${escapeHtml(doc.preheader)}${"&#8199;&#847;".repeat(20)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background-color:${t.page};">
  <tr>
    <td align="center" style="padding:32px 12px 48px 12px;">
      <table role="presentation" width="${EMAIL_WIDTH}" cellpadding="0" cellspacing="0" border="0" class="wrap" style="width:${EMAIL_WIDTH}px; max-width:${EMAIL_WIDTH}px;">

        <tr>
          <td align="left" style="padding:0 8px 20px 8px;">
            <a href="${escapeHtml(doc.siteUrl)}" style="text-decoration:none;">
              <img src="${escapeHtml(doc.logoUrl)}" width="132" height="32" alt="CodeWithPurpose" style="display:block; width:132px; height:auto; border:0;" />
            </a>
          </td>
        </tr>

        <tr>
          <td class="bg-card card-border" style="background-color:${t.card}; border:1px solid ${t.line}; border-radius:20px; overflow:hidden;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${masthead}
              <tr><td class="px" style="${PX} padding-top:36px; padding-bottom:16px;">
                <h1 class="h1 t-ink" style="margin:0; font-family:${emailFont.serif}; font-size:32px; line-height:39px; font-weight:400; color:${t.ink};">${escapeHtml(doc.heading)}</h1>
              </td></tr>
              ${doc.blocks.map(blockHtml).join("\n              ")}
              <tr><td style="height:12px; font-size:0; line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="px" style="padding:26px 24px 0 24px;">
            <p class="t-quiet" style="margin:0 0 10px 0; font-family:${emailFont.sans}; font-size:12px; line-height:19px; color:${t.inkQuiet};">${inlineHtml(doc.footerNote)}</p>
            <p class="t-quiet" style="margin:0; font-family:${emailFont.sans}; font-size:12px; line-height:19px; color:${t.inkQuiet};">
              CodeWithPurpose &middot; a student-run nonprofit &middot;
              <a href="mailto:${escapeHtml(doc.contactEmail)}" style="color:${t.inkQuiet}; text-decoration:underline;">${escapeHtml(doc.contactEmail)}</a>${
                doc.unsubscribeUrl
                  ? `<br /><a href="${escapeHtml(doc.unsubscribeUrl)}" style="color:${t.inkQuiet}; text-decoration:underline;">Unsubscribe</a>`
                  : ""
              }
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  // Blocks are already separated by the join; dropping empties keeps a divider
  // or an omitted section from leaving a run of blank lines behind.
  const text =
    [
      doc.heading,
      ...doc.blocks.map(blockText),
      "-".repeat(74),
      wrap(inlineText(doc.footerNote)),
      [
        `CodeWithPurpose - a student-run nonprofit - ${doc.contactEmail}`,
        ...(doc.unsubscribeUrl ? [`Unsubscribe: ${doc.unsubscribeUrl}`] : []),
      ].join("\n"),
    ]
      .filter((part) => part.trim())
      .join("\n\n") + "\n";

  return { subject: doc.subject, html, text };
}
