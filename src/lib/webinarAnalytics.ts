import { supabase } from "@/integrations/supabase/client";
import type { Webinar } from "@/data/webinars";

export type WebinarEventType = "play" | "heartbeat" | "complete";

export interface WebinarWatchEvent {
  session_id: string;
  webinar_id: string;
  event_type: WebinarEventType;
  /** Playback position (seconds) when the event fired. */
  position_seconds: number;
  /** Seconds of actual watching accumulated since the previous event. */
  watched_seconds: number;
  /** Total duration of the video, if known. */
  video_duration: number | null;
  device_type: string | null;
  created_at: string;
}

const LOCAL_BUFFER_KEY = "webinar_watch_events_local";
const RETRY_QUEUE_KEY = "webinar_watch_events_retry";

/** Reuse the same session id as first-party visitor tracking. */
export const getWebinarSessionId = (): string => {
  try {
    let sessionId = sessionStorage.getItem("visitor_session_id");
    if (!sessionId) {
      const timestamp = Date.now().toString(36);
      const randomPart = Math.random().toString(36).substring(2, 15);
      sessionId = `sess_${timestamp}_${randomPart}`;
      sessionStorage.setItem("visitor_session_id", sessionId);
    }
    return sessionId;
  } catch {
    return `sess_${Date.now().toString(36)}`;
  }
};

export const getDeviceType = (): string => {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  if (isMobile && !isTablet) return "Mobile";
  if (isTablet) return "Tablet";
  return "Desktop";
};

const readLocal = (key: string): WebinarWatchEvent[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as WebinarWatchEvent[]) : [];
  } catch {
    return [];
  }
};

