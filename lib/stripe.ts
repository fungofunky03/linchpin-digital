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
export const PLANS = {
  starter: {
    name: "Starter",
    description: "Website + local SEO basics",
    price: 99,
    get priceId() { return process.env.STRIPE_STARTER_PRICE_ID! },
    features: [
      "5-page professional website",
      "Google Business Profile setup",
      "Basic local SEO",
      "Monthly performance report",
      "Email support",
    ],
  },
  growth: {
    name: "Growth",
    description: "Full marketing engine",
    price: 199,
    get priceId() { return process.env.STRIPE_GROWTH_PRICE_ID! },
    features: [
      "Everything in Starter",
      "AI receptionist (missed call text-back)",
      "Review request automation",
      "Lead tracking dashboard",
      "Google Ads management",
      "Priority support",
    ],
  },
  pro: {
    name: "Pro",
    description: "Done-for-you growth partner",
    price: 299,
    get priceId() { return process.env.STRIPE_PRO_PRICE_ID! },
    features: [
      "Everything in Growth",
      "Real-time ROI dashboard",
      "Social media content (4 posts/mo)",
      "Quarterly strategy call",
      "Dedicated account manager",
      "White-glove onboarding",
    ],
  },
} as const

export type PlanKey = keyof typeof PLANS
