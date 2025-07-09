
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useTrackingLogic = () => {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [metaPixelId, setMetaPixelId] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing tracking codes from localStorage
  useEffect(() => {
    const savedGA = localStorage.getItem('google_analytics_id');
    const savedMeta = localStorage.getItem('meta_pixel_id');
    const savedCustom = localStorage.getItem('custom_tracking_code');
    
    if (savedGA) setGoogleAnalyticsId(savedGA);
    if (savedMeta) setMetaPixelId(savedMeta);
    if (savedCustom) setCustomCode(savedCustom);
  }, []);

  const reloadPageForTracking = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSaveGoogleAnalytics = () => {
    setIsSaving(true);
    try {
      if (googleAnalyticsId.trim()) {
        // Validate Google Analytics ID format
        if (!googleAnalyticsId.trim().match(/^G-[A-Z0-9]+$/)) {
          toast.error('Invalid Google Analytics ID format. Should be G-XXXXXXXXXX');
          setIsSaving(false);
          return;
        }
        
        localStorage.setItem('google_analytics_id', googleAnalyticsId.trim());
        toast.success('Google Analytics tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('google_analytics_id');
        toast.success('Google Analytics tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update Google Analytics code');
      setIsSaving(false);
    }
  };

  const handleSaveMetaPixel = () => {
    setIsSaving(true);
    try {
      if (metaPixelId.trim()) {
        // Validate Meta Pixel ID format (should be numeric)
        if (!metaPixelId.trim().match(/^\d{15,16}$/)) {
          toast.error('Invalid Meta Pixel ID format. Should be a 15-16 digit number');
          setIsSaving(false);
          return;
        }
        
        localStorage.setItem('meta_pixel_id', metaPixelId.trim());
        toast.success('Meta Pixel tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('meta_pixel_id');
        toast.success('Meta Pixel tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update Meta Pixel code');
      setIsSaving(false);
    }
  };

  const handleSaveCustomCode = () => {
    setIsSaving(true);
    try {
      if (customCode.trim()) {
        localStorage.setItem('custom_tracking_code', customCode.trim());
        toast.success('Custom tracking code saved! The page will reload to activate tracking.');
        reloadPageForTracking();
      } else {
        localStorage.removeItem('custom_tracking_code');
        toast.success('Custom tracking code removed! The page will reload.');
        reloadPageForTracking();
      }
    } catch (error) {
      toast.error('Failed to update custom tracking code');
      setIsSaving(false);
    }
  };

  const testGoogleAnalytics = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'test_event', {
        event_category: 'admin_test',
        event_label: 'tracking_test',
        value: 1
      });
      toast.success('Test event sent to Google Analytics! Check your GA dashboard in a few minutes.');
    } else {
      toast.error('Google Analytics is not loaded. Please save your GA ID first.');
    }
  };

  const testMetaPixel = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AdminTest', {
        content_name: 'tracking_test',
        source: 'admin_panel'
      });
      toast.success('Test event sent to Meta Pixel! Check your Facebook Events Manager.');
    } else {
      toast.error('Meta Pixel is not loaded. Please save your Pixel ID first.');
    }
  };

  // Helper functions to check if tracking is active
  const isGoogleAnalyticsActive = () => {
    return googleAnalyticsId && typeof window.gtag === 'function';
  };

  const isMetaPixelActive = () => {
    return metaPixelId && typeof window.fbq === 'function';
  };

  return {
    googleAnalyticsId,
    setGoogleAnalyticsId,
    metaPixelId,
    setMetaPixelId,
    customCode,
    setCustomCode,
    isSaving,
    handleSaveGoogleAnalytics,
    handleSaveMetaPixel,
    handleSaveCustomCode,
    testGoogleAnalytics,
    testMetaPixel,
    isGoogleAnalyticsActive: isGoogleAnalyticsActive(),
    isMetaPixelActive: isMetaPixelActive()
  };
};
