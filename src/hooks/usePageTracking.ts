import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UsePageTrackingProps {
  measurementId: string;
  isEnabled?: boolean;
}

/**
 * Hook to track page views in React Router SPA
 * This ensures GA4 properly tracks navigation in single-page applications
 */
export const usePageTracking = ({ measurementId, isEnabled = true }: UsePageTrackingProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!isEnabled || !measurementId || !window.gtag) return;

    // Track page view with current path and title
    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href
    });

    // Optional: Track as custom event for better visibility
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search
    });

    console.log('GA4 Page tracked:', location.pathname + location.search);
  }, [location, measurementId, isEnabled]);
};
