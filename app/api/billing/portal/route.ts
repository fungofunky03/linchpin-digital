export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { absoluteUrl } from "@/lib/utils"

export async function POST() {
  noStore()
  try {
    const { auth } = await import("@clerk/nextjs/server")
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [dbUser] = await db.select().from(users).where(eq(users.id, userId))
    if (!dbUser?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found. Subscribe to a plan first." },
        { status: 400 }
      )
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripeCustomerId,
      return_url: absoluteUrl("/dashboard/billing"),
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error("[portal]", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
