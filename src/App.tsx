
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isOnDashboardSubdomain } from "@/utils/subdomain";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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

  // Initialize tracking on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Send page view to Google Analytics if available
      if (typeof window.gtag === 'function') {
        window.gtag('config', localStorage.getItem('google_analytics_id'), {
          page_path: window.location.pathname,
        });
      }
      
      // Send page view to Meta Pixel if available
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
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
