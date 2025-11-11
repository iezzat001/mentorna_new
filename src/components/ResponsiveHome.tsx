import { useEffect, useState } from 'react';
import Index from '@/pages/Index';
import MobileLanding from '@/pages/MobileLanding';

/**
 * Smart component that detects device type and shows appropriate view
 * Desktop users see the desktop landing page at "/"
 * Mobile users see the mobile-optimized TikTok-style experience at "/"
 */
const ResponsiveHome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());

      // Also check screen width
      const isSmallScreen = window.innerWidth < 768;

      return isMobileDevice || isSmallScreen;
    };

    const mobile = checkMobile();
    setIsMobile(mobile);
    setIsLoading(false);
  }, []);

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse text-primary text-xl font-heading">
            Loading Mentorna...
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate view directly without redirecting
  return isMobile ? <MobileLanding /> : <Index />;
};

export default ResponsiveHome;
