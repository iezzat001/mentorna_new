
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Mail, Send, Users, Calendar, Eye, Trash2 } from 'lucide-react';

interface EmailCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  recipient_group: 'newsletter' | 'waiting_list';
  sent_count: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  created_at: string;
  sent_at: string | null;
}

const EmailMarketingManager = () => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    recipientGroup: 'newsletter' as 'newsletter' | 'waiting_list',
    fromEmail: 'noreply@yourdomain.com',
    fromName: 'iLab AI Education'
  });

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmailCampaign[];
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
    mutationFn: async (campaignData: typeof formData) => {
      const { data, error } = await supabase
        .from('email_campaigns')
        .insert({
          title: campaignData.title,
          subject: campaignData.subject,
          content: campaignData.content,
          recipient_group: campaignData.recipientGroup,
          status: 'draft'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      setIsCreating(false);
      setFormData({
        title: '',
        subject: '',
        content: '',
        recipientGroup: 'newsletter',
        fromEmail: 'noreply@yourdomain.com',
        fromName: 'iLab AI Education'
      });
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
          fromEmail: formData.fromEmail,
          fromName: formData.fromName
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
      const { error } = await supabase
        .from('email_campaigns')
        .delete()
        .eq('id', campaignId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      toast.success('Campaign deleted successfully!');
    },
    onError: (error: any) => {
      toast.error('Failed to delete campaign: ' + error.message);
    }
  });

  const handleCreateCampaign = () => {
    if (!formData.title || !formData.subject || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    createCampaignMutation.mutate(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-foreground/20 text-foreground';
      case 'sending': return 'bg-accent-yellow text-foreground';
      case 'sent': return 'bg-accent-green text-foreground';
      case 'failed': return 'bg-red-500 text-white';
      default: return 'bg-foreground/20 text-foreground';
    }
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

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-purple border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Newsletter Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {subscriberCounts?.newsletter || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Waiting List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {subscriberCounts?.waiting_list || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-green border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Total Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {campaigns.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Button */}
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
              onClick={handleCreateCampaign}
              disabled={createCampaignMutation.isPending}
              className="w-full bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {createCampaignMutation.isPending ? 'Creating...' : 'Create Campaign'}
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Campaigns List */}
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
                Create your first email campaign to get started
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
                          onClick={() => sendCampaignMutation.mutate(campaign)}
                          disabled={sendCampaignMutation.isPending}
                          className="bg-accent-green border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-xs hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      )}
                      
                      <Button
                        onClick={() => deleteCampaignMutation.mutate(campaign.id)}
                        disabled={deleteCampaignMutation.isPending}
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
    </div>
  );
};

export default EmailMarketingManager;
