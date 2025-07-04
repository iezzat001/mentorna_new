
import React from 'react';
import MobileHero from '@/components/mobile/MobileHero';
import MobileStorySection from '@/components/mobile/MobileStorySection';
import MobilePhasesSection from '@/components/mobile/MobilePhasesSection';
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

  return (
    <div className="min-h-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      {/* Hero Section */}
      <MobileHero />
      
      {/* Success Stories Sections */}
      {stories.map((story, index) => (
        <MobileStorySection key={index} story={story} />
      ))}

      {/* Phases Sections */}
      {phases.map((phase, index) => (
        <MobilePhasesSection key={index} phase={phase} />
      ))}
    </div>
  );
};

export default MobileLanding;
