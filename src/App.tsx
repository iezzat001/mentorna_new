
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isOnDashboardSubdomain } from "@/utils/subdomain";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import PageTracker from "@/components/PageTracker";
import Index from "./pages/Index";
import MobileLanding from "./pages/MobileLanding";
import Member from "./pages/Member";
import VibeCoding from "./pages/VibeCoding";
import SkillsIn2026 from "./pages/SkillsIn2026";
import MohamedOffer from "./pages/MohamedOffer";
import JassimOffer from "./pages/JassimOffer";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Valuation from "./pages/Valuation";
import ResponsiveHome from "@/components/ResponsiveHome";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import Workshop from "./pages/Workshop";

const queryClient = new QueryClient();

const App = () => {
  const isDashboardSubdomain = isOnDashboardSubdomain();

  // Track visitors on the main site (not on dashboard subdomain)
  useVisitorTracking(!isDashboardSubdomain);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Page tracking component - must be inside Router context */}
            <PageTracker isEnabled={!isDashboardSubdomain} />
            
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
                  {/* Root path - shows desktop or mobile view based on device */}
                  <Route path="/" element={<ResponsiveHome />} />

                  {/* Protected member area */}
                  <Route
                    path="/member/*"
                    element={
                      <ProtectedRoute>
                        <Member />
                      </ProtectedRoute>
                    }
                  />

                  {/* Vibe Coding lead magnet page */}
                  <Route path="/vibecoding" element={<VibeCoding />} />

                  {/* Skills in 2026 page */}
                  <Route path="/skills-in-2026" element={<SkillsIn2026 />} />

                  {/* Startup valuation calculator lead magnet */}
                  <Route path="/valuation" element={<Valuation />} />

                  {/* Workshop landing page */}
                  <Route path="/workshop" element={<Workshop />} />

                  {/* Mohamed Offer page */}
                  <Route path="/offer/mohamed" element={<MohamedOffer />} />
                  <Route path="/mentorship-offer" element={<JassimOffer />} />

                  {/* Admin dashboard */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 page */}
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
