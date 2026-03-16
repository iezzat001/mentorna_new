
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  className?: string;
}

const VideoPlayer = ({ videoUrl, thumbnailUrl, className = "" }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if the URL is a YouTube URL
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID and convert to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const videoId = url.includes('/live/') 
      ? url.split('/live/')[1].split('?')[0]
      : urlParams.get('v');
    const startTime = urlParams.get('t');
    
    if (videoId) {
      let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      if (startTime) {
        embedUrl += `&start=${startTime}`;
      }
      return embedUrl;
    }
    return url;
  };

  // Handle click for YouTube videos (show embedded player)
  const handleVideoClick = () => {
    if (isYouTubeUrl(videoUrl)) {
      setIsPlaying(true);
    }
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  if (isYouTubeUrl(videoUrl)) {
    if (isPlaying) {
      // Show embedded YouTube player
      return (
        <div className={`
          border-4 
          border-foreground 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          mb-6 
          bg-black
          relative
          ${className}
        `}>
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* YouTube embedded iframe */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getYouTubeEmbedUrl(videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      );
    }

    // Show thumbnail with play button (default state)
    return (
      <div 
        className={`
          border-4 
          border-foreground 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          mb-6 
          bg-black
          relative
          cursor-pointer
          group
          hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          hover:scale-[1.02]
          transition-all
          duration-200
          ${className}
        `}
        onClick={handleVideoClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={thumbnailUrl || "/placeholder.svg"} 
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
            <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </div>
          </div>
          {/* YouTube indicator */}
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            YOUTUBE
          </div>
        </div>
      </div>
    );
  }

  // For regular video files (like Mariam's video)
  return (
    <div className={`
      border-4 
      border-foreground 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
      mb-6 
      bg-black
      ${className}
    `}>
      <video 
        controls 
        className="w-full h-48 object-cover"
        poster={thumbnailUrl || "/placeholder.svg"}
      >
        <source src={videoUrl} type="video/quicktime" />
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
