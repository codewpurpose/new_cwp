import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Branded link-preview cards for the pages that set their own `openGraph`.
 *
 * Next replaces the whole `openGraph` object when a page defines one, so
 * those pages silently dropped the root layout's /seo/og-image.png and shared
 * as a bare link. An `opengraph-image.tsx` beside the page wins over metadata
 * and needs no `images` entry kept in sync by hand; each one calls this with
 * its own eyebrow and title.
 *
 * Colours are the DESIGN.md palette (sand page, ink, moss, leaf green). The
 * default system face is used rather than Fraunces: ImageResponse needs the
 * font file itself, and fetching it at build time would make builds depend
 * on the network.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

async function kodaDataUri(): Promise<string> {
  const file = await readFile(path.join(process.cwd(), "public/koala/koala-wave.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export async function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const koda = await kodaDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fcf4e8",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#15120c" }}>
            {/* Inline paths from public/icon.svg — the default face has no ♡. */}
            <svg width="44" height="44" viewBox="0 0 64 64">
              <rect width="64" height="64" rx="14" fill="#1e3c2c" />
              <g fill="none" stroke="#dbefdb" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 21 9 32l9 11" strokeWidth="4" />
                <path d="M46 21l9 11-9 11" strokeWidth="4" />
                <path
                  d="M32 43s-8.5-5.3-8.5-11.4c0-3.3 2.4-5.4 5-5.4 1.4 0 2.7.7 3.5 1.9.8-1.2 2.1-1.9 3.5-1.9 2.6 0 5 2.1 5 5.4C40.5 37.7 32 43 32 43Z"
                  strokeWidth="3"
                />
              </g>
            </svg>
            <span style={{ fontWeight: 600 }}>CodeWithPurpose</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <span
              style={{
                fontSize: 26,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: "#3e7f5c",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                marginTop: 18,
                fontSize: title.length > 48 ? 58 : 70,
                lineHeight: 1.05,
                letterSpacing: -1.5,
                color: "#15120c",
                fontWeight: 700,
              }}
            >
              {title}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#1e3c2c",
              color: "#dbefdb",
              borderRadius: 999,
              padding: "12px 26px",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Free coding education · 150+ countries
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img
          src={koda}
          alt=""
          width={300}
          height={321}
          style={{ position: "absolute", right: 72, bottom: 56 }}
        />
      </div>
    ),
    OG_SIZE,
  );
}
