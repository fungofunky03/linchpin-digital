import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  PhoneCall,
  Star,
  Calendar,
  Search,
  BarChart3,
  Wrench,
  ClipboardCheck,
  Wifi,
  Settings2,
  ShieldCheck,
} from "lucide-react"

const painPoints = [
  "Missed calls turning into missed jobs.",
  "Leads sitting in a notebook, an inbox, and a phone — never one place.",
  "Reviews that only happen when a customer feels like it.",
  "A website that looks fine but doesn't actually book work.",
  "Three tools that don't talk to each other and a monthly bill for each one.",
  "No real answer when someone asks where the leads came from this month.",
]

const systems = [
  {
    icon: PhoneCall,
    title: "Lead capture & call coverage",
    desc: "Every call, web form, and Google message lands in one inbox. Missed calls trigger an instant text-back so the lead doesn't go to the next name on the list.",
  },
  {
    icon: ClipboardCheck,
    title: "Follow-up & booking",
    desc: "Automated follow-up sequences for new leads, quotes sent, and no-shows. Online booking and confirmations so jobs land on the calendar without phone tag.",
  },
  {
    icon: Star,
    title: "Review engine",
    desc: "After every closed job, the customer gets a one-tap review request by SMS. Reviews are routed to Google, monitored, and answered — not left to chance.",
  },
  {
    icon: Search,
    title: "Local presence",
    desc: "Google Business Profile tuned weekly, citations cleaned up, and a fast website that ranks for the work you actually want — not vanity keywords.",
  },
  {
    icon: BarChart3,
    title: "Reporting that means something",
    desc: "One monthly report in plain English: calls, leads, booked jobs, reviews, and where they came from. No vanity metrics, no dashboards you'll never open.",
  },
  {
    icon: Settings2,
    title: "The connections in between",
    desc: "Your phone system, CRM, calendar, and inbox wired together so a lead becomes a job without anyone copying and pasting.",
  },
]

const managed = [
  "We monitor the systems daily — if a webhook breaks or a number stops forwarding, we see it before you do.",
  "We update copy, hours, service areas, and seasonal offers without you logging into anything.",
  "We answer reviews, flag urgent ones, and keep your rating climbing.",
  "We tune the automations as your business changes — new tech, new service, new market.",
  "You get one point of contact. Text, call, or email — same person, same week.",
]

const outcomes = [
  {
    title: "Fewer dropped leads",
    desc: "Every call and form submission is captured, acknowledged, and followed up — automatically.",
  },
  {
    title: "More booked jobs from the same leads",
    desc: "Tight follow-up and easy booking turn quotes into work without chasing.",
  },
  {
    title: "A review flywheel that runs itself",
    desc: "Steady, recent 5-star reviews — the kind buyers actually trust.",
  },
  {
    title: "Your evenings back",
    desc: "Stop running marketing after hours. The system runs. We run the system.",
  },
]

const process = [
  {
    step: "01",
    title: "Audit",
    desc: "We map how leads, calls, follow-ups, and reviews move through your business today — and where they leak.",
  },
  {
    step: "02",
    title: "Install",
    desc: "We set up the lead inbox, call coverage, follow-ups, review engine, booking, and reporting — and connect them to the tools you already use.",
  },
  {
    step: "03",
    title: "Manage",
    desc: "We run it from there. Daily monitoring, weekly tuning, monthly report. You stay on tools.",
  },
]

