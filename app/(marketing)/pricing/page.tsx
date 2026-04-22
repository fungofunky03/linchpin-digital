"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { PLANS, type PlanKey } from "@/lib/stripe"
import { toast } from "sonner"

export default function PricingPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState<PlanKey | null>(null)

  async function handleCheckout(plan: PlanKey) {
    if (!isSignedIn) {
      router.push("/sign-up")
      return
    }
    setLoading(plan)
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error ?? "Something went wrong")
      }
    } catch {
      toast.error("Checkout failed — try again")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-slate-900">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-500">
            14-day free trial on all plans. Cancel anytime.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(Object.entries(PLANS) as [PlanKey, (typeof PLANS)[PlanKey]][]).map(
            ([key, plan]) => {
              const isGrowth = key === "growth"
              return (
                <Card
                  key={key}
                  className={`relative flex flex-col ${isGrowth ? "border-blue-600 shadow-lg ring-2 ring-blue-600" : ""}`}
                >
                  {isGrowth && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader className="pb-4">
                    <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                      {plan.name}
                    </div>
                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="mb-1 text-slate-400">/mo</span>
                    </div>
                    <p className="text-sm text-slate-500">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="flex-1 space-y-2">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${isGrowth ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                      variant={isGrowth ? "default" : "outline"}
                      disabled={loading === key}
                      onClick={() => handleCheckout(key)}
                    >
                      {loading === key ? "Loading..." : "Start free trial"}
                    </Button>
                  </CardContent>
                </Card>
              )
            }
          )}
        </div>
        <p className="mt-8 text-center text-sm text-slate-400">
          Need a custom managed-service package? Email{" "}
          <a href="mailto:hello@linchpindigital.com" className="text-blue-600 hover:underline">
            hello@linchpindigital.com
          </a>
        </p>
      </div>
    </div>
  )
}
