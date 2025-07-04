
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Users, Mail, UserPlus, Eye, TrendingUp, Globe } from 'lucide-react';

interface AnalyticsData {
  liveVisitors: number;
  dailyVisitors: { date: string; visitors: number }[];
  weeklyVisitors: { week: string; visitors: number }[];
  monthlyVisitors: { month: string; visitors: number }[];
  newsletterCount: number;
  waitingListCount: number;
  topReferrers: { referrer: string; count: number }[];
}

type TimeRange = 'day' | 'week' | 'month';

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    liveVisitors: 0,
    dailyVisitors: [],
    weeklyVisitors: [],
    monthlyVisitors: [],
    newsletterCount: 0,
    waitingListCount: 0,
    topReferrers: []
  });
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch live visitors (sessions active in last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: liveData } = await supabase
        .from('visitor_analytics')
        .select('session_id')
        .gte('created_at', fiveMinutesAgo);

      const uniqueSessions = new Set(liveData?.map(d => d.session_id) || []);
      const liveVisitors = uniqueSessions.size;

      // Fetch daily visitors (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: dailyData } = await supabase
        .from('visitor_analytics')
        .select('created_at, session_id')
        .gte('created_at', sevenDaysAgo);

      const dailyVisitors = processDailyData(dailyData || []);

      // Fetch weekly visitors (last 4 weeks)
      const fourWeeksAgo = new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: weeklyData } = await supabase
        .from('visitor_analytics')
        .select('created_at, session_id')
        .gte('created_at', fourWeeksAgo);

      const weeklyVisitors = processWeeklyData(weeklyData || []);

      // Fetch monthly visitors (last 6 months)
      const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: monthlyData } = await supabase
        .from('visitor_analytics')
        .select('created_at, session_id')
        .gte('created_at', sixMonthsAgo);

      const monthlyVisitors = processMonthlyData(monthlyData || []);

      // Fetch newsletter count
      const { count: newsletterCount } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });

      // Fetch waiting list count
      const { count: waitingListCount } = await supabase
        .from('waiting_list')
        .select('*', { count: 'exact', head: true });

      // Fetch top referrers
      const { data: referrerData } = await supabase
        .from('visitor_analytics')
        .select('referrer')
        .not('referrer', 'is', null)
        .gte('created_at', sevenDaysAgo);

      const topReferrers = processReferrerData(referrerData || []);

      setAnalytics({
        liveVisitors,
        dailyVisitors,
        weeklyVisitors,
        monthlyVisitors,
        newsletterCount: newsletterCount || 0,
        waitingListCount: waitingListCount || 0,
        topReferrers
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processDailyData = (data: any[]) => {
    const dailyMap = new Map<string, Set<string>>();
    
    data.forEach(item => {
      const date = new Date(item.created_at).toLocaleDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, new Set());
      }
      dailyMap.get(date)?.add(item.session_id);
    });

    return Array.from(dailyMap.entries())
      .map(([date, sessions]) => ({ date, visitors: sessions.size }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
  };

  const processWeeklyData = (data: any[]) => {
    const weeklyMap = new Map<string, Set<string>>();
    
    data.forEach(item => {
      const date = new Date(item.created_at);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toLocaleDateString();
      
      if (!weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, new Set());
      }
      weeklyMap.get(weekKey)?.add(item.session_id);
    });

    return Array.from(weeklyMap.entries())
      .map(([week, sessions]) => ({ week, visitors: sessions.size }))
      .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
      .slice(-4);
  };

  const processMonthlyData = (data: any[]) => {
    const monthlyMap = new Map<string, Set<string>>();
    
    data.forEach(item => {
      const date = new Date(item.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, new Set());
      }
      monthlyMap.get(monthKey)?.add(item.session_id);
    });

    return Array.from(monthlyMap.entries())
      .map(([month, sessions]) => ({ month, visitors: sessions.size }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  };

  const processReferrerData = (data: any[]) => {
    const referrerMap = new Map<string, number>();
    
    data.forEach(item => {
      if (item.referrer) {
        const domain = new URL(item.referrer).hostname.replace('www.', '') || item.referrer;
        referrerMap.set(domain, (referrerMap.get(domain) || 0) + 1);
      }
    });

    return Array.from(referrerMap.entries())
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Set up real-time subscription for live visitors
    const channel = supabase
      .channel('visitor-analytics')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_analytics' }, () => {
        fetchAnalytics();
      })
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const getVisitorData = () => {
    switch (timeRange) {
      case 'week':
        return analytics.weeklyVisitors;
      case 'month':
        return analytics.monthlyVisitors;
      default:
        return analytics.dailyVisitors;
    }
  };

  const chartConfig = {
    visitors: {
      label: "Visitors",
      color: "hsl(var(--primary))",
    },
  };

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <div className="h-16 bg-accent-purple/20 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-green border-b-4 border-foreground pb-2">
            <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Visitors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-black text-foreground">{analytics.liveVisitors}</div>
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
            <div className="text-3xl font-black text-foreground">{analytics.newsletterCount}</div>
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
            <div className="text-3xl font-black text-foreground">{analytics.waitingListCount}</div>
            <p className="text-xs font-semibold text-foreground/70">Registered</p>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-accent-yellow border-b-4 border-foreground pb-2">
            <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-black text-foreground">
              {getVisitorData().reduce((sum, item) => sum + item.visitors, 0)}
            </div>
            <p className="text-xs font-semibold text-foreground/70">
              Last {timeRange === 'day' ? '7 days' : timeRange === 'week' ? '4 weeks' : '6 months'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Trends Chart */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-purple border-b-4 border-foreground">
          <div className="flex justify-between items-center">
            <CardTitle className="font-black text-xl uppercase">Visitor Trends</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setTimeRange('day')}
                variant={timeRange === 'day' ? 'default' : 'outline'}
                size="sm"
                className="font-black uppercase border-2 border-foreground"
              >
                Daily
              </Button>
              <Button
                onClick={() => setTimeRange('week')}
                variant={timeRange === 'week' ? 'default' : 'outline'}
                size="sm"
                className="font-black uppercase border-2 border-foreground"
              >
                Weekly
              </Button>
              <Button
                onClick={() => setTimeRange('month')}
                variant={timeRange === 'month' ? 'default' : 'outline'}
                size="sm"
                className="font-black uppercase border-2 border-foreground"
              >
                Monthly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getVisitorData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={timeRange === 'day' ? 'date' : timeRange === 'week' ? 'week' : 'month'} 
                  className="font-bold"
                />
                <YAxis className="font-bold" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="visitors" fill="var(--color-visitors)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-green border-b-4 border-foreground">
          <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Traffic Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {analytics.topReferrers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {analytics.topReferrers.map((referrer, index) => (
                  <div key={referrer.referrer} className="flex justify-between items-center p-3 bg-accent-yellow/20 border-2 border-foreground">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 border-2 border-foreground"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-bold text-sm">{referrer.referrer}</span>
                    </div>
                    <span className="font-black text-lg">{referrer.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analytics.topReferrers}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.topReferrers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-semibold text-foreground/70">No referrer data available yet.</p>
              <p className="text-sm font-medium text-foreground/50">Data will appear as visitors arrive from external sources.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;
