
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { EmailCampaign, EmailCampaignFormData } from './types';

export const useEmailCampaigns = () => {
  const queryClient = useQueryClient();

  // Fetch campaigns using raw SQL query to work around type issues
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      // Use direct fetch to access email campaigns table
      const response = await fetch(`https://jswejhxrdnvwxonyaopz.supabase.co/rest/v1/email_campaigns`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          // Table doesn't exist yet, return empty array
          return [];
        }
        throw new Error('Failed to fetch campaigns');
      }
      
      const data = await response.json();
      return (data || []) as EmailCampaign[];
    }
  });

  // Fetch subscriber counts
  const { data: subscriberCounts } = useQuery({
    queryKey: ['subscriber-counts'],
    queryFn: async () => {
      const [newsletterRes, waitingListRes] = await Promise.all([
        supabase.from('newsletter_subscribers').select('id', { count: 'exact' }),
        supabase.from('waiting_list').select('id', { count: 'exact' })
      ]);
      
      return {
        newsletter: newsletterRes.count || 0,
        waiting_list: waitingListRes.count || 0
      };
    }
  });

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: EmailCampaignFormData) => {
      // Use raw fetch to create campaign
      const response = await fetch(`https://jswejhxrdnvwxonyaopz.supabase.co/rest/v1/email_campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title: campaignData.title,
          subject: campaignData.subject,
          content: campaignData.content,
          recipient_group: campaignData.recipientGroup,
          status: 'draft'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success('Campaign created successfully!');
    },
    onError: (error: any) => {
      toast.error('Failed to create campaign: ' + error.message);
    }
  });

  // Send campaign mutation
  const sendCampaignMutation = useMutation({
    mutationFn: async (campaign: EmailCampaign) => {
      const response = await supabase.functions.invoke('send-marketing-email', {
        body: {
          campaignId: campaign.id,
          title: campaign.title,
          subject: campaign.subject,
          content: campaign.content,
          recipientGroup: campaign.recipient_group,
          fromEmail: 'noreply@yourdomain.com',
          fromName: 'iLab AI Education'
        }
      });

      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success(`Campaign sent successfully! ${data.sentCount} emails sent.`);
    },
    onError: (error: any) => {
      toast.error('Failed to send campaign: ' + error.message);
    }
  });

  // Delete campaign mutation
  const deleteCampaignMutation = useMutation({
    mutationFn: async (campaignId: string) => {
      const response = await fetch(`https://jswejhxrdnvwxonyaopz.supabase.co/rest/v1/email_campaigns?id=eq.${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2VqaHhyZG52d3hvbnlhb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDUwNTAsImV4cCI6MjA2NzEyMTA1MH0.pK9rMFafMN-M91E3pdG8A8c73f9Gs8_BRgkZVLDblC0',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success('Campaign deleted successfully!');
    },
    onError: (error: any) => {
      toast.error('Failed to delete campaign: ' + error.message);
    }
  });

  return {
    campaigns,
    isLoading,
    subscriberCounts,
    createCampaignMutation,
    sendCampaignMutation,
    deleteCampaignMutation
  };
};
