
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, BookOpen, Award, Lightbulb } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';

interface StoryData {
  name: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  headerColor: string;
  icon: LucideIcon;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  hashtags: string[];
}

interface MobileStorySectionProps {
  story: StoryData;
}

const MobileStorySection = ({ story }: MobileStorySectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    };

    const handleLoadedMetadata = () => {
      setProgress(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      setProgress(100);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        {story.videoUrl.includes('youtube') ? (
          // YouTube video placeholder
          <div className="w-full h-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <story.icon className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
              <p className="text-sm opacity-80">Video Story</p>
            </div>
          </div>
        ) : (
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            onClick={togglePlayPause}
          >
            <source src={story.videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab® Success Stories
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 h-full flex">
        {/* Left side - Content */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-32">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full ${story.headerColor} mr-3 flex items-center justify-center`}>
              <story.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">@{story.name.toLowerCase().replace(' ', '_')}</div>
              <div className="text-white/70 text-xs">Success Story</div>
            </div>
            <Button 
              size="sm" 
              className="ml-3 bg-transparent border border-white/50 text-white text-xs px-3 py-1 h-7"
            >
              Follow
            </Button>
          </div>
          
          {/* Badge */}
          <div className={`${story.badgeColor} text-foreground font-bold uppercase px-3 py-1 text-xs border-2 border-white inline-block mb-4 max-w-fit`}>
            {story.badge}
          </div>
          
          {/* Main Text Content */}
          <div className="mb-6">
            <h1 className="text-white text-xl font-bold leading-tight mb-2">
              {story.emoji} {story.name}
            </h1>
            <p className="text-white/90 text-base leading-relaxed mb-3">
              {story.description}
            </p>
            
            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {story.hashtags.map((tag, index) => (
                <span key={index} className="text-accent-blue text-sm">#{tag}</span>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <WaitingListDialog>
            <Button className="
              w-full 
              bg-white 
              text-black 
              font-bold 
              py-4 
              rounded-full 
              hover:bg-white/90
              transition-all
              text-base
            ">
              Join Our Program 🚀
            </Button>
          </WaitingListDialog>
        </div>
        
        {/* Right side - Action Bar */}
        <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
          {/* Like Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">{story.likes}</span>
          </div>
          
          {/* Comment Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">{story.comments}</span>
          </div>
          
          {/* Share Button */}
          <div className="flex flex-col items-center mb-6">
            <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
              <Share className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-xs font-semibold">{story.shares}</span>
          </div>
          
          {/* Learn More Button */}
          <div className="flex flex-col items-center">
            <WaitingListDialog>
              <button className="w-12 h-12 rounded-full bg-accent-yellow/80 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform">
                <BookOpen className="w-6 h-6 text-black" />
              </button>
            </WaitingListDialog>
            <span className="text-white text-xs font-semibold">Apply</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Swipe Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-1 h-8 bg-white/50 rounded-full animate-pulse" />
          <span className="text-white/70 text-xs mt-1">Swipe up</span>
        </div>
      </div>
    </div>
  );
};

export default MobileStorySection;
