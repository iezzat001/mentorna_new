import { queryGeneric } from "convex/server";

/**
 * List all active founders ordered by orderIndex.
 *
 * Convex equivalent of:
 *   supabase.from('founders').select('*').eq('is_active', true).order('order_index')
 */
export const listActive = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const founders = await ctx.db
      .query("founders")
      .withIndex("by_active_order", (q: any) => q.eq("isActive", true))
      .collect();

    // Sort by orderIndex (the index guarantees isActive=true, ordering by orderIndex)
    return founders.sort(
      (a: any, b: any) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0),
    );
  },
});
