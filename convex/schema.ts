import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Mentorna Convex Schema — Phase 1: Core Tables
 *
 * Migrated from Supabase PostgreSQL. See SUPABASE_SCHEMA_AUDIT.md for the
 * full source-of-truth mapping.
 *
 * Conventions:
 *  - `_id` and `_creationTime` are Convex system fields (replace Supabase
 *    `id` UUID and `created_at` TIMESTAMPTZ respectively).
 *  - Field names use camelCase (JS convention) instead of snake_case.
 *  - Supabase ENUMs become `v.union(v.literal(...), ...)`.
 *  - Supabase `TEXT[]` becomes `v.array(v.string())`.
 *  - Foreign keys become `v.id("tableName")`.
 *  - `CHECK` constraints are enforced in mutation functions, not in schema.
 */

export default defineSchema({
  // ───────────────────────────────────────────────
  // founders — Team member / founder profiles
  // ───────────────────────────────────────────────
  founders: defineTable({
    name: v.string(),
    title: v.string(),
    shortBio: v.string(),
    extendedBio: v.string(),
    imageUrl: v.string(),
    linkedinUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    tiktokUrl: v.optional(v.string()),
    isActive: v.boolean(),
    orderIndex: v.number(),
    updatedAt: v.number(),
  })
    .index("by_active_order", ["isActive", "orderIndex"])
    .index("by_order", ["orderIndex"]),

  // ───────────────────────────────────────────────
  // waitingList — Parent waitlist sign-ups
  // (Supabase: waiting_list)
  // ───────────────────────────────────────────────
  waitingList: defineTable({
    name: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    childrenCount: v.string(),
    ageGroups: v.array(v.string()),
    codingExperience: v.string(),
    englishLevel: v.optional(v.string()),
    relationship: v.optional(v.string()),
    country: v.optional(v.string()),
    preferredDays: v.optional(v.array(v.string())),
  })
    .index("by_email", ["email"])
    .index("by_country", ["country"]),

  // ───────────────────────────────────────────────
  // leads — Lead-magnet contact captures
  // (Supabase: magnet_leads)
  //
  // NOTE: The Supabase CHECK constraint
  //   (email IS NOT NULL OR whatsapp IS NOT NULL)
  // must be enforced in the mutation that inserts leads.
  // ───────────────────────────────────────────────
  leads: defineTable({
    email: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    source: v.string(),
  })
    .index("by_source", ["source"])
    .index("by_email", ["email"]),

  // ───────────────────────────────────────────────
  // newsletterSubscribers — Newsletter sign-ups
  // (Supabase: newsletter_subscribers)
  // ───────────────────────────────────────────────
  newsletterSubscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    interestedInWebinar: v.boolean(),
  })
    .index("by_email", ["email"]),

  // ───────────────────────────────────────────────
  // signedContracts — Mentorship agreements
  // (Supabase: signed_contracts)
  // ───────────────────────────────────────────────
  signedContracts: defineTable({
    fullName: v.string(),
    email: v.string(),
    whatsapp: v.optional(v.string()),
    telegram: v.optional(v.string()),
    address: v.optional(v.string()),
    signature: v.string(),
    offerType: v.string(),
    totalAmount: v.number(),
    currency: v.string(),
    installmentAmount: v.number(),
    installmentsCount: v.number(),
    agreedTerms: v.object({
      sessions_commitment: v.boolean(),
      tasks_commitment: v.boolean(),
      payment_agreement: v.boolean(),
    }),
    signedAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("refunded"),
      v.literal("cancelled"),
    ),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_signedAt", ["signedAt"]),

  // ───────────────────────────────────────────────
  // valuationSubmissions — Startup valuation calculator results
  // (Supabase: valuation_submissions)
  //
  // NOTE: leadId references the `leads` table.
  //       CHECK constraints (>= 0, dilution 0-100) are
  //       enforced in the mutation function.
  // ───────────────────────────────────────────────
  valuationSubmissions: defineTable({
    leadId: v.optional(v.id("leads")),
    mrr: v.number(),
    industry: v.string(),
    growthRate: v.number(),
    investmentAmount: v.number(),
    baseValuation: v.number(),
    growthAdjustedValuation: v.number(),
    postMoneyValuation: v.number(),
    dilutionPercent: v.number(),
  })
    .index("by_leadId", ["leadId"])
    .index("by_industry", ["industry"]),

  // ───────────────────────────────────────────────
  // visitorTracking — Page-view & session analytics
  // (Supabase: visitor_analytics)
  //
  // Replaces the Supabase Edge Function "track-visitor".
  // IP hashing is done client-side or omitted (Convex
  // mutations don't receive raw HTTP headers).
  // ───────────────────────────────────────────────
  visitorTracking: defineTable({
    sessionId: v.string(),
    pagePath: v.string(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    deviceType: v.optional(v.string()),
    country: v.optional(v.string()),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_pagePath", ["pagePath"]),

  // ───────────────────────────────────────────────
  // emailCampaigns — Marketing email campaigns
  // (Supabase: email_campaigns)
  //
  // Replaces the Supabase Edge Function "send-marketing-email".
  // Actual email dispatch is handled by a Convex action
  // that calls the Resend API.
  // ───────────────────────────────────────────────
  emailCampaigns: defineTable({
    title: v.string(),
    subject: v.string(),
    content: v.string(),
    recipientGroup: v.union(v.literal("newsletter"), v.literal("waiting_list")),
    status: v.union(
      v.literal("draft"),
      v.literal("sending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
    sentCount: v.number(),
    sentAt: v.optional(v.number()),
  })
    .index("by_status", ["status"]),
});
