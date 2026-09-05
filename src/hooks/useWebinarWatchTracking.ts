import { useEffect, useRef } from "react";
import {
  getDeviceType,
  getWebinarSessionId,
  recordWatchEvent,
  type WebinarEventType,
} from "@/lib/webinarAnalytics";

const HEARTBEAT_INTERVAL_SECONDS = 15;
/** Max plausible gap between timeupdate ticks; larger deltas are treated as seeks. */
const MAX_TICK_DELTA_SECONDS = 2;

/**
 * Attaches watch-time analytics to a <video> element.
 *
 * Accumulates genuinely-watched seconds from `timeupdate` deltas (ignoring
 * seeks), and flushes a "heartbeat" event every ~15s of playback plus on
 * pause / end / tab-hide / unload. Fires a "play" event on first play and a
 * "complete" event when the video ends.
 */
export const useWebinarWatchTracking = (
  videoRef: React.RefObject<HTMLVideoElement>,
  webinarId: string
) => {
  const watchedRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastFlushAtRef = useRef(0);
  const hasPlayedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !webinarId) return;

    const sessionId = getWebinarSessionId();
    const deviceType = getDeviceType();

    const send = (eventType: WebinarEventType, extraWatched = 0) => {
      const watched = watchedRef.current + extraWatched;
      const delta = watched - lastFlushAtRef.current;
      // Skip empty heartbeats.
      if (eventType === "heartbeat" && delta <= 0) return;
      lastFlushAtRef.current = watched;
      void recordWatchEvent({
        session_id: sessionId,
        webinar_id: webinarId,
        event_type: eventType,
        position_seconds: Math.round(video.currentTime),
        watched_seconds: eventType === "play" ? 0 : Math.round(delta),
        video_duration: Number.isFinite(video.duration) ? Math.round(video.duration) : null,
        device_type: deviceType,
      });
    };

    const handlePlay = () => {
      lastTimeRef.current = video.currentTime;
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        send("play");
      }
    };

    const handleTimeUpdate = () => {
      const delta = video.currentTime - lastTimeRef.current;
      lastTimeRef.current = video.currentTime;
      // Only count forward playback in small increments (ignore seeks/rewinds).
      if (delta > 0 && delta <= MAX_TICK_DELTA_SECONDS) {
        watchedRef.current += delta;
      }
      if (watchedRef.current - lastFlushAtRef.current >= HEARTBEAT_INTERVAL_SECONDS) {
        send("heartbeat");
      }
    };

    const handleSeeking = () => {
      // Reset the reference so the seek gap is not counted as watch time.
      lastTimeRef.current = video.currentTime;
    };

    const handlePause = () => send("heartbeat");

    const handleEnded = () => {
      send("heartbeat");
      if (!completedRef.current) {
        completedRef.current = true;
        send("complete");
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") send("heartbeat");
    };

    const handlePageHide = () => send("heartbeat");

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      // Flush any remaining watch time when the player unmounts.
      send("heartbeat");
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webinarId]);
};
