import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useWebinarWatchTracking } from "@/hooks/useWebinarWatchTracking";
import { webinarMediaUrl, webinarPosterUrl, type Webinar } from "@/data/webinars";

interface WebinarPlayerProps {
  webinar: Webinar;
  className?: string;
}

const WebinarPlayer: React.FC<WebinarPlayerProps> = ({ webinar, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);
  // Only use a poster once we've confirmed it loads; otherwise let the video
  // fall back to its first frame (posters may not be uploaded yet).
  const [poster, setPoster] = useState<string | undefined>(undefined);

  useWebinarWatchTracking(videoRef, webinar.id);

  const videoUrl = webinarMediaUrl(webinar.videoFile);

  useEffect(() => {
    if (!webinar.posterFile) {
      setPoster(undefined);
      return;
    }
    const url = webinarPosterUrl(webinar.posterFile);
    const img = new Image();
    img.onload = () => setPoster(url);
    img.onerror = () => setPoster(undefined);
    img.src = url;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [webinar.posterFile]);

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] bg-black shadow-[0_30px_70px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 ${className}`}
    >
      {errored ? (
        <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-black/90 p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-[#F7E9D6]/80" />
          <p className="font-heading text-lg font-light tracking-tight text-[#F7E9D6]">
            Recording coming soon
          </p>
          <p className="max-w-md font-heading text-sm font-light text-[#F7E9D6]/60">
            This webinar recording hasn't finished uploading yet. Please check back shortly.
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-black"
          poster={poster}
          onError={() => setErrored(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default WebinarPlayer;
