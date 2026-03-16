
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Users, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  interested_in_webinar: boolean;
  created_at: string;
}

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter subscribers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Interested in Webinar', 'Subscription Date'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map(subscriber => [
        subscriber.name || 'Not provided',
        subscriber.email,
        subscriber.interested_in_webinar ? 'Yes' : 'No',
        new Date(subscriber.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Newsletter subscribers exported successfully",
    });
  };

  const webinarInterestedCount = subscribers.filter(s => s.interested_in_webinar).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black uppercase text-foreground">
            Newsletter Management
          </h1>
          <p className="font-body text-lg font-semibold text-foreground/70">
            Loading subscribers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl font-black uppercase text-foreground">
          Newsletter Management
        </h1>
        <p className="font-body text-lg font-semibold text-foreground/70">
          Manage newsletter subscribers and webinar interests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-purple border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {subscribers.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
            <CardTitle className="font-black text-xl uppercase flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Webinar Interest
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-black text-foreground">
              {webinarInterestedCount}
            </div>
            <p className="font-body text-sm font-medium text-foreground/70">
              {subscribers.length > 0 
                ? `${Math.round((webinarInterestedCount / subscribers.length) * 100)}% interested`
                : '0% interested'
              }
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

      {/* Subscribers Table */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-blue border-b-4 border-foreground">
          <CardTitle className="font-black text-2xl uppercase">
            Newsletter Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {subscribers.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
              <h3 className="font-heading text-xl font-black uppercase text-foreground/70 mb-2">
                No Subscribers Yet
              </h3>
              <p className="font-body text-sm font-medium text-foreground/50">
                Subscribers will appear here once they join the newsletter
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-foreground text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Name</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Email</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Webinar Interest</th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">Subscription Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber, index) => (
                    <tr 
                      key={subscriber.id}
                      className={`
                        border-b-2 border-foreground
                        ${index % 2 === 0 ? 'bg-white' : 'bg-accent-purple/20'}
                        hover:bg-accent-yellow/30
                        transition-colors
                      `}
                    >
                      <td className="px-6 py-4 font-body font-semibold text-foreground">
                        {subscriber.name || (
                          <span className="italic text-foreground/60">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-body font-medium text-foreground">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`
                            font-black uppercase text-xs
                            ${subscriber.interested_in_webinar 
                              ? 'bg-accent-green text-foreground border-2 border-foreground' 
                              : 'bg-foreground/20 text-foreground border-2 border-foreground/30'
                            }
                          `}
                        >
                          {subscriber.interested_in_webinar ? 'INTERESTED' : 'NOT INTERESTED'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-body font-medium text-foreground">
                        {new Date(subscriber.created_at).toLocaleDateString('en-US', {
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

export default NewsletterManager;
