import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">Linchpin</span>
            <span className="rounded bg-blue-600 px-1.5 py-0.5 text-xs font-semibold text-white">
              Digital
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm text-slate-600 hover:text-slate-900">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {userId ? (
              <>
                <Link href="/dashboard">
                  <Button size="sm" variant="outline">
                    Dashboard
                  </Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Linchpin Digital. Built for DFW trades.
        </div>
      </footer>
    </div>
  )
}
