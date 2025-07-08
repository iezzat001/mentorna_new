
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Trash2 } from 'lucide-react';
import { EmailCampaign } from './types';

interface CampaignsListProps {
  campaigns: EmailCampaign[];
  onSendCampaign: (campaign: EmailCampaign) => void;
  onDeleteCampaign: (campaignId: string) => void;
  isSending: boolean;
  isDeleting: boolean;
}

const CampaignsList = ({
  campaigns,
  onSendCampaign,
  onDeleteCampaign,
  isSending,
  isDeleting
}: CampaignsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-foreground/20 text-foreground';
      case 'sending': return 'bg-accent-yellow text-foreground';
      case 'sent': return 'bg-accent-green text-foreground';
      case 'failed': return 'bg-red-500 text-white';
      default: return 'bg-foreground/20 text-foreground';
    }
  };

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-purple border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase">
          Email Campaigns
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {campaigns.length === 0 ? (
          <div className="p-8 text-center">
            <Mail className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
            <h3 className="font-heading text-xl font-black uppercase text-foreground/70 mb-2">
              No Campaigns Yet
            </h3>
            <p className="font-body text-sm font-medium text-foreground/50">
              Create your first email campaign to get started. Note: You need to run the SQL migration first to create the email_campaigns table.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {campaigns.map((campaign, index) => (
              <div 
                key={campaign.id}
                className={`
                  p-6 border-b-2 border-foreground last:border-b-0
                  ${index % 2 === 0 ? 'bg-white' : 'bg-accent-purple/20'}
                  hover:bg-accent-yellow/30 transition-colors
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-foreground">
                      {campaign.title}
                    </h3>
                    <p className="font-body text-sm font-medium text-foreground/70">
                      Subject: {campaign.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`font-black uppercase text-xs ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </Badge>
                    <Badge className="bg-foreground/20 text-foreground font-black uppercase text-xs">
                      {campaign.recipient_group.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm font-medium text-foreground/70">
                    <span>Created: {new Date(campaign.created_at).toLocaleDateString()}</span>
                    {campaign.sent_at && (
                      <span>Sent: {new Date(campaign.sent_at).toLocaleDateString()}</span>
                    )}
                    {campaign.sent_count > 0 && (
                      <span>Recipients: {campaign.sent_count}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {campaign.status === 'draft' && (
                      <Button
                        onClick={() => onSendCampaign(campaign)}
                        disabled={isSending}
                        className="bg-accent-green border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-xs hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => onDeleteCampaign(campaign.id)}
                      disabled={isDeleting}
                      variant="destructive"
                      className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-xs hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
