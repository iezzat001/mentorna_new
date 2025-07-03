
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  className?: string;
}

const VideoPlayer = ({ videoUrl, className = "" }: VideoPlayerProps) => {
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
        poster="/placeholder.svg"
      >
        <source src={videoUrl} type="video/quicktime" />
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
