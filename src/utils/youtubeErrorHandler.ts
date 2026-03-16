/**
 * Utility to handle and filter YouTube embed errors
 * Suppresses common ad-blocking and expected YouTube errors to reduce console noise
 */

// List of error patterns that are expected and should be suppressed
const SUPPRESSED_ERROR_PATTERNS = [
  'googleads.g.doubleclick.net',
  'static.doubleclick.net',
  'googlesyndication.com',
  'pagead/id',
  'ad_status.js',
  'ERR_BLOCKED_BY_CLIENT',
  'youtube.com/api/stats'
];

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * Enhanced console error handler that filters YouTube ad-related errors
 */
export const initYouTubeErrorSuppression = () => {
  // Override console.error to filter YouTube ad errors
  console.error = (...args: any[]) => {
    const errorMessage = args.join(' ');
    
    // Check if this is a suppressed error pattern
    const shouldSuppress = SUPPRESSED_ERROR_PATTERNS.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (!shouldSuppress) {
      originalConsoleError.apply(console, args);
    }
  };

  // Override console.warn for YouTube warnings
  console.warn = (...args: any[]) => {
    const warnMessage = args.join(' ');
    
    const shouldSuppress = SUPPRESSED_ERROR_PATTERNS.some(pattern => 
      warnMessage.includes(pattern)
    );
    
    if (!shouldSuppress) {
      originalConsoleWarn.apply(console, args);
    }
  };

  // Listen for global errors that might be YouTube-related
  window.addEventListener('error', (event) => {
    const errorMessage = event.message || event.error?.message || '';
    const shouldSuppress = SUPPRESSED_ERROR_PATTERNS.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (shouldSuppress) {
      event.preventDefault();
      return false;
    }
  });

  // Handle unhandled promise rejections (for fetch errors to ad servers)
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason) || '';
    const shouldSuppress = SUPPRESSED_ERROR_PATTERNS.some(pattern => 
      reason.includes(pattern)
    );
    
    if (shouldSuppress) {
      event.preventDefault();
      return false;
    }
  });
};

/**
 * Restore original console methods (useful for cleanup)
 */
export const restoreConsole = () => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
};

/**
 * YouTube iframe configuration for minimal ads and better UX
 */
export const getOptimalYouTubeParams = () => ({
  rel: 0,                    // Don't show related videos
  modestbranding: 1,         // Modest YouTube branding
  iv_load_policy: 3,         // Don't show video annotations
  cc_load_policy: 0,         // Don't show captions by default
  fs: 0,                     // Disable fullscreen button
  disablekb: 1,              // Disable keyboard controls
  controls: 0,               // Hide player controls
  showinfo: 0,               // Don't show video info
  autoplay: 1,               // Enable autoplay
  mute: 1,                   // Start muted
  loop: 1,                   // Loop video
  enablejsapi: 1,            // Enable JavaScript API
  origin: window.location.origin  // Set origin for security
});
