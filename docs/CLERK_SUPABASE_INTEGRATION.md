# Clerk + Supabase, without Supabase Auth

A portable write-up of the pattern: **Clerk owns identity, Supabase owns data**, and
Supabase's row-level security reads the Clerk user id straight out of Clerk's JWT.
No Supabase Auth, no user-mirroring webhook, no `auth.users` table.

Everything here is extracted from a production Next.js 16 app. Table and column
names are examples — the mechanics are what transfer.

**Versions this was built against:** `@clerk/nextjs` 7.6.5, `@supabase/supabase-js`
2.112.0, Next.js 16 (App Router), Postgres 15/17 on Supabase.

---

## 1. The one-paragraph version

Clerk issues every signed-in user a JWT. You register Clerk as a **third-party auth
provider** in Supabase, so Supabase will accept and verify those tokens. Your browser
Supabase client attaches the Clerk token to every request. Your RLS policies compare
`auth.jwt() ->> 'sub'` — the Clerk user id — against a `text` column on the row.

That's it. There is no synchronisation step and no copy of the user in Postgres. The
token *is* the link.

### What follows from that

| | |
| --- | --- |
| **User ids are `text`, not `uuid`** | Clerk ids look like `user_2abcXYZ...`. Don't use `uuid` columns or `references auth.users(id)` — that table is empty and always will be. |
| **No `on auth.users` trigger** | The usual Supabase "create a profile row when a user signs up" trigger never fires. You create the profile row from the client on first sign-in, or lazily from a trigger on your own tables. |
| **Supabase Auth is entirely unused** | Don't enable email providers, don't configure redirect URLs, don't call `supabase.auth.signIn`. Clerk does all of it. |
| **Two independent failure modes** | An auth problem is a Clerk problem; a permissions problem is a Postgres problem. Knowing which you're looking at is most of debugging this. |

---

## 2. Dashboard setup

Do these in order. Step 3 is the handshake and the one people miss.

### 2.1 Clerk

1. clerk.com → **Create application**. Enable whichever sign-in methods you want.
2. **API keys** → copy both:
   - Publishable key (`pk_...`) → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Secret key (`sk_...`) → `CLERK_SECRET_KEY`
3. **Configure → Domains** → note your Clerk domain, e.g.
   `your-app.clerk.accounts.dev`. You need it in the next step.

### 2.2 Supabase

1. supabase.com → **New project**. Save the database password.
2. **Settings → API** → copy three values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` / `secret` key → `SUPABASE_SERVICE_ROLE_KEY` *(server only — see §3.3)*

### 2.3 The handshake

**In Supabase:** Authentication → Sign In / Up → **Third-Party Auth** → **Add provider
→ Clerk** → paste your Clerk domain from 2.1.3 → Save.

**In Clerk:** Configure → **Integrations** → enable the **Supabase** integration.

> Both dashboards rename these panels periodically. If the labels have moved, you are
> looking for "third-party auth" / "external JWT" on the Supabase side and "Supabase"
> under integrations on the Clerk side.

**What the Clerk-side toggle actually does — and why skipping it breaks everything:**
it makes Clerk add a `role: "authenticated"` claim to the JWT. Supabase maps that
claim to the Postgres role the request runs as. Without it, every request arrives as
`anon`, so every policy written `to authenticated` silently matches nothing and you
get empty result sets and rejected writes with no useful error.

**If you're on an older setup:** the previous approach was a manually-authored *JWT
template* named `supabase` in Clerk, plus sharing your Supabase JWT secret. That is
deprecated. The native integration above replaces it and needs no template name —
which is why `session.getToken()` below is called with no arguments.

---

## 3. The three clients

You need three, they have different privileges, and mixing them up is the main way to
create a security hole. Keep them in separate files so an import mistake is a build
error rather than a judgement call.

```
src/lib/supabase/
  client.ts       anon key, browser        → public reads only
  with-clerk.tsx  anon key + Clerk token   → everything a signed-in user does
  server.ts       service_role key, server → bypasses ALL policies
```

### 3.1 Public/anon client — for data anyone may read

```ts
// src/lib/supabase/client.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Returns null when unconfigured — callers must handle it. See §7. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
```

Use this for public data, such as a leaderboard or public directory. It carries no
user identity, so RLS sees it as `anon`.

### 3.2 The Clerk-authenticated client — the important one

This is the whole integration, and it is about eight lines.

```tsx
// src/lib/supabase/with-clerk.tsx
"use client";

import { useMemo } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * A Supabase client that authenticates every request with the signed-in Clerk
 * user's token. RLS reads the Clerk `sub` claim, so a user can only ever
 * read/write their own rows. Null when Supabase or the session is missing.
 */
