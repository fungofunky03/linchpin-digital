import Stripe from "stripe"

// Singleton — one Stripe client for the whole app
const globalForStripe = globalThis as unknown as { stripe: Stripe }

export const stripe =
  globalForStripe.stripe ??
  new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
    typescript: true,
  })

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe

// ─── Plan config ─────────────────────────────────────────────────────────────
export const PLANS = {
  starter: {
    name: "Starter",
    description: "Website + local SEO basics",
    price: 99,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
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
    priceId: process.env.STRIPE_GROWTH_PRICE_ID!,
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
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
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
