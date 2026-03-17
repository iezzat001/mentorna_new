import { useQuery as useConvexQuery } from 'convex/react';
import { api } from '@/lib/convex';

interface AnalyticsData {
  liveVisitors: number;
  liveVisitorsByIP: number;
  dailyVisitors: { date: string; visitors: number; sessions: number }[];
  weeklyVisitors: { week: string; visitors: number; sessions: number }[];
  monthlyVisitors: { month: string; visitors: number; sessions: number }[];
  newsletterCount: number;
  waitingListCount: number;
  topReferrers: { referrer: string; count: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  locationBreakdown: { country: string; count: number; percentage: number }[];
}

/* ------------------------------------------------------------------ */
/*  Data processing helpers (unchanged from original)                  */
/* ------------------------------------------------------------------ */

const processDailyData = (data: any[]) => {
  const dailySessionMap = new Map<string, Set<string>>();

  data.forEach((item) => {
    const date = new Date(item._creationTime).toLocaleDateString();
    if (!dailySessionMap.has(date)) dailySessionMap.set(date, new Set());
    dailySessionMap.get(date)?.add(item.sessionId);
  });

  return Array.from(dailySessionMap.entries())
    .map(([date, sessions]) => ({
      date,
      sessions: sessions.size,
      visitors: sessions.size, // without IP hash, sessions ≈ visitors
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);
};

const processWeeklyData = (data: any[]) => {
  const weeklySessionMap = new Map<string, Set<string>>();

  data.forEach((item) => {
    const d = new Date(item._creationTime);
    const weekStart = new Date(d.setDate(d.getDate() - d.getDay()));
    const weekKey = weekStart.toLocaleDateString();
    if (!weeklySessionMap.has(weekKey)) weeklySessionMap.set(weekKey, new Set());
    weeklySessionMap.get(weekKey)?.add(item.sessionId);
  });

  return Array.from(weeklySessionMap.entries())
    .map(([week, sessions]) => ({
      week,
      sessions: sessions.size,
      visitors: sessions.size,
    }))
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime())
    .slice(-4);
};

const processMonthlyData = (data: any[]) => {
  const monthlySessionMap = new Map<string, Set<string>>();

  data.forEach((item) => {
    const d = new Date(item._creationTime);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlySessionMap.has(monthKey)) monthlySessionMap.set(monthKey, new Set());
    monthlySessionMap.get(monthKey)?.add(item.sessionId);
  });

  return Array.from(monthlySessionMap.entries())
    .map(([month, sessions]) => ({
      month,
      sessions: sessions.size,
      visitors: sessions.size,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6);
};

const processReferrerData = (data: any[]) => {
  const referrerMap = new Map<string, number>();
  data.forEach((item) => {
    if (item.referrer) {
      try {
        const domain = new URL(item.referrer).hostname.replace('www.', '') || item.referrer;
        referrerMap.set(domain, (referrerMap.get(domain) || 0) + 1);
      } catch {
        referrerMap.set(item.referrer, (referrerMap.get(item.referrer) || 0) + 1);
      }
    }
  });
  return Array.from(referrerMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const processDeviceData = (data: any[]) => {
  const deviceMap = new Map<string, number>();
  data.forEach((item) => {
    if (item.deviceType) {
      deviceMap.set(item.deviceType, (deviceMap.get(item.deviceType) || 0) + 1);
    }
  });
  const total = Array.from(deviceMap.values()).reduce((s, c) => s + c, 0);
  return Array.from(deviceMap.entries())
    .map(([device, count]) => ({
      device,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
};

const processLocationData = (data: any[]) => {
  const locationMap = new Map<string, number>();
  data.forEach((item) => {
    if (item.country) {
      locationMap.set(item.country, (locationMap.get(item.country) || 0) + 1);
    }
  });
  const total = Array.from(locationMap.values()).reduce((s, c) => s + c, 0);
  return Array.from(locationMap.entries())
    .map(([country, count]) => ({
      country,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

export const useAnalyticsData = () => {
  // Convex queries are fully reactive — no manual refresh needed.
  const allVisitors = useConvexQuery(api.visitorTracking.list) ?? [];
  const newsletterSubs = useConvexQuery(api.newsletterSubscribers.list) ?? [];
  const waitingListEntries = useConvexQuery(api.waitingList.list) ?? [];

  const loading = allVisitors === undefined;

  // Compute time thresholds
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const fourWeeksAgo = now - 4 * 7 * 24 * 60 * 60 * 1000;
  const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60 * 1000;

  // Live visitors (last 5 min)
  const liveRecords = allVisitors.filter((r: any) => r._creationTime >= fiveMinutesAgo);
  const liveSessions = new Set(liveRecords.map((r: any) => r.sessionId));

  // Time-windowed subsets
  const last7Days = allVisitors.filter((r: any) => r._creationTime >= sevenDaysAgo);
  const last4Weeks = allVisitors.filter((r: any) => r._creationTime >= fourWeeksAgo);
  const last6Months = allVisitors.filter((r: any) => r._creationTime >= sixMonthsAgo);

  const analytics: AnalyticsData = {
    liveVisitors: liveSessions.size,
    liveVisitorsByIP: liveSessions.size, // no IP hash in Convex — sessions ≈ unique visitors
    dailyVisitors: processDailyData(last7Days),
    weeklyVisitors: processWeeklyData(last4Weeks),
    monthlyVisitors: processMonthlyData(last6Months),
    newsletterCount: newsletterSubs.length,
    waitingListCount: waitingListEntries.length,
    topReferrers: processReferrerData(last7Days),
    deviceBreakdown: processDeviceData(last7Days),
    locationBreakdown: processLocationData(last7Days),
  };

  // fetchAnalytics kept for API compatibility (now a no-op since Convex is reactive)
  const fetchAnalytics = () => {
    /* Convex queries auto-update — nothing to manually refetch */
  };

  return {
    analytics,
    loading,
    refreshing: false,
    fetchAnalytics,
  };
};
