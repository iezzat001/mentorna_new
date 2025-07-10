
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import ViewSwitcher from '@/components/ViewSwitcher';
import Hero from '@/components/Hero';
import SuccessStories from '@/components/SuccessStories';
import RoadmapSection from '@/components/RoadmapSection';
import ProgramSection from '@/components/ProgramSection';
import PricingSection from '@/components/PricingSection';
import FoundersSection from '@/components/FoundersSection';
import ComingSoon from '@/components/ComingSoon';
import NewsletterForm from '@/components/NewsletterForm';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect mobile users to the mobile-optimized page
    if (isMobile) {
      navigate('/mobile', { replace: true });
    }
  }, [isMobile, navigate]);

  // Don't render the desktop layout if we're on mobile (prevents flash before redirect)
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Hero />
        <SuccessStories />
        <RoadmapSection />
        <ProgramSection />
        <PricingSection />
        <FoundersSection />
        <ComingSoon />
        <NewsletterForm />
        <Footer />
      </div>
      
      {/* Add View Switcher */}
      <ViewSwitcher />
    </>
  );
};

export default Index;
