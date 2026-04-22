export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { users, stripeEvents } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // ── Idempotency check ────────────────────────────────────────────────────
  const existing = await db
    .select()
    .from(stripeEvents)
    .where(eq(stripeEvents.id, event.id))
  if (existing.length > 0) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  // ── Process event ────────────────────────────────────────────────────────
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        if (session.mode !== "subscription") break

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )
        const clerkUserId = subscription.metadata?.clerkUserId
        if (!clerkUserId) break

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (subscription as any).current_period_end as number | undefined

        await db
          .update(users)
          .set({
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            subscriptionStatus: subscription.status as "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "unpaid",
            plan: (subscription.metadata?.plan ?? "starter") as "starter" | "growth" | "pro",
            updatedAt: new Date(),
          })
          .where(eq(users.id, clerkUserId))
        break
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const clerkUserId = subscription.metadata?.clerkUserId
        if (!clerkUserId) break

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (subscription as any).current_period_end as number | undefined

        await db
          .update(users)
          .set({
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id ?? null,
            stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            subscriptionStatus: subscription.status as "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "unpaid",
            updatedAt: new Date(),
          })
          .where(eq(users.id, clerkUserId))
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const customerId = invoice.customer as string
        await db
          .update(users)
          .set({ subscriptionStatus: "past_due", updatedAt: new Date() })
          .where(eq(users.stripeCustomerId, customerId))
        break
      }
    }

    // Mark event as processed
    await db.insert(stripeEvents).values({ id: event.id, type: event.type })
  } catch (err) {
    console.error("[stripe-webhook] processing error", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
