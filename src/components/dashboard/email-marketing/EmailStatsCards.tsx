
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Mail } from 'lucide-react';

interface EmailStatsCardsProps {
  subscriberCounts?: {
    newsletter: number;
    waiting_list: number;
  };
  totalCampaigns: number;
}

const EmailStatsCards = ({ subscriberCounts, totalCampaigns }: EmailStatsCardsProps) => {
  return (
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
            {totalCampaigns}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailStatsCards;
