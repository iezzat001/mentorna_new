
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FounderCard from './FounderCard';
import { normalizeSocialUrl } from '@/utils/socialLinks';

interface Founder {
  id: string;
  name: string;
  title: string;
  short_bio: string;
  extended_bio: string;
  image_url: string;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url?: string | null;
  tiktok_url?: string | null;
  order_index: number;
  is_active: boolean;
}

const FoundersSection = () => {
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

  // Convert database founder to the format expected by FounderCard
  const convertFounder = (founder: Founder) => ({
    id: parseInt(founder.id.slice(-8), 16), // Convert UUID to number for compatibility
    name: founder.name,
    title: founder.title,
    shortBio: founder.short_bio,
    extendedBio: founder.extended_bio,
    image: founder.image_url,
    socialMedia: {
      linkedin: normalizeSocialUrl(founder.linkedin_url, 'linkedin') ?? '',
      twitter: normalizeSocialUrl(founder.twitter_url, 'twitter') ?? '',
      instagram: normalizeSocialUrl(founder.instagram_url, 'instagram') ?? '',
      tiktok: normalizeSocialUrl(founder.tiktok_url, 'tiktok') ?? ''
    }
  });

  return (
    <section className="bg-accent-purple border-b-4 border-foreground py-16 px-6" id="founders">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-heading 
            text-4xl md:text-5xl lg:text-6xl 
            font-black 
            uppercase 
            text-foreground 
            mb-6
          ">
            MEET THE MENTORS
          </h2>
          <div className="
            bg-foreground 
            text-background 
            font-black 
            uppercase 
            px-6 
            py-2 
            text-sm 
            border-4 
            border-foreground 
            inline-block
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          ">
            FOUNDERS • OPERATORS • AI BUILDERS
          </div>
          <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg font-semibold text-foreground/80">
            You’re not buying theory. You’re working with mentors who build, ship, and help founders turn ideas into MVPs
            and first customers.
          </p>
        </div>

        {/* Mentors */}
        <div className="flex flex-col items-center gap-8 mb-12">
          {founders?.map((founder) => (
            <FounderCard key={founder.id} founder={convertFounder(founder)} />
          ))}
        </div>

        {/* Trust Message */}
        <div className="
          bg-white 
          border-4 
          border-foreground 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          p-8 
          text-center
        ">
          <p className="
            font-body 
            text-lg 
            font-bold 
            text-foreground 
            leading-relaxed
          ">
            Founders trust us because we’ve shipped real products and built repeatable systems. The focus is execution:
            validate fast, build the MVP, launch, and get your first customers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
