
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Hero from '@/components/Hero';
import ProgramSection from '@/components/ProgramSection';
import SuccessStories from '@/components/SuccessStories';
import RoadmapSection from '@/components/RoadmapSection';
import PricingSection from '@/components/PricingSection';
import ComingSoon from '@/components/ComingSoon';
import FoundersSection from '@/components/FoundersSection';
import SecondarySection from '@/components/SecondarySection';

interface Founder {
  id: string;
  name: string;
  title: string;
  short_bio: string;
  extended_bio: string;
  image_url: string;
  linkedin_url: string;
  twitter_url: string;
  order_index: number;
  is_active: boolean;
}

const Index = () => {
  // Fetch founders from Supabase
  const { data: founders } = useQuery({
    queryKey: ['founders-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      
      if (error) throw error;
      return data as Founder[];
    }
  });

  return (
    <div className="min-h-screen">
      <Hero />
      <SuccessStories />
      <RoadmapSection />
      <ProgramSection />
      <PricingSection />
      <ComingSoon />
      <FoundersSection />
      <SecondarySection />
    </div>
  );
};

export default Index;
