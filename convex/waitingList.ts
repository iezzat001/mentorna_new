import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

/**
 * Add a parent to the bootcamp waiting list.
 *
 * Convex equivalent of:
 *   supabase.from('waiting_list').insert({ ... })
 */
export const add = mutationGeneric({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("waitingList", {
      name: args.name,
      email: args.email,
      whatsapp: args.whatsapp,
      childrenCount: args.childrenCount,
      ageGroups: args.ageGroups,
      codingExperience: args.codingExperience,
      englishLevel: args.englishLevel,
      relationship: args.relationship,
      country: args.country,
      preferredDays: args.preferredDays,
    });
  },
});