export function useClerkSupabase(): SupabaseClient | null {
  const { session } = useSession();

  return useMemo(() => {
    if (!url || !anonKey || !session) return null;
    return createClient(url, anonKey, {
      accessToken: async () => (await session.getToken()) ?? null,
    });
  }, [session]);
}
```

Three details matter:

- **`accessToken` is a function, not a string.** supabase-js calls it before every
  request, so an expired token refreshes itself. Never capture the token into a
  variable and pass it as a header — you get an hour of working code and then silent
  401s.
- **`getToken()` takes no template argument.** With the native integration Clerk
  already shapes the default session token correctly.
- **Memoise on `session`.** A new client per render leaks connections and re-fetches
  constantly.

### 3.3 The service-role client — server only, bypasses everything

```ts
// src/lib/supabase/server.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // NO NEXT_PUBLIC_ PREFIX

export const isSupabaseServerConfigured = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseServerConfigured) return null;
  if (!client) {
    // No session to persist: this is a server process and the key is the credential.
    client = createClient(url as string, serviceKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
```

**The missing `NEXT_PUBLIC_` prefix is load-bearing.** It means importing this module
from a client component is a build error — the variable resolves to `undefined` in the
browser bundle. That build error is a safety feature. Do not "fix" it by adding the
prefix; move the call to a route handler instead.

Use this **only when RLS cannot express the rule** — typically writes
by anonymous visitors, where there is no `sub` claim to check. Anything a signed-in
user does should go through 3.2.

---

## 4. The schema pattern

Four techniques, in increasing order of how often they get missed.

### 4.1 Text ids and a policy on the `sub` claim

```sql
create table if not exists public.profiles (
  id           text primary key,       -- the Clerk user id, e.g. 'user_2abc...'
  display_name text not null default 'Anonymous',
  avatar       text not null default 'default',
  xp           integer not null default 0 check (xp >= 0),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Public read.
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- Write only your own row.
drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.jwt() ->> 'sub') = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.jwt() ->> 'sub') = id)
  with check ((select auth.jwt() ->> 'sub') = id);
```

Two details:

- **Wrap the claim in `(select ...)`.** `(select auth.jwt() ->> 'sub')` is evaluated
  once per statement; a bare `auth.jwt() ->> 'sub'` is re-evaluated **per row**. On a
  table scan that difference is enormous. This is Supabase's own recommendation and it
  costs four characters.
- **`using` vs `with check`.** `using` filters which rows you may touch; `with check`
  validates the row you're writing. An UPDATE policy needs both, or a user can update
  their own row into somebody else's id.

A child table follows the same shape with one `for all` policy:

```sql
create table if not exists public.progress (
  user_id      text not null,
  item_id      text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.progress enable row level security;

drop policy if exists "own progress" on public.progress;
create policy "own progress"
  on public.progress for all
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id)
  with check ((select auth.jwt() ->> 'sub') = user_id);
```

### 4.2 Column grants — RLS says *whose*, grants say *which columns*

**This is the one that bites, and it is not obvious.**

A policy answers exactly one question: *is this your row?* It says nothing about which
columns you may write. So with the policies above and nothing else, a user can do this
from the browser console:

```js
await supabase.from("profiles").update({ xp: 999999 }).eq("id", myId);
```

Their own row, their own token, every policy satisfied. Any leaderboard built on that
column is decorative.

RLS cannot fix this. **Postgres column privileges** can, and they're the only thing that
can:

```sql
-- Both statements matter, and in this order.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert (id, display_name, avatar) on public.profiles to authenticated;
grant update (display_name, avatar)     on public.profiles to authenticated;
```

**The `revoke` is not optional.** Supabase grants broad privileges on new tables in the
`public` schema by default. Without revoking first, your narrow grants add nothing —
the wide privilege is already there and grants are additive.

After this, `xp` is readable by everyone and writable by nobody through PostgREST.
Attempting it fails the whole statement, loudly, rather than silently ignoring the
column.

### 4.3 Derived values belong to a `security definer` trigger

If users can't write `xp`, something has to. Compute it from rows they *can* write:

```sql
create or replace function public.refresh_profile_stats(target text)
returns void
language plpgsql
security definer                      -- runs as table owner, so grants don't apply
set search_path = public, pg_temp     -- REQUIRED with security definer
as $$
declare
  total_xp integer;
begin
  select count(*) * 20 into total_xp
  from public.progress
  where user_id = target;

  -- Upsert: the trigger can fire before the client has written a profile row.
  insert into public.profiles (id, xp, updated_at)
  values (target, coalesce(total_xp, 0), now())
  on conflict (id) do update
    set xp = excluded.xp, updated_at = now();
