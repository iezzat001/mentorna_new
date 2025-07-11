
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
import { usePageTracking } from "@/hooks/usePageTracking";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const isDashboardSubdomain = isOnDashboardSubdomain();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [measurementId, setMeasurementId] = useState('');
  
  // Track visitors on the main site (not on dashboard subdomain)
  if (!isDashboardSubdomain) {
    useVisitorTracking();
  }

  // Check for analytics consent and measurement ID
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const gaId = localStorage.getItem('google_analytics_id');
    
    if (consent) {
      const preferences = JSON.parse(consent);
      setAnalyticsEnabled(preferences.analytics);
    }
    
    if (gaId && gaId.trim()) {
      setMeasurementId(gaId.trim());
    }
  }, []);

  // Enable page tracking for SPA navigation when analytics is enabled
  usePageTracking({
    measurementId,
    isEnabled: analyticsEnabled && !isDashboardSubdomain
  });

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
