"use client";

import { useState } from "react";
import { LinkedInIcon } from "@/components/icons";

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
  bio?: string;
}

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
  const hasBio = Boolean(member.bio);

  return (
    <div
      onClick={hasBio ? () => setOpen((prev) => !prev) : undefined}
      role={hasBio ? "button" : undefined}
      tabIndex={hasBio ? 0 : undefined}
      onKeyDown={
        hasBio
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpen((prev) => !prev);
              }
            }
          : undefined
      }
      className={`home-card home-lift rounded-xl p-4 text-center ${width} ${
        hasBio ? "cursor-pointer" : ""
      }`}
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
      {hasBio && open && (
        <p className="mt-3 text-left text-sm italic leading-[1.5] text-[var(--home-ink-soft)]">
          {member.bio}
        </p>
      )}
    </div>
  );
}
