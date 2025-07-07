
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, VolumeX, Volume2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import WaitingListDialog from '../WaitingListDialog';
import MobileSwipeIndicator from './MobileSwipeIndicator';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(parseInt(story.likes.replace('K', '')) * 1000);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isYouTubeVideo = story.videoUrl.includes('youtube.com') || story.videoUrl.includes('youtu.be');

  // Extract YouTube video ID and convert to embeddable URL
  const getYouTubeEmbedUrl = (url: string, muted: boolean = true) => {
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/live/')) {
      videoId = url.split('live/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    // Add timestamp if present in original URL
    const timeMatch = url.match(/[&?]t=(\d+)/);
    const startTime = timeMatch ? `&start=${timeMatch[1]}` : '';
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}${startTime}&enablejsapi=1`;
  };

  useEffect(() => {
    if (isYouTubeVideo) return;
    
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
  }, [isYouTubeVideo]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    if (isYouTubeVideo) {
      // For YouTube videos, we need to reload the iframe with new mute parameter
      setIsMuted(!isMuted);
      // The iframe will be re-rendered with the new muted state
    } else {
      const video = videoRef.current;
      if (!video) return;

      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden snap-start">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        {isYouTubeVideo ? (
          // YouTube iframe embed
          <iframe
            ref={iframeRef}
            src={getYouTubeEmbedUrl(story.videoUrl, isMuted)}
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={`${story.name} Success Story`}
            key={isMuted ? 'muted' : 'unmuted'} // Force re-render when mute state changes
          />
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
          {/* Speaker/Mute Button - Show for all videos */}
          <div className="flex flex-col items-center mb-6">
            <button 
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          
          {/* Like Button */}
          <div className="flex flex-col items-center mb-6">
            <button 
              onClick={handleLike}
              className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center mb-1 active:scale-95 transition-transform"
            >
              <Heart 
                className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
              />
            </button>
            <span className="text-white text-xs font-semibold">{formatLikes(likes)}</span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar - Only show for regular videos, not YouTube */}
      {!isYouTubeVideo && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {/* Swipe Indicator */}
      <MobileSwipeIndicator />
    </div>
  );
};

export default MobileStorySection;
