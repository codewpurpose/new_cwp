-- CodeWithPurpose — the GitHub commits leaderboard.
--
-- A second leaderboard alongside the XP one in schema.sql, ranking students by
-- their real GitHub commit history instead of lessons finished. Run AFTER
-- schema.sql — `github_stats.user_id` references `public.profiles.id`.
--
-- Run: Supabase dashboard -> SQL Editor -> New query -> paste -> Run. Safe to
-- re-run (IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS).
--
-- The whole design fits in one sentence: nothing the browser sends is ever
-- trusted as a number. A signed-in student can ask the server to look up a
-- GitHub username and can read every row on the board, but every stat in this
-- table is written by /api/github-stats — which holds the GitHub token and the
-- service_role key — never by a student's own Supabase session. There is no
-- insert/update policy for `authenticated` below, on purpose: unlike `profiles`
-- (where a student legitimately owns their display name), there is no column
-- here a browser should ever be trusted to set.

begin;

-- ---------------------------------------------------------------------------
-- github_stats: one row per Clerk user who has linked a GitHub account.
--
-- `public_commits` and `private_contributions` are the two source values for
-- the total headline shown in the collapsed leaderboard row. Everything else
-- is detail, revealed when a row is expanded.
--
-- `commits_by_year` is what makes a resync cheap: GitHub's contribution count
-- for a past calendar year never changes, so /api/github-stats only re-queries
-- years from `synced_through_year` (the current year at last sync) onward,
-- the same "past months are immutable" trick the commit-history project this
-- was modelled on uses at month grain. Year grain is enough here — the UI
-- shows a lifetime total and a distribution, not a per-month curve.
-- ---------------------------------------------------------------------------
create table if not exists public.github_stats (
  user_id               text primary key references public.profiles(id) on delete cascade,
  github_username       text not null,
  github_user_id        bigint,
  avatar_url            text,
  name                  text,
  joined_github_at      timestamptz,
  public_commits        integer not null default 0 check (public_commits >= 0),
  private_contributions integer not null default 0 check (private_contributions >= 0),
  public_repos          integer not null default 0 check (public_repos >= 0),
  followers             integer not null default 0 check (followers >= 0),
  following             integer not null default 0 check (following >= 0),
  total_prs             integer not null default 0 check (total_prs >= 0),
  total_issues          integer not null default 0 check (total_issues >= 0),
  total_stars           integer not null default 0 check (total_stars >= 0),
  commits_by_year       jsonb not null default '{}'::jsonb,
  synced_through_year   integer,
  last_synced_at        timestamptz,
  created_at            timestamptz not null default now()
);

-- One CWP account per GitHub account. Case-insensitive: GitHub usernames are
-- not case-sensitive, and "Ada" / "ada" re-linking as two rows would let the
-- same person double up on the leaderboard.
create unique index if not exists github_stats_username_lower_idx
  on public.github_stats (lower(github_username));

alter table public.github_stats enable row level security;

-- The board is public, same as profiles: anyone can read every stat.
drop policy if exists "github stats are public" on public.github_stats;
create policy "github stats are public"
  on public.github_stats for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policy for anon or authenticated — see the note at
-- the top of this file. Revoke the blanket grant Supabase applies to new
-- tables in `public`, then hand back only what the policy above allows.
-- Everything else is written exclusively by /api/github-stats using the
-- service_role key, which bypasses RLS.
revoke all on public.github_stats from anon, authenticated;
grant select on public.github_stats to anon, authenticated;

commit;
