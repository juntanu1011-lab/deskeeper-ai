-- Waitlist signups from the landing page (lp/design.md §17).
-- RLS is enabled with NO policies on purpose: the anon key can neither read
-- nor write this table. All inserts go through the Next.js API route
-- (web/app/api/waitlist/route.ts), which uses the service-role key server-side.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Case-insensitive dedupe: the API lowercases before insert, but keep the DB
-- honest even if something else writes to it someday.
create unique index if not exists waitlist_email_lower_idx
  on public.waitlist (lower(email));
