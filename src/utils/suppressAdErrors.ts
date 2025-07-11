// Utility to suppress YouTube ad-related console errors
// These errors occur when adblockers block YouTube's ad requests and are not actual application errors

const suppressYouTubeAdErrors = () => {
  // Store original console.error
  const originalError = console.error;
  
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    
    // Suppress specific YouTube ad-related errors
    if (
      message.includes('googleads.g.doubleclick.net') ||
      message.includes('static.doubleclick.net') ||
      message.includes('ERR_BLOCKED_BY_CLIENT') ||
      message.includes('www-embed-player') ||
      message.includes('pagead/id') ||
      message.includes('ad_status.js')
    ) {
      // These are expected when adblockers are active, don't log them
      return;
    }
    
    // Call original console.error for all other errors
    originalError.apply(console, args);
  };
};

// Initialize error suppression when module loads
if (typeof window !== 'undefined') {
  suppressYouTubeAdErrors();
}

export { suppressYouTubeAdErrors };
