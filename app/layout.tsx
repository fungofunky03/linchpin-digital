import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Linchpin Digital — Growth Engine for DFW Trade Businesses",
    template: "%s | Linchpin Digital",
  },
  description:
    "Modern websites, local SEO, AI receptionist, and a real-time ROI dashboard built for electricians, HVAC, and plumbing businesses in the DFW area.",
  keywords: ["local SEO", "trades marketing", "electrician website", "HVAC marketing", "DFW"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