const faqs = [
  {
    q: "Is this just a website?",
    a: "No. A website is one layer. We install and manage the lead, follow-up, review, booking, and reporting systems that decide whether your website actually turns into work. We can build or refresh the site if yours is holding things back.",
  },
  {
    q: "Do I have to switch CRMs or phone systems?",
    a: "Usually not. We connect to what you already use where we can. If something is genuinely broken or costing you leads, we'll say so and lay out the options.",
  },
  {
    q: "How is this different from hiring a marketing agency?",
    a: "Most agencies sell campaigns and reports. We install operational systems and run them for you — call coverage, follow-up, reviews, reporting, the connections in between. The goal is fewer dropped leads, not more impressions.",
  },
  {
    q: "Will I be locked into a long contract?",
    a: "No. Month-to-month after the initial setup. If we aren't earning our keep, you should be able to leave.",
  },
  {
    q: "Are you only working with DFW trades?",
    a: "We started with electricians, plumbers, and HVAC in the Dallas–Fort Worth area, but we work with skilled trade businesses anywhere in the U.S. Local SEO is tuned to wherever you actually want jobs.",
  },
  {
    q: "What does 'pre-launch pilot' mean?",
    a: "We're taking on a small number of trade businesses at founding-pilot pricing while we finalize the standard package. You get the full installed system, hands-on setup, and direct access to the founder. In return we'd ask for honest feedback.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b0b10] py-24 text-white md:py-32">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#e4002b]" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#e4002b]/40 bg-[#e4002b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
            <span className="h-1.5 w-1.5 bg-[#e4002b]" />
            Done-for-you · Built for trades
          </div>
          <h1 className="mb-6 font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
            The digital side of your business,{" "}
            <span className="text-[#e4002b]">handled.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#b3b3bb] md:text-xl">
            Linchpin installs and runs the systems that keep leads, follow-ups, scheduling, reviews, and reporting moving — so you can stay on tools, not on your phone.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="#contact">
              <Button size="lg" className="bg-[#e4002b] text-white hover:bg-[#c20024] px-8 h-12 text-base font-semibold">
                Book a 20-minute fit call
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0b0b10] px-8 h-12 text-base font-semibold">
                See how it works
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#b3b3bb]">No long contracts · Founder-led setup · Month-to-month after install</p>
        </div>
      </section>

      {/* Owner pain */}
      <section id="pain" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              If any of this sounds familiar
            </div>
            <h2 className="font-heading text-3xl text-[#0b0b10] md:text-4xl">
              You don't have a marketing problem. You have a systems problem.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 border border-[#e5e5ea] bg-[#f4f4f6] p-5"
              >
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#e4002b]" />
                <p className="text-base text-[#0b0b10]">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-base text-[#4a4a55] md:text-lg">
            Adding another tool won't fix it. Hiring an agency to run ads on top of a leaky funnel won't fix it. The fix is an installed, monitored system that turns calls into jobs without you in the middle of every step.
          </p>
        </div>
      </section>

      {/* Installed systems / mechanism */}
      <section id="how-it-works" className="bg-[#f4f4f6] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 max-w-3xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              The installed system
            </div>
            <h2 className="mb-4 font-heading text-3xl text-[#0b0b10] md:text-4xl">
              Six systems, wired together, running every day.
            </h2>
            <p className="text-lg text-[#4a4a55]">
              We don't sell tools. We install the operational layer that sits underneath your trade business and keeps it moving while you're on a job.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((s) => (
              <Card
                key={s.title}
                className="border border-[#e5e5ea] bg-white shadow-none transition-all hover:border-[#e4002b] hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-[#0b0b10] text-[#e4002b]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg text-[#0b0b10]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a4a55]">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Managed services */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              Managed, not handed off
            </div>
            <h2 className="mb-5 font-heading text-3xl text-[#0b0b10] md:text-4xl">
              Install isn't the job. Running it is.
            </h2>
            <p className="mb-4 text-lg text-[#4a4a55]">
              Most setups fall apart in month two — a number stops forwarding, a webhook breaks, hours change for a holiday and nobody updates them.
            </p>
            <p className="text-lg text-[#4a4a55]">
              We watch your system every day, fix what breaks, and tune what's working. You shouldn't have to log into anything to keep your business running online.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {managed.map((m) => (
              <li
                key={m}
                className="flex items-start gap-3 border-l-2 border-[#e4002b] bg-[#f4f4f6] p-5"
              >
                <Wifi className="mt-0.5 h-5 w-5 shrink-0 text-[#e4002b]" />
                <span className="text-base text-[#0b0b10]">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#0b0b10] py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 max-w-3xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              What changes for you
            </div>
            <h2 className="font-heading text-3xl md:text-4xl">
              Less time on the phone. More work on the books.
            </h2>
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o.title} className="bg-[#0b0b10] p-8">
                <h3 className="mb-2 font-heading text-xl text-white">{o.title}</h3>
                <p className="text-[#b3b3bb]">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              How we work
            </div>
            <h2 className="font-heading text-3xl text-[#0b0b10] md:text-4xl">
              Audit. Install. Manage.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="border border-[#e5e5ea] bg-white p-8">
                <div className="mb-4 font-heading text-5xl text-[#e4002b]">{p.step}</div>
                <h3 className="mb-2 font-heading text-xl text-[#0b0b10]">{p.title}</h3>
                <p className="text-[#4a4a55]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk reversal / pre-launch pilot */}
      <section className="bg-[#f4f4f6] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="border-2 border-[#0b0b10] bg-white p-8 md:p-12">
            <div className="mb-3 inline-flex items-center gap-2 border border-[#e4002b]/40 bg-[#e4002b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              <span className="h-1.5 w-1.5 bg-[#e4002b]" />
              Founding pilot
            </div>
            <h2 className="mb-4 font-heading text-3xl text-[#0b0b10] md:text-4xl">
              We're taking on a small group of trade businesses to start.
            </h2>
            <p className="mb-4 text-lg text-[#4a4a55]">
              Linchpin is pre-launch. We're working with a limited number of electricians, plumbers, and HVAC owners at founding-pilot pricing while we finalize the standard package.
            </p>
            <p className="mb-8 text-lg text-[#4a4a55]">
              You get the full installed system, founder-led setup, and direct access for questions. In return we ask for honest feedback as we tune the offering. Month-to-month after install — if the system isn't paying for itself, you shouldn't keep paying for it.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#contact">
                <Button size="lg" className="bg-[#e4002b] text-white hover:bg-[#c20024] px-8 h-12 text-base font-semibold">
                  Apply for the pilot
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-[#4a4a55]">
                <ShieldCheck className="h-4 w-4 text-[#0b0b10]" />
                No long contracts. Month-to-month after install.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
              Straight answers
            </div>
            <h2 className="font-heading text-3xl text-[#0b0b10] md:text-4xl">
              Questions owners actually ask.
            </h2>
          </div>
          <div className="divide-y divide-[#e5e5ea] border-y border-[#e5e5ea]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <h3 className="font-heading text-lg text-[#0b0b10]">{f.q}</h3>
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-[#0b0b10] text-[#0b0b10] transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[#4a4a55]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / contact */}
      <section id="contact" className="bg-[#0b0b10] py-20 text-white md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#e4002b]/40 bg-[#e4002b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e4002b]">
            <Wrench className="h-3 w-3" />
            Talk to the founder
          </div>
          <h2 className="mb-4 font-heading text-3xl md:text-5xl">
            Twenty minutes. Honest read on whether we can help.
          </h2>
          <p className="mb-8 text-lg text-[#b3b3bb]">
            Tell us where leads are leaking today. If Linchpin is a fit, we'll lay out exactly what we'd install and run for you. If it's not, we'll say so.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="mailto:hello@linchpindigital.co?subject=Linchpin%20pilot%20-%20fit%20call">
              <Button size="lg" className="bg-[#e4002b] text-white hover:bg-[#c20024] px-8 h-12 text-base font-semibold">
                Email hello@linchpindigital.co
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0b0b10] px-8 h-12 text-base font-semibold">
                See pilot pricing
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#b3b3bb]">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#e4002b]" />
              Usually replies same business day
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
