import { queryGeneric, mutationGeneric, actionGeneric, internalMutationGeneric } from "convex/server";
import { v } from "convex/values";

/* ------------------------------------------------------------------ */
/*  Queries                                                            */
/* ------------------------------------------------------------------ */

/**
 * List all email campaigns, newest first.
 */
export const list = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const campaigns = await ctx.db
      .query("emailCampaigns")
      .order("desc")
      .collect();
    return campaigns;
  },
});

/* ------------------------------------------------------------------ */
/*  Mutations                                                          */
/* ------------------------------------------------------------------ */

/**
 * Create a new email campaign (draft).
 */
export const create = mutationGeneric({
  args: {
    title: v.string(),
    subject: v.string(),
    content: v.string(),
    recipientGroup: v.union(v.literal("newsletter"), v.literal("waiting_list")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailCampaigns", {
      title: args.title,
      subject: args.subject,
      content: args.content,
      recipientGroup: args.recipientGroup,
      status: "draft",
      sentCount: 0,
    });
  },
});

/**
 * Delete an email campaign.
 */
export const remove = mutationGeneric({
  args: {
    id: v.id("emailCampaigns"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * Internal mutation to update campaign status after sending.
 * Called by the sendCampaign action.
 */
export const updateStatus = internalMutationGeneric({
  args: {
    id: v.id("emailCampaigns"),
    status: v.union(
      v.literal("draft"),
      v.literal("sending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
    sentCount: v.optional(v.number()),
    sentAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = { status: args.status };
    if (args.sentCount !== undefined) patch.sentCount = args.sentCount;
    if (args.sentAt !== undefined) patch.sentAt = args.sentAt;
    await ctx.db.patch(args.id, patch);
  },
});

/* ------------------------------------------------------------------ */
/*  Action — send campaign emails via Resend                           */
/* ------------------------------------------------------------------ */

/**
 * Send an email campaign to all recipients in the chosen group.
 *
 * This is a Convex **action** (not a mutation) because it calls the
 * external Resend API.  It reads recipients from the DB via
 * internal queries, then sends batched emails.
 *
 * Required environment variable: RESEND_API_KEY
 */
export const sendCampaign = actionGeneric({
  args: {
    campaignId: v.id("emailCampaigns"),
    subject: v.string(),
    content: v.string(),
    recipientGroup: v.union(v.literal("newsletter"), v.literal("waiting_list")),
    fromEmail: v.string(),
    fromName: v.string(),
  },
  handler: async (ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      // Mark campaign as failed
      await ctx.runMutation("emailCampaigns:updateStatus" as any, {
        id: args.campaignId,
        status: "failed",
      });
      throw new Error("RESEND_API_KEY environment variable is not set.");
    }

    // Mark campaign as sending
    await ctx.runMutation("emailCampaigns:updateStatus" as any, {
      id: args.campaignId,
      status: "sending",
    });

    // Fetch recipients from the appropriate table
    let recipients: { email: string; name?: string }[] = [];

    if (args.recipientGroup === "newsletter") {
      const subs: any[] = await ctx.runQuery("newsletterSubscribers:list" as any, {});
      recipients = subs.map((s: any) => ({ email: s.email, name: s.name }));
    } else {
      const waitlist: any[] = await ctx.runQuery("waitingList:list" as any, {});
      recipients = waitlist.map((w: any) => ({ email: w.email, name: w.name }));
    }

    if (recipients.length === 0) {
      await ctx.runMutation("emailCampaigns:updateStatus" as any, {
        id: args.campaignId,
        status: "failed",
      });
      return { success: false, error: "No recipients found", sentCount: 0, failedCount: 0 };
    }

    // Send emails in batches via Resend REST API
    const batchSize = 50;
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map(async (recipient) => {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `${args.fromName} <${args.fromEmail}>`,
              to: [recipient.email],
              subject: args.subject,
              html: args.content,
            }),
          });

          if (!res.ok) {
            const body = await res.text();
            throw new Error(`Resend API ${res.status}: ${body}`);
          }

          return res.json();
        }),
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          sentCount++;
        } else {
          failedCount++;
          console.error("Email send failed:", result.reason);
        }
      }
    }

    // Update campaign with final status
    const finalStatus = sentCount > 0 ? "sent" : "failed";

    await ctx.runMutation("emailCampaigns:updateStatus" as any, {
      id: args.campaignId,
      status: finalStatus,
      sentCount,
      sentAt: Date.now(),
    });

    return {
      success: true,
      sentCount,
      failedCount,
      totalRecipients: recipients.length,
    };
  },
});
