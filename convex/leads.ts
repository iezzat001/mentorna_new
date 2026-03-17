import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

/**
 * Capture a lead from a lead-magnet page.
 *
 * Convex equivalent of:
 *   supabase.from('magnet_leads').insert([{ email, whatsapp, source }])
 *
 * Enforces the same CHECK constraint as Supabase:
 *   at least one of email or whatsapp must be provided.
 */
export const create = mutationGeneric({
  args: {
    email: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    // Enforce: at least one contact method required
    if (!args.email && !args.whatsapp) {
      throw new Error("At least one of email or whatsapp must be provided.");
    }

    return await ctx.db.insert("leads", {
      email: args.email,
      whatsapp: args.whatsapp,
      source: args.source,
    });
  },
});
