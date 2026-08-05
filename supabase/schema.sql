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
