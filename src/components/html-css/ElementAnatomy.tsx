"use client";

import { useState } from "react";

/**
 * One line of HTML, taken apart.
 *
 * Built because "tag" is used for four different things — the element, the
 * opening tag, the whole construct, and sometimes the attribute — and a reader
 * who cannot name the parts cannot read an error message about them.
 *
 * The line is split into labelled spans rather than parsed, so the mapping from
 * character to concept is authored and exact. Parsing it would be a worse
 * version of the same thing with a chance of being wrong.
 */

type PartId = "open" | "name" | "attr" | "eq" | "value" | "content" | "close";

interface Piece {
  id: PartId;
  text: string;
}

/** `<a href="/about">About us</a>`, in order. */
const PIECES: readonly Piece[] = [
  { id: "open", text: "<" },
  { id: "name", text: "a" },
  { id: "open", text: " " },
  { id: "attr", text: "href" },
  { id: "eq", text: "=" },
  { id: "value", text: '"/about"' },
  { id: "open", text: ">" },
  { id: "content", text: "About us" },
  { id: "close", text: "</a>" },
];

const PARTS: Record<PartId, { label: string; detail: string }> = {
  open: {
    label: "Opening tag",
    detail:
      "An angle bracket, the element name, any attributes, and a closing bracket. This is the opening tag — not the element. The element is the opening tag, the content, and the closing tag together.",
  },
  name: {
    label: "Element name",
    detail:
      "Which element this is. `a` is an anchor — a link. The name decides what the browser does with it and what it means, and there are about 110 of them, of which you will use perhaps 25.",
  },
  attr: {
    label: "Attribute name",
    detail:
      "Extra information about this element, written inside the opening tag and nowhere else. `href` is the one attribute an anchor needs; without it the link is not a link.",
  },
  eq: {
    label: "The equals sign",
    detail:
      "Joins an attribute to its value. Some attributes are boolean and have no value at all — `<input required>` and `<input required=\"required\">` mean exactly the same thing.",
  },
  value: {
    label: "Attribute value",
    detail:
      "Always in quotes. HTML tolerates unquoted values in simple cases and it is not worth the exception — a value containing a space silently breaks into two attributes.",
  },
  content: {
    label: "Content",
    detail:
      "What sits between the tags. For an anchor this is the clickable text, and it is read out of context by screen readers, which is why \"click here\" is unhelpful and \"About us\" is not.",
  },
  close: {
    label: "Closing tag",
    detail:
      "The same name with a slash. It says where the element stops. Void elements — img, br, input, hr, meta, link — have no content, so they have nothing to close around and take no closing tag at all.",
  },
};

const TONE: Record<PartId, string> = {
  open: "text-learn-code-dim",
  name: "text-learn-code-accent",
  attr: "text-learn-code-warn",
  eq: "text-learn-code-dim",
  value: "text-learn-code-ok",
  content: "text-learn-code-fg",
  close: "text-learn-code-accent",
};

export function ElementAnatomy() {
  const [selected, setSelected] = useState<PartId>("name");
  const part = PARTS[selected];

  return (
    <figure className="learn-card mt-8 overflow-hidden rounded-learn-xl p-5 md:p-7">
      <figcaption className="text-[13px] uppercase tracking-[0.08em] text-learn-muted">
        One element, seven named parts — select any of them
      </figcaption>

      <div className="mt-4 overflow-x-auto rounded-[6px] bg-learn-code-bg px-4 py-5">
        <p className="whitespace-nowrap font-[family-name:var(--learn-font-mono)] text-[15px] md:text-[17px]">
          {PIECES.map((piece, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(piece.id)}
              aria-pressed={selected === piece.id}
              className={`learn-focusable rounded-[3px] transition-colors motion-reduce:transition-none ${TONE[piece.id]} ${
                selected === piece.id
                  ? "bg-learn-code-fg/20 underline decoration-2 underline-offset-4"
                  : "hover:bg-learn-code-fg/10"
              }`}
            >
              {piece.text === " " ? " " : piece.text}
            </button>
          ))}
        </p>
      </div>

      <div aria-live="polite" className="mt-4 rounded-learn-md border-[0.5px] border-learn-line bg-learn-surface p-4">
        <p className="text-[14px] font-semibold text-learn-strong">{part.label}</p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-learn-muted">{part.detail}</p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.6] text-learn-muted">
        The word people reach for is &ldquo;tag&rdquo;, and it is used for at least three of these.
        Being able to say <span className="font-[family-name:var(--learn-font-mono)]">attribute
        value</span> when you mean the attribute value is what makes an error message like
        &ldquo;unexpected token in attribute name&rdquo; readable rather than alarming.
      </p>
    </figure>
  );
}
