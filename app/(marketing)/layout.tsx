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
            <Link href="/#features" className="text-sm font-medium text-[#0b0b10] hover:text-[#e4002b] transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[#0b0b10] hover:text-[#e4002b] transition-colors">
              Pricing
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
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="text-[#0b0b10] hover:text-[#e4002b]">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-[#e4002b] text-white hover:bg-[#c20024]">
                    Start trial
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#e5e5ea] bg-[#0b0b10] py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
          <Image
            src="/brand/logo-dark.svg"
            alt="Linchpin Digital"
            width={160}
            height={34}
            className="h-8 w-auto"
          />
          <p className="text-sm text-[#b3b3bb]">
            © {new Date().getFullYear()} Linchpin Digital. Built for DFW trades.
          </p>
        </div>
      </footer>
    </div>
  )
}
