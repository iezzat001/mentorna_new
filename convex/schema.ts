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
});
