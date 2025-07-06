
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import MobileHero from '@/components/mobile/MobileHero';
import MobileStorySection from '@/components/mobile/MobileStorySection';
import MobilePhasesSection from '@/components/mobile/MobilePhasesSection';
import MobilePricingSection from '@/components/mobile/MobilePricingSection';
import MobileFounderCard from '@/components/mobile/MobileFounderCard';
import MobileComingSoonSection from '@/components/mobile/MobileComingSoonSection';
import MobileNewsletterSection from '@/components/mobile/MobileNewsletterSection';
import { Award, Lightbulb, Rocket, TrendingUp, Zap, Atom } from 'lucide-react';

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
  // Fetch founders from Supabase (same as main landing page)
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

  const phases = [
    {
      phase: "PHASE I",
      title: "Foundation Building",
      description: "Master the fundamentals of AI, coding, and entrepreneurial thinking through hands-on projects and real-world applications.",
      color: "bg-accent-purple",
      icon: Lightbulb,
      weeks: [
        {
          week: 1,
          title: "AI Fundamentals & Python Basics",
          description: "Introduction to artificial intelligence concepts and Python programming"
        },
        {
          week: 2,
          title: "Data Science & Machine Learning", 
          description: "Learn data analysis and basic machine learning algorithms"
        },
        {
          week: 3,
          title: "Web Development Foundations",
          description: "HTML, CSS, JavaScript and modern web development"
        },
        {
          week: 4,
          title: "Entrepreneurship & Business Models",
          description: "Business fundamentals and startup methodology"
        }
      ]
    },
    {
      phase: "PHASE II",
      title: "Advanced Implementation",
      description: "Build real products, launch your startup, and compete for €5,000 prize while developing advanced technical and business skills.",
      color: "bg-accent-blue",
      icon: Rocket,
      weeks: [
        {
          week: 5,
          title: "Advanced AI & APIs",
          description: "Deep learning, AI APIs, and advanced programming concepts"
        },
        {
          week: 6,
          title: "Product Development & MVP",
          description: "Build your minimum viable product and test with users"
        },
        {
          week: 7,
          title: "Business Launch & Marketing",
          description: "Launch strategies, digital marketing, and customer acquisition"
        },
        {
          week: 8,
          title: "Pitch & Competition",
          description: "Final presentations and compete for €5,000 prize"
        }
      ]
    }
  ];

  const comingSoonPrograms = [
    {
      title: "Economics",
      subtitle: "Master the Digital Economy",
      description: "Unlock the secrets of cryptocurrency, blockchain economics, and digital market dynamics",
      icon: TrendingUp,
      gradient: "from-accent-purple to-purple-600"
    },
    {
      title: "Space Tech", 
      subtitle: "Engineer the Final Frontier",
      description: "Design spacecraft systems, satellite technology, and explore Mars colonization strategies",
      icon: Rocket,
      gradient: "from-accent-blue to-blue-600"
    },
    {
      title: "Renewable Energy",
      subtitle: "Power Tomorrow's World", 
      description: "Create sustainable solutions with solar tech, wind systems, and revolutionary energy storage",
      icon: Zap,
      gradient: "from-accent-green to-green-600"
    },
    {
      title: "Quantum Computing",
      subtitle: "Decode the Quantum Future",
      description: "Master quantum algorithms, quantum machine learning, and build applications for the next computing revolution",
      icon: Atom,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
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

      {/* Phases Sections */}
      {phases.map((phase, index) => (
        <div key={index} className="scroll-snap-start">
          <MobilePhasesSection phase={phase} />
        </div>
      ))}

      {/* Pricing Section */}
      <div className="scroll-snap-start">
        <MobilePricingSection />
      </div>

      {/* Coming Soon Sections - 2 programs per slide */}
      <div className="scroll-snap-start">
        <MobileComingSoonSection programs={comingSoonPrograms} slideIndex={0} />
      </div>
      <div className="scroll-snap-start">
        <MobileComingSoonSection programs={comingSoonPrograms} slideIndex={1} />
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
  );
};

export default MobileLanding;
