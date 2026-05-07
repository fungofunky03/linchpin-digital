import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { auth } = await import("@clerk/nextjs/server")
  const { userId } = await auth()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-[#e5e5ea] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center" aria-label="Linchpin Digital home">
            <Image
              src="/brand/logo.svg"
              alt="Linchpin Digital"
              width={180}
              height={38}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/#how-it-works" className="text-sm font-medium text-[#0b0b10] hover:text-[#e4002b] transition-colors">
              How it works
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[#0b0b10] hover:text-[#e4002b] transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-[#0b0b10] hover:text-[#e4002b] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {userId ? (
              <>
                <Link href="/dashboard">
                  <Button size="sm" variant="outline" className="border-[#0b0b10] text-[#0b0b10] hover:bg-[#0b0b10] hover:text-white">
                    Dashboard
                  </Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in" className="hidden sm:inline-block">
                  <Button variant="ghost" size="sm" className="text-[#0b0b10] hover:text-[#e4002b]">
                    Sign in
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button size="sm" className="bg-[#e4002b] text-white hover:bg-[#c20024]">
                    Book a fit call
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#e5e5ea] bg-[#0b0b10] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
          <div>
            <Image
              src="/brand/logo-dark.svg"
              alt="Linchpin Digital"
              width={160}
              height={34}
              className="mb-4 h-8 w-auto"
            />
            <p className="max-w-xs text-sm text-[#b3b3bb]">
              Done-for-you digital management for trade business owners. We install and run the systems your business needs to keep moving.
            </p>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b3b3bb]">
              Site
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-white hover:text-[#e4002b]">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white hover:text-[#e4002b]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-white hover:text-[#e4002b]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white hover:text-[#e4002b]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#b3b3bb]">
              Get in touch
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@linchpindigital.co"
                  className="text-white hover:text-[#e4002b]"
                >
                  hello@linchpindigital.co
                </a>
              </li>
              <li className="text-[#b3b3bb]">Built for trade businesses across the U.S.</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6">
          <p className="text-xs text-[#b3b3bb]">
            © {new Date().getFullYear()} Linchpin Digital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
