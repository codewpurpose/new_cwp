-- CodeWithPurpose — Python track, Part 6: "Data That Has Shape".
--
-- Run: Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- This is the ONE database step for the seven new Python chapters. There is no
-- schema change: `course_id` is still 'python', so `profiles`, `progress`,
-- `subscribers` and every policy and trigger in supabase/schema.sql are
-- untouched. All that is missing is the seven rows in the chapter allowlist.
--
-- WHY THIS FILE EXISTS, when supabase/chapters.sql already covers it.
--
-- chapters.sql is generated, and it opens with `delete from public.chapters`
-- before re-inserting the whole curriculum. That is correct and safe — it runs
-- in a transaction — but it rewrites all 130 rows to add 7, and it is the file
-- to run when the curriculum has changed in more than one place. This one is
-- additive: it inserts the seven new slugs, leaves the other 123 rows exactly
-- as they are, and never deletes anything.
--
-- Running BOTH is fine, in either order, any number of times. `on conflict do
-- nothing` means a slug that is already present is skipped rather than
-- duplicated, so this file is safe to re-run and safe to run against a database
-- where chapters.sql has already been applied.
--
-- WHAT HAPPENS IF YOU SKIP IT. Nothing errors. The `progress_known_chapters_only`
-- trigger in supabase/schema.sql silently drops any progress row naming a
-- chapter that is not in this table — it returns NULL rather than raising, so a
-- student's whole sync still succeeds and the new chapters just quietly earn no
-- XP. That silence is the reason this file is worth running promptly.

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

-- The seven chapters, in reading order (orders 21 through 27 in
-- src/lib/python-lessons.ts). Slugs are the primary key of a student's history:
-- `progress` stores (user_id, course_id, chapter_slug) and nothing else, so
-- these strings must match the data file exactly and must never be renamed
-- afterwards — a rename orphans every completion recorded against the old one.
insert into public.chapters (course_id, chapter_slug) values
  ('python', 'list-methods-in-depth'),
  ('python', 'records-and-tables'),
  ('python', 'nested-structures'),
  ('python', 'copying-and-aliasing'),
  ('python', 'errors-in-data'),
  ('python', 'the-collections-module'),
  ('python', 'choosing-a-structure')
on conflict (course_id, chapter_slug) do nothing;

commit;

-- Verification. Expect exactly 31 — the original 24 plus these 7. Anything less
-- means part of the insert above did not land, and completions for whichever
-- chapters are missing will be discarded without an error.
select count(*) as python_chapters
from public.chapters
where course_id = 'python';

-- Existing students are deliberately NOT credited with the new material: no
-- rows are written to `progress` here, so everyone starts the new part at zero.
-- Their XP is unchanged, because `refresh_profile_stats` counts progress rows
-- and no progress rows were added. What does change is the denominator on the
-- dashboard — the site now holds 130 chapters rather than 123, so every
-- student's overall percentage drops even though their XP has not moved.
