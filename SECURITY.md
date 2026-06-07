# Security

This is a static client-side site today (React + Vite, no backend). The notes
below are the security checklist for **when a server and database get added**,
most likely to make the guestbook real.

## Current state (static site)

- No backend, no network calls, no secrets in the repo.
- User input (guestbook, hit counter) is handled in-browser only and is
  rendered through React's default escaping, so there is no XSS sink.
- External links carry `rel="noreferrer noopener"`.
- `npm audit` is clean.

Keep it that way: never introduce `dangerouslySetInnerHTML`, and never build
SQL by string concatenation once a DB exists.

## Planned backend: Supabase (Postgres)

Decision: start with the client talking **directly** to Supabase using the
public `anon` key, no server of our own. This keeps the static deploy.

### The one rule that matters

The `anon` key ships to every visitor's browser. It is **not a secret**. The
*only* thing protecting the database is **Row Level Security (RLS)**. If RLS is
off, or a policy is too loose, the guestbook table is world-readable and
world-writable by anyone who opens devtools.

- The `service_role` key is full admin. It must **never** appear in client
  code or the repo. Server-side / Edge Functions only.
- Enabling RLS with no policies = deny everything. Enable first, then open up
  exactly what's needed.

### Where to configure (Supabase dashboard)

- **Enable RLS:** Table Editor → select table → "Enable RLS" (or via the SQL
  below). A red "Unrestricted" badge means RLS is off. That badge is the
  tripwire.
- **Policies / SQL:** SQL Editor (run the block below), or Authentication →
  Policies for a GUI view.

## Guestbook schema + RLS (copy-paste SQL)

Run this whole block in the Supabase SQL Editor.

```sql
-- 1. Table with server-enforced length limits via CHECK constraints.
--    Limits live on the table so they hold no matter who inserts.
create table if not exists public.guestbook (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(name) between 1 and 80),
  message     text not null check (char_length(message) between 1 and 500),
  created_at  timestamptz not null default now(),
  -- New entries are hidden until moderated, so spam never auto-renders.
  published   boolean not null default false
);

-- 2. Turn RLS on. With zero policies this denies all access by default.
alter table public.guestbook enable row level security;

-- 3. Anyone (anon) may READ, but only entries that have been published.
create policy "anon reads published entries"
  on public.guestbook
  for select
  to anon
  using (published = true);

-- 4. Anyone (anon) may INSERT, but only an unpublished entry.
--    The WITH CHECK clause forbids a visitor from self-publishing or
--    backdating. Length limits are already enforced by the CHECK constraints.
create policy "anon inserts unpublished entries"
  on public.guestbook
  for insert
  to anon
  with check (published = false);

-- 5. No UPDATE and no DELETE policies for anon means both are denied.
--    Moderation (flipping published = true, or removing spam) is done from
--    the Supabase dashboard, which uses the service_role and bypasses RLS.
```

### What this gives you

- Visitors can submit entries and read approved ones. Nothing else.
- A visitor cannot publish their own entry, edit, delete, or read the
  unmoderated queue.
- Oversized payloads are rejected by Postgres itself.

### What RLS does NOT cover (still your job)

- **Rate limiting / spam.** Supabase does not throttle inserts. Options, in
  rough order of effort:
  - A honeypot field in the form (a hidden input bots fill, humans don't);
    reject any insert where it's non-empty. Cheap and effective.
  - A Postgres trigger that rejects more than N inserts per IP per hour.
  - If spam gets bad, move inserts behind a Supabase **Edge Function** that
    validates server-side (this is "Path B"), using the `service_role` key
    that never touches the browser.
- **Output escaping.** Keep rendering entries as `{entry.message}` in React.
  Never `dangerouslySetInnerHTML`. Store raw, escape on render.

## General backend hardening (when a server/function is added)

- Secrets in env vars only. Add `.env` to `.gitignore` before creating one.
  Never commit any Supabase key beyond the `anon` key (and even that lives in
  client code, not in a "secrets" file).
- CORS: lock to this site's origin, not `*`.
- Validate every request body against a schema (eg zod); reject anything that
  doesn't match.
- Set security headers at the server: `Content-Security-Policy`,
  `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`.
  - Note: the inline FOUC-guard script in `index.html` violates a strict
    `script-src 'self'`. Move it to an external file or give it a nonce/hash
    when CSP goes on.
- HTTPS only, enable HSTS.
- Keep `npm audit` clean; a server pulls in many more dependencies.
- Do not roll your own auth/session/password code if an admin panel appears.

## Quick pre-launch checklist for the backend

- [ ] RLS enabled on every table (no "Unrestricted" badges)
- [ ] `service_role` key absent from client code and repo history
- [ ] Length/shape limits enforced server-side, not just in the form
- [ ] Spam deterrent in place (honeypot at minimum)
- [ ] New guestbook entries default to unpublished + moderation path exists
- [ ] `.env` gitignored; no secrets committed
- [ ] Security headers + HTTPS/HSTS configured at the host
- [ ] `npm audit` clean
