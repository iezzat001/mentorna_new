
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import MobileHero from '@/components/mobile/MobileHero';
import MobileStorySection from '@/components/mobile/MobileStorySection';
import MobileRoadmapSection from '@/components/mobile/MobileRoadmapSection';
import MobilePhasesSection from '@/components/mobile/MobilePhasesSection';
import MobilePricingSection from '@/components/mobile/MobilePricingSection';
import MobileFounderCard from '@/components/mobile/MobileFounderCard';
import MobileComingSoonSection from '@/components/mobile/MobileComingSoonSection';
import MobileNewsletterSection from '@/components/mobile/MobileNewsletterSection';
import ViewSwitcher from '@/components/ViewSwitcher';
import { Award, Lightbulb, Rocket, TrendingUp, GraduationCap } from 'lucide-react';
import { useWeeksData } from '@/hooks/useWeeksData';

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

const MobileLanding = () => {
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

  // Fetch weeks data from database
  const { data: weeks, isLoading: weeksLoading } = useWeeksData();

  // Convert database founder to the format expected by MobileFounderCard
  const convertFounder = (founder: Founder) => ({
    id: parseInt(founder.id.slice(-8), 16), // Convert UUID to number for compatibility
    name: founder.name,
    title: founder.title,
    shortBio: founder.short_bio,
    extendedBio: founder.extended_bio,
    image: founder.image_url,
    socialMedia: {
      linkedin: founder.linkedin_url,
      twitter: founder.twitter_url
    }
  });

  const stories = [
    {
      name: "MARIAM ABDELAZIZ",
      emoji: "🎓",
      badge: "UNIVERSITY SCHOLARSHIP WINNER",
      badgeColor: "bg-accent-green",
      headerColor: "bg-accent-purple",
      icon: Award,
      videoUrl: "https://d2mp3ttz3u5gci.cloudfront.net/mariam.MOV",
      thumbnailUrl: "https://d2mp3ttz3u5gci.cloudfront.net/mariam_thumbnail.png",
      description: "Secured a scholarship to study at Ludwig Maximilian University of Munich (LMU) - ranked 27th globally! 🏆",
      likes: "15.2K",
      comments: "3.1K",
      shares: "1.2K",
      hashtags: ["ScholarshipWinner", "Munich", "Success", "AIEducation"]
    },
    {
      name: "OMAR MOSA",
      emoji: "💡",
      badge: "YOUNG ENTREPRENEUR & INNOVATOR",
      badgeColor: "bg-accent-yellow",
      headerColor: "bg-accent-blue",
      icon: Lightbulb,
      videoUrl: "https://www.youtube.com/live/y4RMA94rLQ4?feature=shared&t=3927",
      thumbnailUrl: "https://d2mp3ttz3u5gci.cloudfront.net/omar_thumbnail.png",
      description: "Created Omar Waters - the first subscription delivery service for bottled water in Tanta using AI! 💧",
      likes: "18.7K",
      comments: "4.5K",
      shares: "2.1K",
      hashtags: ["Entrepreneur", "StartupLife", "Innovation", "WaterDelivery"]
    }
  ];

  // Create phases using dynamic data from database
  const phases = weeks && !weeksLoading ? [
    {
      phase: "PHASE I",
      title: "Foundation Building",
      description: "Master the fundamentals of AI, coding, and entrepreneurial thinking through hands-on projects and real-world applications.",
      color: "bg-accent-purple",
      icon: Lightbulb,
      weeks: weeks.filter(week => week.phase === 'Foundation Building').map(week => ({
        week: week.week,
        title: week.title,
        description: week.description
      }))
    },
    {
      phase: "PHASE II",
      title: "Advanced Implementation",
      description: "Build real products, launch your startup, and compete for €5,000 prize while developing advanced technical and business skills.",
      color: "bg-accent-blue",
      icon: Rocket,
      weeks: weeks.filter(week => week.phase === 'Advanced Implementation').map(week => ({
        week: week.week,
        title: week.title,
        description: week.description
      }))
    }
  ] : [];

  const comingSoonPrograms = [
    {
      title: "Economics",
      subtitle: "Master the Digital Economy",
      description: "Unlock the secrets of cryptocurrency, blockchain economics, and digital market dynamics",
      icon: TrendingUp,
      gradient: "from-accent-purple to-purple-600"
    },
    {
      title: "Study Abroad", 
      subtitle: "Master Global Education",
      description: "Develop a global student mindset, secure scholarships to world's best universities, and get seats in Ivy League institutions",
      icon: GraduationCap,
      gradient: "from-accent-blue to-blue-600"
    }
  ];

  // Show loading state while weeks are loading
  if (weeksLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg font-black uppercase text-foreground mb-2">Loading Course Content...</div>
          <div className="text-sm text-foreground/60">Please wait while we load the latest program details</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="
        h-screen 
        overflow-y-scroll 
        scroll-snap-type-y 
        scroll-snap-mandatory
        scrollbar-hide
      ">
        {/* Hero Section */}
        <div className="scroll-snap-start">
          <MobileHero />
        </div>
        
        {/* Success Stories Sections */}
        {stories.map((story, index) => (
          <div key={index} className="scroll-snap-start">
            <MobileStorySection story={story} />
          </div>
        ))}

        {/* Roadmap Section */}
        <div className="scroll-snap-start">
          <MobileRoadmapSection />
        </div>

        {/* Phases Sections - Now using dynamic data */}
        {phases.map((phase, index) => (
          <div key={index} className="scroll-snap-start">
            <MobilePhasesSection phase={phase} />
          </div>
        ))}

        {/* Pricing Section */}
        <div className="scroll-snap-start">
          <MobilePricingSection />
        </div>

        {/* Coming Soon Section */}
        <div className="scroll-snap-start">
          <MobileComingSoonSection programs={comingSoonPrograms} slideIndex={0} />
        </div>

        {/* Founders Sections */}
        {founders?.map((founder) => (
          <div key={founder.id} className="scroll-snap-start">
            <MobileFounderCard founder={convertFounder(founder)} />
          </div>
        ))}

        {/* Newsletter Section */}
        <div className="scroll-snap-start">
          <MobileNewsletterSection />
        </div>
      </div>
      
      {/* Add View Switcher */}
      <ViewSwitcher />
    </>
  );
};

export default MobileLanding;