end;
$$;

create or replace function public.progress_refresh_stats()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Branch on TG_OP. On DELETE, NEW is never assigned, and reading a field
  -- off it raises before coalesce(new.user_id, old.user_id) ever runs.
  if tg_op = 'DELETE' then
    perform public.refresh_profile_stats(old.user_id);
  else
    perform public.refresh_profile_stats(new.user_id);
  end if;
  return null;
end;
$$;

drop trigger if exists progress_refresh_stats on public.progress;
create trigger progress_refresh_stats
  after insert or delete on public.progress
  for each row execute function public.progress_refresh_stats();

-- Backfill: the trigger only fires on rows written from now on.
select public.refresh_profile_stats(id) from public.profiles;
```

`security definer` runs the function as its owner, so the column grants in 4.2 don't
apply to it. `set search_path` is mandatory alongside it — without it, a caller can
prepend a schema to `search_path` and have your unqualified `progress` resolve to a
table they control.

The result: **the client writes a claim about an item; the number follows from how many
such claims are real.** The browser never names a total.

### 4.4 Server-only tables: RLS on, zero policies

For data the browser must never touch — a mailing list, an audit ledger:

```sql
create table if not exists public.subscribers (
  email        text primary key,
  created_at   timestamptz not null default now(),
  unsubscribed boolean not null default false
);

-- RLS enabled with NO policies = anon and authenticated get nothing at all.
-- The only writer is a route handler holding the service_role key, which
-- bypasses RLS by design.
alter table public.subscribers enable row level security;
```

RLS with no policies denies by default. This is the cleanest way to express
"server-side only" and it needs no code to enforce.

---

## 5. Wiring it into Next.js (App Router)

### 5.1 Middleware — Next 16 calls it `proxy.ts`

```ts
// src/proxy.ts   (Next ≤15: middleware.ts, exporting `middleware`)
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Pass-through when unconfigured, so the app builds with no keys. See §7.
export const proxy = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware()
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

`clerkMiddleware()` attaches the session; it gates nothing by itself. Note that Clerk
deprecates `createRouteMatcher` in v8 — prefer gating in the page or a component over
matcher-based redirects.

> **A redirect here is more expensive than it looks.** Redirecting signed-out users
> away from content routes means crawlers get an off-site 307 and never index those
> pages, and Next's `<Link>` prefetch fails CORS with an unattributable
> `TypeError: Failed to fetch` in the console. A client-side blur/paywall over
> server-rendered content avoids both. Whether that's acceptable depends on whether
> the content is secret — for public marketing content it usually is.

### 5.2 Provider, mounted conditionally

```tsx
// src/components/auth/AppAuthProvider.tsx
"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ClerkDataSync } from "@/lib/supabase/with-clerk";

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/" signInUrl="/login" signUpUrl="/sign-up">
      <ClerkDataSync />
      {children}
    </ClerkProvider>
  );
}
```

```tsx
// src/app/layout.tsx
import { isClerkConfigured } from "@/lib/clerk";
// ...
{isClerkConfigured ? <AppAuthProvider>{body}</AppAuthProvider> : body}
```

```ts
// src/lib/clerk.ts
export const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
```

