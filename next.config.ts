import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {},
  // Expose server env vars to the Next.js build workers.
  // This is required for Clerk v7 which validates CLERK_SECRET_KEY at module load time.
  // These values are NOT exposed to the browser — only to the Node.js server/build workers.
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ?? "",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    STRIPE_STARTER_PRICE_ID: process.env.STRIPE_STARTER_PRICE_ID ?? "",
    STRIPE_GROWTH_PRICE_ID: process.env.STRIPE_GROWTH_PRICE_ID ?? "",
    STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID ?? "",
  },
}

export default nextConfig
