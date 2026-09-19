-- CodeWithPurpose — distributed protection for public GitHub lookups.
--
-- Run after github-stats.sql. The route keeps a best-effort in-process
-- fallback, so deploying the code before running this file fails closed to
-- the local guard instead of taking the GitHub features offline.

begin;

create table if not exists public.github_lookup_rate_limits (
  ip                 text primary key check (length(ip) between 1 and 255),
  window_started_at  timestamptz not null,
  request_count      integer not null check (request_count between 1 and 20)
);

create index if not exists github_lookup_rate_limits_window_idx
  on public.github_lookup_rate_limits (window_started_at);

alter table public.github_lookup_rate_limits enable row level security;
revoke all on public.github_lookup_rate_limits from public, anon, authenticated;

create or replace function public.check_github_lookup_rate_limit(p_ip text)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = public
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
      when public.github_lookup_rate_limits.request_count < 20
        then public.github_lookup_rate_limits.request_count + 1
      else public.github_lookup_rate_limits.request_count
    end
  returning github_lookup_rate_limits.window_started_at, github_lookup_rate_limits.request_count
  into v_window_started_at, v_request_count;

  -- Keep abandoned IP keys from growing forever without requiring a cron job.
  delete from public.github_lookup_rate_limits
  where window_started_at < v_now - interval '24 hours'
    and ip <> p_ip;

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

commit;
