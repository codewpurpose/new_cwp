# Missing

Decisions and work this codebase is waiting on. Each entry says what the state
is, what it costs to leave alone, and what the options are — so whoever picks it
up isn't re-deriving the analysis.

Nothing here is broken. `npm run check` passes. These are open questions, not
bugs.

---

## 1. Lessons are gated, and it is costing us search traffic

**State.** `src/proxy.ts` redirects any signed-out request for
`/learn/<track>/<slug>` to sign-in. Verified against a running server:

```
/courses/                  200
/learn/ml/                 200
/learn/ml/what-is-ml/      307 → <clerk-domain>/sign-in?redirect_url=…
```

Note the redirect leaves the domain entirely — it points at Clerk's hosted
sign-in, not a page on this site.

**Why it matters.** `sitemap.xml` advertises ~123 chapter URLs and `robots.txt`
says `Allow: /`. Every one of those URLs answers a crawler with an off-site 307.
We are asking Google to crawl our largest body of original work and bouncing it
at each page. None of it can be indexed.

It also contradicts the newsletter. The welcome email says *"123 chapters, free
forever. No paywall, no trial"* — and then a chapter asks for an account. When
that email was written, every link in it was deliberately pointed at `/courses/`
and the track indexes to route around the wall. That workaround is the evidence.

**What actually needs an account.** Less than it looks:

| Feature | Needs an account? |
| --- | --- |
| Reading a chapter | no |
| Quiz + chapter-unlock gate | no — reads `localStorage` |
| XP, streak, badges | no — local-first by design |
| Cross-device sync | yes |
| Leaderboard | yes |

The gate is not required for the lessons to work. It is required only to make
progress *server-verified*.

**Options.**

1. Keep it. Defensible if verified progress and leaderboard integrity outrank
   reach.
2. Ungate reading. Chapters open to everyone and to crawlers; an account is
   still needed for sync and the leaderboard. Biggest SEO and funnel win.
3. Ungate a taster — first N chapters of each track open, the rest gated. Keeps
   a signup incentive, indexes partially, costs more logic to maintain.

**Whoever decides this owns the mission trade-off, not just the code.**

---

## 2. Clerk's `createRouteMatcher` is deprecated

**State.** `src/proxy.ts` uses it, and Clerk logs a deprecation warning on every
boot. It is slated for removal in Clerk 8. Current code works; there is no
deadline.

**Clerk's argument.** Path matching is a guess about routing rather than routing
itself. A matcher and Next's real route resolution can disagree — route groups,
rewrites, catch-alls, encoded characters — and where they disagree a protected
page becomes reachable. Their fix is to check auth in the page or layout that
touches the data.

**Does it apply here?** Largely not. The one matcher is
`/^\/learn\/[^/]+\/[^/]+/`, and it lines up with the routes: chapters match,
track indexes and `/courses/` don't. The `(chapters)` route group never appears
in a URL and `trailingSlash: true` doesn't break it. The concern is real in
general and mostly theoretical for this codebase.

**What migrating costs.** Measured, not guessed — `auth.protect()` added to one
track's `(chapters)/layout.tsx`, then rebuilt:

```
before:  ● /learn/ml/[slug]   (SSG)      prerendered as static HTML
after:   ƒ /learn/ml/[slug]   (Dynamic)  server-rendered on demand
```

`auth()` reads cookies, which opts the whole subtree into dynamic rendering.
Across five tracks that is **all 123 chapter pages losing prerendering**.

**Options.**

| | Effort | Keeps SSG | Addresses Clerk's concern |
| --- | --- | --- | --- |
| A. Swap the matcher for a plain regex in `proxy.ts` | ~5 lines | yes | no |
| B. Move checks into the five `(chapters)/layout.tsx` | moderate | no — 123 pages go dynamic | yes |
| C. Drop the gate | trivial | yes | n/a — nothing left to protect |

**These two entries are one decision.** Option C here and option 2 above are the
same change: remove the gate and the deprecated API disappears, the pages stay
static, and the lessons become indexable, all at once.

---

## 3. Smaller, genuinely optional

- **`hello@codewithpurpose.org` bounces on inbound.** It is the newsletter's From
  address and sends fine — DKIM authorises that, and replies are routed to
  `team@`, which is a real mailbox. But nothing receives mail *at* `hello@`, so
  anyone who writes to it directly instead of hitting reply gets a bounce. Fix by
  adding it as a free alias on the `team@` user in Google Workspace, or switch
  `EMAIL_FROM` to `team@`.

- **No SPF record on the root domain.** `codewithpurpose.org` publishes no
  `v=spf1` record, so both Google Workspace and Resend mail authenticate on DKIM
  alone. It passes, and DMARC is `p=none`, so nothing is being rejected — but it
  is thinner than ideal. If one is ever added it must cover **both** senders in a
  **single** record (`v=spf1 include:_spf.google.com include:amazonses.com ~all`).
  Two `v=spf1` records make both invalid and break all mail on the domain,
  including `team@`.

- **The newsletter unsubscribe is a `mailto:`.** It satisfies the requirement and
  someone has to action it by hand. Resend's audience tracks unsubscribe state
  automatically and suppresses those addresses; wiring the footer link to that is
  the upgrade. Worth doing before the list is large, and more so given most
  subscribers will be minors.

- **20 raw `<img>` tags** across the marketing pages. Most already carry
  `loading="lazy"` and `decoding="async"`, and the two that don't are correct as
  they are (a hero that must not be lazy, a modal image already cached). The
  remaining win is `next/image`'s AVIF/WebP conversion and responsive `srcset`,
  which changes layout behaviour at 20 sites and wants visual checking.

- **COPPA.** `supabase/schema.sql` has flagged this since the student platform
  landed: most students here are minors, and both accounts and the newsletter
  collect personal data. Settle parental consent and publish a privacy policy
  before either is promoted widely.

---

## Not missing

Recorded so nobody re-opens them:

- **CI was red** on `main` at `6115609` because `package-lock.json` was out of
  sync with `package.json` and `npm ci` refused to install. Fixed in `44e6b7e`;
  every later step had simply never run.
- **The Resend audience** is optional. `subscribers` in Supabase is the record;
  the audience is the mailing tool's copy, needed only to send a campaign from
  Resend's own UI. `npm run resend:audience` finds or creates one.
- **Send from the root domain**, `codewithpurpose.org`. Not
  `send.codewithpurpose.org` — that subdomain only holds the bounce return-path
  records Resend adds when you register the root, and using it as a From address
  fails verification.
