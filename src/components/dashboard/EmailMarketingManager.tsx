
import React, { useState } from 'react';
import { toast } from 'sonner';
import EmailStatsCards from './email-marketing/EmailStatsCards';
import CampaignForm from './email-marketing/CampaignForm';
import CampaignsList from './email-marketing/CampaignsList';
import { useEmailCampaigns } from './email-marketing/useEmailCampaigns';
import { EmailCampaignFormData } from './email-marketing/types';

const EmailMarketingManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<EmailCampaignFormData>({
    title: '',
    subject: '',
    content: '',
    recipientGroup: 'newsletter',
    fromEmail: 'noreply@yourdomain.com',
    fromName: 'Mentorna AI Education'
  });

  const {
    campaigns,
    isLoading,
    subscriberCounts,
    createCampaignMutation,
    sendCampaignMutation,
    deleteCampaignMutation
  } = useEmailCampaigns();

  const handleCreateCampaign = () => {
    if (!formData.title || !formData.subject || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    createCampaignMutation.mutate(formData, {
      onSuccess: () => {
        setIsCreating(false);
        setFormData({
          title: '',
          subject: '',
          content: '',
          recipientGroup: 'newsletter',
          fromEmail: 'noreply@yourdomain.com',
          fromName: 'Mentorna AI Education'
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground">
            Email Marketing
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Loading campaigns...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-black uppercase text-foreground">
          Email Marketing
        </h1>
        <p className="font-body text-lg font-semibold text-foreground/70">
          Create and send email campaigns to your subscribers
        </p>
      </div>

      <EmailStatsCards 
        subscriberCounts={subscriberCounts}
        totalCampaigns={campaigns.length}
      />

      <CampaignForm
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        formData={formData}
        setFormData={setFormData}
        onCreateCampaign={handleCreateCampaign}
        isLoading={createCampaignMutation.isPending}
        subscriberCounts={subscriberCounts}
      />

      <CampaignsList
        campaigns={campaigns}
        onSendCampaign={(campaign) => sendCampaignMutation.mutate(campaign)}
        onDeleteCampaign={(campaignId) => deleteCampaignMutation.mutate(campaignId)}
        isSending={sendCampaignMutation.isPending}
        isDeleting={deleteCampaignMutation.isPending}
      />
    </div>
  );
};

export default EmailMarketingManager;
