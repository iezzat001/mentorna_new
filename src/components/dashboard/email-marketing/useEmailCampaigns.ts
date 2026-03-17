import { useQuery as useConvexQuery, useMutation, useAction } from 'convex/react';
import { api } from '@/lib/convex';
import { toast } from 'sonner';
import { EmailCampaignFormData } from './types';

export const useEmailCampaigns = () => {
  // ── Queries ──────────────────────────────────────────────────────────
  const rawCampaigns = useConvexQuery(api.emailCampaigns.list) ?? [];
  const newsletterSubs = useConvexQuery(api.newsletterSubscribers.list) ?? [];
  const waitingListEntries = useConvexQuery(api.waitingList.list) ?? [];

  const isLoading = rawCampaigns === undefined;

  // Map Convex records to the shape the UI components expect
  const campaigns = rawCampaigns.map((c: any) => ({
    id: c._id,
    title: c.title,
    subject: c.subject,
    content: c.content,
    recipient_group: c.recipientGroup,
    sent_count: c.sentCount,
    status: c.status,
    created_at: new Date(c._creationTime).toISOString(),
    sent_at: c.sentAt ? new Date(c.sentAt).toISOString() : null,
    created_by: null,
  }));

  const subscriberCounts = {
    newsletter: newsletterSubs.length,
    waiting_list: waitingListEntries.length,
  };

  // ── Mutations / Actions ──────────────────────────────────────────────
  const createCampaignFn = useMutation(api.emailCampaigns.create);
  const removeCampaignFn = useMutation(api.emailCampaigns.remove);
  const sendCampaignFn = useAction(api.emailCampaigns.sendCampaign);

  // Wrappers that match the react-query-style .mutate() interface
  // used by EmailMarketingManager.tsx
  const createCampaignMutation = {
    isPending: false,
    mutate: async (
      data: EmailCampaignFormData,
      options?: { onSuccess?: () => void },
    ) => {
      try {
        await createCampaignFn({
          title: data.title,
          subject: data.subject,
          content: data.content,
          recipientGroup: data.recipientGroup as "newsletter" | "waiting_list",
        });
        toast.success('Campaign created successfully!');
        options?.onSuccess?.();
      } catch (error: any) {
        toast.error('Failed to create campaign: ' + error.message);
      }
    },
  };

  const sendCampaignMutation = {
    isPending: false,
    mutate: async (campaign: any) => {
      try {
        const result = await sendCampaignFn({
          campaignId: campaign.id,
          subject: campaign.subject,
          content: campaign.content,
          recipientGroup: campaign.recipient_group,
          fromEmail: 'noreply@yourdomain.com',
          fromName: 'Mentorna AI Education',
        });
        if (result && (result as any).sentCount !== undefined) {
          toast.success(`Campaign sent successfully! ${(result as any).sentCount} emails sent.`);
        }
      } catch (error: any) {
        toast.error('Failed to send campaign: ' + error.message);
      }
    },
  };

  const deleteCampaignMutation = {
    isPending: false,
    mutate: async (campaignId: string) => {
      try {
        await removeCampaignFn({ id: campaignId as any });
        toast.success('Campaign deleted successfully!');
      } catch (error: any) {
        toast.error('Failed to delete campaign: ' + error.message);
      }
    },
  };

  return {
    campaigns,
    isLoading,
    subscriberCounts,
    createCampaignMutation,
    sendCampaignMutation,
    deleteCampaignMutation,
  };
};
