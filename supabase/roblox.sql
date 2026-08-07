-- CodeWithPurpose — the Roblox Studio track.
--
-- Run: Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- This is the ONE database step for the new track. There is still no schema
-- change: `roblox` is a new value of `course_id`, and `course_id` has always
-- been a plain `text` column with no foreign key and no enum. Nothing in
-- supabase/schema.sql needs to change to admit a sixth track — `profiles`,
-- `progress`, `subscribers`, `account_welcomes`, and every policy and trigger
-- stay exactly as they are.
--
-- All that is missing is the fourteen rows in the chapter allowlist.
--
-- WHY THIS FILE EXISTS, when supabase/chapters.sql already covers it.
--
-- chapters.sql is generated, and it opens with `delete from public.chapters`
-- before re-inserting the whole curriculum. That is correct and safe — it runs
-- in a transaction — but it rewrites all 144 rows to add 14. This one is
-- additive: it inserts the fourteen roblox slugs, leaves the other 130 rows
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
-- student's whole sync still succeeds and the entire Roblox track just quietly
-- earns no XP. That silence is the reason this file is worth running promptly.

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

-- The fourteen chapters, in reading order (orders 1 through 14 in
-- src/lib/roblox-lessons.ts). Slugs are the primary key of a student's history:
-- `progress` stores (user_id, course_id, chapter_slug) and nothing else, so
-- these strings must match the data file exactly and must never be renamed
-- afterwards — a rename orphans every completion recorded against the old one.
--
-- The same applies to the course_id itself. 'roblox' is written into every
-- progress row from now on; changing the track's LearnTrackId later would
-- strand all of them.
insert into public.chapters (course_id, chapter_slug) values
  ('roblox', 'what-is-roblox-studio'),
  ('roblox', 'the-data-model'),
  ('roblox', 'parts-and-properties'),
  ('roblox', 'your-first-script'),
  ('roblox', 'variables-and-values'),
  ('roblox', 'instances-and-properties'),
  ('roblox', 'client-and-server'),
  ('roblox', 'events-and-connections'),
  ('roblox', 'debounce'),
  ('roblox', 'the-killbrick'),
  ('roblox', 'the-disappearing-platform'),
  ('roblox', 'the-one-way-platform'),
  ('roblox', 'debugging-in-studio'),
  ('roblox', 'publishing-your-experience')
on conflict (course_id, chapter_slug) do nothing;

commit;

-- Verification. Expect exactly 14 for roblox and 144 overall. Anything less
-- means part of the insert did not land, and completions for whichever chapters
-- are missing will be discarded without an error.
select
  (select count(*) from public.chapters where course_id = 'roblox') as roblox_chapters,
  (select count(*) from public.chapters) as chapters_total;

-- No rows are written to `progress` here, so nobody is credited with the new
-- track and no XP changes. What does move is the dashboard denominator: the
-- site now holds 144 chapters rather than 130, so every existing student's
-- overall percentage drops even though their XP has not moved.
