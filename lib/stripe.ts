import Stripe from "stripe"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

// ─── Lazy Stripe singleton ───────────────────────────────────────────────────
// Defer instantiation to first call to avoid build-time validation errors
// when STRIPE_SECRET_KEY is not available during Next.js page data collection.
const globalForStripe = globalThis as unknown as {
  stripe: Stripe | undefined
}

function getStripe(): Stripe {
  if (!globalForStripe.stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set.")
    }
    globalForStripe.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    })
  }
  return globalForStripe.stripe
}

// Proxy that defers instantiation to first use
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getStripe() as any)[prop]
  },
})

// ─── Plan config ─────────────────────────────────────────────────────────────
// Founding-pilot pricing. Plan keys are tied to env-configured Stripe price IDs
// (STRIPE_STARTER_PRICE_ID / STRIPE_GROWTH_PRICE_ID / STRIPE_PRO_PRICE_ID).
export const PLANS = {
  starter: {
    name: "Foundation",
    description: "Local presence, lead inbox, and reviews — installed and monitored.",
    price: 99,
    get priceId() { return process.env.STRIPE_STARTER_PRICE_ID! },
    features: [
      "Lead inbox (calls, web forms, Google messages in one place)",
      "Missed-call text-back",
      "Review request engine after every closed job",
      "Google Business Profile tuning",
      "Monthly plain-English report",
      "Founder support by email",
    ],
  },
  growth: {
    name: "Operate",
    description: "The full installed system — lead capture through booked work.",
    price: 199,
    get priceId() { return process.env.STRIPE_GROWTH_PRICE_ID! },
    features: [
      "Everything in Foundation",
      "Automated follow-up sequences (new lead, quote sent, no-show)",
      "Online booking + confirmations wired to your calendar",
      "Review monitoring and replies",
      "Local SEO maintenance and citation cleanup",
      "Daily system monitoring",
      "Direct text/call access",
    ],
  },
  pro: {
    name: "Command",
    description: "Operate, plus a website that does the selling and tighter integrations.",
    price: 299,
    get priceId() { return process.env.STRIPE_PRO_PRICE_ID! },
    features: [
      "Everything in Operate",
      "Modern conversion-focused website (built or rebuilt)",
      "CRM + phone system integrations",
      "Quarterly system review and tuning",
      "Owner dashboard: leads, jobs, reviews, sources",
      "Priority response, same business day",
    ],
  },
} as const

export type PlanKey = keyof typeof PLANS
