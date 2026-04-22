# Linchpin Digital — Best Practices

## Stripe

- **Singleton pattern**: The `lib/stripe.ts` file uses a global singleton. Never instantiate `new Stripe()` in individual route files — always import from `lib/stripe.ts`.
- **Idempotent webhooks**: Always check `stripeEvents` table before processing. Insert the event ID after successful processing.
- **Feature gating**: Gate Growth/Pro features server-side via `stripeCurrentPeriodEnd > new Date()`. Never rely on a `plan` string alone — a cancelled subscription still has a plan value.
- **Trial period**: 14-day trial is set in `checkout/route.ts` via `trial_period_days`. The webhook `customer.subscription.updated` fires when the trial ends and converts to `active`.

## Database

- **Single db import**: Always import `db` from `lib/db.ts`. The singleton pool prevents connection exhaustion under serverless concurrency.
- **`force-dynamic`**: Add `export const dynamic = "force-dynamic"` to server pages that read auth or DB data at request time.
- **Migrations in CI**: Commit migration files to git. Run them in your deployment pipeline, not on app startup.
- **Supabase RLS**: For user-generated content tables (leads, reviews), add Row Level Security policies in Supabase so users can only read/write their own rows — even if a query bug skips the `where` clause.

## Authentication

- **Never trust client-side userId**: Always derive `userId` from `auth()` in server components. Never accept it from request body.
- **Sync Clerk users to DB on first dashboard load**: The dashboard `page.tsx` inserts a DB user record if one doesn't exist. This is the simplest sync strategy for a small team.
- **Clerk webhooks (future)**: For more robust user sync (handles Clerk-side profile updates, deletions), add a `/api/webhooks/clerk` route and handle `user.created`, `user.updated`, `user.deleted` events.

## UI / UX

- **`Suspense` boundaries**: Wrap async server components in `<Suspense fallback={<Skeleton />}>` so the dashboard doesn't block on slow DB queries.
- **Optimistic UI**: For review request sends and lead status updates, update local state immediately and reconcile with the server response.
- **Error states**: Every `fetch()` call in client components should handle the error case and `toast.error()` — never silently fail.

## Rate Limiting (add when ready)

For auth routes (`/sign-in`, `/sign-up`, API routes that accept user input), add rate limiting with Upstash Redis + `@upstash/ratelimit`:
```ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})
```

## Environment Variables

- Never commit `.env.local` — it's gitignored by default.
- Prefix client-accessible vars with `NEXT_PUBLIC_`. Server-only secrets (Stripe, Supabase service role) must NOT have this prefix.
- On Vercel: set all vars in Project → Settings → Environment Variables. Stripe test vs. live keys should be toggled by environment (Preview = test, Production = live).
# Build Wed Apr 22 08:10:05 UTC 2026
