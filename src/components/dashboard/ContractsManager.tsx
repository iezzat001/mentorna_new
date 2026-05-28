import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, FileText, RefreshCw } from 'lucide-react';

interface Contract {
  id: string;
  full_name: string;
  email: string;
  signature: string;
  offer_type: string;
  total_amount: number;
  currency: string;
  installment_amount: number;
  installments_count: number;
  agreed_terms: {
    sessions_commitment: boolean;
    tasks_commitment: boolean;
    payment_agreement: boolean;
  };
  signed_at: string;
  status: string;
}

const ContractsManager = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContracts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('signed_contracts')
      .select('*')
      .order('signed_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch contracts');
      console.error(error);
    } else {
      setContracts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const getOfferLabel = (offerType: string) => {
    const labels: Record<string, string> = {
      vc_fundraising_mentorship: 'VC Fundraising Mentorship',
      solopreneur_launchpad: 'Solopreneur Launchpad',
      mohamed_offer: 'Mohamed Offer',
    };
    return labels[offerType] || offerType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const generatePDF = (contract: Contract) => {
    const signedDate = new Date(contract.signed_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const offerLabel = getOfferLabel(contract.offer_type);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Contract - ${contract.full_name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1a1a1a; }
          .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #1a1a1a; }
          .logo { font-size: 24px; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px; }
          .title { font-size: 28px; font-weight: 800; text-transform: uppercase; }
          .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #1a1a1a; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .info-label { font-weight: 600; color: #666; }
          .info-value { font-weight: 500; }
          .terms-list { list-style: none; }
          .terms-list li { padding: 12px 0; padding-left: 30px; position: relative; border-bottom: 1px solid #eee; }
          .terms-list li::before { content: "✓"; position: absolute; left: 0; color: #22c55e; font-weight: bold; }
          .signature-section { margin-top: 50px; padding-top: 30px; border-top: 3px solid #1a1a1a; }
          .signature-box { margin-top: 20px; padding: 20px; border: 2px solid #1a1a1a; }
          .signature-label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; margin-bottom: 10px; }
          .signature-value { font-family: 'Brush Script MT', cursive; font-size: 32px; text-align: center; padding: 15px 0; border-bottom: 2px solid #1a1a1a; }
          .signature-date { text-align: right; font-size: 12px; color: #666; margin-top: 10px; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; }
          .badge { display: inline-block; background: #fde047; color: #1a1a1a; padding: 4px 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Mentorna®</div>
          <div class="title">${offerLabel}</div>
          <div class="subtitle">Mentorship Agreement</div>
        </div>

        <div class="section">
          <div class="section-title">Client Information</div>
          <div class="info-row">
            <span class="info-label">Full Name</span>
            <span class="info-value">${contract.full_name}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">${contract.email}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Contract ID</span>
            <span class="info-value">${contract.id.slice(0, 8).toUpperCase()}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Payment Terms</div>
          <div class="info-row">
            <span class="info-label">Total Investment</span>
            <span class="info-value">${contract.total_amount.toLocaleString()} ${contract.currency}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Payment Plan</span>
            <span class="info-value">${contract.installments_count} installments of ${contract.installment_amount.toLocaleString()} ${contract.currency}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Agreed Terms & Conditions</div>
          <ul class="terms-list">
            <li>I commit to attending all scheduled sessions and completing assigned tasks as outlined in the program.</li>
            <li>I understand that missing more than 2 sessions OR failing to complete more than 2 assigned tasks will void the money-back guarantee.</li>
            <li>I agree to pay ${contract.total_amount.toLocaleString()} ${contract.currency} in ${contract.installments_count} installments (${contract.installment_amount.toLocaleString()} ${contract.currency} each via InstaPay).</li>
          </ul>
        </div>

        <div class="signature-section">
          <div class="section-title">Digital Signature</div>
          <div class="signature-box">
            <div class="signature-label">Signed by</div>
            <div class="signature-value">${contract.signature}</div>
            <div class="signature-date">Date: ${signedDate}</div>
          </div>
        </div>

        <div class="footer">
          <p>This document serves as a binding agreement between ${contract.full_name} and Mentorna®.</p>
          <p style="margin-top: 10px;">© ${new Date().getFullYear()} Mentorna® | AI & Solopreneurship</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-200 text-yellow-800',
      active: 'bg-green-200 text-green-800',
      completed: 'bg-blue-200 text-blue-800',
      refunded: 'bg-red-200 text-red-800',
      cancelled: 'bg-gray-200 text-gray-800',
    };
    return styles[status] || styles.pending;
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('signed_contracts')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchContracts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase">Signed Contracts</h2>
          <p className="text-sm text-muted-foreground">
            {contracts.length} contract{contracts.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button
          onClick={fetchContracts}
          variant="outline"
          className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-lg font-bold">Loading contracts...</div>
        </div>
      ) : contracts.length === 0 ? (
        <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">No contracts yet</p>
            <p className="text-sm text-muted-foreground">
              Signed contracts will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contracts.map((contract) => (
            <Card
              key={contract.id}
              className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">
                    {contract.full_name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase bg-[hsl(210,75%,85%)] px-2 py-1 border border-foreground">
                      {getOfferLabel(contract.offer_type)}
                    </span>
                    <Badge className={`${getStatusBadge(contract.status)} font-bold uppercase text-xs`}>
                      {contract.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                    <p className="font-medium">{contract.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Amount</p>
                    <p className="font-bold">
                      {contract.total_amount.toLocaleString()} {contract.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Signed</p>
                    <p className="font-medium">
                      {new Date(contract.signed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    onClick={() => generatePDF(contract)}
                    className="bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>

                  <select
                    value={contract.status}
                    onChange={(e) => updateStatus(contract.id, e.target.value)}
                    className="px-3 py-2 border-2 border-foreground font-semibold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractsManager;
