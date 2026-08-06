# Missing

Decisions and work this codebase is waiting on. Each entry says what the state
is, what it costs to leave alone, and what the options are — so whoever picks it
up isn't re-deriving the analysis.

Nothing here is broken. `npm run check` passes. These are open questions, not
bugs.

---

## 1 & 2. Both decided: the gate is gone

These were one decision, and it went the way the analysis pointed.

**What changed.** `src/proxy.ts` no longer redirects signed-out requests for
`/learn/<track>/<slug>`. Clerk's handler still runs — API routes need the
session — but it gates nothing. A signed-out reader now gets the chapter with
its body blurred and an invitation to make an account
(`components/learn/shell/LessonPreviewWall.tsx`).

**What it bought.** Verified against a production build:

```
/courses/                  200
/learn/ml/                 200
/learn/ml/what-is-ml/      200   (was 307 -> <clerk-domain>/sign-in)
```

- **All 123 chapters are indexable.** The 307 is gone, and — the part that was
  nearly missed — `LessonGate` now starts in the `open` state instead of
  rendering "Checking your progress...". It used to resolve that state in an
  effect, so the prerendered HTML of every chapter contained a placeholder and
  no lesson. Removing the redirect alone would have bought a 200 with nothing
  behind it. The chapter body is now in the static HTML: ~7,500 characters of
  prose per page, up from none.
- **A console error went with it.** Next's `<Link>` prefetch fetched those URLs
  too, got a cross-origin redirect, and failed CORS as a bare "Failed to fetch"
  TypeError with nothing to point at.
- **`createRouteMatcher` is gone**, so item 2 disappeared with it. Clerk drops
  that API in v8; nothing here needs replacing when that lands. Chapters keep
  their prerendering, which the `auth.protect()` migration would have cost.
- **The newsletter can stop dodging.** Its links were deliberately pointed at
  `/courses/` and the track indexes to avoid dropping a new subscriber onto a
  login wall. They can point at chapters now.

**What it gave up, stated plainly.** The gate is now soft. The lesson is in the
HTML, so anyone who opens devtools or disables CSS can read a chapter without an
account. That is the trade, and it is the right one for a nonprofit whose whole
argument is that the material is free: the account buys cross-device sync and
the leaderboard, and the only thing genuinely defended server-side is a
student's own progress, by row-level security and the column grants.

Making a chapter truly unreadable signed-out would mean keeping the content off
the page, which means `auth()` in the layout and all 123 chapters losing
prerendering. Measured before this landed:

```
before:  * /learn/ml/[slug]   (SSG)      prerendered as static HTML
after:   f /learn/ml/[slug]   (Dynamic)  server-rendered on demand
```

**Loose end.** The right-hand table of contents still lists every heading, and
for a signed-out reader those anchors point into the clipped preview, so
clicking one goes nowhere much. Hiding the TOC behind the wall means threading
signed-in state into `LearnShell`, which is a bigger change than it looks.

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

- **One subscriber is in Resend but not in `subscribers`.** `meisgod735@gmail.com`
  signed up on 2026-08-05 and was welcomed (Resend says `delivered`) and added to
  the audience, but no row exists in Supabase — that sign-up predates
  `SUPABASE_SERVICE_ROLE_KEY` being set, so `recordSubscriber` returned
  `unconfigured` and the route carried on by design. The record we own is missing
  one person. Insert it by hand:
  `insert into public.subscribers (email, source) values ('meisgod735@gmail.com', 'koda-popup') on conflict do nothing;`

- **One live profile carries a real full name.** The display-name fallback used
  to be Clerk's `fullName`, so the single account on the board is named in full.
  The fallback is now a derived `Learner-NNNN` handle, but existing rows are not
  rewritten by the code change. Fix the one that exists by hand:
  `update public.profiles set display_name = 'Learner-1234' where id = '…';`
  Check for others first — this is a public page naming a minor.

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
- **The XP schema is applied.** `chapters.sql` and `schema.sql` were run against
  `fbbovplrjmttabycimnv` on 2026-08-06. Verified after: the backfill rewrote
  `updated_at`, `xp` came out at 20 for one progress row, `streak` at 1, and the
  leaderboard still reads with the anon key. Re-running either file is safe.
- **Resend is live and delivering.** Domain `codewithpurpose.org` verified,
  audience id resolves, and two welcome emails show `last_event=delivered`. The
  Clerk↔Supabase handshake is real too — `profiles` holds a row written under a
  Clerk `sub` claim, which only a correctly configured third-party auth provider
  could have produced.