const appendLocal = (key: string, event: WebinarWatchEvent) => {
  try {
    const events = readLocal(key);
    events.push(event);
    // Keep the buffers bounded.
    localStorage.setItem(key, JSON.stringify(events.slice(-2000)));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
};

/**
 * Record a single watch event. Best-effort: it inserts into Supabase and, on
 * failure (offline, or the table not yet provisioned), queues the event in
 * localStorage for a later retry. In development it also mirrors events to a
 * local buffer so the dashboard can be exercised without the hosted table.
 */
export const recordWatchEvent = async (
  event: Omit<WebinarWatchEvent, "created_at"> & { created_at?: string }
): Promise<void> => {
  const full: WebinarWatchEvent = {
    created_at: new Date().toISOString(),
    ...event,
  };

  if (import.meta.env.DEV) {
    appendLocal(LOCAL_BUFFER_KEY, full);
  }

  const { error } = await supabase.from("webinar_watch_events").insert({
    session_id: full.session_id,
    webinar_id: full.webinar_id,
    event_type: full.event_type,
    position_seconds: full.position_seconds,
    watched_seconds: full.watched_seconds,
    video_duration: full.video_duration,
    device_type: full.device_type,
  });

  if (error) {
    appendLocal(RETRY_QUEUE_KEY, full);
    if (import.meta.env.DEV) {
      console.warn("[webinarAnalytics] insert failed, buffered locally:", error.message);
    }
  }
};

/**
 * Attempt to flush any events that previously failed to insert.
 * Safe to call on load; it silently no-ops when the queue is empty or the
 * backend is still unavailable.
 */
export const flushRetryQueue = async (): Promise<void> => {
  const queued = readLocal(RETRY_QUEUE_KEY);
  if (queued.length === 0) return;

  const { error } = await supabase.from("webinar_watch_events").insert(
    queued.map((e) => ({
      session_id: e.session_id,
      webinar_id: e.webinar_id,
      event_type: e.event_type,
      position_seconds: e.position_seconds,
      watched_seconds: e.watched_seconds,
      video_duration: e.video_duration,
      device_type: e.device_type,
    }))
  );

  if (!error) {
    try {
      localStorage.removeItem(RETRY_QUEUE_KEY);
    } catch {
      /* ignore */
    }
  }
};

/**
 * How far back the dashboard queries watch events. Keeps the query bounded as
 * the table grows (heartbeats accumulate quickly during long recordings).
 */
const FETCH_WINDOW_DAYS = 90;

/**
 * Fetch watch events for aggregation. Queries the hosted table; in development
 * it falls back to (and merges) the local buffer so the dashboard can be
 * demonstrated before the migration is applied.
 */
export const fetchWatchEvents = async (): Promise<WebinarWatchEvent[]> => {
  const since = new Date(
    Date.now() - FETCH_WINDOW_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("webinar_watch_events")
    .select(
      "session_id, webinar_id, event_type, position_seconds, watched_seconds, video_duration, device_type, created_at"
    )
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  const remote = (!error && data ? (data as WebinarWatchEvent[]) : []);

  if (import.meta.env.DEV) {
    const local = readLocal(LOCAL_BUFFER_KEY);
    return [...remote, ...local];
  }

  return remote;
};

export interface WebinarStats {
  webinarId: string;
  views: number;
  uniqueViewers: number;
  totalWatchSeconds: number;
  avgWatchSeconds: number;
  completions: number;
  completionRate: number;
  avgPercentWatched: number;
}

export interface AggregatedWebinarAnalytics {
  perWebinar: WebinarStats[];
  totals: {
    views: number;
    uniqueViewers: number;
    totalWatchSeconds: number;
    avgWatchSeconds: number;
    completionRate: number;
  };
  /** Retention curve (0-100% of duration) for a single webinar. */
  retention: (webinarId: string, buckets?: number) => { bucket: string; percent: number }[];
}

const round = (n: number, dp = 1): number => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

/** Pure aggregation of raw watch events into dashboard-ready stats. */
export const aggregateWebinarAnalytics = (
  events: WebinarWatchEvent[],
  webinars: Pick<Webinar, "id" | "durationSeconds">[]
): AggregatedWebinarAnalytics => {
  const byWebinar = new Map<string, WebinarWatchEvent[]>();
  for (const e of events) {
    const list = byWebinar.get(e.webinar_id) ?? [];
    list.push(e);
    byWebinar.set(e.webinar_id, list);
  }

  const durationFor = (id: string): number | undefined => {
    const declared = webinars.find((w) => w.id === id)?.durationSeconds;
    if (declared && declared > 0) return declared;
    const fromEvents = byWebinar
      .get(id)
      ?.reduce((max, e) => Math.max(max, e.video_duration ?? 0), 0);
    return fromEvents && fromEvents > 0 ? fromEvents : undefined;
  };

  const perWebinar: WebinarStats[] = [];

  for (const [webinarId, list] of byWebinar.entries()) {
    const sessions = new Set(list.map((e) => e.session_id));
    const playSessions = new Set(
      list.filter((e) => e.event_type === "play").map((e) => e.session_id)
    );
    const completeSessions = new Set(
      list.filter((e) => e.event_type === "complete").map((e) => e.session_id)
    );

    // Watched seconds accumulated per session.
    const watchedBySession = new Map<string, number>();
    for (const e of list) {
      watchedBySession.set(
        e.session_id,
        (watchedBySession.get(e.session_id) ?? 0) + (e.watched_seconds || 0)
      );
    }

    const uniqueViewers = playSessions.size || sessions.size;
    const totalWatchSeconds = Array.from(watchedBySession.values()).reduce(
      (a, b) => a + b,
      0
    );
    const avgWatchSeconds = uniqueViewers ? totalWatchSeconds / uniqueViewers : 0;

    const duration = durationFor(webinarId);
    let avgPercentWatched = 0;
    if (duration) {
      const percents = Array.from(watchedBySession.values()).map((w) =>
        Math.min(100, (w / duration) * 100)
      );
      avgPercentWatched = percents.length
        ? percents.reduce((a, b) => a + b, 0) / percents.length
        : 0;
    }

    perWebinar.push({
      webinarId,
      views: playSessions.size || sessions.size,
      uniqueViewers,
      totalWatchSeconds: round(totalWatchSeconds),
      avgWatchSeconds: round(avgWatchSeconds),
      completions: completeSessions.size,
      completionRate: uniqueViewers
        ? round((completeSessions.size / uniqueViewers) * 100)
        : 0,
      avgPercentWatched: round(avgPercentWatched),
    });
  }

  perWebinar.sort((a, b) => b.views - a.views);

  const totalViews = perWebinar.reduce((a, w) => a + w.views, 0);
  const allSessions = new Set(events.map((e) => e.session_id));
  const totalWatch = perWebinar.reduce((a, w) => a + w.totalWatchSeconds, 0);
  const totalCompletions = perWebinar.reduce((a, w) => a + w.completions, 0);

  const retention = (webinarId: string, buckets = 10) => {
    const list = byWebinar.get(webinarId) ?? [];
    const duration = durationFor(webinarId);
    const sessions = new Set(
      list.filter((e) => e.event_type === "play").map((e) => e.session_id)
    );
    if (sessions.size === 0) {
      list.forEach((e) => sessions.add(e.session_id));
    }
    const maxPositionBySession = new Map<string, number>();
    for (const e of list) {
      maxPositionBySession.set(
        e.session_id,
        Math.max(maxPositionBySession.get(e.session_id) ?? 0, e.position_seconds || 0)
      );
    }
    const total = sessions.size;
    const result: { bucket: string; percent: number }[] = [];
    if (!duration || total === 0) {
      for (let i = 0; i < buckets; i++) {
        result.push({ bucket: `${(i * 100) / buckets}%`, percent: 0 });
      }
      return result;
    }
    for (let i = 0; i < buckets; i++) {
      const threshold = ((i + 1) / buckets) * duration;
      const reached = Array.from(maxPositionBySession.values()).filter(
        (pos) => pos >= threshold
      ).length;
      result.push({
        bucket: `${Math.round(((i + 1) / buckets) * 100)}%`,
        percent: round((reached / total) * 100),
      });
    }
    return result;
  };

  return {
    perWebinar,
    totals: {
      views: totalViews,
      uniqueViewers: allSessions.size,
      totalWatchSeconds: round(totalWatch),
      avgWatchSeconds: totalViews ? round(totalWatch / totalViews) : 0,
      completionRate: totalViews ? round((totalCompletions / totalViews) * 100) : 0,
    },
    retention,
  };
};

export const formatDuration = (totalSeconds: number): string => {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
};
