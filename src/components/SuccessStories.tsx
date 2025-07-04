import React from 'react';
import { Award, Lightbulb } from 'lucide-react';
import SuccessStoryCard from './SuccessStoryCard';

const SuccessStories = () => {
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
      description: "Through our mentorship program, Mariam secured a scholarship to study in Ludwig Maximilian University of Munich(LMU) placed at 27th globally, 8th in Europe, and 2nd in Germany. Her success story demonstrates the transformative power of future-focused education."
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
      description: "Omar learned how to come up with innovative ideas and created Omar Waters, the first subscription delivery service for bottled water in Tanta. Through our program, he discovered how to test the validity of his idea and assess market potential using AI while building his mobile app and getting ready to launch his business."
    }
  ];

  return (
    <section className="bg-accent-yellow border-b-4 border-foreground py-16 px-0 md:px-6">
      <div className="container mx-auto max-w-6xl px-4 md:px-0">
        {/* Section Header */}
        <div className="text-center mb-16 px-4 md:px-0">
          <h2 className="
            font-heading 
            text-4xl md:text-5xl lg:text-6xl 
            font-black 
            uppercase 
            text-foreground 
            mb-6
          ">
            MEET OUR FUTURE TECH ENTREPRENEURS
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
            SUCCESS STORIES
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <SuccessStoryCard
              key={index}
              name={story.name}
              emoji={story.emoji}
              badge={story.badge}
              badgeColor={story.badgeColor}
              headerColor={story.headerColor}
              icon={story.icon}
              videoUrl={story.videoUrl}
              thumbnailUrl={story.thumbnailUrl}
              description={story.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
