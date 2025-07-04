
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  liveVisitors: number;
  dailyVisitors: { date: string; visitors: number }[];
  weeklyVisitors: { week: string; visitors: number }[];
  monthlyVisitors: { month: string; visitors: number }[];
  newsletterCount: number;
  waitingListCount: number;
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  locationBreakdown: { country: string; count: number; percentage: number }[];
}

export const useAnalyticsData = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    liveVisitors: 0,
    dailyVisitors: [],
    weeklyVisitors: [],
    monthlyVisitors: [],
    newsletterCount: 0,
    waitingListCount: 0,
    topReferrers: [],
    deviceBreakdown: [],
    locationBreakdown: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const processDeviceData = (data: any[]) => {
    const deviceMap = new Map<string, number>();
    
    data.forEach(item => {
      if (item.device_type) {
        deviceMap.set(item.device_type, (deviceMap.get(item.device_type) || 0) + 1);
      }
    });

    const totalDevices = Array.from(deviceMap.values()).reduce((sum, count) => sum + count, 0);

    return Array.from(deviceMap.entries())
      .map(([device, count]) => ({ 
        device, 
        count, 
        percentage: totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0 
      }))
      .sort((a, b) => b.count - a.count);
  };

  const processLocationData = (data: any[]) => {
    const locationMap = new Map<string, number>();
    
    data.forEach(item => {
      if (item.country) {
        locationMap.set(item.country, (locationMap.get(item.country) || 0) + 1);
      }
    });

    const totalLocations = Array.from(locationMap.values()).reduce((sum, count) => sum + count, 0);

    return Array.from(locationMap.entries())
      .map(([country, count]) => ({ 
        country, 
        count, 
        percentage: totalLocations > 0 ? Math.round((count / totalLocations) * 100) : 0 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true);

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

      // Fetch device breakdown
      const { data: deviceData } = await supabase
        .from('visitor_analytics')
        .select('device_type')
        .not('device_type', 'is', null)
        .gte('created_at', sevenDaysAgo);

      const deviceBreakdown = processDeviceData(deviceData || []);

      // Fetch location breakdown
      const { data: locationData } = await supabase
        .from('visitor_analytics')
        .select('country')
        .not('country', 'is', null)
        .gte('created_at', sevenDaysAgo);

      const locationBreakdown = processLocationData(locationData || []);

      setAnalytics({
        liveVisitors,
        dailyVisitors,
        weeklyVisitors,
        monthlyVisitors,
        newsletterCount: newsletterCount || 0,
        waitingListCount: waitingListCount || 0,
        topReferrers,
        deviceBreakdown,
        locationBreakdown
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchLiveVisitors = async () => {
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: liveData } = await supabase
        .from('visitor_analytics')
        .select('session_id')
        .gte('created_at', fiveMinutesAgo);

      const uniqueSessions = new Set(liveData?.map(d => d.session_id) || []);
      const liveVisitors = uniqueSessions.size;

      setAnalytics(prev => ({ ...prev, liveVisitors }));
    } catch (error) {
      console.error('Error fetching live visitors:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Set up real-time subscription for live visitors only
    const channel = supabase
      .channel('visitor-analytics')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_analytics' }, () => {
        // Only refresh live visitors count, not the entire analytics
        fetchLiveVisitors();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    analytics,
    loading,
    refreshing,
    fetchAnalytics
  };
};
