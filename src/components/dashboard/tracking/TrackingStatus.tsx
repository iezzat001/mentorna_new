
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Shield } from 'lucide-react';

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
  // Check if user has given consent
  const consent = localStorage.getItem('cookie_consent');
  const hasConsent = consent ? JSON.parse(consent).analytics : false;

  return (
    <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-accent-green border-b-4 border-foreground">
        <CardTitle className="font-black text-2xl uppercase">
          Tracking Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Consent Status */}
        <div className="mb-6 p-4 bg-accent-yellow/20 border-2 border-foreground rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-foreground" />
            <span className="font-black text-sm uppercase">Cookie Consent Status</span>
          </div>
          <div className="flex items-center gap-2">
            {hasConsent ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-500" />
            )}
            <span className="font-semibold text-sm">
              Analytics Consent: {hasConsent ? 'Given' : 'Not Given'}
            </span>
          </div>
          {!hasConsent && (
            <p className="text-xs text-foreground/70 mt-2">
              ⚠️ Tracking scripts will not load until users accept analytics cookies via the consent banner.
            </p>
          )}
        </div>

        {/* Tracking Services Status */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            {isGoogleAnalyticsActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold text-sm">
              Google Analytics: {isGoogleAnalyticsActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isMetaPixelActive ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold text-sm">
              Meta Pixel: {isMetaPixelActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasCustomCode ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-500" />
            )}
            <span className="font-semibold text-sm">
              Custom Code: {hasCustomCode ? 'Configured' : 'Not Set'}
            </span>
          </div>
        </div>

        {!hasConsent && (
          <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              💡 <strong>Testing Tip:</strong> To test tracking, accept cookies on the main site first, then return here to test.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackingStatus;
