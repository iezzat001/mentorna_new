
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ChevronDown } from 'lucide-react';
import MobileWaitingListDialog from './MobileWaitingListDialog';

const MobileHero = () => {
  const [progress, setProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(15200);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video setup and progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to play and loop
    const playVideo = async () => {
      try {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        await video.play();
      } catch (error) {
        console.error('Video autoplay failed:', error);
      }
    };

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadeddata', playVideo);
    
    // Try to play immediately
    playVideo();

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  const handleHeartClick = () => {
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const formatLikeCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Video Background */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
        controls={false}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => console.error('Video error:', e)}
        style={{ backgroundColor: '#000' }}
      >
        <source src="https://d2mp3ttz3u5gci.cloudfront.net/0703.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback if video fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-purple to-accent-blue opacity-30" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
      
      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between p-4 pt-12">
        <div className="font-heading text-white font-light tracking-wide text-xl">
          iLab®
        </div>

      </div>

      {/* Content Layout */}
      <div className="relative z-20 h-full flex">
        {/* Left Content Area (75%) */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-32">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue mr-3" />
            <div>
              <div className="text-white font-semibold text-sm">@iLab_Official</div>
              <div className="text-white/70 text-xs">AI Education Platform</div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="mb-6">
            <Badge className="bg-primary text-primary-foreground font-black uppercase px-2 py-1 text-xs mb-3">
              🚀 LIMITED LAUNCH
            </Badge>
            <h1 className="text-white text-xl font-bold leading-tight mb-2">
            8-weeks interactive online program that transforms students into startup founders.🚀
            
              
            </h1>
            <p className="text-white/90 text-base leading-relaxed">
            Launch real prodcuts. Solve real problems. Get your first customer
              <span className="text-accent-yellow font-semibold"> #AIEducation #Future</span>
            </p>
          </div>
          
          {/* CTA */}
          <MobileWaitingListDialog>
            <Button className="w-full bg-white text-black font-bold py-4 rounded-full active:scale-95 transition-transform touch-manipulation min-h-[48px]">
              Join Waiting List 🚀
            </Button>
          </MobileWaitingListDialog>
        </div>
        
        {/* Right Action Bar (25%) */}
        <div className="w-16 flex flex-col items-center justify-end pb-32 pr-2">
          {/* Heart Button */}
          <div className="flex flex-col items-center">
            <button 
              onClick={handleHeartClick}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center touch-manipulation relative transition-all duration-200 active:scale-95"
            >
              <Heart 
                className={`w-6 h-6 transition-all duration-200 ${
                  isLiked 
                    ? 'text-red-500 fill-red-500 scale-110' 
                    : 'text-white hover:text-red-300'
                }`} 
              />
            </button>
            <span className="text-white text-xs font-semibold mt-1">
              {formatLikeCount(likeCount)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <ChevronDown className="w-6 h-6 text-white/70 animate-bounce" />
        <span className="text-white/70 text-xs mt-1">Swipe up</span>
      </div>
    </div>
  );
};

export default MobileHero;
