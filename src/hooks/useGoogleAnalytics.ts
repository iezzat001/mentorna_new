import { useState, useEffect, useCallback } from 'react';

// TypeScript declarations for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GA4Config {
  measurementId: string;
  debugMode?: boolean;
}

interface ConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

export const useGoogleAnalytics = (config: GA4Config) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Initialize GA4 with consent mode (immediate loading)
  useEffect(() => {
    if (!config.measurementId || window.gtag) return;

    const loadGA4Script = () => {
      try {
        // Create and append script to document head
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
        script.async = true;
        
        script.onload = () => {
          // Initialize dataLayer and gtag
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(args);
          }
          window.gtag = gtag;
          
          // Initialize with current date
          window.gtag('js', new Date());
          
          // Set default consent to 'denied' (required for proper detection)
          window.gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500 // Wait 500ms for consent update
          });
          
          // Configure GA4 with initial settings
          window.gtag('config', config.measurementId, {
            'anonymize_ip': true,
            'allow_google_signals': false,
            'cookie_flags': 'SameSite=None;Secure',
            'debug_mode': config.debugMode || false
          });
          
          setIsLoaded(true);
          setIsInitialized(true);
          
          console.log('Google Analytics 4 initialized with consent mode:', config.measurementId);
        };
        
        script.onerror = () => {
          setHasError(true);
          console.warn('Google Analytics failed to load - likely blocked by adblocker');
        };
        
        // Ensure script is appended to head for proper detection
        document.head.appendChild(script);
      } catch (error) {
        setHasError(true);
        console.error('Error loading Google Analytics:', error);
      }
    };

    loadGA4Script();
  }, [config.measurementId, config.debugMode]);

  // Update consent when user grants permission
  const updateConsent = useCallback((consentState: Partial<ConsentState>) => {
    if (!isLoaded || !window.gtag) {
      console.warn('GA4 not loaded yet, consent update queued');
      return;
    }

    window.gtag('consent', 'update', consentState);
    console.log('Google Analytics consent updated:', consentState);
  }, [isLoaded]);

  // Track custom events
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (!isInitialized || !window.gtag) {
      console.warn('GA4 not initialized, event not tracked:', eventName);
      return;
    }

    window.gtag('event', eventName, {
      ...parameters,
      debug_mode: config.debugMode
    });
  }, [isInitialized, config.debugMode]);

  // Track page views (for SPA navigation)
  const trackPageView = useCallback((pagePath?: string, pageTitle?: string) => {
    if (!isInitialized || !window.gtag) return;

    window.gtag('config', config.measurementId, {
      page_path: pagePath || window.location.pathname + window.location.search,
      page_title: pageTitle || document.title
    });
  }, [isInitialized, config.measurementId]);

  return {
    isInitialized,
    isLoaded,
    hasError,
    updateConsent,
    trackEvent,
    trackPageView
  };
};
