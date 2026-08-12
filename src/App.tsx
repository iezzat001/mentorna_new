
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
import ProblemFinder from "./pages/ProblemFinder";
import OneFeature from "./pages/OneFeature";
import Validation from "./pages/Validation";
import Startup30 from "./pages/Startup30";
import EpisodeRedirect from "./pages/EpisodeRedirect";
import MohamedOffer from "./pages/MohamedOffer";
import JassimOffer from "./pages/JassimOffer";
import JaidaOffer from "./pages/JaidaOffer";
import YoussefOffer from "./pages/YoussefOffer";
import Dashboard from "./pages/Dashboard";
import Investment from "./pages/Investment";
import WorkshopDeck from "./pages/WorkshopDeck";
import WorkshopHub from "./pages/WorkshopHub";
import WorkshopSection from "./pages/WorkshopSection";
import NotFound from "./pages/NotFound";
import Valuation from "./pages/Valuation";
import ResponsiveHome from "@/components/ResponsiveHome";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import Workshop from "./pages/Workshop";
import Build from "./pages/Build";
import Mentorship from "./pages/Mentorship";
import Testimonials from "./pages/Testimonials";
import Links from "./pages/Links";

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

                  {/* "ابني Startup في 30 يوم" series hub + numbered shortcuts */}
                  <Route path="/startup-30" element={<Startup30 />} />
                  <Route path="/ep/:n" element={<EpisodeRedirect />} />

                  {/* Startup Problem Finder lead magnet (Arabic RTL) */}
                  <Route path="/problem-finder" element={<ProblemFinder />} />

                  {/* One-Feature Trap lead magnet — Episode 2 (Arabic RTL) */}
                  <Route path="/one-feature" element={<OneFeature />} />

                  {/* Idea validation — Episode 3 (Arabic RTL). Comment word: "validation" */}
                  <Route path="/validation" element={<Validation />} />

                  {/* Startup valuation calculator lead magnet */}
                  <Route path="/valuation" element={<Valuation />} />

                  {/* Workshop landing page (v1 — kept as reference) */}
                  <Route path="/workshop" element={<Workshop />} />

                  {/* Workshop v2 — repositioned for busy professionals */}
                  <Route path="/build" element={<Build />} />

                  {/* 1:1 mentorship landing page */}
                  <Route path="/mentorship" element={<Mentorship />} />

                  {/* Testimonials page */}
                  <Route path="/testimonials" element={<Testimonials />} />

                  {/* Mobile-first link-in-bio storefront */}
                  <Route path="/links" element={<Links />} />

                  {/* Mohamed Offer page */}
                  <Route path="/offer/mohamed" element={<MohamedOffer />} />
                  <Route path="/offer/jaida" element={<JaidaOffer />} />
                  <Route path="/offer/youssef" element={<YoussefOffer />} />
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

                  {/* Investor data room — admin only */}
                  <Route
                    path="/investment"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Investment />
                      </ProtectedRoute>
                    }
                  />

                  {/* Workshop deck — admin only. Hub → per-section → full deck */}
                  <Route
                    path="/workshop-deck"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <WorkshopHub />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/workshop-deck/section/:sectionId"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <WorkshopSection />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/workshop-deck/all"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <WorkshopDeck />
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
