import { useEffect, useState } from 'react';
import { usePageTracking } from '@/hooks/usePageTracking';

interface PageTrackerProps {
  isEnabled: boolean;
}

/**
 * Component to handle page tracking inside Router context
 * Must be placed inside BrowserRouter to access useLocation
 */
const PageTracker = ({ isEnabled }: PageTrackerProps) => {
  const [measurementId, setMeasurementId] = useState('');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Check for analytics consent and measurement ID
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const gaId = localStorage.getItem('google_analytics_id');
    
    if (consent) {
      const preferences = JSON.parse(consent);
      setAnalyticsEnabled(preferences.analytics);
    }
    
    if (gaId && gaId.trim()) {
      setMeasurementId(gaId.trim());
    }
  }, []);

  // Enable page tracking when analytics is enabled
  usePageTracking({
    measurementId,
    isEnabled: isEnabled && analyticsEnabled && measurementId.length > 0
  });

  return null; // This component doesn't render anything
};

export default PageTracker;
