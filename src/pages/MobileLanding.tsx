
import React from 'react';
import MobileHero from '@/components/mobile/MobileHero';
import MobileStorySection from '@/components/mobile/MobileStorySection';
import { Award, Lightbulb } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      {/* Hero Section */}
      <MobileHero />
      
      {/* Success Stories Sections */}
      {stories.map((story, index) => (
        <MobileStorySection key={index} story={story} />
      ))}
    </div>
  );
};

export default MobileLanding;
