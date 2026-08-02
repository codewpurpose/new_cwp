"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

export interface TeamMember {
  name: string;
  role: string;
  /** Optional: members without a photo yet fall back to their initials. */
  photo?: string;
  /**
   * Optional crop for photos that are not head-and-shoulders to begin with.
   * A full-body shot cropped to a circle leaves the face too small to read, so
   * these scale and offset inside the avatar rather than asking everyone to
   * re-shoot.
   */
  photoClass?: string;
  linkedin?: string;
  /** Full profile URL, e.g. `https://www.instagram.com/<handle>/`. Rendered as
   *  an icon beside LinkedIn in the dialog. Leave off until the member says yes. */
  instagram?: string;
  /** Left off until the member sends one — the dialog shows a placeholder
   *  rather than hiding the card, so every profile is still clickable. */
  bio?: string;
}

const socialLinkClass =
  "flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-[var(--home-hairline)] text-[var(--home-ink-soft)] transition-colors hover:border-[var(--home-fern)] hover:bg-[#f3faf3] hover:text-[var(--home-moss)]";

/** Shown in place of a bio nobody has written yet. */
const BIO_PLACEHOLDER =
  "This person hasn't added their information yet — check back later.";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Avatar sizing differs per row: the founders sit 3-up even on a phone, where
 *  a w-20 circle would overflow its card. `width` makes the card itself the
 *  flex item, so a short final row centres instead of hanging off the left. */
export function TeamCard({
  member,
  avatar,
  width,
}: {
  member: TeamMember;
  avatar: string;
  width: string;
}) {
  const [open, setOpen] = useState(false);

  // The card lifts on hover with a transform, which would become the
  // containing block for a `fixed` child — so the dialog goes to the body.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div
      onClick={() => setOpen(true)}
      role="button"
      tabIndex={0}
      aria-label={`About ${member.name}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen(true);
        }
      }}
      className={`home-card home-lift cursor-pointer rounded-xl p-4 text-center ${width}`}
    >
      {member.photo ? (
        // The circle is the clipping frame, so a per-member `photoClass` can
        // scale and offset the photo inside it without spilling past the edge.
        <div className={`mx-auto aspect-square overflow-hidden rounded-full ${avatar}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${member.photoClass ?? ""}`}
          />
        </div>
      ) : (
        <span
          aria-hidden="true"
          className={`mx-auto flex aspect-square items-center justify-center rounded-full bg-[var(--home-pistachio)] font-semibold text-[var(--home-moss)] ${avatar}`}
        >
          {initials(member.name)}
        </span>
      )}
      <p className="mt-3 font-medium">{member.name}</p>
      <p className="text-sm text-[var(--home-ink-quiet)]">{member.role}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          title={`${member.name} on LinkedIn`}
          onClick={(event) => event.stopPropagation()}
          className="mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-[var(--home-hairline)] text-[var(--home-ink-soft)] transition-colors hover:border-[var(--home-fern)] hover:bg-[#f3faf3] hover:text-[var(--home-moss)]"
        >
          <LinkedInIcon className="h-[15px] w-[15px]" />
        </a>
      )}
      {open && <TeamMemberDialog member={member} onClose={() => setOpen(false)} />}
    </div>
  );
}

function TeamMemberDialog({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
      // React events bubble through the portal to the card that opened it, so
      // without this the close click would land on the card and reopen it.
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="home-card relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl p-6 text-center shadow-[var(--home-shadow-lg)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[var(--home-ink-quiet)] transition-colors hover:bg-[var(--home-grey-450)] hover:text-[var(--home-ink)]"
        >
          <X className="h-4 w-4" />
        </button>

        {member.photo ? (
          <div className="mx-auto aspect-square w-24 overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.photo}
              alt={member.name}
              decoding="async"
              className={`h-full w-full object-cover ${member.photoClass ?? ""}`}
            />
          </div>
        ) : (
          <span
            aria-hidden="true"
            className="mx-auto flex aspect-square w-24 items-center justify-center rounded-full bg-[var(--home-pistachio)] text-xl font-semibold text-[var(--home-moss)]"
          >
            {initials(member.name)}
          </span>
        )}

        <p className="mt-4 text-lg font-medium">{member.name}</p>
        <p className="text-sm text-[var(--home-ink-quiet)]">{member.role}</p>

        {(member.linkedin || member.instagram) && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className={socialLinkClass}
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on Instagram`}
                className={socialLinkClass}
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        <p
          className={`mt-5 text-left text-sm italic leading-[1.6] ${
            member.bio
              ? "text-[var(--home-ink-soft)]"
              : "text-center text-[var(--home-ink-quiet)]"
          }`}
        >
          {member.bio ?? BIO_PLACEHOLDER}
        </p>
      </div>
    </div>,
    document.body,
  );
}
