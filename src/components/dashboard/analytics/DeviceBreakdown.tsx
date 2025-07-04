
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DeviceData {
  device: string;
  count: number;
  percentage: number;
}

interface DeviceBreakdownProps {
  deviceBreakdown: DeviceData[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#A8E6CF', '#FFD93D', '#6C5CE7'];

const DeviceBreakdown: React.FC<DeviceBreakdownProps> = ({ deviceBreakdown }) => {
  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'Tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  if (deviceBreakdown.length === 0) {
    return (
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-blue border-b-4 border-foreground">
          <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Device Types
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Monitor className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
            <p className="font-semibold text-foreground/70">No device data available yet.</p>
            <p className="text-sm font-medium text-foreground/50">Data will appear as visitors use different devices.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-blue border-b-4 border-foreground">
        <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Device Types
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Device List with Percentages */}
          <div className="space-y-4">
            {deviceBreakdown.map((device, index) => (
              <div key={device.device} className="p-4 bg-accent-blue/20 border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(device.device)}
                    <span className="font-black text-lg uppercase">{device.device}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-2xl">{device.count}</div>
                    <div className="font-bold text-sm text-foreground/70">{device.percentage}%</div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-foreground/20 h-3 border-2 border-foreground">
                  <div 
                    className="h-full border-r-2 border-foreground transition-all duration-300"
                    style={{ 
                      width: `${device.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Pie Chart */}
          <div className="flex justify-center">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percentage }) => `${device}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  stroke="#000"
                  strokeWidth={2}
                >
                  {deviceBreakdown.map((entry, index) => (
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

export default DeviceBreakdown;
