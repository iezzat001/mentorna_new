/**
 * Convex client singleton & typed function references.
 *
 * Until `npx convex dev` is connected to a deployment (which populates
 * convex/_generated/api), we use `makeFunctionReference` to create
 * FunctionReference objects that useQuery / useMutation accept.
 *
 * Once codegen exists, replace these with imports from
 * `../../convex/_generated/api`.
 */

import { ConvexReactClient } from "convex/react";
import { makeFunctionReference } from "convex/server";

/* ------------------------------------------------------------------ */
/*  Client instance                                                    */
/* ------------------------------------------------------------------ */

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL as string;

if (!CONVEX_URL) {
  console.warn(
    "[Convex] VITE_CONVEX_URL is not set. " +
      "Convex queries/mutations will not work until a deployment URL is configured.",
  );
}

export const convex = new ConvexReactClient(CONVEX_URL ?? "https://placeholder.convex.cloud");

/* ------------------------------------------------------------------ */
/*  Function references  (mirrors convex/_generated/api)               */
/* ------------------------------------------------------------------ */

export const api = {
  founders: {
    listActive: makeFunctionReference<"query">("founders:listActive"),
  },
  waitingList: {
    add: makeFunctionReference<"mutation">("waitingList:add"),
    list: makeFunctionReference<"query">("waitingList:list"),
  },
  leads: {
    create: makeFunctionReference<"mutation">("leads:create"),
    list: makeFunctionReference<"query">("leads:list"),
  },
  newsletterSubscribers: {
    subscribe: makeFunctionReference<"mutation">("newsletterSubscribers:subscribe"),
    list: makeFunctionReference<"query">("newsletterSubscribers:list"),
  },
  signedContracts: {
    create: makeFunctionReference<"mutation">("signedContracts:create"),
    list: makeFunctionReference<"query">("signedContracts:list"),
    updateStatus: makeFunctionReference<"mutation">("signedContracts:updateStatus"),
  },
  valuationSubmissions: {
    create: makeFunctionReference<"mutation">("valuationSubmissions:create"),
    list: makeFunctionReference<"query">("valuationSubmissions:list"),
  },
  visitorTracking: {
    track: makeFunctionReference<"mutation">("visitorTracking:track"),
    list: makeFunctionReference<"query">("visitorTracking:list"),
    listSince: makeFunctionReference<"query">("visitorTracking:listSince"),
  },
  emailCampaigns: {
    list: makeFunctionReference<"query">("emailCampaigns:list"),
    create: makeFunctionReference<"mutation">("emailCampaigns:create"),
    remove: makeFunctionReference<"mutation">("emailCampaigns:remove"),
    sendCampaign: makeFunctionReference<"action">("emailCampaigns:sendCampaign"),
  },
} as const;
