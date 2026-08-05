-- CodeWithPurpose — student profiles, progress, and leaderboard.
--
-- Auth is handled by CLERK, not Supabase Auth. Supabase is just the database.
-- Every request from the app carries the signed-in user's Clerk token, and the
-- policies below read the Clerk user id from that token's `sub` claim. That is
-- why ids are `text` (Clerk ids look like `user_2ab...`), not uuid, and there is
-- no trigger on auth.users — Clerk users never touch Supabase's auth schema.
--
-- Run once: Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run (IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS).
--
-- IMPORTANT before launch: these tables hold data about students, many of them
-- minors. Settle COPPA/consent and a privacy policy BEFORE collecting any real
-- accounts. The leaderboard is public by design — display names are readable by
-- everyone, so the sign-up form asks for a display name, not a real full name.

-- ---------------------------------------------------------------------------
-- profiles: one per Clerk user. `id` is the Clerk user id.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           text primary key,
  display_name text not null default 'Learner',
  avatar       text not null default 'wave',
  xp           integer not null default 0 check (xp >= 0),
  streak       integer not null default 0 check (streak >= 0),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- The leaderboard is public: anyone can read profiles (display name, avatar, xp).
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- A learner may only create/update their own row (Clerk `sub` must match the id).
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

-- ---------------------------------------------------------------------------
-- progress: one row per completed lesson (verified by passing its quick check).
-- ---------------------------------------------------------------------------
create table if not exists public.progress (
  user_id      text not null,
  course_id    text not null,
  chapter_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, chapter_slug)
);

alter table public.progress enable row level security;

-- A learner only ever sees and writes their own progress rows.
drop policy if exists "own progress" on public.progress;
create policy "own progress"
  on public.progress for all
  to authenticated
  using ((select auth.jwt() ->> 'sub') = user_id)
  with check ((select auth.jwt() ->> 'sub') = user_id);

-- ---------------------------------------------------------------------------
-- subscribers: newsletter sign-ups from Koda's popup. NOT tied to a Clerk user
-- — most subscribers never make an account, which is why there is no user_id.
--
-- `email` is the primary key, and /api/subscribe/ always trims and lowercases
-- before writing, so a repeat sign-up collides with the existing row and is
-- ignored rather than duplicated.
--
-- `source` records which surface the address came from — there is more than one
-- (Koda's popup and the footer form), and 'website' is the honest answer when
-- the request didn't say. See ALLOWED_SOURCES in the subscribe route.
--
-- `unsubscribed` exists because the opt-out is a mailto: to a human — someone
-- has to be able to flip a flag when a request lands in the inbox.
-- ---------------------------------------------------------------------------
create table if not exists public.subscribers (
  email        text primary key,
  created_at   timestamptz not null default now(),
  source       text not null default 'website',
  unsubscribed boolean not null default false
);

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

-- RLS on, and DELIBERATELY NO POLICIES. Unlike profiles and progress, nothing
-- in the browser may read or write this table: with RLS enabled and no policy
-- granting anything, anon and authenticated get nothing at all. The only writer
-- is the /api/subscribe/ route holding the service_role key, which bypasses
-- RLS by design. A subscriber list is not public data — do not add a policy
-- here without a very good reason.
alter table public.subscribers enable row level security;

-- ---------------------------------------------------------------------------
-- account_welcomes: which Clerk users have already been sent the account
-- welcome email. A ledger, not a feature.
--
-- Clerk delivers webhooks AT LEAST once and retries any non-2xx response, so
-- `user.created` can arrive more than once for the same person. `user_id` is
-- the primary key and the route inserts before sending, so the second delivery
-- loses the race on the key and sends nothing. That is the whole mechanism —
-- Postgres does the locking, the route just reads the outcome.
--
-- Keyed on the Clerk user id rather than the address on purpose: someone may
-- already be in `subscribers` from the newsletter, and that must not suppress
-- the email they get for making an account.
-- ---------------------------------------------------------------------------
create table if not exists public.account_welcomes (
  user_id text primary key,
  email   text not null,
  sent_at timestamptz not null default now()
);

-- Same reasoning as subscribers: server-side only, no browser access at all.
alter table public.account_welcomes enable row level security;
