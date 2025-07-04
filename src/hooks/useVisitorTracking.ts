
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

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const sessionId = getSessionId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;

        await supabase.functions.invoke('track-visitor', {
          body: {
            sessionId,
            pagePath,
            referrer,
            userAgent
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
