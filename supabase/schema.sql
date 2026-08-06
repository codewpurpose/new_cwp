-- CodeWithPurpose — student profiles, progress, and leaderboard.
--
-- Auth is handled by CLERK, not Supabase Auth. Supabase is just the database.
-- Every request from the app carries the signed-in user's Clerk token, and the
-- policies below read the Clerk user id from that token's `sub` claim. That is
-- why ids are `text` (Clerk ids look like `user_2ab...`), not uuid, and there is
-- no trigger on auth.users — Clerk users never touch Supabase's auth schema.
--
-- Run: Supabase dashboard -> SQL Editor -> New query -> paste -> Run. Run
-- supabase/chapters.sql FIRST — the trigger below reads the table it creates.
-- Safe to re-run (IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS).
--
-- Wrapped in a transaction, and not as a formality. This file revokes the
-- browser's write privileges on `profiles` before re-granting the two columns
-- it is still allowed. A failure between those two statements would leave
-- signed-in students unable to write their own profile at all, with no error
-- pointing at why. DDL is transactional in Postgres, so begin/commit makes the
-- whole file all-or-nothing and that window impossible.
--
-- IMPORTANT before launch: these tables hold data about students, many of them
-- minors. Settle COPPA/consent and a privacy policy BEFORE collecting any real
-- accounts. The leaderboard is public by design — display names are readable by
-- everyone, so the sign-up form asks for a display name, not a real full name.

begin;

-- ---------------------------------------------------------------------------
-- profiles: one per Clerk user. `id` is the Clerk user id.
--
-- Two kinds of column here, and the difference is the whole design:
--
--   display_name, avatar  — the student's to set. Constrained, not trusted.
--   xp, streak, updated_at — DERIVED. Recomputed from `progress` by trigger,
--                            and not writable from the browser at all.
--
-- One thing to know about `streak`: this column counts consecutive days a
-- student *finished a chapter*, because that is the only thing the server has
-- evidence of. The streak on the dashboard is a different, kinder number —
-- consecutive days they opened the site at all — and it stays in localStorage,
-- where it is the student's own business. Nothing ranks on either, so the two
-- are allowed to disagree; if a streak ever reaches the leaderboard, this is
-- the one that goes there.
--
-- XP used to be whichever number the browser sent. Row-level security proved
-- the row belonged to the student writing it and said nothing about the value,
-- so two lines in a console put anyone at the top of the leaderboard. The
-- column grants further down are what actually fix that; the trigger below is
-- what keeps the number correct once the browser can no longer supply it.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           text primary key,
  display_name text not null default 'Learner',
  avatar       text not null default 'wave',
  xp           integer not null default 0 check (xp >= 0),
  streak       integer not null default 0 check (streak >= 0),
  updated_at   timestamptz not null default now()
);

