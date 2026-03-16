
export interface EmailCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  recipient_group: 'newsletter' | 'waiting_list';
  sent_count: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  created_at: string;
  sent_at: string | null;
  created_by: string | null;
}

export interface EmailCampaignFormData {
  title: string;
  subject: string;
  content: string;
  recipientGroup: 'newsletter' | 'waiting_list';
  fromEmail: string;
  fromName: string;
}
