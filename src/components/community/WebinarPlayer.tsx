import React, { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useWebinarWatchTracking } from "@/hooks/useWebinarWatchTracking";
import { webinarMediaUrl, type Webinar } from "@/data/webinars";

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
    const url = webinarMediaUrl(webinar.posterFile);
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
      className={`border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black relative ${className}`}
    >
      {errored ? (
        <div className="flex flex-col items-center justify-center gap-3 aspect-video bg-muted text-center p-6">
          <AlertTriangle className="h-10 w-10 text-foreground" />
          <p className="font-black uppercase text-foreground">Recording coming soon</p>
          <p className="text-sm font-semibold text-foreground/70 max-w-md">
            This webinar recording hasn't finished uploading yet. Please check back shortly.
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          className="w-full aspect-video bg-black"
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
