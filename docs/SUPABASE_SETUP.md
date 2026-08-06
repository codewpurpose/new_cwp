# Turning on accounts + the leaderboard (Clerk + Supabase)

The site works **without** any of this — every student's progress, XP, streak,
badges, and Kodas save locally on their own device. Accounts add two things on
top: **syncing that progress across devices** and a **leaderboard** so students
can compete. Both free tiers are plenty for this.

Two services, one job each:

- **Clerk** = sign-in (Google + email/password, sessions, the user menu).
- **Supabase** = the database behind the leaderboard (`profiles`, `progress`).

They connect through Clerk's **Supabase integration**: Clerk issues each signed-in
student a token, the app sends it to Supabase, and Supabase's row-level security
reads the Clerk user id from that token so a student can only ever write their
own rows.

The code is already wired. Until the keys below exist, the app quietly falls back
to local-first: `/login` shows "Accounts are coming soon", `/leaderboard` shows
"almost here", the header shows a plain **Log in** button, and nothing breaks.

---

## ⚠️ Before you collect a single real account

Most of our students are minors. **Settle COPPA / parental-consent and publish a
privacy policy before enabling accounts in production.** The leaderboard is public
by design — every visitor can read every display name — so the sign-up asks for a
*display name*, not a real full name. Keep it that way.

---

## Part A — Clerk (auth), ~5 min

