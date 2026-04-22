import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Globe, Zap, Star, BarChart3, PhoneCall } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Professional Website",
    desc: "Fast, mobile-first websites built for service businesses. Live in 5 days, not 5 months.",
  },
  {
    icon: Star,
    title: "Review Engine",
    desc: "Automated SMS review requests turn satisfied customers into 5-star Google reviews.",
  },
  {
    icon: PhoneCall,
    title: "AI Receptionist",
    desc: "Missed call? Your AI texts back instantly, captures the lead, and schedules the callback.",
  },
  {
    icon: Zap,
    title: "Local SEO",
    desc: "Google Business Profile optimization and citation building so your phone rings more.",
  },
  {
    icon: BarChart3,
    title: "ROI Dashboard",
    desc: "See exactly how many leads, calls, and reviews your Linchpin setup generates monthly.",
  },
  {
    icon: CheckCircle2,
    title: "Done-For-You",
    desc: "You run jobs. We run your marketing. No tech skills required on your end.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero — Ink Black canvas, Signal Red accent */}
      <section className="relative overflow-hidden bg-[#0b0b10] py-24 text-white md:py-32">
        {/* Subtle red accent bar */}
        <div className="absolute left-0 top-0 h-1 w-full bg-[#e4002b]" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#e4002b]/40 bg-[#e4002b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
            <span className="h-1.5 w-1.5 bg-[#e4002b]" />
            Built for DFW trades
          </div>
          <h1 className="mb-6 font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Your business deserves a{" "}
            <span className="text-[#e4002b]">growth engine</span>, not a brochure
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#b3b3bb] md:text-xl">
            Linchpin Digital gives DFW electricians, HVAC, and plumbing companies a modern website, local SEO, an AI receptionist, and a real-time ROI dashboard — all done for you, starting at $99/mo.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-[#e4002b] text-white hover:bg-[#c20024] px-8 h-12 text-base font-semibold">
                Start 14-day trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0b0b10] px-8 h-12 text-base font-semibold">
                See pricing
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#b3b3bb]">14-day trial · Credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-3 font-heading text-3xl text-[#0b0b10] md:text-4xl">
              Everything your business needs to win locally
            </h2>
            <p className="text-lg text-[#4a4a55]">
              One platform. No agency retainers. No tech headaches.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border border-[#e5e5ea] bg-white shadow-none transition-all hover:border-[#e4002b] hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-[#0b0b10] text-[#e4002b]">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg text-[#0b0b10]">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a4a55]">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-[#f4f4f6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-10 font-heading text-2xl text-[#0b0b10] md:text-3xl">
            Trusted by DFW service businesses
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { stat: "14 days", label: "Average website launch time" },
              { stat: "4.9★", label: "Average Google review rating after 90 days" },
              { stat: "3–5×", label: "Increase in monthly lead volume" },
            ].map((item) => (
              <div key={item.label} className="border border-[#e5e5ea] bg-white p-8">
                <div className="font-heading text-4xl text-[#e4002b]">{item.stat}</div>
                <div className="mt-2 text-sm text-[#4a4a55]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0b0b10] py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 font-heading text-3xl md:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mb-8 text-[#b3b3bb]">
            Join trade businesses across DFW who stopped guessing and started growing.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-[#e4002b] text-white hover:bg-[#c20024] px-10 h-12 text-base font-semibold">
              Start your 14-day trial
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
