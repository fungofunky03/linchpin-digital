import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 hover:bg-blue-500/20">
            Built for DFW trades
          </Badge>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your business deserves a{" "}
            <span className="text-blue-400">growth engine</span>, not a brochure
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Linchpin Digital gives DFW electricians, HVAC, and plumbing companies a
            modern website, local SEO, an AI receptionist, and a real-time ROI
            dashboard — all done for you, starting at $99/mo.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
                Start free trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                See pricing
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">14-day free trial · No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">
              Everything your business needs to win locally
            </h2>
            <p className="text-lg text-slate-500">
              One platform. No agency retainers. No tech headaches.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-0 bg-slate-50">
                <CardContent className="p-6">
                  <f.icon className="mb-3 h-8 w-8 text-blue-600" />
                  <h3 className="mb-2 font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Trusted by DFW service businesses
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { stat: "14 days", label: "Average website launch time" },
              { stat: "4.9★", label: "Average Google review rating after 90 days" },
              { stat: "3–5×", label: "Increase in monthly lead volume" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl font-extrabold text-blue-600">{item.stat}</div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Ready to grow your business?</h2>
          <p className="mb-8 text-blue-100">
            Join trade businesses across DFW who stopped guessing and started growing.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-10">
              Start your free 14-day trial
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