1. Go to [clerk.com](https://clerk.com) → sign up → **Create application**.
2. Name it "CodeWithPurpose". Under **Sign in options**, turn on **Email** and
   **Google**. Create the application.
3. On the **API keys** screen, copy the two keys — you'll paste them in Part C:
   - **Publishable key** (`pk_...`) → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** (`sk_...`) → `CLERK_SECRET_KEY`
4. Leave the tab open — you need the Clerk **domain** in Part B step 4. Find it
   under **Configure → Domains** (it looks like `your-app.clerk.accounts.dev`
   in development).

> Google sign-in works out of the box on Clerk's dev keys. For production you'll
> add your own Google OAuth credentials in Clerk → **User & Authentication →
> Social Connections → Google**, but you can ship with the dev setup first.

---

## Part B — Supabase (database), ~10 min

1. **Create the project.** Go to [supabase.com](https://supabase.com) → **New
   project**. Pick a name and a strong database password (save it). Choose the
   region closest to most students. Wait for it to finish provisioning.

2. **Create the tables.** Left sidebar → **SQL Editor** → **New query**. Run
   these two files, **in this order**:

   1. [`supabase/chapters.sql`](../supabase/chapters.sql) — the list of real
      chapters. Generated from the lesson graph by `npm run learn:sql`; never
      edit it by hand.
   2. [`supabase/schema.sql`](../supabase/schema.sql) — everything else.

   Order matters: `schema.sql` installs a trigger that reads the `chapters`
   table, so it has to exist first. You should see "Success. No rows returned."
   from both. Both are safe to re-run — if you set this up before the newsletter
   existed, re-running is how you get the `subscribers` table.

   **Re-run `chapters.sql` every time you publish or retire a chapter.** A
   completion for a chapter missing from that table is silently discarded and
   earns no XP. `npm run learn:check` fails the build when the file has drifted
   from the curriculum, but it cannot tell whether you have applied it to the
   database — that part is on you.

3. **Copy the keys.** Left sidebar → **Settings → API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys → `anon` `public`** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API keys → `service_role` `secret`** → `SUPABASE_SERVICE_ROLE_KEY`

   The first two are meant to be public. The `service_role` key is not: it
   **bypasses every row-level policy**, so it goes in `.env.local` and your
   hosting provider's environment variables and nowhere else — never in the
   repo, never with a `NEXT_PUBLIC_` prefix, never imported by a client
   component. It exists for one job, described below.

4. **Connect Clerk as a third-party auth provider.** This is the step that lets
   Supabase trust Clerk's tokens.
   - In Supabase: **Authentication → Sign In / Up → Third-Party Auth** (some
     projects label it just **Third-Party Auth**) → **Add provider → Clerk**.
   - It asks for your **Clerk domain**. Paste the domain from Part A step 4
     (e.g. `your-app.clerk.accounts.dev`), then **Save**.
   - In Clerk: open **Configure → Integrations** (or search "Supabase") and
     **enable the Supabase integration**. This makes Clerk add the
     `role: "authenticated"` claim Supabase requires — no manual JWT template
     needed with the current integration.

   That's the whole handshake. The app already builds its Supabase client with
   the Clerk token attached (`src/lib/supabase/with-clerk.tsx`).

5. **The newsletter list.** Koda's email popup writes to the `subscribers` table
   created in step 2, and that table is the record — Resend's audience is just
   the mailing tool's copy of it.

   Subscribers are anonymous: most never make an account, so there is no Clerk
   token and nothing for row-level security to check. That's why `subscribers`
   has RLS on with **no policies at all** — the browser can't read or write a
   single row — and why `/api/subscribe/` uses the `service_role` key from step
   3, which bypasses RLS, on the server only. A subscriber list is not public
   data, and this keeps it off the wire entirely.

   Because nothing in the app can read the table, read it in the dashboard:
   **SQL Editor** →

   ```sql
   select email, created_at, source from subscribers
   where not unsubscribed
   order by created_at desc;
   ```

   `unsubscribed` is a flag you flip by hand — the opt-out link in the welcome
   email is a `mailto:` to `team@codewithpurpose.org`, so when a request arrives,
   set it there.

   Leave `SUPABASE_SERVICE_ROLE_KEY` blank and sign-ups still work; they just
   fall back to Resend only, and the server logs a warning if the Resend audience
   isn't configured either (in which case nobody is being recorded — don't launch
   like that).

6. **The account welcome email.** Creating an account sends a one-off welcome
   and adds the address to the newsletter list. **There is nothing to configure**
   — no webhook endpoint, no signing secret. It works as soon as the keys above
   are set.

   How it fires: `ClerkDataSync` pings `/api/account-welcome/` the first time a
   signed-in browser loads the site. The endpoint reads the user from their
   Clerk session, so the browser never names an address — you can only ever
   cause an email to yourself. In practice this is the same moment the account
   is created, because Clerk's sign-up flow lands the person back on the site.

   Two guards, both of which matter:

   - **`account_welcomes`** (created in step 2) is a ledger keyed on the Clerk
     user id. The route inserts *before* sending, so a second tab loses on the
     primary key and sends nothing. A failed send deletes the row again so the
     next load can retry.
   - **A seven-day age limit** on the account. Without it, the first sign-in
     after this shipped would treat every pre-existing account as brand new —
     none of them are in the ledger yet — and blast the entire user base at
     once. `MAX_ACCOUNT_AGE_MS` in the route is the knob.

   To check who has been welcomed:

   ```sql
   select user_id, email, sent_at from account_welcomes order by sent_at desc;
   ```

   The trade versus a Clerk webhook: someone who creates an account and never
   returns to the site gets no email. Everyone who actually shows up does.

---

## Part C — Wire the keys into the app, ~2 min

1. Locally: `cp .env.example .env.local`, then paste the values from Parts A
   and B:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

2. On Vercel (production): add those same five as **Environment Variables**
   (Settings → Environment Variables), then redeploy. Add your production URL to
   Clerk under **Configure → Domains** as well.

   Running under Docker instead? `SUPABASE_SERVICE_ROLE_KEY` has no
   `NEXT_PUBLIC_` prefix, so it is read at *runtime* by the route handler rather
   than inlined at `next build`. The `env_file:` entries in `docker-compose.yml`
   already cover it — no `ARG`/`ENV` needs adding to the `Dockerfile`.

3. **Verify.** Run `npm run dev`, open `/login`, create an account (try both
   Google and email), and confirm you land on the site signed in. Then check the
   Supabase **Table editor → profiles** — a row with your Clerk id should appear.
   Finally, `/leaderboard` should list you with "(you)" highlighted.

---

## How the pieces map

| Feature | Handled by |
| --- | --- |
| Sign in / sign up (Google + email) | Clerk — `<SignIn>` / `<SignUp>` on `/login` and `/sign-up` |
| The account menu in the header | Clerk — `<UserButton>` |
| Who you are on the board | Supabase `profiles` — `display_name` + `avatar` only |
| Lesson completions | Supabase `progress` (one row per passed lesson) |
| XP and streak | Derived by trigger from `progress`; the browser cannot write them |
| Which chapters can be claimed | Supabase `chapters`, generated by `npm run learn:sql` |
| Leaderboard ranking | `select … from profiles order by xp desc` |
| Newsletter sign-ups | Supabase `subscribers`, written server-side; Resend sends the welcome |
| Access control | Row-level security on the Clerk `sub` claim (`schema.sql`) |

Key files, if you need them: `src/lib/clerk.ts` (config flag),
`src/lib/supabase/client.ts` (public/anon reads),
`src/lib/supabase/with-clerk.tsx` (token-bearing client + profile sync),
`src/lib/supabase/server.ts` (service-role client, server-only),
`src/lib/supabase/subscribers.ts` + `src/app/api/subscribe/route.ts` (the
newsletter write), `src/components/auth/` (provider + login form), `src/proxy.ts`
(Clerk route gating — Next 16's `proxy` convention, which replaced `middleware`).

## What's intentionally still local-first

The on-device store stays the thing the UI reads: every screen works signed out,
and nothing is collected without an account. Supabase sits behind it as the
durable copy.

`ClerkDataSync` (in `src/lib/supabase/with-clerk.tsx`) reconciles the two once per
sign-in — it pulls the learner's `progress` rows, merges them into the local store
(union of completions), pushes back whatever the server was missing, and then
reads the resulting XP back. After that, each passed quick check writes straight
through. So progress follows a student across devices, and the chapter gate
trusts a durable record rather than one browser's localStorage.

Note the direction of that last step. **XP is read from the server, never sent to
it.** The browser writes a claim about a *chapter*; the total follows from how
many such claims name a chapter that exists. It used to work the other way — the
browser posted the number and the database stored it, which meant a signed-in
student could type their own leaderboard position into the console. Signing in on
a device carrying an inflated local total will now correct it downward, which is
the system working.

Without keys, none of this mounts and the site behaves exactly as it did before.
All of it is isolated to `src/lib/supabase/`, so it never touches lesson code.
