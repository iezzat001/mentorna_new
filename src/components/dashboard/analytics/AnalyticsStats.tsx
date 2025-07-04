
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Mail, UserPlus, Users } from 'lucide-react';

interface AnalyticsStatsProps {
  liveVisitors: number;
  newsletterCount: number;
  waitingListCount: number;
  uniqueVisitors: number;
  timeRangeLabel: string;
}

const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({
  liveVisitors,
  newsletterCount,
  waitingListCount,
  uniqueVisitors,
  timeRangeLabel
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-green border-b-4 border-foreground pb-2">
          <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Live Visitors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-3xl font-black text-foreground">{liveVisitors}</div>
          <p className="text-xs font-semibold text-foreground/70">Active now</p>
        </CardContent>
      </Card>

      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-blue border-b-4 border-foreground pb-2">
          <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-3xl font-black text-foreground">{newsletterCount}</div>
          <p className="text-xs font-semibold text-foreground/70">Subscribers</p>
        </CardContent>
      </Card>

      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-purple border-b-4 border-foreground pb-2">
          <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Waiting List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-3xl font-black text-foreground">{waitingListCount}</div>
          <p className="text-xs font-semibold text-foreground/70">Registered</p>
        </CardContent>
      </Card>

      <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-yellow border-b-4 border-foreground pb-2">
          <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
            <Users className="h-4 w-4" />
            Unique Visitors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-3xl font-black text-foreground">{uniqueVisitors}</div>
          <p className="text-xs font-semibold text-foreground/70">{timeRangeLabel}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsStats;
