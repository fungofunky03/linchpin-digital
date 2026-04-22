import {
  pgSchema,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core"

// Use a dedicated schema to isolate Linchpin tables from other projects
const linchpin = pgSchema("linchpin")

// ─── Enums ───────────────────────────────────────────────────────────────────
export const planEnum = linchpin.enum("plan", ["starter", "growth", "pro"])
export const subscriptionStatusEnum = linchpin.enum("subscription_status", [
  "active",
  "trialing",
  "past_due",
  "canceled",
  "incomplete",
  "unpaid",
])

// ─── Users ───────────────────────────────────────────────────────────────────
// Clerk is the source of truth for identity. This table stores
// Linchpin-specific data keyed to the Clerk user ID.
export const users = linchpin.table("users", {
  id: text("id").primaryKey(), // Clerk user ID (user_xxx)
  email: text("email").notNull().unique(),
  name: text("name"),
  companyName: text("company_name"),         // Their trade business name
  phone: text("phone"),
  industry: text("industry"),                // electrical | hvac | plumbing | etc.
  website: text("website"),

  // Stripe
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
  plan: planEnum("plan").default("starter"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status"),

  // Onboarding
  onboardingCompleted: boolean("onboarding_completed").default(false),
  onboardingStep: integer("onboarding_step").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ─── Leads ───────────────────────────────────────────────────────────────────
// Leads captured via AI receptionist or contact forms (Growth/Pro only)
export const leads = linchpin.table("leads", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  message: text("message"),
  source: text("source"),         // website | google | yelp | etc.
  status: text("status").default("new"), // new | contacted | qualified | closed
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Reviews ─────────────────────────────────────────────────────────────────
// Review requests sent to customers (Growth/Pro only)
export const reviewRequests = linchpin.table("review_requests", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  customerEmail: text("customer_email"),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  clickedAt: timestamp("clicked_at"),
  reviewedAt: timestamp("reviewed_at"),
})

// ─── Audit Log ───────────────────────────────────────────────────────────────
// Stripe webhook events — stored for idempotency
export const stripeEvents = linchpin.table("stripe_events", {
  id: text("id").primaryKey(), // Stripe event ID (evt_xxx)
  type: text("type").notNull(),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
