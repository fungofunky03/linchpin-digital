export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { stripe, PLANS, type PlanKey } from "@/lib/stripe"
import { db } from "@/lib/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { absoluteUrl } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    // Dynamic import defers Clerk initialization to runtime (avoids build-time key error)
    const { auth, currentUser } = await import("@clerk/nextjs/server")
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { plan } = (await req.json()) as { plan: PlanKey }
    if (!PLANS[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Get or create DB user record
    let [dbUser] = await db.select().from(users).where(eq(users.id, userId))

    if (!dbUser) {
      const clerkUser = await currentUser()
      const email = clerkUser?.emailAddresses[0]?.emailAddress ?? ""
      ;[dbUser] = await db
        .insert(users)
        .values({ id: userId, email, name: clerkUser?.fullName ?? "" })
        .returning()
    }

    // Get or create Stripe customer
    let customerId = dbUser.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: dbUser.name ?? undefined,
        metadata: { clerkUserId: userId },
      })
      customerId = customer.id
      await db
        .update(users)
        .set({ stripeCustomerId: customerId })
        .where(eq(users.id, userId))
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
      success_url: `${absoluteUrl("/dashboard")}?upgraded=true`,
      cancel_url: absoluteUrl("/pricing"),
      subscription_data: {
        trial_period_days: 14,
        metadata: { clerkUserId: userId, plan },
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    console.error("[checkout]", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
