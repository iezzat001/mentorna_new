
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailCampaignFormData } from './types';

interface CampaignFormProps {
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
  formData: EmailCampaignFormData;
  setFormData: (data: EmailCampaignFormData) => void;
  onCreateCampaign: () => void;
  isLoading: boolean;
  subscriberCounts?: {
    newsletter: number;
    waiting_list: number;
  };
}

const CampaignForm = ({
  isCreating,
  setIsCreating,
  formData,
  setFormData,
  onCreateCampaign,
  isLoading,
  subscriberCounts
}: CampaignFormProps) => {
  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-blue border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase flex items-center justify-between">
          Create New Campaign
          <Button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-foreground text-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            {isCreating ? 'Cancel' : 'New Campaign'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {isCreating && (
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Campaign Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                placeholder="Enter campaign title"
              />
            </div>
            
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">Recipient Group</Label>
              <Select
                value={formData.recipientGroup}
                onValueChange={(value: 'newsletter' | 'waiting_list') => 
                  setFormData({ ...formData, recipientGroup: value })
                }
              >
                <SelectTrigger className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter Subscribers ({subscriberCounts?.newsletter || 0})</SelectItem>
                  <SelectItem value="waiting_list">Waiting List ({subscriberCounts?.waiting_list || 0})</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block">Email Subject</Label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
              placeholder="Enter email subject"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">From Name</Label>
              <Input
                value={formData.fromName}
                onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <Label className="font-bold text-sm uppercase mb-2 block">From Email</Label>
              <Input
                value={formData.fromEmail}
                onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold"
                placeholder="noreply@yourdomain.com"
              />
            </div>
          </div>

          <div>
            <Label className="font-bold text-sm uppercase mb-2 block">Email Content (HTML)</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[200px]"
              placeholder="Enter your email content (HTML supported)"
            />
          </div>

          <Button
            onClick={onCreateCampaign}
            disabled={isLoading}
            className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            {isLoading ? 'Creating...' : 'Create Campaign'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default CampaignForm;