-- The display name is world-readable (see the select policy below) and most of
-- the people it names are minors, so its shape is a database constraint rather
-- than an input attribute.
--
-- Deliberately NOT an allowlist of permitted characters. That was the first
-- attempt, and it fails the students it is supposed to protect: `[[:alnum:]]`
-- does not match a combining mark, so any name written with separate base
-- letters and diacritics — common across Indic and South-East Asian scripts —
-- is rejected as malformed. A rule that only lets people be named in Latin
-- script is not a safety feature.
--
-- So: a length, a trim, at least one visible character, no control codes, and
-- nothing that reads as a link or an address. The zero-width and bidirectional
-- characters are stripped in src/lib/display-name.ts rather than banned here;
-- writing them as a literal range would mean a pattern nobody can review and a
-- schema file `grep` reports as binary, and requiring one alphanumeric already
-- stops a name from being invisible outright.
--
-- The word list that goes with this lives beside that sanitiser. It belongs at
-- the keyboard, where it can say why, not in a CHECK that can only say no.
alter table public.profiles drop constraint if exists profiles_display_name_shape;
alter table public.profiles add constraint profiles_display_name_shape check (
  length(display_name) between 1 and 24
  and display_name = btrim(display_name)
  and display_name ~ '[[:alnum:]]'
  and display_name !~ '[[:cntrl:]]'
  and display_name !~* '(https?://|www\.|@)'
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
-- Column privileges: WHICH columns, where the policies above only say WHOSE.
--
-- This is the part that makes the leaderboard mean anything. A policy answers
-- "is this your row?" and nothing else, so with a blanket UPDATE grant a
-- student passes every check above while setting `xp` to whatever they like —
-- their own row, their own token, their own number. Postgres column grants are
-- the only mechanism here that can say "yours, but not that field".
--
-- So: read everything, write your name and your Koda, and nothing else. `xp`,
-- `streak`, and `updated_at` are left to the trigger below, which runs as the
-- table owner and is not subject to these grants.
--
-- Both statements matter. The revoke undoes the blanket grant Supabase applies
-- to new tables in `public`; without it the grants that follow add nothing,
-- because the broad privilege is already there.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert (id, display_name, avatar) on public.profiles to authenticated;
grant update (display_name, avatar) on public.profiles to authenticated;

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
-- Derived stats. Run supabase/chapters.sql before this section — the first
-- trigger reads the `chapters` table it creates.
--
-- The chain is: a student inserts a progress row -> it is dropped unless it
-- names a real chapter -> their xp and streak are recomputed from what
-- survived. Nothing in the browser writes a number; it writes a claim about a
-- chapter, and the numbers follow from how many such claims are real.
--
-- What this does and does not buy. A student can still tick a chapter they
-- skimmed — that is indistinguishable from reading it quickly, and defending
-- against it would mean grading quizzes server-side, which is a much larger
-- change for a much smaller problem. What they can no longer do is name a
-- ceiling. The most anyone can hold is every published chapter, once each.
-- ---------------------------------------------------------------------------

-- Drop a progress row that names a chapter which does not exist.
--
-- Returning NULL from a BEFORE INSERT trigger skips that row and lets the rest
-- of the statement proceed. A foreign key would have been the obvious tool, but
-- it raises, and the sync pushes a student's whole backlog in one upsert: one
-- stale slug from a chapter that has since been renamed would abort the batch
-- and lose the other forty completions with it. Silently skipping the unknown
-- row is the behaviour that keeps a good sync working.
create or replace function public.progress_known_chapters_only()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not exists (
    select 1 from public.chapters c
    where c.course_id = new.course_id
      and c.chapter_slug = new.chapter_slug
  ) then
    return null;
  end if;
  return new;
end;
$$;

drop trigger if exists progress_known_chapters_only on public.progress;
create trigger progress_known_chapters_only
  before insert on public.progress
  for each row execute function public.progress_known_chapters_only();

-- Recompute one student's derived stats from their progress rows.
--
-- SECURITY DEFINER so it runs as the table owner: the column grants above deny
-- `authenticated` any write to xp or streak, and this function is called from a
-- trigger firing under exactly that role.
--
-- `XP_PER_CHAPTER` is 20 in src/lib/student.ts. The two have to agree, or a
-- student's local total and their leaderboard total disagree after every sync.
create or replace function public.refresh_profile_stats(target text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  total_xp integer;
  run_days integer;
begin
  select count(*) * 20 into total_xp
  from public.progress
  where user_id = target;

  -- Streak: consecutive days ending today or yesterday. Ordering the distinct
  -- completion dates newest-first, a day is part of the current run only when
  -- it sits exactly (row number - 1) days before the most recent one; the first
  -- gap breaks that alignment and every older day fails it too. Yesterday
  -- counts so that a streak is not lost to a timezone or a late night.
  --
  -- The ::int on the offset is load-bearing. `row_number()` is bigint, and
  -- Postgres has date - integer but no date - bigint, so without the cast this
  -- function creates cleanly and then fails the first time it is called —
  -- plpgsql bodies are not planned until they run.
  with days as (
    select distinct (completed_at at time zone 'utc')::date as day
    from public.progress
    where user_id = target
  ),
  ranked as (
    select day, row_number() over (order by day desc) as rn from days
  )
  select count(*) into run_days
  from ranked
  where (select max(day) from days) >= current_date - 1
    and day = (select max(day) from days) - (rn - 1)::int;

  -- Upsert, because the trigger can fire before the browser has pushed a
  -- profile: the sync writes progress first. Creating the row here with the
  -- table defaults lets the later profile write set the name over the top
  -- without ever touching the numbers.
  insert into public.profiles (id, xp, streak, updated_at)
  values (target, coalesce(total_xp, 0), coalesce(run_days, 0), now())
  on conflict (id) do update
    set xp = excluded.xp,
        streak = excluded.streak,
        updated_at = now();
end;
$$;

create or replace function public.progress_refresh_stats()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Branch on TG_OP rather than coalesce(new.user_id, old.user_id). On a DELETE
  -- the NEW record is never assigned, and reading a field off an unassigned
  -- record raises "record \"new\" is not assigned yet" before coalesce ever sees
  -- a value — the same shape of failure as the missing ::int above, invisible
  -- until the day somebody actually deletes a progress row.
  if tg_op = 'DELETE' then
    perform public.refresh_profile_stats(old.user_id);
  else
    perform public.refresh_profile_stats(new.user_id);
  end if;
  return null;
end;
$$;

-- Per row rather than per statement, because a statement-level trigger cannot
-- see which user's rows changed. A first-sign-in backlog therefore recomputes
-- once per completed chapter — at 123 chapters maximum, on a table with a
-- primary key on user_id, that is not worth optimising.
drop trigger if exists progress_refresh_stats on public.progress;
create trigger progress_refresh_stats
  after insert or delete on public.progress
  for each row execute function public.progress_refresh_stats();

-- Backfill, because the trigger only fires on rows written from now on.
--
-- Every profile that existed before this ran is still carrying whatever number
-- the browser last posted. Recomputing them all is what makes the leaderboard
-- true rather than true-from-here-on, and it is the moment any total that was
-- never earned goes away. Expect totals to fall.
--
-- Both statements, and in this order: the first corrects profiles that exist,
-- the second creates any that are missing for a student whose progress rows
-- arrived without one. Idempotent — re-running recomputes the same values.
select public.refresh_profile_stats(id) from public.profiles;
select public.refresh_profile_stats(user_id) from (select distinct user_id from public.progress) as p;

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

commit;
