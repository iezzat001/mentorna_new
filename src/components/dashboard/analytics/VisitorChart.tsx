
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type TimeRange = 'day' | 'week' | 'month';

interface VisitorData {
  date?: string;
  week?: string;
  month?: string;
  visitors: number;
}

interface VisitorChartProps {
  data: VisitorData[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const VisitorChart: React.FC<VisitorChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange
}) => {
  const chartConfig = {
    visitors: {
      label: "Visitors",
      color: "hsl(var(--primary))",
    },
  };

  const getDataKey = () => {
    switch (timeRange) {
      case 'week':
        return 'week';
      case 'month':
        return 'month';
      default:
        return 'date';
    }
  };

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-purple border-b-4 border-foreground">
        <div className="flex justify-between items-center">
          <CardTitle className="font-black text-xl uppercase">Visitor Trends</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => onTimeRangeChange('day')}
              variant={timeRange === 'day' ? 'default' : 'outline'}
              size="sm"
              className="font-black uppercase border-2 border-foreground"
            >
              Daily
            </Button>
            <Button
              onClick={() => onTimeRangeChange('week')}
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              className="font-black uppercase border-2 border-foreground"
            >
              Weekly
            </Button>
            <Button
              onClick={() => onTimeRangeChange('month')}
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={getDataKey()}
                className="font-bold"
              />
              <YAxis className="font-bold" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                dataKey="visitors" 
                stroke="var(--color-visitors)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-visitors)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VisitorChart;
