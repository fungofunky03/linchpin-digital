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
    <div className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-14 text-center">
          <h1 className="mb-3 font-heading text-4xl text-[#0b0b10] md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-[#4a4a55]">
            14-day trial on all plans. Credit card required. Cancel anytime.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(Object.entries(PLANS) as [PlanKey, (typeof PLANS)[PlanKey]][]).map(
            ([key, plan]) => {
              const isGrowth = key === "growth"
              return (
                <Card
                  key={key}
                  className={`relative flex flex-col border-2 ${
                    isGrowth
                      ? "border-[#e4002b] shadow-xl"
                      : "border-[#e5e5ea]"
                  }`}
                >
                  {isGrowth && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e4002b] text-white hover:bg-[#e4002b]">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader className="pb-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
                      {plan.name}
                    </div>
                    <div className="mt-2 flex items-end gap-1">
                      <span className="font-heading text-5xl text-[#0b0b10]">
                        ${plan.price}
                      </span>
                      <span className="mb-2 text-[#4a4a55]">/mo</span>
                    </div>
                    <p className="text-sm text-[#4a4a55]">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-[#0b0b10]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e4002b]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full h-11 font-semibold ${
                        isGrowth
                          ? "bg-[#e4002b] text-white hover:bg-[#c20024]"
                          : "bg-[#0b0b10] text-white hover:bg-[#1a1a22]"
                      }`}
                      disabled={loading === key}
                      onClick={() => handleCheckout(key)}
                    >
                      {loading === key ? "Loading..." : "Start 14-day trial"}
                    </Button>
                  </CardContent>
                </Card>
              )
            }
          )}
        </div>
        <p className="mt-10 text-center text-sm text-[#4a4a55]">
          Need a custom managed-service package? Email{" "}
          <a href="mailto:hello@linchpindigital.com" className="font-semibold text-[#e4002b] hover:underline">
            hello@linchpindigital.com
          </a>
        </p>
      </div>
    </div>
  )
}
