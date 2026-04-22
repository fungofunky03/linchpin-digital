import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "@/db/schema"

// Lazy singleton — prevents build-time failures when DATABASE_URL is absent
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined
  db: NodePgDatabase<typeof schema> | undefined
}

function getDb(): NodePgDatabase<typeof schema> {
  if (!globalForDb.db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set. Add it to your .env.local or Vercel environment.")
    }
    globalForDb.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
    globalForDb.db = drizzle(globalForDb.pool, { schema })
  }
  return globalForDb.db
}

// Proxy that defers initialization to first DB call
export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    return (getDb() as any)[prop]
  },
})
