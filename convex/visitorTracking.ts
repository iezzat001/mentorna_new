import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

/**
 * Record a page visit.
 *
 * Convex equivalent of the Supabase Edge Function "track-visitor".
 * Note: IP hashing and geolocation were handled server-side in the
 * Edge Function. In the Convex version, those fields are omitted
 * because Convex mutations don't have access to raw HTTP headers.
 * Country may be supplied by the client if available.
 */
export const track = mutationGeneric({
  args: {
    sessionId: v.string(),
    pagePath: v.string(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    deviceType: v.optional(v.string()),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("visitorTracking", {
      sessionId: args.sessionId,
      pagePath: args.pagePath,
      referrer: args.referrer,
      userAgent: args.userAgent,
      deviceType: args.deviceType,
      country: args.country,
    });
  },
});

/**
 * List all visitor tracking records, newest first.
 *
 * Used by the analytics dashboard to compute live visitors,
 * daily/weekly/monthly breakdowns, device stats, etc.
 */
export const list = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const records = await ctx.db
      .query("visitorTracking")
      .order("desc")
      .collect();
    return records;
  },
});

/**
 * List visitor records created after a given timestamp.
 *
 * Useful for fetching only recent records (e.g. last 5 minutes
 * for live visitors, or last 7 days for daily breakdown).
 */
export const listSince = queryGeneric({
  args: {
    since: v.number(),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("visitorTracking")
      .order("desc")
      .collect();
    // Filter by _creationTime (Convex system field)
    return records.filter((r: any) => r._creationTime >= args.since);
  },
});
