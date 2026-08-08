-- CodeWithPurpose — the Git and GitHub track.
--
-- Run: Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- This is the ONE database step for the new track. There is still no schema
-- change: `github` is a new value of `course_id`, and `course_id` has always
-- been a plain `text` column with no foreign key and no enum. Nothing in
-- supabase/schema.sql needs to change to admit a seventh track — `profiles`,
-- `progress`, `subscribers`, `account_welcomes`, and every policy and trigger
-- stay exactly as they are.
--
-- All that is missing is the twenty-one rows in the chapter allowlist.
--
-- WHY THIS FILE EXISTS, when supabase/chapters.sql already covers it.
--
-- chapters.sql is generated, and it opens with `delete from public.chapters`
-- before re-inserting the whole curriculum. That is correct and safe — it runs
-- in a transaction — but it rewrites all 165 rows to add 21. This one is
-- additive: it inserts the twenty-one github slugs, leaves the other 144 rows
-- untouched, and never deletes anything.
--
-- Running BOTH is fine, in either order, any number of times. `on conflict do
-- nothing` means a slug that is already present is skipped rather than
-- duplicated, so this file is safe to re-run and safe to run against a database
-- where chapters.sql has already been applied.
--
-- WHAT HAPPENS IF YOU SKIP IT. Nothing errors. The `progress_known_chapters_only`
-- trigger in supabase/schema.sql silently drops any progress row naming a
-- chapter that is not in this table — it returns NULL rather than raising, so a
-- student's whole sync still succeeds and the entire Git and GitHub track just
-- quietly earns no XP. That silence is the reason this file is worth running
-- promptly.

begin;

-- Defensive, in case this is somehow the first file ever run against a fresh
-- project. Identical to the definition in supabase/chapters.sql, so it is a
-- no-op on any database that already has the table.
create table if not exists public.chapters (
  course_id    text not null,
  chapter_slug text not null,
  primary key (course_id, chapter_slug)
);

alter table public.chapters enable row level security;

-- The twenty-one chapters, in reading order (orders 1 through 21 in
-- src/lib/github-lessons.ts). Slugs are the primary key of a student's history:
-- `progress` stores (user_id, course_id, chapter_slug) and nothing else, so
-- these strings must match the data file exactly and must never be renamed
-- afterwards — a rename orphans every completion recorded against the old one.
--
-- The same applies to the course_id itself. 'github' is written into every
-- progress row from now on; changing the track's LearnTrackId later would
-- strand all of them.
insert into public.chapters (course_id, chapter_slug) values
  -- Part 1 — What Git Actually Is
  ('github', 'why-version-control'),
  ('github', 'installing-git'),
  ('github', 'repositories-and-the-three-trees'),
  -- Part 2 — The Everyday Loop
  ('github', 'staging-and-committing'),
  ('github', 'reading-history'),
  ('github', 'undoing-things'),
  ('github', 'ignoring-files'),
  -- Part 3 — Branches
  ('github', 'what-a-branch-is'),
  ('github', 'merging-branches'),
  ('github', 'merge-conflicts'),
  ('github', 'rebase-and-history'),
  -- Part 4 — GitHub, the Platform
  ('github', 'remotes-and-pushing'),
  ('github', 'authentication'),
  ('github', 'anatomy-of-a-repository'),
  ('github', 'issues-and-tracking'),
  -- Part 5 — Pull Requests and Review
  ('github', 'opening-a-pull-request'),
  ('github', 'reviewing-a-pull-request'),
  ('github', 'merging-a-pull-request'),
  -- Part 6 — Working in the Open
  ('github', 'contributing-to-open-source'),
  ('github', 'automating-with-actions'),
  ('github', 'choosing-a-workflow')
on conflict (course_id, chapter_slug) do nothing;

commit;

-- Verification. Expect exactly 21 for github and 165 overall. Anything less
-- means part of the insert did not land, and completions for whichever chapters
-- are missing will be discarded without an error.
select
  (select count(*) from public.chapters where course_id = 'github') as github_chapters,
  (select count(*) from public.chapters) as chapters_total;

-- No rows are written to `progress` here, so nobody is credited with the new
-- track and no XP changes. What does move is the dashboard denominator: the
-- site now holds 165 chapters rather than 144, so every existing student's
-- overall percentage drops even though their XP has not moved.
