import type { Metadata } from "next"
import { Archivo_Black, Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Linchpin Digital — Done-for-you digital management for trade businesses",
    template: "%s | Linchpin Digital",
  },
  description:
    "We install and run the systems that keep leads, follow-ups, scheduling, reviews, and reporting moving — so trade business owners can stay on tools, not on their phones.",
  keywords: [
    "managed digital operations",
    "trade business automation",
    "lead management for contractors",
    "electrician operations",
    "plumber operations",
    "HVAC operations",
    "review automation for trades",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivoBlack.variable}`}>
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
