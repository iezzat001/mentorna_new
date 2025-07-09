
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface TrackingStatusProps {
  isGoogleAnalyticsActive: boolean;
  isMetaPixelActive: boolean;
  hasCustomCode: boolean;
}

const TrackingStatus = ({
  isGoogleAnalyticsActive,
  isMetaPixelActive,
  hasCustomCode
}: TrackingStatusProps) => {
  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-green border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase">
          Tracking Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            {isGoogleAnalyticsActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold">
              Google Analytics: {isGoogleAnalyticsActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isMetaPixelActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold">
              Meta Pixel: {isMetaPixelActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasCustomCode ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold">
              Custom Code: {hasCustomCode ? 'Configured' : 'Not Set'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingStatus;
