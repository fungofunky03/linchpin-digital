import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { users, leads, reviewRequests } from "@/db/schema"
import { eq, count } from "drizzle-orm"
import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const { userId } = await auth()

  // Get user + counts
  const [dbUser] = await db.select().from(users).where(eq(users.id, userId!))
  const [leadCount] = await db
    .select({ count: count() })
    .from(leads)
    .where(eq(leads.userId, userId!))
  const [reviewCount] = await db
    .select({ count: count() })
    .from(reviewRequests)
    .where(eq(reviewRequests.userId, userId!))

  const isActive =
    dbUser?.subscriptionStatus === "active" || dbUser?.subscriptionStatus === "trialing"

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Overview" />
      <main className="flex-1 p-6 space-y-6">
        {/* Upgrade banner */}
        {!isActive && (
          <div className="rounded-xl bg-blue-600 px-6 py-4 text-white flex items-center justify-between">
            <div>
              <p className="font-semibold">Start your 14-day free trial</p>
              <p className="text-sm text-blue-100">
                Pick a plan to unlock your website, SEO, and more.
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="secondary" size="sm">
                Choose a plan
              </Button>
            </Link>
          </div>
        )}

        {/* Active plan badge */}
        {isActive && dbUser?.plan && (
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 capitalize">
              {dbUser.plan} plan — active
            </Badge>
            {dbUser.stripeCurrentPeriodEnd && (
              <span className="text-xs text-slate-400">
                Renews {formatDate(dbUser.stripeCurrentPeriodEnd)}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value={leadCount?.count ?? 0}
            change="This month"
            positive
            icon={Users}
          />
          <StatsCard
            title="Review Requests"
            value={reviewCount?.count ?? 0}
            change="Sent this month"
            positive
            icon={Star}
            iconColor="text-yellow-500"
          />
          <StatsCard
            title="Website Status"
            value={isActive ? "Live" : "Pending"}
            icon={Globe}
            iconColor={isActive ? "text-green-600" : "text-slate-400"}
          />
          <StatsCard
            title="Current Plan"
            value={dbUser?.plan ? dbUser.plan.charAt(0).toUpperCase() + dbUser.plan.slice(1) : "None"}
            icon={BarChart3}
          />
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <p className="font-semibold text-slate-900">Recent Leads</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                {(leadCount?.count ?? 0) === 0
                  ? "No leads yet. Once your website is live, leads will appear here."
                  : `You have ${leadCount?.count} total leads.`}
              </p>
              <Link href="/dashboard/leads">
                <Button variant="link" className="mt-2 p-0 text-blue-600">
                  View all leads →
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <p className="font-semibold text-slate-900">Review Requests</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                {(reviewCount?.count ?? 0) === 0
                  ? "No review requests sent yet."
                  : `${reviewCount?.count} requests sent.`}
              </p>
              <Link href="/dashboard/reviews">
                <Button variant="link" className="mt-2 p-0 text-blue-600">
                  Manage reviews →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
