
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Globe } from 'lucide-react';

interface ReferrerData {
  referrer: string;
  count: number;
}

interface TrafficSourcesProps {
  topReferrers: ReferrerData[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#A8E6CF', '#FFD93D', '#6C5CE7'];

const TrafficSources: React.FC<TrafficSourcesProps> = ({ topReferrers }) => {
  if (topReferrers.length === 0) {
    return (
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
          <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Traffic Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="font-semibold text-foreground/70">No referrer data available yet.</p>
            <p className="text-sm font-medium text-foreground/50">Data will appear as visitors arrive from external sources.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-yellow border-b-4 border-foreground">
        <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {topReferrers.map((referrer, index) => (
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
                  data={topReferrers}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {topReferrers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;
