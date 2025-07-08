
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailCampaignRequest {
  campaignId: string;
  title: string;
  subject: string;
  content: string;
  recipientGroup: 'newsletter' | 'waiting_list';
  fromEmail: string;
  fromName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { campaignId, title, subject, content, recipientGroup, fromEmail, fromName }: EmailCampaignRequest = await req.json();

    console.log(`Starting email campaign: ${title} for ${recipientGroup}`);

    // Update campaign status to sending
    await supabaseClient
      .from('email_campaigns')
      .update({ status: 'sending' })
      .eq('id', campaignId);

    // Get recipients based on group
    let recipients: { email: string; name?: string }[] = [];
    
    if (recipientGroup === 'newsletter') {
      const { data: newsletterSubs } = await supabaseClient
        .from('newsletter_subscribers')
        .select('email, name');
      recipients = newsletterSubs || [];
    } else if (recipientGroup === 'waiting_list') {
      const { data: waitingList } = await supabaseClient
        .from('waiting_list')
        .select('email, name');
      recipients = waitingList || [];
    }

    console.log(`Found ${recipients.length} recipients`);

    if (recipients.length === 0) {
      await supabaseClient
        .from('email_campaigns')
        .update({ status: 'failed' })
        .eq('id', campaignId);
      
      return new Response(
        JSON.stringify({ error: "No recipients found" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      try {
        const emailPromises = batch.map(recipient => 
          resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: [recipient.email],
            subject: subject,
            html: content,
          })
        );

        const results = await Promise.allSettled(emailPromises);
        
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            sentCount++;
          } else {
            failedCount++;
            console.error('Email send failed:', result.reason);
          }
        });

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Batch send error:', error);
        failedCount += batch.length;
      }
    }

    // Update campaign with final status
    const finalStatus = failedCount === 0 ? 'sent' : (sentCount > 0 ? 'sent' : 'failed');
    
    await supabaseClient
      .from('email_campaigns')
      .update({ 
        status: finalStatus,
        sent_count: sentCount,
        sent_at: new Date().toISOString()
      })
      .eq('id', campaignId);

    console.log(`Campaign completed: ${sentCount} sent, ${failedCount} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sentCount, 
        failedCount,
        totalRecipients: recipients.length 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in send-marketing-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
