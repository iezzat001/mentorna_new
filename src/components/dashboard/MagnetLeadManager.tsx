
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Magnet, Users, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MagnetLead {
  id: string;
  email: string | null;
  whatsapp: string | null;
  source: string;
  created_at: string;
}

const MagnetLeadManager = () => {
  const [leads, setLeads] = useState<MagnetLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('magnet_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching magnet leads:', error);
      toast({
        title: "Error",
        description: "Failed to load magnet leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'WhatsApp', 'Source', 'Subscription Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.email || 'N/A',
        lead.whatsapp || 'N/A',
        lead.source,
        new Date(lead.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `magnet-leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Magnet leads exported successfully",
    });
  };

  // Calculate source breakdown
  const sourceBreakdown = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground">
            Magnet Lead Management
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Loading leads...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-black uppercase text-foreground">
          Magnet Lead Management
        </h1>
        <p className="font-body text-lg font-semibold text-foreground/70">
          Manage leads captured from lead magnets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-purple border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {leads.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Magnet className="h-5 w-5 mr-2" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {Object.keys(sourceBreakdown).length}
            </div>
            <p className="font-body text-sm font-medium text-foreground/70">
              Active sources
            </p>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-green border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Button
              onClick={exportToCSV}
              className="
                w-full
                bg-foreground
                text-background
                border-2
                border-foreground
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                font-black
                uppercase
                hover:translate-x-1
                hover:translate-y-1
                hover:shadow-none
                transition-all
              "
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-blue border-b-4 border-foreground">
          <CardTitle className="font-black text-2xl uppercase">
            Magnet Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="p-8 text-center">
              <Magnet className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
              <h3 className="font-heading text-xl font-black uppercase text-foreground/70 mb-2">
                No Leads Yet
              </h3>
              <p className="font-body text-sm font-medium text-foreground/50">
                Leads will appear here once users subscribe through lead magnets
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-foreground text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Email</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">WhatsApp</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Source</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Subscription Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr
                      key={lead.id}
                      className={`
                        border-b-2 border-foreground
                        ${index % 2 === 0 ? 'bg-white' : 'bg-accent-purple/20'}
                        hover:bg-accent-yellow/30
                        transition-colors
                      `}
                    >
                      <td className="px-6 py-4 font-body font-medium text-foreground">
                        {lead.email || (
                          <span className="italic text-foreground/60">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-body font-medium text-foreground">
                        {lead.whatsapp || (
                          <span className="italic text-foreground/60">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className="
                            font-black uppercase text-xs
                            bg-accent-blue text-foreground border-2 border-foreground
                          "
                        >
                          {lead.source}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-body font-medium text-foreground">
                        {new Date(lead.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MagnetLeadManager;
