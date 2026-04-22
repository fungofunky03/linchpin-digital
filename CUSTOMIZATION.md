# Linchpin Digital — Customization Guide

## Swapping Auth Providers

| Provider | When to use | Change needed |
|---|---|---|
| **Clerk** (current) | Fast DX, hosted UI, great for solo founders | No change |
| **NextAuth** | Full control, open source | Replace `ClerkProvider`, add `authOptions`, swap `middleware.ts` |
| **Supabase Auth** | All-in-one if Supabase is your only infra | Use `createServerClient` from `@supabase/ssr` |

## Swapping Database / ORM

| Option | Notes |
|---|---|
| **Supabase + Drizzle** (current) | Best combo for bootstrapped SaaS |
| **NeonDB + Drizzle** | Drop-in swap: change `DATABASE_URL` format |
| **Prisma** | Replace `drizzle-orm` imports with `@prisma/client`, update `lib/db.ts` |

## Billing Models

| Model | Stripe config |
|---|---|
| **Flat-rate monthly** (current) | `mode: "subscription"`, single price per plan |
| **Per-seat** | Set `quantity` dynamically based on team size |
| **Usage-based** | Use `mode: "subscription"` + metered billing, report usage via `stripe.subscriptionItems.createUsageRecord` |
| **One-time payment** | Change `mode: "payment"` in checkout route |

## Adding More Dashboard Pages

1. Create `app/(dashboard)/dashboard/[page]/page.tsx`
2. Add to `nav` array in `components/dashboard/sidebar.tsx`
3. Use `<Header title="Page Name" />` at the top

## Adding More Drizzle Tables

1. Add table to `db/schema.ts`
2. Export type from bottom of schema
3. Run `npx drizzle-kit generate` to create migration
4. Run `npx drizzle-kit migrate` (or `push` in dev) to apply

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables (or use Vercel dashboard)
vercel env add CLERK_SECRET_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add DATABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

After deploying, update your Stripe webhook endpoint to:
`https://your-app.vercel.app/api/webhooks/stripe`

## Adding n8n / Automation Hooks

Linchpin's value is automation. Add outbound webhook calls from key events:

```ts
// After a new lead is created
await fetch(process.env.N8N_LEAD_WEBHOOK!, {
  method: "POST",
  body: JSON.stringify({ name, email, phone, source, userId }),
})
```

Environment variables to add:
- `N8N_LEAD_WEBHOOK` — triggers lead notification + CRM sync
- `N8N_REVIEW_WEBHOOK` — triggers SMS review request
- `N8N_ONBOARDING_WEBHOOK` — triggers welcome sequence on new signup
