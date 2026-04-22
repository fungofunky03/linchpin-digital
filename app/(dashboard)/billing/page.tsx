"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { PLANS, type PlanKey } from "@/lib/stripe"
import { toast } from "sonner"

export default function BillingPage() {
  const [loadingCheckout, setLoadingCheckout] = useState<PlanKey | null>(null)
  const [loadingPortal, setLoadingPortal] = useState(false)

  async function handleCheckout(plan: PlanKey) {
    setLoadingCheckout(plan)
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else toast.error(data.error ?? "Checkout failed")
    } finally {
      setLoadingCheckout(null)
    }
  }

  async function handlePortal() {
    setLoadingPortal(true)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else toast.error(data.error ?? "Could not open billing portal")
    } finally {
      setLoadingPortal(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header title="Billing" />
      <main className="flex-1 p-6 space-y-8">
        {/* Manage existing subscription */}
        <Card>
          <CardHeader>
            <p className="font-semibold text-slate-900">Manage Subscription</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-500">
              Update your payment method, download invoices, or cancel your subscription
              through the Stripe billing portal.
            </p>
            <Button
              variant="outline"
              onClick={handlePortal}
              disabled={loadingPortal}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              {loadingPortal ? "Opening…" : "Open billing portal"}
            </Button>
          </CardContent>
        </Card>

        {/* Plans */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Available Plans
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(Object.entries(PLANS) as [PlanKey, (typeof PLANS)[PlanKey]][]).map(
              ([key, plan]) => (
                <Card key={key} className={key === "growth" ? "border-blue-600 ring-2 ring-blue-600" : ""}>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-blue-600">{plan.name}</span>
                        {key === "growth" && <Badge className="bg-blue-600 text-white text-xs">Popular</Badge>}
                      </div>
                      <div className="mt-1 text-2xl font-extrabold text-slate-900">
                        ${plan.price}
                        <span className="text-sm font-normal text-slate-400">/mo</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={key === "growth" ? "default" : "outline"}
                      disabled={loadingCheckout === key}
                      onClick={() => handleCheckout(key)}
                    >
                      {loadingCheckout === key ? "Loading…" : "Switch to this plan"}
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