### 5.3 Server-side user identity in a route handler

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const user = await currentUser();          // full profile incl. email
  const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
  // ...
}
```

**Take identity from the session, never from the request body.** A route that reads a
user id out of JSON is a route where anyone can act as anyone. With the pattern above,
the worst a caller can do by hammering the endpoint is affect themselves.

---

## 6. Local-first sync (optional, but the reason to bother)

If your app works signed-out with `localStorage`, this reconciles the two on sign-in.
It's worth showing because the *direction of each field* is the whole design.

```tsx
export function ClerkDataSync() {
  const { user, isSignedIn } = useUser();
  const supabase = useClerkSupabase();
  const reconciledFor = useRef<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user || !supabase) return;
    if (reconciledFor.current === user.id) return;   // once per user, not per render
    reconciledFor.current = user.id;

    let cancelled = false;
    (async () => {
      // 1. Pull what the server has.
      const { data: rows } = await supabase.from("progress").select("item_id");
      if (cancelled) return;

      // 2. Merge into local (union — never subtract).
      const local = readLocal();
      const merged = new Set([...local.items, ...(rows ?? []).map((r) => r.item_id)]);
      writeLocal({ ...local, items: [...merged] });

      // 3. Push back whatever the server was missing.
      const remote = new Set((rows ?? []).map((r) => r.item_id));
      const toPush = [...merged]
        .filter((id) => !remote.has(id))
        .map((id) => ({ user_id: user.id, item_id: id }));
      if (toPush.length) {
        await supabase.from("progress").upsert(toPush, { onConflict: "user_id,item_id" });
      }

      // 4. Write the columns the user OWNS. Note what is absent: no `xp`.
      //    PostgREST rejects the whole write if you include a column you
      //    lack the grant for — it does not silently drop it.
      await supabase.from("profiles").upsert(
        { id: user.id, display_name: local.name, avatar: local.avatar },
        { onConflict: "id" },
      );

      // 5. Read the derived value back. This is authoritative.
      const { data: fresh } = await supabase
        .from("profiles").select("xp").eq("id", user.id).maybeSingle();
      if (!cancelled && fresh) writeLocal({ ...readLocal(), xp: fresh.xp });
    })().catch((e) => console.error("[sync] reconcile failed:", e));

    return () => { cancelled = true; };
  }, [isSignedIn, user, supabase]);

  return null;
}
```

Two rules make this correct rather than merely working:

1. **Derived values flow down only.** `xp` is read from the server and never sent to
   it. The local store *adopts* the server value rather than `max()`-ing against it —
   otherwise a local total that only ratchets upward is exactly what makes the
   leaderboard meaningless again.
2. **Completions merge as a union.** A device that's been offline has rows the server
   lacks; the server has rows from other devices. Neither side wins; both are kept.

---

## 7. The optional-at-build-time pattern

Every accessor above returns `null` when unconfigured, and every caller handles it.
The payoff is real:

- `npm run build` works with **zero** keys — useful for CI, for previews, for
  contributors who shouldn't have production credentials.
- New developers get a working app on `git clone && npm install && npm run dev`.
- A missing key degrades a feature instead of crashing a page.

The discipline it demands: `getSupabase()` returns `SupabaseClient | null` and
TypeScript makes you handle the null at every call site. Don't `!` it away.

```ts
export const isSupabaseConfigured = Boolean(url && anonKey);
export const isSupabaseServerConfigured = Boolean(url && serviceKey);
export const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
```

---

## 8. Gotchas, ranked by how much time they cost

1. **Forgot the Clerk-side Supabase integration toggle.** No `role: "authenticated"`
   claim, so every request is `anon`. Symptom: empty selects and rejected writes with
   no useful error. *Check first, always.*

2. **Blanket `update` grant.** RLS proves ownership and says nothing about columns. Any
   derived column is client-writable until you `revoke` and re-`grant` per column (§4.2).

3. **Forgot the `revoke`.** Supabase's default grant on `public` tables is already
   there, so narrow grants alone change nothing. Grants are additive.

4. **`security definer` without `set search_path`.** A privilege-escalation path, and
   Supabase's linter will flag it.

5. **plpgsql bodies aren't planned until they run.** A function with a type error
   *creates successfully* and fails the first time it's called — possibly weeks later.
   Actually invoke every function once after creating it.

   The real example: `row_number()` returns `bigint`, and Postgres has `date - integer`
   but no `date - bigint`. `day = max_day - (rn - 1)` created cleanly and blew up in
   production; `(rn - 1)::int` fixed it.

6. **Reading `NEW` in a DELETE trigger.** `coalesce(new.user_id, old.user_id)` raises
   `record "new" is not assigned yet` before `coalesce` sees anything. Branch on
   `TG_OP` (§4.3).

7. **A foreign key that aborts a batch.** If you validate child rows against a
   reference table, an FK *raises* — and one stale id in a 40-row sync upsert loses all
   40. A `before insert` trigger returning `NULL` skips just that row:

   ```sql
   create or replace function public.known_items_only()
   returns trigger language plpgsql security definer
   set search_path = public, pg_temp as $$
   begin
     if not exists (select 1 from public.items i where i.id = new.item_id) then
       return null;  -- skip this row, let the rest of the statement proceed
     end if;
     return new;
   end;
   $$;
   ```

   **Know what you're buying.** This fails *silently* — no error, anywhere, ever. If
   the reference table is stale or was never populated, writes vanish and the feature
   quietly does nothing. Whatever populates that table needs to be part of your deploy
   checklist, not a thing someone remembers.

8. **`service_role` key with a `NEXT_PUBLIC_` prefix.** Ships a full RLS bypass to
   every browser. The build error you get without the prefix is the guardrail.

9. **Capturing the Clerk token as a string.** Works for an hour, then 401s. Pass the
   `accessToken` *function*.

10. **A JWT template named `supabase` in Clerk.** The deprecated path. If you have one
    from an older tutorial, the native integration supersedes it.

11. **`uuid` columns or `references auth.users(id)`.** Clerk ids are `text` and
    `auth.users` is empty. Nothing will ever match.

---

## 9. Verifying it actually works

Don't trust that it's wired up because a page rendered. Check each layer:

```sql
-- 1. Is Clerk registered as a third-party provider?
--    Supabase → Authentication → Third-Party Auth. Should list your Clerk domain.

