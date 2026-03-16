
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface LocationData {
  country: string;
  count: number;
  percentage: number;
}

interface LocationBreakdownProps {
  locationBreakdown: LocationData[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#A8E6CF', '#FFD93D', '#6C5CE7'];

const LocationBreakdown: React.FC<LocationBreakdownProps> = ({ locationBreakdown }) => {
  if (locationBreakdown.length === 0) {
    return (
      <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-accent-green border-b-4 border-foreground">
          <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Visitor Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Globe className="h-12 w-12 mx-auto mb-4 text-foreground/30" />
            <p className="font-semibold text-foreground/70">No location data available yet.</p>
            <p className="text-sm font-medium text-foreground/50">Location data will appear as visitors arrive from different countries.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-green border-b-4 border-foreground">
        <CardTitle className="font-black text-xl uppercase flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Visitor Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {locationBreakdown.map((location, index) => (
            <div key={location.country} className="p-4 bg-accent-green/20 border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 border-2 border-foreground"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-black text-lg uppercase">{location.country}</span>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl">{location.count}</div>
                  <div className="font-bold text-sm text-foreground/70">{location.percentage}%</div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-foreground/20 h-3 border-2 border-foreground">
                <div 
                  className="h-full border-r-2 border-foreground transition-all duration-300"
                  style={{ 
                    width: `${location.percentage}%`,
                    backgroundColor: COLORS[index % COLORS.length]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationBreakdown;
