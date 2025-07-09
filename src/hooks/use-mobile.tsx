
import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Additional mobile detection logic
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android', 'webos', 'iphone', 'ipad', 'ipod', 
    'blackberry', 'windows phone', 'mobile', 'tablet'
  ];
  
  const isMobileUserAgent = mobileKeywords.some(keyword => 
    userAgent.includes(keyword)
  );
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0;
  
  // Check screen width
  const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
  
  // Combine all checks - prioritize screen size but consider other factors
  return isSmallScreen || (isMobileUserAgent && isTouchDevice);
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = checkMobile;
    
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    };
  }, [])

  return !!isMobile
}
