import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, Clock, Eye, RefreshCw, Users, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  aggregateWebinarAnalytics,
  fetchWatchEvents,
  formatDuration,
} from "@/lib/webinarAnalytics";
import { webinars } from "@/data/webinars";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, subtitle, icon, color }) => (
  <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <CardHeader className={`${color} border-b-4 border-foreground pb-2`}>
      <CardTitle className="font-black text-sm uppercase flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="text-3xl font-black text-foreground">{value}</div>
      {subtitle ? (
        <p className="text-xs font-semibold text-foreground/70">{subtitle}</p>
      ) : null}
    </CardContent>
  </Card>
);

const WebinarAnalyticsManager: React.FC = () => {
  const {
    data: events = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["webinar-watch-events"],
    queryFn: fetchWatchEvents,
  });

  const analytics = useMemo(
    () => aggregateWebinarAnalytics(events, webinars),
    [events]
  );

  const webinarName = (id: string) =>
    webinars.find((w) => w.id === id)?.title ?? id;

  const [retentionWebinarId, setRetentionWebinarId] = useState<string | undefined>(
    undefined
  );
  const selectedRetentionId =
    retentionWebinarId ?? analytics.perWebinar[0]?.webinarId;
  const retentionData = selectedRetentionId
    ? analytics.retention(selectedRetentionId)
    : [];

  const retentionConfig = {
    percent: { label: "Viewers still watching", color: "hsl(var(--primary))" },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-2xl uppercase flex items-center gap-2">
          <Video className="h-6 w-6" />
          Webinar Analytics
        </h2>
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="font-black uppercase border-2 border-foreground"
          disabled={isRefetching}
        >
          <RefreshCw
            className={`h-4 w-4 mr-1 ${isRefetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <Card className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-10 text-center font-black uppercase text-foreground/60">
            Loading watch data…
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Views"
              value={analytics.totals.views}
              subtitle="Play starts"
              icon={<Eye className="h-4 w-4" />}
              color="bg-accent-green"
            />
            <StatCard
              title="Unique Viewers"
              value={analytics.totals.uniqueViewers}
              subtitle="Distinct sessions"
              icon={<Users className="h-4 w-4" />}
              color="bg-accent-blue"
            />
            <StatCard
              title="Total Watch Time"
              value={formatDuration(analytics.totals.totalWatchSeconds)}
              subtitle={`Avg ${formatDuration(
                analytics.totals.avgWatchSeconds
              )} / view`}
              icon={<Clock className="h-4 w-4" />}
              color="bg-accent-purple"
            />
            <StatCard
              title="Completion Rate"
              value={`${analytics.totals.completionRate}%`}
              subtitle="Watched to the end"
              icon={<CheckCircle2 className="h-4 w-4" />}
              color="bg-accent-yellow"
            />
          </div>

          {/* Per-webinar table */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-blue border-b-4 border-foreground">
              <CardTitle className="font-black text-xl uppercase">
                By Webinar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {analytics.perWebinar.length === 0 ? (
                <div className="p-10 text-center font-semibold text-foreground/70">
                  No watch data yet. Views will appear here once community members
                  start watching the recordings.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-black uppercase">Webinar</TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Views
                      </TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Unique
                      </TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Watch Time
                      </TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Avg / Viewer
                      </TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Avg % Watched
                      </TableHead>
                      <TableHead className="font-black uppercase text-right">
                        Completion
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.perWebinar.map((w) => (
                      <TableRow key={w.webinarId}>
                        <TableCell className="font-bold max-w-[280px]">
                          {webinarName(w.webinarId)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {w.views}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {w.uniqueViewers}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatDuration(w.totalWatchSeconds)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatDuration(w.avgWatchSeconds)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {w.avgPercentWatched}%
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {w.completionRate}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Retention curve */}
          <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-accent-purple border-b-4 border-foreground">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <CardTitle className="font-black text-xl uppercase">
                  Audience Retention
                </CardTitle>
                {analytics.perWebinar.length > 1 ? (
                  <div className="flex flex-wrap gap-2">
                    {analytics.perWebinar.map((w) => (
                      <Button
                        key={w.webinarId}
                        onClick={() => setRetentionWebinarId(w.webinarId)}
                        variant={
                          selectedRetentionId === w.webinarId ? "default" : "outline"
                        }
                        size="sm"
                        className="font-black uppercase border-2 border-foreground max-w-[180px] truncate"
                      >
                        {webinarName(w.webinarId)}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {retentionData.length === 0 ? (
                <div className="text-center font-semibold text-foreground/70 py-10">
                  Retention will show how far into each webinar your audience
                  watches.
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm font-semibold text-foreground/70">
                    {selectedRetentionId
                      ? `% of viewers still watching through “${webinarName(
                          selectedRetentionId
                        )}”`
                      : ""}
                  </p>
                  <ChartContainer config={retentionConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={retentionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bucket" className="font-bold" />
                        <YAxis className="font-bold" domain={[0, 100]} unit="%" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="percent"
                          fill="var(--color-percent)"
                          stroke="hsl(var(--foreground))"
                          strokeWidth={2}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WebinarAnalyticsManager;
