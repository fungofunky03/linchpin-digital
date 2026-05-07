"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck } from "lucide-react"
import { PLANS, type PlanKey } from "@/lib/stripe"
import { toast } from "sonner"

const fitNotes: Record<PlanKey, string> = {
  starter:
    "For solo operators or small crews who need the basics installed and managed without learning new tools.",
  growth:
    "Most owners start here. The full operating system, monitored and tuned by us.",
  pro:
    "When the website is part of the problem and you want everything — site, system, and integrations — on one team.",
}

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
      toast.error("Could not start checkout — email hello@linchpindigital.co")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border border-[#e4002b]/40 bg-[#e4002b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
            <span className="h-1.5 w-1.5 bg-[#e4002b]" />
            Founding pilot pricing
          </div>
          <h1 className="mb-3 font-heading text-4xl text-[#0b0b10] md:text-5xl">
            Pick the layer of your business you want handled.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#4a4a55]">
            Every plan includes founder-led setup, daily monitoring, and direct access. Month-to-month after install.
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
                    isGrowth ? "border-[#e4002b] shadow-xl" : "border-[#e5e5ea]"
                  }`}
                >
                  {isGrowth && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e4002b] text-white hover:bg-[#e4002b]">
                      Most owners start here
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
                    <p className="mt-2 text-xs italic text-[#4a4a55]">
                      {fitNotes[key]}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-sm text-[#0b0b10]"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#e4002b]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                      <Link href="/#contact">
                        <Button
                          className={`w-full h-11 font-semibold ${
                            isGrowth
                              ? "bg-[#e4002b] text-white hover:bg-[#c20024]"
                              : "bg-[#0b0b10] text-white hover:bg-[#1a1a22]"
                          }`}
                        >
                          Apply for the pilot
                        </Button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCheckout(key)}
                        disabled={loading === key}
                        className="text-center text-xs text-[#4a4a55] hover:text-[#e4002b] hover:underline disabled:opacity-50"
                      >
                        {loading === key
                          ? "Opening checkout…"
                          : "Already onboarded? Start subscription"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )
            }
          )}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 border border-[#e5e5ea] bg-[#f4f4f6] p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e4002b]" />
            <div>
              <div className="font-heading text-sm text-[#0b0b10]">No long contracts</div>
              <p className="mt-1 text-xs text-[#4a4a55]">
                One-time setup, then month-to-month. Cancel any month going forward.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-[#e5e5ea] bg-[#f4f4f6] p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e4002b]" />
            <div>
              <div className="font-heading text-sm text-[#0b0b10]">Founder-led setup</div>
              <p className="mt-1 text-xs text-[#4a4a55]">
                You're talking to the person installing the system, not a junior account rep.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-[#e5e5ea] bg-[#f4f4f6] p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e4002b]" />
            <div>
              <div className="font-heading text-sm text-[#0b0b10]">Honest fit check first</div>
              <p className="mt-1 text-xs text-[#4a4a55]">
                If we're not the right call for your business, we'll say so on the first call.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-[#4a4a55]">
          Need a custom managed package — multi-location, franchise, or specialty trade? Email{" "}
          <a
            href="mailto:hello@linchpindigital.co"
            className="font-semibold text-[#e4002b] hover:underline"
          >
            hello@linchpindigital.co
          </a>
        </p>
      </div>
    </div>
  )
}
