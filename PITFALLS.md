# Linchpin Digital — Common Pitfalls

## 1. Clerk + Next.js App Router

**Issue:** `auth()` called outside a server component or API route.  
**Fix:** Only call `auth()` / `currentUser()` from server components or route handlers. Use `useUser()` / `useAuth()` client-side.

**Issue:** Middleware not running.  
**Fix:** Confirm `middleware.ts` is at the project root (not inside `app/`). The config `matcher` must cover `/api` and all dashboard routes.

**Issue:** `clerkMiddleware` blocks webhooks.  
**Fix:** The Stripe webhook route (`/api/webhooks/stripe`) must be in `isPublicRoute`. Clerk will reject unsigned requests otherwise.

---

## 2. Drizzle + Supabase

**Issue:** `SSL SYSCALL error` or `SSL connection required`.  
**Fix:** Add `?sslmode=require` to `DATABASE_URL` when using the direct connection string from Supabase. Set `ssl: { rejectUnauthorized: false }` in the Pool config.

**Issue:** Drizzle migration fails in production.  
**Fix:** Use `drizzle-kit push` only in dev. In production, run `drizzle-kit generate` locally and commit the migration file, then run `drizzle-kit migrate` in CI/CD — never auto-push schema in production.

**Issue:** Supabase pooler (port 6543) vs direct (port 5432).  
**Fix:** Drizzle requires the **direct connection** (port 5432). Supabase's Transaction Pooler (6543) does not support prepared statements. Use the Session Pooler (5432) URL labeled "Direct connection" in Supabase dashboard.

**Issue:** `crypto.randomUUID is not defined` in DB schema.  
**Fix:** Add `import 'server-only'` at the top of `db/schema.ts`, or target Node 18+. The `crypto` global is available in Node 18+ and Edge runtime.

---

## 3. Stripe Webhooks

**Issue:** `No signatures found matching the expected signature`.  
**Fix:** The raw request body must not be parsed before passing to `stripe.webhooks.constructEvent`. Use `req.text()` — never `req.json()`.

**Issue:** Webhook events process multiple times (duplicate charges, duplicate DB writes).  
**Fix:** The `stripeEvents` table in the schema is your idempotency store. Always check for the event ID before processing and insert it after.

**Issue:** Local webhook testing fails.  
**Fix:** Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`. The CLI generates a local `whsec_...` secret — set that as `STRIPE_WEBHOOK_SECRET` in `.env.local`. Do NOT use the dashboard webhook secret locally.

**Issue:** `stripe_current_period_end` is wrong timezone.  
**Fix:** Stripe returns Unix timestamps (seconds). Convert with `new Date(subscription.current_period_end * 1000)`.

---

## 4. Next.js Build

**Issue:** TypeScript errors on `session.user.id` or `subscriptionStatus`.  
**Fix:** Clerk's `auth()` returns a `userId` string directly — not a session object. Don't try to access `session.user`.

**Issue:** `useUser`, `useAuth`, `UserButton` throw "must be used inside ClerkProvider".  
**Fix:** These are client-only. Mark any component using them with `"use client"`. The `ClerkProvider` in `app/layout.tsx` covers all children.

**Issue:** Edge runtime conflict with Drizzle/pg.  
**Fix:** Drizzle with `node-postgres` (`pg`) does NOT support Edge runtime. Keep all DB calls in Node.js route handlers (`export const runtime = 'nodejs'` is the default for App Router API routes).
