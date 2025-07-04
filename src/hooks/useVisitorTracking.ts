
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate session ID that persists for the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type based on user agent and screen size
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  
  // Also check screen size as backup
  const screenWidth = window.screen.width;
  
  if (isMobile && !isTablet) return 'Mobile';
  if (isTablet || (screenWidth >= 768 && screenWidth <= 1024)) return 'Tablet';
  return 'Desktop';
};

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const sessionId = getSessionId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;
        const deviceType = getDeviceType();

        await supabase.functions.invoke('track-visitor', {
          body: {
            sessionId,
            pagePath,
            referrer,
            userAgent,
            deviceType
          }
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Track on initial load
    trackVisitor();

    // Track on route changes (for SPAs)
    const handleRouteChange = () => {
      setTimeout(trackVisitor, 100); // Small delay to ensure route has changed
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
};
