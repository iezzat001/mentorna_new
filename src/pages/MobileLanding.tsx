
import React from 'react';
import MobileHero from '@/components/mobile/MobileHero';
import MobileStorySection from '@/components/mobile/MobileStorySection';
import MobilePhasesSection from '@/components/mobile/MobilePhasesSection';
import MobilePricingSection from '@/components/mobile/MobilePricingSection';
import MobileFounderCard from '@/components/mobile/MobileFounderCard';
import { Award, Lightbulb, Rocket } from 'lucide-react';

const MobileLanding = () => {
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

  const founders = [
    {
      name: "Ahmed Hassan",
      title: "AI & Entrepreneurship Expert",
      image: "https://d2mp3ttz3u5gci.cloudfront.net/ahmed_founder.jpg",
      background: "Former Tech Lead at Google & successful startup founder with 15+ years in AI development",
      experience: "Built 3 AI startups, mentored 200+ entrepreneurs, raised $50M+ in funding",
      education: "PhD Computer Science, Stanford University",
      achievements: [
        "Founded AI startup acquired by Microsoft for $120M",
        "Published 50+ research papers in top AI conferences",
        "Forbes 30 Under 30 in Technology",
        "Mentored unicorn startup founders"
      ],
      quote: "Every child has the potential to create the next breakthrough innovation. Our job is to unlock that potential.",
      linkedin: "https://linkedin.com/in/ahmed-hassan-ai",
      email: "ahmed@ilab-program.com",
      color: "bg-accent-purple",
      location: "San Francisco, CA"
    },
    {
      name: "Sarah Mitchell",
      title: "Youth Development & Education Specialist",
      image: "https://d2mp3ttz3u5gci.cloudfront.net/sarah_founder.jpg",
      background: "Former Director of Education at Khan Academy with expertise in youth development and innovative learning methodologies",
      experience: "Designed curricula for 10M+ students globally, specialized in STEM education for young minds",
      education: "EdD Educational Leadership, Harvard University",
      achievements: [
        "Led education initiatives reaching 10M+ students",
        "TEDx speaker on future of education (2M+ views)",
        "Winner of Global Education Innovation Award",
        "Advisor to UNESCO on digital learning"
      ],
      quote: "The future belongs to young minds who can think creatively and solve problems that don't exist yet.",
      linkedin: "https://linkedin.com/in/sarah-mitchell-edu",
      email: "sarah@ilab-program.com",
      color: "bg-accent-blue",
      location: "Boston, MA"
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

      {/* Founders Sections */}
      {founders.map((founder, index) => (
        <div key={index} className="scroll-snap-start">
          <MobileFounderCard founder={founder} />
        </div>
      ))}
    </div>
  );
};

export default MobileLanding;
