
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isOnDashboardSubdomain } from "@/utils/subdomain";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import MobileLanding from "./pages/MobileLanding";
import Member from "./pages/Member";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const isDashboardSubdomain = isOnDashboardSubdomain();
  
  // Track visitors on the main site (not on dashboard subdomain)
  if (!isDashboardSubdomain) {
    useVisitorTracking();
  }

  // Initialize tracking on route changes (only with consent)
  useEffect(() => {
    const handleRouteChange = () => {
      // Check if user has given analytics consent
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) return;

      const preferences = JSON.parse(consent);
      if (!preferences.analytics) return;

      // Send page view to Google Analytics if available and consent given
      if (typeof window.gtag === 'function') {
        const gaId = localStorage.getItem('google_analytics_id');
        if (gaId) {
          window.gtag('config', gaId, {
            page_path: window.location.pathname,
          });
        }
      }
      
      // Send page view to Meta Pixel if available and consent given
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    };

    // Track initial page load
    handleRouteChange();
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {isDashboardSubdomain ? (
                // Dashboard subdomain routes - require admin access
                <>
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                // Main domain routes
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/mobile" element={<MobileLanding />} />
                  <Route 
                    path="/member/*" 
                    element={
                      <ProtectedRoute>
                        <Member />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
          
          {/* Show cookie consent banner only on main domain */}
          {!isDashboardSubdomain && <CookieConsent />}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
