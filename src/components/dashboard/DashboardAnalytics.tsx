
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import AnalyticsStats from './analytics/AnalyticsStats';
import VisitorChart from './analytics/VisitorChart';
import DeviceBreakdown from './analytics/DeviceBreakdown';
import LocationBreakdown from './analytics/LocationBreakdown';
import TrafficSources from './analytics/TrafficSources';

type TimeRange = 'day' | 'week' | 'month';

const DashboardAnalytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const { analytics, loading, refreshing, fetchAnalytics } = useAnalyticsData();

  const handleManualRefresh = () => {
    fetchAnalytics();
  };

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

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'week':
        return 'Last 4 weeks';
      case 'month':
        return 'Last 6 months';
      default:
        return 'Last 7 days';
    }
  };

  const getTotalVisitors = () => {
    return getVisitorData().reduce((sum, item) => sum + item.visitors, 0);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="h-16 bg-accent-purple/20 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Manual Refresh Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'REFRESHING...' : 'REFRESH DATA'}
        </Button>
      </div>

      {/* Quick Stats Cards */}
      <AnalyticsStats
        liveVisitors={analytics.liveVisitors}
        newsletterCount={analytics.newsletterCount}
        waitingListCount={analytics.waitingListCount}
        totalVisitors={getTotalVisitors()}
        timeRangeLabel={getTimeRangeLabel()}
      />

      {/* Visitor Trends Chart */}
      <VisitorChart
        data={getVisitorData()}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {/* Device & Location Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <DeviceBreakdown deviceBreakdown={analytics.deviceBreakdown} />
        <LocationBreakdown locationBreakdown={analytics.locationBreakdown} />
      </div>

      {/* Traffic Sources */}
      <TrafficSources topReferrers={analytics.topReferrers} />
    </div>
  );
};

export default DashboardAnalytics;
