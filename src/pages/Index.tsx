
import React from 'react';
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
  return (
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
  );
};

export default Index;
