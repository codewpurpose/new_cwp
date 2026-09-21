-- CodeWithPurpose — distributed protection for public GitHub lookups.
--
-- Run after github-stats.sql. The route keeps a best-effort in-process
-- fallback, so deploying the code before running this file fails closed to
-- the local guard instead of taking the GitHub features offline.

begin;

create table if not exists public.github_lookup_rate_limits (
  ip                 text primary key check (length(ip) between 1 and 255),
  window_started_at  timestamptz not null,
  -- 21 is retained as the sentinel for the first rejected request. The route
  -- allows 20 requests and rejects the 21st without losing that state.
  request_count      integer not null check (request_count between 1 and 21)
);

-- Keep this migration safe to rerun after the original 1..20 version shipped.
alter table public.github_lookup_rate_limits
  drop constraint if exists github_lookup_rate_limits_request_count_check;
alter table public.github_lookup_rate_limits
  add constraint github_lookup_rate_limits_request_count_check
  check (request_count between 1 and 21);

create index if not exists github_lookup_rate_limits_window_idx
  on public.github_lookup_rate_limits (window_started_at);

alter table public.github_lookup_rate_limits enable row level security;
revoke all on public.github_lookup_rate_limits from public, anon, authenticated;

create or replace function public.check_github_lookup_rate_limit(p_ip text)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_window_started_at timestamptz;
  v_request_count integer;
begin
  if length(trim(p_ip)) = 0 or length(p_ip) > 255 then
    raise exception 'invalid rate-limit key';
  end if;

  insert into public.github_lookup_rate_limits (ip, window_started_at, request_count)
  values (p_ip, v_now, 1)
  on conflict (ip) do update
  set
    window_started_at = case
      when public.github_lookup_rate_limits.window_started_at <= v_now - interval '1 hour'
        then excluded.window_started_at
      else public.github_lookup_rate_limits.window_started_at
    end,
    request_count = case
      when public.github_lookup_rate_limits.window_started_at <= v_now - interval '1 hour'
        then 1
      when public.github_lookup_rate_limits.request_count < 21
        then public.github_lookup_rate_limits.request_count + 1
      else public.github_lookup_rate_limits.request_count
    end
  returning github_lookup_rate_limits.window_started_at, github_lookup_rate_limits.request_count
  into v_window_started_at, v_request_count;

  -- The 21st request is the first rejected request. Keeping that sentinel in
  -- the row makes later requests return the same decision without incrementing
  -- unboundedly.
  allowed := v_request_count <= 20;
  retry_after_seconds := case
    when allowed then 0
    else greatest(1, ceil(extract(epoch from (v_window_started_at + interval '1 hour' - v_now)))::integer)
  end;
  return next;
end;
$$;

revoke all on function public.check_github_lookup_rate_limit(text) from public, anon, authenticated;
grant execute on function public.check_github_lookup_rate_limit(text) to service_role;

-- Run this separately from the request path (for example with Supabase
-- pg_cron) so cleanup cannot deadlock with concurrent per-IP upserts. SKIP
-- LOCKED lets it yield cleanly when a hot row is being checked.
create or replace function public.cleanup_github_lookup_rate_limits()
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_deleted integer;
begin
  delete from public.github_lookup_rate_limits
  where ctid in (
    select ctid
    from public.github_lookup_rate_limits
    where window_started_at < clock_timestamp() - interval '24 hours'
    for update skip locked
  );
  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.cleanup_github_lookup_rate_limits() from public, anon, authenticated;
grant execute on function public.cleanup_github_lookup_rate_limits() to service_role;

-- Supabase projects that have pg_cron enabled get maintenance automatically.
-- Dynamic SQL keeps this migration safe on projects where the extension is not
-- installed; the application still has its bounded local fallback there.
do $$
declare
  v_job_id bigint;
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron')
    and to_regclass('cron.job') is not null then
    for v_job_id in execute $schedule$
      select jobid
      from cron.job
      where jobname = 'cwp-github-rate-limit-cleanup'
    $schedule$ loop
      perform cron.unschedule(v_job_id);
    end loop;
    execute $schedule$
      select cron.schedule(
        'cwp-github-rate-limit-cleanup',
        '0 * * * *',
        'select public.cleanup_github_lookup_rate_limits();'
      )
    $schedule$ into v_job_id;
  end if;
end;
$$;

commit;
