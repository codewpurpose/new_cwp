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

2. **Create the tables.** Left sidebar → **SQL Editor** → **New query**. Paste the
   *entire* contents of [`supabase/schema.sql`](../supabase/schema.sql) and click
   **Run**. This creates `profiles` and `progress` and turns on row-level
   security. You should see "Success. No rows returned." (Safe to re-run.)

3. **Copy the two keys.** Left sidebar → **Settings → API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys → `anon` `public`** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Do **not** copy the `service_role` key — it bypasses row-level security and
   must never touch the browser or this repo.

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

---

## Part C — Wire the keys into the app, ~2 min

1. Locally: `cp .env.example .env.local`, then paste the four values from Parts A
   and B:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. On Vercel (production): add those same four as **Environment Variables**
   (Settings → Environment Variables), then redeploy. Add your production URL to
   Clerk under **Configure → Domains** as well.

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
| Who you are on the board | Supabase `profiles` (display_name, avatar, xp, streak) |
| Verified lesson completions | Supabase `progress` (one row per passed lesson) |
| Leaderboard ranking | `select … from profiles order by xp desc` |
| Access control | Row-level security on the Clerk `sub` claim (`schema.sql`) |

Key files, if you need them: `src/lib/clerk.ts` (config flag),
`src/lib/supabase/client.ts` (public/anon reads),
`src/lib/supabase/with-clerk.tsx` (token-bearing client + profile sync),
`src/components/auth/` (provider + login form), `src/middleware.ts` (Clerk
middleware, gated).

## What's intentionally still local-first

Day-to-day progress is still the on-device store; signing in mirrors the student's
profile (name, avatar, XP) up so the leaderboard has data. Full two-way sync —
pushing every `progress` row to Supabase and pulling it back on a new device — is
the natural next step once the project exists and we can test against real auth.
It's isolated to `src/lib/supabase/`, so it won't touch lesson code.