-- 2. Do the column grants exist?
select grantee, privilege_type, string_agg(column_name, ', ' order by column_name)
from information_schema.column_privileges
where table_name = 'profiles' and grantee in ('anon', 'authenticated')
group by grantee, privilege_type
order by grantee, privilege_type;
-- authenticated should show INSERT/UPDATE on the user-owned columns ONLY.

-- 3. Is RLS on everywhere it should be?
select tablename, rowsecurity from pg_tables
where schemaname = 'public' order by tablename;

-- 4. What policies exist?
select tablename, policyname, cmd, roles from pg_policies
where schemaname = 'public' order by tablename, policyname;
```

Then, in the browser console while signed in — this is the test that matters:

```js
// Should FAIL: no column grant on a derived column.
await supabase.from("profiles").update({ xp: 999999 }).eq("id", myClerkId);

// Should FAIL: RLS, not your row.
await supabase.from("profiles").update({ display_name: "x" }).eq("id", "user_someoneelse");

// Should SUCCEED.
await supabase.from("profiles").update({ display_name: "New Name" }).eq("id", myClerkId);
```

If the first one succeeds, you're missing §4.2 and any derived column is decorative.

---

## 10. Environment variables

```bash
# Clerk — dashboard → API keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Supabase — dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Server only. NO NEXT_PUBLIC_ PREFIX — that absence is the guardrail.
# Bypasses every RLS policy. Only for writes with no user to attribute them to.
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

No webhook signing secret is needed if you trigger server work from the authenticated
client rather than from Clerk webhooks (§11).

Deploying: add all five to your host's environment variables and redeploy. Add your
production URL to Clerk under **Configure → Domains**.

---

## 11. Bonus: exactly-once server work without webhooks

If you need to do something once per new user (welcome email, provisioning), the
obvious answer is a Clerk `user.created` webhook. That means an endpoint, a signing
secret, and handling **at-least-once delivery** — Clerk retries any non-2xx.

The alternative: have the authenticated client ping your own route on first load, and
make the *database* the arbiter.

```sql
create table if not exists public.welcomes (
  user_id text primary key,
  sent_at timestamptz not null default now()
);
alter table public.welcomes enable row level security;  -- no policies: server-only
```

```ts
const UNIQUE_VIOLATION = "23505";

// Claim BEFORE doing the work. A second concurrent call loses on the primary key.
const { error } = await admin.from("welcomes").insert({ user_id: userId });
if (error?.code === UNIQUE_VIOLATION) return ok({ skipped: "already-sent" });
if (error) return fail();

const sent = await sendTheEmail(...);
// Hand the claim back on failure, or a transient outage permanently consumes
// this user's only chance at the email.
if (!sent.ok) await admin.from("welcomes").delete().eq("user_id", userId);
```

Postgres does the locking; the route just reads the outcome. Two tabs opening
simultaneously across two server instances still produce exactly one email.

**Two things this needs:**

- **An age check on the account.** Otherwise the first deploy treats *every* existing
  user as new — none of them are in the ledger yet — and blasts your whole user base.
  `if (Date.now() - user.createdAt > SEVEN_DAYS) return ok({ skipped: "not-new" })`.
- **Acceptance of the trade-off.** Someone who signs up and never returns gets nothing.
  For a welcome email that's fine. For billing or provisioning, use the webhook.

---

## 12. File map

```
src/
  proxy.ts                        clerkMiddleware, pass-through when unconfigured
  lib/
    clerk.ts                      isClerkConfigured flag
    supabase/
      client.ts                   anon browser client       → public reads
      with-clerk.tsx              Clerk-token client + sync  → user reads/writes
      server.ts                   service_role client        → server only
  components/auth/
    AppAuthProvider.tsx           <ClerkProvider> + sync, mounted conditionally
  app/
    layout.tsx                    conditional provider mount
    api/<route>/route.ts          auth() / currentUser() for server-side identity
supabase/
  schema.sql                      tables, RLS, column grants, triggers
```

## 13. The two sentences to remember

**RLS answers "is this your row?" and nothing else — column grants are the only thing
that can say "yours, but not that field."**

**Derived values flow down from the server; the client writes claims, never totals.**
